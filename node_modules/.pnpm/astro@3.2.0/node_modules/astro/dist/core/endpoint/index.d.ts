/// <reference types="node" resolution-mode="require"/>
import type { APIContext, EndpointHandler, EndpointOutput, MiddlewareHandler, Params } from '../../@types/astro.js';
import type { Environment, RenderContext } from '../render/index.js';
type CreateAPIContext = {
    request: Request;
    params: Params;
    site?: string;
    props: Record<string, any>;
    adapterName?: string;
};
/**
 * Creates a context that holds all the information needed to handle an Astro endpoint.
 *
 * @param {CreateAPIContext} payload
 */
export declare function createAPIContext({ request, params, site, props, adapterName, }: CreateAPIContext): APIContext;
type ResponseParameters = ConstructorParameters<typeof Response>;
export declare let ResponseWithEncoding: ReturnType<typeof initResponseWithEncoding>;
declare let initResponseWithEncoding: () => {
    new (body: ResponseParameters[0], init: ResponseParameters[1], encoding?: BufferEncoding): {
        readonly headers: Headers;
        readonly ok: boolean;
        readonly redirected: boolean;
        readonly status: number;
        readonly statusText: string;
        readonly type: ResponseType;
        readonly url: string;
        clone(): Response;
        readonly body: ReadableStream<Uint8Array> | null;
        readonly bodyUsed: boolean;
        arrayBuffer(): Promise<ArrayBuffer>;
        blob(): Promise<Blob>;
        formData(): Promise<FormData>;
        json(): Promise<any>;
        text(): Promise<string>;
    };
    error(): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
export declare function callEndpoint<MiddlewareResult = Response | EndpointOutput>(mod: EndpointHandler, env: Environment, ctx: RenderContext, onRequest?: MiddlewareHandler<MiddlewareResult> | undefined): Promise<Response>;
export {};
