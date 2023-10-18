import type { AstroInlineConfig } from '../../@types/astro.js';
export interface BuildOptions {
    /**
     * Teardown the compiler WASM instance after build. This can improve performance when
     * building once, but may cause a performance hit if building multiple times in a row.
     *
     * @internal only used for testing
     * @default true
     */
    teardownCompiler?: boolean;
}
/**
 * Builds your site for deployment. By default, this will generate static files and place them in a dist/ directory.
 * If SSR is enabled, this will generate the necessary server files to serve your site.
 *
 * @experimental The JavaScript API is experimental
 */
export default function build(inlineConfig: AstroInlineConfig, options?: BuildOptions): Promise<void>;
