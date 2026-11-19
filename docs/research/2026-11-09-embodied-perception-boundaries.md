# 具身感知、导航与执行：竞品与任务边界

核查日期：2026-11-09。本记录依据当前工作树和所链接的公开材料；不代表已实际运行评测、核验线上站点全部功能，亦不代表用户需求已获验证。

后续对照：以本站 BEHAVIOR-1K 为入口，补查 [BEHAVIOR-Spatial、ManipBench、MV-RoboBench 和 Embodied3DBench](2026-11-09-spatial-language-action-crosswalk.md)，区分空间问答、定位和仿真动作，并记录已有解读与许可边界。

机器人视觉问答补充：[Robo2VLM、RoboVista、BOP-ASK 与站内评测](2026-11-09-robot-vqa-dataset-score-boundaries.md)区分真实轨迹产生的问答、离线抓取 AP 和单独的真机实验，并记录同一项目跨页面分数差异与未确认原因。

## 现有产品

- [Embodied Arena 论文](https://arxiv.org/html/2509.15273)提出具身问答、导航、任务规划三类榜单和按基准、能力两种视角，覆盖准确率问答和交互式仿真；其 [GitHub 框架](https://github.com/EmbodiedArena/embodied-arena)列 RoboVQA、VSI-Bench、OpenEQA、EmbSpatial-Bench 等，提供模型接入和评估流程。它是具身领域已有的评测聚合及运行平台，不能说本站一旦转向具身就没有竞品。官方站的搜索索引快照写有三类榜单和 22 项评测，本次未能完整读取动态页面，不将该数量作为实时全站清点或已验证交互。
- [具身导航 benchmark zoo](https://github.com/youngYangtze/awesome-embodied-navigation-benchmark-zoo)是公开导航任务、数据集、指标、榜单与复现资料目录，说明分类和资料聚合也有替代品；仓库中的说明或状态不自动代表独立复现成功。
- [RoboBench](https://robo-bench.github.io/)考察多模态模型作为具身决策系统的能力，含 6092 个问答对及对规划的模型模拟评价；[Vals Robo-bench](https://www.vals.ai/benchmarks/robo_bench)是控制仿真机械臂与人形机器人的另一项评测。两者名称相似，任务、指标、提供者均不同，不能合并成绩，也不能把问答成绩解释为真机成功率。

## 样例比较和范围

- [NaviTrace](https://leggedrobotics.github.io/navitrace_webpage/)要求模型根据图像、指令和人的行走、轮式或足式机器人等类型，输出**图像平面上的二维路径**；官网提供榜单和评估脚本。它不是直接驱动真实机器人行驶的测试。
- 本地 [R2R-CE](../../content/benchmarks/r2r-vlnce.json)记录的是 Habitat 连续仿真环境中，依据视觉与语言产生前进、转向和停止动作；与 NaviTrace 都关联导航，但输入、输出和环境不同，分数不能直接排序。此次按文件名及 JSON 文本查找 NaviTrace 未命中；这不是全站或全部同义名称的完整覆盖证明。
- 本地已发布的 50 个 `embodied` 标记条目是字段统计，不等于全部机器人相关内容；无标记的 [EmbodiedX](../../content/benchmarks/embodiedx.json)面向具身模型推理效率。本轮有限关键词复查还命中 [Roboflow Vision Evals](../../content/benchmarks/roboflow-vision-evals.json) 等通用视觉任务，不能仅凭可能用于机器人就归入机器人动作测试。已有盘点和其他静态视觉、名称误匹配边界见[本地盘点](2026-11-09-embodied-inventory.md)。

## 同名歧义与关键词盘点的边界

2026-11-10 在本地 `status=published` 且没有 `embodied` 字段的 JSON 中，对 ID、名称、简介、标签、官方定义和任务契约做机器人、具身、操作、导航和空间推理等中英文关键词筛查，共命中 5 项。人工核对：`embodiedx` 与具身模型推理效率直接相关；`big-bench-audio` 的导航是音频推理题、`chess-puzzles` 是棋局空间推理、`vibe-code-bench-v1-1` 和 `webvoyager` 的导航指网页操作，不应仅凭关键词将后四项当成机器人动作评测。限定字段和关键词会漏掉同义词、其他字段或未标记条目，故不能据此认为项目内总共只有 51 项相关内容。

更具体的身份区分：本站 [EmbodiedX](../../content/benchmarks/embodiedx.json)对应 [CoRL 工作坊效率评测](https://efficient-embodied-ai.github.io/challenge/)，针对特定硬件和不同工作负载衡量延迟、吞吐及能效；[数字中国报道](https://www.digitalchina.gov.cn/2026/xwzx/szkx/202611/t20261104_5389387.htm)中京东物流“超脑”3.0 的 EmbodiedX 指供应链体系中的具身模型。两处名称相同但对象、发布背景不同；本轮未发现二者为同一项目的证据，不能把仓储应用报道归因于该评测或把评测成绩当作该模型成绩。报道描述不构成本站对实际仓储部署的独立核验。

这类歧义说明标题之外的发布方、对象类型和原始入口对检索有用，但这只是一个具体案例，不能证明增加该字段本身就能形成稳定用户。

## 产品判断

多模态感知、轨迹预测、仿真闭环和真实机器人执行解决的是相关但不同的问题。将测试的输入、输出、环境、模型和统计口径串起来是候选阅读价值，然而上述竞品及各基准官方页面也提供部分说明。是否能节省目标读者时间、是否值得持续维护，需要与现有网站和原始资料做真实对照；[阅读测试材料](2026-11-09-reader-study-protocol.md)已准备，但还没有执行或招募用户。
