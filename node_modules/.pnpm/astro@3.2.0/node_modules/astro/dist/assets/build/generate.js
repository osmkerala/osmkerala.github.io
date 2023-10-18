import fs, { readFileSync } from "node:fs";
import { basename, join } from "node:path/posix";
import { getOutDirWithinCwd } from "../../core/build/common.js";
import { prependForwardSlash } from "../../core/path.js";
import { isServerLikeOutput } from "../../prerender/utils.js";
import { getConfiguredImageService, isESMImportedImage } from "../internal.js";
import { loadRemoteImage } from "./remote.js";
async function generateImage(pipeline, options, filepath) {
  const config = pipeline.getConfig();
  const logger = pipeline.getLogger();
  let useCache = true;
  const assetsCacheDir = new URL("assets/", config.cacheDir);
  try {
    await fs.promises.mkdir(assetsCacheDir, { recursive: true });
  } catch (err) {
    logger.warn(
      "astro:assets",
      `An error was encountered while creating the cache directory. Proceeding without caching. Error: ${err}`
    );
    useCache = false;
  }
  let serverRoot, clientRoot;
  if (isServerLikeOutput(config)) {
    serverRoot = config.build.server;
    clientRoot = config.build.client;
  } else {
    serverRoot = getOutDirWithinCwd(config.outDir);
    clientRoot = config.outDir;
  }
  const isLocalImage = isESMImportedImage(options.src);
  const finalFileURL = new URL("." + filepath, clientRoot);
  const finalFolderURL = new URL("./", finalFileURL);
  const cacheFile = basename(filepath) + (isLocalImage ? "" : ".json");
  const cachedFileURL = new URL(cacheFile, assetsCacheDir);
  await fs.promises.mkdir(finalFolderURL, { recursive: true });
  try {
    if (isLocalImage) {
      await fs.promises.copyFile(cachedFileURL, finalFileURL);
      return {
        cached: true
      };
    } else {
      const JSONData = JSON.parse(readFileSync(cachedFileURL, "utf-8"));
      if (JSONData.expires > Date.now()) {
        await fs.promises.writeFile(finalFileURL, Buffer.from(JSONData.data, "base64"));
        return {
          cached: true
        };
      }
    }
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw new Error(`An error was encountered while reading the cache file. Error: ${e}`);
    }
  }
  const originalImagePath = isLocalImage ? options.src.src : options.src;
  let imageData;
  let resultData = {
    data: void 0,
    expires: void 0
  };
  if (isLocalImage) {
    imageData = await fs.promises.readFile(
      new URL(
        "." + prependForwardSlash(join(config.build.assets, basename(originalImagePath))),
        serverRoot
      )
    );
  } else {
    const remoteImage = await loadRemoteImage(originalImagePath);
    resultData.expires = remoteImage.expires;
    imageData = remoteImage.data;
  }
  const imageService = await getConfiguredImageService();
  resultData.data = (await imageService.transform(imageData, { ...options, src: originalImagePath }, config.image)).data;
  try {
    if (useCache) {
      if (isLocalImage) {
        await fs.promises.writeFile(cachedFileURL, resultData.data);
      } else {
        await fs.promises.writeFile(
          cachedFileURL,
          JSON.stringify({
            data: Buffer.from(resultData.data).toString("base64"),
            expires: resultData.expires
          })
        );
      }
    }
  } catch (e) {
    logger.warn(
      "astro:assets",
      `An error was encountered while creating the cache directory. Proceeding without caching. Error: ${e}`
    );
  } finally {
    await fs.promises.writeFile(finalFileURL, resultData.data);
  }
  return {
    cached: false,
    weight: {
      // Divide by 1024 to get size in kilobytes
      before: Math.trunc(imageData.byteLength / 1024),
      after: Math.trunc(Buffer.from(resultData.data).byteLength / 1024)
    }
  };
}
function getStaticImageList() {
  if (!globalThis?.astroAsset?.staticImages) {
    return /* @__PURE__ */ new Map();
  }
  return globalThis.astroAsset.staticImages;
}
export {
  generateImage,
  getStaticImageList
};
