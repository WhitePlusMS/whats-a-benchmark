# 同一 SWE-bench 题目：题面、运行轨迹与已有工具

核查日期：2026-11-09。以本站具体题目为入口，比较第三方运行材料和现有过程查看器；没有运行模型、评测补丁、验证全部轨迹或开展用户测试。第三方自述的结果不属于本站或官方榜单成绩。

## 本站已有题目

[本站 SWE-bench Verified](../../content/benchmarks/swe-bench-verified.json)有 4 条公开任务，其中 `astropy__astropy-12907` 涉及嵌套 CompoundModel 的 `separability_matrix`。本站保存问题及仓库定位，明确未复制参考补丁或隐藏测试，也没有展示模型求解过程。

## 同题外部轨迹

[Yi30 的公开数据集](https://huggingface.co/datasets/Yi30/deepseek-v4-swebench-trajectories)作者称使用 DeepSeek V4 Flash 和 mini-swe-agent，在 10 个 Verified 任务上各运行非思考和 high 两个设置；作者明确将其界定为个人非正式测试，不能当成 500 题官方模型成绩。

本次从其固定 revision `6c0056f70c0bc895c2b1b7ee4322942bc6e89fe0` 读取下列 JSON 到内存，核对 `instance_id`、用户题面、`info` 和消息数：

| 记录 | 同题核验 | 文件内退出状态 | API 调用数 | 补丁 |
| --- | --- | --- | ---: | --- |
| [不开启思考](https://huggingface.co/datasets/Yi30/deepseek-v4-swebench-trajectories/blob/6c0056f70c0bc895c2b1b7ee4322942bc6e89fe0/data/no_think/astropy__astropy-12907.traj.json) | 实例 ID 与 `separability_matrix` 题面同本站 | `Submitted` | 15 | 非空，504 字符 |
| [high 设置](https://huggingface.co/datasets/Yi30/deepseek-v4-swebench-trajectories/blob/6c0056f70c0bc895c2b1b7ee4322942bc6e89fe0/data/think_high/astropy__astropy-12907.traj.json) | 实例 ID 与题面同本站 | `Submitted` | 16 | 非空，504 字符 |

两条提交补丁字符串的 SHA-256 相同；这只说明最终补丁文本相同，不能因此称过程相同。数据卡将此题两种设置均标为 resolved，但本轮所读轨迹的 `Submitted` 只是提交状态，**不是独立证明官方测试通过**。没有运行 harness 或检查外部完整评测日志，也不能将 15/16 次、单题结果外推到所有任务。

另一个同样被本站收录的题目 `astropy__astropy-13033`，两条轨迹的用户题面均是 `TimeSeries` 必需列检查的错误信息，退出状态也都为 `Submitted`；数据卡汇总表将该题两种设置标为未解决。该卡下面的未解决列表却将 13033 描述为 `WCS celestial transform`，与本次读取的轨迹及本站题面不符。此处只确认这一个摘要/题面不一致，不能据此否定其数值、其他条目或判断原因；提交状态也不能替代测试结果。

## 有人遇到的过程阅读问题

[SWE-agent #810](https://github.com/SWE-agent/SWE-agent/issues/810) 的使用者在 `astropy__astropy-12907` 及其他题目中发现提交补丁只含依赖固定修改，询问其来源和空补丁是否意味着环境有问题。协作者指出相应更改与 SWE-bench 安装步骤有关，并建议看轨迹和评测输出；讨论针对 2024 年给出的版本，本次没有复现，也不能将这一现象推广到现在的所有运行。

这个案例说明“题目是什么”“提交了什么”“是否经过测试”“过程在哪里卡住”是不同问题，而单个总体分数不回答其中全部问题。真实 issue 只证明一名开发者提出过具体问题，不能证明用户规模或对本站的需求。

## 现有替代方案与限制

- [SWE-bench 官方实验仓库](https://github.com/SWE-bench/experiments)描述公开预测、执行日志和部分轨迹；不同提交的公开程度不一定相同，本次没有审计所有文件。
- [SWE-agent 轨迹查看器](https://swe-agent.com/latest/usage/inspector/)文档说明可浏览轨迹、读取对应评测结果和参考补丁；此文档也称 SWE-agent 已进入维护模式。本次没有安装或启动工具。
- [lm-eval-ledger 作者分享](https://www.reddit.com/r/LocalLLaMA/comments/1w9ad9q/i_built_an_llm_benchmark_harness_that_lets_you/)描述逐题查看模型回复和评测输出；该作者是工具建设者，属于自述，现成工具也需先有运行数据。
- [AgentLens 论文](https://arxiv.org/abs/2605.12925)研究通过测试的轨迹质量差异，报告使用特定模型、任务和过程判定方式的结果；不应将其特定“Lucky Pass”分类当成所有 agent 过程的客观通用真值。论文对工具发布状态的描述存在摘要和正文不同措辞，未核实实际可用性。

可测试的问题是：读者能否区分本站题面、模型提交和第三方评测结果，是否需要进一步看轨迹，以及原仓库或现有查看器能否满足需求。素材来自真实案例，但没有做读者任务，不能认定本站更易用或应建设运行平台。是否再发布原始题目、轨迹或补丁应分别核对适用条款；本记录只链接原始材料。
