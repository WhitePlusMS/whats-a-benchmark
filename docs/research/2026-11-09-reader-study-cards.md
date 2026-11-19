# 评测资料阅读卡：候选试验材料

版本：2026-11-09。静态卡用于测试资料组织是否帮助读者找到依据；这是研究小样，**不是现有网站已实现的成绩功能**。数字是标明来源和日期的历史结果，不代表当前排行、本站独立复测或可用于不同协议的统一排名。

## A1 · SWE-bench Verified 的任务规模

**要读懂的问题：**“Verified 是 300 项”是否符合官方当前定义？

| 信息 | 记录 |
| --- | --- |
| 基准与版本 | SWE-bench Verified；官方榜页面同时列 Lite、Full 等其他集合。 |
| 数量 | Verified **500** 个实例；Lite **300** 个实例。两者是不同集合，不因都来自 SWE-bench 而互换名称。 |
| 来自哪里 | [SWE-bench 官方目录](https://www.swebench.com/)分别列 Verified 500、Lite 300；本地 [Verified 条目](../../content/benchmarks/swe-bench-verified.json)另说明测试及数据字段。 |
| 现有中文来源 | [Tuntang Verified 独立页](https://tuntang.top/benchmarks/swe-bench-verified/)也写 500；[其 SWE-bench 页面](https://tuntang.top/benchmarks/swe-bench/)当前写 Verified 300，两个页面的文字不一致。 |
| 边界 | 这里只核对名称和规模，不判断测试质量、所有版本或任何具体模型成绩；网站内容可随时更新。 |

## A2 · Terminal-Bench 2.0：同一模型，不同运行框架

**要读懂的问题：**57.5% 和 64.7% 两个数字能否直接归结为两个模型本身能力差距？

| 信息 | 记录 |
| --- | --- |
| 测试与模型 | Terminal-Bench 2.0；GPT-5.2-Codex。 |
| 谁报告的结果 | [Anthropic Claude Opus 4.6 系统卡](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf)，该数字是报告方的复测结果，不是本站运行。 |
| 两个设置 | Terminus-2：**57.5%**；Codex CLI：**64.7%**。系统卡将两者归于不同 harness，第二项给出 890 trials。 |
| 正确边界 | 数字差 7.2 个百分点；它们不是两个不同模型的直接对决。报告显示不同框架下结果不同，但仅凭这两个数字不能证明框架是唯一变化因素，也不能推断所有任务的差异。 |
| 本地相关 | [Terminal-Bench 2.0](../../content/benchmarks/terminal-bench-2.json)提醒模型、agent、试验次数和 verifier 版本会影响统计；它目前不记录上述成绩。 |

## B1 · VLABench：平均进度不是完成率

**要读懂的问题：**X-VLA 的 51.1 是否表示有 51.1% 的任务完全成功？

| 信息 | 记录 |
| --- | --- |
| 测试与模型 | VLABench；X-VLA 0.9B 的仿真结果。 |
| 原始结果 | [X-VLA 论文表 2](https://arxiv.org/html/2510.10274)将 **51.1** 标在 `Avg. PS` 列；表 15 展示四类结果及平均值。 |
| 具体指标 | [VLABench 论文](https://arxiv.org/html/2412.18194)把 Progress Score 定义为目标选择与子步骤完成的加权进度，区别于 0/1 的任务成功。51.1 不能直接读成 51.1% 的任务全部完成。 |
| 现有中文来源 | [司南成绩表](https://robo.sinanlab.com/benchmarks)概述写“成功率 %”，但 X-VLA 行与表头明确写 `Avg. PS`，并给出论文位置与分项；不是完全没有口径说明。 |
| 本地相关 | [VLABench 条目](../../content/benchmarks/vlabench.json)已提示交互与非交互轨道不同，但没有该条模型成绩或完整公式。 |
| 未确认 | 本卡不推断每项试验次数、现场机器人成功率或模型在其他任务的能力。 |

## B2 · RoboTwin 2.0：同一模型的不同测试条件

**要读懂的问题：**X-VLA 的 70.0 和 39.0 为什么不应当当作两个模型的结果？

| 信息 | 记录 |
| --- | --- |
| 测试与模型 | RoboTwin 2.0，X-VLA 0.9B；[论文表 2、表 16](https://arxiv.org/html/2510.10274)将其列为仿真结果。 |
| 两个条件 | 该论文分别报告 Easy **70.0**、Hard **39.0** 的平均结果，两个数字对应同一个模型在不同设置下的成绩。 |
| 背后条件 | [RoboTwin 2.0 原论文](https://arxiv.org/html/2506.18088)介绍仿真环境和随机化；[司南成绩表](https://robo.sinanlab.com/benchmarks)已并列 70/39，标注论文出处和部分训练设置。不能单凭这两个值确定单一失败原因。 |
| 训练设置 | X-VLA 论文附表 9 列 RoboTwin-2.0 适配配置，包括 Abs EEF、batch 128、60K steps、ColorJitter；因此不应将它说成该任务未训练的零样本表现。 |
| 未确认 | 本卡不推断该特定论文每个任务的实际试验次数或真实机器人表现；不同文章不一定完全遵循当前官方榜单默认协议。 |

本材料中的第三方对照只是一个可核查快照；如果页面变化，验证前应更新对应摘录和日期。原始论文中的结果为作者报告，不保证准确性、复现性或数据重用许可。

## B3 · DexArena：官网与论文不一致时如何处理

**要读懂的问题：**官网称 π0.5 在完整任务排名第一、平均 1.6%，能否把它当作已经确认的最终成绩？

| 信息 | 记录 |
| --- | --- |
| 官网快照 | [官方榜单](https://sipair-elastic.github.io/DexArena-website/leaderboard/)列完整任务平均 1.6%，其中 Cabinet & Pouring 为 2%、Package Opening 为 14%；页面称 π0.5 切换阶段策略。 |
| 论文 | [论文 v2 A.9 和表 16](https://arxiv.org/html/2611.02629v2)列上述两项及十任务平均为 0，但明确表示这两项属于尚待最终接受的结果，显示的十任务平均尚未验证；论文描述每个长任务固定一个合并训练的检查点，通过切换指令完成阶段。 |
| 可以得出的结论 | 两个第一方来源在数字和策略描述上存在差异；目前缺少能建立对应关系的检查点和逐次日志，不把论文的待确认 0 当作失败率，也不把网站 1.6% 当作已核实的最终排行。 |
| 项目现状 | [本站 DexArena](../../content/benchmarks/dexarena.json)展示的是任务及人工遥操作示例，并未展示该成绩；任务说明不等于自主策略评测。 |
| 竞品边界 | 官方已经提供分阶段、跨场景、完整任务、下载和条件说明；这张卡仅作为阅读和追溯材料，尚未经过读者对照实验。 |

补充核对与来源限制见[具身来源补查](2026-11-09-embodied-source-coverage.md)。

## B4 · R2R-CE：同一模型的两种观测

**要读懂的问题：**Qwen-RobotNav-8B 发布成绩为 72.1%，是否意味着单目摄像头也能达到这个成绩？

| 信息 | 记录 |
| --- | --- |
| 测试 | R2R-CE `val_unseen`，导航成功率 SR；[Qwen 报告 v3 表 1](https://arxiv.org/html/2606.18112v3)为作者自报的仿真成绩。 |
| 8B 全景 / 单目 | 分别为 **72.1% / 65.7% SR**；对应 SPL 为 **66.6% / 59.6%**。不能把全景数字直接当成单目结果，也不能断言观测方式是其他所有设置中唯一差异。 |
| 发布时间资料 | [官方 README](https://github.com/QwenLM/Qwen-RobotNav)摘要列 72.1%，但这张表的行内没有注明全景；完整论文已有区分。 |
| 已有替代 | [SimpleNav 表格](https://github.com/OpenBMB/SimpleNav/blob/main/docs/guides/BENCHMARKS_RELEASE01.md)已经将两种视角、模型大小及来源状态列出；其 Qwen 成绩未确认由 SimpleNav 独立运行。 |
| 边界 | 没有跑模型或访谈；当次官方仓库称暂时无发布权重计划。本站 [R2R-CE 样例](../../content/benchmarks/r2r-vlnce.json)属于另一团队的一次运行，不是 Qwen 72.1% 的逐回合日志。 |

详细出处和比较限制见[导航专项](2026-11-09-humanoid-navigation-crosswalk.md)。

## B5 · OpenVLA-OFT：仿真成功率与真机阶段分

**要读懂的问题：**同一篇论文里，LIBERO 的 97.1% 与 ALOHA 放物入锅任务的 51.25 分，能否作为同一模型“仿真到真机下降了 45.85 个百分点”的证据？

| 信息 | 记录 |
| --- | --- |
| 仿真结果 | [OpenVLA-OFT 论文 v2 表 I](https://arxiv.org/html/2502.19645v2)报告 97.1%：四个 LIBERO 仿真任务组成功率的平均。该配置采用第三人称及腕部相机、机器人状态和语言，使用过滤过的训练数据；作者的 OpenVLA 结果按每组 10 任务 × 50 回合统计。表 I 的不同方法并不全是作者重新运行。 |
| 真机结果 | 同一论文表 XIII 中，**OpenVLA-OFT+** 在 ALOHA 双臂真机“放指定物品入锅并盖盖”任务得 **51.25 / 100**；它是按顺序完成子步骤得到的加权平均分，不是完整任务成功率。作者报告该任务有 24 次评测，其中分布内、分布外各 12 次。 |
| 两种配置 | ALOHA 使用为各真机任务分别微调的 OFT+，增加 FiLM，输入为一个第三人称及两个腕部相机、机器人状态和语言；LIBERO 表 I 的 OFT 是另一配置。它们也不是同一个微调检查点或同一任务。 |
| 结论 | **不能**用两个数字相减得出仿真到真机性能降幅：指标、任务、平台和适配配置均不同。论文的阶段性评分表能说明特定实验在哪些步骤得分，但不能推断工厂部署效果。 |
| 已有资料 | 作者[项目页](https://openvla-oft.github.io/)已展示 LIBERO 和 ALOHA 实验；[具身开发者社区榜](https://robotics.hellobike.com/leaderboards/)已列 LIBERO 分项、配置和出处；[Robotics Center 模型页](https://www.roboticscenter.ai/institutions/models/openvla-team)也列 97.1%、输入及论文来源。本卡把这两个具体数字的比较边界集中呈现，不证明已有页面缺少相关说明，也不证明读者需要本站。 |
| 本地关联 | [LIBERO 条目](../../content/benchmarks/libero.json)说明仿真、任务及单次第三方录像，未展示上述模型成绩；本卡是研究材料，未修改站内榜单。 |

可用于对照试验：让同一类读者分别使用本站卡片和上述原文／现有页面，回答“51.25 是什么、能否与 97.1% 相减、还需查哪些条件”，记录答题依据与耗时。对照材料是否预先提供、查看顺序及页面更新要控制；目前没有进行用户测试，不能据此宣称本站更好。
