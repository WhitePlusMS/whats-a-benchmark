# 具身榜单聚合站：同一成绩的来源和身份核对

调查日期：2026-11-09。核对本地工作树和公开网页；未运行机器人或逐项审计聚合站。网站可能更新，官方榜单动态页面通过网页工具打开时未返回正文，本次具体官方数字来自该站搜索索引的页面快照及其官网新闻，不代表已操作榜单交互。

## 与本站相关的三个已有入口

- [Bits 2 Atoms 机器人榜单](https://b2atoms.com/data/leaderboards/)列出 RoboDojo、RoboChallenge、RoboArena、RoboTwin 2.0、RoboCasa365 等第三方榜单，分别说明环境和部分指标定义，并注明抓取日期。本站已有 [RoboDojo](../../content/benchmarks/robodojo.json)、[RoboChallenge](../../content/benchmarks/robochallenge.json)、[RoboArena](../../content/benchmarks/roboarena.json)、[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)及 [RoboCasa365](../../content/benchmarks/robocasa365.json)资料；身份重叠不意味着全部任务和成绩已逐项匹配。该页是对外部结果的展示，不是该站重新实测。
- [embodiedrank 榜单](https://embodiedrank.com/en/classement/)显示模型与 benchmark 行、来源及采集时间，并称优先模型作者发布结果；[模型比较页](https://embodiedrank.com/en/comparer/)按 LIBERO、LIBERO-Plus、SimplerEnv、RoboTwin 等参考测试排列能力与多个模型。页面明确标识未测不等于零，并标识部分用其他测试均值近似的结果；这说明模型对照、通俗解释和缺失标记也已有产品提供。本次未操作动态选择器或核实所有来源。
- [EmbodiedIndex 策略页](https://embodiedindex.ai/models/policy)列不同基准的模型分数、来源和快照日期，页面自述未重新运行。它展示 [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) 和 [RoboChallenge Table30 V2](../../content/benchmarks/robochallenge-table30-v2.json)相关榜；分数可能分别是挑战赛 Q-score 或任务成功率，不能合并。该站另一页在既有需求台账中已有记录，此处补充具体页面，不作为独立用户证据。

## 同一模型、同一原榜的核对

### Table30 V2：综合分、成功率和发布主体

本站 [Table30 V2](../../content/benchmarks/robochallenge-table30-v2.json)收录按按钮的实机演示及盖章任务说明，不能当成下述模型运行结果。[LoopWAM 模型发布资料的固定版本](https://huggingface.co/datasets/loop-wam/loopwam/blob/6056976759363e95972bb71cbc5fd06924b160fb/README.md)对该真机评测报告四种机器人、30 个任务，每类机器人各一个多任务模型；同一行分别为 **56.80 综合分**、**43.33% 成功率**。四组成功率分别为 ALOHA 26.00%、DOS-W1 42.00%、ARX5 55.71%、UR5 76.67%，不能将 56.80 当作 56.80% 成功率。作者数据卡明确写综合分的任务权重为 10/10/7/3；用同一组权重对四个已四舍五入的成功率求平均可得到约 43.33%，但这项复算本身不能证明每项试验次数或实际汇总程序。2026-11-10 浏览器读取[官网任务详情](https://robochallenge.ai/benchmark_detail/table30_v2)，逐个统计 30 张任务卡的机器人标签，也是 ALOHA 10、DOS-W1 10、ARX5 7、UR5 3。此前我误称 10/10/7/3 只是推测、作者页面没有确认，属于漏读来源，现予以更正。

[官方技术报告](https://robochallenge.ai/robochallenge_techreport_V2.pdf)第 3.3 节写的是 ALOHA 8 项、DOS-W1 12 项、ARX5 7 项、UR5 3 项；假设将此数量用于上述成功率加权，会得到约 **44.40%**。技术报告与本次读取的官网任务卡及模型作者数据卡不一致，可能涉及不同时间或口径，但原因未核实；网页标有 `Last Update: 2026-05-28`，不能据此推断每张卡的历史变更时间。未取得 LoopWAM 当次完整逐任务日志或官方汇总实现，因此不认定任何成绩错误，也不把当前任务列表当作已验证的历史快照。[原论文](https://arxiv.org/html/2610.18873)亦区分 Score 和 SR，本次未运行模型。

当前官网任务卡按设备的记录：

| 设备 | 数量 | 页面任务 ID |
| --- | ---: | --- |
| ALOHA | 10 | `lint_roller_remove_dirt`, `pack_the_items`, `pack_the_toothbrush_holder`, `paint_jam`, `put_the_books_back`, `put_the_pencil_case_into_the_schoolbag`, `scoop_with_a_small_spoon`, `stamp_positioning`, `wipe_the_blackboard`, `wrap_with_a_soft_cloth` |
| DOS-W1 | 10 | `fold_the_clothes`, `hold_the_tray_with_both_hands`, `place_objects_into_desk_drawer`, `put_in_pen_container`, `put_the_shoes_back`, `stack_bowls`, `sweep_the_trash`, `tidy_up_the_makeup_table`, `tie_a_knot`, `untie_the_shoelaces` |
| ARX5 | 7 | `arrange_flowers`, `hang_the_cup`, `pick_out_the_green_blocks`, `press_the_button`, `turn_on_the_light_switch`, `water_the_flowers`, `wipe_the_table` |
| UR5 | 3 | `arrange_fruits`, `item_classification`, `shred_paper` |

[EmbodiedIndex](https://embodiedindex.ai/models/policy)列 LoopWAM 43.33%，页面同一标题写 `success rate` 和 `top score 56.80`，并注明来源及 2026-10-28 快照。列表所显示的 43.33% 与作者发布资料一致，但标题中综合分和成功率紧邻，读者应区分；不能称其把排行榜条目写成了 56.80%。2026-11-10 浏览器实际读取[官方任务详情页](https://robochallenge.ai/benchmark_detail/table30_v2)，也显示 LoopWAM 成功率 43.33%；本次没有完成完整官方榜单或逐次记录的交互验收。

另一处不能直接合并：[LoopWAM 论文表 1](https://arxiv.org/html/2610.18873)将 `VLA-DM0.5` 列为 Score 54.42、SR 40.67%；[Dexmal 的 OpenDM README](https://github.com/dexmal/opendm/blob/main/README.md)的 `DM0.5` 行写 Score 54.42、SR 43.0%。[KDDI 的技术说明](https://www.kddi-research.jp/english/topics/2026/100501.html)称其方法整合多种 VLA 的知识，其中包括 Dexmal 的 DM0.5；当前未核实两行是否为相同提交、权重、评测时间与条件。相同名称或综合分不足以证明同一实验，不能直接断言哪一方错误，也不能据此计算确定的模型胜负差距。已有 [Robrief 专题](https://robrief.com/en/articles/loopwam-deployment-rollouts-table30)也指出这两个数字，说明跨发布源解释并非空白。

真实数据工作线索：[Table30 初版数据讨论 #2](https://huggingface.co/datasets/RoboChallenge/Table30/discussions/2)中，使用者报告 LeRobot 转换慢和版本不兼容；项目成员建议一个当时的版本，另一使用者表示该版本仍不兼容，另有人提供固定提交经验。该讨论属于初版，不可直接套用到 V2，也没有独立重现；表明有数据使用问题，不等于已经验证本站产品需求。

以 InternW0-Δ 为例，RoboDojo [官方新闻](https://robodojo-benchmark.com/)记录 2026-10-21 加入真机榜的结果为 **38.9 / 31.7%**，2026-09-28 加入仿真榜的结果为 **30.77 / 23.91%**。官方[真机榜搜索索引快照](https://robodojo-benchmark.com/leaderboard?bench=realworld)明确前者分别位于 Score 与 SR 两列，并列出不同机器人组的分项；官方[仿真榜索引快照](https://robodojo-benchmark.com/leaderboard?bench=sim)显示后者。

Bits 2 Atoms 的 RoboDojo 表分别显示同名模型 **38.9 / 31.7%** 和 **30.8 / 23.9%**；第二组与官方索引相差的位数符合四舍五入。该页文字将 RoboDojo Score 描述为允许部分步骤得分，将 SR 单独列为成功率。聚合站声明其 RoboDojo 数据在 11 月 5 日抓取，官方更新到 11 月 3 日；这里只核对该模型两组聚合值，未复算或核验全部表格、交互和模型运行。

这不是两次独立证实模型表现：聚合站本身注明来自 RoboDojo。真机和仿真包含不同任务与装置，38.9 也不是 38.9% 完整任务成功率。本站现有 RoboDojo 条目展示的是任务说明、官方仿真演示和另一组织的一次仿真日志，**不是这两条 InternW0-Δ 榜单结果**。

## 聚合中的另外两个阅读陷阱

1. 同一聚合页 RoboDojo 表的 `Made by` 将 `Pi-05` 标为 `RoboDojo Team`；[Physical Intelligence 的 π0.5 发布页](https://www.pi.website/blog/pi05)显示该模型由其团队发布，而官方榜单使用的字段为 `Contributor`。这是一处具体字段含义可能混淆：模型创建方、微调/适配者、提交者和评测执行方不应自动等同；本站未审计该条具体权重的全部改动，也不推断整站所有归属均错。
2. embodiedrank 的模型比较页把 SimplerEnv WidowX VM 放在“结果能否在真实机器人上成立”的问题下，并以“realism”标注数字；[SIMPLER 原论文](https://arxiv.org/html/2405.05941)说明 Visual Matching 是仿真评测设置，并用真实与仿真结果比较相对表现和相关性。该页指标不能仅凭描述读成真机成功率或给定模型的真机预测概率；当前未逐条追溯其 73% 所对应的具体论文与模型配置。

## 对需求判断的影响

这些页面已经把榜单聚合、模型对照、部分来源和指标说明做成产品；单纯“加入具身排行榜”仍有直接竞争。来源、结果提交者与模型创建者分开呈现、指出环境及数据口径，可能帮助读者避免误解，但这些材料并不证明读者会为本站回访或付费。下一步应以同一道真实选型问题对照本站、官方榜单和上述入口，而非按页面数量或单个标签差异断言产品优势。

### 2026-11-10：Table30 V2 的多任务、零样本与公开反馈

[官方技术报告](https://robochallenge.ai/robochallenge_techreport_V2.pdf)第 4 节要求一类机器人的模型处理多个任务，并描述以任务开始前的加载／响应时间作为辅助检查；作者明确承认检查无法杜绝同时加载多个模型的路由方案。其任务级零样本与跨四种机器类型使用单一模型的更强主张，论文说并不核验，鼓励参赛者披露方法。[LoopWAM 论文](https://arxiv.org/html/2610.18873)明确从每种机器一个多任务模型出发，经三轮采集和训练，报告总成功率从 23.67% 到 43.33%；因此其结果不能仅凭“多任务”标签解释成一套固定权重零样本运行于四种硬件。未核验检查点或每次实际运行。

同一技术报告提出物体级和环境级零样本两种设置，并说明测试物体和场景不提供示范；报告明确写 CVPR 2026 预览比赛不以零样本或 OOD 功能计分，OOD 又被描述为以后开放的自查而非固定榜单。此处报告的是论文发表时的设计和计划，不证明目前已上线哪些赛道，也不能把任一 Table30 V2 榜单成绩直接称作零样本。

论文作者还描述，旧版参与者要求更高评测吞吐、关注公平性；逐任务训练 30 个模型需要大量算力，线上评测等待亦影响迭代。这是组织者对自身参与者反馈的概括，不是本站的用户调研。现有 [Table30v2 数据卡](https://huggingface.co/datasets/RoboChallenge/Table30v2)提供各机器人相机及状态字段、固定版本 LeRobot 转换示例，但示例针对 ARX5，其他机型需适配；本次未执行转换。对于本站，这是识别真实使用环节的线索，并非证明读者需要另一篇介绍或愿意付费。

## 新增目录及 COLOSSEUM 的环境分类冲突

[Robotics Center 评测目录](https://www.roboticscenter.ai/benchmarks)提供仿真/真机分类、任务标签及评测详情入口；其宣传还有每日更新的第三方排行榜，但本次页面的榜单部分停在加载状态，未验证数据更新及筛选交互。目录和[COLOSSEUM 详情页](https://www.roboticscenter.ai/benchmarks/colosseum)都将 COLOSSEUM 描述为真机评测，还展示 BridgeVLA 的 64% 成绩；该页面没有给出这一数字的具体实验来源和条件，本次不将其认作真机分数。

[COLOSSEUM 作者页面](https://robot-colosseum.github.io/)明确将其定义为包含 20 个操作任务的仿真基准，另有真实世界实验检验仿真扰动结果的相关性；所以“存在真机验证”不等于所有基准成绩都是真机运行。[本站 COLOSSEUM 条目](../../content/benchmarks/colosseum.json)已说明其仿真及扰动背景。本次仅对照这一个条目，不推断 Robotics Center 全站数据质量，也未追溯 BridgeVLA 64% 的原始实验。

另一个目录 [RL Research 的具身页面](https://www.rlresearch.ai/domains/embodied/)以 2026-11-08 快照列出 32 个条目，并给出原始来源及部分待确认标识；其目录也包含论文、任务以及环境相关内容，不能将 32 全部视作同类型的独立基准。比如其 [WorldLines 页面](https://www.rlresearch.ai/benchmarks/worldlines/)展示评测描述、论文链接和按该站方法给出的分级。这个分级是网站自己的整理标准，不是权威质量认证。未逐条核对该目录与本站的重合数量。

这些例子进一步表明，具身方向已有分类、解释、来源和商业服务入口；来源核验可能帮助避免误解，但上述冲突不证明本站整体准确率更高，也不证明有用户愿意为差异付费。

## 再核查：同一模型的来源追溯也已有详细产品

2026-11-10 直接读取 [RoboDojo 官方生成数据](https://robodojo-benchmark.com/data/leaderboard.generated.json)：返回对象的 `updatedAt.iso` 为 `2026-11-03T00:00:00Z`，包含 66 条仿真行和 14 条真机行。该文件是本次取得的一个快照；官网页面和搜索索引可能更新，不据此认定线上实时排名或把数组顺序视为排名。

其中 `GROOT-N1.7` 的仿真行记录综合分 **2.85**、成功率 **1.31%**；真机行记录综合分 **5.90**、成功率 **1.70%**，两行的团队字段均为 `RoboDojo Team`。[原论文 v3 表 1 与表 2](https://arxiv.org/html/2607.04434v3)分别给出相同两组数，并在训练细节中说明仿真与真机分别微调的步数。数值一致不等于核验了每个线上检查点或证明两次运行使用同一权重；两个测试的任务和设备不同，不能把两个成功率相减当作真实迁移损失。

[HumanoidVersus 的 GR00T N1.7 页面](https://humanoidversus.com/models/gr00t-n1-7)已经按论文及不同榜单快照分组，分别列出上述仿真成绩的综合分、成功率、维度、来源、团队、任务条件与未确认字段，并对不适合直接比较的另一项结果另行标记。这是与“将模型成绩、版本、来源和缺项放在一起”的构想高度重合的具体竞品；该页面的其他结果和历史快照本轮没有逐项复核。其数据源与原论文／官方榜有继承关系，不能将数字一致当成三次独立复测。

[The Robot Economy 的 RoboDojo 分析](https://www.theroboteconomy.news/articles/robot-benchmark-scores-trial-counts-evidence/)已经针对本研究上文的 InternW0-Δ 同一结果解释进度分、成功率、不同机器人对应不同任务组合及计划次数。直接读取的官方数据中，三组成功率为 ARX X5 **50.0%**、Piper **31.7%**、Piper X **13.33%**；官方任务目录列出各平台不同的六项任务。差异同时涉及平台和任务，不能归因于单一硬件。文章中的协议次数是根据规则计算，并非对该条逐次日志的审计，也不是对真实部署运行时间的测量。

[Pebblous 的榜单比较报告](https://blog.pebblous.ai/report/robot-action-model-ranking-vs-leaderboard/en/)还比较一份模型榜和 RoboDojo 历史榜的缺项、提交主体及模型版本；它明确指出未上榜不等于能力差，并讨论提交选择和模型代际等混杂因素。其历史行数及归因是文章作者的统计与解释，本次没有重建其全部历史榜或核实来源帖；该文是已有内容与商业机构的分析，不是独立潜在客户访谈。

[Playground Robot Intelligence Index](https://www.withplayground.ai/blog/robot-intelligence-index)也把包括 RoboDojo、RoboTwin、AA-Robotics 在内的公开成绩做跨榜排名，提供仿真、真机及任务类型视图，并公开权重、模型匹配方式和不确定性方法。它将同名同版本但针对不同测试微调的策略归为同一模型，且说明部分榜单间仅靠少数共有模型连接；这使其指数不能简单理解为某个固定权重在某台机器人上的能力。本次未复算其指数或验证全部交互；该公司同时提供评测服务。

对本站的直接影响：**数据溯源、缺项标记、区分真机仿真和跨榜解释已有具体替代品**。站内 [RoboDojo 条目](../../content/benchmarks/robodojo.json)现有视频和运行截点提供具体任务阅读入口，但尚未证明其比上述来源更易用。未来试验应让读者对同一模型回答“哪个是成功率、谁测的、两组任务是否相同、还有什么未知”，与官方文件及这些已有页面对照；尚未进行该试验，也没有证据表明读者会回访或付费。

## 2026-11-10：BridgeVLA 的 64% 原始论文对照

此前本文件写明没有追溯该分数；现在找到 [BridgeVLA 论文同名 64.0% 仿真结果并复算其 14 列](2026-11-10-colosseum-bridgevla-64-trace.md)。第三方页面未标具体来源，所以仅凭同名同数不能断定它确实转载了该论文。原版作者 README 的异常回合说明有措辞歧义，固定代码未证明实际补跑记录或成绩偏差。

## 2026-11-10：开源星图跨领域模型榜

浏览器只读核验 [开源星图模型评测](https://openstarmap.com/zh/benchmarks/models)：同一界面提供 AA Intelligence Index 和机器人评测等多个榜单选择、模型结果并排展示、中英文界面及原榜入口。机器人分类列出 RoboCasa365、RoboColiseum、RoboDojo Real、RoboDojo Sim、RoboTwin 2.0、VLA-Arena、BEHAVIOR Challenge；其中 BEHAVIOR Challenge 当时标为无站内数据，RoboDojo 真机与仿真也是同一项目的两个配置，不能把七个选项视作七个均有数据的独立评测。

该站的 RoboDojo 真机表当时显示 14 条结果；同时选中仿真榜后显示 68 行合并结果。InternW0-Δ 行的真机综合分为 **38.9**、仿真综合分为 **30.77**，对应页面排名分别为第 2 和第 15。官方同名记录还分别报告成功率 **31.7%** 和 **23.91%**，两种数值不能混为一谈；两个环境使用不同任务和设备，也不能仅凭模型名称认定权重相同。聚合站注明数据来自公开榜单并链接 RoboDojo，上述一致是来源继承，并非独立复测。合并行数也不能直接当作去重后的模型数量；本站未核验其匹配算法及完整数据。

同一时点，[RoboCasa365 聚合详情](https://openstarmap.com/en/benchmarks/models/robocasa365)默认选中 Atomic Seen Success，HexaShell 1.5 为 **91.10**；[官方榜](https://robocasa.ai/leaderboard.html)将该模型的 Atomic-Seen 写为 **91.1%**，但首页默认排序的 Overall 为 **85.6**，二者是不同指标。聚合详情当时显示 25 行、页面显示榜单更新于 22 天前；官方页面显示 23 个模型及更新日期 2026-11-01。两处展示集合和更新时间不一致，但本次未核实数据更新机制、条目纳入规则或每行来源，不能仅据此判断哪边有错误或归因于同步延迟。

本地已有 [RoboCasa365](../../content/benchmarks/robocasa365.json)、[RoboDojo](../../content/benchmarks/robodojo.json) 和 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) 条目；当前条目是评测资料，不是上述完整模型榜。AA Intelligence Index 本地也有条目，但与聚合站模型成绩页并非同一种数据。这个竞品说明“通用模型榜与机器人榜集中查看”也已有直接替代；差异是否足以形成使用理由仍需真实读者比较，不能由一次页面核对推断商业价值。

## 2026-11-10：机器人模型六维证据卡与恢复率口径

此前核查过 Bits 2 Atoms 的第三方榜单；本次补查其另一页 [AI Model Performance](https://b2atoms.com/data/policy-scorecard/)。该站提供成功率、扰动、指令、恢复、速度及人工干预六个维度，区分真机、仿真、未披露，记录来源、次数和证据等级，展示同策略/同任务的仿真—真机配对与来源；页面和方法说明还提供数据下载及 MCP 入口。它直接覆盖“具身模型多维选型＋来源解释”的一部分；本次未调用 MCP、验收所有交互或证明其数据均正确。

只读下载其 [JSON 数据](https://b2atoms.com/data/policy-scorecard.json)并统计：当前读取到 15 个模型 × 6 个维度共 90 行，38 行 `published`、52 行 `owed`；38 行中按其 `setting` 有 21 行真机、17 行仿真，按其分级有 35 行 B、3 行 C、0 行 A。该文件内标注来源核查日期 2026-10-23，文件 50,675 字节、SHA-256 `bc8b441139a3678f93453741d594d041ef719e011dad3853f7d83382af965c85`；这只是本次文件快照和对方分类，不代表所有文献中都没有其标记缺失的资料，也不评价证据本身质量。

以 SmolVLA 为例，对方记录的 SO-101 四任务成功率为 32.5%，恢复率为 3.23%。[上游论文 v2](https://arxiv.org/html/2606.08881v2)表 3、表 5 有相同数值；每任务 20 次、四项合计 80 次任务尝试，表 6 的恢复机会为 4+8+16+3=31 次、成功恢复 1 次，1/31≈3.23%。论文称在执行中识别失败恢复机会，四项任务均使用真实机器人且每任务 100 条示范微调；这是论文报告及表格算术核对，没有核查原始轨迹。

需要保留的区别：B2A 的[方法页](https://b2atoms.com/data/methodology/)在六维总说明中将恢复率写成“注入失败的恢复比例”，但上述 SO-101 论文描述的分母是执行中识别的恢复机会，并未在所查定义中说明这些机会均由受控注入产生。因而不能单凭同名指标把该 3.23% 解释成受控故障注入成功率，更不能拿 80 次任务当 3.23% 的分母；当前不能推断聚合方是否使用其他资料或其所有恢复条目均有此差异。

实际问题线索：[LeRobot #2915](https://github.com/huggingface/lerobot/issues/2915)中有使用者讨论 SmolVLA 在 SO-101 的微调与动作不稳定，其他参与者提供了不同经验，其中一条引用上述恢复率并提出训练建议；这些是社区经验，不是对个体故障原因的确认。[一个胶带座抓放项目](https://huggingface.co/Ajingu/smolvla-so101-tape-dispenser)的作者报告微调版 5/8、基础模型 0/8，指出抓取失误后的恢复问题，也主动说明样本很小；项目任务、训练和指标与上述论文不同，不能把两处数字混为同一个实验。社区反馈表明有人关注失败后的行为，但不能证明他们会使用本站或付费。
