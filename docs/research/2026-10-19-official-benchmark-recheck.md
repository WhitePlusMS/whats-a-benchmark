# 官方模型与 Benchmark 严格复核（2026-10-19）

模型材料窗口为 **2026-10-04 至 2026-10-18**，没有扩大到19日。以当前156项目录为基线。本次只纠正研究清单，未自动收录或发布。

上一轮33条型号/披露记录、129份图片、300条引用是广泛发现快照，不是缺少33个模型或300个benchmark。复核分别检查发布者身份、日期事件、评测定义和现有目录身份；同一评测跨模型引用只计一次，版本/子集/指数不冒充独立题库。

## 严格确认结果

| 分组 | 去重数量 | 含义 |
|---|---:|---|
| 确认缺少的具名基准或套件 | 40 | 已找到发布者定义、作者论文或正式维护项目；当前156项目录没有对应身份。模型的具体split、harness或版本仍按证据备注保留。 |
| 机构非公开或部分公开评测 | 8 | 有机构署名及任务/方法说明；题集或完整人评数据未公开或仅部分公开。单列，不冒充公开可复现题库。 |
| 传统数据集或数据任务 | 10 | 正式研究/机构数据，来源有效；属于传统数据集或任务，单列避免与新评测套件混计。 |
| 定义成立但模型来源或日期边界另列 | 9 | 基准本身有正式出处；本轮只在Iris或首次可用日期未核实的Voxtral材料中发现，不纳入严格主名单计数。 |
| 复合指数，不与单项题集混计 | 6 | 聚合多项测试或维度的指数；即使值得收录，也不等于新增一个独立基础题集。部分owner/版本仍待核。 |
| 已有系列的版本或实施待补核 | 6 | 已有同系列记录；这里只发现年度、衍生实施或新版差异，不计为全新基准。 |
| 身份或定义尚不足，不计确认缺项 | 8 | 模型厂商具名引用不足以证明题集发布者、正式定义或来源属性；先保留线索，不计已确认漏项。 |

**保守确认40项具名基准/套件缺项，另有8项机构非公开或部分公开评测、10项传统数据任务。** 三组不能合称“58个这半个月新发布的公开benchmark”。这也不是穷尽性漏项总数；定义待核、模型边界和复合指数仍单列。具体收录还需精确发布日期、数据访问和版本规范，不能从模型发布日期反推benchmark日期。

## 模型来源及日期门槛

严格主名单保留29条公司/机构官方发布或披露记录，合并同次Sol/Luna和NVIDIA两型号后为27组事件。大公司、正式模型公司、机构研究均可；不以参数小或作者使用个人GitHub为由否定正式研究。

- Step 5 Preview：官方称2026-09-20首次介绍，10-15只是计划权重日期；实际窗口内开放权重尚未核实，不算本窗口首次发布。
- SemanTok：2026-10-07是Stability研究文章；论文v1为2026-09-30，不计本窗口首次模型发布。
- Voxtral Arabic：有Mistral/MTNRA联合开发署名；2026-10-08目前仅核实仓库创建时间，首次公开可用日待核。来源正规，但日期另列。
- Iris-3B：Sperid官网自称研究实验室，不能据此说它是假机构或个人玩票；本轮保守移出重点统计。其社区LoRA、量化/移植明确不当新基础模型。仅在此材料发现的4个图像基准保留正式定义证据、另列。
- MAI-Base-2：2026-10-15是预训练研究披露，仍在后训练；不称为当日可用产品。四项MAI内部评测已经收录，不计漏项。

发布者逐项证据见[来源复核](2026-10-19-model-publisher-recheck.md)；其33条是发现记录，31组是未筛日期边界的原始事件分组，均不等于上述严格27组。

## 为什么仍有几十项

当前156项目录偏重通用大模型与agent能力，扩展到记忆、法律、语音、embedding和小模型传统NLP任务后，会遇到此前尚未覆盖的既有研究。比如LegalBench为Stanford协作项目，LoCoMo来自Snap Research/ACL论文，ToolSandbox由Apple发布，ChartQAPro有ACL 2025 Findings论文。它们是正式可追溯评测，很多早于本次窗口。

PinchBench具有Kilo官方背书及维护项目，保留为行业/社区基准并明确性质，不冒称学术同行评审。8项非公开/部分公开评测包括Meta的JobBench、MemoryBench、VBT、FocusBench，Surge的Riemann-bench，Collinear的CWE-bench v1，以及AA的Pronunciation Robustness和Speech Agent Arena。未找到公开入口与官方明确私有两种证据分别记录，绝不据此补造题目。

## 全部逐项判定


### 确认缺少的具名基准或套件（40）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| AgentHarm | UK AI Safety Institute 与论文合作者；[来源1](https://arxiv.org/abs/2410.09024) [来源2](https://huggingface.co/datasets/ai-safety-institute/AgentHarm) | Mistral Large 4 Preview | 面向具工具/多步任务 agent 的有害能力评测，不是普通 jailbreak prompt 集；与上述两项独立。 运行时工具配置、augmentation 或子集会影响可比性。 |
| b³ Agent Security | UK AI Security Institute (UK AISI) 研究团队定义 b³ Benchmark；Lakera 维护相关模型风险指数；[来源1](https://www.aisi.gov.uk/research/breaking-agent-backbones-evaluating-the-security-of-backbone-llms-in-ai-agents) [来源2](https://www.lakera.ai/ai-model-risk-index) [来源3](https://mistral.ai/news/mistral-large-4/) | Mistral Large 4 Preview | Mistral 所称“B3 Agent Security”可依据同文及 Lakera/AISI 来源映射到 b³ benchmark；大小写/排版是名称变体。Lakera AI Model Risk Index 是相关排行榜/聚合结果，不是 benchmark 本身。 需区分论文基准与 Lakera 现行指数的采样、版本和模型覆盖。 |
| ChartQAPro | Vis+NLP / IntelligentVis Lab at York University; paper by Ahmed Masry et al., published in ACL 2025 Findings；[来源1](https://aclanthology.org/2025.findings-acl.978/) [来源2](https://arxiv.org/abs/2504.05506) [来源3](https://github.com/vis-nlp/ChartQAPro) [来源4](https://huggingface.co/datasets/ahmed-masry/ChartQAPro) [来源5](https://mistral.ai/news/mistral-large-4/) | Mistral Large 4 Preview | 独立于ChartQA原版的更广、更难数据集，不是ChartQA的一个版本号或同一测试集；Mistral模型图中的ChartQA Pro分数应与其评估工具/子集说明一并看。 Mistral该次运行具体采用的数据版本、样本范围、工具使用和评分配置需回到其原表/附注确认。 |
| Cybench | Stanford 作者团队及公开项目；[来源1](https://cybench.github.io/) [来源2](https://openreview.net/forum?id=tc90LV0yRL) [来源3](https://arxiv.org/abs/2408.08926) | Mistral Large 4 Preview | 任务/比赛来源及各机构的翻译、运行配置属实现差异；不与 CyberGym 系列合并。 本轮未核具体当前版本与各官方安全机构改编版差异。 |
| CyberGym-E2E | UC Berkeley RDI 与合作大学作者团队定义 CyberGym-E2E；AA 后缀表示 Artificial Analysis 运行/呈现；[来源1](https://rdi.berkeley.edu/blog/cybergym-e2e/) [来源2](https://arxiv.org/abs/2606.04460) [来源3](https://github.com/sunblaze-ucb/cybergym-e2e) | Mistral Large 4 Preview | CyberGym-E2E-AA 是 AA 对 CyberGym-E2E 的实现/榜单归属标识，不能与底层基准或已有 CyberGym 母基准混为一项；CyberGym 是旧版不同基准。 核查 AA 的具体任务子集和评测/拒答规则时需用 AA 自己的方法资料。 |
| Finch (FinWorkBench) | FinWorkBench 作者团队；ACL 2026 Findings；[来源1](https://aclanthology.org/2026.findings-acl.523.pdf) [来源2](https://github.com/FinWorkBench/Finch) [来源3](https://huggingface.co/datasets/FinWorkBench/Finch) | Mistral Large 4 Preview | Finch 是 FinWorkBench 的简称/称谓，同一基准只计一次；评估跨 spreadsheet-centric 企业工作流。 数据/代码公开；许可和确切版本应按数据卡及论文确认。 |
| GraphWalks | OpenAI发布 openai/graphwalks 数据集；NVIDIA NeMo Gym 封装运行；发布报告方使用其评测。；[来源1](https://huggingface.co/datasets/openai/graphwalks) [来源2](https://github.com/NVIDIA-NeMo/Gym/blob/main/benchmarks/graphwalks/README.md) [来源3](https://epoch.ai/benchmarks/graphwalks/review) [来源4](https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_model_evaluation.pdf) | Gemini 4 Argon | Google报告中的BFS F1、Parents F1和不同上下文长度是同一openai/graphwalks数据上的子任务/筛选运行配置；NeMo wrapper的N3 1M是运行预设，不等同新基准。 首发团队和原始完整定义应以 OpenAI graphwalks 数据/代码仓库确定；Google PDF 只证实其报告配置。 |
| JailbreakBench | JailbreakBench 作者团队；[来源1](https://github.com/JailbreakBench/jailbreakbench) [来源2](https://jailbreakbench.github.io/) | Mistral Large 4 Preview | Mistral 对其测量 refusal rate 是复用基准/行为集的一种统计；不能由三个 benchmark 平均拒绝率反推单独统一分数。 具体使用的数据集/版本、攻击和 judge 配置需按 Mistral 表注进一步核对。 |
| LABBench2 | Edison Scientific / FutureHouse作者团队；论文作者包括FutureHouse、Edison Scientific及学术合作者；[来源1](https://openreview.net/pdf?id=owvCKDejrX) [来源2](https://huggingface.co/datasets/EdisonScientific/labbench2) [来源3](https://github.com/EdisonScientific/labbench2) | Gemini 4 Argon | LABBench2是LAB-Bench的演进版、任务与难度更新；不可当作同一题集的简单别名。 本轮未完整核验 LABBench2 发布仓库的最终数据、许可和具体版次；论文被 OpenReview 托管。 |
| LegalBench | Stanford Hazy Research 与跨学科贡献者团队；[来源1](https://hazyresearch.stanford.edu/legalbench/) [来源2](https://arxiv.org/abs/2308.11462) | GLM-Legal | Mistral/其他厂商如果报告其他法律任务，不是 LegalBench；也不得把 Harvey Legal Agent Benchmark 与它合并。 模型报告中的 LegalBench 名称应确认其具体任务子集和评分方式。 |
| LoCoMo | Snap Research 与论文作者团队；[来源1](https://github.com/snap-research/locomo) [来源2](https://aclanthology.org/2024.acl-long.747/) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | 严格字符串未命中；目录 MRCR v2 是另一类长上下文指代检索任务，不是 LoCoMo，不能算命中。 原始数据规模较小；报告中的 LoCoMo 具体任务/评估度量需按配置注明。 |
| LongMemEval | 论文作者团队（USC/Stanford 合作者）；后续 V2 独立版本作者团队；[来源1](https://arxiv.org/abs/2410.10813) [来源2](https://github.com/xiaowu0162/LongMemEval) [来源3](https://github.com/xiaowu0162/LongMemEval-V2) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | 原版 LongMemEval 与 LongMemEval-V2 是有明确关系但内容、任务设定不同的版本/扩展；厂商提到原名不自动表示使用 V2。 Hy-Memory 官方页仅名称时尚未证明其所用数据和版本；catalog无精确项目。 |
| LVBench | Zhipu AI、清华大学作者团队；[来源1](https://arxiv.org/abs/2406.08035) [来源2](https://github.com/zai-org/LVBench) [来源3](https://openaccess.thecvf.com/content/ICCV2025/papers/Wang_LVBench_An_Extreme_Long_Video_Understanding_Benchmark_ICCV_2025_paper.pdf) | Gemini 4 Argon | 论文/仓库对应同一 LVBench；非本月新版本。 版本变更历史和授权条款需按仓库具体文件核查。 |
| MemoryArena | 论文作者团队（多机构作者）；官方研究论文；[来源1](https://arxiv.org/abs/2602.16313) [来源2](https://openreview.net/pdf?id=DK6AToxJNo) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | 不同于 LoCoMo 等静态长对话回忆任务，测试在 agent 与环境交互中学习并复用经验。 团队的所属机构信息未在本轮逐个核实；不据个人作者身份降低正式性。 |
| MentalHealthBench | OpenAI 与 80 余位跨国持牌心理健康专家合作；[来源1](https://openai.com/index/introducing-mentalhealthbench/) | GPT-6 Sol (October)；GPT-6 Luna (October) | 独立正式公开评测发布；本地当前 156 项目录中未有同名项。 论文/数据集下载链接需按官方发布页面进一步核验；发布日 2026-09-23。 |
| PersonaMem-v2 | 论文作者团队（宾大等合作作者）；官方 GitHub 数据代码；[来源1](https://arxiv.org/abs/2512.06688) [来源2](https://github.com/bowen-upenn/PersonaMem-v2) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | PersonaMem-v2 是明确版本；不可仅用 PersonaMem 字符串合并未声明版本的结果。 Hy-Memory 页面是否使用完整 v2、公开测试 split 或特定 harness 未由当前片段确认。 |
| PLawBench | 论文作者团队；ACL 2026；[来源1](https://aclanthology.org/2026.acl-long.458/) [来源2](https://arxiv.org/abs/2601.16669) | GLM-Legal | PLawBench（全大写写作 PLAWBENCH）是独立于 LegalBench、LawBench 及 Harvey LAB 的 benchmark。 论文所指数据代码链接当前为匿名仓库；发布许可/可长期访问性本轮不核。 |
| PostTrainBench | aisa-group / ELLIS Institute Tübingen、MPI-IS、University of Tübingen 等论文作者团队；[来源1](https://posttrainbench.com/) [来源2](https://arxiv.org/abs/2603.08640) [来源3](https://github.com/aisa-group/PostTrainBench) | Gemini 4 Argon | 网站目前列 v1、v1.1、v1.2；属于 AI R&D 自动化任务，不能与其内部组成的 AIME/GSM8K 等目标任务混同。 发布者是跨机构研究团队；不能仅因研究者个人署名而视作随编。 |
| StrongREJECT | 论文作者团队；[来源1](https://strong-reject.readthedocs.io/en/latest/) [来源2](https://proceedings.neurips.cc/paper_files/paper/2024/hash/e2e06adf560b0706d3b1ddfca9f29756-Abstract-Datasets_and_Benchmarks_Track.html) | Mistral Large 4 Preview | 复用某个 refusal evaluator/benchmark 不等于新版本；与 JailbreakBench、AgentHarm 是不同评测定义。 Mistral 图表只披露汇总拒绝率的分组范围，不能拆算各单项结果。 |
| SWE-Atlas-QnA | Scale AI / Scale AI SEAL；[来源1](https://huggingface.co/datasets/ScaleAI/SWE-Atlas-QnA) [来源2](https://www.mercor.com/apex/oss-benchmarks/oss-swe-atlas-leaderboard/) [来源3](https://scale.com/leaderboard/sweatlas-qna) | Mistral Large 4 Preview；Beam | 两种拼写/称呼指同一公开子基准，合并一项；SWE-Atlas 后续 Test Writing、Refactoring 属于不同子项。报告称 AA 私有评测指运行条件，不代表 Scale 基准不可公开。 区分 Scale 的 benchmark 数据和各报告方所用 harness、抽样/运行次数及版本。；需要核对具体发布图表使用的是 Scale 官方数据还是 AA 自有运行 harness。 |
| SWE-bench Multimodal | Princeton / Stanford SWE-bench 作者团队；[来源1](https://arxiv.org/abs/2410.03859) [来源2](https://openreview.net/forum?id=riTiq3i21b) [来源3](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multimodal) | Claude Haiku 5.5 | SWE-bench Multimodal 是 SWE-bench 的独立子套件/扩展，目录中如有 SWE-bench Verified 仅是母系列相关项，不能作直接命中。 母系列关系明确但数据集不同；模型卡需说明是否跑 517 项和对应 agent/harness。 |
| SWE-ContextBench | SWE-ContextBench 论文作者团队；HF 官方数据集维护者；[来源1](https://arxiv.org/abs/2602.08316) [来源2](https://huggingface.co/datasets/jiayuanz3/SWEContextBench) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | 目录中没有 SWE-ContextBench；也不得以 SWE-Bench Lite 当成命中。Hy-Memory 报告 Lite Related 对应 related tasks 的筛选子集，不是独立基准名。 本轮未核实际发布文件 ID/hash；原论文版本与现行数据集文件的具体更新需分别固定。 |
| ToolSandbox | Apple；[来源1](https://arxiv.org/abs/2408.04682) [来源2](https://github.com/apple/ToolSandbox) | LFM2.5-24B-A2B (base and post-trained) | 论文/公开代码沿用 ToolSandbox 名称。 当前被引用模型所用版本、运行参数未由模型发布页提供。 |
| LiveClawBench | Mosi-AI研究团队；[来源1](https://arxiv.org/abs/2604.13072) [来源2](https://github.com/Mosi-AI/LiveClawBench) | LFM2.5-24B-A2B (base and post-trained) | 规范项目名 LiveClawBench；与 RealClawBench、Claw-Eval-Live 为不同项目，不按 Claw 相似词合并。 被引用的版本需按发布页所示版本确认。 |
| PinchBench | Kilo AI（Kilo官方资料称项目起于其DevRel Brendan O’Leary的side project；当前由PinchBench组织维护）；[来源1](https://blog.kilo.ai/p/pinchbench-v2-call-for-contributors) [来源2](https://blog.kilo.ai/p/pinchbench-20-is-here) [来源3](https://github.com/pinchbench/) [来源4](https://pinchbench.com/about) | Nemotron 3.5 Super VL；LFM2.5-24B-A2B (base and post-trained) | 官方 runs 与 community submissions 明确分开；需要运行版本和是否官方run。 它不是因Kilo背书就自动等同同行评审学术基准；引用具体结果仍需区分官方标准化runs与community submissions，并注明运行版本。 |
| WebArena Verified | ServiceNow Research及合作者；[来源1](https://openreview.net/forum?id=94tlGxmqkN) [来源2](https://github.com/ServiceNow/webarena-verified) | LFM2.5-24B-A2B (base and post-trained) | Verified 全量812 tasks；Hard子集在论文中137项，repo README较新列258项；请按具体revision区分，绝不与原版WebArena结果等同。 任务数量差异对应文稿/repo时间或发布版本，准确历史变更需锁commit。 |
| Multi-IF | 研究作者团队；[来源1](https://arxiv.org/abs/2410.15553) [来源2](https://github.com/UKPLab/Multi-IF) | LFM2.5-24B-A2B (base and post-trained) | 论文定义 Multi-IF；与单轮IFEval不同。 发布模型引用的执行拆分或提示未核。 |
| SPEED-Bench | NVIDIA AIPerf；SPEED-Bench作者团队；[来源1](https://arxiv.org/abs/2604.09557) [来源2](https://docs.nvidia.com/aiperf/dev/tutorials/datasets-inputs/profile-with-speed-bench-dataset) [来源3](https://github.com/ai-dynamo/aiperf/blob/main/docs/tutorials/speed-bench.md) | Nemotron 3.5 Bolt 74B-A9B 24GB | SPEED-Bench是数据集；AIPerf是benchmarking/profiling工具，不应合成名为“AIPerf SPEED-Bench”的新基准。 发布模型图的行是否实际使用该公开SPEED-Bench配置需从原图/说明核实。 |
| Big Bench Audio (BBA) | Artificial Analysis；[来源1](https://huggingface.co/blog/big-bench-audio-release) [来源2](https://huggingface.co/datasets/ArtificialAnalysis/big_bench_audio) [来源3](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) | Grok Voice 3.0 | BBA v1.0/v1.1/v1.2评分口径/裁判变化；须匹配具体版本。 当前发布表具体版本需查模型原始发布材料。 |
| Full Duplex Bench | Guan-Ting Lin等研究作者；arXiv论文署名并由作者维护的公开项目；[来源1](https://arxiv.org/abs/2503.04721) [来源2](https://github.com/DanielLin94144/Full-Duplex-Bench) [来源3](https://arxiv.org/abs/2507.23159) [来源4](https://arxiv.org/abs/2510.07838) [来源5](https://arxiv.org/abs/2604.04847) [来源6](https://artificialanalysis.ai/methodology/speech-reasoning-benchmarking) | Grok Voice 3.0 | Full Duplex Bench v1/v1.5；AA自建subset/实现不等于论文全套。 被引用模型实际使用的FDB版本和是否AA子集，需看对应原始模型发布页。 |
| τ-Voice | Sierra Research；[来源1](https://sierra.ai/-/cdn/document?src=https%3A%2F%2Fcdn.sanity.io%2Ffiles%2Fca4jck6w%2Fproduction%2F534fa64bf36e1d8334bd39efad568ab6d4ec43bc.pdf) [来源2](https://github.com/sierra-research/tau2-bench) [来源3](https://artificialanalysis.ai/methodology/speech-reasoning-benchmarking) | Grok Voice 3.0 | AA实现与原始τ-Voice实现/样本不可默认等同。 发布图若未标实现和数据子集则未知。 |
| EVA-Bench | 论文作者团队；[来源1](https://arxiv.org/abs/2605.13841) | Grok Voice 3.0 | EVA-A/EVA-X是指标名，不是两个独立基准。 xAI发布页只陈述EVA-Bench分数；具体协议、版本、执行者需查发布页引用原文。 |
| MTEB Code | MTEB维护组织/论文作者；[来源1](https://leaderboard.mteb.org/) [来源2](https://github.com/embeddings-benchmark/mteb) [来源3](https://docs.mteb.org/api/benchmark/) | EmbeddingGemma 2 | MTEB(Code, v1)是benchmark子套件；不与MTEB总体、单个CodeSearchNet或模型card中泛称“code”混为一谈。 本轮发布页具体执行任务列表和版本未核。 |
| MIEB-lite | MIEB论文作者团队；[来源1](https://arxiv.org/abs/2504.10471) [来源2](https://openaccess.thecvf.com/content/ICCV2025/papers/Xiao_MIEB_Massive_Image_Embedding_Benchmark_ICCV_2025_paper.pdf) [来源3](https://github.com/embeddings-benchmark/mteb) | EmbeddingGemma 2 | 完整MIEB与MIEB-lite不同规模；别名“Massive Image Embedding Benchmark Lite”指后者。 模型报告是否严格跑lite而不是完整MIEB需核。 |
| MAEB | 论文作者团队 / MTEB维护组织；[来源1](https://arxiv.org/abs/2602.16008) [来源2](https://github.com/embeddings-benchmark/mteb) | EmbeddingGemma 2 | MAEB与MAEB+不同：30 vs 98任务；正式名称为Massive Audio Embedding Benchmark。 不同checkpoint/leaderboard使用的数据版本需固定。 |
| ToolRet | 研究作者团队；[来源1](https://github.com/mangopy/tool-retrieval-benchmark) | Clef-omni | 论文更名/正式版本应以ACL记录为准。 从当前仓库搜索结果未记录论文DOI/ACL anthology精确条目。 |
| API-Bank | 研究作者团队；[来源1](https://arxiv.org/abs/2304.08244) | Clef-omni | API-Bank既有评测集，也有更大训练集；不可把训练集当benchmark测试拆分。 引用时需区分评测集与训练资源。 |
| When2Call | NVIDIA研究团队；[来源1](https://arxiv.org/abs/2504.18851) [来源2](https://github.com/NVIDIA/When2Call) | Clef-omni | 评测分为multiple-choice及LLM-judge形式，引用需核子集。 模型报告对应子集未给。 |
| BRIGHT | 论文作者团队；[来源1](https://arxiv.org/abs/2407.12883) [来源2](https://brightbenchmark.github.io/) | Clef-omni | 官方页面称1385 real-world queries，论文摘要记1384；不同源统计有1条差异，映射要按版本/数据文件。 具体版本计数应锁定发布revision。 |
| DeepSearchQA | Google DeepMind / Google Research等；[来源1](https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA_benchmark_paper.pdf) [来源2](https://blog.google/innovation-and-ai/technology/developers-tools/deep-research-agent-gemini-api/) | Beam | 发布文章、技术报告版本时间略有差异；数据和leaderboard按官方Google/Kaggle项目。 发布模型的评分judge和pass设置须单独比对。 |

### 机构非公开或部分公开评测（8）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| CWE-bench v1 | Collinear AI; benchmark is also independently run/reported by Artificial Analysis as CWE-Bench-AA；[来源1](https://cwe-bench.com/) [来源2](https://blog.collinear.ai/p/cwe-bench-v1) [来源3](https://arxiv.org/abs/2610.17020) [来源4](https://deepmind.google/models/gemini/cyber/) [来源5](https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_model_evaluation.pdf) | Gemini 4 Argon | Google图中CWE-bench v1对应Collinear基准；Artificial Analysis的CWE-Bench-AA是对该基准的独立运行/报告标识，官方Collinear说明不同harness与推理模式下分数不可直接相比。与CWE-Bench-Java等同名旧研究不同。 私有测试题无法从外部逐项检查；Google score的harness、模型effort和与Collinear leaderboard版本对应关系需核对模型卡/原始表注。 |
| FocusBench | Meta；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://research.meta.ai/blog/muse-wonder) | Muse Wonder | 作为 Meta 专有评估项；Personal Superintelligence Index 只是含它的内部复合指数。 具体题集、权重和评分协议待核。 |
| JobBench | Meta Muse Wonder model card reports an individual JobBench; benchmark owner not established by first-party public definition in this check；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/) | Muse Wonder | 不与其他同名 JobBench 项目自动合并；也不因在 Meta 模型卡出现就推断为公开正式基准。 Meta卡片说明了任务数、职业范围及评分方式，但题目、rubrics、数据和独立复现方式未公开；是否存在同名外部基准须按源链区分。 |
| MemoryBench (Meta) | Meta；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://research.meta.ai/blog/muse-wonder) | Muse Wonder | 可确认为 Meta 私有内部评测或厂商自定义评估项；不与其他 MemoryBench 研究项目合并。 题集、评分器、完整协议与可复现性未公开确认。 |
| Riemann-bench | Surge AI；[来源1](https://surgehq.ai/blog/riemann-bench-a-benchmark-for-moonshot-mathematics) [来源2](https://surgehq.ai/research?36cc75a9_page=2) [来源3](https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_model_evaluation.pdf) | Gemini 4 Argon | RiemannBench、Riemann-bench为同一名称写法；公开版本有过评测流程/时限更新，Surge说明此前一小时限制后调整为每题不限时，另设一小时超时；Google报告仅引用某次配置结果。 具体私有题目不可公开复核；Google被引用分数究竟对应Surge哪个评测流程/leaderboard快照需按报告日期和Surge成绩页核对。 |
| VBT | Meta Muse Wonder model card identifies as PSI component; owner/expanded name unknown；[来源1](https://research.meta.ai/static/muse-wonder-model-card) | Muse Wonder | VBT是Meta内部评测在PSI中的一个构件；不得仅按缩写与其他同名项目合并。 可见模型卡给出内部评测的总体任务定义，但题集、判分规则和版本未公开；VBT缩写有多义，须限于Meta模型卡语境。 |
| Pronunciation Robustness | Artificial Analysis；[来源1](https://artificialanalysis.ai/methodology/text-to-speech/pronunciation-robustness-overview) [来源2](https://artificialanalysis.ai/methodology/text-to-speech) | Fish Audio Drama 3 | AA自有实施名称；版本或发布时间应按AA方法历史。 全量句集为防污染 withheld，完整复现不可得。 |
| Speech Agent Arena | Artificial Analysis；[来源1](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) | Grok Voice 3.0 | Arena Elo与Task Success Rate为不同指标；v1.1纳入指数，v2.0仍可单项报告但指数改用任务成功率。 个人录音/对话不公开，需区分样本门槛与隐私披露。 |

### 传统数据集或数据任务（10）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| BANKING77 | 作者团队 / PolyAI；[来源1](https://arxiv.org/search/?query=Clinc+Banking77+intent+benchmark&searchtype=all) [来源2](https://github.com/PolyAI-LDN/task-specific-datasets) | Clef-omni | 官方train/test与MTEB Banking77任务不可泛称同一执行切分。 Mellum/d1具体运行split未在材料标注。 |
| CLINC150+OOS | Clark等作者 / 原始CLINC150项目；[来源1](https://aclanthology.org/D19-1131/) [来源2](https://github.com/clinc/oos-eval) | Clef-omni | CLINC150+OOS若组合了特定ID/OOS splits，需区分标准CLINC150 test与CLINC OOS Plus。 d1发布材料未明示文件版本及切分。 |
| Amazon ESCI | Amazon Science / 作者团队；[来源1](https://github.com/amazon-science/esci-data) | Clef-omni | ESCI是四分类标注；发布图中的“Amazon ESCI”需区分来源版本/locale。 d1运行本地任务版本未披露。 |
| SQuAD 2.0 | Stanford / Rajpurkar等作者；[来源1](https://rajpurkar.github.io/SQuAD-explorer/) [来源2](https://arxiv.org/abs/1806.03822) | d1-3B; d1-omni-600M | SQuAD 2.0与SQuAD2-CR不同；材料写SQuAD 2.0应对齐原基准。 运行版本/切分未披露。 |
| Civil Comments | Civil Comments项目/Google Jigsaw及学术作者；[来源1](https://www.tensorflow.org/datasets/catalog/civil_comments) [来源2](https://github.com/Convergence-Lab/Getting-Toxicity-Right) | d1-3B; d1-omni-600M | 不能只凭Civil Comments名称确定具体challenge/标签/拆分。 d1具体使用何split/指标不明。 |
| MASSIVE intent subset | Amazon Alexa / MASSIVE作者团队；[来源1](https://arxiv.org/abs/2204.08582) [来源2](https://github.com/alexa/massive) | d1-3B; d1-omni-600M | MASSIVE 1.0 51语言，1.1另含Catalan；intent与slot任务也不同。 d1所用语言/split不明。 |
| PubMedQA | 研究作者团队；[来源1](https://arxiv.org/abs/1909.06146) | d1-3B; d1-omni-600M | 需区分PQA-L、PQA-U、PQA-A配置。 报告中具体配置未披露。 |
| BoolQ | Google Research / Clark等作者；[来源1](https://arxiv.org/abs/1905.10044) [来源2](https://github.com/google-research-datasets/boolean-questions) | d1-3B; d1-omni-600M | BoolQ与其他Boolean QA任务不同；须按原数据集版本核。 本次使用split未披露。 |
| XNLI | Conneau等作者 / Facebook AI Research；[来源1](https://arxiv.org/abs/1809.05053) | d1-3B; d1-omni-600M | XNLI语言和split影响对比。 d1的具体语言/评测配置未披露。 |
| PAWS-X | Google Research / Yang等作者；[来源1](https://arxiv.org/abs/1908.11828) [来源2](https://github.com/google-research-datasets/paws) | d1-3B; d1-omni-600M | PAWS-X与PAWS英文、具体语言版本应分别标识。 d1报告未标语言或split。 |

### 定义成立但模型来源或日期边界另列（9）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| GenEval | 论文作者团队；[来源1](https://papers.neurips.cc/paper_files/paper/2023/hash/a3bf71c7c63f0c3bcb7ff67c67b1e7b1-Abstract-Datasets_and_Benchmarks.html) [来源2](https://github.com/djghosh13/GenEval) | Iris-3B | GenEval是2023基准；GenEval 2是另一个后续版本/项目，不能只按同名合并。 Iris来源评估与该NeurIPS基准的独立存在/定义无关。 |
| DPG-Bench | 腾讯研究团队；[来源1](https://arxiv.org/abs/2403.05135) [来源2](https://github.com/TencentQQGYLab/ELLA) | Iris-3B | 常见写法DPG-Bench/DPG-Bench；不与GenEval同名或等价。 模型引用结果是否使用原始DPG-Bench及具体裁判/版本仍需查。 |
| LongText-Bench | Tencent Hunyuan X团队（X-Omni作者团队）；[来源1](https://arxiv.org/abs/2507.22058) [来源2](https://arxiv.org/html/2507.22058v1) [来源3](https://github.com/X-Omni-Team/X-Omni) [来源4](https://huggingface.co/datasets/X-Omni/LongText-Bench) | Iris-3B | EN是LongText-Bench英文子集，不宜作为独立基准重复计数。 LongText-Bench-EN是英文部分/模型报告标签；具体结果可能覆盖全英文160项或另行筛选，需依模型材料确认。 |
| OneIG-Bench | 上海交通大学（SJTU）与StepFun作者团队；[来源1](https://arxiv.org/abs/2506.07977) [来源2](https://openreview.net/pdf?id=de99679b077619698014ee8edf6b34e309cb58cb.pdf) [来源3](https://github.com/OneIG-Bench/OneIG-Benchmark) [来源4](https://huggingface.co/datasets/OneIG-Bench/OneIG-Bench) | Iris-3B | 项目含六组prompt；EN通常是多组内英文样本子集，需按所指具体set确认，不可重复当成OneIG独立新版本。 EN通常指多组prompt中的英文语料，须按模型发布所用版本/子集确认，不能视作完全独立新benchmark。 |
| MGB-2 | Qatar Computing Research Institute及MGB挑战赛团队；[来源1](https://arxiv.org/abs/1609.05625) [来源2](https://people.csail.mit.edu/jrg/2016/Ali-SLT-16.pdf) | Voxtral Mini 4B Realtime Arabic | MGB-2为2016挑战；与MGB-3/MGB-5不是同版本。 模型报告若只是MGB2语料切分，需分清竞赛test set。 |
| SADA | SDAIA及论文作者团队；[来源1](https://arxiv.org/abs/2508.12968) [来源2](https://www.kaggle.com/datasets/sdaiancai/sada2022) | Voxtral Mini 4B Realtime Arabic | SADA数据集与特定ASR基准设置不是同一概念。 若模型发布材料称benchmark，具体split/授权访问待确认。 |
| Casablanca | UBC NLP及多机构作者团队；[来源1](https://arxiv.org/abs/2410.04527) [来源2](https://aclanthology.org/2024.emnlp-main.1211/) | Voxtral Mini 4B Realtime Arabic | 8方言；数据集整体和某单一国家/方言子集需分别指明。 模型评测的具体version/split需查。 |
| FLEURS | Google Research；[来源1](https://arxiv.org/abs/2205.12446) [来源2](https://huggingface.co/datasets/google/fleurs) | Voxtral Mini 4B Realtime Arabic | FLEURS是多语言suite；Arabic locale（如ar_eg）只是语言/地区切片。 发布材料引用的locale/split未标。 |
| MASC | MASC论文/数据维护方；[来源1](https://arxiv.org/abs/2412.13788) [来源2](https://ieee-dataport.org/open-access/masc-massive-arabic-speech-corpus) | Voxtral Mini 4B Realtime Arabic | MASC clean与MASC noisy独立切片；不要把切片名当全新基准。 具体revision及clean criteria应根据原数据/论文核验。 |

### 复合指数，不与单项题集混计（6）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| AA Cyber Index | Artificial Analysis 与 Cyber Index Alliance（Collinear AI、IBM、NVIDIA、Vercel）；[来源1](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) [来源2](https://www.ridgebench.com/benchmarks) | Mistral Large 4 Preview | 有的官方评测 index 页/方法发布；应与三个组件分开排重。Mistral Large 4 的报告提及此项不是其 benchmark 定义。 本次可用直接来源对 AA Cyber Index 的定义来自 AA 方法页和 AA 指标说明引用；具体版次/可复现细节需看该方法页版本。 |
| PSI / Personal Superintelligence Index | Meta；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://research.meta.ai/blog/muse-wonder) | Muse Wonder | PSI 是 Meta 指数而不是独立题库；此名称可能有其他领域同名，应仅按全称及模型卡语境识别。 Meta 未公开完整权重/足够复现信息；组件外部/内部属性不同。 |
| Vals Index | Vals AI；[来源1](https://www.vals.ai/benchmarks/vals_index_v2) | Gemini 4 Argon | 复合指数版本会更新构件及权重；目录有部分可能构件（如 Tax Agent Bench、Terminal-Bench、Vibe Code Bench），但没有 Vals Index 条目。 各子项权重、私有题集、指数版本需查方法页；本轮不把指数重复算作单个基础 benchmark。 |
| Artificial Analysis Speech-to-Speech Index | Artificial Analysis；[来源1](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) | Grok Voice 3.0 | v1.0: BBA/Full Duplex/tau-Voice三项；v1.1加入Speech Agent Arena；v2.0换掉Full Duplex，改成Task Success Rate；不可跨版本视为同一配方。 模型引用版本未说明时不映射成固定成分。 |
| Jet Decision Index v0.2.1 / v0.3 | Jet（来源内容中称Jet；背后机构未独立确认）；[来源1](https://huggingface.co/perplexity-ai/pplx-decider-v1.1-27b) [来源2](https://community.perplexity.ai/t/pplx-decider-v1-1-27b-our-updated-open-weights-multimodal-decision-model-is-now-available/6286) [来源3](https://www.liquid.ai/blog/d1-open) | pplx-decider-v1.1-27b；d1-3B; d1-omni-600M | Jet v0.3来自Perplexity发布材料；Liquid d1使用v0.2.1。版本不同且其构成不公开，不能视为同配方/独立单项集。 Jet具体法律实体/机构身份未从材料独立核验；指数各组成评测未知。 |
| Artificial Analysis Coding Agent Index | Artificial Analysis；[来源1](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) | Mistral Large 4 Preview | 与AA Intelligence Index不同；实际版本需按引用日期核对。 指数构件/权重随版本变化。 |

### 已有系列的版本或实施待补核（6）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| AIME2026 | MAA / American Mathematics Competitions；[来源1](https://maa.org/news/2025-26-aime-thresholds-are-now-available/) [来源2](https://maa.org/maa-invitational-competitions/) | Beam | 2026 AIME不是AIME 2025/2024；是否I/II卷及题目公开合法性需以当年官方发布确认。 当前证据确认2026 AIME I/II竞赛身份，但原模型表所指的具体卷别、公开题源/测试样本和是否采用官方完整卷未确认。 |
| OSWorld 2.1 | 已有母系列；报告中的具体新版/实施仍需逐项追溯；[来源1](https://www.anthropic.com/claude-haiku-5-5) [来源2](https://deepmind.google/models/model-cards/gemini-4-argon/) [来源3](https://research.meta.ai/static/muse-wonder-model-card) | Claude Haiku 5.5；Gemini 4 Argon；Muse Wonder | OSWorld 2.1 不能由厂商标签自动推定新版本的完整任务集、首次发布日期或与已有条目的等价性。 |
| SciCode-Verified | 已有母系列；报告中的具体新版/实施仍需逐项追溯；[来源1](https://mistral.ai/_astro/scicode-verified-pass@1-(n_6)-alt_ZYLgs8.webp?dpl=6ad1d7b6946342e26a4d2b4f) | Mistral Large 4 Preview | SciCode-Verified 不能由厂商标签自动推定新版本的完整任务集、首次发布日期或与已有条目的等价性。 |
| GDPVal v2 (NVIDIA label) | 已有母系列；报告中的具体新版/实施仍需逐项追溯；[来源1](https://blogs.nvidia.com/wp-content/uploads/2026/10/GDPVal_TPS_v3.png) | Nemotron 3.5 Super VL | GDPVal v2 (NVIDIA label) 不能由厂商标签自动推定新版本的完整任务集、首次发布日期或与已有条目的等价性。 |
| Harvey LAB-AA v1.1 | 已有母系列；报告中的具体新版/实施仍需逐项追溯；[来源1](https://research.meta.ai/static/muse-wonder-model-card) | Muse Wonder | Harvey LAB-AA v1.1 不能由厂商标签自动推定新版本的完整任务集、首次发布日期或与已有条目的等价性。 |
| SWE-bench Pro v2-Hard | 已有母系列；报告中的具体新版/实施仍需逐项追溯；[来源1](https://reflection.ai/blog/introducing-beam) [来源2](https://reflection.ai/beam-model-card) | Beam | SWE-bench Pro v2-Hard 不能由厂商标签自动推定新版本的完整任务集、首次发布日期或与已有条目的等价性。 |

### 身份或定义尚不足，不计确认缺项（8）

| 规范名称 | 发布者/定义证据 | 引用该项的模型 | 版本与未决项 |
|---|---|---|---|
| CodeMemoryBench | 腾讯混元 Hy-Memory 官方页面披露该名称，但未找到公开 benchmark 定义页/数据或论文；[来源1](https://memory.hunyuan.tencent.com/) | Hy-Memory-30B-A3B (Hy-Memory 2.0 release) | 代码/问答两个标签可能是同一套件的任务域/子分项；没有证据拆为两个 benchmark。 benchmark 发布方、定义、公开性、许可、名称大小写/版本和评估协议均待核。 |
| Dense200 bbox | 未确认；Mistral 图表中的 Dense200 bbox 为指标/数据标签；[来源1](https://mistral.ai/news/mistral-large-4/) | Mistral Large 4 Preview | “bbox”后缀可能指定位格式或任务模式，不足以证明独立版本。 未定位发布者及定义；勿与任何同名 Dense200 数据/检测集自动合并。 |
| DRACO | Perplexity；Meta使用并在Muse Wonder model card中描述。；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://research.meta.ai/blog/muse-wonder) | Step 5 Preview；Muse Wonder | DRACO是Perplexity基准；Meta只披露其本次运行方式，不与其它同名缩写项目合并。 Meta卡片说明题数、问题类型和运行方式；第一方任务集、rubrics、公开访问和版本仍需Perplexity来源核验。 |
| KORA | KORA benchmark 发布者未由所见第一方页面可靠确认；Mistral 官方发布文引用KORA和 korabench.ai 场景页；[来源1](https://mistral.ai/news/mistral-large-4/) [来源2](https://korabench.ai/scenarios/mistral-large-4/default/test/62f52004ee850ce5) | Mistral Large 4 Preview | Mistral 报告 1.691/2 是其对该套件的评测分数；不得据此宣称该套件为 Mistral 自创或仅为私测。 owner、基准规模、独立评审/评分规则、访问许可待核。 |
| SWE-Marathon | Abundant AI；Meta model card carries externally reported results；[来源1](https://research.meta.ai/static/muse-wonder-model-card) [来源2](https://research.meta.ai/blog/muse-wonder) [来源3](https://surgehq.ai/ots) | Muse Wonder | Meta卡片所报是Abundant AI运行结果，且不同模型结果沿用不同coding agent/harness；不能自动当成同harness比较。 Meta卡片只给任务类型和评分，不揭示完整实例清单；Abundant AI第一方benchmark定义、公开访问、版本及标准harness仍需核对。 |
| PhishNChips | GitHub项目 R-Lit（公开仓库所示）；[来源1](https://github.com/R-Lit/PhishNChips) | Clef-omni | 仓库自述v5.2与引用条目为项目内主张；外部出版身份未确证。 作者/机构实名、DOI/会议信息、外部独立引用和数据来源许可均需复核；应保留身份未知。 |
| ISMA | 未确认；[来源1](https://arxiv.org/search/?query=ISMA+Arabic+speech+benchmark&searchtype=all) | Voxtral Mini 4B Realtime Arabic | 缩写歧义，不能与其他ISMA项目按缩写合并。 官方全称、维护方、数据/协议和版本均未知。 |
| Darija in the Wild | 未确认；[来源1](https://arxiv.org/search/?query=%22Darija+in+the+Wild%22&searchtype=all) | Voxtral Mini 4B Realtime Arabic | 相似描述不能替代同名证据。 名称、owner、正式论文、数据集身份均未知。 |

## 额外排重与停止计数项

- HLE with tools是HLE运行配置；AA Omniscience Index映射已有AA-Omniscience，不据英文后缀再新增。HealthBench Consensus在已有HealthBench数据画像中有说明。
- BFCL v3/v4、IFBench、AA-LCR v1.1、Finance Agent V2等已有覆盖；不因简称或版本显示方式差异重复建项。
- Apex Bench v1.1与APEX-Agents 1.1未找到官方等价证据；CMB、CriPT AA、未标版本的Vibe Code Bench继续待核。
- CodeMemoryBench只有腾讯图中标签，尚未证明其为腾讯自建私有集；DRACO和SWE-Marathon虽有Meta描述，原始发布方资料仍需补核。不得将“未找到公开题集”自动写成“厂商内部评测”。
- ListQA、Iris Safety、TypeSafe、Home appliances和无独立名称的安全/生产测试先保留线索，不计已确认缺项。
- 价格、延迟、CER均值、任务成功率、指数五维、OneIG维度、Travel/Shopping子项不独立计数。微软36/11项未具名套件不倒推组成。
- 原始采集并未穷尽每份系统卡全部附录；本次是已发现候选的严格确认集，不宣称全球所有新发布模型或所有benchmark已查尽。

## 交付与检查

可交互复核表：`artifacts/research/2026-10-18-model-release-audit/recheck/index.html`。同目录JSON保留规范身份、根判定、发布者定义来源与模型引用，CSV可单独查看。原图册/原始图片保留，顶部增加严格复核提示。

研究子报告：模型发布者、核心基准、专项基准三份；模型发布引用与benchmark原始定义分开。JSON、分类合计、别名排重、所有确认项的有效模型引用/定义证据均由脚本检查。本轮未修改正式content、src、tests或部署配置，不运行开发服务或网页GPT。
