# Week 1 最新续验与部署 — 2026-09-11

本机续验已解除图形库与进程身份阻塞，正式工作台已接管 4173；公网 https://prod.huiyuanxp.com ，看板保留 /todo。具体最终状态见 CURRENT 与单票。正常系统安装 Chromium 依赖，没有使用被拒绝的加载变量。

本轮新增修复：真实鼠标家具选择、俯视聚焦、隐藏重复引擎按钮、离线/上线 EventSource 重连、TIME_WAIT 端口预检。新增测试包含原生鼠标、漫游、画布尺寸、输入隔离、真实模型建议/采用/取消/重连；既有 intake 组件浏览器检查已通过。

部署：`renovation-workbench.service` 已安装、启用并运行；保留旧 tunnel。生产数据备份和服务重启均已检查。不要与生产并行运行默认 4174 预览（会共用 .data）。运维和回滚见 `../DEPLOYMENT.md`，最终证据见 `../WEEK1-VALIDATION.md`。

以下保留早前实现交接作为历史，不覆盖上述续验结果及 CURRENT。

---

# Week 1 实现交接 — 2026-09-11

## 结论与范围

Week 1 的 01–05 号票已写入实现代码，类型检查、九项自动化测试、生产构建和真实模型接口走查已通过。**Week 1 尚未完成端到端验收，也没有替换 prod 的现有入口。** 01 的浏览器门禁未关闭，因此后续票保留为依赖阻塞/待验收，不按代码存在就标 done。未开始 Week 2/3。

基线 HEAD：`388e26a02294643681a947f964d3c319e8b5c478`。原有未提交计划、README/AGENTS、看板和隧道文件均保留；没有 reset/clean/commit，没有修改 `.env` 或隧道凭据。

## 已落地代码

- `apps/web/src/Workbench.tsx`：React 顶栏、真实引擎 iframe、房间切换、保存、悬浮聊天、需求面板、任务书；响应式 CSS 已实现但未做浏览器视觉验收。
- `vendor/openplan3d/src/routes/embed/`：原生 Svelte/Three 引擎桥接。上游版本、MIT 及程序化样例素材说明见 `docs/ENGINE.md`。
- `apps/api/store.ts`：本地持久化 **PGlite PostgreSQL**，不是外部 PostgreSQL 服务或云托管集群。当前设计为单进程演示；不要多进程同时打开同一数据目录。
- `apps/api/requirements.ts`：房间/项目字段、目标尺寸与几何分离、原话提取（待核对）、AI 待采用建议、逐项/整组采纳、版本冲突和幂等处理。
- `apps/api/chat.ts`、`provider.ts`：实际 Pi Agent Core + 配置的 OpenAI-compatible provider；流式、受限工具、取消/超时/失败保留输入、启动时恢复中断状态。无 shell、邮件、外部抓取或场景执行工具授予模型。
- `apps/api/questions.ts`：五组题库、最多两张关键问题卡，回答/未知/跳过不重复进入问题队列；婴儿照护/长辈场景分支标注未访谈验证。
- `apps/api/review.ts`：独立 Agent 读取冻结的原始证据和需求快照；只提交审查意见、不修改项目。模型不可用时明确退化为规则检查，不声称独立审查完成。

`version` 是项目命令修订；`brief_version` 仅随需求、证据或场景输入变化递增。聊天进度事件有单调 event ID；重连去重使用 event ID。JSON 比较/请求指纹使用 canonical JSON，避免 PostgreSQL jsonb 重排键造成虚假冲突。

## 实际验证与证据

- `npm run check`：通过。
- `npm test`：九项通过，零失败。记录：`docs/evidence/week1/unit-tests.log`。
- `npm run build`：React 与 OpenPlan3D patched bundle 均构建通过；仅有大 chunk 提示。
- `npm run probe:provider`：真实流式文本 + 一次工具调用通过，结果见 `provider-probe.json`。模型从已配置供应商的真实列表选择，并保存在私有 `.data/model-id`；可使用 `OPENAI_MODEL` 明确覆盖。
- `node node_modules/tsx/dist/cli.mjs scripts/week1-walkthrough.ts`：合成客厅案例通过“真实流式咨询 → functions 建议 → 显式采用 → 独立 Pi 审查”，未知预算保持不变。见 `walkthrough.json`。第一次字段选择偏差的失败记录保留为 `walkthrough-first-attempt.json`，未掩盖。
- `node node_modules/tsx/dist/cli.mjs scripts/verify-http.ts`：结果以 `http-smoke.json` 的 `passed` 和每项布尔值为准。该探针检查页面/静态资源/API 保护，不等于浏览器渲染验收。
- 浏览器套件：`tests/browser/01-engine.spec.ts`、`02-05-workflow.spec.ts`。**未通过/未验收**，原因见下。

## 两个发布阻塞

1. 当前执行沙箱的 Chromium 缺共享图形库。项目内下载并校验了运行库，但设置其加载变量被安全策略明确拒绝；未绕过限制。旋转、缩放、实际点选、键盘隔离、1440/768/375 视觉、面板尺寸和聊天草稿的浏览器验收尚未完成。
2. `127.0.0.1:4173` 仍是原 Python `renovation-taskboard`。记录的旧 PID 为 `taskboard/server.pid`，但沙箱不可读取 `/proc`，无法独立核实 PID 对应进程；没有依据 PID 文件盲目终止服务。`prod.huiyuanxp.com` 的隧道仍指向原 4173 服务。

新应用已实现 `/todo` 与 `/todo/api/board`，可以在安全核实并切换服务后保持看板路径。没有擅自改隧道、换公网端口、修改权限或宣称正式上线。

## 启动与验证命令

在项目根目录：

```bash
export PATH="$PWD/.runtime/node-$(cat .runtime/node-version)-linux-x64/bin:$PATH"
npm ci --ignore-scripts
npm --prefix vendor/openplan3d ci --ignore-scripts
npm run check
npm test
npm run build
bash scripts/run-workbench.sh
```

最后一条默认监听 `127.0.0.1:4174`，是前台运行命令，不是已经安装的系统服务。访问口令由服务私下创建于 `.data/owner-access-code`。不要把口令、会话 cookie、数据库或 `.env` 加入看板、日志或 Git。

在具备 Chromium 正常系统依赖的环境中：

```bash
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.runtime/browsers"
npm run test:browser
```

Playwright 会为自己启动 `4175`，使用 `.runtime/browser-test-data`，不会使用业主 `.data` 或复用已有服务。图形依赖受限时不要绕过安全设置。

只有核实并停止原 4173 服务、完成浏览器门禁后，才执行正式切换：

```bash
PORT=4173 APP_ORIGIN=https://prod.huiyuanxp.com bash scripts/run-workbench.sh
```

不要同时启动两个实例访问同一 `.data`。常驻进程监管、开机自启和正式 PostgreSQL 运维还没有安装或验收。

## 下一执行前沿与回滚

继续 `week1` 时先处理 01 的浏览器验收与 4173 发布门禁，不要从零重装已经存在的源码、Node 或依赖；02–05 的代码与接口测试已经存在。逐票确认剩余可见行为后，再更新对应 checkbox/status。不要因此进入 Week 2。

现有线上看板和隧道未替换，故本次没有线上服务回滚操作。测试使用内存 PostgreSQL或专用测试目录；不得删除业主 `.data`。修复应用时仅操作本次应用代码；保留用户原有未提交文件。访谈与专业安全验证仍待人工开展，提纲见 `docs/INTERVIEW-GUIDE.md`。
