# 具身评测运行工具：速度、结果一致性与竞品

核查日期：2026-11-09。基于本地资料、论文和公开网页；没有运行评测工具、下载权重、复算结果或采访用户。工具、模型和网页状态均可能变化。

## 与本站已有评测的联系

本站已有 [LIBERO](../../content/benchmarks/libero.json)、[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)、[SIMPLER](../../content/benchmarks/simpler.json) 和 [RoboArena](../../content/benchmarks/roboarena.json) 等条目，主要解释评测和案例。以 SIMPLER 的成功与失败录像为例，两段是各自的单次仿真运行，不是跨工具逐回合一致性实验；本站也没有把这些条目组成可直接运行的统一评估框架。

[RoboScope Kit 论文](https://arxiv.org/html/2611.03850)研究如何在多个基准中适配策略并加快仿真评测，测试包括 LIBERO-Long 与 RoboTwin Easy。有限名称搜索本地研究和 benchmark JSON 未发现 RoboScope 独立记录；这不排除别名或其他目录资料。其结果与本站条目属于相同评测家族，但并非本站现有的同一次模型运行。

## 同一评测，成绩接近不等于每个回合相同

论文在作者设定的 **500 个 LIBERO-Long 回合**和同一组固定初始条件下比较工具。StarVLA 官方评估总成功率为 **90.2%**；RoboScope Kit 的 Search 配置为 **89.9%**，与官方逐回合成功/失败结果的一致率是 **97.9%**。作者按预先定义的 ±2 个百分点等效边界分析整体成功率；这里的“等效”不是逐回合完全相同，也不证明所有模型、随机种子和评测套件均一致。

同一对照中，RLinf 总成功率为 **90.3%**，与官方逐回合结果一致率为 **88.1%**；论文同时说明 RLinf 多次自身运行的逐回合一致率也有波动，并指出该评估中其动作采用采样。不能仅根据总分或上述差异判某一工具有 bug、断定采样是唯一原因，或把这组现象外推给其他任务。数值均来自[论文第 5.2 节](https://arxiv.org/html/2611.03850)，本站未复跑。

## 速度比较需要同时看耗时范围和资源

论文报告 RoboScope 在 LIBERO-Long 的某单 GPU 配置中，纯评测阶段相对官方工具达到 **6.16 倍**；该口径不含初始化、并发搜索和清理。计入该搜索后，同一配置相对官方端到端约 **3.02 倍**。论文还给 RoboTwin Easy 的 **25.04 倍**加速，但那是 500 回合、四 GPU 的优化运行对比单 GPU 基线，并非一张同等硬件下的速度对比。[作者论文及附录](https://arxiv.org/html/2611.03850)列出配置和测量范围；本次未验证其硬件、环境或结果。

对读者而言，评测资源、启动及搜索时间、具体数据与回合数、动作接口和成功定义与分数一样重要；这是一种待测试的阅读需求，不证明普通榜单用户都需要这些细节。

## 已有选型说明和运行工具

- [Bifrost 的平台对照](https://www.bifrost.ai/blog/robot-policy-evaluation-platforms-compared/)已把 LIBERO、RoboTwin、SIMPLER 等在不同运行工具中的覆盖、仿真/真机、硬件、许可、指标和失败分析放在一张表中。文章同时推广其自有托管平台 Manifold，存在商业利益；表内具体覆盖和当时状态没有在本次逐项复验，不能当作中立采购结论。
- [AllenAI 的 VLA Evaluation Harness](https://github.com/allenai/vla-evaluation-harness)同时提供运行框架与模型成绩聚合。仓库自述榜单数据来自论文聚合，不能将聚合出的每行说成该框架统一重跑；网页动态部分本次未完整读取，数量不当实时全站核验值。
- [CanIEmbody](https://caniembody.pages.dev/)页面提供机器人、策略和硬件兼容矩阵，并区分“可运行、有条件、部分证据、无已核实证据”。[作者自述](https://www.reddit.com/r/robotics/comments/1xilksa/i_made_a_caniusestyle_table_of_which_robot/)信息来自多种文档和论文，且在征求纠错；其账号在介绍自有项目，逐格事实及交互本次未逐项验证，不能将无证据等同不兼容。
- [LeRobot #2354](https://github.com/huggingface/lerobot/issues/2354)包含使用者对 SmolVLA 在 LIBERO 的复现问题；与本地训练示范、具体 checkpoint 和接口维度相关的已核对事实见[现有专项](2026-11-09-smolvla-libero-checkpoint-compatibility.md)。一个问题帖不自动证明本项目有客户或需要复制一个运行平台。

## 对项目决策的意义

“介绍各评测并帮助选工具”已有比较完整的公开表，机器人与模型兼容矩阵也有现成网站；跨基准实测还需要维护框架和算力。可以用同一具体任务测试本站现有解释是否有用：让读者分别用原论文、Bifrost 文章和本站资料找出“500 回合比较了哪些条件、计时是否含搜索、成绩是否逐回合一致”，记录正确率、耗时与资料维护工作。该对照尚未进行，不能先宣称本站更可靠、具有执行能力或有付费市场。

## 2026-11-10：模型与硬件兼容性的证据层次

### 现有工具已经覆盖到哪里

- [OpenRAL 固定版本的 VLA 兼容矩阵](https://github.com/OpenRAL/openral/blob/00d54c06928aa5be43f805e4daec3a709e2f7058/docs/reference/vla_compatibility.md) 已整理模型、机器人、仿真、相机、状态、归一化和权重许可等信息，未知项标为 TBD；因此“做一张机器人兼容表”本身也有直接竞争。矩阵里 `chamborgir/smolvla_pickplace_20k` 标注 SO-101 真机，但相关状态、相机和归一化字段仍为 TBD，文档明确该社区 checkpoint 尚未在 OpenRAL 本地验证；这并不证明上游未使用过真机或模型不兼容。[上游模型卡](https://huggingface.co/chamborgir/smolvla_pickplace_20k)描述了 SO-101、微调和加载示例，不能据此推定在其他人的设备上已完成验收。
- 同一 OpenRAL 文档说，UR5e、UR10e、Franka Panda、Sawyer 和 ALOHA 的指定硬件在环 gates 尚无记录的运行；其指定 SO-101 测试只检查接线和 Feetech 舵机总线，不发送位置命令。这些是相应测试的边界，不能扩展为该项目所有功能和硬件都未验证。
- [Inspect Robots](https://github.com/robocurve/inspect-robots) 作者提供机器人与策略适配、运行前动作/观测契约检查、按次评测日志和人工复核机制，并列出 SO-100/101 的 6 维关节位置接口。这是评测执行工具的竞争，不只是目录。README 的 CubePick `success_at_end = 1.0` 来自内置 mock 环境和脚本策略，不是真机或 VLA 的成功率；这里均为作者文档描述，未在本次研究中运行。

### 同一硬件名称也需要核对口径

OpenRAL 上述固定版本的机器人总表把 SO-100/101 写为 `6 arm + 1 gripper`，同一页标签表却写 DoF 为 6；[LeRobot SO follower 源码](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/so_follower/so_follower.py)列出 5 个机械臂电机和 1 个夹爪电机，动作字段由这些电机生成。说明文档之间存在值得核查的表述差异，不能直接断定 OpenRAL 的实际实现也有错误。机械自由度、电机通道数与模型动作向量维度不是可无条件互换的概念；具体模型仍要核对通道顺序、归一化、观测、相机和适配器。

### 真实使用问题与产品含义

[LeRobot issue #1239](https://github.com/huggingface/lerobot/issues/1239) 中一位用户报告 SO-101 + SmolVLA 按红色按钮：100 条示教、10 个位置、3 路相机、训练 20k 步后有空间偏差；手动移动板子让按钮进入腕部相机视野时能够完成。他后来反馈更多训练和示教仍未改善，同数据训练 ACT 也有类似偏差。这是用户自报的具体困难，不足以确定原因、普遍发生率或付费意愿。

因此可验证的产品假设是：针对明确的模型版本、任务、设备和配置，把公开来源、适配声明、接口检查与真实运行结果分层展示，帮助用户判断下一步怎样复现；不能把接口检查通过说成任务成功。现有 OpenRAL 与 Inspect Robots 已分别覆盖相当部分兼容信息与执行流程，这条方向是否值得独立做，仍取决于能否找到可持续维护的具体缺口以及真实用户是否愿意使用，而非信息整理本身。

## 2026-11-10：同名模型与数据集的接口实查

本次按 Hugging Face API 返回的仓库 HEAD 修订，只读下载四个 JSON 文件并计算 SHA-256；未下载权重、帧或轨迹，没有加载模型、执行适配或操作机器人。文件声明形状反映具体版本元数据，不代表所有该模型家族、机器人或数据均采用同样接口。

| 资料及固定修订 | 状态 / 动作的声明 | 含义 |
| --- | --- | --- |
| [lerobot/smolvla_base config](https://huggingface.co/lerobot/smolvla_base/blob/5e8d12a6e2975b0e5e5fce7c8caf47c371d257b6/config.json) | `observation.state` 6 维、`action` 6 维；列 3 个摄像头输入键。 | 基础检查点的配置形状，不代表自动匹配任意 6 维设备。 |
| [lerobot/smolvla_libero config](https://huggingface.co/lerobot/smolvla_libero/blob/a24f1f380461b665158d52acd140152c79e8b36d/config.json) | 状态 8 维、动作 7 维；列 2 个摄像头输入键。 | 同一模型家族的另一个检查点接口不同，不能只按 SmolVLA 名称把两者当成同一运行配置。 |
| [kwangchaeko/so101_test info](https://huggingface.co/datasets/kwangchaeko/so101_test/blob/e88a156be83cb1dd35890b7f835ced7beb9e7314/meta/info.json) | 仓库名称含 so101，但元数据 `robot_type=koch`、状态及动作各 4 维、`codebase_version=v2.1`。 | 名称和元数据有明显差异；元数据本身也只是发布者声明，未看轨迹或实物，不能判断误命名原因。 |
| [Guanli001 SO-101 vials info](https://huggingface.co/datasets/Guanli001/so101-vials-auto-dr-final100/blob/2d8589ab6d6711da980a9e11ae4533070c7fe3b6/meta/info.json) | `robot_type=so101_follower`、状态及动作各 6 维、`codebase_version=v3.0`。 | 与第一个模型的维数数字相同，但相机、关节顺序、单位、归一化、任务训练和适配器仍需核对，不足以认定能运行或成功。 |

上述四份文件 SHA-256 依表顺序为 `650584b56c104720f7a3c91d1ec6bec9e8de8ac11e60c92ba2fa82d93eda147d`、`3ed3ed80ee077d94ff22942130642bb60e255443ee65da676bc88ab1684a7efe`、`45c12efa1ecb1d7e3a7a303572677ade743c3c86e24caefa48512af8b7c7fa8b`、`f047dde060565d43c3810e8457d9c875147885271ae3c320eb5ba58af0e5a9f2`。数据集视觉和动作语义未全面核验，不因形状不同就声称不能通过合法适配器或重新训练使用。

已有外部研究 [Provael 的 SO-101 记录帧实验](https://docs.provael.com/studies/offline-real-observation/)也公开讨论了该名称与元数据差异，并区分记录帧前向计算和真实动作执行；其正文中另一个 `HuggingFaceVLA/smolvla_libero` 检查点与本表 `lerobot/smolvla_libero` 不是同一个仓库，不应合并作者结果。论文或工具自身有分层证据与校验，本站不是首创。

[LeRobot #2935](https://github.com/huggingface/lerobot/issues/2935)中开发者自报训练 SmolVLA 后控制 Gazebo 中 Koch 模拟机械臂时反复到同一位置；后来虽关闭 issue，却表示未继续，猜测缺少归一化到关节范围的映射。这里不是已验证的解决办法，也没有证据证明他使用了表中四份文件。它说明“有数据、有动作输出”和“完成任务”是两个问题，不证明网站用户规模或需求。

CanIEmbody 兼容矩阵本次网页工具无法重新访问，未能回查某个具体单元；此前对其功能的记录为当时页面快照，这里不推断该站当前单元格或准确性。OpenRAL 等已有兼容资料仍是直接竞品。进一步验证产品需要将上述具体任务交给目标读者，与官方文件及现有兼容矩阵对照查找速度和判断正确率；本次没有做读者实验。

