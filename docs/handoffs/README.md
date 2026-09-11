# 装修咨询平台：开发交接入口 v0.2
更新：2026-09-11。最新决策：OpenPlan3D为3D实现，按用户草图采用场景主界面，取消AI生图。
## 阅读顺序
1. ARCHITECTURE.md。
2. ../../.scratch/openplan3d-consultation/spec.md（草图交互、范围与数据一致性）。
3. ../../.scratch/openplan3d-consultation/PLAN.md（三周计划、16票依赖）。
4. 单票路径：../../.scratch/openplan3d-consultation/issues/NN.md。
## 现状
本轮更新规划、发布本地ticket；应用功能尚未实现或验证。
项目已存在Git仓库，codex-handoff原文已安装。当前采用to-tickets/to-goal文件流程，不依赖桌面Codex跨会话工具；未安装整套Matt Skills。
已有PROD-TUNNEL.md约定4173入口与prod.huiyuanxp.com；本轮未更改隧道或环境凭证。
## 三周
- PHASE-0.md：OpenPlan3D基础工作台、咨询与确认。
- PHASE-1.md：家具交互、参考家具、多模态、几何警告。
- PHASE-2.md：专业核实提示、撤销协作、导出与整体验收。
## 版本与执行
v0.1原文快照见history-v0.1/，仅供追溯，旧生图任务与R3F方案失效。
最新spec和本轮用户指令优先于旧阶段说明。执行时读取真实HEAD/状态，不依赖旧聊天的环境判断。
每票一个可验证功能闭环；仅依赖完成的票进入to-goal编译，实际实现与验证结果写入执行回执。
