# 未标具身条目的任务简介复查

核查日期：2026-11-09。当前本地已发布 318 个 JSON，其中 50 个有 `embodied` 字段、268 个没有；所有未标条目均有 `officialDefinition.summary` 或 `subtitle`。本轮遍历未标条目的 ID、名称和简介，并对以下候选继续查看任务输入、输出和环境；简介不保证披露每道任务，不能将结果称为对所有题目或线上内容的全量人工审计。

## 新发现：FrontierSWE 的仿真控制任务

本站 [FrontierSWE v2](../../content/benchmarks/frontierswe-v2.json)定位为长程工程和研究任务，其中[官方 TORCS 赛车任务](https://www.frontierswe.com/tasks/torcs-ai-bot)要求编码智能体编写控制函数：根据模拟赛道相机图像输出转向、油门和制动，并在留出赛道测试。官方将该任务背景称为具身 AI 中的视觉驾驶问题。

这意味着**一个子任务与视觉闭环控制相关**，而非整个 FrontierSWE 都是具身机器人评测。受测智能体主要任务是开发可运行控制器，控制器在赛车仿真中执行，成绩涉及赛道距离和圈速等规则；不是实体机器人实测，亦不是视觉模型单次回答准确率。当前本站条目提到视觉推理，但上述任务不能从简介直接看出。本轮没有运行程序或更改标签、站内内容。

官方任务页有模型成绩、成本、用时和轨迹入口；[作者分析](https://www.frontierswe.com/blog/torcs-ai-bot)还展示如何合成数据、训练道路检测器及不同策略。这是已有的详细示例与过程资料，本站能否为读者提供额外价值尚需对照；博客与任务详情对开发可见赛道数量的文字分别写七条与五条，实际配置和版本差异本轮未核实，不能合并成确定数量。

## 2026-11-10：通用终端基准中的机器人相关任务

这次重新以 Python 标准库读取 `content/benchmarks` 的 318 个 JSON，均成功解析、均为 published，其中 268 个没有 `embodied` 字段。对未标条目的名称、简介、任务合同、数据、指标和限制做一组机器人相关关键词筛查，仅 EmbodiedX 命中；**以下从上游任务清单找到的案例是字段与关键词筛查不足的反例**，不是新增了两个独立机器人 benchmark。搜索没有覆盖所有上游任务正文或所有语义。

| 站内条目与原始任务 | 核实内容 | 不应推断 |
| --- | --- | --- |
| [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) · [`tamp-skill-planning`](https://github.com/harbor-framework/terminal-bench-science/blob/f81afac4f11048e77a15dfc8fb1dbfb897fea0ce/tasks/engineering-sciences/mechanical-engineering/tamp-skill-planning/instruction.md) | 官方 [v0.1.0 的 70 项清单](https://github.com/harbor-framework/terminal-bench-science/releases/tag/v0.1.0)包含此任务；2026-11-10 查询 tag 指向 `f81afac4f11048e77a15dfc8fb1dbfb897fea0ce`。固定版指令要求智能体为 100 个 LIBERO 场景、MuJoCo Panda 机械臂编写技能及计划；每场景最多试探 5 次、全程最多 150 次，最终至少 95 个实例通过才获二元奖励。 | 输入已提供物体位姿等场景信息，任务还有明确的子步骤与执行判定；它不是原版 LIBERO 模型榜、通用 VLA 在真机上的成功率，也不是 100 个独立 benchmark。本站条目当前展示的是其他科学任务，并非此案例。 |
| 同一 Science 0.1 · [`navigation-sensor-calibration`](https://github.com/harbor-framework/terminal-bench-science/blob/f81afac4f11048e77a15dfc8fb1dbfb897fea0ce/tasks/engineering-sciences/electrical-engineering/navigation-sensor-calibration/instruction.md) | 官方清单也列该任务；固定指令要求制作针对 GNSS、IMU、LiDAR 记录的可复用标定与轨迹求解程序，并在其他数据会话检查标定、异常点和轨迹。 | 这是导航数据处理和工程代码验证；不能当成自动驾驶实车通过率或完整导航系统测试。 |
| [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) · [`biped-contact-dynamics`](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/instruction.md) | 2026-11-10 查询 `v4.0.0` tag 指向 `452bf305c6daa62fc59061d22133a7cbc7c1572e`。固定指令要求生成双足行走、跳跃和跑步轨迹，并按约束检查接触、力与动力学；[任务元数据](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/task.toml)分类为 Robotics。 | 其交付物是程序与数值轨迹，不是让实体人形机器人行走；整套终端 benchmark 的分数不能等同该子任务的通过率。本站当前展示其他四个任务，不包含该子任务。 |
| [LHTB](../../content/benchmarks/lhtb.json) · [`robotics-slam-benchmark-repair`](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks/robotics-slam-benchmark-repair/instruction.md) | 本站三个样例引用的固定提交包含此任务：修复二维位姿、闭环约束、路标与轨迹指标的审计程序，输出数据和报告；[元数据](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks/robotics-slam-benchmark-repair/task.toml)分类为 robotics。 | 这是 SLAM 评测软件修复，不能由此推断实体导航或感知成功。仓库的[当前 README](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/README.md)还称 LHTB 2.0 有 77 项；本站条目写的是 46 项旧口径，两者需分开，未据此将旧榜自动改为 2.0 成绩。 |

[Terminal-Bench-Science 的双臂 PhysicalRSI 提案](https://github.com/harbor-framework/terminal-bench-science/pull/2234)同样使用仿真机器人，但核查时仍是 Draft PR，不在上述 0.1 正式清单中；[任务作者的试验资料](https://huggingface.co/datasets/HugoLiuDev/physicalrsi-bimanual-control-trial-evidence)属于不同修订与单次运行，不能当作 0.1 榜单成绩，也不能推广为模型总体能力。本轮未下载试验归档或运行任务。

[AgentTime 的双足任务页](https://agenttimebench.com/benchmarks/terminal-bench/biped-contact-dynamics/)已经提供单任务的运行时间与逐次入口，研究目标是智能体是否按要求耗时；其额外提示和时间条件不同，不能把时长依从率当成机器人轨迹通过率。以上官方任务页和第三方结果均已提供具体资料，不证明本站具备独家解释或目标用户会使用本站。

### 2026-11-10：Terminal-Bench 4.0 固定提交任务正文扫描

在[正式版 v4.0.0](https://github.com/harbor-framework/terminal-bench/releases/tag/v4.0.0)指向的提交 `452bf305c6daa62fc59061d22133a7cbc7c1572e`，从 GitHub `tasks/` 目录页面提取到 66 个文件夹。逐个请求 `instruction.md`：首次读取 65 份，一份连接被重置；重试 [ctr-optimization](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/ctr-optimization/instruction.md) 成功，它是广告点击率优化任务，未命中以下机器人词组。66 份正文均已读取；不过本次没有取得独立的 Harbor Hub 4.0 发布 manifest 与这 66 个目录逐项核对，所以只称固定提交目录中的 66 份，**不据此断言发布数据集的总任务数**。

以 robot、biped、humanoid、drone、SLAM、navigation、trajectory、actuator、grasp、kinematics 等英文词形做词边界筛选，共四项命中：前述 `biped-contact-dynamics`；[cargo-flight-dispatch](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/cargo-flight-dispatch/instruction.md) 是修复航空货运航线、载重和燃料计划工具；[freight-dispatch-shift](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/freight-dispatch-shift/instruction.md) 是按司机、车辆和班次规则安排货运；[ontology-kg-querying](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/ontology-kg-querying/instruction.md) 是铁路数据本体查询。后三者虽含导航或车辆用词，不要求机器人控制。此次只扫描任务正文，不含环境、验证器和关键词未覆盖的语义，不能证明其他任务与机器人绝无联系。

双足任务要求智能体生成走、跳、跑三类 PyDrake 数值轨迹，并检查接触模式、力和多体动力学；[任务指令](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/instruction.md)写明只验证导出结果，隐藏配置会改变参数。它是**生成仿真轨迹的编程任务**，与直接评估机器人策略的 [HumanoidBench](../../content/benchmarks/humanoidbench.json) 不属于同一成绩口径。未审计验证器是否完全实现所有指令要求，未运行任务。

### 2026-11-10：Science 0.1 全部任务正文关键词扫描

从固定提交 `f81afac4f11048e77a15dfc8fb1dbfb897fea0ce` 的五个科学领域、20 个子目录提取 70 个任务路径，并核对与 [v0.1.0 release](https://github.com/harbor-framework/terminal-bench-science/releases/tag/v0.1.0) 列出的 70 个名称一致。后者使用 67 个 PR 链接和三个任务目录链接，单独只提取 PR 链接会漏掉三项。70 份 `instruction.md` 均成功读取；使用 robot、manipulator、drone、SLAM、LiDAR、navigation、vehicle、trajectory、actuator 等英文词形进行词边界匹配，14 份命中，包括前述机械臂规划和导航传感器标定。

其他命中需要看上下文：[baseline-free-localization](https://github.com/harbor-framework/terminal-bench-science/blob/f81afac4f11048e77a15dfc8fb1dbfb897fea0ce/tasks/engineering-sciences/mechanical-engineering/baseline-free-localization/instruction.md) 与 [guided-wave-localization](https://github.com/harbor-framework/terminal-bench-science/blob/f81afac4f11048e77a15dfc8fb1dbfb897fea0ce/tasks/engineering-sciences/mechanical-engineering/guided-wave-localization/instruction.md) 是对结构损伤定位的导波分析，不是机器人定位；[energy-routing](https://github.com/harbor-framework/terminal-bench-science/blob/f81afac4f11048e77a15dfc8fb1dbfb897fea0ce/tasks/mathematical-sciences/operations-research/energy-routing/instruction.md) 是车辆路线与充电优化，不是机器人闭环驾驶。其他命中还包括反应器控制、流行病与科学数据轨迹等。扫描不含环境、测试代码、附件和未命中的语义，不证明只有上述两个相关任务。

实际研发线索：[机器人开发者](https://www.reddit.com/r/robotics/comments/1d726b4/help_with_implementing_a_lidar_aligner_algorithm/)描述多台机器人的 LiDAR 安装存在差异，正在用点云配准和坐标变换校准，提问如何组合变换矩阵；其观察和原因仅为发帖者自述，尚未复现。[已有 LiDAR–IMU 标定工具说明](https://github.com/PJLab-ADG/SensorsCalibration/blob/master/lidar2imu/README.md)提供另一个具体传感器组合的工具与步骤，不能断言适用于该帖的传感器—机器人底座问题。这些材料表明存在具体的标定与复现难题，但既不证明 Science 单任务解决该问题，也不证明发帖者需要本站。

## 2026-11-10：SkillsBench 中的无人机、车辆与相关视觉任务

本站 [SkillsBench](../../content/benchmarks/skillsbench.json)是通用智能体技能评测，当前未设置 `embodied` 字段；其站内四个展示样例均不是以下任务。[v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)列出 87 个任务，版本固定在提交 `b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af`。此处核对发布清单及以下任务正文，没有逐项审计 87 个任务的全部附件、验证器和原始运行结果；不能把早期论文版本的机器人分类数量直接套入 v1.1。

| 固定版任务 | 与具身的关系 | 判断边界 |
| --- | --- | --- |
| [drone-planning-control](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/drone-planning-control/task.md) | 官方标记 `robot-control` 和 `robotics`；要求智能体创建无人机动力学仿真、轨迹规划及位置和姿态 PID 控制，处理起飞、悬停、降落、点到点飞行命令。 | 指令提出稳态误差、超调、轨迹误差与加速度等条件；实际 verifier 是否完整严格落实各条件尚未逐项审计。该任务是**编程智能体构建仿真控制程序**，不是实体无人机实测，也不是整套 SkillsBench 的统一机器人分数。 |
| [adaptive-cruise-control](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/adaptive-cruise-control/task.md) | 要求用车辆参数和提供的传感器数据编写自适应巡航仿真，输出控制器、跟车数据与报告。 | 是车辆控制工程相关任务；数据描述提到真实驾驶采集，但评估交付物为仿真程序，不能称真车自动驾驶成功率。 |
| [dynamic-object-aware-egomotion](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/dynamic-object-aware-egomotion/task.md) | 根据给定视频分析相机运动类别并输出动态物体掩膜；动态场景视觉与机器人感知存在相关性。 | 任务给出的是离线视频标签和掩膜，不能直接称为机器人定位、SLAM 轨迹精度或闭环避障成绩。 |

名称陷阱：[r2r-mpc-control](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/r2r-mpc-control/task.md) 中的 R2R 指 Roll-to-Roll 卷对卷生产线张力控制，不是本站 [R2R-CE](../../content/benchmarks/r2r-vlnce.json) 的 Room-to-Room 导航。它与工业控制相关，不能只因缩写相同归为机器人导航。

已有替代入口：SkillsBench 自己的[无人机任务页](https://www.skillsbench.ai/tasks/drone-planning-control)公开任务、要求和结果/轨迹入口；未逐项验证页面交互或逐次结果。[FlightBench](https://thu-uav.github.io/FlightBench/)提供面向四旋翼第一视角导航规划的仿真场景、基线和评估说明，项目亦报告有单独的真实实验；其主要被测对象是导航规划方法，不等同 SkillsBench 的智能体开发控制程序任务。[Drone-Bench](https://andonlabs.com/evals/drone-bench)则将无人机相关编码任务分成重建、定位、导航、检测和跟随，按任务隔离并允许单次运行多次提交；其综合进度不是所有模型都进行了完整真机飞行。详见[航空评测记录](2026-11-09-aerial-embodied-benchmarks.md)。本轮按名称检索本地 benchmark JSON 未命中 FlightBench，不能排除别名或站外内容。

实际问题线索：[PX4 论坛一位开发者](https://discuss.px4.io/t/px4-host-target-in-simulink-with-simulink-model/33288)描述其控制器在 Simulink 仿真正常，接入 PX4 软件在环后无法控制，并询问调参和采样时间；回复者建议核查消息与执行器指令，提问者随后报告消息存在丢失现象。这反映一次仿真集成排查问题，成因未经本次复现，亦不证明提问者需要模型排行榜或会使用本站。与之对照，SkillsBench 单项仿真通过也不能证明解决了该 PX4 集成问题。

### 任务正文全量关键词复核

2026-11-10 从上述 v1.1 release 的 87 个固定版本任务链接提取任务名，在内存中逐个读取全部 87 份 `task.md`，均返回成功；以 robot、manipulator、drone、SLAM、LiDAR、navigation、autonomous、odometry、vehicle、trajectory、actuator、motor 等一组英文词形进行词边界匹配。六份命中：上述无人机、巡航、视频运动与卷对卷任务，以及 [bike-rebalance](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/bike-rebalance/task.md)、[paratransit-routing](https://github.com/benchflow-ai/skillsbench/blob/b63b7b2850226b6aa4fb5929a8c1ac7bc4d9a6af/tasks/paratransit-routing/task.md)。后两者分别是共享单车车辆调度和辅助出行车辆排班，命中 `vehicle` 不足以归类机器人。这个结果覆盖全部 87 份任务文本，但**不覆盖任务环境文件、验证代码、同义词和语义上相关但未命中关键词的内容**；不等于证明只有一个机器人任务。

## 2026-11-10：LHTB 旧版与 2.0 的机器人相关任务

本站 [LHTB](../../content/benchmarks/lhtb.json)记录 46 项旧版，样例指向固定提交 `7ca0cacea9bf6a0694eaad7306bed794eaaaabce`。**更正上轮记录：**目录提取规则遗漏下划线，将 `rush_hour_campaign` 和 `snake_maze_campaign` 截成 `rush` 和 `snake`，因此错误路径返回 404；不是官方正文缺失。使用完整名称后，[Rush Hour 棋盘任务](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks/rush_hour_campaign/instruction.md)和[贪吃蛇任务](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks/snake_maze_campaign/instruction.md)均读取成功，至此该批 46 份固定版指令均已读取并做相同关键词筛查。Rush Hour 命中的 `vehicle` 是棋盘上的车辆棋子；此前 `audio-visual-event-alignment` 的 `robots` 来自牛津大学数据链接域名，`epidemic-inverse-control-audit` 的 `trajectories` 指流行病模型轨迹。上述均不是机器人任务。此检索未覆盖任务环境和所有同义词，不能据此断言旧版仅有一个具身相关任务。

[官方仓库](https://github.com/zli12321/LHTB)现说明 LHTB 2.0 为旧 46 项加新增 31 项，总计 77 项；2026-11-10 查询其 main 指向上述提交。后续版本包含：

- [robotics_pick_reach_controller__01](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks-2.0/robotics_pick_reach_controller__01/instruction.md)：要求根据公开的软件在环参考产物，重建机械臂抓取／到达控制相关程序；输入包含执行器增益、初始姿态、关节限制与目标等参数，公开样例反馈之外还有隐藏场景。原文所说 `real software-in-the-loop reference artifact` 是软件在环参考产物，**不是实体机械臂实测**；用户完成的是重建程序行为而不是遥控机器人执行抓取。
- [lidar_icp_registration_summary__06](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks-2.0/lidar_icp_registration_summary__06/instruction.md)：依据点云软件的公开输出，重建含体素、法向量和配准阈值等参数的结果；与机器人点云配准相关，但官方将其归入地理空间任务，并未在该指令中要求闭环导航或真机评测。

这两个是 **2.0 新增任务**，不属于本站条目所述旧 46 项，不能将其成绩塞入旧榜。[2.0 任务说明](https://github.com/zli12321/LHTB/blob/7ca0cacea9bf6a0694eaad7306bed794eaaaabce/tasks-2.0/README.md)称重建任务按隐藏场景比较输出，并赋予部分过程分；公开样例通过不足以保证隐藏场景通过。两份具体指令分别列六个、两个公开参数场景，不应套用说明文件中的一般场景数量。本次未运行容器、验证器或模型。

已有实际问题与工具：[evo 的使用者 #48](https://github.com/MichaelGrupp/evo/issues/48)询问完整轨迹与截取轨迹的最大位姿误差为何不同；维护者答复使用最小二乘对齐时，两段数据得到的变换不同，裁掉最大误差位置也会改变结果。这说明轨迹评测条件会影响阅读，但该 issue 已有答复，且是另一个工具的案例，不证明 LHTB 的 SLAM 程序有此缺陷或用户需要新资料站。[evo 官方文档](https://github.com/MichaelGrupp/evo/wiki/Metrics)本身已经解释多种对齐方式。

## 对照：DrivingBench 实车评测及已有解释

[DrivingBench 论文 v1](https://arxiv.org/html/2609.38948v1)测试通用视觉语言模型通过工具控制真实车辆，在封闭停车场低速完成固定锥桶路线。人类安全驾驶员全程在驾驶座、负责必要的启动和制动介入。它与上面的 TORCS 子任务都涉及视觉驾驶，但前者测真实车辆上的模型与工具运行组合，后者要求编程智能体开发控制器并在仿真中测试；两者的分数不能直接比较，也不能据此推断道路安全性。

论文这次实验是四个模型与各自 harness 的组合，总计 11 次尝试；每个组合只有一个会保留前次尝试内容的对话会话，最多尝试三次，成功后停止。十次失败均由安全驾驶员制动结束；其中 GPT-6 Astra 的两次进度分别是 49% 和 100%。这里的百分数是单次尝试沿指定路线的进度，不是成功率；样本不足以推断跨路况稳定性。harness、延迟、人工干预和会话内重试都影响结果，排名也不是纯模型能力排名。

[评测官网](https://drivingbench.com/)已经展示各次进度、轨迹和视频入口；[VibeLeaderboard 的目录](https://www.vibeleaderboard.ai/tools/capabilities/benchmarks)也已有 DrivingBench 条目，标为待审核并提醒比较尝试次数和 harness 延迟。按本次本地文件及研究记录的名称检索，未找到独立 DrivingBench 条目；这不等于本站没有其他驾驶任务，也不代表其他网站没有更多相关页面。

[公开讨论](https://news.ycombinator.com/item?id=49817404)中，一位自称参与 openpilot 的贡献者关心端到端延迟能否适应真实道路；作者回应这是低速实验而非近期实用方案。该讨论可以构造“读者能否区分实车尝试进度和自动驾驶可靠性”的验证任务，但不是对本站需求或付费意愿的证明。

## 相关上游能力与名称误匹配

- [Dense200](../../content/benchmarks/dense200.json)测试密集图像目标定位；[Roboflow Vision Evals](../../content/benchmarks/roboflow-vision-evals.json)有检测、计数、识别、OCR、视觉推理。这些能力可能用于机器人视觉，但当前评测输出是图像结果，不证明实际机器人完成控制或抓取。[Roboflow 检测页](https://playground.roboflow.com/evals/object-detection)已有分指标成绩、设置、成本及真实任务例子，不能说网站只给总分。
- [ARC-AGI-3](../../content/benchmarks/arc-agi-3.json)是游戏交互中探索、反馈和规划，虽然文本提及“世界模型”，它不是直接驱动实体机器人；[MemoryArena](../../content/benchmarks/memoryarena.json)的交互包括网页、检索、购物与推理，[官方摘要](https://memoryarena.github.io/)所列任务不等于机器人执行。
- [BenchCAD](../../content/benchmarks/benchcad.json)、[MathVista](../../content/benchmarks/mathvista.json)、[ZeroBench Main](../../content/benchmarks/zerobench-main.json)分别涉及工程几何或静态视觉数学/空间问答，不能把图像推理结果当成机器人闭环能力；[SpatialBench Verified](../../content/benchmarks/spatialbench-verified.json)是空间生物学，与机器人空间定位不是同一领域。

## 一个具体的开发者问题及已有答复

[Rex-Omni #187](https://github.com/IDEA-Research/Rex-Omni/issues/187)里，使用者看代码时询问检测指标为何似乎忽略类别，提到 Dense200 和 VisDrone。协作者解释：评测按任务分支处理；多类检测按类别匹配，指代表达定位分支可只测位置。issue 因不活跃自动关闭；本次未运行或对照其完整固定版本代码，协作者解释是已有答复，不应把提问直接写成已确认评分缺陷，更不能推及所有检测框架。

这条讨论可以支持验证“读者能否找到某个指标到底是否计算类别”的任务，但用户有官方 issue 可查，不证明需要新网站。具体说明差异是否节约检索时间仍需真实读者测试。

## 2026-11-10：PaperBench 复现任务的机器人关联

[PaperBench 与机器人复现对照](2026-11-10-paperbench-robotics-reproduction.md)补充固定版 23 份 rubric 的关键词筛查、四个命中任务、第三方 MapGPT 复现及 R2R／R2R-CE 的区别。筛查不代表全文语义覆盖；这些均为科研复现或仿真任务，不能推断实机成功。

## 2026-11-10：Terminal-Bench 2.0、2.1 与 3.0 的固定版补查

[旧版任务与双足预算对照](2026-11-10-terminal-versions-robotics-trace.md)记录 89 + 89 + 74 份任务指令关键词筛查、2.x 的 MuJoCo 模型调优，以及 3.0/4.0 双足任务的时间和 CPU 差异；完整正文筛查不包含附件及未命中语义，仿真工程不等于实机评测。

## 2026-11-10：FrontierSWE v2 其余任务指令

[34 份指令筛查及驾驶评分审核](2026-11-10-frontierswe-driving-and-rendering.md)补充视觉赛车、飞行画面重建的任务边界、同源赛道数量差异及公开逐次审核；仅覆盖固定版任务正文，不能外推附件或实机。
