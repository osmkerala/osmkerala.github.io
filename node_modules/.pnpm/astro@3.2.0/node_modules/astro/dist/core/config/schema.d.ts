/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { RehypePlugin, RemarkPlugin, RemarkRehype } from '@astrojs/markdown-remark';
import type { ILanguageRegistration, IShikiTheme, Theme } from 'shiki';
import type { ViteUserConfig } from '../../@types/astro.js';
import type { OutgoingHttpHeaders } from 'node:http';
import { z } from 'zod';
export declare const AstroConfigSchema: z.ZodObject<{
    root: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
    srcDir: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
    publicDir: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
    outDir: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
    cacheDir: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
    site: z.ZodOptional<z.ZodString>;
    compressHTML: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    base: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    trailingSlash: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"never">, z.ZodLiteral<"ignore">]>>>;
    output: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"static">, z.ZodLiteral<"server">, z.ZodLiteral<"hybrid">]>>>;
    scopedStyleStrategy: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"where">, z.ZodLiteral<"class">, z.ZodLiteral<"attribute">]>>>;
    adapter: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        hooks: z.ZodDefault<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, {} & {
            [k: string]: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }, {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    }>>;
    integrations: z.ZodEffects<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        hooks: z.ZodDefault<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, {} & {
            [k: string]: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }, {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    }>, "many">>, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[], unknown>;
    build: z.ZodDefault<z.ZodObject<{
        format: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"file">, z.ZodLiteral<"directory">]>>>;
        client: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
        server: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, URL, string | undefined>;
        assets: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        assetsPrefix: z.ZodOptional<z.ZodString>;
        serverEntry: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        redirects: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        inlineStylesheets: z.ZodDefault<z.ZodOptional<z.ZodEnum<["always", "auto", "never"]>>>;
        /**
         * @deprecated
         * Use the adapter feature instead
         */
        split: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @deprecated
         * Use the adapter feature instead
         */
        excludeMiddleware: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: URL;
        server: URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    }, {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    }>>;
    server: z.ZodEffects<z.ZodDefault<z.ZodObject<{
        open: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        host: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>>;
        port: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        headers: z.ZodOptional<z.ZodType<OutgoingHttpHeaders, z.ZodTypeDef, OutgoingHttpHeaders>>;
    }, "strip", z.ZodTypeAny, {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
    }, {
        host?: string | boolean | undefined;
        port?: number | undefined;
        headers?: OutgoingHttpHeaders | undefined;
        open?: boolean | undefined;
    }>>, {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
    }, unknown>;
    redirects: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodObject<{
        status: z.ZodUnion<[z.ZodLiteral<300>, z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<304>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
        destination: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }, {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>]>>>;
    image: z.ZodDefault<z.ZodObject<{
        endpoint: z.ZodOptional<z.ZodString>;
        service: z.ZodDefault<z.ZodObject<{
            entrypoint: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"astro/assets/services/sharp">, z.ZodLiteral<"astro/assets/services/squoosh">, z.ZodString]>>;
            config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            entrypoint: string;
            config: Record<string, any>;
        }, {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        }>>;
        domains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        remotePatterns: z.ZodDefault<z.ZodArray<z.ZodObject<{
            protocol: z.ZodOptional<z.ZodString>;
            hostname: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            port: z.ZodOptional<z.ZodString>;
            pathname: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        }, "strip", z.ZodTypeAny, {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }, {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    }, {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    }>>;
    markdown: z.ZodDefault<z.ZodObject<{
        drafts: z.ZodDefault<z.ZodBoolean>;
        syntaxHighlight: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"shiki">, z.ZodLiteral<"prism">, z.ZodLiteral<false>]>>;
        shikiConfig: z.ZodDefault<z.ZodObject<{
            langs: z.ZodDefault<z.ZodArray<z.ZodType<ILanguageRegistration, z.ZodTypeDef, ILanguageRegistration>, "many">>;
            theme: z.ZodDefault<z.ZodUnion<[z.ZodEnum<[Theme, ...Theme[]]>, z.ZodType<IShikiTheme, z.ZodTypeDef, IShikiTheme>]>>;
            wrap: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        }, {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        }>>;
        remarkPlugins: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodTuple<[z.ZodString, z.ZodAny], null>, z.ZodType<RemarkPlugin, z.ZodTypeDef, RemarkPlugin>, z.ZodTuple<[z.ZodType<RemarkPlugin, z.ZodTypeDef, RemarkPlugin>, z.ZodAny], null>]>, "many">>;
        rehypePlugins: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodTuple<[z.ZodString, z.ZodAny], null>, z.ZodType<RehypePlugin, z.ZodTypeDef, RehypePlugin>, z.ZodTuple<[z.ZodType<RehypePlugin, z.ZodTypeDef, RehypePlugin>, z.ZodAny], null>]>, "many">>;
        remarkRehype: z.ZodDefault<z.ZodOptional<z.ZodType<RemarkRehype, z.ZodTypeDef, RemarkRehype>>>;
        gfm: z.ZodDefault<z.ZodBoolean>;
        smartypants: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    }, {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    }>>;
    vite: z.ZodDefault<z.ZodType<ViteUserConfig, z.ZodTypeDef, ViteUserConfig>>;
    experimental: z.ZodDefault<z.ZodObject<{
        optimizeHoistedScript: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strict", z.ZodTypeAny, {
        optimizeHoistedScript: boolean;
    }, {
        optimizeHoistedScript?: boolean | undefined;
    }>>;
    legacy: z.ZodDefault<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    site?: string | undefined;
    adapter?: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    } | undefined;
    output: "server" | "static" | "hybrid";
    server: {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
    };
    redirects: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>;
    root: URL;
    srcDir: URL;
    publicDir: URL;
    outDir: URL;
    cacheDir: URL;
    compressHTML: boolean;
    base: string;
    trailingSlash: "ignore" | "always" | "never";
    scopedStyleStrategy: "where" | "class" | "attribute";
    integrations: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[];
    build: {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: URL;
        server: URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    };
    image: {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    };
    markdown: {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    };
    vite: ViteUserConfig;
    experimental: {
        optimizeHoistedScript: boolean;
    };
    legacy: {};
}, {
    output?: "server" | "static" | "hybrid" | undefined;
    server?: unknown;
    redirects?: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }> | undefined;
    root?: string | undefined;
    srcDir?: string | undefined;
    publicDir?: string | undefined;
    outDir?: string | undefined;
    cacheDir?: string | undefined;
    site?: string | undefined;
    compressHTML?: boolean | undefined;
    base?: string | undefined;
    trailingSlash?: "ignore" | "always" | "never" | undefined;
    scopedStyleStrategy?: "where" | "class" | "attribute" | undefined;
    adapter?: {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    } | undefined;
    integrations?: unknown;
    build?: {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    } | undefined;
    image?: {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    } | undefined;
    markdown?: {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    } | undefined;
    vite?: ViteUserConfig | undefined;
    experimental?: {
        optimizeHoistedScript?: boolean | undefined;
    } | undefined;
    legacy?: {} | undefined;
}>;
export type AstroConfigType = z.infer<typeof AstroConfigSchema>;
export declare function createRelativeSchema(cmd: string, fileProtocolRoot: string): z.ZodEffects<z.ZodEffects<z.ZodObject<{
    output: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"static">, z.ZodLiteral<"server">, z.ZodLiteral<"hybrid">]>>>;
    redirects: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodObject<{
        status: z.ZodUnion<[z.ZodLiteral<300>, z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<304>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
        destination: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }, {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>]>>>;
    site: z.ZodOptional<z.ZodString>;
    base: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    trailingSlash: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"never">, z.ZodLiteral<"ignore">]>>>;
    scopedStyleStrategy: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"where">, z.ZodLiteral<"class">, z.ZodLiteral<"attribute">]>>>;
    adapter: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        hooks: z.ZodDefault<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, {} & {
            [k: string]: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }, {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    }>>;
    integrations: z.ZodEffects<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        hooks: z.ZodDefault<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, {} & {
            [k: string]: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }, {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    }>, "many">>, {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[], unknown>;
    image: z.ZodDefault<z.ZodObject<{
        endpoint: z.ZodOptional<z.ZodString>;
        service: z.ZodDefault<z.ZodObject<{
            entrypoint: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"astro/assets/services/sharp">, z.ZodLiteral<"astro/assets/services/squoosh">, z.ZodString]>>;
            config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            entrypoint: string;
            config: Record<string, any>;
        }, {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        }>>;
        domains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        remotePatterns: z.ZodDefault<z.ZodArray<z.ZodObject<{
            protocol: z.ZodOptional<z.ZodString>;
            hostname: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            port: z.ZodOptional<z.ZodString>;
            pathname: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        }, "strip", z.ZodTypeAny, {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }, {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    }, {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    }>>;
    markdown: z.ZodDefault<z.ZodObject<{
        drafts: z.ZodDefault<z.ZodBoolean>;
        syntaxHighlight: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"shiki">, z.ZodLiteral<"prism">, z.ZodLiteral<false>]>>;
        shikiConfig: z.ZodDefault<z.ZodObject<{
            langs: z.ZodDefault<z.ZodArray<z.ZodType<ILanguageRegistration, z.ZodTypeDef, ILanguageRegistration>, "many">>;
            theme: z.ZodDefault<z.ZodUnion<[z.ZodEnum<[Theme, ...Theme[]]>, z.ZodType<IShikiTheme, z.ZodTypeDef, IShikiTheme>]>>;
            wrap: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        }, {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        }>>;
        remarkPlugins: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodTuple<[z.ZodString, z.ZodAny], null>, z.ZodType<RemarkPlugin, z.ZodTypeDef, RemarkPlugin>, z.ZodTuple<[z.ZodType<RemarkPlugin, z.ZodTypeDef, RemarkPlugin>, z.ZodAny], null>]>, "many">>;
        rehypePlugins: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodTuple<[z.ZodString, z.ZodAny], null>, z.ZodType<RehypePlugin, z.ZodTypeDef, RehypePlugin>, z.ZodTuple<[z.ZodType<RehypePlugin, z.ZodTypeDef, RehypePlugin>, z.ZodAny], null>]>, "many">>;
        remarkRehype: z.ZodDefault<z.ZodOptional<z.ZodType<RemarkRehype, z.ZodTypeDef, RemarkRehype>>>;
        gfm: z.ZodDefault<z.ZodBoolean>;
        smartypants: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    }, {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    }>>;
    vite: z.ZodDefault<z.ZodType<ViteUserConfig, z.ZodTypeDef, ViteUserConfig>>;
    experimental: z.ZodDefault<z.ZodObject<{
        optimizeHoistedScript: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strict", z.ZodTypeAny, {
        optimizeHoistedScript: boolean;
    }, {
        optimizeHoistedScript?: boolean | undefined;
    }>>;
    legacy: z.ZodDefault<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    root: z.ZodEffects<z.ZodDefault<z.ZodString>, import("url").URL, string | undefined>;
    srcDir: z.ZodEffects<z.ZodDefault<z.ZodString>, import("url").URL, string | undefined>;
    compressHTML: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    publicDir: z.ZodEffects<z.ZodDefault<z.ZodString>, import("url").URL, string | undefined>;
    outDir: z.ZodEffects<z.ZodDefault<z.ZodString>, import("url").URL, string | undefined>;
    cacheDir: z.ZodEffects<z.ZodDefault<z.ZodString>, import("url").URL, string | undefined>;
    build: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        format: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"file">, z.ZodLiteral<"directory">]>>>;
        client: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, import("url").URL, string | undefined>;
        server: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, import("url").URL, string | undefined>;
        assets: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        assetsPrefix: z.ZodOptional<z.ZodString>;
        serverEntry: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        redirects: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        inlineStylesheets: z.ZodDefault<z.ZodOptional<z.ZodEnum<["always", "auto", "never"]>>>;
        split: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        excludeMiddleware: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: import("url").URL;
        server: import("url").URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    }, {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    }>>>;
    server: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodObject<{
        host: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>>;
        port: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        open: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        headers: z.ZodOptional<z.ZodType<OutgoingHttpHeaders, z.ZodTypeDef, OutgoingHttpHeaders>>;
        streaming: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
        streaming: boolean;
    }, {
        host?: string | boolean | undefined;
        port?: number | undefined;
        headers?: OutgoingHttpHeaders | undefined;
        open?: boolean | undefined;
        streaming?: boolean | undefined;
    }>>>, {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
        streaming: boolean;
    }, unknown>;
}, "strip", z.ZodTypeAny, {
    site?: string | undefined;
    adapter?: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    } | undefined;
    output: "server" | "static" | "hybrid";
    server: {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
        streaming: boolean;
    };
    redirects: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>;
    root: import("url").URL;
    srcDir: import("url").URL;
    publicDir: import("url").URL;
    outDir: import("url").URL;
    cacheDir: import("url").URL;
    compressHTML: boolean;
    base: string;
    trailingSlash: "ignore" | "always" | "never";
    scopedStyleStrategy: "where" | "class" | "attribute";
    integrations: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[];
    build: {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: import("url").URL;
        server: import("url").URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    };
    image: {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    };
    markdown: {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    };
    vite: ViteUserConfig;
    experimental: {
        optimizeHoistedScript: boolean;
    };
    legacy: {};
}, {
    output?: "server" | "static" | "hybrid" | undefined;
    server?: unknown;
    redirects?: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }> | undefined;
    root?: string | undefined;
    srcDir?: string | undefined;
    publicDir?: string | undefined;
    outDir?: string | undefined;
    cacheDir?: string | undefined;
    site?: string | undefined;
    compressHTML?: boolean | undefined;
    base?: string | undefined;
    trailingSlash?: "ignore" | "always" | "never" | undefined;
    scopedStyleStrategy?: "where" | "class" | "attribute" | undefined;
    adapter?: {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    } | undefined;
    integrations?: unknown;
    build?: {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    } | undefined;
    image?: {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    } | undefined;
    markdown?: {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    } | undefined;
    vite?: ViteUserConfig | undefined;
    experimental?: {
        optimizeHoistedScript?: boolean | undefined;
    } | undefined;
    legacy?: {} | undefined;
}>, {
    site?: string | undefined;
    adapter?: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    } | undefined;
    output: "server" | "static" | "hybrid";
    server: {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
        streaming: boolean;
    };
    redirects: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>;
    root: import("url").URL;
    srcDir: import("url").URL;
    publicDir: import("url").URL;
    outDir: import("url").URL;
    cacheDir: import("url").URL;
    compressHTML: boolean;
    base: string;
    trailingSlash: "ignore" | "always" | "never";
    scopedStyleStrategy: "where" | "class" | "attribute";
    integrations: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[];
    build: {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: import("url").URL;
        server: import("url").URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    };
    image: {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    };
    markdown: {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    };
    vite: ViteUserConfig;
    experimental: {
        optimizeHoistedScript: boolean;
    };
    legacy: {};
}, {
    output?: "server" | "static" | "hybrid" | undefined;
    server?: unknown;
    redirects?: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }> | undefined;
    root?: string | undefined;
    srcDir?: string | undefined;
    publicDir?: string | undefined;
    outDir?: string | undefined;
    cacheDir?: string | undefined;
    site?: string | undefined;
    compressHTML?: boolean | undefined;
    base?: string | undefined;
    trailingSlash?: "ignore" | "always" | "never" | undefined;
    scopedStyleStrategy?: "where" | "class" | "attribute" | undefined;
    adapter?: {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    } | undefined;
    integrations?: unknown;
    build?: {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    } | undefined;
    image?: {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    } | undefined;
    markdown?: {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    } | undefined;
    vite?: ViteUserConfig | undefined;
    experimental?: {
        optimizeHoistedScript?: boolean | undefined;
    } | undefined;
    legacy?: {} | undefined;
}>, {
    site?: string | undefined;
    adapter?: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    } | undefined;
    output: "server" | "static" | "hybrid";
    server: {
        headers?: OutgoingHttpHeaders | undefined;
        host: string | boolean;
        port: number;
        open: boolean;
        streaming: boolean;
    };
    redirects: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }>;
    root: import("url").URL;
    srcDir: import("url").URL;
    publicDir: import("url").URL;
    outDir: import("url").URL;
    cacheDir: import("url").URL;
    compressHTML: boolean;
    base: string;
    trailingSlash: "ignore" | "always" | "never";
    scopedStyleStrategy: "where" | "class" | "attribute";
    integrations: {
        name: string;
        hooks: z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    }[];
    build: {
        assetsPrefix?: string | undefined;
        split: boolean;
        format: "file" | "directory";
        client: import("url").URL;
        server: import("url").URL;
        assets: string;
        serverEntry: string;
        redirects: boolean;
        inlineStylesheets: "always" | "never" | "auto";
        excludeMiddleware: boolean;
    };
    image: {
        endpoint?: string | undefined;
        service: {
            entrypoint: string;
            config: Record<string, any>;
        };
        domains: string[];
        remotePatterns: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[];
    };
    markdown: {
        drafts: boolean;
        syntaxHighlight: false | "shiki" | "prism";
        shikiConfig: {
            langs: ILanguageRegistration[];
            theme: Theme | IShikiTheme;
            wrap: boolean | null;
        };
        remarkPlugins: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[];
        rehypePlugins: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[];
        remarkRehype: RemarkRehype;
        gfm: boolean;
        smartypants: boolean;
    };
    vite: ViteUserConfig;
    experimental: {
        optimizeHoistedScript: boolean;
    };
    legacy: {};
}, {
    output?: "server" | "static" | "hybrid" | undefined;
    server?: unknown;
    redirects?: Record<string, string | {
        status: 300 | 301 | 302 | 303 | 304 | 307 | 308;
        destination: string;
    }> | undefined;
    root?: string | undefined;
    srcDir?: string | undefined;
    publicDir?: string | undefined;
    outDir?: string | undefined;
    cacheDir?: string | undefined;
    site?: string | undefined;
    compressHTML?: boolean | undefined;
    base?: string | undefined;
    trailingSlash?: "ignore" | "always" | "never" | undefined;
    scopedStyleStrategy?: "where" | "class" | "attribute" | undefined;
    adapter?: {
        hooks?: ({} & {
            [k: string]: unknown;
        }) | undefined;
        name: string;
    } | undefined;
    integrations?: unknown;
    build?: {
        split?: boolean | undefined;
        format?: "file" | "directory" | undefined;
        client?: string | undefined;
        server?: string | undefined;
        assets?: string | undefined;
        serverEntry?: string | undefined;
        redirects?: boolean | undefined;
        inlineStylesheets?: "always" | "never" | "auto" | undefined;
        excludeMiddleware?: boolean | undefined;
        assetsPrefix?: string | undefined;
    } | undefined;
    image?: {
        endpoint?: string | undefined;
        service?: {
            entrypoint?: string | undefined;
            config?: Record<string, any> | undefined;
        } | undefined;
        domains?: string[] | undefined;
        remotePatterns?: {
            port?: string | undefined;
            protocol?: string | undefined;
            hostname?: string | undefined;
            pathname?: string | undefined;
        }[] | undefined;
    } | undefined;
    markdown?: {
        drafts?: boolean | undefined;
        syntaxHighlight?: false | "shiki" | "prism" | undefined;
        shikiConfig?: {
            langs?: ILanguageRegistration[] | undefined;
            theme?: Theme | IShikiTheme | undefined;
            wrap?: boolean | null | undefined;
        } | undefined;
        remarkPlugins?: (string | [string, any] | RemarkPlugin | [RemarkPlugin, any])[] | undefined;
        rehypePlugins?: (string | [string, any] | RehypePlugin | [RehypePlugin, any])[] | undefined;
        remarkRehype?: RemarkRehype | undefined;
        gfm?: boolean | undefined;
        smartypants?: boolean | undefined;
    } | undefined;
    vite?: ViteUserConfig | undefined;
    experimental?: {
        optimizeHoistedScript?: boolean | undefined;
    } | undefined;
    legacy?: {} | undefined;
}>;
