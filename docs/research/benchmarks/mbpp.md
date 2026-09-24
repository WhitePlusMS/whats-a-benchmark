# MBPP

核验日期：2026-09-23

## 官方身份

MBPP（Mostly Basic Python Problems）是 Google Research 发布的 Python 函数代码生成评测集，论文为 *Program Synthesis with Large Language Models*。官方描述其任务由众包创建，面向入门程序员，包含题目描述、参考实现与自动测试。[官方项目目录](https://github.com/google-research/google-research/tree/master/mbpp)；[论文](https://arxiv.org/abs/2108.07732)

## 官方定义与忠实中文概述

MBPP 通过自然语言编程任务要求模型生成 Python 函数，并以测试用例检查行为。官方称其覆盖编程基础与标准库功能；sanitized 子集经人工复核任务描述。[官方 README](https://github.com/google-research/google-research/tree/master/mbpp)；[官方 Hugging Face 数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)

## 任务输入/输出/环境

- **输入**：自然语言任务说明，部分评估提示还会附测试用例与必要导入。[官方仓库](https://github.com/google-research/google-research/tree/master/mbpp)
- **输出**：可执行的 Python 函数/程序，通过题目指定的单元测试。常见指标为 pass@k；任务运行环境、超时、测试隔离及代码执行安全配置需要随结果一并记录。[论文](https://arxiv.org/abs/2108.07732)
- **环境**：代码生成后通过自动化测试验证，不要求长上下文或图像输入。[官方 Hugging Face 数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)

## 数据规模/split/字段/文件

- 官方仓库称共有 974 道任务，按 task ID 约束 train/test/prompt/validation 用途；IDs 11–510 用作测试、1–10 用于 few-shot、511–600 用于验证、601–974 用于训练。[官方 README](https://github.com/google-research/google-research/tree/master/mbpp)
- Hugging Face full 配置为 974 行；`sanitized` 配置为 427 行。HF 页面汇总展示其数据集 split 名称，作者原始仓库 README 则以 task ID 说明推荐用途，二者是不同描述层次。[HF 数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)；[Google Research README](https://github.com/google-research/google-research/tree/master/mbpp)
- full 字段包括 `task_id`、`text`、`code`、`test_list`、`test_setup_code`、`challenge_test_list`；sanitized 字段包括 `source_file`、`task_id`、`prompt`、`code`、`test_imports`、`test_list`。[HF 数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)

## 访问状态

Google Research 仓库公开 `mbpp.jsonl` 和 `sanitized-mbpp.json`；Google Research Datasets 的 Hugging Face 页面公开 full 与 sanitized 配置。[官方 GitHub](https://github.com/google-research/google-research/tree/master/mbpp)；[官方 Hugging Face](https://huggingface.co/datasets/google-research-datasets/mbpp)

## 数据/代码/媒体许可与使用边界

必须区分数据与代码许可：

- **数据**：官方 Google Research Datasets Hugging Face 数据卡将 MBPP 标为 CC BY 4.0。[数据卡许可元数据](https://huggingface.co/datasets/google-research-datasets/mbpp)。在符合署名、许可链接及标记修改等 CC BY 4.0 条件下，可据该数据门户声明评估数据再利用；引用该数据应保留 Austin 等作者与来源信息。
- **代码**：Google Research GitHub 总仓库的 `LICENSE` 为 Apache-2.0，许可仓库源代码。该代码许可证不取代 Hugging Face 对数据记录标注的 CC BY 4.0，也不应把 `mbpp.jsonl` 内每一段参考代码都称为 Apache 代码。[GitHub LICENSE](https://github.com/google-research/google-research/blob/master/LICENSE)；[HF 数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)。

本轮未逐条核验 974 项任务描述、参考代码与测试是否存在另行声明的第三方来源；HF 数据卡声明该数据集采用 CC BY 4.0，公开转载时应附数据集署名、许可链接，并标明选择、改写或翻译等变更。

## 官方样例与是否可在公开 GitHub Pages 转载

与前四项不同，MBPP 数据门户明确给出 CC BY 4.0 数据许可，因此可在遵守署名、链接与修改标注的条件下公开转载选定的数据题目/代码/测试。但本研究页不复制具体题面，避免无必要地镜像测试集；仅保留简述和官方数据链接。许可证声明指数据本身，不应与 Google 仓库 Apache-2.0 代码许可混为一谈。[官方数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)；[Google Research 代码仓库](https://github.com/google-research/google-research)

## 指标

论文使用 pass@k 等代码生成指标，通过样例程序执行测试判断成功。结果受生成次数、解码、测试集版本、执行超时、依赖、沙箱和任务过滤影响；报告须同时提供这些协议，不应仅给一个分数。[原论文](https://arxiv.org/abs/2108.07732)

## 版本关系

`full`（974 条）与 `sanitized`（427 条）是不同版本/子集。sanitized 的条目经人工核验或整理，数量更小；常见 `MBPP+`、其他强化测试集为后续扩展，不是原始 MBPP 的同义名称。报告成绩须明确 full/sanitized、split/task IDs 与评测脚本版本。[官方仓库](https://github.com/google-research/google-research/tree/master/mbpp)；[官方数据卡](https://huggingface.co/datasets/google-research-datasets/mbpp)

## 官方来源按角色分组

- **任务定义、数据文件与 task ID 用途**：[Google Research MBPP](https://github.com/google-research/google-research/tree/master/mbpp)。
- **数据规模、schema 与 CC BY 4.0 数据许可标签**：[Google Research Datasets Hugging Face](https://huggingface.co/datasets/google-research-datasets/mbpp)。
- **研究方法与指标**：[Austin et al. 论文](https://arxiv.org/abs/2108.07732)。
- **代码许可**：[Google Research 仓库 LICENSE](https://github.com/google-research/google-research/blob/master/LICENSE)。

## 模型发布引用

不同 MBPP 报告可能使用 full 或 sanitized、不同 task ID 范围、pass@k 采样数与测试 harness。引用成绩须注明数据版本、split/IDs、生成采样次数、温度、pass@k、运行限制和代码沙箱，不能把 sanitized、MBPP+ 与 full 原版成绩合并比较。

## 未核实项

- 本轮未逐项核对 974 道记录与所有参考代码片段的第三方来源或附加权利声明。
- 未冻结 Google Research commit 或 HF revision，未计算数据文件哈希。
- 不同运行器的容器隔离、超时和隐藏测试差异未逐项比对。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方资料确认 974 题 full、427 题 sanitized、结构字段和任务划分。数据门户单独声明 CC BY 4.0；GitHub 源代码许可为 Apache-2.0，二者不可混用。按数据 CC BY 4.0 署名、提供许可链接并注明改动后，公开转载具有官方数据许可依据；本页只作介绍和官方链接。

