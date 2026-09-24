# MathVista

核验日期：2026-09-23

## 官方身份

MathVista 是面向视觉场景数学推理的多模态基准，由论文作者发布数据、代码、评估脚本与榜单。官方论文发表于 ICLR 2024。[项目网站](https://mathvista.github.io/)；[论文](https://arxiv.org/abs/2310.02255)；[作者 GitHub](https://github.com/lupantech/MathVista)

## 官方定义与忠实中文概述

MathVista 将数学推理任务与图表、几何图形、教科书及其他视觉内容结合，目标是评估模型在视觉上下文中的数学推理能力。官方称它由 28 个既有数据集和三个新建数据集 IQTest、FunctionQA、PaperQA 组成。[项目网站](https://mathvista.github.io/)；[作者仓库](https://github.com/lupantech/MathVista)

## 任务输入/输出/环境

- **输入**：图像、问题文本；部分记录含选项、单位、精度、题目类别及图像来源元数据。[官方数据格式](https://github.com/lupantech/MathVista#data-format)
- **输出**：多选或自由回答。`question_type` 标识 `multi_choice` / `free_form`，`answer_type` 标注 text、integer、float 或 list；测试部分公开记录不提供标准答案。[官方仓库](https://github.com/lupantech/MathVista)
- **环境**：静态图像问答评测；官方脚本可选用 OCR/图像描述、few-shot 示例或代码执行等增强设置。报告分数需记录是否采用这些外部辅助信息和所用提示方案。[官方评测说明](https://github.com/lupantech/MathVista)

## 数据规模/split/字段/文件

- 官方网站报告 6,141 个实例，来自 28 个既有多模态数据集及 3 个新建数据集；官网另一处表述为 9 个 MathQA 数据集与 19 个 VQA 数据集加三个新建集合，均为 31 个来源集合。[官方项目网站](https://mathvista.github.io/)
- 官方 README 将数据分为 `testmini`（1,000 条）和 `test`（5,141 条）；`test` 的答案标签不公开。[作者仓库](https://github.com/lupantech/MathVista)
- 字段包括 `question`、`image`、`choices`、`unit`、`precision`、`answer`、`question_type`、`answer_type`、`pid`、`metadata` 和 `query`。元数据包含 split、language、尺寸、source、category、task、context、grade、skills。[官方字段说明](https://github.com/lupantech/MathVista)
- 原始 JSON 与 JPG 文件可从作者仓库/Hugging Face 下载；字段中的 `source` 与官方 `source.json` 用于辨识题目与图像的上游来源。[官方数据说明](https://github.com/lupantech/MathVista)

## 访问状态

作者公开 GitHub、项目页和 Hugging Face 数据集；图像也以 JPG 包发布。`testmini` 可用于开发/验证或资源受限评测；标准 `test` 的答案不公开。[作者仓库](https://github.com/lupantech/MathVista)

## 数据/代码/媒体许可与使用边界

作者声明新贡献的许可为 CC BY-SA 4.0，明确包括 IQTest、FunctionQA、PaperQA 的创建、对来源数据的筛选清理、评测实例标准化及元数据标注。作者同时明确：图像和原始问题的版权属于各自原作者，应通过每条 `metadata` 及 `source.json` 追溯来源。数据设计为测试集，可作为测试用途（包括商业测试）使用，禁止将数据用作训练集。[作者仓库许可段](https://github.com/lupantech/MathVista)

因此 CC BY-SA 4.0 不能直接概括成“MathVista 内每张图及每个原问题都由作者拥有并可自由转载”。公开页面若要出现一条真实题目或图像，必须先按具体 `pid` 读取来源记录，找到图像/问题原始发布方，核对其许可、署名、商用及再分发条件；若该来源授权不清、要求限制或无法定位，则不转载该条媒体/题文。本轮未对 6,141 条记录逐一完成许可清单，故没有任何真实图片或题目被判定为已获逐项转载批准。

## 官方样例与是否可在公开 GitHub Pages 转载

作者网页公开嵌有例题及数据可视化，但其中各题/图仍需服从其原始来源权利。**当前公开 GitHub Pages 仅介绍任务、提供规模统计与链接，不复制真实图片、图表、题文、选项或答案**。逐项计划展示某条记录时，需先以 `pid` 追踪 `metadata.source` 和 `source.json`，核验该媒体及题文各自许可，再按条件署名。[官方许可说明](https://github.com/lupantech/MathVista)

## 指标

榜单主要报告准确率，并按任务类型和数学推理类别细分；自由回答的标准化、答案抽取及代码执行设置会影响结果。发布比较时需说明模型、prompt/few-shot、是否使用 OCR/图注/代码执行以及评分器。[官方榜单](https://github.com/lupantech/MathVista)；[论文](https://arxiv.org/abs/2310.02255)

## 版本关系

基础发布包含 6,141 项及 `testmini`/`test` 两部分；testmini 用于开发验证，test 用于标准评测且答案标签不公开。引用结果需说明具体 split 和数据版本，不能将 testmini 开发分数与隐藏答案的标准 test 成绩混作同一评估。[作者仓库](https://github.com/lupantech/MathVista)

## 官方来源按角色分组

- **基准身份、总规模和来源组成**：[MathVista 项目网站](https://mathvista.github.io/)。
- **split、schema、评测、许可与逐条来源追溯说明**：[作者官方 GitHub](https://github.com/lupantech/MathVista)。
- **原始研究方法**：[MathVista 论文](https://arxiv.org/abs/2310.02255)。
- **数据入口**：[AI4Math/MathVista 官方 Hugging Face](https://huggingface.co/datasets/AI4Math/MathVista)。

## 模型发布引用

官方 testmini 榜单和其他研究报告采用的模型快照、工具和推理设置不同。引用模型成绩需注明 split、时间、提示与是否用 OCR/图像描述/代码执行；项目榜单仍可能变化，应记录抓取日期。[官方仓库榜单](https://github.com/lupantech/MathVista)

## 未核实项

- 6,141 条中的图像与问题未按 `pid` 逐项核对原始来源、许可证、授权和署名要求。
- 本轮未固定 Hugging Face revision、校验图像包哈希或对每张图执行来源归属检查。
- 公开榜单/第三方报告的模型设置和评分差异未逐条复核。

## 研究结论

**PASS_WITH_LIMITATIONS**：基准定义、6,141 总数、split、schema 和新贡献 CC BY-SA 4.0 条款均有作者一手资料；作者明确图像及原问题版权归原作者，并要求沿 metadata/source.json 追溯。须逐项清查 6,141 条媒体和问题权利后才能决定单条转载；当前公开页面不转载样例图片或题文，仅作介绍和链接。
