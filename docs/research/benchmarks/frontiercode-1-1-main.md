# FrontierCode 1.1 Main

核验日期：2026-09-23。

## 官方身份

FrontierCode 由 Cognition 发布，评估编码 agent 为真实开源代码库问题提交的变更是否达到维护者可合并的质量。**Main** 是 FrontierCode 1.1 的 100 题子集；本文不将其与 Terminal-Bench 中名称相似的 Frontier-Bench 混为一谈。[Cognition：FrontierCode 1.1](https://cognition.com/blog/frontier-code-1.1)；[Cognition：Introducing FrontierCode](https://cognition.com/blog/frontier-code)

## 官方定义与忠实中文概述

它衡量代码补丁的端到端质量，不仅检查功能正确性，还评估测试质量、改动范围、风格以及是否符合相应代码库的约定。评分标准由维护者为自己的仓库和任务制定；关键 blocker 条件代表代码审查中会阻止合并的问题。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)

1.1 修订了合规联网规则，并审计超过 1,000 条 blocker 标准，将 75 条过严标准降为非 blocker。允许查询文档等正常联网；禁止访问可直接揭示任务解法的来源，并对检测到的违规运行记零。[Cognition 1.1 方法说明](https://cognition.com/blog/frontier-code-1.1)

## 任务输入/输出/环境

- 输入：开源仓库工作区、单个维护者问题/任务说明及通用代码库开发指引。原始介绍称任务来自维护者参与创建的真实开源问题，任务可基于多 PR 链或自由形式请求。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)
- 输出：agent 提交的代码 patch，以及运行中形成的测试/交互记录；benchmark 综合单元/行为测试、rubric 和其他 verifier 进行评估。
- 环境：编码 agent 在容器中独立工作；官方允许必要的网络访问，并以说明和程序扫描器辨别正常资料查询与解答泄漏。[Cognition 1.1 方法说明](https://cognition.com/blog/frontier-code-1.1)

## 数据规模/split/字段/文件

- Cognition 原始定义：Extended 为 150 题，Main 为其中最难的 100 题，Diamond 为原先最难的 50 题。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)
- 1.1 发布说明仍用 Main/Extended，但说明经过 rubric 修订后 Diamond 不再是最难的 50 题且方差较高，因此不再报告 Diamond。[Cognition 1.1](https://cognition.com/blog/frontier-code-1.1)
- 单题公开字段 schema、task 文件或测试文件未发布；Main 的任务内容也没有公开题目下载入口。不可据结果图表样例推断可获得完整 task package。

## 访问状态

Cognition 明确表示暂不公开任务以避免污染，同时向模型创建者开放评测。当前可访问官方介绍、方法说明和 leaderboard 页面；获取 benchmark 实际运行/接入条件须按 Cognition 的评测合作渠道申请。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)；[FrontierCode leaderboard](https://cognition.com/frontiercode)

## 数据/代码/媒体许可与使用边界

未发现 Cognition 为任务数据、patch、rubric 或 benchmark 代码公布可再分发的数据许可证。任务不公开，故本站不得复制任务描述、参考 diff、测试、rubric 或轨迹。Cognition 页面上可见的图表/插图也未查到独立转载许可；保守做法是引用页面链接并自行撰写概述，不下载或重发媒体。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)

## 官方样例与是否可在公开 GitHub Pages 转载

官方页面含方法阐释和交互式示例，但完整 benchmark tasks 被明确暂缓公开。**不转载任务文本、代码、评分 rubric 或 agent 运行轨迹**；公开页面只链接 Cognition 官方说明/leaderboard。若引用官方图示，仍需取得单独媒体授权。[Cognition FrontierCode](https://cognition.com/blog/frontier-code)；[FrontierCode 1.1](https://cognition.com/blog/frontier-code-1.1)

## 指标

官方原始说明区分两项：

- **Pass rate**：一个运行满足全部 blocker 条件则通过，否则失败。
- **Score**：按权重汇总 rubric 项目；若未通过 blocker，该运行总分归零。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)

官方原始报告称每种可用 reasoning effort 跑 5 次，先在该设置内取平均，再报告该模型表现最佳的 reasoning level。对读写 1.1 Main 成绩须同时注明版本、Main 子集、score/pass rate、harness 与 effort；仅有单一百分比不足以复现。[Cognition 原始介绍](https://cognition.com/blog/frontier-code)；[Cognition 1.1](https://cognition.com/blog/frontier-code-1.1)

## 版本关系

1.1 在 FrontierCode 1.0 基础上调整公平联网识别和 blocker 标准，导致绝对分数发生变化。Cognition 表示相对模型表现未显著改变；该说法来自 benchmark 发布者自身比较。FrontierCode 1.1 后续报告 Main/Extended，弃用 Diamond。[Cognition 1.1](https://cognition.com/blog/frontier-code-1.1)

## 官方来源按角色分组

- **benchmark 发布方与原始定义/数据划分/计分：**[Cognition: Introducing FrontierCode](https://cognition.com/blog/frontier-code)。
- **1.1 修订及联网使用规则：**[Cognition: FrontierCode 1.1](https://cognition.com/blog/frontier-code-1.1)。
- **当前官方结果入口：**[Cognition FrontierCode leaderboard](https://cognition.com/frontiercode)。
- **第三方汇总（未作为本记录定义依据）：**Epoch AI 提供单独的当前 1.1 Main 汇总协议；其图表口径不能替代 Cognition 的 score/pass rate 原始定义。[Epoch AI](https://epoch.ai/benchmarks/frontiercode)

## 模型发布引用

Anthropic 的 Opus 5.5 发布页列出 FrontierCode v1.1 (Main) 成绩，属于模型厂商发布报告中的对比数据。 benchmark 定义和许可仍按 Cognition；引用分数时应将 Anthropic 发布值、Cognition 官方结果页的值、以及 Epoch 等第三方汇总分开标注，并保留 effort/harness 配置。[Anthropic 发布页](https://www.anthropic.com/claude-opus-5-5)；[Cognition leaderboard](https://cognition.com/frontiercode)

## 未核实项

- Main 100 个任务的完整 repo/ref、逐题提示、私有测试和各 rubric 权重未公开，第三方无法独立重放完整套件。
- Cognition 公布的 5 次采样/最优 effort 口径来自原始介绍；1.1 修订公告未重新逐项列出每个模型最终运行数与工具 harness，因此特定成绩仍需查 leaderboard 对应条目。
- benchmark 数据、代码和页面媒体的许可边界未公开授予；不得从公开可见页面推定可转载。

## 研究结论

**PASS_WITH_LIMITATIONS**：Cognition 第一方资料清楚定义 1.1 Main 规模、目的、核心评分和公平联网规则；任务本体保持不公开且未见数据许可证。本站可介绍并链接结果，不展示题面、rubric、测试或运行材料。
