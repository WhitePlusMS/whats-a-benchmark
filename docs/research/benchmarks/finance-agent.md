# Finance Agent

核验日期：2026-09-23。

## 官方身份

Finance Agent 是 Vals AI 发布的金融分析 agent benchmark。Vals 当前页面标为 **Finance Agent v2**；它承接 v1.1，评估模型围绕上市公司公开文件完成金融分析师工作。Anthropic 报告中的同名分数属于其引用的 Vals AI 评测，不是 Anthropic 自建 benchmark。[Vals AI 当前基准页](https://www.vals.ai/benchmarks/fabv2)；[Anthropic 系统卡对 benchmark 来源的说明](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf)

## 官方定义与忠实中文概述

官方将 v2 定义为衡量模型是否能完成入门级财务分析师工作：从公司 filings 等来源研究信息，完成需要准确数字、行业惯例和多步骤分析的问题。九类任务覆盖定性与定量分析、市场分析、可比公司、先例交易、会计调整、财报分析、披露分析和财务建模。[Vals AI 基准页：背景、方法与 taxonomy](https://www.vals.ai/benchmarks/fabv2)

需要区分名称相近的两个口径：2025 年论文记录的是初始 Finance Agent Benchmark（537 道专家编写题）；Vals 当前页面为 v2（927 道题），其页面称基于 v1.1 扩展。不能把论文初版的题量或旧模型分数移作 v2 事实。[初版论文](https://arxiv.org/abs/2508.00828)；[Vals AI v2](https://www.vals.ai/benchmarks/fabv2)

## 任务输入/输出/环境

- 输入：关于公司、财务报表、SEC filings 及相关金融分析的问题；任务需由 agent 进行检索和跨文件分析。
- 工具：Vals 公布的 v2 默认 harness 提供 SEC EDGAR 搜索、网页搜索、网页解析、已取回材料检索、计算器及历史价格查询；每题时限为两小时。[Vals AI 方法说明](https://www.vals.ai/benchmarks/fabv2)
- 输出：自然语言分析答复；每题按加权 rubric checks 评分，另报告严格的 All-Pass 指标。公开代码仓库是评测 harness/agent 代码，不意味着其所有私有题目和 rubric 都公开。[Vals AI v2 仓库](https://github.com/vals-ai/finance-agent-v2)

## 数据规模/split/字段/文件

- **v2：**官方称共 927 道专家审核题：27 条公开样例、450 条可申请许可的私有验证题、450 条私有测试题。官方结果页面只基于 Test split，旨在避免对公开或验证题过拟合。[Vals AI v2：Dataset](https://www.vals.ai/benchmarks/fabv2)
- 九类分析任务如上；官方示例字段为问题文本及其评分检查项，公开仓库提供 `data/public.csv`、`data/public.txt`。不据少量公开文件推断私有 split 的完整字段结构。[v2 官方仓库](https://github.com/vals-ai/finance-agent-v2/tree/main/data)
- **初版论文口径：**537 道题。该数字属于 2025 年论文描述的初版，不能与 v2 的 927 道相加或互换。[初版论文](https://arxiv.org/abs/2508.00828)

## 访问状态

v2 的 harness 代码和 27 条公开样例可浏览；Vals 平台需要申请并获批，运行平台需账户、测试套件 ID 及对应模型/检索工具凭据。Private Validation 需向 Vals 申请许可，Test split 保持私有。[Vals AI v2 数据页](https://www.vals.ai/benchmarks/fabv2)；[官方仓库运行说明](https://github.com/vals-ai/finance-agent-v2)

## 数据/代码/媒体许可与使用边界

- v2 GitHub 仓库有 MIT LICENSE，但文件没有单独说明 `data/public.*` 是否属于许可覆盖范围，也没有为题目、rubric、答案或第三方材料列出不同的数据许可。[官方 LICENSE](https://github.com/vals-ai/finance-agent-v2/blob/main/LICENSE)
- Vals 将 benchmark 标为 proprietary，并把公开题集与许可验证题、私有测试题分开。由于仓库许可证对数据文件的具体适用范围未明，不能仅凭代码仓库 MIT 标记推断本站有权复制公开样例。SEC filings、图表或网页媒体亦不能因用于任务而推定获得转载权。[Vals AI 基准页](https://www.vals.ai/benchmarks/fabv2)
- 当前 GitHub 仓库公开题可用于其文档所列的评测运行方式；若要把题面或答案公开嵌入 BenchAtlas，应先取得覆盖数据的明确许可。公开任务示例优先外链至 Vals/GitHub。

## 官方样例与是否可在公开 GitHub Pages 转载

Vals 页面展示示例问答，官方仓库提供 27 条 public samples。由于数据许可未与 MIT 代码许可分开明确，**可链接，不复制原题、rubric、标准答案或示例输出**。可由 BenchAtlas 自行撰写不含原题内容的简介，并标明 Finance Agent v2、Vals AI 和官方入口。[Vals AI 示例与数据划分](https://www.vals.ai/benchmarks/fabv2)；[官方仓库公开数据目录](https://github.com/vals-ai/finance-agent-v2/tree/main/data)

## 指标

- v2 的主指标为 **Partial Credit accuracy**：dealbreaker（决定答案是否合格的关键事实/数字）任一失败即该题零分；其余已通过的加权检查按严重度给部分分。第二指标 **All-Pass** 仅在该题所有检查通过时计 100%，否则为 0%。每个模型跑三次，公布均值与标准误。[Vals AI v2 方法说明](https://www.vals.ai/benchmarks/fabv2)
- v1.1 的逐题评分方式与 v2 不同；版本和指标名必须随分数一起记录。模型供应商报告的分数应标注由谁执行、用哪个版本和设置；benchmark 定义以 Vals 说明为准。

## 版本关系

当前条目记录 **Finance Agent v2**。官方说明 v2 基于 v1.1，扩大并重组题集，加入 dealbreaker-gated 部分评分、更严格数值容差、计算器与价格历史工具以及三次运行聚合。v1.1、v2 和论文初版 537 题是不同数据/协议快照；单写“Finance Agent”不足以识别成绩。[Vals AI v2 的 Changes from v1.1](https://www.vals.ai/benchmarks/fabv2)；[初版论文](https://arxiv.org/abs/2508.00828)

## 官方来源按角色分组

- **benchmark 发布方、当前定义/方法/结果：**[Vals AI Finance Agent v2](https://www.vals.ai/benchmarks/fabv2)。
- **评测代码与公开题目录：**[Vals AI 官方 GitHub 仓库](https://github.com/vals-ai/finance-agent-v2)，代码许可见[仓库 LICENSE](https://github.com/vals-ai/finance-agent-v2/blob/main/LICENSE)。
- **初版方法论文（历史版本）：**[Finance Agent Benchmark, arXiv:2508.00828](https://arxiv.org/abs/2508.00828)。
- **模型供应商引用示例：**[Anthropic Claude Opus 4.6 system card](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf)，明确标记 Finance Agent 为 Vals AI 外部 benchmark，并说明其表中评测由 Vals 执行。

## 模型发布引用

Anthropic 系统卡的历史 Finance Agent 结果是供应商发布资料引用的 Vals AI 评测，并非该 system card 自己定义 benchmark 或直接给出可复现实验材料。当前 v2 leaderboard 与这些旧报告须分别标版本；如摘录某一模型分数，应以 Vals 当前 leaderboard 作为结果源，并把厂商发布只作为发布方的二次引用记录。[Anthropic system card](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf)；[Vals AI leaderboard](https://www.vals.ai/benchmarks/fabv2)

## 未核实项

- 初版论文、v1.1、v2 的每个题目之间是否存在复用/替换映射，官方当前页面未给出逐题 crosswalk。
- 公开样例数据、答案/rubric 的独立许可未核实；MIT 文本仅作为代码许可记录。
- 平台当前的访问审批条件、许可费用及具体 test-suite 供应方式可能变化，应由 Vals 确认。

## 研究结论

**PASS_WITH_LIMITATIONS**：发布方、当前 v2 定义、任务结构、27/450/450 的 split、访问方式和评分协议均有 Vals 第一方来源。题目数据许可与可公开转载权限没有由代码 MIT 许可证覆盖；本站仅链接官方样例，不复制题面或评分材料。
