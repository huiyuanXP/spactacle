# 实现契约 v0.2
状态：拟实施；具体依赖版本必须在安装时锁定，不能复制旧包名猜测当前 API。

## 技术与目录
React + TypeScript + Vite；assistant-ui 负责聊天组件，ExternalStoreRuntime 对接自有消息存储与 SSE 适配器。
Tailwind工作台以OpenPlan3D场景居中：顶部菜单、左下浮动assistant-ui、右侧折叠房间需求栏；点击家具打开属性及局部聊天弹窗，物件旁警告可展开。手机使用抽屉与底部面板。
Fastify + TypeScript 提供 API；Pi Agent Core + pi-ai 负责模型、工具和事件。模型凭证仅在后端。
PostgreSQL 为业务事实来源；S3 保存私有附件；Docker Compose 在 Lightsail 管理应用与数据库。Python 仅用于确有需要的媒体/几何 worker。
拟目录：apps/web、apps/api、packages/contracts、packages/agents、knowledge、infra、docs。尚未创建这些应用模块。
3D使用OpenPlan3D（SvelteKit+Three.js）自托管编辑视图，React外层通过需自行实现的同源iframe类型化桥接集成。原生项目JSON为几何快照，业务sidecar记录需求、证据、风险和修订，后端统一版本；不另外维护React Three Fiber渲染器。取消AI生图；仅保留输入参考媒体和真实场景截图。桥接/ID/单位映射必须先由ticket01验证。

## 业务状态
Project(id, owner_id, version, current_scene_version, created_at)
Message(id, project_id, run_id, role, content, created_at)
Evidence(id, project_id, message_id?, asset_id?, quote?, bbox?, timestamp_seconds?, source_url?)
Requirement(id, project_id, field_key, value, answer_state, confirmation_state, professional_status, priority?, evidence_ids[], room_id?, object_id?, version)
Suggestion(id, project_id, field_key, suggested_value, rationale, evidence_ids[], status, scope[], base_version, scene_object_ids[])
Report(id, project_id, brief_version, scene_version?, evidence_snapshot_ids[], findings[], created_at)
Revision(id, project_id, actor_id, actor_type, timestamp, target_ids[], before, after, evidence_ids[], request_id)
Asset(id, project_id, storage_key, mime_type, analysis_status, origin, license?)
Run/Job(id, project_id, status, idempotency_key, created_at, error?)
上述为字段契约，不是数据库迁移脚本。共享 Zod schema 校验 API；Pi 工具输入按实际 SDK 要求转换，避免维护两套不同语义。

answer_state：answered/unknown/skipped/not_applicable。
confirmation_state：provided/pending/confirmed/rejected。
professional_status：not_required/pending/verified。
Suggestion status：proposed/accepted/rejected/superseded。
用户确认不等于现场测量已核实。需求与建议分表，不能以 placeholder 或表单提交隐式采纳建议。

## 写入与版本
所有操作验证项目权限、expected_version 与幂等 request_id。
冲突返回409并携带最新版本，前端重新加载供用户决定；不得静默覆盖手填或已确认值。
采纳某字段仅确认该字段；整组方案必须显式列出 scope。
事务内写业务状态、revision 和待发布事件；提交后推 SSE。重放事件不得重复写业务。
审查使用不可变需求快照和原始证据；修改后旧报告保留并标为过期。

## HTTP/SSE 草案
POST /api/projects；GET /api/projects/:id。
POST /api/projects/:id/messages -> 202 {run_id}（先持久化用户消息）。
GET /api/projects/:id/events?after=event_id（断线重连，按 event_id 去重，快照兜底）。
PATCH /api/projects/:id/requirements/:rid {value,expected_version,request_id}。
POST /api/projects/:id/suggestions/:sid/accept {scope,expected_version,request_id}。
POST /api/projects/:id/reviews -> {job_id}；GET /api/projects/:id/reports/:rid。
Phase0: GET scene；POST scene/save（基础保存）；Phase1: POST assets/upload-url, assets/:id/analyze。
Phase1: POST scene/commands；Phase2: POST revisions/:id/revert, exports；GET revisions。
上述新增路径均位于 /api/projects/:id/ 下。
事件 envelope：{event_id,project_id,run_id?,type,project_version,payload}。
类型：text_delta、suggestion_created、requirements_changed、review_ready、job_updated、scene_changed、run_finished、run_failed。
assistant-ui适配器只转换对话事件；需求与场景组件订阅业务事件，避免将工具结果当用户话语。

## Agent 与工具
咨询 Agent：固定题库查缺 -> 推荐解及假设 -> 最多1–2个关键问题 -> 提交建议/带证据的提取结果。
用户说“可以”时，绑定最近清晰可见的 suggestion scope；含糊时澄清范围。
审查 Agent：独立上下文，读取题库、当前 brief 快照和原始证据，检查覆盖、依据、确认、矛盾和专业核实。不输出未经校准的总可信度百分比；只写审查结果，不能修改确认事实。
由后端触发审查；第一周使用按钮。不是模型自由互相转交执行权。
工具：get_project_snapshot、get_missing_fields、propose_requirement、record_extracted_requirement、get_evidence、retrieve_knowledge。
accept_suggestion 属于用户授权动作；Agent 不可自行采纳。
Phase1：add_reference_furniture、update_object_properties、remove_reference_furniture；通过OpenPlan3D适配器使用目录内asset_id与受支持参数，属性窗和Agent共用后端命令服务。
对同一项目的变更串行处理；每轮 token/时间/工具步数有限制，可取消，失败保留已提交状态。

## 知识与交付
题库五组：范围目标；生活方式；预算时间决策人；现状尺寸保留项；风格与优先级。
每题含 field_key、trigger、why、source、validation_status；无资料时说未知，不伪造价格与规范。
表达困难时主动引导上传图片/视频链接。不能读取时提示上传文件或截图。
资料记录来源URL、检索日期、适用地域。安排设计师访谈并用实际反馈改题库；未开展前不得标“访谈验证”。
Client Design Brief 五部分：Project Snapshot、Room Brief、Visual References、Open Decisions、Evidence & Revisions。
网页为工作入口；PDF为3–5页摘要快照；JSON为可追溯数据。同时交付可重新导入编辑的OpenPlan3D项目JSON；不是施工图或BIM成果。

## 部署与运维
展示入口已在PROD-TUNNEL.md约定为127.0.0.1:4173、https://prod.huiyuanxp.com。保留现有隧道；部署时统一反代前端/API/自托管编辑视图，测试SPA直接路径刷新。应用独立运行，不复用MCP端口。
Phase0 使用单业主认证会话，禁止匿名访问全部项目；Phase2 扩展项目成员与设计师角色。
API/前端同源代理；数据库只在内部网络。凭证写服务器环境配置，不进入仓库、日志或 handoff。
S3对象按项目授权签发短时URL；URL抓取阻止内网/metadata访问并校验重定向、大小和超时。
备份数据库与附件元数据，记录恢复步骤；发布前保留上一镜像，数据库迁移采用兼容变更。
当前仅建立文档，无需启动应用或更改网络。

## 接入参考
https://github.com/earendil-works/pi/tree/main/packages/agent
https://github.com/earendil-works/pi/tree/main/packages/ai
https://www.assistant-ui.com/docs/runtimes/custom/external-store
以上Pi与assistant-ui页面已在前一轮查阅；实施前按锁定版本再次核对。

## v0.2 权威范围
../../.scratch/openplan3d-consultation/spec.md 与 PLAN.md 为本轮详细交互和ticket来源。
新增RiskFinding(id,object_id,scene_version,kind,rule_id?,evidence_ids[],severity,status,reviewer?)。
几何规则、AI风险提示、专业核实分别展示；无数据不能判断承重/断裂安全。
OpenPlan3D原生undo必须通过适配器与后端补偿revision统一。服务端提交成功前只显示预览，不宣称已保存。
https://github.com/laanlabs/openPlan3D
