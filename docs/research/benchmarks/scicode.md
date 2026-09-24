# SciCode

核验日期：2026-09-23。

## 官方身份

SciCode 由研究者团队提出，论文题为 *SciCode: A Research Coding Benchmark Curated by Scientists*，发表于 NeurIPS 2024 Datasets and Benchmarks Track。官方仓库维护评测代码，数据在作者关联的 SciCode1 Hugging Face 组织发布。[作者论文](https://arxiv.org/abs/2407.13168)；[官方仓库](https://github.com/scicode-bench/SciCode)；[作者数据集](https://huggingface.co/datasets/SciCode1/SciCode)

## 官方定义与忠实中文概述

该评测以科学研究问题为起点，考查模型结合科学知识、推理和程序合成完成计算与模拟任务的能力。官方 README 描述 80 个主问题拆分为 338 个子问题、覆盖 16 个子领域；列出的领域包括物理、数学、材料科学、生物和化学。README 后续另有一句称“6 个自然科学学科”，与前文“五个领域”存在口径不一致，故本站不补出第六个领域，采用前述明确列出的五个领域并保留该资料内差异。[官方仓库](https://github.com/scicode-bench/SciCode)

## 任务输入/输出/环境

- **输入**：科学问题描述、可选科学背景、子任务说明及函数输入输出约定。问题可拆成依赖先前步骤的多个代码子任务。
- **输出**：实现要求的函数或程序；评测执行由科学家标注的测试用例，验证数值/计算结果。参考实现与测试存在于原始数据记录，不应与可展示题面混为一项。
- **环境**：官方推荐使用 `inspect_ai` 集成。运行需要 SciCode 包、测试数值文件、模型接口配置及依赖；背景提供与否属于不同评测设置。旧的两步评测方法已被官方标为 deprecated。[官方仓库](https://github.com/scicode-bench/SciCode)

## 数据规模/split/字段/文件

- 官方仓库报告 80 个主问题、338 个子问题。作者 Hugging Face 页面展示 `problems_dev.jsonl`、`problems_test.jsonl` 等数据文件；其 viewer 显示 schema 包含问题名/ID、主问题描述与背景、输入输出、依赖、子步骤、参考解答与测试等字段。[作者数据卡](https://huggingface.co/datasets/SciCode1/SciCode)；[官方 dev 文件](https://huggingface.co/datasets/SciCode1/SciCode/blob/main/problems_dev.jsonl)
- 当前 viewer 将转换后的记录展示为 validation 行；它与源仓库的文件名/发布 split 标记并非同一套口径。总问题数以论文与仓库定义为准，具体 split 计数须固定数据 revision 后重新统计。

## 访问状态

作者公开 GitHub 代码、Hugging Face 数据页及 dev/test 文件入口，网页可访问。官方 README 指向外部下载的数值测试结果文件，并说明需将其放在规定路径运行；本轮没有下载数据集全部文件或执行评测。[官方仓库](https://github.com/scicode-bench/SciCode)；[作者数据集](https://huggingface.co/datasets/SciCode1/SciCode)

## 数据/代码/媒体许可与使用边界

SciCode 官方代码仓库的 LICENSE 为 Apache-2.0；作者 Hugging Face 数据卡也标记数据集为 Apache-2.0。本站将其作为作者对该发布集的许可声明记录，须保留许可与署名信息。代码仓库许可、数据集卡许可分别记录，不把评测结果或外部辅助文件的权利范围推演到未注明材料；本基准不含需本地托管的图像/视频媒体。[代码许可](https://github.com/scicode-bench/SciCode/blob/main/LICENSE)；[数据集许可与文件入口](https://huggingface.co/datasets/SciCode1/SciCode)

## 官方样例与是否可在公开 GitHub Pages 转载

现有站内样例为 dev split 中 `problem_id=10`、子步骤 `10.1`：`ewald_summation` 的 alpha 参数函数题。重新打开官方 `problems_dev.jsonl` 后，逐项核对了 `problem_name`、`problem_id`、`step_number` 和 `step_description_prompt`；页面保存的题面与源字段一致。本站保存的 `raw` 只含这四个题面身份/内容字段，没有复制同一子步骤记录中的 `ground_truth_code`、`test_cases`、参考答案或输出；样例来源、split 和 Apache-2.0 标签均指向作者数据页。[原始记录](https://huggingface.co/datasets/SciCode1/SciCode/blob/main/problems_dev.jsonl)

上述 dev 样例可在署名、保留许可并固定数据 revision 的条件下按数据卡声明转载。不要以此推及 test 题的完整展示，也不要把公开答案集当成隐藏留出评测。

## 指标

官方报告主问题解决率与子问题解决率：分别统计被判定解决的主问题或子问题比例，方向为越高越好。结果必须标明评测粒度、是否提供科学背景、执行器和测试判定设置；两种粒度不可互换。官方仓库的示例排行榜是特定模型和时间点的结果，不是固定通用运行协议。[官方仓库与榜单](https://github.com/scicode-bench/SciCode)

## 版本关系

论文版本发表于 2024 年；官方数据仓库在 2025 年开放 Hugging Face 数据入口，后续仓库公告还记录了背景评测支持和 `inspect_ai` 集成。数据文件发布 revision、评测代码及运行协议应共同锁定。SciCode 是独立科学编程评测，不与一般代码生成题库等同。[官方仓库](https://github.com/scicode-bench/SciCode)；[论文](https://arxiv.org/abs/2407.13168)

## 官方来源按角色分组

- **定义、构造、主/子问题规模、推荐运行方式及评测指标**：[SciCode 官方仓库](https://github.com/scicode-bench/SciCode)。
- **数据文件、schema、split viewer 与数据许可标记**：[作者 Hugging Face 数据集](https://huggingface.co/datasets/SciCode1/SciCode)。
- **背景、科学问题设计和研究方法**：[作者论文](https://arxiv.org/abs/2407.13168)。
- **Apache-2.0 代码文本**：[官方 LICENSE](https://github.com/scicode-bench/SciCode/blob/main/LICENSE)。

## 模型发布引用

比较模型结果时应说明子任务/主问题口径、背景信息设置、提示词、代码执行与依赖环境、测试文件版本和 `inspect_ai`/评测器版本。官方仓库 README 中的榜单带有明确模型及时间点；引用厂商报告时须另外记录其分数来源，不能当作官方统一重跑成绩。

## 未核实项

- 未锁定 Git/HF commit，也未下载全部数据来复核 80/338 的当前文件计数。
- 官方 README 的“五个领域”与后文“六个自然科学学科”文字冲突，未找到作者更正；避免推断缺少的类别。
- 未下载运行需要的外部数值测试文件，也未检查全部样例的逐条许可/质量。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方论文、代码仓库和作者数据卡支持评测身份、任务结构、规模、运行方式和 Apache-2.0 标记。现有一条 dev 样例已逐字段对照作者原始文件，且只保留题面字段；发布统计仍须固定具体数据 revision，官方资料的学科数量措辞不一致。
