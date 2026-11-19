# 本地具身清单与 Awesome Embodied Evaluation 名称对照

调查日期：2026-11-09。范围是本地 `content/benchmarks` 中 `status=published` 且含 `embodied` 字段的 50 条 JSON（版本分别计数），对照 [Awesome Embodied Evaluation 数据文件](https://github.com/ZetingLiu/Awesome-Embodied-Evaluation/blob/bed8fadbac75cbf51773112b50f5b4ed71cd99ac/data/benchmarks.yaml)固定提交 `bed8fadbac75cbf51773112b50f5b4ed71cd99ac` 中的 55 条记录：动作 27、推理/规划 18、世界模型 10。该项目也提供[对应中文目录](https://github.com/ZetingLiu/Awesome-Embodied-Evaluation/blob/bed8fadbac75cbf51773112b50f5b4ed71cd99ac/README_CN.md)。另一站的动作记录不等同本站 50 条具身筛选，两者定义和计数单位不同。

方法：读取固定提交 YAML 的 `benchmarks[].name`，与本地每个 `name` 小写化并移除非英文字母与数字后比较。**完全匹配是名称候选，不是已逐条验证身份、版本或数据的证明；未完全匹配也不是没收录。**随后人工查看拆分版本和常见别名；没有检索外站以外的所有页面，没有用全文提及替代目录条目。

## 12 条规范化名称完全匹配

| 本地条目 | 目录名称 |
| --- | --- |
| [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) | BEHAVIOR-1K |
| [CALVIN](../../content/benchmarks/calvin.json) | CALVIN |
| [THE COLOSSEUM](../../content/benchmarks/colosseum.json) | THE COLOSSEUM |
| [EmbodiedBench](../../content/benchmarks/embodiedbench.json) | EmbodiedBench |
| [LIBERO-Plus](../../content/benchmarks/libero-plus.json) | LIBERO-Plus |
| [LIBERO-PRO](../../content/benchmarks/libero-pro.json) | LIBERO-PRO |
| [LIBERO](../../content/benchmarks/libero.json) | LIBERO |
| [ManiSkill2](../../content/benchmarks/maniskill2.json) | ManiSkill2 |
| [RLBench](../../content/benchmarks/rlbench.json) | RLBench |
| [RoboArena](../../content/benchmarks/roboarena.json) | RoboArena |
| [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) | RoboTwin 2.0 |
| [VLABench](../../content/benchmarks/vlabench.json) | VLABench |

例如，对方对 LIBERO-Plus、CALVIN、RoboTwin 2.0 已列任务描述、指标和论文/代码链接；本站则提供各自的更多详细字段及样例。这里比较的是页面呈现，未验算对方成绩、内容准确性或用户阅读效率。

## 5 条名称不完全相同但有明确关联

| 本地条目 | 对方目录行 | 关系和限制 |
| --- | --- | --- |
| [RoboCasa](../../content/benchmarks/robocasa.json) | RoboCasa / RoboCasa365 | 对方合并为一行；不代表两个版本的任务和成绩完全一样。 |
| [RoboCasa365](../../content/benchmarks/robocasa365.json) | RoboCasa / RoboCasa365 | 同一合并行；不应算成两条外站目录记录。 |
| [RoboChallenge](../../content/benchmarks/robochallenge.json) | RoboChallenge / Table30 | 对方把平台和 Table30 合并，附官方站及数据链接。 |
| [RoboChallenge Table 30 V2](../../content/benchmarks/robochallenge-table30-v2.json) | RoboChallenge / Table30 | 行内明确给出 Table30 V2 数据链接；不意味与初版协议或成绩相同。 |
| [SIMPLER](../../content/benchmarks/simpler.json) | SimplerEnv | 同一相关仿真项目的不同写法；仍须依具体任务和版本比较成绩。 |

`SIMPLE` 不是 `SimplerEnv`：名称包含关系会误命中，故不算关联；`LIBERO-MAX`、`LIBERO-Pro2.0` 也不能因为包含 LIBERO 或 LIBERO-PRO 就算作相同版本。

## 其余 33 条未见规范化同名或上表所列别名

AA-Robotics v0.1、ALFRED、BiGym 2.0、BiGym、CodeActionBench、DexArena、EBiM Benchmark、Embodied Playground、EmbodiedLab、GM-100、GraspNet-1Billion、Habitat 3.0、HumanoidBench、LADDER、LIBERO-MAX、LIBERO-Pro2.0、ManipulationNet、ManiSkill3、Meta-World、R2R-CE (VLN-CE)、Room-to-Room (R2R)、REAL-Bench、RLE-Bench、RoboDojo、RoboEval Diagnostic Bimanual Challenge、RoboEval、RoboQuest、RobotArena ∞、RoboTwin 1.0、RoboTwin Early Version、SIMPLE、SuctionNet-1Billion、TOTO。

这仅表示固定 YAML 的名称比较没有确认对应行；外站可能使用别名、目录外讨论或在之后更新，也可能刻意不收录某些导航/历史版本。不能据此说本站独有 33 项，或得出双方覆盖率。

## 对需求和竞争的含义

该目录明确按推理/规划、动作、世界模型分类，行内提供任务简介、指标、论文及代码等；部分条目标记生态信息，星数和更新时间来自维护者手动刷新。这与本站“解释一项评测并给出处”的功能有直接重叠。本站较详细的样例与资料是否对读者更有用，需要同题测试；一方条目数更多或名称未匹配都不足以证明竞争优势。

后续应对其余名称搜索具体别名、历史版本、官方站和用户问题，并将条目加入本地[具身盘点](2026-11-09-embodied-inventory.md)和[需求台账](2026-11-09-embodied-demand-ledger.md)的持续核查，不能把本次名称自动匹配当作内容、许可或真实性验收。
