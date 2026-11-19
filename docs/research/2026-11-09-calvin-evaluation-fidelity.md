# CALVIN：连续任务、复现问题和现有资料对照

核查日期：2026-11-09。本记录对照当前本地条目和公开资料；不运行评测、不验证榜单每个数值，也不推断商业需求规模。

## 站内已有内容

[CALVIN 条目](../../content/benchmarks/calvin.json)说明语言条件下的仿真操作与 D→D、ABC→D、ABCD→D 三种划分；样例中包含一个 OpenBMB 公开的五步评测配置、一段第三方转换的训练视频和另一个标为 validation 的数据帧。条目已经说明三者不能自动关联：评测配置不是模型执行结果，训练示范也不是评测结果。

[OpenBMB 的 CALVIN 说明](https://github.com/OpenBMB/MiniCPM-Robot/blob/f666593066641d2c0cef06bc17bfb1e954547674/MiniCPM-RobotManip/evaluation/calvin/README.md)描述 1,000 条序列的长程评测；[当前仓库说明](https://github.com/OpenBMB/MiniCPM-Robot/blob/main/MiniCPM-RobotManip/evaluation/calvin/README.md)还标示序列来自 starVLA、源文件 SHA-256 和串行单 GPU 路径，以及日志与可选调试 GIF。当前说明可能随版本变化，本次未运行，也未重算文件哈希。一个序列包含五项任务，平均连续完成数以任务数计、满分 5，不是直接标为百分比的成功率。

## 独立使用者的复现提问

[VLA-Adapter issue #48](https://github.com/OpenHelix-Team/VLA-Adapter/issues/48) 中，提问者自述下载代码、权重与数据后，在 1,000 条序列上得到平均连续长度 1.741，低于其预期；日志中列出不同子任务的计数。贡献者认为应检查设置，并声称其他人多数超过 4.4；提问者表示按 README 配置仍未解决，进一步怀疑 rollout 函数、动作范围变换与输入增强，自己也表示不确定原因。贡献者后续认为相关 rollout 变体的影响不足以解释差距，另一位参与者表示遇到类似问题。截至本次查看 issue 仍开放；各方说法未独立复现，也不能据此断言论文数值错误、确定代码缺陷或将相关人员当成付费用户。

[司南 CALVIN 分数表](https://robo.sinanlab.com/benchmarks)已有中文任务说明，分列 ABC→D、ABCD→D 等设置，并对 VLA-Adapter-Pro 列出论文成绩约 4.5 及各连续任务长度的成绩。此数值是该站引用的论文结果，1.741 则是 issue 提问者报告的运行结果；帖子没有提供足够信息证明两次代码版本、参数、模型权重和其他条件完全一致，不能将二者差值归因于某个因素。司南还列出部分训练设置和原文定位，因此“分数 + 中文说明 + 条件”本身不是空白；具体数据未逐行复核。

## 为什么一份完整结果不必然证明运行路径正确

[Benchmark-path fidelity in parallel robot-policy evaluation](https://link.springer.com/article/10.1007/s11227-026-08965-w)报告作者自己的 CALVIN scene D 评测管线案例：导出轨迹过短是其适配层引入的一个已定位缺陷。作者在 14 段轨迹的精确重置教师回放实验中，只改变导出长度，报告成功由 0/14 变为 14/14。这里是作者自报的配对诊断，并非 14 条真实模型独立能力测试，也不是 CALVIN 官方缺陷。

同一论文指出，官方使用的中立机器人重置本身不是缺陷，开环回放对初始状态敏感；在一个三子任务探针中精确连续回放仅为 1/3。作者说明案例限于单一场景、策略家族及其自建适配管线，历史依赖版本、随机种子和片段选择未完整记录；不能证明该方法能普遍排错，也不能用它解释前述 issue。

相关另一项[操作评测审计](https://arxiv.org/html/2606.04233)在其 ABC→D 实验中，把积木姿态重新采样到训练范围内，报告 X-VLA、GR-1、RoboFlamingo 的平均完成任务数分别下降 1.03、0.75、0.50；重新抽取任务序列清单时变化至多 0.11，作者提示闭环非逐位确定且存在噪声。这是论文的特定模型、设置和作者解释，不是每个 CALVIN 模型的性能保证，也没有由本项目复测。

## 已有方案与产品含义

- [Dexbotic Benchmark](https://github.com/dexmal/dexbotic-benchmark)仓库自述支持 CALVIN、LIBERO、RoboTwin 2.0 等环境的自动化评测，提供配置及运行示例；容器示例还要求独立模型服务。本次未部署或验证支持范围。
- [Code with Papers 的 CALVIN 归档](https://www.codewithpapers.app/sota/robot-manipulation-on-calvin)有 D→D 的历史成绩、代码入口、额外训练数据筛选和试运行标识；该表是截至 2025-07-28 的归档，页面强调其代码试运行不是榜单结果复现。本次未复测或验收筛选交互。
- 已有官方说明、中文分数表、运行框架与复现讨论；本站可能帮助读者把环境划分、评测序列、模型成绩、运行条件和复现报告放在同一个上下文中，但这只是待验证的阅读体验假设。实验应要求读者找到可比条件、区分训练视频及测试结果，并看能否从原始资料得到同样答案；目前没有用户对照实验、留存或付费证据。
