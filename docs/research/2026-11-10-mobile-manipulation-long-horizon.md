# 移动操作补查：RoboCasa-Long、RMMBench 与 LAMBDA

核查日期：2026-11-10。依据公开论文、项目页、仓库和数据元信息；没有运行模型、模拟器或机器人，也未访谈终端用户。模型数字为原作者报告，页面与数据可能变化。

## 与本站的关系

本站已有 [RoboCasa365](../../content/benchmarks/robocasa365.json)、[RoboCasa](../../content/benchmarks/robocasa.json)、[R2R-CE](../../content/benchmarks/r2r-vlnce.json) 和 [LADDER](../../content/benchmarks/ladder.json) 等条目，分别涉及家居操作、语言导航与长步骤任务；不同任务、本体与评价条件不能仅因包含导航或抓取而混排。对当前 JSON 文件名和 `name` 字段以 `RoboCasa-Long`、`RMMBench`、`LAMBDA` 等确切写法查找无命中；仅限所查字段和拼写，不排除别名或正文引用。

## RoboCasa-Long：多分钟仿真任务与另一组固定底座真机任务

[MOST 论文 v1](https://arxiv.org/html/2611.00734v1)引入 RoboCasa-Long，三个仿真任务涉及跨厨房工作区收水果、准备早餐与餐后整理；每任务 200 条演示，每策略每任务评测 30 次，平均演示约 3.8 分钟。论文称训练和评估使用相同任务环境，不应把它直接描述为新厨房或任务泛化测试。

论文的 MOST 三任务平均**最大进度 42.22%**，不是完整成功率；同表平均完整成功率 **6.66%**。最大进度是执行期间到达的最远阶段，可能之后退回；状态进度来自仿真条件，真实实验则按录制视频人工标注，不能把它与其他论文的模型裁判分数或真实产线通过率混排。

论文另报告 Galbot G1 真机香蕉转移测试：固定底座、腰部转动、单臂夹取，按要求放入指定数量后还需按按钮，三个任务各 10 次；MOST 的完整成功率分别 40%、50%、40%，等权平均 **43.33%**。这种真机测试并非 RoboCasa-Long 三项厨房任务的逐项真实重跑，也没有验证移动底盘；30 次是每策略的真机评测次数，不是训练示范。论文称该真机训练有 180 条示范，且指出样本量小。

本次读取 [RoboCasa-Long 数据卡](https://huggingface.co/datasets/diqihe666/robocasa_long)及各任务公开 `meta/info.json`：[PackFruit](https://huggingface.co/datasets/diqihe666/robocasa_long/blob/main/PackFruit/meta/info.json)、[PrepareBreakfast](https://huggingface.co/datasets/diqihe666/robocasa_long/blob/main/PrepareBreakfast/meta/info.json)、[CleanAndStoreAfterMeal](https://huggingface.co/datasets/diqihe666/robocasa_long/blob/main/CleanAndStoreAfterMeal/meta/info.json)分别记载 200 个 episode、600 个视频、20 FPS；数据卡描述每 episode 有三个摄像头视角。HF Viewer 显示 **1,800 rows**，预览字段是视频及视角标签，该数字与元数据视频总数一致，但本次未逐行匹配，不能认定它代表 1,800 条独立演示或逐文件核验完整性。数据卡特别写明新增数据的许可需作者确认；上游代码 MIT 和资产声明不能自动套给新标注。[MOST 仓库](https://github.com/Intelligent-Interaction/MOST-vla)列训练与评测代码及独立环境仓库，同时有待办项；未安装或验证能完整复现。

## RMMBench：视觉语言模型加技能执行系统

[RMMBench 论文 v2 的 HTML 正文](https://arxiv.org/html/2610.05414v2)基于 MuJoCo 仿真，将 90 个场景分为 60 个固定位置操作和 30 个导航加操作场景；但同一版本的 arXiv 摘要元数据写 70，具体冲突与仓库文件核对见下文。使用 RoboCasa 场景和 Objaverse 资产不意味着与原 RoboCasa365 使用相同任务或榜单。VLM 选择技能、目标与抓取候选，后端负责运动规划、逆运动学及底层执行；成绩是包含这些组件的系统结果，不是语言模型直接控制电机的真机成功率。

论文表 3 和表 4 同一系统的 Gemini-3-Flash 带鸟瞰图复合任务成功率 **30.00%**，不带鸟瞰图为 **21.11%**；这是不同输入设置的论文结果，未核查逐次配对与置信区间，不能断言现场或所有模型有同样增幅。操作任务表注明每任务仅 3 次，结果粒度及不确定性应结合实际分母阅读。[项目仓库](https://github.com/mxxq-stack/RMMBench)提供运行说明并依赖其他资产，未安装或验收。

### 70 与 90：同一论文版本的摘要、正文和配置

[arXiv v1 摘要页](https://arxiv.org/abs/2610.05414v1)和[v2 摘要页](https://arxiv.org/abs/2610.05414v2)都写 70 个场景；但 [v2 HTML 论文摘要及正文](https://arxiv.org/html/2610.05414v2)和[项目页](https://mxxq-stack.github.io/rmmbench-project/)写 90，即 60 个操作加 30 个导航操作。两种数字在同一版本的公开材料中不一致，**不能简单解释成 v1 到 v2 的扩充**；本次未读取 30 MB 以上的 v2 PDF 或联系作者，不能判断谁的表述应为准。

2026-11-10 只读获取仓库 `main` 当时的提交 `11b0d16abe04e37ebe7cec9a59c3c1df7578657c`，解析固定版本的 JSON 顶层键：

| 配置文件 | 顶层键数 | 本次精确键名对照 |
| --- | --- | --- |
| [manipulation_episodes.json](https://github.com/mxxq-stack/RMMBench/blob/11b0d16abe04e37ebe7cec9a59c3c1df7578657c/RMMBench/vlm_evaluation/configs/episodes/manipulation_episodes.json) | 60 | 文件级任务键；未验证每个键的执行是否成功 |
| [long_horizon_tasks.json](https://github.com/mxxq-stack/RMMBench/blob/11b0d16abe04e37ebe7cec9a59c3c1df7578657c/RMMBench/vlm_evaluation/configs/episodes/long_horizon_tasks.json) | 21 | 21 个键都出现在上述 60 个键中，不能相加为 81 |
| [nav.json](https://github.com/mxxq-stack/RMMBench/blob/11b0d16abe04e37ebe7cec9a59c3c1df7578657c/RMMBench/vlm_evaluation/configs/episodes/nav.json) | 10 | 10 个键都出现在下一文件中，其中一个键的值是两项列表，不能直接把键数当运行次数 |
| [nav_episodes/nav.json](https://github.com/mxxq-stack/RMMBench/blob/11b0d16abe04e37ebe7cec9a59c3c1df7578657c/RMMBench/vlm_evaluation/configs/episodes/nav_episodes/nav.json) | 30 | 与 10 键文件的交集为 10；仍未核验是否就是论文结果所用版本 |

60 + 10 和 60 + 30 恰好与 70、90 两种表述在数值上相同，但这只是配置键数量的观察，不证明摘要数字的来源、论文实际执行的集合或 v1/v2 的变更原因。[固定提交 README](https://github.com/mxxq-stack/RMMBench/blob/11b0d16abe04e37ebe7cec9a59c3c1df7578657c/README.md)指示将默认文件名改为 `nav_episodes.json`；本次目录清单未找到该文件名，而是见到上述 `nav.json` 和 `nav_episodes` 目录。它是该提交下的文档与文件路径差异，不证明无法通过其他参数运行；未实际执行或确认作者预期入口。配置内条目与论文附录任务的逐项身份及论文各次实验所用文件均未核对。

## LAMBDA：真实演示和真实策略评估也要分开

[LAMBDA 项目页](https://lambdabenchmark.github.io/)描述 571 条人类采集的移动抓放演示，其中 521 条仿真、50 条真实；这些是示范数据量，不是模型成功次数。[论文 v7](https://arxiv.org/html/2412.05313v7)说明 RT-1 和 MG-MoMa 的训练与主要实验基于仿真，另一个 LIMP 模块化系统在真实 Spot 上用 45 项任务评估，部分任务由仿真设定在现实中近似搭建。论文表中的 44.4% 是这个真机系统、任务及其方法下的结果，不应与仿真策略数字当成完全相同的实验条件。

论文另称 521 个仿真指令由 41 名众包参与者提出，展示了这些参与者会描述的室内任务；其样本、采样和背景不能代表工业现场需求，更不意味着他们需要本站或愿意付费。代码及数据下载入口由[项目仓库](https://github.com/h2r/LAMBDA)列出；本次未下载大数据或验证可运行及数据许可。

## 产品判断

这三项确实扩展了站内现有资料的候选范围，但官方论文、项目页、仓库及既有具身目录已提供大量任务与方法。可继续验证的问题是读者能否从本站入口迅速区分“全程导航操作”“固定底座抓放”“VLM 加工具”和“训练演示/评测运行”；目前没有读者对照、回访或商业需求证据，不应将新增分类本身视为护城河。
