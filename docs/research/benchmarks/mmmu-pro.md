# MMMU-Pro

核验日期：2026-09-23

## 官方身份

MMMU-Pro 是 MMMU 团队于 2024 年发布的多学科多模态基准增强版，论文标题为 *MMMU-Pro: A More Robust Multi-discipline Multimodal Understanding Benchmark*。作者仓库同时托管原版 MMMU 和 Pro 的评测代码与数据入口。[作者仓库与新闻](https://github.com/MMMU-Benchmark/MMMU#news)；[MMMU-Pro 论文](https://arxiv.org/abs/2409.02813)

## 官方定义与忠实中文概述

MMMU-Pro 基于 MMMU，筛掉可仅凭文本答对的问题、增加有迷惑性的选项，并加入将题目文字嵌入图片的 vision-only 设置；目标是提高对真实视觉理解与推理能力的测量强度。作者把它定义为更严格的多学科多模态评测，而非原版成绩的更新快照。[作者仓库介绍](https://github.com/MMMU-Benchmark/MMMU#introduction)

## 任务输入/输出/环境

- **输入**：大学课程和专业领域的问题及其图像；标准设置以文本问题和图像输入，vision-only 设置把题干也作为图像输入。模型可按评测设置接收选项。
- **输出**：选出一个选项；标准设置提供 10 个候选选项。对外报告需明确采用 Standard、Vision 或其他实现设置。
- **评测环境**：静态多模态问答。评测代码、提示格式和官方数据入口见[作者仓库](https://github.com/MMMU-Benchmark/MMMU/tree/main/mmmu-pro)。

## 数据规模/split/字段/文件

论文说明从原题筛选并审核后得到 1,730 道题，发布为两种输入形式：Standard 与 Vision-only 截图/照片，合计 3,460 个输入实例。论文实验另含 Standard 4-option（原选项数设置）对照；Standard 10-option 与 Vision 是 MMMU-Pro 的主要设置，论文综合分取两者得分平均。当前官方 Hugging Face Viewer 仅列 `standard (10 options)` 一个 `test` split、1,730 行。该 Viewer 的字段含 `id`、`question`、`options`、`explanation`、`image_1` 至 `image_7`、`img_type`、`answer`、`topic_difficulty`、`subject`；论文所述 Vision-only 是题目截图/照片输入，不应误认为同一 Viewer split。[作者数据集](https://huggingface.co/datasets/MMMU/MMMU_Pro)；[Pro 论文实验设置](https://arxiv.org/html/2409.02813#S2)

## 访问状态

官方数据卡及代码仓库公开；Standard 10-option 测试记录可从 Hugging Face 浏览。论文报告 Standard 和 Vision 两个主要设置及 4-option 对照，但浏览器核验到的 Hugging Face Viewer 只显示 Standard 10-option，不据此推断所有官方评测包装都已在该 Viewer 发布。[作者数据集](https://huggingface.co/datasets/MMMU/MMMU_Pro)；[Pro 论文](https://arxiv.org/html/2409.02813#S3)

## 数据/代码/媒体许可与使用边界

Hugging Face 数据卡标注 Apache-2.0，作者代码仓库另有 LICENSE。作者 README 说明标注者须遵守原始来源的网站版权和许可规则，并避免使用禁止复制再分发的材料；该总体说明和数据卡许可证没有提供每个嵌入图片及题目来源的逐条权利凭据。[数据卡许可](https://huggingface.co/datasets/MMMU/MMMU_Pro)；[作者版权说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)；[代码 LICENSE](https://github.com/MMMU-Benchmark/MMMU/blob/main/LICENSE)。因此本站可发布基准概述和官方链接，不转载题面、答案、解释或图片；欲转载某条目须先核验其来源、适用许可及媒体权利。

## 官方样例与是否可在公开 GitHub Pages 转载

官方 Viewer 展示含图像和答案的真实记录，但并未在该记录旁给出足以单独授权公开转载的逐项来源信息。本站只提供任务结构说明和数据卡链接，不复制样例、选项、答案或图片。官方许可证标签不替代嵌入媒体及上游题目来源的逐项权利审查。[官方数据卡及样例 schema](https://huggingface.co/datasets/MMMU/MMMU_Pro)；[作者版权说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)

## 指标

主要以答案准确率计分。论文的 MMMU-Pro 总分为 Standard 10-option 与 Vision-only 得分的算术平均；Standard 4-option 和原版 MMMU validation 只作比较参照。作者还比较 Direct 与 CoT，并在总体结果中报告两者较高值，因此跨报告比较须核对聚合方法、提示、图像呈现、选项数和工具设置。[Pro 论文实验设置](https://arxiv.org/html/2409.02813#S3)

## 版本关系

MMMU-Pro 是 MMMU 的衍生评测：作者明确列出过滤文本可答题、增加选项和 vision-only 三项改造。它与原版 MMMU 的数据及结果须分开标记。Pro 的常见报告至少要标明 Standard 10-option 或 Vision 设置；当前官方数据卡 Viewer 显示 Standard 10-option 的 `test` 记录。[作者仓库](https://github.com/MMMU-Benchmark/MMMU#introduction)；[Pro 数据卡](https://huggingface.co/datasets/MMMU/MMMU_Pro)

## 官方来源按角色分组

- **定义与版本关系**：[作者官方仓库](https://github.com/MMMU-Benchmark/MMMU#introduction)。
- **论文**：[MMMU-Pro arXiv](https://arxiv.org/abs/2409.02813)。
- **数据、schema 与发布许可标签**：[MMMU-Pro Hugging Face 数据卡](https://huggingface.co/datasets/MMMU/MMMU_Pro)。
- **代码与权利边界说明**：[作者仓库 LICENSE](https://github.com/MMMU-Benchmark/MMMU/blob/main/LICENSE)；[版权说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)。

## 模型发布引用

模型发布页报告的 MMMU-Pro 数值是该发布方使用特定提示、输入模式和计分实现所得。引用时应记录 Pro 的子集/输入设置、数据 revision 和是否启用工具；不能把原版 MMMU 或 Standard 10-option 成绩映射为 Vision 成绩。

## 未核实项

- 未逐条检查 1,730 条题目和图片的上游来源、权利人及许可；公开转载的媒体权利不能由仓库级许可证推定。
- 未复跑评测或核对任何模型厂商的结果配置。
- 本轮仅核验 Standard 10-option Viewer；其余数据包装和榜单快照未固定。

## 研究结论

**PASS_WITH_LIMITATIONS**：基准定义、衍生关系、Standard 10-option 规模、schema 和 Apache-2.0 数据卡标签均有第一方证据。原始题目和嵌入图像的逐项再发布权未完成核验，本站仅发布概述及官方链接，不转载样例。
