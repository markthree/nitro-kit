import { defineEventHandler, fromNodeMiddleware, toWebRequest } from "h3";

type AppType = "express" | "fastify" | "hono" | "koa";

/**
 * @example
 * ```ts
 * // in nitro middleware
 * import { appToEvent } from "nitro-unkit"
 *
 * // some express logic
 *
 * export default appToEvent(app, 'express')
 * ```
 * @linkcode https://github.com/manniL/alexander-lichter-other-backend-in-nuxt
 */
export function appToEvent(app: any, type: AppType) {
    if (typeof type !== "string") {
        throw new Error(
            `type is required and is either 'express', 'fastify', 'hono' or 'koa'`,
        );
    }

    switch (type) {
        case "express":
            return fromNodeMiddleware(app);
        case "koa":
            return fromNodeMiddleware(app.callback());
        case "fastify":
            return defineEventHandler(async (event) => {
                await app.ready();
                app.server.emit("request", event.node.req, event.node.res);
            });
        case "hono":
            return defineEventHandler((event) => {
                event.node.req.originalUrl = ""; // /api/hono/
                const webReq = toWebRequest(event);
                return app.fetch(webReq);
            });
        default:
            throw new Error(
                `The type can only be 'express', 'fastify', 'hono' or 'koa'`,
            );
    }
}
