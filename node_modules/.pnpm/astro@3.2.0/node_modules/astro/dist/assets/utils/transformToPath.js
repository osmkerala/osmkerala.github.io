import { basename, extname } from "node:path";
import { removeQueryString } from "../../core/path.js";
import { shorthash } from "../../runtime/server/shorthash.js";
import { isESMImportedImage } from "../internal.js";
function propsToFilename(transform, hash) {
  let filename = removeQueryString(
    isESMImportedImage(transform.src) ? transform.src.src : transform.src
  );
  const ext = extname(filename);
  filename = basename(filename, ext);
  let outputExt = transform.format ? `.${transform.format}` : ext;
  return `/${filename}_${hash}${outputExt}`;
}
function hashTransform(transform, imageService) {
  const { alt, ...rest } = transform;
  const hashFields = { ...rest, imageService };
  return shorthash(JSON.stringify(hashFields));
}
export {
  hashTransform,
  propsToFilename
};
