# 科学实验室机器人：评测范围、复现问题与已有目录

调查日期：2026-11-10。结合本站现有 EmbodiedLab、公开论文、固定版本仓库与用户问题；未运行仿真、复核原始评测轨迹或访谈用户。名称扫描只覆盖当前本地已发布 JSON 的文件名与 name 字段。

## 本站已有内容与新增候选

本站 [EmbodiedLab](../../content/benchmarks/embodiedlab.json) 是操作仿真实验仪器并依据本轮读数提交结果的评测；已有任务卡、悬臂梁配置和论文配图。其成绩和编码智能体框架的区别已在[同一模型成绩对照](2026-11-09-release-score-same-model-competitors.md)核查。它不是实际实验室机器人部署成绩。

| 名称 | 评测对象与场景 | 主要问题 | 资源与边界 |
| --- | --- | --- | --- |
| [LabUtopia / LabBench](https://proceedings.neurips.cc/paper_files/paper/2025/hash/313d6659e6532e6ba192dfb910d4261e-Abstract-Datasets_and_Benchmarks_Track.html) | 科学实验室仿真，分层任务包括原子操作、长步骤和移动操作 | 任务完成和不同操作复杂度；不是 EmbodiedLab 的隐藏物理参数测量协议 | 论文报告 30 项任务；[固定版仓库](https://github.com/Rui-li023/LabUtopia/blob/8df72784265c375a327ffa3f0a0cf8c676f229a7/README.md)提供中英文说明，将代码列为 MIT、数据资产列为 CC BY-NC 4.0。具体材料及第三方依赖须分别核对。 |
| [SciHorizon-eLab / SciVLABench](https://arxiv.org/html/2609.30971v1) | 前者是由实验步骤生成任务的框架，后者是由其生成的具身仿真评测 | 除最终成功，还记录有序步骤完成、对象替换及外部事件后的协同 | 论文报告 300 项经仿真认证任务；[仓库固定版](https://github.com/SciHorizon-elab/SciHorizon-elab/blob/300888ea05096d6a1662d0e3d77774f8ebe4cc28/README.md)另列 305 项、49 项人机协调，并称代码目前仅覆盖所列计划的一部分；两处数量和可运行范围有差异，原因未确认。 |
| [SafeLab](https://proceedings.mlr.press/v306/bai26e.html) | 实验室操作仿真与安全检查 | 区分最终完成和过程安全 | 已在[安全补查](2026-11-10-roborecover-safelab-evidence.md)核对；其中 50 条实体机器人开环重放用于核查安全标签，不是闭环策略部署成绩。 |

对本地 318 条 published JSON 的文件名和 name 做 labutopia、scihorizon、labvla、labguard、safelab 不区分大小写的名称扫描，未命中；不能由此推出全文、别名或线上一定没有，也不把相关研究都称作独立 benchmark。

## 同一任务：完成率和步骤进度不是一回事

[SciVLABench 论文 v1](https://arxiv.org/html/2609.30971v1)对每个任务分别用专家程序生成示范、分别训练策略；除另有说明，论文称每个策略和任务组合评估 30 个随机初始条件。其 SR 要求按顺序完成全部步骤；SSR 是每回合按顺序满足的步骤比例，再对回合求平均。

论文表 2 的四步 Transport and Mix 中，π0.5 的完整任务成功率 SR 为 **0.0%**，步骤完成率 SSR 为 **42.5%**；ACT 分别为 **3.3%** 和 **40.8%**。这些是同一论文所报告的仿真结果，分别回答“是否全部完成”和“平均完成多少程序步骤”；不能将 42.5% 说成 42.5% 的完整实验成功。该表十个代表任务的 ACT 平均 SR 为 **49.7%**，不是 300 项任务的平均值，也不是实体实验室成功率。30 次试验及任务选择带来不确定性，未有逐回合记录和配对检验时不应把微小差异说成稳定能力差距。

论文的人机协同表另在两个仿真情景中记录触发前违规率、触发后响应延迟与最终成功。触发前违规率为零不代表任务都已完成，也不是对真实人机作业安全性的证明。

## 同领域真机与仿真成绩如何区分

[LabVLA 论文 v1](https://arxiv.org/html/2606.13578v1)在 LabUtopia 六种任务上，按训练分布内与扰动后的分布外各测 120 个 episode／任务，报告自己模型的平均成功率分别为 71.1% 和 70.0%。同论文另在实体 Franka 平台做四项不同实验任务、位置与杂物组合，每个设置报告 50 次；例如 Pour Liquid 在分布外有杂物时报告 72%。这些是作者报告，在不同任务与设置下分别形成；不能把仿真均值当成这组真机结果，也不能据此推断真实实验室的通用成功率或工作安全。

## 使用者提出的具体问题

- [LabUtopia issue #16](https://github.com/Rui-li023/LabUtopia/issues/16)：一位使用者说其按 Level-1 Pick 配置生成示范，并尝试公开数据训练 ACT 与 DP，但评估均失败，询问论文使用的配置及可复现设置。检索时未见维护者答复；这是单人报告，错误原因和实际复现结果未经独立验证。
- [issue #15](https://github.com/Rui-li023/LabUtopia/issues/15)：自称实验室机器人初创团队的提问者询问 CC BY-NC 场景资产能否用于客户演示，以及能否获得部分场景的商业授权。固定版 README 确实分别列出代码和数据资产许可；问题页面未见授权答复。该帖子体现一个许可查询问题，不能推定其成交、预算、身份或本站产品付费意愿。
- [issue #12](https://github.com/Rui-li023/LabUtopia/issues/12)：另一人询问化学反应仿真部分是否开源，检索时未见答复；不能仅凭提问推断该部分一定未公开。
- [实验室社区讨论](https://www.reddit.com/r/labrats/comments/1xqeytc/ai_agents_enter_the_wet_lab/)中，一位自述从事实验室自动化的人解释其工作流还涉及实验设计、试剂与对照验证、设备调度及结果质量检查。这是未经核实的个人经验，讨论的真实工作也不是上述仿真任务的同一次测试，不证明其需要 benchmark 目录。

## 现有替代与对项目的意义

[现有实验室智能体目录](https://github.com/gunkaynar/awesome-lab-agents)已列 SciHorizon-eLab、LabUtopia、AutoBio 等评测和仿真项目；[LabUtopia 的中文 README](https://github.com/Rui-li023/LabUtopia/blob/8df72784265c375a327ffa3f0a0cf8c676f229a7/README_CN.md)已有安装与许可入口。因此“收集科学实验室具身评测”“提供中文资料”均已有替代。

值得验证的阅读任务是：用户能否从本站 EmbodiedLab 找到与实验室操作、过程安全和真机验证相关但协议不同的资料，并判断某个成绩的实验范围、分母和使用条件。当前只有具体提问与内容候选，未证明读者需要这一导航、它优于现有目录，或值得开发额外成绩榜。
