# 官方模型发布资料采集与采用记录

本轮从模型官方发布表、模型卡和技术报告发现评测，再追溯评测作者的项目页、论文、仓库与数据卡。按用户要求，搜索与来源查证全部交由 GPT-6 Luna；主任务审核版本、字段与展示语义后集成。本文与三个来源研究文件保留本轮边界，不代表覆盖所有模型或所有发布表。

本批正式采用 25 条，目录由 49 增至 74 条；发布资料由 4 增至 11 份。全部 25 条采用记录通过统一内容校验，截图九项的唯一识别经过自动测试和真实浏览器操作核对。

## 来源分组

| 来源组 | 本轮采用的评测 | 详细证据 |
| --- | --- | --- |
| Anthropic | Terminal-Bench 4.0、FrontierCode 1.1 Main、CursorBench 4.0、GDPval-AA v2.1、AutomationBench、Terminal-Bench-Science 0.1、OSWorld 2.0、Chartography、WANDR | [研究记录](2026-09-23-anthropic-benchmarks.md) |
| OpenAI | Agents’ Last Exam、BenchCAD、ARC-AGI-3、OfficeQA Pro、HealthBench Professional、GeneBench-Pro、LifeSciBench、Mind2Web | [研究记录](2026-09-23-openai-benchmarks.md) |
| Google、DeepSeek、Qwen、Moonshot | LiveCodeBench Pro、SciCode、APEX-Agents、CMMLU、BrowseComp-ZH、SWE-bench Multilingual、Arena-Hard v2.0、AlignBench | [研究记录](2026-09-23-google-china-benchmarks.md) |

候选文件留在 `artifacts/candidates/`，不会自动发布。正式条目位于 `content/benchmarks/`；正式采用时会进一步精简文字、校正字段，候选快照不作为最终产品内容。

## 用户截图的逐项对应

官方来源：[Claude Opus 5.5 发布报告](https://www.anthropic.com/claude-opus-5-5)，2026-09-22。

| 表中名称 | 正式 ID | 处理 |
| --- | --- | --- |
| Terminal-Bench 4.0 | terminal-bench-4 | 新建，与 2.0 分开 |
| FrontierCode v1.1 (Main) | frontiercode-1-1-main | 新建，保留括号别名；Main 子集，题目不公开 |
| CursorBench 4.0 | cursorbench-4 | 新建，使用 Cursor 官方标识 |
| GDPval-AA v2.1 | gdpval-aa-v2-1 | 新建，区别原始 GDPval 与早期 AA 方法 |
| AutomationBench | automationbench | 新建，区分公开任务和私有榜单留出集 |
| Humanity’s Last Exam | hle | 关联原有条目，无重复建档 |
| Terminal-Bench-Science 0.1 | terminal-bench-science-0-1 | 新建，科学研究工作流 |
| OSWorld 2.0 | osworld-2 | 新建，标明表格为 partial completion |
| Chartography | chartography | 新建，第三方图片不转载 |

WANDR 位于正文，作为额外报告关联，不能称作表格的第十行。官方网页用 HTML 表格呈现九行数据，本轮没有找到相符的独立原图 URL，因此保留报告入口，不把封面当作成绩图。

## 审核修正与保留边界

- 不覆盖旧版本，不修改未重新核验的旧条目日期。GDPval-AA v2 与 v2.1 不因名称接近而互相替代。
- 原始发布方与引用它的模型厂商分别记录；新增 Cognition、Cursor、Zapier、Surge AI、Perplexity 的官方组织标识。
- 公开榜单、申请数据访问、禁止转载、完整题库私有是不同事实。`restricted` 只用于已确认原题限制转载的情况，不将 gated 访问直接归为转载限制。
- ALE 的 Score 与 Pass Rate 不同；OSWorld 部分完成分不是完整成功率；Mind2Web 的速度倍数不是正确率。
- OpenAI 报告没有注明 Mind2Web 版本，因此不把其速度声明挂到原始 Mind2Web 条目。OfficeQA 的 Pro 归属依据 Databricks 当前方法说明，并保留 OpenAI 表格只写 OfficeQA 的限制。
- 新增条目没有附站内原题样例：本轮未完成逐样例题面、答案和附件的转载核验；提供官方入口。原有 10 组、19 条站内样例继续保留。
- OpenScore 的 OMR 版本、部分安全/内部评测和未能明确对齐版本的表项留在各组研究记录中，未为增加数量补写推测内容。

后续采集按[研究流程](../RESEARCH_WORKFLOW.md)和[内容维护手册](../CONTENT_MAINTENANCE.md)执行。构建与浏览器的最终结果单独记录在[验收文档](../VERIFICATION.md)。
