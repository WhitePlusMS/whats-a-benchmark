# Artificial Analysis 94 项评测与本站目录对照

核对日期为 2026-11-13。本站以 GitHub 的 [main 快照](https://github.com/WhitePlusMS/whats-a-benchmark/tree/59b6d4c3b99053c528345d84522444b5d0ec6392/content/benchmarks)为准，逐项核对了 317 条 `published` 目录记录的名称、别名、版本与相关来源。工作区的生成目录有 318 条，多出的 [Decision Index v2.0](../../content/benchmarks/artificial-analysis-decision-index-v2.json) 尚未进入 main，是一张综合指数卡。表内的本站链接指向目录源文件，线上页面部署状态未逐页验收。

94 项沿用上一轮盘点范围，包括 87 项 AA 发布过结果或纳入官方指数的评测及测试协议，以及 7 项 MicroEvals 官方示例补出的原题库。一个指数可能汇总多项评测，单项评测也可能在多个榜单里出现。表格按可辨识的题集或协议计数。显著改变题集且有可辨识历史成绩的 AA-Omniscience 两版分列。Terminal-Bench 2.0 和 2.1 属于同一 89 题母集，在一行内交代。MicroEvals 社区公开记录另有独立目录。来源见 [AA 评测](https://artificialanalysis.ai/evaluations)、[AA 方法总览](https://artificialanalysis.ai/methodology)及 [MicroEvals](https://artificialanalysis.ai/microevals)。

| 口径 | 合计 | 已收录 | 仅相关条目 | 仅被提及 | 未收录 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 评测主目录与详情页 | 40 | 27 | 6 | 0 | 7 |
| 专项榜单与研究页面 | 14 | 2 | 8 | 1 | 3 |
| 图片、视频、音乐和语音 | 20 | 3 | 2 | 0 | 15 |
| 推理与硬件 | 5 | 0 | 0 | 0 | 5 |
| 旧榜单、报告与历史题集 | 8 | 5 | 1 | 0 | 2 |
| MicroEvals 官方示例新增的题库 | 7 | 4 | 0 | 0 | 3 |
| **合计** | **94** | **41** | **17** | **1** | **35** |

- **已收录**指已有对应题集、评测版本或协议的目录条目。AA 的运行参数与模型成绩仍按官方页面另行核对。AA-Omniscience v1.0 以同一张卡内有明确标记的公开案例和版本资料计入。
- **仅相关条目**指本站已有母集、上游实现或其他版本，AA 所用的子集、版本或独立协议仍无对应条目。
- **仅被提及**指已进入主分支的综合指数说明有这个分项，且没有相应题集或同系列的独立条目。**未收录**指在 main 的目录中未找到对应或可映射条目。工作区独有的资料在备注里标明。

## 评测主目录与详情页（40 项）

AA 主目录在同一个 HealthBench 页面提供原始版与 Professional 两个视图。模型页的评分下拉项还包括同一题集的多个指标。来源见 [AA 模型评测视图](https://artificialanalysis.ai/models/gpt-6-1-sol#intelligence-breakdown)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 1 | [AA-Briefcase v1.1](https://artificialanalysis.ai/evaluations/aa-briefcase) | 已收录 | [aa-briefcase](../../content/benchmarks/aa-briefcase.json) | v1.1 改用 Crowd-BT 拟合 Elo，沿用 v1 的任务。 |
| 2 | [AA-3D](https://artificialanalysis.ai/evaluations/aa-3d) | 未收录 | — | 独立的交互式 3D 作品生成评测，目录中的 Rapidata SVG Generation 是另一套评测。 |
| 3 | [APEX-Agents-AA](https://artificialanalysis.ai/evaluations/apex-agents-aa) | 仅相关条目 | [apex-agents](../../content/benchmarks/apex-agents.json)、[apex-agents-1-1](../../content/benchmarks/apex-agents-1-1.json) | AA 使用 452 个公开任务和 Stirrup。本站有 480 题的原版及上游 1.1（Harbor 交付修订 1.1.1）。 |
| 4 | [AA-AnalystAgent](https://artificialanalysis.ai/evaluations/aa-analyst-agent) | 已收录 | [aa-analyst-agent](../../content/benchmarks/aa-analyst-agent.json) | 同一 80 题的表格与文档定量分析评测。 |
| 5 | [AutomationBench-AA](https://artificialanalysis.ai/evaluations/automationbench-aa) | 已收录 | [automationbench-aa](../../content/benchmarks/automationbench-aa.json)、[automationbench](../../content/benchmarks/automationbench.json) | AA 版采用上游 v1.0.6 的环境并使用 AA 私有留出集。本站分别有 AA 版和 Zapier v1.0.6。 |
| 6 | [Harvey LAB-AA v1.1](https://artificialanalysis.ai/evaluations/harvey-lab-aa) | 已收录 | [harvey-lab-aa-v1-1](../../content/benchmarks/harvey-lab-aa-v1-1.json)、[harvey-lab](../../content/benchmarks/harvey-lab.json) | AA v1.1 加入幻觉门槛。本站亦有上游 LAB，记录首发 v1.0 与 lab-core v1.2.0。 |
| 7 | [GDP.pdf](https://artificialanalysis.ai/evaluations/gdp-pdf) | 已收录 | [gdp-pdf](../../content/benchmarks/gdp-pdf.json) | 同一基础评测，本站记录 AA 实施差异。AA 的文档输入、执行框架和评委设置与 Surge 原版有差异。 |
| 8 | [EnterpriseOps-Gym-AA](https://artificialanalysis.ai/evaluations/enterprise-ops-gym-aa) | 未收录 | — | ServiceNow 原始评测的 AA 实施，当前目录也无对应母集条目。 |
| 9 | [Terminal-Bench 4.0](https://artificialanalysis.ai/evaluations/terminalbench-4-0) | 已收录 | [terminal-bench-4](../../content/benchmarks/terminal-bench-4.json)、[terminal-bench-3](../../content/benchmarks/terminal-bench-3.json)、[terminal-bench-2-1](../../content/benchmarks/terminal-bench-2-1.json)、[terminal-bench-2](../../content/benchmarks/terminal-bench-2.json) | 本站 4.0.0 对应 AA 4.0。另有 2.0、2.1、3.0，分别维护。AA 的 Hard、Science 见各自条目。 |
| 10 | [Terminal-Bench-Science 0.1](https://artificialanalysis.ai/evaluations/terminal-bench-science) | 已收录 | [terminal-bench-science-0-1](../../content/benchmarks/terminal-bench-science-0-1.json) | 独立科学任务集，AA 指数方法标为 0.1.0。 |
| 11 | [FrontierCode-AA 2.0](https://artificialanalysis.ai/evaluations/frontiercode-2-0) | 仅相关条目 | [frontiercode-1-1-main](../../content/benchmarks/frontiercode-1-1-main.json)、[frontiercode-1-1-extended](../../content/benchmarks/frontiercode-1-1-extended.json) | AA 2.0 为 132 题。本站有 1.1 Main 和 Extended。 |
| 12 | [HLE-Diamond](https://artificialanalysis.ai/evaluations/hle-diamond) | 已收录 | [hle-diamond](../../content/benchmarks/hle-diamond.json)、[hle](../../content/benchmarks/hle.json) | Diamond 与原始 HLE 各有条目。AA Decision Index 的 HLE-MultiChoice 见下表。 |
| 13 | [AA-PersonalityBench](https://artificialanalysis.ai/evaluations/aa-personalitybench) | 未收录 | — | AA 模型详情把同一评测的 8 个性格与表达指数分别列为评分项。 |
| 14 | [AA-Omniscience v1.1](https://artificialanalysis.ai/evaluations/omniscience) | 已收录 | [aa-omniscience](../../content/benchmarks/aa-omniscience.json) | 3,000 题，公开 300 题。本站在同一页区分 v1.1 与 v1.0 公开案例。 |
| 15 | [GPQA Diamond](https://artificialanalysis.ai/evaluations/gpqa-diamond) | 已收录 | [gpqa-diamond](../../content/benchmarks/gpqa-diamond.json)、[gpqa](../../content/benchmarks/gpqa.json) | Diamond 198 题和 GPQA 主集各有条目。 |
| 16 | [ITBench-AA](https://artificialanalysis.ai/evaluations/itbench-aa) | 未收录 | — | AA 的 ITBench 实施面向 Kubernetes 事故定位。 |
| 17 | [MMMU-Pro](https://artificialanalysis.ai/evaluations/mmmu-pro) | 已收录 | [mmmu-pro](../../content/benchmarks/mmmu-pro.json)、[mmmu](../../content/benchmarks/mmmu.json) | AA 使用增强版 MMMU-Pro，本站另有 MMMU。 |
| 18 | [IFBench](https://artificialanalysis.ai/evaluations/ifbench) | 已收录 | [ifbench](../../content/benchmarks/ifbench.json)、[ifeval](../../content/benchmarks/ifeval.json) | Allen AI 指令遵循评测的 OOD 测试集。IFEval 另有条目。 |
| 19 | [MLCR-AA](https://artificialanalysis.ai/evaluations/mlcr-aa) | 已收录 | [mlcr-aa](../../content/benchmarks/mlcr-aa.json) | 同一 60 道私有高难题的 AA 实施。 |
| 20 | [Code2Video-AA](https://artificialanalysis.ai/evaluations/code2video-aa) | 未收录 | — | HeyGen 评测的 AA 实施，通过代码生成成品视频。Video-MME 是视频理解评测。 |
| 21 | [HealthBench](https://artificialanalysis.ai/evaluations/healthbench) | 已收录 | [healthbench](../../content/benchmarks/healthbench.json)、[healthbench-hard](../../content/benchmarks/healthbench-hard.json) | 原始公开集 5,000 个对话。本站另有 Hard 子集。 |
| 22 | [HealthBench Professional](https://artificialanalysis.ai/evaluations/healthbench) | 已收录 | [healthbench-professional](../../content/benchmarks/healthbench-professional.json) | 525 个临床人员相关对话，与原始 HealthBench 共用 AA 详情入口，可切换。 |
| 23 | [CritPt v2](https://artificialanalysis.ai/evaluations/critpt-v2) | 仅相关条目 | [critpt](../../content/benchmarks/critpt.json) | AA 页有 v2 完整 70 题，智能指数用 40 题 Hard 子集。本站当前是原版。 |
| 24 | [VIALS-AA](https://artificialanalysis.ai/evaluations/vials-aa) | 未收录 | — | Handshake AI 的科学图像问答评测由 AA 独立实施。 |
| 25 | [Multimodal Knowledge Agent（MKA）](https://artificialanalysis.ai/evaluations/mka/) | 未收录 | — | Google DeepMind 的多模态专业工作评测，AA 有独立实施。 |
| 26 | [GDPval-AA v2.1](https://artificialanalysis.ai/evaluations/gdpval-aa) | 已收录 | [gdpval-aa-v2-1](../../content/benchmarks/gdpval-aa-v2-1.json)、[gdpval-aa](../../content/benchmarks/gdpval-aa.json)、[gdpval](../../content/benchmarks/gdpval.json) | AA 版用 OpenAI 220 题公开 gold 集。v2.1 改 Elo 拟合和锚点。本站分别有原始 GDPval、AA 系列和 AA v2.1。 |
| 27 | [τ³-Banking](https://artificialanalysis.ai/evaluations/tau3-banking) | 已收录 | [tau3-banking](../../content/benchmarks/tau3-banking.json) | τ-Knowledge 的 banking 域。本站标明应固定 1.0.1 或更新的评分修订。 |
| 28 | [Terminal-Bench 2.1](https://artificialanalysis.ai/evaluations/terminalbench-2-1) | 已收录 | [terminal-bench-2-1](../../content/benchmarks/terminal-bench-2-1.json)、[terminal-bench-2](../../content/benchmarks/terminal-bench-2.json) | 2.1 修订 2.0 的环境及题目指令，保留同一 89 题母集。AA 编程榜曾以 2.0 跑其中 84 项，后来 2.1 覆盖全套 89 项。见 [AA 编程榜发布说明](https://www.linkedin.com/posts/artificial-analysis_announcing-the-artificial-analysis-coding-activity-7459631455477051395-gJsd)。 |
| 29 | [FrontierCode 1.1 Main](https://artificialanalysis.ai/evaluations/frontiercode) | 已收录 | [frontiercode-1-1-main](../../content/benchmarks/frontiercode-1-1-main.json)、[frontiercode-1-1-extended](../../content/benchmarks/frontiercode-1-1-extended.json) | AA 跑 100 题 Main。本站 Main 和 50 题 Extended 各有条目。 |
| 30 | [AA-LCR v1.1](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning) | 已收录 | [aa-lcr](../../content/benchmarks/aa-lcr.json) | v1.1 修正 16 个答案键并更新判分，另有 Endpoint Accuracy 的 25 题抽样。 |
| 31 | [SciCode](https://artificialanalysis.ai/evaluations/scicode) | 已收录 | [scicode](../../content/benchmarks/scicode.json)、[scicode-verified](../../content/benchmarks/scicode-verified.json) | AA 方法记录 v1.0.1，当前详情标为审核中。本站另有 SciCode-Verified。 |
| 32 | [Humanity's Last Exam（HLE）](https://artificialanalysis.ai/evaluations/humanitys-last-exam) | 已收录 | [hle](../../content/benchmarks/hle.json)、[hle-diamond](../../content/benchmarks/hle-diamond.json) | 原始 HLE 在本站有条目。Diamond、Decision 多选版及端点 250 题抽样各有不同口径。 |
| 33 | [CritPt 原版](https://artificialanalysis.ai/evaluations/critpt) | 已收录 | [critpt](../../content/benchmarks/critpt.json) | 同为原版 challenge 层评测。v2 见第 23 项。 |
| 34 | [Terminal-Bench Hard](https://artificialanalysis.ai/evaluations/terminalbench-hard) | 仅相关条目 | [terminal-bench-2](../../content/benchmarks/terminal-bench-2.json)、[terminal-bench-2-1](../../content/benchmarks/terminal-bench-2-1.json)、[terminal-bench-4](../../content/benchmarks/terminal-bench-4.json) | AA 的独立难题子集。本站有 Terminal-Bench 系列，缺该 Hard 子集独立条目。 |
| 35 | [τ²-Bench Telecom](https://artificialanalysis.ai/evaluations/tau2-bench) | 仅相关条目 | [tau2-bench](../../content/benchmarks/tau2-bench.json) | 本站母条目记录 Telecom 域和抽样规模。AA Telecom 实施没有独立条目。 |
| 36 | [MMLU-Pro](https://artificialanalysis.ai/evaluations/mmlu-pro) | 已收录 | [mmlu-pro](../../content/benchmarks/mmlu-pro.json)、[mmlu](../../content/benchmarks/mmlu.json) | 本站分别收录 MMLU-Pro 和原始 MMLU。 |
| 37 | [LiveCodeBench](https://artificialanalysis.ai/evaluations/livecodebench) | 已收录 | [livecodebench](../../content/benchmarks/livecodebench.json)、[livecodebench-pro](../../content/benchmarks/livecodebench-pro.json) | 动态更新的题集，比较时要注明 release 与题目日期窗口。Pro 是本站另有的评测。 |
| 38 | [MATH-500](https://artificialanalysis.ai/evaluations/math-500) | 已收录 | [math-500](../../content/benchmarks/math-500.json) | 同一 500 题子集，手机小模型和 MicroEvals 示例也复用此题库。 |
| 39 | [AIME 2025](https://artificialanalysis.ai/evaluations/aime-2025) | 已收录 | [aime-2025](../../content/benchmarks/aime-2025.json)、[aime-2024](../../content/benchmarks/aime-2024.json)、[aime-2026](../../content/benchmarks/aime-2026.json) | AA 跑 2025 年两场共 30 题。本站按年份分别收录。 |
| 40 | [Global-MMLU-Lite](https://artificialanalysis.ai/evaluations/global-mmlu-lite) | 仅相关条目 | [global-mmlu](../../content/benchmarks/global-mmlu.json)、[aa-multilingual-index](../../content/benchmarks/aa-multilingual-index.json) | 本站有完整母集和基于 Lite 的 AA 多语言指数，指数文档写了 Lite 的范围，缺独立 Lite 卡。 |

## 专项榜单与研究页面（14 项）

跨榜单复用的题集在上表已有对应行。比如搜索指数的 AA-Omniscience 题集和编程指数的 Terminal-Bench 4.0。来源见 [AA 搜索方法](https://artificialanalysis.ai/methodology/search-api)及 [AA 编程 Agent 方法](https://artificialanalysis.ai/methodology/coding-agents-benchmarking)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 41 | [SWE-Atlas-QnA-AA](https://huggingface.co/datasets/ArtificialAnalysis/SWE-Atlas-QnA-AA) | 仅相关条目 | [swe-atlas-qna](../../content/benchmarks/swe-atlas-qna.json) | 同源 124 题。AA 版改写部分评分细则并更换判分模型，本站收录 Scale AI 原版。 |
| 42 | [CWE-Bench-AA](https://artificialanalysis.ai/evaluations/cwe-bench-aa) | 仅相关条目 | [cwe-bench-v1](../../content/benchmarks/cwe-bench-v1.json)、[aa-cyber-index](../../content/benchmarks/aa-cyber-index.json) | 本站有上游 CWE-bench v1。AA 实施采用 120 项私有留出任务，已在本站 Cyber Index 说明中提及。 |
| 43 | [DeepsecBench-AA](https://artificialanalysis.ai/evaluations/deepsecbench-aa) | 仅被提及 | [aa-cyber-index](../../content/benchmarks/aa-cyber-index.json) | 本站 Cyber Index 列出该组成项，缺 DeepsecBench-AA 或上游 DeepsecBench 的独立条目。 |
| 44 | [CyberGym-E2E-AA](https://artificialanalysis.ai/evaluations/cybergym-e2e-aa) | 仅相关条目 | [cybergym-e2e](../../content/benchmarks/cybergym-e2e.json)、[aa-cyber-index](../../content/benchmarks/aa-cyber-index.json) | 本站有上游 920 项母集。AA 用 131 项，本站 Cyber Index 记录了其范围。 |
| 45 | [AA-Paperclip](https://artificialanalysis.ai/evaluations/aa-paperclip) | 未收录 | — | AA 决策指数的私有文档任务。工作区的 Decision Index v2.0 记录了该分项。 |
| 46 | [EvalSafe-O*NET-AA](https://artificialanalysis.ai/evaluations/evalsafe-onet-aa) | 未收录 | — | AA 从上游 7,500 题过滤出 6,582 题。工作区的 Decision Index v2.0 记录了该分项。 |
| 47 | [When2Call（AA 决策协议）](https://artificialanalysis.ai/evaluations/when2call) | 仅相关条目 | [when2call](../../content/benchmarks/when2call.json) | 本站有 NVIDIA 原评测。AA 保留 3,423 道多选题，Decision Index v2.1 用 Decision Score。 |
| 48 | [AA-Omniscience-Decision v1.1](https://artificialanalysis.ai/evaluations/aa-omniscience-decision) | 仅相关条目 | [aa-omniscience](../../content/benchmarks/aa-omniscience.json) | AA 用 500 道私有多选题。本站有知识问答母评测，当前工作区另有指数分项说明。AA v1.1 改拒答选项表述和计分。 |
| 49 | [HLE-MultiChoice v1.1](https://artificialanalysis.ai/evaluations/hle-multichoice) | 仅相关条目 | [hle](../../content/benchmarks/hle.json) | AA v1.0 为 513 道纯文本多选题，v1.1 为 509 道并加入拒答选项。本站收录 HLE 母集，工作区另有分项说明。 |
| 50 | [AA-Symmetry v1.1](https://artificialanalysis.ai/evaluations/aa-symmetry) | 未收录 | — | AA v1.0 有 440 个表述，v1.1 增到 460 个，基础题都是 120 个。当前工作区的 Decision Index v2 有分项说明。 |
| 51 | [DeepSearchQA](https://artificialanalysis.ai/methodology/search-api#deepsearchqa) | 已收录 | [deepsearchqa](../../content/benchmarks/deepsearchqa.json) | AA 使用同一 900 道公开 eval 题。本站记录 Google 原评测，AA 的固定模型、搜索配置和判分是单独的运行协议。 |
| 52 | [BrowseComp（AA 搜索子集）](https://artificialanalysis.ai/methodology/search-api#browsecomp) | 仅相关条目 | [browsecomp](../../content/benchmarks/browsecomp.json) | 本站收录 OpenAI 原版 1,266 题，AA 搜索榜抽取 200 题。 |
| 53 | [BFCL（AA 手机和端点协议）](https://artificialanalysis.ai/methodology/mobile-device-benchmark-set) | 仅相关条目 | [bfcl](../../content/benchmarks/bfcl.json) | 本站记录 BFCL v1 至 v4 的系列演进。AA 手机方案 640 题，端点方案使用 BFCL v4-500，本站均无单独条目。另见 [AA 端点准确性方法](https://artificialanalysis.ai/methodology/endpoint-accuracy-index)。 |
| 54 | [AA-Robotics v0.1](https://artificialanalysis.ai/articles/aa-robotics) | 已收录 | [aa-robotics](../../content/benchmarks/aa-robotics.json) | 同一具身研究预览，8 个真机桌面任务各自有结果，整套计一项。 |

## 图片、视频、音乐和语音（20 项）

视频每种任务的有声和无声榜共用入口，可在页面切换 **With Audio** 与 **No Audio**。语音转文字的三套语料在 AA-WER v2.2 的批量和流式测试中复用。方法与版本见 [图片](https://artificialanalysis.ai/methodology/image)、[视频](https://artificialanalysis.ai/methodology/video)、[音乐](https://artificialanalysis.ai/methodology/music)、[文字转语音](https://artificialanalysis.ai/methodology/text-to-speech)及 [语音转文字](https://artificialanalysis.ai/methodology/speech-to-text)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 55 | [AA-Image-T2I v2.1](https://artificialanalysis.ai/image/leaderboard/text-to-image) | 未收录 | — | 文生图偏好榜。v2.1 延续 v2.0 的题目分类和按月更新方式。 |
| 56 | [AA-Image-Editing v2.1](https://artificialanalysis.ai/image/leaderboard/editing) | 未收录 | — | 参考图加文本指令的编辑偏好榜，方法页列出相对 v2.0 的调整。 |
| 57 | [AA-Video-T2V v2.1](https://artificialanalysis.ai/video/leaderboard/text-to-video) | 未收录 | — | 文生视频，有声榜。v2.1 沿用本组 v2.0 题集。 |
| 58 | [AA-Video-T2V-Silent v2.1](https://artificialanalysis.ai/video/leaderboard/text-to-video) | 未收录 | — | 文生视频，无声榜。v2.1 沿用本组 v2.0 题集。 |
| 59 | [AA-Video-I2V v2.1](https://artificialanalysis.ai/video/leaderboard/image-to-video) | 未收录 | — | 图生视频，有声榜。方法页列 1,000 个提示。 |
| 60 | [AA-Video-I2V-Silent v2.1](https://artificialanalysis.ai/video/leaderboard/image-to-video) | 未收录 | — | 图生视频，无声榜。方法页列 500 个提示。 |
| 61 | [AA-Video-Editing v1.1](https://artificialanalysis.ai/video/leaderboard/video-editing) | 未收录 | — | 视频编辑，有声榜。145 条源片段沿用 v1.0。 |
| 62 | [AA-Video-Editing-Silent v1.1](https://artificialanalysis.ai/video/leaderboard/video-editing) | 未收录 | — | 视频编辑，无声榜。102 条源片段沿用 v1.0。 |
| 63 | [AA-Music-Instrumental v1.1](https://artificialanalysis.ai/music/leaderboard/instrumental) | 未收录 | — | 纯音乐生成偏好榜，方法页另列相对 v1.0 的变化。 |
| 64 | [AA-Music-Vocal v1.1](https://artificialanalysis.ai/music/leaderboard/vocals) | 未收录 | — | 人声音乐生成偏好榜，方法页另列相对 v1.0 的变化。 |
| 65 | [Big Bench Audio v1.2](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#speech-reasoning) | 已收录 | [big-bench-audio](../../content/benchmarks/big-bench-audio.json) | 同一 1,000 条语音题库。本站以 v1.x 概述，AA 当前方法为 v1.2，v1.0、v1.1 的判分口径需分别记录。 |
| 66 | [Full Duplex Bench（AA 对话动态子集）](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#conversational-dynamics) | 仅相关条目 | [full-duplex-bench](../../content/benchmarks/full-duplex-bench.json) | 本站有上游 v1 并记录 v1.5、v2、v3。AA 用 v1 和 v1.5 的部分任务，Speech-to-Speech Index v2.0 已替换此组件。 |
| 67 | [τ-Voice（AA 实施）](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#agentic-performance) | 仅相关条目 | [tau-voice](../../content/benchmarks/tau-voice.json) | 本站收录 Sierra 原论文 v1。AA 运行协议需单独注明。 |
| 68 | [Speech Agent Arena](https://artificialanalysis.ai/speech-to-speech/arena/overview) | 已收录 | [speech-agent-arena](../../content/benchmarks/speech-agent-arena.json) | 本站记录首发。AA 后续给同一 Arena 增加任务完成率，与偏好榜一起纳入语音指数。 |
| 69 | [Provider Voice Arena](https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice) | 未收录 | — | 按供应商提供的音色比较，单项未见版本号。 |
| 70 | [Controlled Voice Arena](https://artificialanalysis.ai/text-to-speech/leaderboard/controlled-voice) | 未收录 | — | 统一参考音色比较，单项未见版本号。 |
| 71 | [Pronunciation Robustness](https://artificialanalysis.ai/methodology/text-to-speech/pronunciation-robustness-overview) | 已收录 | [pronunciation-robustness](../../content/benchmarks/pronunciation-robustness.json) | 同一 AA 发音鲁棒性评测，公开方法未见单项版本号。 |
| 72 | [AA-AgentTalk](https://artificialanalysis.ai/articles/aa-wer-v2) | 未收录 | — | AA-WER v2.0 引入的私有语音数据，现用于 v2.2。 |
| 73 | [VoxPopuli-Cleaned-AA v1.0](https://huggingface.co/datasets/ArtificialAnalysis/VoxPopuli-Cleaned-AA) | 未收录 | — | AA-WER v1.0 用未清洗的 VoxPopuli，v2.x 用 AA 清洗版。 |
| 74 | [Earnings22-Cleaned-AA v1.0](https://huggingface.co/datasets/ArtificialAnalysis/Earnings22-Cleaned-AA) | 未收录 | — | AA-WER v1.0 用未清洗的 Earnings22，v2.x 用 AA 清洗版。 |

## 推理与硬件（5 项）

此处的计数单位是性能测试协议。手机推理测试由 Liquid AI 运行，AA 核验其测量方法。来源见 [联合发布说明](https://artificialanalysis.ai/articles/mobile-phone-intelligence-inference)及 [Pipette 文档](https://pipette.liquid.ai/docs/introduction)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 75 | [LLM API Performance v3.0.0](https://artificialanalysis.ai/methodology/performance-benchmarking) | 未收录 | — | AA 的 API 速度、延迟等测试协议，方法页另有 v2.2.0 的版本记录。 |
| 76 | [AA-SLT（System Load Test）](https://artificialanalysis.ai/methodology/system-load-test) | 未收录 | — | 测试系统在不同负载下的表现。 |
| 77 | [AA-AgentPerf](https://artificialanalysis.ai/methodology/agentperf) | 未收录 | — | 以真实 Agent 请求回放测量数据中心硬件推理性能。 |
| 78 | [AA-AgentPerf-Local](https://artificialanalysis.ai/hardware-inference-stack/laptops-workstations) | 未收录 | — | 独立的本地笔记本和工作站推理评测与榜单。 |
| 79 | [手机真机推理（Liquid AI Pipette）](https://artificialanalysis.ai/hardware-inference-stack/mobile-phones) | 未收录 | — | Liquid AI 在手机上实测，AA 核查方法并发布结果。手机小模型能力题集另见 BFCL 一行。 |

## 旧榜单、报告与历史题集（8 项）

旧报告中的“纳入官方指数”也包含 AA 报告引用的结果。2024 Quality Index 对部分较早模型采用厂商披露成绩。来源见 [AA 2024 官方报告](https://artificialanalysis.ai/downloads/ai-review/2024/Artificial-Analysis-AI-Review-2024-Highlights.pdf)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 80 | [AIME 2024](https://artificialanalysis.ai/methodology/intelligence-benchmarking#version-history) | 已收录 | [aime-2024](../../content/benchmarks/aime-2024.json)、[aime-2025](../../content/benchmarks/aime-2025.json)、[aime-2026](../../content/benchmarks/aime-2026.json) | 按年份分别记录。AA 智能指数 v2.1 移除了 2024 年试题，本站条目注明各报告的 I、II 试卷范围。 |
| 81 | [DeepSWE v1.0 / v1.1](https://artificialanalysis.ai/methodology/coding-agents-benchmarking#version-history) | 已收录 | [deep-swe-v1-1](../../content/benchmarks/deep-swe-v1-1.json) | 本站有 v1.1。AA 两版均为 113 项任务，v1.1 更新环境与验证，编程榜 v2.0 改用 FrontierCode 1.1。 |
| 82 | [SWE-Bench-Pro-Hard-AA](https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index) | 仅相关条目 | [swe-bench-pro](../../content/benchmarks/swe-bench-pro.json)、[swe-bench-pro-v2-hard](../../content/benchmarks/swe-bench-pro-v2-hard.json) | AA 在 2026 年 5 月公布了 150 题子集的成绩。本站的 v2 Hard 是同年 9 月发布的 HARD-51。见 [AA 首发说明](https://www.linkedin.com/posts/artificial-analysis_announcing-the-artificial-analysis-coding-activity-7459631455477051395-gJsd)和 [Scale v2 文档](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)。 |
| 83 | [WildGuardTest](https://artificialanalysis.ai/evaluations/wildguardtest) | 未收录 | — | AA 曾用于 Decision Index v1，v2 移除。当前工作区 Decision Index v2 提及这次调整。 |
| 84 | [AMI SDM](https://artificialanalysis.ai/methodology/speech-to-text#version-history) | 未收录 | — | AA-WER v1.0 使用的会议语音集，v2.0 移除。SDM 是单路远场麦克风设置。见 [AMI Corpus](https://groups.inf.ed.ac.uk/ami/corpus/)。 |
| 85 | [AA-Omniscience v1.0](https://artificialanalysis.ai/evaluations/omniscience) | 已收录 | [aa-omniscience](../../content/benchmarks/aa-omniscience.json) | 6,000 题版，公开 600 题。本站在同一张卡内保存旧版公开题及说明，主条目为 v1.1。 |
| 86 | [MMLU](https://artificialanalysis.ai/downloads/ai-review/2024/Artificial-Analysis-AI-Review-2024-Highlights.pdf) | 已收录 | [mmlu](../../content/benchmarks/mmlu.json)、[mmlu-pro](../../content/benchmarks/mmlu-pro.json)、[global-mmlu](../../content/benchmarks/global-mmlu.json) | 原始 MMLU 曾用于 2024 Quality Index，MicroEvals 亦有示例。MMLU-Pro 和 Global-MMLU 在本站分别收录。 |
| 87 | [HumanEval](https://artificialanalysis.ai/downloads/ai-review/2024/Artificial-Analysis-AI-Review-2024-Highlights.pdf) | 已收录 | [human-eval](../../content/benchmarks/human-eval.json) | 原始 HumanEval 曾用于 2024 Quality Index，MicroEvals 亦有示例。 |

## MicroEvals 官方示例新增的题库（7 项）

AA 的 7 个官方示例分类共引用 12 套原题库。GDPval、MATH-500、AIME 2025、MMLU、HumanEval 已在前面覆盖。下表 7 项只核实了 AA 提供官方示例入口，链接指向题库发布方。来源见 [MicroEvals 官方示例](https://artificialanalysis.ai/microevals)。

| # | AA 项目 | 本站状态 | 本站目录 | 版本和范围 |
| ---: | --- | --- | --- | --- |
| 88 | [ARC Challenge（AI2 ARC）](https://huggingface.co/datasets/allenai/ai2_arc/viewer/ARC-Challenge) | 未收录 | — | Allen AI 科学选择题 ARC-Challenge。本站的 ARC-AGI-2、3 是另一套网格推理评测。 |
| 89 | [GSM8K](https://huggingface.co/datasets/openai/gsm8k) | 已收录 | [gsm8k](../../content/benchmarks/gsm8k.json) | 本站收录原始 main 划分。 |
| 90 | [MBPP](https://huggingface.co/datasets/google-research-datasets/mbpp) | 已收录 | [mbpp](../../content/benchmarks/mbpp.json) | 本站同一张卡注明原始版与 sanitized 划分。 |
| 91 | [SimpleQA](https://openai.com/index/introducing-simpleqa/) | 已收录 | [simpleqa](../../content/benchmarks/simpleqa.json)、[simpleqa-verified](../../content/benchmarks/simpleqa-verified.json) | 本站同时有 OpenAI 原始 SimpleQA 和独立修订集 SimpleQA Verified。 |
| 92 | [TruthfulQA](https://github.com/sylinrl/TruthfulQA) | 未收录 | — | MicroEvals 展示此题库样题。本站的事实知识评测与之分开。 |
| 93 | [FRAMES](https://huggingface.co/datasets/google/frames-benchmark) | 未收录 | — | Google 的检索、推理与事实准确性评测，本站无同名或同一题集的条目。 |
| 94 | [IFEval](https://huggingface.co/datasets/google/IFEval) | 已收录 | [ifeval](../../content/benchmarks/ifeval.json)、[ifbench](../../content/benchmarks/ifbench.json) | 本站有 IFEval 原始集。IFBench 有独立条目。 |

## 综合指数的版本对照

这几张本站已有的综合指数卡用于理解上表的分项关系，单列在 94 项之外。

| 指数 | AA 官网版本 | 本站目录版本 |
| --- | --- | --- |
| [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index) | v5.0.1，汇总 9 项。 | [v4.3.2](../../content/benchmarks/aa-intelligence-index.json)，组合与权重按该版本。 |
| [Coding Agent Index](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) | v2.0，FrontierCode 1.1 Main、Terminal-Bench 4.0、SWE-Atlas-QnA-AA。 | [Coding Agent Index](../../content/benchmarks/artificial-analysis-coding-agent-index.json)记录 v1.5（2026年9月，具体日未披露）。 |
| [Cyber Index](https://artificialanalysis.ai/methodology/cyber-index) | v1，3 项等权。 | [v1](../../content/benchmarks/aa-cyber-index.json)，有分项说明。 |
| [Decision Index](https://artificialanalysis.ai/methodology/decision-index) | v2.1，6 项。 | [工作区 v2.0](../../content/benchmarks/artificial-analysis-decision-index-v2.json)，尚未进入 main。 |
| [Speech-to-Speech Index](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) | v2.0，新版加入 Arena 任务成功率，历史 Full Duplex Bench 仍有资料。 | [v1.0](../../content/benchmarks/artificial-analysis-speech-to-speech-index.json)，并交代后续演变。 |
| [Multilingual Index](https://artificialanalysis.ai/models/multilingual) | 基于 Global-MMLU-Lite，按 AA 支持语言展示。 | [AA Multilingual Index](../../content/benchmarks/aa-multilingual-index.json)，按语言快照记录。 |

## 范围说明

34 个 AA 项目连同 7 个历史或示例题库等明细均以上表逐项状态为准。统计衡量目录覆盖。可复现性、样例再利用条件和模型分数的可比性需按各项目资料判断。AA 的目录、结果页和模型榜单会更新，本表固定在核对日期及上述主分支提交。
