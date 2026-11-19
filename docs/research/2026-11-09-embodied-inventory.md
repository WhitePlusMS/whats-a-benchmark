# 本地具身评测逐项盘点（2026-11-09）

综述对照：[预测式具身评测 160 行机器名称筛查](2026-11-10-predictive-embodied-survey-crosswalk.md)保留逐行结果，标记同名误匹配及版本漏匹配；不将其当作准确覆盖率。

代码智能体与机器人研发：[FrontierCS 2 的两个仿真研发任务](2026-11-10-sotabase-frontiercs2-robotics.md)区分智能体写代码、机器人仿真及第三方成绩快照；未新增独立产品条目。

世界模型执行补充：[RoboWM-Bench 视频转动作与复现问题](2026-11-10-robowm-execution-reproduction.md)区分生成成绩、动作转换器和真仿回放，记录初始输入及公开复现问题；未新增正式条目或运行模型。

中文复现需求补充：[LIBERO、RoboTwin 开发者工作流](2026-11-10-chinese-embodied-practitioner-workflows.md)记录具体问题、部分已得到的答复和现有官方指南；不把发帖当作本站用户验证。

LIBERO-Plus 单次记录延伸：[失败录像与重跑分母](2026-11-10-libero-plus-failure-rerun-denominator.md)复算第三方首次与选择性重跑的日志统计；与本站样例不是同一运行。

人类视频与动作补充：[WatchAct 计划、仿真和真机执行](2026-11-10-watchact-human-video-and-robot-execution.md)关联本站 LIBERO，核对不同成绩、少量真机试验与论文模型归属不一致；未新增正式条目或运行模型。

导航、推物与巡检补充：[Bench-Push、GOAT、HomeSafeBench 和 Verti-Bench](2026-11-10-navigation-push-safety-survey-crosswalk.md)区分仿真与有限真机、目标导航和部分完成得分，并核对 HomeSafeBench 不同论文版本；未新增正式条目或运行评测。

科学实验室具身补充：[任务生成、过程得分和复现提问](2026-11-10-scientific-laboratory-robot-benchmarks.md)对照已有 EmbodiedLab 与 LabUtopia、SciVLABench、SafeLab；区分仿真和真机、论文与仓库规模及代码/数据许可，未运行评测。

竞品索引带出的新候选：[工业扫描、线路缺陷、多机器人协作和轨迹进度](2026-11-10-robotics-candidates-benchnavigator.md)，区分真实采集、图像检测、仿真和版本/许可边界；未新增正式条目。

国内评测补充：[OpenCompass 具身榜、EBench 与静态评测](2026-11-10-opencompass-embodied-ebench.md)记录浏览器实际榜单、模型成功率与得分、现成分析工具和开发者问题，并区分另一同名站；未运行评测。

LIBERO 新衍生候选：[偏好满足与动态操作](2026-11-10-libero-preferences-dynamics.md)区分论文任务规模、实际公开文件、成功率与分级偏好得分，以及目标运动、执行延迟和真机实验；未新增正式条目或运行评测。

真机与仿真竞争补充：[PhAIL、RobotReplica 和 IndustrialVLA-Bench](2026-11-10-physical-ai-evaluation-competition.md)核对不同可靠度定义与真实设备边界，并关联本站 LIBERO-Plus、EmbodiedX；不把演示片段当模型测试成绩。

仓储调度及空中机器人候选：[WareMax 和 WareFly-VLA](2026-11-10-warehouse-dispatch-aerial-benchmarks.md)分别涉及多车调度仿真和单仓库无人机动作预测；均未实际运行，数据访问与闭环边界另行说明。

工业视频问答候选：[IndustryEQA](2026-11-10-industryeqa-warehouse-video-qa.md)核对 1,344 条问答、引用视频路径与固定版本清单，并记录 24 条待确认的路径问题；未下载视频或运行模型。

设备维护和巡检补充：[IndustryAssetEQA 与 BridgeEQA](2026-11-10-industrial-asset-eqa-and-inspection.md)区分离线维护问答、真实巡检照片及虚拟导航，记录一处论文算术不一致；未运行或复核原始专家评分。

真实工业数据候选：[InspecSafe-V1 和 UWB AMR 轨迹](2026-11-10-real-industrial-inspection-and-localization.md)区分实际采集、RGB 单帧评测、二分类基线及非商业许可；未下载数据包或运行评测。

工业控制延伸：[PLC 评测与 OT AI Hub](2026-11-10-plc-benchmark-and-ot-competition.md)区分编译、逐周期行为与仿真闭环，并记录已有工业垂直竞品；PLC 程序生成不自动等同具身机器人评测。

数据筛查补充：[数据质量榜与合成失败识别](2026-11-10-robot-data-quality-and-id-leakage.md)对照本站 LIBERO、LeRobot 数据异常工具与公开失败识别集；固定版 150 个 ID 均编码其标签，数据卡数量与文件不一致，未据此认定作者基线使用 ID 或本站资源有误。

第三方综合评测补充：[Embodied First Exam 36 个目录对照](2026-11-10-embodied-first-exam-crosswalk.md)记录九个规范化同名项、两项上游关联及名称匹配限制，并对照 GPQA 页面；不把冻结实例的代码智能体成绩等同原始模型发布成绩。

安全候选补充：[ManiGuard 原版及第三方判定](2026-11-10-maniguard-safety-protocol.md)区分 200 个基础任务与第三方选用的 30 个、接触门控及真机评分；未新增产品条目或运行机器人。

双臂任务补充：[Handover Block 同题对照](2026-11-10-robotwin-handover-reproduction.md)对照官方数据生成、论文成绩、复现讨论和本站引用的单次末态诊断；未证明各运行设置相同。

家庭操作候选补充：[MolmoSpaces 任务及 3,915 条评测索引复算](2026-11-10-molmospaces-episode-score-crosswalk.md)区分原套件、第三方适配、早停和两种聚合分母；未重跑模型或审查视频。

其他评测目录补充：[自动生成档案名称筛查](2026-11-10-auto-benchmarkcard-competition.md)中 50 个本地具身字段条目未出现精确名称命中；该有限匹配不能证明对方没有其他机器人内容。

LIBERO 可比性补充：[初始状态与配对身份](2026-11-09-robot-evaluation-uncertainty.md)核查特定 LeRobot 版本代码、公开复现报告及未合并修复；另核对本站样例来源的三策略逐回合记录和已有中文对照，不推断本站单次样例受影响。

工业线缆补充：[插接、布线和评测指标](2026-11-09-industrial-cable-insertion-routing.md)对照本站 EBiM、ManipulationNet 与 VABAR、WireCraft、IDB；未新增正式条目或运行评测。

物理保真候选：[GAUGE 与 GaugeBench](2026-11-09-world-model-robot-evaluation.md)区分真实测量、视频世界模型与机器人描述变换，并记录已有中文资料及工具状态差异；未新增正式条目。

同名与资源补充：[REAL-Bench 机器人和网页评测、场景资源及分数](2026-11-09-long-horizon-benchmark-crosswalk.md)核对独立来源和本地资源说明，未下载数据或运行仿真。

抓取数字补充：[同一方法的离线 AP 与真机分母](2026-11-09-grasp-execution-crosswalk.md)对照 GraspNet、RNGNet 小规模真机实验、已有成绩站与不同后处理；未复现实验。

导航与安全补充：[R2R-CE 逐回合需求和碰撞口径](2026-11-09-humanoid-navigation-crosswalk.md)对照本站单次样例、VLN-Safe 仿真实验、真实提问及已有工具；未运行评测或验证真机安全。

评测完整性补充：[七项基准研究与 LIBERO-PRO 具体样例](2026-11-09-embodied-benchmark-audit-and-libero-pro.md)区分 BDDL 内容、评测时实际提示和固定版本加载器，记录开发者问题及现有处理；未运行模型或判定本站样例有误。

仿真样例措辞复查：[五条“真实轨迹”标题的来源](2026-11-09-robot-rollout-success-evidence.md)记录训练数据、视频播放帧率和真机含义的潜在歧义；未修改产品或做浏览器用户测试。

家庭导航补充：[ALFRED、EB-ALFRED 与案例站](2026-11-09-alfred-navigation-case-competition.md)对照本站示范与派生测试划分，记录已有模型案例站、开发者问题及入口状态。

跨榜竞争补充：[VLA 多维评测与证据状态](2026-11-09-vla-multiaxis-competitor-evidence.md)对照本站 LIBERO、RoboTwin 等条目与已有评测方案、读者问题和版本差异。

双臂与人形补充：[BiGym 版本和会话对照](2026-11-09-bigym-version-session-crosswalk.md)复算本地两个种子所属三份官方结果，区分会话、总榜和任务版本；未运行仿真。

吸盘抓取补充：[同一基线的候选 AP 与真机指标](2026-11-09-suction-bin-picking-metric-crosswalk.md)核对仓储料箱实验、人工介入及数据修订，区分两个论文的不同场景和分母。

LIBERO-Plus 补充：[分类数量与复现问题](2026-11-09-libero-plus-task-count-reproduction.md)对照官方论文、固定分类文件与开发者对任务清单和权重的提问；未运行评测。

跨用途补充：[TOTO、LIBERO 与奖励模型](2026-11-09-robot-benchmark-selection-reward-evidence.md)区分原始机器人任务与第三方奖励对齐指标，并记录现有选型手册和复现问答。

BEHAVIOR-1K 补充：[官方标注与演示编号核查](2026-11-09-behavior-annotation-episode-mapping.md)厘清现有两个样例对应不同演示，并找到已有中文资料与第三方预览；帧级同步尚未验证。

BEHAVIOR-1K 判定补充：[一一配对条件的逻辑核对](2026-11-09-behavior-task-skill-protocol.md)对照固定源码与文档并独立枚举小矩阵，区分用户报告、未合并提案及第三方适配；未运行 BDDL 或断言本站样例受影响。

部署效率补充：[EmbodiedX 与机器人推理延迟](2026-11-09-embodiedx-inference-latency-demand.md)对照本地未标具身条目、开发者的速度和预热问题及现成推理指南；不同测量边界和硬件不得混排。

补充：[连续作业与恢复](2026-11-09-robot-continuity-and-recovery.md)将本地 EBiM、LIBERO 对照真实叠衣、工业包装与仿真评测协议，并记录论文版本、分母疑点及外部访问限制；这些相关研究并不改变本站具身字段计数。

补充：[LIBERO-Plus 指令和复现](2026-11-09-libero-plus-prompt-and-reproduction.md)核查当前条目的训练与单次评估样例，并对照公开复现讨论、固定版本源码及未合并 PR；不推断本地样例必然受影响。

补充：[RoboDojo 与 XPolicyLab](2026-11-09-robodojo-xpolicylab-competition.md)对照站内单次运行、已有中文跨评测工具与第三方部分复现的具体分母；不改变具身字段计数。

补充：未标具身条目的样例及任务字段关键词复查发现误命中和两项样例数据异常，检索范围及限制见[全文检索与样例完整性记录](2026-11-09-untagged-fulltext-and-sample-integrity.md)。该结果不改变本清单的字段计数或自动分类。

补充：[中文具身集 26 项对照](2026-11-09-jushenji-robotics-catalog-crosswalk.md)逐项区分本地同名或系列、未见独立同名项及其他中文成绩展示，不能将其目录行直接当成覆盖率。

补充：[CALVIN 评测口径与复现](2026-11-09-calvin-evaluation-fidelity.md)对照站内训练视频、评测序列、公开复现讨论、已有中文分数与适配管线研究；各证据并非同一次实验。

补充：[RLBench 专项](2026-11-09-rlbench-protocol-demand.md)对照站内测试演示、固定任务成功条件、复现提问、中文和英文已有资料，以及软件许可与数据素材适用范围。

补充：[SIMPLER 真仿专项](2026-11-09-simpler-real-sim-demand.md)对照本站两段仿真录像、论文真仿成绩、后续实验及使用者问题；相关性不是单次真机成功率保证。

口径：当前本地工作树 `content/benchmarks` 中 `status=published` 且包含 `embodied` 字段的 JSON。不同版本分别计数；未标记的 EmbodiedX 等相关条目不在表中。样例和资源数仅为字段引用统计，不证明真实测试、许可、可播放或线上同步。

2026-11-10 补查：未标具身的 Terminal-Bench-Science 0.1、Terminal-Bench 4.0 和 LHTB 中，官方固定版本分别包含机械臂规划、双足轨迹生成和 SLAM 软件修复子任务；这些不是独立新增条目，也不意味着整套基准是机器人执行评测。版本、任务及一个尚未合并的双臂提案见[未标条目复查](2026-11-09-untagged-embodied-task-review.md)。

同日补查：未标具身的 SkillsBench v1.1 还包含无人机仿真控制任务，以及车辆巡航、视频动态对象分析等相关任务；按任务输出区分机器人控制、车辆控制和离线感知，不增加具身字段计数。固定来源、现有替代和开发者问题见[未标条目复查](2026-11-09-untagged-embodied-task-review.md)。

同日进一步复核：SkillsBench v1.1 的 87 份、Science 0.1 的 70 份，以及 LHTB 旧版的 46 份任务正文均完成关键词扫描。更正：LHTB 两项曾因提取名称时漏掉下划线而请求错误路径；使用完整名称后均读取成功。LHTB 2.0 新增机械臂控制重建与点云配准相关任务，不应混入本站旧版口径；方法及遗漏边界见[未标条目复查](2026-11-09-untagged-embodied-task-review.md)。

同日继续核对 Terminal-Bench 4.0 固定提交目录中提取的 66 份任务正文，确认双足轨迹任务与货运、航空调度的边界；未对照独立发布 manifest。详见[未标条目复查](2026-11-09-untagged-embodied-task-review.md)，相关实际工程问题见[行走与恢复](2026-11-10-locomotion-fall-recovery-demand.md)。

| 条目 | 任务标签 | 站内样例 | 视频引用 | 图片引用 |
| --- | --- | ---: | ---: | ---: |
| [AA-Robotics v0.1](../../content/benchmarks/aa-robotics.json) | 抓取与操作、推理与决策 | 2 | 0 | 0 |
| [ALFRED](../../content/benchmarks/alfred.json) | 导航与移动、抓取与操作、长步骤任务 | 2 | 0 | 0 |
| [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) | 导航与移动、抓取与操作、长步骤任务、具身推理 | 4 | 1 | 3 |
| [BiGym 2.0](../../content/benchmarks/bigym-2.json) | 导航与移动、抓取与操作、双臂操作、长步骤任务 | 4 | 2 | 0 |
| [BiGym](../../content/benchmarks/bigym.json) | 导航与移动、抓取与操作、双臂操作 | 5 | 2 | 0 |
| [CALVIN](../../content/benchmarks/calvin.json) | 抓取与操作、长步骤任务 | 4 | 1 | 0 |
| [CodeActionBench](../../content/benchmarks/codeactionbench.json) | 抓取与操作、双臂操作、推理与决策 | 4 | 0 | 1 |
| [THE COLOSSEUM](../../content/benchmarks/colosseum.json) | 抓取与操作 | 4 | 2 | 7 |
| [DexArena](../../content/benchmarks/dexarena.json) | 抓取与操作、双臂操作、长步骤任务 | 2 | 2 | 0 |
| [EBiM Benchmark](../../content/benchmarks/ebim.json) | 抓取与操作、双臂操作 | 4 | 1 | 1 |
| [Embodied Playground](../../content/benchmarks/embodied-playground.json) | 抓取与操作、长步骤任务、推理与决策 | 2 | 0 | 1 |
| [EmbodiedBench](../../content/benchmarks/embodiedbench.json) | 导航与移动、抓取与操作、长步骤任务、具身推理 | 4 | 0 | 0 |
| [EmbodiedLab](../../content/benchmarks/embodiedlab.json) | 抓取与操作、长步骤任务、推理与决策 | 2 | 0 | 2 |
| [GM-100](../../content/benchmarks/gm-100.json) | 抓取与操作、双臂操作 | 2 | 1 | 0 |
| [GraspNet-1Billion](../../content/benchmarks/graspnet-1billion.json) | 抓取与操作 | 3 | 0 | 1 |
| [Habitat 3.0](../../content/benchmarks/habitat-3.json) | 导航与移动、抓取与操作、推理与决策 | 4 | 0 | 0 |
| [HumanoidBench](../../content/benchmarks/humanoidbench.json) | 导航与移动、抓取与操作、长步骤任务 | 3 | 2 | 0 |
| [LADDER](../../content/benchmarks/ladder.json) | 抓取与操作、长步骤任务、具身推理 | 3 | 3 | 0 |
| [LIBERO-MAX](../../content/benchmarks/libero-max.json) | 抓取与操作、推理与决策 | 4 | 0 | 1 |
| [LIBERO-Plus](../../content/benchmarks/libero-plus.json) | 抓取与操作 | 2 | 1 | 0 |
| [LIBERO-PRO](../../content/benchmarks/libero-pro.json) | 抓取与操作 | 3 | 1 | 0 |
| [LIBERO-Pro2.0](../../content/benchmarks/libero-pro2.json) | 抓取与操作、具身推理 | 2 | 1 | 0 |
| [LIBERO](../../content/benchmarks/libero.json) | 抓取与操作、长步骤任务 | 2 | 1 | 2 |
| [ManipulationNet](../../content/benchmarks/manipulationnet.json) | 抓取与操作、推理与决策 | 2 | 0 | 1 |
| [ManiSkill2](../../content/benchmarks/maniskill2.json) | 抓取与操作、导航与移动、双臂协作 | 2 | 1 | 0 |
| [ManiSkill3](../../content/benchmarks/maniskill3.json) | 抓取与操作 | 4 | 2 | 4 |
| [Meta-World](../../content/benchmarks/meta-world.json) | 抓取与操作 | 2 | 2 | 3 |
| [R2R-CE (VLN-CE)](../../content/benchmarks/r2r-vlnce.json) | 导航与移动、具身推理 | 1 | 0 | 0 |
| [Room-to-Room (R2R)](../../content/benchmarks/r2r.json) | 导航与移动 | 2 | 0 | 0 |
| [REAL-Bench](../../content/benchmarks/real-bench.json) | 导航与移动、抓取与操作、推理与决策 | 3 | 0 | 0 |
| [RLBench](../../content/benchmarks/rlbench.json) | 抓取与操作 | 3 | 2 | 6 |
| [RLE-Bench](../../content/benchmarks/rle-bench.json) | 推理与决策 | 5 | 0 | 0 |
| [RoboArena](../../content/benchmarks/roboarena.json) | 抓取与操作 | 2 | 2 | 0 |
| [RoboCasa](../../content/benchmarks/robocasa.json) | 抓取与操作、导航与移动、长步骤任务 | 3 | 2 | 0 |
| [RoboCasa365](../../content/benchmarks/robocasa365.json) | 抓取与操作、导航与移动、长步骤任务 | 3 | 2 | 0 |
| [RoboChallenge Table 30 V2](../../content/benchmarks/robochallenge-table30-v2.json) | 抓取与操作、双臂操作 | 3 | 0 | 0 |
| [RoboChallenge](../../content/benchmarks/robochallenge.json) | 抓取与操作、双臂操作 | 1 | 0 | 0 |
| [RoboDojo](../../content/benchmarks/robodojo.json) | 抓取与操作、双臂操作、长步骤任务 | 3 | 3 | 0 |
| [RoboEval Diagnostic Bimanual Challenge](../../content/benchmarks/roboeval-bimanual-challenge.json) | 抓取与操作、双臂操作 | 3 | 2 | 2 |
| [RoboEval](../../content/benchmarks/roboeval.json) | 抓取与操作、双臂操作 | 3 | 2 | 2 |
| [RoboQuest](../../content/benchmarks/roboquest.json) | 导航与移动、抓取与操作、推理与决策 | 4 | 1 | 3 |
| [RobotArena ∞](../../content/benchmarks/robotarena-infinity.json) | 抓取与操作、推理与决策 | 3 | 0 | 1 |
| [RoboTwin 1.0](../../content/benchmarks/robotwin-1.json) | 抓取与操作、双臂协作 | 3 | 0 | 7 |
| [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) | 抓取与操作、双臂协作 | 4 | 4 | 0 |
| [RoboTwin Early Version](../../content/benchmarks/robotwin-early.json) | 抓取与操作、双臂协作 | 1 | 0 | 3 |
| [SIMPLE](../../content/benchmarks/simple-embodied.json) | 导航与移动、抓取与操作、长步骤任务 | 3 | 1 | 0 |
| [SIMPLER](../../content/benchmarks/simpler.json) | 抓取与操作 | 2 | 2 | 0 |
| [SuctionNet-1Billion](../../content/benchmarks/suctionnet-1billion.json) | 抓取与操作 | 4 | 0 | 2 |
| [TOTO](../../content/benchmarks/toto.json) | 抓取与操作 | 2 | 0 | 0 |
| [VLABench](../../content/benchmarks/vlabench.json) | 抓取与操作、长步骤任务、具身推理 | 2 | 0 | 3 |

关联研究：[具身与跨领域需求持续调查台账](2026-11-09-embodied-demand-ledger.md)。此前具身数据及媒体核查已交接其他工作；此表仅盘点，不能代替逐项核验。

固定提交的另一份中英双语目录与本地 50 条做名称对照：12 条规范化完全同名、5 条以合并版本或别名关联、33 条未确认；这些不是内容验收或覆盖率，完整列表见[目录对照](2026-11-09-embodied-catalog-name-crosswalk.md)。

另一个相关入口是 HF 已注册的 [VLABench 训练集与关联榜单](2026-11-09-hf-official-benchmarks-crosswalk.md)：其训练仓库不同于本站引用的预训练仓库，页面显示的模型分数还需回查外部评测条件，不能当训练轨迹成绩。

## 未带具身字段的相关条目补查

2026-11-09 对本地其余已发布 JSON 的名称、副标题、任务说明、输入输出、数据说明、指标与限制作关键词筛查，并人工阅读候选；这是有限字段和关键词搜索，不能证明其他条目绝对无关。

- **直接相关：[EmbodiedX](../../content/benchmarks/embodiedx.json)**。站内当前没有 `embodied` 字段，因而不在上述 50 条内；它评测 VLA 与世界模型在指定硬件、实时约束下的吞吐及延迟，是具身模型部署效率，不是机械臂任务成功率。[官方竞赛页](https://efficient-embodied-ai.github.io/challenge/)列三条赛道与平台，页面在本次读取时称暂无社区提交；这只是页面快照，本次未运行。
- **潜在上游能力，不是机器人动作实测**：[V*Bench](../../content/benchmarks/vstar-bench.json) 包含图像细节与相对空间关系问答；[BabyVision](../../content/benchmarks/babyvision.json) 包含视觉空间感知任务；[ZeroBench Main](../../content/benchmarks/zerobench-main.json) 涉及图文空间推理。它们是静态多模态任务，不能把准确率等同机器人操作能力。
- **工业设计相关，但不是具身控制**：[BenchCAD](../../content/benchmarks/benchcad.json) 涉及零件 CAD 代码、工程图与几何评分；可用于理解工程场景，但不直接测量物理机器人执行。**名称误匹配**：[SpatialBench Verified](../../content/benchmarks/spatialbench-verified.json) 是空间转录组分析，并非机器人空间理解；不能仅因“Spatial”加入具身统计。
- 关键词也命中 AgentHarm 模拟工具、τ-Voice 语音环境等不相关上下文。这说明机械匹配需要人工甄别；本轮未修改任何分类或条目，是否调整站内筛选应另行确定标准。
- 后续查看未标具身条目的名称与简介时发现 [FrontierSWE v2](../../content/benchmarks/frontierswe-v2.json) 包含一项让智能体编写视觉赛车控制器的仿真任务；它是整个软件工程评测中的关联子任务，不代表整项基准或其总分均为机器人控制。详见[任务复查](2026-11-09-untagged-embodied-task-review.md)。
- 本地 50 条具身标记名称与 Eval Handbook 当次 507 张目录卡片做相同规范化匹配，未发现完全同名；这不是该站全站或全部同义名称的覆盖结论。对方目录有 ERQA、EmbSpatial 等具身视觉问答，本站发布资料也提及两者；更广泛的机器人平台和现有竞争仍需比较。误匹配及原始来源见[竞品对照](2026-11-09-eval-handbook-comparison.md)。

RoboCasa365 补充：[同任务模型成绩与状态重放](2026-11-10-robocasa-open-drawer-replay-protocol.md)对照官方逐任务、参考配置、本站轨迹及未合并补丁；无独立运行。

RoboCasa365 衍生补充：[RoboCasa-Shift 配对与阶段诊断](2026-11-10-robocasa-shift-matched-outcomes.md)核对 1,040 条公开记录的条件和 hash，并复算相同总分下的反向变化；只覆盖四项仿真任务及一个策略配置。
# 2026-11-10：LIBERO 物体完好性补查

[ManiPhysicsBench 研究记录](2026-11-10-libero-maniphysics-object-preservation.md)补查作者基于 LIBERO 和 SimplerEnv 的新物体与仿真任务，区分任务完成、物体完好和条件分母；该成绩不可写成原版 LIBERO 榜单成绩，也不能视为真实物体损坏概率。

竞品补充：[RoboAtlas 与 LIBERO 成绩口径](2026-11-10-roboatlas-libero-protocol-crosscheck.md)核对具身模型成绩、来源和 τ₀-VLA 页面协议标签，并补充 WorldFailBench 容易误解的字段；没有运行模型或下载该数据集压缩包。

失败恢复和安全补充：[RoboRecover 与 SafeLab](2026-11-10-roborecover-safelab-evidence.md)对照既有 LIBERO、RoboTwin 条目，区分筛选过的仿真恢复场景、数据尚未公开的限制以及开环真机重放；未独立运行。

