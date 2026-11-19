# AA-Robotics、跨榜指数与双臂仿真：分数对照

核查日期：2026-11-10。此前[AA-Robotics 同题研究](2026-11-09-aa-robotics-same-task-crosswalk.md)对照过本站、AA 和转载站；本次补查跨榜索引及另一套双臂仿真，并只读复算公开的单任务记录。没有调用模型、运行仿真、操作真机或复核视频与逐步标注。

## AA 覆盖什么，其他网站已有多少

本站 [AA-Robotics v0.1](../../content/benchmarks/aa-robotics.json)与[AA 原文](https://artificialanalysis.ai/articles/aa-robotics/)描述的是同一个真实单机械臂桌面测试。AA 将语言模型放入编码智能体，由其通过接口写代码控制机械臂；每题 0–100 分，允许部分进度得分。AA 原文给出八个任务、模型成绩、成本、时间和失败片段。它不是面向所有机器人硬件和 VLA 的通用实机成绩。

[Playground 的 Robot Intelligence Index](https://www.withplayground.ai/blog/robot-intelligence-index)已经把 AA-Robotics 和 RoboDojo、RoboChallenge、RoboTwin、LIBERO 等多个仿真/真机来源纳入跨榜评级，也展示来源、覆盖、评测权重和敏感性检查。该站说默认总体榜要求模型至少有一项实机及一项仿真结果；其按模型名称和版本把不同任务上分别微调的策略归为同一模型，评级因此不能解释为某个固定检查点在某台机器人上的成功率。页面和成绩持续更新，本次没有复算跨榜指数，也未核验其数据再发布授权。

Playground 将 AA-Robotics 描述为每项任务一次、人工判定，并在其拟合中给予较低重复性权重；**这是 Playground 的归纳和权重假设**。此前读取的 AA 原文未明确确认每模型每任务的重复次数，不能仅凭该第三方描述把一次尝试作为已由 AA 原始资料独立核实的事实。

## 同一进度分，不同完整成功数

[micro1 的 Dual-Arm Sim](https://www.micro1.ai/benchmark/dual-arm-sim)使用 Isaac Sim 中的两条仿真机械臂，在模拟手术室完成四项动作任务；作者报告 10 个通用模型各测试 80 回合，共 800 回合。模型每回合最多决策 120 次，思考时仿真暂停；控制器每步约执行指令位移的 40%，该设定不提前告诉模型。该测试是仿真中的通用模型工具控制，作者页面称机器人训练过的 VLA 仍为待加入，不能把结果解释为真实手术或所有 VLA 的性能。

进度按回合达到的最远阶段给分，0、20、40、60、80、100 分分别代表不同阶段；作者报告 Gemini 4 Argon 与 GPT-6 Astra 四任务平均均为 **49.5 分**，完整完成次数分别为 **9/80 和 2/80**。因此 49.5 是阶段进度分，不是完整任务成功率；它也与 AA 的任务平均分定义不同，不能拿同名 0–100 分数跨榜直接比较。作者报告的全部四任务中有 213 个回合出现错误完成声明；这一总体数字未由本次复算。

作者还提供[单项药筒替换数据](https://huggingface.co/datasets/micro1-inc/Dual-ArmSim)，卡片标注 CC BY 4.0；该许可不自动覆盖网页、模型、其他资源及真实医疗用途。读取固定修订 [`00e997f46510ab964ae48ac1c8a268a070566812` 的 trials.csv](https://huggingface.co/datasets/micro1-inc/Dual-ArmSim/blob/00e997f46510ab964ae48ac1c8a268a070566812/data/trials.csv)，文件 86,971 字节，SHA-256 为 `9ae72708d83f8d9d0c646783e81a213bc10a330955e1ba5909f74da1e996416f`：

- 共 **200 行**，均为 `cartridge_swap`，10 个模型各 20 个 seed；按模型和 seed 检查无重复。标签为 Gemini 4 Argon 成功 **6/20**、GPT-6 Astra **2/20**，与数据卡报告一致。
- 按相同 seed 对这两个模型的 `success` 字段配对：**双方均成功 1**、仅 Gemini 成功 5、仅 Astra 成功 1、双方均失败 13。数据卡称 seed 对应同一布局，但这里仅核对记录字段，未验证场景状态、运行随机性或判定正确性；样本不足以推断因果或现场成功率。
- **75/200 行**标记 `false_completion_claim=True`；`declared_done` 则 200 行均为 False。数据卡将前者定义为回合中曾有完成声明且该回合未成功，将后者描述为结束时的 done 状态；字段口径不同，不能把末态全 False 解释成从未声称完成。1 行记录无 trace 且含运行错误；其余 199 行标有 trace。本次只读汇总表，没有逐行检查 trace，也不能用这 200 行验证四任务全部 800 条记录。

## 已有读者分析，不等于本站需求验证

[一篇中英双语分析](https://www.liamding.com/posts/2026-11-04-robot-leaderboard-is-a-shortlist-not-an-acceptance-test/)已经用 Playground 跨榜指数和 micro1 的结果讨论榜单适合初筛、不能代替特定设备和任务测试。文章使用的是 **2026-11-02 的指数快照**，与后来动态更新的 Playground 页面不必一致；作者未在文中提供独立复现实验。该文章本身也是“中文解释跨榜限制”的现成替代，不代表它的读者就是本站用户。

若测试本站价值，可以请目标读者分别从 AA、Playground 与 micro1 页面回答：AA 的 69.4 是什么、Playground 的指数是什么、micro1 的 49.5 与 9/80 有何区别。与现有材料做查找时间和正确率对照；在完成试验前，不能断言新增解释能带来留存、付费或独占优势。
