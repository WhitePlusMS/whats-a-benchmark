# ALFRED 家务导航：原版、派生测试与案例站

调查日期：2026-11-09。依据本地条目及公开页面；未运行 ALFRED、EB-ALFRED、第三方案例或用户测试，网页展示可能变化。

## 相同家务主题不等于相同测评

[本站 ALFRED](../../content/benchmarks/alfred.json)有一条把洗手液瓶放到马桶水箱的 `valid_unseen` 专家示范，任务 ID 为 `trial_T20190907_004321_405868`；官方演示视频和该记录按同一目录及 ID 关联。它是仿真专家轨迹，不是模型在测试集的成绩。

[本站 EmbodiedBench](../../content/benchmarks/embodiedbench.json)另有 EB-ALFRED 搬两本书的失败案例，原图没有给出具体实例 ID。按 [EmbodiedBench 论文](https://arxiv.org/html/2502.09560)，EB-ALFRED 从原 ALFRED `valid_seen` 出发，选择及改写任务，划分六个子集共 300 个实例；它使用高层技能接口，也调整动作和说明。本站的 `valid_unseen` 示例不能假定属于那 300 项；家族相关也不等于原版 ALFRED 与 EB-ALFRED 成绩使用相同测试集、动作或评分协议。

目标是否全部完成、部分条件完成及路径效率是不同指标；[ALFRED 论文](https://arxiv.org/abs/1912.01734)将任务成功与目标条件完成分开报告。单个 `find` 动作返回成功，不等于整项家务任务成功；[EmbodiedBench #43](https://github.com/EmbodiedBench/EmbodiedBench/issues/43)里，使用者报告找物动作成功但给模型的画面不见目标。贡献者描述了修复及后续安排；[当前仓库说明](https://github.com/EmbodiedBench/EmbodiedBench)提供环境修复前的固定提交，并称还修正部分任务表述。本站未复测，也未确定原本发布的哪些具体模型成绩受影响。

## 同题任务展示已有直接竞争

[Embodied Agent Arena](https://embodied-agent-arena.github.io/embodied-agent-arena/)的案例区把十个模型放在若干同任务列中，涉及 ALFRED、BEHAVIOR-1K、CALVIN、RLBench、RoboCasa 等本站已有评测。页面区分 `Completed`、预算用尽、API 错误及 `Demo · Not scored`；其 [Case Atlas](https://embodied-agent-arena.github.io/embodied-agent-arena/case-atlas.html)还按任务和能力组织案例。首页说明某些结果有记录但缺少完整画面；本轮只核对文本，未逐条验收视频、所有模型运行和来源。

例如，它展示名为“Open the left drawer”的 RoboCasa 案例，而本站 [RoboCasa365](../../content/benchmarks/robocasa365.json)有同名英文指令的第三方 GR00T 单条轨迹。前者页面标 RoboCasa，后者标 RoboCasa365 的预训练场景；**任务文字相同不足以证明同一环境版本、场景或实例**。网站的模型结果和本站单次记录也不能相互替代，更不能把单例概括为整体模型排名。

另一个 [具身导航 benchmark 目录](https://github.com/youngYangtze/awesome-embodied-navigation-benchmark-zoo)已按任务类型整理 ALFRED、导航、移动操作等，列数据、环境、指标及可复现性标签。其 `verified` 定义为公开数据、代码、评估说明与至少一个基线可获得，并非该目录已亲自跑通或复现所有结果；其 ALFRED 行还标代码与数据 MIT，但本站对数据及媒体授权仍记为未核实，本次没有获得足够证据解除差异，不能据目录一行推定全部资源可再发布。

## 开发者需求与现有资料

[ALFRED #145](https://github.com/askforalfred/alfred/issues/145) 的提问者希望获取 PDDL 与初始状态样本而不下载完整大数据包；协作者提供从 JSON 构造状态的思路，提问者后来仍询问 domain 文件。这是具体资料获取和格式问题，不等于对新网站的需求。

原版 [ALFRED 仓库](https://github.com/askforalfred/alfred)称原 Ai2 榜单于 2025 年 4 月弃用，并写明另一种提交路径；本次未测试该路径能否实际受理，也未联系维护者。目录仍链接旧榜不必然证明其内容错误，但说明对资料入口应标注核查时间和当前访问状态。

## 可以验证什么

可让目标读者查明：一段洗手液轨迹是示范还是模型结果、来自 seen 还是 unseen、EB-ALFRED 与原版是否可混排。原始论文、竞品目录和案例站已提供大部分信息，能否通过本站更快且更准确地回答，须与现有来源做读者对照；当前无结果，不能据此宣称市场或付费需求。
