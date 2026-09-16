# ROOMNOTE 全屋版规划归档 — v0.3-planning

**归档状态：部分完成。正文与确认数据已保存；原始ZIP、PDF、离线HTML及36张PNG尚未传入。**

这里保存本次对话生成的状态文章、实施计划和视觉确认清单的源内容，独立于现有产品规格和验收票。用户已确定全屋范围、家具更改、房间用途更改、非承重墙体受控拆改及WASD漫游方向；具体实施细节与设计确认仍待逐项记录。保存文档不代表新功能完成、设计全部获批或重新部署。

## 从哪里读

| 内容 | 当前可读文件 | 说明 |
|---|---|---|
| 最新运行状态 | [STATUS-UPDATE.md](STATUS-UPDATE.md) | 必须先读；原稿中的Week2待部署记录已经过时 |
| 项目状态与接手说明正文 | [source-parts/01_project_status.body.md](source-parts/01_project_status.body.md) | 原文章正文；公共来源索引单独保存，不冒充完整原文件 |
| 细化实施计划正文 | [source-parts/02_implementation_plan.body.md](source-parts/02_implementation_plan.body.md) | 含8目标、16个WH工作包及数据/交互/验收逻辑 |
| 确认清单使用说明 | [source-parts/checklist-header.md](source-parts/checklist-header.md) | 原清单头部；所述HTML/图像功能尚未上传服务器 |
| 场景U01–U12 | [source-parts/scenarios-01.json](source-parts/scenarios-01.json) | 每场景含目标、流程、数据影响、3条验收条件及确认问题 |
| 场景U13–U24 | [source-parts/scenarios-02.json](source-parts/scenarios-02.json) | 家具、用途、墙体和漫游 |
| 场景U25–U36 | [source-parts/scenarios-03.json](source-parts/scenarios-03.json) | 暂停、诊断、撤销、协作、交付及手机 |
| 全局确认D01–D16 | [package/editable/decisions.json](package/editable/decisions.json) | 保留原状态，没有代替用户批准 |
| 原始来源索引 | [package/editable/sources.md](package/editable/sources.md) | 与正文一起阅读；历史来源记录不视为本次重新研究 |
| 原包说明与检查边界 | [package/README.md](package/README.md)、[package/FILE_CHECKS.md](package/FILE_CHECKS.md) | 原文原样归档；其中的“本轮”指文档生成轮次，不是本次入库 |

`source-parts/`保存已经传到服务器的未改写文本分片，不是原ZIP完整解包，也不是用程序重新生成图文文件。36场景的108条验收条件已保留在JSON中，但目前不能在服务器查看对应PNG。原包中的完整三份Markdown、合并场景JSON、工作包JSON、空白确认模板和CSV尚未落到其原始最终路径；需原ZIP补齐。

## 完整包与校验

[SOURCE-MANIFEST.json](SOURCE-MANIFEST.json)记录原ZIP和51个原始文件的大小与SHA256。它是来源清单，不证明其中所有文件已经存在。实际入库状态见[IMPORT-STATUS.json](IMPORT-STATUS.json)。

原ZIP：`ROOMNOTE_WholeHome_Documents.zip`，35,707,496 bytes。SHA256：`a505d4de4df08ef3813211f756582c6f832b3886fe04581167696163aabf6167`。包内根目录为`ROOMNOTE_WholeHome/`。

当前MCP没有附件直传工具，服务器不能访问聊天容器的`/mnt/data`；一次文本组装命令在执行前被平台拦截，未产生完整组装文件或验收回执。这里仅保留已成功写入/原样复制的源文件与状态说明，没有绕过策略重新执行该命令。

下一步是将原ZIP通过现有SSH/SFTP上传至本目录的`incoming/`，具体路径见[incoming/README.md](incoming/README.md)。之后应校验ZIP哈希、检查成员路径、隔离解包并逐文件比对；现有同名文件仅在字节一致时复用，不盲目覆盖。

## 与项目权威文档的关系

现有`.scratch/openplan3d-consultation/spec.md`、`PLAN.md`和issues/01–16仍保留原样。README的固定week/step映射不变；WH-00至WH-15仅是规划工作包编号。后续实施必须先将已批准的范围与验收细节落实到正式规格及票据，不根据本归档伪造完成状态。

此目录没有接入生产静态路由或公网看板，不存在已发布的HTML审阅网址。未修改产品代码、生产冻结版本、数据库、服务、依赖、隧道或权限。交接索引见[CURRENT](../../handoffs/CURRENT.md)。
