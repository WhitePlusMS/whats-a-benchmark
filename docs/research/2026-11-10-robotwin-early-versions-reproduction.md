# RoboTwin 早期版、2.0 与成绩复现需求

核查日期：2026-11-10。对照本站早期版条目、官方论文、指定代码版本、已有榜单和公开提问；未运行仿真、训练模型、重判本站样例或访谈使用者。代码分支会变，以下明确固定哈希仅说明当次核查的文件，不证明论文实验或本站视频必然由该哈希生成。

## 本站样例和纸面成绩回答不同问题

本站 [RoboTwin Early Version](../../content/benchmarks/robotwin-early.json)的 `diverse_bottles_pick / episode0` 展示三帧点云散点图和数值，是作者早期数据包中的一段仿真示范，不是策略排行榜上的一次评测。该记录明确说点云图不是相机照片，也不将单段示范当总体成功率；本轮没有重新解析原始归档。[早期版 README](https://github.com/RoboTwin-Platform/RoboTwin/blob/early_version/README.md)称每任务发布 50 个 demos，普通包只含 1,024 点点云，带 `_w_rgbd` 的包还含 RGB-D。其 `endpose` 字段说明本身提示存在未详述的问题；这不足以证明本站具体三帧数据错误或确定误差大小。

[早期论文](https://arxiv.org/html/2409.02920v3)表 1 的 `Dual-Bottles Pick` 是另一个名称，报告 DP3 用 10、20、50 条示范训练后分别为 10%、42%、74%。不能仅凭都涉及瓶子就把它当本站 `diverse_bottles_pick` 的该 episode 运行结果；论文同时描述真实遥操作数据与仿真示范，不得把表中数字直接标成本站真机实测。本次未确认各格全部试验分母。

## 同题名称相近，判定代码也发生变化

2026-11-10 通过 `git ls-remote` 解析官方分支，并只读完整比较两个任务文件：

| 文件与核验点 | 直接读到的内容 |
| --- | --- |
| [早期 `diverse_bottles_pick.py`，f14a315](https://github.com/RoboTwin-Platform/RoboTwin/blob/f14a315ac4c9c72bfea05b523874f787080dfcf2/envs/diverse_bottles_pick.py) | `is_test` 决定奇数或偶数瓶子 ID 集；生成物体时 `rotate_rand=False`。成功函数读取各瓶 actor pose，相对固定目标分别检查 x/y 误差小于 `0.025` 且 z 高于 `0.89`。 |
| [主分支 `pick_diverse_bottles.py`，ea8b211](https://github.com/RoboTwin-Platform/RoboTwin/blob/ea8b21121ebb3cd201ff5b3fe361944ac94eda3f/envs/pick_diverse_bottles.py) | 瓶子 ID 从 0–19 中选，传入 `rotate_rand=True`；成功函数读取各瓶 functional point 0，相对配置的左右目标检查 x/y 误差小于 `0.1` 且 z 高于 `0.89`。 |

两段代码的目标点定义、读取位置、物体模型、运行路径和可能的配置均不同；`0.025` 和 `0.1` 不能简单解释为后者真实容差“四倍宽松”，也不能由局部代码断言早期结果和现有榜单具体差了多少。早期文件的 `play_once` 为空，也不能仅据此推断数据包没有可用演示。未运行函数、验证所有调用条件或追溯早期数据生成 commit。

## 相同 2.0 任务也要区分训练与计算对象

[2.0 论文表 9](https://arxiv.org/html/2506.18088v2)报告 `Pick Diverse Bottles` 的 **62%**，但该表属于 `R2.0 + MM FB` 自动专家代码生成实验；[同一论文附录表 10](https://arxiv.org/html/2506.18088v2)中同名任务的 DP3 是 Easy **52%**、Hard **1%**，属于另一组策略评测。两处 62、52、1 都是作者各自设置的仿真报告，不应无条件混成同一模型、同一指标的排行榜，也没有证据表明与本站早期示范为同一 episode。

2.0 论文确实对 1.0 与 2.0 的专家代码生成流程做过[受控对照](https://arxiv.org/html/2506.18088v2)，并在不同机器人本体上分析数据生成；因此不能笼统说跨版本完全不能比较。具体对照须保留研究对象、任务、硬件、协议与作者给出的限制，不能将任意跨版模型成绩合并。

[RoboTwin 2.0 官网榜单](https://robotwin-platform.github.io/leaderboard)规定 50 个任务各用 50 条 clean 示范，分别在 clean 与 randomized 下每任务评测 100 次；榜单同页区分 co-train 与 single-task SFT、支持深度输入筛选，默认是两种条件的平均。它已有训练赛道、场景、机器人和 per-task 入口，不能说这些解释完全没有替代。榜单动态成绩行本次未从静态网页直接读取，也未核验每个结果。

## 真实提问与其他已有资料

[Motus issue #45](https://github.com/thu-ml/Motus/issues/45)有使用者询问公开 `pi0.5_robotwin2` 权重的官方推理方法、图像与动作映射、归一化、随机种子、指令划分，以及模型卡两个数字是否属于该检查点；其自述已自行拼接适配器，但不愿把未经确认的结果称为官方基线。本次可读讨论未见维护者回答；不能因此断言所需参数在所有其他文档中均不存在，也未验证提问者自己运行的适配器或其身份。它是一个具体的复现信息需求，不是本站访谈或购买证据。

[RoboTwin OpenPI 文档](https://robotwin-platform.github.io/doc/usage/Pi0.html)已经解释 clean 训练与 clean/randomized 测试命令；[RLinf 文档](https://rlinf.readthedocs.io/en/latest/rst_source/evaluations/guides/robotwin.html)还列模型输入、动作、相机和随机化设置，以及未支持任务。它们提供一般运行参考，但本次没有证明能完整回答该 Motus 专用检查点的提问。

[Physical AI Lab 的 RoboTwin 指南](https://physicalailab.io/en/robotwin-leaderboard-cotrain-single-clean2random/)已解释同一榜单的训练赛道和两个条件；该站有中文入口，本次未确认该文章是否有对应中文译文。这是把榜单和业务问题联系起来的已有替代；本站能否比官方与现有解释更快地帮助使用者确认具体条件，需要真实任务对照。

另一个[作者的模型卡](https://huggingface.co/griffinlabs/griffin-alpha-s-robotwin)把 clean 训练与 randomized 测试的结果描述为不能与其所称的已发布 RoboTwin 榜单结果直接比较；而当前官方榜单明确使用 clean 训练并提供 clean2random 评测。两者对“榜单数字”的泛指范围或时间可能不同，**本次未核实作者具体指向哪份榜单，因此不判定哪一方错误**。即使训练条件名称相同，检查点、指令、重规划和运行版本等仍需核对。

## 并行次数不一定等于不同初始条件

[RLinf issue #1175](https://github.com/RLinf/RLinf/issues/1175)的报告者追踪 `beat_block_hammer` 在四个环境 worker 上的种子：配置为 128 次，实际只有 105 个不同 seed，多出 23 次重复。问题来自当时各 worker 分别打乱同一列表后各取开头，可能重叠。报告者关心既往论文或榜单结果是否受影响并提出重新评测；这只是其疑问，**没有据此确认任何具体公开分数出错，也无法确定偏差方向或大小**。维护方表示已复现，[PR #1207](https://github.com/RLinf/RLinf/pull/1207)于 2026-05-31 合并，对种子分区抽取辅助函数并增加多 worker 测试；此前 #1196 关闭，不能误写成该 PR 已合并。本次未独立运行测试或确认其他版本的发布状态。

[MiniCPM-RobotManip 的 RoboTwin 评测说明](https://github.com/OpenBMB/MiniCPM-Robot/blob/main/MiniCPM-RobotManip/evaluation/robotwin/README.md)则记录另一种差异：其默认配置在每项任务的步数上限额外加 1000，且动作重复、分片／种子协议和仿真器随机种子尚未与其参考评测对齐；作者明确说成功率不能直接与其内部数字比较。这个动态分支文件是作者的配置说明，不是本次独立复现，也不能证明所有 MiniCPM 分数都按此配置得出。

这两例支持把**运行代码版本、次数及不同初始条件数、seed 分配、任务步数上限**作为检查具体成绩的候选字段，未知则标未知；只显示一个百分数会丢失这些条件。公开 issue 和作者文档已经提供这些线索，本站是否能更快帮助读者找到它们仍需实际对照。

## 对产品研究的意义

这个案例支持继续验证“同名任务的版本、训练数据、策略输入和实际评测条件能否快速查清”；它不能证明读者会使用本站，更不能证明愿意付费。公开论文、榜单、代码和运行文档已有不少答案。可针对同一项提问，比较读者在官方资料与一张本站候选卡里找到版本、是否为模型成绩、两个 2.0 数字的对象，以及尚缺字段所需的时间和误判率；目前尚未开展该实验。
