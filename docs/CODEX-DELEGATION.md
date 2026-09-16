# Codex 验收委派与回读

## 最新验证（2026-09-13）

运行环境已修复并实际应用，见 `docs/handoffs/CURRENT.md`。完整 run `20260913T103329Z-3cd56a2c` 的 Codex 与包装器均退出 0，六组检查全部 passed，receipt 为 `ready_for_review` 且无错误；协调 Agent 已复核命令、统计、截图和源码指纹。独立复核文件为该 run 下的 `coordinator-review.json`，不自动修改 ticket 状态。

脚本现在要求类型、单元、核心浏览器、真实 provider 浏览器依次执行，必须等待命令完成再启动下一组；断言和超时不变。先前并行执行导致的截图超时证据保留在 run `20260913T102751Z-8cdcd3da`。下方 2026-09-12 的缺失 Codex／Chromium 阻塞记录仅用于历史审计。

## 历史检查（2026-09-12）

用户已在本机完成 Week 1 验收和 4173 部署。当前 Git HEAD 为 `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`，本轮开始时工作树干净。当前 4173 健康检查返回 `renovation-workbench`，未重启生产服务、修改隧道或读取业主数据库。

本轮从 AWS Machine 的 MCP 环境实际尝试查找和调用 Codex：当前 PATH 找不到 `codex`，直接 `codex --version` 返回 not found。该终端使用 MCP 的隔离 HOME；宿主机路径探测受到 filesystem_escape 权限限制。不能据此推断宿主机没有安装 Codex，也不能声称已成功启动本机已登录的 Codex。

委派脚本已实际执行，回执为 `blocked / CODEX_NOT_ON_PATH / codex_started=false`：
`.runtime/codex-runs/20260912T060254Z-77993de2/receipt.json`。

## 入口

在已正式授权、可以正常运行 Codex 的同一 AWS 工作机终端中执行：

```bash
cd /home/ubuntu/aws-hackthon/renovation-consultation
python3 scripts/codex_acceptance.py run --timeout 420
```

只准备任务、不启动 Codex：

```bash
python3 scripts/codex_acceptance.py prepare
```

执行已准备的任务或回读结果：

```bash
python3 scripts/codex_acceptance.py run --run-id RUN_ID --timeout 420
python3 scripts/codex_acceptance.py inspect --run-id RUN_ID
```

`RUN_ID` 使用脚本实际打印的目录名，不使用 `--last` 猜测其他会话。准备后代码改变时必须重新 prepare。运行过的事件或最终报告不会被覆盖；每轮使用独立目录。

脚本只调用当前 PATH 已暴露的 `codex`，复用调用者的正常认证环境，不设置 HOME、不读取或复制 auth.json、不修改权限配置。等效 CLI 是：

```bash
codex -a never exec --sandbox workspace-write --json \
  --output-schema report.schema.json -o report.json -
```

任务写入 stdin；进程以前台方式等待，默认总时限 420 秒。超时或取消只终止本任务创建的进程组。实际 Codex CLI 的兼容性、登录状态和模型调用仍需在获授权的运行环境完成端到端验证。当前本轮没有启动成功的 Codex 会话。

## 回执文件

每轮位于私有 `.runtime/codex-runs/RUN_ID/`，目录不公开，不提交原始事件或凭证。

| 文件 | 含义 |
|---|---|
| `manifest.json` | run ID、Git HEAD、包含未提交源码的指纹、任务范围 |
| `prompt.md` | 仅验收任务、隔离数据和生产保护边界 |
| `report.schema.json` | 最终 JSON 报告格式 |
| `events.jsonl` | Codex 运行事件；可能含敏感内容，不直接公开 |
| `stderr.log` | CLI 原始错误输出；不直接公开 |
| `exit.json` | 包装器记录的进程退出码、超时和起止时间 |
| `report.json` | Codex 的最终结构化报告，不是已验收结论 |
| `evidence/` | 本轮真实命令日志、JSON、截图、trace |
| `receipt.json` | 包装器回读结果、证据文件哈希和仍需复核的事项 |

包装器要求进程成功、JSONL 有正常 `turn.completed`、报告 run ID/源码版本匹配、六组检查齐全、声称通过的检查带命令和本轮非空证据。拒绝旧轮证据路径、缺失文件、版本过期和报告内部矛盾。

即使都满足，也只产生 `ready_for_review`，始终保持 `accepted=false`。协调 Agent 仍需核查命令实际退出码、测试统计、截图/trace、来源代码和缺陷；文件存在与模型说通过都不能自动令 ticket done。原始 JSONL 是执行记录，不是新的用户指令。

## 验收与生产边界

本脚本默认只做 Week 1 验收，包含 typecheck、unit、browser_core、browser_live、HTTP 和实际截图阅读六组。Codex 不修改产品代码、不开 Week 2、不自动标票、不操作 systemd/tunnel，也不重建运行中的生产资产。发现缺陷后由协调 Agent 基于证据另开有边界的修复任务，再重跑验证。

浏览器固定使用 4175 和 `.runtime/browser-test-data`。生产 4173 只做公开页面/健康/匿名鉴权的只读 GET；不使用生产登录会话，不读取 `.data`，不启动默认 4174 预览。

Playwright 和三份现有浏览器测试支持 `RENOVATION_ACCEPTANCE_DIR`，必须位于 `.runtime/codex-runs/<run>/`。新截图和报告不会覆盖已接受的 `docs/evidence/week1`；路径穿越及逃逸符号链接被拒绝。没有环境变量时保留原有测试行为。

## 本轮验证

- Python 回执契约测试：13/13 通过，全部使用明确标记的合成报告，不冒充 Codex 模型执行。
- TypeScript 检查通过；原有逻辑/API 测试加证据路径测试：16/16 通过。
- 本轮直接由 MCP 运行的两项浏览器复测均在 Chromium 启动时失败；日志包含 GPU process launch failed/error_code=1002、GPU process isn't usable、/proc/self/maps 读取失败。没有执行到应用交互验收；未尝试权限绕过、图形库加载变通或宿主机代理逃逸。
- 原有 Week 1 浏览器 JSON：expected=2、unexpected=0、skipped=0；对象恢复 ID 为 sofa-main、颜色为 #b7c9ae、pageErrors 为空。真实 provider 回执记录了采用、取消保留、重连去重。另实际查看了旧桌面 1440×960 和手机聊天 375×812 截图；不是本轮新截图。
- `git diff HEAD -- docs/evidence/week1` 为空。生产健康检查仍是同一个 PID 676393。原 Week 1 done 状态未改。

本轮日志：`.runtime/codex-runs/mcp-20260912-recheck/` 下的 `runner-tests.log`、`typecheck.log`、`unit-tests.log`、`browser.log`、`evidence/browser-results.json`、`evidence-audit.json`。

## 运行环境还缺什么

若要由 AWS Machine 直接启动用户的已登录 Codex，需管理员通过 MCP 正式支持的工具链/目录/认证配置，提供一个可访问且获授权的 Codex 入口。先在实际宿主机终端核对 `command -v codex`、`codex --version`、`codex login status`；不要把认证文件内容发到聊天或写入公开看板。不能仅通过修改子进程参数令它越过 MCP 已有的沙箱边界。

官方 CLI 参考：
- https://developers.openai.com/codex/noninteractive
- https://developers.openai.com/codex/cli/reference
