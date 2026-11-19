# BiGym：同名任务、会话波动与官方成绩对照

调查日期：2026-11-09。阅读当前本地条目、公开网页和固定版本结果文件；没有运行环境、训练模型或测试真人读者。原始结果为官方作者报告，不能当作本站复测或实机成绩。

## 本站两个样例如何对应整体成绩

本站 [BiGym 2.0](../../content/benchmarks/bigym-2.json) 展示 `move_plate` 的 GPT-6 Astra `astra-s1` 会话两个种子：620000 超时、620005 成功。它们是两次仿真评测，不能以 1/2 推断总体成功率。

本次读取官方 [固定提交的逐种子结果](https://huggingface.co/datasets/SWIRL-Lab/bigym2-agent-rollouts/tree/d996b62535e008cf7a5f77d3899082ae652eed02/policies/move_plate)，用 Python CSV 解析各会话 100 行，核对种子各为 620000–620099、互不重复并统计 `success`：

| 任务与会话 | 成功数 / 种子数 | 成功率 | 逐种子文件 SHA-256 |
| --- | --- | --- | --- |
| move_plate / [astra-s1](https://huggingface.co/datasets/SWIRL-Lab/bigym2-agent-rollouts/blob/d996b62535e008cf7a5f77d3899082ae652eed02/policies/move_plate/astra-s1/episodes.csv) | 36 / 100 | 36% | `9e4ad470035c778f87aec1476bc82947766dea1735d2c2d4e03d5ba5f7f24f75` |
| move_plate / [astra-s2](https://huggingface.co/datasets/SWIRL-Lab/bigym2-agent-rollouts/blob/d996b62535e008cf7a5f77d3899082ae652eed02/policies/move_plate/astra-s2/episodes.csv) | 2 / 100 | 2% | `92acbc6d5b8bbbbae15a2647574ef962c7ddee9e8168fe1949db1bc5b760e070` |
| move_plate / [astra-s3](https://huggingface.co/datasets/SWIRL-Lab/bigym2-agent-rollouts/blob/d996b62535e008cf7a5f77d3899082ae652eed02/policies/move_plate/astra-s3/episodes.csv) | 4 / 100 | 4% | `4051cea826369f4a14c8c834fd434da9e85870c68130c9078be5f22692be993d` |

三个会话各提交一份程序，均值为 `(36+2+4)/3 = 14%`，与[官方论文页面](https://bigym2.github.io/paper/)的 `14 ± 11`（按会话计算的均值及标准误）一致；会话差异只证明这一任务这组三次开发结果有波动，不能推广为模型的所有运行波动。本站两条样例都来自 s1；其中 620005 在 s1 成功、在 s2 和 s3 均超时，属于同种子下不同程序的结果，不是同一次轨迹。

官方论文设置的编码智能体用 high 档，三个会话各评 100 个种子；[官网实时榜](https://bigym2.github.io/)同时展示更高推理档位和不同任务集合的总分，并声明榜单柱选已测试的最高档位。不能把实时总榜数值当成这组三个会话的九任务总分，或把九任务总分当成 `move_plate` 成功率。榜单随时间更新。

## 同名任务也可能不是同一测试

[官方任务文档](https://bigym2.github.io/docs/tasks.html)说明 2.0 的机器人、场景、重置及容差与原版不同，明确提醒同名任务成绩不可直接比较。例如 `move_plate` 要把盘子放入另一侧架子，满足位置、方向、接触、离桌和松手条件；2.0 的桌子及盘架高度与原版不同。`dishwasher_close` 在本版各测试种子使用相同初始状态；[官网](https://bigym2.github.io/)明确称同一程序在这些种子得到 0 或 100，不能将 100 个种子解释成 100 种不同初态。

[官方采集说明](https://bigym2.github.io/docs/demo_collection.html)称示范采集要求成功条件维持 3 秒，而训练与评测维持 1 秒；采集记录只保存成功 episode，操作员还可选择保留。示范轨迹、评测轨迹、训练结果属于不同数据。本站 [BiGym 原版](../../content/benchmarks/bigym.json)中的第三方转换示范和 2.0 官方示范亦不能当成同一设备的同一评测。

## 开发者问题与既有解决方案

原版 [BiGym issue #30](https://github.com/NeuracoreAI/bigym/issues/30)中，使用者问如何运行基线并报告示范与环境下任务不成功；协作者提供 RoboBase 入口，并解释当时旧版示范与环境版本的差异，建议使用特定分支。那是 2024 年原版的具体问题与建议，不能当作 2.0 当前故障或独立证明建议必然解决全部问题。

现有 [BiGym 2.0 官方文档](https://bigym2.github.io/docs/agent.html)已列编码智能体输入、预算、环境、工具限制、版本及评分方法；官网也有逐会话结果和程序选择界面。网页描述支持逐种子重放，但本次未点击验证所有视频/3D 交互。它们是现有解决资料，不宜宣称“展示任务、种子和轨迹”无人做。

## 原版 BiGym：同样成功，执行步数不同

本站 [BiGym 原版](../../content/benchmarks/bigym.json)提供洗碗机任务说明及仿真视频；它们不是模型速度或成功率统计。[Speedup Patch 论文](https://arxiv.org/html/2603.20658)在原版 BiGym 和 LIBERO 做仿真实验，并另做真机任务。以其原版 BiGym 的 `Cupboards Close All` 为例，作者表 1 给 ACT 原方法和 ACT + SuP 均为 100% 成功率，但成功回合平均完成步数分别为 449.8 与 212.1；作者称每个 BiGym 任务评估 100 次。两项均为作者报告，本次未重跑或复算原始轨迹。**平均步数只统计成功回合**，不是全部尝试的平均步数、真实秒数、每小时产量或无人值守时间。步数比例约为 2.12，但不应自动称作现场产线节拍加速 2.12 倍。

该论文另对三项真机任务各报告 30 次试验；例如折叠毛巾基线 15/30、SuP 16/30，不能据这组数字断言所有任务成功率完全相同或产生统计显著提升。其加速器使用预测的状态偏差作为训练时的代理约束；代理约束也不是物理现场安全认证。原版 BiGym 与本站 BiGym 2.0 的机体及协议不同，不能将上述数字当作 2.0 中 `dishwasher_close` 的结果。

这些维度已经有现成展示：[SOTA2 同一任务页](https://www.sota2.com/research/sota/cupboards-close-all-on-bigym)列成功率、平均步数和不同方法，前述 ACT 原方法与 ACT + SuP 的两行数值与论文一致；本次只核对这两行和来源表注，没有复算所有行或验证交互。“按任务展示成功率加效率”因此不能算本站独有。

真实问题线索：[机器人社区提问](https://www.reddit.com/r/robotics/comments/1upp7l7/what_is_currently_limiting_the_movement_speed_of/)询问具身机器人动作慢究竟受硬件、感知、数据还是控制限制；一位回复者根据个人经验提到推理速度及动作预测长度之间的权衡。帖子属于公开讨论，身份与配置未核实，意见不是根因证明，也不表示提问者需要本站。可验证的阅读问题是“这条步数是否含失败、对应仿真还是真机、能否换算生产吞吐”；但已有论文和榜单提供部分信息，尚未测试本站是否更省时。

## 产品含义及边界

可用本站现有两个种子构造阅读测试：让读者找出该任务一次运行、一次会话和三会话均值分别是多少，辨认示范与测试，以及同名旧版为何不可直接比较。可以和官网比较能否更快完成，但目前没有读者实验或客户访谈；这只是一组可验证案例，不证明目标用户会回访或付费。
