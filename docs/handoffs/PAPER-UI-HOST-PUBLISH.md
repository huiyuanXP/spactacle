# Host publication completed — paper-ui-20260916T150735Z

Published2026-09-16 at https://prod.huiyuanxp.com/new-ui through existing4173. The host controls, backup, compatibility and public browser checks are complete. Use `docs/DEPLOYMENT.md` for active release/fallback paths and `docs/handoffs/PAPER-UI-20260916.md` for exact evidence/failures. No further publish step remains for this accepted artifact. Newer workspace collaboration work is not included.

The historical orphan4175 listener was verified as hostPID1486071 using isolated browser data and stopped alone. Another workflow later reused4175 and was left untouched; this run's4176 browser/smoke processes were shut down normally. Do not rerun historical cleanup instructions against current listeners.

---

## Historical preparation instructions — blocked-state descriptions superseded above

# Paper UI：宿主机发布交接

目标是把同一应用的 `/new-ui` 和原版 `/` 的共享聊天改造发布到现有生产服务，不新建用户数据副本，不改变公网隧道。本轮用户已授权实施和发布验证；当前阻塞是 MCP 的宿主服务控制不可用，不是缺少产品范围授权。

## 发布前必须再次核对

当前执行边界：AWS Machine trusted 命令处于 bwrap 隔离内，实际调用 systemctl 返回“System has not been booted with systemd as init system”。不要通过父级命名空间、宿主凭据、修改活动冻结目录或固定旧控制器绕过此限制。此文档不代表已经获得一个新宿主执行入口。

最新验收索引是 `docs/handoffs/CURRENT.md`，本轮为 `new-ui-20260916T132021Z-f802da`。源码与前端候选在 `.runtime/<run>/`，以最终交接中明确列出的 manifest 和 SHA256 为准。较早的 candidate-source-web.tar.gz 只是源码/前端候选，不是可直接安装的完整 runtime freeze；不要把旧候选当成最终包。

2026-09-16 本轮只读检查：生产健康接口应用 PID1298869，公网 `/new-ui` 仍返回旧入口 `index-Cy1-y_d1.js` / `index-B60uLlYk.css`。HTTP200只说明SPA回退可达，不代表新界面已部署。正式发布前必须重新检查实际 User、WorkingDirectory、MainPID、ExecStart、当前资源和运行中任务，不把历史PID当作当前身份。

生产操作依据仍是 `docs/DEPLOYMENT.md`。当时活动冻结版本是 `/opt/renovation-workbench/releases/intake-v2-20260915T083433Z/app`。完整回退目标应保存为发布前实际运行的 intake-v2，而不是跳过它退到Week2。

## 受控发布顺序

1. 在可用且获准的宿主执行入口准备一个全新的发布目录。冻结本轮已验收源码、contracts、前端、未改动的原生引擎、Node24.21.0、根与引擎依赖树。核验 package-lock 与已安装 Radix2.1.24；不得从可变源码目录链接运行代码。凭据不进入归档、日志或本交接文档。
2. 保留旧哈希前端资源，保证已打开的旧页面不会因资源消失而崩溃。继续使用原有私有配置与权威任务目录的既有安全链接机制。重新核对新后端路由、原生引擎资源和归档完整性。
3. 先在隔离数据目录和已确认空闲的4175验证冻结包启动、登录保护、实际资产、60题问卷、媒体和新模型目录。测试只能使用合成项目和公开测试音频。测试结束后停止该测试实例。
4. 为实际当前生产版本准备代码回退与失败恢复。等待已有业主任务完成，停止并确认唯一数据写入进程与监听消失，然后做一致的私有数据备份。不得复制运行中的PGlite目录充当一致备份，也不得启动第二个写入进程访问生产 `.data`。
5. 在隔离备份副本上核验新增可选 `model_id` 元数据的启动兼容性和原有项目、附件、会话、事件/命令数据保持。保留当前全部数据。切换服务至新冻结目录并启动，不修改隧道或凭据。
6. 验证本地和公网健康、实际新JS/CSS、`/new-ui` 深链及刷新、原版 `/`、登录边界、已有会话/项目/附件、问卷/交付与 `/todo`。线上验证不创建业主测试项目，不发送测试模型请求。成功后记录实际服务身份、构建指纹、停机时段与检查结果，再更新票状态。

失败回退必须停掉并确认新写入进程消失，再启动保存的完整旧代码版本，使用当前数据。代码回退不是旧数据库覆盖。若另有数据库恢复需求，先保护较新写入、单独评估，不把恢复旧归档当成默认步骤。

## 本轮可复现的隔离检查

从项目根目录运行，且先确认4175未被别的验收占用：

```bash
run=new-ui-20260916T132021Z-f802da
export PATH="$PWD/.runtime/node-v24.21.0-linux-x64/bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.runtime/browsers"
export RENOVATION_MEDIA_FIXTURES="$PWD/.runtime/$run/fixtures"
export RENOVATION_TEST_DATA_DIR="$PWD/.runtime/browser-test-data"
export APP_WEB_DIST="$PWD/.runtime/$run/web-final"
# 每次新建证据目录，不覆盖既有尝试；本项目要求串行验收。
export RENOVATION_ACCEPTANCE_DIR="$PWD/.runtime/codex-runs/$run/recheck-$(date -u +%Y%m%dT%H%M%SZ)-$$"
npm run check
npm test
npx playwright test
```

已有 fixtures 由 `scripts/prepare-media-fixtures.py` 校验固定公开语音样本并生成，不是业主音频。构建需要新输出目录或确认该目录没有活动读者后运行 `npm run build:web`。不要直接以默认设置启动 `scripts/run-workbench.sh`；默认路径不是隔离测试许可。

浏览器证据目录名含 codex-runs 是现有路径保护要求，本轮没有委派Codex。最终生产发布未通过前，ready-for-review/代码测试通过不能被写成ticket done。

## Final receipt and temporary test-listener cleanup

Final acceptance: docs/handoffs/PAPER-UI-20260916.md. Candidate `candidate-final-source-web.tar.gz`, SHA256 `6e3764db5a10f83d11c2016b884b8f2c82437eb0fc558aaa5e5b7c154b897bac`; final source fingerprint `f7995e18431b6698fdef64e999ebfcb2fe9852ce1014980d9daa6e5ceb542ca5`. Only this final candidate/manifest matches the final UI check.

The broad-run600s timeout left4175 occupied. Reported PID100 belongs to its private PID namespace; **do not kill host PID100**. Verify the actual host listener identity, test source/web paths and isolated `.runtime/browser-test-data` binding before stopping only that test namespace. MCP kill_command could not reap an already-evicted command. This is not the production4173 service.

Final7 checks instead used preflight-verified4176 with new `.runtime/new-ui-20260916T132021Z-f802da/browser-final-data` and config `.runtime/new-ui-20260916T132021Z-f802da/playwright-final.config.ts`;7/7 passed, and4176 is now closed. To reproduce that focused check, set RENOVATION_TEST_DATA_DIR to that isolated directory and pass `--config .runtime/new-ui-20260916T132021Z-f802da/playwright-final.config.ts` with the two new-ui test files. Do not share its data directory with a running process. The normal4175 suite above requires host cleanup and proof the port is free first.
