# MMLU

核验日期：2026-09-23。

## 官方身份

MMLU（Measuring Massive Multitask Language Understanding）由 Dan Hendrycks 等作者提出，论文发表于 ICLR 2021；作者仓库包含论文引用、评测代码并链接数据下载。[作者论文](https://arxiv.org/abs/2009.03300)；[作者仓库](https://github.com/hendrycks/test)

## 官方定义与忠实中文概述

MMLU 用多学科四选一题衡量文本模型的广域知识与问题求解。原始论文列出 57 个科目、15,908 题，覆盖 STEM、人文、社会科学及其他类别。它是通用学科知识题库，不是多模态题库，也不是后来 MMLU-Pro 或 OpenAI 多语言 MMMLU。[作者论文](https://arxiv.org/abs/2009.03300)

## 任务输入/输出/环境

- 输入是学科题目和四个候选答案；few-shot 设定从每科 development 样例构造提示，模型输出选项。[原论文](https://arxiv.org/abs/2009.03300)
- 输出为 A–D 选择，主要指标是分类准确率；论文分别报告 STEM、人文、社会科学、其他以及平均成绩。评测依赖答案提取/选项概率实现，提示构造和 zero/few-shot 不同的分数需分开说明。[作者论文](https://arxiv.org/abs/2009.03300)；[官方 evaluate.py](https://github.com/hendrycks/test/blob/master/evaluate.py)
- 静态文本测试，无外部环境。高分只能说明在该公开题库和设定上的表现；它不能单独证明实际专业工作能力或未见题泛化。[原论文](https://arxiv.org/abs/2009.03300)

## 数据规模/split/字段/文件

- 原始论文总计 15,908 题：每个科目 5 道 few-shot development；validation 1,540；test 14,079。57 科每科 test 至少 100 题。[作者论文数据统计](https://arxiv.org/abs/2009.03300)
- 作者仓库提供按学科划分的 test 文件下载入口和评分代码。常见官方原始 CSV 每行由 question、四个 choices 和答案组成，没有可信的稳定全局题目 ID 保证；一些第三方 Hugging Face 重打包版本添加 subject/id 或转成 Parquet，字段不可无说明互换。[作者仓库](https://github.com/hendrycks/test)；[原论文](https://arxiv.org/abs/2009.03300)
- 原始论文切分是 development、validation、test。不同后续镜像可能重新合并 subject、改名为 `all`/`validation` 或做字段转换；应以原始仓库文件和数据 revision 记录评测数据来源。

## 访问状态

作者仓库公开评估代码，并链接下载题库。官方仓库现有 MIT LICENSE，但代码仓库说明数据借鉴/引用 ETHICS；第三方镜像的在线 Viewer 不是本条原始数据的唯一官方入口。[作者仓库](https://github.com/hendrycks/test)

## 数据/代码/媒体许可与使用边界

作者仓库标注 MIT License；原始论文说明需同时引用 MMLU 和其借鉴的 ETHICS 数据。仓库级 MIT 文件明确适用于软件及其随附材料，但题库由多个科目/来源组成，未在本次查验到逐题来源的许可清单。故代码 MIT 不应单独作为任何上游试题内容都可无限制再发布的证明。正式网站宜描述题型、链至作者资料，避免镜像完整题目与答案键。没有图像/视频内容。[作者仓库 LICENSE](https://github.com/hendrycks/test/blob/master/LICENSE)；[作者 README 引用说明](https://github.com/hendrycks/test)

## 官方样例与是否可在公开 GitHub Pages 转载

原始题库长期公开，测试题和正确答案可从作者分发材料获取。作者没有在本次查到 Mind2Web 式“禁止在线再分发”声明；但因题源许可逐项未核清且公开全量题/答案加重测试泄漏，公开页面宜用自写抽象题型说明或链接官方题库，不复制测试题及答案键。本站已有第三方重打包样例不作为作者原始格式/官方行来源的证据。[作者仓库](https://github.com/hendrycks/test)；[作者论文](https://arxiv.org/abs/2009.03300)

## 指标

原始指标为选择题 accuracy，按 57 科和 Humanities、Social Sciences、STEM、Other 分组，并计算平均。引用对照结果时需报告 zero/few-shot、logit 选择或文本解析策略及汇总方法。原始论文数值为历史快照上的基准结果，不代表当前排行榜。[作者论文](https://arxiv.org/abs/2009.03300)；[作者仓库榜单](https://github.com/hendrycks/test)

## 版本关系

原始 MMLU 于 2020 年发布，后发表于 ICLR 2021；本条限于原始 57 科题库。CMMLU 等语言特定构造、MMMLU（MMLU test 的 14 语人工翻译）、MMLU-Pro（筛选/新增题与更多选项）都是不同数据集或衍生版。原始官方仓库未提供语义版本标签，报告应锁定数据包和代码 commit。[作者论文](https://arxiv.org/abs/2009.03300)；[原始仓库](https://github.com/hendrycks/test)

## 官方来源按角色分组

- **基准定义、构造、总题量和 split：**[Hendrycks 等作者论文](https://arxiv.org/abs/2009.03300)。
- **原作者仓库、数据下载链接、评测代码、MIT 文件：**[hendrycks/test](https://github.com/hendrycks/test)。
- **作者引用的 ETHICS 来源：**[Aligning AI With Shared Human Values](https://arxiv.org/abs/2008.02275)。

## 模型发布引用

报告应使用 “MMLU (original)” 并注明数据来源快照、是否使用 subject few-shot dev、shot 数、推理模板、答案抽取方式、各科/分组与总分聚合方式。须提示其 test 长期公开并存在数据暴露可能；不应声称已验证受测模型训练集无污染。[原作者论文](https://arxiv.org/abs/2009.03300)

## 未核实项

- 本次没有下载全部原始 subject 文件重新计数和验证行格式；规模来自原论文，仓库提供下载入口。
- 仓库 MIT 文件与题库第三方源材料的逐题授权边界没有完全厘清；避免复制原始问答内容。
- 官方原始资料没有污染豁免保证，也没有专门要求的 anti-training canary；全量测试数据公开会带来暴露风险，但不能仅据此断言任何具体模型受到了污染。

## 研究结论

**PASS_WITH_LIMITATIONS** — 原作者论文支持 MMLU 的任务定义、57 学科、15,908 总题量及三类 split，原仓库提供公开实现。代码的 MIT 许可不自动厘清所有题源内容；长期公开 test 使分数需要带上潜在污染限制，页面适宜只作概述并链接。
