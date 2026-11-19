# Kimi K3.1 Pro 发布表逐行对应（研究快照）

核查日期：2026-11-10。依据[固定版本模型卡](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/d9e99b0792a5e93b78ea9bea62a68167e36ddd9e/README.md)第 3 节第一张成绩表，以及本地已发布 benchmark JSON。每行仅列模型卡中的名称与本站相关条目，不录入成绩。相同条目可对应多个工具条件或子集；**名称相关不代表协议已对齐，不代表本站独立评测或允许转载数据**。

竞品对照：[AIEvals 来源页](https://aievals.app/sources/kimi-ai)自述保留同一发布表全部 47 行及六列；已抽查 [SWE-Marathon](https://aievals.app/benchmarks/swe-marathon)、[ALE CLI](https://aievals.app/benchmarks/agents-last-exam-1-1-cli)、[PerceptionBench](https://aievals.app/benchmarks/perceptionbench)三个 Kimi 数值与本快照一致。其余数据和来源链未逐格验收；表内其他模型结果含引用及不同运行框架，不能都算发布方独立实测。

跨来源待查：固定 Hugging Face 模型卡中的 GPT-6 Astra 在 ALE ALL / CLI 分别为 41.8 / 44.2，[AIEvals ALL](https://aievals.app/benchmarks/agents-last-exam-1-1-all) / [CLI](https://aievals.app/benchmarks/agents-last-exam-1-1-cli)为 32.8 / 38.8；后者引用 Kimi 发布博客，而非本文件固定模型卡。浏览器放大核对博客当前图表的 Agents’ Last Exam 行，GPT-6 Astra 显示 41.8，与模型卡 ALL 行一致；图表该处未单独标注 ALL/CLI，未见 CLI 对照行，2026-10-24 历史图也未取得，仍不能认定转载错误或成绩差异原因。

| # | 模型卡评测行 | 本地相关条目 | 边界 |
| --- | --- | --- | --- |
| 1 | Terminal-Bench 4.0 | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 2 | Terminal-Bench-Science 0.1 | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 3 | SWE Marathon v1.1 | [SWE-Marathon](../../content/benchmarks/swe-marathon.json) | 报告 v1.1，本地版本为数据修订号；版本身份待核。 |
| 4 | BenchCAD w/o tools | [BenchCAD](../../content/benchmarks/benchcad.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 5 | BenchCAD w/ tools | [BenchCAD](../../content/benchmarks/benchcad.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 6 | Program Bench | [ProgramBench](../../content/benchmarks/programbench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 7 | DeepSWE v1.1 | [DeepSWE v1.1](../../content/benchmarks/deep-swe-v1-1.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 8 | PostTrain Bench v1.2 | [PostTrainBench v1.2](../../content/benchmarks/posttrainbench-1-2.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 9 | Kimi Code Bench 2.0 (Internal) | [Kimi Code Bench 2.0](../../content/benchmarks/kimi-code-bench-2.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 10 | Kimi Code Bench 3.0 Long-horizon (Internal) | [Kimi Code Bench 3.0 Long-horizon](../../content/benchmarks/kimi-code-bench-3-long-horizon.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 11 | HLE-Full w/ tools | [Humanity’s Last Exam](../../content/benchmarks/hle.json) | Full 数据划分及工具设置须核。 |
| 12 | BrowseComp | [BrowseComp](../../content/benchmarks/browsecomp.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 13 | BioMysteryBench | [BioMysteryBench](../../content/benchmarks/biomysterybench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 14 | CharXiv (RQ) w/ python | [CharXiv](../../content/benchmarks/charxiv.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 15 | MMMU-Pro w/ python | [MMMU-Pro](../../content/benchmarks/mmmu-pro.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 16 | GDP.pdf w/ python | [GDP.pdf](../../content/benchmarks/gdp-pdf.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 17 | ChartoGraphy w/ python | [Chartography](../../content/benchmarks/chartography.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 18 | BabyVision w/ python | [BabyVision](../../content/benchmarks/babyvision.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 19 | ZeroBench_main w/ python (pass@5) | [ZeroBench Main](../../content/benchmarks/zerobench-main.json) | Main 与 pass@5 设置须核。 |
| 20 | Agents' Last Exam (ALL) | [Agents’ Last Exam](../../content/benchmarks/agents-last-exam.json) | 报告脚注 v1.1；本地标 ALE-V1，细版本待核。 |
| 21 | Agents' Last Exam (CLI) | [Agents’ Last Exam](../../content/benchmarks/agents-last-exam.json) | 报告脚注 v1.1，CLI 子集和本地细版本待核。 |
| 22 | Automation Bench-AA | [AutomationBench-AA](../../content/benchmarks/automationbench-aa.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 23 | GDPval-AA v2.1 (Elo-score) | [GDPval-AA v2.1](../../content/benchmarks/gdpval-aa-v2-1.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 24 | AA-Briefcase v1.1 (Elo-score) | [AA-Briefcase v1.1](../../content/benchmarks/aa-briefcase.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 25 | APEX-Agents | [APEX-Agents](../../content/benchmarks/apex-agents.json) | 报告未标版本；本地映射原版仅作候选。 |
| 26 | OfficeQA Pro v2 | [OfficeQA Pro V2](../../content/benchmarks/officeqa-pro-v2.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 27 | OfficeQA Pro | [OfficeQA Pro](../../content/benchmarks/officeqa-pro.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 28 | Frontier Finance | [FrontierFinance（Samaya）](../../content/benchmarks/frontierfinance.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 29 | Harvey Legal Agent | [Harvey Legal Agent Benchmark (LAB)](../../content/benchmarks/harvey-lab.json) | 报告称用 Stirrup 和 1,251 题；与本地条目适用协议待核。 |
| 30 | HANDBOOK.md | [HANDBOOK.md](../../content/benchmarks/handbook-md.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 31 | OSWorld V2.1 | [OSWorld 2.1](../../content/benchmarks/osworld-2-1.json) | 对应 2.1；原始评测设置须核。 |
| 32 | Business Operation (Internal) | [Business Operation（Kimi 内部）](../../content/benchmarks/kimi-business-operation.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 33 | DECK-Arena (Internal, Elo-score) | [DECK-Arena（Kimi 内部）](../../content/benchmarks/kimi-deck-arena.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 34 | Design Bench (Internal, Elo-score) | [Design Bench（Kimi 内部）](../../content/benchmarks/kimi-design-bench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 35 | Kimi Hallu Bench Hard w/ tools (Internal, lower is better) | [Kimi Hallu Bench](../../content/benchmarks/kimi-hallu-bench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 36 | GDP.pdf | [GDP.pdf](../../content/benchmarks/gdp-pdf.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 37 | HLE-Full | [Humanity’s Last Exam](../../content/benchmarks/hle.json) | Full 数据划分须核。 |
| 38 | HLE-Diamond | [HLE-Diamond](../../content/benchmarks/hle-diamond.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 39 | GPQA-Diamond | [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 40 | CharXiv (RQ) | [CharXiv](../../content/benchmarks/charxiv.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 41 | MMMU-Pro | [MMMU-Pro](../../content/benchmarks/mmmu-pro.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 42 | ZeroBench_main (avg@5 / pass@5) | [ZeroBench Main](../../content/benchmarks/zerobench-main.json) | 同一单元格含 avg@5 和 pass@5，须拆分。 |
| 43 | PerceptionBench | 未找到明确条目 | 名称和别名未找到；模型卡脚注称为内部评测。 |
| 44 | Kimi Hallu Bench w/o tools (Internal, lower is better) | [Kimi Hallu Bench](../../content/benchmarks/kimi-hallu-bench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 45 | ExploitBench | [ExploitBench](../../content/benchmarks/exploitbench.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 46 | ExploitGym | [ExploitGym](../../content/benchmarks/exploitgym.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |
| 47 | xdev-bench-hard (Internal) | [xdev-bench-hard](../../content/benchmarks/xdev-bench-hard.json) | 工具、子集、模型版本及原始来源仍须按报告脚注核对。 |

47 行中 46 行能人工关联到一个相关已发布条目，1 行（PerceptionBench）在本地 benchmark JSON 名称、别名及全文检索中未发现；**这不是 46/47 的准确协议覆盖率**。前者包括宽泛条目、版本待确认及一条多指标记录；只核对本模型卡首张表和当前本地工作树，不外推其他模型报告或线上部署。未逐个核实所有版本、结果单位、外部成绩来源、转载许可或用户可用性。
