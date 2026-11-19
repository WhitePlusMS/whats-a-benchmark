# MolmoSpaces：榜单、逐回合证据与成功口径

核查时间：2026-11-10。只读官方资料、公开讨论和一份固定修订的第三方评测索引；未运行仿真、模型、机器人或视频，未采访使用者，也未审计全部榜单。各外部成绩为其作者或提交方报告。

## 与本站评测及已有产品的关系

[MolmoSpaces](https://arxiv.org/html/2602.11337)是包含室内场景、物体资产、数据生成和评测工具的机器人研究生态；MolmoSpaces-Bench 是其中的评测套件，涉及导航、抓取、放置及门柜操作。[MolmoBot](https://arxiv.org/html/2603.16861)是采用该生态产生的数据训练及测试的模型工作，不能把平台、评测、数据和模型名称混作同一个产品。

本地 [RoboCasa365](../../content/benchmarks/robocasa365.json)及 [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json)也涉及家庭或厨房操作，存在任务主题重叠，但本次没有证据表明它们共享同一场景、机器人、指令或成绩协议。按 `molmospaces` / `molmobot` 等词检索本地 JSON 未见同名条目；这只是字符串检索，不排除间接关联。MolmoSpaces 可作为后续收录候选，是否发布仍需完整审核。

官方[榜单](https://molmospaces.allen.ai/leaderboard)及[评测文档](https://github.com/allenai/molmospaces/blob/36346dec297f54ed8ad9ddf99491610344f5c81f/molmo_spaces/evaluation/README.md)已提供任务、模型、数据及来源入口。页面需要 JavaScript；本次搜索索引曾返回详细榜单字段，但直接读取只返回 JavaScript 提示，未验收最新页面交互或全部动态成绩。第三方还有公开的模型运行日志与双视角视频索引，因此“任务解释、榜单、运行记录”并非无人提供。

## 过程曾成功与结束时成功

[MolmoBot 论文仿真评测](https://arxiv.org/html/2603.16861)把 oracle success 描述为执行过程中某时刻满足成功条件；抓取放置任务还报告结束时满足成功条件的比例。以其表 6 中 MolmoBot（F=2）的 Pick&Place 为例，论文报告两者分别为 **66.4% 与 57.7%**，每项仿真任务 1,000 次；这两数描述同一论文实验中的不同判定时点，不能简化成两个模型分数。论文说明其差距可能反映放置不稳定或模型继续操作等因素，并不单独证明某个失败原因。

[EFE 固定版 MolmoSpaces 适配](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/molmospaces/README.md)从八个任务族各选一个固定实例，各有 standard 和 privileged 两种交互模式，按回合结束时上游 `judge_success()` 评分。该范围不是 MolmoBot 论文每项 1,000 回合，也不是完整榜单；EFE 的代码智能体结果与原 VLA 策略评测不能直接混排。

## 独立复算：一份公开提交的 3,915 条记录

MagicLab 提交 [EchoPolicy-0 更新 #214](https://github.com/allenai/molmospaces/issues/214)，维护者在讨论中称已更新结果；提交方提供[固定修订数据卡](https://huggingface.co/datasets/ddffwyb/EchoPolicy-0-MolmoSpaces-eval/blob/69cc4e28a196b725f5f0c613b05bbf056bb3030d/README.md)和视频索引。原始提交 #199 与更新 #214 不是完全相同配置：更新说明列出工具、验证及抓放交接变化，还把 VLM 的 thinking level 从 low 调到 medium；不能把差距归因于其中某一项。提交方称其系统采用 Pi_05、VLM 与几何工具，未在该 benchmark 上额外训练模型；这不是评测方独立验证的模型内部实现。

本次在内存读取 [固定 Parquet 索引](https://huggingface.co/datasets/ddffwyb/EchoPolicy-0-MolmoSpaces-eval/blob/69cc4e28a196b725f5f0c613b05bbf056bb3030d/videos/episodes.parquet)，334,916 字节，SHA-256 `6dcaeef54eafdfcfe79b2e9bdc8a7a87c19ecf63c04d29d25253b486cae67623`。仅按索引列复算，没有下载或审查 7,830 个视频，也没有重新运行官方判定程序。

| 索引任务 | 记录数 | `success=true` | 比例 | `oracle_success=true` |
| --- | ---: | ---: | ---: | ---: |
| close | 915 | 835 | 91.26% | 835 |
| pick | 1,000 | 847 | 84.70% | 847 |
| open | 1,000 | 702 | 70.20% | 702 |
| place | 1,000 | 556 | 55.60% | 556 |

3,915 个 `episode_id` 均唯一，所读任务、两项成功标签、seed、步数、上限和 house 列无空值。四项**任务比例等权平均**为 **75.4392%**，与数据卡一致；把 2,940 次成功除以所有 3,915 次，得到**按回合合并**的 **75.0958%**。两者均是由同一批索引计算出的不同聚合口径，差异来自 close 仅 915 条而其他三项各 1,000 条；两者不代表两次测试结果。只核对索引与摘要的一致性，不代表已确认官方榜实时采用哪一排序或提交方的全部原始证据正确。

两项成功标签在这 3,915 行中逐行一致，且所有成功行的 `steps < horizon`、所有失败行的 `steps = horizon`；数据卡声明本次 `end_on_success=True`。这些观察与成功即停止的设置相符，但不能由标签相同证明模型成功后继续执行仍会稳定保持成功：它在这一运行里通常没有被继续测试。任务名 `pick` 与数据卡 `Pick-v1.1`/榜单 `Pick-v1` 的对应是提交方声明，未对两套原始清单逐条哈希比对。`place` 路径指的是 Pick & Place。

## 可查证的使用问题与已有处理

[vla-evaluation-harness #127](https://github.com/allenai/vla-evaluation-harness/issues/127)中，开发者希望取得逐步位姿以检查 LIBERO 轨迹是否进入禁区，而非把任务成功当安全。他最初认为接口无法提供所需状态；协作者解释已有可选路径后，提问者承认原判断有误，并进一步指出默认逐步记录和可选状态输出是两条不同路径，希望有更清晰的例子。issue 标记为 not planned；这不等于需求不存在，也不等于项目缺少可行接口。

只读核对其引用的 [LIBERO 固定源码 `4aeb436`](https://github.com/allenai/vla-evaluation-harness/blob/4aeb436/src/vla_eval/benchmarks/libero/benchmark.py)和[记录模块](https://github.com/allenai/vla-evaluation-harness/blob/4aeb436/src/vla_eval/recording.py)：默认 `send_state=False`，启用后会发送包含末端位置的状态；记录模块提供 `StepRecorder`。这支持讨论中对接口的部分描述，但本站未运行完整链路，不宣称所有 benchmark 都提供同样状态，更不能认为记录位姿就完成现场安全评估。该提问者的其他项目背景和身份未独立核实，不能直接当作本站用户。

## 真仿相关性的边界和产品启示

MolmoSpaces 论文报告抓取仿真结果与来自 RoboArena 筛选出的 752 条真机抓取回合进行比较，得到 Pearson 0.96 和 Spearman 0.98；论文说明真实侧采用 RoboArena 的部分成功判定，其他任务真实回合更少。这里的 752 是真实回合数，不是 752 个模型；相关性不等于绝对成功率一致或能够保障现场安全。[论文相关章节](https://arxiv.org/html/2602.11337)

可供验证的需求是：读者能否区分早停、终态、时间预算、数据来源和分母，以及找到实际运行证据。官方文档、原论文和公开数据卡已经解释了相当多内容，本站若做跨来源索引，需要与这些已有入口做读者任务对照；当前没有访谈、对照测试、回访或付费证据。
