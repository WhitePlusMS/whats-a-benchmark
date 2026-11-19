# COLOSSEUM 的 BridgeVLA 64%：仿真成绩来源与分母

核查时间：2026-11-10。对照站内已发布 [THE COLOSSEUM](../../content/benchmarks/colosseum.json)、第三方页面、论文、作者固定版源码和公开 issue；未运行评测或复现单次轨迹。

## 同一数字的环境歧义

[Robotics Center 的 COLOSSEUM 页面](https://www.roboticscenter.ai/benchmarks/colosseum)称 COLOSSEUM 是真实机器人 benchmark，并列 BridgeVLA 为 64%，但没有给出这一数字的原始实验链接、机器人、任务分母或运行方法。[COLOSSEUM 原作者](https://robot-colosseum.github.io/)把它描述为基于 RLBench 的仿真操作评测，另有小范围对应真机实验；不能因存在真实实验就把所有 COLOSSEUM 分数当成真机结果。

[BridgeVLA 原论文](https://arxiv.org/html/2506.07961)第 4.1.2 节的**仿真结果表**给出 BridgeVLA 的 COLOSSEUM 平均成功率 64.0%，第 4.2 节另述真机实验。[模型作者项目页](https://bridgevla.github.io/home_page.html)说明，COLOSSEUM 使用无扰动的 20 项 RLBench 任务训练数据，每任务 100 条演示；按扰动设置评估，每任务每种扰动 25 次，按各适用任务求均值。论文还说明 BridgeVLA 与 RVT-2 的 COLOSSEUM 实验重复三次，逐任务表报告均值和波动。并非每种扰动对每项任务都适用，不能将 20 × 25 × 14 × 3 当作已验证总样本量。

第三方网页的 64% 与论文 64.0% 同名同数值，但该页未注明来源；它**可能**引用了上述论文，我们未能证实。可以确定的是，论文里的 64.0% 不能直接说成真机成功率；也不能仅凭同数值证明第三方一定引用错了某个具体实验。

## 原文的 64.0 如何构成

论文表 2 中 BridgeVLA 行显示 14 种设置：12 类单项扰动、原 RLBench 基本变化，以及 12 类同时作用的 All Perturbations。按表面数值计算：

| 论文中的对应项 | 成绩 | 使用时的解释 |
| --- | ---: | --- |
| Overall Avg. SR | 64.0% | 表中各设置的汇总列，不是任一条实机操作轨迹。 |
| All Perturbations | 18.7% ± 2.2 | 所有扰动组合的列；不能将总体 64% 当成该组合场景成功率。 |
| Table Color | 75.7% ± 0.9 | 单项桌面颜色变化的列。 |
| Distractor | 51.8% ± 1.5 | 单项干扰物变化的列。 |

对表内 14 个已四舍五入列值 `18.7、60.5、63.8、63.5、68.4、69.3、61.7、69.7、75.7、71.3、51.8、74.8、73.1、73.8` 求算术平均为 `64.007142857...`，四舍五入到一位小数为 64.0%。这说明均值**与表面数值的等权平均一致**，不证明论文底层未舍入数据、全部任务的加权规则或逐次轨迹已经独立复算。不同列适用任务数量可能不同，不等价于对全部单次试验整体加权。分项以及波动见[原论文表 2 和表 6](https://arxiv.org/html/2506.07961)。

## 另一项真实机器人结果：论文与项目页的数字不一致

[论文 arXiv v2 的摘要和第 4.2 节](https://arxiv.org/html/2506.07961v2)将每任务 3 条训练演示的真机 Basic 成绩写为 95.4%，但同一版本引言写 96.8%；[模型作者项目页](https://bridgevla.github.io/home_page.html)也写 96.8%。这是文档中同一描述的**数值不一致**，不能仅凭网页断定产生原因或自行替作者更正。

该论文附录表 12 提供 13 个真机任务、每任务 10 次的分项。将 3 条演示列逐项相加得到 `124/130 = 95.3846%`，四舍五入为 95.4%；10 条演示列为 `126/130 = 96.9231%`，四舍五入为 96.9%，与正文表 4 所写的 10 条演示结果一致。该复算仅依据论文打印数字，不是复核实际机器人日志，也不证明引言 96.8% 从何而来。它与本记录的 **COLOSSEUM 仿真 64.0% 不是同一个试验**，不能把 95.4% 作为仿真到真机的逐任务迁移率。具体机械臂、相机和基础设置见[原论文 v2 第 4.2 节与表 12](https://arxiv.org/html/2506.07961v2)。

## 异常回合的说明与代码边界

作者原版 `bridgevla` 分支在本次核查时指向 `d5199839650f834eac9b3a92ec27f7866f59e57d`。[该固定 README](https://github.com/BridgeVLA/BridgeVLA/blob/d5199839650f834eac9b3a92ec27f7866f59e57d/README.md)称，两个 variation 中三个任务的某些评估 episode 会遇到数据错误，并描述反复评估直到收集 25 个 “successful runs” 后统计。这里的 “successful” 在上下文可能指运行正常，也可能被读为机器人任务成功；文字未清晰界定，不能直接断定其排除了任务失败或引入偏差。

本轮只读该固定版本的 [eval.py](https://github.com/BridgeVLA/BridgeVLA/blob/d5199839650f834eac9b3a92ec27f7866f59e57d/finetune/Colosseum/eval.py)、[eval.sh](https://github.com/BridgeVLA/BridgeVLA/blob/d5199839650f834eac9b3a92ec27f7866f59e57d/finetune/Colosseum/eval.sh) 和 [cal_statics.py](https://github.com/BridgeVLA/BridgeVLA/blob/d5199839650f834eac9b3a92ec27f7866f59e57d/finetune/Colosseum/cal_statics.py)：默认每任务运行 25 个 episode；生成器异常时 `shutdown` 后重新抛出异常，已正常完成的 episode 按 transition 积累并记录 reward；统计脚本平均各非空任务结果。上述路径没有显示自动补跑异常 episode 的机制，也没有显示只接受任务成功 episode 的筛选。**它们不能证明论文当时实际用了哪个版本、如何手动补跑、每次失败与异常是否被保留，也不能单凭代码判定 64% 正确或错误。** 当前 main 分支已演进为 BridgeVLA++，不应把不同分支视为同一固定实现。

## 真实使用者问题与已有入口

- [作者仓库 issue #12](https://github.com/BridgeVLA/BridgeVLA/issues/12)中，用户希望取得可用于其他训练管线的标准格式 COLOSSEUM 数据；项目协作者提供了[原始官方数据集](https://huggingface.co/datasets/colosseum/colosseum-challenge/tree/main)入口。这是具体的数据格式/来源需求，同时说明官方答复已经解决了入口问题；未验证数据是否满足提问者所有管线。
- [issue #11](https://github.com/BridgeVLA/BridgeVLA/issues/11)中，另一位自述初学者报告 RLBench 复现时图像尺寸不匹配及缩放后训练 NaN，并询问训练数据转换；这是用户自己的排障报告，本轮没有重现、定位原因或确认修复。
- [issue #15](https://github.com/BridgeVLA/BridgeVLA/issues/15)提出使用 EVA-CLIENT 包装模型以进行真实机器人评估；发帖方自称该项目团队，这是**主动推广/合作提议**，不是独立客户验证，尚未见完成集成的证据。
- BridgeVLA [当前主分支说明](https://github.com/BridgeVLA/BridgeVLA/blob/e17307ca78752919ab6bb593ef537e7716e22eaf/scripts/README.md)已经公开数据来源、RLBench 与 COLOSSEUM 使用的仿真栈、环境记录以及所述下载规模。因此“告诉读者数据从哪来、怎样开始复现”已有作者材料，本站若做此方向仍需对照真实读者任务。

产品启示只是可检验假设：同一数字的**来源、仿真/真机、分项和统计规则**对判断用途可能很关键；这个例子不能证明本站胜过已有资料，更不能证明商业需求规模或付费意愿。
