import { getOutputDirectory } from "../../../prerender/utils.js";
import { MIDDLEWARE_PATH_SEGMENT_NAME } from "../../constants.js";
import { addRollupInput } from "../add-rollup-input.js";
const MIDDLEWARE_MODULE_ID = "@astro-middleware";
const EMPTY_MIDDLEWARE = "\0empty-middleware";
function vitePluginMiddleware(opts, internals) {
  let resolvedMiddlewareId;
  return {
    name: "@astro/plugin-middleware",
    options(options) {
      return addRollupInput(options, [MIDDLEWARE_MODULE_ID]);
    },
    async resolveId(id) {
      if (id === MIDDLEWARE_MODULE_ID) {
        const middlewareId = await this.resolve(
          `${decodeURI(opts.settings.config.srcDir.pathname)}${MIDDLEWARE_PATH_SEGMENT_NAME}`
        );
        if (middlewareId) {
          resolvedMiddlewareId = middlewareId.id;
          return middlewareId.id;
        } else {
          return EMPTY_MIDDLEWARE;
        }
      }
      if (id === EMPTY_MIDDLEWARE) {
        return EMPTY_MIDDLEWARE;
      }
    },
    load(id) {
      if (id === EMPTY_MIDDLEWARE) {
        return "export const onRequest = undefined";
      } else if (id === resolvedMiddlewareId) {
        this.emitFile({
          type: "chunk",
          preserveSignature: "strict",
          fileName: "middleware.mjs",
          id
        });
      }
    },
    writeBundle(_, bundle) {
      for (const [chunkName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "asset") {
          continue;
        }
        if (chunk.fileName === "middleware.mjs") {
          const outputDirectory = getOutputDirectory(opts.settings.config);
          internals.middlewareEntryPoint = new URL(chunkName, outputDirectory);
        }
      }
    }
  };
}
function pluginMiddleware(opts, internals) {
  return {
    build: "ssr",
    hooks: {
      "build:before": () => {
        return {
          vitePlugin: vitePluginMiddleware(opts, internals)
        };
      }
    }
  };
}
export {
  MIDDLEWARE_MODULE_ID,
  pluginMiddleware,
  vitePluginMiddleware
};
