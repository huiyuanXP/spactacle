import { PGlite } from "@electric-sql/pglite";
import { randomUUID, createHash } from "node:crypto";
import type {
  ProjectData,
  ProjectEvent,
} from "../../packages/contracts/index.js";
import { sampleProject } from "./sample.js";
import { canonical } from "../../packages/contracts/canonical.js";
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}
export class Store {
  db: PGlite;
  constructor(path?: string) {
    this.db = new PGlite(path);
  }
  async init() {
    await this.db
      .exec(`CREATE TABLE IF NOT EXISTS projects(id text PRIMARY KEY, owner_id text NOT NULL, version integer NOT NULL, data jsonb NOT NULL);
      CREATE TABLE IF NOT EXISTS commands(project_id text NOT NULL, request_id text NOT NULL, fingerprint text NOT NULL, response jsonb NOT NULL, PRIMARY KEY(project_id,request_id));
      CREATE TABLE IF NOT EXISTS events(event_id bigserial PRIMARY KEY, project_id text NOT NULL, project_version integer NOT NULL, type text NOT NULL, payload jsonb NOT NULL);
      CREATE INDEX IF NOT EXISTS events_project_idx ON events(project_id,event_id);
      CREATE TABLE IF NOT EXISTS sessions(token_hash text PRIMARY KEY, owner_id text NOT NULL, expires_at timestamptz NOT NULL);
      UPDATE projects SET data=jsonb_set(data,'{brief_version}',to_jsonb(version)) WHERE NOT data ? 'brief_version';`);
  }
  async list(owner: string) {
    return (
      await this.db.query<{ id: string; name: string; version: number }>(
        "SELECT id, data->>'name' AS name,version FROM projects WHERE owner_id=$1 ORDER BY id",
        [owner],
      )
    ).rows;
  }
  async create(owner: string) {
    const p = sampleProject(randomUUID());
    await this.db.query("INSERT INTO projects VALUES ($1,$2,$3,$4)", [
      p.id,
      owner,
      0,
      JSON.stringify(p),
    ]);
    return p;
  }
  async get(id: string, owner: string) {
    const row = (
      await this.db.query<{ data: ProjectData }>(
        "SELECT data FROM projects WHERE id=$1 AND owner_id=$2",
        [id, owner],
      )
    ).rows[0];
    if (!row) throw new HttpError(404, "项目不存在或无权访问");
    return row.data;
  }
  async mutate(
    id: string,
    owner: string,
    requestId: string,
    expectedVersion: number | null,
    kind: string,
    input: unknown,
    fn: (p: ProjectData) => void,
    actor = "owner",
  ) {
    const hash = createHash("sha256")
      .update(canonical({ kind, input }))
      .digest("hex");
    return this.db.transaction(async (tx) => {
      const row = (
        await tx.query<{ data: ProjectData; version: number }>(
          "SELECT data,version FROM projects WHERE id=$1 AND owner_id=$2 FOR UPDATE",
          [id, owner],
        )
      ).rows[0];
      if (!row) throw new HttpError(404, "项目不存在或无权访问");
      const old = (
        await tx.query<{ fingerprint: string; response: ProjectData }>(
          "SELECT fingerprint,response FROM commands WHERE project_id=$1 AND request_id=$2",
          [id, requestId],
        )
      ).rows[0];
      if (old) {
        if (old.fingerprint !== hash)
          throw new HttpError(409, "request_id 已用于不同操作");
        return old.response;
      }
      if (expectedVersion !== null && row.version !== expectedVersion)
        throw new HttpError(
          409,
          `版本冲突：服务器 v${row.version}。请重新读取后确认，未覆盖任何字段。`,
        );
      const p = row.data;
      fn(p);
      p.version = row.version + 1;
      if (
        [
          "requirements_changed",
          "suggestions_adopted",
          "scene_changed",
          "extracted_answer",
          "chat_started",
        ].includes(kind)
      )
        p.brief_version = (p.brief_version || 0) + 1;
      p.revisions.push({
        id: randomUUID(),
        version: p.version,
        actor,
        kind,
        request_id: requestId,
        at: new Date().toISOString(),
      });
      await tx.query("UPDATE projects SET version=$1,data=$2 WHERE id=$3", [
        p.version,
        JSON.stringify(p),
        id,
      ]);
      await tx.query("INSERT INTO commands VALUES ($1,$2,$3,$4)", [
        id,
        requestId,
        hash,
        JSON.stringify(p),
      ]);
      await tx.query(
        "INSERT INTO events(project_id,project_version,type,payload) VALUES ($1,$2,$3,$4)",
        [id, p.version, kind, JSON.stringify({ version: p.version })],
      );
      return p;
    });
  }
  async event(
    id: string,
    version: number,
    type: string,
    payload: Record<string, unknown>,
  ) {
    const r = await this.db.query<{ event_id: number }>(
      "INSERT INTO events(project_id,project_version,type,payload) VALUES ($1,$2,$3,$4) RETURNING event_id",
      [id, version, type, JSON.stringify(payload)],
    );
    return Number(r.rows[0].event_id);
  }
  async events(id: string, after: number) {
    const r = await this.db.query<ProjectEvent>(
      "SELECT * FROM events WHERE project_id=$1 AND event_id>$2 ORDER BY event_id LIMIT 500",
      [id, after],
    );
    return r.rows.map((e) => ({ ...e, event_id: Number(e.event_id) }));
  }
  async close() {
    await this.db.close();
  }
  async replay(
    id: string,
    owner: string,
    requestId: string,
    kind: string,
    input: unknown,
  ): Promise<ProjectData | null> {
    await this.get(id, owner);
    const old = (
      await this.db.query<{ fingerprint: string; response: ProjectData }>(
        "SELECT fingerprint,response FROM commands WHERE project_id=$1 AND request_id=$2",
        [id, requestId],
      )
    ).rows[0];
    if (!old) return null;
    const fingerprint = createHash("sha256")
      .update(canonical({ kind, input }))
      .digest("hex");
    if (old.fingerprint !== fingerprint)
      throw new HttpError(409, "request_id 已用于不同操作");
    return old.response;
  }
  async streamProgress(
    id: string,
    owner: string,
    runId: string,
    content: string,
  ) {
    // Transient message progress is atomic with its event, but is not a new brief revision.
    await this.db.transaction(async (tx) => {
      const row = (
        await tx.query<{ data: ProjectData }>(
          "SELECT data FROM projects WHERE id=$1 AND owner_id=$2 FOR UPDATE",
          [id, owner],
        )
      ).rows[0];
      if (!row) return;
      const p = row.data,
        m = p.messages.find(
          (m) => m.run_id === runId && m.role === "assistant",
        );
      if (!m || m.status !== "running") return;
      m.content = content;
      await tx.query("UPDATE projects SET data=$1 WHERE id=$2", [
        JSON.stringify(p),
        id,
      ]);
      await tx.query(
        "INSERT INTO events(project_id,project_version,type,payload) VALUES ($1,$2,$3,$4)",
        [
          id,
          p.version,
          "message_progress",
          JSON.stringify({
            run_id: runId,
            message_id: m.id,
            content,
            room_id: m.room_id,
          }),
        ],
      );
    });
  }
  async recoverInterruptedRuns() {
    const rows = (
      await this.db.query<{ id: string; owner_id: string; data: ProjectData }>(
        "SELECT id,owner_id,data FROM projects",
      )
    ).rows;
    for (const row of rows)
      if (row.data.messages.some((m) => m.status === "running"))
        await this.mutate(
          row.id,
          row.owner_id,
          randomUUID(),
          null,
          "chat_recovered",
          {},
          (p) => {
            for (const m of p.messages)
              if (m.status === "running") {
                m.status = "failed";
                m.content += "\n\n连接中断；已有内容已保存，请重新发送以继续。";
              }
          },
          "system",
        );
  }
}
