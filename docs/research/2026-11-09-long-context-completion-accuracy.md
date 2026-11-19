# 长上下文：请求完成率、答题正确率与统计分母

核查日期：2026-11-09。本文对照本站已有评测、公开实验和其他网站；没有运行模型或复现评测，也没有证明某个已有榜单的分数受错误影响。

## 评测不能只按“长上下文”合并

| 项目 | 已核对范围 | 解读边界 |
| --- | --- | --- |
| 本站 LongBench v2 | 条目记载 503 道四选一题、六类任务；已有示例包含金融单文档题 | 示例不等于下面 AWS 的 15 题金融多文档子集，也不能把子集分数当作全榜成绩 |
| [Artificial Analysis Long Context Reasoning](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning) | AA 自有长上下文评测；其页面已有说明、样例、模型结果，以及耗时和成本信息 | 开放式回答及裁判判分，与 LongBench v2 的四选一不能直接比较；AA 已经提供相当多分析信息 |
| [RULER](https://arxiv.org/abs/2404.06654) | 合成的检索、多跳、聚合、问答等多种任务 | 并非只有单针检索；一个总分也不能单独证明真实长文档工作流表现 |

本站亦有 RULER、AA-LCR、MRCR 等条目。能否把用户带到更适合自己的评测，要具体解释任务与计分，不能假定只列更多条目就是差异化。

## 一组容易被误读的厂商实验

[AWS 的 AgentCore 技术文章](https://aws.amazon.com/blogs/machine-learning/break-the-context-window-barrier-with-amazon-bedrock-agentcore/)报告 LongBench v2 金融多文档子集的 15 个问题，最长输入约 200 万**字符**。该文章将 success rate 定义为请求能否处理完成，并以全部 15 题为正确率分母、将未回答计为错误：

| 作者报告的方案 | 请求完成率 | 答题正确率 |
| --- | --- | --- |
| Claude Sonnet 4.6，长上下文配置 | 14/15，93.3% | 9/15，60.0% |
| Sonnet 4.6 加 Haiku 4.5 子模型的 RLM 工作流 | 15/15，100% | 11/15，73.3% |

这说明请求全部完成仍可能答错，且“成功率”和“正确率”有不同分母和含义。每道题约占 6.67 个百分点；这是厂商报告的小样本、不同完整系统的比较，并非独立复测或单纯改变同一模型窗口的对照，不能据此断言所有任务都会受益或成本更低。文章也包含另一组代码仓库子集实验，不能混作 503 题总分。

## 失败请求是否计入分母

[LongBench issue #144](https://github.com/THUDM/LongBench/issues/144) 报告者提出，失败请求被遗漏可能影响准确率；其中展示的分数变化是其构造的例子，不是已核实的历史榜单变化。

只读检查固定提交 `2e00731f8d0bff23dc4325161044d0ed8af94c1e` 的 [pred.py](https://github.com/THUDM/LongBench/blob/2e00731f8d0bff23dc4325161044d0ed8af94c1e/pred.py) 和 [result.py](https://github.com/THUDM/LongBench/blob/2e00731f8d0bff23dc4325161044d0ed8af94c1e/result.py)：前者遇到空输出会跳过记录，后者用读入的预测记录数计算总体比例。该检查不等于运行复现，也不能推断其他工具、版本或已有榜单采用同样流程。

例如，仅为演示分母：计划 503 题、其中 196 题答对，若另有 60 题未答且未写入输出，按 443 条记录计算为 44.24%；若按全部 503 题且将未答视为错，为 38.97%。未完成题的潜在答案未知；是否将 API 故障计错取决于评测目的。更有用的记录包括计划题数、完成请求数、实际输出行数、失败原因及最终计分规则。

## 真实问题与已有替代

- 一位 [LocalLLaMA 用户](https://www.reddit.com/r/LocalLLaMA/comments/1u876gh/is_the_needle_in_haystack_problem_solved/)讨论跨多份文档和代码仓库反复核对信息的实际困难；另一位[用户](https://www.reddit.com/r/LocalLLaMA/comments/1hq36dn/practical_online_offline_rag_setups_for_long/)描述在低于 16GB 内存的笔记本上处理长文档的限制。这是个人经验，不代表普遍需求或当前模型能力。
- [Open LLM Radar 的 LongBench v2 页面](https://open-llm-radar.com/benchmarks/longbench-v2)已有模型分数和来源入口；[AA 的长上下文评测](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning)已有结果、解释和成本信息。因此，长上下文榜单和基础说明本身并非空白，不能把其他站的记录自动当作独立复测。
- 值得验证的方向是：围绕某一种具体任务，把题目、分母、失败记录及模型配置连到可查的原始证据。上述材料只说明这种信息有解释价值，还没有证明用户会因此选择本站。

## 2026-11-10：同一长文档评测的两个发布版本

本站 [MMLongBench-Doc](../../content/benchmarks/mmlongbench-doc.json)涉及多页 PDF、图表与不可回答问题；新候选 [XL-DocBench](https://arxiv.org/html/2608.00036)同样关注长文档证据，但任务、文档、答案规则和数据版本不同，不可把分数直接混排。有限检索本地评测与研究文档未见 XL-DocBench 同名记录，不排除别名；本次没有新增产品条目。

论文与[项目页面](https://officeintelligence.github.io/xl-docbench/)描述 1,519 道经人核验的问题，来源包括专业文档，问题由模型生成候选再筛选、由人验证，并不等于全部由人工原创。论文表中 SimpleDoc + GPT-5.4 的准确率为 **44.0%**，GPT-5.4 直接读 OCR 为 **37.3%**；这里比较的是两种完整输入／工作流，不是只改变模型名称。

后续 [Microsoft 数据卡](https://huggingface.co/datasets/microsoft/XL-DocBench)描述一个严格发布版本：剔除涉及精确标为 `RAG: Not Approved` 来源 URL 的问题，保留 **1,345** 题、**292** 份文档；它不自动处理单独标记为 `Portions Approved` 的条目。此版本使用发布的 hardened evaluator，数据卡将 GPT-5.4 OCR 列为 **38.36%**、SimpleDoc + GPT-5.4 列为 **36.21%**，在这两行中顺序与论文相反。样本集合和评分器均可能不同；本次未取得并逐项配对原版预测或重跑评分器，不能断言反转由删题、评分器或模型变动中的哪一个造成，也不能视为两项系统在未来任务上的稳定胜负。

只读核对固定修订 [`72954bd70ffffe230f08b57c57fa9274ec14d7ea`](https://huggingface.co/datasets/microsoft/XL-DocBench/tree/72954bd70ffffe230f08b57c57fa9274ec14d7ea)：内存读取单文档和跨文档 JSONL 分别为 **1,191**、**154** 行，合计 1,345 个不同题目 ID；逐题成绩文件也是 1,345 个不同 ID，两组 ID 完全相同。将成绩文件中的二元 accuracy 相加，GPT-5.4 OCR 为 **516/1,345 = 38.3643%**，SimpleDoc + GPT-5.4 为 **487/1,345 = 36.2082%**，与同修订汇总文件一致。这仅复算发布文件的数字，未验证原始答案、文档授权、预测生成或评测程序是否正确。单文档文件 SHA-256 `ab214f9fee45f763810a0f316911da19915a7c2ee9a0dfaff55f799df283a62d`；跨文档文件 SHA-256 `18d514bb3c77e8e3b30ddc514116074b787fafd54153ff208817d24007ef4a13`。

项目页面本身已有中英文入口、详细任务分类、不同系统成绩和榜单；[ModelSpec 专题](https://github.com/turbobeest/modelspec/blob/main/benchmarks/xl_docbench.md)也记录纸面与严格版区别。这些是既有替代，不代表本次核验其所有展示或正确性。数据卡说明原文档以外部 URL 引用，不代表已经取得任意转载许可。

一位[本地模型使用者](https://www.reddit.com/r/LocalLLM/comments/1x95abn/round_3_tested_128k_context_on_a_3090_with_real/)用 3090、自选量化模型和 128K 输入做小规模代码查找实验：作者报告单条常量查找为 15/15，但计数任务在不同模型上为 1–4/15，并询问怎样可靠找出全部代码引用。每格仅 15 个问题、代码与散文问题设计不同，结果仅为其自报；不能推断其他模型、工作负载或本站能够解决该问题。它提供了可用于测试页面的实际阅读任务，而不是本站留存或付费证据。
