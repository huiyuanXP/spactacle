# 归档时状态补充 — 不改写原稿

文档包版本日期为2026-09-14；本次服务器基线运行ID为`whole-home-v0.3-20260913T183528Z-009e0cfd`，其中时间使用服务器实际UTC。本补充与原文分开，避免将历史判断当作现在的部署状态。

## 已发生的更新

本次读取的`docs/handoffs/CURRENT.md`首条记录为“Week2 controlled production deployment complete — 2026-09-13 17:00 UTC”。发布回执`.runtime/deploy-receipts/week2-20260913T160456Z/result.json`包含`deployed=true`和`outcome=deployed_and_verified`，对应冻结版本`/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`。本次只读GET `http://127.0.0.1:4173/healthz`返回`ok=true`、`service=renovation-workbench`、`pid=990931`；4175无监听。

因此，原文中“Week2仅准备、待宿主操作批准、生产仍为Week1”的描述只代表文档生成时的快照，**不再代表当前部署状态**。不要根据旧描述再次进行切换或重复索取原发布的批准。原稿未被偷偷修改；最新运维事实以CURRENT与实际证据为准。

旧01–10仍是既定旧范围的done，11–16仍为ready-for-agent；全屋新增能力并未因此完成。当前HEAD为`5d77da130167e9e7e40a022ad8dd36e1a6a6361a`，本次基线实际计算的产品源码指纹为`3d3c20ae3c633641d362a44a0359e27fb60b64aaebe1341c62710192c3e450d4`，与已验收记录一致。

## 本次操作边界

仅做文档归档、索引与只读运行核对。没有重新执行发布回执中的36项测试，没有登录生产、读取业主数据库或备份内容，没有启动产品测试/构建/模型调用，没有更改Spec、PLAN或任务状态。

完整图文包尚未上传。文本正文和36场景数据作为源分片保留，四份原始文本文件已直接归档；PDF、HTML和36张PNG仍须通过原ZIP补入。不能把来源清单或文件名当作二进制文件已存在的证明。

## 核查位置

根README；`docs/handoffs/CURRENT.md`原首条部署记录；`docs/DEPLOYMENT.md`；发布回执`.runtime/deploy-receipts/week2-20260913T160456Z/result.json`；本次私有基线`.runtime/document-imports/whole-home-v0.3-20260913T183528Z-009e0cfd/baseline.json`。

这些是本次读到的仓库事实及HTTP结果，不将历史模型/设备/业务测试误称为本轮复验。
