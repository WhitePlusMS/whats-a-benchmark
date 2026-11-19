# 机器人评测聚合与目录：同一来源成绩对照

调查日期：2026-11-09。对照本站已有 LIBERO 和 RoboTwin 2.0 条目、公开聚合站、原始论文和 VLA 目录。网站是动态快照；本次没有复测模型、核对每一行来源，或采访用户。

后续补充：[RoboTwin 早期版和 2.0](2026-11-10-robotwin-early-versions-reproduction.md)对照同类任务的固定代码、不同实验成绩及检查点复现提问；未运行策略。

## 与本站直接重叠的聚合入口

[Papers with Code 的 Robotics 页面](https://paperswithcode.co/tasks/robotics)列出了 LIBERO 各子集、RoboTwin、RoboTwin 2.0 分场景、CALVIN、BEHAVIOR-1K、RoboDojo 等评测，并提供相应榜单链接。它与已关闭的旧 `.com` 不能简单当作同一网站；该 `.co` 项目的[发布说明](https://huggingface.co/blog/nielsr/paperswithcode-launch)称这是重建版本。本站已有 [LIBERO](../../content/benchmarks/libero.json) 和 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)介绍与样例，并非现成模型成绩榜。

其 [LIBERO 榜单](https://paperswithcode.co/benchmark/libero?task=robotics)公开模型名称、成功率、论文及日期；[RoboTwin 汇总榜](https://paperswithcode.co/benchmark/robotwin?task=robotics)也包含模型、场景标识、成绩与论文链接。这是对“整理公开发布成绩并链接论文”的直接竞争，不能说只有本站想到。

## 核对一个明确的成绩及其场景

[ABot-M0.5 原始论文表 4](https://arxiv.org/html/2607.00678)将 RoboTwin 2.0 结果列为 Clean/Easy **94.00%**、Randomized/Hard **94.20%**，以及两者平均 **94.10%**；论文称为 50 个任务的平均成功率。它们是论文作者报告的仿真评测，本站没有复跑。

调查时，上述聚合站的 RoboTwin 汇总榜把同一模型的 Randomized 94.2 和 Clean 94.0 作为有各自场景标签的两行放在同一排序中，与其他带 Easy、Hard 或未在模型名称中注明场景的结果共同显示。这些数字与论文表格一致；但“在一个表里按数值排序”本身不说明所有行的完整训练、评测协议相同，也不能将 94.2 与 94.0 当成两个不同模型的独立测试。

该网站还提供单独的 [Hard 50 任务榜](https://paperswithcode.co/benchmark/robotwin-2-0-hard-50-tasks)及 Easy 50 任务榜，说明其并非没有区分条件。调查时 Hard 榜显示 OpenWAM-alpha 93.46%，未在该榜页面找到 ABot-M0.5 94.2%；汇总榜却有后者。仅凭这个页面快照不能确定收录规则、遗漏原因或数据错误，更不能推断其所有榜单覆盖不全。它说明查看聚合结果时，仍需检查**具体榜单、原文、任务范围和场景**，而不只看总排名。

## 类似定位的研究资料库

[VLA Datasets & Benchmarks](https://github.com/ziyaow1010/vla-datasets-benchmarks)说明其意图是帮助读者找到数据、理解格式与评测协议、选择适合研究目标的基准。它按桌面/多场景和短/长任务分类，列有 LIBERO、CALVIN、BEHAVIOR-1K、VLABench，并提供论文/部分项目入口；其通用评测提示包括成功判定、reset、泛化划分、机器人形态及 seed 数。部分分类在调查时仍是占位，列出的各评测也不是每项都有完整协议或成绩表。它是已有的英文研究目录，与本站内容入口重叠，但不能仅凭目录判定两者整体孰优。

该目录一个[公开 issue](https://github.com/ziyaow1010/vla-datasets-benchmarks/issues/1)里，DOMINO 作者建议增加其基于 RoboTwin 2.0 的动态任务及数据生成项目，维护者回复已加入 data engine 分类；同一作者还希望论文引用。因此这是**项目作者推广和维护者回应**，可以证明目录存在提交/分类互动，但不是独立潜在用户的购买意向，也不能把一次互动算成普遍需求。

另一份 [VLA 综述仓库](https://github.com/RuleShi/VLA-Embodied-Intelligence-Survey)说明其关联线上榜单，覆盖多个已收录的机器人测试；本次直接打开榜单失败，仅能引用仓库作者对其功能的描述，不能声称已经核验榜单具体数据或实际可用性。

## 产品研究含义

当前证据支持“论文、评测、模型结果和分类”已有产品/资料库，因而把发布表数字放进榜单不是独占方向。可以验证的细分任务是：让机器人研究读者从 ABot-M0.5 汇总榜回答这三个数字各对应什么、能否与其他行直接比、原文在哪里；再对照本站的一张带来源和未知字段的阅读卡。现有 [读者测试方案](2026-11-09-reader-study-protocol.md)尚未招募或测试，不能声称本站已更快、更准确或更可信。
