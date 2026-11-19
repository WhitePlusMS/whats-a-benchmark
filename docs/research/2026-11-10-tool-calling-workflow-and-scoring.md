# 工具调用与完整任务：用户问题、计分和已有竞争

调查日期：2026-11-10。仅核查本地资料、公开讨论、论文与网站；没有运行模型、验证其他人的实验或访问真实业务系统。

## 从本站已有样例出发

| 本地条目 | 目前可读的具体样例 | 范围 |
| --- | --- | --- |
| [BFCL](../../content/benchmarks/bfcl.json) | 三角形面积、多个相似函数中选择巴西首都查询等，提供请求和工具定义 | 这些是单次函数选择/参数案例，并无模型输出或真实执行结果；整个 BFCL 系列还包含多轮及 agentic 任务，不能说它只测 JSON |
| [τ²-bench](../../content/benchmarks/tau2-bench.json) | 手机数据慢，需根据故障与限制协调处理；还有飞行模式和漫游场景 | 这些是模拟电信任务，不代表真实客服记录或真实手机操作；整体 benchmark 还涉及其他领域和计分组件 |

一位[开发者](https://www.reddit.com/r/LocalLLaMA/comments/1m1mxwm/improving_tool_calling_via_sft/)称自己训练的模型能生成看似正确的工具参数，但读取返回结果后给出错误回答。另一位[本地模型用户](https://www.reddit.com/r/LocalLLM/comments/1uqsmr7/how_do_you_actually_know_a_local_model_is_ready/)关心多步骤循环、格式错误和错误宣称完成。这些是个人报告，不是已复验结果，也没有证明他们需要本站。

## 本站 τ²-bench 与 AA 直接重叠

[Artificial Analysis 的 τ²-Bench Telecom 页面](https://artificialanalysis.ai/evaluations/tau2-bench)已经展示背景、任务样例入口、模型成绩和成本/耗时视图，页面称由 AA 独立评测；这是电信领域，不能直接当作全领域平均。[BenchLeader 的 τ² 页面](https://www.benchleader.com/benchmarks/tau2_bench)则说明其口径为航空、零售、电信的 mean pass^1，并显示来源和测试日期，页面数据未逐条复算。两个页面的标题相近，不代表同一数据集或相同运行条件。

[τ² 官方评价说明](https://github.com/sierra-research/tau2-bench/blob/033bf082f48e4a3c6a1256208e93cf2ce9c3bb6f/docs/evaluation.md)指出，默认以最终环境数据库状态及必要沟通内容评分；任务可显式选择其他评分组件。参考动作通常用于推导目标状态，不要求智能体机械地走同一条路径，少数 banking_knowledge 任务有动作要求。官方也已有部分动作匹配诊断，明确它只是与一条参考轨迹的相似度，不等于最终正确性。因此“说明参考步骤与实际步骤的区别”本身也已有官方资料。

## 一个已被纠正的复现归因

[τ² issue #387](https://github.com/sierra-research/tau2-bench/issues/387)中，复现者最初怀疑 banking_knowledge 的重放评分依赖时间，列出几条异常任务。维护者指出工具结果受初始状态控制，建议检查自定义 scaffold 初始化；报告者随后承认漏用了 `task.initial_state`，补齐初始化数据、动作和消息后相关任务正常评分。这个结论是讨论双方对该自定义运行的解释，本次没有独立重跑，也不能推断所有版本或其他用户的故障相同。

该例支持一个具体问题：当读者看到分数差异或评分报错，是否能找到**模型、工具环境、初始状态、用户模拟器和评分组件**？但官方 issue 和文档已经解决了一部分信息需求；是否需要本站专门整理尚待读者测试。

## 多轮工具调用的其他研究与局限

[CAREFUL-Bench 预印本](https://arxiv.org/html/2611.02978)针对固定版 BFCL 多轮结果增加效果感知规则，例如额外破坏性调用和重复写入；这是新评分定义，不是 BFCL 官方总分。论文的一组结果中，Llama-xLAM-2-8B 的四类多轮平均官方分为 70.1%，按作者附加规则为 53.6%；该实验使用模拟工具、论文自行界定的动作类别与指定运行设置，未由本站复测，不能等同生产环境安全率。

另一篇[预印本](https://arxiv.org/html/2610.04429)用 223 对信息完整/缺失的配对任务研究模型是否应行动或等待，并对特定 BFCL 多轮评分实现提出疑问。其分数与排名仅针对论文选定模型、样本和计分定义；本次未验证其代码、作者标注或在新版实现中的适用性，不应据此断言所有 BFCL 榜单错误。

两篇论文和 [BFCL 官方榜](https://gorilla.cs.berkeley.edu/leaderboard.html)本身已提供评测、对照和解释。[Knowledge for Agents 的 BFCL 页面](https://knowledgeforagents.com/benchmarks/berkeley-function-calling-leaderboard/)也将工具选择、拒绝、并行和多步工作流拆成任务说明；这些页面和成绩并未逐项审计。

## 可验证的产品假设

可能有价值的阅读路径是让用户从“我想让模型操作什么”出发，区分函数选择、多轮状态、任务完成与副作用，再追溯相应任务和计分；不能承诺榜单分数预测私有系统的可靠性。AA、官方指南、其他目录与研究已有大量重叠。当前证据是公开问题和现有材料，不是市场规模、留存或付费验证。
