# 具身评测完整性：LIBERO-PRO 样例与七项基准审计

调查日期：2026-11-09。基于当前本地文件、固定上游版本、公开 issue 和研究论文；未运行仿真、访问真实机器人、复核论文原始日志或审计当前上游所有修复。

## 一项与本站样例直接相关的开发者问题

本站 [LIBERO-PRO 条目](../../content/benchmarks/libero-pro.json)包含一条 `libero_spatial_lan` 语言扰动记录：它摘录 [BDDL 固定版本](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro/blob/e9f3a53/bddl_files/libero_spatial_lan/pick_up_the_black_bowl_between_the_plate_and_the_ramekin_and_place_it_on_the_plate.bddl)中的 `:language`，其措辞是 `lift ... and set`；文件名对应的措辞则是 `pick up ... and place`。本次通过只读下载源 BDDL 核实了 `:language` 和本站摘录一致。两句语义相近，但字面上不同；本站样例明确是文件摘录，不是一次模型运行记录。

[项目 issue #14](https://github.com/Zxy-MLlab/LIBERO-PRO/issues/14)里，开发者报告任务扰动后，BDDL 描述要求打开下层抽屉，而运行时模型收到的仍是原来的中层抽屉指令。项目维护者回复确认其所讨论的 OpenVLA 评测路径从文件名取得指令，并建议在该路径改为从环境读取语言；另有参与者建议改任务加载环节。该回复是对当时具体使用路径的解释，不证明所有后续评测都仍存在问题或所有成绩都无效。

固定 [LIBERO-PRO 源码版本 `eafdb809`](https://github.com/Zxy-MLlab/LIBERO-PRO/blob/eafdb809426b13153aa1e4c42d6601844217dfec/libero/libero/benchmark/__init__.py)中，任务表的 `language` 确由 `grab_language_from_filename` 生成；但最终送给模型的值还取决于使用的评测程序是否覆盖该字段。另一个 [issue #27](https://github.com/Zxy-MLlab/LIBERO-PRO/issues/27)的报告者称同类问题影响 `_lan` 语义扰动，并自报对固定检查点和多个任务作成对测试；本次没有独立复现其运行、验证全部统计分析或确认当前主分支状态。

因此，本站这个样例可以准确回答“原 BDDL 写了什么”，**不能独自证明策略实际收到改写指令，也不能证明已经发生或避免了该问题**。核对实际实验需同时知道评测脚本、代码版本及运行时输入；目前没有证据判定本站这条静态样例错误。

## 研究论文的范围与具体数字

[《Faster and Better?》论文 v1](https://arxiv.org/html/2609.37771v1)审计七个机器人仿真基准及相关评估流程，报告 22 个其归类为 bug 的问题和 4 个设计限制。其附表列的仓库对应本站已有 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)、[LIBERO](../../content/benchmarks/libero.json)、[LIBERO-PRO](../../content/benchmarks/libero-pro.json)、[LIBERO-Plus](../../content/benchmarks/libero-plus.json)、[RoboCasa365](../../content/benchmarks/robocasa365.json)、[VLABench](../../content/benchmarks/vlabench.json)、[RoboDojo](../../content/benchmarks/robodojo.json)；这是仓库/系列关联，不意味着这些本地样例来自论文所测提交或均受影响。论文附表记录了各自代码提交，不能推断当前版本仍然存在相同问题。

例如作者在其 LIBERO-PRO Spatial-Task 实验中报告：修订前基线成功率 **0.4%**，修订后 **53.2%**；对应加速变体的排序也变化。作者将其归因于实验设置中的问题修复，这一数值属于该论文的特定测试，不是整个 LIBERO-PRO 榜单或所有模型的成功率；本次没有复算其分母、原始 episode 或统计显著性。论文另有实体机器人实验，以上具体基准修订比较是仿真数据，不能误写为真机修复结果。

作者还称，在所审计 VLABench 的 `select_painting` 中，部分指令要求抓画，演示和判定却围绕按键；论文建议按目标抓取检查。另一项目 [Embodied First Exam 的 VLABench 适配说明](https://github.com/mll-lab-nu/embodied-first-exam/blob/main/tasks/vlabench/README.md)则称保留原成功检查、调整任务说明以明确按键要求。它们分别改变判定和说明，实验结果的含义与可比性可能不同；我们没有运行任一实现，也未把第三方适配称为 VLABench 官方修复。

## 对需求与产品的含义

这不是凭空假设：issue #14 里有人明确因指令和执行不一致请求帮助，维护者已有答复；issue #27 另有人询问 π0.5 成绩为什么对不齐。读者可能需要的是**定位自己那次运行采用了哪条指令、哪个检查器和哪个代码版本**，而非再看一个总分。现有 issue、论文和适配项目已分别提供原因、测试或处理方式，本站能否把这些入口组织得更容易查找，仍需用相同任务和这些现成来源做读者对照；公开提问不证明用户会访问或付费。
