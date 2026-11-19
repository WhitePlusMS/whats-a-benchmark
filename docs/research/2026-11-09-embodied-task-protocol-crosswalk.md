# 具身任务、评测方式与已有资料对照

## 开发者真实工作流及现有工具

一位 [Reddit 发帖者](https://www.reddit.com/r/reinforcementlearning/comments/1w3vg1p/does_every_embodied_ai_project_end_up_rebuilding/)称自己反复搭建 MuJoCo 任务、训练、评估、检查点和可视化流程，因而开发 [SimRig](https://github.com/Su1eym4n/simrig)；帖子明确有工具作者关联。另一回复者称遇到 MuJoCo 流程调试问题，并表示愿意为该工具打赏；第三位回复者特别提到浏览器预览。身份、使用情况及实际付款均未核实，这不是对本站资料库的购买意愿调查。

SimRig 仓库自述覆盖环境脚手架、PPO 训练、评估及浏览器预览；这与评测介绍网站属于不同产品层，但对“帮助机器人研究者完成实验”的更深方向已有直接替代。本次未安装该工具或验证效果，不因少量留言推断市场规模。它使用 MuJoCo Playground 的工作流；不能仅因名称相似就说是本站 [Embodied Playground](../../content/benchmarks/embodied-playground.json) 的用户。

调查日期：2026-11-09。本地内容基于当前工作区；原站和代码仓库为公开页面快照。未实际运行评测、重新验收站内媒体、复算成绩或访谈用户。

## 同样标记具身，任务及分数含义不同

| 条目 | 实际要做什么 | 本地与官方的边界 |
| --- | --- | --- |
| [TOTO](../../content/benchmarks/toto.json) | 机器人用离线数据学习，论文中在真实 Franka 机械臂上执行舀取、倾倒，以材料质量和是否舀起/倒入评价。 | 本地展示两条真实离线采集轨迹及数值，并明确不是模型测试总成绩。[作者页](https://vdean.github.io/toto-benchmark.html)和[代码说明](https://github.com/AGI-Labs/toto_benchmark/blob/main/README.md)曾公开提交策略、共享真机测试与榜单流程；是否目前仍接受、处理新提交未实测。离线数据 reward、真机评测及仿真不得合并。 |
| [SIMPLE](../../content/benchmarks/simple-embodied.json) | 人形机器人在混合物理仿真和渲染的环境中完成抓取、搬运等；与 [SIMPLER](../../content/benchmarks/simpler.json) 是不同项目。 | 本地有数据包中的仿真轨迹、评测包单帧和第三方单次评测视频；不把单次结果当整体分数。官网已有多个策略按任务和随机化等级的结果，且有部分真实机器人对照，不能说项目从未做真机研究。 |
| [EmbodiedBench](../../content/benchmarks/embodiedbench.json) | 多模态模型接收指令和视觉反馈，在家务规划、导航或机械臂操作的仿真环境中输出可执行动作。 | 虽然主体是评估多模态模型，它不是单纯静态图片问答。[官网](https://embodiedbench.github.io/)区分高层任务与低层导航／操作，展示成功和失败案例、排行榜区域与错误分类；榜单区域的所有交互与成绩本次未验收。 |
| [Embodied Playground](../../content/benchmarks/embodied-playground.json) | 让基础模型智能体通过代码、观察与动作，在仿真环境完成长步骤物理任务。 | 本地 P5 视频标为脚本复现而非模型计分。[官网](https://winniechen2002.github.io/Agent-bench-website/)已有图册、分套件结果、Pass@K 和权限／预算协议；参考演示与计分试验明确分开。EP-20 经试验信息选取，不是 EP-100 的无偏估计。 |

## Embodied Playground：总榜、失败审计与现有解读

[论文 v2](https://arxiv.org/html/2610.27039v2)的 EP-100 包含 100 项任务、每项四种条件，综合榜按五个套件等权；作者报告 GPT-6-Astra 的 Pass@1 为 13.80%，Pass@2 为 19.94%。按全部 400 个任务条件直接合并时，第一次有效尝试成功 64 个（16%），两次机会累计成功 91 个（22.75%）；这两种加权口径不同，不能混为同一个榜单分数。

作者还审计了该模型的 846 条历史记录：其中 736 次为计分尝试，包括 91 次成功、645 次失败；另有 69 次确认的基础设施事故和 41 次超出计分窗口的记录。作者称 645 次失败尝试中有 574 次涉及规则或阈值披露不完整，包括数值容差未披露。这个比例的分母是**特定模型的计分失败尝试**，不是全部任务、全部模型或全部尝试；涉及披露不完整也不意味着这些失败都可归因于规则，更不能据此改判成功或推算新成绩。本次未独立重跑或逐条审计。

[Lixin Xu 的中文论文笔记](https://davidlxu.github.io/posts/2026/11/embodied-playground-paper-notes/)已经解释同一审计和分母边界；[BenchFlow 的具身智能体目录](https://github.com/benchflow-ai/awesome-embodied-agents)也列出该评测、权限等级和榜单成绩。因此，解读成绩及规则不是本站独有功能。本站的 P5 脚本复现样例仍是演示，不能作为模型的计分尝试。本次未验证现有资料的全部交互，或调查读者使用情况。

## SIMPLE：同一项目不同来源的范围不能自动拼接

- [官网](https://psi-lab.ai/SIMPLE/index.html)页面当前描述 **60 项任务**、50 个场景和 1,000 多个物体；[论文 arXiv:2606.08278v2](https://arxiv.org/html/2606.08278)摘要和正文写 **16 项任务**、50 个场景和 1,000 多个物体。本地条目现记录官网的 60。两者可能涉及版本、统计范围或其他原因，但目前没有找到明确解释，**不能认定哪个数字是错误或把它们当同一次测量**；后续应核对官方版本及任务清单。本次不修改评测条目。
- 官网六任务表按 L0/L1/L2 展示每级 **10 次运行中的成功次数**；[论文附录多任务表](https://arxiv.org/html/2606.08278)描述联合微调 16 项任务，多数每任务每等级 20 次、DreamZero 为 10 次。任务、训练和试验次数不同，不能把两张表的单元作为统一口径横排。
- [论文表 5](https://arxiv.org/html/2606.08278)报告所选 Ψ₀ 策略在相似设置的三项零样本仿真／真机迁移结果，各 10 次；例如 Pick & Place 仿真 9/10、真机 8/10。这是作者对特定策略、任务与实验设置的结果，不证明任意模型、场景下仿真成绩可以预测真机表现。
- [官方评测教程](https://github.com/physical-superintelligence-lab/SIMPLE/blob/main/docs/source/tutorials/eval.md)已提供评测数据下载和客户端/策略服务运行方式；本地对 `simple-eval` 一个包内部 `train` 标记的描述，不能推断官方把全部评测都标记为 train。

## EmbodiedBench：真实问题与已有答复

[EmbodiSkill #2](https://github.com/air-embodied-brain/EmbodiSkill/issues/2)中，提问者询问论文使用的 EB-Habitat 与 EB-Navigation 各 1,000 个训练任务怎样生成，要求任务文件和划分。协作者列出 EmbodiedBench 既有生成脚本，并解释 Habitat 的训练模板、类别、场景及物理有效性筛选，也介绍导航生成方式。

这说明有人需要追溯**另一篇工作如何使用上游基准**；答案已有一部分，且讨论发生在 EmbodiSkill 仓库，不能误记为 EmbodiedBench 官方团队对所有训练集发布情况的承诺。本次没有运行脚本，因此不知道能否重新生成逐条一致的 1,000 项，也不能将两种环境各 1,000 个训练任务误当作原基准的全部测试集规模。

## 同题第三方资料与结论限制

[Embodied Data Atlas 对 Embodied Playground 的同题页](https://embodieddataatlas.com/datasets/embodied-playground/?lang=en)已有任务、输入、L0–L3 权限和许可范围；该页本次只核对公开文字，未审计其所有字段或操作。官网也已提供任务及规则说明。因此“把具身评测讲清楚”是现有服务之间的质量和具体工作流竞争，而非一个没有竞争者的功能。

以上的来源差异和开发者提问支持继续研究，但尚无证据证明哪类读者会回访或付费。后续可验证跨论文、上游代码、官方榜单追踪具体条件的耗时与误读率；不得以一次有帮助的查找推断整体市场。
