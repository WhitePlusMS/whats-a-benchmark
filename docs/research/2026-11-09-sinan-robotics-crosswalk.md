# 司南机器人公开分数表：与本站条目逐项对照

核查日期：2026-11-09。范围为[司南机器人公开基准分数表](https://robo.sinanlab.com/benchmarks)本次读取到的 10 个二级标题和本地评测 JSON。对方页面显示“340 条分数、39 个模型、10 个基准”，均为其页面快照；以下以可见标题为单位，不把标题数当作 10 个互不重叠的独立测试。未逐个复核成绩、网站交互或机器人运行。

| 对方表格标题 | 本地相关条目 | 身份和范围 |
| --- | --- | --- |
| LIBERO sim | [LIBERO](../../content/benchmarks/libero.json) | 同一基准；该站按任务组和来源列成绩。 |
| SimplerEnv · Google Robot sim | [SIMPLER](../../content/benchmarks/simpler.json) | 同一评测系列的 Google Robot 设置。 |
| SimplerEnv · WidowX (Bridge) sim | [SIMPLER](../../content/benchmarks/simpler.json) | 同系列另一机器人和任务设置，与上一行不是两个独立框架。 |
| CALVIN sim | [CALVIN](../../content/benchmarks/calvin.json) | 同一基准；需区分环境与平均连续完成长度。 |
| RoboCasa sim | [RoboCasa](../../content/benchmarks/robocasa.json) | 同一系列；对方当前表中看到一项 24 任务、每任务 30 条示范的厂商报告，不能推广到整个系列。 |
| VLABench sim | [VLABench](../../content/benchmarks/vlabench.json) | 同一基准；对方此处的指标标题与表头存在需要澄清的差异，见下。 |
| RoboTwin 2.0 sim | [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) | 同一版本；对方列 easy/hard、clean/randomized 和部分不同任务数量，不能自动视作同一设置。 |
| Meta-World sim | [Meta-World](../../content/benchmarks/meta-world.json) | 同一基准；必须核对任务划分与训练配置。 |
| 真机评测（论文自报） | [GM-100](../../content/benchmarks/gm-100.json) 等部分任务相关 | 是不同论文、机器人和任务的混合分组，不是单一基准；站方也说明设置不同不可横比。 |
| 其他基准 mixed | 多个来源和任务 | 是混合分组，不是单一基准；不能用同名判断所有项目已被本站覆盖。 |

这说明已有中文机器人平台不仅收录了你项目中的多个评测，也汇集厂商/论文成绩和部分条件；不过它与本站的主要入口不同。本站现阶段以任务、评测说明及样例为主，项目文档不维护统一模型成绩库。任何数量差异不能直接证明一方整体更好。

## VLABench：进度分与成功率的可核查差异

1. 司南页面在 VLABench 概述处标为“指标：成功率 %”，但紧接着的表头为 `avg_progress_score`，X-VLA 行标 `51.1 Avg. PS`。这是**同一页面的文字标签与具体表头不一致**；表头和来源备注并非完全没有说明。
2. [X-VLA 论文表 2](https://arxiv.org/html/2510.10274) 将 VLABench 对应列标为 `Avg. PS`，X-VLA 数值为 51.1。[VLABench 原论文](https://arxiv.org/html/2412.18194) 把 Progress Score 定义为综合目标选择与任务步骤的渐进指标，并明确与二元任务成功指标区分。因此不应根据页面概述，把这条 51.1 解释为 51.1% 完整任务成功率。
3. 本地 [VLABench](../../content/benchmarks/vlabench.json) 的指标写“成功率与任务进度”，并提醒交互与非交互轨道需区分；它没有记录这条 51.1 模型成绩，也未给出完整进度分公式。不能因此称本站对全部指标解释更准确或已核验所有数据。

本次比对的是公开文本与论文表格，没有复算成绩或运行评测，也没有判断错误标签是否影响网页其他计算；页面可能随时更正。这个单点支持“将具体分数、原始指标和口径关联”有核对价值，但不能单独证明用户愿意使用或付费。
