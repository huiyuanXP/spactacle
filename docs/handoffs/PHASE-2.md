# Phase 2 — 第3周 v0.2
状态：待实现；本轮仅重生成计划与tickets。

## 本周目标
风险可追溯、撤销、设计师协作与可再编辑交付。

## 任务与入口
- Ticket 11：家具风险提示与专业核实；依赖 5, 10。详见 ../../.scratch/openplan3d-consultation/issues/11.md。
- Ticket 12：统一修订历史与撤销；依赖 7, 8, 10。详见 ../../.scratch/openplan3d-consultation/issues/12.md。
- Ticket 13：设计师看板与角色协作；依赖 5, 6。详见 ../../.scratch/openplan3d-consultation/issues/13.md。
- Ticket 14：可编辑方案与任务书导出；依赖 11, 12, 13。详见 ../../.scratch/openplan3d-consultation/issues/14.md。
- Ticket 15：视频链接理解与证据定位；依赖 9。详见 ../../.scratch/openplan3d-consultation/issues/15.md。
- Ticket 16：完整演示与部署恢复验收；依赖 9, 14, 15。详见 ../../.scratch/openplan3d-consultation/issues/16.md。

## 验收
每票Acceptance criteria逐条通过并附证据；不得把ready-for-agent当成已完成。完整规格与资源假设见 ../../.scratch/openplan3d-consultation/PLAN.md。
本周需覆盖草图的对应交互并保存验证记录。无AI生图；3D由OpenPlan3D实现。

## 实际交接记录
- 已完成：本次计划和ticket生成。
- 应用实现：未开始。
- 验证：文档结构和依赖检查；产品功能验收未执行。
- 下一步：读取活动指令、真实仓库状态和依赖证据，选择未阻塞ticket编译Goal。
- 人工阻塞：设计师访谈、专业安全核实不冒充已完成。


## 展示部署与任务看板（2026-09-11 追加）
- 展示入口固定为 `http://127.0.0.1:4173`，经现有 tunnel 对应 `https://prod.huiyuanxp.com`。
- `/todo` 是持续保留的任务看板：完整展示 Spec、Plan、每张 ticket 的范围、依赖、验收清单、执行记录和真实状态。
- 看板读取服务器 Markdown；每30秒同步。仅明确标记 `done` 的票计作完成；依赖未完成时展示等待依赖。
- 应用接入同一端口时必须保留 `/todo` 及 `/todo/api/board`，可用统一入口代理应用内部端口；不得启动两个服务争抢4173。
- 仅发布允许展示的规划文件，不发布环境变量、隧道凭证、项目私有数据或仓库目录。公网看板只读。
