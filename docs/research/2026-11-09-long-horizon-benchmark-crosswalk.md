# 长任务与机器人评测：同题对照和需求线索

调查日期：2026-11-09。此文对照工作区已有条目与公开官方资料；未运行基准、复算分数、全面验收媒体或访谈用户。

同题成绩补充：[OpenDrawer 本地与官方复评](2026-11-09-robocasa-open-drawer-score-provenance.md)追溯 LY-GWM 的作者本地和官方结果及对应 PR，并区别本站另一模型的单次运行。

## LADDER：过程、细分和成本已有官方实现

- 本地 [LADDER 条目](../../content/benchmarks/ladder.json)介绍三套仿真环境及实机，记录成功和失败的仿真运行、一次 WidowX 实机运行的固定来源、视频引用和元数据。记录中的样本是单次运行，不是整体模型分数；不在本次重新验收媒体。
- [官方研究页](https://ladderrobotics.ai/research)已经提供按套件和子目标数量区分的结果、成功率和子目标进度、成本、失败分析和部分真机结果，并指向[全部评测轨迹数据](https://huggingface.co/datasets/INSAIT-Institute/LADDER-Evaluation-Episodes)。站方描述数据包含视频、步骤日志和实机运行；本轮未逐条下载验收。
- 页面区分三套件等权平均与所有运行合并的成功率，10 任务的 LADDER-Lite 不能直接与完整基准比较；成本仅包括指定时间价格下托管模型的 API 费用，不包含低层策略和仿真 GPU。不能只抓一个百分比或费用数字混排。
- 官方已提供投稿及按日志重新计算分数的流程。本站可以帮助中文用户找到并理解不同口径、与其他基准做关系导航，但“视频 + 分数 + 原因分析”本身并非独占，也没有证据说明用户愿意为此付费。

## RoboCasa365：官方有排行榜与来源字段，复现条件会影响解释

- 本地 [RoboCasa365 条目](../../content/benchmarks/robocasa365.json)已有任务资料、数据访问与案例；本次没有检查所有样例文件是否可播放或逐条验证。
- [官方排行榜仓库](https://github.com/robocasa-benchmark/leaderboard)列 Atomic-Seen、Composite-Seen、Composite-Unseen 三类、共 50 个目标任务；标准与 agentic 提交通道在同榜、同任务划分展示。模板包含版本、代码提交、检查点和训练配置；仓库说明提交结果会验证，agentic 要求完整重跑。这里引用的是官方流程，不推断每条历史分数均已由本次独立复核。
- [LeRobot #4548](https://github.com/huggingface/lerobot/issues/4548)为个别开发者报告：特定检查点的任务名称与评测自然语言指令不一致，且文档中的摄像头映射与检查点不一致。报告中的两组数字涉及不同任务数量及运行次数，不能直接量化指令的因果影响。[相关修复提案](https://github.com/huggingface/lerobot/pull/4578)涉及映射与调用顺序；需单独核实合并及发布版本，本轮未运行。讨论中另一位用户提供的是 LIBERO 实验，不能冒充 RoboCasa 同题复现。
- [RoboCasa #216](https://github.com/robocasa/robocasa/issues/216)报告指定提交的部分布局可能在动作前满足成功条件；贡献者称已修复并关闭。须记录版本和状态，不能将历史缺陷直接推给当前结果，亦不能从 issue 推断影响了哪些排行榜项目。
- 产品上的可检验假设：针对具体模型—基准组合，关联任务分割、语言、相机映射、代码版本及问题的修复状态，可能帮助排查结果；现有官方文档和 issue 已有这些信息，是否值得集中整理仍需访谈和使用验证。

## REAL-Bench：解释与仿真/真机分开，官方也已呈现

- 本地 [REAL-Bench 条目](../../content/benchmarks/real-bench.json)的身份需要以其 `officialDefinition.sourceUrls` 与官方地址核对；本轮以官方项目同名条目为基准，不把其与其他 REAL 同名项目混淆。
- [官方项目页](https://internrobotics.github.io/REAL/)介绍 241 项任务及四类能力，呈现任务说明、示意过程、仿真模型结果表、失败类别以及独立的实机演示和实机结果。页面给出 60 次物理运行的总体指标；与四类仿真子集结果不应混为同一组分数。
- 不能因此声称官方已公开每条模型运行的完整日志，也不能把任务解说视为真实运行轨迹。官方已做可视化与多维结果，本站的潜在工作是将数据范围和任务意义跨项目对齐，而非声称首次解释该评测。

### 名称、资产与成绩的进一步核查

- **同名不等于同一评测。** 本站收录的是 InternRobotics 的机器人 [REAL-Bench](https://internrobotics.github.io/REAL/)；AGI, Inc. 的 [REAL Bench](https://theagi.company/blog/introducing-real-bench)是以网站副本测试浏览器智能体的独立项目，其 [SDK](https://github.com/agi-inc/agisdk)区分 v1/v2 任务。网页点击与机器人移动抓放的成绩、数据和来源不可仅凭名字合并。本地条目指向正确的机器人项目，但暂未列出同名消歧。
- **公开任务与可运行的完整资源不同。** [机器人项目仓库](https://github.com/InternRobotics/REAL)称已提供 241 个 YAML 任务配置，但仓库本身不包含场景资产、MesaTask 物体 USD、轨迹、训练数据或模型检查点；运行完整仿真还需额外资源。作者的 [REAL-Data 数据卡固定版本](https://huggingface.co/datasets/InternRobotics/REAL-Data/tree/d4bf9493cc9a13cf9b30b9e5ae7d934a51b81656)另列约 3.918 GB 的七个处理后 GRScenes 场景包，MesaTask 物体需另行获取；代码 MIT 与场景数据 CC BY-NC-SA 4.0 的条款也不同。上述为作者发布说明，本次只读数据卡和文件清单，没有下载或运行资产，也不推断完整训练数据已公开。
- **本地状态可能令读者误解。** 本地 `dataAccess.requirements` 复述项目首页的“数据集及模型权重即将发布”；[官网当前确有该字样](https://internrobotics.github.io/REAL/)，但它没有区分上述已有的七场景资源包、完整训练数据及检查点。该条目已于 2026-11-05 核验，建议后续核对后细分资源状态；本研究未更改产品数据，也未断言官网所称的 dataset 特指该场景包。
- **分数也是不同实验。** [论文 v2 表 1](https://arxiv.org/html/2607.13653v2)报告四类仿真任务成绩，例如 SFT+RL 的 SUL 为 **56.9%**；论文另报告 60 次真实机器人端到端运行总体 **78.3%**，低层技能评估为 600 次执行 **85.3%**。真实系统包括高层策略、MCP 接口、导航与单独微调的 π0.5 操作模型；这些百分比的任务和分母不同，不能表述成单个模型在同一测试集的前后变化。作者报告未独立复测。
- **目录空记录不是论文没有分数。** [Benchmark Radar 对应条目](https://benchmark-radar.org/benchmarks/claire-radar-2607-13653/)当次标记未审核且称没有已收录成绩，但论文表 1 和官网有作者报告的结果；只能说明对方目录这一条尚无记录，不能推断任何抓取故障或整站缺漏，也不能用本站无榜单当作成绩竞争优势。[HF 成员提出发布检查点的 issue](https://github.com/InternRobotics/REAL/issues/3)来自自述的 Hugging Face 开源团队成员，目的是邀请托管，不作为独立终端用户或付费证据。

## 初步决策含义

三项同题都已有较丰富的官方页面或提交规范。社区确实有人排查复现，但这只证明个别技术问题，不证明需要新的聚合网站，更不证明市场规模与付费。下一步应挑具体任务做用户验证，例如让研究者用两个已有来源回答“某次成绩在什么设置下产生、能否与另一结果比较”，观察卡点后再决定是否建设；不先扩大到所有模型成绩。

## 补充：LADDER 子目标全部完成不等于任务成功，索引也有信息缺项

2026-11-10 只读下载作者[固定版本逐回合索引](https://huggingface.co/datasets/INSAIT-Institute/LADDER-Evaluation-Episodes/blob/fa6cb3f0a89c0e55ec971cf1fe4fcca898640a36/index.parquet)，以 PyArrow 在内存中检查 20,464 行；文件 708,449 字节，SHA-256 为 `e2663f47b19cd9cfd56c6f63e85d949a410c82d14be2cea71550b2d629030e71`。其中论文十个系统各 2,024 行，共 20,240 行；另两种 LADDER-Lite 配置各 112 行，不应混入完整基准。索引只覆盖这批仿真运行，不能推断真机表现。

对十个系统，仅按索引 `success=false`、`goals_total>0` 且 `goals_done=goals_total` 筛选，得到 **339 条**；十系统索引有 **14,825 条**失败，另有 **94 条失败记录的 goals_total=0**，不应把这些记录当作已完成全部子目标。339 不是全量实际事件的保证，也不能逐条确定失败原因。论文附录另称在 **14,824 次失败**中约 **2.5%** 为所有子目标完成但违反顺序或排除规则；它与本次按索引字段筛出的数量和分母没有完全对齐，原因未查明，不能认定任一方有错或拿一方冒充另一方。[论文附录 H](https://arxiv.org/html/2610.18053)解释了顺序、排除规则及失败分析的口径。

有一个可定位的索引信息缺项：[Proprioceptive verifier / RoboLab-Long / comp_bin_2_distractor 的 episode 9](https://huggingface.co/datasets/INSAIT-Institute/LADDER-Evaluation-Episodes/blob/fa6cb3f0a89c0e55ec971cf1fe4fcca898640a36/proprioceptive_verifier/robolab_long/comp_bin_2_distractor/episodes/episode_9_2026_09_13_18_34_47_env0_put_everything_except_the_red_block_in_the_bin_failure/episode_meta.yaml)，索引列 `goals_done=0`、`goals_total=0`、`success=false`。同一任务的[原始逐回合日志](https://huggingface.co/datasets/INSAIT-Institute/LADDER-Evaluation-Episodes/blob/fa6cb3f0a89c0e55ec971cf1fe4fcca898640a36/proprioceptive_verifier/robolab_long/comp_bin_2_distractor/episode_log.yaml)中，按 `batch=2`、`batch_env_index=0` 定位的记录包含两个 `goal_objects`，`goal_trace` 最后在第 597 步为 `[true, true]`，该次 `success=false`。逐回合元数据的验证事件、步数和 env0 与这条日志相符，但索引中该行写 `batch=1`，与日志的 `batch=2` 不一致，不能仅依 batch 精确关联。任务汇总文件给出整组结果和类别，本次未独立判定该单次失败的具体原因或检查对应视频。

### 零分母记录的逐回合回查

继续检查同一固定索引的所有 20,240 条论文主结果，发现 `goals_total=0` 的记录共有 **144 条**：失败 94 条、成功 50 条，集中于 RoboLab-Long 的两个方法与 18 个“方法—任务”组合。逐个只读获取这 18 份 `episode_log.yaml` 和 144 份对应 `episode_meta.yaml`；在每组内使用环境编号与成功标记找到唯一日志行，再逐条核对元数据中的事件、步数与成功标记，144 条均匹配。匹配到的日志中 batch 与索引 batch 均不同；索引步数全为 0，元数据步数均大于 0。因此这些索引行不能按零步、无子目标理解。具体数据及下载路径均在上述固定版本中；本次未运行仿真或审查视频。

这 144 条中，94 条失败记录的日志最后一条非空 `goal_trace` 有 **4 条全部为 true**、90 条并非全部 true；50 条成功记录的最后一条轨迹均全部为 true。这只是按轨迹字段作的统计，不能自动断言 4 条都因违反顺序或排除规则而失败，也不能推断其他未回查记录没有索引与日志差异。将这 4 条加上此前按非零索引筛出的 339 条，得到 **343 条候选**，仍不能复现论文所说约 2.5% 或解释 14,824 与 14,825 的一个回合分母差异；未核对全部非零索引对应的日志及作者统计脚本，原因仍待查。

这同时说明两点：一是本站 LADDER 的单次成功、失败案例不应替代整个任务的约束与成绩；二是即使官方提供方便查询的索引，排查时仍可能需要返回逐回合日志。[数据卡](https://huggingface.co/datasets/INSAIT-Institute/LADDER-Evaluation-Episodes)已提供索引、日志和下载浏览说明，不能把这类溯源能力称为本站独有。是否值得围绕它构建功能，还需目标读者任务测试。
