# 自定义评测：用户需求与现有工具

调查日期：2026-11-09。本文依据公开页面和讨论整理，未登录试用工具、运行模型、访谈用户或测试付费意愿。产品能力以所链接文档为准，实际使用体验和当前部署条件需另行验证。

## 用户在问什么

- [一位 LocalLLaMA 用户](https://www.reddit.com/r/LocalLLaMA/comments/1kqzuks/eval_generation_and_testing/)表示试过 YourBench 和 promptfoo 的合成测试集生成，仍在寻找多轮对话或 Agent 工作流的评测办法；另有评论者自称在工作及个人项目使用 FutureAGI 和 Arize。这表明至少有个人遇到过选工具与多轮评测问题，不能代表其是本项目目标用户或愿意付费。
- [另一组讨论](https://www.reddit.com/r/LocalLLaMA/comments/1jwl1vs/do_you_guys_maintain_your_own_private_test_data/)围绕私有测试数据展开，评论中有人称长期保存常用提示词，有人介绍法律任务数据。讨论展示个别做法，不能推断普遍需求。
- [视频评测讨论](https://www.reddit.com/r/LangChain/comments/1uenyz1/evaluating_a_vlm_step_in_your_chain_score_the/)中，项目作者介绍使用真实视频任务进行测试并推荐自己的工具，其 VideoDB 关联需计入；一位其他评论者称使用真实样本和失败案例。两者不能都当成独立客户证据。

## 现有工具覆盖哪些环节

| 工具 | 公开资料显示的能力 | 本次确认的边界 |
| --- | --- | --- |
| [Artificial Analysis MicroEvals](https://artificialanalysis.ai/microevals) | 输入自己的提示词，选择多个模型比较；页面列出公开评测。 | 未登录或执行提示词；未确认当前完整隐私选项、费用和输出评分方式。其公开评测列表数量不能当作用户数。 |
| [One-Eval](https://github.com/OpenDCAI/One-Eval) | 项目宣称通过 Agent 将自然语言需求转成评测选择、准备、运行和报告；提供中文说明。 | 其现有 Bench Gallery 主要面向文本任务，代码或 Agent 沙箱等列为后续计划；不能据此认定已支持具身任务。其[论文](https://arxiv.org/html/2603.09821)中的规划实验止于实际运行模型之前，不等于端到端评测成功率。 |
| [Hugging Face YourBench](https://github.com/huggingface/yourbench)、[FAQ](https://github.com/huggingface/yourbench/blob/main/docs/FAQ.md) | 从用户文档生成问答测试集，支持配置本地端点，输出可保存在本地。 | 当前 FAQ 说明核心工具生成数据集，并不执行候选模型评测或保证题目正确；使用远程模型端点仍需将相应文档内容发送给该端点。生成答案需要审查。 |
| [LangSmith](https://docs.langchain.com/langsmith/evaluation-types)、[Phoenix](https://arize.com/docs/phoenix/datasets-and-experiments/concepts-datasets) | 提供围绕自己的数据集、实验和评价方式的应用评测工作流。 | 属于成熟的应用评测工具；本次未评测各版本实际易用性、收费或部署条件。 |
| [VideoDB benchmark-vlms](https://github.com/video-db/benchmark-vlms) | 文档描述以视频提取场景和帧，测试视频理解任务，并记录链路、指标与结果。 | 工作流会上传视频到 VideoDB；参考答案可由模型生成或人工提供，模型生成不等于已验证真值。仓库示例所列模型范围有限，不能当作 Video-MME 的官方实现或通用模型支持。 |

## 与当前项目的关系

本项目已有 [Video-MME 条目](../../content/benchmarks/video-mme.json)以及[视频评测协议研究](2026-11-09-video-understanding-protocols.md)，主要提供评测知识与来源；当前没有统一模型分数数据库，也没有上述工具那样的自定义任务执行能力。Video-MME 的既定数据集、任务和协议与用户自己的视频场景并不自动等价，帧采样、输入和评价方法都可能改变结论。

如果定位为“告诉用户哪些 benchmark 适合其任务、如何理解结果、接下来怎样用现有工具验证”，仍有待检验的方向；但 benchmark 推荐本身已有 One-Eval 等方案，并非空白。仅新增一个通用模型跑分平台或自定义提示词比较入口，已直接遇到成熟产品竞争，现有资料不足以证明值得投入。

下一步应将具体问题和现有工具放在一起比较：例如用户能否从 Video-MME 条目判断它是否覆盖自己的视频任务、哪些设置会影响可比性、什么情况应补自己的测试集。记录用户实际选择、卡点及是否愿意再次使用；目前尚未开展此类用户实验。
