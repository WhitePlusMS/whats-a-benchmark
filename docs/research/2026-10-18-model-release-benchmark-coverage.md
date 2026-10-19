# 2026-10-04 至 2026-10-18 模型发布与 Benchmark 覆盖核查

> **2026-10-19更正：本文件为广泛发现快照。33条型号/披露、129份图、300条引用均不等于新增benchmark数。严格复核确认至少40项具名基准/套件缺项，另列8项机构非公开/部分公开评测和10项传统数据任务；模型日期边界、指数、版本、未核名称单列。逐项最终研究判定以[官方来源严格复核](2026-10-19-official-benchmark-recheck.md)为准，未自动写入正式目录。**

核查日期：2026-10-18 至 2026-10-19 凌晨；发布窗口固定到 2026-10-18，不因跨日扩大。窗口包含首尾，以官方发布页、发行记录、模型卡或官方仓库事件分别核对。目录基线为当前磁盘中的 **156 项 published benchmark、19 份发布资料**。本次只整理研究证据，未把候选自动写入正式目录。

**结论：确实存在遗漏，且不只 DeepSeek 那张表。** 新发现分布在代码与科学、记忆、法律、语音、图像和决策任务。还存在已有母基准的新版本/衍生实施。厂商内部评分、延迟、价格、指数分项和公开 benchmark 分别记载，不能把每个图块都算成一个新 benchmark。

## 交付材料

- 本地图册：`artifacts/research/2026-10-18-model-release-audit/index.html`，可直接双击打开；可搜索模型、评测名，按分组查看，点击图片打开原文件。
- 逐行对照：同目录 `coverage.csv`，保留原名称、版本、模型、日期、工具/框架/子集条件、目录状态和来源。
- 机器可读证据：同目录 `audit.json`、四个分组 `manifest.json`；图像有原始路径、来源、视觉阅读状态和 SHA-256。
- 打包文件：`artifacts/2026-10-18-model-release-audit.zip`；解压后打开顶层 `index.html`。包含研究报告副本，源网页仅作为取证材料保存，图册不加载或执行这些网页的脚本。
- 采集数量以图册与 `audit.json` 的实际清单为准。不同型号可共享同张图，一项评测可有多张图；图像文件数、引用行数、候选型号记录数都不等于“新增 benchmark 数”。

本次最终登记 **33 条型号/披露记录、129 个图像文件、300 条评测引用记录**；129 个图像均有视觉查看记录。全部图册图片解码和本地 HTTP 字节哈希核验通过，实际浏览器搜索、分组、含 `%` 的文件名与语音图加载正常，无横向页面溢出。内嵌 SVG 片段保留原文件，图册使用官方页面 PNG 截图，避免脱离官网样式后显示失败。时间边界附图包含在图像数中，没有混算成新发布或新 benchmark。

## 官方发布/更新线索

下表按发布事件合并型号；不是把全部记录都称为已公开可用的新模型。

| 官方日期 | 型号或事件 | 已检查的主要评测资料 |
|---|---|---|
| 2026-10-05；10-16 | [Reflection Beam](https://reflection.ai/blog/introducing-beam)；[权重可用公告](https://reflection.ai/blog/beam-is-available) | 10-05 预览、10-08 成绩更新、10-16 权重公开分别保存；四组能力表、主评测与效率图。 |
| 2026-10-05 | [Amazon Nova 2.5 Sonic](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-Sonic/) | 官方 GA 公告；所查页未找到成绩图。 |
| 2026-10-05 | [Reka Rho-1](https://reka.ai/news/rho-1-collapsing-the-multimodal-stack) | 研究预览；自测/示意延迟条图与编辑案例，不当外部 benchmark。 |
| 2026-10-05；10-12 | [Sperid Iris-3B](https://huggingface.co/speridlabs/iris-3b) | 10-05 初始权重提交、10-07 论文；Turbo 权重为 10-12。保存原模型卡两张评分表截图，未把当前卡中 Turbo 成绩回填到 10-05。 |
| 2026-10-06 | [Mistral Large 4 Preview](https://mistral.ai/news/mistral-large-4/) | 官方原生 WebP 成绩图；API Preview，发布文称权重稍后公开。 |
| 2026-10-06 | [Google EmbeddingGemma 2](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/) | Code、Image、Audio embedding 三张原图。 |
| 2026-10-06 | [Google Nano Banana 2.1](https://deepmind.google/models/model-cards/nano-banana-2-1/) | 官方卡两组 T2I / Editing 表；SxS 人评 Elo 与 factuality AutoRater，未公开独立基准集名称。 |
| 2026-10-06 | [Perplexity pplx-decider-v1.1-27b](https://community.perplexity.ai/t/pplx-decider-v1-1-27b-our-updated-open-weights-multimodal-decision-model-is-now-available/6286) | 官方可用公告为 10-06，checkpoint 为 10-05；Decision Index v0.3 图。未采用二手所称 10-07。 |
| 2026-10-07 | [GPT-6 Sol / Luna October](https://deploymentsafety.openai.com/gpt-6-october/broken-search-tool) | October 系统卡七张原图和评测表。较早 Sol/Luna 首发博文另列时间边界材料，不并入 October 成绩。 |
| 2026-10-07 | [Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5) | 主表、三个 effort 交互图、Terminal 成本图；补查直链系统卡能力总表。 |
| 2026-10-07 | [Liquid AI d1-3B / d1-omni-600M](https://www.liquid.ai/blog/d1-open) | Decision Index v0.2.1 public split 与七项文本任务表；设备延迟单列。 |
| 2026-10-08 | [JetBrains Mellum 2.1](https://blog.jetbrains.com/ai/2026/10/mellum2-1-gets-to-work-a-fast-open-model-for-coding-agents/) | 综述、六项能力图与速度图；AIME 25/26 的年度混合条件保留未知。 |
| 2026-10-09 | [Cloudflare Clef-omni](https://blog.cloudflare.com/clef-faster-cheaper-multimodal) | 十项任务评测与 TypeSafe 工作流表；既有 Clef 的提速/降价不另当新模型权重。 |
| 2026-10-09 | [Microsoft Decision-1](https://commandline.microsoft.com/microsoft-decision-1-model-foundry/) | 官方仅披露 36 项能力/11 项安全套件的总范围，未给逐项名称，不猜其组成。 |
| 2026-10-09 | [Qwen-Image-2.1-Turbo](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | 官方国际服务生命周期日期；未找到 Turbo 专属成绩图，不借用 9 月原版 2.1 图。 |
| 2026-10-12 | [Meta Muse Wonder / Wonder Full](https://research.meta.ai/blog/muse-wonder) | 官方模型卡能力总表与任务说明页，保留两种配置。模型卡原 PDF 的确切链接见 global manifest。 |
| 2026-10-12 | [GLM-Legal](https://z.ai/blog/glm-legal) | 法律评测原图三行，精确日期来自官方文章元数据。 |
| 2026-10-13 | [Gemini 4 Argon](https://deepmind.google/models/model-cards/gemini-4-argon/) | 官方 PDF 主能力表和内部安全表；18 个具名项目，GraphWalks 两种长度条件单独记录。 |
| 2026-10-13 | [Liquid AI LFM2.5-24B-A2B](https://www.liquid.ai/blog/lfm2-5-24b-a2b) | 官方图表两张截图覆盖 16 项标签，base / post-trained 当日可用，温度、预算和 harness 逐项保留。 |
| 2026-10-13 | [Fish Audio Drama 3](https://beta.fish.audio/blog/fish-audio-drama-3/) | Pronunciation Robustness 原榜单图与分项表截图。 |
| 2026-10-14 | [Grok Voice 3.0](https://x.ai/news/grok-voice-3) | 综合表、τ-Voice 与成本 SVG；EVA-Bench 为正文引用，非图中项目。 |
| 2026-10-15 | [NVIDIA Nemotron 3.5 Super VL / Bolt 74B-A9B](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/) | 三张性能图、PinchBench 正文；Bolt E4B 在该文仅预告 10-23，不计窗内已可用。 |
| 2026-10-15 | [GPT-Live-1.1 / Quip](https://deploymentsafety.openai.com/gpt-live-1-1/) | 官方 PDF 两张表、三张安全对齐图；不当成外部通用语音能力榜。 |
| 2026-10-15 | [FLUX 3 Image Klein](https://bfl.ai/blog/flux-3-image-klein) | 四张内部 Elo / 参数 / 延迟 / runtime 原图。 |
| 2026-10-15 | [Krea 3](https://www.krea.ai/blog/introducing-krea-3) | 价格/耗时表和速度条图；厂商平台采样，不是新公开质量题集。 |
| 2026-10-16 | [Hy-Memory 2.0 / Hy-Memory-30B-A3B](https://memory.hunyuan.tencent.com/) | 五张网页区域截图，框架/模型/内部应用结果分别保留。 |
| 2026-10-17 | [DeepSeek V4.1-Flash-1017](https://api-docs.deepseek.com/news/news261017/) | 官方 11 行表与 DeepSWE 成本原图；10 项已经映射，Apex 仍未确认。 |

另收了三个边界材料：MAI-Base-2 的 **2026-10-15** 是预训练研究披露，官方称仍在 post-training；SemanTok 的 **2026-10-07** 是研究介绍，论文 v1 为 **2026-09-30**；Voxtral Mini 4B Realtime Arabic 的 **2026-10-08** 仅核实官方 HF 仓库创建时间，实际首次可用日未能由本轮独立确认。它们的图已保留，但不混算成当天首次公开可用的新模型。

## 目录中没有对应名称的主要候选

这里的“缺项”表示现有 156 条目录未覆盖该具名项目，不表示它是本月才发明的 benchmark，也不表示题库已经公开。逐行原始名称、版本、来源和条件见 CSV。后续正式收录前仍须追溯 benchmark 发布者，核对定义、版本、数据和许可。

| 来源 | 当前未覆盖的名称 | 需保留的边界 |
|---|---|---|
| Gemini 4 Argon | Vals Index、PostTrainBench、LABBench 2、RiemannBench、GraphWalks、LVBench、CWE-bench v1 | GraphWalks 的 BFS F1 与两个上下文长度分别记录。Terminal-Bench Science 0.1 已有，不列缺项。 |
| Mistral Large 4 | SWE-Atlas-QnA、ChartQA Pro、Dense200（bbox）、Finch / FinWorkBench、KORA、B3 Agent Security、AA Cyber Index、CyberGym-E2E (AA)、Cybench | SWE-Atlas 图注明 AA 私有评测、公开 harness 尚未推出；`v3` 若仅出现在图片文件名，不能作为基准版本。 |
| Mistral 安全拒绝图 | JailbreakBench、StrongREJECT、AgentHarm | 图报告三者平均拒绝率，不能拆造三项独立模型分数。 |
| Hy-Memory 2.0 | LoCoMo、MemoryArena、CodeMemoryBench、SWE-ContextBench、LongMemEval、PersonaMem v2 | SWE-ContextBench 为 Lite Related；CodeMemoryBench QA/Code 共用记忆。Travel / Shopping 先按子集处理，CMB 未展开。 |
| GLM-Legal | LegalBench、PLawBench | Harvey LAB 母基准已有；第三方法律评测与厂商自测条件保留。 |
| Meta Muse Wonder | JobBench、SWE-Marathon、FocusBench；内部 PSI / MemoryBench 另列 | PSI 是厂商内部组合指数，MemoryBench 专指本卡内部记忆测试；不与其他同名项目合并。 |
| LFM / NVIDIA | ToolSandbox、LiveClaw、PinchBench、WebArena Verified、Multi-IF、AIPerf SPEED-Bench | 温度、用户模拟器、浏览器动作预算分开记；BFCL、IFBench、IFEval、SciCode 已有。 |
| Fish / xAI 语音 | Pronunciation Robustness、AA Speech-to-Speech Index、Big Bench Audio、Speech Agent Arena、Full Duplex Bench、τ-Voice；EVA-Bench 为正文补记 | Task Success Rate 为指标；平均成本不是额外一套基准。 |
| EmbeddingGemma 2 | MTEB Code、Massive Image Embedding Benchmark Lite、Massive Audio Embedding Benchmark (MAEB) | 模态、Lite / Code 范围保留；不能只按 MTEB 母名归并。 |
| Iris-3B | GenEval、DPG-Bench、LongText-Bench (EN)、OneIG-Bench (EN) | OneIG 五维不另算五项；当前卡比较多型号，不把它们都当 10-05 的分数。 |
| Clef-omni | ToolRet、API-Bank、When2Call、BANKING77、CLINC150+OOS、BRIGHT、Amazon ESCI、PhishNChips | Home appliances 正式身份待核；TypeSafe 工作流/任务行不机械逐项新建基准。 |
| Liquid d1 / Perplexity | Decision Index（分别 v0.2.1 public split / v0.3）、SQuAD 2.0、Civil Comments、MASSIVE intent、PubMedQA、BoolQ、XNLI、PAWS-X | 指数五类不是五套独立 benchmark；图未列的 37 个组成项不猜。 |
| Beam | DeepSearchQA、SWE Bench Pro v2-Hard；AIME 2026 | SWE Atlas Codebase QnA 与 SWE-Atlas-QnA 近名待核。CriPT AA 与已有 CritPt 近拼写待核，不先计作新项目。 |
| OpenAI / Haiku 系统卡 | MentalHealthBench、SWE-bench Multimodal；内部 ListQA 另列 | Multilingual 已有，不能与 Multimodal 混同；ListQA 按内部具名评估候选记录。 |
| Voxtral Arabic 日期边界材料 | ISMA、Darija in the Wild、MGB-2、SADA、Casablanca、FLEURS、MASC clean | 日期状态如上；CER 均值与数据集组成图不另计新 benchmark。 |

## 已有母项但版本/实施不完整

| 报告中的名称 | 本站当前情况 | 本次判断 |
|---|---|---|
| OSWorld 2.1 / V2.1 offline | 有 OSWorld、OSWorld 2.0 | **版本待补**。Haiku 与 Meta 的 offline / partial reward / 任务数条件分别保存。 |
| SciCode-Verified | 有 SciCode | **衍生版本待补**，保留 pass@1(n=6)。 |
| GDPVal v2 | 有原 GDPval gold，以及另一套 GDPval-AA v2.1 | **版本待补**，不能将 AA v2.1 当成 NVIDIA 图中的 GDPVal v2。 |
| Harvey LAB-AA v1.1 | 有原 Harvey LAB | **实施差异待补**。Meta 卡称 AA 版并增加 hallucination 检查。 |
| SWE Bench Pro v2-Hard | 有 SWE-bench Pro 公开集 | **版本/子集待补**，原条目不能代替新任务集。 |
| AIME 2026 / AIME 25/26 | 有 AIME 2024、2025 | **年度待补**。混合图没有披露试卷配比，不能补猜。 |
| Vibe Code Bench（未标版本） | 有 v1.1 和 1–100 | **版本待确认**，不任选一个映射。 |

## 不能误报成遗漏的项目

- AA-Briefcase 已经是 **v1.1**；Vals Finance Agent 的既有来源已指向 **finance-agent-v2**，显示名较泛不等于缺项。
- Terminal-Bench Science **0.1**、Terminal-Bench **2.1 / 4.0**、IFBench、AA-LCR **v1.1**、BFCL、MCP-Atlas、τ³-Banking、AA-Omniscience 等均有条目。单纯大小写、空格、破折号、希腊字母或后缀写法不同不自动新建。
- HealthBench、Hard、Professional 已有。**Consensus** 已在 HealthBench 的 dataProfile 说明 3,671 例及指标；只是没有独立页面，不能写成完全未覆盖。
- 微软四项 MAI held-out、DeepSeek 表中已确认的十项已收录。Apex Bench v1.1 未有等价证据，仍不映射到 APEX-Agents。
- BFL 内部 Elo、Nano Banana 内部人评、OpenAI 内部行为测试、腾讯内部应用测试可以作为厂商内部评测研究，但不能冒称公开题库。延迟、每张图价格、CER/成功率与评分维度本身也不自动构成新 benchmark。

## 视觉阅读与检索边界

原生图片、SVG、官方 PDF 渲染页和网页区域截图分别标明来源。已登记为 `viewed: true` 的图像由研究团队实际用图片工具或浏览器查看；只下载未看的材料不据此标为已读。SVG 的浏览器阅读不冒称 `view_image` 支持 SVG。截图保留图名、版本/子集或相邻脚注，未重绘成绩、未 OCR 猜分，未补造题目。

仍有明确缺口：Mistral 页中的 Harvey 法律成绩图资源返回 404；Step 5 的完整官网评测页抓取超时；部分型号所查官方页没有成绩图；Voxtral 的精确可用日、本轮末尾列出的若干小厂商/HF 线索尚未确认。旧 OpenAI Sol/Luna 博文的部分官方导出 PNG 有深底文字/图例对比度不足，已保留原文件及可见正文；它们只放时间边界附录，没有推算看不清的分数。

覆盖了国内外通用、代码、记忆、法律、决策、嵌入、图像、视频和语音方向。厂商定向检索与跨厂商汇总搜索结合，二手目录仅用于发现线索，确认结论回到一方资料。未把“未找到”写成“该厂商没有发布”，也不声称穷尽全部社区模型或每份百页系统卡的所有附录。主要发布图/主能力表及关键模型卡已检查；四份分组记录保存更细的来源、排除项和未确证线索。

分组笔记：[国内](2026-10-18-model-release-audit-china.md)、[海外](2026-10-18-model-release-audit-global.md)、[媒体与专项](2026-10-18-model-release-audit-media.md)、[决策与代码补漏](2026-10-18-model-release-audit-specialist.md)。后续正式补录应按 [研究流程](../RESEARCH_WORKFLOW.md) 追溯评测方定义，不能把本报告的模型厂商引用清单直接当完整条目资料。
