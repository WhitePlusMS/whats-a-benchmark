# AutomationBench

核验日期：2026-09-23

## 官方身份

AutomationBench 由 Zapier 发布，官方仓库为 [zapier/AutomationBench](https://github.com/zapier/AutomationBench)。作者论文为 Shepard、Salimans 的 *AutomationBench*（arXiv:2604.18934）。README 将其定义为真实业务工作流代理评测；它同时提供公开任务和单独保留的官方榜单题集。[仓库 README § Overview、Public vs. Official Scores](https://github.com/zapier/AutomationBench/blob/main/README.md#overview)（GitHub 行 171–199）; [论文摘要](https://arxiv.org/abs/2604.18934)

## 官方定义与忠实中文概述

评估 AI 模型/代理完成跨应用业务工作流的能力：任务给出触发信息、预置业务状态和领域工具，代理通过工具操作多个模拟 SaaS 应用，最后按状态断言检查结果。问题不是单步问答；成功要求正确更新目标系统中的记录。[README § Overview、How It Works](https://github.com/zapier/AutomationBench/blob/main/README.md#how-it-works)（行 180–223）

## 任务输入/输出/环境

- 输入：无额外交互的 trigger data、预填充的初始环境状态及用户任务指令。
- 操作：领域工具/API；README 称模拟环境覆盖 47 个 SaaS 工具。
- 输出：环境最终状态；按任务的 assertions 评估。
- 环境：模拟 CRM、日历、收件箱等；可选工具集 `api`、`zapier`、`limited_zapier`。CLI 有最大步数等运行配置，应与分数一并记录。[README § Overview、How It Works、CLI Options](https://github.com/zapier/AutomationBench/blob/main/README.md)（行 180–223、251–271）

## 数据规模/split/字段/文件

README 当前说明六个计分域各 100 项：Sales、Marketing、Operations、Support、Finance、HR，共 600 个公开计分任务；`simple` 域 200 个单步/双步基础任务，不纳入正式分数。公开任务文件在 `automationbench/domains/`，任务由 trigger、initial state、tools 与 assertions 组成；私有榜单题按域另行保留且更难。该仓库公开 split 与官方榜单 private split 不同。[README § Domains、Simple Domain、Public vs. Official Scores、How It Works](https://github.com/zapier/AutomationBench/blob/main/README.md)（行 183–223）; [仓库目录](https://github.com/zapier/AutomationBench/tree/main/automationbench/domains)

## 访问状态

公开任务、评分代码及运行框架可从官方 GitHub 获取；官方榜单使用 held-out private tasks，题目不公开。站内摘录若可许可，应明确它是 public/simple 样例，不能代表官方榜单题集。[README § Public vs. Official Scores](https://github.com/zapier/AutomationBench/blob/main/README.md#public-vs-official-scores)（行 196–199）

## 数据/代码/媒体许可与使用边界

官方 LICENSE 明确 MIT 覆盖 Zapier 原创的基准代码、测试框架、模拟逻辑、mock data generators、配置和文档；仓库中的第三方 API endpoint/schema 表示不作为 Zapier 原创作品授权，其权利不由 MIT 授予。[LICENSE § Scope of License](https://github.com/zapier/AutomationBench/blob/main/LICENSE)（行 0–41）。因此可在保留 MIT 版权/许可说明的前提下评估只由原创文本和 mock state 构成的样例；需先从摘录中剔除或单独核验第三方 API 路径、字段、类型与响应形状。没有核验图像/其他媒体的独立授权；本站无需转载媒体。

## 官方样例与是否可在公开 GitHub Pages 转载

本地候选 `artifacts/candidates/samples-text-batch.json` 中 AutomationBench 样例 `simple.email_sf_contact_phone_update:3001`（example_id `3001`）逐字段对照 [官方 simple tasks.py](https://github.com/zapier/AutomationBench/blob/main/automationbench/domains/simple/tasks.py) 可见原始任务含相同 prompt、模拟邮件、联系人初始电话和断言；仓库 README 说明 simple 域为公开基础任务。[README 行 193–197](https://github.com/zapier/AutomationBench/blob/main/README.md#simple-domain)。该样例候选只保留 mock 内容和 assertion，并未把 Python 工具 schema 放进 raw；按 LICENSE 对原创材料的许可，可附 MIT 归属与许可链接后在公开站转载。上线前应再次确认内容确实不带被排除的第三方 API schema；不得将此公开 simple 样例说成榜单正式题。

## 指标

每项任务同时报告 `partial_credit`（满足断言比例，0–1）与 `task_completed_correctly`（全断言通过为 1，否则为 0）。正式 AutomationBench pass rate 是排除 simple 后所有计分任务的严格通过率均值；部分分仅为密集反馈/reward，不是官方总榜准确率。公开榜单的 600 任务成绩与官方 private 榜成绩口径不可混用。[README § Scoring、Public vs. Official Scores](https://github.com/zapier/AutomationBench/blob/main/README.md)（行 196–229）

## 版本关系

官方仓库 Changelog 当前列出 1.0.6（2026-07-31）和 1.0.5（2026-07-16）；1.0.6 调整公开/私有题目的可发现性与公平性，并提高私有题难度。记录应绑定仓库版本/commit 和榜单日期，不能默认不同版本分数可直接比较。[CHANGELOG](https://github.com/zapier/AutomationBench/blob/main/CHANGELOG.md)（行 191–203）

## 官方来源按角色分组

- 定义、任务组织、运行与评分： [Zapier 官方仓库 README](https://github.com/zapier/AutomationBench/blob/main/README.md)（行 171–271）。
- 数据/代码许可： [官方 LICENSE](https://github.com/zapier/AutomationBench/blob/main/LICENSE)（行 0–41）。
- 作者论文： [arXiv:2604.18934](https://arxiv.org/abs/2604.18934)（摘要）。
- 官方榜单： [Zapier benchmarks](https://zapier.com/benchmarks)；榜单题集不同于公开 GitHub tasks。

## 模型发布引用

Anthropic Claude Opus 5.5 发布材料报告 AutomationBench 成绩。该内容是厂商在特定运行设置下的结果引用，不是基准定义或独立复测：[Anthropic Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)（Performance and cost-effectiveness 表及脚注；本次引用只记录来源，不据此改写官方任务定义）。

## 未核实项

- 此次未复算榜单，也未把 Anthropic 结果映射至当前公开 task 版本。
- GitHub `main` 是滚动分支；正式收录时应固定 commit hash。
- 转载样例虽有 MIT 覆盖原创 mock 内容，发布前仍须检查摘录是否夹带第三方 API schema。

## 研究结论

**PASS_WITH_LIMITATIONS** — 基准身份、公开/私有任务集、工作流结构、评分及许可边界均有第一方材料支撑。本站候选 simple 样例与源码记录对应，保留 MIT 声明且排除第三方 schema 后可转载；不得把公开样例或分数与 private 官方榜单混为一谈。
