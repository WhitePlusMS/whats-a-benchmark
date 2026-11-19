# 事实性与幻觉：同题、分母和已有成绩站

调查日期：2026-11-10。对照本地条目、公开资料和社区讨论；未运行模型或评分器，也未访谈本站用户。模型名和成绩仅代表引用的测试版本，不代表当前表现。

## 真实问题及项目已有内容

[一位 LocalLLaMA 用户](https://www.reddit.com/r/LocalLLaMA/comments/1fjvmj9/)询问哪个评测或榜单最接近判断模型是否会编造事实，讨论者提到不同测试；这是个人提问，不代表该用户愿意访问本站。[另一条数据科学讨论](https://www.reddit.com/r/datascience/comments/1sy6tzq/benchmarking_llm_hallucinations/)涉及企业自建评测、核对回答与输入材料的关系；评论中的方法是个人建议，未独立验证。

本站已有 [SimpleQA](../../content/benchmarks/simpleqa.json)、[SimpleQA Verified](../../content/benchmarks/simpleqa-verified.json)、[AA-Omniscience](../../content/benchmarks/aa-omniscience.json) 与 [Kimi Hallu Bench](../../content/benchmarks/kimi-hallu-bench.json)。前几项是短事实问答；Kimi 页面报告的是特定配置下的声明级幻觉率，完整题目与实现未公开。不同任务、统计单位和模型工具条件不可直接横比。

## 本地已有的一道同题案例

本地 SimpleQA 的 `csv-row-5` 和 SimpleQA Verified 的 `original_index=5` 都询问同一判决赔偿金额。前者保留原答案 `120,000`、币种来自问题；后者答案写为 `120,000 euros`。这是两个源记录中同一道题的对应关系，不是两个独立题目，也不意味着所有题目及评分完全相同。

SimpleQA 原数据读取记录为 4,326 题；[Verified 论文](https://arxiv.org/html/2509.07968)基于原集去重、核对和筛选，最终 1,000 题并修改评分提示。两套数据和不同评分器的成绩不能因为共享一个例题就视为相同测试。此处只比对本站存储的原始字段和来源，不重新判断底层历史事件。

## “幻觉率”、正确率和 F1 的分母不同

[AA-Omniscience v1.1 官方页面](https://artificialanalysis.ai/evaluations/omniscience)给出：正确率为正确题数除以总题数；其幻觉率为 `错误 /（错误 + 部分正确 + 未尝试）`。例如，假设 100 题中正确 70、错误 15、部分正确 5、未尝试 10，则错误占全部问题 15%，AA 定义的幻觉率为 15/30 = 50%。这是人工构造例子，不是任何模型的成绩，也不能理解为模型日常回答一半会编造。若没有非正确回答，分母为零时需按实际实现处理，不能自行算出比例。

[SimpleQA Verified 论文](https://arxiv.org/html/2509.07968)则用全题正确率和已尝试题中的正确率计算调和平均 F1，并区分正确、错误和未作答。论文表 7 中 Claude Opus 4 的一次报告为全题正确率 19.2%、已尝试题正确率 54.1%、F1 为 28.3%；这些数字来自同一次作者实验的不同统计量，不是三个独立测试。作者使用的模型设置与裁判也应一起保留。

[Epoch 的 Verified 审核](https://epoch.ai/benchmarks/simple-qa-verified/review)说明其成绩采用全题正确率，并使用不同裁判和鼓励作答的提示；与原论文 F1 和提示不同，不能只按模型名称拼接。Epoch 抽查 50 题、报告其中 5 题有其认定的计分相关缺陷；这是其审核结论，本次未复核，也不能据此推断所有模型排名受影响。

## 搜索型系统与闭卷模型

[一个项目维护者的帖子](https://www.reddit.com/r/LocalLLaMA/comments/1t1n6o8/we_are_finally_there_qwen3627b_agentic_search_957/)自报 Qwen3.6-27B 加搜索工作流在 SimpleQA 选取的 300 题中 287 题正确，并指出使用本模型作为裁判、无重复运行。作者也明确这是联网系统而非闭卷成绩；评论对自评偏差有不同猜测，未验证其方向。300 题的系统结果不能视为完整 SimpleQA 或 Verified 的无工具模型成绩，也不能据此证明特定系统优于某个榜单。

## 现有替代与判断

- [AA-Omniscience 官网](https://artificialanalysis.ai/evaluations/omniscience)已有正确率、幻觉率、成本、领域和版本比较，也解释分母；按不同指标阅读分数不是本站独有。
- [BenchLM 的 SimpleQA Verified 页面](https://benchlm.ai/benchmarks/simpleqa-verified)已并列展示论文中的 F1、全题正确率、已尝试正确率、尝试率和来源，明确是历史论文快照而非独立复测。
- [英国政府 Inspect Evals 文档](https://github.com/UKGovernmentBEIS/inspect_evals/blob/main/src/inspect_evals/simpleqa/README.md)也解释两版数据与评分，提供现有评测入口；本次未运行。

一个可检验的读者任务：看到“某模型幻觉率 50%”，能否找到**哪种问题、是否联网、哪类回答算错、分母是什么**，并判断能否与另一个分数比较？本站现有条目和同题案例能用于构造阅读材料，但是否比上述官网和竞品更高效仍未验证；这些讨论也不足以推断市场规模或付费需求。
