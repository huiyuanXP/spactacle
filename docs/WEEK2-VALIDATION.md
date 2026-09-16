# Week 2 / Phase1 验证索引

状态：第二阶段代码验收完成，Ticket 06–10 均 done；已于2026-09-13 17:00 UTC完成受控生产发布。第二阶段指 Week2 / repository Phase1，不是 repository Phase2 / Week3。

项目根：`/home/ubuntu/aws-hackthon/renovation-consultation`。
最终候选运行：`.runtime/codex-runs/week2-final-20260913T143835Z-8483a6/`。
独立复核与问题复现：`.runtime/codex-runs/week2-closeout-20260913T142523Z-5c2e72/`。
当前 Git HEAD 为 `5d77da1`；本阶段源码仍是未提交修改，不能仅凭 HEAD 识别待发布版本。最终源码 fingerprint 为 `3d3c20ae3c633641d362a44a0359e27fb60b64aaebe1341c62710192c3e450d4`，记录在 evidence/coordinator-review.json。原 manifest 是最后手机布局修复前的基线，已被明确标记为 superseded，不能当作最终未改动声明。

## 当前结果

| 检查 | 结果 | 最终候选 evidence/ 下路径 |
|---|---|---|
| TypeScript | 最终代码通过 | build/02.log；coordinator-review.json 中最终命令退出0 |
| 逻辑与 API | 最终复跑31通过，0失败，0跳过 | build/03.log；coordinator-review.json 中最终复跑回执 |
| Python 回执契约 | 13 通过（合成回执，不是模型执行） | build/04.log |
| React / OpenPlan3D 构建 | 均通过；最后手机修复后单独重建React；未写生产输出目录 | build/05.log、build/06.log、post-mobile-build-receipt.json |
| 核心与录音浏览器 | 6个用例均通过，包含手机刷新后正常点击聊天入口 | mobile-fix-final/browser-results.json |
| 实际模型浏览器 | 4个用例最终均通过：咨询、对象聊天、参考家具、图片/音频 | mobile-fix-final/browser-results.json（3项）；media-value-recheck/browser-results.json（09复验） |
| 截图与源码/构建一致性 | 已复核，原生产构建和Week1证据哈希未变 | coordinator-review.json、post-mobile-build-receipt.json |

浏览器结果不是一次完整10/10：最后完整套件为9通过/1失败，失败是旧测试用父节点textContent读取输入框值；失败上下文明确记录色调输入值为绿色。修正为真实input.value、精确持久化值/来源/附件证据断言后，09在同一产品构建下1/1通过。此前独立的手机聊天入口遮挡是产品缺陷，已修复并在完整套件中验证。全部失败日志、trace和截图保留，未改写原报告或降低模型/数据要求。

所有检查按退出码和具体测试断言核对，不能仅凭模型最终自然语言消息或进程退出0判定通过。实时日志/录音仅为合成测试和公开样例；不发布认证值或业主数据。

## 独立审查、浏览器发现与修复

独立 Codex 审查在旧候选中发现四处数据一致性问题；`tests/closeout-regressions.test.ts` 四项测试在旧代码全部失败，修复后的定向服务/界面测试9/9通过。

- 已采用参考家具跨房间/楼层移动会更新旧房间需求：增加事务后的绑定一致性检查，拒绝未确认迁移；非法操作不产生版本、事件或需求修改。
- 非单位缩放与原始尺寸记录不一致：采用和已采用对象保存拒绝不支持的缩放，保留明确尺寸；所有三个缩放轴均覆盖。
- 音频重分析失败可覆盖后来已确认状态：分析只能更新仍归本轮所有的状态，保留纠正文本和确认。
- 刷新显示原始误转写而丢掉纠正结果：显示与提交都优先使用持久化 corrected_transcript；另增加真实浏览器刷新断言。
- 手机刷新后底部需求抽屉盖住聊天入口：将入口定位到抽屉上方，正常命中测试覆盖打开、关闭和再次打开，没有force-click。

证据在 closeout 运行的 `evidence/review/report.md`、`evidence/reproduction/old-code.log` 和 `fixed-code.log`。没有把旧失败报告或旧截图覆盖成通过。

## 重复验证命令

在项目根执行，确保4175没有其他测试进程。不要重建正在运行的测试服务所读取的构建，更不要使用默认4174与生产共用数据库。

```bash
set -euo pipefail
export RUN=".runtime/codex-runs/week2-check-$(date -u +%Y%m%dT%H%M%SZ)"
export RENOVATION_ACCEPTANCE_DIR="$RUN/evidence"
export RENOVATION_MEDIA_FIXTURES="$PWD/$RUN/fixtures"
export APP_DATA_DIR="$PWD/.runtime/browser-test-data"
export APP_WEB_DIST="$PWD/.runtime/week2-release/web"
export APP_ENGINE_DIR="$PWD/.runtime/week2-release/engine"
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.runtime/browsers"
export PATH="$PWD/.runtime/node-$(cat .runtime/node-version)-linux-x64/bin:$PATH"
mkdir -p "$RENOVATION_ACCEPTANCE_DIR"
python3 -B scripts/prepare-media-fixtures.py --output "$RENOVATION_MEDIA_FIXTURES"
npm run check && npm test
npm run build:web && npm run build:engine
npm run test:browser
```

测试服务由 Playwright 启动在固定4175，并使用合成项目。真实模型测试从现有配置模块读取 `.env` 指定的 provider；不要打印配置内容。摄像/录音设备可用性与模型API可用性是两个不同检查。

## 明确限制与发布状态

代码验收后的独立受控发布已完成：生产4173现为冻结Week2版本，PID990931，路径 `/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`。停写完整备份及副本迁移校验通过；原登录会话和1个业主项目保留，本地/公网36项检查通过。首次备份副本权限失败、旧版恢复和第二次成功均保留实际记录。发布回执：`.runtime/deploy-receipts/week2-20260913T160456Z/result.json`；完整运行与回滚办法见DEPLOYMENT.md。隧道未修改，Week3未开始。

材质贴图替换当前不支持，控件禁用并说明；颜色与尺寸可编辑。参考家具为白名单目录，并非任意外部资产。外部图片链接不抓取，提示下载后上传；PNG/JPEG/WebP上传可用。录音自动化只替换测试中的 getUserMedia 音源，后续 MediaRecorder、WAV转换和附件API真实执行；不代表实体麦克风、手机软键盘或设备兼容性通过。真实公开WAV的模型转写另行实测，原件和纠正内容分开保存。几何提示是占用包围体规则，不是结构、承重或施工安全认证。设计师访谈未开展。Week3 / tickets11–16不在本轮范围。

窄屏场景中密集参考标签、警告和浮动按钮仍可能局部重叠，尚无自动标签避让；详情、列表及面板收起入口保留。最终JS构建629.84kB（gzip191.91kB），Vite大于500kB分块警告保留，不等同构建失败，也不声称已做网络性能优化。
