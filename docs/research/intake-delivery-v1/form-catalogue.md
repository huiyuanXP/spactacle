# 从交付倒推的60题索引

这是设计题库，不是要求用户首次连续回答60题，也不是60个已实现的数据库字段。完整的每题推荐、B/C/D、E、示例前文、Prompt、触发条件与交付映射见本轮 02_intake_form 与 question_bank.v1.json 附件。

## 提问顺序

先拿目标、范围、生活场景、最重要取舍和已知资料；用已有对话自动补充明确原话，推测只作为建议。每轮一个主要问题，最多另一个可展开问题。按房间逐步展开，不为凑完整率强迫填完。预算/权限/现场尺寸等关键缺口必须显式列进交付，但可以先记录未知及负责人。

## 48道基础题

|ID|字段|基础问题|
|---|---|---|
|Q01|project_goal|咨询后最希望得到什么？|
|Q02|property_context|房屋城市与类型？|
|Q03|tenure_authority|哪些改动需要其他人的同意？|
|Q04|scope|先做哪些空间、做到什么程度？|
|Q05|plans_media|可以提供哪些户型或现场资料？|
|Q06|privacy_consent|哪些资料可以给设计师？|
|Q07|occupants|家由哪些人使用？|
|Q08|decision_makers|谁决定，分歧如何确认？|
|Q09|weekday_routine|工作日回家的典型场景？|
|Q10|work_study|工作学习如何安排？|
|Q11|guests|来访场景需要什么？|
|Q12|maintenance|愿意花多少精力维护？|
|Q13|desired_feeling|希望家给人什么感受？|
|Q14|tone|冷暖与明暗偏好？|
|Q15|style_reference|喜欢参考图的哪部分？|
|Q16|dislikes|哪些做法明确不要？|
|Q17|meaningful_items|哪些物品有必须保留的意义？|
|Q18|priorities|哪两件事最不能牺牲？|
|Q19|budget|预算目标与上限范围？|
|Q20|currency|金额使用什么币种？|
|Q21|budget_scope|预算包含哪些费用？|
|Q22|contingency|是否留有不可预见事项余量？|
|Q23|timeline|关键日期及能否延后？|
|Q24|phasing|哪些先做、哪些以后做？|
|Q25|room_purpose|房间常用与偶尔的功能？|
|Q26|measured_dimensions|尺寸来自实测、图纸还是估计？|
|Q27|openings_structure|哪些门窗、柱梁和管井不能改变？|
|Q28|utilities|哪些设备和水电接口影响布局？|
|Q29|retained|保留物品的清单与尺寸？|
|Q30|storage_inventory|物品量、占地与取放频率？|
|Q31|living_layout|客厅中心的位置留给什么？|
|Q32|dining|平时与来客时的用餐人数？|
|Q33|kitchen|做饭频率与当前不便？|
|Q34|bedroom|卧室最影响放松的是什么？|
|Q35|bathroom|卫生间优先解决什么？|
|Q36|laundry_entry|进门与洗晒流程卡在哪？|
|Q37|cabinet_access|柜内容量、拿取、展示如何排序？|
|Q38|furniture_flexibility|哪些家具愿意随变化调整？|
|Q39|materials|触感、外观、维护和检测资料如何取舍？|
|Q40|lighting|不同时段、活动需要什么灯光？|
|Q41|comfort|哪些舒适度问题最突出？|
|Q42|smart_home|智能功能做到哪一步？|
|Q43|option_tradeoff|比较方案时接受哪种代价？|
|Q44|visual_coverage|哪些画面最帮助做决定？|
|Q45|designer_handoff|哪些话希望原样交给设计师？|
|Q46|open_questions|哪个决定还拿不准？|
|Q47|revision_approval|本次确认仅覆盖哪些部分？|
|Q48|satisfaction|总结哪里像你，哪里还没理解对？|

## 12道条件分支

|ID|触发主题|问题|
|---|---|---|
|Q49|nursery_storage|照护中哪些宝宝用品需随手拿？|
|Q50|nursery_sleep|睡眠家具是否已有具体安排与资料？|
|Q51|accessibility|哪些动作或通行场景需更方便？|
|Q52|pets|宠物活动、休息与清洁怎样安排？|
|Q53|material_sensitivity|需避开的气味或接触体验？|
|Q54|custom_joinery|定制柜目标与尺寸依据？|
|Q55|stone_load|重台面/悬挂物材料、重量和支撑资料？|
|Q56|renovation_while_living|是否需要边住边施工？|
|Q57|image_annotation|图里喜欢一点、不想照搬一点？|
|Q58|video_reference|视频哪个时间点或动作最有价值？|
|Q59|conflicting_preferences|不同使用者偏好如何比较？|
|Q60|over_budget|超预算时先保住什么结果？|

## 现有字段的有限映射

occupants→Q07；decision_makers→Q08；budget→Q19（目前只存单个数值，范围/硬上限仍需扩展）；currency→Q20；budget_scope→Q21；timeline→Q23；scope→Q04；retained→Q29；style→Q13/Q15的一部分；priorities→Q18；purpose→Q25；target_width/target_depth/target_height→Q26的目标值部分，不等于测量证据；tone→Q14；functions→Q25/Q30及相关场景的部分。

不存在一对一字段映射时不要塞进最像的字段然后声称完整覆盖。例如Q06隐私授权、Q22预备金、Q47版本范围确认等仍是文件设计，不能用现有普通文字框冒充专用数据模型。

## Prompt 示例

已知用户原话：“宝宝房需要方便拿尿布，但未来还可能改用途。”
提问：“根据你说的照护和未来调整，我建议先按衣物、尿布、喂养用品和耗材分区，用可调整模块；先不锁定四个柜子。哪个方向更贴近你？”
A 分类收纳和可调整模块。B 保留照护者休息位置、精简收纳。C 兼客房，收纳可移动。D 留更多活动空间，收纳放其他房间。E 完全不同的想法，自由描述。

金额与尺寸无依据时，A推荐补充事实的方法，不编造一个看似聪明的金额或尺寸。推荐不得预选，事实与AI建议分开。图片/视频未接通解析时，只能记录链接或请用户描述，不声称已看过。
