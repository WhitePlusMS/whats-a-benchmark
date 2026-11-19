# 机器人数据质量、失败识别与评测泄漏

核查时间：2026-11-10。目标是连接本站已有机器人数据样例、真实的数据排查需求和已有工具；不修改本站评测数据、不运行机器人或训练模型。

## 需求与已有工具

[LeRobot 用户开发的 `lerobot-doctor`](https://www.reddit.com/r/ROS/comments/1sej9r6/lerobotdoctor_a_dataset_sanity_checker_i_made_for/)自述：训练数据中可能出现 NaN、相机帧同步、动作裁剪和时间戳问题，训练可以完成但策略异常，因此其提供检查工具。这是作者经验和自荐，未独立复现，不代表本站用户普遍有该需求。

[Haptal Robotics Dataset Quality Leaderboard](https://huggingface.co/datasets/HaptalAI/robotics-quality-leaderboard)尝试按训练数据的启发式异常评分；其[数据卡](https://huggingface.co/datasets/HaptalAI/robotics-quality-leaderboard/blob/main/README.md)说明通常取训练集原始顺序前 50 个 episode，不具备的传感器检查会跳过，分数用于初筛，不是机器人任务成功率或对全数据的质量认证。[其评分代码仓库链接](https://github.com/aaravbedi/quality_scorer)本次返回 404，原因不明；不能据数据卡的“开源”描述断言本轮能够复现或仓库不存在。

2026-11-10 Hugging Face API 显示该榜版本 `716e047e1d0791a16fcd6db803c045be337dae96`，在线 rows API 声称共 170 行；本次只查看前 100 行及其中两项：

| 对象 | 该榜记录 | 不应推断 |
| --- | --- | --- |
| `lerobot/libero` | 68 分，50 episode、13,835 帧；异常标记的 physical 平均率 0.43；力矩、力和显式错位检查跳过。 | 不是 43% 的机器人任务真实失败、不是原版 LIBERO 模型成功率，更不是同一份数据的全量审核。 |
| `Sylvest/LIBERO-plus` | 分数为 null、采样 0；错误为未找到支持的数据文件。 | 不是 0 分，不证明源数据不存在或全部无法使用。 |

第一行按数据卡公式复算 `100 - 75×0.43 = 67.75`，按其取整约为 68。`physical_failure_rate` 是已运行物理异常检查的标记率均值，不是人工核验的任务失败概率；不同检查缺失、前 50 条非随机及模拟环境都影响解释。本次未执行 scorer，未验证本地 LIBERO 示例恰来自这两个数据集。另一个带失败样例的数据集被该榜低分，不代表它不能用于失败检测训练：失败样本在此用途可能是有意设计。

## 固定版错位失败数据集：文档与实际文件

[Haptal Misalignment Failure Benchmark 数据卡](https://huggingface.co/datasets/HaptalAI/misalignment-failure-benchmark)声称含 2,000 个合成 episode、训练/测试 1,600/400，并报告模型在合成数据上的识别指标。作者明确这些错位失败是合成注入，实机验证仍进行中；这不是真实工厂故障率。[固定修订 `f402167`](https://huggingface.co/datasets/HaptalAI/misalignment-failure-benchmark/tree/f402167b1561795b7103deb391d3fb57fcb5ede7)的 `labels.parquet` 和 `episodes.parquet` 本次在内存读取如下：

| 文件实际情况 | 独立计数 |
| --- | --- |
| 标签 | 150 条，110 train、40 test。 |
| 轨迹 | 51,172 帧，150 个不重复 episode ID；标签与轨迹 ID 两边集合完全一致。 |
| 测试标签 | 15 条 `actually_succeeded=True`，25 条 false。 |

因此该固定文件与数据卡描述的 2,000、1,600/400 和约 678,000 帧不一致。本次未追溯其他文件版本、未运行作者的生成脚本；不能排除作者曾经使用过其他完整数据或另有未列出的数据。Hugging Face 页面数据预览也显示当前轨迹列有 150 个不同 ID。文件 SHA-256：`labels.parquet` 为 `908c2c8875aa3a866e705b301c5dc8daa87eb170397de01c9f730225e2b68588`，`episodes.parquet` 为 `dbb7b0c57743ecd2f80b15ebf6cc894f5e6370d51ea297a9fedfb4f0a9fef5a4`。

## episode ID 直接包含标签

固定修订的[生成脚本](https://huggingface.co/datasets/HaptalAI/misalignment-failure-benchmark/blob/f402167b1561795b7103deb391d3fb57fcb5ede7/generate_misalignment_dataset.py)按 `eid = f"{cls}_{i+1:04d}"` 生成 ID：例如 `true_success_...` 是成功，`phantom_grasp_...` 是失败类别。ID 同时出现在输入轨迹和标签文件中。对实际固定版 150 条标签逐条核对，150/150 的 ID 前缀匹配其类别；40 条测试 ID 在轨迹中均有对应，单看 `true_success_` 前缀就能判对 **40/40** 的二分类标签，连轨迹数值都不用看。这是本次的纯字符串核查，不是新训练的模型成绩或真实部署效果。

这个数据泄漏意味着如果评测流程将原始 ID 提供给受测方法，方法可能绕开识别物理信号而得到高分。**不能据此说作者报告的随机森林基线使用了泄漏信息**：固定版 [baseline.py](https://huggingface.co/datasets/HaptalAI/misalignment-failure-benchmark/blob/f402167b1561795b7103deb391d3fb57fcb5ede7/baseline.py)把 ID 设为索引，所选 `joint_cols` / `full_cols` 来自数值特征列；此次只静态检查代码，未运行其基线、未验证文档成绩是否来自该 150 条文件。

固定版 [score.py](https://huggingface.co/datasets/HaptalAI/misalignment-failure-benchmark/blob/f402167b1561795b7103deb391d3fb57fcb5ede7/score.py)要求提交 ID，与公开测试标签按 ID 做内连接；缺失预测时警告并排除，而非强制全部覆盖。它输出的 `False-success recall (headline)` 是被识别出的失败占失败总数，不是数据卡重点强调的“90% specificity 条件下的召回率”。这些是当前代码路径的静态观察，不等于任何已发表成绩采用了此脚本或发生违规。

同一基线文件中 `recall_at_specificity` 用 `searchsorted` 查找阈值；对特异度依次为 `[1.0, 0.95, 0.85]` 的示例，本次用标准库等价计算会选 0.85，而它低于声明的 ≥0.90。这个构造示例只说明某些 ROC 离散点可能越过约束，尚未运行其真实预测或证明卡片里的 0.34/0.88 数字受影响。

## 不同类型的“失败”与评测竞争

[VLA-FixBench](https://bowen-yan-research.github.io/papers/vla-fault-recovery/)关注视觉语言模型识别故障、定位回滚点和修正后能否让机器人继续完成任务；其官网报告包含仿真和两项真机任务，并说明真机采用一秒执行后暂停检查，不是实时无延迟接管。在其特定实验中作者报告原 VLA 30%、最佳自动辅助 25%、人工专家辅助 65%；人工结果不能说成自动模型提升。官网已有任务说明与结果，不能将这一比较说成本站独有；未核验论文所有分母或重跑。

上述数据筛查、合成失败分类、真实机器人恢复是三个不同对象，不能按单个“失败率排行榜”混排。本站可以测试的读者问题是：给定训练数据或一条成功录像，读者能否找到其采样、成功判据、真实/合成状态、ID 泄漏风险和可复现文件；但现有数据卡、上游代码与工具已提供部分信息，尚无读者对照或付费证据。
