# 机器人记忆评测：与现有长任务的边界

调查时间：2026-11-09。只核对本地工作区、公开项目页、论文和 issue；没有复现实验或验收数据集。任务名称、成功率和演示数量不代表真实机器人可部署性，也不证明本站存在被验证的市场需求。

补充：[RoboCasa-Mem 与 VLA 排错问题](2026-11-10-robocasa-memory-and-vla-debugging.md)区分历史条件判定、训练示范、仿真和有限真机成绩，并记录作者中文文档及独立使用者的相邻问题。

## 项目已有条目

[CALVIN](../../content/benchmarks/calvin.json) 的核心是语言条件下的仿真连续操作与跨环境划分，站内有五步评测配置与第三方训练轨迹；[LADDER](../../content/benchmarks/ladder.json) 和 [RoboDojo](../../content/benchmarks/robodojo.json) 也涵盖长步骤任务，后者还有 Memory 维度。长步骤可能需要历史信息，但步骤多本身不证明任务隔离地测量了特定记忆能力；须看信息何时可见、何时需要、策略能否依赖当前画面或任务编号。

[MemoryArena](../../content/benchmarks/memoryarena.json) 是项目内的交互式智能体记忆相关评测，但其任务与机器人闭环控制不是同一范围。不能只因为名字有 Memory 就把分数与机器人操作成绩合并。

## 新核对的评测及已存在的阅读与运行入口

| 项目 | 任务与指标 | 与本站关联 / 限制 |
| --- | --- | --- |
| [LIBERO-Mem](https://libero-mem.github.io/) | 官方项目页列 10 项仿真操作任务，分别涉及物体运动、序列、关系和遮挡；目标是考察历史信息对操作的作用。 | 与本站 LIBERO 家族有关，但不是 [LIBERO](../../content/benchmarks/libero.json)、[LIBERO-Plus](../../content/benchmarks/libero-plus.json) 或 [LIBERO-PRO](../../content/benchmarks/libero-pro.json) 的同一个测试及结果；站内未见同名独立条目。项目页给出任务和代码入口，未运行或验证下载。 |
| [RoboMME](https://robomme.github.io/) | 仿真中 16 项任务分为计数、物体持续存在/遮挡、指代和模仿四类；[榜单](https://robomme.github.io/leaderboard.html)说明每任务 50 次、共 800 个测试回合，并区分 Standard 和 Agentic。 | 原论文另设计四个对应的真实机器人任务做有限实验，不等于 16 项榜单均在真机测试。榜单网页有分项及轨迹链接，但动态成绩本次未验收。 |
| [RoboMME-Plus](https://robomme.github.io/blog/) | 作者在原 16 项任务及接口基础上增加更困难的条件变化，用于研究原任务中训练策略的泛化。 | 原版与 Plus 的同名任务不代表相同测试条件。作者比较人和模型时亦提醒，人只能看一次视频而模型可能保留完整历史，直接排名有公平性限制；其研究结果未经本次复算。 |
| [MIKASA-Robo-VLA](https://mikasarobo.github.io/) | 文档列 90 个语言条件仿真环境、10 类记忆相关任务和短/中/长三个 split；区别于原版 MIKASA-Robo 的 32 项 RL 环境。 | [官方协议](https://mikasarobo.github.io/evaluation_protocol.html)要求每任务 50 回合、报告 split 与类别等分项；成功采用 `success_once`，即一回合中任何一步出现成功即计成功，不等同只检查结束帧。论文作者在附录注明有些任务的提示始终可见，不能将 90 项都称为必须跨遮挡保存提示的测试。 |

不同论文及榜单的任务、模型输入、训练/测试划分、记忆预算、观测历史和成功判定不同。例如 RoboMME 论文中的一组比较设定固定记忆 token 预算，而其他榜单模型可能采用不同机制；不能按任务总数或成功率直接汇总出通用“机器人记忆排行”。

[LeRobot RoboMME 文档](https://huggingface.co/docs/lerobot/main/robomme) 已给出模型运行、观测键映射及任务选择例子；默认单任务单回合只是快速示例，页面建议标准测试每任务 50 回合。它是现有使用与说明入口，具体命令和依赖未在本机运行。

## 具体使用问题

[MIKASA-Robo #11](https://github.com/CognitiveAISystems/MIKASA-Robo/issues/11) 的提问者报告演示采集与默认评估可能采用不同物理后端，担心影响模型表现；协作者在 2026-09-29 回复承认代码表述不够清楚并说将更新。该 issue 展示的是当时版本的问题与回复，本次未复现、未确认更新是否落地，也不能推出全部结果错误。它是一条开发者线索，不是对本站的需求或付费证明。

## 产品判断

对这类评测，候选阅读问题可以是：任务需要记住什么、信息何时隐藏、策略能看到几帧、分数是在任意时刻还是结束时计算、是否真机以及每格测试次数。官方项目、榜单和 LeRobot 文档已提供大量答案；本站是否能让特定读者更快找到并理解这些差异，仍需与现有来源做同题使用测试。
