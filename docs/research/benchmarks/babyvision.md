# BabyVision

核验日期：2026-09-23

## 官方身份

BabyVision 是 UniPat AI 团队与合作者发布的视觉推理 benchmark；官方论文 *BabyVision: Visual Reasoning Beyond Language* 于 2026-01-10 提交 arXiv，v2 于 2026-07-07 更新。官方 GitHub 与 UniPat AI 文章提供任务/评估说明。[论文](https://arxiv.org/abs/2601.06521)；[官方仓库](https://github.com/UniPat-AI/BabyVision)；[UniPat AI 官方文章](https://unipat.ai/blog/BabyVision)

## 官方定义与忠实中文概述

论文将 BabyVision 定义为测量多模态大模型基础视觉能力、尽量独立于语言知识的基准。正式数据集为 388 个项目，分成 22 个子类、四类：Fine-grained Discrimination、Visual Tracking、Spatial Perception、Visual Pattern Recognition。官方仓库另提供图像生成评测轨 BabyVision-Gen；不可把它当成 MLLM 问答轨的同义名称。[论文](https://arxiv.org/abs/2601.06521)；[官方仓库 README](https://github.com/UniPat-AI/BabyVision)

## 任务输入/输出/环境

- **MLLM Evaluation**：输入视觉推理问题和图像；模型按 `\boxed{Answer}` 格式回答；LLM judge 将回答与 ground truth 比对。
- **Generation Evaluation / BabyVision-Gen**：输入视觉谜题与图像标注指令；模型输出带圆圈、线或箭头等标注的图像；由 LLM 对生成图与 ground-truth 图像判定。
- 官方评测脚本使用模型 API 与独立 judge API 配置；生成轨另有生成/评估流程。是否使用 tools、thinking 或 pass@k 取决于模型调用及多轮配置，不能视为统一默认设置。[官方 README](https://github.com/UniPat-AI/BabyVision)

## 数据规模/split/字段/文件

- 论文报告主 benchmark 388 个样本、22 subclasses、4 categories；仓库和 Hugging Face Collection 分别列出 `BabyVision` 和 `BabyVision-Gen` 数据集。HF Collection 当前显示 MLLM Viewer 388 行，Gen Viewer 280 行；Viewer 行数不是论文所说的去重任务数/拆分定义，不在此等同。[论文](https://arxiv.org/abs/2601.06521)；[官方 HF Collection](https://huggingface.co/collections/UnipatAI/babyvision)
- 官方仓库内有 `babyvision_data.zip`、`babyvision_gen_data.zip`、`mllm_results.zip`；没有在所查官方材料中确认标准 train/validation/test split 名称或完整统一字段 schema。[官方仓库 README](https://github.com/UniPat-AI/BabyVision)
- 官方文章另介绍 BabyVision-Mini 为 20 个视觉任务的人类比较 pilot subset；Mini 是子集研究描述，不能与 388 项完整 benchmark 混用。[官方文章](https://unipat.ai/blog/BabyVision)

## 访问状态

数据访问入口指向作者维护的 Hugging Face Collection，其中列有 BabyVision 与 BabyVision-Gen 两个 Viewer；官方 GitHub README 则列明 `babyvision_data.zip` 与 `babyvision_gen_data.zip`。跑评测需要模型及 judge API。可下载不等于本站可再分发。[HF Collection](https://huggingface.co/collections/UnipatAI/babyvision)；[官方仓库 README](https://github.com/UniPat-AI/BabyVision/blob/main/README.md)

## 数据/代码/媒体许可与使用边界

仓库 License 段只写“released for research purposes”，没有给出明确标准许可文本；论文也未在已核材料中确认数据图片与答案可再分发。故对代码/数据权利分别不外推，复用状态记为待许可核实；不从 ZIP 或 Viewer 抽取题图、prompt、答案或结果作为站内样例。[官方仓库 License](https://github.com/UniPat-AI/BabyVision)

## 官方样例与是否可在公开 GitHub Pages 转载

官方文章展示若干带答案的任务示意图，且 HF 有数据 viewer；但没有确认这些图片、任务内容和标注可再分发。**不可据此将官方图表或题目复制进本站**。安全做法是提供官方文章、仓库、HF Collection 外链；将来须先取得明确的内容许可并按许可逐项处理。[官方文章](https://unipat.ai/blog/BabyVision)；[HF Collection](https://huggingface.co/collections/UnipatAI/babyvision)

## 指标

MLLM 与 Generation 两轨均报告 overall accuracy、type-wise accuracy、subtype-wise accuracy，以及多轮的 mean ± std；`correct / total_tasks` 是仓库给出的总体准确率口径。官方文章中 BabyVision-Mini 的 pilot 报告称平均 pass@1 accuracy（三次随机运行），该设置仅属于 Mini pilot，不能移植为全部 388 项默认协议。[官方仓库 README](https://github.com/UniPat-AI/BabyVision)；[官方文章](https://unipat.ai/blog/BabyVision)

## 版本关系

截至核验日 arXiv v2 日期为 2026-07-07；代码仓库 main 可继续变化。至少应区分完整 BabyVision MLLM 轨、BabyVision-Gen 生成轨及 BabyVision-Mini 20-task pilot 子集。仓库 README 标题提供的具体代码快照未固定，因此跨版本成绩需注明 paper version、repo commit、轨道、数据/子集和评测轮数。[论文版本记录](https://arxiv.org/abs/2601.06521)；[官方仓库](https://github.com/UniPat-AI/BabyVision)

## 官方来源按角色分组

- **定义/规模论文**：[arXiv:2601.06521](https://arxiv.org/abs/2601.06521)。
- **代码、轨道定义、指标与权利声明**：[UniPat-AI/BabyVision README](https://github.com/UniPat-AI/BabyVision)。
- **作者发布文章及 Mini/样例图**：[UniPat AI 官方文章](https://unipat.ai/blog/BabyVision)，发布日期 2026-01-12。
- **作者发布数据入口**：[UniPatAI HF Collection](https://huggingface.co/collections/UnipatAI/babyvision)。

## 模型发布引用

- **Kimi K3**：Moonshot 官方 Evaluation Results 的 Vision 表列出 `BabyVision w/ python`，必须保留 Python 工具条件。[Kimi K3 官方 README](https://github.com/MoonshotAI/Kimi-K3)
- **GLM-5.3-Flash、DeepSeek-V4.1-Flash、Qwen3.5-9B**：各自官方材料也列出 BabyVision，其中 DeepSeek 与部分 Qwen 表项带工具或双条件口径。它们均仅作为 `vendor-report`，不能改写 benchmark 定义。[GLM-5.3-Flash](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)、[DeepSeek 更新日志](https://api-docs.deepseek.com/updates/)、[Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B)
- 本轮核对的 MiniMax M2.1/M2.5/M2.7/M3 官方发布材料未确认对应 BabyVision 成绩行；不据此断言 MiniMax 从未评测。

## 未核实项

- 公开论文正文之外的 exact data split、每个子类计数、完整字段 schema 与当前 HF Viewer 行数关系未核实。
- BabyVision-Gen 的 280 行 HF Viewer 与生成任务的论文统计口径未逐样本对照。
- “research purposes”不是明确转载许可；题目数据、图片、结果和代码可能有不同权利。
- Kimi K3 表中 `w/ python` 的实际工具实现、采样次数、模型具体变体及表格脚注需随发布页逐项读取；不能只看 benchmark 名。

## 研究结论

**PASS_WITH_LIMITATIONS**：定义、任务、主数据规模和评分由作者论文、官方仓库及作者文章支持。数据可访问但未明确授权再分发，故不提供站内样例；Kimi K3 的厂商行必须保留 python 条件。
