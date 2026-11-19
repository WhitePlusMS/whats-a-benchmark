# RoboAtlas 的具身成绩与 LIBERO 协议核查

调查日期：2026-11-10。此次对照的是网页可读内容和公开模型卡，没有登录、操作比较功能、运行模型或验证成绩。网页和目录可能随时间改变。

## 直接竞争

[RoboAtlas 的 LIBERO 页面](https://www.roboatlas.ai/en-US/benchmarks/libero)按 Spatial、Object、Goal、10 和平均数展示模型成绩，标识为发布方报告；[VLABench 页面](https://www.roboatlas.ai/en-US/benchmarks/vlabench)也列出一条成绩。其[模型目录](https://www.roboatlas.ai/en-US/models)展示模型、版本、代码、权重及机器人关联；[τ₀-VLA 详情](https://www.roboatlas.ai/en-US/models/tau-0-vla/initial?checkpoint=libero)同时列模型文件、许可、来源、成绩和适用边界。可读页面已具备的这些能力与本站拟做的模型及评测资料整理直接重叠，不能将「具身模型榜单」「标注分数来源」「模型—机器人关系」宣传为无人提供的功能。

本站 [LIBERO 资料](../../content/benchmarks/libero.json)已有仿真训练轨迹的视频、首末帧及一条带 seed、步骤和第三方原始记录链接的评测案例；前者是训练示范，后者是单次第三方仿真评测，都不是模型整体成绩。本站相关内容与 RoboAtlas 页面使用方式不同，但未开展用户测试，不能声称因此更受欢迎。此次仅比较所链接页面，不能推断 RoboAtlas 其他页面是否有逐回合视频或相同内容。

## 同一条成绩的协议标签问题

[RoboAtlas 的 τ₀-VLA 模型详情](https://www.roboatlas.ai/en-US/models/tau-0-vla/initial?checkpoint=libero)把 97.35% 标为发布方报告而非独立复现，明确该数字属于 LIBERO 微调模型而非预训练模型或真实机器人；但同一成绩的标签写 `LeRobot 400-episode protocol`，说明文字又写四个 suite 的每个任务 50 次。

[模型作者的 LIBERO 模型卡](https://huggingface.co/sii-research/tau-0-vla-libero)报告每任务 50 次，四项分别为 97.40%、98.20%、98.80%、95.00%，平均 97.35%；提供的运行命令也设置 `num-trials-per-task 50`。四项各 10 任务，按命令全部运行对应 4×10×50=2,000 次；该数是根据公开设置计算，并非读取了实际运行日志。[LeRobot 的 LIBERO 文档](https://github.com/huggingface/lerobot/blob/main/docs/source/libero.mdx)描述的 400 次则是四组各十任务、每任务 10 次；文档另建议三种 seed 求平均。

因此该页面的 400 次标签和该条成绩所附的 50 次说明口径至少不一致或容易误解；不能据此推断成绩错误、网站所用协议字段的内部定义、作者是否实际完成全部运行或不同模型结果可以直接比较。应保存来源、实际任务组、每任务次数、seed、模型文件版本及均值算法，缺失时标未知。

## 需求与产品含义

已有 [RoboTwin #561](https://github.com/RoboTwin-Platform/RoboTwin/issues/561) 有开发者询问官方榜成绩使用哪种指令设置，表明至少存在查找评测口径的具体问题；该个案与上述 τ₀-VLA 记录并非同一用户或同一协议。结合例子，可提出让读者快速核对成绩所指的模型、样本数与出处的假设；无法仅凭这些推断市场规模、付费意愿或人们是否会使用本站。应围绕少数真实问题做同题比较与访谈，而不是先批量追加几百个分数。

## 世界模型字段补充

[WorldFailBench 数据卡](https://huggingface.co/datasets/ACERobotics/WorldFailBench)的 LIBERO 边界案例中，`failure_count=7` 表示表现较差一侧的成功运行次数，`failure_rate=0.7` 也是该侧成功率；每条运行的真实结果应看自己的 `scene.json`。不能仅因字段名含 failure 就将 0.7 翻译成失败率。论文的边界方向指标 OA 对平局计零；初筛与冻结后用新随机种子再次评估是不同阶段，数据卡示例未说明这些示例数属于哪一阶段，不应自行指定。详见[论文方法](https://arxiv.org/html/2610.33565)和[先前世界模型调查](2026-11-09-world-model-robot-evaluation.md)。本次仅看数据卡，未下载固定修订 `ea0776850e3b5322932e4f25c9dae67c300d1075` 的约 999 MB 压缩包或逐条验算。

## 成绩聚合的来源关系

[embodiedrank 榜单](https://embodiedrank.com/en/classement/)可读页面注明其榜单来源为 AllenAI VLA Evaluation Harness，且每个模型与基准只选择一条成绩、优先模型作者报告。它展示大量 LIBERO 条目、原论文链接、部分第三方测量标记和同步时间。数据由网站再次展示，并不因为出现在两个站就变成两次独立评测；对每一条成绩仍须核对其原始论文及条件。页面页脚表示部分内容由 AI 协助整理；本次未验证其全部结果或后台更新链路。

[AllenAI 项目仓库](https://github.com/allenai/vla-evaluation-harness)自述除运行框架外还提供论文成绩榜；[论文](https://arxiv.org/html/2603.13966)说明一批成绩由工具辅助提取并经人工检查。论文当时的统计和现有页面数量属于不同时间快照，不应混作同一规模。AllenAI 的统一运行框架、论文成绩汇编及别站转引是三个不同层次；不能默认汇编中的每条都是 AllenAI 独立执行。

[Tektonian 的 VLA Benchmark 开放仓库](https://github.com/Tektonian/VLA-Benchmark/blob/956ad7a334cd698fd07d15fb7cc027673db38e6c/README.md)也自述收集模型、论文、成绩及评估说明；README 的示例列出 OpenVLA-OFT 的 LIBERO 总分和四项分数，并邀请补充来源表格或行。README 描述跨基准名次积分，表示对获得积分的基准取平均：若照此文字理解，单项获第一与多项均第一可能同样为 5 分，故覆盖基准数本身不是这个平均分；但本次未检查实现、资格规则及实际排名，不能断言线上如何排序。在线榜单本轮无法访问，GitHub 文件树 API 返回 403，无法统计记录或验收交互。另一个[司南中文成绩页](https://robo.sinanlab.com/benchmarks)则自述按基准分组、不跨基准合成，并保留部分论文任务及配置说明；不应假设它与以上各站所有记录均互相独立或互为来源。
