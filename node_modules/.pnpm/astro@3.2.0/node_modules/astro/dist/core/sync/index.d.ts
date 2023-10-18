/// <reference types="node" resolution-mode="require"/>
import fsMod from 'node:fs';
import type { AstroInlineConfig, AstroSettings } from '../../@types/astro.js';
import type { Logger } from '../logger/core.js';
export type ProcessExit = 0 | 1;
export type SyncOptions = {
    /**
     * @internal only used for testing
     */
    fs?: typeof fsMod;
};
export type SyncInternalOptions = SyncOptions & {
    logger: Logger;
};
/**
 * Generates TypeScript types for all Astro modules. This sets up a `src/env.d.ts` file for type inferencing,
 * and defines the `astro:content` module for the Content Collections API.
 *
 * @experimental The JavaScript API is experimental
 */
export default function sync(inlineConfig: AstroInlineConfig, options?: SyncOptions): Promise<ProcessExit>;
/**
 * Generate content collection types, and then returns the process exit signal.
 *
 * A non-zero process signal is emitted in case there's an error while generating content collection types.
 *
 * This should only be used when the callee already has an `AstroSetting`, otherwise use `sync()` instead.
 * @internal
 *
 * @param {SyncOptions} options
 * @param {AstroSettings} settings Astro settings
 * @param {typeof fsMod} options.fs The file system
 * @param {LogOptions} options.logging Logging options
 * @return {Promise<ProcessExit>}
 */
export declare function syncInternal(settings: AstroSettings, { logger, fs }: SyncInternalOptions): Promise<ProcessExit>;
