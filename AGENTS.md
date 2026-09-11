# Agent 项目入口

适用目录：本文件所在项目及其子目录。用户当前明确指令优先于本文；本文不授予新的插件权限，不依赖旧聊天隐含记忆。

## 2026-09-11 实现交接入口

Week 1 01–05 已完成本机浏览器续验与 4173 正式部署；最新证据见 CURRENT 和单票，运维见 docs/DEPLOYMENT.md。先读 `docs/handoffs/CURRENT.md`、`WEEK-1.md` 与 `docs/WEEK1-VALIDATION.md`。不要从零重建已有应用，也不要把依赖票的代码存在当成验收通过。浏览器测试只使用专用 4175 与 `.runtime/browser-test-data`；不得指向业主数据或绕过沙箱图形库加载限制。停止任何旧服务前必须核实进程身份。

## 每次新会话开始

1. 确认项目根目录为 `/home/ubuntu/aws-hackthon/renovation-consultation`。AWS machine 的工具 workdir 使用相对工作区路径 `renovation-consultation`。
2. 读取根 README 的固定 week/step 映射，当前 `.scratch/openplan3d-consultation/spec.md`、`PLAN.md`、`docs/agents/issue-tracker.md`。
3. 读取目标票 `issues/NN.md`、所有直接依赖票的状态和证据、相关阶段 handoff。若存在 `docs/handoffs/CURRENT.md`，先读它恢复在途任务；没有时不要假定已有在途任务。
4. 检查 Git HEAD、工作树、已有实现和实际运行服务。保护用户未提交改动；命令存在与测试可运行性须实际检查。
5. 简要说明本轮解析出的周次、全局 ticket、当前状态和下一步，然后执行已授权范围。不要把此启动流程变成重复征求确认。

## 确定性指令解析

完整编号表在 README（唯一固定映射表）。

- week1 = 01–05；week2 = 06–10；week3 = 11–16。
- weekN/stepM 为周内编号；week1/step2 = 02，week2/step2 = 07，week3/step2 = 12。
- 单独 stepN 为全局编号：step2 = 02，step7 = 07；ticketN/#N 同义。
- Phase0、Phase1、Phase2 分别为 week1、week2、week3。
- “实现 weekN”授权本周未完成票按实际依赖逐票推进；每完成一票验收并更新状态，再推进下一票。
- “实现 weekN/stepM”只选择该票，不自动扩展到全部前置任务。依赖未完成时核实实际实现与证据，报告具体缺口；若前置工作不在已授权范围，澄清是否先补该前置票，不伪造通过或静默扩大范围。
- “继续”优先恢复 CURRENT.md 指向的未完成在途票，再结合真实状态核对；无在途票时选择依赖满足的最小编号未完成票。
- 无效编号或相互矛盾的指令需明确指出。不得按剩余票重排 step。

## 执行与验收

- 产品规格以当前 spec 为准；任务边界以目标 ticket 为准；状态以 ticket + 实际验收证据为准。历史 handoff 不得覆盖新规格。
- 检查 `Blocked by`，`ready-for-agent` 不代表依赖自动满足。若 done 标签与证据冲突，记录问题，核实后修正。
- 开工将所选票 Status 更新为 in-progress，记录本轮范围、HEAD、受保护改动和验证计划。
- 根据真实仓库和运行环境实施，不编造 OpenPlan3D API、provider 能力或不存在的测试命令。
- 完成必要验证，逐项填写验收证据；仅已证明通过的复选框标 [x]。所有必需验收满足才设 done；否则保留 in-progress 或 blocked，并说明原因。
- 更新单票即可让看板同步；不要通过前端显示假完成，也不把“计划写完/看板部署”计为产品票完成。
- 不修改无关文件，不覆盖已有工作，不重置工作树；涉及当前无权限的工具或操作时准确说明阻塞。

## 每次交接

在 `docs/handoffs/CURRENT.md` 写入简短、可恢复的最新状态，并保留单票执行记录：

- 目标：week/step、全局 ticket、本轮范围。
- 状态：完成/在途/阻塞及具体原因。
- 已改文件、HEAD 与未提交内容。
- 已运行验证、结果与证据位置；尚未运行的检查。
- 服务入口和必要启动方式（不得包含密钥）。
- 下一个可执行动作、依赖、已知风险及回滚办法。

重大阶段完成时同时更新对应 PHASE 文档。CURRENT 是恢复索引，不复制整份计划，不取代 ticket。阶段总结与 ticket 冲突时核对代码和证据，不能仅凭总结跳过验证。

## 必须保留的产品约束

- OpenPlan3D 是 3D 实现；无 AI 生图。外层 React/assistant-ui 与 Pi 核心保持当前规格；适配桥需实际验证。
- 先推荐再提出关键确认；AI 建议、用户正式值、用户确认、专业核实分开。单独采用参数不能隐式确认整套方案。
- 手填值不可被 Agent 静默覆盖；需求、对象、证据、修订用稳定 ID 关联，更新校验版本与幂等性。
- 场景警告区分几何规则、AI推断、专业核实；不能把模型意见写成工程安全认证。
- 展示统一使用 127.0.0.1:4173 → prod.huiyuanxp.com；保留 /todo 与 /todo/api/board。
- 启动前检查4173占用及服务身份；主应用与看板需整合入口，不直接杀掉未知进程或破坏 tunnel。
- 只公开允许展示的规划资料；不打印或提交 .env、tunnel token、密钥及私有项目数据。
- `.scratch/openplan3d-consultation/` 是当前权威规划源，不可作为缓存删除。
