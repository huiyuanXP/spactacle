import React, { useEffect, useRef, useState } from "react";
import {
  AssistantRuntimeProvider,
  useExternalStoreRuntime,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  type ThreadMessageLike,
} from "@assistant-ui/react";
import type {
  ProjectData,
  ChatMessage,
} from "../../../packages/contracts/index.js";
import { api } from "./api.js";
import type { AskQuestion } from "../../../packages/contracts/ask-question.js";
import type { Commit } from "./RequirementsPanel.js";
import { QuestionCard } from "./QuestionCard.js";
function UserMessage() {
  return (
    <MessagePrimitive.Root className="chat-message user">
      <span className="message-role">你</span>
      <MessagePrimitive.Parts />
    </MessagePrimitive.Root>
  );
}
function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="chat-message assistant">
      <span className="message-role">ROOMNOTE · 咨询助手</span>
      <MessagePrimitive.Parts />
    </MessagePrimitive.Root>
  );
}
export function ChatWindow({
  project,
  roomId,
  visible,
  onClose,
  onSend,
  onCancel,
  keyboard,
  toolStatus,
  onError,
  commit,
}: {
  project: ProjectData;
  roomId: string;
  visible: boolean;
  onClose: () => void;
  onSend: (text: string, room: string) => Promise<void>;
  onCancel: (runId: string) => Promise<void>;
  keyboard: (locked: boolean) => void;
  toolStatus: string;
  onError: (text: string) => void;
  commit: Commit;
}) {
  const messages = project.messages.filter((m) => m.room_id === roomId);
  const running = messages.find((m) => m.status === "running");
  const room = project.rooms.find((r) => r.id === roomId)!;
  const [questions, setQuestions] = useState<AskQuestion[]>([]);
  const dirtyQuestions = useRef(new Set<string>());
  const renderQuestion = (q: AskQuestion) => <QuestionCard key={q.id} question={q}
    projectVersion={project.version} current={project.requirements.find(r=>r.room_id===q.room_id&&r.field_key===q.field_key)}
    commit={commit} keyboard={keyboard} onError={onError} onDiscuss={text=>onSend(text,roomId)}
    onDirty={(id,dirty)=>{if(dirty)dirtyQuestions.current.add(id);else dirtyQuestions.current.delete(id);}}
    onAnswered={id=>setQuestions(previous=>previous.filter(q=>q.id!==id))}/>;
  const runtime = useExternalStoreRuntime<ChatMessage>({
    messages,
    isRunning: !!running,
    convertMessage: (m): ThreadMessageLike => ({
      id: m.id,
      role: m.role,
      createdAt: new Date(m.created_at),
      content: [{ type: "text", text: m.content || "正在读取需求…" }],
      ...(m.role === "assistant"
        ? {
            status:
              m.status === "running"
                ? { type: "running" }
                : { type: "complete", reason: "stop" },
          }
        : {}),
    }),
    onNew: async (message) => {
      const text = message.content
        .filter((c) => c.type === "text")
        .map((c) => (c.type === "text" ? c.text : ""))
        .join("\n");
      try {
        await onSend(text, roomId);
      } catch (error) {
        onError((error as Error).message);
        throw error;
      }
    },
    onCancel: async () => {
      if (running) await onCancel(running.run_id);
    },
  });
  useEffect(() => {
    let active = true;
    void api<{ questions: typeof questions }>(
      `/api/projects/${project.id}/questions?room_id=${roomId}`,
    )
      .then((r) => {
        if (active) setQuestions(previous => [
          ...previous.filter(q=>dirtyQuestions.current.has(q.id)),
          ...r.questions.filter(q=>!dirtyQuestions.current.has(q.id)),
        ].slice(0,2));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [project.id, project.version, roomId]);
  return (
    <section
      className="chat-window"
      hidden={!visible}
      aria-label={`${room.name}咨询聊天`}
    >
      <AssistantRuntimeProvider runtime={runtime}>
        <div className="chat-header">
          <div className="assistant-avatar">✳</div>
          <div>
            <strong>和空间顾问聊聊</strong>
            <small>当前聚焦 · {room.name}</small>
          </div>
          <button
            className="icon-button"
            aria-label="收起聊天"
            onClick={() => {
              keyboard(false);
              onClose();
            }}
          >
            −
          </button>
        </div>
        <ThreadPrimitive.Root className="chat-thread">
          <ThreadPrimitive.Viewport className="chat-viewport">
            <ThreadPrimitive.Empty>
              <div className="chat-welcome">
                <span className="eyebrow">A HOME THAT FEELS LIKE YOU</span>
                <h3>先从生活习惯开始。</h3>
                <p>
                  告诉我这个房间准备给谁使用、希望有哪些功能。我会先给出推荐，你可以逐项采用或修改。
                </p>
                <small>
                  图片和视频链接可作为参考记录；本周版本尚不解析媒体内容。
                </small>
              </div>
            </ThreadPrimitive.Empty>
            <ThreadPrimitive.Messages
              components={{ UserMessage, AssistantMessage }}
            />
          <div className="question-cards">
            {questions[0] && renderQuestion(questions[0])}
            {questions.length>1 && <details className="ask-more"><summary>另一个待确认问题（可稍后处理）</summary>{questions.slice(1).map(renderQuestion)}</details>}
          </div>
          </ThreadPrimitive.Viewport>
          {running && (
            <div className="chat-tool-status" role="status">
              {toolStatus || "正在整理信息…"}
              <button onClick={() => void onCancel(running.run_id)}>
                停止本轮
              </button>
            </div>
          )}
          <ComposerPrimitive.Root className="chat-composer">
            <ComposerPrimitive.Input
              aria-label="咨询消息"
              placeholder={`说说你对${room.name}的想法…`}
              rows={2}
              onFocus={() => keyboard(true)}
              onBlur={() => keyboard(false)}
            />
            <div className="composer-footer">
              <small>建议由你确认 · 输入时锁定 3D 快捷键</small>
              <ComposerPrimitive.Send
                className="primary"
                aria-label="发送咨询消息"
              >
                发送 ↑
              </ComposerPrimitive.Send>
            </div>
          </ComposerPrimitive.Root>
        </ThreadPrimitive.Root>
      </AssistantRuntimeProvider>
    </section>
  );
}
