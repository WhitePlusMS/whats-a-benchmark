# Artificial Analysis 目录全面补齐计划

范围为 2026-11-13 [94 项对照表](2026-11-13-aa-94-catalog-crosswalk.md)中的 **53 个尚待覆盖的名称**。包括 35 个未收录项、17 个只有母集或相关版本的项目，以及原来只在综合指数中提及的 DeepsecBench-AA。项目基线为 `main` 的 `59b6d4c`，共 317 条目录记录。实施前重新核对分支、正式条目及工作区里的 Decision Index v2.0。已对应的 41 项做回归抽查，重点关注受版本关系变更影响的旧条目。排序沿用[52 项优先级清单](2026-11-13-aa-catalog-priorities.md)。

完成目标是 **53 个名称都能在站内查到对应版本、任务、计分口径和官方入口**。预计新增 **27 张评测或专题卡**，其余 **26 项**通过现有卡片、专题分项或历史说明覆盖。另有现行综合指数的更新任务，作为依赖单独列出。这里的数量是计划基线，复核发现已经有同项时合并到现有条目，并在验收表里保留原编号和落点。

| 批次 | 交付 | 覆盖名称 | 其中新卡 | 主要验收 |
| --- | --- | ---: | ---: | --- |
| A | MKA 试点 | 1 | 1 | 能看清图纸输入、交付物及评分 |
| B | 当前指数版本及首批案例 | 5 | 4 | 旧版和新版可分别查找，题集及协议口径正确 |
| C | 企业工作、语言和图像 | 10 | 7 | 新任务有代表案例，既有协议有准确落点 |
| D | 决策指数和历史版本 | 10 | 0 | 现行分项与历史协议均能定位 |
| E | 语音与转录 | 8 | 3 | 语料、权重、版本和官方音频或榜单入口可核对 |
| F | 图像、视频和音乐 | 9 | 5 | 各榜单的正式名称、版本与独立题集可区分 |
| G | 推理与硬件 | 5 | 5 | 能区分硬件、负载、运行配置和计量单位 |
| H | 长尾及最后复查 | 5 | 2 | 53 项完成逐名查验，历史及私有资料有可用入口 |
| **合计** | | **53** | **27** | |

## 收录和验收口径

1. **建卡与合并。** 独立题集或实质不同的版本用独立 ID。共享题集的评分协议、抽样和历史说明放在原卡。两个榜单共用一张专题卡时，各自保留名称、版本、分项和官方榜单。同一事实只维护在一处，相关卡片提供导航。依据见[评测身份决策](../adr/0001-benchmark-identity.md)。
2. **名称可检索。** 现有搜索索引读取卡片名称、`aliases` 和部分正文字段。将合并收录项的正式名称加入承载页的检索词，正文明确标为分项、协议或历史名称。比如搜索 `AA-Video-I2V-Silent` 能进入图生视频卡并看到无声分项。测试时按原名搜索、打开卡片、检查对应段落，记录页面路径和实际锚点。见[现有搜索代码](../../src/lib/search.ts)。
3. **案例有出处。** 开工时固定官方版本或源文件修订。站内案例保存记录 ID、split、原始来源、许可及节选说明。复用已有样例浏览器，优先展示一个代表性任务。私有题集、权限待核的媒体和仅提供官方示例的项目，页面写明范围及查看入口。真实案例说明、原题、模型输出和参考答案分别标明。见[内容维护手册](../CONTENT_MAINTENANCE.md)。
4. **成绩有口径。** 记下 AA 自测、上游官方和厂商报告各自的版本、题集、评委或运行设置。用官方结果入口说明成绩含义，维护站内展示所需的来源和版本。
5. **一张卡一个 Git 提交。** 新卡包含自己的内容和素材。更新现有卡也单独提交。双向关联按各自目标卡提交，先提交可被引用的条目。专题卡承载多个名称时，同一张卡一起交付。最终合并检查保留逐卡记录。以干净的 `main` 工作树开工，显式暂存本卡的文件，按约定记录 `UPDATE_LOG.md`。

## 逐项执行清单

`#编号` 对应 94 项对照表。表中 ID 是现有条目的 ID 或建议新增的 ID。执行时在每行末尾追加实际页面路径及锚点、提交号和验收状态。建议状态为 `待做`、`待核`、`已提交`、`已验收`。本计划下列各行均为 `待做`。

### A · 先做 MKA 试点

用一张新卡验证真实材料、交付物和判分能否在同一详情页读懂。站内使用已有案例模板，确实需要时才加图纸前后对照。完成该卡的桌面、窄屏和样例直达验收后，再扩大制作。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #25 Multimodal Knowledge Agent（MKA） | 2026-11-10 首发；公开示例固定 46bce7a | 新卡 · `mka` | 建筑图纸协调审查。来源固定到 Google 的公开展示集，输入平面图和协调要求，输出 PPT，展示实际 rubric 及可核对的交付物。标清 10 个展示案例与 AA 私有 200 题。 [官方入口](https://artificialanalysis.ai/evaluations/mka/) · [来源 2](https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/) · [来源 3](https://huggingface.co/datasets/google/multimodal-knowledge-agent/tree/46bce7ab8768f661750bd1016ec8cbdc517740b5) |

### B · 补当前指数版本和首批案例

先做 FrontierCode-AA 2.0、CritPt v2 和 SWE-Atlas-QnA-AA，随后做 FRAMES、AA-3D。待相关卡片与协议可检索后，再更新两张当前指数说明。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #11 FrontierCode-AA 2.0 | FrontierCode-AA 2.0，132 道私有任务、每题 3 次 | 新卡 · `frontiercode-aa-2-0` | 与 1.1 Main、Extended 互链。公开维护样例说明阻断检查及分项评分，132 道正式任务标私有。 [官方入口](https://artificialanalysis.ai/evaluations/frontiercode-2-0) · [来源 2](https://cognition.com/blog/frontier-code-2.0) · [来源 3](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| #23 CritPt v2 | CritPt v2 完整 70 题，标注 AA 40 题 Hard Subset 和 v5.0.1 重判 | 新卡 · `critpt-v2` | 保留原版。完整 70 题和指数的 40 题 Hard 在同页分列，Hard 选题名单标私有，标明 v5.0.1 重判，样例用作者指定的示例。 [官方入口](https://artificialanalysis.ai/evaluations/critpt-v2) · [来源 2](https://artificialanalysis.ai/methodology/intelligence-benchmarking) · [来源 3](https://huggingface.co/datasets/CritPt-Benchmark/CritPt/tree/37ecba7e9d00eda858d7be1adba19a38ba50e7a6) |
| #41 SWE-Atlas-QnA-AA | SWE-Atlas-QnA-AA 124 题公开评分版，固定 1f28d51 | 更新 · `swe-atlas-qna` | 同一道公开题对照 Scale 与 AA 的评分细则，标出相同的 124 题、改写的评分规则及不同评委。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/SWE-Atlas-QnA-AA) · [来源 2](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/SWE-Atlas-QnA-AA/tree/1f28d51b6e191e9f2bfdc22b09d92eecdab6654e) |
| #93 FRAMES | Google FRAMES 原版 test，824 题，固定 58d9fb6 | 新卡 · `frames` | 选一条固定快照的记录，展示问题、参考网页和答案，区分原始参考链接与本站整理的说明。 [官方入口](https://huggingface.co/datasets/google/frames-benchmark) · [来源 2](https://huggingface.co/datasets/google/frames-benchmark/tree/58d9fb6330f3ab1316d1eca12e5e8ef23dcc22ef) · [来源 3](https://artificialanalysis.ai/microevals) |
| #2 AA-3D | AA-3D v1.0，55 个交互式场景任务 | 新卡 · `aa-3d` | 同一 brief 的多模型场景比较，说明人工盲选 Elo。作品链接到官方 Explorer，记录场景复用状态。 [官方入口](https://artificialanalysis.ai/evaluations/aa-3d) · [来源 2](https://artificialanalysis.ai/methodology/aa-3d) · [来源 3](https://artificialanalysis.ai/3d/explorer) |

### C · 扩展实际工作、语言与图像

企业工作流和媒体案例以一个真实任务起步。BFCL、BrowseComp、APEX 直接更新原卡。复用 C 批的图像编辑展示方式开展 F 批。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #8 EnterpriseOps-Gym-AA | 2026-07-08 AA 首发 oracle tool 模式，1,117 题、每题 3 次 | 新卡 · `enterpriseops-gym-aa` | 用公开日历或协作任务说明目标、状态变化与最终验收。区分上游公开 oracle 数据与 AA 实测的 1,117 题口径。 [官方入口](https://artificialanalysis.ai/evaluations/enterprise-ops-gym-aa) · [来源 2](https://artificialanalysis.ai/articles/announcing-enterpriseops-gym-aa) · [来源 3](https://huggingface.co/datasets/ServiceNow-AI/EnterpriseOps-Gym/tree/c8e538eae8a6205294f0a86675fefdc1fac408f6) |
| #20 Code2Video-AA | Code2Video-AA dataset 0.3.0，114 项含 39 项公开 brief | 新卡 · `code2video-aa` | 公开 brief、对应的渲染成品入口及评判维度，标记 114 项中的 39 项公开 brief，分别核对 brief 与成品许可。 [官方入口](https://artificialanalysis.ai/evaluations/code2video-aa) · [来源 2](https://artificialanalysis.ai/articles/code2video-aa) · [来源 3](https://www.heygen.com/research/introducing-code2video-benchmark) |
| #53 BFCL（AA 手机和端点协议） | 端点 BFCL v4-500，基于 2026-03-23 上游版本；手机 BFCL v4 non-live 640 | 更新 · `bfcl` | 同页为端点 v4-500 与手机 non-live 640 写两段具体协议，分别登记准确检索别名。 [官方入口](https://artificialanalysis.ai/methodology/mobile-device-benchmark-set) · [补充来源](https://artificialanalysis.ai/methodology/endpoint-accuracy-index) |
| #52 BrowseComp（AA 搜索子集） | AA Search Index 的 BrowseComp 困难 200 题子集 | 更新 · `browsecomp` | 在原版卡列出 AA 的 200 题困难抽样和固定答题模型的供应商对照。原版案例标原始题库。 [官方入口](https://artificialanalysis.ai/methodology/search-api#browsecomp) · [补充来源](https://artificialanalysis.ai/agents/search-api) |
| #40 Global-MMLU-Lite | Cohere Labs Global-MMLU-Lite v3.0，23 语言，每语言 400 道测试题，固定 36c2fd7 | 新卡 · `global-mmlu-lite` | Lite v3.0 与完整版及多语言指数互链。例题保留语言和文化分层，标清上游 23 种语言与 AA 成绩覆盖。 [官方入口](https://artificialanalysis.ai/evaluations/global-mmlu-lite) · [补充来源](https://huggingface.co/datasets/CohereLabs/Global-MMLU-Lite/tree/36c2fd756f19ccf13a9a96c8e53ccecc02192b8b) |
| #92 TruthfulQA | TruthfulQA 作者 2025-01 双选修订，固定 CSV d71c110 | 新卡 · `truthfulqa` | 优先用作者双选修订，一页说明生成版、MC1、MC2 与新双选的计分差异。 [官方入口](https://github.com/sylinrl/TruthfulQA) · [来源 2](https://github.com/sylinrl/TruthfulQA#update-to-multiple-choice-setting-jan-2025) · [来源 3](https://github.com/sylinrl/TruthfulQA/blob/d71c110897f5d31c5d7f309e7bc316c152f6f031/TruthfulQA.csv) |
| #3 APEX-Agents-AA | APEX-Agents-AA 452 题 Stirrup 实施，按 AA 方法 2026-11-13 快照 | 更新 · `apex-agents` | 原版内新增 AA 452 题协议段，链接已收录的 1.1 卡。说明 480 原版任务与 AA 抽取范围的差别。 [官方入口](https://artificialanalysis.ai/evaluations/apex-agents-aa) |
| #16 ITBench-AA | ITBench-AA 2026-05-27 首发 SRE 版，59 题，40 公开加 19 私有 | 新卡 · `itbench-aa` | 展示公开 SRE 事故的告警、服务关系和根因诊断交付，说明评分。区分 40 公开及 19 私有，后续领域单列范围。 [官方入口](https://artificialanalysis.ai/evaluations/itbench-aa) · [来源 2](https://artificialanalysis.ai/articles/itbench-aa-launch) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/ITBench-AA/tree/76df38a82288f75ba9e41dc8c515033332497473) |
| #13 AA-PersonalityBench | AA-PersonalityBench 2026-11-13 方法快照，30 特质、8 指数 | 新卡 · `aa-personalitybench` | 从官方公开问题引入配对判定，解释风格的 8 个指数放在一页及其分数含义。 [官方入口](https://artificialanalysis.ai/evaluations/aa-personalitybench) · [补充来源](https://artificialanalysis.ai/methodology/aa-personalitybench) |
| #56 AA-Image-Editing v2.1 | AA-Image-Editing v2.1，参考图加编辑指令 | 新卡 · `aa-image-editing` | 原图、编辑要求与结果差异清楚可看。官方榜单和样例始终可达，站内媒体依据单项许可。 [官方入口](https://artificialanalysis.ai/image/leaderboard/editing) · [补充来源](https://artificialanalysis.ai/methodology/image) |

### D · 决策指数与历史版本

先核准工作区 v2.0 资料和现行 v2.1 口径，再逐项补分项及母卡关联。Terminal-Bench、τ² 和 SWE-bench 的历史子集可与决策项并行整理。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #47 When2Call（AA 决策协议） | When2Call AA 决策 v2.1，3,423 道多选题与 Decision Score | 更新 · `when2call` | 列 AA 决策 v2.1 的筛题与 Decision Score，并保留 v1 准确率口径。关联决策指数。 [官方入口](https://artificialanalysis.ai/evaluations/when2call) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| #45 AA-Paperclip | AA-Paperclip 在 Decision Index v2.1 的协议，1,500 份私有文档、两类请求 | 分项 · `aa-decision-index-v2-1` | 写文档决策和提取两个任务、计分规则、私有范围，链接官方公开案例。 [官方入口](https://artificialanalysis.ai/evaluations/aa-paperclip) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| #46 EvalSafe-O*NET-AA | EvalSafe-O*NET-AA 在 Decision Index v2.1 的 6,582 题口径 | 分项 · `aa-decision-index-v2-1` | 写 7,500→6,582 的范围及共识判分，保留上游数据入口。 [官方入口](https://artificialanalysis.ai/evaluations/evalsafe-onet-aa) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| #50 AA-Symmetry v1.1 | AA-Symmetry v1.1，120 个基础问题、460 个表述 | 分项 · `aa-decision-index-v2-1` | 写 120 个基础问题、460 个表述的一致性规则及 v1.0 的 440 个表述。 [官方入口](https://artificialanalysis.ai/evaluations/aa-symmetry) |
| #48 AA-Omniscience-Decision v1.1 | AA-Omniscience-Decision v1.1，500 道私有多选题 | 分项 · `aa-decision-index-v2-1` | 写 500 道私有多选题、拒答及概率计分，从 AA-Omniscience 卡关联到这一分项。 [官方入口](https://artificialanalysis.ai/evaluations/aa-omniscience-decision) |
| #49 HLE-MultiChoice v1.1 | HLE-MultiChoice v1.1，509 道纯文本多选题和拒答选项 | 更新 · `hle` | 列 v1.1 的 509 道多选、拒答选项及 v1.0 的 513 题，区分 Diamond 和端点 250 题，关联决策指数。 [官方入口](https://artificialanalysis.ai/evaluations/hle-multichoice) |
| #35 τ²-Bench Telecom | AA 历史 τ²-Bench Telecom，114 题、每题 3 次 | 历史 · `tau2-bench` | 母卡版本段记录 114 道 Telecom 题、三次重复与后续指数变化，链接 τ³-Banking。 [官方入口](https://artificialanalysis.ai/evaluations/tau2-bench) · [补充来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| #34 Terminal-Bench Hard | AA Terminal-Bench Hard，2025-08-14 terminal-bench-core 74221fb，44 题 | 历史 · `terminal-bench-2` | 版本段明确是早期 terminal-bench-core 难题子集，在 2.0、2.1、4.0 的家族说明内可找到。与 2.1 的替换关系有出处。 [官方入口](https://artificialanalysis.ai/evaluations/terminalbench-hard) · [补充来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| #82 SWE-Bench-Pro-Hard-AA | SWE-Bench-Pro-Hard-AA 2026-05 编程榜旧版，150 题 | 历史 · `swe-bench-pro` | 同页对照 AA 早期 150 题和上游 v2 HARD-51，标明历史榜和样例范围。 [官方入口](https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index) · [补充来源](https://www.linkedin.com/posts/artificial-analysis_announcing-the-artificial-analysis-coding-activity-7459631455477051395-gJsd) |
| #83 WildGuardTest | AA Decision Index v1 的 WildGuardTest 835／1,725 题过滤版 | 历史 · `aa-decision-index-v2-1` | 列 v1 过滤集与退出 v2 的记录，链接原始题库和历史 AA 结果。案例区只概述分类任务。 [官方入口](https://artificialanalysis.ai/evaluations/wildguardtest) |

### E · 语音与转录专题

先完成 AA-WER 的方法入口，随后逐项加语料、历史和搜索别名。完成 τ-Voice 与 Full Duplex 版本核对后，再发布 Speech-to-Speech Index v2.0 的组成说明。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #67 τ-Voice（AA 实施） | τ-Voice 的 AA Speech-to-Speech Index v2.0 实施，三领域、每题 3 次 | 更新 · `tau-voice` | 原卡加 AA 语音到语音实施和任务成功计分，链接语音指数。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#agentic-performance) |
| #66 Full Duplex Bench（AA 对话动态子集） | Full Duplex Bench 上游 v1 和 v1.5 的 AA 混合子集 | 历史 · `full-duplex-bench` | 写 AA 历史 v1／v1.5 混合子集、指数 v2.0 换项及上游版本区别。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#conversational-dynamics) |
| #70 Controlled Voice Arena | Controlled Voice Arena，2026-11-13 AA 方法快照 | 新卡 · `aa-tts-controlled-voice` | 对照统一参考音色，解释盲选和音色克隆任务，提供正式榜单入口。 [官方入口](https://artificialanalysis.ai/text-to-speech/leaderboard/controlled-voice) · [补充来源](https://artificialanalysis.ai/methodology/text-to-speech) |
| #69 Provider Voice Arena | Provider Voice Arena，2026-11-13 AA 方法快照 | 新卡 · `aa-tts-provider-voice` | 对照供应商提供的音色，解释可比条件，与 Controlled Voice 互链。 [官方入口](https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice) · [补充来源](https://artificialanalysis.ai/methodology/text-to-speech) |
| #73 VoxPopuli-Cleaned-AA v1.0 | VoxPopuli-Cleaned-AA v1.0，固定 07adf4a，标 AA-WER v2.2 | 新卡 · `aa-wer` | 在 AA-WER 方法卡列 VoxPopuli 清洗数据及其权重、固定快照、语料入口，说明清洗对转录错误率的影响。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/VoxPopuli-Cleaned-AA) · [来源 2](https://artificialanalysis.ai/methodology/speech-to-text) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/VoxPopuli-Cleaned-AA/tree/07adf4a242e2e5dd955a230909c177573c978ee3) |
| #74 Earnings22-Cleaned-AA v1.0 | Earnings22-Cleaned-AA v1.0，固定 5999936，标 AA-WER v2.2 | 分项 · `aa-wer` | 列 Earnings22 财报电话会语料、固定快照、权重及批量／流式口径，提供语料入口。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/Earnings22-Cleaned-AA) · [来源 2](https://artificialanalysis.ai/methodology/speech-to-text) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/Earnings22-Cleaned-AA/tree/5999936ee3d8d3cde160e3c65a8cc6ff5b7c5276) |
| #72 AA-AgentTalk | AA-WER v2.2 里的 AA-AgentTalk 私有留出集 | 分项 · `aa-wer` | 列 AA-AgentTalk 的私有留出范围及权重，提供官方方法。 [官方入口](https://artificialanalysis.ai/articles/aa-wer-v2) · [补充来源](https://artificialanalysis.ai/methodology/speech-to-text) |
| #84 AMI SDM | AA-WER v1.0 的 AMI SDM 单远场麦克风语料 | 历史 · `aa-wer` | 在 v1.0 历史段列 AMI SDM 和移除原因，提供官方方法和语料入口。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-text#version-history) |

### F · 图像、视频和音乐专题

按文生图、文生视频、图生视频、视频编辑、音乐分别建设入口。有声和无声或纯音乐与人声共享页面时，分别保留名称、版本、题集和榜单。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #55 AA-Image-T2I v2.1 | AA-Image-T2I v2.1 | 新卡 · `aa-image-t2i` | 说明纯文本生成与图像编辑的不同输入、盲评方式及版本，链接官方榜。 [官方入口](https://artificialanalysis.ai/image/leaderboard/text-to-image) |
| #57 AA-Video-T2V v2.1 | AA-Video-T2V v2.1，有声 | 新卡 · `aa-video-t2v` | 文生视频卡区分有声与无声的独立题集和榜单，正式名称、版本和对应入口可查。 [官方入口](https://artificialanalysis.ai/video/leaderboard/text-to-video) |
| #58 AA-Video-T2V-Silent v2.1 | AA-Video-T2V-Silent v2.1，无声 | 分项 · `aa-video-t2v` | 无声 v2.1 单列题集和榜单，精确别名查得到。 [官方入口](https://artificialanalysis.ai/video/leaderboard/text-to-video) |
| #59 AA-Video-I2V v2.1 | AA-Video-I2V v2.1，有声 | 新卡 · `aa-video-i2v` | 图生视频卡区分两套参考图条件、有声与无声题集及榜单。 [官方入口](https://artificialanalysis.ai/video/leaderboard/image-to-video) |
| #60 AA-Video-I2V-Silent v2.1 | AA-Video-I2V-Silent v2.1，无声 | 分项 · `aa-video-i2v` | 无声 v2.1 单列题集和榜单，精确别名查得到。 [官方入口](https://artificialanalysis.ai/video/leaderboard/image-to-video) |
| #61 AA-Video-Editing v1.1 | AA-Video-Editing v1.1，有声 | 新卡 · `aa-video-editing` | 视频编辑卡列两种输入素材、输出要求和榜单，区分沿用的 v1.0 题集。 [官方入口](https://artificialanalysis.ai/video/leaderboard/video-editing) |
| #62 AA-Video-Editing-Silent v1.1 | AA-Video-Editing-Silent v1.1，无声 | 分项 · `aa-video-editing` | 无声 v1.1 单列题集和榜单，精确别名查得到。 [官方入口](https://artificialanalysis.ai/video/leaderboard/video-editing) |
| #63 AA-Music-Instrumental v1.1 | AA-Music-Instrumental v1.1 | 新卡 · `aa-music-generation` | 纯音乐与人声 v1.1 同卡分区，保留各自正式名称和榜单入口。 [官方入口](https://artificialanalysis.ai/music/leaderboard/instrumental) |
| #64 AA-Music-Vocal v1.1 | AA-Music-Vocal v1.1 | 分项 · `aa-music-generation` | 人声 v1.1 单列题集和榜单，精确别名查得到。 [官方入口](https://artificialanalysis.ai/music/leaderboard/vocals) |

### G · 推理与硬件专题

先上 AA-AgentPerf-Local 和 API 性能方法。随后补 AA-SLT、数据中心 AgentPerf、Pipette，明确配置与速度指标的适用范围。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #78 AA-AgentPerf-Local | AA-AgentPerf-Local 首发负载 8 任务、168 轮；可读工具快照 0.3.4／1fe8056 | 新卡 · `aa-agentperf-local` | 记录真实工作负载及工具快照，区分软件、模型量化、设备配置和某次公布结果。 [官方入口](https://artificialanalysis.ai/hardware-inference-stack/laptops-workstations) · [来源 2](https://artificialanalysis.ai/articles/aa-agentperf-local) · [来源 3](https://github.com/ArtificialAnalysis/aa-agentperf-local/blob/1fe80568c1e4b81b338ef276ccc6874a36d3704d/pyproject.toml) |
| #75 LLM API Performance v3.0.0 | LLM API Performance v3.0.0，2026-11-03 方法 | 新卡 · `aa-llm-api-performance` | 说明首字延迟、生成速度和测试负载，单列 v3.0.0 与 v2.2.0 区别。 [官方入口](https://artificialanalysis.ai/methodology/performance-benchmarking) |
| #76 AA-SLT（System Load Test） | AA-SLT 方法快照，1,000 入／1,000 出 token 的负载 | 新卡 · `aa-slt` | 说明输入／输出长度和并发负载，链接方法和实测结果。 [官方入口](https://artificialanalysis.ai/methodology/system-load-test) |
| #77 AA-AgentPerf | AA-AgentPerf 数据中心协议，2026-06-12 首发 | 新卡 · `aa-agentperf` | 记录数据中心负载、披露范围、硬件与软件比较条件，互链 Local。 [官方入口](https://artificialanalysis.ai/methodology/agentperf) · [补充来源](https://artificialanalysis.ai/articles/aa-agentperf) |
| #79 手机真机推理（Liquid AI Pipette） | AA 手机 Pipette 的 E2E 实测，1,024 入／256 出 token | 新卡 · `liquid-ai-pipette` | 写 AA 报告的手机真机测试配置、设备、量化和工具条件，区分手机模型能力评测。 [官方入口](https://artificialanalysis.ai/hardware-inference-stack/mobile-phones) · [补充来源](https://artificialanalysis.ai/articles/mobile-phone-intelligence-inference) |

### H · 补长尾与最后复查

补 ARC Challenge、VIALS-AA 及三个 Cyber Index 名称。Cyber Index 和已有母卡承载评测身份与高层方法，各自的官方入口可查。

| 原编号与名称 | 固定版本或协议 | 处理方式及承载页 ID | 该项验收点与官方来源 |
| --- | --- | --- | --- |
| #24 VIALS-AA | VIALS-AA 对应上游 VIALS 2.0.0，161 题，AA pass³ | 新卡 · `vials-aa` | 记录 VIALS 2.0.0 的视觉解读任务、指标及公开范围，用官方入口指向适宜的案例。 [官方入口](https://artificialanalysis.ai/evaluations/vials-aa) · [补充来源](https://huggingface.co/datasets/handshake-ai-research/VIALS/blob/main/CHANGELOG.md) |
| #88 ARC Challenge（AI2 ARC） | Allen AI 2018 ARC-Challenge/test，1,172 题，固定 210d026 | 新卡 · `arc-challenge` | 公开 ARC-Challenge/test 一题，标题和别名区分 ARC-Easy、ARC-AGI。 [官方入口](https://huggingface.co/datasets/allenai/ai2_arc/viewer/ARC-Challenge) · [补充来源](https://huggingface.co/datasets/allenai/ai2_arc/tree/210d026faf9955653af8916fad021475a3f00453) |
| #42 CWE-Bench-AA | AA Cyber Index v1 的 CWE-Bench-AA，120 项私有留出 | 更新 · `cwe-bench-v1` | 在已有母卡和 Cyber Index 记录防御评测身份、私有范围和高层评分口径。 [官方入口](https://artificialanalysis.ai/evaluations/cwe-bench-aa) |
| #43 DeepsecBench-AA | AA Cyber Index v1.0 的私有评测协议 | 分项 · `aa-cyber-index` | 在现有指数页独立列 DeepsecBench-AA 的名称、所属 v1.0、官方出处和高层评审指标。 [AA 评测页](https://artificialanalysis.ai/evaluations/deepsecbench-aa) · [Cyber Index 方法](https://artificialanalysis.ai/methodology/cyber-index) |
| #44 CyberGym-E2E-AA | AA Cyber Index v1 的 CyberGym-E2E-AA，131／920 子集 | 更新 · `cybergym-e2e` | 母卡和 Cyber Index 补 AA 子集与上游总量的关系及防御评测口径。 [官方入口](https://artificialanalysis.ai/evaluations/cybergym-e2e-aa) |

## 指数依赖

下表是关联页面的更新，单独记录在 53 项验收表和 27 张新卡的估算之外。版本发布时保留旧说明的稳定入口，并在新旧页面标出对应版本。

| 批次 | 依赖项 | 处理与验收 |
| --- | --- | --- |
| B | Intelligence Index v5.0.1 | FrontierCode-AA 2.0 和 CritPt v2 两张卡就绪后，新增当前版本说明，保留现有 v4.3.2。核对 9 项成员与权重。CritPt 明示采用 40 题 Hard，FrontierCode 明示用 2.0。 [AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| B | Coding Agent Index v2.0 | SWE-Atlas-QnA-AA 协议就绪后，新增当前版本说明，保留现有 v1.5。核对等权的 FrontierCode **1.1 Main**、Terminal-Bench 4.0、SWE-Atlas-QnA-AA。 [AA 方法](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) |
| D | Decision Index v2.1 | 复核工作区 v2.0 与官方历史。新增 v2.1 卡作为 6 个现行分项及 WildGuardTest 历史说明的承载入口。分项尚无独立 ID 时，使用现有详情字段写明协议、权重和官方链接。只在成员均有合法 ID 且权重合计 100% 时填写结构化组成。 [AA 方法](https://artificialanalysis.ai/methodology/decision-index/) |
| E | Speech-to-Speech Index v2.0 | 核对 Big Bench Audio、τ-Voice 及 Speech Agent Arena。现行四个等权指标中，Arena 偏好和任务完成率来自同一 Arena。现有 v1.0 保留，Full Duplex 在版本说明可定位。Arena 的两个指标写入同一成员的说明，组成按三条评测合计 100%。 [AA 方法](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) |

## 每批交付与最终验收

- **开工前**。登记来源、版号或固定快照、是否已有同一条目、案例能否展示。外部媒体链接无法稳定访问时，在页面保留准确的状态及备用官方来源。
- **每张卡提交前**。核对新旧版本、来源引用、样例位置和素材，再跑内容校验及 `git diff --check`。只暂存本卡所需文件。卡片通过后写入该行提交号和实际页面路径。
- **每批交付前**。运行 `npm run validate`、`npm test`、`npm run build`。构建包含 TypeScript 检查。使用已运行的预览或静态构建产物检查本批新页和影响到的旧页，覆盖中文与英文搜索、版本链接、案例锚点、来源、桌面及窄屏。图像、音频、视频或外部入口检查可用状态。核对 GitHub Pages 子路径和详情页刷新。
- **全量收尾**。用 53 个正式名称逐条验证“搜索 → 承载页 → 对应版本或分项 → 官方来源”，重跑完整构建，检查 41 个已对应条目的目录身份与受影响链接。汇总新增卡、更新卡、合并承载项、仅能通过官方入口查看的样例，以及逐卡提交和构建证据。合并部署后再按相同清单核对线上。
- **发现缺口时**。在对应行写明待核问题和可替代的官方入口。版本、题集或正式身份仍未证实时，保持为待核项。题集私有但定义、版本、评分和入口有充分证据的，按“官方资料覆盖”验收。

阶段 A 的实作是下一步。本文件记录计划和验收条件。
