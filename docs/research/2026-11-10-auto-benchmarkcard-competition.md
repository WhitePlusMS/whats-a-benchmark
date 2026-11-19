# 自动生成评测档案：与本站的同题对照

核查日期：2026-11-10。范围是本地工作树、公开仓库及固定修订数据；未运行任何模型、生成管线或第三方网站交互，未审计第三方全部档案，也未验证读者需求。这里比较公开产物，不使用网页 GPT 进行评审。

## 已有方案覆盖什么

[Auto-BenchmarkCard 固定版说明](https://github.com/evaleval/auto-benchmarkcard/blob/d43a0ed623396fbfd9b1b95f4feabe461826f879/README.md)描述：从论文、数据卡和其他来源提取证据，生成包含评测任务、数据、方法、限制与许可等字段的档案，并记录未提供或可疑字段。其作者称对生成结果做自动事实检查；这不等于本站独立验证了其整套检查，或所有档案均准确完整。生成档案存于 [evaleval/auto-benchmarkcards](https://huggingface.co/datasets/evaleval/auto-benchmarkcards)，并与 [Evaluation Cards](https://evalevalai.com/projects/eval-cards/)的模型、成绩及来源视图结合。

这和本站“解释 benchmark 做什么、怎么评分、有哪些限制与来源”直接重叠；对方还连接成绩。其自动化、英语字段与本站人工整理、中文示例具有不同形态，但不能单凭生成方式或语言认定本站对读者更有价值。

## 固定修订的名称筛查

对 Hugging Face API 返回的 [修订 `0a86cea5b55d6070bd7f1f020f01281e1631adba`](https://huggingface.co/datasets/evaleval/auto-benchmarkcards/tree/0a86cea5b55d6070bd7f1f020f01281e1631adba/cards)统计，`cards/` 下有 **530 个 JSON 路径**。对本地 `content/benchmarks/*.json` 中 318 个 `status=published` 条目，使用顶层 `id`、`name`、`aliases` 与对方文件 stem 做 Unicode NFKC 归一、转小写并去掉非字母数字的完全字符串匹配：**68 个本地条目命中 68 个不同路径**；这 68 个本地条目中没有 `embodied` 字段。

方法限制：匹配的是名称或别名，不代表版本、子集、内容或成绩一致。例如 `gpqa` 命中的是本站 GPQA 主项，不能据此说对方有独立的 GPQA Diamond 卡；`aider-polyglot`、`aider` 等由本站别名匹配，仍需单独确认范围。没有匹配到 50 个具身字段条目也不表示对方绝对不覆盖机器人主题、别名、相关子任务或其他产品。对方数据集页面当次显示 **516 条 viewer 行**，与 530 个卡片路径数量不同；本次未查明生成或筛选口径，不把两个数字合并或解释为错误。

命中的本地 ID，供复查：

`aa-intelligence-index`, `aa-lcr`, `agentharm`, `aider-polyglot`, `alignbench`, `apex-agents`, `api-bank`, `babyvision`, `bfcl`, `browsecomp`, `ceval`, `charxiv`, `cmmlu`, `creative-writing-v3`, `cybench`, `deepsearchqa`, `finance-agent`, `fleurs`, `frontiermath`, `frontierscience-research`, `gaia`, `gdpval-aa`, `global-mmlu`, `gpqa`, `gsm8k`, `healthbench`, `hle`, `human-eval`, `ifbench`, `ifeval`, `legalbench`, `livebench`, `livecodebench-pro`, `livecodebench`, `longbench-v2`, `lvbench`, `mathvision`, `mathvista`, `mbpp`, `mcp-atlas`, `mmlongbench-doc`, `mmlu-pro`, `mmlu-prox`, `mmlu`, `mmmlu`, `mmmu-pro`, `mmmu`, `mrcr`, `multi-if`, `nl2repo-bench`, `officeqa-pro`, `omnidocbench`, `osworld`, `paperbench`, `pinchbench`, `ruler`, `scicode`, `simpleqa`, `skillsbench`, `swe-bench-multilingual`, `swe-bench-multimodal`, `swe-bench-pro`, `swe-bench`, `terminal-bench-2`, `vending-bench-2`, `video-mme`, `webvoyager`, `wmt24pp`。

## 三个同题点查

### HumanEval：计分细节

第三方固定修订的 [HumanEval 卡](https://huggingface.co/datasets/evaleval/auto-benchmarkcards/blob/0a86cea5b55d6070bd7f1f020f01281e1631adba/cards/humaneval.json)说明了 164 个编程任务及功能正确性，但其 methodology 将 pass rate 概括为取评测运行中最好的结果，未说明每题的抽样组合估计和跨题平均；该表述不足以准确复算原论文的 `pass@k`。它同时把 `data.format` 标为可能无来源支持，不能以此推断计分字段也被其系统标记。

[原论文](https://arxiv.org/html/2107.03374#S2.SS1)定义：每题生成 `n≥k` 个样本，`c` 个通过，以 `1−C(n−c,k)/C(n,k)` 估计抽取 `k` 个时至少一个通过的概率，再对题目平均。举例：某题 4 个样本有 1 个通过、`k=2`，估计为 0.5；如果简单把 4 个样本的最佳结果当分数则是 1。本站 [HumanEval 条目](../../content/benchmarks/human-eval.json)记录了该估计方法和运行条件。这是一个具体差异，不足以证明本站所有条目都比自动档案准确，也不证明读者认为该深度有价值。

### AlignBench：自动卡有内容，且本地研究资料存在历史差异

[第三方 AlignBench 卡](https://huggingface.co/datasets/evaleval/auto-benchmarkcards/blob/0a86cea5b55d6070bd7f1f020f01281e1631adba/cards/alignbench.json)已经解释中文任务、683 条和八个大类、参考答案及 LLM-as-Judge，不能说它只提供空框架；其 `methodology.metrics` 标为未提供。本站 [AlignBench 当前条目](../../content/benchmarks/alignbench.json)则记录了 1–10 分、任务类别及 v1.1，并展示七条标注为短引的样例。两种形式的权限、内容质量和读者效果尚未做比较测试。

同时发现本地[旧研究记录](benchmarks/alignbench.md)的结论是当时不在线复制题面，而当前条目 `sampleAccess` 已展示七条短指令，并将整体许可标为 unknown；旧记录标注 2026-09-23，当前条目的核验和后续样例时间较晚。这是**本地两份材料的历史状态和发布决策表述不一致**，不能只凭日期推定修改经过或判定法律结果。用户今后阅读旧记录容易误解现状；本轮仅记录待核查项，没有修改样例或作法律结论。

### GPQA：母集与子集

[第三方 GPQA 卡](https://huggingface.co/datasets/evaleval/auto-benchmarkcards/blob/0a86cea5b55d6070bd7f1f020f01281e1631adba/cards/gpqa.json)概述 448 题，但 `data.size`、任务和若干方法字段列为未提供；本地另有 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)，明确其为 198 题子集及访问约束。此比较只能说明所查固定卡片的字段内容，不说明第三方整个网站没有 Diamond 结果或后续补充，也不能把父集和子集两个名称当完全相同的记录。

## 需求与决策边界

[用户研究](https://arxiv.org/html/2604.21769)中 10 位参与者在研究原型中使用子类别、示例与权重辅助模型选型；它不是本站用户测试，也不能证明本项目能减少查找时间。与自动档案和 Evaluation Cards 的同题对照进一步说明：**解释、来源、条件和成绩本身都有现成方案**。可低成本验证的假设是，面向中文读者，把原始任务、易误读的具体分数及适用限制放在同一个阅读路径中，是否比官方原文及现有档案更容易完成任务；需要实际读者对照才能判断，不宜先据此扩建庞大模型成绩库。
