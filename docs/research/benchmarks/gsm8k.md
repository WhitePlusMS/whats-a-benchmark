# GSM8K

核验日期：2026-09-23

## 官方身份

GSM8K（Grade School Math 8K）是 OpenAI 发布的英语小学阶段数学文字题数据集，目标是考查需要多步基础算术推理的问题。作者论文为 Cobbe 等人的 *Training Verifiers to Solve Math Word Problems*（2021）。[官方仓库](https://github.com/openai/grade-school-math)；[作者论文](https://arxiv.org/abs/2110.14168)

## 官方定义与忠实中文概述

官方将 GSM8K 描述为约 8.5K 道由人工题目编写者创建的高质量、语言表达多样的数学应用题。解题通常需要 2–8 步基础算术，难度不超出早期代数；答案以自然语言展示推导，而不是只给公式。[官方仓库 README](https://github.com/openai/grade-school-math#dataset-details)；[论文](https://arxiv.org/abs/2110.14168)

## 任务输入/输出/环境

- **输入**：英文情景文字题。
- **输出**：给出推导及最终数值。官方原始答案可含 `<<...>>` 计算标注，最终数值位于 `####` 后；官方抽取示例按该标记读取答案。[官方仓库 README](https://github.com/openai/grade-school-math#solution-extracting)
- **环境**：数据集定义的是问答任务；计算器是否可用、是否提供演示、采样次数和答案归一化方式应按具体实验报告记录。原论文研究包含 verifier 与 best-of-N 设置，不应把它们当成所有 GSM8K 成绩的默认条件。[论文](https://arxiv.org/abs/2110.14168)

## 数据规模/split/字段/文件

- 作者仓库以约数表述：总计约 8.5K，约 7.5K train、约 1K test；文件为 `grade_school_math/data/train.jsonl` 和 `test.jsonl`。[官方仓库 README](https://github.com/openai/grade-school-math#dataset-details)
- 每行 JSON 含 `question` 与 `answer` 两个字符串字段。答案包含自然语言步骤、计算标注和 `####` 后的最终答案。[官方仓库 README](https://github.com/openai/grade-school-math#dataset-details)
- OpenAI 官方 Hugging Face 数据卡当前 `main` 配置显示 8.79k 行，train 约 7.47k；仓库 README 使用四舍五入口径。数据卡另列 `socratic` 配置，属于加入自动生成子问题的变体，作者说明该格式未用于论文实验；不要将它与标准 `main` split 混称。[官方数据卡](https://huggingface.co/datasets/openai/gsm8k)

## 访问状态

作者 GitHub 仓库公开原始 JSONL 与评测/计算器相关代码；OpenAI 名下的 Hugging Face 数据卡也公开提供 `main` 与 `socratic` 配置。原始 test 是公开数据，没有独立的私有留出集说明。[官方仓库](https://github.com/openai/grade-school-math)；[官方 Hugging Face 数据卡](https://huggingface.co/datasets/openai/gsm8k)

## 数据/代码/媒体许可与使用边界

OpenAI 官方 Hugging Face 数据卡将数据集许可标为 MIT，作者仓库也附有 MIT License 文件。[官方数据卡](https://huggingface.co/datasets/openai/gsm8k)；[仓库 LICENSE](https://github.com/openai/grade-school-math/blob/master/LICENSE) 仓库 LICENSE 文本自身使用“software and associated documentation”措辞；本记录据数据卡记录 MIT 标签，不将其扩展解释为第三方引用材料或衍生数据的法律意见。站内若展示原题，应保留 OpenAI 版权/许可声明和原始来源。

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库和官方数据卡本身公开题目、答案及推导；本轮查阅的作者资料未发现禁止在线披露样例的请求。数据卡标示 MIT，可按许可条件引用真实题目，但应注明数据集、split、记录标识与许可；公开 test 已可被训练语料和网页检索接触，站内转载不会保持其隐藏评测属性。[官方仓库](https://github.com/openai/grade-school-math)；[官方数据卡](https://huggingface.co/datasets/openai/gsm8k)

## 指标

常用口径是 test split 最终数值答案的准确率。官方代码通过 `####` 后的数值提取答案；使用自由生成时，数字格式归一、单位处理、答案抽取器、计算器、prompt 和采样方式均可能影响结果，需随成绩报告。[官方仓库 README](https://github.com/openai/grade-school-math#solution-extracting) 论文还评估 verifier 对候选解答排序的能力，那不是单纯的单次答案准确率。[作者论文](https://arxiv.org/abs/2110.14168)

## 版本关系

标准基准指仓库 `main` 数据文件及论文描述的 train/test。`socratic` 是额外提供的改写格式；官方明确指出其未用于论文实验。引用成绩时注明配置、split、数据版本/修订、推理与评分设定。仓库目前已归档为只读，不能据此认定数据不再被第三方镜像或改动。[官方仓库](https://github.com/openai/grade-school-math)；[官方数据卡](https://huggingface.co/datasets/openai/gsm8k)

## 官方来源按角色分组

- **定义、规模、字段与评分提取**：[OpenAI 官方 GitHub README](https://github.com/openai/grade-school-math)（Dataset Details、Solution Extracting）。
- **数据卡、当前配置、split 展示及许可标签**：[OpenAI 官方 Hugging Face 数据卡](https://huggingface.co/datasets/openai/gsm8k)。
- **研究设计与原始实验**：[Cobbe et al. 论文](https://arxiv.org/abs/2110.14168)。
- **仓库许可文本**：[OpenAI 仓库 LICENSE](https://github.com/openai/grade-school-math/blob/master/LICENSE)。

## 模型发布引用

模型发布报告引用的 GSM8K 成绩不是统一排行榜值。应核对是否使用 test、是否公开训练该 split、是否使用 calculator、few-shot 示例、推理预算、答案抽取器及采样策略；公开数据上的成绩尤其不能解释为对隐藏新题的泛化能力。[官方仓库](https://github.com/openai/grade-school-math)

## 未核实项

- 官方 README 使用约数，Hugging Face 当前展示的精确行数会随其 revision/转换而变；本轮未固定 revision 并逐行哈希原始 GitHub JSONL。
- MIT 标签适用于官方数据卡记录；对题目文本权利范围不作独立法律判断。
- 当前各模型发布成绩的提示、计算器、训练污染与答案归一设置未逐份核对。

## 研究结论

**PASS_WITH_LIMITATIONS**：作者论文、仓库、数据卡确认任务、字段、split、公开访问及 MIT 标签。公开 test 的暴露程度、不同实验设置及许可文本范围需要在引用或转载时明确，不能把一个具体分数泛化为统一 GSM8K 协议。
