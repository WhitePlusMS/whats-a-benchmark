# 编码评测：同模型、不同工具与榜单重叠

调研日期：2026-11-09。目的：对照本项目 SWE-bench Verified 条目，判断补充模型发布成绩是否足以形成差异。以下是公开资料核对，不是本站的实际评测或用户实验。

## 本站已有内容

[SWE-bench Verified 条目](../../content/benchmarks/swe-bench-verified.json)介绍 500 个真实软件工程任务，提供实际 issue 示例、来源、评分方式及局限；[同任务轨迹对照](2026-11-09-swe-verified-task-trajectory-crosswalk.md)已核对其中一个 Astropy 任务的外部轨迹，并提醒提交补丁不等于通过测试。当前条目并非独立模型成绩库，本研究不把设想的发榜功能当作现状。

## 同一个模型，分数为何可能不同

一项[对照研究](https://arxiv.org/html/2608.26218)比较的是**同一编码 agent 工具的两种配置**，不是 Claude Code 与 Codex 的对比。在 Qwen3.6、20,480 token 上下文、480 秒上限的条件下，对 SWE-bench Verified 选定的 169 个任务，基线完整解决 43 个，加入上下文管理与停滞干预的配置解决 72 个，即样本内增加 17.2 个百分点。在相同 169 题、262,144 token 的事后共同样本比较中为 102 对 101。研究从原 187 个压力任务中保留了两组均有完整结果的 169 个，每组每题一次；不能代表完整 500 题、所有模型或者重复运行的波动，也不能据此说工具配置总会带来提升。

另一项[研究](https://arxiv.org/html/2610.04433)实际比较 Claude Code、mini-SWE-agent 和 OpenCode，包含同配置重复运行。在 45 道困难题上，同配置重跑和更换工具时，结果发生变化的任务占比中位数均为 13%；这是**任务结果翻转比例**，不是总分变化 13 个百分点。该研究也报告，447 题上的两个模型中，Claude Code 与 mini-SWE-agent 的通过率在 5 个百分点内等效；不同工具每任务费用最高相差约 3 倍。工具默认配置、模型服务和部分时间上限存在差异，应以论文完整协议理解，不能将结果外推为某工具普遍最好。

这两项研究说明：成绩至少关联模型、工具、上下文、任务集和预算；小幅分差还需考虑重复运行波动。它们并不证明每个条件都能从厂商发布材料中补齐。

## 现有产品的重叠

1. [Artificial Analysis Coding Agent Index 方法](https://artificialanalysis.ai/methodology/coding-agents-benchmarking/)明确以 agent 配置为结果行，报告各测试分数、可靠性、token、成本和耗时；v2.0 综合 FrontierCode v1.1、Terminal-Bench 4.0 与 SWE-Atlas-QnA-AA。它并非只有模型名字加总分的榜单。其公开方法说明了轨迹用于审查；不能仅凭这点认定所有原始轨迹都对外开放。
2. [Harness Leaderboard](https://joelniklaus-harness-leaderboard.hf.space/?__theme=system)明确主张固定模型、权重和推理强度，展示不同工具的成绩、成本、三次尝试的可靠性与置信区间，并链接运行轨迹；其方法页面也提示部分轨迹只能部分检查。固定模型看工具的想法已有直接竞品。
3. [SWE-bench 官方榜单](https://www.swebench.com/)提供 Bash Only 筛选，便于在其指定的工具设置下比较；一般榜单包含不同提交方案，不能将其视作完全统一的工具环境。

这些产品显示：增加“模型成绩、工具、价格、时间”等字段本身不足以建立独特性。不同产品的覆盖范围、可访问性和持续维护仍需逐项核对；上述资料不能证明任何一家覆盖所有模型及所有发布数据。

## 用户表达与材料时效

- 一位 Reddit 发帖者提出，希望比较模型、推理强度、工具、benchmark、成本、运行时间和 token 的组合，并展示了自己的仓库；该帖是项目提出者表达，并非独立付费需求调查。[原帖](https://www.reddit.com/r/AI_Agents/comments/1ujj9ng/we_need_a_harness_benchmark_leaderboard/)
- 在 SWE-rebench 发布帖中，另一位评论者希望看到固定工具调用预算、耗时和解决成本，认为单看通过率不足以比较需要多次尝试的小模型和一次通过的大模型。[讨论](https://www.reddit.com/r/LocalLLaMA/comments/1tpawlm/swerebench_leaderboard_march_april_and_may_2026/)
- [OpenAI 对 SWE-bench Verified 的 2026 年分析](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)指出测试质量与训练数据污染问题，称其不再适合衡量前沿模型发布时的编码进展，建议使用 SWE-bench Pro。这是该机构基于其分析的判断，不等于所有旧结果没有价值。

以上是具体人的问题和一项机构判断，不代表普遍需求、用户会使用本站或愿意付费。

## 对项目的可验证启示

若继续探索发布成绩，可以先人工做一小组可查原文的记录，保留模型版本、测试版本、工具、预算、任务数量、时间、来源、披露缺项；无法核实处显示未知，不把厂商发布成绩和统一条件实测当成同一种数据。再请真实目标读者用它回答具体选型问题，同时拿 AA、Harness Leaderboard 和官方榜单作对照。只有证明读者确实能因此减少查证工作、且维护成本可接受，才有理由扩展成完整成绩库。目前未完成该对照实验，不应声称已有竞争优势。
