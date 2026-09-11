# 装修咨询平台：开发交接入口
日期：2026-09-11。状态：规划文档已建立，应用尚未实现或部署。

## 开始顺序
1. 阅读本文件与 ARCHITECTURE.md。
2. 读取 PHASE-0.md，先验证服务器与模型接入，再实施第一周闭环。
3. Phase 0 验收通过后执行 PHASE-1.md；Phase 1 通过后执行 PHASE-2.md。
4. 每阶段结束更新该文档的“实际交接记录”，填写提交、变更、验证结果、失败与下一步。不得将计划当成已完成事实。

## 来源与约束
用户负责后端和 Agent，前端方案由此计划确定，队友可依据共享接口开发。
基础为 https://github.com/earendil-works/pi；模型来自 OpenAI-compatible provider。
第一周保存恢复项目，最终支持用户与设计师分角色协作。
每周暂按5个工作日，日期/人员排期尚未核定。
输入来自本轮提供的三周计划与后续交互修改。设计师问题框架来自先前公开资料调研，尚未经过真实设计师访谈验证。

用户上传 SKILL.md 中的 codex-handoff 已完整读取。它用于创建新 Codex 会话，明确排除 handoff 文件，并依赖 list_projects/create_thread。
本交付按用户要求创建文件，借用其“目标、现状、决策、权威材料、验证、剩余工作、首个动作”结构；没有运行跨会话流程，没有安装或修改该 skill，没有创建新会话。

## 已验证环境
AWS 工具工作区：/home/ubuntu/aws-hackthon（工具参数使用相对路径）。
根目录不是 Git 仓库。已有 coding-tools-mcp/ 与仅含 wrangler 开发依赖的根 package.json。
本应用目录此前不存在。未修改 MCP 服务、域名、认证或根 package.json。
未检查 workspace 外目录；工具阻止了该访问。不能推断服务器其他位置不存在应用。
尚未验证 Node/Docker/PostgreSQL 版本、资源余量、模型凭证和监听端口。

## 文档索引
- ARCHITECTURE.md：技术方案、数据契约、工具边界、部署约定。
- PHASE-0.md：咨询与需求确认。
- PHASE-1.md：多模态与单房间3D。
- PHASE-2.md：场景修改、协作、导出和溯源。
