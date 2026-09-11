import Fastify from "fastify";
import cookie from "@fastify/cookie";
import staticPlugin from "@fastify/static";
import rateLimit from "@fastify/rate-limit";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { z, ZodError } from "zod";
import { Command, Id, Scene } from "../../packages/contracts/index.js";
import { config, root } from "./config.js";
import { Store, HttpError } from "./store.js";
import { boardPayload } from "./board.js";
import { registerBusiness } from "./business-routes.js";
import { syncRoomGeometry } from "./scene.js";
export type AppOptions = {
  accessCode?: string;
  origin?: string;
  assets?: boolean;
};
export async function buildApp(store: Store, options: AppOptions = {}) {
  const app = Fastify({
    logger: false,
    bodyLimit: 2 * 1024 * 1024,
    forceCloseConnections: true,
  });
  const origin = options.origin || config.publicOrigin;
  const access = options.accessCode || config.accessCode;
  const hash = (value: string) =>
    createHash("sha256").update(value).digest("hex");
  await app.register(cookie);
  await app.register(rateLimit, {
    global: true,
    max: 240,
    timeWindow: "1 minute",
  });
  app.setErrorHandler((err, _req, reply) => {
    const status =
      err instanceof ZodError
        ? 400
        : (err as { statusCode?: number }).statusCode || 500;
    reply
      .code(status)
      .send({
        error:
          status === 500
            ? "服务器内部错误；已保留原有数据"
            : err instanceof Error
              ? err.message
              : "请求无效",
      });
  });
  app.addHook("onRequest", async (req, reply) => {
    reply
      .header("X-Content-Type-Options", "nosniff")
      .header("Referrer-Policy", "same-origin");
    reply.header(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; worker-src 'self' blob:",
    );
    if (req.url.startsWith("/api/")) reply.header("Cache-Control", "no-store");
    if (
      !["GET", "HEAD", "OPTIONS"].includes(req.method) &&
      req.headers.origin &&
      req.headers.origin !== origin
    )
      throw new HttpError(403, "来源校验失败");
    if (
      req.url.startsWith("/api/") &&
      req.url.split("?")[0] !== "/api/session/login"
    ) {
      const token = req.cookies.roomnote_session;
      if (!token) throw new HttpError(401, "请先输入工作台访问口令");
      const row = (
        await store.db.query<{ owner_id: string }>(
          "SELECT owner_id FROM sessions WHERE token_hash=$1 AND expires_at>now()",
          [hash(token)],
        )
      ).rows[0];
      if (!row) throw new HttpError(401, "会话已过期，请重新登录");
      (req as any).owner = row.owner_id;
    }
  });
  app.post(
    "/api/session/login",
    { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } },
    async (req, reply) => {
      const b = z.object({ code: z.string().min(1).max(200) }).parse(req.body);
      if (
        !timingSafeEqual(Buffer.from(hash(b.code)), Buffer.from(hash(access)))
      )
        throw new HttpError(401, "访问口令不正确");
      const token = randomBytes(32).toString("base64url");
      await store.db.query(
        "INSERT INTO sessions VALUES ($1,'owner',now()+interval '7 days')",
        [hash(token)],
      );
      reply.setCookie("roomnote_session", token, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: origin.startsWith("https:"),
        maxAge: 604800,
      });
      return { ok: true };
    },
  );
  app.get("/api/session", async () => ({ authenticated: true, role: "owner" }));
  app.post("/api/session/logout", async (req, reply) => {
    await store.db.query("DELETE FROM sessions WHERE token_hash=$1", [
      hash(req.cookies.roomnote_session || ""),
    ]);
    reply.clearCookie("roomnote_session", { path: "/" });
    return { ok: true };
  });
  app.get("/api/projects", async (req) => ({
    projects: await store.list((req as any).owner),
  }));
  app.post("/api/projects", async (req) => store.create((req as any).owner));
  app.get("/api/projects/:id", async (req) =>
    store.get(Id.parse((req.params as any).id), (req as any).owner),
  );
  app.post("/api/projects/:id/scene/save", async (req) => {
    const b = Command.extend({ scene: Scene }).parse(req.body),
      id = Id.parse((req.params as any).id);
    if (b.scene.id !== id) throw new HttpError(400, "场景与项目 ID 不一致");
    return store.mutate(
      id,
      (req as any).owner,
      b.request_id,
      b.expected_version,
      "scene_changed",
      b.scene,
      (p) => {
        p.scene = b.scene;
        syncRoomGeometry(p);
      },
    );
  });
  app.get("/api/projects/:id/events", async (req, reply) => {
    const id = Id.parse((req.params as any).id);
    await store.get(id, (req as any).owner);
    const q = req.headers["last-event-id"] ?? (req.query as any).after ?? "0";
    let after = z.coerce.number().int().nonnegative().parse(q);
    reply.hijack();
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    let closed = false,
      busy = false;
    reply.raw.write("retry: 1000\n\n");
    const pump = async () => {
      if (closed || busy) return;
      busy = true;
      try {
        for (const e of await store.events(id, after)) {
          if (closed) break;
          reply.raw.write(`id: ${e.event_id}\ndata: ${JSON.stringify(e)}\n\n`);
          after = e.event_id;
        }
      } catch {
        if (!closed) reply.raw.end();
      } finally {
        busy = false;
      }
    };
    const interval = setInterval(() => void pump(), 250),
      heartbeat = setInterval(() => {
        if (!closed) reply.raw.write(": heartbeat\n\n");
      }, 15000);
    reply.raw.on("close", () => {
      closed = true;
      clearInterval(interval);
      clearInterval(heartbeat);
    });
    await pump();
  });
  registerBusiness(app, store);
  app.get("/healthz", async () => ({
    ok: true,
    service: "renovation-workbench",
    pid: process.pid,
  }));
  app.get("/todo/api/board", async () => boardPayload());
  for (const route of ["/todo", "/todo/"])
    app.get(route, async (_req, reply) =>
      reply
        .type("text/html; charset=utf-8")
        .send(readFileSync(resolve(root, "taskboard/index.html"))),
    );
  if (options.assets !== false) {
    const enginePath = resolve(root, "vendor/openplan3d/build/handler.js");
    if (existsSync(enginePath)) {
      const { handler } = await import(pathToFileURL(enginePath).href);
      app.get("/engine/*", async (req, reply) => {
        const path = req.url.split("?")[0];
        if (
          !(
            path === "/engine/embed" ||
            path === "/engine/embed/" ||
            path.startsWith("/engine/_app/") ||
            path.startsWith("/engine/models/") ||
            path.startsWith("/engine/textures/")
          )
        )
          return reply.code(404).send({ error: "Not found" });
        reply.hijack();
        handler(req.raw, reply.raw, () => {
          reply.raw.writeHead(404);
          reply.raw.end();
        });
      });
    }
    const web = resolve(root, "apps/web/dist");
    if (existsSync(web)) {
      await app.register(staticPlugin, {
        root: web,
        prefix: "/",
        wildcard: false,
      });
      app.setNotFoundHandler((req, reply) => {
        if (
          req.url.startsWith("/api/") ||
          req.url.startsWith("/engine/") ||
          req.url.includes(".") ||
          req.url.startsWith("/todo/")
        )
          return reply.code(404).send({ error: "Not found" });
        return reply
          .type("text/html")
          .send(readFileSync(resolve(web, "index.html")));
      });
    }
  }
  return app;
}
