# 中文具身资料目录与模型成绩：具身集同题对照

核查日期：2026-11-09。对照当前本地工作树、中文网站当次页面和部分官方资料；没有运行机器人、核验全部评测内容、访问统计或执行读者实验。外站会更新，本地状态不等同线上部署。

## 具身集目录的 26 行

[具身集评测基准筛选页](https://www.jushenji.com/projects?category=simulation&sub=benchmark)当次自报 26 项；直接读取 HTML 并提取不同 `/projects/` 链接也得到 26 个。网站同时组织模型、数据集、仿真、框架和硬件，[RoboTwin 详情](https://www.jushenji.com/projects/robotwin)包含简介、规模、适配机器人、来源和许可标签。该页已经覆盖“中文具身评测简介＋出处”的部分目标，不能将其称为只有成绩的榜单；未逐项验收筛选、数据和外链。

| 外站目录行 | 本地对应或当前查找结果 |
| --- | --- |
| RoboTwin | [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)；对方把 RoboTwin 系列与 2.0 合作一行，本站还有早期与 1.0。 |
| LIBERO | [LIBERO](../../content/benchmarks/libero.json) |
| Meta-World | [Meta-World](../../content/benchmarks/meta-world.json) |
| RLBench | [RLBench](../../content/benchmarks/rlbench.json) |
| RoboCasa | [RoboCasa](../../content/benchmarks/robocasa.json)；对方简介还提 RoboCasa365，本站[单独列 365](../../content/benchmarks/robocasa365.json)。 |
| BEHAVIOR-1K | [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) |
| SimplerEnv | [SIMPLER](../../content/benchmarks/simpler.json)，同项目不同名称。 |
| CALVIN | [CALVIN](../../content/benchmarks/calvin.json) |
| VLN-CE | 与 [R2R-CE (VLN-CE)](../../content/benchmarks/r2r-vlnce.json) 有明确系列关系；VLN-CE 还可包含其他路线数据，不能视作全系列都与该条目同一分数。 |
| HumanoidBench | [HumanoidBench](../../content/benchmarks/humanoidbench.json) |
| RoboDojo | [RoboDojo](../../content/benchmarks/robodojo.json) |
| ALFRED | [ALFRED](../../content/benchmarks/alfred.json) |

其余 14 行按本站 JSON 文件名与条目名称查找，未找到独立同名评测：**dm_control、RoboVerse、Gymnasium-Robotics、LocoMuJoCo、Bi-DexHands、1X World Model Challenge、CaP-X、RealMirror、RoboPianist、Inspect Robots、vla-evaluation-harness、RoboHive、Isaac Lab-Arena、RoboLab**。这仅是独立条目范围，部分已在其他研究记录或评测正文中提及；对方列项本身包括控制环境、框架或世界模型挑战，并非 14 个同性质机器人成功率榜。没有逐个核验这些项目全部功能、许可或最新版，不因目录出现即自动收录。

以外站 26 行为口径，12 行有本地同名或明确系列对应；同一外站行可能对应本站多个版本，不能将这一比例当本站 50 条具身评测的覆盖率、全网覆盖率或质量比较。VLN-CE、RoboTwin、RoboCasa 行尤其要保留系列/版本边界。

## 其余目录项逐项补查

下表以各项目本轮可读取的作者论文或官方资料为依据，说明**它是什么**，不是功能验收或收录承诺；相近项目也不能合并成绩。除 RoboLab 单列于下节，其余 13 行均已查到一手入口。

| 名称 | 官方资料显示的性质和用途 | 与本站及后续工作的关系 |
| --- | --- | --- |
| [dm_control / Control Suite](https://github.com/google-deepmind/dm_control/blob/main/dm_control/suite/README.md) | 连续控制仿真软件中的标准任务集，以状态、动作、奖励等测试控制算法。 | 可作为控制评测候选，不能把整个软件包当作单个机器人操作成功率榜。 |
| [RoboVerse](https://arxiv.org/abs/2504.18904) | 同时包含跨仿真器平台、合成数据与评测；具体协议需分别确认。 | 本地 [HumanoidBench](../../content/benchmarks/humanoidbench.json)已引用其第三方 stand 轨迹，不能把该轨迹当成官方测试成绩；统一评测可另作候选。 |
| [Gymnasium-Robotics](https://github.com/Farama-Foundation/Gymnasium-Robotics) | 使用 MuJoCo 的强化学习机器人环境集合，包含 Fetch、灵巧手等。 | 更接近环境库；其中具体任务和版本可单独研究，官方指出部分重构环境的动作/观测空间可能不同。 |
| [LocoMuJoCo](https://github.com/robfiras/loco-mujoco) | 全身控制与运动模仿学习评测/环境，含不同人形和四足模型。 | 与本站 [HumanoidBench](../../content/benchmarks/humanoidbench.json)在运动控制方向相关，但任务、数据和指标并不相同；代码、动作数据和模型许可需分别核查。 |
| [Bi-DexHands](https://papers.neurips.cc/paper_files/paper/2022/hash/217a2a387f52c30755c37b0a73430291-Abstract-Datasets_and_Benchmarks.html) | 双手灵巧操作仿真评测，面向强化学习及不同学习设置。 | 属于可进一步核验的独立评测；不同于本地双机械臂任务，也不能按名字等同 BiDex-100。另见[灵巧手调查](2026-11-09-dexterous-hands-benchmark-survey.md)。 |
| [1X World Model Challenge](https://github.com/1x-technologies/1xgpt) | 对机器人第一视角未来观测进行预测的世界模型挑战。 | 测量预测相关能力；不等于真实机器人自主完成任务的成功率，适合作为世界模型评测候选。 |
| [CaP-X / CaP-Bench](https://capgym.github.io/) | CaP-X 包含评测框架及 CaP-Bench，研究模型编写代码控制机器人；论文另有真机实验。 | 与本站 [CodeActionBench](../../content/benchmarks/codeactionbench.json)、AA-Robotics 的代码控制有任务层关联，但平台、工具接口及协议不同；应逐项查证后再比较。 |
| [RealMirror](https://github.com/terminators2025/RealMirror) | 面向人形 VLA 的数据采集、训练与推理平台，主要通过仿真支持研究。 | 偏平台工作流；具体论文评测和真机迁移证据需逐项复核，不能将项目目标写成已完成的真机验证。 |
| [RoboPianist](https://github.com/google-research/robopianist) | 用两只仿真人形手弹琴的高维控制与灵巧操作任务集。 | 可以作为独立专项目标评测候选；仿真弹奏分数不代表实体手的演奏成功率。 |
| [Inspect Robots](https://arxiv.org/abs/2610.06306) | 用于开发和运行具身能力及安全评测的模块化框架。 | 更适合标为工具入口；框架、具体测试和测得成绩应分别归属。 |
| [VLA Evaluation Harness](https://github.com/allenai/vla-evaluation-harness) | 跨评测运行 VLA 的框架；支持的适配器和版本应看具体文档。 | 已在[运行与竞品对照](2026-11-09-vla-evaluation-runtime-and-competitors.md)研究；工具不等于一个新的统一模型成绩。 |
| [RoboHive](https://arxiv.org/abs/2310.06828) | 面向机器人学习的统一框架。 | 可先作为工具和相关任务入口进一步查证，具体环境与基准需分开命名。 |
| [Isaac Lab-Arena](https://github.com/isaac-sim/IsaacLab-Arena/blob/main/docs/index.rst) | 在 Isaac Lab 上编写、运行和分析仿真策略评测的框架。 | 官方文档明确区分框架与其上构建的 benchmark；本站 LADDER 中的 RoboLab 相关内容不能自动视为完整收录该框架。 |

按当前项目“解释 benchmark”的定位，可先深入核查 **Bi-DexHands、LocoMuJoCo、RoboPianist、CaP-Bench、1X Challenge 和 RoboVerse 的具体评测协议**；框架类先作为相关资源候选。这个顺序仅依据用途与本地关联作研究排序，并未经过读者需求或维护成本验证。以上检查不代表已覆盖全部具身评测。

### RoboVerse 进一步核对：迁移不等于重新独立实测

[RoboVerse 论文](https://arxiv.org/abs/2504.18904)和 [RSS 正式论文](https://www.roboticsproceedings.org/rss21/p022.pdf)将 MetaSim、迁移和生成的轨迹数据、模仿/强化学习评测分别作为平台组成部分；论文的 510.5k 条轨迹统计针对其迁移的操作数据，不是 510.5k 个全新 benchmark 或同一模型的评测次数。本地 HumanoidBench 引用其 `stand` 轨迹，但文件没有测试划分和成功标签；不能根据来源就把它当本站或 HumanoidBench 官方成绩。

[RoboVerse #81](https://github.com/RoboVerseOrg/RoboVerse/issues/81)中，使用者报告特定 2025 年提交在 IsaacLab 重放迁移 LIBERO 时物体初始位置出现异常；维护者回复称对照原始状态值相同，猜测可能与跨模拟器迁移有关，问题后关闭。关闭状态不等于已经证明根因、所有版本已修复或本站样例受影响；本次没有运行或审计补丁。RoboVerse 官方 [2026 年 9 月路线图](https://github.com/RoboVerseOrg/RoboVerse/blob/main/ROADMAP.md)又说明不同模拟器的记录与重放验证进度不同，是项目方当时的状态描述，不能推断所有约 6,000 个注册任务在每个后端均验证通过。

已有中文[具身集 RoboVerse 目录](https://www.jushenji.com/projects?category=simulation&sub=benchmark)及 [SimBench RoboVerse 专题](https://everloom-129.github.io/SimBench/roboverse/roboverse_dashboard.html)提供介绍，后者对不同模拟器和来源基准已有整理；按来源、引擎和运行条件说明不是空白。这里是同题竞争与具体复现反馈，不是本站用户量或付费证据。

## RoboLab：与本站 LADDER 的具体关系

- [RoboLab 官方仓库](https://github.com/NVlabs/RoboLab)介绍基于 Isaac Lab 的机器人操作仿真框架，并列出 RoboLab-120 的 120 项任务，提供自动成功条件、多环境运行及含逐回合录像的结果面板。这是仿真测试，不是 120 项真实机器人实验；本次没有运行或检查交互。
- 本地 [LADDER](../../content/benchmarks/ladder.json) 已提及 RoboLab-Long。[LADDER 研究页](https://ladderrobotics.ai/research)将其作为 145 项长流程仿真任务中的一个套件，列 44 项；其他套件为 SimplerEnv-Long 的 54 项和 RobotArena-∞-Long 的 47 项。RoboLab-Long 与 RoboLab-120 有关联，但任务集、评测目的和成绩不能视为同一榜单；不能因为 LADDER 已提及就说本站已有独立 RoboLab-120 条目。
- [官方 RoboLab 榜单](https://research.nvidia.com/labs/srl/projects/robolab/leaderboard.html)已经列出成功次数、成功率、另一项 Score、设备及训练数据相关标记。例如本次读取时 π0.5 为 336/1200、成功率 28.0%，同一行 Score 为 43.4；Score 不能直接写成任务成功率。不同模型的试验次数、动作模式与训练来源可能不同，需回看对应条目和方法，榜单会更新。
- [开发者问题 #50](https://github.com/NVlabs/RoboLab/issues/50)中，报告者称在其 5,913 条评估记录中发现 30 条物理仿真异常，均以超时失败计；其分析的对象接触关系和原因仍属于报告者判断。问题当次显示开放，未见本次独立复现，不可推断官方榜单或所有用户的成绩受到同等影响。它是具体使用反馈，而非本站需求或用户规模证明。
- 项目[代码以 Apache-2.0 发布](https://github.com/NVlabs/RoboLab)，但[第三方及资产清单](https://github.com/NVlabs/RoboLab/blob/main/THIRD_PARTY_NOTICES.md)中有不同许可，包括部分非商业资产；若以后使用素材应分别核对具体资产及依赖，不能直接把代码许可套用到所有内容。

RoboLab 因已有独立评测、公开协议和本地相关入口，可作为**待评估补录候选**；是否纳入产品、如何维护及优先级仍需统一核验，不因出现在目录中自动加入。

## 一个值得核实的许可描述差异

[具身集 RoboDojo 页](https://www.jushenji.com/projects/robodojo)显示代码许可标签 MIT，但简介同时写“代码限非商业研究使用”。本次检查 HTML 原文两处文字确实同时存在；未发现其在该处解释两者适用范围。

RoboDojo 官方仓库于当次 `git ls-remote` 的 main 为 `f57e1633ffed59761bc8e568cfe7530c4b33381c`，[该提交根 LICENSE](https://raw.githubusercontent.com/RoboDojo-Benchmark/RoboDojo/f57e1633ffed59761bc8e568cfe7530c4b33381c/LICENSE)是 MIT；[官方数据集固定版本数据卡](https://huggingface.co/datasets/RoboDojo-Benchmark/RoboDojo/blob/1127bda94f172d757386945af3eb3a6754d1a4e6/README.md)标记 Apache-2.0。代码、数据、资产、依赖及历史版本可能分别适用条款；本轮未逐个审计所有依赖，也不确认外站文字对应哪个历史版本或组件，不能据此断言一切均可商业使用或断言外站描述一定错误。本站 RoboDojo 条目对数据与第三方日志有各自标记，不是对整套系统许可的判定。

## 其他中文现成方案：有分数和条件，不只目录

[具身开发者社区榜单](https://robotics.hellobike.com/leaderboards/)列 LIBERO 四个任务组的论文成绩、输入设置、训练条件和原始出处。例如同为 OpenVLA-OFT，页面列 97.1% 的多输入设置及 95.3% 的图像＋语言设置；[原论文 Table I](https://arxiv.org/html/2502.19645)有对应数值，且区分输入、数据处理和训练配置。它们是该论文中的仿真结果，不是本站或上述网站重新实测，也不应只凭两条数字断言某一种输入是唯一成因。此例说明中文领域已有分条件、溯源的成绩整理。

[VLA Benchmark Results](https://chancjy.github.io/vla-benchmark-results/)和[源代码](https://github.com/ChanCJY/vla-benchmark-results)公开 RoboTwin 2.0、LIBERO 的逐任务成绩展示页与维护方式；网页部分分数由脚本加载，本轮未核验 data.js 的每个模型、实验日志、运行条件或交互，也没有独立复评其结果。该项目说明个人也已尝试整理具身结果，不能将其页面自动等同独立标准化复测。

[数车子共识榜](https://shuchezi.com/leaderboard)说明想汇总 RoboDojo 等来源，但同页方法明确其具身模型榜当次为**示意分值**，正式权重待公布；不应把示意分当真实成绩或成熟已验证产品。

## 需求与竞争含义

这次进一步证实：中文具身资料、现有成绩和部分条件并非空白；本地条目的样例、可追溯性和版本是否能为特定读者节省时间，仍需与这些网站及原始资料进行同题任务对照。目录的 26 行与本站 50 条标记分别采用不同范围；既不能用数量宣布被完全覆盖，也不能以目录有未匹配条目证明具身一定是蓝海。本轮没有真实读者、留存或付费证据。
