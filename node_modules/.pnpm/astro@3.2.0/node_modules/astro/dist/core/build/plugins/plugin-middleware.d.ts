import type { Plugin as VitePlugin } from 'vite';
import type { BuildInternals } from '../internal.js';
import type { AstroBuildPlugin } from '../plugin.js';
import type { StaticBuildOptions } from '../types.js';
export declare const MIDDLEWARE_MODULE_ID = "@astro-middleware";
export declare function vitePluginMiddleware(opts: StaticBuildOptions, internals: BuildInternals): VitePlugin;
export declare function pluginMiddleware(opts: StaticBuildOptions, internals: BuildInternals): AstroBuildPlugin;
