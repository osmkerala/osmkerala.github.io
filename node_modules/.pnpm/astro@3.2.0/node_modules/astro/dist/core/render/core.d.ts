import type { AstroCookies, ComponentInstance, MiddlewareHandler } from '../../@types/astro.js';
import type { RenderContext } from './context.js';
import type { Environment } from './environment.js';
export type RenderPage = {
    mod: ComponentInstance;
    renderContext: RenderContext;
    env: Environment;
    cookies: AstroCookies;
};
export declare function renderPage({ mod, renderContext, env, cookies }: RenderPage): Promise<Response>;
/**
 * It attempts to render a route. A route can be a:
 * - page
 * - redirect
 * - endpoint
 *
 * ## Errors
 *
 * It throws an error if the page can't be rendered.
 * @deprecated Use the pipeline instead
 */
export declare function tryRenderRoute<MiddlewareReturnType = Response>(renderContext: Readonly<RenderContext>, env: Readonly<Environment>, mod: Readonly<ComponentInstance>, onRequest?: MiddlewareHandler<MiddlewareReturnType>): Promise<Response>;
