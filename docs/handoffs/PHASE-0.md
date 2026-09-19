## 2026-09-16 Paper UI publication

Scoped03/04/09+07 extension published as `paper-ui-20260916T150735Z` at /new-ui, existing4173. Exact evidence/failures and independent collaboration boundary: PAPER-UI-20260916.md; active fallback and backup: ../DEPLOYMENT.md. This does not close Week3.

## 2026-09-15 production update — Agent / intake v2

Scoped03/04/05/09 extension and07 correction deployed as `intake-v2-20260915T083433Z`. Historical phase validation remains below; current release evidence, failures and boundaries are in `AGENT-INTAKE-V2.md`, operating/rollback paths in `../DEPLOYMENT.md`.48/48 unit/API, typecheck/build,14 distinct browser scenarios via12/14+2/2, frozen startup, consistent backup and42 production verification groups passed. No whole-house/Ticket14 completion or MCP reset is implied.

# Phase 0 — 第1周 v0.2
状态：Week 1 的 01–05 已逐票验收完成，正式工作台已部署。完整证据见 `CURRENT.md`、`../WEEK1-VALIDATION.md`；运维见 `../DEPLOYMENT.md`。

## 本周目标
场景主界面与可保存咨询：OpenPlan3D接入先行。

## 任务与入口
- Ticket 01：OpenPlan3D接入与可恢复工作台；依赖 无。详见 ../../.scratch/openplan3d-consultation/issues/01.md。
- Ticket 02：右侧房间需求面板与房间定位；依赖 1。详见 ../../.scratch/openplan3d-consultation/issues/02.md。
- Ticket 03：悬浮聊天与Pi流式咨询；依赖 1。详见 ../../.scratch/openplan3d-consultation/issues/03.md。
- Ticket 04：推荐式追问与一键采用建议；依赖 2, 3。详见 ../../.scratch/openplan3d-consultation/issues/04.md。
- Ticket 05：初步需求任务书与审查；依赖 4。详见 ../../.scratch/openplan3d-consultation/issues/05.md。

## 验收
每票Acceptance criteria逐条通过并附证据；不得把ready-for-agent当成已完成。完整规格与资源假设见 ../../.scratch/openplan3d-consultation/PLAN.md。
本周需覆盖草图的对应交互并保存验证记录。无AI生图；3D由OpenPlan3D实现。

## 实际交接记录
- 已交付：React/assistant-ui + 真实 OpenPlan3D、房间需求、Pi 咨询、显式采用、五部分任务书与独立证据审查。
- 本机续验：15 项逻辑/API 测试，类型与生产构建，2 个引擎/工作流浏览器测试、1 个真实模型网页走查、5 组提问组件检查，桌面/平板/手机截图。
- 修复：家具真实鼠标点选、聚焦角度、重复引擎控件、离线重连、TIME_WAIT 预检。
- 发布：原 4173 看板身份核实后停止；systemd 工作台接管并启用自启；公网首页、/todo、16票 API、访问隔离和服务重启已验证。隧道未改。
- 边界：未开展设计师访谈、实体手机键盘/GPU验证或专业核实；未重启整机。重启验收的生产项目列表为空，场景持久化由隔离合成数据证明。
- 下一步：本轮 Week 1 已完成；后续明确授权 Week 2 后从 06 开始，不自动扩展本轮范围。
