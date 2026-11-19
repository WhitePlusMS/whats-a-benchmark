# 机器人评测选型与奖励模型：现有手册和复现案例

## TOTO：视觉预训练来源与测试位置

本站 [TOTO](../../content/benchmarks/toto.json)记录的杏仁和薄荷糖是两条离线数据轨迹，不是下述模型的评测回放。[原论文](https://arxiv.org/html/2306.00942)在舀取和倾倒中使用未见过的对象与材料，并分别测试训练中见过及未见过的三个位置；视觉表征实验在两类位置各运行 18 次。论文表 2 汇总两类位置，并按视觉编码器预训练数据来源分组：MoCo 使用 TOTO 数据训练的 in-domain 配合 BC 时，舀取成功率为 83.3%；使用 ImageNet 预训练的 MoCo，即 out-of-domain 配合 BC 时为 33.3%。这里的 in-domain/out-of-domain 不是指训练或测试位置，不能把两项成绩的差距解释为位置变化造成的差距；以上引用论文，未重跑。

[DiffClone 论文](https://arxiv.org/html/2401.09243)也使用 TOTO 数据，分别展示仿真与真实机器人的倾倒结果；两者为不同实验设置，不能把仿真成功率当成真机成功率。其真实实验表将 MoCo + BC 标为 TOTO 基线，列出的 72.2% 与 TOTO 原论文相同，不能据此当成两项独立重复试验。中文 [Embodied Data Atlas 的 TOTO 条目](https://embodieddataatlas.com/zh/datasets/toto/?lang=zh)已说明离线数据、在线评测入口及远程机器人服务未必仍开放；本站是否能更好地帮助读者定位训练/测试条件未做读者对照。

调查日期：2026-11-09。基于本地条目、公开手册、论文和 issue；未执行机器人评测、复现指标或采访用户。研究方向是用户如何理解和使用已有评测，不能将公开提问数当作目标客户数量。

## 已有评测选型手册

### 新发现：商业数据目录也覆盖本站同项的成对选型

[truelabel 的机器人数据比较目录](https://truelabel.ai/datasets/compare)已经按应用场景组织 RLBench vs ManiSkill、CALVIN vs BEHAVIOR、RoboCasa vs LIBERO 等成对说明；这六个名称均可对应本站本地条目（ManiSkill 须区分 [2](../../content/benchmarks/maniskill2.json) 和 [3](../../content/benchmarks/maniskill3.json)）。它还提供[数据目录](https://truelabel.ai/datasets)，页面称可按模态、机器人、许可与用途浏览，并引导数据采集和采购；这是供应商的产品与业务主张，不证明客户数量、使用效果或所有资料已被验证。

具体看 [RLBench vs ManiSkill](https://truelabel.ai/datasets/compare/rlbench-vs-maniskill)：页面已给用途建议、数据模态、来源、仿真限制、许可提示和面向目标任务的样本检查清单；其 ManiSkill 对象明确为 ManiSkill 3。它是“解释两个评测的用途和选型条件”的直接替代资料，而不只是模型排行榜。不过页面的数据格式比较位置当次为空，且明确注明**未执行样本解析**；其采购建议是编辑判断及待执行方案，不应当作已证实两套数据在目标硬件上可用，也不应把其商业许可标签当作本次法律核查结论。[CALVIN vs BEHAVIOR](https://truelabel.ai/datasets/compare/calvin-vs-behavior)和 [RoboCasa vs LIBERO](https://truelabel.ai/datasets/compare/robocasa-vs-libero)也已有同题比较；本次仅查看公开页面，未核验其全部数据条目与交互功能。

另一家 [RoboticsCenter 目录](https://www.roboticscenter.ai/datasets)也把训练数据、评测和资源指南混在目录中，并提供 [LIBERO vs CALVIN 选型页面](https://www.roboticscenter.ai/datasets/compare/libero-vs-calvin)。该目录里的文章、资源集合与单一数据集不是同一统计单位；未运行其平台或逐条验证其数据和许可。两家都是商业服务来源，提供比较页面不是需求规模、用户留存或采购成交的证据，也不能自动证明比本站更准确。

[Ultimate Robotics Handbook 的机器人学习页](https://github.com/Pana1v/ultimate-robotics-handbook/blob/main/robot-learning/datasets-and-benchmarks.md)按真实数据、仿真、导航分类，提供“研究方向 → 建议使用的 benchmark”对照，涉及 LIBERO、CALVIN、RoboCasa、BEHAVIOR-1K、SIMPLER 等。它也指出仿真胜出不保证真机表现。[总索引](https://github.com/Pana1v/ultimate-robotics-handbook/blob/main/other-resources/datasets-benchmarks.md)进一步覆盖导航、SLAM 和检测。选型与限制说明已经有人做；手册对适用性的判断属于作者观点，不应视为统一标准或未经核实的普遍结论。

[ProjectSim 的综述](https://huggingface.co/blog/projectsim/robotics-benchmarking-where-we-are-and-what-comes)也解释抓取预测、仿真任务、长步骤任务、实机数据的不同用途，并介绍 LIBERO、CALVIN、RoboCasa365、DROID；这是一家参与机器人仿真工作的团队发布的内容，不是中立用户调查。本次未逐条验算其全部指标或完成手册可用性测试。

和本站对照：[LIBERO](../../content/benchmarks/libero.json)、[CALVIN](../../content/benchmarks/calvin.json)、[RoboCasa365](../../content/benchmarks/robocasa365.json)、[BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json)、[SIMPLER](../../content/benchmarks/simpler.json)均有独立条目；单项同名不代表双方内容或版本一致。上述手册还讨论训练数据和工程流程，因此不能只比较条目数量，更不能声称“按使用目的推荐”无人提供。

## 一次实际复现提问：相同名字，不同评估对象

项目中已有 [TOTO](../../content/benchmarks/toto.json)、[LIBERO](../../content/benchmarks/libero.json) 和 [Meta-World](../../content/benchmarks/meta-world.json)。TOTO 原论文研究离线训练的机器人策略在共享真实机器人上的操作，本地记录的两条舀取素材是离线真实轨迹，不是机器人策略榜单总成绩；LIBERO 和 Meta-World 项目条目主要描述仿真操作任务。

[Robometer 项目](https://robometer.github.io/)将多来源机器人轨迹用于奖励模型训练及评估；其 RBM-EVAL 页面列有 OXE Toto、Libero 90 和 MetaWorld。项目称 VOC 为预测奖励与任务进度的 Pearson 相关系数，另以 Kendall 系数衡量轨迹排序。因而其 Toto 项的 **0.973 是作者表中一个奖励对齐相关系数，不是 TOTO 机械臂有 97.3% 的成功率**。这里仅根据名称及官方项目说明建立来源层面的联系，未逐条验证 Robometer 使用的片段与本站展示的舀取轨迹是否相同；这些指标也不能作为同名 benchmark 原始成绩。

[Robometer issue #22](https://github.com/robometer/robometer/issues/22)有一个完整的开发者问答：

1. 提问者使用已发布 checkpoint 和数据，报告复现结果与论文数字有差异，并询问采帧、配置和数据子集；这是其自报，不能直接认定根因。
2. 贡献者说明更新了 OOD 数据集类别，并给出复现命令：其中 `custom_eval.use_frame_steps=false`，而提问者最初的奖励对齐命令使用 `true`；命令还设置了轨迹和任务数上限。两套配置存在不止一个差异，不应把全部偏差断言为单一参数导致。
3. 提问者后续表示按建议操作后，ID/OOD 结果与作者提供的结果非常接近，并关闭 issue。该线程的作者答复解决了该使用者的复现问题；本次没有运行命令，也不能保证其他版本或设备复现。

这体现了一个具体阅读任务：当同一 TOTO 名称出现在不同论文、训练集和评测表里时，判断对象、来源、子集和指标，不能只按名称归档。它并不证明用户会使用本站、具身开发者普遍有同一问题或此功能可收费。

## 现有工具与机会判断

- Robometer 已提供[公开代码](https://github.com/robometer/robometer)、数据入口、指标和 issue 答复，本案例本身不需要假设没有官方解决方案。
- [AllenAI 的跨 VLA 评估运行框架](https://github.com/allenai/vla-evaluation-harness)已有多环境评估和部分复现记录；它与阅读资料的工作流相邻，但不是 Robometer 同一个奖励模型评估，也未在本次安装。
- 一项可测试假设：用该真实 issue 的初始配置、作者答复与本站既有 TOTO 介绍，让读者回答“0.973 测什么、哪个模型/数据、为什么不能当成功率、哪些设置发生变化”；与原 issue 和现有说明比较查找耗时与错误。尚无真实读者对照，不能因此声称本站优于已有资料。
