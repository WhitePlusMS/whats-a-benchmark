# Embodied First Exam 与本地目录对照（2026-11-10）

## 范围和结论

本次读取 [Embodied First Exam（EFE）固定提交的 tasks 目录](https://github.com/mll-lab-nu/embodied-first-exam/tree/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks)及其 36 个顶层目录 README，与本地 `content/benchmarks/*.json` 的文件名、`id`、`name` 作忽略标点和大小写的名称对照。九项规范化同名；另有 Meta-World 与 RoboCasa-GR1 两项发现上游关系。未对所有别名、正文、历史版本做语义匹配，未命中不代表本站完全没有提及或可以直接新增。

[EFE 仓库](https://github.com/mll-lab-nu/embodied-first-exam)描述的是多个机器人任务的冻结实例、代码智能体交互和独立沙箱评分；[官网](https://www.embodied-first-exam.ai/)提供任务及榜单入口。本次未运行任务、未审计榜单所有模型，也未验证其全部参考方案或许可。它比资料目录更进一步，不能把它当成只有名字的清单；同样，它的评测结果也不是各原始论文发布成绩的无条件替代。

## 逐项名称及关系

表内链接指向上述固定提交的 README。`未命中`只表示前述名称字段在本地未同名命中；是否为已有评测的别称、子集、独立评测及是否适合收录，需逐项核对。

| EFE 目录 | 本地名称对照 | 阅读线索 |
| --- | --- | --- |
| [abc-sim](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/abc-sim/README.md) | 未命中 | 双臂操作 |
| [ambench](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/ambench/README.md) | 未命中 | 无人机空中操作 |
| [autobio](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/autobio/README.md) | 未命中 | 生物实验台任务 |
| [behavior-1k](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/behavior-1k/README.md) | 同名 [BEHAVIOR-1K](../../content/benchmarks/behavior-1k.json) | 家庭长任务 |
| [bigym2](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/bigym2/README.md) | 同名 [BiGym 2.0](../../content/benchmarks/bigym-2.json) | 人形移动操作 |
| [dexhand](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/dexhand/README.md) | 未命中 | 灵巧手 |
| [dexjoco](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/dexjoco/README.md) | 未命中 | 灵巧手及机械臂 |
| [dextoolbench](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/dextoolbench/README.md) | 未命中 | 灵巧手使用工具 |
| [embodied-olympics-fun](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/embodied-olympics-fun/README.md) | 未命中 | 人形运动；README 称大多数任务无已知解 |
| [embodied-olympics-match](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/embodied-olympics-match/README.md) | 未命中 | 对抗运动 |
| [embodied-safety-exam](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/embodied-safety-exam/README.md) | 未命中 | 请求和物理后果的安全评测 |
| [embodiedswe](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/embodiedswe/README.md) | 未命中 | 编写机器人任务程序 |
| [humanclaw](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/humanclaw/README.md) | 未命中 | 模拟人体导航和交互 |
| [humanoidbench](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/humanoidbench/README.md) | 同名 [HumanoidBench](../../content/benchmarks/humanoidbench.json) | 全身控制与密集奖励 |
| [ispatialgym](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/ispatialgym/README.md) | 未命中 | 图像目标驱动操作 |
| [kinder](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/kinder/README.md) | 未命中 | 物理推理和规划 |
| [labutopia](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/labutopia/README.md) | 未命中 | 化学实验台任务 |
| [libero-max](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/libero-max/README.md) | 同名 [LIBERO-MAX](../../content/benchmarks/libero-max.json) | 中途发生事件的操作 |
| [maniguard](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/maniguard/README.md) | 未命中 | 机械臂操作安全；适配 30 个基础任务及两种模式，协议与原版不同，详见[补查](2026-11-10-maniguard-safety-protocol.md) |
| [metaworldplus](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/metaworldplus/README.md) | 关联 [Meta-World](../../content/benchmarks/meta-world.json) | README 说明采用 Meta-World v3 环境；不等同原始发布评测协议 |
| [molmospaces](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/molmospaces/README.md) | 未命中 | 未见房屋中的操作和导航；[成绩及逐回合复核](2026-11-10-molmospaces-episode-score-crosswalk.md)区分早停和聚合口径 |
| [mujoco-playground](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/mujoco-playground/README.md) | 未命中 | 四足移动及操作任务 |
| [myosuite](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/myosuite/README.md) | 未命中 | 肌肉骨骼控制 |
| [pandadyn](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/pandadyn/README.md) | 未命中 | 动态操作场景 |
| [roboarc](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/roboarc/README.md) | 未命中 | 拓扑谜题和家具装配 |
| [robocasa](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robocasa/README.md) | 同名 [RoboCasa](../../content/benchmarks/robocasa.json) | v0.2 厨房任务 |
| [robocasa-gr1](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robocasa-gr1/README.md) | 关联 [RoboCasa](../../content/benchmarks/robocasa.json) | GR1 固定底座桌面任务，不作为另一项同名命中 |
| [robocasa365](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robocasa365/README.md) | 同名 [RoboCasa365](../../content/benchmarks/robocasa365.json) | 筛选 50 个任务族并冻结实例 |
| [robodojo](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robodojo/README.md) | 同名 [RoboDojo](../../content/benchmarks/robodojo.json) | 原基准的仿真部分 |
| [roboengineer](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/roboengineer/README.md) | 未命中 | 利用部署反馈调整控制器 |
| [robolab](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robolab/README.md) | 未命中 | 桌面语言目标 |
| [robopaint](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robopaint/README.md) | 未命中 | 机器人绘画 |
| [robotwin-2](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robotwin-2/README.md) | 同名 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json) | 双臂标准模式服务 |
| [robowits](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robowits/README.md) | 未命中 | 双臂物理推理 |
| [vlabench](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/vlabench/README.md) | 同名 [VLABench](../../content/benchmarks/vlabench.json) | 36 个冻结实例及两种模式 |
| [yamlab](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/yamlab/README.md) | 未命中 | 双臂操作 |

## 同名并不保证成绩同口径

- RoboCasa365 的 EFE 适配从候选中选 50 个任务族，每族一个冻结实例，分别使用 standard 和 privileged 两种模式，另有一个 realtime 配对任务；选择规则、控制器和成功判定见[固定 README](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robocasa365/README.md)。100 个模式任务不是 100 个互不相同的原始任务族。
- BEHAVIOR-1K 的 EFE 适配按 README 采用 2026 challenge 100 个任务、特定公开测试实例和两种模式；其中 11 个有参考解或正例、89 个没有，不代表后者无法解决。对应判定条件及验证边界见[已有核查](2026-11-09-behavior-task-skill-protocol.md)。
- RoboTwin 2.0 的 EFE 适配定义了双臂动作、服务接口、运行预算等。单看共同名称无法证明原论文的策略类型、初态、任务集合、算力预算与 EFE 代码智能体相同。[固定 README](https://github.com/mll-lab-nu/embodied-first-exam/blob/d4410156b8a0a751684b57d6bf1072ed01bcb3e1/tasks/robotwin-2/README.md)

## GPQA 的直接竞品观察

[Artificial Analysis 的 GPQA Diamond 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)公开评测背景、方法入口、分数图、Token、成本、耗时和示例任务，并称由 AA 独立评测。它已覆盖评测解释和模型对比，不能把“中文解释 + 排行榜 + 示例”表述为无竞争的独创性。其[方法页](https://artificialanalysis.ai/methodology/intelligence-benchmarking)将 GPQA 列为历史评测项，是否持续更新具体模型应逐项核实。

本地 [GPQA 条目](../../content/benchmarks/gpqa-diamond.json)记录了 198 题子集、题目字段、数据入口、版本关系、成绩可比条件及复用约束；[发布资料页源码](../../src/views/ReleasesView.vue)目前索引厂商发布资料和成绩图链接，不能说已经建设了结构化厂商发布成绩榜。本站 README 明确其不是统一模型排名服务。

AA 页面显示原题示例，而[数据作者的 Hugging Face 页面](https://huggingface.co/datasets/Idavidrein/gpqa)请求不在线披露样题，并把该要求列为该入口的访问条件；AA 是否有额外授权或其他来源，本次没有证据。不能据此断言对方违规，也不能将对方展示视作本站获授权。

## 对产品判断的影响

目前证据支持：评测名称、中文解释、样例及排行榜都有成熟替代，单靠收集发布分数不构成明显壁垒。可继续验证的方向是将具体发布成绩与原始来源、精确模型版本、子集、提示和设置关联，并明确“已知差异/未知”，配合用户能直接理解的任务示例；这仍是产品假设，不是已验证的需求或独占功能。未进行用户访谈、需求量测量或完整竞品普查，不能据此断言盈利、增长或全面差异化。
