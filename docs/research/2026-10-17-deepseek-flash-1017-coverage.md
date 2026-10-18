# DeepSeek-V4.1-Flash-1017 基准表覆盖核查

核查日期：2026-10-17
范围：DeepSeek 官方模型卡与更新日志；Zapier、Artificial Analysis、Mercor 的官方基准资料；本地现有条目与研究流程。本文只记录来源明确支持的事实，不据名称接近或分数相近合并基准。

## 官方报告与版本

DeepSeek 官方更新日志将发布日标为 **2026-10-17**，称网页端与 App 已更新至 `DeepSeek-V4.1-Flash-1017`。官方 Hugging Face 模型仓库 API 记录 `lastModified=2026-10-17T05:46:55Z`，发布提交为 `1bae0e1088993b9b82de08f59de5be5a34e42170`。因此本次固定引用该提交的 [不可变 README](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/1bae0e1088993b9b82de08f59de5be5a34e42170/README.md)；模型卡同一表也见[可浏览页面](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)。

DeepSeek 2026-10-17 更新日志列出 11 行分数；模型卡表头列为 DS-V4.1-Flash-1017、DS-V4.1-Flash、K3、GLM-5.3、GPT-5.6 Sol、Opus 5。原表值如下，未转换为百分数：

| 官方表名                 | DS-V4.1-Flash-1017 | DS-V4.1-Flash |   K3 | GLM-5.3 | GPT-5.6 Sol | Opus 5 |
| ------------------------ | -----------------: | ------------: | ---: | ------: | ----------: | -----: |
| HLE w/o tools            |       42.6 (44.0†) |  36.8 (39.1†) | 43.5 |   42.0† |        44.5 |   56.3 |
| Terminal-Bench 4.0       |               42.3 |          31.2 | 12.6 |    37.9 |        39.9 |   51.8 |
| DeepSWE v1.1             |               77.0 |          74.2 | 67.5 |    66.9 |        73.0 |   74.0 |
| ProgramBench             |               29.1 |          20.3 | 17.5 |    19.0 |        23.0 |   37.0 |
| NL2Repo-Bench            |               68.2 |          65.4 | 58.0 |    58.0 |        56.8 |   75.3 |
| Automation-Bench v1.0.6  |               60.5 |          54.8 | 46.7 |    48.8 |        45.8 |   50.3 |
| Agents’ Last Exam        |               35.4 |          31.8 | 27.6 |    28.5 |        26.7 |   28.6 |
| Apex Bench v1.1          |               72.1 |          64.6 | 47.8 |    56.6 |        54.3 |   65.8 |
| Chartography (w/tools)   |               83.0 |          78.9 | 68.1 |       — |        79.9 |   84.0 |
| BabyVision (w/tools)     |               92.5 |          89.6 | 85.7 |       — |        88.9 |   94.1 |
| ZeroBench-main (w/tools) |               51.0 |          49.0 | 41.0 |       — |        53.0 |   52.0 |

官方脚注仅说明：`†` 是 HLE 的 text-only 子集；Terminal-Bench 4.0 使用 Claude Code harness；DeepSWE v1.1 使用 Mini-SWE-V2 harness。10 月 17 日更新日志另称 ZeroBench-main 使用 Pass@5。没有把这些脚注扩展到其他行。模型 README 的 Benchmark 表中没有各基准的超链接。该表的 “Technical Report” 链接指向基础版本仓库中的 `DeepSeek_V41_Tech_Report.pdf`，而不是 1017 版专属评测配置。

## Automation-Bench v1.0.6

**可确认其版本名称来自 Zapier 上游，并且需与 AA 实施区分。** Zapier 官方 [CHANGELOG](https://raw.githubusercontent.com/zapier/AutomationBench/4a8e1061254004d9dac807054eed33fad7d1ff14/CHANGELOG.md) 的不可变仓库提交 `4a8e1061254004d9dac807054eed33fad7d1ff14` 明列 `1.0.6 — 2026-07-31`。Zapier 官方[榜单页](https://zapier.com/benchmarks)也把当前榜单标为 `1.0.6`。

更具体地，DeepSeek 基础版本技术报告的 §4.3.1 将 General agent 评测写为 “the public evaluation set of AutomationBench v1.0.6”，并列出 Shepard 与 Salimans 的 AutomationBench 引用；Table 3 对应的 `Automation-Bench (Pass@1)` 中 V4.1-Flash 为 54.8，与 1017 模型卡比较列中的旧版值一致。该报告还称 AutomationBench 使用官方 scaffold。这个证据支持上游公开 v1.0.6 的版本语境，但该 PDF 面向 `DeepSeek-V4.1-Flash` 基础版，不能单独证明 1017 更新版每项运行细节完全未变。

Artificial Analysis 的官方[方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#automation-bench-aa)明确称 AutomationBench-AA 是其对 Zapier AutomationBench 的一次独立运行：采用 `dataset version 1.0.6` 的 **657 项私有 held-out split**，每题一次、API toolset、最多 50 turns，并用 objectives/guardrails 对最终环境状态做程序评分；触发 guardrail 时该题记零。Artificial Analysis 自己的[评测页](https://artificialanalysis.ai/evaluations/automationbench-aa)也说明其分数口径不同于 Zapier 榜单的严格全任务完成率。

因此，DeepSeek 表格中的名称可以记录为 Zapier 上游 `AutomationBench v1.0.6`。DeepSeek 官方表没有给出它采用公开集还是 AA 私有集，也没有链接到 AA、报告该行的 API toolset/50-turn 配置或说明采用 AA 的 objectives/guardrails 指标。**不得将 DeepSeek 的 60.5 记成 AutomationBench-AA 分数，也不得由同版本号推导其运行于 AA 私有 split。** 本次未发现 DeepSeek 提供对应的私有 split 标识或 harness 数据集 ID。

## Apex Bench v1.1

Mercor 官方于 **2026-09-08** 发布[《Introducing APEX-Agents 1.1》](https://www.mercor.com/blog/introducing-apex-agents-1-1/)，正文称 APEX-Agents 1.1，并说明每个职业领域选择 80 个任务、经三轮专家审查；其[官方 Hugging Face 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1)说明这是 240 个 Harbor 任务包，仓库交付 revision 为 `1.1.1`。Mercor 当前[官方榜单](https://www.mercor.com/apex/apex-agents-leaderboard/)使用 Pass@1 与 Mean Score 等标签。以上来源能确认 APEX-Agents 1.1 的存在与版本细节。

但 DeepSeek 的表格只写 **“Apex Bench v1.1”**，未链接 Mercor 页面、数据卡或任务集，也未指明 Pass@1、Mean Score、APEX-Agents、`1.1.1` Harbor delivery 或任何 harness。DeepSeek README 的旧版技术报告链接中，检索到的是 **MathArena Apex**（数学基准）与 AutomationBench 等内容；未发现 Mercor、APEX-Agents 或 “Apex Bench v1.1” 的定义或数据配置。文件中的 `Apex` 近名不能作为同一评测证据。

**结论边界：** 本次没有第一方来源将 DeepSeek 的 “Apex Bench v1.1” 明确链接或定义为 Mercor 的 APEX-Agents 1.1。因此不得将该 DeepSeek 成绩映射到现有 `apex-agents-1-1` 条目，也不添加别名、related 关系或由近似分数支持的推论。需要 DeepSeek 的报告参考文献、评测数据集 ID 或其与 Mercor 的明确来源链接后才能复核。

## ZeroBench-main 与报告日期

DeepSeek 官方模型卡列名为 `ZeroBench-main (w/tools)`，分数 51.0；官方更新日志日期为 2026-10-17，并明确该行使用 Pass@5。模型卡没有链接到 ZeroBench，也没有在表格脚注中说明其他 harness 或任务参数。ZeroBench 自身资料的独立核查与正式采纳见下节；DeepSeek 所用具体修订与工具环境未披露，不将目录当前版本自动等同于报告运行版本。

## 核查材料与范围

- 本地完整阅读：`content/benchmarks/automationbench.json`、`content/benchmarks/automationbench-aa.json`、`content/benchmarks/apex-agents-1-1.json`、`docs/RESEARCH_WORKFLOW.md`。
- DeepSeek 官方 1017 README 不可变修订见本文开头；官方更新日期与脚注见[API 更新日志](https://api-docs.deepseek.com/updates/?release=deepseek-coder)。
- 技术报告文件通过 README 的 Technical Report 超链接取得并文本检索；其 AutomationBench 证据位于 §4.3.1 与 Table 3，报告引用为 Shepard & Salimans (2026), _AutomationBench_, arXiv:2604.18934。报告未给出 APEX-Agents 定义。它是 V4.1-Flash 基础版本报告，不等于 1017 版专属评测配置。
- Hugging Face API 为 1017 模型卡固定修订提供 `sha`、`lastModified` 与提交日期；Zapier 的 CHANGELOG 使用本次核实的不可变 Git commit。未访问或下载 Mercor gated 任务数据；仅阅读公开的官方博客、榜单和数据卡。

## 正式收录与核验决定

- 新增 `zerobench-main`，记录官方主问题 split（100 题）及当前数据卡 v3（2025-12-23）。主任务复核官方数据卡日期、字段、受控访问与答案披露限制，采用 ZeroBench 官方网站实际使用的橙色 0 标识；标识单独许可未声明，仅作来源标识，不能据此推定题库或品牌的通用再利用授权。
- ZeroBench 数据研究细节与来源保存在 `artifacts/candidates/2026-10-17-zerobench/research.md`。正式条目不含样例或题库附件。DeepSeek 未说明具体修订，不能将当前目录 v3 直接声称为其所用修订。
- 将现有 `automationbench` 的通用 1.0 版本说明更新为已核实的 1.0.6，增加日期和表内别名，保留现有真实 simple 演示任务；`automationbench-aa` 不变。
- 新增 2026-10-17 模型发布资料，11 行中链接 10 项已确认评测。`Apex Bench v1.1` 仅记入来源覆盖缺口，未新建猜测条目或添加到 Mercor 条目的别名。
