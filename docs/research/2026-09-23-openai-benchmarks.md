# OpenAI 评测资料核查（2026-09-23）

本轮核对了 OpenAI 三份官方模型发布材料，并将有可追溯基准方资料的新增评测整理为候选条目。文件分别为 `artifacts/candidates/openai-benchmarks.json` 与 `artifacts/candidates/openai-releases.json`。每份报告只记录明确纳入的条目，不声称覆盖报告中所有评测。

## 核对的官方模型报告

| 报告 | 原始发布日期 | 本次抽取范围与代表性结果 | 核对边界 |
|---|---|---|---|
| [GPT-5.4](https://openai.com/index/introducing-gpt-5-4/) | 2026-03-05 | 职业、编码、电脑与视觉、工具、学术及长上下文等评测表；OfficeQA 68.1%，GDPval 83.0%，SWE-Bench Pro 57.7%，BrowseComp 82.7%，ARC-AGI-2 Verified 73.3%。 | OfficeQA 表项没有写明变体；Databricks 当前仓库称已发布结果均为 OfficeQA Pro，故候选按 Pro 记录并保留口径注记。报告结果须与 benchmark 原始题集版本及 harness 分开理解。 |
| [GPT-5.6](https://openai.com/index/gpt-5-6/) | 2026-07-09 | Agents’ Last Exam、浏览器/电脑操作、网络安全、生命科学与化学等。ALE 为 53.6 Score；GeneBench Pro 高推理 GPT-5.6 Sol pass rate 为 28.7%，Pro mode 为 31.5%；LifeSciBench 为 59.9%。 | ALE 官方定义明确区分 Pass Rate 与 Score，也提供 Best-per-task 视图。OpenAI 报告中的 53.6 不能写成通过率。GeneBench-Pro 的 31.5% 带 Pro mode 设置。 |
| [GPT-6 Astra](https://openai.com/index/gpt-6-astra/) | 2026-09-03（由 [OpenAI 安全概览](https://openai.com/index/safety-overview-gpt-6-astra/)核实） | 职业、电脑/网页操作、科学健康、编码、安全及抽象推理。候选相关结果：BenchCAD 95.9%；ARC-AGI-3 99.9%；HealthBench Professional（length-adjusted）63.4%；GeneBench Pro 37.1%；LifeSciBench 60.3%；发布页另称 Mind2Web 任务完成约快 1.9 倍，但未注明该项版本，因此不与原始 Mind2Web 候选关联。 | ARC-AGI-3 99.9% 使用 OpenAI Responses API harness，报告称改变两项设置；Mind2Web 数值是任务耗时相对 GPT-5.6 Sol 的加速倍数，不是成功率。GPT-6 页面其他表项、分项与脚注没有全部录入候选条目。 |

以上均是 OpenAI 自己报告模型表现的发布页，不因此将其中第三方基准误记为 OpenAI 发布。逐条基准候选按原作者/组织记录 publisher；OpenAI 仅在自身开发的科学基准条目中列为 publisher。

## 本轮候选与证据

| 候选 | 基准实际发布方 | 任务、格式和指标要点 | 数据/许可状态与关键限制 | OpenAI 报告对应 |
|---|---|---|---|---|
| Agents’ Last Exam | UC Berkeley RDI | 职业真实工作流代理任务；官方分别列 Pass Rate（满分运行比例）与 Score（平均部分分），另有 ALE-V1 多个 split。 | 官方说明数据 CC BY 4.0、代码 Apache-2.0；榜单含 agent harness、推理力度及 Best-per-task 等配置，比较时必须记全。 | GPT-5.6；官方报告 53.6 是 Score。 |
| BenchCAD | BenchCAD 作者团队 | 17,900 个程序化 CAD 零件、106 个工业零件族；多视图到 CadQuery、程序编辑和问答，按执行几何 IoU 或比例准确率计分。 | 作者仓库称数据公开 CC BY 4.0、代码 MIT；各任务指标不同。OpenAI GPT-6 报告没充分给出 split、工具和聚合方案，95.9% 不应直接与作者榜单作无条件等价比较。 | GPT-6 Astra。 |
| ARC-AGI-3 | ARC Prize Foundation | 交互环境中的探索、规则学习与长程适应；RHAE 将动作效率与人类基准比较后按环境汇总。 | 官方提供 Public Game Set、SDK 与回放；比赛/私有测集须与公共集分开。OpenAI 使用自定义 Responses API harness 的 99.9% 不应当作标准 harness 分数。 | GPT-6 Astra。 |
| OfficeQA Pro | Databricks | 133 个困难问题，针对 1939–2025 年美国 Treasury Bulletin，要求检索并组合文档中的数字、表格和叙述证据。原始 OfficeQA 于 2025 年发布；Pro 变体属于 2026 年版本。 | 题目与答案在 Hugging Face 需申请访问，故标为 unknown；题集 CC BY-SA 4.0、代码 Apache 2.0。Pro、Full 与不同语料的 Pro V2 不能合并排名。OpenAI GPT-5.4 表格只写 OfficeQA，Databricks 当前仓库说明已发表模型结果均为 Pro。 | GPT-5.4，68.1%。 |
| HealthBench Professional | OpenAI 与临床医生 | 525 个医生撰写的临床任务，覆盖咨询、写作/文档和医学研究；单轮或多轮对话，以逐例医生 rubric 评分。 | 论文称数据可从 OpenAI 公共地址获取；本轮没有找到明确适用于 Professional 版本的禁止转载要求，也没有核实再发布许可，因此不附样例。模型分数受 grader、长度调整与是否 unclipped 影响。它是原版 HealthBench 的衍生版本，不能与 HealthBench / Hard 混为一个版本。 | GPT-6 Astra，63.4% length-adjusted；其页脚说明独立复测其他厂商时使用 GPT-5.4 grader 及长度调整。 |
| GeneBench-Pro | OpenAI | 129 个合成计算生物学分析问题；代理在隔离工作区使用数据与基础生物信息工具，确定性地与已知数据生成目标核对。 | 官方只公开 10 道代表题；完整 benchmark 并未公开，故将完整集标为 private。官方说明开发中使用 GPT 模型评审和强化题目，并提示潜在 GPT 偏置。GPT-6 Astra 脚注指明版本 v13。 | GPT-5.6、GPT-6 Astra。 |
| LifeSciBench | OpenAI 与生命科学专家 | 750 个专家撰写任务、七类工作流、七个生物领域；1,062 个附件、19,020 条 rubric criteria，覆盖科研证据、分析、设计、验证、转化和沟通。 | 官方介绍与论文入口可核实任务定义；这次未确认完整数据的许可/访问状态，所以标为 unknown 且不附题样。OpenAI Astra 脚注指明 Gold v1；跨版分数须再查论文细节。 | GPT-5.6、GPT-6 Astra。 |
| Mind2Web | Ohio State University Mind2Web 研究团队 | 2,000+ 个跨 137 网站、31 领域任务，提供 HTML 状态、自然语言任务与动作轨迹；可评估动作预测或代理执行。 | 作者公开训练数据；测试 split 单独下载并要求不得再分发解压内容。作者说明论文使用 macro-average accuracy，micro-average 会因步骤数偏置。在线网站变化使离线动作预测不等于当前网页端到端成功。 | GPT-6 Astra 报告提及 Mind2Web 任务完成约快 1.9x，但未注明 Mind2Web 版本；因此不将该结果关联到原始 Mind2Web 条目。 |

官方证据：

- ALE： [排行榜与指标/split](https://agents-last-exam.org/leaderboard)、[UC Berkeley RDI 介绍](https://agents-last-exam.org/blogs/job-ready-agents)。
- BenchCAD： [作者仓库和评分器](https://github.com/BenchCAD/BenchCAD-main)、[官方排行榜](https://github.com/BenchCAD/BenchCAD-main/blob/main/LEADERBOARD.md)。
- ARC-AGI-3： [ARC Prize 基准主页](https://arcprize.org/arc-agi/3)、[技术报告](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf)。
- OfficeQA： [Databricks 官方仓库](https://github.com/databricks/officeqa)、[技术报告](https://arxiv.org/abs/2603.08655)。
- HealthBench Professional： [OpenAI 论文 PDF](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)。论文说明最终 525 例从 15,079 个候选中按难度、质量与代表性抽取，并给出数据地址。 
- GeneBench-Pro： [OpenAI 官方发布与评分说明](https://openai.com/index/introducing-genebench-pro)、[官方案例入口](https://openai.com/index/genebench-pro/case-studies/)。
- LifeSciBench： [OpenAI 官方发布与论文入口](https://openai.com/index/introducing-life-sci-bench)。
- Mind2Web： [作者仓库、划分和指标说明](https://github.com/OSU-NLP-Group/Mind2Web)、[项目主页](https://osu-nlp-group.github.io/Mind2Web/)。

## 已看到但未作为本轮候选的报告项目

GPT-6 Astra 发布页还列有 OpenScore String Quartets、AutomationBench、Terminal-Bench Science 0.1、Terminal-Bench 4.0、FrontierCode 1.1、OSWorld 2.0、GDPval-AA v2、内部 Design/Data Science Tasks、MedChemBench（Internal）、SRE-Bench、ExploitBench、ExploitGym、ExploitBench（June–August 2026）和 SEC-Bench Pro。其中可按报告明确版本关联的条目为：Terminal-Bench 4.0 → `terminal-bench-4`；Terminal-Bench Science 0.1 → `terminal-bench-science-0-1`；OSWorld 2.0（v2026.08.08，offline set，partial score）→ `osworld-2`；FrontierCode 1.1 Main → `frontiercode-1-1-main`。AutomationBench 在报告中未标版本，故不关联到具体版本候选。该报告还单列 FrontierCode 1.1 Extended，不能与 Main 混并。FrontierMath Tier 4 (v2) 与本项目已有 FrontierMath 的版本对应仍需另核；OpenScore String Quartets 需区分原始语料与 OMR 评测。GPT-5.6 页的 GDPval-AA v2 不得错误挂到 `gdpval-aa-v2-1`（v2.1）。以上名称出现在 OpenAI 报告中，不代表 OpenAI 是它们的基准发布方。

年份与开放状态按具体版本填写：OfficeQA Pro 记录为 2026 年，原始 OfficeQA 为 2025 年；OfficeQA 题目申请访问但不因 gated 标成禁止转载。HealthBench Professional 有公开数据包，本轮未推断其适用 HealthBench 原版的转载要求，也未收录例题。GeneBench-Pro 只开放代表题，完整集未公开。LifeSciBench 的完整数据访问和许可仍待确认。
