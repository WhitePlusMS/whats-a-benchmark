# 具身模型跨评测比较：实际问题、现有方案与版本差异

调查日期：2026-11-09。对照本地条目、公开论文、固定仓库快照和社区帖子；未运行模型或审计完整实验，也未进行用户访谈。论文、仓库的成绩与核验状态均是作者报告。

## 有人提出的具体问题

一名 [Reddit 发帖者](https://www.reddit.com/r/deeplearning/comments/1w1gf4t/do_vla_rankings_actually_hold_across_benchmarks/)询问同一 VLA 在 LIBERO、LIBERO-Plus、RoboTwin、RoboDojo 等榜单的排序为何可能变化，以及高分集中的 LIBERO 还有多大区分度。此人身份、应用场景和与任何项目的关联未知；这是一个公开问题，不是访谈或购买意向。评论对模型记忆的解释属于评论者观点，未由该讨论证明，不能当作排序变化的既定原因。

本站已有 [LIBERO](../../content/benchmarks/libero.json)、[LIBERO-Plus](../../content/benchmarks/libero-plus.json)、[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) 与 [RoboDojo](../../content/benchmarks/robodojo.json) 等评测说明；有训练示范和单次评测案例，但尚无覆盖这些评测的统一模型成绩库。相同模型名也不保证检查点、微调、评测种子和设备相同。

## 有人已经在做同类比较

[IndustrialVLA-Bench 论文 v2](https://arxiv.org/html/2609.25562v2)分别报告标准 LIBERO、LIBERO-Plus 视觉/机器人扰动、LIBERO-Para 指令改写及推理资源；固定 checkpoint 跨条件测试。以作者标为符合其协议的三项结果为例，标准 LIBERO 平均范围为 1.36 个百分点，而扰动平均和指令改写成绩范围分别为 14.62 和 23.10 个百分点。所有任务结果均为仿真，模型与设置有限，不证明所有模型如此，也不预测真实工厂。

论文对三次运行使用的随机种子 `{1,7,42}` 是运行级种子，不是只有三次机器人尝试：标准 LIBERO 每个模型每次运行 2,000 个 episode、共 6,000 个；文中 ± 是三次运行结果的总体标准差，不等于逐 episode 的置信区间。标准与扰动条件的数据集合、计数和聚合不同，不能简单把误差条混用。

[RoboSeed 固定版本 README](https://github.com/PrimitiveX/RoboSeed/blob/db28b03fcbeba2bf9a41b5ab6e6b29f72df47145/README.md)也围绕本地 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) 汇集不同模型的任务成绩、训练成本及证据；它说明部分模型每任务运行 5 次，其他为 100 次，未评估的 Randomized 结果留空。其[论文](https://arxiv.org/html/2610.40026v2)称因部署测量不全而暂不计算完整综合分。两者不与本站数据构成独立复现关系，未核验模型成绩。

这些是对“同一模型跨基准、分项、成本和证据”方向的直接竞争。它们提供不少可追溯资料，不能把跨评测解释和空值处理说成没有人做；也不能仅凭功能存在就断言它们对所有读者已足够。

## 同项目不同版本的证据状态表述不同

IndustrialVLA-Bench 的 [论文 v2](https://arxiv.org/html/2609.25562v2)将 OpenPI、GR00T-N1.7 和 FastWAM 标为符合其协议，UnifoLM-VLA-0 标为近似复现，Xiaomi-Robotics-0 和 Cosmos Policy 标为待核验，并限制严格排名范围。[仓库 README 固定提交 `3e15a631`](https://github.com/xiaoqi-7/IndustrialVLA-Bench/blob/3e15a6317a7f7a974e3a94dab373e81c256a8869/README.md)则称六项都满足协议核验清单。

两处状态表述不同；可能存在后续工作或版本变化，但本次没有查明对应审核记录或发生时间，不能判定任一说法错误，也不能把旧论文的待核验状态自动作为仓库当前状态。项目示例表中的各数值未由本站复算。检索结果应保留来源和版本，而不是静默把一方覆盖另一方。

## 对本站决策的含义

对于这类读者，可以测试一张覆盖三四个具体模型的关联卡：指出各数字的模型版本、数据集与扰动、实验和样本数、官方或第三方来源、作者报告的核验状态及缺失项，直接链接原始资料。先让读者用现有论文、RoboSeed 与本站卡回答同一问题并计时；若现有材料已经足够，或维护成本过高，应减少投入。目前没有此类测试结果，不能据一则社区帖子推断普遍需求。
