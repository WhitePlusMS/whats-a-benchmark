# 阅读指南相关官方事实核对

核对日期：2026-10-21（Asia/Shanghai）。以下记录公开官方资料实际可读到的定义和范围，供主审阅流程引用；本文件只列来源事实，不作指南审阅结论。

## HumanEval pass@k 与 τ-bench pass^k

- **HumanEval。** 官方 `evaluation.py` 的估计器以每题生成的 `n` 个样本和其中 `c` 个通过单元测试的样本计算 `1 - C(n-c,k)/C(n,k)`，再对题目取平均；代码注释称其为 pass@k 的估计。语义上，pass@k 表示从 k 个独立候选中至少有一个成功的概率/估计，而不是要求全部成功。官方代码短句： “Calculates 1 - comb(n - c, k) / comb(n, k).” 来源：[evaluation.py](https://github.com/openai/human-eval/blob/master/human_eval/evaluation.py)。该仓库 README 标记为 deprecated and unmaintained，故该链接反映其当前可见代码，并非持续维护承诺：[README](https://github.com/openai/human-eval/blob/master/README.md)。
- **τ-bench。** 论文将 pass^k 定义为“同一任务 k 次 i.i.d. 尝试全部成功”的概率，并对任务平均。给定该任务 `n` 次运行中 `c` 次成功，论文给出的无偏估计为 `C(c,k)/C(n,k)`；pass@k 的配对估计为 `1 - C(n-c,k)/C(n,k)`。短引文： “the chance that all k i.i.d. task trials are successful”。来源：[τ-bench 论文 §3（HTML）](https://arxiv.org/html/2406.12045)，[论文摘要](https://arxiv.org/abs/2406.12045)。公式和定义在 §3 的 Pass^k metric 段落。
- **是否要求时间连续。** 上述定义写的是从同一任务多次 i.i.d. 试验中取 k 次，并未写“时间上连续/相邻”的要求。此处仅报告该定义段落没有规定连续性，不推断具体实现中的调度或抽样顺序。τ-bench 仓库 README 目前提示旧任务未更新并指向 τ³-bench；此核对引用的是 τ-bench 原论文定义及用户指定仓库，不把旧仓库等同于最新任务版本：[官方仓库 README](https://github.com/sierra-research/tau-bench)。

## Artificial Analysis Intelligence Index

- 访问日方法页为v4.3.2，按Agents、Coding、Scientific Reasoning、General四类加权汇总，权重不同；版本历史记录组成与权重调整。该页不能作为所有综合指数采用同一算法的依据。来源：[AA方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)。

## Arena 评分与 raw rank / rank spread

- Arena 方法文章解释 raw rank 是按 Arena score 得到的唯一顺序名次；rank spread 是根据所有模型分数置信区间计算出的最好至最差可能名次区间，区间重叠表示排名存在并列可能。短引文： “The raw rank is simply the rank of the model's Arena score.” 来源：[Arena's Ranking Method](https://arena.ai/blog/ranking-method)，文章显示发布于 2025-11-14、更新于 2026-02-28。
- 该文章本身描述 raw rank 和区间算法，没有在对应段落标明 Elo 或 Bradley–Terry。Arena FAQ 当前说明用户投票排名使用 Bradley–Terry，并称其与 Elo 相似；一篇 Arena 历史文章称其曾从 Elo 转向 Bradley–Terry。因此“raw rank/rank spread 的定义”与“底层分数如何拟合”是该站不同页面分别说明的事项。来源：[Arena FAQ](https://arena.ai/faq)，[Arena Elo 系统更新文章](https://arena.ai/blog/chatbot-arena-update)。

## GDP.pdf 的 Artificial Analysis 实施与费用范围

- AA方法页的GDP.pdf条款：费用仅含被测模型调用，不含裁判、PDF准备和OCR；时间估计也排除这些部分，不是端到端评测耗时。其文档输入与裁判不同于Surge实现，页面称两方成绩不能直接比较。来源：[AA方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)。
- 访问日为2026-10-21，该动态页面当时显示v4.3.2；未取得不可变网页快照。GDP.pdf的HF数据卡本次返回401，未从该卡核对内容或访问条件。

## Creative Writing Benchmark v3

- 官方仓库 README 将 v3 描述为 rubric 与 Elo 混合系统。流程包括：32 个写作提示、每题三次生成（96 个作品）；评委按 rubric 单独评分；用汇总 rubric 分估初始 Elo；再对相邻模型做成对比较，按差距评分；使用包含胜负差距的 Glicko-2 迭代并对最终邻近模型做更全面比较。短引文： “hybrid rubric and Elo scoring system”。来源：[EQ-bench/creative-writing-bench README](https://github.com/EQ-bench/creative-writing-bench/blob/main/README.md)。README 推荐 Claude Sonnet 4.6 以对齐其榜单；归一化通过锚定指定模型处理。此处仅记录 README 当前可见流程。

## LiveBench 与 LiveCodeBench 的任务范围

- **LiveBench。** 用户指定的官网 `https://livebench.ai/` 在本次文本访问中仅返回启用 JavaScript 提示，未能从该页面直接读取任务分类。本次从项目官方仓库可读的 README / Datasheet 核对到六类：Math、Reasoning、Coding、Data Analysis、Language、Instruction Following。短引文： “six different categories”。来源：[LiveBench 官方 GitHub Datasheet](https://github.com/LiveBench/LiveBench/blob/main/docs/DATASHEET.md)。未据此确认 livebench.ai 当前榜单中的模型、发布日期或版本细节。
- **LiveCodeBench。** 官方项目页称其持续收集 LeetCode、AtCoder、Codeforces 周期性竞赛题，用于代码模型多种代码相关场景；明列代码生成、自我修复、代码执行和测试输出预测。短引文： “self-repair, code execution, and test output prediction”。来源：[LiveCodeBench 官方项目页](https://livecodebench.github.io/)，[官方代码仓库](https://github.com/LiveCodeBench/LiveCodeBench)。项目页写明可按题目发布日期评估训练截止日期之后的题目。

## 本次未核到的范围

- 未执行任何上游代码、未下载或申请访问受限数据；GDP.pdf Hugging Face 数据卡返回 401。
- 未获取 LiveBench JavaScript 官网的运行后页面；分类信息来自官方仓库 Datasheet。
- 未对 HumanEval 与 τ-bench 的特定排行榜逐个核查实现、采样次数、随机种子或是否按时间排序；论文定义段没有连续试验条件。
- 未固定 GitHub 仓库到 commit SHA；仓库链接指向访问日的默认分支内容。
