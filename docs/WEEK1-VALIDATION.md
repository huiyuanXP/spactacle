# Week 1 验证索引 — 2026-09-11 本机续验

正式入口已切换到工作台；systemd 常驻及开机启动已安装。票据最终状态看单票和 CURRENT。

| 验证 | 结果 | 证据 |
|---|---|---|
| TypeScript | 通过 | `docs/evidence/week1/typecheck.log` |
| 自动化逻辑/API | 15 通过、0 失败 | `unit-tests.log` |
| React + OpenPlan3D 生产构建 | 通过 | `.runtime/week1-build.log`、`week1-engine-fix-build.log`、`release-web-build.log` |
| 引擎与表单浏览器套件 | 2 通过 | `browser-results.json` |
| 真实模型浏览器咨询 | 通过双字段走查；扩展三字段尝试失败另存 | `live-browser.json`、`live-browser-three-field-attempt.log` |
| 提问组件浏览器 | 5 组检查通过 | `docs/evidence/intake-v1/component-tests.log`、截图 |
| 实际 provider 流式+工具探针 | 既有通过 | `provider-probe.json` |
| 合成客厅+独立 Pi 审查 | 既有通过，原始首次偏差保留 | `walkthrough.json`、`walkthrough-first-attempt.json` |
| 内存数据 HTTP 页面/资源/权限检查 | 10 项通过 | `http-smoke.json` |
| 本地及公网部署 HTTP 检查 | 14 项通过 | `production-http.json` |
| systemd 重启、会话恢复、入口资源 | 通过 | `production-restart.json` |
| 设计师访谈 | 未开展 | `docs/INTERVIEW-GUIDE.md` 仅为提纲 |

上述未带目录的证据位于 `docs/evidence/week1/`。浏览器只访问专用 4175，业务数据只在 `.runtime/browser-test-data`；没有对业主数据做浏览器操作。软件 WebGL 渲染通过不代表已测实体手机 GPU 或真实软键盘。

浏览器检查覆盖真实家具鼠标点选和外层稳定 ID、颜色保存刷新恢复、版本错误、旋转/缩放/房间聚焦、2D/3D/漫游、1440/768/375 布局、画布随面板收起变化、房间隔离、目标尺寸不改墙、未知预算、草稿重开、输入键盘隔离、报告保留且过期、实时建议及显式采用、取消原话保留和离线重连去重。

组件验证覆盖 A/B/C/D/E 无预选、选择不自动保存、自由输入原样保存、版本冲突保留草稿并要求明确复核、未知保持 null、手机宽度无横向溢出。后端测试另外覆盖整组原子采纳、重复请求、409、手填保护、原话证据和冻结审查输入。

续验中修复了真实缺口：嵌入引擎原先只射线选择墙，现增加家具子网格 ID；聚焦角度提高以看到室内；隐藏重复引擎控件；浏览器 offline/online 关闭及重开 EventSource 并使用最后事件 ID；端口预检不把 TIME_WAIT 当作活跃监听。首次构建与浏览器重叠导致旧哈希资产丢失，后续构建完成后再启动测试；正式更新流程已记录此限制。

生产重启检查保留登录会话，且空业主项目列表在重启前后不变；没有假称恢复了有内容的业主项目。场景与需求的实际持久化由合成浏览器项目验收。已验证开机启用状态，未重启整台机器。更广泛的多用户运维、实体手机、专业工程核实和人工访谈不是本次完成声明。
