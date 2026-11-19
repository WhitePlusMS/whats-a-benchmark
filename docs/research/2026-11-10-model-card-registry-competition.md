# 模型发布成绩库与用户问题：补充对照

## 2026-11-10：小模型发布成绩和上线后的持续监测

这两类服务针对不同问题：前者帮助用户看发布材料中的结果，后者定期重新测试线上 API。以下是公开页面的当次快照，未逐条复核成绩、登录付费账户或运行模型。

- [Tiny League](https://tinyleague.nunodonato.com/)针对较新的开源权重模型，页面读取时列 36 个模型、95 个 benchmark、651 个成绩点，提供模型表、覆盖热图、两个指标的散点图和单项榜单，另列硬件内存及估算速度。它与“整理模型发布成绩、按评测比较”的原设想直接重叠，但只覆盖该站选定模型和当前版本，数量不能与本站 318 个评测条目直接比较。
- 一位寻找 AA 替代方案的[发帖者](https://www.reddit.com/r/LocalLLaMA/comments/1xhse0l/alternatives_to_artificial_analysis/)问 Tiny League 是否主要采用发布成绩；推荐者在回复中称其来自官方发布。该站变更记录同时明确包含 AA Intelligence Index，不能据这条简短回复声称站内所有分数都是模型厂商自报。站点标明 RTX 4090 速度是依据带宽等条件的估算，不是硬件实测；历史记录还写同一 benchmark 冲突成绩显示最高值、记录冲突，本次未验证当前交互、全部冲突及其来源。
- [另一条 AA 替代品讨论](https://www.reddit.com/r/LocalLLaMA/comments/1xhqlrw/alternative_to_artificialanalysis_for_assessing/)的参与者描述会把 LiveBench 与其他来源交叉查看；本地已有 [LiveBench](../../content/benchmarks/livebench.json) 条目。帖子中的排名变化、偏好和对 AA 动机的指控都是用户看法，不能据此认定其操纵结果，也未证明参与者会使用本站。一个公开讨论只能说明有人提出该问题，不证明用户规模或付费意愿。

[AI Stupid Level](https://aistupidlevel.info/methodology)提供另一种已有产品：其方法页称自行按周期重复测试 API 模型，编码每四小时运行、推理和工具使用每日运行，对同一模型历史记录进行变化监测。页面还提供评测规则、置信区间、不同测试配置边界；不能把其自建任务的分数当作本站 LiveBench 或 AA 的分数。价格页当次列免费账户的有限历史与提醒、付费历史及诊断；[API 规则](https://aistupidlevel.info/api-docs)要求署名，并限制把其数据重新发布成自己的排行榜，规模化再分发须另行协商。上述是平台宣称的能力与规则，不证明这些功能已由本站交互验收或有人付费。

该站的[13 个月研究](https://aistupidlevel.info/research/thirteen-months-of-llm-monitoring)提供了需要保留的反例：作者称历史综合评分的权重、题目及运行配置发生变化，因此改用可追溯到底层调用的信号分析，且在贯穿全年的九个编码任务上未观察到其定义的持续性、特定模型正确率下降；这不能外推到所有模型或任务。其[误报研究](https://aistupidlevel.info/research/drift-detector-false-alarm-rate)称已撤回早期规则产生的 492 条事件，新检测器的结果来自模拟与历史重采样，尚无检测结果经供应商确认；这提醒持续监测自身也可能误报，不能仅凭告警认定模型被厂商暗中降级。两份研究与产品由同一组织发布，原始运行和统计程序未独立复验。

对本站：保存发布时的原始来源、日期与配置可作为资料整理工作；若要回答“用户上线后现在是否变差”，仅保存历史发布数字不够，必须获得可比较的重复观测，而这与已有的付费监测工具正面竞争。当前没有证据表明应承担持续自测的运行成本，或读者会为本站历史功能回访。

调查日期：2026-11-10。本轮查看公开讨论和仓库说明，未执行外部程序、验证全部结果或访问私人用户。

补充竞品与同题案例：[benchgap 的实测／预测成绩及榜单排序研究](2026-11-10-benchgap-prediction-and-ranking.md)。

补充跨领域竞品：[Village LLM Atlas 的发布成绩与机器人同题](2026-11-10-village-atlas-release-score-and-robotics.md)核对 AA-Robotics 与 Qwen 模型卡中的跨厂商对照，区分成绩发布方和实际测评者。

## 和原始设想直接重叠的项目

[Benchmark Radar issue #83](https://github.com/ktwu01/benchmark-radar/issues/83)由仓库拥有者提出模型卡、评测、版本、来源及成绩关系，并在同一讨论中记录实施和取舍。该项目维护者 2026-08-02 的状态说明称，已完成评测、模型卡及二者提及关系；逐条 benchmark result、版本和健康度表当时未开始，随后认为后几张表暂不需要并关闭议题。**这是当时的项目状态，不代表之后仍未实现，也不是独立用户向该站提出的需求**；关联次数排名也不能等同各模型的成绩榜。

后续只读解析该项目固定提交 [`64d635ed`](https://github.com/ktwu01/benchmark-radar/tree/64d635edca670012846fcea61cd0ad67e65f02c4) 的两个 YAML：`model_cards.yml` 有 41 条模型卡记录及 497 个评测提及；`benchmark_scores.yml` 已有 648 条结果记录，涉及 118 个基准元数据项，其中 33 条 `benchmark_id` 是 `gpqa_diamond`。例如三条 Seed2.0 结果各记录分数、来源 ID 与表格位置；这些数字是该文件的记录，本次未逐条复查原报告、验证网页显示或确认每条是否独立测量。不同记录可能来自同一份报告或不同协议，不能把 648 条自动称为 648 个独立模型或 648 次独立评测。**当前它已不只是模型卡提及登记，也有发布成绩记录**，与本站原设想的重叠比该 issue 早期状态所能说明的更大。

进一步回查这三条 [Seed2.0 GPQA 记录](https://github.com/ktwu01/benchmark-radar/blob/64d635edca670012846fcea61cd0ad67e65f02c4/data/benchmark_scores.yml)所指的[字节官方模型卡 PDF](https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/seed2/0214/Seed2.0%20Model%20Card.pdf)：表 3 的 Pro 为 **88.9**，与文件记录一致；表 4 的 Mini 为 **79.0**、Lite 为 **85.1**，而固定 YAML 相应记录分别是 **58.1**、**66.1**。YAML 明写引用表 4，因此与当前读取到的 PDF 不一致。[字节官方网页](https://seed.bytedance.com/en/seed2)目前单独列出 Lite 0215 的 GPQA 为 85.1%，不将页面其他评测的 79.0 作为 Mini GPQA 的旁证。PDF 文件元数据创建时间及 HTTP Last-Modified 都是 2026-02-17；YAML 标记报告日期 2026-02-14，这不足以证明该 PDF 17 日前后是否有其他版本。本次未验证线上页面是否展示这两条、差异成因或后续是否修复，也不能据此推断 AA 榜单或其他聚合站质量。

补查同一 YAML 引用表 4 的部分记录：BeyondAIME Mini/Lite 的 **69.0/76.0** 与当前 PDF 一致；MMLU-Pro 的 **63.4/70.3** 与 PDF 的 **83.6/87.7** 不一致。以上均是对当前读取版本的逐行比较，不等于已经完成整份文件的准确率抽检；也不能排除引用文件曾经更新、不同测试配置或其他资料造成的差异。

[Every Eval Ever](https://github.com/evaleval/every_eval_ever)自述提供汇总结果和可选逐样本 JSONL 的开放格式，记录来源、模型、生成设置、分数和指标方向，并提供校验；README 列出 HELM、Hugging Face 榜单及若干评测的数据入口。它与「收集并整理模型评测成绩」直接重叠，本次未逐条核实数据正确性、更新频率或是否覆盖所有模型发布成绩。字段存在也不等于原始资料都提供这些字段。

[Microsoft Research 的 BenchPress](https://github.com/microsoft/benchpress)也是带来源的模型—评测成绩矩阵，其 README 自报原始审计池有 189 个模型、316 个评测和 4,903 个数值；论文使用的筛选子集为 84 个模型、133 个评测、2,604 个已观察格子，填充率 **23.3%**。这是作者筛选和去重后的特定矩阵，不是全球模型成绩的缺失率，也不能据此判断任一空格为什么缺失。该项目还预测缺失成绩，并将其标为 `predicted`、提供不确定性；预测不等于模型真正测得的结果。本次未下载数据或运行预测器，也未逐条审计来源。仓库将代码标为 MIT、成绩矩阵标为 CDLA-Permissive-2.0；使用前仍须核对具体版本、上游来源和适用条件。

补核 [BenchPress 论文](https://arxiv.org/html/2606.24020)确实列 84×133、2,604 条及 23.3%；但同日读取的 [Hugging Face 数据卡](https://huggingface.co/datasets/microsoft/benchpress-score-matrix)导出声明为原始审计池 283 个模型、712 个评测、8,713 行，以及其所称 paper matrix 的 129×253、4,905 个观察格子、15.0% 填充。只读解析固定修订 [`a8db5a84`](https://huggingface.co/datasets/microsoft/benchpress-score-matrix/tree/a8db5a84d1152b72517d5c315f71c8addb39825c)的 CSV：`scores_all.csv` 有 8,713 数据行、`scores_paper.csv` 有 4,905 行，宽表有 129 行及 254 列（含模型 ID）；同修订 metadata 记载生成于 2026-08-18、253 个评测及 15.0289% 填充。本次核对计数与字段，未逐格复核数值或原始来源。论文、GitHub README 与该导出说明的具体版本关系及规模差异原因未知，不能把数量合成一个快照；论文的 23.3% 也不应冒充此固定导出的比例。

名称级交叉检查：将上述修订 `benchmarks.csv` 712 行的 `benchmark_id`／`benchmark_name` 与本地 318 个 published 条目的 `id`／`name`／`aliases` 做 Unicode NFKC、大小写及标点归一化后的完全匹配，得到 **104 条本地名称或别名候选**；对应的数据集评测 ID 至少在其 `scores_all.csv` 有一条记录。本地 50 条含 `embodied` 字段的记录没有完全名称命中。名称匹配不保证版本、子集、指标或协议相同；未命中也可能由别名、分类或覆盖范围造成，不能据此断言对方没有相关具身数据，更不是全站覆盖率。

一个明确的名称命中但版本不同的例子：本地 [AA Intelligence Index 条目](../../content/benchmarks/aa-intelligence-index.json)保留的是 **v4.3.2**，并注明官方后来更新；上述 BenchPress 固定导出的同名 `aa_intelligence_index` 配置注明 **v4.0.4**；[AA 官方方法页面](https://artificialanalysis.ai/methodology/intelligence-benchmarking)当次显示 **v5.0.1**。它们可以作为同一指数家族定位，但不能将各版本分数按同一量表直接混排。这里核对的是条目标注和页面版本，不是对所有历史模型分数的完整审计。

同一固定修订的 `scores_all.csv` 以数据集自己的标签统计为 `verified` 7,611、`verified_third_party` 702、`dropped` 335、`needs_review` 58、`flagged` 7 行；其中 42 行的 `reference_url` 字段为空，包括 18 行 `dropped` 和 24 行 `verified`。`scores_paper.csv` 有 18 行该字段为空。这里统计的是 CSV 字段而非数据集所有嵌套元数据：部分行的备注会描述来源类型，未核查 JSON 的候选来源，因此不能推断这些记录没有任何出处。也不能把数据集的 `verified` 标签等同本站独立运行或直接证明数据正确。

对一个具体空链接继续回查：同修订完整 JSON 中，`llama-4-scout` / `arc_agi_1` 记录 0.5、`verified`、`reference_url` 为空，备注仅指第三方榜单，该对象没有 `candidates` 字段；[ARC Prize 榜单](https://arcprize.org/leaderboard?trk=public_profile__reactions-text)确有同名模型的 ARC-AGI-1 0.5%。此处只说明找到了一个数值一致的可能来源，尚未确认运行配置或数据集作者实际引用路径，不能因为数值相同就说它肯定是同一运行。其他空链接记录可能具有不同的嵌套信息，本次未逐条展开。

另一条空链接 `gemini-3-flash` / `omnidocbench_1.5` 为 **0.121**，备注指向 Google 的 Flash 产品页及总体编辑距离；当次该产品页已展示更新的型号，正文未找到此旧值。进一步搜索找到 [Google 的 Gemini 3 Flash 官方评测 PDF](https://storage.googleapis.com/deepmind-media/gemini/gemini_3_flash_model_evaluation.pdf)，对应表格确有 **0.121**、指标为总体编辑距离且越低越好。它是能核对该数值的官方来源，但不能仅凭同值断言数据集作者当初引用的就是这个 PDF。该例说明 URL 字段为空不等于无出处，也说明动态产品页可能随型号更替，不应当作永远不变的原始快照。

抽查固定修订 `scores_all.csv` 中两条 GPQA 记录：`qwen3.5-0.8b-instruct` 的 **27.41** 确与 [Liquid AI 自己的对比表](https://www.liquid.ai/blog/lfm2-5-230m)一致，但报告来源是 Liquid，而非 Qwen 自报；`step-3.7-flash` 的 **78.41** 对应 [StepFun 固定版本说明](https://github.com/stepfun-ai/Step-3.7-Flash/blob/e2132efea2836f5d1638f8145e2178b2f6c9c747/README.md)的 NVFP4、无 MTP 配置及每题 16 次平均。该 CSV 的 `reported_setting_json` 和备注已保留配置，因此这一能力已有现成数据，不是本站独有。两行均标 `verified` 是数据集自己的审计标签，不代表本站复测；也不能以两行对上就认定全部 8,713 行正确。

另按 CSV 中 GPQA、`source_type=model_card` 的前六行抽查：Gemini 2.0 Flash **60.1** 对应 [Google 模型卡](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf)；Llama 4 Scout／Maverick **57.2／69.8** 对应 [Meta 模型卡](https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct)；DeepSeek R1／R1-0528 **71.5／81.0** 对应 [DeepSeek 的同一对照表](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528)；DeepSeek V4 Pro **90.1** 对应 [其模型卡的 Max 配置](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)。这六个数值和模型列本次能够对上，并不证明 CSV 中各项参数也都已核准；同一份报告中的多个数字不自动等于独立来源。连同上两行共抽查八条，只是方便复核的小样本，不能用于估算整体准确率。

[orq-arena](https://github.com/orq-ai/orq-arena)面向用户自己提供的提示和候选模型，作者说明可做两两比较、模型裁判和置信区间报告；是另一类自建场景评测工具，不能与公开模型卡归档等同。本次未运行，其比较质量依赖数据、裁判及配置。

## 模型发布成绩归档：进一步发现

直接以 GPQA Diamond 对照，[evals.report 的成绩页](https://evals.report/benchmarks/gpqa-diamond?tab=scores)列有模型、成绩、来源模型名称、状态和日期；页面说明来源包括官方榜、厂商发布及社区运行，并提供说明和运行指南。2026-11-10 读取时显示的数据快照日期是 2026-09-24；状态标签是该站自己的标注，本次没有逐条复核其来源或评估准确率。这与「按 benchmark 整理模型发布成绩」直接重叠，也不意味着它已覆盖所有发布数据。

同一评测的 [Artificial Analysis 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)称成绩由其独立测试，并提供分数、成本及 token 等视图；[OpenRouter 页面](https://openrouter.ai/benchmarks/gpqa-diamond/)称在供应商接口使用固定题目集测试，并列出准确率、每题成本和时间；[GPQA 的 Hugging Face 数据集页](https://huggingface.co/datasets/Idavidrein/gpqa)也显示模型成绩及评测结果入口。它们的运行条件、收录范围和数据来源不同，不能仅凭同名题集把数值混成一次统一测评；本次仅核对页面展示与自述，未复跑。作者数据卡还要求不要在线披露数据集样例，因此不能仅因其他站提供示例入口就假设其展示的是原题，或据此判定许可问题。

[AI Change Watch 的成绩页](https://aichangewatch.com/benchmarks)说明其收集模型厂商发布的 benchmark 成绩，按来源组织，提供模型发布后补充成绩等历史记录；搜索可见的页面快照称截至 2026-10-27 覆盖 8 家厂商、118 个模型、24 个 benchmark 和 787 条发布成绩主张。该站页面提供简体中文语言入口。此次页面原文已被搜索抓取，但直接重开时返回 502；上述统计是快照中网站自述，不代表当前完整数据、逐项准确性或中文功能已经交互验证。它与「收集模型发布时的数据」是直接竞争关系，尤其不能把来源归档、历史或中文入口简单视为本站独有。

[Evanesca 公开成绩页](https://evanesca.app/benchmarks)将服务上的模型检查与厂商发布的 GPQA、MMLU、LiveCodeBench 等分数分区展示，列出模型、成绩与设置：例如 GPT-OSS 120B 的 GPQA Diamond 说明无工具、high reasoning，并展示 medium 与 low 的成绩；Qwen3.5 397B 则提示原卡只写 GPQA、未标明子集。页面表示发布成绩不由其重新运行，LMArena 成绩是单独来源；截至其页面声明的检查与读取日期，发布成绩仅覆盖页面列出的部分模型。该站也提示不同厂商的协议不一定可直接比较。本次未逐项回查该表，也未操作其模型服务；这些功能证明「成绩加来源和口径解释」已有实际实现，而不是证明其覆盖了所有模型和评测。

[Epoch AI 的 GPQA 对照研究](https://epoch.ai/data-insights/self-reported-gpqa)比较厂商报告和该机构独立重复测得的结果：其选定的 2023—2025 年模型样本，在所用统计方法下没有观察到显著差异；其中 Mistral 条目是厂商认可的第三方成绩而非厂商自测。研究仅覆盖选定模型与 GPQA Diamond，且作者说明了抽样与方法限制，不能推断所有厂商成绩准确，也不能因个别聚合错误就断言厂商普遍虚报。另据 [Epoch 方法介绍](https://epoch.ai/benchmarks/about)，其同时整理外部来源、自己运行部分评测并提供数据下载；因此「自报与独立评测并列」和基础统计也不是没有竞争者的方向。

## 真实讨论与证据边界

[Reddit 讨论](https://www.reddit.com/r/ClaudeAI/comments/1trclg3/ai_benchmarks_are_useless/)中发帖者抱怨发布会分数无法预测自己的 API 多步骤工作体验，提到长上下文、代码项目和工具设置；一位评论者希望在相同环境中测真实任务并讨论成本与评价困难。这是具体个人体验和主张，不证明所说模型污染、性能下降、没有其他人做同类测试或全部榜单失效，也不是对本站的使用或付费证明。

这条讨论与维护者提出的模型卡库属于不同证据：前者是在意自己的工作是否完成，后者是竞品作者规划信息结构。仅把发布分数全部搬到本站未必解决前者问题；是否需要中文解释、可追溯配置或者特定工作场景比较，仍需以读者任务对照验证。

另外三条相互独立的公开提问，分别体现不同工作流：

- [本地模型选型](https://www.reddit.com/r/LocalLLM/comments/1xibtk7/best_local_model/)：提问者比较四个小模型时觉得各自榜单都好看，问怎样建立自己的测试；回复建议使用真实任务，也有人建议制作带参考答案的评估。这是对选型与测试方法的提问，不直接证明需要汇总发布成绩。
- [编程评测选择](https://www.reddit.com/r/LocalLLM/comments/1tjcjw3/best_coding_benchmark/)：提问者问比较 LLM 编程应信任哪个 benchmark，并追问某页为何未列出两家模型；另一人解释旧论文与实时榜单的差别，评论中也有人描述自建工作任务测试。具体平台的数据覆盖和评论的判断没有逐项验证。
- [记忆系统评分](https://www.reddit.com/r/AI_Agents/comments/1wy21mt/same_system_very_different_scores_depending_on/)：提问者担心同一系统因回答模型、裁判和重复次数不同而出现难以比较的分数，并问这些数字是否影响产品选择；帖子引用的具体数字和评论者统计建议均未在本次复核。

这三帖是少量公开自报且可能受发帖社区选择偏差影响；它们可用于设计阅读任务，不能转成需求人数、留存、付费意愿或本站独有优势。

## 2026-11-10：对“把发布成绩汇总起来”最直接的读者反馈

[LLM Stats 的早期公开帖子](https://www.reddit.com/r/LocalLLaMA/comments/1oa98jf/made_a_website_to_track_348_benchmarks_across_188/)中，站点作者解释其收集实验室论文和模型卡成绩，并链接来源，初衷是集中分散的发布信息。这和用户原设想高度重叠；作者和推广帖子不是独立客户证据。

同一帖子下，不同评论者提出了具体需要：有人认为从论文、博客和帖子里找成绩费事，希望集中查阅并带出处；有人希望筛掉厂商自报，只看独立来源；有人希望筛开源权重、选定几个模型比较，或自选评测并赋予权重；还有人提出更新速度与缺漏问题。这些反馈说明**有人希望使用汇总信息**，不应因为存在 AA 就推断该方向没有需求。评论者身份、是否持续使用和付费意愿未知，帖子也有选择偏差，不能外推需求规模或归因于本站。

帖子中站点作者当时表示主要聚合发布材料、尚未独立跑分；这一历史陈述不应当作今日全站状态。[LLM Stats 当前方法页](https://llm-stats.com/methodology/llm-stats-score)描述厂商自报、第三方和其自行验证的区分规则、缺失数据处理和评测纳入标准；这是现行页面的方法声明，本次未逐条验证它是否执行或验证具体成绩。

[Mostly Right 的成绩数据集页面](https://mostlyright.md/datasets/llm-benchmark-scores-by-model-since-2019)自述整理 Epoch AI 发布的多来源结果，字段包括来源、评测设置、日期、标准误；本次页面显示 7,265 行、`Views 2,302 +796 in the last 30 days`、`Uses 129 +40 in the last 30 days`。其他推荐卡片对 uses 有包括下载和成功 API/MCP 查询的说明，但本次没有核实该数据集对应计数的去重、机器人流量或完整统计口径。数字仅是网站自报的页面快照，不等于 129 位独立用户、付费客户、留存率或本站未来流量。

[StackReplay 成绩页](https://www.stackreplay.com/benchmarks)也自称保留版本、来源与设置，支持模型选择及 JSON 导出，并明确自己没有复跑所展示成绩；初次读取显示当时默认比较五个模型、22 个评测，之后再次读取超时。本次没有验收导出或逐项核实来源，不能用默认显示数量断定全站覆盖。

## 数据可访问不代表所有来源可自由再发布

[Epoch 官方说明](https://epoch.ai/benchmarks/about)将自己整理／产生的数据按其 CC BY 条件提供并要求注明来源与作者，同时明确题目、答案和外部项目数据各有原许可；其说明还区分自身运行与外部运行，并提供数据下载。这为未来研究来源提供线索，但不能把其中所有第三方原始材料或网站整表都视为统一授权，具体使用、转发与商业展示前仍需逐项核对。具体法律适用和许可证解释不在本次判断范围。

产品决策因此应区分：**有真实读者觉得成绩汇总有用**；**有其他站已提供近似服务**；**这些证据尚不能证明本站的差异、增长或商业化**。针对本站，可先选同一评测的少量模型、核对来源和设置，再与既有工具对照读者能否更快找到可用信息，而不是把所有空格自动填为零或推断缺失结果。

