# 机器人行走、跌倒与恢复：评测口径和需求线索

核查日期：2026-11-10。对照本站具身条目、公开资料和使用者讨论；未运行机器人或仿真，也未评估真实环境安全性。

## 与本站的联系

[HumanoidBench](../../content/benchmarks/humanoidbench.json)包含人形机器人全身移动与操作仿真；本站的 `stand` 单条轨迹来自第三方数据，未标训练/测试或成功结果，不能当作跌倒恢复成功率。[SIMPLE](../../content/benchmarks/simple-embodied.json)涉及仿真人形移动操作；[R2R-CE](../../content/benchmarks/r2r-vlnce.json)关注语言引导的室内导航。这些都不能直接代表真机跌倒恢复性能。

本地相关名称检索未见 SafeRecovery、Terrain Challenge 或 weeble 同名条目；检索不能证明全站或全部别名没有相关材料，也不自动决定新增评测。

## 公开开发者问题

- 一位[恢复控制研究者](https://www.reddit.com/r/reinforcementlearning/comments/1x85e7d/robot_recovery_training/)自述高训练奖励的仿真策略出现初始姿态穿地、跪姿得分过高等问题，询问转向真机之前应增加什么扰动与指标；其后修改了初始条件和执行器设定，因此新旧数字不能直接比较。报告及根因未独立复现。
- 一位[开发者](https://www.reddit.com/r/reinforcementlearning/comments/1xmgwy4/finetuning_a_humanoid_locomotion_policy_on/)描述将扫描到的砂地几何用于仿真，但不确定摩擦和地面下陷的参数是否接近现实，询问如何校准。其项目经历与效果未验证；相似外观不能据此证明物理一致。
- [另一条讨论](https://www.reddit.com/r/robotics/comments/1xngi7i/can_we_make_simtoreal_testing_more_realistic/)的发帖者自称机器人企业联合创始人，希望听取从仿真转真机的困难；身份和商业背景可能影响其陈述，不当成独立需求调查。这些都是问题线索，不说明对本站的需求规模或付费意愿。

## 四类不同的测量

| 要回答的问题 | 一个已有来源 | 分母或边界 |
| --- | --- | --- |
| 行走过程中是否跌倒？ | [weeble 固定版本评测说明](https://github.com/mottopanikeiku/weeble/blob/60878341072256ccc68f6118ec23a298c55e1bb9/docs/evaluation.md)报告每条件下从未跌倒的 episode 比例 | 仿真四足与人形控制器条件不同；恢复后该 episode 仍被记为发生过跌倒，不应改称未跌倒。作者亦报告跨 CPU 部分样本重跑结果变化，本次未运行 |
| 摔倒后能否起来并站稳？ | [HIPC 论文](https://arxiv.org/html/2610.41334)在其扰动协议中定义倒地条件、稳定直立持续 1 秒，以及起身后不得再次降低到指定高度 | 恢复率的分母是满足其跌倒条件的试次；平均起身时间只计算恢复成功试次，必须和恢复率一起读。它不等于全部运行的完成率或真实工厂恢复水平 |
| 恢复或行走时是否违反约束？ | [SafeRecovery 固定版本](https://github.com/hyyyyyyz/SafeRecovery/blob/586a41c8b2c8eb52aaaf3e57bca096b759920d2b/README.md)分别列速度误差、每秒力矩/接触/姿态约束违反、恢复和恢复期违反 | 四足机器人 Isaac Gym 仿真；约束违反是该评测定义的指标，不等于真实设备损坏率或安全认证 |
| 地形行走完成多少？ | [Multi-Terrain Humanoid Locomotion Challenge](https://human-robot-scene.github.io/Terrain-Challenge/)把 completion rate 定义为已走距离占路线总长，并结合耗时评分 | 路径完成百分比不是“成功完成的 episode 百分比”；官网称效率项只对完成的 episode 计算，未在本轮厘清未完成回合的具体实现 |

这些来源已提供单项定义、任务设置、公开代码或结果，区别说明不是本站独有。不同机器人、动力学、跌倒阈值、扰动和初始姿态也不应混排。

## 同一个项目里看两个维度

[SafeRecovery README](https://github.com/hyyyyyyz/SafeRecovery/blob/586a41c8b2c8eb52aaaf3e57bca096b759920d2b/README.md)报告四足 A1 仿真、中等扰动和六个种子的结果：Recovery PPO 的恢复成功率为 **57.71% ± 17.70%**，平均约 **0.44 次约束违反/秒**；其 Vanilla PPO 对照分别为 **0.07% ± 0.05%** 与 **0.21 次/秒**。这是作者报告的不同方法和指标，未复算或测量真实设备，不能单凭一个指标说某策略整体更安全，也不能据此确定所有训练条件或差异的因果关系。

[另一项 H1 仿真项目](https://github.com/22kashaf-khan/humanoid-simulation-robustness-benchmark)报告：正常条件与指定摩擦扰动条件下的存活率均为 99.8%，但偏航角速度跟踪 RMSE 从 0.141 增至 0.173 rad/s。这是作者的单项目实验，摩擦变化针对刚体接触材料，并非真实地面标定；它说明在该设置下单看是否跌倒可能看不到连续误差变化，不证明相同现象适用于全部机器人。

## 对产品方向的启示

可以测试的读者任务是：看到“90% 恢复”时，查清分母、起身后需要稳定多久、是否包括真机，以及是否另有力矩或接触数据。官方评测和现有文档已经给出多项信息；本站能否通过跨来源组织帮助读者更快完成判断，还需对照实际读者和维护成本，不能只凭研究论文或几个帖子推断商业价值。

## 2026-11-10：接触力异常的开发者提问和复测边界

[Isaac Lab #4366](https://github.com/isaac-sim/IsaacLab/issues/4366) 报告者称训练 Unitree 人形仿真策略时，调整物理步长与控制 decimation 后偶发足部接触力尖峰和奖励异常，询问这是设置限制还是缺陷。其正文的极值表述与后续示例数值不同，且同时改变了两个参数，不能据此断定某一个参数必然导致异常。本次没有运行其 RobotLab 复现代码。

协作者后来说明：在当前开发版的**原生 G1 任务、零动作、16 个环境、300 个环境步**下测试，峰值约 4.5 kN，没有出现其所描述的极端尖峰；但该运行没有使用报告者的训练策略或 RobotLab 环境，因此不能排除原设置中的问题。issue 随后关闭，报告者称暂时无法在新版本验证，并建议另试 H1；关闭状态不等于问题已在原条件下复现并修复。

[PHC #151](https://github.com/ZhengyiLuo/PHC/issues/151) 的另一位使用者描述 H1 仿真评测时模型被弹起，询问训练、接触与评测配置；维护者认为可能是初始化并反问训练成功率，线程关闭前未展示明确根因和复验。它与前述 Isaac Lab 报告是不同项目、不同用户问题，不应合并为同一个缺陷。

现有项目 [gaitkeeper](https://github.com/dundysm/gaitkeeper) 自述提供跨仿真器的控制接口、物理条件与任务行为诊断；其 README 明确部分结果来自开发样本，不能代表未见过的机器、框架或真机。本次未安装工具或核验它能否分析上述任何一条 issue。这两条公开问题说明工程人员需要诊断仿真条件，但没有证据表明提问者需要一个新的 benchmark 榜单或会使用本站。
