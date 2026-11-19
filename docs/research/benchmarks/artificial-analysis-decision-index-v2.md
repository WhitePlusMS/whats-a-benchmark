# Artificial Analysis Decision Index v2 核验记录

核验日期：2026-11-09。以 [AA 官方方法](https://artificialanalysis.ai/methodology/decision-index)、[v2 发布说明](https://artificialanalysis.ai/articles/decision-index-v2) 和 [官方榜单](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index) 为依据。

## 组成与评分

| 分项 | 权重 | 本版范围与计分 |
| --- | --- | --- |
| AA-Paperclip | 30% | 1,500 篇私有文档；每篇 5 个决策和 10 个提取结果，15 项全对才算整篇正确；以答案概率乘积计算文档置信度。 |
| EvalSafe-O*NET-AA | 15% | 7,500 题中采用两参考模型最可能答案一致的 6,582 题；参考是模型共识，官方说明无 ground truth。 |
| When2Call | 10% | NVIDIA 多选测试中保留 3,423 / 3,652 题。 |
| AA-Omniscience-Decision v1.1 | 15% | 500 道私有题，四个答案加拒答选项。 |
| HLE-MultiChoice v1.1 | 15% | 509 道纯文本多选题，并增加拒答选项。 |
| AA-Symmetry | 15% | 120 个基础问题及 440 种等义表述，检查选择和概率的一致性。 |

前五项使用 Decision Score，AA-Symmetry 使用 Symmetry Score，按以上权重加总。官方公式为 `50 × (1 + c − (p − c)²)`，其中 `c` 表示所选答案是否正确，`p` 是其概率；拒答和文档有专门处理，详见方法页。一致性不等同于正确率。官方发布说明称私有数据集对应 v2 权重的 45%，v1 为 25%。

## 关联和访问边界

- [When2Call 条目](../../content/benchmarks/when2call.json)是上游基准。本站案例 `live_multiple_0-0-0` 出现在 AA 的 229 项排除清单里，不能称作 v2 实际评分题。
- [AA-Omniscience](../../content/benchmarks/aa-omniscience.json) 与 Decision 版任务形式和数据范围不同；本站公开案例不是私有 Decision 题集的证据。
- [HLE](../../content/benchmarks/hle.json) 是母评测；AA 采用 509 道纯文本多选题并加入拒答选项，不能等同于完整 HLE。
- v2 新增 Paperclip、EvalSafe-O*NET-AA、Symmetry，移除 v1 独立分项 WildGuardTest；后者仍是 Symmetry 基础题的来源之一。不同版本不可直接混计。
- 目前本站没有其他三个分项独立条目；综合指数以文字列明完整权重并通过相关评测链接导航，不建立不完整的结构化组成表或继承基础评测样例。
- 不把社区 [Jev Decision Index](../../content/benchmarks/jev-decision-index.json) 与 AA Decision Index 当作同一指数。
