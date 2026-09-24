# HealthBench Hard

核验日期：2026-09-23

## 官方身份

HealthBench Hard 是 OpenAI HealthBench 中的 1,000 例困难子集，不是独立建立的医疗题库，也不是 HealthBench 全量集。官方发布页将其定位为当前前沿模型仍较难的例子集合。[OpenAI HealthBench 发布页](https://openai.com/index/healthbench/)；[HealthBench 论文](https://arxiv.org/abs/2505.08775)

## 官方定义与忠实中文概述

Hard 从 HealthBench 5,000 个健康对话中选出 1,000 例，用于测量前沿模型仍有明显困难的对话任务。任务仍采用逐对话的 physician-written rubric 评分；“Hard”描述的是一个经过筛选的子集，不能当作新的任务格式或独立医疗能力类别。[OpenAI 发布页](https://openai.com/index/healthbench/)；[官方评测代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)

## 任务输入/输出/环境

- **输入**：一段以用户消息结束的健康相关多轮对话；题材面向个人用户或医疗专业人员，可能涉及多语言、不同专科和情景。[OpenAI 发布页](https://openai.com/index/healthbench/)
- **输出**：模型对最后一条用户消息作答；grader 按该例专属的医生撰写 rubric criteria 逐项判断回答是否满足。[官方评测代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)
- **环境**：基准定义本身是对话回答评测。是否启用检索、其他工具、重复采样或不同模型/版本 grader 应以该次运行的报告为准；不能只凭“HealthBench Hard”名称认定工具条件。

## 数据规模/split/字段/文件

- Hard 是 1,000 例子集；母集 HealthBench 有 5,000 段对话和 48,562 条独特 rubric criteria。Hard 例子数不是 rubric 条目数。[OpenAI 发布页](https://openai.com/index/healthbench/)
- OpenAI 参考脚本将 Hard 输入指向独立 JSONL 文件，并通过 `subset_name="hard"` 或 `--eval=healthbench_hard` 运行；对话和 rubric 仍遵循 HealthBench 评测实现。[官方评测代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)
- 本轮没有固定下载文件 revision 并验证逐行字段/哈希，不从第三方格式推导全量 schema。

## 访问状态

OpenAI 发布页表示评测和数据公开于官方仓库；参考代码直接读取 OpenAI 公共 Blob 上的 Hard JSONL。可访问不代表允许把题面或图片再发布到网页。[OpenAI 发布页](https://openai.com/index/healthbench/)；[官方评测脚本](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)

## 数据/代码/媒体许可与使用边界

OpenAI `simple-evals` README 将 HealthBench 列在 MIT 许可下，官方仓库代码也提供 MIT License。[官方 README](https://github.com/openai/simple-evals#evals) 但 OpenAI HealthBench 发布页明确请求不要在线以纯文本或图片披露此数据集的样例，以减少进入训练语料和联网模型直接检索答案造成的泄漏；网页转载需遵守这项明确的基准完整性请求，即使数据文件可公开获取或仓库标注 MIT。[OpenAI 发布页脚注](https://openai.com/index/healthbench/)

## 官方样例与是否可在公开 GitHub Pages 转载

**不转载 Hard 原题、选项式内容、答案、rubric、图片或可还原题目的截图。**Hard 是 HealthBench 的例子子集，官方无在线披露样例请求适用。可发布不含题文的任务说明、子集关系、官方数据入口及方法摘要。[OpenAI 发布页](https://openai.com/index/healthbench/)；[官方评测数据入口](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)

## 指标

采用 HealthBench rubric-derived score：模型 grader 独立判定 rubric criteria 是否满足，再按权重汇总；结果取决于 grader、准则权重、汇总/截断方式及是否采用长度调整等配置。官方代码包含 Hard 子集选择和聚合逻辑。跨报告比较时必须核对这些运行参数，不能将 Hard 分数与完整 HealthBench 分数直接视为同一个数据范围。[官方评测代码](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)；[HealthBench 论文](https://arxiv.org/abs/2505.08775)

## 版本关系

HealthBench Hard 是 HealthBench 的原始困难子集，官方描述为 1,000 个例子；与 HealthBench Consensus（另一种高共识筛选与评分侧重点）及后续 HealthBench Professional（面向临床医生工作聊天的补充评测）应分开标识。记录使用的数据文件、revision、grader 与聚合设置。[OpenAI 发布页](https://openai.com/index/healthbench/)；[HealthBench Professional 论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 官方来源按角色分组

- **基准定义、Hard 数量、家庭关系及不公开样例请求**：[OpenAI HealthBench 发布页](https://openai.com/index/healthbench/)。
- **方法、rubric 与评测分析**：[HealthBench 论文](https://arxiv.org/abs/2505.08775)。
- **Hard 数据地址、子集选择及评分代码**：[OpenAI `simple-evals` healthbench_eval.py](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)。
- **代码及公开仓库许可说明**：[OpenAI `simple-evals` README](https://github.com/openai/simple-evals#evals)。

## 模型发布引用

厂商报告中的 Hard 分数需附带模型快照、运行工具、推理预算、采样、grader 与 scoring 配置。Hard 是经筛选的困难子集；其分数不等同于总体 HealthBench 表现，也不直接代表临床结局。[OpenAI 发布页](https://openai.com/index/healthbench/)

## 未核实项

- 未对 Hard JSONL 当前 revision 做逐例核对、哈希或与官方页面示例逐条映射。
- 本轮未验证数据内容与 MIT 声明之间的法律适用范围；在线样例披露请求则是发布页的明确要求。
- 具体厂商报告的 grader、长度校正、工具和抽样协议需逐份核对。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方发布页与参考代码确认 Hard 是 HealthBench 的 1,000 例困难子集，并提供公开数据/评测入口；OpenAI 明确要求不要在线披露样例。网站仅呈现不泄题的方法和入口链接。
