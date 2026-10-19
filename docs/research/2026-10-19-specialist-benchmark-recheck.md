# Specialist benchmark identity recheck

范围：核对审计清单中具名评测的发布者、正式身份和定义；不做最终收录判定，也不复核模型分数。官方维护方代码、机构方法文档和论文/正式竞赛资料优先。规范学术作者身份与个人练习需分别判断：存在论文或明确维护的稳定套件即可认定为研究基准；仅仓库自述且无法独立印证出版/owner则保留未知。

## 结论边界

- 对 `content/benchmarks` 的名称、别名和 ID 做精确文本检索，本清单中的项目均无精确命中；JSON 中 `catalogIds` 因此留空。相近概念没有按名称相似度合并。
- 现有身份明确的研究/竞赛基准、机构自建具名评测、复合指数、公开数据集/切片分别标注。是否正式收录由主任务决定。
- 发布者引用来源可疑与其引用的基准真实存在是两层事实。例如，Iris材料来源评估不通过不会使GenEval或DPG-Bench本身变成虚构。
- 定义未能找到的缩写/项目显式记录 `definitionFound: false`，不推测来源或编造版本、出版日期和样例。

## 重点的版本与重复边界

- **Speech-to-Speech Index** 是AA复合指数。官方方法历史区分v1.0、v1.1、v2.0：v1.1含Speech Agent Arena；v2.0以Task Success Rate替换Full Duplex Bench。指数名与其中单项基准不能混计。
- **Full-Duplex-Bench**有作者论文和作者维护项目，公开v1、v1.5、v2、v3多版本；AA披露的Conversational Dynamics是其v1/v1.5部分任务的AA实现。**τ-Voice** 同理，AA agentic评测是基于Sierra研究项目的实现。**BBA**有v1.0、v1.1、v1.2评分/裁判变化。
- **SPEED-Bench** 是speculative decoding评测数据；AIPerf是NVIDIA测量/报告工具。`AIPerf SPEED-Bench`不应当作新benchmark名。
- **WebArena Verified** 独立于原版WebArena。Verified论文摘要Hard子集为137任务，当前仓库说明为258任务，应锁定版本/revision后比较。
- **LongText-Bench**来自Tencent Hunyuan X的X-Omni论文/项目，其英文/中文长文本渲染子集有论文附录定义；**OneIG-Bench**为SJTU与StepFun作者团队基准，论文标记NeurIPS 2025 Datasets & Benchmarks，EN标签通常是其中英文子集。需按报告确认具体子集。
- **PinchBench**由PinchBench/Kilo项目维护。Kilo官方博客说明它起于DevRel Brendan O’Leary的side project并介绍版本迭代，因此不是仅凭社媒名称判断的个人练习；其性质仍是Kilo支持的行业/社区项目，并非论文同行评审基准。官方runs和社区提交分开标。
- **MIEB-lite**为MIEB论文中51-task轻量版，完整MIEB为130项。**MAEB**为30项，MAEB+为98项。
- **MTEB Code** 官方leaderboard定义为`MTEB(Code, v1)`。它是具名套件，不是所有模型报告里的泛称code embedding测评。
- **GenEval**的链接已直达NeurIPS 2023 Datasets & Benchmarks Track官方论文页，身份确认；**DPG-Bench**由ELLA研究论文明确提出Dense Prompt Graph Benchmark，约1K dense prompts。Iris来源可信度与这两个基准的存在性相互独立。
- **Decision Index** 是模型发布者具名聚合指数，公开了类别/总规模而未公开底层测试名。本材料区分Liquid的v0.2.1与Jet/Perplexity材料的v0.3，不能声称构成相同。Jet法律实体/owner归属未独立核实。
- 传统数据如SQuAD2.0、BANKING77、BoolQ、XNLI、PAWS-X、PubMedQA等都有可追溯研究论文/维护方定义；但厂商报告未必足够说明实际拆分、语言或指标，故不能自动把其具体结果映射到任意目录版本。
- `CLINC150+OOS`与`MASSIVE intent`是有正式源数据的子任务/切片；`MASC-clean`与`FLEURS`阿语地区版同样是语料切片名称，不是因此新增的完整基准。
- **PhishNChips** 当前证据是R-Lit公开仓库自述、代码和版本清单；自述中的匿名临时引用不能代替外部正式出版信息。尚不足以定性为个人随编，也不足以独立确认正规机构基准，保持身份未知。
- `ISMA`、`Darija in the Wild`目前没有查到同名权威定义，记为未知。`AIME2026`的竞赛本身归MAA/AMC，但本轮确认2025-26周期AIME I/II的官方竞赛身份，但未确认原材料使用的具体卷别和题源。

## 逐项证据

完整字段（name、owner、evidenceUrls、kindEvidence、definitionFound、catalogIds、versionDifference、unknowns）见 [specialist.json](../../artifacts/research/2026-10-18-model-release-audit/recheck/specialist.json)。以下逐条简述定义和未决项：

### ToolSandbox
- 归属与证据：Apple；2024论文及Apple公开代码；状态化对话式工具调用评测，非临时demo。
- 定义：已找到；目录精确命中：无。
- 版本/去重：论文/公开代码沿用 ToolSandbox 名称。
- 未知项：当前被引用模型所用版本、运行参数未由模型发布页提供。
- 来源：https://arxiv.org/abs/2408.04682；https://github.com/apple/ToolSandbox

### LiveClaw (LiveClawBench)
- 归属与证据：Mosi-AI研究团队；同行/预印本论文和研究项目代码，OpenClaw真实助理任务；研究基准，任务集持续演进。
- 定义：已找到；目录精确命中：无。
- 版本/去重：规范项目名 LiveClawBench；与 RealClawBench、Claw-Eval-Live 为不同项目，不按 Claw 相似词合并。
- 未知项：被引用的版本需按发布页所示版本确认。
- 来源：https://arxiv.org/abs/2604.13072；https://github.com/Mosi-AI/LiveClawBench

### PinchBench
- 归属与证据：Kilo AI官方资料称其起源于DevRel Brendan O’Leary的side project，现为Kilo支持、PinchBench组织维护的OpenClaw真实任务基准；runner、任务定义、评分及榜单均有公开维护。
- 定义：已找到；目录精确命中：无。
- 版本/去重：官方 runs 与 community submissions 分开标；引用需保留版本和run类型。
- 未知项：它是行业/社区项目，不是同行评审论文基准；Kilo背书不能自动确认每条社区分数。
- 来源：https://blog.kilo.ai/p/pinchbench-v2-call-for-contributors；https://blog.kilo.ai/p/pinchbench-20-is-here；https://github.com/pinchbench/；https://pinchbench.com/about

### WebArena Verified
- 归属与证据：ServiceNow Research及合作者；NeurIPS SEA workshop论文与官方代码；WebArena审计/复核版，任务和确定性评估器。
- 定义：已找到；目录精确命中：无。
- 版本/去重：Verified 全量812 tasks；Hard子集在论文中137项，repo README较新列258项；请按具体revision区分，绝不与原版WebArena结果等同。
- 未知项：任务数量差异对应文稿/repo时间或发布版本，准确历史变更需锁commit。
- 来源：https://openreview.net/forum?id=94tlGxmqkN；https://github.com/ServiceNow/webarena-verified

### Multi-IF
- 归属与证据：研究作者团队；多轮、多语言指令遵循论文基准及提示/评估代码。
- 定义：已找到；目录精确命中：无。
- 版本/去重：论文定义 Multi-IF；与单轮IFEval不同。
- 未知项：发布模型引用的执行拆分或提示未核。
- 来源：https://arxiv.org/abs/2410.15553；https://github.com/UKPLab/Multi-IF

### SPEED-Bench (AIPerf use)
- 归属与证据：NVIDIA AIPerf；SPEED-Bench作者团队；研究论文提出 speculative decoding 数据集；NVIDIA文档将AIPerf列为运行/分析工具，并说明源数据按许可回取。
- 定义：已找到；目录精确命中：无。
- 版本/去重：SPEED-Bench是数据集；AIPerf是benchmarking/profiling工具，不应合成名为“AIPerf SPEED-Bench”的新基准。
- 未知项：发布模型图的行是否实际使用该公开SPEED-Bench配置需从原图/说明核实。
- 来源：https://arxiv.org/abs/2604.09557；https://docs.nvidia.com/aiperf/dev/tutorials/datasets-inputs/profile-with-speed-bench-dataset；https://github.com/ai-dynamo/aiperf/blob/main/docs/tutorials/speed-bench.md

### Pronunciation Robustness
- 归属与证据：Artificial Analysis；AA自建正式具名TTS人评评测，有可核查方法、固定句集、盲评和公开子集；独立机构私有/部分公开评测。
- 定义：已找到；目录精确命中：无。
- 版本/去重：AA自有实施名称；版本或发布时间应按AA方法历史。
- 未知项：全量句集为防污染 withheld，完整复现不可得。
- 来源：https://artificialanalysis.ai/methodology/text-to-speech/pronunciation-robustness-overview；https://artificialanalysis.ai/methodology/text-to-speech

### Artificial Analysis Speech-to-Speech Index
- 归属与证据：Artificial Analysis；有正式方法的复合指数，属于汇总指数而非单一benchmark。
- 定义：已找到；目录精确命中：无。
- 版本/去重：v1.0: BBA/Full Duplex/tau-Voice三项；v1.1加入Speech Agent Arena；v2.0换掉Full Duplex，改成Task Success Rate；不可跨版本视为同一配方。
- 未知项：模型引用版本未说明时不映射成固定成分。
- 来源：https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking

### Big Bench Audio (BBA)
- 归属与证据：Artificial Analysis；AA发布公开音频问答推理集，方法说明来源于Big-Bench Hard子集、1000题；正式数据集及评估。
- 定义：已找到；目录精确命中：无。
- 版本/去重：BBA v1.0/v1.1/v1.2评分口径/裁判变化；须匹配具体版本。
- 未知项：当前发布表具体版本需查模型原始发布材料。
- 来源：https://huggingface.co/blog/big-bench-audio-release；https://huggingface.co/datasets/ArtificialAnalysis/big_bench_audio；https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking

### Speech Agent Arena
- 归属与证据：Artificial Analysis；AA盲测真人偏好arena及Task Success子项，有场景/样本门槛/统计方法；正式机构自建评测。
- 定义：已找到；目录精确命中：无。
- 版本/去重：Arena Elo与Task Success Rate为不同指标；v1.1纳入指数，v2.0仍可单项报告但指数改用任务成功率。
- 未知项：个人录音/对话不公开，需区分样本门槛与隐私披露。
- 来源：https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking

### Full Duplex Bench
- 归属与证据：Guan-Ting Lin等作者的正式研究论文与作者维护项目；v1评估pause handling、backchannel、turn-taking和user interruption；维护项目列有v1/v1.5/v2/v3论文和代码。AA方法明确说明其Conversational Dynamics采用v1/v1.5子集并自行实现。
- 定义：已找到；目录精确命中：无。
- 版本/去重：论文版本v1、v1.5、v2、v3任务范围有变化；AA subset不等于每版全套。
- 未知项：指定模型报告所跑版本和样本范围未核。
- 来源：https://arxiv.org/abs/2503.04721；https://github.com/DanielLin94144/Full-Duplex-Bench；https://arxiv.org/abs/2507.23159；https://arxiv.org/abs/2510.07838；https://arxiv.org/abs/2604.04847；https://artificialanalysis.ai/methodology/speech-reasoning-benchmarking

### τ-Voice
- 归属与证据：Sierra Research；正式论文/代码的全双工语音客服任务基准；AA基于该基准实现其agentic performance项目。
- 定义：已找到；目录精确命中：无。
- 版本/去重：AA实现与原始τ-Voice实现/样本不可默认等同。
- 未知项：发布图若未标实现和数据子集则未知。
- 来源：https://sierra.ai/-/cdn/document?src=https%3A%2F%2Fcdn.sanity.io%2Ffiles%2Fca4jck6w%2Fproduction%2F534fa64bf36e1d8334bd39efad568ab6d4ec43bc.pdf；https://github.com/sierra-research/tau2-bench；https://artificialanalysis.ai/methodology/speech-reasoning-benchmarking

### EVA-Bench
- 归属与证据：论文作者团队；论文提出的端到端语音agent框架，含EVA-A及EVA-X复合维度；正式研究benchmark。
- 定义：已找到；目录精确命中：无。
- 版本/去重：EVA-A/EVA-X是指标名，不是两个独立基准。
- 未知项：xAI发布页只陈述EVA-Bench分数；具体协议、版本、执行者需查发布页引用原文。
- 来源：https://arxiv.org/abs/2605.13841

### MTEB Code
- 归属与证据：MTEB维护组织/论文作者；MTEB官方leaderboard列有 Code (MTEB Code, v1) 基准说明与任务集；维护方代码确认属于正式具名套件。
- 定义：已找到；目录精确命中：无。
- 版本/去重：MTEB(Code, v1)是benchmark子套件；不与MTEB总体、单个CodeSearchNet或模型card中泛称“code”混为一谈。
- 未知项：本轮发布页具体执行任务列表和版本未核。
- 来源：https://leaderboard.mteb.org/；https://github.com/embeddings-benchmark/mteb；https://docs.mteb.org/api/benchmark/

### MIEB-lite (Massive Image Embedding Benchmark Lite)
- 归属与证据：MIEB论文作者团队；ICCV 2025论文定义MIEB 130 tasks及MIEB-lite 51 tasks；是正式学术基准和轻量子集。
- 定义：已找到；目录精确命中：无。
- 版本/去重：完整MIEB与MIEB-lite不同规模；别名“Massive Image Embedding Benchmark Lite”指后者。
- 未知项：模型报告是否严格跑lite而不是完整MIEB需核。
- 来源：https://arxiv.org/abs/2504.10471；https://openaccess.thecvf.com/content/ICCV2025/papers/Xiao_MIEB_Massive_Image_Embedding_Benchmark_ICCV_2025_paper.pdf；https://github.com/embeddings-benchmark/mteb

### MAEB (Massive Audio Embedding Benchmark)
- 归属与证据：论文作者团队 / MTEB维护组织；正式论文定义30任务MAEB，基于MAEB+ 98 tasks选出的轻量套件，并进入MTEB生态。
- 定义：已找到；目录精确命中：无。
- 版本/去重：MAEB与MAEB+不同：30 vs 98任务；正式名称为Massive Audio Embedding Benchmark。
- 未知项：不同checkpoint/leaderboard使用的数据版本需固定。
- 来源：https://arxiv.org/abs/2602.16008；https://github.com/embeddings-benchmark/mteb

### GenEval
- 归属与证据：论文作者Dhruba Ghosh、Hannaneh Hajishirzi、Ludwig Schmidt；已直达NeurIPS 2023 Datasets & Benchmarks Track官方论文页，定义为对象聚焦的图文组合属性评估框架。
- 定义：已找到；目录精确命中：无。
- 版本/去重：GenEval是2023基准；GenEval 2是后续不同项目，不能只按同名合并。
- 未知项：Iris来源质量与原始GenEval基准是否存在是两层独立事项。
- 来源：https://papers.neurips.cc/paper_files/paper/2023/hash/a3bf71c7c63f0c3bcb7ff67c67b1e7b1-Abstract-Datasets_and_Benchmarks.html；https://github.com/djghosh13/GenEval

### DPG-Bench
- 归属与证据：腾讯研究团队；ELLA研究论文明确提出Dense Prompt Graph Benchmark (DPG-Bench)，含约1K dense prompts；公开代码/评估资源可追溯。正式研究基准。
- 定义：已找到；目录精确命中：无。
- 版本/去重：常见写法DPG-Bench/DPG-Bench；不与GenEval同名或等价。
- 未知项：模型引用结果是否使用原始DPG-Bench及具体裁判/版本仍需查。
- 来源：https://arxiv.org/abs/2403.05135；https://github.com/TencentQQGYLab/ELLA

### LongText-Bench (EN subset)
- 归属与证据：Tencent Hunyuan X的X-Omni作者团队。arXiv论文作者行标明Tencent Hunyuan X；附录定义LongText-Bench为英文及中文长文本图像渲染集，共160 prompts、8类场景，提示自动生成后人工复核；作者组织公开实现和数据入口。
- 定义：已找到；目录精确命中：无。
- 版本/去重：EN是LongText-Bench英文部分，不宜作为独立基准重复计数。
- 未知项：模型报告所用英文样本是否为完整英文部分或另行筛选，需查运行声明。
- 来源：https://arxiv.org/abs/2507.22058；https://arxiv.org/html/2507.22058v1；https://github.com/X-Omni-Team/X-Omni；https://huggingface.co/datasets/X-Omni/LongText-Bench

### OneIG-Bench (EN subset)
- 归属与证据：上海交通大学（SJTU）与StepFun作者团队；论文页面标记NeurIPS 2025 Datasets & Benchmarks Track，项目仓库与数据入口由作者团队发布。
- 定义：已找到；目录精确命中：无。
- 版本/去重：EN是其prompt组内英文部分，不能当独立benchmark；模型报告具体subset仍需看运行描述。
- 未知项：模型报告的英语子集样本边界未核。
- 来源：https://arxiv.org/abs/2506.07977；https://openreview.net/pdf?id=de99679b077619698014ee8edf6b34e309cb58cb.pdf；https://github.com/OneIG-Bench/OneIG-Benchmark；https://huggingface.co/datasets/OneIG-Bench/OneIG-Bench

### ToolRet
- 归属与证据：研究作者团队；论文接受ACL 2025，官方仓库含评测代码和训练数据；工具检索基准。
- 定义：已找到；目录精确命中：无。
- 版本/去重：论文更名/正式版本应以ACL记录为准。
- 未知项：从当前仓库搜索结果未记录论文DOI/ACL anthology精确条目。
- 来源：https://github.com/mangopy/tool-retrieval-benchmark

### API-Bank
- 归属与证据：研究作者团队；研究论文定义工具增强LLM基准及可运行评测系统，注明73 API工具/314对话/753调用；非厂商临时样例。
- 定义：已找到；目录精确命中：无。
- 版本/去重：API-Bank既有评测集，也有更大训练集；不可把训练集当benchmark测试拆分。
- 未知项：引用时需区分评测集与训练资源。
- 来源：https://arxiv.org/abs/2304.08244

### When2Call
- 归属与证据：NVIDIA研究团队；研究论文和NVIDIA公开数据/代码；评估何时调用工具、追问或拒答。
- 定义：已找到；目录精确命中：无。
- 版本/去重：评测分为multiple-choice及LLM-judge形式，引用需核子集。
- 未知项：模型报告对应子集未给。
- 来源：https://arxiv.org/abs/2504.18851；https://github.com/NVIDIA/When2Call

### BANKING77
- 归属与证据：作者团队 / PolyAI；发布论文和数据集，银行领域细粒度77 intent分类；成熟数据集/benchmark。
- 定义：已找到；目录精确命中：无。
- 版本/去重：官方train/test与MTEB Banking77任务不可泛称同一执行切分。
- 未知项：Mellum/d1具体运行split未在材料标注。
- 来源：https://arxiv.org/search/?query=Clinc+Banking77+intent+benchmark&searchtype=all；https://github.com/PolyAI-LDN/task-specific-datasets

### CLINC150+OOS
- 归属与证据：Clark等作者 / 原始CLINC150项目；CLINC150和out-of-scope评测有正式论文及数据仓库；+OOS是带拒识/OOS数据的测试配置标签，不应宣称全名为新论文基准。
- 定义：已找到；目录精确命中：无。
- 版本/去重：CLINC150+OOS若组合了特定ID/OOS splits，需区分标准CLINC150 test与CLINC OOS Plus。
- 未知项：d1发布材料未明示文件版本及切分。
- 来源：https://aclanthology.org/D19-1131/；https://github.com/clinc/oos-eval

### BRIGHT
- 归属与证据：论文作者团队；论文及作者项目页/数据代码，reasoning-intensive retrieval benchmark。
- 定义：已找到；目录精确命中：无。
- 版本/去重：官方页面称1385 real-world queries，论文摘要记1384；不同源统计有1条差异，映射要按版本/数据文件。
- 未知项：具体版本计数应锁定发布revision。
- 来源：https://arxiv.org/abs/2407.12883；https://brightbenchmark.github.io/

### Amazon ESCI
- 归属与证据：Amazon Science / 作者团队；公开商品搜索相关性数据集，有Exact/Substitute/Complement/Irrelevant标签；更精确说是数据集/任务，而非独立广义评测框架。
- 定义：已找到；目录精确命中：无。
- 版本/去重：ESCI是四分类标注；发布图中的“Amazon ESCI”需区分来源版本/locale。
- 未知项：d1运行本地任务版本未披露。
- 来源：https://github.com/amazon-science/esci-data

### PhishNChips
- 归属与证据：GitHub项目 R-Lit（公开仓库所示）；查到维护方仓库、版本清单、代码和自述；自述称安全基准并给临时citation，但本轮未找到可独立核实的正式论文/出版或机构归属。不能据作者数/仓库自动判为练手，也不能当已验证正规学术benchmark。
- 定义：未找到；目录精确命中：无。
- 版本/去重：仓库自述v5.2与引用条目为项目内主张；外部出版身份未确证。
- 未知项：作者/机构实名、DOI/会议信息、外部独立引用和数据来源许可均需复核；应保留身份未知。
- 来源：https://github.com/R-Lit/PhishNChips

### Jet Decision Index v0.2.1 / v0.3
- 归属与证据：Jet（来源内容中称Jet；背后机构未独立确认）；官方模型卡/发布图具名Decision Index；聚合指数并披露类别/规模，但 constituent benchmark names 未列出；属于厂商具名指数，不是单项benchmark。
- 定义：已找到；目录精确命中：无。
- 版本/去重：Jet v0.3来自Perplexity发布材料；Liquid d1使用v0.2.1。版本不同且其构成不公开，不能视为同配方/独立单项集。
- 未知项：Jet具体法律实体/机构身份未从材料独立核验；指数各组成评测未知。
- 来源：https://huggingface.co/perplexity-ai/pplx-decider-v1.1-27b；https://community.perplexity.ai/t/pplx-decider-v1-1-27b-our-updated-open-weights-multimodal-decision-model-is-now-available/6286；https://www.liquid.ai/blog/d1-open

### SQuAD 2.0
- 归属与证据：Stanford / Rajpurkar等作者；公开研究基准，包含可回答和不可回答问题。
- 定义：已找到；目录精确命中：无。
- 版本/去重：SQuAD 2.0与SQuAD2-CR不同；材料写SQuAD 2.0应对齐原基准。
- 未知项：运行版本/切分未披露。
- 来源：https://rajpurkar.github.io/SQuAD-explorer/；https://arxiv.org/abs/1806.03822

### Civil Comments
- 归属与证据：Civil Comments项目/Google Jigsaw及学术作者；公开毒性评论数据集和研究评测任务；原始Civil Comments与针对群体稳健性challenge切分需区分。
- 定义：已找到；目录精确命中：无。
- 版本/去重：不能只凭Civil Comments名称确定具体challenge/标签/拆分。
- 未知项：d1具体使用何split/指标不明。
- 来源：https://www.tensorflow.org/datasets/catalog/civil_comments；https://github.com/Convergence-Lab/Getting-Toxicity-Right

### MASSIVE intent subset
- 归属与证据：Amazon Alexa / MASSIVE作者团队；正式多语言SLU数据集：intent classification及slot annotation；模型表标为intent subset，属于其中任务子集。
- 定义：已找到；目录精确命中：无。
- 版本/去重：MASSIVE 1.0 51语言，1.1另含Catalan；intent与slot任务也不同。
- 未知项：d1所用语言/split不明。
- 来源：https://arxiv.org/abs/2204.08582；https://github.com/alexa/massive

### PubMedQA
- 归属与证据：研究作者团队；正式生物医学问答数据集/benchmark，基于PubMed摘要、yes/no/maybe。
- 定义：已找到；目录精确命中：无。
- 版本/去重：需区分PQA-L、PQA-U、PQA-A配置。
- 未知项：报告中具体配置未披露。
- 来源：https://arxiv.org/abs/1909.06146

### BoolQ
- 归属与证据：Google Research / Clark等作者；正式研究数据集，包含自然语言yes/no阅读理解问题。
- 定义：已找到；目录精确命中：无。
- 版本/去重：BoolQ与其他Boolean QA任务不同；须按原数据集版本核。
- 未知项：本次使用split未披露。
- 来源：https://arxiv.org/abs/1905.10044；https://github.com/google-research-datasets/boolean-questions

### XNLI
- 归属与证据：Conneau等作者 / Facebook AI Research；正式跨语言自然语言推断benchmark，MultiNLI翻译扩展，15语言。
- 定义：已找到；目录精确命中：无。
- 版本/去重：XNLI语言和split影响对比。
- 未知项：d1的具体语言/评测配置未披露。
- 来源：https://arxiv.org/abs/1809.05053

### PAWS-X
- 归属与证据：Google Research / Yang等作者；正式跨语言释义识别数据集，PAWS扩展；非个人练习样例。
- 定义：已找到；目录精确命中：无。
- 版本/去重：PAWS-X与PAWS英文、具体语言版本应分别标识。
- 未知项：d1报告未标语言或split。
- 来源：https://arxiv.org/abs/1908.11828；https://github.com/google-research-datasets/paws

### DeepSearchQA
- 归属与证据：Google DeepMind / Google Research等；Google正式发布技术报告及benchmark；900个多步网页研究任务。
- 定义：已找到；目录精确命中：无。
- 版本/去重：发布文章、技术报告版本时间略有差异；数据和leaderboard按官方Google/Kaggle项目。
- 未知项：发布模型的评分judge和pass设置须单独比对。
- 来源：https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA_benchmark_paper.pdf；https://blog.google/innovation-and-ai/technology/developers-tools/deep-research-agent-gemini-api/

### AIME2026
- 归属与证据：MAA / American Mathematics Competitions；MAA/AMC官方竞赛资料确认2025-26周期AIME I及AIME II的存在；属于正式竞赛题集，可作模型数学评测数据。
- 定义：已找到；目录精确命中：无。
- 版本/去重：2026 AIME不是AIME 2025/2024；需区分I卷与II卷。
- 未知项：当前证据确认2026 AIME I/II竞赛身份，但原模型表所指的具体卷别、公开题源/测试样本和是否采用官方完整卷未确认。
- 来源：https://maa.org/news/2025-26-aime-thresholds-are-now-available/；https://maa.org/maa-invitational-competitions/

### ISMA
- 归属与证据：未确认；本轮搜索未找到与所列语音模型评测语境匹配的权威论文/机构定义；仅名称线索。
- 定义：未找到；目录精确命中：无。
- 版本/去重：缩写歧义，不能与其他ISMA项目按缩写合并。
- 未知项：官方全称、维护方、数据/协议和版本均未知。
- 来源：https://arxiv.org/search/?query=ISMA+Arabic+speech+benchmark&searchtype=all

### Darija in the Wild
- 归属与证据：未确认；本轮未找到可确认该精确名称的正式语料/评测定义；应与已知Moroccan Arabic/Darija数据集分别处理。
- 定义：未找到；目录精确命中：无。
- 版本/去重：相似描述不能替代同名证据。
- 未知项：名称、owner、正式论文、数据集身份均未知。
- 来源：https://arxiv.org/search/?query=%22Darija+in+the+Wild%22&searchtype=all

### MGB-2
- 归属与证据：Qatar Computing Research Institute及MGB挑战赛团队；正式语音识别挑战/数据集，Al Jazeera多方言广播媒体识别。
- 定义：已找到；目录精确命中：无。
- 版本/去重：MGB-2为2016挑战；与MGB-3/MGB-5不是同版本。
- 未知项：模型报告若只是MGB2语料切分，需分清竞赛test set。
- 来源：https://arxiv.org/abs/1609.05625；https://people.csail.mit.edu/jrg/2016/Ali-SLT-16.pdf

### SADA
- 归属与证据：SDAIA及论文作者团队；公开论文和语料项目，Saudi Audio Dataset for Arabic，含电视语音/方言；可作为ASR评测数据。
- 定义：已找到；目录精确命中：无。
- 版本/去重：SADA数据集与特定ASR基准设置不是同一概念。
- 未知项：若模型发布材料称benchmark，具体split/授权访问待确认。
- 来源：https://arxiv.org/abs/2508.12968；https://www.kaggle.com/datasets/sdaiancai/sada2022

### Casablanca
- 归属与证据：UBC NLP及多机构作者团队；EMNLP 2024论文定义多方言阿拉伯语语音数据集及模型/基线。
- 定义：已找到；目录精确命中：无。
- 版本/去重：8方言；数据集整体和某单一国家/方言子集需分别指明。
- 未知项：模型评测的具体version/split需查。
- 来源：https://arxiv.org/abs/2410.04527；https://aclanthology.org/2024.emnlp-main.1211/

### FLEURS (Arabic)
- 归属与证据：Google Research；正式多语言语音识别/翻译评测集。
- 定义：已找到；目录精确命中：无。
- 版本/去重：FLEURS是多语言suite；Arabic locale（如ar_eg）只是语言/地区切片。
- 未知项：发布材料引用的locale/split未标。
- 来源：https://arxiv.org/abs/2205.12446；https://huggingface.co/datasets/google/fleurs

### MASC-clean
- 归属与证据：MASC论文/数据维护方；正式阿拉伯语语音语料及评测集；clean是MASC特定清洁测试切片的简称。
- 定义：已找到；目录精确命中：无。
- 版本/去重：MASC clean与MASC noisy独立切片；不要把切片名当全新基准。
- 未知项：具体revision及clean criteria应根据原数据/论文核验。
- 来源：https://arxiv.org/abs/2412.13788；https://ieee-dataport.org/open-access/masc-massive-arabic-speech-corpus
