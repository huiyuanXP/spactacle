import React, { useCallback, useEffect, useRef, useState } from "react";
import type {
  ProjectData,
  ProjectEvent,
} from "../../../packages/contracts/index.js";
import { api } from "./api.js";
import { canonical } from "../../../packages/contracts/canonical.js";
import { useBridge } from "./bridge.js";
import { RequirementsPanel, type Commit } from "./RequirementsPanel.js";
import { ChatWindow } from "./ChatWindow.js";
import { BriefPanel } from "./BriefPanel.js";
export function Workbench({ initial }: { initial: ProjectData }) {
  const [project, setProject] = useState(initial),
    [room, setRoom] = useState(initial.rooms[0].id),
    [selected, setSelected] = useState<string | null>(null),
    [mode, setMode] = useState("3d"),
    [panel, setPanel] = useState(true),
    [chat, setChat] = useState(false),
    [brief, setBrief] = useState(false),
    [busy, setBusy] = useState(false),
    [applying, setApplying] = useState(false),
    [error, setError] = useState(""),
    [sceneNotice, setSceneNotice] = useState(""),
    [saved, setSaved] = useState(true),
    [connected, setConnected] = useState(false),
    [toolStatus, setToolStatus] = useState("");
  const current = useRef(project);
  current.current = project;
  const loadedScene = useRef(canonical(initial.scene)),
    loaded = useRef(false);
  const bridge = useBridge(project.id, setSelected, () => setSaved(false));
  const merge = useCallback(
    (incoming: ProjectData) =>
      setProject((p) => {
        if (incoming.id !== p.id || incoming.version < p.version) return p;
        return {
          ...incoming,
          messages: incoming.messages.map((m) => {
            const old = p.messages.find((o) => o.id === m.id);
            return m.status === "running" &&
              old?.status === "running" &&
              old.content.length > m.content.length
              ? { ...m, content: old.content }
              : m;
          }),
        };
      }),
    [],
  );
  const refresh = useCallback(async () => {
    const p = await api<ProjectData>(`/api/projects/${initial.id}`);
    merge(p);
    return p;
  }, [initial.id, merge]);
  const run = useCallback(async (task: () => Promise<void>) => {
    setError("");
    try {
      await task();
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);
  const commit: Commit = useCallback(
    async (path, body) => {
      try {
        const p = await api<ProjectData>(`/api/projects/${initial.id}${path}`, {
          expected_version: current.current.version,
          request_id: crypto.randomUUID(),
          ...body,
        });
        merge(p);
        return p;
      } catch (err) {
        if ((err as any).status === 409) await refresh();
        throw err;
      }
    },
    [initial.id, merge, refresh],
  );
  useEffect(() => {
    const key = `roomnote:last-event:${initial.id}`;
    let last = Number(sessionStorage.getItem(key) || 0);
    if (!Number.isSafeInteger(last) || last < 0) last = 0;
    let disposed = false;
    let events: EventSource;
    const connect = () => {
    events?.close();
    events = new EventSource(
      `/api/projects/${initial.id}/events?after=${last}`,
    );
    events.onopen = () => {
      setConnected(true);
      void refresh().catch(() => {});
    };
    events.onerror = () => setConnected(false);
    events.onmessage = (e) => {
      if (disposed) return;
      let event: ProjectEvent;
      try {
        event = JSON.parse(e.data);
      } catch {
        return;
      }
      if (
        event.project_id !== initial.id ||
        !Number.isSafeInteger(event.event_id) ||
        event.event_id <= last
      )
        return;
      last = event.event_id;
      sessionStorage.setItem(key, String(last));
      if (event.type === "message_progress") {
        const a = event.payload;
        setProject((p) => ({
          ...p,
          messages: p.messages.map((m) =>
            m.id === a.message_id &&
            m.run_id === a.run_id &&
            m.status === "running"
              ? { ...m, content: String(a.content) }
              : m,
          ),
        }));
      } else if (event.type === "tool_status") {
        const a = event.payload;
        setToolStatus(
          `${a.name === "read_consultation" ? "读取原话与需求" : "生成待确认建议"} · ${a.status === "running" ? "进行中" : a.status === "failed" ? "未通过校验" : "完成"}`,
        );
      } else void refresh().catch(() => {});
    };
    };
    const offline = () => { events?.close(); setConnected(false); };
    const online = () => { if (!disposed) connect(); };
    window.addEventListener("offline", offline);
    window.addEventListener("online", online);
    connect();
    return () => {
      disposed = true;
      events?.close();
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, [initial.id, refresh]);
  useEffect(() => {
    if (bridge.ready)
      void run(async () => {
        await bridge.call("load", {
          scene: current.current.scene,
          version: current.current.version,
        });
        loadedScene.current = canonical(current.current.scene);
        loaded.current = true;
        setSaved(true);
        await bridge.call("focus", { room_id: room });
      });
  }, [bridge.ready]);
  useEffect(() => {
    if (bridge.ready && loaded.current)
      void run(async () => {
        const remoteScene = canonical(project.scene);
        if (remoteScene !== loadedScene.current && saved) {
          await bridge.call("load", {
            scene: project.scene,
            version: project.version,
          });
          loadedScene.current = remoteScene;
        } else await bridge.call("version", { version: project.version });
      });
  }, [project.version, bridge.ready]);
  const focus = async (id: string) => {
    await bridge.call("focus", { room_id: id });
    setRoom(id);
  };
  const keyboard = (locked: boolean) => {
    if (bridge.ready) void bridge.call("keyboard", { locked }).catch(() => {});
  };
  const saveScene = async () => {
    setBusy(true);
    try {
      if (canonical(current.current.scene) !== loadedScene.current)
        throw new Error("服务器场景已更新。请先重新载入，避免覆盖其他修改。");
      const snapshot = await bridge.call("snapshot");
      const p = await commit("/scene/save", { scene: snapshot.scene });
      await bridge.call("load", { scene: p.scene, version: p.version });
      loadedScene.current = canonical(p.scene);
      setSaved(true);
    } finally {
      setBusy(false);
    }
  };
  const applyToScene = async () => {
    setApplying(true);
    setSceneNotice("");
    try {
      const requirements = current.current.requirements
        .filter(
          (r) =>
            r.room_id === room &&
            r.answer_state === "answered" &&
            r.value !== null &&
            r.confirmation_state !== "pending",
        )
        .map((r) => ({ field_key: r.field_key, value: r.value }));
      if (!requirements.length)
        throw new Error("当前房间还没有可应用的已确认需求。");
      const result = await bridge.call("apply_requirements", {
        room_id: room,
        requirements,
      });
      setSaved(false);
      setSceneNotice(
        `已将 ${result.changed} 项场景调整应用到${project.rooms.find((r) => r.id === room)?.name || "当前房间"}；请检查后点击“保存项目”。`,
      );
    } finally {
      setApplying(false);
    }
  };
  const send = async (text: string, roomId: string) => {
    try {
      const result = await api<{ project: ProjectData }>(
        `/api/projects/${project.id}/chat`,
        {
          room_id: roomId,
          text,
          expected_version: current.current.version,
          request_id: crypto.randomUUID(),
        },
      );
      merge(result.project);
    } catch (err) {
      if ((err as any).status === 409) await refresh();
      throw err;
    }
  };
  const cancel = async (runId: string) => {
    await api(`/api/projects/${project.id}/chat/cancel`, { run_id: runId });
  };
  return (
    <div className="workbench">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ROOMNOTE 首页">
          <svg width="27" height="27" viewBox="0 0 28 28" fill="none">
            <path
              d="M4 12 14 5l10 7v12H4V12Z M10 24V14h8v10"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
          <b>ROOMNOTE</b>
        </a>
        <span className="nav-separator" />
        <div className="project-name">
          <strong>{project.name}</strong>
          <small>
            {saved ? "后端已保存" : "场景预览，尚未保存"} · v{project.version} ·{" "}
            {connected ? "已同步" : "正在重连"}
          </small>
        </div>
        <div className="mode-switch">
          {[
            ["2d", "2D 平面"],
            ["3d", "3D 空间"],
            ["walk", "漫游"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={mode === value ? "active" : ""}
              disabled={!bridge.ready}
              onClick={() =>
                void run(async () => {
                  await bridge.call("mode", { mode: value });
                  setMode(value);
                })
              }
            >
              {label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <a href="/todo" target="_blank" rel="noreferrer">
            开发看板 ↗
          </a>
          <button onClick={() => setBrief(true)}>需求任务书</button>
          <button
            className="primary"
            disabled={busy || !bridge.ready}
            onClick={() => void run(saveScene)}
          >
            {busy ? "保存中…" : "保存项目"}
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="scene">
          <iframe
            ref={bridge.frame}
            src={`/engine/embed?project=${encodeURIComponent(project.id)}`}
            title="OpenPlan3D 房间视图"
            allow="fullscreen"
          />
          <div className="scene-label">
            <span className="status-dot" />
            可编辑空间<span className="muted">/</span>
            {project.rooms.find((r) => r.id === room)?.name}
          </div>
          <div className="room-pills">
            {project.rooms.map((r, i) => (
              <button
                className={r.id === room ? "active" : ""}
                key={r.id}
                onClick={() => void run(() => focus(r.id))}
              >
                <span>0{i + 1}</span>
                {r.name}
              </button>
            ))}
          </div>
          <div className="scene-controls">
            <button
              aria-label="旋转视角"
              onClick={() =>
                void run(async () => {
                  await bridge.call("camera", { action: "orbit" });
                })
              }
            >
              ↻
            </button>
            <button
              aria-label="放大"
              onClick={() =>
                void run(async () => {
                  await bridge.call("camera", { action: "zoomIn" });
                })
              }
            >
              ＋
            </button>
            <button
              aria-label="缩小"
              onClick={() =>
                void run(async () => {
                  await bridge.call("camera", { action: "zoomOut" });
                })
              }
            >
              −
            </button>
            <button
              aria-label="聚焦当前房间"
              onClick={() => void run(() => focus(room))}
            >
              ⌖
            </button>
          </div>
          <div className="scene-footer">
            <span>OpenPlan3D · 原生可编辑场景</span>
            <span>拖动旋转 · 滚轮缩放</span>
          </div>
          {selected && (
            <div className="selection">
              已选中 <b>{selected}</b>
              <button
                onClick={() =>
                  void run(async () => {
                    const s = await bridge.call("snapshot");
                    await bridge.call("update", {
                      object_id: selected,
                      expected_version: s.version,
                      patch: { color: "#b7c9ae" },
                    });
                    setSaved(false);
                  })
                }
              >
                预览鼠尾草绿
              </button>
            </div>
          )}
          <div className="starter-actions">
            <button
              className="apply-scene"
              disabled={busy || applying || !bridge.ready}
              onClick={() => void run(applyToScene)}
            >
              {applying ? "应用中…" : "应用到场景"}
            </button>
            <button
              onClick={() =>
                void run(async () => {
                  await bridge.call("select", { object_id: "sofa-main" });
                })
              }
            >
              选择示例沙发
            </button>
            <button
              onClick={() =>
                void run(async () => {
                  const p = await refresh();
                  await bridge.call("load", {
                    scene: p.scene,
                    version: p.version,
                  });
                  loadedScene.current = canonical(p.scene);
                  setSaved(true);
                })
              }
            >
              重新载入场景
            </button>
          </div>
          {sceneNotice && (
            <div className="scene-notice" role="status">
              {sceneNotice}
            </div>
          )}
          <button
            className="chat-launcher"
            aria-expanded={chat}
            onClick={() => setChat((x) => !x)}
          >
            <span>✳</span>聊聊你的家 <small>AI 咨询</small>
          </button>
          {project.rooms.map((r) => (
            <ChatWindow
              key={r.id}
              project={project}
              roomId={r.id}
              visible={chat && r.id === room}
              onClose={() => setChat(false)}
              onSend={send}
              commit={commit}
              onCancel={cancel}
              keyboard={keyboard}
              toolStatus={toolStatus}
              onError={setError}
            />
          ))}
        </section>
        {panel ? (
          <RequirementsPanel
            project={project}
            roomId={room}
            focus={(id) => void run(() => focus(id))}
            commit={commit}
            onClose={() => setPanel(false)}
            onError={setError}
          />
        ) : (
          <button className="panel-reopen" onClick={() => setPanel(true)}>
            ☷ 需求清单
          </button>
        )}
      </main>
      {brief && (
        <BriefPanel
          project={project}
          onClose={() => setBrief(false)}
          commit={commit}
          onError={setError}
        />
      )}
      {error && (
        <div className="toast error" role="alert">
          {error}
          <button aria-label="关闭错误" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
