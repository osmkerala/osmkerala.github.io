import { isRemotePath } from "@astrojs/internal-helpers/path";
import { AstroError, AstroErrorData } from "../core/errors/index.js";
import { isLocalService } from "./services/service.js";
import { matchHostname, matchPattern } from "./utils/remotePattern.js";
function injectImageEndpoint(settings) {
  const endpointEntrypoint = settings.config.image.endpoint ?? "astro/assets/image-endpoint";
  settings.injectedRoutes.push({
    pattern: "/_image",
    entryPoint: endpointEntrypoint,
    prerender: false
  });
  return settings;
}
function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      "virtual:image-service"
    ).catch((e) => {
      const error = new AstroError(AstroErrorData.InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...AstroErrorData.ExpectedImageOptions,
      message: AstroErrorData.ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}
export {
  getConfiguredImageService,
  getImage,
  injectImageEndpoint,
  isESMImportedImage,
  isRemoteAllowed,
  isRemoteImage
};
