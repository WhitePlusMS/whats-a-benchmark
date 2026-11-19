# Artificial Analysis 52 项收录优先级

核对日期为 2026-11-13。范围是[上轮 94 项对照](2026-11-13-aa-94-catalog-crosswalk.md)里 35 个未收录项和 17 个仅有相关条目的项目。按远端 `main` 的 317 条目录为准，提交是 `59b6d4c`。当前工作区另外保留 Decision Index v2.0 的未提交综合卡。DeepsecBench-AA 属于上轮单列的“仅被提及”，沿用此次 52 项的范围。

排序先看两件事：它是否补上了模型发布或当前指数里会遇到的版本，是否有可验证的真实案例，能讲清任务输入、交付和验收。相同题集只改运行协议时，优先补在现有卡片里。题集或任务定义变化明显时，单独建卡。对未公开版本号的项目用首发日期或核验快照。依据见[产品决策简报](2026-11-10-product-decision-brief.md)、[产品设计](../PRODUCT_DESIGN.md)和[评测身份决策](../adr/0001-benchmark-identity.md)。

第一批建议 **5 张新卡、1 次现有卡更新**。如果只先做一张给用户看，选 **MKA 的建筑图纸协调审查**。Google 的示例包含图纸和交付要求，AA 的示例页给了可核对的交付物与评分信息。MKA 的 10 道公开展示题单独标记为公开示例。来源见 [Google 发布说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/)与 [AA 详情](https://artificialanalysis.ai/evaluations/mka/)。

| 优先级 | 数量 | 建议 |
| --- | ---: | --- |
| P0 | 6 | 第一批做 |
| P1 | 10 | 第二批排入 |
| P2 | 15 | 随专题或现有页补齐 |
| P3 | 21 | 保留官方入口或历史备注 |
| **合计** | **52** | 每项在下表出现一次 |

## P0 · 第一批

先补当前指数缺口和有公开案例支撑的新卡。MKA 先完成一个可看的建筑图纸案例，FrontierCode 与 CritPt 先完成版本说明，FRAMES 可复用现有案例阅读结构。

| 顺序 | 项目（原对照编号） | 要补的版本或协议 | 收录方式 | 排序依据与官方来源 |
| ---: | --- | --- | --- | --- |
| 1 | Multimodal Knowledge Agent（MKA）（#25） | 2026-11-10 首发；公开示例固定 46bce7a | 新建 MKA 卡，先做建筑图纸协调审查 | Google 有独立的 10 个公开示例。首个案例用图纸输入、交付 PPT 和评分细则说明评测；AA 榜单对应另外 200 道私有题。 [官方入口](https://artificialanalysis.ai/evaluations/mka/) · [来源 2](https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/) · [来源 3](https://huggingface.co/datasets/google/multimodal-knowledge-agent/tree/46bce7ab8768f661750bd1016ec8cbdc517740b5) |
| 2 | FrontierCode-AA 2.0（#11） | FrontierCode-AA 2.0，132 道私有任务、每题 3 次 | 新建 2.0 版本卡，互链现有 1.1 Main 和 Extended | 补当前 Intelligence Index v5.0.1 的编码项。以 Cognition 公开的普通代码维护案例解释阻断条件与分项评分。 [官方入口](https://artificialanalysis.ai/evaluations/frontiercode-2-0) · [来源 2](https://cognition.com/blog/frontier-code-2.0) · [来源 3](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 3 | CritPt v2（#23） | CritPt v2 完整 70 题，标注 AA 40 题 Hard Subset 和 v5.0.1 重判 | 新建一张 v2 卡，保留原版，卡内区分 Full Set 与 Hard | 当前指数用 40 题且选题名单私有。用作者指定示例和官方数据快照说明任务及判分。官方题集用途限制见数据卡。 [官方入口](https://artificialanalysis.ai/evaluations/critpt-v2) · [来源 2](https://artificialanalysis.ai/methodology/intelligence-benchmarking) · [来源 3](https://huggingface.co/datasets/CritPt-Benchmark/CritPt/tree/37ecba7e9d00eda858d7be1adba19a38ba50e7a6) |
| 4 | SWE-Atlas-QnA-AA（#41） | SWE-Atlas-QnA-AA 124 题公开评分版，固定 1f28d51 | 更新 SWE-Atlas-QnA 现有卡 | 同 124 题，AA 改写 127 条评分细则并采用不同评委。选一题对照同一仓库问题如何按两套细则判分。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/SWE-Atlas-QnA-AA) · [来源 2](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/SWE-Atlas-QnA-AA/tree/1f28d51b6e191e9f2bfdc22b09d92eecdab6654e) |
| 5 | FRAMES（#93） | Google FRAMES 原版 test，824 题，固定 58d9fb6 | 新建 FRAMES 卡 | 官方数据卡标 Apache-2.0，题目、参考网页和答案可组成完整的检索案例。AA 在 MicroEvals 引用样题。 [官方入口](https://huggingface.co/datasets/google/frames-benchmark) · [来源 2](https://huggingface.co/datasets/google/frames-benchmark/tree/58d9fb6330f3ab1316d1eca12e5e8ef23dcc22ef) · [来源 3](https://artificialanalysis.ai/microevals) |
| 6 | AA-3D（#2） | AA-3D v1.0，55 个交互式场景任务 | 新建 AA-3D 卡，首版连官方 Explorer | 同一 brief 有多个模型的作品可对照，盲选 Elo 也与现有确定性验收形成区别。场景文件复用权限未确认。 [官方入口](https://artificialanalysis.ai/evaluations/aa-3d) · [来源 2](https://artificialanalysis.ai/methodology/aa-3d) · [来源 3](https://artificialanalysis.ai/3d/explorer) |

## P1 · 第二批

优先选能展示独立任务形态或已有目录读者能直接理解的协议。AA-Image-Editing 适合作为图像生成类的单项试点。

| 顺序 | 项目（原对照编号） | 要补的版本或协议 | 收录方式 | 排序依据与官方来源 |
| ---: | --- | --- | --- | --- |
| 7 | EnterpriseOps-Gym-AA（#8） | 2026-07-08 AA 首发 oracle tool 模式，1,117 题、每题 3 次 | 新建 EnterpriseOps-Gym-AA 卡 | 日历等公开业务场景能解释“动作完成后验数据库最终状态”。AA 计分范围与 ServiceNow 公共 oracle 快照分开记录。 [官方入口](https://artificialanalysis.ai/evaluations/enterprise-ops-gym-aa) · [来源 2](https://artificialanalysis.ai/articles/announcing-enterpriseops-gym-aa) · [来源 3](https://huggingface.co/datasets/ServiceNow-AI/EnterpriseOps-Gym/tree/c8e538eae8a6205294f0a86675fefdc1fac408f6) |
| 8 | Code2Video-AA（#20） | Code2Video-AA dataset 0.3.0，114 项含 39 项公开 brief | 新建 Code2Video-AA 卡 | 用同一设计需求对比渲染成品。公开 brief 的授权和模型成品视频的复用范围分别核对，成品先链接官方。 [官方入口](https://artificialanalysis.ai/evaluations/code2video-aa) · [来源 2](https://artificialanalysis.ai/articles/code2video-aa) · [来源 3](https://www.heygen.com/research/introducing-code2video-benchmark) |
| 9 | BFCL（AA 手机和端点协议）（#53） | 端点 BFCL v4-500，基于 2026-03-23 上游版本；手机 BFCL v4 non-live 640 | 更新 BFCL 卡，列两条 AA 协议 | 两种部署场景抽题不同。端点版先写，手机版同卡补充。 [官方入口](https://artificialanalysis.ai/methodology/mobile-device-benchmark-set) · [补充来源](https://artificialanalysis.ai/methodology/endpoint-accuracy-index) |
| 10 | BrowseComp（AA 搜索子集）（#52） | AA Search Index 的 BrowseComp 困难 200 题子集 | 更新 BrowseComp 卡 | 解释固定答题模型、替换搜索供应商的设计，保留原版 1,266 题的区分。本站原版例题沿用原版标签。 [官方入口](https://artificialanalysis.ai/methodology/search-api#browsecomp) · [补充来源](https://artificialanalysis.ai/agents/search-api) |
| 11 | Global-MMLU-Lite（#40） | Cohere Labs Global-MMLU-Lite v3.0，23 语言，每语言 400 道测试题，固定 36c2fd7 | 新建 Lite 子集卡，互链完整版与多语言指数 | 中文读者可直接看同一题跨语言的版本关系。AA 实际覆盖语言另外记录。 [官方入口](https://artificialanalysis.ai/evaluations/global-mmlu-lite) · [补充来源](https://huggingface.co/datasets/CohereLabs/Global-MMLU-Lite/tree/36c2fd756f19ccf13a9a96c8e53ccecc02192b8b) |
| 12 | TruthfulQA（#92） | TruthfulQA 作者 2025-01 双选修订，固定 CSV d71c110 | 新建一张 TruthfulQA 卡 | 同卡交代原生成版、旧 MC1/MC2 和当前双选。可用常识误区的公开例题与 SimpleQA 对照。 [官方入口](https://github.com/sylinrl/TruthfulQA) · [来源 2](https://github.com/sylinrl/TruthfulQA#update-to-multiple-choice-setting-jan-2025) · [来源 3](https://github.com/sylinrl/TruthfulQA/blob/d71c110897f5d31c5d7f309e7bc316c152f6f031/TruthfulQA.csv) |
| 13 | APEX-Agents-AA（#3） | APEX-Agents-AA 452 题 Stirrup 实施，按 AA 方法 2026-11-13 快照 | 更新 APEX-Agents 原版卡，链接本站 1.1 | 解释 AA 从公开任务集排除两个依赖外部 API 的场景，以及严格 pass@1。正式独立卡可等有单独引用需求。 [官方入口](https://artificialanalysis.ai/evaluations/apex-agents-aa) |
| 14 | ITBench-AA（#16） | ITBench-AA 2026-05-27 首发 SRE 版，59 题，40 公开加 19 私有 | 新建 ITBench-AA SRE 卡 | 通过故障告警、服务关系图、根因诊断及评分解释运维场景。FinOps 和 CISO 另外核对。 [官方入口](https://artificialanalysis.ai/evaluations/itbench-aa) · [来源 2](https://artificialanalysis.ai/articles/itbench-aa-launch) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/ITBench-AA/tree/76df38a82288f75ba9e41dc8c515033332497473) |
| 15 | AA-PersonalityBench（#13） | AA-PersonalityBench 2026-11-13 方法快照，30 特质、8 指数 | 新建一张沟通风格卡 | 官方展示五个公开问题和配对判定，适合解释“模型怎么表达”。8 个指数留在同一页。 [官方入口](https://artificialanalysis.ai/evaluations/aa-personalitybench) · [补充来源](https://artificialanalysis.ai/methodology/aa-personalitybench) |
| 16 | AA-Image-Editing v2.1（#56） | AA-Image-Editing v2.1，参考图加编辑指令 | 媒体专题先做这一项 | 原图、编辑要求和结果有直接对照，适合少量公开案例。先用官方入口，素材复用逐项核对。 [官方入口](https://artificialanalysis.ai/image/leaderboard/editing) · [补充来源](https://artificialanalysis.ai/methodology/image) |

## P2 · 随专题或现有页补齐

AA Decision Index 的工作区条目目前写 v2.0，补这组分项时先复核并记录官方 v2.1 版本关系。推理、语音及科学视觉按专题维护。

| 顺序 | 项目（原对照编号） | 要补的版本或协议 | 收录方式 | 排序依据与官方来源 |
| ---: | --- | --- | --- | --- |
| 17 | When2Call（AA 决策协议）（#47） | When2Call AA 决策 v2.1，3,423 道多选题与 Decision Score | 更新 When2Call 卡 | 把原始工具选择任务与 AA 的概率计分说明放在同页，区分历史 v1 准确率。 [官方入口](https://artificialanalysis.ai/evaluations/when2call) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| 18 | AA-Paperclip（#45） | AA-Paperclip 在 Decision Index v2.1 的协议，1,500 份私有文档、两类请求 | 补 Decision Index 组成说明 | 公开例题足以解释决策与事实提取。先使用官方示例入口，简历类原始文档按来源范围处理。 [官方入口](https://artificialanalysis.ai/evaluations/aa-paperclip) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| 19 | EvalSafe-O*NET-AA（#46） | EvalSafe-O*NET-AA 在 Decision Index v2.1 的 6,582 题口径 | 补 Decision Index 组成说明 | 说明 7,500 道上游题到 6,582 道 AA 计分题的筛选，以及模型共识的评分性质。 [官方入口](https://artificialanalysis.ai/evaluations/evalsafe-onet-aa) · [补充来源](https://artificialanalysis.ai/methodology/decision-index/) |
| 20 | AA-Symmetry v1.1（#50） | AA-Symmetry v1.1，120 个基础问题、460 个表述 | 补 Decision Index 组成说明 | 用题意不变时决策是否一致来解释指标。同一处记 v1.0 的 440 个表述。 [官方入口](https://artificialanalysis.ai/evaluations/aa-symmetry) |
| 21 | AA-Omniscience-Decision v1.1（#48） | AA-Omniscience-Decision v1.1，500 道私有多选题 | 补 Decision Index 并从 AA-Omniscience 卡关联 | 适合解释拒答与概率计分，和原问答题集分开标。 [官方入口](https://artificialanalysis.ai/evaluations/aa-omniscience-decision) |
| 22 | HLE-MultiChoice v1.1（#49） | HLE-MultiChoice v1.1，509 道纯文本多选题和拒答选项 | 更新 HLE 现有卡并链接指数 | 保留 v1.0 513 题的区别。HLE-Diamond 和端点 HLE-250 各自标注。 [官方入口](https://artificialanalysis.ai/evaluations/hle-multichoice) |
| 23 | τ²-Bench Telecom（#35） | AA 历史 τ²-Bench Telecom，114 题、每题 3 次 | 更新 τ²-bench 母卡的 Telecom 域说明 | 适合展示双边共享状态及验收。AA 后来用 τ³-Banking 接替其指数位置，先维护同页历史协议。 [官方入口](https://artificialanalysis.ai/evaluations/tau2-bench) · [补充来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 24 | Terminal-Bench Hard（#34） | AA Terminal-Bench Hard，2025-08-14 terminal-bench-core 74221fb，44 题 | 更新现有 Terminal-Bench 家族版本说明 | 标出与 2.0、2.1、4.0 的关系及 AA 用 2.1 替换的历史，当前无需独立试点。 [官方入口](https://artificialanalysis.ai/evaluations/terminalbench-hard) · [补充来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 25 | τ-Voice（AA 实施）（#67） | τ-Voice 的 AA Speech-to-Speech Index v2.0 实施，三领域、每题 3 次 | 更新 τ-Voice 原版卡 | 把 AA 的模拟用户和任务成功口径补进现有页。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#agentic-performance) |
| 26 | VIALS-AA（#24） | VIALS-AA 对应上游 VIALS 2.0.0，161 题，AA pass³ | 科学视觉专题候选 | 记录专业图像理解范围和三次全对的指标。公开样例以官方入口为主。 [官方入口](https://artificialanalysis.ai/evaluations/vials-aa) · [补充来源](https://huggingface.co/datasets/handshake-ai-research/VIALS/blob/main/CHANGELOG.md) |
| 27 | ARC Challenge（AI2 ARC）（#88） | Allen AI 2018 ARC-Challenge/test，1,172 题，固定 210d026 | 基础评测补缺，单独建 ARC Challenge 卡 | 原题可看且容易解释，与 ARC-AGI 及 ARC-Easy 区分。优先级低于当前指数版本和新任务形态。 [官方入口](https://huggingface.co/datasets/allenai/ai2_arc/viewer/ARC-Challenge) · [补充来源](https://huggingface.co/datasets/allenai/ai2_arc/tree/210d026faf9955653af8916fad021475a3f00453) |
| 28 | VoxPopuli-Cleaned-AA v1.0（#73） | VoxPopuli-Cleaned-AA v1.0，固定 07adf4a，标 AA-WER v2.2 | 语音专题可与 Earnings22 共用 AA-WER 方法入口 | 有公开清洗前后参考转录，能说明参考答案变化怎样影响 WER。片段按上游条款核查。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/VoxPopuli-Cleaned-AA) · [来源 2](https://artificialanalysis.ai/methodology/speech-to-text) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/VoxPopuli-Cleaned-AA/tree/07adf4a242e2e5dd955a230909c177573c978ee3) |
| 29 | Earnings22-Cleaned-AA v1.0（#74） | Earnings22-Cleaned-AA v1.0，固定 5999936，标 AA-WER v2.2 | 语音专题与 VoxPopuli 联动 | 财报电话会音频适合解释长音频切段和转录错误，素材按上游条款核查。 [官方入口](https://huggingface.co/datasets/ArtificialAnalysis/Earnings22-Cleaned-AA) · [来源 2](https://artificialanalysis.ai/methodology/speech-to-text) · [来源 3](https://huggingface.co/datasets/ArtificialAnalysis/Earnings22-Cleaned-AA/tree/5999936ee3d8d3cde160e3c65a8cc6ff5b7c5276) |
| 30 | AA-AgentPerf-Local（#78） | AA-AgentPerf-Local 首发负载 8 任务、168 轮；可读工具快照 0.3.4／1fe8056 | 若做推理专题，优先选作首卡 | 真实 Agent 轨迹可解释本地推理表现。工具版本和已公布设备成绩各自标注。 [官方入口](https://artificialanalysis.ai/hardware-inference-stack/laptops-workstations) · [来源 2](https://artificialanalysis.ai/articles/aa-agentperf-local) · [来源 3](https://github.com/ArtificialAnalysis/aa-agentperf-local/blob/1fe80568c1e4b81b338ef276ccc6874a36d3704d/pyproject.toml) |
| 31 | LLM API Performance v3.0.0（#75） | LLM API Performance v3.0.0，2026-11-03 方法 | 推理专题补方法卡 | 解释首字延迟、输出速度和 Agent 负载。v2.2.0 留在版本历史，榜单走官方入口。 [官方入口](https://artificialanalysis.ai/methodology/performance-benchmarking) |

## P3 · 保留官方入口或历史备注

这些项目目前适合留在现有条目的版本说明或专题索引。若出现新的模型报告引用或可核验案例，可以重新排序。

| 顺序 | 项目（原对照编号） | 要补的版本或协议 | 收录方式 | 排序依据与官方来源 |
| ---: | --- | --- | --- | --- |
| 32 | CWE-Bench-AA（#42） | AA Cyber Index v1 的 CWE-Bench-AA，120 项私有留出 | 现有 CWE-bench v1 和 Cyber Index 只补协议说明 | 已有母集与指数。更新测试范围和评分来源即可。 [官方入口](https://artificialanalysis.ai/evaluations/cwe-bench-aa) |
| 33 | CyberGym-E2E-AA（#44） | AA Cyber Index v1 的 CyberGym-E2E-AA，131／920 子集 | 现有 CyberGym-E2E 和 Cyber Index 只补协议说明 | 现有资料能支撑名词解释，额外建卡收益有限。 [官方入口](https://artificialanalysis.ai/evaluations/cybergym-e2e-aa) |
| 34 | Full Duplex Bench（AA 对话动态子集）（#66） | Full Duplex Bench 上游 v1 和 v1.5 的 AA 混合子集 | Full-Duplex-Bench 卡补历史说明 | AA 语音指数 v2.0 已替换此组件。与上游 v2、v3 分开记录。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking#conversational-dynamics) |
| 35 | SWE-Bench-Pro-Hard-AA（#82） | SWE-Bench-Pro-Hard-AA 2026-05 编程榜旧版，150 题 | SWE-bench Pro 家族补历史说明 | 避免和 Scale v2 HARD-51 的 51 题混用。适合旧报告查阅。 [官方入口](https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index) · [补充来源](https://www.linkedin.com/posts/artificial-analysis_announcing-the-artificial-analysis-coding-activity-7459631455477051395-gJsd) |
| 36 | WildGuardTest（#83） | AA Decision Index v1 的 WildGuardTest 835／1,725 题过滤版 | Decision Index 历史项 | v2 已移出，当前先保留旧成绩的出处。 [官方入口](https://artificialanalysis.ai/evaluations/wildguardtest) |
| 37 | AMI SDM（#84） | AA-WER v1.0 的 AMI SDM 单远场麦克风语料 | AA-WER 历史项 | v2.0 已移出，适合解释新旧榜差异。 [官方入口](https://artificialanalysis.ai/methodology/speech-to-text#version-history) |
| 38 | AA-AgentTalk（#72） | AA-WER v2.2 里的 AA-AgentTalk 私有留出集 | AA-WER 当前方法的组成说明 | 从 v2.0 引入，完整题集私有，跟随组合指标介绍。 [官方入口](https://artificialanalysis.ai/articles/aa-wer-v2) · [补充来源](https://artificialanalysis.ai/methodology/speech-to-text) |
| 39 | AA-Image-T2I v2.1（#55） | AA-Image-T2I v2.1 | 图像编辑试点后再考虑 | 现阶段官方榜单入口已能满足查阅，专门建卡需要独立案例价值。 [官方入口](https://artificialanalysis.ai/image/leaderboard/text-to-image) |
| 40 | AA-Video-Editing v1.1（#61） | AA-Video-Editing v1.1，有声 | 视频专题候选 | 视频编辑比普通生成更容易解释输入片段与约束，可先看图像编辑试点结果。 [官方入口](https://artificialanalysis.ai/video/leaderboard/video-editing) |
| 41 | AA-Video-Editing-Silent v1.1（#62） | AA-Video-Editing-Silent v1.1，无声 | 随有声编辑版一起记录 | 两套有各自的源片段，适合在同页比较。 [官方入口](https://artificialanalysis.ai/video/leaderboard/video-editing) |
| 42 | AA-Video-I2V v2.1（#59） | AA-Video-I2V v2.1，有声 | 视频专题候选 | 保留起始参考图与同步声音的任务条件，官方榜单可直接查阅。 [官方入口](https://artificialanalysis.ai/video/leaderboard/image-to-video) |
| 43 | AA-Video-I2V-Silent v2.1（#60） | AA-Video-I2V-Silent v2.1，无声 | 随图生视频有声版一起记录 | 上游独立题集和榜单，本站可以同页分栏。 [官方入口](https://artificialanalysis.ai/video/leaderboard/image-to-video) |
| 44 | AA-Video-T2V v2.1（#57） | AA-Video-T2V v2.1，有声 | 视频专题候选 | 文生视频有声榜，沿用本组 v2.0 题集。 [官方入口](https://artificialanalysis.ai/video/leaderboard/text-to-video) |
| 45 | AA-Video-T2V-Silent v2.1（#58） | AA-Video-T2V-Silent v2.1，无声 | 随文生视频有声版一起记录 | 无声榜有独立题集，先链接官方切换。 [官方入口](https://artificialanalysis.ai/video/leaderboard/text-to-video) |
| 46 | Controlled Voice Arena（#70） | Controlled Voice Arena，2026-11-13 AA 方法快照 | 语音专题候选 | 统一参考音色便于解释公平对照，单项未见版本号。 [官方入口](https://artificialanalysis.ai/text-to-speech/leaderboard/controlled-voice) · [补充来源](https://artificialanalysis.ai/methodology/text-to-speech) |
| 47 | Provider Voice Arena（#69） | Provider Voice Arena，2026-11-13 AA 方法快照 | 与 Controlled Voice 同页介绍 | 用官方供应商音色，任务条件与统一参考音色不同，单项未见版本号。 [官方入口](https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice) · [补充来源](https://artificialanalysis.ai/methodology/text-to-speech) |
| 48 | AA-Music-Vocal v1.1（#64） | AA-Music-Vocal v1.1 | 有音乐专题再排 | 人声音乐用独立榜单，当前靠后。 [官方入口](https://artificialanalysis.ai/music/leaderboard/vocals) |
| 49 | AA-Music-Instrumental v1.1（#63） | AA-Music-Instrumental v1.1 | 与人声榜同专题记录 | 纯音乐用独立榜单，当前靠后。 [官方入口](https://artificialanalysis.ai/music/leaderboard/instrumental) |
| 50 | AA-SLT（System Load Test）（#76） | AA-SLT 方法快照，1,000 入／1,000 出 token 的负载 | 推理专题的方法参考 | 主要服务并发负载比较，候选卡排在真实 Agent 工作负载之后。 [官方入口](https://artificialanalysis.ai/methodology/system-load-test) |
| 51 | AA-AgentPerf（#77） | AA-AgentPerf 数据中心协议，2026-06-12 首发 | 推理专题的方法参考 | 面向数据中心硬件，完整轨迹私有，先用 AA 公开方法及结果链接。 [官方入口](https://artificialanalysis.ai/methodology/agentperf) · [补充来源](https://artificialanalysis.ai/articles/aa-agentperf) |
| 52 | 手机真机推理（Liquid AI Pipette）（#79） | AA 手机 Pipette 的 E2E 实测，1,024 入／256 出 token | 推理专题的方法参考 | 设备、运行时和量化是比较条件。结果来自 Liquid AI 实测，AA 核查方法。 [官方入口](https://artificialanalysis.ai/hardware-inference-stack/mobile-phones) · [补充来源](https://artificialanalysis.ai/articles/mobile-phone-intelligence-inference) |

排序是基于目录定位和目前能核对的官方材料做的编辑判断。现有资料尚无本站访问数据或用户访谈来验证这些优先级。公开案例的站内展示范围按各发布方许可和案例来源核对，保留可直达的官方入口。
