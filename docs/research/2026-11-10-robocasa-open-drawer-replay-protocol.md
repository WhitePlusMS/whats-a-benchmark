# RoboCasa365：开抽屉成绩、单次录像与演示重放

核查日期：2026-11-10。本记录对照本站工作树、固定版本数据卡、官方榜单及提交、模型作者公开代码和 issue；没有运行模型、仿真或实体机器人。

## 本站的一个样例是什么

本站 [RoboCasa365](../../content/benchmarks/robocasa365.json) 引用 infope 的 `OpenDrawer` 第 111 条轨迹。重新读取固定修订 [`a8cfa17874a359ad6b1cff421aba918b1df1304c` 的 episode 元数据](https://huggingface.co/datasets/infope/robocasa/blob/a8cfa17874a359ad6b1cff421aba918b1df1304c/pretrain_atomic/OpenDrawer/lerobot/meta/episodes.jsonl)：该条 `source=rollout`、`policy=gr00tMTPretrainHuman`、`length=750`、`split=valid`、`is_success=false`，指令是打开左边抽屉。

同版本 [info.json](https://huggingface.co/datasets/infope/robocasa/blob/a8cfa17874a359ad6b1cff421aba918b1df1304c/pretrain_atomic/OpenDrawer/lerobot/meta/info.json) 的顶层 `train=0:282` 是 LeRobot 文件切分；逐条 `valid` 是该数据集自己的 episode 分组，层级与含义不同。[数据卡](https://huggingface.co/datasets/infope/robocasa/blob/a8cfa17874a359ad6b1cff421aba918b1df1304c/README.md)称策略运行持续完整任务 horizon，成功标记来自运行过程而非仅看结束画面。因此这是一条第三方所记失败 rollout，不代表训练演示、官方榜单的某一次试验、整个模型的成功率或真实机器人结果。

## 同一个新模型，两次不同记录

[RoboCasa365 官方榜单](https://robocasa.ai/leaderboard.html)展示 Xiaomi-Robotics-1 总分 57.4。其 [官方提交详情](https://github.com/robocasa-benchmark/leaderboard/blob/main/submissions_md/Xiaomi-Robotics_2026_07_08.md)记评估方为 RoboCasa 团队、环境 v1.0.1，三组分别为 80.2%、57.1% 和 32.1%。提交页将开发代码标识为 `4da1db0a4deefa6de7ebb4ef0b8754017290f5f7`，同时提供检查点入口。

[官方复评 PR #10 的逐任务评论](https://github.com/robocasa-benchmark/leaderboard/pull/10)报告三组分别为 433/540、274/480 和 154/480；合计 **861/1500 = 57.4%**。其中 OpenDrawer 为 96.67%，结合每任务 30 次可表示为 29/30。记录是官方评测团队对一个模型的仿真结果，不是本站 infope 数据中 GR00T 的失败 episode。

[模型作者固定提交的评测说明](https://github.com/XiaomiRobotics/Xiaomi-Robotics-1/blob/4da1db0a4deefa6de7ebb4ef0b8754017290f5f7/eval_robocasa365/README.md)同时公开另一项参考配置：`pretrain` 场景、`target50` 任务、每任务 50 次、seed 7、历史观测 4、间隔 2、每次查询 16 个动作、裁剪比 0.95；记录 **1432/2500 = 57.28%**。这不是把同一 1432/2500 按一位小数四舍五入成 57.4：57.28 按常规四舍五入为 57.3。

两项记录在名称与任务集层面有关联，但分别由不同来源给出，试验次数也不同；现有材料不足以证明它们是同一次运行、相同种子、完全相同权重或其他设置，更不能把 0.12 个百分点差异归因于某个配置或当成显著性能提升。官方也已有模型、版本、分组及代码/权重入口；作者已提供评测脚本和完整参考配置，本站需要通过读者对照才能证明增加的整理有帮助。

官方定义的 50 任务为 Atomic-Seen 18、Composite-Seen 16、Composite-Unseen 16；评测场景仍是预训练厨房，`Unseen` 是指组合任务未进入预训练而非厨房全部未见。官方榜单和仓库会更新，记录数值为核查时快照。

## 重放失败有不同含义

[RoboCasa issue #209](https://github.com/robocasa/robocasa/issues/209)中，使用者报告官方演示存在状态恢复后重算成功条件与开环动作重放不成功两类问题；项目贡献者回应，开环动作重放容易受影响，本就不保证每次成功，同时表示会看状态重放部分。

后续同一 issue 中，另一参与者报告对固定环境的 18 个 atomic 任务各选前 50 条、共 900 条演示，只做状态恢复和重算成功条件：原判定 843/900，几何同步后的检查 900/900；其中 CloseBlenderLid 为 4/50 与 50/50，NavigateKitchen 为 39/50 与 50/50。原记录称全体 900 条带成功 reward 标签，且明确指出它们不一定与最初提问者的随机样本一致。这里是**贡献者报告的对照，不是本站独立复现**；也不是智能体策略、开环动作执行或真机的 900 次成功率。

[上游 PR #225](https://github.com/robocasa/robocasa/pull/225)提出恢复场景后同步目标位姿并增加回归测试；核查时状态为 Open，未合并。PR 作者描述的原因与修复仍待上游评审；其说明明确将开环动作重放问题排除在此补丁之外。不能以 PR 中的实验断定所有任务、所有版本或本站 OpenDrawer episode 存在问题，也不能盲目将这些演示重判数值从策略排行榜中扣除。

## 可验证的用户需求与边界

这是实际使用者对“示范为何回放失败、是否需要剔除数据”的提问，并已有贡献者解释、具体复现、未合并补丁和讨论。它支持继续研究如何把**轨迹来源、状态恢复、策略运行、任务判定与最终成绩**讲清楚，但不能证明用户需要另一个榜单、愿意付费，或本站比上游讨论更易用。
