# Paper UI：设计依据与实现边界

发布状态：2026-09-16 已上线 https://prod.huiyuanxp.com/new-ui ，冻结版本 `paper-ui-20260916T150735Z`。验收与保留失败见 `../handoffs/PAPER-UI-20260916.md`。

本轮授权：2026-09-16，新增 `/new-ui`，重构共享聊天输入与对话内选择。优先采用用户上传的 `design.md`，SHA-256：`b40395cb095ac8a74afea842e0d0fe5a20dd731fee22276038c7d5f8a1e927e9`。不是将 ChatGPT 截图的胶囊半径照搬到产品上。

## 设计约束

页面是纸面，边到边区域为0圆角；图板6px；按钮/字段8px；浮层10px；对话框12px；输入框及用户消息16px。只有真实浮层使用阴影，不使用装饰渐变、发光、纹理或玻璃背景。导航、标题、标签使用单一沙色系 `--tint:106`；蓝色只标识真实运行状态；原生场景的材质颜色保留。

Display负责标题，Sans负责阅读，Mono用于章节眉题、编号和标识。闭合类型角色定义在 `apps/web/src/components/shared/type.ts`。Linux回退显式指定现有文泉驿字体，避免隔离环境缺少fontconfig时落到Unifont点阵字形；不添加或分发字体文件。所有中性色及圆角集中在 `paper.css`，深色模式使用同一组语义变量。

只保留主区及章节边界的细线。问答选项依靠间距、单选控件和悬停填充区分，不给每一行套框。未有答案的问题不画已完成标记，也不默认勾选推荐。

## 路由与状态

`main.tsx`识别 `/new-ui` 和 `/new-ui/`，通过Workbench的 `paper` 变体复用同一项目加载、登录、版本并发检查、SSE、原生iframe、选中家具、正式场景保存及交付弹窗。`?project=` 保持项目绑定，不创建第二套假数据或后端。现有 `/` 工作台保持布局，共享新的ChatWindow/ComposerMedia/IntakeCard。

桌面为房间导航、真实空间预览、右侧咨询三栏；中屏收起导航；手机使用真实设备仿真覆盖的空间/对话/需求切换。各房间聊天组件持续挂载，切换或收起不丢当前文字和附件引用。刷新后的项目/消息持久性沿用后端；未发送文字并未承诺跨刷新保存。

## 聊天与模型

使用已安装的 `@assistant-ui/react` ExternalStoreRuntime、Thread、Message、Composer及复制操作原语；不另建聊天状态机。菜单使用现有Radix DropdownMenu，依赖版本显式加入清单，不执行生成器覆盖原代码。

输入框：上方多行文字；下方左侧+；右侧模型选择、麦克风、发送/停止。+提供图片、文档、WAV和当前房间资料库。键盘菜单支持方向键、Escape、焦点返回。中文composition/229事件不发送；Shift+Enter换行；手机触控Enter换行。录音转换为16kHz单声道WAV，经现有真实转写接口后追加到输入框，用户可编辑后手动发送。

`GET /api/chat/models`要求登录，读取已配置服务商的实际模型目录，保留默认模型，过滤媒体/嵌入专用ID并限制数量；目录失败时只展示配置的默认项或不可用说明，不伪造品牌/等级/性能。目录项不等同于已验证每个模型都支持工具调用。

`model_id`被API校验，并进入聊天幂等输入、主Agent、必要的结构化问题格式化轮和用户/助手消息元数据。资料库的明确“确认转写并咨询”同样绑定选择。图片识别和语音转写继续使用各自专用服务，不由聊天模型菜单偷偷替换。

## 问题和确认

问题位于可滚动的对话正文，不占用固定输入区。每条提供问题、推荐依据、A至D的比较方向、E自由填写及可选的暂不确定/跳过/不适用。当前合同是单选；没有声称支持尚未实现的多选或图片选项。

推荐保持未采用；提交是显式用户动作。保留真实来源、预算结构、共享授权、负责人/下一步、版本冲突提示、稳定request_id和重复提交保护。已确认内容展示实际答案摘要，通过完整问卷修改。预算、墙体等事实不由视觉组件推断。

家具局部咨询仅复用形状、字体与发送控件；保留家具/房间/项目范围、先预览再采用和恢复逻辑。其独立API没有新增通用附件入口或全局模型选择能力。

## 验证与发布

每轮证据必须唯一，测试用4175及合成项目，不连接生产owner.data。测试入口需指定 `PLAYWRIGHT_BROWSERS_PATH=.runtime/browsers`，并执行已有 `scripts/prepare-media-fixtures.py` 后设置 `RENOVATION_MEDIA_FIXTURES`。Playwright证据路径受现有guard约束，位于 `.runtime/codex-runs/<run>/`；这个目录名不表示本轮曾委派Codex。

本轮未委派Codex。最终检查结果、源文件指纹、浏览器截图、生产切换状态与回滚边界以 `docs/handoffs/CURRENT.md` 和本轮handoff为准。不能仅凭本设计文档把票标done。MCP处于bwrap隔离中，不能访问宿主systemd；不得通过修改正在服务的冻结目录或访问宿主凭据来绕过发布限制。

参考公共接口：
- https://www.assistant-ui.com/docs/runtimes/custom/external-store
- https://www.assistant-ui.com/docs/api-reference/primitives/thread
- https://www.assistant-ui.com/docs/api-reference/primitives/composer
- https://www.assistant-ui.com/docs/api-reference/primitives/action-bar
- https://www.radix-ui.com/primitives/docs/components/dropdown-menu

最终验收与发布边界：docs/handoffs/PAPER-UI-20260916.md。正常回归使用4175；因外层超时遗留监听，最后7项在确认空闲的4176和独立新测试库完成，不复用旧服务或数据。最终冻结前端路径为 .runtime/new-ui-20260916T132021Z-f802da/web-final。
