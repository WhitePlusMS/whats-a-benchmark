# Benchmark 需求与竞争：阶段性证据矩阵

调查时间：2026-11-09。配套来源及限制见[持续调查台账](2026-11-09-embodied-demand-ledger.md)和[首轮需求报告](2026-11-09-benchmark-user-needs.md)。本文为中间分析，**调研仍在进行，线索不是访谈人数、市场规模或付费意愿**。

事实性补充：[幻觉率、同题与联网条件](2026-11-10-factuality-hallucination-abstention.md)对照本地 SimpleQA 系列、AA 指标、真实提问和已有成绩站；未运行模型或验证读者需求。

工具调用补充：[BFCL 与 τ² 的任务和计分](2026-11-10-tool-calling-workflow-and-scoring.md)对照本站样例、AA 电信榜、官方多领域口径、已纠正的复现报告及现有研究；未运行评测或验证本站需求。

表格工作流补充：[真实问题、分数与评分实现](2026-11-10-spreadsheet-workflow-metrics-demand.md)对照本站 SpreadsheetBench 2、论文、固定版本代码、开发者反馈及现有成绩站；未运行评测或验证本站需求。

医疗评测补充：[回答分数与电子病历工作流](2026-11-09-medical-benchmark-workflow-overlap.md)对照本站三项条目、AA 同项榜、复现问题、第三方审计与现有专业指南；未运行评测或验证读者需求。

具身规则审计补充：[Embodied Playground 总榜与失败审计](2026-11-09-embodied-task-protocol-crosswalk.md)区分套件等权、直接合并和特定模型失败尝试，并记录已有中文解读；未独立复测，也未验证本站用户需求。

商业选型竞品补充：[truelabel 与 RoboticsCenter](2026-11-09-robot-benchmark-selection-reward-evidence.md)已提供本站同项的机器人数据和 benchmark 成对比较；其中一页明确没有运行样本解析。公开页面不证明付费成交或所有比较经验证。

LIBERO 复现及同题替代补充：[复现提问、相机干预和结果页](2026-11-09-smolvla-libero-checkpoint-compatibility.md)记录两个不同项目的分差问题、现有统计工具及公开中文实验页；未推断分差原因或复跑。

实机复现补充：[EBiM 提交环境反馈](2026-11-09-embodied-source-coverage.md)记录依赖缺失及队伍回复；[TOTO 视觉预训练与测试位置](2026-11-09-robot-benchmark-selection-reward-evidence.md)区分预训练数据来源、测试位置和已有中文目录。均未独立运行。

实验操作补充：[EmbodiedLab 的 T0/T2](2026-11-09-release-score-same-model-competitors.md)区分同任务技能复用、过程分和成绩；[MuJoCo 工作流反馈](2026-11-09-embodied-task-protocol-crosswalk.md)记录工具作者及回复者的具体问题，不等同本站用户或已付款客户。

跨环境证据补充：[RLE-Bench 与 Kinex 任务及状态](2026-11-09-embodied-source-coverage.md)对照站内评测、原任务榜、逐任务资料和固定版本判定代码，记录文档与索引状态不一致；未运行评测。

真机榜单补充：[Table30 V2 任务分母与跨来源成绩](2026-11-09-robot-leaderboard-aggregator-crosswalk.md)复算 LoopWAM 四组成功率并区分综合分，记录 DM0.5 相关发布数据的身份未确认及初版数据转换问题；未重跑。

具身榜单需求补充：[RoboQuest 逐次数据与读者提问](2026-11-09-embodied-source-coverage.md)核算站内单次记录所属模型的任务分母，记录官网六模型与已读取 CSV 五模型的快照差异；未找到第六模型逐次数据，未自行评测。

仿真演示及成绩归属补充：[ManiSkill 轨迹、复现与同项页面](2026-11-09-embodied-source-coverage.md)记录用户重放问题、官方转换约束，并对照外部页面与论文中的行为克隆/PPO 表注差异；未运行或调查读者。

路线忠实度补充：[R2R、R2R-CE、R4R 与官方版本](2026-11-09-humanoid-navigation-crosswalk.md)区分参考路线、单次运行、到达与路径匹配，并记录现有中文综述及榜单；未运行评测或逐项复核外部成绩。

仿真重建补充：[RobotArena∞ 原版、360 与 LADDER](2026-11-09-embodied-source-coverage.md)区分仿真示范、评分方法、任务分母及现有解读；360 网页标注论文与代码待发布，未运行复现。

双臂成绩补充：[RoboEval 抬锅演示、Rho 模型成绩与挑战赛评分](2026-11-09-robot-safety-success-crosswalk.md)区分训练示范、仿真成功率及综合分，记录许可范围疑问；未运行或验证任务变体一致。

具身成绩口径补充：[LIBERO-MAX 官方、论文与第三方适配](2026-11-09-robot-evaluation-uncertainty.md)区分完整配对、80 个论文案例、64 个第三方案例和两种成功定义；均未独立运行，已有来源也提供分析与运行工具。

世界模型与物理保真补充：[GAUGE、GaugeBench 和接口提问](2026-11-09-world-model-robot-evaluation.md)区分实测参考、仿真/视频评测、机器人描述与具体传感接口；未运行或验证用户需求。

同名与开放状态补充：[REAL-Bench 来源对照](2026-11-09-long-horizon-benchmark-crosswalk.md)区分机器人与网页项目、场景包与完整复现资源，并指出第三方条目无成绩不等于作者未报告；未执行测试。

AA 本地推理补充：[AgentPerf-Local 与选型工具](2026-11-09-artificial-analysis-product-comparison.md)记录 AA 重放测速、硬件榜及已有 API 选型项目；[本地开发者工作流](2026-11-09-practitioner-evidence-and-validation.md)区分速度、任务成绩与作者猜测，未运行工具。

发布成绩与输入条件：[Qwen-RobotNav R2R-CE 对照](2026-11-09-humanoid-navigation-crosswalk.md)对照报告单目/全景、README 摘要及 SimpleNav 已有整理；[阅读卡 B4](2026-11-09-reader-study-cards.md)未做读者实验。

同源冲突补充：[DexArena 官网与论文](2026-11-09-embodied-source-coverage.md)的 π0.5 完整任务结果及策略描述不一致，论文部分成绩尚待确认；[阅读卡 B3](2026-11-09-reader-study-cards.md)供后续读者测试，未推断最终成绩。

检查点和动作语义补充：[机器人部署数据证据](2026-11-09-robotics-deployment-data-evidence.md)对照 π0.5 固定配置、跨机器人用户问题、RoboTwin 样例与现有数据工具；未运行模型或验证兼容性。

视频判分补充：[机器人失败检测与标签来源](2026-11-09-robot-video-judge-failure-evidence.md)对照本站真机/仿真条目、模型判分基准、构造负例与微软既有工具；未运行模型或验证目标用户需求。

具身运行与选型补充：[VLA 评测运行工具对照](2026-11-09-vla-evaluation-runtime-and-competitors.md)记录不同框架的总分与逐回合一致率、速度的计时及硬件边界，以及已有平台对照和兼容矩阵；未复测。

GPQA 来源补充：[GLM-5.2 与独立成绩](2026-11-09-glm52-gpqa-independent-comparison.md)核查厂商、Vals 与第三方转录，并确认已有站解释同一对数字；未统一协议或独立复测。

仓库车队补充：[多机器人调度与路径规划](2026-11-09-warehouse-fleet-mapf-evidence.md)对照本站单机导航、已有竞赛与仿真、Open-RMF 问题报告；未验证现场运行或本站用户需求。

仿真与真机补充：[ToyBlocks 与 PhAIL 竞赛](2026-11-09-toyblocks-phail-sim-real-evidence.md)记录同一系统不同任务分母、已有工具以及竞赛分项和计时规则；未独立运行或验证产品需求。

精密装配补充：[定位、插入与现场条件](2026-11-09-industrial-assembly-perception-precision.md)对照站内插销任务、相关评测及两条公开求助；未做现场诊断或验证本站需求。

触觉数据补充：[带宽、压缩和仿真—真机](2026-11-09-robot-tactile-bandwidth-and-sim-real.md)补充机器人手走线的社区提问、两个易混淆的触觉 benchmark 及 OpenViTac 数据状态；未实测或采访用户。

机器人视觉问答补充：[数据、成绩与执行边界](2026-11-09-robot-vqa-dataset-score-boundaries.md)核查外部评测、同项目成绩差异及 ROS 作者关于离线评价和实机试验的提问；原因和产品需求均未独立验证。

中文具身复现补充：[π0.5 官方与第三方报告](2026-11-09-chinese-robot-reproduction-demand.md)逐项核对四套件、记录真实提问和现有中文资料；未重跑或访谈。

具身聚合补充：[同一 RoboDojo 模型跨站对照](2026-11-09-robot-leaderboard-aggregator-crosswalk.md)核查已有多榜与模型比较、真机/仿真、分数/成功率及贡献者归属；未实测机器人。

精密装配补充：[REBOOT 恢复示范与实验次数](2026-11-09-reboot-assembly-recovery-evidence.md)对照本站实物操作任务、作者视频和数据卡，区分人遥操作和模型自主恢复；未运行评测。

具身安全补充：[任务成功与安全对照](2026-11-09-robot-safety-success-crosswalk.md)记录同源仿真榜、不同安全分母、小规模真机试验及工业改造提问；未自行测评。

中文语音补充：[方言、多说话人与口径](2026-11-09-chinese-speech-dialect-overlap.md)对照已有方言榜、中文评测工具、本站欧洲语种重叠语音和同模型复现记录；未自行测评。

中文开发者补充：[前后端模型选型](2026-11-09-chinese-coding-model-selection-demand.md)记录公开提问、本站编码评测和已有中文分项榜、跨榜方案；未验证产品效果。

家庭任务竞争补充：[ALFRED 案例与派生评测](2026-11-09-alfred-navigation-case-competition.md)对照本站专家轨迹、现有模型案例站、环境修订和资料获取问题。

具身跨榜比较补充：[多维评测与证据状态](2026-11-09-vla-multiaxis-competitor-evidence.md)记录公开的读者问题、两个现有跨评测项目，以及一项论文与仓库快照的状态差异；未复测。

部署兼容补充：[SmolVLA 与 LIBERO 检查点](2026-11-09-smolvla-libero-checkpoint-compatibility.md)核对固定模型配置和开发者问题，关联本站训练示范，并记录现有模型卡与诊断工具。

厨房任务成绩补充：[OpenDrawer 同系统跨来源](2026-11-09-robocasa-open-drawer-score-provenance.md)记录作者本地、官方复评、本站单次轨迹和训练复现讨论；原因未全部查明，未自行测评。

人形与双臂补充：[BiGym 同任务逐会话对照](2026-11-09-bigym-version-session-crosswalk.md)复算官方固定结果并对照本地样例、官网既有功能和原版复现讨论；未运行策略或测试用户。

吸盘与料箱抓取补充：[候选 AP、实机成功和清箱](2026-11-09-suction-bin-picking-metric-crosswalk.md)对照同一基线的不同试验、用户自有数据问题和已有工具；未运行机器人或验证读者需求。

同题具身竞争补充：[AA-Robotics 分项与转载对照](2026-11-09-aa-robotics-same-task-crosswalk.md)记录本站任务和样例与 AA 的直接重叠、部分分口径及 Priors 同源转载；未进行用户测试。

样例与轨迹补充：[SWE-bench 同题对照](2026-11-09-swe-verified-task-trajectory-crosswalk.md)核查本站两道题的第三方轨迹、提交状态、作者自报结果及一处单点摘要不一致；未运行评分。

GPQA 补充：[同一模型与跨来源问题](2026-11-09-gpqa-qwen-local-comparison.md)增加第三方对 AA 多推理档位的转录和用户对跨站分差的提问；AA 对应动态值未直接读到。

数据选择补充：[LIBERO 转换集与验证问题](2026-11-09-libero-dataset-choice-and-validation.md)记录两份固定版本的格式差异、真实问题及现有检查工具；未跑训练或诊断。

选型与复现补充：[机器人评测手册与奖励模型案例](2026-11-09-robot-benchmark-selection-reward-evidence.md)补查现有选型指南，以及 TOTO 等轨迹在奖励模型中的不同用途和已得到答复的复现问题。

具身部署补充：[EmbodiedX 与推理延迟](2026-11-09-embodiedx-inference-latency-demand.md)将已有条目与真实开发讨论、速度与任务效果的不同实验、现成推理指南对照；没有测量设备或采访用户。

发布成绩补充：[同一 DeepSeek 发布表与竞品](2026-11-09-release-score-same-model-competitors.md)显示中文站与另一成绩站均已实际收录同一来源；同时对照本站索引、分数修订以及仿真具身论文，明确方法和来源边界。

新的直接竞争：[LLM Benchmark Costco](2026-11-09-benchmark-costco-competition.md)也做双语评测介绍及构建/评测流程；本站 AutomationBench 单个任务展示原始断言可作为待测阅读场景，但尚无用户对照。

后续补充：[企业与法律 RAG 调研](2026-11-09-rag-enterprise-legal-demand.md)对照本站 LegalBench、FinanceBenchmark 与相近名称评测，核查实际题目分类及开发者的选评测、裁判疑问；没有开展读者实验。

文档解析补充：[OCR 与文档专项](2026-11-09-ocr-document-user-demand.md)对照本地 OmniDocBench、LegalBench、复杂表格反馈及现有分项榜；合同解析榜公开运行样本并不等于完整保留测试集。

视频理解补充：[视频理解专项](2026-11-09-video-understanding-protocols.md)比较本地 Video-MME、v2 与 LVBench，并记录固定模型的帧数实验、实际复现问答和已有成绩站；相关实验未由本站复测。

具身运行补充：[连续作业与恢复](2026-11-09-robot-continuity-and-recovery.md)对照本地 EBiM、LIBERO 与真实叠衣、工厂包装、自动评测及现有中文指南；区分评估工位连续运行、训练恢复数据、成功率分母与真实生产吞吐，未实施读者验证。

复现与来源补充：[LIBERO-Plus 指令和复现](2026-11-09-libero-plus-prompt-and-reproduction.md)核对本站单次样例、公开成绩分歧、固定版本源码、未合并提议及已有中文/运行指南；不将复现报告当成已确认的官方榜单错误。

具身跨评测竞争补充：[RoboDojo 与 XPolicyLab](2026-11-09-robodojo-xpolicylab-competition.md)对照本站样例、官方中文策略适配与榜单，以及第三方复现中未运行任务按零计入的边界；没有运行或开展用户测试。

具身竞争补充：[中文具身集逐项对照](2026-11-09-jushenji-robotics-catalog-crosswalk.md)和具身开发者社区成绩表，展示现有中文目录、协议和来源；单个榜的示意值不得当实测。

## 先区分项目现状和用户原设想

当前本地项目是评测资料库：以 benchmark 为入口解释任务、数据、来源和样例，项目文档写明不运行测试、不维护统一模型成绩库；是否线上已同步需另核。用户提出的“把模型发布时的数据放上去”是拟议方向，不应误认为现有功能已实现。

AA 的 [GPQA Diamond 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)同时有介绍、示例、模型成绩和成本等分析，称成绩为独立评测。[Tuntang 同项中文页](https://tuntang.top/benchmarks/gpqa-diamond/)也有简介、构建方法、示例概述、不同来源成绩与历史更新。项目本地 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)有子集、计分与数据访问说明，但无该条在线原题样例或模型成绩库。GPQA 数据卡要求用户不要在线披露样例；AA 的授权情况本次未知，不能据公开展示推断允许转载，也不判断其是否违约。

同一 GPQA 也有具体使用疑问：[Step-3.5-Flash issue](https://github.com/stepfun-ai/Step-3.5-Flash/issues/41) 中，复测者询问为何成绩与发布值不一致，涉及提示、推理设置、数据版本和答案抽取；这说明有人确实需要这些条件，但具体根因未确认，不证明发布值有误，也不证明该用户会使用资料站。

另一个明确但只能作为单点的内容对照：[Tuntang 的 SWE-bench 页面](https://tuntang.top/benchmarks/swe-bench/)把 Verified 写为 300 项，而[其 Verified 页面](https://tuntang.top/benchmarks/swe-bench-verified/)和 [SWE-bench 官方站](https://www.swebench.com/)写 500 项，官方站把 300 项标为 Lite；本地 [Verified 条目](../../content/benchmarks/swe-bench-verified.json)写 500 项。这支持核对基准身份与规模的实际意义，但不能据一例断言本站其他内容全部准确或竞品整体不可靠；对方页面也可能更新。

同项呈现深度也不同：上述本地 Verified 条目包含 4 个公开实例的 issue、仓库版本和来源，并解释通过测试的条件；Tuntang Verified 页面有任务概述、模型成绩和口径讨论。本次未在该竞品页面看到相同的 Astropy 具体实例，也未评估其他页面或做读者任务测试，因此不能称任何一方整体更全面或更易用。

## 问题、证据与可替代方案

| 想完成的事 | 已见具体行为或问题 | 已有解决方案及竞争边界 | 对项目的含义 |
| --- | --- | --- | --- |
| 快速看模型在一项测试上的表现 | 有人在模型选型时关心实际任务体验与榜单是否一致，[讨论](https://www.reddit.com/r/LocalLLaMA/comments/1vbdpcz/)是个人体验，不证明榜单无用。 | [AA GPQA](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)有分数和多维图；[AIMap](https://aimap.page/zh-hans/benchmarks/gpqa-diamond/)有中文介绍、成绩、部分设置与来源。 | 仅添加一张类似分数榜，用户有成熟替代品；独立跑分能力也不是靠整理发布材料就能获得。 |
| 读懂一项评测到底测什么 | 日本开发者[自述看到发布分数却不熟悉 benchmark](https://zenn.dev/dmuraoka/articles/2f234af1efc256)，于是自己整理；[另一作者](https://zenn.dev/shoyataguchi/articles/7d0b6e2b02a905)已写跨基准解释。 | AA 和中文目录也解释基准；本地资料额外记录数据字段、来源、访问和部分协议差别，但本次未做统一题集下的阅读效率对照。 | 现有内容可作为解题入口，差异是待测的内容深度与易用性，而不是独占中文解说。 |
| 知道不同公布成绩能否比较 | [BEHAVIOR 适配器版本问题](https://github.com/allenai/vla-evaluation-harness/issues/113)被项目参与者确认并修正标识；[Anthropic 系统卡](https://www-cdn.anthropic.com/0dd865075ad3132672ee0ab40b05a53f14cf5288.pdf)展示相同模型在不同 agent 运行框架下的成绩。两例不能证明所有差异都由版本或框架造成。 | [LLM Benchmarks Tracker](https://alloevil.github.io/llm-benchmarks-tracker/b/gpqa-diamond/)、[Tuntang](https://tuntang.top/benchmarks/gpqa-diamond/)和 [whatmodel.sh](https://whatmodel.sh/claims)已整理来源或不同测量；[司南](https://robo.sinanlab.com/benchmarks)也列机器人评测的部分训练/试验条件。 | 可尝试将同一模型、同一 benchmark 的来源和条件串起来，但需人工维护，且不是全新赛道；缺失条件必须明确，不生成未经验证的统一排名。 |
| 选机器人模型或仿真测试，节约真机试错 | [一个开发者](https://www.reddit.com/r/MachineLearning/comments/1tje2qd/)寻找实机方案并关心失败模式和训练数据量；另一评论者关心设备兼容与部署摩擦。两人身份和商业关系未核实，不能代表市场。 | [司南](https://robo.sinanlab.com/benchmarks)有成绩、模型和设备信息；[PhAIL](https://phail.ai/)和 [AA Robotics](https://artificialanalysis.ai/articles/aa-robotics/)做真机测试；[LeRobot](https://huggingface.co/docs/lerobot/main/robotwin)提供运行说明。 | 本地已有具身条目和样例，可选非常窄的同任务对照做可用性试点，但站内现有视频/演示不等于自主实测，也不能宣称 sim 成功率能预测真机。 |
| 在自己的场景测试候选模型 | [本地模型用户](https://www.reddit.com/r/LocalLLaMA/comments/1xrbhdf/)询问比较速度、工具调用和推理的方法；回复提出现有工具和业务题集。 | 运行器、评测框架和场景工具已存在；本次未运行对比产品，也未确认用户愿意更换工具。 | 此需求可能指向测试执行/私有数据工作流，超出当前资料库。先验证读者是否希望由资料入口走向自建测试，不应自动扩成新平台。 |

## 具身资料的现状与边界

本地有 50 个带 `embodied` 字段的已发布条目和 144 条样例记录，其中 39 项有媒体等资源引用。两项统计可能含版本重复；资源引用不证明可播放或有再分发许可。训练演示、单次运行与完整测试应严格区分。完整清单见[具身盘点](2026-11-09-embodied-inventory.md)。

机器人方向也有成熟和新兴产品：中文的 [司南](https://robo.sinanlab.com/benchmarks)、目录型的 [Embodied Data Atlas](https://embodieddataatlas.com/zh/datasets/libero/?lang=zh)、运行框架 [AllenAI](https://github.com/allenai/vla-evaluation-harness)，以及真机 [PhAIL](https://phail.ai/)。[Agientry](https://agientry.com/zh/leaderboard) 也已在中文页面聚合通用和 RoboDojo 仿真、真机榜；页面标注同步来源，本次未逐项核验同步成绩。现有竞争说明具身不是天然空白；本地条目数量也不能与竞品总量直接比较。基于本地 BEHAVIOR-1K、RoboTwin 的具身安全评测及来源边界见[安全评测补查](2026-11-09-embodied-safety-evaluations.md)。

## 可以检验的下一步，而非已验证需求

竞争补充：[HF Community Evals](https://huggingface.co/docs/hub/en/eval-results)和 [Evaluation Cards](https://evalcards.evalevalai.com/)已把模型、评测、成绩及来源/条件进一步关联。Qwen 的 GPQA 和 Terminal-Bench 公开 PR、模型卡表列与接口返回的具体对照见[社区成绩专项](2026-11-09-huggingface-community-evals-competition.md)；不同项目的验证标记、合并状态不能混同。

补充：[Benchmark Radar](https://benchmark-radar.org/)也将 benchmark、模型报告、成绩与来源组织到同一检索产品；其论文说明不同来源保持独立。[Qwen 成绩归属个案](2026-11-09-release-score-attribution-case.md)展示模型卡标题、表格模型列和待合并结构化记录可以不同，需要保留被测对象和配置；该案例说明数据整理有具体工作，但不证明目标用户会为新产品买单。

补充：公开的研究者和产品开发者访谈支持将“用榜单缩小候选范围”与“验证自己的完整业务流程”区分开；后者已有 LangSmith 等运行平台，不能因为有评测痛点就推断需要另一家排行榜。样本、供应商问卷局限、现有工具及一套可执行对照方案见[从业者证据与验证设计](2026-11-09-practitioner-evidence-and-validation.md)。这些不是对本项目目标用户的调查。

优先用现有资料选择一类具体读者及一个真实任务，制作小规模静态对照。例如：针对机器人开发者，挑选 LIBERO 或 RoboTwin 同一任务，列出测试是什么、样例属于训练还是评估、公开成绩的模型与协议、缺失信息及出处，再以 AA/司南/官方文档为参照，让读者尝试回答一组相同问题。

另一条路线是针对模型发布阅读者，用三份近期发布资料建立少量成绩记录，展示同一模型/测试在不同来源中的设置与缺失项，核对并记录每条维护耗时。应选择真实存在协议差异的材料，不为演示编造可比成绩。

两条都要观察真实读者能否找到出处、理解限制、愿否主动回访，及维护负担是否可接受；目前没有采访、对照实验、留存或付费证据。若无法证明较现有资料更省时或更可信，就停止扩张成绩功能，继续保留资料库或重新定位；具体时长和阈值根据项目目标设定。
# 编码工具与成绩对照补充

[编码工具、模型分数与现有榜单](2026-11-09-coding-harness-model-score-comparison.md)记录同模型不同配置的条件性实验、另一项重复运行研究、AA 自身编码 Agent 成绩及已有工具对照榜单，并区分项目发起者和其他用户的公开发言；目前没有本站用户实验或付费证据。

具身数据补充：[RoboTwin 图像接口与同任务复现](2026-11-09-robotwin-image-contract-and-reproductions.md)记录已合并的 RoboDojo 读取器修复、RoboTwin 双格式官方工具、同任务部分结果及现有跨 benchmark 复现方案；不能推断本站视频或历史榜单受影响。

具身榜单补充：[Papers with Code 与 VLA 目录](2026-11-09-robotics-paperswithcode-and-vla-directory.md)核查同一论文的 RoboTwin 场景成绩、聚合站分榜及已有选型目录；未复测或做读者实验。

仿真与名称补充：[接触异常与 RoboRSI 同名系统](2026-11-09-simulator-artifacts-and-roborsi-identity.md)核对不同引擎设置、筛选 seed、未达显著的闭环结果及不同项目/在线与冻结协议；未运行工具或模型。

GPQA 小分差补充：[量化成绩与区间对照](2026-11-09-gpqa-quantization-uncertainty-crosswalk.md)核对同一模型卡的两条成绩、现有网站 API 的来源及推算区间、真实开发者的问题与统计边界；未复测模型或验证本站用户需求。

用户选型与时效补充：[AA 指数版本和中文聚合站](2026-11-09-aa-index-version-user-demand.md)核查个人使用反馈、GPQA 与综合指数的区别，以及中文站历史快照与 AA 当前方法的版本差异；未做用户实验。

自定义评测补充：[用户问题与现有工作流](2026-11-09-custom-eval-workflow-user-and-competition.md)比较 AA MicroEvals、One-Eval、YourBench、应用评测工具及视频工作流，区分文档能力与未经验证的使用需求。

低成本机器人补充：[SO-101 仿真、真机与部署](2026-11-09-robotics-deployment-data-evidence.md)核对主榜和真机对照分母、既有官方工具与开发者反馈；未自行运行或访谈。

具身待补候选：[RoboLab 与 LADDER](2026-11-09-jushenji-robotics-catalog-crosswalk.md)核对现有条目的套件关系、官方榜单和开发者仿真异常报告；未运行或自动新增条目。

目录未匹配项补查：[13 项官方入口与类型](2026-11-09-jushenji-robotics-catalog-crosswalk.md)区分任务评测、仿真环境及运行框架，并记录本地关联和后续核验顺序；不代表已收录或覆盖全部具身领域。

实际提交与运行补查：[CodeActionBench 提交问题](2026-11-09-code-action-robot-benchmark.md)对照具体提问、官方一般流程、场景与模型随机性及相近框架的问题报告；未运行或访谈。

本地模型选测补查：[GPQA 与量化配置问题](2026-11-09-gpqa-qwen-local-comparison.md)对照真实选测提问、本站长上下文条目和已有速度/质量网站；未做配置实验或用户对照。

直接竞品同页补查：[GPQA 人类参考值与 GDP.pdf 任务样例](2026-11-09-aa-directory-crosswalk.md)对照 AA 页面和论文的分集统计，并核对 AA 已有输出及评分细则；不能把筛选后人类成绩当公平基准。

具身复现及竞品补查：[FastWAM 复现与 RoboTwin 榜单解读](2026-11-09-robotwin-image-contract-and-reproductions.md)记录开发者与作者的公开讨论、官方设置及第三方已有说明；样例异常另做了源文件只读复核。

样例来源复核：[FACTS 和 CyberBench 截取边界](2026-11-09-untagged-fulltext-and-sample-integrity.md)对照作者页面、本地字段和查看器源码；未修改原始数据或核验线上。

中文动手复现补查：[OpenVLA 与 LIBERO 选测记录](2026-11-09-chinese-robot-reproduction-demand.md)记录一位作者的动机、小样本对照及现有中文操作文档；未自行运行或访谈。

国内评测标准补查：[标准公开状态与项目边界](2026-11-09-industrial-robotics-evaluation.md)区分推荐性行业标准、团体标准和国家标准计划；仅核对元数据，不判定合规或客户需求。

现场问题补查：[视觉、控制周期与机器人异常](2026-11-09-industrial-intervention-and-assembly.md)记录三条公开提问和已有任务导向研究；这些不证明提问者需要具身排行榜或本站。

按任务选评测补查：[直接竞品与 10 人定性研究](2026-11-09-practitioner-evidence-and-validation.md)对照现有 GPQA 任务入口、示例查看行为及共享测试顾虑；非本站用户实验。

实车与成绩来源补查：[DrivingBench 和站内仿真任务](2026-11-09-untagged-embodied-task-review.md)区分实验对象、尝试分母和已有竞品；[模型卡 AA.LCR](2026-11-09-aa-index-version-user-demand.md)记录版本不明及成绩来源，不能凭名称并表。

具身分类冲突补查：[COLOSSEUM 官方与第三方目录](2026-11-09-robot-leaderboard-aggregator-crosswalk.md)对照仿真基准与真机验证，并补充新的目录入口；不推断全站质量或市场需求。

第三方具身目录逐名对照：[32 项名称与本站匹配](2026-11-09-rlresearch-embodied-crosswalk.md)区分完整名称命中、相关套件和未确认，并核对 DexHoldem 论文版本；未命中不等于应新增或需求已验证。

评测运行证据补查：[SmolVLA 同检查点参数对照](2026-11-09-smolvla-libero-checkpoint-compatibility.md)追到作者逐任务汇总；[LeRobot 样本数与区间](2026-11-09-robot-evaluation-uncertainty.md)核对官方已有输出及仿真到实机的问题，未复现实验。

中文产品补查：[AIMap 的公开 JSON 与本地名称对照](2026-11-09-artificial-analysis-product-comparison.md)和[榜单镜像的指数说明](2026-11-09-aa-index-version-user-demand.md)区分数据日期与方法版本；未复核全部成绩或动态交互。

发布分数证据链补查：[Qwen3.5 的模型卡、结构化复录及 Epoch 原始 CSV](2026-11-09-release-score-same-model-competitors.md)区分模型标识、独立运行与转录；未打开受保护日志或证明分差原因。

具身评测完整性补查：[LIBERO-PRO 样例与七项基准审计](2026-11-09-embodied-benchmark-audit-and-libero-pro.md)追踪用户提问、维护者答复、固定代码和原始 BDDL；未复现运行或推断所有成绩受影响。

仿真轨迹表述补查：[五条标题及对应来源](2026-11-09-robot-rollout-success-evidence.md)区分存在的训练轨迹和真机采集，并记录 30 fps 的播放时钟限制；未修改样例或核验所有媒体。


补充：[Terminal-Bench 旧版与双足任务对照](2026-11-10-terminal-versions-robotics-trace.md)提供同一任务跨版本预算变化及逐次运行案例；官方与第三方已有任务和运行资料，尚无本站读者对照实验。

补充：[COLOSSEUM 64% 溯源](2026-11-10-colosseum-bridgevla-64-trace.md)对照同名论文的仿真分项、数据格式提问与官方回复；第三方页面来源不明，用户需求规模未验证。

补充：[RoboCasa365 单任务成绩与演示重放](2026-11-10-robocasa-open-drawer-replay-protocol.md)记录不同分母、开环/状态重放与参与者的排障问题；官方已有成绩与实现入口，未做用户可用性实验。

补充：[RoboCasa-Shift 配对与阶段诊断](2026-11-10-robocasa-shift-matched-outcomes.md)提供同分不同回合结果的可复核案例；作者已有逐次记录和诊断，不证明本站有独占能力。
# 2026-11-10 补充：工业装配评测对象

[机器人数据质量与失败识别](2026-11-10-robot-data-quality-and-id-leakage.md)补充开发者工具、已有数据筛查榜、合成失败识别资源及真实恢复实验；固定版文件核查揭示 ID 与标签的直接关联和数量差异，不能把报告的模型基线归因于 ID，也不能把筛查分数当真实机器人失败率。

[工业装配机器人与视频对照](2026-11-10-industrial-assembly-robot-and-video.md)补查 RAMP、HAIL、EgoIndAssembly、IMPACT：作者已提供各自的任务协议和部分成绩，机器人执行与识别人工视频的结果不能直接合榜。IMPACT 有数据版本更新及数据非商业许可；RAMP 的 84% 是平均装配进度而非完整任务成功率。是否因此形成有效产品需求，仍需对目标用户实际测试。

[LIBERO 物体完好性补查](2026-11-10-libero-maniphysics-object-preservation.md)说明同一任务完成、物体完好与条件成功比例的分母不同；作者已有公开表格与事后力敏感性分析。如何帮助用户识别这些条件值得测试，但模拟损伤并非实机安全认证。

[LIBERO 画面方向与场景状态](2026-11-10-libero-camera-orientation-fixture-drift.md)补查具体复现提问、公开小样本实验和现有商业复现指南；画面处理与模型检查点有关，环境状态问题尚属特定报告，未证明本站运行受影响。

[whatmodel 公开成绩比较](2026-11-10-whatmodel-claims-median-provenance.md)核对 611 对网页显示值及一项 GPQA 多来源汇总；相对百分比与百分点不同，第三方也可能是其他模型厂商，成绩汇总和来源说明均已有竞争。

