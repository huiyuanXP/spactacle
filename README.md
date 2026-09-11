# Renovation Consultation

装修咨询与可编辑 3D 房间工作台。项目根目录：`/home/ubuntu/aws-hackthon/renovation-consultation`。

## 当前实现（2026-09-11）

Week 1 工作台已正式部署到 [prod.huiyuanxp.com](https://prod.huiyuanxp.com)，[开发看板 /todo](https://prod.huiyuanxp.com/todo) 持续保留。服务由 systemd 监管并已启用开机启动，隧道未变更。01–05 已按实际浏览器、接口与模型证据验收完成；未开始 Week 2。

先读 [当前交接](docs/handoffs/CURRENT.md)、[部署与回滚](docs/DEPLOYMENT.md) 和 [验证索引](docs/WEEK1-VALIDATION.md)。登录口令保存在私有 `.data/owner-access-code`。生产运行时不要再用默认预览命令打开同一份数据库；浏览器测试只用专用 4175 与测试数据。

## 新对话如何继续

给新的 Agent 这句话即可定位项目：

> 使用 AWS machine 继续装修项目，先读取 /home/ubuntu/aws-hackthon/renovation-consultation/AGENTS.md，然后实现 week1/step2。

仓库内的 Agent 应首先读取 [AGENTS.md](AGENTS.md)。远程聊天不会天然知道服务器上的文件内容；须连接到这台 AWS 工作机并读取这些文件。无需重放旧聊天或依赖桌面版 Codex。

## 指令与任务对应

- `week1` / 第一周：Ticket 01–05；`week2`：06–10；`week3`：11–16。
- `weekN/stepM`：第 N 周内第 M 项，以以下固定映射为准；不是“剩余任务中的第 M 项”。
- 单独 `stepN` / `ticketN` / `#N`：全局 Ticket N，补足两位数字，例如 step2 = 02。
- `Phase0 / Phase1 / Phase2`：分别对应 week1 / week2 / week3。
- “实现 week1”：执行该周尚未完成的任务，按依赖顺序逐票验收。
- “实现 week1/step2”：目标仅为 Ticket 02；先核对 Ticket 01 的依赖验收记录。
- “继续”：读取最新 handoff 和任务状态恢复。若没有明确的在途任务，从依赖已满足的最小编号未完成票开始。
- 编号不随完成情况重排；不存在的周次或步骤不能猜测。

| 周 | 周内步骤 | 全局 Ticket | 内容 |
|---|---|---|---|
| week1 | step1 | 01 | OpenPlan3D接入与可恢复工作台 |
| week1 | step2 | 02 | 右侧房间需求面板与房间定位 |
| week1 | step3 | 03 | 悬浮聊天与Pi流式咨询 |
| week1 | step4 | 04 | 推荐式追问与一键采用建议 |
| week1 | step5 | 05 | 初步需求任务书与审查 |
| week2 | step1 | 06 | 点击家具弹出属性编辑器 |
| week2 | step2 | 07 | 家具局部聊天与受限修改工具 |
| week2 | step3 | 08 | Agent添加参考家具及表单联动 |
| week2 | step4 | 09 | 语音与参考图片输入 |
| week2 | step5 | 10 | 场景几何问题标记 |
| week3 | step1 | 11 | 家具风险提示与专业核实 |
| week3 | step2 | 12 | 统一修订历史与撤销 |
| week3 | step3 | 13 | 设计师看板与角色协作 |
| week3 | step4 | 14 | 可编辑方案与任务书导出 |
| week3 | step5 | 15 | 视频链接理解与证据定位 |
| week3 | step6 | 16 | 完整演示与部署恢复验收 |

## 文档入口

| 文件 | 用途 |
|---|---|
| [AGENTS.md](AGENTS.md) | Agent 启动、执行与交接约定 |
| [.scratch/openplan3d-consultation/spec.md](.scratch/openplan3d-consultation/spec.md) | 当前产品规格 |
| [.scratch/openplan3d-consultation/PLAN.md](.scratch/openplan3d-consultation/PLAN.md) | 三周计划及依赖 |
| [.scratch/openplan3d-consultation/issues/](.scratch/openplan3d-consultation/issues/) | 每张票的范围、状态、验收与执行记录；进度事实来源 |
| [docs/agents/issue-tracker.md](docs/agents/issue-tracker.md) | 状态管理约定 |
| [docs/handoffs/](docs/handoffs/) | 阶段交接及实际部署记录 |
| [taskboard/README.md](taskboard/README.md) | 当前看板服务运维 |

虽然规划目录名含 `.scratch`，当前这些文件是看板的数据源，不能作为临时文件清理。若迁移，须同步更新看板服务与文档引用。

## 已确定的方向

React + TypeScript 外层 UI、assistant-ui 开源聊天组件、Pi Agent Core；OpenAI-compatible provider 需验证工具调用和流式输出。后端优先 TypeScript，数据持久化采用 PostgreSQL 规划。OpenPlan3D 自托管并适配外层，不把它假定为现成的 React SDK。

主界面为顶部菜单、中心 3D 房间、悬浮聊天、右侧可折叠需求表单、点击家具的属性编辑器与局部聊天。AI 建议与正式值分开，浅色建议旁提供采用按钮。支持原始图片/语音/视频参考；不做 AI 生图。完整约束以 spec 为准；技术选型不代表已经安装或实现。

## 展示与实际状态

- 公网入口：https://prod.huiyuanxp.com
- 看板：https://prod.huiyuanxp.com/todo
- 本地统一入口：`127.0.0.1:4173`；复用现有 tunnel。
- 工作台和 `taskboard/` 看板已集成在同一应用服务。
- 当前进度必须实时读取各 ticket 的 `Status`、验收证据及仓库代码，不以 README 的历史描述判断。
- 主应用上线时保留 `/todo` 和 `/todo/api/board`；不要启动另一个进程争抢 4173。
- 公网浏览器验证与服务重启恢复的已知限制见 [TASKBOARD.md](docs/handoffs/TASKBOARD.md)。
