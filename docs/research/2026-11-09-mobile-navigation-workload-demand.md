# 移动机器人导航与计算负载：需求、现有评测及本站对照

核查日期：2026-11-09。按本地工作树、公开帖子、项目页面和论文整理；未运行导航、复算结果、验收硬件或采访使用者。机器人导航不一定涉及大模型，本记录将其作为具身相关边界研究，不把所有传统导航问题归为 VLA 需求。

车队协调补充：[仓库多机器人任务分配和路径规划](2026-11-09-warehouse-fleet-mapf-evidence.md)对照站内单机导航、LoRR、LSMART、Open-RMF 和具体问题报告；未运行车队或确认现场效果。

移动操作补充：[RoboCasa-Long、RMMBench 与 LAMBDA](2026-11-10-mobile-manipulation-long-horizon.md)区分跨工作区仿真、固定底座真机以及真实四足机器人评估，并核对数据集元信息；未运行策略。

## 本站已有资料与外部测试

| 项目 | 主要问题与测试对象 | 对比时应保留的区别 |
| --- | --- | --- |
| 本地 [R2R-CE](../../content/benchmarks/r2r-vlnce.json) | 使用自然语言路线指令及视觉观察，在 Habitat 连续仿真中导航和停止。本站一条第三方 rand100 轨迹注明了动作步长、回合和官方参考初始朝向差异。 | 关注语言指令与导航，单次样例不是总体成绩；不是仓库 AMR 现场验收。 |
| 本地 [EmbodiedX](../../content/benchmarks/embodiedx.json) | 根据记录轨迹中的观测运行指定 VLA/世界模型，在特定硬件上测推理质量、延迟及吞吐。 | 关注模型推理与部署效率，其输出和基于轨迹的测试不等于导航系统闭环表现。 |
| [BARN](https://www.cs.utexas.edu/~xiao/BARN/BARN.html) | 官方说明提供 300 个预生成的拥挤导航仿真环境，测试移动机器人感知—规划—动作链，可按机器人尺寸调整。 | 更关注到目标过程中如何低层避障，并非语言指令理解；官网提供物理搭建思路，不意味着 300 个仿真环境或所有结果都已真机验证。页面给出的运行说明使用 ROS Melodic，当前 ROS 2 兼容性本次未验证。 |
| [Open Navigation Robotics Workload Benchmark](https://github.com/open-navigation/opennav_robotics_workload_benchmark) | 比较计算平台运行 Nav2、VLM 及传感器负载时的系统表现；Gazebo 在另一台计算机模拟仓库和传感器，被测计算平台执行工作负载。 | 是硬件在环的计算平台测试，机器人、场景和传感器为仿真；不等于真实叉车完成取放任务，也不能与 EmbodiedX 的模型延迟或 R2R-CE 的语言导航成绩混排。 |
| [Industrial cuVSLAM Benchmark & Integration](https://arxiv.org/html/2603.16240) | 作者在真实物流环境比较视觉里程计与视觉 SLAM，使用运动捕捉或激光 SLAM 参考计算轨迹位置误差。 | 定位误差与导航任务完成率不同；作者包括 NVIDIA 与 Idealworks，研究和结论须结合其设备、数据与利益关系解读。本次未审计原始数据或复测。 |

对 `docs/research` 和 `content/benchmarks` 使用上述项目英文名称及部分讨论 ID 检索，未发现这些项目明确同名条目；一条通用数值 ID 在 `calvin.json` 的轨迹数值中误命中，不能作为收录证据。名称检索不能排除别名或其他线上内容。

## 开发者实际提出的问题

1. [ROS 使用者](https://www.reddit.com/r/ROS/comments/10osb8w/best_way_to_test_nav_algorithms_with_ros/)询问如何在 ROS/Gazebo 里将自己的算法与现有导航方案比较，并做大量随机仿真以了解鲁棒性；一位评论者推荐 BARN。这体现的是**如何运行并比较自己的算法**，不是明确提出需要新资料网站，也不说明 BARN 适合所有应用。
2. [机器人社区提问](https://www.reddit.com/r/robotics/comments/1oeh2g4/whats_the_current_state_of_navigation_benchmarks/)询问室外、非结构化环境中有哪些常用导航评测；评论者强调机器人类型、动态障碍、传感器和输出不同。那是评论者经验，不足以证明行业没有标准；评论及发帖者身份和代表性未核实。
3. [ROS 规划器比较讨论](https://discourse.openrobotics.org/t/comparing-global-planners-for-navigation/54457)中，作者发布其四种规划器对照；另一评论者质疑 A* 最优性和路径长度的解释，指出可能存在目标代价与评估长度不同等情况。原作者数据与源码本次未复算，其链接仓库读取返回 404；不能据评论认定结论一定错误或归因 AI 生成。该对话说明指标定义和验证入口对阅读比较结果有实际意义。

这些公开提问并不构成本站目标用户访谈、使用率、留存或付费证据。读者可能真正需要的是可运行基准或技术排错，而不仅是解释文章。

## 可核查的硬件在环边界

[Open Navigation 方法页](https://open-navigation.github.io/opennav_robotics_workload_benchmark/methodology/)称单次运行 900 秒，记录系统资源、导航控制循环漏时、完成导航目标数和 VLM 请求状态；传感器驱动开销由实测系数回放成合成负载。页面也说明不同平台最大功率配置与优化运行时不完全一致、功耗口径不同，而且 15 分钟不能反映多小时运行。

“完成目标数”由日志中导航目标成功事件计数，不能擅自改称真实取放次数；功耗也不是墙上插座实测总功耗。项目方称发布了原始日志及分析代码，本次只核查文档，没有自行执行或复算。

来源本身存在待核对差异：当次可读[方法页](https://open-navigation.github.io/opennav_robotics_workload_benchmark/methodology/)写驱动开销测量使用 Orbbec Gemini 355 与 Ouster OS-1；[仓库 README](https://github.com/open-navigation/opennav_robotics_workload_benchmark)写 Realsense D435 与 Ouster OS-1，另称 Orbbec Gemini 335 等近似。仓库描述约 200,000 平方英尺仿真仓库，而[项目发布帖](https://discourse.openrobotics.org/t/nav2-open-navigations-robotics-workload-benchmark-release/56909)写 180,000 平方英尺。这些可能是版本、场景或表述差异，本次没有固定历史提交并追查原因，不能断言某一页错误或任一参数适用于全部运行。

## 语言导航：问答、仿真运动与真实机器人

本地已有 R2R-CE；按名称检索本地 benchmark JSON 和本研究目录，未找到 CapNav、VLN-PE 或 CMU-VLN Challenge 的独立条目，不排除别名或其他位置。相关测试都涉及路线，但输入、控制方式和得分不是同一口径：

| 评测 | 输入、输出与环境 | 与本站 R2R-CE 的区别 |
| --- | --- | --- |
| [CapNav 论文](https://arxiv.org/html/2602.18424)、[代码](https://github.com/makeabilitylab/CapNav) | 基于真实室内扫描，在 Habitat 渲染巡游视频并人工标注导航图；模型依据视频、节点、任务与五类身体能力描述，回答可行性、路径及理由。指标包括可行性 F1、路径有效性、可通行性和理由评估。 | 是离线视频与图上的能力条件推理，不是机器人闭环行驶，也不应将综合分解释为真机导航成功率。理由评分使用大模型裁判；作者报告抽查 300 条理由时人机判定一致率 89%，不能由此认定裁判永远正确。 |
| [VLN-PE 论文](https://arxiv.org/html/2507.13019)、[InternNav 仓库](https://github.com/InternRobotics/InternNav) | 在具物理动力学的仿真中评估人形、四足和轮式平台，关注观测、碰撞、跌倒及控制器。 | `physical controller` 是仿真中的物理控制设置，不应仅凭名称称为真机；同模型 flash 和 physical 控制的结果需分别记录。已有 [VLN 成绩整理](https://github.com/winnk123/awesome-vln/blob/main/VLN_LEADERBOARD.md)将二者分表并标注设置，说明跨协议整理已有替代品；其所列数值未逐条复算。 |
| [CMU-VLN Challenge 2026 规则](https://github.com/Yuxin916/CMU-VLN-Challenge-2026) | 文档描述先在 Unity 仿真中评估，再安排通过阶段的队伍在真机上测试；系统自带定位、避障和底层导航，参赛模块给出路径点、对象标记或数字回答。 | 路线指令还按途经约束、顺序和禁行区域给分，并有时间限制；这是系统协作下的竞赛成绩，不是裸 VLM 端到端电机控制能力。未现场观看比赛或核验最终榜的每条来源。 |

CapNav 的[论文摘要](https://arxiv.org/html/2602.18424)称 473 项导航任务、2,365 个任务与主体组合，官方代码链接的 [Hugging Face 数据卡](https://huggingface.co/datasets/RichardC0216/CapNav)则称 `capnav_v0` 有 2,330 行。2026-11-09 从数据仓库固定修订 `10e97f61e76efb5a3b7cd674ca66675bc1dd8bc7` 直接读取 [题目 Parquet](https://huggingface.co/datasets/RichardC0216/CapNav/blob/10e97f61e76efb5a3b7cd674ca66675bc1dd8bc7/capnav_v0_with_answer.parquet)和[主体档案 Parquet](https://huggingface.co/datasets/RichardC0216/CapNav/blob/10e97f61e76efb5a3b7cd674ca66675bc1dd8bc7/agent_profiles.parquet)，在内存中用 PyArrow 核对：前者 2,330 行、45 个 `scene_id`，按 `scene_id` 与 `question` 完全相同分为 466 组，每组各有五种不同 `agent_name`；后者是 5 行主体档案。数据服务汇总的 2,335 行包含两份文件，不是 2,335 个问题。题目文件 SHA-256 为 `a2bf71a205c2969397701280e224fe3d37c0af4242f75c42dc3411b2811f2642`；本次不转载问题或答案，也未运行模型。

按以上文本分组，文件与论文摘要的 473 项相差 7 组、与 2,365 组合相差 35 行。但论文的任务身份和文件中按原文分组的口径未逐项对齐，不能确定具体缺了哪七项、版本差异或其原因，也不能据此断言论文评测实际使用了这份文件。上述数字是文件核对与论文主张的并列结果，不是质量裁决。

一个实际资料查找问题：[InternNav #287](https://github.com/InternRobotics/InternNav/issues/287)中，使用者表示论文指向代码库，但找不到 VLN-PE 的下载与配置说明；协作者回复仿真安装指南和评估指南链接，提问者致谢并关闭。它证明该使用者曾有定位文档的困难，也说明项目方已有对应解决入口；没有证据表明对方需要或会使用本站。

## 与产品方向的关系

可验证的假设是：一个面向机器人研发人员的评测入口，按“要比较算法、模型推理、计算平台，还是整机闭环”帮助找到合适测试，同时标明机器人、场景、传感器、指标和运行条件。不过 BARN、Open Navigation 和现有导航目录已经提供任务、方法与运行说明；是否能比原资料更省时尚未验证。本站不能用这次调查宣称拥有真实叉车测试能力，也不应直接建立跨这几类任务的统一排名。

## 补充：真实场景重建与真实机器人不是同一种测试

2026-11-10 按名称检索本地 benchmark JSON 与研究文档，未发现 POINav 或 One Scan is Enough 的同名记录；不能据此排除别名或其他位置。下列结果均为作者报告，未独立运行或验证。

- [POINav-Bench 论文](https://arxiv.org/html/2605.28237)：从 11 个真实商业区域采集并重建场景，包含 163 个兴趣点，关注最终能否到达商铺入口附近。论文明确所有评估在 Isaac Sim 中进行；结果表中 POINav 的 SR（2 米）为 42.33、SPL 为 40.29，成功还要求仿真行程无碰撞。这是**真实场景重建中的闭环仿真**，不是 42.33% 真机成功率；场景选取要求足够宽的人行道，不能直接推及所有街区。论文正文称计划开源资源，不能只凭该句断言当时已发布。
- 已有的 [ABotN-Bench 仓库](https://github.com/amap-cvlab/ABot-Navigation/blob/ABotN-Bench/README.md)列出 ABotN-POIBench 的数据、评测工具和成绩，列有 POINav 的 42.3、40.3 与 ABot-N1 的 77.3、72.6；仓库提供中英文入口。其 11 个商业区域、163 个 POI 和 POINav 数据描述相符，数字也对应，但本次未核查两者数据版本、任务划分和实现是否完全一致，不能仅凭数字判断成绩严格可比。该仓库说明现有替代已不只是论文目录；下载入口存在不等于本次完成运行或审查许可。
- [One Scan is Enough 论文](https://arxiv.org/html/2610.33794)是场景适应方法研究，不应直接称作公开通用榜单。作者报告五处室内场景分别扫描 9–20 分钟；真实机器人在已扫描区域合计 200 次测试，按 1.5 米成功半径汇总，RealNav 加适应方法为 85%，其人类示范微调基线为 49%。同一批建筑未扫描区域另测 100 次，分别报告 82% 与 41%。这是作者、特定机器人和场景下的结果，不证明迁移到其他建筑同样有效；论文说明真机接口无法可靠测量相关量，因此 SPL 等只在消融中报告，不能凭成功率补造路径效率或安全结论。
- 一位 [ROS/Nav2 用户](https://www.reddit.com/r/ROS/comments/1uzts46/need_helpros_2_jazzy_nav2_robot_does_not_follow/)描述真实差速机器人上全局路径看似正确、实际行驶却偏离，并询问定位、控制器和代价地图参数。该帖体现单人遇到的系统排查问题，原因未确定；它不等于语言导航需求，也不能证明用户会使用本站。

对产品的启示是把“采集自真实环境”“重建仿真”“真机执行”分别标注，并保留成功阈值、碰撞条件、机器人与场景、次数和成绩提供方。这样的信息组织值得做小范围验证，但现有评测仓库已提供相当完整的资料，是否能带来额外价值仍需用户验证。
