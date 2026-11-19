# RL Research 具身目录：32 项逐名对照

核查日期：2026-11-09。[RL Research 的具身目录](https://www.rlresearch.ai/domains/embodied/)当次页面标为 2026-11-09 快照，列出 32 项；其中 29 项列有该站认定的相关来源，另 3 项列为未确认。该目录的分类和来源确认是第三方判断，不代表 32 项均是同类型、可直接收录的机器人基准。

方法：遍历本地 `content/benchmarks` 的 318 个 JSON，取顶层 `id`、`name`、`aliases`，忽略大小写和非字母数字后与以下目录名称做**完全匹配**。匹配命中 3 个；未命中 29 个，其中两个与本地环境或系列有关。该方法不搜索正文，不识别所有别名和父子版本，未命中不等于全项目未提及或确定应该新增。目录中的研究论文、子集、竞赛和数据集也不应自动当成独立条目。

| 目录名称 | 本地顶层名称匹配与已核实关系 |
| --- | --- |
| Done | 未命中；[作者论文](https://arxiv.org/abs/2605.08747v4)将测评框架称作 VIGIL，区分世界状态达成与正确结束报告；应继续核查本地是否有同一框架的其他名称。 |
| From Perception to Action | 未命中；[论文](https://arxiv.org/abs/2602.21015)是交互式视觉推理研究。 |
| DexHoldem | 未命中；[作者页](https://dexholdem.github.io/Dexholdem/)是灵巧手实体桌面操作、感知和闭环评测。 |
| Drive-P2D | 未命中；[论文](https://arxiv.org/abs/2601.14702v2)为驾驶场景视觉语言模型感知与决策评测。 |
| DriveBench | 未命中；[作者仓库](https://github.com/worldbench/DriveBench)是驾驶场景图像/问答评测，不能与实车控制的 [DrivingBench](https://drivingbench.com/)视为同一项目。 |
| RoboBench | 未命中；[作者论文](https://arxiv.org/abs/2510.17801)评估多模态模型的具身操作相关认知，不直接等同真机动作成功率。 |
| AirNav | 未命中；[作者论文](https://arxiv.org/abs/2601.03707v2)介绍无人机视觉语言导航数据集。 |
| ALFRED | 匹配 [alfred.json](../../content/benchmarks/alfred.json)。 |
| Beyond Binary Success | 未命中；[作者页面](https://metafine.github.io/)称其细粒度操作诊断框架为 MetaFine，不能仅以论文标题做唯一名称。 |
| Ego2World | 未命中；[作者论文](https://arxiv.org/abs/2605.13335v1)研究从第一视角烹饪视频构建可执行世界与规划。 |
| ERGeoBench | 未命中；[作者页面](https://kaixuewen.github.io/ERGeoBench/)提供主动视觉推理评测。 |
| LongAct | 未命中；[论文](https://arxiv.org/abs/2605.14504v2)关注自由指令下长期家务任务的规划。 |
| PInVerify | 未命中；[论文](https://arxiv.org/abs/2605.30639)是离线多视角目标实例核验，不能称作真机移动成功率。 |
| TVWorld: Foundations for Remote-Control TV Agents | 未命中；第三方目录本身将其与具身的关系标为未确认。 |
| WorldLines | 未命中；[论文 v1](https://arxiv.org/abs/2606.18847v1)研究长期家居助手的状态和记忆；是否与其他条目形成套件关系仍待核查。 |
| Wow-wo-val | 未命中；[论文](https://arxiv.org/abs/2601.04137v1)评估具身世界模型，不等同物理操作评测。 |
| BEHAVIOR 2025 Challenge | 顶层名称未命中；本站有 [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json)。[官方赛事](https://behavior.stanford.edu/challenge/archive/2025/index.html)是在该环境中的 50 项家务任务，属有关联的赛事/套件关系，不能算完全同一条目。 |
| Does VLA Even Know the Basics? | 未命中；[作者论文](https://arxiv.org/abs/2606.19297v1)称其行动式知识测试为 Act2Answer。 |
| Embodied Multi-Agent Coordination by Aligning World Models Through Dialogue | 未命中；[论文](https://arxiv.org/abs/2605.12920v2)是在已有 PARTNR 上研究多智能体交流，不能不经核查就当作独立通用机器人基准。 |
| Habitat Challenge | 顶层名称未命中；本地有 [Habitat 3.0](../../content/benchmarks/habitat-3.json) 相关环境，但本次未核对每一届赛事、赛道及使用版本，不把二者视为同一条目。 |
| RoboCasa365 | 匹配 [robocasa365.json](../../content/benchmarks/robocasa365.json)。 |
| CALVIN | 匹配 [calvin.json](../../content/benchmarks/calvin.json)。 |
| Can Segmentation Models Understand the World? | 未命中；[论文](https://arxiv.org/abs/2605.27764v1)涉及可供性推理研究，具体评测对象需进一步核实。 |
| CARLA Autonomous Driving Leaderboard | 未命中；[官方榜单](https://leaderboard.carla.org/)面向仿真驾驶，不能直接当作公开道路真机成绩。 |
| EmbSpatialBench | 未命中；[作者仓库](https://github.com/mengfeidu/EmbSpatial-Bench)涉及具身空间理解；与本地空间生物学 [SpatialBench Verified](../../content/benchmarks/spatialbench-verified.json)不是同一项目。 |
| ESI-BENCH | 未命中；[作者论文](https://arxiv.org/abs/2605.18746v2)研究通过交互获取信息的具身空间智能。 |
| MACE-THOR | 未命中；[作者论文](https://arxiv.org/abs/2601.11063v2)是多机器人协作研究，不能把论文名、方法名和评测环境自动混同。 |
| SpaceReject | 未命中；[作者论文](https://arxiv.org/abs/2606.16898v1)涉及具身问答及空间定位中不可回答问题的拒答。 |
| World-Ego Modeling | 未命中；[论文 v1](https://arxiv.org/abs/2605.19957v1)包含混合导航与操作的世界模型评测；框架与测试集的身份需分开核对。 |
| MindClaw | 未命中；目录列为未确认，暂不推断其为具身评测。 |
| LLawCo | 未命中；目录列为未确认，暂不推断其为具身评测。 |
| WM Bench | 未命中；目录列为未确认，同名项目和具体版本待核查。 |

## 一项真实评测的版本与分母问题：DexHoldem

作者[项目首页](https://dexholdem.github.io/Dexholdem/)展示 14 类实体操作、1,470 条遥操作演示、36 个感知问题；这些是不同类型的数量，1,470 条不是模型成功次数。首页给出 Opus 4.7 的严格问题准确率 34.3%、GPT 5.5 的字段平均准确率 66.8%，以及三个系统级案例；这些摘要数字与[论文 v1](https://arxiv.org/abs/2605.18727v1)一致。

[论文 v3](https://arxiv.org/abs/2605.18727v3)扩充了被测系统，报告 Opus 5.5 的严格问题准确率 49.1%、字段平均准确率 80.6%，并报告一个 agent–policy 配对的 33 次完整闭环尝试，其中 4 次完成；v3 不是说所有模型都进行了 33 次真机闭环。v3 正文称感知部分使用相同 36 个问题做三次模型运行，并非 108 个独立场景；有 5 次因实验人员设置错误作废的系统运行被排除。项目首页显示的三个案例与新论文中的总体实验也不能简单当作相同分母。

因此，34.3%、49.1%、66.8%、80.6%分属不同模型或指标；把首页旧榜首和 v3 新榜首拼起来，会产生误导。该案例说明核对作者网站、论文版本、被测模型、是否真机、试验数和人为介入有实际价值，但这仍不是用户会使用或付费的证据。

## 后续核验顺序

优先核实 DexHoldem 的成绩版本和任务入口、VIGIL 的别名、DriveBench 与 DrivingBench 的区分，再核对 BEHAVIOR 挑战赛和 Habitat 各赛季与本地环境的关系。新增条目与否需要再看数据可访问性、实际读者需求、维护成本及授权；本次没有添加评测、导入成绩、运行机器人或访谈用户，也未检查竞品完整数据库。
