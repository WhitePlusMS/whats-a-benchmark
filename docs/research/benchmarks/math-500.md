# MATH-500

核验日期：2026-09-23

## 官方身份

MATH-500 通常指 OpenAI 在 *Let's Verify Step by Step* 工作中从 Hendrycks MATH 测试集留出的 500 道题。它是固定抽取的子集，不能称为另一个独立原始题库。官方 OpenAI PRM800K 仓库说明：其评测把 4,500 道原测试题纳入训练，只以均匀随机选出的其余 500 道 held-out 题评测。[PRM800K 官方仓库](https://github.com/openai/prm800k)；[原论文](https://arxiv.org/abs/2305.20050)

## 官方定义与忠实中文概述

MATH 是竞赛数学问题数据集；MATH-500 是 PRM800K 研究中保留作测试的 500 题子集。后来常见的 `HuggingFaceH4/MATH-500` 数据集卡明确将其描述为来自 MATH 的 500 题子集，并链接 OpenAI PRM800K 源文件。[MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)；[PRM800K README](https://github.com/openai/prm800k)

## 任务输入/输出/环境

- **输入**：英语数学问题，含自然语言和 LaTeX 数学表达。[MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)
- **输出**：模型生成的解答或最终答案。常见测评抽取最终答案并与标准答案比较；结果依赖答案抽取器、规范化、提示、采样和评分器。
- **环境**：静态数学推理。原始工作使用该 held-out 子集评估模型生成的解题轨迹；单独报告 MATH-500 最终答案准确率时，应说明它与过程监督实验的指标不同。[PRM800K 官方仓库](https://github.com/openai/prm800k)

## 数据规模/split/字段/文件

- OpenAI 说明从 MATH 官方 test 中均匀随机选取 500 道题作为 held-out test；其余 4,500 道 MATH test 题并入训练集以降低过拟合风险。[PRM800K 官方 README](https://github.com/openai/prm800k)
- `HuggingFaceH4/MATH-500` 发布为 500 行子集，记录包含问题、解答、答案、科目、难度及来源标识等字段；具体字段以该数据卡固定 revision 为准。[数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)
- PRM800K 仓库的 `math_splits/train.jsonl` 与 `math_splits/test.jsonl` 是该项目非标准 MATH 划分；这两个文件不等同于 Hendrycks MATH 原版 train/test 划分。[PRM800K README](https://github.com/openai/prm800k)

## 访问状态

MATH-500 的 Hugging Face 镜像和 OpenAI PRM800K 源仓库可公开访问；PRM800K 中相关文件通过 Git LFS 提供。公开可得并不能替代对派生文件是否获得再分发授权的核验。[MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)；[PRM800K 仓库](https://github.com/openai/prm800k)

## 数据/代码/媒体许可与使用边界

许可需要分开理解：OpenAI PRM800K 仓库和 Hendrycks MATH GitHub 仓库都放有 MIT LICENSE；它们是各自仓库内的许可证文件。MATH-500 的 Hugging Face 数据卡没有展示明确的 license 元数据，数据卡也将来源指向 PRM800K 中的 MATH 划分文件。仅凭仓库中存在 MIT LICENSE，不能在未核实许可覆盖范围、派生子集的文件来源及其所含原始题目的权利链前，断定任何复制方式均可用于本网站。[PRM800K LICENSE](https://github.com/openai/prm800k/blob/main/LICENSE)；[MATH LICENSE](https://github.com/hendrycks/math/blob/main/LICENSE)；[MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)

当前公开 GitHub Pages 只展示基准介绍、500 题来源说明和官方链接，不复制题目、答案、解答或截图。若将来拟转载，需先核对固定 revision 对应的原文件和许可证文本，并记录出处与修改情况；本卡不作法律解释。[OpenAI PRM800K 仓库](https://github.com/openai/prm800k)

## 官方样例与是否可在公开 GitHub Pages 转载

OpenAI 仓库和 Hugging Face 浏览页存在可见题目样例，但本卡不复述。考虑到 MATH-500 是派生集，而其数据门户没有单独列明数据许可，**公开 GitHub Pages 不转载真实题目、完整解答、最终答案或原始截图**；仅作不含题文的说明和来源跳转。[PRM800K 仓库](https://github.com/openai/prm800k)；[MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)

## 指标

常见汇总指标为最终答案准确率，OpenAI PRM800K 原工作还涉及基于多条采样解题轨迹的 best-of-N 评估及过程奖励模型评估。它们是不同指标；报告必须说明采样数、温度、答案解析/等价判断器、推理预算及是否评估过程步骤。[PRM800K README](https://github.com/openai/prm800k)

## 版本关系

MATH-500 固定对应 PRM800K 研究选出的 500 题 split；Hugging Face 社区镜像是对该子集的另一发布渠道。其他机构重采样的 500 题、“MATH500 hard”或后来重新加工的集并非自动等同此子集。引用成绩需记录来源仓库及 revision。[PRM800K README](https://github.com/openai/prm800k)；[HuggingFaceH4 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)

## 官方来源按角色分组

- **500 题抽样与非标准划分**：[OpenAI PRM800K README](https://github.com/openai/prm800k)。
- **原始 MATH 定义与原仓库许可文件**：[Hendrycks MATH 仓库](https://github.com/hendrycks/math)；[MATH 论文](https://arxiv.org/abs/2103.03874)。
- **便于访问的 MATH-500 镜像及其来源说明**：[HuggingFaceH4/MATH-500 数据卡](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)。
- **PRM800K 研究背景**：[Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)。

## 模型发布引用

MATH-500 分数常见于不同模型报告，但没有单一统一提示、解码、采样和答案抽取流程。引用厂商成绩时应记录模型版本、提示、推理预算、采样策略、规范化与答案等价评分器，并注明与官方 500 题划分的对应版本。

## 未核实项

- Hugging Face MATH-500 镜像未列出清楚的数据许可证元数据；MIT 仓库许可证对派生题目文件的具体覆盖范围未作法律解释。
- 本轮未将镜像 500 行与 PRM800K Git LFS 文件逐行比较，也未冻结 revision 或校验哈希。
- 不同公开报告采用的答案抽取器、符号等价规则和采样预算未逐一审计。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方来源确认 MATH-500 是 MATH test 中均匀随机抽出的 500 道 held-out 题，且可定位 PRM800K 与原 MATH 仓库。仓库中存在 MIT 许可，但 Hugging Face 派生数据镜像没有单列许可，本轮未完成派生题目权利覆盖核验。公开 GitHub Pages 只介绍并链接来源，不转载题面、答案、完整解答或截图。
