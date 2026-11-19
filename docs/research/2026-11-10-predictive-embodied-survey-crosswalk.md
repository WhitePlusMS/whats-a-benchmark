# 预测式具身评测综述与本站逐项名称筛查

调查日期：2026-11-10。对照 [Do World Models Make Better Robots? v1 附录表 10](https://arxiv.org/html/2609.29669v1) 与当前本地已发布 JSON；没有运行模型、复现论文或验收网站。综述及各论文结果是作者报告。逐项机器筛查是对该来源所列名称的覆盖，不是对互联网、所有别名或项目完整内容的穷尽。

## 如何筛查及哪些数字可靠

内存读取综述 v1 HTML，SHA-256 为 `56934ce1b9938a295942fc2061b6026eb1c2755306fbe340fc206ee86ec6fb7a`。用 lxml 解析附录表 10 的各行：仅取含五个单元格且年份为四位数字的行，剥离末尾作者年份括号，将名称与本地 `content/benchmarks` 中 `status=published` 项的 ID、name、aliases 做 Unicode 规范化、转小写及保留字母数字的精确比较。共提取 160 行，按原表组名得到 37、85、34、4 行，与表内组数一致；四组分别是操作策略、具身导航规划社交、世界模型/视频评测、预测转动作。它们是综述作者的分类，单行可能是数据集、框架、策略或模拟器，不自动等于一个独立机器人 benchmark。

名称自动匹配得到 18 个候选，其中经来源检查发现 **2 个误匹配**：具身视频预测 EVA-Bench 与本站语音 EVA-Bench 同名；视频生成 VBench 与本站图像搜索 V*Bench 因去掉星号而同形。剔除后有 16 个名称候选如下；这只是名字候选，未逐一核对所有原作者、版本、任务划分或协议，不能解释为准确覆盖率：

| 综述名称候选 | 本地 ID |
| --- | --- |
| BiGym | bigym |
| ManiSkill2 | maniskill2 |
| RLBench | rlbench |
| LIBERO | libero |
| RoboArena | roboarena |
| THE COLOSSEUM | colosseum |
| Meta-World | meta-world |
| CALVIN | calvin |
| RoboCasa | robocasa |
| VLABench | vlabench |
| ALFRED | alfred |
| BEHAVIOR-1K | behavior-1k |
| EmbodiedBench | embodiedbench |
| Habitat 3.0 | habitat-3 |
| HumanoidBench | humanoidbench |
| R2R | r2r |

R2R 命中依靠 ID，并非显示名称相同。其余 142 行没有被这一有限规则匹配，但不能称 142 项“本站缺失”：例如综述的 RoboTwin 属于本站 [RoboTwin 1.0](../../content/benchmarks/robotwin-1.json)、[2.0](../../content/benchmarks/robotwin-2.json)相关系列；`SIMPLER / SimplerEnv` 指本站 [SIMPLER](../../content/benchmarks/simpler.json)；VLN-CE 与本站 [R2R-CE](../../content/benchmarks/r2r-vlnce.json)有关，但后者是相关具体任务而非全部连续导航项目。斜杠、版本、子集与综合基准都可能造成漏匹配；不通过前缀或含糊近似字符串自动合并。

## 16 个名称候选的来源核对

进一步将综述表 10 的参考文献与本地条目逐一比对：下表前九项，综述引用的 arXiv 编号直接出现在对应本地 JSON 的文本中；后七项，综述论文与本地引用的作者项目页或仓库，通过论文编号、题名及作者对应。**这确认的是项目或基准系列身份，不代表数据集版本、任务划分、评测设置或成绩可以直接比较。**例如，本地 BEHAVIOR-1K 条目还引用 2026 Challenge 资料，不能将其与 2024 论文中的实验设置视为完全相同。

| 本地条目 | 综述所引论文 | 对应证据 |
| --- | --- | --- |
| [BiGym](../../content/benchmarks/bigym.json) | [2407.07788](https://arxiv.org/abs/2407.07788) | 本地 JSON 含相同论文编号 |
| [ManiSkill2](../../content/benchmarks/maniskill2.json) | [2302.04659](https://arxiv.org/abs/2302.04659) | 本地 JSON 含相同论文编号 |
| [RoboArena](../../content/benchmarks/roboarena.json) | [2506.18123](https://arxiv.org/abs/2506.18123) | 本地 JSON 含相同论文编号 |
| [THE COLOSSEUM](../../content/benchmarks/colosseum.json) | [2402.08191](https://arxiv.org/abs/2402.08191) | 本地 JSON 含相同论文编号 |
| [Meta-World](../../content/benchmarks/meta-world.json) | [1910.10897](https://arxiv.org/abs/1910.10897) | 本地 JSON 含相同论文编号 |
| [RoboCasa](../../content/benchmarks/robocasa.json) | [2406.02523](https://arxiv.org/abs/2406.02523) | 本地 JSON 含相同论文编号 |
| [EmbodiedBench](../../content/benchmarks/embodiedbench.json) | [2502.09560](https://arxiv.org/abs/2502.09560) | 本地 JSON 含相同论文编号 |
| [HumanoidBench](../../content/benchmarks/humanoidbench.json) | [2403.10506](https://arxiv.org/abs/2403.10506) | 本地 JSON 含相同论文编号 |
| [R2R](../../content/benchmarks/r2r.json) | [1711.07280](https://arxiv.org/abs/1711.07280) | 本地 JSON 含相同论文编号 |
| [RLBench](../../content/benchmarks/rlbench.json) | [1909.12271](https://arxiv.org/abs/1909.12271) | 本地引用的[作者仓库](https://github.com/stepjam/RLBench#citation)列出同一论文题名和作者 |
| [LIBERO](../../content/benchmarks/libero.json) | [2306.03310](https://arxiv.org/abs/2306.03310) | 本地引用的[作者仓库](https://github.com/Lifelong-Robot-Learning/LIBERO#citation)列出相同编号 |
| [CALVIN](../../content/benchmarks/calvin.json) | [2112.03227](https://arxiv.org/abs/2112.03227) | 本地引用的[作者仓库](https://github.com/mees/calvin)链接同名论文，并列出作者 |
| [VLABench](../../content/benchmarks/vlabench.json) | [2412.18194](https://arxiv.org/abs/2412.18194) | 本地引用的[作者仓库](https://github.com/OpenMOSS/VLABench#citation)列出相同编号 |
| [ALFRED](../../content/benchmarks/alfred.json) | [1912.01734](https://arxiv.org/abs/1912.01734) | 本地引用的[作者仓库](https://github.com/askforalfred/alfred#citation)列出相同编号 |
| [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) | [2403.09227](https://arxiv.org/abs/2403.09227) | 论文指向本地引用的[官方项目站](https://behavior.stanford.edu/)；具体版本需区分 |
| [Habitat 3.0](../../content/benchmarks/habitat-3.json) | [2310.13724](https://arxiv.org/abs/2310.13724) | 本地引用的[作者项目页](https://aihabitat.org/habitat3/)与论文题名及作者对应 |

附录保留首次机械匹配结果，以便复现检索过程；其中「候选，未逐项确认」是首次检索时的状态，项目身份以上表来源核对为准，具体协议仍未逐项确认。未命中行仍不能直接当作缺失。

## 两个非常具体的错名风险

- 综述引用的 [EVA: Embodied Video Anticipation Benchmark](https://arxiv.org/html/2410.15461) 面向人和机器人未来视频预测，论文报告 125 个样例；其中含真人、仿真与真实机器人来源，不能把 125 个都说成真机执行。本地 [EVA-Bench](../../content/benchmarks/eva-bench.json) 依据 [ServiceNow 语音智能体论文](https://arxiv.org/abs/2605.13841)，是不同项目，不能混合案例、分数或来源。
- [VBench](https://arxiv.org/abs/2311.17982) 是视频生成评价套件；本地 [V*Bench](../../content/benchmarks/vstar-bench.json)关联 [V* 视觉搜索](https://github.com/penghao-wu/vstar)。机械移除 `*` 会制造虚假命中。

## 综述的分类与统计需要独立复核

论文按表 10 标记汇总出 138 个 model-agnostic、11 个 partial 和 11 个 explicit，本次确实可以复算表内符号数量；这只是作者标注的数量。论文定义 explicit 为同一协议中原生运行并对比直接 VLA 和世界模型策略，但其表 10 却把 [ACRE](https://openaccess.thecvf.com/content/CVPR2021/html/Zhang_ACRE_Abstract_Causal_REasoning_Beyond_Covariation_CVPR_2021_paper.html) 和 [CoPhy](https://arxiv.org/abs/1909.12000) 均标为 open-loop 与 explicit。ACRE 原始论文描述静态视觉因果推理，CoPhy 描述合成物理视频预测；本次查阅各自论文未找到符合综述定义的同协议闭环 VLA 与世界模型对比。这是两个可验证的分类疑点，不证明其他九项也有同样问题。故不将“11/160、7% 为原生对照”直接用于行业结论。

综述的引用中还包括 [PerAct](https://arxiv.org/abs/2209.05451) 和 [RoboAgent](https://arxiv.org/abs/2309.01918) 这样的模型/方法工作。作者宣称筛除模型和数据集，与其表的具体对象仍需逐项甄别；一个方法论文可以提出或使用评测，但不可仅凭表内一行就直接新增同名 benchmark。此处只核对名称和论文题名，尚未完整审计 160 项的原论文定义。

## 与现有项目直接相关的候选

| 候选与一手来源 | 测试对象和已有条目的关系 | 状态 |
| --- | --- | --- |
| [FMB](https://functional-manipulation-benchmark.github.io/) | 真机 Franka 上通过抓取、重定位和插入完成装配；[官方流程](https://functional-manipulation-benchmark.github.io/procedure/index.html)中抓取采用 5 个已见与 5 个未见物体各 5 次，共 50 次，并定义物体稳固抓起才成功。与本站双臂仿真装配或吸盘候选评估相关，但硬件、任务和分母不同。 | 本地顶层字段未找到独立同名项；为现场装配阅读候选。数据、CAD 与模型资源许可需按具体文件核对。 |
| [WorldSimBench](https://arxiv.org/html/2410.18072) | 视频感知评价及视频到动作的一致性；机器人分支使用本站已有 [CALVIN](../../content/benchmarks/calvin.json) 的仿真任务及视频到动作模型，不等于独立真机成功率。 | 已有[世界模型比较](2026-11-09-world-model-robot-evaluation.md)提及，未见独立同名条目。 |
| [WorldArena](https://arxiv.org/html/2602.08971) | 分别评估视频质量和世界模型作为数据生成器、策略评估器及动作规划器；其论文描述在 RoboTwin 2.0 仿真环境执行政策评估与动作规划。 | 已有 [WorldArena 触觉与成绩核查](2026-11-10-worldarena-tactile-score-crosscheck.md)，不能把 EWMScore 直接当真机成绩。 |
| [World-in-World](https://world-in-world.github.io/) | 使用统一规划与动作接口，把生成的未来用于主动识别、问答、导航及机器人操作等闭环任务；与只看视频保真或只看机器人策略不同。 | 本地顶层字段未找到独立同名项；[WorldFoundry 现有入口](https://openenvision.org/WorldFoundry/docs/evaluation/benchmark-hub/world-in-world)已提供指标和导入说明，其自身注明不执行上游环境。 |
| [RoboWM-Bench](https://arxiv.org/abs/2604.19092) | 从生成视频提取动作后仿真执行；不同于本站 EmbodiedX 测硬件效率。 | 已有 [视频转动作研究](2026-11-10-robowm-execution-reproduction.md)。 |

综述把最后四项列为预测转动作桥接，不表示整个研究领域只有这四项。FMB 的 50 次是官方抓取环节的规定，不是整套多对象装配测试统一分母；本次未运行评测或现场装配。

## 深入一个未命中候选：FurnitureBench

[FurnitureBench 作者项目页](https://clvrai.github.io/furniture-bench/)提供八类家具的真机装配任务，以及配套仿真环境 FurnitureSim；还区分抓取、插入、拧紧等单项技能测试与完整装配测试。其文档提供低、中、高三档初始化随机程度；具体设置须看[官方配置说明](https://clvrai.github.io/furniture-bench/docs/tutorials/furniture_bench.html)。项目还提供 5,100 条、219.6 小时的成功遥操作演示：这是数据集规模，不是模型测试的尝试次数或成功数。家具任务列表另有 one-leg 子任务，不能把九个数据条目笼统说成九类完整家具任务。

一个直接说明为何要保留运行条件的例子：[DAM-VLA 论文](https://arxiv.org/html/2603.00926)将 FurnitureBench 的 One-Leg 放在**仿真评测**中，对随机初始摆放进行了 50 次尝试，报告第五步的最终任务成功率为 56%；论文另有真机抓杯放碗实验。这个 56% 不能描述成真机家具装配成功率，也不能代表 FurnitureBench 所有家具或所有随机难度。论文报告第四步 62%，第五步 56%，也不能把两个阶段分别说成完整装配成功率。

前述 160 行机械对照和[本站机器人竞品盘点](2026-11-09-robotics-competitor-crosswalk.md)均未找到本站独立同名条目，但机械未命中不是全面缺失证明。已有 [Embodied Data Atlas 条目](https://embodieddataatlas.com/datasets/furniture-bench/?lang=en)整理任务、数据与研究用途，[Humanoids Data](https://www.humanoidsdata.com/datasets/furniturebench)也有数据规模和仿真介绍，不能把收录本身当作本站独占。代码仓库标有 [MIT 许可](https://github.com/clvrai/furniture-bench/blob/main/LICENSE)，但代码许可不自动覆盖数据、视频和模型；具体重用条件尚待核实。本次没有下载完整数据、运行模型或验证真机设备。

## 另外三个名称未命中项：评测与工具的区别

| 名称及一手来源 | 实际内容和本站盘点关系 | 使用边界 |
| --- | --- | --- |
| [ARNOLD](https://arnold-benchmark.github.io/) | 八项语言条件机器人操作任务，强调到达指定的连续物体状态，例如将抽屉开至指定程度；涉及不同物体、场景和目标状态的泛化。本站顶层字段按名称及作者仓库 URL 的有限检索未发现独立同名条目。 | 主套件基于 Isaac Sim；项目页另外描述单任务 PerAct 的小规模 Franka 真机迁移实验。不能将主套件所有成绩称为真机结果。项目页报告 10,000 条专家示范是数据规模，不是评估回合数。 |
| [robosuite](https://robosuite.ai/docs/overview.html) | MuJoCo 机器人仿真框架，也提供标准化任务；本地来源字段按名称有限检索未发现独立同名项。 | 仿真框架、某个具体任务、训练数据和模型成绩是不同层次；不能因名称出现在综述中就把它直接等同单个模型评测成绩。 |
| [robomimic](https://github.com/ARISE-Initiative/robomimic) | 从机器人示范学习的框架，提供数据与算法并支持基准复现；其文档有 [robosuite 数据说明](https://robomimic.github.io/docs/datasets/robosuite.html)。本地来源字段按名称有限检索未发现独立同名项。 | 它和 robosuite 存在工具及数据关系，但不是同一个项目；其[研究论文](https://arxiv.org/abs/2108.03298)同时研究仿真与真机任务，不能因为支持仿真就说全部是真机或全部是仿真。 |

[RoboVerse 文档](https://roboverse.wiki/dataset_benchmark/tasks/descriptions)称将 ARNOLD 八项中的六项迁移到其环境，生成适配轨迹；这不等于已覆盖原 ARNOLD 的所有任务和设置。[具身星图中文目录](https://zhuyun97.github.io/embodied-ai-learning/vla/papers/leaderboard)和 [Embodied Data Atlas](https://embodieddataatlas.com/datasets/arnold/?lang=en)也已收录 ARNOLD，故仅补录项目名称或基本解释不是独占优势。以上均是资料核查；未运行环境、下载完整数据、验证模型成绩或确认素材复用许可。

**ARNOLD 的具体判定与划分：**[原论文 v2 表 2 和表 3](https://arxiv.org/html/2304.04321v2)描述，OpenDrawer 有 25%、50%、75%、100% 四个目标，成功范围为目标值上下 10%，且物体状态要在该范围内保持两秒；因此“抽屉曾经打开过”并不自动意味着这项实验成功。TransferWater 还要求溅出的水少于初始水量的 10%，不能把抽屉规则生搬到所有任务。这里说的是论文中仿真任务规则，未验证其他版本的实现。

论文将数据分为 Train、Val、Test、Novel Object、Novel Scene、Novel State、Any State 七类：前三类是常规训练、验证和测试，后四类用于不同泛化条件。上述中文目录将其概括为“7 个泛化划分”，与论文分类不一致；这只是一个具体摘要口径差异，不代表该目录全部内容有误。论文表中各列合计 10,080 条示范；它们含不同数据划分，不等同 10,080 次模型测试。

## 中文资料和需求判断

已有[中文综述笔记](https://github.com/nkd-lkz/physical-self-evolution/blob/main/survey-rsi/papers/world-model-benchmarks-survey.md)介绍同一篇综述；[中文机器人笔记](https://github.com/ImChong/Robotics_Notebooks/blob/main/wiki/entities/worldarena.md)介绍 WorldArena 的多个版本；此外 [Embodied Data Atlas](https://embodieddataatlas.com/datasets/fmb/?lang=en)已有 FMB 任务、模态、来源和对比入口。资料存在不证明其完整或读者体验更好，但也不能把中文描述、资料导航及分项解释说成无人做。

与本站相关的可验证问题是让读者分清：真实机械臂完成率、仿真策略成绩、世界模型视频预测、视频转动作后的仿真执行各在回答什么。本站是否帮助用户比原论文或已有目录更快、准确地回答，仍需对照任务测试；当前无本站访谈、留存或付费证据。

## 附录：160 行逐项名称对照

本表逐行对应综述附录表 10；名称仅删除末尾文献作者和年份，不改写基准名称。四组沿用论文分组，组内原顺序不变。本次只统计带四位年份和五个单元格的原表数据行，不把组标题作为数据行；原表 160 行名称按原样精确去重仍为 160，因此本文未删除任何条目。论文作者此前按名称及 arXiv ID 的去重属于其采集方法，本次未独立核实，也没有在本地将同系列版本合并计数。

匹配列为本站顶层 ID、名称或别名的机械候选，**不是已确认相同协议或内容的项目**。“未命中”只表示该规则未匹配，并不等于本站没有同一评测、相关子集或研究记录。两个已查明误匹配单独标明；RoboTwin、SIMPLER / SimplerEnv 与 VLN-CE 的已知关联见正文。

| 序号 | 综述分组 | 综述原名 | 机械匹配结果 |
| ---: | --- | --- | --- |
| 1 | 策略与操作（37） | ARNOLD | 未命中 |
| 2 | 策略与操作（37） | BiGym | `bigym`（候选，未逐项确认） |
| 3 | 策略与操作（37） | FMB | 未命中 |
| 4 | 策略与操作（37） | Franka Kitchen | 未命中 |
| 5 | 策略与操作（37） | FurnitureBench | 未命中 |
| 6 | 策略与操作（37） | GRUtopia | 未命中 |
| 7 | 策略与操作（37） | KitchenShift | 未命中 |
| 8 | 策略与操作（37） | ManiSkill2 | `maniskill2`（候选，未逐项确认） |
| 9 | 策略与操作（37） | PerAct | 未命中 |
| 10 | 策略与操作（37） | PerAct2 | 未命中 |
| 11 | 策略与操作（37） | Ravens | 未命中 |
| 12 | 策略与操作（37） | RGB-Stacking | 未命中 |
| 13 | 策略与操作（37） | RLBench | `rlbench`（候选，未逐项确认） |
| 14 | 策略与操作（37） | RoboAgent | 未命中 |
| 15 | 策略与操作（37） | robomimic | 未命中 |
| 16 | 策略与操作（37） | robosuite | 未命中 |
| 17 | 策略与操作（37） | RoboTwin | 未命中 |
| 18 | 策略与操作（37） | VLMbench | 未命中 |
| 19 | 策略与操作（37） | GemBench | 未命中 |
| 20 | 策略与操作（37） | LIBERO | `libero`（候选，未逐项确认） |
| 21 | 策略与操作（37） | RoboArena | `roboarena`（候选，未逐项确认） |
| 22 | 策略与操作（37） | SIMPLER / SimplerEnv | 未命中 |
| 23 | 策略与操作（37） | THE COLOSSEUM | `colosseum`（候选，未逐项确认） |
| 24 | 策略与操作（37） | VIMA-Bench | 未命中 |
| 25 | 策略与操作（37） | CortexBench | 未命中 |
| 26 | 策略与操作（37） | GenManip | 未命中 |
| 27 | 策略与操作（37） | HandoverSim | 未命中 |
| 28 | 策略与操作（37） | Meta-World | `meta-world`（候选，未逐项确认） |
| 29 | 策略与操作（37） | RoboHive | 未命中 |
| 30 | 策略与操作（37） | Bi-DexHands | 未命中 |
| 31 | 策略与操作（37） | DeformableGym | 未命中 |
| 32 | 策略与操作（37） | DexArt | 未命中 |
| 33 | 策略与操作（37） | UniDexGrasp | 未命中 |
| 34 | 策略与操作（37） | CALVIN | `calvin`（候选，未逐项确认） |
| 35 | 策略与操作（37） | RoboCasa | `robocasa`（候选，未逐项确认） |
| 36 | 策略与操作（37） | VLABench | `vlabench`（候选，未逐项确认） |
| 37 | 策略与操作（37） | SoftGym | 未命中 |
| 38 | 具身导航、规划与社交（85） | Alexa Arena | 未命中 |
| 39 | 具身导航、规划与社交（85） | ALFRED | `alfred`（候选，未逐项确认） |
| 40 | 具身导航、规划与社交（85） | BEHAVIOR-1K | `behavior-1k`（候选，未逐项确认） |
| 41 | 具身导航、规划与社交（85） | CoELA (C-WAH/TDW-MAT) | 未命中 |
| 42 | 具身导航、规划与社交（85） | DialFRED | 未命中 |
| 43 | 具身导航、规划与社交（85） | EgoPlan-Bench | 未命中 |
| 44 | 具身导航、规划与社交（85） | EmbodiedBench | `embodiedbench`（候选，未逐项确认） |
| 45 | 具身导航、规划与社交（85） | EmbodiedCity | 未命中 |
| 46 | 具身导航、规划与社交（85） | EmbodiedEval | 未命中 |
| 47 | 具身导航、规划与社交（85） | HomeRobot OVMM | 未命中 |
| 48 | 具身导航、规划与社交（85） | LEGENT | 未命中 |
| 49 | 具身导航、规划与社交（85） | LH-VLN | 未命中 |
| 50 | 具身导航、规划与社交（85） | LoHoRavens | 未命中 |
| 51 | 具身导航、规划与社交（85） | LoTa-Bench | 未命中 |
| 52 | 具身导航、规划与社交（85） | MFE-ETP | 未命中 |
| 53 | 具身导航、规划与社交（85） | PARTNR | 未命中 |
| 54 | 具身导航、规划与社交（85） | PlanBench | 未命中 |
| 55 | 具身导航、规划与社交（85） | SafeAgentBench | 未命中 |
| 56 | 具身导航、规划与社交（85） | SMART-LLM | 未命中 |
| 57 | 具身导航、规划与社交（85） | TDW-Transport | 未命中 |
| 58 | 具身导航、规划与社交（85） | TidyBot | 未命中 |
| 59 | 具身导航、规划与社交（85） | VirtualHome | 未命中 |
| 60 | 具身导航、规划与社交（85） | Watch-And-Help | 未命中 |
| 61 | 具身导航、规划与社交（85） | CrowdNav | 未命中 |
| 62 | 具身导航、规划与社交（85） | Habitat 3.0 | `habitat-3`（候选，未逐项确认） |
| 63 | 具身导航、规划与社交（85） | HuNavSim | 未命中 |
| 64 | 具身导航、规划与社交（85） | JRDB | 未命中 |
| 65 | 具身导航、规划与社交（85） | JRDB-Act | 未命中 |
| 66 | 具身导航、规划与社交（85） | Melting Pot | 未命中 |
| 67 | 具身导航、规划与社交（85） | Overcooked-AI | 未命中 |
| 68 | 具身导航、规划与社交（85） | RoboSense | 未命中 |
| 69 | 具身导航、规划与社交（85） | SEAN | 未命中 |
| 70 | 具身导航、规划与社交（85） | SMAC | 未命中 |
| 71 | 具身导航、规划与社交（85） | SocialGym 2.0 | 未命中 |
| 72 | 具身导航、规划与社交（85） | SocNavBench | 未命中 |
| 73 | 具身导航、规划与社交（85） | Gibson Env | 未命中 |
| 74 | 具身导航、规划与社交（85） | GOAT-Bench | 未命中 |
| 75 | 具身导航、规划与社交（85） | Habitat | 未命中 |
| 76 | 具身导航、规划与社交（85） | Habitat 2.0 | 未命中 |
| 77 | 具身导航、规划与社交（85） | HM3D | 未命中 |
| 78 | 具身导航、规划与社交（85） | iGibson | 未命中 |
| 79 | 具身导航、规划与社交（85） | Matterport3D | 未命中 |
| 80 | 具身导航、规划与社交（85） | ObjectNav | 未命中 |
| 81 | 具身导航、规划与社交（85） | ProcTHOR | 未命中 |
| 82 | 具身导航、规划与社交（85） | RoboTHOR | 未命中 |
| 83 | 具身导航、规划与社交（85） | SoundSpaces | 未命中 |
| 84 | 具身导航、规划与社交（85） | Bench2Drive | 未命中 |
| 85 | 具身导航、规划与社交（85） | CARLA | 未命中 |
| 86 | 具身导航、规划与社交（85） | DriveArena | 未命中 |
| 87 | 具身导航、规划与社交（85） | MetaDrive | 未命中 |
| 88 | 具身导航、规划与社交（85） | NAVSIM | 未命中 |
| 89 | 具身导航、规划与社交（85） | nuScenes | 未命中 |
| 90 | 具身导航、规划与社交（85） | Waymax | 未命中 |
| 91 | 具身导航、规划与社交（85） | Waymo Open | 未命中 |
| 92 | 具身导航、规划与社交（85） | ACRE | 未命中 |
| 93 | 具身导航、规划与社交（85） | CausalCity | 未命中 |
| 94 | 具身导航、规划与社交（85） | CausalVQA | 未命中 |
| 95 | 具身导航、规划与社交（85） | CausalWorld | 未命中 |
| 96 | 具身导航、规划与社交（85） | CoPhy | 未命中 |
| 97 | 具身导航、规划与社交（85） | CRAFT | 未命中 |
| 98 | 具身导航、规划与社交（85） | Filtered-CoPhy | 未命中 |
| 99 | 具身导航、规划与社交（85） | Barkour | 未命中 |
| 100 | 具身导航、规划与社交（85） | Brax | 未命中 |
| 101 | 具身导航、规划与社交（85） | DERL | 未命中 |
| 102 | 具身导航、规划与社交（85） | HumanoidBench | `humanoidbench`（候选，未逐项确认） |
| 103 | 具身导航、规划与社交（85） | Isaac Gym | 未命中 |
| 104 | 具身导航、规划与社交（85） | Legged Gym | 未命中 |
| 105 | 具身导航、规划与社交（85） | AGENT | 未命中 |
| 106 | 具身导航、规划与社交（85） | BIB | 未命中 |
| 107 | 具身导航、规划与社交（85） | PHASE | 未命中 |
| 108 | 具身导航、规划与社交（85） | SocialAI | 未命中 |
| 109 | 具身导航、规划与社交（85） | ToMi | 未命中 |
| 110 | 具身导航、规划与社交（85） | R2R | `r2r`（候选，未逐项确认） |
| 111 | 具身导航、规划与社交（85） | REVERIE | 未命中 |
| 112 | 具身导航、规划与社交（85） | RxR | 未命中 |
| 113 | 具身导航、规划与社交（85） | Touchdown | 未命中 |
| 114 | 具身导航、规划与社交（85） | VLN-CE | 未命中 |
| 115 | 具身导航、规划与社交（85） | Bongard-HOI | 未命中 |
| 116 | 具身导航、规划与社交（85） | ComPhy | 未命中 |
| 117 | 具身导航、规划与社交（85） | LIBERO-Mem | 未命中 |
| 118 | 具身导航、规划与社交（85） | TEACh | 未命中 |
| 119 | 具身导航、规划与社交（85） | OpenEQA | 未命中 |
| 120 | 具身导航、规划与社交（85） | RoboVQA | 未命中 |
| 121 | 具身导航、规划与社交（85） | ALFWorld | 未命中 |
| 122 | 具身导航、规划与社交（85） | O-PIAAGETS | 未命中 |
| 123 | 世界模型与视频生成评估（34） | CATER | 未命中 |
| 124 | 世界模型与视频生成评估（34） | DEVIL | 未命中 |
| 125 | 世界模型与视频生成评估（34） | EVA-Bench | `eva-bench`（已证实误匹配） |
| 126 | 世界模型与视频生成评估（34） | EvalCrafter | 未命中 |
| 127 | 世界模型与视频生成评估（34） | EWMBench | 未命中 |
| 128 | 世界模型与视频生成评估（34） | FETV | 未命中 |
| 129 | 世界模型与视频生成评估（34） | IPV-Bench | 未命中 |
| 130 | 世界模型与视频生成评估（34） | StoryBench | 未命中 |
| 131 | 世界模型与视频生成评估（34） | T2V-CompBench | 未命中 |
| 132 | 世界模型与视频生成评估（34） | T2VScore | 未命中 |
| 133 | 世界模型与视频生成评估（34） | TC-Bench | 未命中 |
| 134 | 世界模型与视频生成评估（34） | VBench | `vstar-bench`（已证实误匹配） |
| 135 | 世界模型与视频生成评估（34） | VBench-2.0 | 未命中 |
| 136 | 世界模型与视频生成评估（34） | VideoCon | 未命中 |
| 137 | 世界模型与视频生成评估（34） | VideoHallucer | 未命中 |
| 138 | 世界模型与视频生成评估（34） | VideoScore | 未命中 |
| 139 | 世界模型与视频生成评估（34） | WorldModelBench | 未命中 |
| 140 | 世界模型与视频生成评估（34） | WorldScore | 未命中 |
| 141 | 世界模型与视频生成评估（34） | ContPhy | 未命中 |
| 142 | 世界模型与视频生成评估（34） | GRASP | 未命中 |
| 143 | 世界模型与视频生成评估（34） | IntPhys | 未命中 |
| 144 | 世界模型与视频生成评估（34） | IntPhys 2 | 未命中 |
| 145 | 世界模型与视频生成评估（34） | PHYBench | 未命中 |
| 146 | 世界模型与视频生成评估（34） | PhyGenBench | 未命中 |
| 147 | 世界模型与视频生成评估（34） | PhysBench | 未命中 |
| 148 | 世界模型与视频生成评估（34） | Physics-IQ | 未命中 |
| 149 | 世界模型与视频生成评估（34） | Physion | 未命中 |
| 150 | 世界模型与视频生成评估（34） | Physion++ | 未命中 |
| 151 | 世界模型与视频生成评估（34） | PhyWorldBench | 未命中 |
| 152 | 世界模型与视频生成评估（34） | VideoPhy | 未命中 |
| 153 | 世界模型与视频生成评估（34） | VideoPhy-2 | 未命中 |
| 154 | 世界模型与视频生成评估（34） | CLEVRER | 未命中 |
| 155 | 世界模型与视频生成评估（34） | WorldPrediction | 未命中 |
| 156 | 世界模型与视频生成评估（34） | Vista | 未命中 |
| 157 | 预测转动作桥接（4） | RoboWM-Bench | 未命中 |
| 158 | 预测转动作桥接（4） | World-in-World | 未命中 |
| 159 | 预测转动作桥接（4） | WorldArena | 未命中 |
| 160 | 预测转动作桥接（4） | WorldSimBench | 未命中 |

本附录用于内容盘点和查漏，不证明目标读者会反复使用网站。要判断能否吸引稳定用户，仍需对具体读者的使用、回访和内容维护成本开展验证。
