## 来源索引与证据边界

| 编号 | 来源及定位 | 本文使用方式 |
|---|---|---|
| S01 | 用户上传《粘贴的 markdown (1)。md》；Problem Statement、Scope、Delivery/Controls、Human Approval | 原始 Proposal，原先是单房间方案；支持需求确认、证据、审查、可编辑交付与专业核实边界 |
| S02 | 用户目标图 `832ac372-9ee5-4f5c-aa21-23e205f87799.png` | 全屋三栏布局与视觉方向；图上面积/预算不作为真实项目数据 |
| S03 | 本次对话的明确范围变更 | 全屋、家具更改、房间用途变更、非承重墙拆改、WASD自由移动与视角控制 |
| S04 | 本轮成功只读调用 `K9hhOKfCuSlIKGbt-53VCEmk`；根 README、CURRENT 前32行、Spec、PLAN、tracker、Git HEAD/status | 本轮新读取事实；CURRENT最新条目标题为“Week2 release prepared; operator host approval pending — 2026-09-13” |
| S05 | `.scratch/openplan3d-consultation/issues/01.md` 至 `16.md`，前轮逐票状态及验收回执 | 01–10 done；11–16 ready-for-agent，但依赖及证据仍需实际核验 |
| S06 | `docs/WEEK2-VALIDATION.md`；`.runtime/codex-runs/week2-final-20260913T143835Z-8483a6/evidence/coordinator-review.json`；两个 browser-results.json | 历史测试证据回读；31逻辑/API、13合成回执、9/10完整浏览器＋09单项复验1/1，非本轮重跑 |
| S07 | `apps/api/sample.ts:6–96`；`packages/contracts/index.ts:9–80,110–175`；`apps/api/store.ts:19–34,98–153` | 双房间/空门窗样例、原生cm、PGlite、业务sidecar、事务与revision字段的实际基础 |
| S08 | `apps/web/src/Workbench.tsx`；`vendor/openplan3d/src/routes/embed/+page.svelte` | 三栏、模式、桥接、场景草稿；apply_requirements为有限关键词规则，不是通用全屋设计规划 |
| S09 | `apps/api/objects.ts:7–33`；`apps/api/reference-integrity.ts:16–39`；对象/参考家具回执 | 受控尺寸/颜色/离地高度；贴图和缩放限制；已采用参考跨房间迁移当前被拒绝 |
| S10 | `apps/api/scene.ts:4–14` | 现有保存显式拒绝删除或重建房间边界；仅更新bbox不能承担全屋拓扑迁移 |
| S11 | `vendor/openplan3d/src/lib/utils/walkthroughMotion.ts:1–113`；`ThreeViewer.svelte:1965–2023`；`stores/project.ts:259–264`；`roomDetection.ts:226–250`；`models/types.ts:23–100` | 旧键位、最大房间起点、上游删墙级联门窗、房间ID与边界身份、缺少墙体结构分类 |
| S12 | 前轮实际查看的 `mobile-fix-final/01-desktop.png`、`06-desktop.png`、`08-pending-desktop.png` | 2026-09-13候选界面的历史视觉证据，不是本轮线上截图；未复制到公开交付包 |
| S13 | CURRENT最新发布准备条目；`docs/DEPLOYMENT.md`、`docs/CODEX-DELEGATION.md` 的既有读取 | 发布包与批准门禁按最新CURRENT；旧文档中的历史沙箱阻塞不能覆盖新记录 |
| S14 | `docs/handoffs/ARCHITECTURE.md`、PHASE-1/PHASE-2 与旧 PLAN 的既有读取 | 识别规划与实施差异；S3、Docker Compose、独立PostgreSQL仅有规划不能算已部署 |
| W01 | MDN：Element.requestPointerLock / Pointer Lock API；访问2026-09-14 | 浏览器用户手势、状态/错误与iframe边界的补充技术参考；不代表项目已通过兼容性验收 |
| W02 | MDN：KeyboardEvent.code；访问2026-09-14 | 物理键位语义与键盘布局差异；具体项目实现仍依锁定版本测试 |
| W03 | Three.js：PointerLockControls 官方文档/示例；访问2026-09-14 | moveForward/moveRight和WASD+鼠标示例；导航碰撞由项目另实现，不是控件自带验收 |

W01: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock 及 https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

W02: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

W03: https://threejs.org/docs/pages/PointerLockControls.html 及 https://threejs.org/examples/misc_controls_pointerlock.html

本轮没有读取密钥、操作数据库、安装依赖、运行测试、修改票据或部署。后续批量校验调用被平台拦截，未执行；不将其包装成代码失败，也未绕过重试。源文件的已读事实、历史验收记录与新增设计建议在文中分别标识。未重新验证的运行状态以“交接记录”表述。
