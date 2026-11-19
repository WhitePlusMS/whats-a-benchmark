# LIBERO：画面方向、初始状态与复现需求

核查时间：2026-11-10。本记录是对公开代码、作者文章、论文与社区反馈的阅读；未运行模型或仿真，不判断本站具体视频或成绩存在问题。本站 [LIBERO 条目](../../content/benchmarks/libero.json)包含官方演示数据、第三方转换数据和一次第三方 π0.5 仿真录像；它们不是同一次训练与评估，不能仅凭资源名称断言方向约定相同。

## 已有开发者问题与实验

- [DreamZero issue #39](https://github.com/dreamzero0/dreamzero/issues/39)：开发者描述使用转换后的 LIBERO 数据微调 DreamZero，训练和评估采用一致的画面处理，但训练损失下降且示范动作重放正常，闭环仍无法稳定完成单个任务。他询问双摄像头布局和方向是否符合预期。协作者答复尚未将 DreamZero 应用于 LIBERO，建议先查看开环推理，并提出数据格式差异可能造成负迁移；并未确认失败由翻转引起。该 issue 后来关闭，不等于原问题已证明解决。
- [LeRobot issue #3830](https://github.com/huggingface/lerobot/issues/3830)：另一位开发者指出其 LIBERO 包装下的画面与真实 Franka 外观左右相反，担心与真实预训练图像方向不一致，并提出同时调整环境和数据集。这里是公开报告及其判断，不证明所有数据、模型或真实机器人都受影响。
- [Visible Touch 论文 v2 附录 D.3](https://arxiv.org/html/2609.14156v2)：作者报告其 LIBERO_90 训练和 Stanford miniVLA 所用数据的图像方向不同。对 Stanford 检查点的一个仿真任务，各处理方式只试 5 次：不变 0/5、上下翻转 5/5、左右翻转 0/5、旋转 180° 0/5。此为论文中的小规模诊断、非本次复现，不可外推到所有任务、模型或实机；更不能把某种处理规则套到所有模型。

## 代码支持什么，不支持什么

2026-11-10 以 `git ls-remote` 获取分支头并读取固定代码：

1. [OpenVLA 固定版 `c8f03f4` 的 `libero_utils.py`](https://github.com/openvla/openvla/blob/c8f03f48af692657d3060c19588038c7220e9af9/experiments/robot/libero/libero_utils.py#L52)在 `agentview_image` 上执行 `[::-1, ::-1]`，代码注明与训练预处理匹配。
2. [openpi 固定版 `215abfb` 的客户端](https://github.com/Physical-Intelligence/openpi/blob/215abfb217dbac7d5f1273282331b9b1866c0479/examples/libero/main.py#L114)对 `agentview_image` 和腕部相机都执行同样的两轴翻转；两套代码针对各自流程，不证明所有检查点的训练方向相同。
3. 两轴翻转等同画面旋转 180°，它与只上下翻转不同。本次用 2×3 数组独立核算了这一几何关系，但没有检查本站示范或任何模型输入帧。

[LeRobot PR #3882](https://github.com/huggingface/lerobot/pull/3882)曾提议把其 processor 从 H+W 翻转改为 W 翻转。评论者指出此改动会影响与旧版训练/评测的可比性，作者认可需要说明行为变化；页面显示 PR 已关闭而非合并。本次只核对这个 PR，不能断言相关问题此后在其他提交、版本或数据集中均未调整。坐标原点、数据转换和模型训练期的变换是不同层次，不能把“画面看起来正了”自动当成输入与检查点匹配。

## 相同任务与 seed 也可能没有相同场景

[OpenVLA issue #342](https://github.com/openvla/openvla/issues/342)的作者报告，对一个 LIBERO-10 检查点和两个任务，将每回合新建环境与复用环境比较时，35 个回合中 10 个判定改变；其中 task 2 分别是 12/20 和 10/20，单回合判定变化 8/20，既有由成功变失败也有反向。作者将现象归因于 `reset` 重新采样固定物体位置，而保存的 `qpos/qvel` 无法恢复该几何位置；这个报告只覆盖作者的特定设置，并非全部 LIBERO 模型。

固定版 [OpenVLA `libero_utils.py`](https://github.com/openvla/openvla/blob/c8f03f48af692657d3060c19588038c7220e9af9/experiments/robot/libero/libero_utils.py#L24)在环境创建时写有 `env.seed(0)`；[评测入口](https://github.com/openvla/openvla/blob/c8f03f48af692657d3060c19588038c7220e9af9/experiments/robot/libero/run_libero_eval.py#L148)在任务循环内创建环境，再于回合循环 `reset`、`set_init_state`。这些代码支持报告所描述的调用结构，**单靠静态代码不能独立证明固定物体确实发生漂移或复现报表数字**。

后续 [PR #349](https://github.com/openvla/openvla/pull/349)提议每回合重设环境 seed 为 0，页面显示仍未合并；其仿真核验事项未勾选。评论者指出 issue 原文建议的 `env.seed(cfg.seed)` 在默认配置下会使用 7，而环境创建用 0，可能不能复制每回合新建环境的条件；评论者还建议验证实际固定物体位置，而不是只检查函数调用顺序。这是社区讨论而非已验证补丁，不应照搬为通用修复命令。

## 现有替代方案及产品启发

[Bifrost 的 LIBERO 复现指南](https://www.bifrost.ai/blog/how-to-run-libero-evaluation/)与[画面方向专题](https://www.bifrost.ai/blog/your-robot-may-be-learning-the-world-flipped/)已公开解释图像、任务次数、分辨率和其他可复现因素，并推广自有 Manifold；不能把这些说明说成本站先有。其“标准数据方向”的概括不应覆盖使用不同数据处理的检查点，Visible Touch 的小规模对照就是需逐模型核对的例子。

可以把目标读者的任务具体化：给出一个公开检查点与任务，分别用官方代码、已有文章和本站说明寻找模型输入方向、评测过程使用的初态，以及日志是否足够证实配对；记录正确率与耗时。这仅是待实施的对照，并非已经存在的访谈、市场规模或付费证据。用户遇到的问题可能要求可运行的训练/评测诊断，而不只是百科页面；是否值得开发要进一步验证。
