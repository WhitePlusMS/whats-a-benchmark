# LIBERO 数据集选择、验证集和质量工具

调查日期：2026-11-09。基于本地条目、固定版本元数据、LeRobot 文档及公开讨论；未下载完整数据、训练模型、运行检查工具或对全量轨迹逐帧比较。开发者自述不等于根因和产品需求已得到确认。

## 本站例子和两种实际数据格式

本地 [LIBERO 条目](../../content/benchmarks/libero.json)解释该基准的 130 项任务，并展示 `HuggingFaceVLA/libero` 固定版本中的一条 214 帧训练示范，另有一条第三方单次仿真评测记录。它们分别属于训练数据和单次测试，不能当作模型整体成绩；站内当前没有完整的两个转换集选型对照。

本次在内存中分别读取两个 Hub 仓库当前提交的 `meta/info.json`，结果如下：

| | [lerobot/libero 固定版本](https://huggingface.co/datasets/lerobot/libero/blob/a1aaacb7f6cd6ee5fb43120f673cebb0cfea7dd4/meta/info.json) | [HuggingFaceVLA/libero 固定版本](https://huggingface.co/datasets/HuggingFaceVLA/libero/blob/86958911c0f959db2bbbdb107eb3e17c5f9c798e/meta/info.json) |
| --- | --- | --- |
| episode / 帧 / 任务 | 1,693 / 273,465 / 40 | 1,693 / 273,465 / 40 |
| 数据划分与频率 | 元数据写 `train: 0:1693`，10 Hz | 同左 |
| 相机字段类型 | `video` | `image` |
| 状态和动作 | 浮点字段；状态 8 维、动作 7 维 | 同左 |

两份转换集的 40 项不能说成原始 LIBERO 全部 130 项；数据集元数据写 train，也不意味着这 1,693 段是独立评估成绩。[LeRobot LIBERO 文档](https://huggingface.co/docs/lerobot/en/libero)称两个版本包含相同演示：前者将相机存为 MP4，约 1.9 GB，需要视频解码依赖；后者将 PNG 图像存入 parquet，约 69.9 GB。文档称视频重编码有少量损失，因此不应声称每个解码像素完全一致。容量和加载速度是文档的当次报告，本次没有下载或基准测试；固定 revision 的汇总数字一致也不足以证明两份数据全量内容逐项一致。

## 使用者关心的问题及不确定性

1. [LeRobot #2851](https://github.com/huggingface/lerobot/issues/2851)中，一位开发者说对 301 条除草任务遥操作演示划分训练/验证后，训练过程正常但机器人推理动作近零；不划分时其自述可以工作。另一位回复者报告类似现象，并推测归一化统计或手工修改训练流程可能有关。发帖人确实手工改过训练代码，当前讨论未证明哪项是根因，本次未复现，也不能据此断言所有验证集或所有模型都会失败。
2. [LeRobot #2326](https://github.com/huggingface/lerobot/issues/2326)中，开发者讨论混合频率、不同数据集的任务字段、合并和编辑；另有使用者描述大量小文件对其集群文件系统造成性能负担。这些是特定工作流的报告，不等于所有数据集都会出现同样问题。
3. [LeRobot 团队的数据整理文章](https://github.com/huggingface/blog/blob/main/lerobot-datasets.md)报告社区数据中存在不明确的相机名称、状态/动作维度不一致和不完整轨迹；这是平台方对其整理过程的观察，没有公开足以由本站复算总体发生率的抽样证据，不能推断具体 LIBERO 数据集有这些问题。

此前台账的 [LIBERO-Plus #55](https://github.com/sylvestf/LIBERO-plus/issues/55)询问状态和动作的旋转表示。LeRobot 文档对其 LIBERO 环境状态写明末端位置、轴角姿态和夹爪状态，并区分相对/绝对控制；这不能自动证明该 issue 所问的 **LIBERO-Plus 某个转换集**具有相同约定。需要按其具体数据和代码确认。

## 已有解决工具和资料

- LeRobot 的 [LIBERO 官方说明](https://huggingface.co/docs/lerobot/en/libero)已经给出两套数据对照、字段、控制模式、训练、评测设置及 revision 建议；因此“把版本、格式和用途说明白”不是无人做的功能。
- [lerobot-dataset-lint](https://github.com/easyrider11/lerobot-dataset-lint)作者称可检查元数据、统计、索引、视频时间范围和抽样轨迹的动作等；[lerobot-doctor](https://github.com/jashshah999/lerobot-doctor)也自述提供数据质量诊断。它们是已有工具，检查范围和报告的有效性本次未运行验证，不能用通过静态检查证明策略或真机一定安全可用。
- [LeRobot 团队文章](https://github.com/huggingface/blog/blob/main/lerobot-datasets.md)和 issue 讨论已经覆盖数据质量与工作流；有问题不意味着当前评测百科需要扩建数据处理产品。

## 可验证的产品问题

可让准备训练或复现 LIBERO 的读者找出：两个来源的存储格式和大小、它们是训练还是评测、记录了哪个 revision、相关控制方式及自己缺少的条件。对照官方说明和本站现有页，记录准确度、耗时与实际是否继续回查；如果本站不能改善阅读，不必建设新的数据集对照功能。此测试尚未进行，现无用户留存、付费或市场规模证据。
