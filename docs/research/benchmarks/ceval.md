# C-Eval

核验日期：2026-09-23。

## 官方身份

C-Eval 是 HKUST-NLP 团队发布的中文基础模型综合评测套件，论文发表于 NeurIPS 2023；覆盖 52 个学科及四个难度层级。[官方仓库](https://github.com/hkust-nlp/ceval)；[论文](https://arxiv.org/abs/2305.08322)

## 官方定义与忠实中文概述

基准以中文考试式单项选择题评估模型跨学科知识与答题能力，题目覆盖 STEM、社会科学、人文学科及其他领域。其官方说明强调 C-Eval 是评估套件，不把某个模型成绩作为定义本身。[官方仓库](https://github.com/hkust-nlp/ceval)

## 任务输入/输出/环境

- 输入为一个中文问题、A–D 四个候选项；模型输出选项答案。官方示例数据行字段包括 `id`、`question`、`A`、`B`、`C`、`D`、`answer`、`explanation`。[官方仓库数据格式](https://github.com/hkust-nlp/ceval#data)
- 官方基线评估包含 zero-shot 与 five-shot；dev 为 few-shot 示例，val 用于调参，test 用于评估。基准是静态问答数据集，没有模拟器或交互式 agent 环境。[官方仓库](https://github.com/hkust-nlp/ceval#data)

## 数据规模/split/字段/文件

- 官方仓库报告总计 13,948 道选择题、52 个学科、四个难度层级；学科映射文件 `subject_mapping.json` 提供主题英文名、中文名和大类。[官方仓库](https://github.com/hkust-nlp/ceval)
- 按官方说明，各学科有 dev、val、test 三个 split；每科 dev 含 5 道带解释的示例，val 共 1,346 道。仓库新闻记录完整 test set 于 2025-07-27 发布；但同一 README 的旧版 Data 说明仍称 test 标签未公开并要求提交，文本存在版本口径冲突。当前 Hugging Face 数据浏览页显示 test 行及答案字段，因此展示此状态时应注明核验日期并以实际文件修订为准。[官方仓库](https://github.com/hkust-nlp/ceval#news)；[官方数据集卡与浏览器](https://huggingface.co/datasets/ceval/ceval-exam)
- 数据以按主题分组的 CSV 提供，仓库也给出 zip 下载和 Hugging Face `ceval/ceval-exam` 加载方式。官方数据字段为题目、四选项、答案及 explanation；浏览器所示样例的 explanation 为空。[官方仓库](https://github.com/hkust-nlp/ceval#data)；[Hugging Face 数据集](https://huggingface.co/datasets/ceval/ceval-exam)

## 访问状态

公开数据可从官方仓库链接的 Hugging Face 数据集获取；官方 GitHub 代码与文档公开。完整 test set 的发布公告日期为 2025-07-27；不要再沿用 README 中“test 标签尚未公开”的旧说明而不核对当前数据版本。[官方仓库](https://github.com/hkust-nlp/ceval)；[官方数据集](https://huggingface.co/datasets/ceval/ceval-exam)

## 数据/代码/媒体许可与使用边界

- 仓库把评估代码许可标为 MIT，把数据单独标为 CC BY-NC-SA 4.0；两者不能混用。数据复用须署名、限非商业用途並按相同方式共享，遵守该许可条件。[官方许可说明](https://github.com/hkust-nlp/ceval#licenses)；[数据集卡](https://huggingface.co/datasets/ceval/ceval-exam)
- 该套件是文字问答数据，没有图表或图片媒体授权事项。对外页面可链接官方资源；如转载题干、选项、答案或解释，应先确认发布用途满足 NC 条款，并按 CC BY-NC-SA 4.0 标注来源与许可。

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库包含题目示例，Hugging Face 页面可浏览题干、选项和答案。由于题库声明为 CC BY-NC-SA 4.0，只有符合非商业与相同方式共享条件并完整署名时，才具备该许可下的转载依据；当前建议 GitHub Pages 只作基准简介和官方链接，不复制真实题目与答案，以免站点用途或许可标注不匹配。[官方仓库许可及样例](https://github.com/hkust-nlp/ceval#data)

## 指标

官方报告 zero-shot、five-shot accuracy，并提供按主题和大类的结果。README 的历史 leaderboard 数值属于发布时结果，不作为当前排行榜值；当前比较应同时记录数据版本、prompt 设置与题目 split。[官方仓库](https://github.com/hkust-nlp/ceval#leaderboard)

## 版本关系

论文和基准初始公开于 2023 年；官方仓库记录完整 test set 于 2025-07-27 发布。C-Eval Hard 是从八个数学、物理和化学科目筛出的独立变体，不能与全量 52 学科 C-Eval 混称。仓库首页没有明确标出语义版本号；引用数据应注明仓库/Hugging Face revision。[官方仓库](https://github.com/hkust-nlp/ceval)

## 官方来源按角色分组

- 发布方仓库、数据格式、split 与许可：[hkust-nlp/ceval](https://github.com/hkust-nlp/ceval)
- 发布方数据镜像及当前可见字段：[ceval/ceval-exam](https://huggingface.co/datasets/ceval/ceval-exam)
- 基准论文：[C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models](https://arxiv.org/abs/2305.08322)
- 官方网站与榜单入口：[C-Eval Benchmark](https://cevalbenchmark.com/)

## 模型发布引用

厂商或模型团队报告的 C-Eval 数值只能作为其自报结果记录，并须核对 shot 数、split、答案解析方式与数据修订；不能由厂商报告推定题库定义、许可或官方基准状态。本记录未引用模型厂商报告。

## 未核实项

- README 中 test 答案发布情况有旧说明与 2025 年公告冲突；实际下载包的当前完整文件清单及修订哈希未在本次逐项下载核验。
- 13,948 为官方总数；本文没有从当前 CSV 对全部主题逐条重新计数，也未计算每个 split 的精确总量。
- 题目原始来源与逐题权利链未逐条核对；公开数据集许可不自动替代其他来源可能适用的权利。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方定义、规模、结构、评估模式与数据许可均可从第一方材料核验。对外可介绍并链接官方数据；真实题目仅在确认非商业用途及署名、相同方式共享等条件后转载。
