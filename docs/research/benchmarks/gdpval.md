# GDPval

核验日期：2026-09-23

## 官方身份

GDPval 是 OpenAI 发布的现实工作任务评测，衡量模型在美国 GDP 相关行业中完成经济价值较高知识工作任务的能力。其完整任务语料与公开 gold 子集是不同访问范围；Artificial Analysis 的 GDPval-AA 则是使用公开 gold 子集的第三方评测，不是 GDPval 本身。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)；[OpenAI 公开数据集卡](https://huggingface.co/datasets/openai/gdpval)

## 官方定义与忠实中文概述

OpenAI 将 GDPval 描述为覆盖 44 个职业、9 个主要行业的真实工作任务评测。任务围绕现实工作成品构造，例如法律材料、工程图、客户支持对话或护理计划；模型需要根据提示及参考文件制作相应交付物。任务由相关职业的资深从业者设计和审阅。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)

## 任务输入/输出/环境

- **输入**：工作任务 prompt 和该任务的参考文件；数据卡说明每题包含文本提示及支持文件，附件可以是不同格式。[OpenAI GDPval 数据集卡](https://huggingface.co/datasets/openai/gdpval)
- **输出**：按任务要求生成文档、幻灯片、表格、图表或其他工作成品文件；评分依据任务 rubric 与成品质量，不是固定的短答案格式。[GDPval 论文](https://arxiv.org/abs/2510.04374)
- **环境**：GDPval 的不同运行方可配置不同模型、工具、执行时长和辅助手段。OpenAI 初始评测使用与任务职业相符的专业评审，盲评 AI 成品与任务作者成品，给出 better/as good as/worse than 的比较判断。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/#how-we-grade-model-performance)

## 数据规模/split/字段/文件

- OpenAI 报告完整 GDPval 有 1,320 项任务，覆盖 44 个职业和 9 个行业；其中 220 项组成公开 gold 子集，每职业 5 项。公开子集不是完整语料的同义词。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)
- Hugging Face `openai/gdpval` 当前展示一个 `train` split、220 行。可见字段包括任务 ID、行业、职业、prompt、参考文件路径/URL、deliverable 文件路径/URL、可读 rubric 和 JSON rubric。[数据集 viewer 与卡片](https://huggingface.co/datasets/openai/gdpval)
- 任务是多文件成品型任务；不能把 HF Parquet 的一行预览理解为任务完整输入本身，实际执行还需取用关联的参考附件。

## 访问状态

公开 gold 子集在 OpenAI 官方 Hugging Face 数据集提供；OpenAI Evals 还提供 GDPval 介绍及公开 grading 页面入口。[Hugging Face 数据集](https://huggingface.co/datasets/openai/gdpval)；[OpenAI Evals grading](https://evals.openai.com/gdpval/grading) 本轮未发现完整 1,320 项任务可供公众下载的第一方入口，因此完整集剩余部分记为“官方公开入口未核实”，不推断其不存在。

## 数据/代码/媒体许可与使用边界

Hugging Face 数据卡披露数据包含部分成人、酒精、粗俗语言及政治主题，并说明少量第三方品牌/商标只用于研究和评测、并非背书；卡片未显示一个明确的全包数据集许可证。**不得仅因 220 项公开下载，就推断任务文本、附件、图像、参考答案及第三方材料都允许整体复制。**需对拟转载具体文件单独核对权利与 OpenAI 当前条款。[OpenAI 数据集卡 disclosure](https://huggingface.co/datasets/openai/gdpval)

## 官方样例与是否可在公开 GitHub Pages 转载

OpenAI 的介绍页和公开数据卡可以浏览任务信息，数据卡也含 prompt 和附件链接。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)；[数据集](https://huggingface.co/datasets/openai/gdpval) **结论：可链接官方页面，并自行概述输入和交付物类型；在未取得明确授权/许可证确认前，不将完整 prompt、参考文件、rubric 或交付成品转载到公开 Pages。**

## 指标

OpenAI 原始评测采用职业领域专家的盲法成品比较，评审对 AI 与任务作者提交物进行排序，并按 better、as good as、worse than 分类。具体报告分数应同时标明比较对象、评审方式、任务子集及运行配置；这类专家比较结果不能与 AA 的 Elo、自动 rubric 分或其他厂商自报百分比直接互换。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/#how-we-grade-model-performance)；[GDPval 论文](https://arxiv.org/abs/2510.04374)

## 版本关系

OpenAI 将发布时的评测称为 GDPval 第一版，并表示未来版本可能扩展职业、行业和任务类型。引用分数时需固定评测论文/报告日期、任务快照、公开或完整集合范围及运行配置。AA GDPval-AA v2.1 是基于上游公开 gold 任务的独立协议版本，应另立条目记录。[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)；[AA GDPval-AA v2.1](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 官方来源按角色分组

- **基准定义、任务设计、专家评分**：[OpenAI 发布介绍](https://openai.com/index/gdpval/)；[GDPval 论文](https://arxiv.org/abs/2510.04374)。
- **公开 gold 数据与字段**：[OpenAI `openai/gdpval` 数据集卡](https://huggingface.co/datasets/openai/gdpval)。
- **评分服务入口**：[OpenAI Evals GDPval grading](https://evals.openai.com/gdpval/grading)。
- **第三方派生协议（不是 GDPval 原始定义）**：[Artificial Analysis GDPval-AA](https://artificialanalysis.ai/evaluations/gdpval-aa)。

## 模型发布引用

OpenAI 发布文及论文中报告的 GDPval 成绩属于 OpenAI 所述评测运行，按其使用的模型、子集、专家比较和报告配置理解。Artificial Analysis 的 GDPval-AA Elo 属另一评测方的 agent harness 与成对裁判结果；两者不可合并成一个分数口径。[OpenAI GDPval](https://openai.com/index/gdpval/)；[AA GDPval-AA](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 未核实项

- 完整 1,320 项任务的公众访问路径、其余 1,100 项的任务 ID 与是否保留集状态未由本轮第一方下载入口核实。
- 数据卡中的全套附件、参考成品与 rubric 是否分别含第三方内容及各自许可，未逐文件核对。
- OpenAI Evals grading 页面本轮可见内容有限，公开服务的完整调用约束、账户条件与当前版本未核实。
- 不同外部报告的工具、推理时长、代理 harness 与专家评审配置不统一，不能仅依 benchmark 名称比较成绩。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 官方明确了 GDPval 的现实工作任务定义、1,320/220 规模、44 职业与专家盲评流程；公众可访问的是 220 项 gold 子集。完整集访问范围及对公开附件的再发布许可仍需保持未核实状态。
