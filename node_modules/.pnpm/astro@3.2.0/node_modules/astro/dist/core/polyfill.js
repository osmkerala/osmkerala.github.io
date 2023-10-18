import crypto from "node:crypto";
import {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  ReadableByteStreamController,
  ReadableStream,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  TransformStream,
  WritableStream,
  WritableStreamDefaultController,
  WritableStreamDefaultWriter
} from "node:stream/web";
import { File, FormData, Headers, Request, Response, fetch } from "undici";
const isStackblitz = process.env.SHELL === "/bin/jsh" && process.versions.webcontainer != null;
function apply() {
  if (isStackblitz) {
    const neededPolyfills = {
      ByteLengthQueuingStrategy,
      CountQueuingStrategy,
      ReadableByteStreamController,
      ReadableStream,
      ReadableStreamBYOBReader,
      ReadableStreamBYOBRequest,
      ReadableStreamDefaultController,
      ReadableStreamDefaultReader,
      TransformStream,
      WritableStream,
      WritableStreamDefaultController,
      WritableStreamDefaultWriter,
      File,
      FormData,
      Headers,
      Request,
      Response,
      fetch
    };
    for (let polyfillName of Object.keys(neededPolyfills)) {
      if (Object.hasOwnProperty.call(globalThis, polyfillName))
        continue;
      Object.defineProperty(globalThis, polyfillName, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: neededPolyfills[polyfillName]
      });
    }
  }
  if (!globalThis.crypto) {
    Object.defineProperty(globalThis, "crypto", {
      value: crypto.webcrypto
    });
  }
  if (!globalThis.File) {
    Object.defineProperty(globalThis, "File", {
      value: File
    });
  }
}
export {
  apply
};
