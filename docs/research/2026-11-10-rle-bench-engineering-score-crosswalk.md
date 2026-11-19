# RLE-Bench：机器人工程智能体、任务得分和用户问题

调查日期：2026-11-10。读取本站现有条目、作者论文、官方网站及公开讨论；未运行编码智能体、仿真或真机，也未访谈用户。

## 本站内容和现有替代

本站 [RLE-Bench 条目](../../content/benchmarks/rle-bench.json)已有 9 类任务、51 个任务、Task 01 接口及官方演示链接。它关注编码智能体在资源限制下观察仿真反馈、修改代码并提交控制器、训练方案、估计器或设计；不能将分数直接等同于一个真实机器人模型的工作成功率。[作者论文 v2](https://arxiv.org/html/2609.34210v2)和[官网](https://rle-bench.github.io/)已有分任务结果、方法、模型/智能体和成本视图，不能宣称这些信息是本站独有。

同一个 RoboCasa 家族可以同时是本站 [RoboCasa](../../content/benchmarks/robocasa.json) 中的机器人操作任务，又是 RLE-Bench 的 Task 01/02 所用环境。但两者的被评对象、交付物、开发预算与计分不同，不能因为场景同名就将各自的成绩作为同一次测试。

## 同一条记录：90 分和 80% 不矛盾

读取[官方站点固定提交的榜单数据](https://github.com/RLE-Bench/rle-bench.github.io/blob/54325b5f9564db990661e13a159aeeb5899c700e/assets/data/leaderboard.json)：GPT-6 Astra 使用 Codex 的 Task 02 `01-washing-dishes` 行记录 `reward=0.9`、`success_rate=0.8`、`successes=4`、`planned_trials=5`、`trials_recorded=5`。即该记录报告五次评测中的四次完整成功，同时该组的平均阶段奖励为 0.9；不能把 90 分改写成 90% 的完整任务成功率。数据是评测方公开报告，本次未逐回合复核、重跑或独立确认失败试次的具体阶段。

[论文任务卡](https://arxiv.org/html/2609.34210v2)说明，Task 02 的智能体先制作工具和手册，交给新的评估智能体处理保留的厨房任务；完整成功计 1，未完整成功可以依据从初始状态到过程中最高同时满足的条件数取得部分奖励。五次平均形成组成绩，缺失试次记 0；二元成功率另行报告。任务开发与评测均在限定的仿真协议下，不是持续作业或真机产线的可靠性。

相同快照中该配置的三个难度分组奖励为 0.98、0.94、0.666667，均值约 **0.862222**；分组对应的完整成功率分别为 0.96、0.92、0.52。九个任务族又按照工作流内平均、再跨四类工作流平均形成 RLE Index；其中混合了不同任务定义和指标，指数不能读成所有机器人任务的总体成功率。[官网](https://rle-bench.github.io/)已经说明聚合与成本范围，[榜单数据](https://github.com/RLE-Bench/rle-bench.github.io/blob/54325b5f9564db990661e13a159aeeb5899c700e/assets/data/leaderboard.json)同时提供 `reward` 和 `success_rate`，所以这是一项可核查的口径说明，而非本站独有数据。

快照生成于 2026-11-02，1,312,975 字节，SHA-256 `d5606531cf04a26ba0d0e4d6989bceaca68fa2dc1e8ab4a3e9c2c316168fbb15`。页面明确 API 费用不包含仿真、GPU 和其他基础设施；数据注明部分模型费用按 token 和价格表重算，缺少费用时为 null。不能把榜单 API 成本当完整训练成本或把 null 计为免费。

## 公开说明之间需要区分的地方

- Task 02 的[研究博客](https://rle-bench.github.io/blog/)概括为五次试验的成功率，论文任务卡与数据的 `score_note` 明确阶段奖励和二元成功率分开；阅读该具体榜单分数时应以对应成绩定义为准。
- 同一博客将 Task 05 概述为六个赛道；[论文 v2 任务卡](https://arxiv.org/html/2609.34210v2)和上述榜单快照则列四个评测实例：LIBERO、RoboTwin 各有 open 和 robust。论文卡写 LIBERO 每项 500 次、RoboTwin open 300 次和 robust 225 次；榜单数据中四项具体运行与这组分母相符。摘要表同时将 Family 05 指标概括为 validation loss，而任务卡及快照说明最终奖励为固定回合上的成功率。这些是不同公开文字的差异；未核查所有历史修订，不能断言产生原因或替作者判断何时改版。
- 本站当前 `metric.description` 概述工作流聚合，未区分 Task 02 的阶段分与完整成功率。可将本研究作为未来内容核查线索；本次没有修改正式条目或宣称每个条目都有此问题。

## 真实使用问题及现成工具

- [机器人社区项目作者](https://www.reddit.com/r/robotics/comments/1romucz/autonomous_overnight_experiment_loop_for_robot/)展示使用编码智能体改训练代码、运行 MuJoCo、读取渲染画面并决定保留或丢弃修改；另一位评论者说机器人编程中的难点之一是模型无法看懂仿真。作者承认当时展示的是简单的 FetchReach，[仓库](https://github.com/jellyheadandrew/autoresearch-robotics)对 FetchPush、FetchPickPlace 和 VLA 的结果仍标待完成。这是个人自述和现有实验工具，不是 RLE-Bench 的同题成绩或真机成果。
- [另一位 Isaac Lab 使用者](https://www.reddit.com/r/IsaacSim/comments/1reduju/isaaclab_performance_drop_when_using_camera/)询问多相机训练的速度和显存；回复涉及相机数量、分辨率、渲染方式、环境数量和场景。各人报告的硬件及 FPS 口径不完全相同，未复测，不能直接合成可比性能榜；问题也不证明发帖者需要评测目录。
- [RLE-Bench 任务提议](https://github.com/RLE-Bench/RLE-Bench/issues/1)希望评估机械臂执行器故障识别和恢复，相关[实现 PR](https://github.com/RLE-Bench/RLE-Bench/pull/2)已关闭，维护者称 1.0 冻结并引导新任务从贡献入口提交；提议者报告的基线属于其自身验证，不是已纳入 1.0 的官方模型成绩或独立付费需求。它提供一个细分研究方向，而不是当前榜单已覆盖的第 10 类任务。

具体可验证的问题是：读者能否分清某条记录是“阶段奖励”“完整成功率”“模型 API 成本”还是“实际机器人运行成本”；以及 RLE-Bench 的训练/评测预算与其引用的 RoboCasa、LIBERO 原榜是否一致。现有官方资料已经给出不少答案；尚无本站对照测试、回访或付费证据。
