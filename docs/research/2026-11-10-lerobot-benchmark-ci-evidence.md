# LeRobot 仿真评测接入与本站内容对照

核查时间：2026-11-10。以 LeRobot 当时 `main` 指向的提交 [81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee](https://github.com/huggingface/lerobot/tree/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee)为固定快照，结合公开 issue 和本站工作树。版本来自当时的只读 `git ls-remote`，不是运行结果；后续版本可能变化。本次未安装、运行评测、核对历史 CI 成功状态或访问真实机器人。

## 和本站有什么重叠

[LeRobot 评测接入说明](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/docs/source/adding_benchmarks.mdx)介绍如何接入仿真环境、预处理观测、运行策略、汇总逐回合结果，并要求文档描述环境来源、代码及资产版本、评估命令、模型输入输出和参考结果。这是针对开发者的运行与维护工作流；本站主要提供评测解释、样例及来源，并不运行这些测试。两者围绕同一个评测有资料重叠，但不必把它们描述成完全相同的产品。

该提交的 [CI 清单](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/benchmarks/benchmarks.yaml)共有八个具名入口，其中以下六项能对应本站具体条目：

| LeRobot 清单名称 | 本站内容 | 本次核对边界 |
| --- | --- | --- |
| libero | [LIBERO](../../content/benchmarks/libero.json) | 清单选 `libero_spatial`；不是整个 LIBERO 家族。 |
| metaworld | [Meta-World](../../content/benchmarks/meta-world.json) | 清单选 `metaworld-push-v3`，不可视作全部任务。 |
| robotwin | [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) | [同版本说明](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/docs/source/robotwin.mdx)称完整套件有 50 项任务；清单列出其中 10 个任务名。 |
| robocasa | [RoboCasa](../../content/benchmarks/robocasa.json) | 清单列出 9 个任务名，不等于所有厨房任务。 |
| libero_plus | [LIBERO-Plus](../../content/benchmarks/libero-plus.json) | 清单选 `libero_spatial`。 |
| vlabench | [VLABench](../../content/benchmarks/vlabench.json) | 清单列出 9 个任务名，不等于其全部任务或轨道。 |

余下清单入口是 RoboCerebra 和 RoboMME：本次对本地 JSON 顶层 ID、名称和别名按名字搜索，没有找到独立同名条目；[既有机器人记忆对照](2026-11-09-robot-memory-benchmark-crosswalk.md)另有相关研究。不以有限名称检索断言本站所有内容都没有涉及它们，也不把八个配置入口当作八项已成功评测。

## CI 跑通不是完整成绩

[矩阵生成代码](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/scripts/ci/benchmark_matrix.py)默认 `episodes=1`、`batch_size=1` 和 `max_episode_steps=30`，注释明确说 CI 检查端到端流程能否运行，不检查成功率。上述八项清单均未覆盖这几个默认字段；[执行脚本](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/scripts/ci/run_sim_benchmark.py)将配置传给评测命令。配置存在不证明任何特定 CI 运行已成功。

以 RoboTwin 为例，固定版本文档介绍完整套件为 50 项任务，并列出每任务 100 个 episode 的官方协议；CI 清单只选 10 项、默认每项 1 个 episode 且最长 30 步。**不能用该短流程计算完整套件成功率，或据此声称模型达到论文榜单表现。**这两种用途也不能因为都叫 evaluation 就视作相同实验。

还有一个待确认的文档差异：同提交的 [RoboCasa 页面](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/docs/source/robocasa.mdx)描述 10 个原子任务的 CI 冒烟测试，而当前固定版清单明确列出 9 个任务名。可能存在文档更新不同步或其他解释；本次未执行代码、查看历史记录，不推断哪一次运行用了哪个任务集合。

## 统计说明已有替代，但仍需理解其假设

[固定版 LIBERO 文档](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/docs/source/libero.mdx)称评测会随成功率返回次数、成功数和 95% Wilson 区间，举例 10 次中成功 9 次时约为 60%–98%；它还提醒该区间不包含不同训练种子带来的波动。固定版 [评测代码](https://github.com/huggingface/lerobot/blob/81b8c5bfdd5591ec59e512cfc7ac6db8151c70ee/src/lerobot/scripts/lerobot_eval.py)确实在结果中写入 `n_episodes`、`n_success` 和 `pc_success_ci95`，但本次没有运行或检验其在具体实验中的统计适用性。多个任务、重复种子和配对评测存在设计差异，不能仅凭区间相互重叠或不重叠断定两个策略显著不同。

一位开发者在 [LeRobot issue #3578](https://github.com/huggingface/lerobot/issues/3578)要求统一运行多个策略并比较成功率、推理时间和显存；这是一个具体的公开功能请求，不代表本站用户。评论中另一位开发者介绍自有 [lerobot-bench](https://github.com/jashshah999/lerobot-bench)工具，用于比较、分析和性能测量；这是作者自述，本次未安装验证。同一讨论里 KnownRobot 维护者提出固定版本、配置和原始结果摘要等可机器读取的证据包；其有自有产品关联，不算独立付费需求。KnownRobot 自述区分元数据核查与实际复现，见[既有台账](2026-11-09-embodied-demand-ledger.md)。

## 一条真实的训练复现问题：ALOHA 移交方块

[LeRobot 模型卡](https://huggingface.co/lerobot/act_aloha_sim_transfer_cube_human)介绍 ACT 在 AlohaTransferCube 仿真任务中的一次结果：发布检查点经过 500 个 episode 测试，报告成功率 83%；模型卡描述的成功条件是一个机械臂抓起方块后移交给另一个。模型卡还报告另一个由原 ACT 仓库训练、在 LeRobot 中评估的模型为 68%，并明确提出代码差异或成功判定细节等可能解释，未将它们定为已确认原因。

在 [LeRobot issue #2605](https://github.com/huggingface/lerobot/issues/2605) 中，另一位开发者称使用 LeRobot 0.4.3 和同名数据集重新训练后，用其**自己训练的检查点**评估 500 个 episode，得到约 50%–60%；帖子列出了训练与评测命令。他推测数据可能有关，但原因没有确认。参与者提出解码器层数和训练数据质量的猜想；提问者随后指出其引用的官方训练配置中解码器层数为 1，因此不能把建议当成已经验证的修复。另一位参与者报告类似问题，但场景和数值不同，不能当作相同实验的重复测量。

这个例子支持“有人需要查清版本、训练配置、评测条件与成绩来源”这一具体问题；**不能说同一检查点从 83% 降到了 50%–60%，也不能由帖子确认数据缺陷或当前版本存在同一问题**。本站针对 `AlohaTransferCube` 和相应数据集的有限名称检索未找到独立同名条目，不代表本站没有其他 ALOHA 内容。没有运行训练或评估，也没有联系提问者。

进一步只读解析该模型仓库两个版本的 `eval_info.json`，可以复算版本变化：

| 文件快照 | 逐回合成功 / 总数 | 聚合成功率 | 文件 SHA-256 |
| --- | --- | --- | --- |
| [前一版本 bf09d3a](https://huggingface.co/lerobot/act_aloha_sim_transfer_cube_human/blob/bf09d3a/eval_info.json) | 438 / 500 | 87.6% | `093be51a6e227d96916d59021a5a5d180ec3ba582839993b32fcdf9098e6252f` |
| [提交 5618676](https://huggingface.co/lerobot/act_aloha_sim_transfer_cube_human/blob/561867653d2f5e94686fa01e3c0b4e3fad34baec/eval_info.json) | 415 / 500 | 83.0% | `566d1661791f6e939efef28826a5cd7f674795d9c94575496d9ce252a11705ba` |

两份结果分别按文件中的 `success` 字段逐行求和，均与各自聚合字段一致。后者记录了 500 个不同种子，范围 1000–1499；这不证明两份实验的初始化条件、训练种子及其余参数完全相同。[提交差异](https://huggingface.co/lerobot/act_aloha_sim_transfer_cube_human/commit/561867653d2f5e94686fa01e3c0b4e3fad34baec)同时修改了模型权重、配置、模型卡与结果，模型卡训练信息也有变化；因此它不是单纯更改同一测试结果的证据，不能把差值归因于某个因素。本次只核对发布文件的算术，没有重放视频或验证成功判定。

## 对项目判断的影响

如果目标读者是实际跑机器人策略的开发者，其一部分需求已由官方文档、LeRobot 运行工具和第三方工具覆盖。本站可以被验证的假设是：读者查一个模型报告时，集中看到**完整基准还是子集、真机还是仿真、正式实验还是 CI 冒烟、成绩来源与次数**，能比自行翻查更快避免误读。这只是对照试验候选；目前没有访谈、对照测试、回访或付费证据，也未证明这些信息在其他页面中不存在。
