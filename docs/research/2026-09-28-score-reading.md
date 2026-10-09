# 读分模板与综合指数来源核对

日期：2026-09-28。文章只作为发现线索，正式内容依据下列第一方方法、数据卡和发布说明。未执行评测、申请评分权限或复制原题与答案。

| 正式条目 | 已核对范围 | 主要第一方资料 |
| --- | --- | --- |
| aa-intelligence-index | v4.3.2 的十项组成、权重和实施边界 | [AA 方法与历史](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| aa-briefcase | v1.1 正式方法；Lite 不是正式全量 | [方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)、[Lite 数据卡](https://huggingface.co/datasets/ArtificialAnalysis/AA-Briefcase-Lite/blob/main/README.md) |
| aa-omniscience | 开放问答、拒答与错误区分；独立指数与总指数分项不同 | [官方介绍](https://artificialanalysis.ai/evaluations/omniscience)、[Public 入口](https://huggingface.co/datasets/ArtificialAnalysis/AA-Omniscience-Public) |
| aa-lcr | v1.1 答案修订和裁判；原始文档版权单列 | [数据卡](https://huggingface.co/datasets/ArtificialAnalysis/AA-LCR/blob/main/README.md)、[实施方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| gdp-pdf | Surge 原版与 AA 输入、裁判、指标及费用口径有别 | [Surge](https://surgehq.ai/benchmarks/gdp-pdf)、[数据入口](https://huggingface.co/datasets/surgeai/GDP.pdf)、[AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| critpt | 公开挑战与受控评分服务分开；AA 使用 challenge 层级 | [官方仓库](https://github.com/CritPt-Benchmark/CritPt)、[数据入口](https://huggingface.co/datasets/CritPt-Benchmark/CritPt)、[AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| automationbench-aa | v1.0.6 私有留出任务、50 轮、目标/安全约束计分 | [AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)、[上游仓库](https://github.com/zapier/AutomationBench) |
| terminal-bench-3 | 3.0 发布范围、执行/验证容器、持续版本管理 | [3.0 发布](https://www.tbench.ai/news/terminal-bench-3-0)、[4.0 修订](https://www.tbench.ai/news/terminal-bench-4-0) |

## 既有条目的局部更新

- `terminal-bench-4`：新增比较条件和 3.0 关系，依据官方 4.0 公告与 AA 实施。没有将 AA 的三次重复说成所有参评机构的通用规则。
- `gdpval-aa-v2-1`：新增模型裁判、Elo 拟合与比较边界，依据 AA 方法。
- `arena`：新增投票者、raw rank/rank spread、历史快照边界，依据[官方排名方法](https://arena.ai/blog/ranking-method)与条目原有官方来源。
- 上述三条仅写 `updatedAt`，不批量改其 `verifiedAt`；没有重审所有原有资料或重新计算榜单。

## 采用边界

八个新条目均未加入 `sampleSet`。可访问不代表可转载，Lite/Public 不代表正式全量，CritPt 公开题目与私有答案/评分权限分别记录。没有把文章中的模型排名、费用或因果推断直接录入站内。

指南增加的是一般阅读案例，不声称本站完成独立复测。任务成本说明区分被测模型调用与裁判/文档处理费用；不以社区热度直接推断模型质量。

GDP.pdf 官方 Hugging Face 数据卡本轮返回 401；条目标为访问受阻和部分核验，不据此推断其私有性或申请条件。方法介绍与数据可下载性分开表述。
