# Microsoft MAI 四项 Held-Out 评测公开资料核查

核查日期：2026-10-16（Asia/Shanghai）。范围为用户提供的 MAI-Base-2 文章中的 Held-Out Code、QA、STEM、Math；仅使用第一方资料作为事实依据。

## 核查结果

找到了比原文更详细的前代技术报告，可补充评测类型、内容形态和方法背景；截至本次检索，未找到这四项对应的公开题集、具体题例、下载入口、数据许可或评估脚本。此处“未找到”限于下述检索范围，不代表已经证明任何入口都不存在。

## 本次文章明确披露的内容

| 评测          | 可确认的数据来源 | 内容细节边界                         |
| ------------- | ---------------- | ------------------------------------ |
| Held-Out Code | MAI 自有代码库   | 未列出具体仓库、文件、语言比例或样例 |
| Held-Out QA   | 委托供应商制作   | 未列出供应商名称、题型和领域构成     |
| Held-Out STEM | 委托供应商制作   | 未列出学科比例或难度分层             |
| Held-Out Math | 委托供应商制作   | 未列出数学分支或难度分层             |

四项均在留出文本上使用 BPB（bits per byte，越低越好），用于跨 tokenizer 比较；微软称所有评测集又与其训练数据进行过去污染。原文没有披露四项各自的条目数、字节量、语种、数据版本，亦未给出 BPB 的上下文长度、文本拼接、目标 token 掩码、字节编码与汇总实现。[2026-10-15 官方文章“How MAI-Base-2 Compares”](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/)、[配套 PDF，第 1 页图 1、第 3 页](https://microsoft.ai/pdf/Frontier-Pre-training-at-Microsoft-AI.pdf?v=2)

## 前代官方报告补充：可解释方向，不能证明版本一致

以下来自 MAI-Thinking-1 / MAI-Base-1 报告，不应直接当作 MAI-Base-2 四项的完整数据卡。

| 相关项目 | 前代报告提供的信息                                                                                                      | 定位                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Code     | 四项比较中的代码取自内部训练栈 YOLO；全称 You Only Launch Once，基于 PyTorch，负责模型训练。不是目标检测模型 YOLO。     | §2.7–2.8，PDF 第 23–24 页 |
| STEM     | NLL 套件的示例类型包括研究生级 STEM 题目的完整解答，由供应商制作。                                                      | Table 3，PDF 第 10 页     |
| Math     | 示例类型包括进阶数学题目的完整解答，由供应商制作。                                                                      | Table 3，PDF 第 10 页     |
| QA       | §2.7 说明其余比较集来自供应商；Table 3 的通识类别含供应商制作的高难度知识问答，但没有把该行与图 10 的 QA 明确逐项对应。 | Table 3、§2.7、图 10      |

前代四项是内部近 40 个 NLL 评测中的子集；数量“近 40”是评测个数，并非四项的题量。前代 §2.3.1 披露过公开评测去污染方法：去除 Hugging Face 及镜像来源，使用 20-gram 模糊去重、80% 相似阈值，同时承认方法不完美。新版只说改进并执行了去污染，没有确认继续使用完全相同的流程。[前代官方报告，§2.3、Table 3、§2.3.1、§2.7–2.8](https://microsoft.ai/pdf/mai-thinking-1.pdf)

**版本边界：** 两份报告具有相同的四类名称和相似来源说明，但新版没有公布评测版本对应关系。因此不能把前代题型、难度或流程写成新版已经确认的逐项规范。[新版说明](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/)、[前代说明](https://microsoft.ai/pdf/mai-thinking-1.pdf)

**评分含义：** 前代 §2.3.2 明确采用 next-token prediction 和 teacher forcing：每一步给定真实前文，计算目标文本的概率，以 NLL 评价。因此其评测方式不同于生成答案后统计正确率或 pass@k。新版将指标记为 BPB，但未提供完整实现，不能把通用 BPB 公式或自行编写的脚本视为官方实现。[前代报告，§2.3.2，PDF 第 11 页](https://microsoft.ai/pdf/mai-thinking-1.pdf)、[新版指标说明](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/)

## 公开入口检索记录与限制

- 阅读官方文章、其 13 页 PDF，以及前代 109 页 PDF 的评测相关章节，并查找 held-out、YOLO、vendor、graduate-level、deduplication、decontamination 等词。
- 用四项精确名称与 MAI、MAI-Base-2、MAI-Thinking-1、dataset、GitHub、HuggingFace 等词组合检索；另限制 `site:github.com/microsoft`、`site:huggingface.co/datasets/microsoft` 和 `site:microsoft.ai` 检索。
- 检查可发现的微软官方模型集合与 Foundry 发布索引。检索命中的 API 调用资料和模型发布记录没有形成这四项的题集入口；不能把这些产品文档当评测数据发布。[Microsoft Hugging Face collections](https://huggingface.co/microsoft/collections)、[Microsoft Foundry model-releases](https://github.com/microsoft-foundry/model-releases)
- 搜索引擎存在索引覆盖限制；没有枚举微软全部仓库、调用付费模型、联系供应商或访问私有资料。媒体转述、社区模仿脚本均未作为四项数据公开的证据。

## 收录时可采用的事实边界

可记录为微软内部预训练留出评测，并引用官方来源；可附前代报告背景，但须标明版本未确认。数据题量、供应商名称、样题、许可及可复现入口应记录为“官方未披露／本次未找到”。训练语料 token 总量、训练语料领域比例，以及后训练公开 benchmark，不属于这四项的题量或组成证据。
