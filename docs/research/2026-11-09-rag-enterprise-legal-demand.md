# 企业知识库与法律 RAG：评测选择、数据与需求

核查日期：2026-11-09。研究基于当前本地工作树、公开数据和讨论；未运行检索系统或评分器，也未采访目标用户。用户帖子只表明提出过问题，不证明本站有用户、回访或付费需求。

## 先与本站已有条目对照

| 本站及外部资料 | 主要测什么 | 不能混同之处 |
| --- | --- | --- |
| 本地 [LegalBench](../../content/benchmarks/legalbench.json) | 法律推理任务集合；不同子任务输入、输出与评分不同，本站展示 hearsay 分类样例。 | 样例是有指定材料的法律推理，不是从企业文档库找证据的整套检索评测。 |
| [LegalBench-RAG 论文](https://arxiv.org/html/2408.10343) | 以 LegalBench 四个来源任务为起点，把已有材料追溯到源文档字符片段，评测法律资料的精确检索。 | 与 LegalBench 有明确数据来源关系，但身份与任务不同；检索命中不是完整法律判断或法律服务质量。论文摘要写 **6,858** 对，正文和表 2 写 **6,889** 条，差异原因未确认；不能选一处直接宣称另一个必错。论文 mini 为 776 条，不能混作全集。 |
| 本地 [FinanceBenchmark](../../content/benchmarks/finbenchmark.json) | 多类金融计算与工作流，条目已标注多个版本和官方指标定义。 | 不等于同名近似的 FinanceBench；不能因名称相似合并数据、样例或成绩。 |
| [FinanceBench](https://github.com/patronus-ai/financebench) | 财务文件问答；公开仓库描述 150 条开放样例，并列问题、答案、证据及页码字段。 | 与本站 FinanceBenchmark 是不同发布方和任务；150 是仓库所述公开样例数量，不应称完整数据集大小。 |
| [EnterpriseRAG-Bench](https://arxiv.org/html/2605.05253) | 论文称约 50 万份**合成**企业文档和 500 个问题，涉及检索、跨文档推理及缺失信息。 | 以 Slack、文档等形式模拟内部知识，不是真实公司内部数据；分数不能自动代表用户自己知识库或权限管理效果。官方 [quickstart](https://github.com/onyx-dot-app/EnterpriseRAG-Bench/blob/main/quickstart.md)还列额外 100 个不进榜的元数据问题。 |

按名称对 `content/benchmarks` 和现有 `docs/research` 检索；FinanceBench 名称在本地 FinanceBenchmark 条目中被明确用于区分身份，LegalBench-RAG、EnterpriseRAG-Bench 在历史研究文档未见直接同名评测条目。有限名称检索不能证明不存在别名或线上内容。本轮没有新增网站条目。

## 企业 RAG 题型数的实际核对

官方 [quickstart](https://github.com/onyx-dot-app/EnterpriseRAG-Bench/blob/main/quickstart.md)写 500 题，其中 Basic 200、Semantic 100、Intra-Document Reasoning 50、Completeness 10；[论文表 2](https://arxiv.org/html/2605.05253)同为 500 题，但相应数字为 **175、125、40、20**。

2026-11-09 通过 `git ls-remote` 读取仓库 main 为 `d36685e273713975ee20299bbf1ab64165575b3c`，并读取[该固定提交的 questions.jsonl](https://github.com/onyx-dot-app/EnterpriseRAG-Bench/blob/d36685e273713975ee20299bbf1ab64165575b3c/questions.jsonl)。文件 764,927 字节，SHA-256 为 `f9524b9157cd43aae36b99333a124738804306ea6d07f332d49faa6d3d147905`；逐行解析得到 500 条，按 `question_type` 计数的上述四类分别为 **175、125、40、20**，与论文表 2 一致。当次 main 原始文件和固定提交文件哈希相同。没有逐题审核答案、对照其他历史版本或运行评测，因此不能确定 quickstart 差异是文档滞后、其他版本或其他原因，也不推断历史榜单各次实际使用哪份文件。

官方 quickstart 区分答案正确性、完整性、文档召回和额外无关文档，并描述使用模型裁判；不能把“检索到文件”“答案正确”“证据可靠”都简化成一个同义成绩。第三方 [HydraDB 报告](https://benchmarks.hydradb.com/enterprise-rag-bench)自称测完全量数据，明确其结果是**自报且当时未获官方榜验证**，并称其提交文档数会影响召回率、作答使用 GPT-5.4；其复现仓库当时标为私有。报告同时比较不同榜单系统在不同指标上的最佳值，因此不能把它们说成同一个对手的成绩。本次未验证供应商结果。

## 真实问题与已有方案

1. [RAG 初学者](https://www.reddit.com/r/Rag/comments/1o5fj1r/how_do_i_evaluate_the_rag/)询问使用什么数据、如何计算 precision/recall，以及如何快速测试教程；评论者建议用自己的文档整理小测试集并记录证据。这是他人建议，不是通用最佳方案或已运行结果。
2. [另一位开发者](https://www.reddit.com/r/Rag/comments/1qhdynz/how_do_you_benchmark_your_rag/)认为检索正确但 LLM 裁判未理解医疗/法律术语，询问怎么评估。原因仅为其个人观察，本次无其样本或日志，不能认定裁判确实出错。
3. [寻找新 RAG 基准的讨论](https://www.reddit.com/r/Rag/comments/1xljiel/what_are_good_new_rag_benchmarks/)关注旧数据与潜在训练重叠；一位评论者建议闭卷基线、私有测试及单独记录证据召回。建议不能证明某模型受到污染，也不是对本项目的功能请求。
4. 在 [EnterpriseRAG-Bench 应用讨论](https://www.reddit.com/r/Rag/comments/1tpebrh/i_benchmarked_postgres_bm25_pgvector_on/)，评论者自述扫描文档和版面不一致影响其系统，并质疑合成语料与自身复杂任务的对应。其经验和发帖者成绩均未经独立复验；不能推断所有 OCR 或企业库都有相同问题。

[RAG Repo](https://rag-repo.org/research/rag-evaluation-gets-specific/)已有按领域、任务及数据局限整理的评测文章，[法律评测目录](https://github.com/narcolepticchicken/awesome-legal-benchmarks/blob/main/docs/catalog.md)也列法律检索与端到端评测；官方仓库提供题目及评分流程。它们是现成替代材料，内容未逐条核验，也没有与本站做读者效率对照。

## 对项目的含义

一个可检验的读者任务是：给定自己的文档问答场景，判断某个测试覆盖的是**检索证据、基于材料回答，还是完整系统**，再查到是否含扫描件、跨文档、拒答与权限等要求。潜在价值是把已有条目、名称相近评测和原始限制串起来；但这不是本项目独占，也不能代替执行自有业务测试。后续应选择真实读者，对比官方资料、已有目录及本站小样的找到出处时间、判断正确率和维护成本；目前未开展该实验。
