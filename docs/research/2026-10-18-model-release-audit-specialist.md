# 2026-10-18 模型发布审计：专业模型、决策模型与代码模型

范围：核对北京时间 2026-10-04 至 2026-10-18（含首尾）发布或更新的专业、决策及代码模型。此来源笔记提供描述与证据，供主任务复核，不替主任务作最终收录判断。图像生成、视频及语音专用发布由其他组处理。

## 已核对的第一方发布

### Reflection Beam

- **日期与身份：**预览文章发布日期为 **2026-10-05**，介绍一款总参数 501B、激活参数 23B 的开放权重模型；文中更新说明称结果于 **2026-10-08** 更新。另有 **2026-10-16** 的正式权重发布公告及模型卡。预览结果和最终模型卡结果应分开保留；模型卡说明所有评测使用 temperature=0.7、top_p=0.99。
- **来源：**[预览文章](https://reflection.ai/blog/introducing-beam)、[权重发布公告](https://reflection.ai/blog/beam-is-available)、[模型卡](https://reflection.ai/beam-model-card)。已保存页面 HTML：`beam.html`、`beamavailable.html`、`beamcard.html`。
- **表格评测项：**代码/终端组：DeepSWE v1.1、SWE Bench Pro v2-Hard、SWE Bench Pro v1、Terminal Bench v2.1、SWE Atlas Codebase QnA、SWEBench Multilingual、SWEBench Verified。推理组：AIME 2026、HLE（no tools；最终卡另含 with tools）、SciCode、CriPT AA、GPQA Diamond；最终卡另含 LiveCodeBench。工具调用/搜索组：AutomationBench（public split）、MCP Atlas、tau3 Banking、BrowseComp（with context management）、DeepSearchQA（with context management）。通用能力组：AA-LCR、LongBench v2、IFBench、AA Omniscience（public split）。最终模型卡另有 Iris Safety Evaluations（Combined All Harm Areas）表，指标为 Harmful Requests Refusal/Pivot Rate 和 Harmless Requests Compliance Rate；这里保留原指标名，不将其自动视为独立 benchmark ID。
- **已实际查看的图表：**`beam-figure-01.png` 为通用能力比较表；`beam-figure-02.png` 为 DeepSWE v1.1、HLE text-only、Terminal Bench 2.1 的得分与 generation FLOPs 对照；`beam-figure-03.png` 为相同任务的得分与生成 token 数对照；`beam-figure-04.png` 为相同任务的 rollout budget scaling。以上四张为 Reflection 官方 Sanity 原生 PNG，并已逐张用图像查看。`beam-figure-05.png` 至 `beam-figure-09.png` 也已查看，内容是训练/架构诊断图，不含下游 benchmark 名称，因此未登记为 benchmark 成绩图。预览页四组表格的浏览器截图为 `beam-preview-coding.png`、`beam-preview-reasoning.png`、`beam-preview-tool-search.png`、`beam-preview-general.png`。最终模型卡表格截图以 `beam-final-` 开头，其中最终推理表完整截图包含新增 HLE with tools、LiveCodeBench 行。这些是渲染后 HTML 的浏览器截图，不是发布方提供的栅格原图。
- **Catalog 对照描述（不作映射结论）：**可对应候选记录包括 DeepSWE v1.1（`deep-swe-v1-1`）、SWE-bench Pro（`swe-bench-pro`）、SWE-bench Multilingual（`swe-bench-multilingual`）、SWE-bench Verified（`swe-bench-verified`）、Terminal-Bench 2.1（`terminal-bench-2-1`）、AutomationBench（`automationbench`，与 `automationbench-aa` 区分）、MCP-Atlas（`mcp-atlas`）、τ³-Banking（`tau3-banking`）、BrowseComp（`browsecomp`）、LongBench v2（`longbench-v2`）、AA-Omniscience（`aa-omniscience`）、AA-LCR v1.1（`aa-lcr`，alias 为 AA-LCR）、IFBench（`ifbench`）、SciCode（`scicode`）、HLE（`hle`）、LiveCodeBench（`livecodebench`）及 GPQA Diamond（`gpqa-diamond`）。AIME 2026、SWE Atlas Codebase QnA、DeepSearchQA 在此次查询的结构化 catalog 中未找到同名记录；不以 AIME 2025 或其他相似名称替代。来源写作 `CriPT AA`，catalog 中存在近似写法 CritPt（`critpt`，alias `CritPt · AA`）；这里只列为待确认候选，二者关系未解决。AutomationBench public 与 AA Omniscience public split 是数据划分说明，不单独代表版本。

### Cloudflare Clef-omni

- **日期与身份：**Cloudflare 第一方文章发布日期为 **2026-10-09**，发布 Clef-omni，称其可输入音频、视频、文本和图像。文章也提到 Clef 与 Clef-flash 的速度/价格调整，但明确 Clef 的加速来自服务层优化，没有发布新模型权重。
- **来源：**[Cloudflare 发布文章](https://blog.cloudflare.com/clef-faster-cheaper-multimodal)，已保存为 `clef.html`。
- **评测表：**BFCL（case exact）；ToolRet（nDCG@10）；API-Bank（accuracy）；Home appliances（case exact）；When2Call（accuracy）；BANKING77（macro-F1）；CLINC150+OOS（macro-F1）；BRIGHT（nDCG@10）；Amazon ESCI（macro-F1）；PhishNChips（accuracy）。另有 TypeSafe 工作流表：Invoice processing（Exact actions 与 Primary action）、Customer service（Exact actions）、Security incidents（Exact actions）、Agent trace observability（Primary action）。原文以 HTML 表格呈现，未发现发布方提供的评测栅格图；渲染后网页截图为 `clef-benchmark-table.png` 和 `clef-typesafe-table.png`。`clef.png` 是文章主视觉图，不是评测图，已视觉查看。
- **Catalog 对照描述：**BFCL 对应 catalog `bfcl`，别名涵盖 BFCL v3/v4，但文章未说明所用版本。结构化索引中未找到 ToolRet、API-Bank、Home appliances、When2Call、BANKING77、CLINC150+OOS、BRIGHT、Amazon ESCI、PhishNChips 及 TypeSafe 工作流行的精确记录。文章未为这些项目标注数据集版本。

### Microsoft Decision-1

- **日期与身份：**官方页面日期 **2026-10-09**；介绍 Decision-1 为快速决策评分模型，基于 Qwen3.5-9B 后训练，并通过 Microsoft Foundry/OpenRouter 提供。
- **来源：**[Microsoft Command Line 发布文章](https://commandline.microsoft.com/microsoft-decision-1-model-foundry/)，已保存为 `decision.html`。
- **评测证据：**文章称进行 36 个 benchmark、近 150,000 个问题的对比，并对 5,250 个请求开展 11 项安全 benchmark 测试，但未列出套件名称或逐项成绩表/图。文章提到 JevBench 是公共榜单参考，并非所称 36 项评测中明确列出的表格行。当前没有可稳妥提出的未命名套件 catalog ID。

### Perplexity pplx-decider-v1.1-27b

- **日期区分：**官方 Hugging Face commit 记录显示已评测 checkpoint `step-02446` 于 **2026-10-05** 发布（Decision Index 61.56）；Perplexity 官方社区公告称模型于 **2026-10-06** 可用。两者分别是权重/checkpoint 与公开可用公告日期；未采用来源不明的 10 月 7 日日期。
- **来源：**[官方模型卡](https://huggingface.co/perplexity-ai/pplx-decider-v1.1-27b)、[官方提交记录](https://huggingface.co/perplexity-ai/pplx-decider-v1.1-27b/commits/main)、[Perplexity 官方可用公告](https://community.perplexity.ai/t/pplx-decider-v1-1-27b-our-updated-open-weights-multimodal-decision-model-is-now-available/6286)。已保存为 `decider.html`、`decider-commits.html`、`decider-announcement.html`。
- **评测证据：**模型卡列出 Decision Index 分类 Knowledge、Language、Retrieval、Tools、Arts，以及加权总体 Decision Index。公告图 `decider-v1-1-decision-index-announcement.png` 已下载并视觉查看；它是 Jet Decision Index v0.3 榜单图（图注称 37-benchmark index、111 个开放模型、每模型 110,201 个决策），并非该模型的逐 benchmark 成绩表。不能从聚合图推断底层 37 个名称。模型卡称报告中的图像评测输入上限为 512×512；这与后续 README 修改默认图像尺寸设置是不同事项。
- **Catalog 对照描述：**此次结构化索引中没有 Decision Index 聚合项或上述五个类别的精确 benchmark ID；不应把类别拆作五个独立套件。

### Liquid AI d1-3B 与 d1-omni-600M

- **日期与身份：**Liquid AI 官方文章日期 **2026-10-07**，发布开放权重 `d1-3B` 和 `d1-omni-600M`。
- **来源：**[Liquid AI d1 发布文章](https://www.liquid.ai/blog/d1-open)，已保存为 `d1.html`。
- **评测表：**Decision Index v0.2.1 public split：d1-3B 48.57，d1-omni-600M 15.95。另有七行文本 benchmark 对比表，比较两模型与 Decider 2B/4B：SQuAD 2.0、Civil Comments、MASSIVE intent、PubMedQA、BoolQ、XNLI、PAWS-X。文章未注明这些数据集的具体版本或 harness。文章称 Decision Index v0.3 的 private vision split 未公开。页面还列出 Apple M5 Pro、Jetson AGX Thor、Jetson AGX Orin 64GB、Jetson Orin Nano、RTX 4090、AMD MI325X 的延迟表；它们是硬件测量项，不是 benchmark 名称。Decision Index 页面内嵌 Pareto 图截图为 `d1-decision-index.png`；文本表截图为 `d1-text-benchmarks-left.png` / `d1-text-benchmarks-right.png`，因为表格横向滚动，两个视图分别覆盖左、右列。Edge/GPU 硬件延迟表截图为 `d1-edge-latency-*` 和 `d1-gpu-latency-*`。其余原生页面图片为架构示意图，不是评测成绩图。
- **Catalog 对照描述：**结构化索引中未找到 Decision Index 聚合记录；此次索引查询未找到 SQuAD 2.0、Civil Comments、MASSIVE intent、PubMedQA、BoolQ、XNLI、PAWS-X 的精确条目，未用近似名称替代。

### JetBrains Mellum 2.1

- **日期与身份：**JetBrains 第一方文章日期 **2026-10-08**；发布 Mellum 2.1，12B MoE 代码模型（2.5B active parameters），Apache 2.0。
- **来源：**[JetBrains 发布文章](https://blog.jetbrains.com/ai/2026/10/mellum2-1-gets-to-work-a-fast-open-model-for-coding-agents/)，已保存为 `mellum.html`。
- **已实际查看的图：**汇总图及六张单项图列出 LiveCodeBench（汇总图标 v6）、AIME 25/26、GPQA Diamond、BFCL v4、IFEval、SWE-bench Verified；第八张图是推理速度/输出 tokens per second（FP8、ISL/OSL 2304/256、一张 H200），不是 benchmark。基准对照对象为 Mellum 2.1、Mellum 2、Gemma 4 E4B、Qwen 3.5-9B。文章没有提供各 benchmark 图的精确 harness 或 split 脚注。八张第一方 PNG 均已下载并视觉查看。
- **Catalog 对照描述：**LiveCodeBench（`livecodebench`）条目要求发布批次/时间窗，图标 v6；catalog 有 AIME 2024、AIME 2025，但未找到 AIME 2026 条目，图中 “AIME 25/26” 未说明具体试卷组成。GPQA Diamond（`gpqa-diamond`）、BFCL（`bfcl`，图注明确 v4）、IFEval（`ifeval`）和 SWE-bench Verified（`swe-bench-verified`）均有精确条目。

## 边界线索（未确认）

以下线索在本轮没有第一方的窗口内日期证据，或缺少适合提取评测图表的第一方来源，因此未作为已确认发布写入：inclusionAI Ling 3.1 Flash（现有线索来自 OpenRouter）；Nace AI Drex v1.5（HF 页面线索，尚未核实第一方窗口日期）；Microsoft AesCode、Meta MetaEncoder 30B、NVIDIA PixelUMM、Amazon ALoDLM 8B、Tencent Youtu-Parsing-Omni、LightOn OCR3。它们仅是有限后续线索，不代表相关厂商在窗口内没有发布。

## Catalog 查询边界

上述 catalog 描述来自工作区已有的结构化 JSON 索引。本笔记没有改动 benchmark catalog，也不作最终收录或等价映射判断。“未找到精确记录”仅指本次按名称/别名查询的索引快照，没有覆盖所有潜在别名。
