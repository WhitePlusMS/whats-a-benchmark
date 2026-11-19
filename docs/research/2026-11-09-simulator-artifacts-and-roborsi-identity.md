# 具身评测：仿真接触问题与同名系统口径

调查日期：2026-11-09。对照本站 RoboTwin 2.0、RoboDojo、LIBERO-Pro 条目及公开论文、代码文档；未运行外部评测、物理引擎或机器人，也未访谈使用者。动态页面为调查时快照。

## 与本站已有评测的关系

[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) 和 [RoboDojo](../../content/benchmarks/robodojo.json)包含仿真训练演示或单次运行样例，它们不代表完整基准成绩。[LIBERO-Pro](../../content/benchmarks/libero-pro.json)链接的 SenseNova-RoboRSI-Log 是公开运行记录之一，不是本站自行测试结果。

## 物理引擎现象：作者实验与限制

[SimuGuard 论文](https://arxiv.org/html/2610.41857)检查物体在仿真中接触后异常弹出的情况，提出记录物理步骤、筛选可疑接触、重放和控制参数以协助分析。作者在 RoboTwin 2.0 的 clean 设置中研究两种策略；对五个容器任务，他们报告将 PhysX 5.3.1 内的特定阈值改为较新值后：

| 模型及范围 | 原设置 | 修改阈值 | 约束 |
| --- | --- | --- | --- |
| LingBot-VA，五任务各 20 个有效 episode | 89/100 成功，其中 12 个 episode 被标记为异常 | 98/100 成功，0 个被标记异常 | 两边只有 83 个共同 seed；其中 8 个仅修复组成功、2 个仅原组成功，作者给出符号检验 p=0.11。 |
| HyVLA，同一组五任务、各 20 个有效 episode | 90/100 成功，其中 10 个被标记异常 | 94/100 成功，1 个被标记异常 | 属于不同闭环运行，不能单凭总数推断个体 episode 的因果变化。 |

RoboTwin 会先用脚本演示筛选 seed；演示未通过的 seed 不进入有效分母。研究作者报告两种设置被跳过的 seed 数也不同。**因此不能把 89% 与 98% 简化成完全相同的 100 个任务一一配对，也不能宣称统计显著。** 实验没有完整升级并测试整个 PhysX 5.4 引擎；真实部署或其他任务是否受影响仍未知。

同一论文对其抽样的 RoboDojo 40 次中标记 7 次、LIBERO 400 次中标记 2 次、RoboCasa 300 次中标记 5 次；作者指出 RoboDojo 被追踪到的现象尚未找到同一根因，各组模型、任务与引擎不同，不能据这些小规模计数对 benchmark 做可靠排名。人工审查主要在单任务的候选片段上进行，检测标记也不能直接当成确定的失败根因。

论文和[代码仓库](https://github.com/ALEXander22568/simuguard)属于现有解决方案。仓库调查时标注开发版，称核心和 RoboTwin/SAPIEN 适配经过验证；同时将检测阈值视作待人工核查的候选、列出适配和重放限制，不能把论文中其他环境上的实验等同于已验证的通用即插即用能力。本站未安装或验证。

## 容易混淆的 RoboRSI 名称

本站引用的 [SenseNova-RoboRSI-Log 数据卡](https://huggingface.co/datasets/sensenova/SenseNova-RoboRSI-Log)指向 SenseNova 的公开测试日志；其关联项目是 [SenseNova-RoboRSI](https://github.com/OpenSenseNova/SenseNova-RoboRSI)。其公开项目文档的 RoboCasa365 表明确提醒：其 Target50 + task memory 与其他结果的 pretraining kitchens 设置不同，不构成同协议排名；LIBERO-Pro 某些对照只覆盖 Task/Swap，不能自动当成官方五类扰动总分。站内单次样例也不能升级为完整评测结果。

另有 [nssmd/RoboRSI](https://github.com/nssmd/RoboRSI/blob/main/README_zh.md)，对应[另一篇 RoboRSI 论文](https://arxiv.org/html/2610.12424)。二者都有 RoboRSI 字样，但仓库、论文及实验系统不同，不能根据缩写把后者结果归到本站引用的 SenseNova 日志。

nssmd 项目作者报告：LIBERO 与 LIBERO-PRO 实验使用测试过程中在线改进技能库的模式，LIBERO-Plus 使用从 LIBERO 得到的冻结技能库；其 RoboTwin 表中自身为在线运行前 154 个 episode，而基线各 150 个。README 另说明冻结版本的 LIBERO-PRO 每任务一次评测并不对应论文主表。**边测边改进、冻结权重/技能以及不同 episode 分母，应分别记录。** 这些是作者报告，不是本站对结果或可运行性的确认。

## 需求判断

这两组资料说明读者在理解具身成绩时可能需要确认：仿真引擎版本和失败原因、有效 seed 的筛选、同名系统的来源、在线改进与冻结测评的区别。现有论文、官方文档和审计工具已提供相当多信息；以上仅证明这些信息存在且有一定查证工作，不能推断目标读者需要新的资料站、实际能节约多少时间或愿意付费。可继续以原论文、已有聚合站与本站资料进行同题读者对照，当前没有完成此类用户实验。
