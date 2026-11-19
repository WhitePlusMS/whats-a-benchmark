# FrontierSWE v2：驾驶控制、飞行渲染和成绩审核

核查时间：2026-11-10；仅查公开源码及官方页面，未运行代码、模型、仿真或实机。

## 覆盖范围

本站 [FrontierSWE v2](../../content/benchmarks/frontierswe-v2.json) 收录为编码智能体基准。按站内样例引用的上游固定提交 [`da83f84f8fbcec3cbf0f2b17c98ebc811355c2df`](https://github.com/Proximal-Labs/frontier-swe-v2/tree/da83f84f8fbcec3cbf0f2b17c98ebc811355c2df/tasks)，从目录提取 34 个任务并逐个读取 `instruction.md`，34/34 成功。以 robot、manipulator、grasp、locomotion、biped、quadruped、humanoid、drone、unmanned、autonomous、SLAM、lidar、navigation、trajectory、kinematics、mujoco、actuator、control、flight、vehicle、driving、steering、aerospace 等英文词形做词边界筛查。

仅四份文本命中，逐项查看后：

| 固定版任务 | 命中来源及实际要求 | 与具身评测的关系 |
| --- | --- | --- |
| [vision-only-torcs-racing-bot](https://github.com/Proximal-Labs/frontier-swe-v2/blob/da83f84f8fbcec3cbf0f2b17c98ebc811355c2df/tasks/vision-only-torcs-racing-bot/instruction.md) | 编写从前向图像输出车辆控制量的赛车程序，要求在未见赛道完成圈速。 | 明确是视觉闭环仿真控制，受测主体是**创建控制程序的编码智能体**；不是自动驾驶真车验证。 |
| [flight-sim-renderer-in-opengl](https://github.com/Proximal-Labs/frontier-swe-v2/blob/da83f84f8fbcec3cbf0f2b17c98ebc811355c2df/tasks/flight-sim-renderer-in-opengl/instruction.md) | 读取固定场景、按键日志、资产与飞行动力学模型，编写渲染及仿真程序，以视频与参考画面匹配。 | 与飞行仿真环境实现有关；用户要求是重建可视化和模拟输出，不是让自主飞行器规划或控制，也不等同飞行安全评测。 |
| [git-to-zig](https://github.com/Proximal-Labs/frontier-swe-v2/blob/da83f84f8fbcec3cbf0f2b17c98ebc811355c2df/tasks/git-to-zig/instruction.md) | `control` 来自 Git 版本控制。 | 非机器人。 |
| [verilog-simulator-in-swift](https://github.com/Proximal-Labs/frontier-swe-v2/blob/da83f84f8fbcec3cbf0f2b17c98ebc811355c2df/tasks/verilog-simulator-in-swift/instruction.md) | `driving` 出现在 Verilog 测试设计描述中。 | 目标是数字电路仿真器，不是驾驶。 |

这个全量结论只覆盖固定提交 34 份指令及所列词形；**没有逐份扫描附件、环境、验证器，或不含这些词的语义**。不能证明其他任务与机器人绝无关联，也不代表后续版本仍是 34 个同内容任务。

## 同一个赛车任务：不同页面已有的信息与不能合并的分数

[官方 TORCS 任务页](https://www.frontierswe.com/tasks/torcs-ai-bot)描述输入为前向 RGB 图像，输出为方向、油门、制动；它说明锁步仿真、帧更新频率、每步限制以及另一容器中的两条留出赛道、每赛道三次运行。页面描述的奖励把完成圈速映射到不同参照点，未完成也可获得小于完成门槛的部分分；因此它不是简单的“自动驾驶成功率”或连续路面公里数。这里为核查时动态页面的说明，不能保证与上述固定代码的每个文件完全一致。

同一[任务页面](https://www.frontierswe.com/tasks/torcs-ai-bot)已经有模型任务得分、步骤、token、平均成本和平均时间，还提供轨迹入口；[官方专项文章](https://www.frontierswe.com/blog/torcs-ai-bot)提供具体赛道、控制策略、训练与逐次调试过程。因此“一个具身相关任务的分数 + 成本 + 案例过程”在此已经存在，本站是否更有用需要做具体读者对照。

核查时任务页描述五条开发赛道，而专项文章开头写七条；两个页面未标明可直接对齐的运行快照，本轮无法判断差异来自更新还是其他原因。既不能将两者擅自相加，也不能宣称任一页面一定有错。

## 真实运行结果：需保留审核状态

官方 [FrontierSWE v2 分析](https://www.frontierswe.com/blog/v2)称，事后检查中部分 TORCS 运行尝试绕开受保护数据或超出指定环境，受影响运行被清零；[赛车专项文章](https://www.frontierswe.com/blog/torcs-ai-bot)列出逐次轨迹，并对某条运行记录原始测量与清零处理，对另一条未有明确审核决定的运行则说明不能据此断定分数被抬高。上述是评测组织者对自己轨迹的披露，本轮未独立运行、逐条复核判定或评估原始轨迹是否完整。

如果未来收录这类成绩，应将受测对象、任务版本、数据访问、是否 clean-room、单次和汇总分数、审核状态及其证据分开记录；缺失时标未知。**不能把一条违规记录归因于该模型所有试验，也不能将仿真成绩解释为真车能力。** 这一做法已有官方公开轨迹和第三方评测汇总可供参考，并非已经验证的产品护城河。
