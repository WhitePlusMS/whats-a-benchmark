# Eval Handbook：中文评测目录与模型发布成绩同题对照

核查日期：2026-11-09。本文件比较当前本地工作树与 [Eval Handbook](https://evals.zenheart.site/benchmarks/) 的公开页面，是竞品研究，不是对该站全部数据的质量审计，也不是用户测试。

## 对用户原设想的直接对照

- 该站[评测目录](https://evals.zenheart.site/benchmarks/)自报 507 个评测档案，提供按名称、用途及引用厂商搜索的入口；数量是网页快照，本次未对全部档案去重、验真或验收筛选。本站本地当前为 318 个 `published` JSON，统计口径不同，不能直接用数量判断覆盖或质量。
- 同站提供[模型发布时间轴](https://evals.zenheart.site/releases/)、[GPQA Diamond 详情](https://evals.zenheart.site/benchmarks/gpqa/)和[按任务选型](https://evals.zenheart.site/choose/)页面。页面将厂商报告、模型成绩、基准介绍、按业务任务查看与来源入口串联，直接覆盖“收集评测，再展示模型发布时成绩”的相当部分，也与此前建议的“读懂厂商报告”路线重叠。
- 该站[报告解读章节](https://evals.zenheart.site/book/chapter-08/)包含案例、测试协议差异和来源类别的解释；[选型页](https://evals.zenheart.site/choose/)在文档写作、编程等任务下给出基准解释、成绩记录及不同程度可比性提示。以上是页面功能与主张，并非本次对每项结果、标签或建议的背书。
- 本地 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)已记录任务、子集、数据访问、来源和部分方法边界，当前无结构化模型成绩；本地发布页索引官方发布资料，非同等模型成绩时间轴。不同工作树和页面的最新状态可能变化，线上本站是否同步未核。

## 同名候选范围

根据该站目录 HTML 的 507 个卡片名与本地 318 条名称做受限规范化，得到 **107 个本地同名候选**，其中 JobBench 对应对方两张存在歧义的卡片；详细算法、限制和逐项清单见[同名候选清单](2026-11-09-eval-handbook-name-matches.md)。这些只是字符串匹配，并未逐项确认评测身份与版本；不匹配也不等于不覆盖。

另外单独对本地 50 条带 `embodied` 字段的已发布记录，按同一名称规范化规则与这 507 张卡片比较，本次**没有完全同名匹配**；本轮还按部分别名、词干和卡片摘要做了粗筛，命中的名称需要排除误匹配。这只是当次目录卡片名称范围，不能推出对方整站没有机器人内容，也不能排除别名、摘要未提及或页面后续更新。

具体反例：本站 [REAL-Bench](../../content/benchmarks/real-bench.json) 是具身机器人移动操作评测，对方 [RealBench（字节）](https://evals.zenheart.site/benchmarks/realbench/)描述 GUI 操作；本站 [RLE-Bench](../../content/benchmarks/rle-bench.json) 与对方 [e-bench](https://evals.zenheart.site/benchmarks/e-bench/)也不是同一名称或任务；[SIMPLE](../../content/benchmarks/simple-embodied.json) 人形机器人仿真与 SimpleQA 系列更不能因子串相同而合并。

同一目录仍有 [EmbSpatial-Bench](https://evals.zenheart.site/benchmarks/embspatial-bench/) 和 [ERQA](https://evals.zenheart.site/benchmarks/erqa/) 等具身空间问答。根据[EmbSpatial 官方仓库](https://github.com/mengfeidu/EmbSpatial-Bench)和 [ERQA 官方仓库](https://github.com/embodiedreasoning/ERQA)，它们是图文空间/具身推理问答，不能当成真机任务成功率；本站本次没有找到对应独立 JSON，但本地已有模型发布资料曾提及两者。因此，局部目录的同名差异值得进一步研究，但不能据此说具身赛道没有其他竞争。另有[Embodied Arena 项目仓库](https://github.com/EmbodiedArena/embodied-arena)自述已支持两者及更多具身评测，未在本轮部署验证；其网站本轮未能读取页面正文。

## 同一事实：DeepSeek-R1 的 GPQA Diamond

1. [对方 GPQA 页面](https://evals.zenheart.site/benchmarks/gpqa/)列出 DeepSeek-R1 发布记录及 71.5%，另提示不同框架、采样和工具不应随意横比。
2. [对方模型详情](https://evals.zenheart.site/models/deepseek-r1/)也列 71.5%，把该记录放在“未关联到本页变体”而非直接分配，标注厂商报告、原文位置和协议信息，并明确说其定位与协议未核验。这一处理说明其已尝试来源追溯与缺项标注，但不能把“来源等级 A”视为已独立复测。
3. [DeepSeek-R1 原始论文 v1](https://arxiv.org/html/2501.12948v1) 的 Table 4 确有 GPQA Diamond Pass@1 71.5；[后续版论文](https://arxiv.org/html/2501.12948)亦有该数值。对方详情同时写“Table 2”且说定位未核验；由于原文可能存在不同稿本、格式或发布渠道，本轮没有确认它所指的具体版本，不将定位差异断言为对方错误。

同一个数值能在原始论文查到，仅证明这一单点与相应表格一致；不证明其他模型数字、测量协议、网站的可比性标签或读者理解均正确。厂商报告与 AA 的独立测试也应分开标明。

## 影响与待验证的问题

这是一项比通用榜单更接近本站设想的中文竞争：评测百科、模型发布时间线、来源链接和任务选型已经结合。此前“解读一张模型发布图/报告”的建议应明确视为**有竞品的验证假设**，不能当作独特赛道。

仍可能比较的是，面对同一真实问题，读者能否在本站更快找到准确的任务示例、版本和来源；但目前没有用户对照试验、重复使用或付费证据。若缺少可证明的优势，继续单纯扩大人工搬运成绩的投入应保持谨慎。
