# Artificial Analysis 目录与本站条目逐项对照

核查日期：2026-11-09。对照的是 [AA 公开 evaluations 目录](https://artificialanalysis.ai/evaluations)当时服务器返回的 39 个 `/evaluations/…` 目录链接，以及本地 `content/benchmarks/` 的已发布 JSON；它不是 AA 全站目录，也不是 318 条本站评测的全部外部竞品对照。AA 模型、语音、图像、Coding Agents、机器人及其他页面可能另有项目；链接数量不是模型数、独立数据集数或评测运行数。

方法：先提取目录卡片链接，与本地名称、版本、来源形成机器候选，再人工区分同一条目、家族或版本相关、以及本地暂未找到对应条目。以下简称“同项”仅指评测或明确子集身份有交集，不证明两边的任务集合、版本快照、评分方式和结果可互换。目录和详情可能变化；本地记录不等于线上已发布，也没有逐条核对样例或实际成绩。

| AA 目录项目 | 本地对应记录 | 判断与限制 |
| --- | --- | --- |
| [Intelligence Index v5.0.1](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index) | [Intelligence Index](../../content/benchmarks/aa-intelligence-index.json) | 同一指数系列；本地版本为 v4.3.2，不能将权重和组成视为相同。 |
| [AA-Briefcase v1.1](https://artificialanalysis.ai/evaluations/aa-briefcase) | [AA-Briefcase](../../content/benchmarks/aa-briefcase.json) | 同项。 |
| [AA-3D](https://artificialanalysis.ai/evaluations/aa-3d) | 未找到独立同名条目 | 仅在本地目录检索未找到；不排除关联材料提及。 |
| [APEX-Agents-AA](https://artificialanalysis.ai/evaluations/apex-agents-aa) | [APEX-Agents](../../content/benchmarks/apex-agents.json)、[1.1](../../content/benchmarks/apex-agents-1-1.json) | 同一评测家族；AA 有自己的运行框架、任务选择与评分实现。 |
| [AA-AnalystAgent](https://artificialanalysis.ai/evaluations/aa-analyst-agent) | [AA-AnalystAgent](../../content/benchmarks/aa-analyst-agent.json) | 同项。 |
| [AutomationBench-AA](https://artificialanalysis.ai/evaluations/automationbench-aa) | [AutomationBench-AA](../../content/benchmarks/automationbench-aa.json)、[原始评测](../../content/benchmarks/automationbench.json) | 存在 AA 同项；须区分原始基准与 AA 实现。 |
| [Harvey LAB-AA v1.1](https://artificialanalysis.ai/evaluations/harvey-lab-aa) | [Harvey LAB-AA v1.1](../../content/benchmarks/harvey-lab-aa-v1-1.json)、[原始 LAB](../../content/benchmarks/harvey-lab.json) | 存在 AA 同项；原始 LAB 版本另列。 |
| [GDP.pdf](https://artificialanalysis.ai/evaluations/gdp-pdf) | [GDP.pdf](../../content/benchmarks/gdp-pdf.json) | 同一基础评测；AA 自述文档输入、执行框架与评委不同，成绩不可自动与 Surge 互换。 |
| [EnterpriseOps-Gym-AA](https://artificialanalysis.ai/evaluations/enterprise-ops-gym-aa) | 未找到独立同名或原始评测条目 | 不代表本站没有其他企业工作流评测。 |
| [Terminal-Bench 4.0](https://artificialanalysis.ai/evaluations/terminalbench-4-0) | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 同项；不应匹配 2.0。 |
| [Terminal-Bench-Science 0.1](https://artificialanalysis.ai/evaluations/terminal-bench-science) | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 同项。 |
| [FrontierCode 2.0](https://artificialanalysis.ai/evaluations/frontiercode-2-0) | [FrontierCode 1.1 Main](../../content/benchmarks/frontiercode-1-1-main.json)、[Extended](../../content/benchmarks/frontiercode-1-1-extended.json) | 同系列不同版本；未找到 2.0 独立条目。 |
| [HLE-Diamond](https://artificialanalysis.ai/evaluations/hle-diamond) | [HLE-Diamond](../../content/benchmarks/hle-diamond.json) | 同项。 |
| [AA-PersonalityBench](https://artificialanalysis.ai/evaluations/aa-personalitybench) | 未找到独立同名条目 | 不等于本站没有其他人格或写作评测。 |
| [AA-Omniscience v1.1](https://artificialanalysis.ai/evaluations/omniscience) | [AA-Omniscience](../../content/benchmarks/aa-omniscience.json) | 同项；本地另保留 v1.0 公开示例。 |
| [GPQA Diamond](https://artificialanalysis.ai/evaluations/gpqa-diamond) | [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | 同项；AA 有模型成绩，本站当前无结构化模型成绩表。 |
| [ITBench-AA](https://artificialanalysis.ai/evaluations/itbench-aa) | 未找到独立同名或原始评测条目 | 仅限当前本地目录。 |
| [MMMU-Pro](https://artificialanalysis.ai/evaluations/mmmu-pro) | [MMMU-Pro](../../content/benchmarks/mmmu-pro.json) | 同项。 |
| [IFBench](https://artificialanalysis.ai/evaluations/ifbench) | [IFBench](../../content/benchmarks/ifbench.json) | 同项；不应与 IFEval 合并。 |
| [MLCR-AA](https://artificialanalysis.ai/evaluations/mlcr-aa) | [MLCR-AA](../../content/benchmarks/mlcr-aa.json) | 同项。 |
| [Code2Video-AA](https://artificialanalysis.ai/evaluations/code2video-aa) | 未找到独立同名或原始评测条目 | 不等于本站没有其他视频评测。 |
| [HealthBench](https://artificialanalysis.ai/evaluations/healthbench) | [HealthBench](../../content/benchmarks/healthbench.json)、[Professional](../../content/benchmarks/healthbench-professional.json) | 同一链接下存在相关同项；**目录卡片描述原始 HealthBench，而详情默认标题为 Professional**，页面有两个版本切换按钮。本轮未点击核验两个视图，不能把两个集合视作相同。 |
| [CritPt v2](https://artificialanalysis.ai/evaluations/critpt-v2) | [CritPt](../../content/benchmarks/critpt.json) | 同系列不同版本；未找到 v2 独立条目。 |
| [VIALS-AA](https://artificialanalysis.ai/evaluations/vials-aa) | 未找到独立同名或原始评测条目 | 仅限当前本地目录。 |
| [GDPval-AA v2.1](https://artificialanalysis.ai/evaluations/gdpval-aa) | [GDPval-AA v2.1](../../content/benchmarks/gdpval-aa-v2-1.json)、[GDPval](../../content/benchmarks/gdpval.json) | 存在 AA 同项；原始数据集、不同 AA 版本须分开。 |
| [τ³-Banking](https://artificialanalysis.ai/evaluations/tau3-banking) | [τ³-Banking](../../content/benchmarks/tau3-banking.json) | 同项；具体评分修订仍须核对。 |
| [Terminal-Bench 2.1](https://artificialanalysis.ai/evaluations/terminalbench-2-1) | [Terminal-Bench 2.1](../../content/benchmarks/terminal-bench-2-1.json) | 同项；不同于 2.0。 |
| [FrontierCode 1.1](https://artificialanalysis.ai/evaluations/frontiercode) | [FrontierCode 1.1 Main](../../content/benchmarks/frontiercode-1-1-main.json) | 同一 Main 子集；AA 说明其 100 项，不等于整个 150 项系列。 |
| [AA-LCR v1.1](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning) | [AA-LCR v1.1](../../content/benchmarks/aa-lcr.json) | 同项。 |
| [SciCode](https://artificialanalysis.ai/evaluations/scicode) | [SciCode](../../content/benchmarks/scicode.json) | 同项；AA 当前标记 Under review，不能直接当成稳定结果。 |
| [Humanity's Last Exam](https://artificialanalysis.ai/evaluations/humanitys-last-exam) | [HLE](../../content/benchmarks/hle.json) | 同项；Diamond 是另一个条目。 |
| [CritPt](https://artificialanalysis.ai/evaluations/critpt) | [CritPt](../../content/benchmarks/critpt.json) | 同项；v2 单独分类。 |
| [Terminal-Bench Hard](https://artificialanalysis.ai/evaluations/terminalbench-hard) | [Terminal-Bench 2.0](../../content/benchmarks/terminal-bench-2.json) 等系列条目 | 仅同系列；未找到 Hard 独立条目，不能把名称前缀视为同一数据集。 |
| [τ²-Bench Telecom](https://artificialanalysis.ai/evaluations/tau2-bench) | [τ²-bench](../../content/benchmarks/tau2-bench.json) | 原始评测与具体 Telecom 域的关系；不能把其他领域成绩当成 Telecom。 |
| [MMLU-Pro](https://artificialanalysis.ai/evaluations/mmlu-pro) | [MMLU-Pro](../../content/benchmarks/mmlu-pro.json) | 同项。 |
| [LiveCodeBench](https://artificialanalysis.ai/evaluations/livecodebench) | [LiveCodeBench](../../content/benchmarks/livecodebench.json) | 同项；具体时间截取与版本需核对。 |
| [MATH-500](https://artificialanalysis.ai/evaluations/math-500) | [MATH-500](../../content/benchmarks/math-500.json) | 同项。 |
| [AIME 2025](https://artificialanalysis.ai/evaluations/aime-2025) | [AIME 2025](../../content/benchmarks/aime-2025.json) | 同项。 |
| [Global-MMLU-Lite](https://artificialanalysis.ai/evaluations/global-mmlu-lite) | [Global-MMLU](../../content/benchmarks/global-mmlu.json)、[AA 多语言指数](../../content/benchmarks/aa-multilingual-index.json) | Lite 与完整集及使用它的指数相关；本地未找到单独 Lite 评测条目，不将三个名称视作相同数据集。 |

## 本次对照说明什么

- 按上述口径，39 个 AA 目录链接中，26 个能关联到本站同名评测或明确子集，7 个仅能关联到系列、版本、具体领域或指数，6 个未找到本地独立同名/原始条目。HealthBench 同一 AA 链接涉及两个本地记录，但仍只计一个 AA 链接；分类只是人工快照，不代表运行协议相同或 33 项都可直接比较。
- AA 目录卡片与详情出现 HealthBench 版本描述差异，提醒采集时需要保留具体页面、子集和核查时间。AA 页面持续更新，这个例子可能随后被修正。
- [GDP.pdf 的 AA 详情](https://artificialanalysis.ai/evaluations/gdp-pdf)明确其文档输入、评委及执行框架与原作者不同；[AA Intelligence Index v5.0.1](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)有九项组成，本站同系列目前记录 v4.3.2。这些是影响比较的具体版本或协议差异，不代表其中任何成绩错误。
- 覆盖数量只能说明这张目录与本地资料库存在大量项目重叠；不能推出 26/318 是本站总体重合率，不能拿 39 个目录链接代表 AA 全部能力，也不能从数量推断用户留存或产品价值。

## 同页细节核查：GPQA 人类参考值与 GDP.pdf 样例

- 截至本次读取，[AA 的 GPQA Diamond 页](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)在介绍 198 道 Diamond 题目的句子中写专家 65%、非专家 34%。但[原始论文表 2](https://arxiv.org/html/2311.12022)将 64.8% 和 34.1% 列在 546 题的 **GPQA Extended**，而 198 题 Diamond 对应 81.3% 和 22.1%；表 5 对相同三组分别列 65.4%/33.9% 和 81.2%/21.9%，论文两表有细小差异，本次未复算其原因。因此不宜将 65%/34% 直接称为 Diamond 这 198 题的验证者统计；这里只核查 AA 页面表述，不能据此推断其模型跑分或其他页面有误。
- 上述 Diamond 验证者统计**同样不是可直接和当前模型成绩公平比较的人类水平**：论文按专家与非专家验证结果筛选 Diamond，明确提醒主集和 Diamond 的人类结果存在选择效应；原论文非专家可使用网络但禁止语言模型辅助。不同采样、资源及题目筛选不能忽略。
- 另一方面，[AA 的 GDP.pdf 页面](https://artificialanalysis.ai/evaluations/gdp-pdf)已展示五个代表任务入口；当前可读默认样例包括来源 PDF、一次模型提交、逐条裁判判定和理由，其中一条提交通过 10/11 条、但 All-pass 失败。本地 [GDP.pdf 条目](../../content/benchmarks/gdp-pdf.json)已有论文中的制造业任务概述和指标说明，但该案例不是同一道 AA 默认样题，也没有统一模型成绩表。此项说明官方案例与成绩展示已有较深功能，不能宣称“模型输出和评分细则”是本站独有；本轮未播放或逐项核验五个任务。

这组核查体现原始资料核对能揭示具体口径问题，但只有单个页面案例，不能据此判断 AA 整体准确度或证明用户会为本站回访。
