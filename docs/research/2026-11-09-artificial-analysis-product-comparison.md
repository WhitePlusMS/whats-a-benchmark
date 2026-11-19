# 与 Artificial Analysis 的产品比较

核查日期：2026-11-09。范围为本地工作树、Artificial Analysis（AA）及公开竞品页面；这是产品分析，不是对用户需求和数据正确性的验收。

发布成绩进一步核对：[同一模型发布表及具身论文](2026-11-09-release-score-same-model-competitors.md)显示 BenchBoard 和 AIEvals 已实际整理该发布表，本站仅登记关联；修订历史亦已有公开产品，不能作为未经验证的独有优势。

后续发现：与本站当前百科定位更直接的双语项目及同题核查见 [LLM Benchmark Costco 对照](2026-11-09-benchmark-costco-competition.md)；其流程说明、来源和名称匹配边界已单独记录。

## 本项目现状

- 本地 `content/benchmarks/` 有 318 个 JSON，均标记 `published`；其中 270 个包含 `sampleSet.samples`，共 768 条样例记录，135 个存在非空 `interpretation`。这些是文件结构统计，不代表逐条核验完成、不同条目按相同口径计数、或线上已同步。另有 19 条发布资料记录。
- `README_ZH.md` 定位为中文评测资料库，描述任务、样例、评分条件、版本和来源，并明确不运行评测、不建立统一模型排行榜。`docs/ARCHITECTURE.md` 当前明确不建立模型成绩库。`src/views/ReleasesView.vue` 展示发布资料、相关评测和原始链接，而非结构化模型成绩表。
- 同名覆盖可见 Terminal-Bench 4、Terminal-Bench-Science、HLE-Diamond、AA-Briefcase 等；本地未跟踪条目亦包含在文件数中。本地工作树与线上状态未核对。

## 对照来源

- 用户指定的 [AA GPQA Diamond 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)同页包含评测背景、方法论、模型分数、分数与成本、输出 token、耗时、发布日期以及三个公开任务示例；页面自称成绩独立评测。图表抓取显示 27 of 617 models，前者是当前显示数量，不应说榜单只有 27 个模型。具体性能和估算口径依各图说明，不等同厂商发布成绩。
- 本地 [GPQA Diamond 条目](../../content/benchmarks/gpqa-diamond.json)记录与 GPQA Main 的子集关系、输入输出、具体评分注意事项、原始数据字段、获取方式、作者对在线展示样例的请求以及多个来源；该条目无在线题目样例，也无结构化模型成绩表。两边都说明评测背景和方法，AA 也有示例，因此不能笼统称其只有排行榜、没有评测解释或样例。本地记录并未核实 AA 的授权情况，不评价其展示是否获准。
- 对用户指定的 GPQA 页面补核一处解释口径：2026-11-10 页面简介将专家 65%、非专家 34% 与 Diamond 的 198 题放在同一句。[原论文表 5](https://arxiv.org/html/2311.12022)的专家／非专家验证者结果分别为 Extended 集 65.4%／33.9%，Diamond 集 81.2%／21.9%；论文明确说明后两项受题目筛选影响。原文摘要的约 65%／34% 因此不宜不加说明地当作 Diamond 专家／非专家结果，而 Diamond 这两个受筛选影响的值也不能直接当作独立专家人群的真实准确率。此对照只针对页面简介，不证明 AA 的模型测试或榜单数值有误；页面也可能在以后修正。
- 另一个中文单点：[华为云评测数据集指南](https://support.huaweicloud.com/usermanual-pangulm/pangulm_04_0236.html)当次把 `GPQA_Diamond` 描述为 448 题，[原论文第 2.3 节](https://arxiv.org/html/2311.12022)则明确 Main 为 448 题、Diamond 为 198 题。本地 GPQA Diamond 条目已区分两者。此次未读取该指南所列的第三方数据文件，也未运行华为服务，所以只能指出文档描述与原论文不一致，不能据此断定实际加载题数或模型结果有误；页面可能更正。
- 同一口径区别已由 [tokenusage.dev 的公开研究](https://tokenusage.dev/publications/oct-26-progress-by-field)讨论；它还将 OpenAI 后来招募专家的测试作为另一来源。不能把对这一问题的认识视为本站独有，亦不能将不同专家样本和测试设置混为同一次实验。
- [EvalScope 的评测目录](https://modelscope.github.io/evalscope/zh/benchmarks/)页面当次显示 256 条 registry 条目，提供按能力检索及文档入口，列表介绍主要是英文；其 [GPQA 中文详情](https://evalscope.readthedocs.io/zh-cn/latest/benchmarks/gpqa_diamond.html)提供任务、指标、提示模板与运行示例，示例的 `limit=10` 是演示而非完整评测。它也在 Diamond 页面列出专家约 65%、非专家约 34%，应结合上面的原论文分集区别阅读。本次没有运行该框架或复核全部 256 条；条目是其框架注册表，不能与本站 318 个条目直接计算覆盖率。
- [Undominated 的评测选择指南](https://undominated.ai/benchmarks/)按对话偏好、检索、代码任务和工具调用解释不同评测用途及条件，并链接模型比较与来源；其页面注明部分评测只提供方法指南、不收录成绩。它说明“按任务解释应该参考哪种 benchmark”已有具体替代品，本次没有验证其完整筛选或数据正确性。
- [AA 评测目录](https://artificialanalysis.ai/evaluations)和[模型对比](https://artificialanalysis.ai/models/)展示评测说明、搜索分类、模型成绩、价格、速度等。模型对比页显示 44 个评测指标；计数包含单一评测的不同指标等，不等同于 44 个独立数据集，也不可与本项目 JSON 数量直接比较。
- 对 AA 评测目录当次返回的 39 个链接做了[逐项映射](2026-11-09-aa-directory-crosswalk.md)：26 个有本地同项或明确子集、7 个只关联系列/版本/领域、6 个未找到独立同名条目；它不覆盖 AA 全站，也不是本站全部 318 项的总体重合率。HealthBench 目录描述与详情默认版本不同，提醒不能按目录名称自动合并。
- [AA Intelligence Index 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)：v5.0.1 使用九项，知识工作、编程、科学、通用四类各 25%；以英语文本为主，单独提供多语言评测。它也披露题数、运行次数、工具、计分与口径区别。[AA 指数页面](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)提供任务样例；[Terminal-Bench 4.0](https://artificialanalysis.ai/evaluations/terminalbench-4-0) 和 [AA-Briefcase](https://artificialanalysis.ai/evaluations/aa-briefcase)也展示样例，后者的示例场景与计分场景需按页面说明区分。不能将中文解读、示例或评测说明视为完全无竞品的特性。
- [LLM Stats 评测目录](https://llm-stats.com/benchmarks) 2026-11-09 显示 753 benchmarks；这是对方页面计数，未核验其独立测试口径。[其方法说明](https://llm-stats.com/methodology/llm-stats-score)称标记厂商报告和第三方评测来源，保留原始值；[LLM Leaderboard 关于页面](https://llmleaderboard.com/about)亦描述汇集不同来源的成绩。两者与模型发布成绩聚合的设想直接重叠。
- 更直接的中文同项反例：[LLM Benchmarks Tracker 中文目录](https://alloevil.github.io/llm-benchmarks-tracker/zh/)展示评测简介、成绩及官方榜单/独立/厂商等来源类别；其 [GPQA Diamond 详情](https://alloevil.github.io/llm-benchmarks-tracker/b/gpqa-diamond/)列原始来源、日期和部分运行条件。该详情当前检索到的是英文页，中文目录确有该条目；展示内容与数值未逐条复算。
- 同题还有 [evals.report 的 GPQA 页面](https://evals.report/benchmarks/gpqa-diamond?tab=scores)：2026-11-10 可见评测介绍、分数、模型、来源模型名、日期及 Official / Verified / Unverified 状态，并说明收录官方榜、厂商发布及标记过的社区成绩。这与“已有 benchmark，再收集模型发布成绩”的计划直接重叠；状态标签的定义需结合该网站的方法说明，不能把 Verified 直接理解成该站独立运行，也不能据此认定各条可跨设置比较。页面所列数值及交互本次未逐条复核。
- 版本差异的另一例：[GPQA Diamond Clean](https://gpqa.ai/) 是第三方独立项目，不是原作者发布的官方新版；其站点称从原 Diamond 的 198 题中剔除 9 题、保留 189 题，并展示成绩及数据来源类别。[该项目方法](https://gpqa.ai/methodology/)区分原始与修订题集的配对结果，强调不要与无关的已发表总分相减；页面表示合并排名并未对推理计算量归一化。[代码库](https://github.com/adamallcock/gpqa-diamond-clean) README 描述 9 项剔除理由及审查方式，但仓库 About 仍写剔除 8 项，应按具体版本核对；本次未接触受限题文或独立裁定剔题是否正确。该例说明同名家族不能只凭百分数混排，也说明“版本、来源和解释”已有他人在做，不能视为本站独有。
- 对该 Tracker 的 GPQA 单条成绩继续回查：2026-11-10 页面将 GPT-4 **39.4%** 列在 Diamond 榜，备注为零样本并指向原论文 Table 1；但[论文](https://arxiv.org/html/2311.12022) Table 1 是示例题，Table 5 中 **39.4%** 对应 Extended 集、带搜索且拒答时回退到 CoT 的设置，其 Diamond 列为 38.8%；Table 6 的 GPT-4 零样本 Diamond 为 34.2%。因此该页面记录与其所指论文的定位及对应口径不一致；不能据此推断所有来源上的 GPT-4 数字、更不能说明其他网站或 AA 的成绩有误。网站页面可能更新，本次未运行模型。
- [AIMap 智图中文 GPQA 页面](https://aimap.page/zh-hans/benchmarks/gpqa-diamond/)有评测介绍、局限、成绩、设置、来源和日期；页面称该榜源自 Epoch AI，不是 AA 自测。[DataLearnerAI 中文基准目录](https://global.datalearner.com/benchmarks)和[榜单](https://global.datalearner.com/leaderboards?isChina=1)也聚合基准及来源。相似功能存在不等于所有条目深度或正确性相同，本站未逐条审计对方来源。
- AIMap [中文总页](https://aimap.page/zh-hans/benchmarks/)本次展示模型与评测矩阵、成绩来源类别及按来源的抓取时间，也公开[评测目录 JSON](https://aimap.page/api/benchmarks.json)和[GPQA 成绩 JSON](https://aimap.page/api/benchmarks/gpqa-diamond.json)。页面统计为 23 项基准、1,100 个模型、3,129 条成绩；2026-11-09 直接读取目录 JSON 时，其 `benchmarks` 数组有 26 个条目，`counts.benchmarks` 为 23，两者口径差异未核实，不合并或声称目录有多少独立基准。GPQA JSON 标示更新于 11 月 8 日，包含 291 条记录，`sourceType` 均为 `independent`、来源均标为 Epoch；本次只核对字段和数量，未逐条向 Epoch 复验，也未验证网页全部动态筛选功能。
- 用上述 26 个 API 条目的顶层 `id` 或 `name`，与本地 318 个 JSON 的顶层 `id`、`name`、`aliases` 做 Unicode NFKC 归一化、忽略标点与大小写的完全字符串匹配，有 20 个命中、6 个未命中。**这是名称或 ID 层的机器匹配，不是 20 个评测完全相同的结论**：例如 AIMap 的 `humaneval` 条目合并 HumanEval / HumanEval+，`osworld` 名称带 Verified，而本站对应文件名不能单独证明完全相同的子集和协议；未命中也可能是别名或家族关系。两个产品数量和数据类型不同，该数字不是全站重叠率。
- [Tuntang 的中文 GPQA 页面](https://tuntang.top/benchmarks/gpqa-diamond/)将评测简介、构建方式、示例概述、模型成绩和不同来源的条件、历史更新放在同一页，与“评测资料加发布成绩”的构想高度接近。其同页明确称成绩混合不同来源和协议，具体数据、样例来源、判断及排序未逐条核验；不能因为页面有标注就认为跨行可直接比较。
- 可核实的单点差异：Tuntang 的 [SWE-bench 条目](https://tuntang.top/benchmarks/swe-bench/)写 Verified 300 项，其[另一个 Verified 条目](https://tuntang.top/benchmarks/swe-bench-verified/)与[官方站](https://www.swebench.com/)均写 500 项（300 是 Lite）；本地 [Verified](../../content/benchmarks/swe-bench-verified.json)写 500。单点说明内容核对有用，但不能推广为所有条目质量对比，亦不代表对方今后不会更正。
- [知行录作者介绍](https://fcten.com/2026/07/24/introducing-leaderboard-cn/)描述了面向中文读者将模型卡、厂商报告、榜单与评测来源关联的个人项目，和用户原本设想非常接近；其数量是 2026-07-24 文章快照，目标站点本次无法打开，实际现状及准确性未核验。文章还描述跨来源取最佳值后聚合排名，其方法选择不能视作成绩可无条件比较。
- 厂商发布页是报告来源，不等于成绩一定由该厂商测得，例如 [Anthropic Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) 说明 Terminal-Bench 同时包含其复测与其他机构发布结果。具体结果应记录报告方与执行方。AA 指数成绩主要由其独立运行；不同测试和数据产品应按具体页面核对。
- [Opus 4.6 系统卡](https://www-cdn.anthropic.com/0dd865075ad3132672ee0ab40b05a53f14cf5288.pdf)报告：同一 GPT-5.2-Codex 在其复测中使用 Terminus-2 为 57.5%，使用 Codex CLI 为 64.7%。差异不能直接当作模型本体能力差距。[AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)亦说明 GDP.pdf 尽管任务集相同，因文档输入与评委不同，AA 与 Surge 成绩不能直接比较。
- [AA API 文档](https://artificialanalysis.ai/api-reference)规定免费 API 须注册并署名，同时适用服务及数据条款；[品牌说明](https://artificialanalysis.ai/brand-kit)对批量或系统性使用指向 API 条款。任何同步、再发布或比较产品在实施前需审查具体版本条款，不能仅凭署名认定获准；外链是可优先考虑的低投入方式。
- 2026-11-10 补核 [AA API 产品页](https://artificialanalysis.ai/data-api)：该页将 Free 描述为内部使用、须署名且不可再分发，Pro 为受限的对外使用，Commercial 可约定带署名的再分发；具体使用仍受相应条款和合同约束。[品牌说明](https://artificialanalysis.ai/brand-kit)区分按其要求引用或重绘已发布图表、商业使用联系 AA，与底层数据批量或系统性再分发。上述是页面披露的条件，不能推断个别引用或本站计划当然获准；也不能把其他网站展示 AA 数据理解为它们均未获授权。本次没有申请密钥或同步数据。

### AA 也已延伸到本地推理与硬件

- [AA-AgentPerf-Local](https://github.com/ArtificialAnalysis/aa-agentperf-local)是 AA 的开源工具，向兼容接口重放预先记录的智能体对话并测量吞吐和延迟；项目明确说其**不评估输出质量**。当前 README 描述默认负载为 8 个录制任务、168 次模型调用，`exact` 策略按原始输出长度生成；默认跳过工具运行耗时，另有可选的固定延迟和真实工具模式。重放耗时不能当作智能体实际解决任务的成功率，也不能默认包括工具执行时间。
- [AA 笔记本与工作站页面](https://artificialanalysis.ai/hardware-inference-stack/laptops-workstations)提供自有硬件上的官方测试、型号与部署配置、完成时间和设备价格视图；该页称测试覆盖有限，会随时间变化。对应工具可连接用户自己的兼容推理服务，也提供自选测试；用户自测与 AA 官方榜数据来源不同，不能自动视为同一批已审核结果。本次没有安装、执行工具或验收页面全部交互。
- 该例直接扩大了对 AA 的竞争判断：如果设想进一步做“本地硬件上模型跑得多快、怎么配置”，也已有 AA 的相关产品。本站 [Terminal-Bench 2.0](../../content/benchmarks/terminal-bench-2.json)介绍终端任务与成功判定；AgentPerf 的回放速度测试不能作为该基准任务完成率，名称和共同的智能体场景不代表等价。按名称检索当前本地 `content/benchmarks` 与本次研究目录，未找到独立 AgentPerf 条目；检索不排除别名或将来新增。
- [model-selection 开源项目](https://github.com/tkellogg/model-selection)作者明确基于 AA API，把模型可用性、成本、速度及按任务解释 benchmark 的资料用于辅助选型；项目属于作者自述的已有方案，本次未安装、调用或验收。它既说明 AA 数据可作为其他工具的基础，也说明“任务解释加 AA 成绩”本身已有竞品；不代表其输出一定正确或许可允许任何形式再发布。

## 补充直接竞品：OpenNash Benchmark Atlas

2026-11-10 核对 [OpenNash AI Benchmark Atlas](https://opennash.com/ai-evals-benchmark-atlas/)：页面将评测解释、任务、限制、原始链接、成绩快照和按用途选模型放在一起，与本站资料库及用户原设想的成绩扩充高度重叠。它提供 GPQA Diamond 的说明和 Epoch 独立评测的成绩入口，还收录本站已有的 [VLABench](../../content/benchmarks/vlabench.json)。该网站同时提供模型评估及智能体工程服务；这是站方自述，不代表已有多少付费客户或本站需要同样商业模式。

核对其 2026-11-03 版本的 [目录 JSON](https://opennash.com/ai-evals-benchmark-atlas/data.json)与[成绩 JSON](https://opennash.com/ai-evals-benchmark-atlas/scores.json)：前者 172 条目录记录；后者报告来自 HF benchmark registry 的 **1,218 条原始成绩记录、43 个有成绩的数据集、42 个关联到该目录的记录**。其中 701 条被其标为 `self-reported`、316 条为 `benchmark-operator`、139 条为 `independent`、62 条未分类；这些是对方的归类，不是本站对运行方或准确性的逐条独立审计。首页另有来自 Epoch、官方榜等来源的 18 个重点榜及 AA 指数快照，不能将 1,218 描述为覆盖 172 个项目的完整分数，也不能把所有成绩误说成 AA 运行。

名称层面的小规模对照：将 172 条目录的 `name` 与当前本地 `status=published` 条目的顶层 `id`、`name`、`aliases` 做 Unicode NFKC、忽略大小写及非字母数字后完全匹配，得到 **57 条名称命中、115 条未命中**。例如 VLABench 完全同名且论文来源相同，但匹配的 `WeirdML` 对应本站 `WeirdML v2`，OpenNash 的描述是 v3；`GPQA / GPQA Diamond` 因合并名称未被字符串匹配，实际上与本站两条相关。因此 57 不是验证过相同版本的数量，115 不是本站缺失数量，也不是 172/318 的产品覆盖率；未逐项人工复核。数据文件 SHA-256：目录 `be3844e9998294fe64de5c0d0d1928d088e7da218361bb5327c669e111bb3dc1`，成绩 `8bf35307b53881ed90a477c786ca95077000846e640b11c5679573867ce17acf`。

具身具体例子：OpenNash 的 VLABench 目录显示仿真操作和 100 类任务，并链接 HF 的[基础任务训练集及其榜单](https://huggingface.co/datasets/VLABench/vlabench_primitive_ft_lerobot_video)。其成绩 JSON 收录 `nvidia/GR00T-N1-2B` 的 **39.7**，上游链接为 AllenAI VLA 榜，记录 `verified=false`；该站将其分类为 `benchmark-operator` 是该站标签。本次没有独立读取 AllenAI 同一行或验证任务集与具体模型配置，不能把分数当成本站复测、训练演示成功率或真机表现。目录称项目自身官方榜尚未发布，与 HF 页面标注“Official Benchmark”及收录一条外部成绩不是完全相同的陈述，不能因一处有结果就推断原项目官方榜的完整状态。此前[HF 同题核查](2026-11-09-hf-official-benchmarks-crosswalk.md)记录了数据卡和来源边界。

本站若考虑自动聚合，OpenNash 的模型选择器还体现维护和解释成本：它自述每个精确模型 ID、每项评测选最好一条配置，将原始指标转为榜内百分位后加权；并警告不同工具、提示、推理设置和评分器可能不同。这个综合分是该站设计的相对排名，不是任务成功率。原始结果和来源有用，但这种聚合方式是否适合本站用户仍需验证；本次没有完整验收网站筛选交互或追溯所有成绩授权。

## 判断与建议

1. 将大量厂商发布数据搬成模型排行榜，与 AA 在用户选模型的目标上强重叠，和 LLM Stats 等在数据来源上也重叠；个人维护难点是更新速度、数据稀疏、来源追溯、口径和信任。不同来源各有价值，但不能将厂商页成绩包装为统一复测。
2. 可探索定位为中文模型发布成绩阅读工具：把报告中的成绩、具体模型、评测版本/子集、指标、运行方、工具和推理配置、来源及披露缺项串联回现有评测解释。它是有待验证的差异，不保证自然形成护城河。
3. 先做时间盒试点：自选近期 3 份模型报告和 3 个高频评测，人工整理一小批原始数值与原文定位，分别展示各来源与明确缺项。选择同一 Benchmark 多报告出现、至少一处真实配置差异的案例；不跨不同协议生成简单排名，不填补缺失分数。
4. 先用静态表格或现有页面验证，记录每条采集、核对和更新耗时，并请目标读者完成“找到出处、识别是否可比较、理解成绩”的任务。若读者不能明显更快完成、没人回访、或维护负担超出可接受范围，停止扩充成绩，保留资料库。试点指标、阈值应由项目目标和维护能力决定，不作已证实需求。
5. 本分析不构成对服务条款或数据授权的法律结论，实施前逐来源确认；未修改应用代码、数据、线上网站或运行服务。
