import * as colors from "kleur/colors";
import { bgGreen, black, cyan, dim, green, magenta } from "kleur/colors";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  generateImage as generateImageInternal,
  getStaticImageList
} from "../../assets/build/generate.js";
import { hasPrerenderedPages } from "../../core/build/internal.js";
import {
  isRelativePath,
  joinPaths,
  prependForwardSlash,
  removeLeadingForwardSlash,
  removeTrailingForwardSlash
} from "../../core/path.js";
import { runHookBuildGenerated } from "../../integrations/index.js";
import { getOutputDirectory, isServerLikeOutput } from "../../prerender/utils.js";
import { PAGE_SCRIPT_ID } from "../../vite-plugin-scripts/index.js";
import { AstroError, AstroErrorData } from "../errors/index.js";
import { RedirectSinglePageBuiltModule, getRedirectLocationOrThrow } from "../redirects/index.js";
import { createRenderContext } from "../render/index.js";
import { callGetStaticPaths } from "../render/route-cache.js";
import {
  createAssetLink,
  createModuleScriptsSet,
  createStylesheetElementSet
} from "../render/ssr-element.js";
import { createRequest } from "../request.js";
import { matchRoute } from "../routing/match.js";
import { getOutputFilename } from "../util.js";
import { BuildPipeline } from "./buildPipeline.js";
import { getOutDirWithinCwd, getOutFile, getOutFolder } from "./common.js";
import {
  cssOrder,
  getEntryFilePathFromComponentPath,
  getPageDataByComponent,
  mergeInlineCss
} from "./internal.js";
import { getTimeStat } from "./util.js";
function createEntryURL(filePath, outFolder) {
  return new URL("./" + filePath + `?time=${Date.now()}`, outFolder);
}
async function getEntryForRedirectRoute(route, internals, outFolder) {
  if (route.type !== "redirect") {
    throw new Error(`Expected a redirect route.`);
  }
  if (route.redirectRoute) {
    const filePath = getEntryFilePathFromComponentPath(internals, route.redirectRoute.component);
    if (filePath) {
      const url = createEntryURL(filePath, outFolder);
      const ssrEntryPage = await import(url.toString());
      return ssrEntryPage;
    }
  }
  return RedirectSinglePageBuiltModule;
}
function shouldSkipDraft(pageModule, settings) {
  return (
    // Drafts are disabled
    !settings.config.markdown.drafts && // This is a draft post
    "frontmatter" in pageModule && pageModule.frontmatter?.draft === true
  );
}
function rootRelativeFacadeId(facadeId, settings) {
  return facadeId.slice(fileURLToPath(settings.config.root).length);
}
function chunkIsPage(settings, output, internals) {
  if (output.type !== "chunk") {
    return false;
  }
  const chunk = output;
  if (chunk.facadeModuleId) {
    const facadeToEntryId = prependForwardSlash(
      rootRelativeFacadeId(chunk.facadeModuleId, settings)
    );
    return internals.entrySpecifierToBundleMap.has(facadeToEntryId);
  }
  return false;
}
async function generatePages(opts, internals) {
  const timer = performance.now();
  const ssr = isServerLikeOutput(opts.settings.config);
  let manifest;
  if (ssr) {
    manifest = await BuildPipeline.retrieveManifest(opts, internals);
  } else {
    const baseDirectory = getOutputDirectory(opts.settings.config);
    const renderersEntryUrl = new URL("renderers.mjs", baseDirectory);
    const renderers = await import(renderersEntryUrl.toString());
    manifest = createBuildManifest(
      opts.settings,
      internals,
      renderers.renderers
    );
  }
  const pipeline = new BuildPipeline(opts, internals, manifest);
  const outFolder = ssr ? opts.settings.config.build.server : getOutDirWithinCwd(opts.settings.config.outDir);
  const logger = pipeline.getLogger();
  if (ssr && !hasPrerenderedPages(internals)) {
    delete globalThis?.astroAsset?.addStaticImage;
    return;
  }
  const verb = ssr ? "prerendering" : "generating";
  logger.info(null, `
${bgGreen(black(` ${verb} static routes `))}`);
  const builtPaths = /* @__PURE__ */ new Set();
  const pagesToGenerate = pipeline.retrieveRoutesToGenerate();
  if (ssr) {
    for (const [pageData, filePath] of pagesToGenerate) {
      if (pageData.route.prerender) {
        const ssrEntryURLPage = createEntryURL(filePath, outFolder);
        const ssrEntryPage = await import(ssrEntryURLPage.toString());
        if (
          // TODO: remove in Astro 4.0
          opts.settings.config.build.split || opts.settings.adapter?.adapterFeatures?.functionPerRoute
        ) {
          const ssrEntry = ssrEntryPage?.pageModule;
          if (ssrEntry) {
            await generatePage(pageData, ssrEntry, builtPaths, pipeline);
          } else {
            throw new Error(
              `Unable to find the manifest for the module ${ssrEntryURLPage.toString()}. This is unexpected and likely a bug in Astro, please report.`
            );
          }
        } else {
          const ssrEntry = ssrEntryPage;
          await generatePage(pageData, ssrEntry, builtPaths, pipeline);
        }
      }
      if (pageData.route.type === "redirect") {
        const entry = await getEntryForRedirectRoute(pageData.route, internals, outFolder);
        await generatePage(pageData, entry, builtPaths, pipeline);
      }
    }
  } else {
    for (const [pageData, filePath] of pagesToGenerate) {
      if (pageData.route.type === "redirect") {
        const entry = await getEntryForRedirectRoute(pageData.route, internals, outFolder);
        await generatePage(pageData, entry, builtPaths, pipeline);
      } else {
        const ssrEntryURLPage = createEntryURL(filePath, outFolder);
        const entry = await import(ssrEntryURLPage.toString());
        await generatePage(pageData, entry, builtPaths, pipeline);
      }
    }
  }
  const staticImageList = getStaticImageList();
  if (staticImageList.size)
    logger.info(null, `
${bgGreen(black(` generating optimized images `))}`);
  let count = 0;
  for (const imageData of staticImageList.entries()) {
    count++;
    await generateImage(
      pipeline,
      imageData[1].options,
      imageData[1].path,
      count,
      staticImageList.size
    );
  }
  delete globalThis?.astroAsset?.addStaticImage;
  await runHookBuildGenerated({
    config: opts.settings.config,
    logger: pipeline.getLogger()
  });
  logger.info(null, dim(`Completed in ${getTimeStat(timer, performance.now())}.
`));
}
async function generateImage(pipeline, transform, path, count, totalCount) {
  const logger = pipeline.getLogger();
  let timeStart = performance.now();
  const generationData = await generateImageInternal(pipeline, transform, path);
  if (!generationData) {
    return;
  }
  const timeEnd = performance.now();
  const timeChange = getTimeStat(timeStart, timeEnd);
  const timeIncrease = `(+${timeChange})`;
  const statsText = generationData.cached ? `(reused cache entry)` : `(before: ${generationData.weight.before}kB, after: ${generationData.weight.after}kB)`;
  const counter = `(${count}/${totalCount})`;
  logger.info(
    null,
    `  ${green("\u25B6")} ${path} ${dim(statsText)} ${dim(timeIncrease)} ${dim(counter)}`
  );
}
async function generatePage(pageData, ssrEntry, builtPaths, pipeline) {
  let timeStart = performance.now();
  const logger = pipeline.getLogger();
  const pageInfo = getPageDataByComponent(pipeline.getInternals(), pageData.route.component);
  const linkIds = [];
  const scripts = pageInfo?.hoistedScript ?? null;
  const styles = pageData.styles.sort(cssOrder).map(({ sheet }) => sheet).reduce(mergeInlineCss, []);
  const pageModulePromise = ssrEntry.page;
  const onRequest = ssrEntry.onRequest;
  if (onRequest) {
    pipeline.setMiddlewareFunction(onRequest);
  }
  if (!pageModulePromise) {
    throw new Error(
      `Unable to find the module for ${pageData.component}. This is unexpected and likely a bug in Astro, please report.`
    );
  }
  const pageModule = await pageModulePromise();
  if (shouldSkipDraft(pageModule, pipeline.getSettings())) {
    logger.info(null, `${magenta("\u26A0\uFE0F")}  Skipping draft ${pageData.route.component}`);
    logger.warn(
      "astro",
      `The drafts feature is deprecated. You should migrate to content collections instead. See https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries for more information.`
    );
    return;
  }
  const generationOptions = {
    pageData,
    linkIds,
    scripts,
    styles,
    mod: pageModule
  };
  const icon = pageData.route.type === "page" || pageData.route.type === "redirect" ? green("\u25B6") : magenta("\u03BB");
  if (isRelativePath(pageData.route.component)) {
    logger.info(null, `${icon} ${pageData.route.route}`);
  } else {
    logger.info(null, `${icon} ${pageData.route.component}`);
  }
  const paths = await getPathsForRoute(pageData, pageModule, pipeline, builtPaths);
  let prevTimeEnd = timeStart;
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    await generatePath(path, generationOptions, pipeline);
    const timeEnd = performance.now();
    const timeChange = getTimeStat(prevTimeEnd, timeEnd);
    const timeIncrease = `(+${timeChange})`;
    const filePath = getOutputFilename(pipeline.getConfig(), path, pageData.route.type);
    const lineIcon = i === paths.length - 1 ? "\u2514\u2500" : "\u251C\u2500";
    logger.info(null, `  ${cyan(lineIcon)} ${dim(filePath)} ${dim(timeIncrease)}`);
    prevTimeEnd = timeEnd;
  }
}
async function getPathsForRoute(pageData, mod, pipeline, builtPaths) {
  const opts = pipeline.getStaticBuildOptions();
  const logger = pipeline.getLogger();
  let paths = [];
  if (pageData.route.pathname) {
    paths.push(pageData.route.pathname);
    builtPaths.add(pageData.route.pathname);
  } else {
    const route = pageData.route;
    const staticPaths = await callGetStaticPaths({
      mod,
      route,
      routeCache: opts.routeCache,
      logger,
      ssr: isServerLikeOutput(opts.settings.config)
    }).catch((err) => {
      logger.debug("build", `\u251C\u2500\u2500 ${colors.bold(colors.red("\u2717"))} ${route.component}`);
      throw err;
    });
    const label = staticPaths.length === 1 ? "page" : "pages";
    logger.debug(
      "build",
      `\u251C\u2500\u2500 ${colors.bold(colors.green("\u2714"))} ${route.component} \u2192 ${colors.magenta(
        `[${staticPaths.length} ${label}]`
      )}`
    );
    paths = staticPaths.map((staticPath) => {
      try {
        return route.generate(staticPath.params);
      } catch (e) {
        if (e instanceof TypeError) {
          throw getInvalidRouteSegmentError(e, route, staticPath);
        }
        throw e;
      }
    }).filter((staticPath) => {
      if (!builtPaths.has(removeTrailingForwardSlash(staticPath))) {
        return true;
      }
      const matchedRoute = matchRoute(staticPath, opts.manifest);
      return matchedRoute === route;
    });
    for (const staticPath of paths) {
      builtPaths.add(removeTrailingForwardSlash(staticPath));
    }
  }
  return paths;
}
function getInvalidRouteSegmentError(e, route, staticPath) {
  const invalidParam = e.message.match(/^Expected "([^"]+)"/)?.[1];
  const received = invalidParam ? staticPath.params[invalidParam] : void 0;
  let hint = "Learn about dynamic routes at https://docs.astro.build/en/core-concepts/routing/#dynamic-routes";
  if (invalidParam && typeof received === "string") {
    const matchingSegment = route.segments.find(
      (segment) => segment[0]?.content === invalidParam
    )?.[0];
    const mightBeMissingSpread = matchingSegment?.dynamic && !matchingSegment?.spread;
    if (mightBeMissingSpread) {
      hint = `If the param contains slashes, try using a rest parameter: **[...${invalidParam}]**. Learn more at https://docs.astro.build/en/core-concepts/routing/#dynamic-routes`;
    }
  }
  return new AstroError({
    ...AstroErrorData.InvalidDynamicRoute,
    message: invalidParam ? AstroErrorData.InvalidDynamicRoute.message(
      route.route,
      JSON.stringify(invalidParam),
      JSON.stringify(received)
    ) : `Generated path for ${route.route} is invalid.`,
    hint
  });
}
function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore": {
      switch (buildFormat) {
        case "directory":
          return true;
        case "file":
          return false;
      }
    }
  }
}
function addPageName(pathname, opts) {
  const trailingSlash = opts.settings.config.trailingSlash;
  const buildFormat = opts.settings.config.build.format;
  const pageName = shouldAppendForwardSlash(trailingSlash, buildFormat) ? pathname.replace(/\/?$/, "/").replace(/^\//, "") : pathname.replace(/^\//, "");
  opts.pageNames.push(pageName);
}
function getUrlForPath(pathname, base, origin, format, routeType) {
  const ending = format === "directory" ? "/" : ".html";
  let buildPathname;
  if (pathname === "/" || pathname === "") {
    buildPathname = base;
  } else if (routeType === "endpoint") {
    const buildPathRelative = removeLeadingForwardSlash(pathname);
    buildPathname = joinPaths(base, buildPathRelative);
  } else {
    const buildPathRelative = removeTrailingForwardSlash(removeLeadingForwardSlash(pathname)) + ending;
    buildPathname = joinPaths(base, buildPathRelative);
  }
  const url = new URL(buildPathname, origin);
  return url;
}
async function generatePath(pathname, gopts, pipeline) {
  const manifest = pipeline.getManifest();
  const { mod, scripts: hoistedScripts, styles: _styles, pageData } = gopts;
  if (pageData.route.type === "page") {
    addPageName(pathname, pipeline.getStaticBuildOptions());
  }
  pipeline.getEnvironment().logger.debug("build", `Generating: ${pathname}`);
  const links = /* @__PURE__ */ new Set();
  const scripts = createModuleScriptsSet(
    hoistedScripts ? [hoistedScripts] : [],
    manifest.base,
    manifest.assetsPrefix
  );
  const styles = createStylesheetElementSet(_styles, manifest.base, manifest.assetsPrefix);
  if (pipeline.getSettings().scripts.some((script) => script.stage === "page")) {
    const hashedFilePath = pipeline.getInternals().entrySpecifierToBundleMap.get(PAGE_SCRIPT_ID);
    if (typeof hashedFilePath !== "string") {
      throw new Error(`Cannot find the built path for ${PAGE_SCRIPT_ID}`);
    }
    const src = createAssetLink(hashedFilePath, manifest.base, manifest.assetsPrefix);
    scripts.add({
      props: { type: "module", src },
      children: ""
    });
  }
  for (const script of pipeline.getSettings().scripts) {
    if (script.stage === "head-inline") {
      scripts.add({
        props: {},
        children: script.content
      });
    }
  }
  const ssr = isServerLikeOutput(pipeline.getConfig());
  const url = getUrlForPath(
    pathname,
    pipeline.getConfig().base,
    pipeline.getStaticBuildOptions().origin,
    pipeline.getConfig().build.format,
    pageData.route.type
  );
  const renderContext = await createRenderContext({
    pathname,
    request: createRequest({
      url,
      headers: new Headers(),
      logger: pipeline.getLogger(),
      ssr
    }),
    componentMetadata: manifest.componentMetadata,
    scripts,
    styles,
    links,
    route: pageData.route,
    env: pipeline.getEnvironment(),
    mod
  });
  let body;
  let encoding;
  let response;
  try {
    response = await pipeline.renderRoute(renderContext, mod);
  } catch (err) {
    if (!AstroError.is(err) && !err.id && typeof err === "object") {
      err.id = pageData.component;
    }
    throw err;
  }
  if (response.status >= 300 && response.status < 400) {
    if (!pipeline.getConfig().build.redirects) {
      return;
    }
    const locationSite = getRedirectLocationOrThrow(response.headers);
    const siteURL = pipeline.getConfig().site;
    const location = siteURL ? new URL(locationSite, siteURL) : locationSite;
    const fromPath = new URL(renderContext.request.url).pathname;
    const delay = response.status === 302 ? 2 : 0;
    body = `<!doctype html>
<title>Redirecting to: ${location}</title>
<meta http-equiv="refresh" content="${delay};url=${location}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${location}">
<body>
	<a href="${location}">Redirecting from <code>${fromPath}</code> to <code>${location}</code></a>
</body>`;
    if (pipeline.getConfig().compressHTML === true) {
      body = body.replaceAll("\n", "");
    }
    if (pageData.route.type !== "redirect") {
      pageData.route.redirect = location.toString();
    }
  } else {
    if (!response.body)
      return;
    body = Buffer.from(await response.arrayBuffer());
    encoding = response.headers.get("X-Astro-Encoding") ?? "utf-8";
  }
  const outFolder = getOutFolder(pipeline.getConfig(), pathname, pageData.route.type);
  const outFile = getOutFile(pipeline.getConfig(), outFolder, pathname, pageData.route.type);
  pageData.route.distURL = outFile;
  await fs.promises.mkdir(outFolder, { recursive: true });
  await fs.promises.writeFile(outFile, body, encoding);
}
function createBuildManifest(settings, internals, renderers) {
  return {
    assets: /* @__PURE__ */ new Set(),
    entryModules: Object.fromEntries(internals.entrySpecifierToBundleMap.entries()),
    routes: [],
    adapterName: "",
    clientDirectives: settings.clientDirectives,
    compressHTML: settings.config.compressHTML,
    renderers,
    base: settings.config.base,
    assetsPrefix: settings.config.build.assetsPrefix,
    site: settings.config.site ? new URL(settings.config.base, settings.config.site).toString() : settings.config.site,
    componentMetadata: internals.componentMetadata
  };
}
export {
  chunkIsPage,
  createBuildManifest,
  generatePages,
  rootRelativeFacadeId
};
