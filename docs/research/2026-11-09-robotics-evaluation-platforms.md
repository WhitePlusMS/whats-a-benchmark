# 真实机器人与仿真评测平台：受测对象和指标比较

调查日期：2026-11-09。以下是公开材料和本地文件的对照；未实测机器人、复算成绩或核验所有网页交互。官网自述不能替代独立评价或客户访谈。

运行工具补充：[VLA 评测速度、逐回合一致性与现有选型表](2026-11-09-vla-evaluation-runtime-and-competitors.md)对照 LIBERO、RoboTwin 家族及多工具实验；未重跑或验证用户需求。

同题补充：[AA-Robotics 原表、本站样例与 Priors 转载](2026-11-09-aa-robotics-same-task-crosswalk.md)对照两项本地样例、八项分数口径和第三方六列分项展示。

## 机器人榜单并不测同一件事

| 平台与本地条目 | 受测系统和环境 | 结果如何读 | 与其他榜单比较的边界 |
| --- | --- | --- | --- |
| [AA-Robotics v0.1](../../content/benchmarks/aa-robotics.json)；[官方文章](https://artificialanalysis.ai/articles/aa-robotics/) | 通用语言模型配编码智能体，给机械臂接口和四路相机，控制真实 Hiwonder NexArm；首版八个桌面任务。 | 每项 0–100，完成得满分，部分进展得部分分，再平均；官网也展示任务视频、时间和部分抓取/错误分析。 | AA 测的是模型加编码智能体及接口组成的系统；不同厂商使用不同编码智能体。平均分含部分进展，不是八项任务的二元成功率，也不能代表工业吞吐。 |
| [Vals Robo-bench](https://www.vals.ai/benchmarks/robo_bench) | 通用模型控制机械臂和人形机器人；官方称在 MuJoCo 等实时物理仿真中进行，24 项任务中 3 项公开、其余保留。 | 每任务按顺序里程碑评分，官网提供均值、预估 API 成本和首次动作耗时。 | 名称虽带 robot，官方明确是**仿真**；与 AA 的真机、任务、控制频率、时限及评分不同。榜单数字不能直接跨站排一个总榜；未自行运行。 |
| [PhAIL 论文](https://arxiv.org/html/2605.29710)；[当前主页](https://phail.ai/) | 论文研究 Franka FR3 对四类物体的真机箱到箱抓放，比较已微调的 VLA 策略与同装置人工遥操作；主页当次列三个各自计分的基准，不能把论文实验视为整站所有测试。 | 论文用成功时间分布、限制时间内的表现以及以人类参考为锚的 HRT 和置信区间；hard failure 与可恢复超时区别处理。 | HRT 及时间分布不是 AA 的 0–100 任务进展分。作者说明同一模型与物体在相同装置上测试，但不同策略没有重放完全相同的初始实体状态；本次未审计原数据或重复实验。 |
| [RoboArena](../../content/benchmarks/roboarena.json)；[论文](https://arxiv.org/abs/2506.18123) | 评估者在真实场景让两种机器人策略处理同一任务，再给出偏好。 | 成对偏好用于排序；本地案例保留单次平局和原始反馈。 | 偏好排名不是固定任务成功率；同场景双盲比较也不是证明不同场次的任务、设备完全相同。 |
| [RoboDojo](../../content/benchmarks/robodojo.json)；[作者仓库](https://github.com/robodojo-benchmark/RoboDojo) | 使用独立报告的仿真和真机操作任务。 | 按官方协议区分环境、具体任务及能力维度；本地一段标准预算超时而延长后成功的素材是同一轨迹，不是两次独立试验。 | 一段演示或单次运行不是模型总体成功率。另见下文不同组织对其公开轨迹的再评分。 |

## 对已有评测轨迹的二次分析也有竞争者

[PRM-as-a-Judge 页面](https://prm-as-a-judge.github.io/leaderboard.html?benchmark=robodojo)展示 RoboDojo 与 RoboChallenge Table30 的入口，称用 Robo-Dopamine 生成过程指标，并提供按任务、仿真／真机切换的界面。其正文在 RoboDojo 仿真视图列 42 个任务、16 个模型和 6,076 条公开运行，同时另一处列 RoboChallenge 的 2,694 条运行；这些为页面对应视图的站方数字，不能混成同一数据集或重复相加成唯一运行总数。本次未实际切换界面，也未验证分数、源视频覆盖或模型评分可靠性。

它与本地 [RoboChallenge](../../content/benchmarks/robochallenge.json) 和 [RoboDojo](../../content/benchmarks/robodojo.json) 直接重叠：基准仍是上游任务，过程分析是该项目利用公开轨迹生成的额外评价。模型评分可能有误，应保留评分方、模型版本、依据与上游原始结果，不自动将其当作真人复核或独立物理实验。

一个可核对的具体例子：在 [PRM-as-a-Judge 1.5 报告](https://arxiv.org/html/2608.14284)表 2 中，RoboDojo 真机轨迹的 π0.5 一行列出二元成功率 SR **17.06%**、DRR **100.00**。DRR 是针对发生进度回退的轨迹，计算最大回退后恢复的比例；没有发生回退的轨迹不纳入该指标汇总。它不是“100% 的全部任务最终成功”或“每次物理故障都被恢复”，也不能仅凭两个汇总数字反推回退轨迹数、最终完成数或真实现场可靠性。

作者说明其过程分析使用原基准发布的运行视频，由 RoboDopamine 评分，不重新微调或修改被评测的机器人模型；这是对既有运行的二次分析。[报告附录 E](https://arxiv.org/html/2608.14284)将裁判模型导出的成功率与原榜比较，作者报告模型级平均绝对差仿真 1.57、真机 1.32 个百分点，但两种环境的聚合方式不同，不能把该数字当作每段视频正确率或对本次具体 π0.5 记录的独立核实。本次未运行裁判模型或审看轨迹。

[Robocurve](https://robocurve.org/)公开展示真机 RoboDojo-RC Tier 1 的分数、估算 API 成本与耗时，并声明每个配置 120 次尝试。2026-11-09 访问 `robocurvei.org` 上的两个详情入口曾返回 404；2026-11-10 进一步在 `robocurve.org` 找到[具体模型评测文章](https://robocurve.org/opus-5-5-robodojo-rc-tier-1/)、[分组运行入口](https://robocurve.org/all-runs/?benchmark=robodojo-rc-tier-1&leaderboard=pareto)和[固定代码版本 `4a7bdfb` 的协议](https://github.com/robocurve/robodojo-rc/blob/4a7bdfb3405a55e3354125b363596a9c23c76725/README.md)，上述 404 是旧访问观察，不能再说详细协议完全找不到。

- 该固定版 README 列出六项基于 RoboDojo 真机任务的改编：每项一个固定布置、每模型 20 次；每次按该任务 0–1 档位给部分进度分，再平均六项，因此 **120 次对应 6 × 20，不等于 120 个不同任务，平均分也不是二元成功率**。原任务使用 Piper X / ARX X5，该版本使用双臂 YAM，并细化部分分等级；不能直接把其成绩与本站 RoboDojo 上游原榜成绩合并。项目自述 mock 仅检查流程、不模拟这些任务。
- 结果文章提供了直接例子：其报告 GPT-6 Astra 和 Opus 5.5 分别在 120 次中完整完成 5 次和 1 次，但平均进度分分别为 36.7% 和 36.0%；`Cap Pen` 中该次所列三个模型都未完整完成，仍有非零平均进度。文章说明六项任务是先让 Astra 尝试 RoboDojo 18 项真实任务后，选出该模型得分最高、最容易的六项；因选择依赖同一模型的先前表现，这不是随机抽取的六项或对全部任务的无偏代表。文章还提供任务里程碑、演示与部分逐次记录；这里仅引用这组实验，不能推广至所有版本或模型。本次没有下载原始记录、逐条复算或验收视频。
- 评分来源仍需进一步确认：固定版 README 称其已发布分数由 `robodojo_astra` 模型裁判产生，同时支持人工评分；但上述具体模型评测文章写明该文每次试验由人工评分。两处文字的范围或历史关系尚未核对，不应选择其中一种说法推广到全部成绩，也不据此断定存在造假。README 亦区分了其当前裁判读取视频帧与已发布版本的处理差异，以及模型错误、基础设施错误和无评分试验的不同计数方式；若要引用具体成绩，应按每次运行来源和规则复核。
- 当前 [全部运行页](https://robocurve.org/all-runs/?benchmark=robodojo-rc-tier-1&leaderboard=pareto)页面当次展示 RoboDojo-RC 1,911 条分组运行，并包含其他 benchmark 的记录；筛选 URL 的动态状态、逐条视频和导出未验收，数量是快照而不是 1,911 个独立模型或标准化可比较的成功案例。该站已有真机结果、任务细节和来源展示，削弱了“只做具身榜单或任务解释就没有竞品”的假设，但不证明其所有记录准确或比本站适合所有读者。

## 使用者关注点和证据等级

- [仓储部署讨论](https://www.reddit.com/r/robotics/comments/1vmeaqq/has_anyone_deployed_vlabased_robots_in_production/)中，提问者想知道 VLA 实际用于哪些任务及需不需要采集微调数据；一位评论者自称所在公司使用传统模型处理大多数抓取、复杂情况升级到 VLA，并自报抓取指标。公司关联、任务条件与数字均未经独立验证，不能作为行业普遍水平或付费意向。
- [真实演示数据讨论](https://www.reddit.com/r/robotics/comments/1vsfwgl/the_gap_between_collecting_one_real_data_point/)中，发帖者描述机器人数据采集和整理的困难；一位评论者建议记录同步、遮挡、任务状态和人工干预。发帖账号可能有产品关联，且问题关于**训练数据质量**，不是明确要求公开 benchmark 网站。
- 更直接的已登记线索还有需求台账中的 RoboArena、GraspNet、HumanoidBench、VLN-CE 复现及数据问题；这些证明有具体研发疑问，不能通过数量推断市场规模。

**对项目的暂定含义：**可以围绕“我想比较的究竟是语言模型控制、策略执行、真实设备还是仿真”组织入口，再链接可靠的官方协议、逐次轨迹和已有分析。但 AA、专业基准官网、PhAIL、Vals 和过程评分站均已提供部分对应功能；要决定是否开发，仍需让具体读者在相同任务中比较现有来源与原型，并计量持续核对的维护成本。

## 新增：数据中心机器人评测及第三方成本口径

2026-11-10 检索本地评测 JSON 和研究文档，未发现 DataCenterBench 独立条目或此前专项记录；这只是本地名称检索，不代表全网缺少相关项目。[Robocurve 的 DataCenterBench Tier 1](https://robocurve.org/datacenterbench/)从设备手册拟定 19 个候选动作，保留 10 个在桌面装置可重置、可评分的单步任务，如翻开保护盖、转旋钮、连接线缆；采用两条真实 I2RT YAM 机械臂、三路相机和 Inspect Robots 智能体。被测者是通用模型加控制框架组成的系统，与本站 [AA-Robotics](../../content/benchmarks/aa-robotics.json) 都是真机械臂和通用模型，但任务、硬件、框架和评分不同；与本站 PLC 程序评测也不是同一测试。

它并非真实数据中心的完整维护作业：项目方称设备外观、阻力、空间和连接结构经过简化，没覆盖断电隔离、故障查找等完整流程，也未验证这些台架与真实设备的性能关系。每模型每任务三次，9 个模型、10 个任务共 270 次计分。五项评分为 0/1，另外五项允许 0/0.5/1；**平均分不是完整运维任务成功率**。两个模型裁判根据前后照片评分，分歧或不确定时由人复核；键盘任务还使用按键日志。受模型自身表现影响的过热或达到调用上限计入，特定外部故障的尝试排除后重跑；详情参见[方法说明](https://robocurve.org/datacenterbench/methods)。本次未观看轨迹或独立复核成绩。

### 同题聚合和成本差异

[Fireworks 的 DataCenterBench 榜](https://fireworks.ai/specialized-intelligence-index/benchmarks/robotics/datacenterbench-tier-1)直接展示 Robocurve 成绩及成本/耗时，[Playground 的跨榜指数](https://www.withplayground.ai/blog/robot-intelligence-index)也纳入该评测。因此“工业机器人评测介绍＋模型榜＋来源”已经有替代品；Playground 是跨不同任务和硬件的指数，不是额外一次实机评测。

针对同一个 GPT-6 Astra 记录，Fireworks 截至页面所标 10 月 30 日显示平均分 40.0%、约 215 秒、每任务 **$3.19**。[Robocurve 的结果导出](https://robocurve.org/datacenterbench/data/export-results.json)列 `avg_at_3=0.4`、平均 215.3 秒、`cost_per_task_usd=19.1184`，同时另列 `cost_per_task_usd_page_est=3.1864`。后者四舍五入与 Fireworks 一致，而前者恰为其六倍；Robocurve 方法说明 GPT 使用 ultrafast 服务、成本估算包括 6 倍倍率。两站快照可能不同，本次未取得账单或 Fireworks 的计算过程，不能断言第三方犯错或把 $19.1184 当作已支付金额；但若公开引用成本，应注明具体字段、时间、服务档位及是否包含加速倍率，而不能仅凭模型名合并。

同一导出的 Astra 三次整轮分数均为 0.4，导出的跨轮标准误为 0；该文件另列按任务重采样的区间 0.1667–0.65。它们描述不同的波动来源，前三轮数字相同不意味着对未来任务的成绩确定无误；本次没有独立复算区间或声称其统计假设必然成立。项目方也明确提醒每任务仅三次，相近分数不足以支持可靠的细排名。

一条相关[数据中心从业讨论](https://www.reddit.com/r/datacenter/comments/1uerk87/rethinking_humanrobot_collaboration_in_data/)有参与者讨论真实机柜拆装、线缆与现场条件；帖子由展示机器人方案的一方发起，回复身份与代表性未知。这只提供了“实验动作是否覆盖实际工作”的问题线索，不是本站用户或付费证据。具体产品机会仍需拿现有官网及聚合榜做读者对照，而不能因发现一个价格差异就认定具有独家护城河。
