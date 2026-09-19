## 2026-09-16 Paper UI publication

Scoped03/04/09+07 extension published as `paper-ui-20260916T150735Z` at /new-ui, existing4173. Exact evidence/failures and independent collaboration boundary: PAPER-UI-20260916.md; active fallback and backup: ../DEPLOYMENT.md. This does not close Week3.

## 2026-09-15 production update — Agent / intake v2

Scoped03/04/05/09 extension and07 correction deployed as `intake-v2-20260915T083433Z`. Historical phase validation remains below; current release evidence, failures and boundaries are in `AGENT-INTAKE-V2.md`, operating/rollback paths in `../DEPLOYMENT.md`.48/48 unit/API, typecheck/build,14 distinct browser scenarios via12/14+2/2, frozen startup, consistent backup and42 production verification groups passed. No whole-house/Ticket14 completion or MCP reset is implied.

# Phase 1 — 第2周 v0.2
状态：2026-09-13 第二阶段代码验收完成，06–10 done；已于17:00 UTC受控发布到生产4173，PID990931。

## 本周目标
家具参数/局部聊天/AI参考家具与几何警告形成闭环。

## 任务与入口
- Ticket 06：点击家具弹出属性编辑器；依赖 1, 2。详见 ../../.scratch/openplan3d-consultation/issues/06.md。
- Ticket 07：家具局部聊天与受限修改工具；依赖 3, 6。详见 ../../.scratch/openplan3d-consultation/issues/07.md。
- Ticket 08：Agent添加参考家具及表单联动；依赖 4, 6。详见 ../../.scratch/openplan3d-consultation/issues/08.md。
- Ticket 09：语音与参考图片输入；依赖 3, 4。详见 ../../.scratch/openplan3d-consultation/issues/09.md。
- Ticket 10：场景几何问题标记；依赖 6, 8。详见 ../../.scratch/openplan3d-consultation/issues/10.md。

## 验收
每票Acceptance criteria逐条通过并附证据；不得把ready-for-agent当成已完成。完整规格与资源假设见 ../../.scratch/openplan3d-consultation/PLAN.md。
本周需覆盖草图的对应交互并保存验证记录。无AI生图；3D由OpenPlan3D实现。

## 实际交接记录

实现家具属性编辑、对象绑定Pi聊天/预览/确认、白名单参考家具、图片/语音输入及证据确认、随相机投影的几何问题与历史。独立Codex只读审查后，协调者复现并修复四处一致性缺陷；浏览器另外发现并修复手机抽屉遮挡聊天入口。

最终TypeScript和31项逻辑/API通过，13项Python回执契约通过。浏览器10个用例都有新通过证据：完整套件9通过/1失败（09旧断言读不到input.value），强化为真实输入值及持久化/证据断言后09单项1/1通过；没有将失败报告伪写为完整10/10。真实模型用于咨询、家具提议、参考家具、图片像素和公开WAV转写，配置由现有.env读取且未输出凭证。

验证索引：`../WEEK2-VALIDATION.md`。最终证据：`.runtime/codex-runs/week2-final-20260913T143835Z-8483a6/evidence/coordinator-review.json`，前置独立审查和四项旧代码失败记录在week2-closeout-20260913T142523Z-5c2e72。Git HEAD5d77da1，源码未提交；最终fingerprint3d3c20ae3c633641d362a44a0359e27fb60b64aaebe1341c62710192c3e450d4。

候选构建保留在`.runtime/week2-release/{web,engine}`；原代码验收只用4175+合成数据。后续已单独授权并完成宿主机发布，生产运行 `/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`，服务仍为ubuntu。停写备份和完整Week1回退均已验证；原会话与1个业主项目保留，公网资源、/todo、API及数据检查通过。首次失败与完整旧版恢复如实记录，最终回执 `.runtime/deploy-receipts/week2-20260913T160456Z/result.json`。原工作区构建、源码修改及Week1证据保留，隧道未变；Week3不自动开始。回滚使用冻结Week1全版本并保留当前数据库，详见DEPLOYMENT.md。

限制：材质贴图替换禁用；参考资产白名单；外部图片链接提示上传；录音用模拟音源验证真实编码/上传链路而非实体硬件，实际WAV模型转写另验。窄屏密集标签仍可能重叠；无真实手机软键盘验收。几何非工程安全认证，设计师访谈未开展。
