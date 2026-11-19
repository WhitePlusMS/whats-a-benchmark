# 具身与跨领域评测需求：持续调查台账

开始日期：2026-11-09。状态：**调查中，尚未穷尽，也未完成需求验证**。本次同时继续检索非具身评测；此前结果见 [首轮需求报告](2026-11-09-benchmark-user-needs.md)。

多机器人协作补充：[RoCoBench 用户反馈及衍生协议](2026-11-10-rocobench-user-protocol.md)记录中文重规划成本、其他运行问题和 OpenGVL 版本提问；均为个案自报，未独立复现或证明故障根因。

成绩追溯工具补充：[roboeval 与 VSArena](2026-11-09-smolvla-libero-checkpoint-compatibility.md)核对作者自荐、100 条逐次结果和记录缺项；相同任务及 seed 的不同策略运行尚不能证明配对，未运行评测。

同一具身任务的真实复现讨论补充：[LingBot-VA #27 与 Handover Block](2026-11-10-robotwin-handover-reproduction.md)记录多个参与者询问训练配置、运行速度和结果差异；区分同时调整的版本、后续反馈、已有文档及本站单次诊断，不把评论数当访谈数。

逐步安全状态需求补充：[MolmoSpaces 与 LIBERO 外部记录路径](2026-11-10-molmospaces-episode-score-crosswalk.md)记录开发者询问及其对原判断的纠正、已有可选记录接口和未运行边界；同时复算公开评测索引中的早停与分母。

## 本地项目盘点

- 当前本地工作树 `content/benchmarks/*.json` 中，`status=published` 且存在 `embodied` 字段的条目共 **50**，包含不同版本，不能视作 50 个互不相关的基准；这 50 条共有 **144** 个样例记录，均至少有一个记录。数据来自字段统计，不代表每条是实际测试结果、已完整核验或已同步线上。
- 样例类型字段为 record 132、video 8、image 4；record 中仍可嵌媒体。遍历样例 `assets`，39 条评测、70 个样例附资源，视频 49、图片 56、文件 3；这些是资产引用计数，不去重、不证明播放、来源或许可已通过核验。
- 五类可多选，按 `embodied.tasks`：操作 47、导航移动 15、双臂 15、长步骤 16、具身推理 17；多标签不可相加。另有未标 `embodied` 的 EmbodiedX（VLA/世界模型运行性能），不能把其余 268 条断言为全无机器人关系。
- 实例边界：`simpler.json` 有作者录像集中分别标注成功与失败的两条仿真轨迹；`robotwin-1.json` 有训练演示，不能当作测试表现；`roboquest.json` 有官方 eval50 单次记录，不等同整体成功率。以逐条来源和运行条件为准。相关全量样例核验已交接其他工作，不能将它说成全部完成。
- 已有具身导航、任务筛选、评测对比、详情和样例展示。站内收录了 AA-Robotics：Artificial Analysis 于 [2026-10-14 发布 AA-Robotics v0.1](https://artificialanalysis.ai/articles/aa-robotics/)，研究预览通过代码控制真实机械臂，列八项任务。因此具身本身不能视作避开 AA 的差异。

## 一手问题初批（持续扩充）

来源为用户/研究者自述，不证明普遍性、商业需求、错误原因或用户愿意访问新站。Issue open/closed、回应可能变化，数字与日期以链接当前状态为准。

1. [RoboTwin #561](https://github.com/RoboTwin-Platform/RoboTwin/issues/561)：中文用户询问官方榜 C2C/C2R 使用哪一种 instruction 类型；检索时未见回答。问题是榜单口径难找，非确认榜单有错。
2. [RoboTwin #560](https://github.com/RoboTwin-Platform/RoboTwin/issues/560)：复现 checkpoint 的用户寻找 commit、动作掩码、归一化等具体配置；检索时未见答复。
3. [RoboTwin #522](https://github.com/RoboTwin-Platform/RoboTwin/issues/522)：报告者称固定初始 seed/数量时，多 worker 排程可能使实际测试 seed 集合变化；有相应 PR，未独立运行，不将其归因为所有成绩错误。
4. [LIBERO #150](https://github.com/Lifelong-Robot-Learning/LIBERO/issues/150)：用户询问原仓库 README 与 HF 数据卡许可证标注不一致时如何使用数据；检索时未见作者答复，不能自行推断有效授权或作法律判断。
5. [LIBERO #109](https://github.com/Lifelong-Robot-Learning/LIBERO/issues/109)：用户问动作与视频不同步及如何展示轨迹；这是具体个案，不说明所有轨迹都有错。
6. [LIBERO #157](https://github.com/Lifelong-Robot-Learning/LIBERO/issues/157)：用户提出成功谓词的接触、朝向和停留条件疑问；讨论者分析具体代码，影响范围仍有不确定。说明成功率应结合判定条件阅读，不推断评分造假。
7. [LIBERO #148](https://github.com/Lifelong-Robot-Learning/LIBERO/issues/148)：作者后续更正部分数据缺失疑虑，称涉及本地下载不完整/loader 问题。它是反例：用户的初步 bug 报告不应直接变成已证实缺陷。
8. [LeRobot #2354](https://github.com/huggingface/lerobot/issues/2354)：用户称无法复现 SmolVLA 在 LIBERO 的结果，展示命令并询问任务差异；具体原因需看线程和版本，不由本站推断。
9. [LeRobot #3287](https://github.com/huggingface/lerobot/issues/3287)：用户询问复现的训练配置，后续自述调整学习率 schedule 等后差距大幅缓解。是具体处理过程，不等于所有复现问题都由学习率引起。
10. [RLBench #279](https://github.com/stepjam/RLBench/issues/279)：用户想在模拟器重新播放保存的 demo 并进一步询问逐动作执行；评论已提供部分方法。
11. [EmbodiedBench #37](https://github.com/EmbodiedBench/EmbodiedBench/issues/37)：用户即使固定 seed 仍看到初始画面变化；维护者解释部分随机性及可调整设置，不保证完全确定。它不应被概括成已确认 bug。
12. [EmbodiedBench #35](https://github.com/EmbodiedBench/EmbodiedBench/issues/35)：用户不理解可选动作与画面标签对应；贡献者解释有意允许试探，可叠加标签。用户困惑不等于测评设计错误。
13. [EmbodiedBench #47](https://github.com/EmbodiedBench/EmbodiedBench/issues/47)：用户询问代码和轨迹的研究/再发布范围，检索时未见答复；无法据此推定授权。
14. [ROS 温室机器人讨论](https://www.reddit.com/r/ROS/comments/1xgmw5t/i_trained_smolvla_on_49_demos_of_a_ros_2/)：课程作者询问小量演示如何构造困难测试、需要多少实机尝试才能相信成功率；他说明现阶段只是离线记录数据，不能证明实际摘取成功。帖文带课程背景。
15. [机器人训练讨论](https://www.reddit.com/r/robotics/comments/1nf90ku/)：开发者询问仿真到真机差异、数据不一致、长尾失败、边缘算力和如何预测真实表现；是个人经验，不代表实际普遍发生率。
16. [仿真物理参数讨论](https://www.reddit.com/r/reinforcementlearning/comments/1vtynxa/)：用户询问在 LIBERO/RoboCasa 中物体质量、摩擦与碰撞几何如何影响迁移。帖内关于具体资产的概括尚未独立核查。
17. [PhyAgentOS #24](https://github.com/PhyAgentOS/PhyAgentOS-core/issues/24)：中文用户报告默认 PyBullet 示例中场景物体与机器人显示、控制异常；贡献者建议使用 Isaac Sim 驱动。报告未独立复现。
18. [RoboTwin #455](https://github.com/RoboTwin-Platform/RoboTwin/issues/455)：用户描述导入新机器人和物体后接触时的仿真表现，询问物理参数；报告未独立复现。
19. [视频目标定位讨论](https://www.reddit.com/r/computervision/comments/1wss041/new_vlms_vs_hard_video_grounding_questions_gpt6/)：测评展示作者报告视频目标定位结果；评论者关心摄像机移动、天气和遮挡。该帖子自测结果和业务背景未独立验证，也不自动适用于全部工业场景。
20. [OCR 比较讨论](https://www.reddit.com/r/LocalLLaMA/comments/1jz80f1/i_benchmarked_7_ocr_solutions_on_a_complex/)：作者基于单篇带图、表、公式与脚注的文档比较输出，目标是保留结构；单篇排序不能推广为通用能力。
21. [HN：OCR 模型及榜单](https://news.ycombinator.com/item?id=46924075)：用户希望更容易判断实际模型效果，特别提到图表处理。它不证明独立新网站是用户所需解决方案。
22. [RoboCasa #209](https://github.com/robocasa/robocasa/issues/209)：用户询问官方演示重放为什么有时失败；贡献者回应开环动作重放较脆弱，不预期次次成功，并提到检查状态重放的成功判定。问题/回应有版本范围，不可把回放失败自动归咎模型。
23. [RoboCasa #173](https://github.com/robocasa/robocasa/issues/173)：用户询问哪些 VLA 策略可适配 RoboCasa；回复提供部分现有集成和动作维度线索。需要接口适配信息，但不是用户明确提出要一个新网站。
24. [RoboCasa #169](https://github.com/robocasa/robocasa/issues/169)：用户重生成深度等数据，询问颜色变化和 demo 回放成功判定是否与版本有关；未见答复，不当作已确认 bug。
25. [RoboTwin #536](https://github.com/RoboTwin-Platform/RoboTwin/issues/536)：报告者称某物块在随机选为目标时缺少抓取点且可能超出夹爪范围；另一评论者称核对源码并提出 PR，尚未完成 CUDA 端到端验证，是否影响全量成绩不明。
26. [ManiSkill #1499](https://github.com/mani-skill/ManiSkill/issues/1499)：用户报告特定设备读取轨迹时结果标签可能被其他状态替代，附示例及修复 PR；本次未运行，不推断全数据受影响。
27. [BEHAVIOR-1K #2386](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2386)：用户怀疑批次重置后场景状态残留；属于尚待项目确认的具体报告。
28. [EmbodiedBench #43](https://github.com/EmbodiedBench/EmbodiedBench/issues/43)：用户询问 `find` 动作报告成功却未在画面中看到目标；贡献者解释具体环境、后续称已修复。历史报告与当前版本应区分，未独立复测。
29. [OpenVLA 入门者讨论](https://www.reddit.com/r/AskRobotics/comments/1xir14t/)：用户称训练 loss 很低而仿真成功率为零；后续自述修正图像方向和反归一化后部分改善，夹爪问题仍需排查。个人结果不构成普遍解决方案。
30. [ROS 数据准备讨论](https://www.reddit.com/r/ROS/comments/1xg8fre/)：提问者询问录制数据到训练/测试格式、时间同步、动作对齐如何处理。另一相关帖可能来自同一作者，不能按两个独立人计数。
31. [机器人任务 episode 检索工具讨论](https://www.reddit.com/r/datasets/comments/1wvrd59/)：作者自荐可按描述、许可、本体及采集方式检索并导出数据；评论询问遗漏的数据集。覆盖、导出效果及作者自报数量未独立验证，既是需求线索也是竞品反例。
32. [机器人和策略兼容表讨论](https://www.reddit.com/r/robotics/comments/1xilksa/i_made_a_caniusestyle_table_of_which_robot/)：作者称机器人与策略的适配信息分散于文档、论文、模型卡与 issue，自建表并征求纠错；内容准确性未逐项核验。
33. [机器人 benchmark 实机对照讨论](https://www.reddit.com/r/humanoidrobotics/comments/1w2c6g9/)：用户询问是否有可预测真实表现的仿真测试；与 #119、#120 为同一账号，涉及同一个产品，可能有推广关联，不可当作三个独立用户。回复仅是参与者观点，不能将某仿真集与实机结果相关性视为已证实。
34. [LongBench #110](https://github.com/THUDM/LongBench/issues/110)：用户直接询问 LongBench v2 与 HELMET 的区别；帖子很短且未见回答，说明至少一人想比较两项测试，不证明对资料站的需求。
35. [LongBench #128](https://github.com/THUDM/LongBench/issues/128)：中文用户质疑某题答案依据不在上下文；作者回复计划改进数据。不能将单例归结为整个数据集失效，也不假定计划版本已发布。
36. [LongBench #130](https://github.com/THUDM/LongBench/issues/130)：用户询问某例上下文是否缺表、哪里可以报告和查看数据问题；发帖者判断未独立验证。
37. [LongBench #144](https://github.com/THUDM/LongBench/issues/144)：用户报告 API 失败是否会因跳过未答题而影响 accuracy，附代码层面分析；尚未独立复现或确认。
38. [工具调用小模型测试](https://www.reddit.com/r/LocalLLaMA/comments/1qyg10z/)：作者关心什么时候调用工具、什么时候不应调用；少量自测不能外推整体能力。
39. [上述作者的后续](https://www.reddit.com/r/LocalLLaMA/comments/1r4ie8z/)：作者称解析器格式影响一个模型的表现；与第 38 条同一作者，不能当独立人数，也不能直接推及官方榜。
40. [量化与工具调用讨论](https://www.reddit.com/r/LocalLLaMA/comments/1tvb7lq/)：用户希望看到 JSON 和字段层面的工具调用能力，不只看量化后的困惑度或写作；对精度影响的推测尚待验证。
41. [BFCL #861](https://github.com/ShishirPatil/gorilla/issues/861)：用户质疑原生工具调用与评测 handler 的处理，协作者解释了 prompt 构造；不能推断当前版本错误。
42. [BFCL #920](https://github.com/ShishirPatil/gorilla/issues/920)：用户关注多轮工具调用中早期错误与整题评分的关系，建议调整测试设置；这是一位使用者的具体建议。
43. [VLA evaluation harness #113](https://github.com/allenai/vla-evaluation-harness/issues/113)：用户指出 BEHAVIOR 适配器运行的是旧年度协议，不能等同新版赛事；协作者认可并改进版本标识。这是已被回应的明确口径问题。
44. [RLinf #1244](https://github.com/RLinf/RLinf/issues/1244)：用户称 ManiSkill pi0.5 复现结果偏低，询问环境采样、步长和重复测试；另一位评论者要求日志，本次未独立运行。
45. [EmbodiedBench #7](https://github.com/EmbodiedBench/EmbodiedBench/issues/7)：用户问 EB-Nav base 子集复现差异；贡献者区分 base 与总体结果，并说明历史上下文等配置。用户继续报告运行问题；不是所有模型的差异都能归因于这一配置。
46. [GraspNet #144](https://github.com/graspnet/graspnet-baseline/issues/144)：用户询问相机标定相关细节。只表示用户有具体问题，未判定原始标定有误。
47. [GraspNet #143](https://github.com/graspnet/graspnet-baseline/issues/143)：用户询问物体点云转换后与场景不对齐；具体原因需查看讨论，不以报告认定数据错误。
48. [日本团队的微波炉开门测试](https://team-z.co.jp/blog/flex-pi-checkpoint-task-compatibility)：团队叙述开始使用的 checkpoint 与目标任务不匹配，换模型与环境后 3 次仿真中 1 次达到成功条件；作者明确没有实机验证。样本极小，不用于模型排名。
49. [日本参与者的 LIBERO-Plus 记录](https://zenn.dev/iruma4/articles/083c10df900e25)：参与者记录模型、服务接口、依赖和公开/隐藏任务区别；是参与者实践，不是正式成绩。
50. [NVIDIA 开发者论坛：SO-101 仿真到实机](https://forums.developer.nvidia.com/t/physical-modelling-of-sim2real-so101-arm-project/371627)：用户询问模拟训练策略如何在实机评估；成绩与设置为用户自报。
51. [HF 社区：LIBERO 到 LeRobot 的状态映射](https://discuss.huggingface.co/t/converting-libero-hdf5-to-lerobot-format-how-to-map-79-dim-state-to-8-dim/180039/)：用户询问不同维数状态如何对应；评论是诊断建议，不是已核实的统一转换公式。
52. [V2EX：本地订单截图 OCR](https://v2ex.com/t/1207206)：用户需要从中文外卖订单截图和手机照片提取订单号，同时约束云成本、本地 GPU 与准确率；评论中的工具推荐未独立测试。
53. [LINUX DO：本地表格识别](https://linux.do/t/topic/1804908)：提问者称表格识别效果和硬件需求难兼顾；公开抓取存在限制，个人体验不等于通用模型效果。
54. [V2EX：试卷 OCR 与阅卷](https://v2ex.com/t/1129336)：讨论者提及试卷/客观题识别的问题并讨论相关评测；上下文为具体帖子评论，而非对整个 OCR 用户群的调查。
55. [LINUX DO：识别表格后的单元格定位](https://linux.do/t/topic/1124029)：评论者希望同时获得结构和对应坐标；其对所试工具的描述是个人经验。
56. [V2EX：Office 文档转 Markdown](https://www.v2ex.com/amp/t/1106448)：开发者介绍已有方案并指出复杂表格与图片限制；它是已有解决路径的反例。
57. [Video-MME 等测试覆盖讨论](https://www.reddit.com/r/MLQuestions/comments/1rvy311/)：发帖者问多种视频 benchmark 能否覆盖现实视频能力；回复提到低照度、监控视频、采样与遮挡。各测试是否确实缺少这些条件还需查原始定义。
58. [视频模型实测讨论](https://www.reddit.com/r/LocalLLaMA/comments/1wkmzwi/)：参与者讨论应记录时长、采样帧率、分辨率等配置；单人测试不代表通用模型性能。
59. [日历截图解析任务](https://www.reddit.com/r/LocalLLaMA/comments/1ukuph9/)：用户称试图从截图重建日程时遇到时间偏差和跨天问题并制作自己的测试；这是个人业务例子。
60. [本地视频分析怎么做](https://www.reddit.com/r/LocalLLaMA/comments/1izf5d9/)：用户询问如何处理视频及寻找教程；回复讨论视频模型、抽帧和转录。是学习需求，不直接等于 benchmark 资料站需求。
61. [lmms-eval #1244](https://github.com/EvolvingLMMs-Lab/lmms-eval/issues/1244)：报告者提出特定后端视频元数据/时间戳处理问题；维护者后来关联 #1248 并关闭。本站未复现，不能断言当前版本仍有此问题或全部成绩受影响。
62. [HN：OCR 与提示注入](https://news.ycombinator.com/item?id=43118514)：一名用户想看文档和转录中的指令能否诱导模型误执行；作者回复其观察，不构成全面安全性测试。
63. [OpenAI 开发者社区：长上下文对照](https://community.openai.com/t/performance-of-gpt-4o-on-the-needle-in-a-haystack-benchmark/744927)：参与者询问模型大海捞针成绩；回复指出模型版本和图表口径应核对，其他参与者对实用性意见不同。嵌入的 X 内容属于二次转录。
64. [真实机器人仓储评测讨论](https://www.reddit.com/r/MachineLearning/comments/1sajdwr/p_phail_phailai_an_open_benchmark_for_robot_ai_on/)：评测作者强调吞吐、人工干预和实机轨迹；为项目作者自荐，数值未独立验证，不适用于所有工位。
65. [VLN-CE #73](https://github.com/jacobkrantz/VLN-CE/issues/73)：用户问导航真值动作如何生成；后续有人称按已有轨迹驱动时卡住，检索时未见官方解答。
66. [VLN-CE #53](https://github.com/jacobkrantz/VLN-CE/issues/53)：用户希望导出导航视频，维护者给出已有视频工具，提问者称解决；说明问题不等同于没有现成方案。
67. [VLN-CE #47](https://github.com/jacobkrantz/VLN-CE/issues/47)：用户询问 actions 与 locations 两个字段元素数量为何不同；是具体疑问，非已独立确认的数据缺陷。
68. [GraspNet API #47](https://github.com/graspnet/graspnetAPI/issues/47)：用户观察某测试场景似乎含其他划分的物体并询问；未见答复，不据此认定数据泄漏。
69. [GraspNet API #64](https://github.com/graspnet/graspnetAPI/issues/64)：用户询问抓取标签为什么含碰撞；未见答复，不假定标签有错。
70. [GraspNet baseline #146](https://github.com/graspnet/graspnet-baseline/issues/146)：用户问仿真可抓取而实机不能时如何排查，怀疑坐标变换；根因未独立确认。
71. [SuctionNet #1](https://github.com/graspnet/suctionnet-baseline/issues/1)：用户请求更详细的吸盘姿态标注说明或工具，未见回复。
72. [SuctionNet #12](https://github.com/graspnet/suctionnet-baseline/issues/12)：用户询问训练需要的 GPU 时间，随后自报使用 3090 约 95 小时且结果欠佳；不是另一位用户的独立报告，也不是已验证的通用计算成本。
73. [BEHAVIOR-1K #2333](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2333)：用户提交最小示例，质疑配对谓词判断；尚未运行复现，不能推断历史榜单受到影响。
74. [BEHAVIOR-1K #2373](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2373)、[#2372](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2372)：同一用户分别报告门洞导航图和视觉/碰撞网格的疑问；按一位提问者理解，不能假设都已确认为当前缺陷。
75. [HumanoidBench #40](https://github.com/carlosferrazza/humanoid-bench/issues/40)：用户称无法复现特定人形任务结果并提供训练记录，未见答复。
76. [HumanoidBench #66](https://github.com/carlosferrazza/humanoid-bench/issues/66)：另一用户请求特定任务模型 checkpoint 用于比较，未见答复。
77. [HumanoidBench #38](https://github.com/carlosferrazza/humanoid-bench/issues/38)：用户询问实验算力与时间，给出个人设备的耗时；不能将该数字作为一般成本估计。
78. [HumanoidBench #42](https://github.com/carlosferrazza/humanoid-bench/issues/42)：用户困惑关节数量与观测向量维度不同；另一用户解释观测还含浮动基座位姿和速度。这是已有社区解释。
79. [HumanoidBench #69](https://github.com/carlosferrazza/humanoid-bench/issues/69)：用户询问默认观测是否含全局坐标，未见答复。
80. [知乎：机器人数据质检工具对照](https://zhuanlan.zhihu.com/p/2099103999043679630)：一名工具作者对比自己的 RDA 与另一工具，报告各自关注维度不同，并自述本地视频缺失时自己的工具曾错误给出通过结果；作者说明数据量和算法边界。本次通过浏览器读取原文，未独立复验，且作者有产品利益。
81. [B 站具身数据集视频](https://www.bilibili.com/video/BV19upe6yEeb/)：视频覆盖 DROID、OXE、LIBERO 等，公开可见的部分评论有人询问训练流程、讲义或逐字稿。评论不完整、视频存在内容作者目的，只能作为学习资料查找的弱信号。
82. [X：开发者的六轮 Agent 测试](https://x.com/RichP/status/2027055235756073319)：作者描述关注多轮纠错、拒绝编造和实际调试工作，并询问其他人体验；评论有人强调小模型成本优势。浏览器可见公开原帖和部分回复，结论是个人经验，不代表基准事实。
83. [X：BEHAVIOR Challenge](https://x.com/drfeifei/status/2076729080679186849)：研究者介绍长步骤规划、操作和失败恢复，以及赛事；此为活动组织方发布，不是独立用户需求。浏览器读取了首帖，未完整读取长串回复。
84. [X：机器人安全评测讨论入口](https://x.com/chooi_jeq/status/2101118049944543545)：评测项目作者报告危险任务实验并展示传播数据；其结论和视频未独立复验，不能泛化成模型安全能力；相关 [Reddit 讨论](https://www.reddit.com/r/singularity/comments/1wkw0ln/) 对家庭、工业及场景语境有不同意见。
85. [Whisper 粤语识别讨论](https://github.com/openai/whisper/discussions/2419)：用户关心粤语与普通话识别、口语文字与书面语差异；其他参与者有不同经验，不能断定全部 ASR 模型表现。
86. [Whisper 多语言混说讨论](https://github.com/openai/whisper/discussions/2009)：讨论中的回复者描述粤英混说时英文词被翻译或改写，希望保留原文；原帖关注其他语言组合，属于具体用户报告。
87. [Whisper 繁简输出讨论](https://github.com/openai/whisper/discussions/277)：不同用户希望控制繁体和简体，维护者提供过 prompt 等建议，后续版本中仍有不同经验，不能说所有版本已解决。
88. [Whisper 静音误输出讨论](https://github.com/openai/whisper/discussions/2856)：用户报告静音时重复输出；单人报告，未独立复现。
89. [WhisperIME #144](https://github.com/woheller69/whisperIME/issues/144)：用户询问中英偏好和粤语繁简输出，维护者说明部分设置但仍有具体识别疑问；是部分已有解决方案。
90. [语音 Agent 架构讨论](https://www.reddit.com/r/voiceagents/comments/1x9qi2b/)：使用者比较原生语音与语音识别、文本模型、语音合成串接，关注时延、打断与观测；已有相关测试，应区分模型和完整系统。
91. [电话语音与打断检测](https://www.reddit.com/r/speechtech/comments/1ral2xz/)：用户讨论咳嗽、背景声和确认语对语音活动检测的影响；为其业务经验，不构成通用效果结论。
92. [中文版图片编辑讨论](https://linux.do/t/topic/3054384)：作者自测漫画上色、繁简转换和参考角色一致性；是单人单次主观经验，不用于判定模型排名。
93. [含中文图片编辑讨论](https://linux.do/t/topic/951346)：二楼评论者询问带中文文章的图片能否编辑，楼主回答不同工具的主观看法；直接定位了该评论，不证明工具整体能力。
94. [生图能力测试提示词讨论](https://www.reddit.com/r/StableDiffusion/comments/1vcs0fh/)：作者询问用于验证模型能力的提示词库；评论者建议分别比较数量、空间、文字和属性绑定，并控制变量、重复生成。
95. [图像编辑效果讨论](https://www.reddit.com/r/StableDiffusion/comments/1xoq1b5/)：用户询问具体编辑任务效果问题，评论讨论提示词/参数；不能由单帖判断模型优劣。
96. [图像比较维度讨论](https://www.reddit.com/r/aiArt/comments/1wi7d5v/)：参与者建议分别测试文字、数量、角色一致、未编辑区域和多轮修改；低互动个案，不代表市场规模。
97. [中文科技论文翻译讨论](https://linux.do/t/topic/380215)：用户询问工科论文中译英的模型选择；术语和上下文是回复者提出的关注点，工具推荐为评论者观点。
98. [V2EX 小说翻译讨论](https://www.v2ex.com/t/1078372)：发帖者关注人物和地名跨上下文一致及成本，人工校对是评论者的补充；各人经验与价格并非市场调查。
99. [翻译任务被执行的讨论](https://www.reddit.com/r/LocalLLaMA/comments/1v31z4z/)：用户描述模型翻译题目时执行题意、分块后术语和格式不一致；为具体工作流报告。
100. [本地化从业者讨论](https://www.reddit.com/r/machinetranslation/comments/1utlcnd/)：发帖者发起调查并引导填写问卷，评论者讨论专业术语、分段上下文和语气；发帖者自称未销售产品但利益关系未独立验证，不能由帖子推断翻译可靠性。
101. [LeRobot #4944](https://github.com/huggingface/lerobot/issues/4944)：发帖者称转换后上传可能默认写入与源数据不同的许可，关联 [PR #4951](https://github.com/huggingface/lerobot/pull/4951)。发帖者也是相关数据检查器作者，有潜在推广关联；其抽样比例未独立核验，关联 PR 不自动证明修复已合并。问题是许可追溯，而不是所有条款都错了。
102. [RoboEval #2](https://github.com/Robo-Eval/RoboEval/issues/2)：用户问代码许可是否覆盖数据，未见维护者答复。与 #4、#13 是不同项目中反复出现的使用疑问，不据此作法律结论。
103. [LeRobot #3191](https://github.com/huggingface/lerobot/issues/3191)：用户请求训练或推理所需硬件指南，贡献者提供已有资料和排查建议；[官方路线图](https://github.com/huggingface/lerobot/issues/3134) 已列相关指南，规划不等于已完整交付。
104. [BEHAVIOR-1K #2284](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2284)：用户描述放置后的成功谓词似乎滞后，维护者询问数据；作者还提出 settle 的本地观察，未独立复现。
105. [Nav2 #6346](https://github.com/ros-navigation/navigation2/issues/6346)：用户讨论靠墙误停与提前制动之间的权衡，另一人讨论实际轨迹和预测不一致；这是导航工程问题，不是用户请求评测目录。
106. [IsaacLab #5807](https://github.com/isaac-sim/IsaacLab/issues/5807)：用户询问刚体与可变形物体的接触力测量；维护者说明当时支持边界并转至其他 issue。当前版本情况应另查。
107. [IsaacLab #7613](https://github.com/isaac-sim/IsaacLab/issues/7613)：用户报告特定读取配置下接触力残留；维护者称已在 develop 与 release 3.0 修复并关闭，本次未复测，不应说当前版本必有问题。
108. [PhAIL 真机讨论](https://www.reddit.com/r/robotics/comments/1s8tt6j/)：评论者分别询问硬件、人工/遥操作对照、可靠性与吞吐及传统专用方案；发帖者是 #64 同一项目作者，不是另一个独立项目或发帖者。帖子不代表所有工业场景。
109. [WMT24++ 数据卡讨论](https://huggingface.co/datasets/google/wmt24pp/discussions/2)：用户询问 `Negative MetricX-24-QE` 的定义及计算；项目成员解释 QE 并提供代码入口，但未明确解释 Negative 的含义，原帖并未说具体分数是负数。
110. [FLEURS 数据讨论 #8](https://huggingface.co/datasets/google/fleurs/discussions/8)：用户指出个别语音与文字不一致并询问纠错；项目成员回应如何处理，不能推定全部问题都已解决。
111. [FLEURS 数据讨论 #16](https://huggingface.co/datasets/google/fleurs/discussions/16)：开发者提出个别噪声音频疑似配有转写，并估算更多候选；总量是作者自己的分析，未全部人工核实。
112. [FLEURS 数据讨论 #19](https://huggingface.co/datasets/google/fleurs/discussions/19)：用户询问 dev/test 是否存在说话人重叠；未见官方回答，不能认定泄漏存在。
113. [Full-Duplex-Bench #19](https://github.com/DanielLin94144/Full-Duplex-Bench/issues/19)：代表语音产品的发帖者询问级联 agent 参赛和评委、ASR、时延设置；有厂商接入动机，不是无利益关联的普通用户访谈。
114. [Full-Duplex-Bench #20](https://github.com/DanielLin94144/Full-Duplex-Bench/issues/20)：用户质疑 backchannel 和轮次指标的具体实现；属于未独立复现的报告。
115. [OmniDocBench #266](https://github.com/opendatalab/OmniDocBench/issues/266)：复测者结合裁图和标注质疑输出与得分；维护者要求具体样本，发帖者的污染推测尚未证实。
116. [OmniDocBench #258](https://github.com/opendatalab/OmniDocBench/issues/258)：第三方称在自己的环境运行官方配置时，公式分数与已发布榜单不同；协作者确认收到差异，但表示缺维护资源调查原因或验证新榜行。本次未复现，不断言官方分数错误。
117. [MV 硬字幕与歌词提取讨论](https://v2ex.com/t/1254752)：软件自荐帖中的另一位评论者在多楼描述歌词识别、时间轴与人工校对；已定位评论，具体场景不等于 FLEURS 覆盖范围。
118. [韩语 PyTorchKR 文档解析比较](https://discuss.pytorch.kr/t/pymupdf-vs-docling/12120)：作者来自文档软件相关组织，解释为什么用第三方 ParseBench 比较解析质量、速度和本地部署；其榜单偏差统计和模型结果为作者自报，未独立审计。此条是韩语行业作者观点，并非具身用户访谈。
119. [真机测试前怎样筛选 checkpoint](https://www.reddit.com/r/robotics/comments/1w0jhr1/)：提问者想知道能否通过 LIBERO、SIMPLER 或其他仿真测试减少昂贵的真机测试；回答尚不能证明任何仿真测试预测真机的能力。
120. [VLA 跨测试排名是否一致](https://www.reddit.com/r/deeplearning/comments/1w1gf4t/)：与 #33、#119 同一作者询问 LIBERO、RoboTwin 等跨榜排名差异及高分是否仍有区分度；三帖不能算三个独立用户，且可能有推广关联。
121. [如何使用和信任机器人评测](https://www.reddit.com/r/robotics/comments/1ty2zea/)：提问者询问评测是否影响模型选型、仿真和实机如何比较、什么信息可提高可信度；是征集观点，不证明某种工具已被验证。
122. [LongBench #139](https://github.com/THUDM/LongBench/issues/139)：中文用户问复现时 Qwen 的上下文、输出长度和位置外推设置；未见回复，不能自行补全官方设置。
123. [LLaVA-OneVision-2 #192](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2/issues/192)：用户询问 Video-MME 复现中的视频时长、帧数与 token 预算对应关系；协作者解释分时长配置及部分基线超参搜索，提问者称问题已答复并关闭。本站未运行复现，关闭不证明成绩被独立复验；详见[视频理解专项](2026-11-09-video-understanding-protocols.md)。
124. [发布成绩聚合工具的作者与读者讨论](https://www.reddit.com/r/LocalLLaMA/comments/1oa98jf/)：LLM Stats 作者描述从论文和模型卡收集成绩、保留出处；这是与原始构想直接重叠的竞品，评论者提出覆盖和来源筛选等反馈。作者同时宣称计划独立评测，不等于已实现或验证产品需求规模。
125. [榜单与个人工作体验的差异](https://www.reddit.com/r/LocalLLaMA/comments/1vbdpcz/)：发帖者以邮件措辞和提示改写为例，认为自己的体验与 AA 等榜单不一致；评论也有建议使用自有任务。个人主观经验不证明具体模型能力高低或对新站的需求。
126. [模型报告与其他来源成绩对照](https://www.reddit.com/r/LocalLLaMA/comments/1x9skrx/)：榜单项目作者公布自己的成绩对照，评论者讨论评测设置与版本可能影响差异。作者统计、匹配口径和对动机的推测未经本次独立审计，不能把其均值当作行业事实；这是现有竞争方案及相关讨论。
127. [本地如何比较不同模型](https://www.reddit.com/r/LocalLLaMA/comments/1xrbhdf/)：提问者想比较离线模型的速度、推理和工具调用，并询问可用软件；评论者各自建议现成工具、关注特定榜单或自建业务任务集。问的是本地评测执行，不是明确寻求资料网站。
128. [日本开发者梳理模型发布采用的评测](https://zenn.dev/dmuraoka/articles/2f234af1efc256)：作者看到新模型分数但不熟悉基准，自己整理不同模型发布页所用评测，希望进一步理解如何评价自己的提示。是一个自助研究实例，不等于已有站点的使用意向。
129. [日本工程师检查评分口径](https://zenn.dev/sun_asterisk/articles/39c9a38680aeef)：作者称在工作中遇到按分数差选模型的问题，自行改变 MMLU-Pro 和 GSM8K 的评估条件，报告评分与提示会影响结果。结果是作者自己的实验，本次未复现，也不意味着所有模型都会同幅变化。
130. [日本文章解释发布中的评测](https://zenn.dev/shoyataguchi/articles/7d0b6e2b02a905)：作者用近期模型发布资料、代表性任务和综合指数解释评测机制，明确希望用于理解自家 AI 系统评价；是现有内容方案的竞争反例，作者的整理未逐项审计。
131. [真机操作模型的对照需求](https://www.reddit.com/r/MachineLearning/comments/1tje2qd/)：发帖者为实际机械臂方案寻找模型对照，关心失败模式、演示数据量和重复训练；评论者提出机器人/夹爪兼容、标定和延迟。个人自述与身份尚未独立验证，不证明他们需要新资料站。
132. [中文 LIBERO 复现记录](https://github.com/Morimorerain/Resilient/blob/main/README.zh-CN.md)：项目作者记录其 FastWAM 基线的版本、显卡、环境和回合数，并自报与论文结果的差异。这是已经存在的中文复现方案，记录和结果未独立重跑，不是终端客户访谈。
133. [BEHAVIOR 结果指标纠错](https://github.com/IliaLarchenko/behavior-1k-solution/issues/17)：Hugging Face 人员邀请项目作者核对论文结果和元数据；作者回复当年榜单主指标 Q-Score 包含部分完成度，应与完整成功率区分。这是已有平台的数据核对过程，不是普通用户购买新站的证据；以各年官方规则为准。
134. [BEHAVIOR 复现波动、版本与逐任务数据](https://github.com/IliaLarchenko/behavior-1k-solution/issues/7)：提问者询问同场景复测波动及任务数据版本；项目作者解释环境与模型随机性。提问者随后明确要求图片中的逐任务数字，以便分析任务间表现差异；作者回应已有官方公开和隐藏测试结果 JSON 并给出链接，提问者致谢关闭。属于历史版本中的具体需求，且已有原始数据解决入口；不证明现版本缺陷、其他读者都会遇到该问题或愿意使用本站，本次未重跑。
135. [Step-3.5-Flash 的 GPQA Diamond 复现](https://github.com/stepfun-ai/Step-3.5-Flash/issues/41)：开发者报告使用两套评测代码时未对齐发布成绩，询问测试版本、推理参数、模板和答案抽取。其原因推测尚未确认，本次未复测，不能据此说发布成绩错误。
136. [CALVIN #109](https://github.com/mees/calvin/issues/109)：用户想分别在 A、B、C、D 环境评估，询问具体配置位置；检索时未见回复，不能自行推断配置矛盾或测试错误。
137. [CALVIN #99](https://github.com/mees/calvin/issues/99)：用户直接询问仿真中成功条件如何自动判定；帖子很短，检索时未见答复，不代表不存在官方定义。
138. [CALVIN #98](https://github.com/mees/calvin/issues/98)：用户询问长序列的自然语言目标如何衔接，以及子任务完成后目标是否变化；检索时未见答复，是具体理解疑问。
139. [CALVIN #110](https://github.com/mees/calvin/issues/110)：用户对比数据动作和仿真图像，报告方向不一致；另一评论者建议检查相对动作的维度处理和已有 wrapper。本次未独立复现，不能将建议视为已证实根因。
140. [VLABench #81](https://github.com/OpenMOSS/VLABench/issues/81)：用户报告复现特定 checkpoint 结果较低，询问 LoRA/完整微调与基础权重来源；检索时未见回复，原因未确认。
141. [VLABench #90](https://github.com/OpenMOSS/VLABench/issues/90)：报告者认为特定 commit 的两项任务指令与成功条件存在不一致，提交例子与建议；其试验和影响未独立复现，不可推及其他任务或全部榜单。
142. [VLABench #91](https://github.com/OpenMOSS/VLABench/issues/91)：与 #141 同一作者报告特定 commit 随机场景 seed 的重现问题，并建议暴露随机状态；是随机初始化场景报告，不等于已保存配置的重放均不可复现。
143. [VLABench #77](https://github.com/OpenMOSS/VLABench/issues/77)：用户质疑特定总分计算未计入部分分项，附代码和计算例；本次未运行，也未确认现行版本或已发布榜单受影响。
144. [Habitat Lab #148](https://github.com/facebookresearch/habitat-lab/issues/148)：2019 年用户复现导航模型时成功率和 SPL 为零；贡献者说明当时动作编号变化并提供转换脚本，用户称脚本有效。历史 issue 后于 2022 年作为过期问题关闭，不能当成当前版本仍有的缺陷。
145. [RoboDojo #32](https://github.com/robodojo-benchmark/RoboDojo/issues/32)：报告者据代码询问异常中止回合是否从分母剔除、结果是否缺 seed；评论者希望保留丢弃录像。尚未见官方确认，不能断言榜单分数存在偏差。
146. [RoboDojo #36](https://github.com/robodojo-benchmark/RoboDojo/issues/36)：用户请求公开与训练数据对应的 seed 或场景布局，以重建逐帧 3D 框和物体姿态；有其他用户附议，检索时未见官方回复。
147. [RoboDojo #57](https://github.com/robodojo-benchmark/RoboDojo/issues/57)：用户询问移除桌面标定等信息后的模型表现；贡献者称对应消融尚未进行，因此成绩未知，不能自行估算。
148. [RoboDojo #54](https://github.com/robodojo-benchmark/RoboDojo/issues/54)：用户询问井字棋任务中双臂回位后才推进对手回合的条件；贡献者称演示包含该动作、计划补充回位条件。计划不等于已经交付，同作者其他 issue 不可计为独立人数。
149. [RoboDojo #64](https://github.com/robodojo-benchmark/RoboDojo/issues/64)：用户报告特定版本仿真画面颜色或亮度差异，附运行脚本；作者未运行策略，原因未确认，不能推断影响模型成绩。
150. [OmniDocBench #218](https://github.com/opendatalab/OmniDocBench/issues/218)：用户询问 v1.6 如何分别评估文本、公式和表格；贡献者解释当时限制并介绍 v1.5 等方法，提问者称理解。不代表当前版本永久不支持。
151. [Open ASR #147](https://github.com/huggingface/open_asr_leaderboard/issues/147)：用户请求纳入 FLEURS 中文，讨论者说明多语言评分需处理的规范化、汉字及数字等问题；相关实现状态可能变化，不据此声称中文评测空白。
152. [Video-MME #42](https://github.com/MME-Benchmarks/Video-MME/issues/42)：用户称难以本地跑完所有模型，希望官方榜更新更多模型，也方便核对设置；这是需要集中成绩的直接线索，但不证明愿意为第三方榜付费。检索时未见回复。
153. [Video-MME #33](https://github.com/MME-Benchmarks/Video-MME/issues/33)：用户希望获得闭源模型逐题原始评测结果；该 issue 未见答复，不能由此断言其他渠道没有公开。
154. [Video-MME #32](https://github.com/MME-Benchmarks/Video-MME/issues/32)：用户询问评估支持更大上下文的模型时采用特定帧数的依据；未见答复，不代表更多帧一定更好。
155. [Video-MME #29](https://github.com/MME-Benchmarks/Video-MME/issues/29)：用户请求评测 prompt，另一位用户回复论文已有；它反映信息查找问题，不意味着资料不存在。
156. [ALFRED #145](https://github.com/askforalfred/alfred/issues/145)：用户希望不下载全部大型数据即可查看 PDDL 和初始状态；协作者提供从 JSON 恢复场景的部分思路，后续用户仍询问 domain 文件位置。具体获取需求不等同购买新站。
157. [ALFRED #152](https://github.com/askforalfred/alfred/issues/152)：用户询问轨迹数据中 pddl_params 和 plan 字段的含义；检索时未见答复，不能替作者补写未经验证的解释。
158. [Meta-World #606](https://github.com/Farama-Foundation/Metaworld/issues/606)：用户报告特定版本批量元学习评测按先完成回合收集可能影响结果，并附未合并 PR；尚未独立复现，也不推断已发布成绩或本站单次演示受影响。与本站代码版本的关系见[Meta-World 对照](2026-11-09-metaworld-reproducibility-crosswalk.md)。
159. [Meta-World #609](https://github.com/Farama-Foundation/Metaworld/issues/609)：用户询问代码许可是否覆盖随附物体网格、纹理和机器人模型；未见维护者答复，不据此给出法律结论。
160. [RoboChallenge Table30 数据讨论 #2](https://huggingface.co/datasets/RoboChallenge/Table30/discussions/2)：用户报告格式转换耗时与版本兼容问题，项目成员和其他使用者提供不同版本或固定提交的经验；不能推断其中某一种方法适用于所有环境。
161. [RoboChallenge Table30 数据讨论 #3](https://huggingface.co/datasets/RoboChallenge/Table30/discussions/3)：用户询问用 Dexbotic 训练原版 Table30 的教程，检索时未见回复；原版与 Table30v2 应区分。
162. [日本开发者比较日语文档解析](https://zenn.dev/konta_dev/articles/aee230c16e21c6)：作者使用 OmniDocBench-JASyn 比较日语文档解析和成本，并记录本地公式指标依赖及容器使用；作者与供应商关系及结果未独立核验，不代表全部用户。
163. [日本开发者比较 ASR](https://github.com/kuro-shiba/ASR_ja_comparison)：作者公开日语 FLEURS 测试的 CER、吞吐、p95 与复现配置；这是自报的现有实践，不是用户对新站的购买意愿。
164. [OmniDocBench #238](https://github.com/opendatalab/OmniDocBench/issues/238)：用户给出文本被预测为表格时的最小复现，贡献者确认当时实现存在遗漏并称修复及影响分析进行中；另一用户后续报告复现并更正自己的部分判断。本次未核查修复是否合并，不断言现版仍有问题或历史榜单排名已改变。
165. [BiGym #28](https://github.com/NeuracoreAI/bigym/issues/28)：用户询问重置姿态是否随机以及全身/双臂控制；论文共同作者回答当时姿态固定、论文评测使用双臂。原版历史设置不能直接套用 BiGym 2.0。
166. [BiGym #36](https://github.com/NeuracoreAI/bigym/issues/36)：用户询问论文中的模仿学习使用多少示范；检索时未见答复，不代表论文或其他资料一定没有此信息。
167. [BiGym #43](https://github.com/NeuracoreAI/bigym/issues/43)：用户报告特定版本下找不到部分任务的示范数据；未独立运行，不能据此断言官方未发布。
168. [BiGym #30](https://github.com/NeuracoreAI/bigym/issues/30)：用户查找 baseline 代码，协作者提供 RoboBase 链接；后续讨论涉及旧版示范与环境差异，其他使用者报告通过更新及指南解决部分错误。这是已有处理路径，不是当前所有问题均已解决。
169. [阿拉伯语长采访转写](https://www.reddit.com/r/LocalLLM/comments/1w3rry7/transcription_models/)：发帖者称使用 Whisper 处理一小时阿拉伯语采访时出现幻觉并增加校对工作，询问其他模型；评论提出语音活动检测、方言与抽样建议，但原因及效果未独立验证。
170. [韩语 FLEURS 误差检查](https://github.com/jigonyoo/ko-asr-error-audit)：作者分析韩语转写中的参考文本、格式及语义误差，也记录自己早期检查的错误；为作者自报的小范围检查，本次未复现，不代表韩语整体质量。
171. [RLE-Bench #7](https://github.com/RLE-Bench/RLE-Bench/issues/7)：工具开发者希望模型成绩关联机器可读的评测版本、预算、次数及来源；他自述正在做 KnownRobot，存在产品关联。贡献者指出 Harbor 的结果文件已有不少字段，提问者进一步要求稳定导出和核查缺项；不是无人提供运行证据，也不证明付费需求。
172. [RLE-Bench #8](https://github.com/RLE-Bench/RLE-Bench/issues/8)：开发者针对同一溯源讨论提出逐次运行失败信息汇总；贡献者称由 [#9](https://github.com/RLE-Bench/RLE-Bench/pull/9) 修复并于 2026-11-09 关闭，PR 显示已合并，本次未运行复测。不按两个独立客户统计 #7 与 #8。
173. [RobotArena∞ #8](https://github.com/offjangir/RobotArena/issues/8)：用户询问自动场景生成及数据创建代码的发布时间；检索时未见答复。公开路线图不能单独证明仓库完全没有任何相关代码，也不能把获取工具的需求当作购买资料站的意向。
174. [RoboEval #9](https://github.com/Robo-Eval/RoboEval/issues/9)：用户称 Arch Linux 的 Wayland 环境下键盘遥操作不工作，并提出潜在依赖原因；属于个别未经本次复现的环境问题，不推断其他操作系统也受影响。
175. [GraspNet #107](https://github.com/graspnet/graspnet-baseline/issues/107)：用户想查已见与未见测试物体名单；协作者指向各场景 `object_ids.txt` 和物体名称表，成员补充可用 API 按场景获取。是信息定位需求，已有部分官方路径，不等同名单未公开；提问者随后另问深度图采集。
176. [GraspNet #141](https://github.com/graspnet/graspnet-baseline/issues/141)：中文用户询问该工作中 Kinect 与 RealSense 结果差异的原因；只有标题，浏览时未见回复，也没有足够细节验证其对其他工作的概括。不能据此认定某相机普遍更好。
177. [GraspNet #144](https://github.com/graspnet/graspnet-baseline/issues/144)：用户询问论文的相机外参标定具体方法、数据采集及内参处理；浏览时未见回复，不代表这些信息在其他位置一定不存在。
178. [GraspNet #143](https://github.com/graspnet/graspnet-baseline/issues/143)：用户报告模型点云与场景点云错位并询问影响；另一评论者最初称遇到类似情况，后自行更正：自己翻转图片时未同步修改相机内参。原帖作者仍称存在问题；本轮未复现，不把两个现象视作同一根因，也不断言数据有缺陷或成绩受影响。
179. [GraspNet #147](https://github.com/graspnet/graspnet-baseline/issues/147)：用户描述仿真中抓取姿态看似正常而真机抓取失败，询问坐标变换与旋转处理；浏览时未见答复，原因不明。该用户的 #146 是同日中文帖，不计作另一个独立提问者；这属于部署问题，不直接证明资料站需求。
180. [GraspNet #135](https://github.com/graspnet/graspnet-baseline/issues/135)：用户称评估结束保存时卡住，另一用户称自己另写过评估；给出的片段初始化 `test_novel` 却调用 `eval_seen`，但仅凭片段不能确定原因。本次未运行，不推断官方代码现版存在该问题。
181. [SO-101 上运行 VLA 的开发者讨论](https://www.reddit.com/r/robotics/comments/1qljzmh/experience_with_running_vla_models_pi05_smolvla/)：作者自述 π0.5 在 M1 Pro / 16GB 环境未成功完成推理，而 SmolVLA 能运行但其机械臂未按预期行动；他询问算力、模型适配与微调。为单人配置和自述，原因未经复现，也不是公开评测需求或购买意向。
182. [CanIEmbody 作者帖子](https://www.reddit.com/r/robotics/comments/1xilksa/i_made_a_caniusestyle_table_of_which_robot/)：作者称为查机器人、策略和设备兼容性建立矩阵，记录来源与版本，并要求社区纠错。这是产品作者自荐、存在自身推广利益；不算独立客户需求。可直接访问[矩阵](https://caniembody.pages.dev/)，但具体单元和交互未逐项验证。
183. [复杂 PDF 转 Markdown 的讨论](https://www.reddit.com/r/LocalLLaMA/comments/1uc6mp1/your_favorite_workflow_to_convert_pdf_with/)：用户试过多种工具后询问表格和浮动框处理方案；回帖包含产品所有者自荐及个人对工具的评价，不能当作独立、受控比较，也不证明对本站的需求。
184. [文档元数据提取的个人试验](https://www.reddit.com/r/LocalLLM/comments/1ut39ec/i_tested_11_document_extraction_toolsvlms_on_a/)：作者使用 24 份文件探索不同工具的速度与准确性，并称尚未实际部署；其基准参考由模型生成、表格也标注由 AI 生成，因此结果不作为人工真值或排名依据。该线索说明一名用户的本地工作流问题，不代表付费需求。
185. [LeRobot #4548](https://github.com/huggingface/lerobot/issues/4548)：提问者报告 RoboCasa365 上 SmolVLA 的训练与测试指令表述不一致，以及文档示例与检查点相机映射不一致；其 0/41 与 4/9 来自不同规模任务集合，不能当作严格同条件因果对照。评论提出固定任务和种子进行配对；另一位评论者给出 LIBERO-Object 的另一次实验，属于不同基准。相关 [#4578](https://github.com/huggingface/lerobot/pull/4578) 提出修改，相应评测未由本站复现；讨论不等于用户希望购买网站。
186. [RoboCasa #216](https://github.com/robocasa/robocasa/issues/216)：提问者报告在指定旧提交和部分随机场景里，ArrangeDrinkware 任务初始化时即可能满足成功条件；贡献者回复称已修复布局选择，issue 于 2026-08-07 关闭。本次未复现、未确定受影响的具体发布版本与成绩范围，不能说现版仍有缺陷。
187. [HumanoidBench #58](https://github.com/carlosferrazza/humanoid-bench/issues/58)：开发者希望获取 DreamerV3、SAC、PPO、TD-MPC2 的日志做基线比较，称在日志目录只找到 DreamerV3；该帖未见回应，不能据此断言其他位置没有日志或现状仍然如此。
188. [HumanoidBench #68](https://github.com/carlosferrazza/humanoid-bench/issues/68)：标题询问将来是否支持仿真到真机，正文为空，未见回应；只说明一位提问者关心该方向，不能推断其具体机器人、需求或官方计划。
189. [VLN-CE #76](https://github.com/jacobkrantz/VLN-CE/issues/76)：开发者 2026 年 2 月称挑战已关闭，询问能否重新开放以公平比较；仓库 README 仍写开放，挑战页面正文未能读取，当前实际提交状态未知。无法将提问者观察或 README 快照当成现状结论。
190. [Asim 联合创始人的帖子](https://www.reddit.com/r/humanoidrobotics/comments/1xok5q8/were_building_a_real_world_benchmark_for_humanoid/)征求如何衡量真机泛化、失败和硬件差异；属于正在建设真机评测的项目方主动宣传与征求反馈，可读页面未显示有效回复，不是独立客户需求或既有产品能力验收。
191. [EmbodiSkill #2](https://github.com/air-embodied-brain/EmbodiSkill/issues/2)：用户询问论文所用 EmbodiedBench 两种环境各 1,000 个训练任务如何生成、是否可提供划分和生成文件；项目协作者列出上游生成代码、模板、训练类别与场景等配置。该回应提供可用定位线索，但本次未运行、未核验是否能重建完全相同的任务集，不推断上游没有发布数据，也不代表用户需要新的资料网站。
192. [VLA 实际部署讨论](https://www.reddit.com/r/robotics/comments/1vmeaqq/has_anyone_deployed_vlabased_robots_in_production/)：提问者关心实际任务和微调数据；一位评论者自称所在公司在仓储中结合传统模型和 VLA，并给出首次抓取成功率。这是未经本次独立核实、存在企业关联的个体自述，不将数字外推或视作网站需求。

192a. [SmolVLA 评测设置讨论](https://github.com/huggingface/lerobot/issues/4614)：多位参与者关注动作执行长度是否随分数一起报告，一位实际使用者称讨论帮助其完成评测；参与者在不同设置下自报结果，未由本站复跑。该讨论与本地两种 SmolVLA 检查点、原论文和分母的对照见[配置专项](2026-11-09-smolvla-libero-checkpoint-compatibility.md)。
193. [真实机械臂演示数据采集讨论](https://www.reddit.com/r/robotics/comments/1vsfwgl/the_gap_between_collecting_one_real_data_point/)：发帖者描述录制演示后还需处理同步、遮挡等问题；一位评论者建议记录相机同步、完成状态与干预。发帖账号带机器人企业名称，可能有推广关联；讨论是训练数据工作流，不直接等于对评测目录或成绩库的需求。
194. [LIBERO-Plus #55](https://github.com/sylvestf/LIBERO-plus/issues/55)：中文用户询问公开 LeRobot 轨迹的 state/action 旋转使用欧拉角还是轴角，称元数据未说明；两人附议，检索时未见维护者结论。没有独立解析转换脚本，不猜测具体表示。
195. [LIBERO-Plus #53](https://github.com/sylvestf/LIBERO-plus/issues/53)：中文用户询问公开 RLDS 训练数据中机器人初始状态扰动如何对应其文件路径；其自行统计与对应关系均未复算，检索时未见维护者回答。它问的是数据划分，不是榜单评测划分。
196. [RoboTwin #472](https://github.com/RoboTwin-Platform/RoboTwin/issues/472)：中文用户报告 TinyVLA 微调后评测出现矩阵特征值不收敛；协作者建议检查动作、归一化、机器人配置和权重是否一致，并提及新版工作流。另有贡献者提出改进报错，原因和修复是否最终生效均未由本站验证。
197. [Unitree LeRobot #67](https://github.com/unitreerobotics/unitree_lerobot/issues/67)：一人询问仿真数据训练的模型，协作者给了两份仿真数据链接；随后另一用户询问 π0 微调和仿真测试配置，并称自己的成功率低，另有人表示遇到类似问题。数据链接不是模型权重，单条线程也不是独立需求人数统计；原因未经复现。
198. [LIBERO 失败序列讨论](https://www.reddit.com/r/robotics/comments/1uz0cvz/)：发帖者自述用损失轨迹和人工查看发现可能失败的序列，询问如何处理以及如何理解训练数据；回复指出失败恢复可能有训练价值。原发现未经复核，不证明所有异常片段都应删除，也不等于对资料网站的需求。
199. [roboeval 作者介绍](https://www.reddit.com/r/ROS/comments/1su6jul/)：作者说因 LIBERO 结果难比较而发布带复现清单的运行工具，具体结果和环境见[当前仓库](https://github.com/sim-too-real/roboeval)。这是已有工具及作者自述，不是独立用户访谈；它与本站 RoboEval 套件不同，见[专项对照](2026-11-09-libero-recovery-and-reproducibility.md)。
200. [家庭机器人抓取方案讨论](https://www.reddit.com/r/robotics/comments/1b82o3c/)：发帖者自述在 LoCoBot 上寻找实际可用的抓取方案，讨论当时 AnyGrasp 许可获取与 Contact-GraspNet 姿态预测体验；一位评论者报告木块抓取不稳定。都是个人陈述，未经复测；不能将历史许可体验当成现行规则，也不能从技术求助直接推定资料站需求。[专项对照](2026-11-09-grasp-execution-crosswalk.md)记录现有评测和运行资料。
201. [LeRobot #4404](https://github.com/huggingface/lerobot/issues/4404)：开发者报告 RoboTwin 转换数据的绝对关节动作与固定版本接口声明范围不匹配，并提交审计和 [PR #4405](https://github.com/huggingface/lerobot/pull/4405)；作者未测得策略分数变化，本站未复现。issue 与 PR 是同一人的同一问题，本次网页显示均 Open，不代表所有版本受影响。
202. [RoboTwin #228](https://github.com/RoboTwin-Platform/RoboTwin/issues/228)：使用者询问默认 qpos 与末端位姿动作对策略比较的影响；协作者说明 qpos 默认选择和修改入口，发帖者关闭问题。此历史问答与 #201 相关但不是对接口范围审计的独立复核。
203. [研究者的复现差异报告问题](https://www.reddit.com/r/MachineLearning/comments/1xm64of/)：发帖者自述两项基准经多种子及多次复现仍低于论文，希望清楚并列报告原值和复现值；评论者提出不同做法。实验未独立核实，属于通用研究工作流而非具身专属，也不是新网站使用或付费证明；竞品同题对照见[专项记录](2026-11-09-score-provenance-reader-crosswalk.md)。
204. [MMLU-Pro 输出解释提问](https://www.reddit.com/r/LocalLLaMA/comments/1dvyttu/)：用户列出第三方评测 fork 的 Total、Random、Random Subtracted 和最终表格结果，询问各分数含义及差异。历史脚本版本和评论解释未独立核验，不替其判断“正确成绩”；是具体阅读和排错问题，不证明对本站的需求。
205. [Rex-Omni #187](https://github.com/IDEA-Research/Rex-Omni/issues/187)：开发者询问目标检测指标为何看起来忽略类别，涉及本站 Dense200；协作者解释多类检测和指代表达定位走不同分支，issue 后被不活跃规则关闭。本次未运行代码；不是已确认缺陷，也不能推断其他评测的类别规则相同。
206. [ROS 真机导航问题](https://www.reddit.com/r/ROS/comments/1mxkzbl/)：作者自述 Gazebo 中正常、真机导航出现卡顿及旋转，分享 Nav2 配置并提出控制链路猜测；原因未由本站复现确认。是部署排查个案，不代表社交导航基准有缺陷，也不是资料站需求证明。
207. [ROS 探索方案比较](https://www.reddit.com/r/ROS/comments/1stt9u9/)：作者自行搭建仿真比较多个探索包的时间、路径和算力消耗，并希望纳入更多算法；包含其本人维护的项目，属于有利益关联的自报。数值和使用者身份未独立核验，不能用作普遍排名或付费证据。
208. [语音识别榜提问](https://www.reddit.com/r/LocalLLaMA/comments/1vxmuue/)：开发者寻找北美英语语音转写榜并询问 Whisper 型号与 whisper.cpp，回复者解释模型与推理引擎的区别；榜单 iframe 内容本次未独立核实。问题不证明需要另建排行榜。
209. [真实会议转写对照评论](https://www.reddit.com/r/speechtech/comments/1utpb5z/)：工具维护者自述参考转写删去犹豫词影响 WER，还曾遇语言设置意外导致错译；有项目关联，未复现，不能直接比较其会议数字与朗读语料。与站内语音评测和现有榜单的关系见[语音专项](2026-11-09-speech-evaluation-demand.md)。
210. [评测误差条提问](https://www.reddit.com/r/LocalLLaMA/comments/1wz6mga/)：用户询问小幅分差与抽样波动如何区分，建议报告题数、区间与多次运行；评论者介绍现有网站部分推算区间并指出其不覆盖全部不确定性。统计方法及效果未在原实验复核，不证明本站需求或任一模型差异显著；与机器人小样本对照见[不确定性专项](2026-11-09-robot-evaluation-uncertainty.md)。
211. [RoboTwin #487](https://github.com/RoboTwin-Platform/RoboTwin/issues/487)：使用者寻找榜单 π0 checkpoint；协作者说最新重测不含 π0 并给出 co-train 目录。本次未确认该目录是否含问题所指权重，不能说已解决或必然未公开。与训练/测试区分见[专项记录](2026-11-09-robot-training-test-boundaries.md)。
212. [机器人示范与布局变化讨论](https://www.reddit.com/r/robotics/comments/1v5ewia/)：项目团队自述仿真中移动任务布局使原策略表现下降，询问如何评测分布变化和决定补充演示；其与采集服务有关，结果未复现，不是真机或独立购买需求证据。
213. [PhAIL 讨论中的工程体验](https://www.reddit.com/r/MachineLearning/comments/1sajdwr/)：独立于台账 #64 发布者的一位评论者自述过去遇到自动系统频繁需要人照看，关注人力投入和经济性；身份与经历未核实，不能视为客户访谈或验证的现场数据。同帖另一评论提出增加样例视频，作者回复已添加；参见[装配介入口径](2026-11-09-industrial-intervention-and-assembly.md)。
214. [无人机仿真导航项目更新](https://www.reddit.com/r/ROS/comments/1wh0r9l/)：开发者自述 ROS/PX4/Gazebo 虚拟飞行、三维地图与失败排查，明确未验证真实飞机；是其维护的开源项目及个人技术经验，不是客户访谈或对本站的需求。官方航空评测对照见[无人机专项](2026-11-09-aerial-embodied-benchmarks.md)。
215. [多传感机器人数据标注](https://www.reddit.com/r/AskRobotics/comments/1vlbyem/)：发帖者询问动作标注粒度、不同采样率的传感器时间对齐与接触事件，经历未经独立核实；不能推断目标用户群规模或付费需求。参见[触觉与接触专项](2026-11-09-tactile-contact-evaluation.md)。
216. [训练有触觉、部署仅视觉的提问](https://www.reddit.com/r/computervision/comments/1vy7vuq/)：评论者询问缺少传感器时模型会怎样；原帖展示作者打包的数据浏览工具，有推广背景，评论者与作者的关系未知。模型实际部署要求取决于具体训练和结构，不证明本站需求。参见[触觉与接触专项](2026-11-09-tactile-contact-evaluation.md)。
217. [BEHAVIOR-1K #2326](https://github.com/StanfordVL/BEHAVIOR-1K/issues/2326)：使用者就 2025 演示从关节到末端动作的转换和性能差异求助；协作者当时说没有官方提取脚本，建议先回放转换轨迹。原因未确认、未本地复现，不能推定现行 2026 版本同样缺脚本或证明产品需求；见[任务及技能专项](2026-11-09-behavior-task-skill-protocol.md)。
218. [同 checkpoint 跨机器人差异提问](https://www.reddit.com/r/learnmachinelearning/comments/1w55iz9/)：发帖者自述同型号机器人表现不同，询问观测、校准与扰动评估；经历和建议均未独立验证。帖子中的近似名称不能可靠关联到某个具体 Colosseum 项目，也不能证明对本站有需求。见[机器人泛化对照](2026-11-09-colosseum-robustness-crosswalk.md)。
219. [MIKASA-Robo #11](https://github.com/CognitiveAISystems/MIKASA-Robo/issues/11)：提问者报告演示采集和默认评估的物理后端可能不同；协作者当时承认代码表述含糊并称将更新。本次未确认修复是否落地或复现影响，不将其当成已验证缺陷或本站需求。见[机器人记忆评测对照](2026-11-09-robot-memory-benchmark-crosswalk.md)。
220. [Community Evals 发布讨论](https://www.reddit.com/r/LocalLLaMA/comments/1qxk5jn/)：两位评论者希望跨 benchmark 并排比较模型，其中一人询问 API；发布者自称 HF 员工并回复接口。这是历史功能反馈，评论者身份及当前解决状态未验证，不等于本站用户。见[社区成绩与评测卡对照](2026-11-09-huggingface-community-evals-competition.md)。
221. [3090 上评测量化模型](https://www.reddit.com/r/LocalLLaMA/comments/1w7j1il/)：提问者自述本地评测耗时并寻找较低成本、覆盖多类能力的测试或已有结果；个人运行及评论建议未复验，是执行工作流线索，不能推断资料库付费意愿。见[社区成绩与评测卡对照](2026-11-09-huggingface-community-evals-competition.md)。
222. [量化 Qwen3.8-27B 运行分享](https://www.reddit.com/r/LocalLLaMA/comments/1w2g5se/)：作者自报特定本地量化配置的 GPQA 分数并与厂商值并列，评论有人提出质疑；数据和配置未本次复测，不能将差异单独归因量化。见[GPQA 同题对照](2026-11-09-gpqa-qwen-local-comparison.md)。
223. [本地模型选型表与评论](https://www.reddit.com/r/LocalLLaMA/comments/1w4a043/)：作者称为选型汇总模型卡成绩，一位评论者误以为是本地运行后询问配置，另一人希望标注量化与部署条件；身份及代表性未知，不是本站使用或付费证据。见[GPQA 同题对照](2026-11-09-gpqa-qwen-local-comparison.md)。
224. [LeRobot #4409](https://github.com/huggingface/lerobot/issues/4409)：用户报告 Meta-World 转换集旧修订的两个任务共用文本标签；维护者公布数据修复并关闭。本站固定修订的任务表与修复提交字节相同，但本次未核验全部轨迹；见[Meta-World 对照](2026-11-09-metaworld-reproducibility-crosswalk.md)。这是一条历史使用问题及已公开修复，不证明对本站的需求。
225. [ROS 导航测试提问](https://www.reddit.com/r/ROS/comments/10osb8w/best_way_to_test_nav_algorithms_with_ros/)：使用者希望在 ROS/Gazebo 中比较自身算法并通过随机仿真测试鲁棒性，评论推荐 BARN；这是执行需求而非已证实的资料站需求。见[移动导航对照](2026-11-09-mobile-navigation-workload-demand.md)。
226. [导航基准选择提问](https://www.reddit.com/r/robotics/comments/1oeh2g4/whats_the_current_state_of_navigation_benchmarks/)：发帖者寻找室外、非结构化导航常用测试，评论者提及不同平台、传感器及目标的差别；这是个体提问和观点，不证明没有行业标准或愿意使用本站。见[移动导航对照](2026-11-09-mobile-navigation-workload-demand.md)。
227. [ROS 规划器比较讨论](https://discourse.openrobotics.org/t/comparing-global-planners-for-navigation/54457)：作者发布算法比较，评论者质疑最优性与路径长度口径；数据未复算、外链仓库当次未打开，不能认定任一方结论。见[移动导航对照](2026-11-09-mobile-navigation-workload-demand.md)。
228. [RAG 新手提问](https://www.reddit.com/r/Rag/comments/1o5fj1r/how_do_i_evaluate_the_rag/)：询问使用什么测试数据和如何计算检索指标，评论建议整理自己的文档与证据；是执行评测问题而非本站使用证据。见 [RAG 调研](2026-11-09-rag-enterprise-legal-demand.md)。
229. [RAG 裁判疑问](https://www.reddit.com/r/Rag/comments/1qhdynz/how_do_you_benchmark_your_rag/)：使用者怀疑模型裁判不能理解医疗/法律术语；没有原始样本和复现，不能认定裁判错误。见 [RAG 调研](2026-11-09-rag-enterprise-legal-demand.md)。
230. [RAG 基准选型讨论](https://www.reddit.com/r/Rag/comments/1xljiel/what_are_good_new_rag_benchmarks/)：提问者担心旧基准及训练重叠，评论建议闭卷和私有测试；未证明具体模型或数据污染。见 [RAG 调研](2026-11-09-rag-enterprise-legal-demand.md)。
231. [RoboTwin 成功条件讨论](https://github.com/RoboTwin-Platform/RoboTwin/issues/493)：一位开发者对单条运行视频的稳定状态提出疑问，建议另报稳定成功率；未经独立复现，不代表已有成绩错误。固定版本源码及本站同任务训练示范与该测试的区别见 [运行视频与成功条件](2026-11-09-robot-rollout-success-evidence.md)。
232. [VLA-Adapter CALVIN 复现讨论](https://github.com/OpenHelix-Team/VLA-Adapter/issues/48)：提问者报告 1,000 条序列的平均连续长度 1.741 并询问配置；贡献者认为应检查设置，提问者跟进仍未复现、原因未确定，另一位参与者称遇到类似情况。不可据此推断原论文成绩错误。与本站 CALVIN 样本、司南成绩表和作者自建管线诊断案例的边界见 [CALVIN 评测口径与复现](2026-11-09-calvin-evaluation-fidelity.md)。
233. [RVT RLBench 复现问题](https://github.com/NVlabs/RVT/issues/91)：提问者报告成绩差异并怀疑碰撞标志标签，手动变更标志后的成绩不是同协议复现；原因和数值未经独立确认。[数据下载](https://github.com/NVlabs/RVT/issues/93)与[训练依赖](https://github.com/NVlabs/RVT/issues/94)是另一位用户的两条相关帖子，不能计为两个独立用户。源代码、已有解释和同题竞品见 [RLBench 专项](2026-11-09-rlbench-protocol-demand.md)。
234. [Agent as Policy 硬件适配提问](https://github.com/agent-as-policy-2026/agent-as-policy/issues/1)：一位提问者希望用于自己的机械臂；贡献者在 2026-09-16 回复当时支持 YAM、同型号需相机标定并计划写适配说明。未知提问者后续是否成功，也不能据此推断市场规模。与本站仿真 CodeActionBench、真机记录及现有方案见[代码控制机器人对照](2026-11-09-code-action-robot-benchmark.md)。
235. [SIMPLER 复现波动](https://github.com/simpler-env/SimplerEnv/issues/125)、[成功条件提问](https://github.com/simpler-env/SimplerEnv/issues/129)、[扰动下的真仿关联提问](https://github.com/simpler-env/SimplerEnv/issues/137)：分别涉及试验重复、配置和研究外推；有协作者回复，原因或适用范围不能自行定论。还有[机器人社区问题](https://www.reddit.com/r/humanoidrobotics/comments/1w2c6g9/any_sim_benchmark_that_actually_gives_you_a/)询问仿真能否预示真机效果。原论文实例、后续实验与已有中文资料见 [SIMPLER 真仿专项](2026-11-09-simpler-real-sim-demand.md)。
236. [PDF 转 Markdown 对比与表格反馈](https://www.reddit.com/r/Rag/comments/1xcjo7z/i_benchmarked_11_pdftomarkdown_tools_incl_docling/)：作者用四份文档比较并披露自有付费工具；另一文档处理公司员工提醒词级分数可能漏掉错列。另有[评论者](https://www.reddit.com/r/Rag/comments/1univjx/finetuned_a_vlm_for_messypdf_extraction_46_911_on/)自述复杂表格、额度和成本问题；身份和结果未经核实。已有专项榜单和数据开放边界见 [OCR 与文档专项](2026-11-09-ocr-document-user-demand.md)。
237. [SO-101 真机评测记录](https://yosubshin.github.io/2026/08/so101-part2-evaluation/)：开发者自报同一权重重复运行的波动，并构建抓取子任务和人工确认流程；文章的试验总数存在未厘清口径，结果未复算、未复现。它是具体评测工作流，不证明对本站或付费有需求；见[部署和数据专项](2026-11-09-robotics-deployment-data-evidence.md)。
238. [工业机械臂宣传参数讨论](https://www.reddit.com/r/PLC/comments/1q7f2jx/how_much_do_you_trust_the_advertised_performance/)：提问者询问实际负载、节拍、精度等是否与说明书可比，并自述仿真未重现宣传节拍；评论是个人经验，本次未验证设备、标准条款或实验。它关乎硬件选型，不是 VLA 评测需求或本站用户证明。
239. [物流机器人实际使用问题](https://www.reddit.com/r/IndustrialAutomation/comments/1w44sm6/looking_for_articles_and_realworld_experiences/)：一位提问者希望了解 AMR、自动叉车等在工厂与仓库的任务、导航、充电、维护、WMS/MES/ERP 集成、收益及失败情况。一条评论自称来自供应商，提出拥堵、网络切换和 WMS 任务异常等检查项；这不是终端用户证言，评论建议也未经现场验证。它提示可继续调研的工业问题，不证明读者需要本项目或愿意付费。相关真实超市抓取研究与仓储离线数据的区别见 [仓储场景专项](2026-11-10-armbench-warehouse-outcome-boundaries.md)。
240. [EBench 线上与本地复现问题](https://github.com/InternRobotics/EBench/issues/5)：一位开发者询问同一模型两种运行的分数差及种子、抽样是否有关；当前显示 Closed，未见公开答复，原因未知。它属于具体复现问题，不证明用户需要本站；对应官方榜单、分析工具和两家同名“司南”的区别见 [OpenCompass 专项](2026-11-10-opencompass-embodied-ebench.md)。
241. [openpi #849](https://github.com/Physical-Intelligence/openpi/issues/849)：多位账号讨论 LIBERO 中模型行为异常，部分使用不同模型或训练方式；一位贡献者提出针对特定 π0-FAST 已发布权重的归一化诊断和未合并 PR。本次未复现，不推断全部评论同因或读者是本站潜在付费用户；另一个针对重新训练配置的消融见 [π0-FAST 专项](2026-11-10-openpi-fast-libero-config-evidence.md)。
242. [HF 榜单 GPQA 归一化问题](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard/discussions/928)：用户询问 7.38 和原始字段为何不一致，维护者给出字段、公式和四舍五入解释；这是已公开解答的历史问题，不是本站需求或付费证据。与具体 DeepSeek 模型发布表及第三方榜的区别见 [GPQA 专项](2026-11-10-gpqa-score-normalization-crosscheck.md)。
243. [RPent #260](https://github.com/RLinf/RPent/issues/260)：项目参与者询问不同时期 RoboCasa 同任务种子成绩差异；评论者在查看部分记录后修正最初猜测，另有评论提醒需配对转换，且公开包承认历史模型字段为空及配置差别。参与者对项目有贡献关系，不作为独立潜在客户或付费证据；见 [成绩历史专项](2026-11-10-rpent-robocasa-score-history.md)。

## 现有方案与竞争反例（继续扩充）

- HF 的 [VLABench 数据页](https://huggingface.co/datasets/VLABench/vlabench_primitive_ft_lerobot_video)已有训练演示及关联模型结果；同页也存在分数来源与训练数据易混的阅读边界。只读 API 与本站数据集对照见[HF benchmark 清单](2026-11-09-hf-official-benchmarks-crosswalk.md)；未验证外部源分数的评测条件。
- [HF Community Evals](https://huggingface.co/docs/hub/en/eval-results)已将模型页、社区 PR、数据集榜单与来源关联；[Evaluation Cards](https://evalcards.evalevalai.com/)也提供结果、来源及可比性信息。核对 Qwen 一个模型的 GPQA 与 Terminal-Bench 成绩、开放 PR 和只读 API 的实际差异见[专项对照](2026-11-09-huggingface-community-evals-competition.md)；不把社区成绩当作全部已合并或独立复测。
- [RoboMME 官方榜单](https://robomme.github.io/leaderboard.html)已有记忆任务分类、模型对比及轨迹入口，[LeRobot 文档](https://huggingface.co/docs/lerobot/main/robomme)已有任务与运行说明；[MIKASA-Robo-VLA 协议](https://mikasarobo.github.io/evaluation_protocol.html)说明每任务回合数和成功判定。详细对照见[机器人记忆评测](2026-11-09-robot-memory-benchmark-crosswalk.md)；本次未运行或验收动态榜单。
- [Awesome Embodied Evaluation](https://github.com/ZetingLiu/Awesome-Embodied-Evaluation)已有中文、按推理/动作/世界模型分类的任务、指标与来源整理；固定版本对本地 50 条的名称、合并行和别名对照见[目录对照](2026-11-09-embodied-catalog-name-crosswalk.md)。只比较名称和部分呈现，非覆盖率或准确性验收。
- [VLA Sim-Benchmark Atlas](https://everloom-129.github.io/SimBench/)已有中英入口及多个仿真评测可视化，作者提示内容可能出错；[Colosseum V2](https://colosseum-v2.github.io/)列任务、扰动和结果浏览控件；[RoboColosseum](https://arxiv.org/html/2611.02497)则是不同的多地点真机评测。关系及条件见[机器人泛化对照](2026-11-09-colosseum-robustness-crosswalk.md)，本次未复测。
- [ManiUnit](https://arxiv.org/html/2610.12089) 从 BEHAVIOR-1K 2025 演示构造分技能测试及扰动条件；官方也提供任务画廊、演示和基线文档。中间状态的局部成功、2026 排名的部分完成分及完整任务成功分别回答不同问题，详见[任务及技能专项](2026-11-09-behavior-task-skill-protocol.md)。
- [TacO](https://tacobench.github.io/)、[TACTIC](https://utn-air.github.io/TACTIC/)和 [ContactBench 1.0](https://arxiv.org/html/2610.24512)已有触觉传感器、任务分阶段或真机策略对照；不同任务、传感器及仿真条件不可混为统一排行榜。详见[触觉与接触专项](2026-11-09-tactile-contact-evaluation.md)。
- [ActiveFly-Bench](https://arxiv.org/html/2607.10180)、[BEDI](https://github.com/lostwolves/BEDI)和 [Drone-Bench](https://andonlabs.com/evals/drone-bench)已覆盖不同无人机问答、仿真动作或编程任务；真实轨迹、实机验证和整榜评分不能混为一谈。详细对照见[无人机专项](2026-11-09-aerial-embodied-benchmarks.md)。
- [PERIT-STT](https://perit.ai/research/benchmark/speech-to-text/leaderboard)已展示语音识别分项、鲁棒性与延迟；[OpenBenchmarks 电话延迟](https://github.com/openbenchmarks-labs/voice-agent-latency)给出录音测量和分位数。均为项目方报告，未复测，测试语种、录音路径和系统配置须按各自方法理解。
- [HA-VLN 官方榜](https://uwmilab.github.io/HA-VLN-webpage/)已有语言导航、环境/划分/设置和社交指标，论文称扩展 R2R-CE，并有有限真机试验；[PEDS](https://arena-rosnav.org/pedsral26/)与 [RESONATE](https://arxiv.org/html/2611.02937)分别研究仿真人群行为模型和受控真机人机导航。关联本站 Habitat 3.0、R2R-CE 的对照及边界见[社交导航专项](2026-11-09-social-navigation-crosswalk.md)，不可混同真机、仿真或不同协议成绩。

- [VLA-REPLICA](https://arxiv.org/html/2605.20774)作者公开 SO-101 真机任务、装置标定、训练数据和评测布置；跨场地复现只选原场地成绩较高的 8 项任务，不能推广为所有任务或机器人可复现。[UR5e 研究](https://arxiv.org/html/2606.30456)报告限定两种 VLA 和该工作流中的闭环问题，作者来自机器人企业；不是行业用户调查。[中文数据目录](https://robotics.hellobike.com/routes/embodied-dataset-compare)已比较采集、模态、格式与许可，但页面标注 AI 整理，数据和原始许可未逐项核验；[LeRobot 中文教程](https://github.com/CSCSX/LeRobotTutorial-CN)也已覆盖数据采集和训练。具体本地条目及范围见[机器人数据与部署补查](2026-11-09-robotics-deployment-data-evidence.md)。
- [PRM-as-a-Judge](https://prm-as-a-judge.github.io/leaderboard.html?benchmark=robodojo)声称对 RoboDojo 和 RoboChallenge 的公开运行进行模型辅助过程评分，页面提供任务及仿真／真机选择入口；这是本项目已收录两项基准上的同题过程分析竞争者。页面统计、分数与模型评分可靠性未独立复核，切换后的实际表格未交互验收。[Vals Robo-bench](https://www.vals.ai/benchmarks/robo_bench)则明确使用仿真而非真机；与本地 AA-Robotics、RoboDojo、RoboArena 的受测对象、方法和指标的对照见 [机器人测评平台补查](2026-11-09-robotics-evaluation-platforms.md)。
- [SIMPLE 官方项目](https://psi-lab.ai/SIMPLE/index.html)已列多个策略、任务与三种随机化设置，以及特定实验的仿真／真机对照；页面目前写 60 项任务，而 [arXiv v2 论文](https://arxiv.org/html/2606.08278)写 16 项，原因未核实，不判断哪一个错误。[Embodied Playground 官网](https://winniechen2002.github.io/Agent-bench-website/)已有任务图册、能力成绩、权限和预算说明，[Embodied Data Atlas](https://embodieddataatlas.com/datasets/embodied-playground/?lang=en)有同项数据范围和许可说明。四项工作与本地对照、来源不一致及未验收边界见 [具身任务与评测方式补查](2026-11-09-embodied-task-protocol-crosswalk.md)。
- [HumanoidVersus 评测目录](https://humanoidversus.com/benchmarks)当次显示 40 条，混合仿真、真机、竞赛、数据集和标准，不等于 40 项人形机器人基准；同页已收录本地 HumanoidBench、BEHAVIOR-1K、CALVIN、RoboCasa、RoboTwin 2.0 等并介绍任务与指标。其内容和交互未逐项验证。同名 HumanoidBench 页面另有 [SOTA2 的 IQM 结果](https://www.sota2.com/research/sota/humanoid-locomotion-and-manipulation-on-humanoidbench)；不同预算和 [WIMLE 原论文](https://arxiv.org/html/2602.14351)的归一化方式不能直接当成功率。[VLN 整理项目](https://github.com/winnk123/awesome-vln/blob/main/VLN_LEADERBOARD.md)已有 R2R-CE 分组成绩、额外数据及代码开放状态；[另一研究笔记](https://garylee1210.github.io/en/VLN-Papers/)区分连续/离散导航及传感器。针对这些同题资料与本地条目、原论文的对照见[人形与导航补查](2026-11-09-humanoid-navigation-crosswalk.md)。
- 同题补查：[LADDER 官方研究页](https://ladderrobotics.ai/research)已展示任务成功、子目标进度、成本、失败类别及实机/仿真资料，官方评测轨迹含视频与步骤日志；Lite 和完整版成绩口径不同。[RoboCasa365 官方榜单说明](https://github.com/robocasa-benchmark/leaderboard)已有三种划分、版本、代码和检查点等字段，并说明提交验证程序。[REAL-Bench 官方项目](https://internrobotics.github.io/REAL/)已有四类任务示例、模型结果表、失败分析和单独真机结果。三项与本地条目逐项对照、限制和潜在验证方向见 [LADDER、RoboCasa365 与 REAL-Bench 补查](2026-11-09-long-horizon-benchmark-crosswalk.md)；不能将视频、细分结果或评测口径当成空白。
- [Embodied Data Atlas](https://embodieddataatlas.com/zh/?lang=zh) 有中英文具身数据集、任务、筛选、来源、许可、样本加载等页面。该站自行展示的数据数量与质量本次未独立审计；这是中文具身数据导航已有方案。
- [硅基参考数据集库](https://www.guijicankao.com/datasets) 按抓取、双臂、装配、长程、人形、导航、仿真等组织数据，是按任务导航的直接反例。
- [BotLandscape](https://botlandscape.com/benchmarks) 汇总机器人评测套件身份、任务、规模并明确不混排不同单位；不是模型排名，也是直接反例。
- BotLandscape 还提供[结果区间](https://botlandscape.com/results.html)和[评测健康度](https://botlandscape.com/health.html)，用公开资料区分条件、来源和试验数；可见的 [LIBERO-Plus 原始论文](https://arxiv.org/html/2510.13626)同题对照及方法局限见[具身竞品逐项对照](2026-11-09-robotics-competitor-crosswalk.md)。这些是该站自述和部分 JSON 核查，并非本次统计复算或交互验收。
- [awesome-vla-benchmarks](https://github.com/JialiangFan/awesome-vla-benchmarks) 按类型整理 VLA 基准。
- [vla-eval](https://arxiv.org/abs/2603.13966) 的作者报告统一评测运行接口、仿真评测和模型结果汇总；性能/复现效果为论文作者报告，非本次独立实测。
- [RoboCasa 官方评测文档](https://github.com/robocasa/robocasa/blob/main/docs/benchmarking/benchmarking_overview.md) 提供任务、分割、版本和 rollout 说明；[RLinf RoboTwin 中文文档](https://github.com/RLinf/RLinf/blob/main/docs/source-zh/rst_source/evaluations/guides/robotwin.rst) 已覆盖 clean/randomized 等评测设置。不能声称中文讲解和协议整理无人做。
- [Robot Intelligence Index](https://www.withplayground.ai/blog/robot-intelligence-index) 聚合公开的仿真和真机基准，并展示任务类型、基准差异、覆盖、方法与限制；不同来源成绩跨协议聚合的解释以其方法论为准。
- [EmbodiedIndex](https://embodiedindex.ai/models) 按类别汇集不同来源的具身模型结果并标注运行来源，称不混成单一分数；独立测试计划为其页面自述。
- [Embodied AI Hub](https://embodied-hub.com/compare/) 提供中英文项目、模型和数据集对比；[RoboSignal](https://robosignal.ai/data-training) 支持按任务、传感器和访问状态等筛选并比较。项目方数据未逐项验真。
- [OpenCompass 长上下文评测文档](https://github.com/open-compass/opencompass/blob/main/docs/en/advanced_guides/longeval.md) 对多套测试给出数据与方法；[BFCL 数据说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md) 说明任务类别。非具身的比较和指标解释也非空白。
- [司南机器人公开成绩](https://robo.sinanlab.com/benchmarks) 提供中文具身模型分数，来源含论文和第三方复现，注明协议差异、微调、试验次数等；适配、本体和部署另有入口。未逐条核查其分数或交互。
- 对司南分数页可见的 10 个分组做[逐项对照](2026-11-09-sinan-robotics-crosswalk.md)：其中多个分组对应本站已收录的 LIBERO、SIMPLER、CALVIN、RoboCasa、VLABench、RoboTwin 2.0、Meta-World；另有混合真机和其他任务。单点核对发现其 VLABench 概述写成功率，而表头和 X-VLA 原论文写平均进度分；两种指标不应混同，本轮未复算成绩。
- [DocParsingBench](https://github.com/SoMarkAI/DocParsingBench) 提供文档解析结果逐样本对照；[IDP Leaderboard](https://www.idp-leaderboard.org/details) 对 OCR、文档提取等分类。网页能力与数据未本次全面验收。
- [VLMEvalKit 视频配置](https://github.com/open-compass/VLMEvalKit/blob/main/vlmeval/dataset/video_dataset_config.py) 提供具体帧数和配置；[LeRobot LIBERO 文档](https://github.com/huggingface/lerobot/blob/main/docs/source/libero.mdx) 说明不同 seed 与成功率区间。因此这些资料已经存在，机会需针对易发现、关联程度和受众另行验证。
- [VLN-CE 官方仓库](https://github.com/jacobkrantz/VLN-CE) 说明论文与榜单结果使用口径，并提供轨迹视频功能；[HumanoidBench 官方仓库](https://github.com/carlosferrazza/humanoid-bench) 说明 privileged state、任务及部分训练曲线。机器人评测的数据和视频不是只有单一总分。
- [τ-Voice 交互指标](https://github.com/sierra-research/tau2-bench/blob/main/docs/interaction-metrics.md) 已说明语音延迟、抢话及交互；[InstTrans](https://github.com/bilibili/Index-Translate/blob/main/benchmarks/insttrans/README.md) 已涉及翻译生产约束。公开的任务和指标导航不具天然独占性。
- [ImageBench 作者帖子](https://www.reddit.com/r/MachineLearning/comments/1vz9x9c/) 宣称提供提示词、生成图片及评审；为作者自荐且评审可靠性未独立核查。
- [OmniDocBench](https://github.com/opendatalab/OmniDocBench) 已按文字、表格、公式、阅读顺序等细分，支持属性/语言，并说明部分匹配方法；[Video-MME v2 官方脚本](https://github.com/MME-Benchmarks/Video-MME-v2/blob/main/evaluation/test_video_mme_v2.py) 已暴露帧数、字幕及提示选项。细粒度配置和解释不是空白。
- [RoboEval](https://github.com/Robo-Eval/RoboEval/blob/main/README.md) 已列碰撞、末端轨迹等评价维度；[RGBench](https://github.com/hwk0809/RGBench) 对代码、数据和部分上游资源分别列条款，具体复用仍需核对各许可。
- LIBERO 跨站具体验证：[本站工作区 LIBERO](../../content/benchmarks/libero.json) 是评测条目；[Embodied Data Atlas 的 LIBERO 页面](https://embodieddataatlas.com/zh/datasets/libero/?lang=zh) 提供仿真/机器人/数据类型和评测条件，[其样本加载记录](https://embodieddataatlas.com/zh/recipes/?lang=zh) 明确只读取转换版单条轨迹；[司南机器人](https://robo.sinanlab.com/benchmarks) 列多模型各子集成绩与论文表格和测试条件；[BotLandscape](https://botlandscape.com/benchmarks) 主要组织套件身份而不混排成绩。页面呈现是已核实的同题对照，各站数字及背后证据未逐条审计。
- RoboTwin 同项竞争：[司南](https://robo.sinanlab.com/benchmarks)已列论文模型成绩及部分任务、训练与试验条件；[Embodied Data Atlas](https://embodieddataatlas.com/datasets/robotwin/?lang=en)列出处、仿真、监督与动画入口，但该页一些许可及格式字段未指定；[BotLandscape](https://botlandscape.com/benchmarks)比较基准结构及协议；[LeRobot 官方文档](https://huggingface.co/docs/lerobot/main/robotwin)列任务、摄像头、运行和评估设置。不同训练及测试条件的数字不可自动横比，页面交互和数据真实性尚未逐项实测。
- [AllenAI 评测框架](https://github.com/allenai/vla-evaluation-harness)自述支持 RoboTwin 2.0、LIBERO 系列、ManiSkill 等并给运行方法；[PhAIL](https://phail.ai/)截至页面所列 2026-11-04 已列 3 项各自计分的评测和人工遥操作参考，是工业真机竞争反例；运行能力、分数与原始轨迹均未独立复验。
- [司南数据集](https://robo.sinanlab.com/datasets)已展示设备、格式、许可和国内镜像等筛选维度；[EmbodiedIndex 数据政策](https://www.embodiedindex.ai/data)区分免费浏览与其他数据用途。筛选交互及原始许可未逐项核验，不能推定可任意再分发。
- [whatmodel.sh 的 claims 页面](https://whatmodel.sh/claims)及其[项目作者说明](https://www.reddit.com/r/LocalLLaMA/comments/1x9skrx/)已尝试比较不同来源的模型成绩，作者的统计方法和来源匹配未独立审计；因此“同一模型的厂商成绩与其他来源对照”也不能视为无人做。
- [LLM Benchmarks Tracker 中文目录](https://alloevil.github.io/llm-benchmarks-tracker/zh/)和[其 GPQA 详情](https://alloevil.github.io/llm-benchmarks-tracker/b/gpqa-diamond/)已将基准解释、成绩、来源类别与部分条件关联；[AIMap 中文 GPQA 页面](https://aimap.page/zh-hans/benchmarks/gpqa-diamond/)也列介绍、局限、模型分数、设置、日期及 Epoch 来源。两站数据正确性未逐项验证，不能将“中文+来源+评测说明”本身当成独有功能。
- [Tuntang GPQA 条目](https://tuntang.top/benchmarks/gpqa-diamond/)中文呈现构建方式、示例概述、模型成绩、来源差异与更新历史，直接覆盖“评测资料加成绩”的产品形式；该页声明其成绩混合多种来源，不应视为统一协议或数据已验真。搜索引擎缓存显示其[目录](https://tuntang.top/benchmarks/)有分类与卡片，但本次目录打开超时、未进行交互核验。
- [Eval Handbook](https://evals.zenheart.site/benchmarks/)将中文评测解释、模型发布时间轴、报告来源和任务选型组合；[GPQA Diamond 与 DeepSeek-R1 单点对照](2026-11-09-eval-handbook-comparison.md)记录了其未关联变体、来源定位未核验等边界，是用户原方案与报告解读路线的直接竞品，不将其所有数值视为已验证。
- [Embodied Arena](https://github.com/EmbodiedArena/embodied-arena) 项目仓库自述提供多项具身问答、场景理解及其他任务的评测框架，列出 ERQA 与 EmbSpatial-Bench；网页首页本次未读取到正文，未实际部署框架。不能把具身空间理解问答直接当作物理机器人操作成绩。
- [具身开发者社区的技术路线页](https://robotics.hellobike.com/routes/)已按仿真训练、硬件、数据、模型、评测等主题组织中文横评，并展示机型与出处；文章细节、筛选交互和商业关联未逐项核验。不能把机器人软硬件选型及中文整理视为无人涉及。
- [BenchWiki 的 GPQA 条目](https://github.com/campusx-official/benchwiki/blob/main/content/benchmarks/gpqa.md)公开基准元数据、子集关系和条件变化，是英语基准知识库的同项竞争实例；其数据、状态判断及站点实际运行未逐项验真。
- [OpenWAM 的 VLABench 指南](https://github.com/OpenWAM-Official/OpenWAM/blob/main/benchmarks/vlabench/README.md)列版本、任务分轨和评测日志，并提示失败回合可能影响有效数量；[LeRobot VLABench 文档](https://github.com/huggingface/lerobot/blob/main/docs/source/vlabench.mdx)列覆盖任务和运行方式。都是现有条件说明，未实际部署和复测。
- [Spoken LLM Benchmark Atlas](https://speechlab0210.github.io/spoken-llm-benchmarks/)页面展示语音评测分类、时间线、模型×基准矩阵和来源链接；页面自述内容未经人工全面核验，本次仅确认页面形式，未把其生成内容作为事实核验依据。与本项目语音条目有领域重叠，未逐项统计同名覆盖。
- [DocuBench](https://github.com/DocuPipe/DocuBench)提供文档数据抽取任务、结果浏览入口和逐文档结果，是厂商发布的基准；结果和资料未独立复评。不能把“按实际文档展示输出”当成空白。
- [Village Atlas 的 Video-MME 页面](https://atlas.village.dev/benchmarks/videomme-with-subtitles)区分字幕等测试设置并提供模型成绩与来源；[EvalScope 中文文档](https://evalscope.readthedocs.io/zh-cn/latest/benchmarks/videomme_v2.html)列视频、字幕、子集及运行配置。前者不是本次独立复测，后者也未实际部署。
- [Table30v2 官方数据卡](https://huggingface.co/datasets/RoboChallenge/Table30v2)和 [Dexbotic 教程](https://github.com/dexmal/dexbotic/blob/main/hardware/docs/dosw1_inference_example.md)已提供部分新版数据转换、训练或推理路径；具体机器人适配及效果未实测。不要把原版 Table30 的提问直接套到 v2。
- [BiGym 2.0 官方任务说明](https://bigym2.github.io/docs/tasks.html)提醒新场景、初始化与容差令同名任务成绩不能直接与 BiGym 比较；[RoboQuest 官方方法页](https://declare-lab.github.io/RoboQuest/methods.html)公开动作、预算、成功与进度等信息。两者都不是只有总分；本次未运行其评测。
- [印度语言语音识别对比项目](https://github.com/Nemukai/logatra-benchmark)自称比较多个系统并提供数据与运行材料；项目作者的独立性和数据许可、分数未逐项审计。它是已有方案线索，而非客户访谈或商业需求证明。
- [GM-100 官方任务与榜单](https://www.rhos.ai/research/gm-100/results/)展示试管转移等任务、训练/测试入口标签，以及模型、机器人和成功率/部分成功率选择；网站自述处于预览、可能缺数据，本轮未逐项点击或验证文件。与本地同题对照及 [EBiM 官方最终结果](https://ebim-benchmark.github.io/results.html)的排序条件见[具身来源补查](2026-11-09-embodied-source-coverage.md)。
- [KnownRobot](https://knownrobot.com/)已尝试将机器人策略、数据集及来源和复现状态关联，并区分源信息、证据与独立复现；公开页面自报 11 个 artifact、3 项未执行的元数据核查、0 项 evidence record，属于早期方案而非已证实的大规模实测平台。其维护者同时是 #171 提问者。
- [DexArena 官方仓库](https://github.com/SIPAIR-Elastic/DexArena)自述提供任务、示范处理和训练评测代码；其[官方榜单](https://sipair-elastic.github.io/DexArena-website/leaderboard/)已有三个评测轨道、逐阶段成绩、场景分布和热力图，相关日期须区分界面更新和结果导入。[RoboQuest 官方方法](https://declare-lab.github.io/RoboQuest/methods.html)提供任务、动作预算与评分解释。均未部署运行；搜索中未找到可核实的独立用户反馈，不等于无人有需求。DexArena 同题对照见[具身来源补查](2026-11-09-embodied-source-coverage.md)。
- [GraspNet 官方评估说明](https://graspnet.net/evaluation.html)已列对象抓取任务的场景划分、AP 计算与姿态去重；[SuctionNet 官方页](https://graspnet.net/suction)说明共享场景及额外吸盘标签和在线评估代码，并有真机演示。详细口径与本地条目对照见[具身来源补查](2026-11-09-embodied-source-coverage.md)；未复测或验收媒体。
- [CanIEmbody](https://caniembody.pages.dev/)按机器人、策略和硬件展示兼容性证据、部分支持与未核实状态，页面自报 193/504 组合已有证据；这是站方快照而非本次逐格审计，且有不支持与未发现证据的区分需要按其说明核实。与单纯模型排行榜相比，它围绕部署选型提供另一种已有方案。
- [IndustrialVLA-Bench](https://github.com/xiaoqi-7/IndustrialVLA-Bench)作者公开六模型的任务及部署数据，并称硬件测量中的精度、动作块及重规划设置不同，不能作为受控的模型内在效率排名；本次未运行或核验其数据。[VLA-HWBench](https://arxiv.org/abs/2610.34717)关注边缘设备多阶段延迟，[VLALagBench](https://arxiv.org/abs/2611.03103)研究延迟与任务完成的关系；论文结论均为作者报告，不代表实测或普遍部署保证。
- [FlagEval-Robo 发布说明](https://hub.baai.ac.cn/view/57324)提供仿真及真机两种公开评测思路；[中文具身基准榜](https://robotics.hellobike.com/leaderboards/)列出论文成绩和部分配置；[NIST 装配测试方法](https://www.nist.gov/el/intelligent-systems-division-73500/robotic-grasping-and-manipulation-assembly/assembly)提供实物任务板及复现材料。与本地 ManipulationNet、EBiM 等条目关联、论文结论及不可外推边界见[工业具身评测补查](2026-11-09-industrial-robotics-evaluation.md)。这些是已有方案与研究视角，不是独立工厂用户访谈。
- [知行录作者文章](https://fcten.com/2026/07/24/introducing-leaderboard-cn/)介绍中文模型榜、评测资料和厂商发布成绩的来源关联；目标网站本次未直接打开，文章属于作者自述，不能据此确认现状或成绩可靠性。
- [Robot Intelligence Index 的方法](https://www.withplayground.ai/blog/robot-intelligence-index) 已记录多个仿真与实机基准来源、筛除原因及权重敏感性；这些模型结果和统计结论为该站作者报告，本次未复算。

## 访问与样本偏差补充

- 本轮浏览器可直接读取部分 [X 原帖](https://x.com/RichP/status/2027055235756073319) 和公开回复；但 X 站内搜索跳转登录、其他原帖/回复可能加载不全，不能称系统覆盖 X。未登录或操作授权对话框。
- 韩语已找到 #118 所示行业作者材料，但机器人一手用户需求仍缺可靠样本；西语具身检索多数是资料/论文介绍，不能推断两个社区没有需求。
- B 站和知乎只查到部分公开内容；知乎质量审计案例为作者自述并可能有推广利益。社区帖子、软件作者和营销页面不应混为独立受访者。

## 下一步检索

继续扩展已盘点的其余机器人任务、多个独立社区和中文/日文/其他语言来源；跟踪 issue 的作者回应和版本，补工业场景、导航/人形、物理仿真与真实机器人复现；并继续从非具身的视觉、OCR、视频、长上下文、音频与行业场景收集问题。对每个候选方向分别寻找现有产品、支持和反例。样本偏差、关闭平台和不可验证内容持续标注；未经授权不联系用户或发帖。
