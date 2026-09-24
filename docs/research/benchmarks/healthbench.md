# HealthBench

核验日期：2026-09-23

## 官方身份

HealthBench 是 OpenAI 于 2025 年发布的健康场景对话评测，由 262 位医生参与设计。官方将其与考试式问答区分，重点评估模型对现实健康对话的回答是否符合医生为具体场景编写的评分细则。[OpenAI 发布页](https://openai.com/index/healthbench/)；[论文](https://arxiv.org/abs/2505.08775)

## 官方定义与忠实中文概述

HealthBench 含 5,000 段模拟个人用户或临床人员与模型互动的健康对话；模型需要回复最后一条用户消息。每段对话有医生撰写、按重要性加权的 rubric criteria，model-based grader 逐项判断回答是否符合。[OpenAI 发布页](https://openai.com/index/healthbench/)

## 任务输入/输出/环境

- **输入**：健康相关多轮对话，覆盖个人用户、临床人员、多语言、不同专科和情境；官方称数据由合成生成和人工对抗测试共同形成。[OpenAI 发布页](https://openai.com/index/healthbench/)
- **输出**：针对对话最后一条用户消息给出回答；按该例 rubric criteria 逐项打分，再计算汇总分。[官方发布页](https://openai.com/index/healthbench/)；[参考代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)
- **环境**：基准任务是回答生成加 rubric 评分。评测 grader、工具使用、采样和长度处理属于运行协议；仅报告“HealthBench”不足以完整复现分数。

## 数据规模/split/字段/文件

- 母集：5,000 段对话；48,562 条独特 rubric criteria；7 个主题类别；作者组含在 60 个国家有执业经验的 262 位医生。[OpenAI 发布页](https://openai.com/index/healthbench/)
- 官方家族变体：HealthBench Consensus 为 3,671 个例子的共识标准子集；HealthBench Hard 为 1,000 个较难例子子集。它们仍属于 HealthBench 家族但目标、筛选范围与统计量不同。[OpenAI 发布页](https://openai.com/index/healthbench/)
- 官方脚本给出 HealthBench、Hard、Consensus 分别使用的固定命名 JSONL 输入地址与评分实现；HF 官方镜像暴露的 schema 还含 prompt、rubrics、主题标签、canary 等字段。此处不从 HF 转换字段替代脚本原始格式。[评测代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)；[官方数据页](https://huggingface.co/datasets/openai/healthbench)

## 访问状态

数据访问入口直达 OpenAI 官方 Hugging Face 数据页；该页列出数据文件，但 Viewer 当前因 schema 转换失败而不能完整预览。官方脚本与发布页仍是评测运行及禁止在线披露样例的依据。下载可用性不等于允许转载。[官方 HF 数据页](https://huggingface.co/datasets/openai/healthbench)；[评分实现](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)；[OpenAI 发布页](https://openai.com/index/healthbench/)

## 数据/代码/媒体许可与使用边界

OpenAI `simple-evals` README 将 HealthBench 列为 MIT 许可，HF 页面也标记 MIT；代码仓库附许可证文件。[OpenAI README](https://github.com/openai/simple-evals#evals)；[HF 数据页](https://huggingface.co/datasets/openai/healthbench) 但 OpenAI 发布页明确请求不要在网上以纯文本或图像形式展示该数据集例子，以降低训练语料泄漏和联网模型直接检索答案的风险；另提供 canary string 方便训练过滤。许可标签不取消这一明确的完整性请求。[OpenAI 发布页脚注](https://openai.com/index/healthbench/)

## 官方样例与是否可在公开 GitHub Pages 转载

**不转载 HealthBench 题目对话、参考答案、rubric 文本、图片或截图。**OpenAI 对在线纯文本/图片披露样例有明确请求。发布页上的解释、主题描述及指标方法可用自己的话概述，并链接官方来源；不能把发布页上的样例轮播误作可转载授权。[OpenAI 发布页](https://openai.com/index/healthbench/)

## 指标

核心分数为 rubric-derived score：model grader 判断回答是否符合每例 criteria，criteria 有加权分值，按满足标准的得分相对该例最高可得分汇总。论文及实现另报告主题、维度和可靠性分析等结果；Consensus 报错率。对照分数时需核对 grader、score 聚合/截断、采样次数、模型回答长度与运行条件。[OpenAI 发布页](https://openai.com/index/healthbench/)；[官方参考实现](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)

## 版本关系

HealthBench 是原始评测；Consensus 和 Hard 是目标不同的官方变体。HealthBench Professional 是后续补充、面向临床专业聊天工作流的另一评测。不可合并各变体的题数或直接比较总分。结果应标注确切子集、数据文件日期/revision 和评分设置。[OpenAI HealthBench 发布页](https://openai.com/index/healthbench/)；[Professional 论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 官方来源按角色分组

- **定义、方法、数量、子集关系和不在线披露请求**：[OpenAI HealthBench 发布页](https://openai.com/index/healthbench/)。
- **方法论文与分析**：[HealthBench 论文](https://arxiv.org/abs/2505.08775)。
- **运行入口、数据文件路径和参考评分实现**：[OpenAI `simple-evals` healthbench_eval.py](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)。
- **数据访问状态和许可标注**：[OpenAI HF 数据页](https://huggingface.co/datasets/openai/healthbench)。
- **仓库中评测许可清单**：[OpenAI `simple-evals` README](https://github.com/openai/simple-evals#evals)。

## 模型发布引用

OpenAI 发布页展示其指定模型与时间点的结果；这些不是独立统一榜单。引用任何报告都需保留模型快照、grader 版本、推理/工具条件、采样、子集和聚合统计，并把 Hard、Consensus 与母集分数分开记录。[OpenAI 发布页](https://openai.com/index/healthbench/)

## 未核实项

- 未下载并固定 OpenAI Blob 每个 JSONL 文件的 revision、校验和及逐例记录数。
- HF 数据镜像当前 viewer schema 出错；其转换字段是否与源文件 revision 一致未在本轮验证。
- MIT 标签的适用范围不作法律解释；在线不得公开样例的发布请求已由官方页面明确确认。
- 各模型报告的最新 grader、长度调整与工具条件需逐项核验。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 官方发布页、论文、参考代码及 HF 数据页确认了任务、规模、三个公开子集入口和评分方式。关键限制是官方明确要求不在线公开样例；公开取得数据不能视为允许网站转载。
