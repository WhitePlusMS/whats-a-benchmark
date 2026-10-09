# AIHOT 来源覆盖与分类优化核对

本页记录第一轮收录与分类阶段；后续[逐项内容、图标与真实样例深化](../reviews/2026-10-08-expansion-deep-audit.md)已更新为151条目、36样例/25个评测含站内样例、全部59新增项有标识。以下“未新增题面”等叙述属于第一轮当时的状态。

- 日期：2026-10-08。以本轮开始的当前工作树为基线，保留此前未提交的界面、引用和样例优化。
- 发现入口：[AIHOT 评测来源](https://aihot.news/leaderboard/sources)。页面核对时为 90 个来源与专项；该数量不是 90 个独立题集。
- 本地目录：92 → 151 个已发布条目，8 → 10 类能力；新增 59 个条目，0 草稿。
- 原有 27 条真实样例、18 个站内样例评测和 17 份模型发布资料保留；没有复制任何新增任务、答案、模型作品或媒体。
- 研究流程：GPT-6 LUNA 提取资料事实，主模型独立查证并决定收录与分类；之后对全部 59 个新条目完成独立本地内容审读及关键官方方法抽查。未调用网页端 GPT。

## 收录口径

1. 优先识别评测本体，再区分命名版本、真实子集、衍生协议与评测体系。机构名字或榜单展示切片不自动增加独立题库。
2. LiveBench 的总榜及四个展示分项对应同一个体系；它与 LiveCodeBench 不同。PRBench 保留母体系及 Finance/Legal 子集，Hard 是领域内部的包含关系。
3. APEX 原版保留 480 题；1.1 独立记录 240 题和环境/裁判修订。FrontierMath v2 分别记录 295 题 Tiers 1–3 与 43 题 Tier 4；系列条目保留历史快照。
4. Arena 的 Vision/WebDev/Creative Writing 是平台专项，与母平台建立关系；AA 多语言指数另行报告，不并入英文 Intelligence Index。
5. Novelcrafter NC Bench、svgbench.ai 与 Finbenchmark 均通过 AIHOT 实际外链回到第一方确认，未混用其它同名项目。
6. 90 个外部行均建立本体或版本对应；89 个来源名称可唯一精确识别。Mercor τ³-Banking 行仅对应上游任务，专属执行协议尚未独立核验，因此不加入 Mercor 别名、不另造衍生条目。

## 分类与数量

| 分类 ID | 当前名称 | 数量 | 选择依据 |
| --- | --- | ---: | --- |
| coding | 编程与软件工程 | 26 | 可运行程序开发、仓库修复与代码迁移 |
| reasoning | 数理与逻辑推理 | 17 | 数学、物理、逻辑与规则推理 |
| knowledge | 知识与专业问答 | 14 | 事实、专业知识及自然语言能力 |
| agents | Agent 与工具使用 | 21 | 通用浏览、终端、多工具和长程执行 |
| multimodal | 图像、文档与音视频 | 13 | 图像、文档、音频与视频任务 |
| context | 长文本与记忆 | 8 | 长文检索、跨文档推理与记忆 |
| alignment | 指令遵循与偏好 | 6 | 指令遵循、回答偏好和情绪交流 |
| work | 真实工作与专业任务 | 31 | 专业办公、业务、医疗和科学工作目标 |
| writing | 写作与设计 | 12 | 故事、脚本、创作辅助与设计作品 |
| general | 综合评测与指数 | 3 | 跨能力体系和综合指数 |

每条只保留一个主分类，其它能力、语言、行业和执行方式用现有 tags 补充。专业工作并不因为使用 Agent 而必归 agents；LHTB 因跨领域终端任务归 agents。中文/翻译与多编程语言分别表达。EQ-Bench 4 测情绪交流，归 alignment；长篇故事生成归 writing，长文问答归 context。

## 90 项外部来源逐项对应

下表的第一方地址来自本站条目登记的定义依据；完整任务、评分、访问与许可来源见对应 JSON。外部状态为 AIHOT 页面标签，不等于本站 published 状态或实际运行通过。

| # | 外部来源与专项 | AIHOT 状态 | 本站条目 | 对应方式 / 边界 | 第一定义依据 |
| ---: | --- | --- | --- | --- | --- |
| 1 | [Terminal-Bench 4.0 · AA](https://aihot.news/leaderboard/sources/artificial-analysis-terminal-bench) | 参与排名 | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://www.tbench.ai/news/terminal-bench-4-0) |
| 2 | [Terminal-Bench 4.0 · Vals](https://aihot.news/leaderboard/sources/vals-terminal-bench-4) | 参与排名 | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://www.tbench.ai/news/terminal-bench-4-0) |
| 3 | [LiveBench · 编程综合](https://aihot.news/leaderboard/sources/livebench-coding) | 参与排名 | [LiveBench](../../content/benchmarks/livebench.json) | 同一 LiveBench 体系的分项或总榜，不另造题库 | [官方来源](https://github.com/livebench/livebench) |
| 4 | [SciCode · AA](https://aihot.news/leaderboard/sources/artificial-analysis-scicode) | 参与排名 | [SciCode](../../content/benchmarks/scicode.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://github.com/scicode-bench/SciCode) |
| 5 | [Code Migration](https://aihot.news/leaderboard/sources/vals-migration) | 参与排名 | [Code Migration](../../content/benchmarks/code-migration.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/code-migration) |
| 6 | [ProgramBench](https://aihot.news/leaderboard/sources/vals-program) | 参与排名 | [ProgramBench](../../content/benchmarks/programbench.json) | 新增命名评测 / 专项 | [官方来源](https://programbench.com/) |
| 7 | [Vibe Code Bench v1.1](https://aihot.news/leaderboard/sources/vals-vibe-code) | 参与排名 | [Vibe Code Bench v1.1](../../content/benchmarks/vibe-code-bench-v1-1.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals-ai.com/benchmarks/vibe-code) |
| 8 | [Vibe Code Bench 1–100](https://aihot.news/leaderboard/sources/vals-vcb-1-100) | 参与排名 | [Vibe Code Bench 1–100](../../content/benchmarks/vibe-code-bench-1-100.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals-ai.com/benchmarks/vcb-1-100) |
| 9 | [CyberBench Patch v1.1](https://aihot.news/leaderboard/sources/vals-cyber-patch) | 参与排名 | [CyberBench Patch v1.1](../../content/benchmarks/cyberbench-patch-v1-1.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/cyber) |
| 10 | [DeepSWE v1.1](https://aihot.news/leaderboard/sources/deepswe-v1-1) | 观察中 | [DeepSWE v1.1](../../content/benchmarks/deep-swe-v1-1.json) | 保留既有本体 | [官方来源](https://github.com/datacurve-ai/deep-swe) |
| 11 | [MirrorCode](https://aihot.news/leaderboard/sources/epoch-mirrorcode) | 观察中 | [MirrorCode](../../content/benchmarks/mirrorcode.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/mirrorcode) |
| 12 | [TapTap Maker](https://aihot.news/leaderboard/sources/taptap-maker) | 仅供参考 | [TapTap Maker Benchmark](../../content/benchmarks/taptap-maker.json) | 新增命名评测 / 专项 | [官方来源](https://maker.taptap.cn/leaderboard/methodology.html) |
| 13 | [Terminal-Bench 4](https://aihot.news/leaderboard/sources/terminal-bench-4) | 仅供参考 | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 保留既有本体 | [官方来源](https://www.tbench.ai/news/terminal-bench-4-0) |
| 14 | [Hyper-τ-bench](https://aihot.news/leaderboard/sources/hyper-tau) | 观察中 | [τ^τ-bench (Hyper-τ)](../../content/benchmarks/hyper-tau-bench.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/sierra-research/hyper-tau-bench/blob/main/README.md) |
| 15 | [SWE-rebench](https://aihot.news/leaderboard/sources/swe-rebench) | 观察中 | [SWE-rebench](../../content/benchmarks/swe-rebench.json) | 新增命名评测 / 专项 | [官方来源](https://swe-rebench.com/about) |
| 16 | [LHTB](https://aihot.news/leaderboard/sources/lhtb) | 观察中 | [Long-Horizon Terminal-Bench (LHTB)](../../content/benchmarks/lhtb.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/zli12321/LHTB) |
| 17 | [FrontierCode](https://aihot.news/leaderboard/sources/frontiercode) | 观察中 | [FrontierCode 1.1 Main](../../content/benchmarks/frontiercode-1-1-main.json) | 当前收录 1.1 Main；Extended 不视为相同范围 | [官方来源](https://cognition.com/blog/frontier-code-1.1) |
| 18 | [FrontierSWE v2](https://aihot.news/leaderboard/sources/frontierswe-v2) | 观察中 | [FrontierSWE v2](../../content/benchmarks/frontierswe-v2.json) | 新增命名评测 / 专项 | [官方来源](https://www.frontierswe.com/blog/v2) |
| 19 | [WeirdML](https://aihot.news/leaderboard/sources/weirdml) | 观察中 | [WeirdML v2](../../content/benchmarks/weirdml-v2.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/weirdml) |
| 20 | [HLE · AA](https://aihot.news/leaderboard/sources/artificial-analysis-hle) | 参与排名 | [Humanity’s Last Exam](../../content/benchmarks/hle.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://arxiv.org/abs/2501.14249) |
| 21 | [FrontierMath v2 · Tiers 1–3](https://aihot.news/leaderboard/sources/epoch-frontiermath) | 参与排名 | [FrontierMath v2 · Tiers 1–3](../../content/benchmarks/frontiermath-v2-tiers-1-3.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2) |
| 22 | [LiveBench · 推理与数学](https://aihot.news/leaderboard/sources/livebench-reasoning) | 参与排名 | [LiveBench](../../content/benchmarks/livebench.json) | 同一 LiveBench 体系的分项或总榜，不另造题库 | [官方来源](https://github.com/livebench/livebench) |
| 23 | [CritPt · AA](https://aihot.news/leaderboard/sources/artificial-analysis-critpt) | 参与排名 | [CritPt](../../content/benchmarks/critpt.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://github.com/CritPt-Benchmark/CritPt) |
| 24 | [Chess Puzzles](https://aihot.news/leaderboard/sources/epoch-chess) | 参与排名 | [Chess Puzzles](../../content/benchmarks/chess-puzzles.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/chess-puzzles) |
| 25 | [Mystery Game Puzzles](https://aihot.news/leaderboard/sources/epoch-mystery) | 参与排名 | [Mystery Game Puzzles](../../content/benchmarks/mystery-game-puzzles.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/mystery-game-puzzles) |
| 26 | [MysteryMechanism](https://aihot.news/leaderboard/sources/vals-mysterymechanism) | 参与排名 | [MysteryMechanism](../../content/benchmarks/mysterymechanism.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/mysterymechanism) |
| 27 | [Terminal-Bench Science · Vals](https://aihot.news/leaderboard/sources/vals-terminal-bench-science) | 参与排名 | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://www.tbench.ai/news/terminal-bench-science-0-1) |
| 28 | [Terminal-Bench Science · AA](https://aihot.news/leaderboard/sources/artificial-analysis-terminal-bench-science) | 参与排名 | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://www.tbench.ai/news/terminal-bench-science-0-1) |
| 29 | [FrontierMath v2 · Tier 4](https://aihot.news/leaderboard/sources/epoch-frontiermath-tier4) | 仅供参考 | [FrontierMath v2 · Tier 4](../../content/benchmarks/frontiermath-v2-tier-4.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/frontiermath-tier-4-v2) |
| 30 | [Humanity’s Last Exam](https://aihot.news/leaderboard/sources/hle) | 观察中 | [Humanity’s Last Exam](../../content/benchmarks/hle.json) | 保留既有本体 | [官方来源](https://arxiv.org/abs/2501.14249) |
| 31 | [SimpleBench](https://aihot.news/leaderboard/sources/simplebench) | 观察中 | [SimpleBench](../../content/benchmarks/simplebench.json) | 新增命名评测 / 专项 | [官方来源](https://simple-bench.com/) |
| 32 | [MathArena · ArXivLean](https://aihot.news/leaderboard/sources/matharena-lean) | 观察中 | [ArXivLean](../../content/benchmarks/matharena-arxivlean.json) | 新增命名评测 / 专项 | [官方来源](https://matharena.ai/arxivlean/) |
| 33 | [MathArena · BrokenArXiv](https://aihot.news/leaderboard/sources/matharena-broken) | 观察中 | [BrokenArXiv](../../content/benchmarks/matharena-brokenarxiv.json) | 新增命名评测 / 专项 | [官方来源](https://matharena.ai/brokenarxiv/) |
| 34 | [MathArena · ArXivMath](https://aihot.news/leaderboard/sources/matharena-math) | 观察中 | [ArXivMath](../../content/benchmarks/matharena-arxivmath.json) | 新增命名评测 / 专项 | [官方来源](https://matharena.ai/arxivmath/) |
| 35 | [ARC-AGI-2](https://aihot.news/leaderboard/sources/arc-agi-2) | 观察中 | [ARC-AGI-2](../../content/benchmarks/arc-agi-2.json) | 保留既有本体 | [官方来源](https://arcprize.org/arc-agi/2#capability-test) |
| 36 | [ARC-AGI-3](https://aihot.news/leaderboard/sources/arc-agi-3) | 观察中 | [ARC-AGI-3](../../content/benchmarks/arc-agi-3.json) | 保留既有本体 | [官方来源](https://arcprize.org/arc-agi/3#what-is-arc-agi-3) |
| 37 | [GDPval-AA](https://aihot.news/leaderboard/sources/artificial-analysis-gdpval) | 参与排名 | [GDPval-AA](../../content/benchmarks/gdpval-aa.json) | 保留 GDPval-AA 家族；当前 v2.1 有独立关联条目 | [官方来源](https://artificialanalysis.ai/evaluations/gdpval-aa#L13-L23) |
| 38 | [AA-Briefcase](https://aihot.news/leaderboard/sources/artificial-analysis-briefcase) | 参与排名 | [AA-Briefcase v1.1](../../content/benchmarks/aa-briefcase.json) | 保留既有本体 | [官方来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 39 | [AutomationBench · AA](https://aihot.news/leaderboard/sources/artificial-analysis-automationbench) | 参与排名 | [AutomationBench-AA](../../content/benchmarks/automationbench-aa.json) | 既有本体；机构实施条件分别说明 | [官方来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 40 | [Vals Finance Agent](https://aihot.news/leaderboard/sources/vals-finance-agent) | 参与排名 | [Finance Agent](../../content/benchmarks/finance-agent.json) | 保留既有本体 | [官方来源](https://www.vals.ai/benchmarks/fabv2) |
| 41 | [APEX-Agents 1.1](https://aihot.news/leaderboard/sources/mercor-apex-agents) | 参与排名 | [APEX-Agents 1.1](../../content/benchmarks/apex-agents-1-1.json) | 新增命名评测 / 专项 | [官方来源](https://huggingface.co/datasets/mercor/apex-agents-v1.1) |
| 42 | [Harvey Legal Agent Benchmark](https://aihot.news/leaderboard/sources/vals-harvey-lab) | 参与排名 | [Harvey Legal Agent Benchmark (LAB)](../../content/benchmarks/harvey-lab.json) | 新增命名评测 / 专项 | [官方来源](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark) |
| 43 | [τ³-Banking · Mercor](https://aihot.news/leaderboard/sources/mercor-tau3-banking) | 参与排名 | [τ³-Banking](../../content/benchmarks/tau3-banking.json) | 上游任务已收录；Mercor 专属运行协议未核验 | [官方来源](https://arxiv.org/abs/2603.04370) |
| 44 | [LiveBench · 数据分析](https://aihot.news/leaderboard/sources/livebench-data-analysis) | 参与排名 | [LiveBench](../../content/benchmarks/livebench.json) | 同一 LiveBench 体系的分项或总榜，不另造题库 | [官方来源](https://github.com/livebench/livebench) |
| 45 | [MedCode](https://aihot.news/leaderboard/sources/vals-medcode) | 参与排名 | [MedCode](../../content/benchmarks/medcode.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/medcode) |
| 46 | [AA-Analyst Agent](https://aihot.news/leaderboard/sources/artificial-analysis-analyst-agent) | 参与排名 | [AA-AnalystAgent](../../content/benchmarks/aa-analyst-agent.json) | 新增命名评测 / 专项 | [官方来源](https://artificialanalysis.ai/evaluations/aa-analyst-agent) |
| 47 | [τ³-Banking](https://aihot.news/leaderboard/sources/tau-banking) | 观察中 | [τ³-Banking](../../content/benchmarks/tau3-banking.json) | 新增命名评测 / 专项 | [官方来源](https://arxiv.org/abs/2603.04370) |
| 48 | [AutomationBench](https://aihot.news/leaderboard/sources/zapier-automation) | 观察中 | [AutomationBench](../../content/benchmarks/automationbench.json) | 保留既有本体 | [官方来源](https://github.com/zapier/AutomationBench/blob/main/README.md#how-it-works) |
| 49 | [OfficeQA Pro](https://aihot.news/leaderboard/sources/officeqa-pro) | 观察中 | [OfficeQA Pro](../../content/benchmarks/officeqa-pro.json) | 保留既有本体 | [官方来源](https://huggingface.co/datasets/databricks/officeqa) |
| 50 | [MCP Atlas](https://aihot.news/leaderboard/sources/mcp-atlas) | 观察中 | [MCP-Atlas](../../content/benchmarks/mcp-atlas.json) | 保留既有本体 | [官方来源](https://arxiv.org/abs/2602.00933) |
| 51 | [FinanceBenchmark](https://aihot.news/leaderboard/sources/financebenchmark) | 观察中 | [FinanceBenchmark](../../content/benchmarks/finbenchmark.json) | 新增命名评测 / 专项 | [官方来源](https://finbenchmark.ai/methodology) |
| 52 | [PRBench · Legal](https://aihot.news/leaderboard/sources/prbench-legal) | 观察中 | [PRBench Legal](../../content/benchmarks/prbench-legal.json) | 新增命名评测 / 专项 | [官方来源](https://labs.scale.com/papers/prbench) |
| 53 | [PRBench · Finance](https://aihot.news/leaderboard/sources/prbench-finance) | 观察中 | [PRBench Finance](../../content/benchmarks/prbench-finance.json) | 新增命名评测 / 专项 | [官方来源](https://labs.scale.com/papers/prbench) |
| 54 | [SpreadsheetBench 2](https://aihot.news/leaderboard/sources/spreadsheetbench-2) | 观察中 | [SpreadsheetBench 2](../../content/benchmarks/spreadsheetbench-v2.json) | 新增命名评测 / 专项 | [官方来源](https://arxiv.org/html/2606.29955v1) |
| 55 | [Vending-Bench 2](https://aihot.news/leaderboard/sources/vending-bench-2) | 观察中 | [Vending-Bench 2](../../content/benchmarks/vending-bench-2.json) | 保留既有本体 | [官方来源](https://andonlabs.com/evals/vending-bench-2) |
| 56 | [EBR-bench](https://aihot.news/leaderboard/sources/epoch-ebr) | 仅供参考 | [Earthborne Rangers (EBR-bench)](../../content/benchmarks/ebr-bench.json) | 新增命名评测 / 专项 | [官方来源](https://epoch.ai/benchmarks/ebr-bench) |
| 57 | [Excel · EMB](https://aihot.news/leaderboard/sources/vals-excel) | 观察中 | [Excel Modeling Benchmark (EMB)](../../content/benchmarks/excel-emb.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/emb) |
| 58 | [Legal Research](https://aihot.news/leaderboard/sources/vals-legal) | 观察中 | [Legal Research Bench (Vals AI)](../../content/benchmarks/legal-research-vals.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/legal_research) |
| 59 | [TaxAgentBench](https://aihot.news/leaderboard/sources/vals-tax) | 观察中 | [Tax Agent Bench](../../content/benchmarks/tax-agent-bench.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/tax_agent_bench) |
| 60 | [MedScribe](https://aihot.news/leaderboard/sources/vals-medscribe) | 观察中 | [MedScribe](../../content/benchmarks/medscribe.json) | 新增命名评测 / 专项 | [官方来源](https://www.vals.ai/benchmarks/medscribe) |
| 61 | [BioMysteryBench](https://aihot.news/leaderboard/sources/vals-biomystery) | 观察中 | [BioMysteryBench](../../content/benchmarks/biomysterybench.json) | 新增命名评测 / 专项 | [官方来源](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench) |
| 62 | [Terminal-Bench Science](https://aihot.news/leaderboard/sources/terminal-science) | 观察中 | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 保留既有本体 | [官方来源](https://www.tbench.ai/news/terminal-bench-science-0-1) |
| 63 | [AA-Omniscience](https://aihot.news/leaderboard/sources/artificial-analysis-omniscience) | 参与排名 | [AA-Omniscience](../../content/benchmarks/aa-omniscience.json) | 保留既有本体 | [官方来源](https://artificialanalysis.ai/evaluations/omniscience) |
| 64 | [SimpleQA Verified](https://aihot.news/leaderboard/sources/epoch-simpleqa) | 参与排名 | [SimpleQA Verified](../../content/benchmarks/simpleqa-verified.json) | 新增命名评测 / 专项 | [官方来源](https://huggingface.co/datasets/google/simpleqa-verified) |
| 65 | [AA-LCR](https://aihot.news/leaderboard/sources/artificial-analysis-lcr) | 参与排名 | [AA-LCR v1.1](../../content/benchmarks/aa-lcr.json) | 保留既有本体 | [官方来源](https://huggingface.co/datasets/ArtificialAnalysis/AA-LCR) |
| 66 | [LiveBench · 语言与指令](https://aihot.news/leaderboard/sources/livebench-writing) | 参与排名 | [LiveBench](../../content/benchmarks/livebench.json) | 同一 LiveBench 体系的分项或总榜，不另造题库 | [官方来源](https://github.com/livebench/livebench) |
| 67 | [BullshitBench · 错误前提](https://aihot.news/leaderboard/sources/bullshitbench-v2) | 参与排名 | [BullshitBench v2](../../content/benchmarks/bullshitbench-v2.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/petergpt/bullshit-benchmark) |
| 68 | [MLCR-AA](https://aihot.news/leaderboard/sources/artificial-analysis-mlcr) | 参与排名 | [MLCR-AA](../../content/benchmarks/mlcr-aa.json) | 新增命名评测 / 专项 | [官方来源](https://artificialanalysis.ai/evaluations/mlcr-aa) |
| 69 | [GPQA Diamond](https://aihot.news/leaderboard/sources/epoch-gpqa) | 仅供参考 | [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | 保留既有本体 | [官方来源](https://huggingface.co/datasets/Idavidrein/gpqa) |
| 70 | [FACTS Parametric](https://aihot.news/leaderboard/sources/facts-parametric) | 观察中 | [FACTS Parametric](../../content/benchmarks/facts-parametric.json) | 新增命名评测 / 专项 | [官方来源](https://deepmind.google/blog/facts-benchmark-suite-systematically-evaluating-the-factuality-of-large-language-models/) |
| 71 | [Arena Text](https://aihot.news/leaderboard/sources/arena-text) | 参与排名 | [Chatbot Arena](../../content/benchmarks/arena.json) | 保留既有本体 | [官方来源](https://arena.ai/blog/arena#introduction) |
| 72 | [AA Index](https://aihot.news/leaderboard/sources/artificial-analysis) | 交叉参考 | [Artificial Analysis Intelligence Index](../../content/benchmarks/aa-intelligence-index.json) | 保留既有本体 | [官方来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 73 | [LiveBench](https://aihot.news/leaderboard/sources/livebench-general) | 交叉参考 | [LiveBench](../../content/benchmarks/livebench.json) | 同一 LiveBench 体系的分项或总榜，不另造题库 | [官方来源](https://github.com/livebench/livebench) |
| 74 | [Arena WebDev](https://aihot.news/leaderboard/sources/arena-webdev) | 仅供参考 | [Arena WebDev](../../content/benchmarks/arena-webdev.json) | 新增命名评测 / 专项 | [官方来源](https://arena.ai/blog/webdev-arena) |
| 75 | [Arena 创作盲选](https://aihot.news/leaderboard/sources/arena-creative-writing) | 仅供参考 | [Arena Creative Writing](../../content/benchmarks/arena-creative-writing.json) | 新增命名评测 / 专项 | [官方来源](https://arena.ai/leaderboard/text/creative-writing) |
| 76 | [Creative Writing v3](https://aihot.news/leaderboard/sources/eq-creative) | 仅供参考 | [Creative Writing v3](../../content/benchmarks/creative-writing-v3.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/EQ-bench/creative-writing-bench) |
| 77 | [Longform Writing](https://aihot.news/leaderboard/sources/eq-longform) | 仅供参考 | [Longform Writing](../../content/benchmarks/longform-writing.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/EQ-bench/longform-writing-bench) |
| 78 | [EQ-Bench 4 · 情绪与人际理解](https://aihot.news/leaderboard/sources/eq-emotional-v4) | 观察中 | [EQ-Bench 4](../../content/benchmarks/eq-bench-4.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/EQ-bench/eqbench4) |
| 79 | [Short-Story · 短篇小说](https://aihot.news/leaderboard/sources/lechmazur-short-story) | 观察中 | [Lech Mazur Short-Story](../../content/benchmarks/short-story.json) | 新增命名评测 / 专项 | [官方来源](https://github.com/lechmazur/writing) |
| 80 | [ToneBench · 文风与脚本](https://aihot.news/leaderboard/sources/tonebench-scripts) | 观察中 | [ToneBench](../../content/benchmarks/tonebench.json) | 新增命名评测 / 专项 | [官方来源](https://benchmark.towardsai.com/methodology.html) |
| 81 | [TubeLab · 视频脚本](https://aihot.news/leaderboard/sources/tubelab-scriptwriting) | 观察中 | [TubeLab Scriptwriting Benchmark](../../content/benchmarks/tubelab.json) | 新增命名评测 / 专项 | [官方来源](https://tubelab.net/benchmark/scriptwriting) |
| 82 | [NC Bench · 作家工作流](https://aihot.news/leaderboard/sources/ncbench-author-workflow) | 观察中 | [NC Bench](../../content/benchmarks/nc-bench.json) | 新增命名评测 / 专项 | [官方来源](https://www.nc-bench.com/about) |
| 83 | [Design Arena · 视觉设计](https://aihot.news/leaderboard/sources/design-arena-design) | 观察中 | [Design Arena](../../content/benchmarks/design-arena.json) | 新增命名评测 / 专项 | [官方来源](https://www.designarena.ai/about) |
| 84 | [OpenVibeEval · 网页作品](https://aihot.news/leaderboard/sources/openvibeeval-design) | 观察中 | [OpenVibeEval](../../content/benchmarks/openvibeeval.json) | 新增命名评测 / 专项 | [官方来源](https://openvibeeval.com/methodology/) |
| 85 | [SVGBench · 矢量图盲选](https://aihot.news/leaderboard/sources/svgbench-arena) | 观察中 | [svgbench.ai](../../content/benchmarks/svgbench.json) | 新增命名评测 / 专项 | [官方来源](https://svgbench.ai/) |
| 86 | [Rapidata SVG](https://aihot.news/leaderboard/sources/rapidata-svg) | 观察中 | [Rapidata SVG Generation](../../content/benchmarks/rapidata-svg.json) | 新增命名评测 / 专项 | [官方来源](https://huggingface.co/datasets/Rapidata/svg-benchmark) |
| 87 | [Arena Vision](https://aihot.news/leaderboard/sources/arena-vision) | 仅供参考 | [Arena Vision](../../content/benchmarks/arena-vision.json) | 新增命名评测 / 专项 | [官方来源](https://arena.ai/leaderboard/vision) |
| 88 | [Roboflow Vision Evals](https://aihot.news/leaderboard/sources/roboflow-vision) | 观察中 | [Roboflow Vision Evals](../../content/benchmarks/roboflow-vision-evals.json) | 新增命名评测 / 专项 | [官方来源](https://playground.roboflow.com/evals) |
| 89 | [AA 中文／多语言](https://aihot.news/leaderboard/sources/artificial-analysis-multilingual) | 观察中 | [Artificial Analysis Multilingual Index](../../content/benchmarks/aa-multilingual-index.json) | 新增命名评测 / 专项 | [官方来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| 90 | [RWS M-GATE](https://aihot.news/leaderboard/sources/rws-mgate) | 观察中 | [RWS M-GATE](../../content/benchmarks/rws-mgate.json) | 新增命名评测 / 专项 | [官方来源](https://arxiv.org/abs/2608.03803) |

## 新增文件清单

全部位于 content/benchmarks/；没有扩展生产 schema、新增依赖或新增一套版本兼容机制。

| 文件 | 名称 | 分类 | 类型 |
| --- | --- | --- | --- |
| [ebr-bench.json](../../content/benchmarks/ebr-bench.json) | Earthborne Rangers (EBR-bench) | Agent 与工具使用 | 独立评测 |
| [lhtb.json](../../content/benchmarks/lhtb.json) | Long-Horizon Terminal-Bench (LHTB) | Agent 与工具使用 | 独立评测 |
| [eq-bench-4.json](../../content/benchmarks/eq-bench-4.json) | EQ-Bench 4 | 指令遵循与偏好 | 独立评测 |
| [code-migration.json](../../content/benchmarks/code-migration.json) | Code Migration | 编程与软件工程 | 独立评测 |
| [cyberbench-patch-v1-1.json](../../content/benchmarks/cyberbench-patch-v1-1.json) | CyberBench Patch v1.1 | 编程与软件工程 | 评测子集 |
| [frontierswe-v2.json](../../content/benchmarks/frontierswe-v2.json) | FrontierSWE v2 | 编程与软件工程 | 独立评测 |
| [hyper-tau-bench.json](../../content/benchmarks/hyper-tau-bench.json) | τ^τ-bench (Hyper-τ) | 编程与软件工程 | 独立评测 |
| [mirrorcode.json](../../content/benchmarks/mirrorcode.json) | MirrorCode | 编程与软件工程 | 独立评测 |
| [programbench.json](../../content/benchmarks/programbench.json) | ProgramBench | 编程与软件工程 | 独立评测 |
| [swe-rebench.json](../../content/benchmarks/swe-rebench.json) | SWE-rebench | 编程与软件工程 | 独立评测 |
| [taptap-maker.json](../../content/benchmarks/taptap-maker.json) | TapTap Maker Benchmark | 编程与软件工程 | 独立评测 |
| [vibe-code-bench-1-100.json](../../content/benchmarks/vibe-code-bench-1-100.json) | Vibe Code Bench 1–100 | 编程与软件工程 | 衍生评测 |
| [vibe-code-bench-v1-1.json](../../content/benchmarks/vibe-code-bench-v1-1.json) | Vibe Code Bench v1.1 | 编程与软件工程 | 独立评测 |
| [weirdml-v2.json](../../content/benchmarks/weirdml-v2.json) | WeirdML v2 | 编程与软件工程 | 独立评测 |
| [mlcr-aa.json](../../content/benchmarks/mlcr-aa.json) | MLCR-AA | 长文本与记忆 | 衍生评测 |
| [aa-multilingual-index.json](../../content/benchmarks/aa-multilingual-index.json) | Artificial Analysis Multilingual Index | 综合评测与指数 | 评测体系 |
| [livebench.json](../../content/benchmarks/livebench.json) | LiveBench | 综合评测与指数 | 评测体系 |
| [bullshitbench-v2.json](../../content/benchmarks/bullshitbench-v2.json) | BullshitBench v2 | 知识与专业问答 | 独立评测 |
| [facts-parametric.json](../../content/benchmarks/facts-parametric.json) | FACTS Parametric | 知识与专业问答 | 评测子集 |
| [rws-mgate.json](../../content/benchmarks/rws-mgate.json) | RWS M-GATE | 知识与专业问答 | 独立评测 |
| [simpleqa-verified.json](../../content/benchmarks/simpleqa-verified.json) | SimpleQA Verified | 知识与专业问答 | 衍生评测 |
| [arena-vision.json](../../content/benchmarks/arena-vision.json) | Arena Vision | 图像、文档与音视频 | 评测子集 |
| [roboflow-vision-evals.json](../../content/benchmarks/roboflow-vision-evals.json) | Roboflow Vision Evals | 图像、文档与音视频 | 评测体系 |
| [chess-puzzles.json](../../content/benchmarks/chess-puzzles.json) | Chess Puzzles | 数理与逻辑推理 | 独立评测 |
| [frontiermath-v2-tier-4.json](../../content/benchmarks/frontiermath-v2-tier-4.json) | FrontierMath v2 · Tier 4 | 数理与逻辑推理 | 评测子集 |
| [frontiermath-v2-tiers-1-3.json](../../content/benchmarks/frontiermath-v2-tiers-1-3.json) | FrontierMath v2 · Tiers 1–3 | 数理与逻辑推理 | 评测子集 |
| [matharena-arxivlean.json](../../content/benchmarks/matharena-arxivlean.json) | ArXivLean | 数理与逻辑推理 | 独立评测 |
| [matharena-arxivmath.json](../../content/benchmarks/matharena-arxivmath.json) | ArXivMath | 数理与逻辑推理 | 独立评测 |
| [matharena-brokenarxiv.json](../../content/benchmarks/matharena-brokenarxiv.json) | BrokenArXiv | 数理与逻辑推理 | 独立评测 |
| [mystery-game-puzzles.json](../../content/benchmarks/mystery-game-puzzles.json) | Mystery Game Puzzles | 数理与逻辑推理 | 独立评测 |
| [mysterymechanism.json](../../content/benchmarks/mysterymechanism.json) | MysteryMechanism | 数理与逻辑推理 | 独立评测 |
| [simplebench.json](../../content/benchmarks/simplebench.json) | SimpleBench | 数理与逻辑推理 | 独立评测 |
| [aa-analyst-agent.json](../../content/benchmarks/aa-analyst-agent.json) | AA-AnalystAgent | 真实工作与专业任务 | 独立评测 |
| [apex-agents-1-1.json](../../content/benchmarks/apex-agents-1-1.json) | APEX-Agents 1.1 | 真实工作与专业任务 | 衍生评测 |
| [biomysterybench.json](../../content/benchmarks/biomysterybench.json) | BioMysteryBench | 真实工作与专业任务 | 独立评测 |
| [excel-emb.json](../../content/benchmarks/excel-emb.json) | Excel Modeling Benchmark (EMB) | 真实工作与专业任务 | 独立评测 |
| [finbenchmark.json](../../content/benchmarks/finbenchmark.json) | FinanceBenchmark | 真实工作与专业任务 | 独立评测 |
| [harvey-lab.json](../../content/benchmarks/harvey-lab.json) | Harvey Legal Agent Benchmark (LAB) | 真实工作与专业任务 | 独立评测 |
| [legal-research-vals.json](../../content/benchmarks/legal-research-vals.json) | Legal Research Bench (Vals AI) | 真实工作与专业任务 | 独立评测 |
| [medcode.json](../../content/benchmarks/medcode.json) | MedCode | 真实工作与专业任务 | 独立评测 |
| [medscribe.json](../../content/benchmarks/medscribe.json) | MedScribe | 真实工作与专业任务 | 独立评测 |
| [prbench.json](../../content/benchmarks/prbench.json) | PRBench | 真实工作与专业任务 | 评测体系 |
| [prbench-finance.json](../../content/benchmarks/prbench-finance.json) | PRBench Finance | 真实工作与专业任务 | 评测子集 |
| [prbench-legal.json](../../content/benchmarks/prbench-legal.json) | PRBench Legal | 真实工作与专业任务 | 评测子集 |
| [spreadsheetbench-v2.json](../../content/benchmarks/spreadsheetbench-v2.json) | SpreadsheetBench 2 | 真实工作与专业任务 | 独立评测 |
| [tau3-banking.json](../../content/benchmarks/tau3-banking.json) | τ³-Banking | 真实工作与专业任务 | 衍生评测 |
| [tax-agent-bench.json](../../content/benchmarks/tax-agent-bench.json) | Tax Agent Bench | 真实工作与专业任务 | 独立评测 |
| [arena-creative-writing.json](../../content/benchmarks/arena-creative-writing.json) | Arena Creative Writing | 写作与设计 | 评测子集 |
| [arena-webdev.json](../../content/benchmarks/arena-webdev.json) | Arena WebDev | 写作与设计 | 评测子集 |
| [creative-writing-v3.json](../../content/benchmarks/creative-writing-v3.json) | Creative Writing v3 | 写作与设计 | 独立评测 |
| [design-arena.json](../../content/benchmarks/design-arena.json) | Design Arena | 写作与设计 | 评测体系 |
| [longform-writing.json](../../content/benchmarks/longform-writing.json) | Longform Writing | 写作与设计 | 独立评测 |
| [nc-bench.json](../../content/benchmarks/nc-bench.json) | NC Bench | 写作与设计 | 评测体系 |
| [openvibeeval.json](../../content/benchmarks/openvibeeval.json) | OpenVibeEval | 写作与设计 | 评测体系 |
| [rapidata-svg.json](../../content/benchmarks/rapidata-svg.json) | Rapidata SVG Generation | 写作与设计 | 独立评测 |
| [short-story.json](../../content/benchmarks/short-story.json) | Lech Mazur Short-Story | 写作与设计 | 独立评测 |
| [svgbench.json](../../content/benchmarks/svgbench.json) | svgbench.ai | 写作与设计 | 独立评测 |
| [tonebench.json](../../content/benchmarks/tonebench.json) | ToneBench | 写作与设计 | 独立评测 |
| [tubelab.json](../../content/benchmarks/tubelab.json) | TubeLab Scriptwriting Benchmark | 写作与设计 | 独立评测 |

## 既有文件调整

- 15 个既有条目发生编辑：`aa-intelligence-index.json`、`apex-agents.json`、`arena.json`、`automationbench-aa.json`、`automationbench.json`、`critpt.json`、`finance-agent.json`、`frontiercode-1-1-main.json`、`frontiermath.json`、`hle.json`、`scicode.json`、`simpleqa.json`、`tau2-bench.json`、`terminal-bench-4.json`、`terminal-bench-science-0-1.json`。修改范围为主分类、来源名称别名、版本边界、关系、少量定义/指标与许可文案；原有 sampleSet 的序列化哈希全部一致。
- content/categories.json 新增 writing/general，补充数理、多模态与交流偏好含义；复用既有 glyph，无图标组件或类型枚举改造。
- CONTEXT.md 和 docs/CONTENT_MAINTENANCE.md 明确主分类、标签与综合指数术语，区分本体、版本与运行协议。
- src/views/GuideView.vue 复用既有结构，任务入口 4 → 6、案例 10 → 12，补 LiveBench 与创作评审入口；README 两种语言更新快照与本记录链接。
- UPDATE_LOG.md 记录本轮文件范围、原因、影响与实际验证；历史设计与验收快照保持原日期，不冒充当前数量。

## 官方方法复核中的校正

- Code Migration：40 个源仓库等权，CLI 30 个仓库 × 4 种目标语言为 120 项迁移任务；CLI/COBOL 在 Overall 中为 75%/25%。[Vals 方法](https://www.vals.ai/benchmarks/code-migration)
- SpreadsheetBench 2：Modif. 在 297 项编辑任务计算；Overall Acc. 汇总 321 项，24 项可视化按 rubric 比例计分。移除未经 V2 文档支持的 70% 门槛，采用 V2 论文与仓库依据。[V2 论文](https://arxiv.org/abs/2606.29955)、[官方仓库](https://github.com/RUCKBReasoning/SpreadsheetBench-2)
- M-GATE：语法主指标为 MCC、并列 F1；Yes/No 解析失败的裁判只归一化标签。语法成绩只在同语言内比较；翻译与 tokenizer 效率分开。[作者论文](https://arxiv.org/html/2608.03803v1)
- APEX：CC BY 4.0、evaluation-only、禁止训练和抓取以及 gated 文件访问同时说明；reusePolicy 使用 restricted，本站不复制任务资产不写成官方全面禁止转载。[1.1 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1)
- PRBench：19,356 明确属于首发项目/论文统计，当前 HF 卡 18,692 另列；不推断差异原因或冒充逐行重算。[项目说明](https://labs.scale.com/papers/prbench)、[数据卡](https://huggingface.co/datasets/ScaleAI/PRBench)
- FinanceBenchmark 的官方 Pass@1 为三次尝试至少一次成功，不能当作通常的单次成功率。Harvey、BioMysteryBench、MathArena 和 WeirdML 各自固定说明版本与规模/运行条件。
- 发布方与复测方分开：WeirdML 的 Epoch 运行协议放在方法说明，publisher 保留作者；FinanceBenchmark 按项目登记，删除先前未核实的个人姓名。

## 验证结果与范围

- 严格 TypeScript：实施与修订批次 vue-tsc --noEmit 通过。
- 公开数据生成：151 public entries，0 drafts；内容校验 151 条目 / 27 样例 / 17 报告通过。
- 既有全套测试 43/43 通过；新增来源别名后再跑搜索/分类专项 12/12 通过。
- 实际 recognizeNames 审计：89/89 应精确识别的名称唯一命中；Mercor 行明确保留协议未核验；全库没有跨条目归一化精确名称冲突。[本地审计数据](../../artifacts/2026-10-08-aihot-source-audit.json)
- 对原始 92 条的 sampleSet 哈希逐项比较，没有变化；本次新增条目均没有 sampleSet。
- 浏览器在 1365×900 与 390×844 实开 78 个路径（59 个新详情、15 个调整后的旧详情、首页/两个新分类筛选/指南），共 156 个视图；标题、目录计数、指南 6 入口/12 案例、内部锚点与整页横向溢出检查通过，无捕获的运行异常。截图已逐张人工查看。[浏览器审计数据](../../artifacts/2026-10-08-aihot-browser-validation.json)
- 补充实开 LiveBench / Creative Writing v3 / AA Intelligence Index 的桌面和手机对比表，三个项目均正确显示；手机展开筛选后显示全部 10 类加“全部评测”，没有整页溢出。[对比与手机筛选数据](../../artifacts/2026-10-08-aihot-extra-ui-validation.json)
- 首次浏览器自动审计等待后台帧回调超时；改用实际 DOM 状态后完整重跑，最终结果以上述 156 个成功视图为准，不使用最初空记录作为通过证据。
- 验收复用本轮开始前已运行的项目 Vite；按项目约束，收尾停止该服务，不新启服务。
- 未运行生产构建、真实 benchmark、受控任务下载、所有外链存活检测或线上验收；未提交、推送、部署。
