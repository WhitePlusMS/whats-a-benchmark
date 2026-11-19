# BotLandscape 具身目录及结果分析对照

核查日期：2026-11-09。对照本地工作树与 [BotLandscape 的 Robotics benchmarks 页面](https://botlandscape.com/benchmarks)，本次为公开页面及部分数据核查，不是网站交互验收、机器人复测或用户访谈。它的评测目录、结果区间和健康度有不同覆盖范围，不应把所有目录条目说成都有成绩分析。

其他聚合入口及同一 RoboDojo 成绩回查见[具身榜单聚合对照](2026-11-09-robot-leaderboard-aggregator-crosswalk.md)。

## 28 项目录与本地记录

对方页面的 Suite index 显示 28 行，包含评测、实体机器人评测配置和训练语料。以下以其单行名称为单位人工映射，不推断论文协议或数据一致；“未找到”仅指本地没有独立同名 JSON，不证明其他条目未提及。

| 对方目录条目 | 当前本地情况 |
| --- | --- |
| RLBench | [同名](../../content/benchmarks/rlbench.json) |
| CALVIN | [同名](../../content/benchmarks/calvin.json) |
| LIBERO | [同名](../../content/benchmarks/libero.json) |
| ManiSkill2 | [同名](../../content/benchmarks/maniskill2.json) |
| Meta-World | [同名](../../content/benchmarks/meta-world.json) |
| RoboCasa | [同名](../../content/benchmarks/robocasa.json) |
| VLABench | [同名](../../content/benchmarks/vlabench.json) |
| RoboTwin 2.0 | [同名](../../content/benchmarks/robotwin-2.json) |
| Google Robot、WidowX | 与 [SIMPLER](../../content/benchmarks/simpler.json) 涉及的两个机器人评测设置相关；配置或机器人不等同基准名称。 |
| FurnitureBench | 未找到独立同名条目。 |
| BEHAVIOR-1K | [同名](../../content/benchmarks/behavior-1k.json) |
| DexGraspNet、DexGraspNet 2.0 | 未找到独立同名条目；不可误配为 GraspNet。 |
| GAPartNet | 未找到独立同名条目。 |
| ALFRED | [同名](../../content/benchmarks/alfred.json) |
| Open6DOR | 未找到独立同名条目。 |
| Room-to-Room | [R2R](../../content/benchmarks/r2r.json) 是同一评测。 |
| EVT-Bench、OmniSpatial、OpenEQA、HumanTracker | 未找到独立同名条目。 |
| HumanoidBench | [同名](../../content/benchmarks/humanoidbench.json) |
| Open X-Embodiment、DROID、BridgeData V2、EI-30k、SynGrasp-1B | 未找到独立同名条目；对方将其列为训练语料，不能直接当成五项缺失模型排行榜。 |

按 28 行计数：12 行同名或同一评测，2 行与本地 SIMPLER 设置相关，14 行未找到独立同名条目。同名仅说明身份交集，不代表数据质量、任务版本、样例或结果相同；不同站点收录对象本来不同，这些数字不能外推为全部具身市场或本站 50 条评测的重合率。

## BotLandscape 不只是目录

- [Result intervals](https://botlandscape.com/results.html)描述在同一评测、数据划分、条件、指标和协议下，关联成绩、试验数、来源和区间；缺试验数时保留成绩，不显示区间。页面称对可用结果计算贝叶斯区间，并基于其方法对同榜结果作比较；[公开 JSON](https://botlandscape.com/catalogue/result-intervals.json)确有 LIBERO、LIBERO-Plus 和 SIMPLER 相关分项、来源或空字段。本次从网页读取 JSON，直接用脚本请求返回 403；没有运行其生成脚本或验算全部结果。
- [Benchmark health](https://botlandscape.com/health.html)介绍分数余量、扰动和仿真与实机比较；[方法说明](https://botlandscape.com/methodology.html)给出例如 95% 饱和阈值，以及仿真与实机作结论时至少 5 个共同策略等站方规则。网页卡片由 JavaScript 绘制，本轮没有完成浏览器交互验收；[对应 JSON](https://botlandscape.com/catalogue/benchmark-health.json)可见具体分项。站方阈值是方法选择，不是评测质量的普遍标准。
- 区间基于所选先验和试验模型；站方称由已发表百分比和次数推回成功次数，且部分记录只能近似。样本相关、任务平均或跨来源协议差异会影响解释。**同组未区分不等于证明模型等价；区间也不能消除测试协议差异。**本轮未对其统计流程进行独立审核。
- 目录的场景区把预览、录像、评测结果和复现状态分开；例如 LIBERO 的原始示范回放与站点生成记录被标记为不同来源，并提醒单次回放不是完整基准成绩。网页自报的内容状态未逐条验真；不能称所有录屏是模型成绩或所有模型都已复测。

## 与现有 LIBERO-Plus 条目同题核对

本地 [LIBERO-Plus](../../content/benchmarks/libero-plus.json)已说明按不同扰动比较成功率，并有一条标明具体任务、扰动和 seed 的第三方 smoke 运行，以及一条训练示范；它们不是完整模型榜。本轮未独立运行或验收媒体。

[论文表 1](https://arxiv.org/html/2510.13626)中，OpenVLA-OFT 在作者报告的无扰动、语言扰动、机器人扰动条件下分别为 97.1%、81.5%、37.2%；[BotLandscape 数据](https://botlandscape.com/catalogue/result-intervals.json)将其拆入不同条件并保留引用。数值仅代表该论文所述实验，不是本项目复测，也不能直接预测现实机器人或其他配置。该例说明分条件和溯源对理解成绩有帮助，同时它们已经是现有竞争能力，不是本站天然独有的功能。

对本站下一步的含义：如果继续研究结果解释，应在同一用户问题上比较本站、官方论文和这些已有页面的完成时间与误判，而不是单凭功能清单宣布差异化。目前没有该对照实验或留存、付费证据。
