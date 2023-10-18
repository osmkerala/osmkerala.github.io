import { renderPage as runtimeRenderPage } from "../../runtime/server/index.js";
import { attachCookiesToResponse } from "../cookies/index.js";
import { callEndpoint, createAPIContext } from "../endpoint/index.js";
import { callMiddleware } from "../middleware/callMiddleware.js";
import { redirectRouteGenerate, redirectRouteStatus, routeIsRedirect } from "../redirects/index.js";
import { createResult } from "./result.js";
async function renderPage({ mod, renderContext, env, cookies }) {
  if (routeIsRedirect(renderContext.route)) {
    return new Response(null, {
      status: redirectRouteStatus(renderContext.route, renderContext.request.method),
      headers: {
        location: redirectRouteGenerate(renderContext.route, renderContext.params)
      }
    });
  }
  const Component = mod.default;
  if (!Component)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof Component}`);
  const result = createResult({
    adapterName: env.adapterName,
    links: renderContext.links,
    styles: renderContext.styles,
    logger: env.logger,
    params: renderContext.params,
    pathname: renderContext.pathname,
    componentMetadata: renderContext.componentMetadata,
    resolve: env.resolve,
    renderers: env.renderers,
    clientDirectives: env.clientDirectives,
    compressHTML: env.compressHTML,
    request: renderContext.request,
    site: env.site,
    scripts: renderContext.scripts,
    ssr: env.ssr,
    status: renderContext.status ?? 200,
    cookies,
    locals: renderContext.locals ?? {}
  });
  if (mod.frontmatter && typeof mod.frontmatter === "object" && "draft" in mod.frontmatter) {
    env.logger.warn(
      "astro",
      `The drafts feature is deprecated and used in ${renderContext.route.component}. You should migrate to content collections instead. See https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries for more information.`
    );
  }
  const response = await runtimeRenderPage(
    result,
    Component,
    renderContext.props,
    null,
    env.streaming,
    renderContext.route
  );
  if (result.cookies) {
    attachCookiesToResponse(response, result.cookies);
  }
  return response;
}
async function tryRenderRoute(renderContext, env, mod, onRequest) {
  const apiContext = createAPIContext({
    request: renderContext.request,
    params: renderContext.params,
    props: renderContext.props,
    site: env.site,
    adapterName: env.adapterName
  });
  switch (renderContext.route.type) {
    case "page":
    case "redirect": {
      if (onRequest) {
        return await callMiddleware(
          env.logger,
          onRequest,
          apiContext,
          () => {
            return renderPage({
              mod,
              renderContext,
              env,
              cookies: apiContext.cookies
            });
          }
        );
      } else {
        return await renderPage({
          mod,
          renderContext,
          env,
          cookies: apiContext.cookies
        });
      }
    }
    case "endpoint": {
      const result = await callEndpoint(
        mod,
        env,
        renderContext,
        onRequest
      );
      return result;
    }
    default:
      throw new Error(`Couldn't find route of type [${renderContext.route.type}]`);
  }
}
export {
  renderPage,
  tryRenderRoute
};
