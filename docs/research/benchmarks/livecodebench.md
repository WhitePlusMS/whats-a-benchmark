# LiveCodeBench

核验日期：2026-09-23

## 官方身份

LiveCodeBench 是研究者发布的动态代码能力 benchmark，官方仓库描述其跨 LeetCode、AtCoder、Codeforces 持续收集新题，并覆盖代码生成、代码执行、自我修复和测试输出预测等任务。它与后续单独定义的 LiveCodeBench Pro 是两个 benchmark。[LiveCodeBench 官方仓库](https://github.com/LiveCodeBench/LiveCodeBench)；[原论文](https://arxiv.org/html/2403.07974)

## 官方定义与忠实中文概述

原版 LiveCodeBench 旨在以时间窗口降低静态题库造成的数据污染，并扩展只看代码生成的评测范围。题目持续新增，模型可按 release/date 窗口评估；因此任何结果都必须说明任务场景和 release 版本。[官方 README](https://github.com/LiveCodeBench/LiveCodeBench#introduction)；[论文](https://arxiv.org/html/2403.07974)

## 任务输入/输出/环境

- 输入/输出依场景不同：code generation 接收竞赛题并输出程序；code execution 评估代码执行能力；test output prediction 要预测给定代码与输入的执行输出；self-repair 版本将测试反馈用于修复。[官方仓库](https://github.com/LiveCodeBench/LiveCodeBench#data)；[官方 code generation 数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite)
- Code generation 官方 runner 支持 vLLM/open model 与闭源 API；README 示例参数为 n=10、temperature=0.2。运行生成代码应采用隔离容器和明确超时，且记下 scenario、release tag、执行 checker 版本与模型参数。[官方 README](https://github.com/LiveCodeBench/LiveCodeBench#inference-and-evaluation)

## 数据规模/split/字段/文件

- 官方主仓库列出 `release_v1` 至 `release_v6`：截至 2025-04 的 v6 为 1,055 道题；原始 v1（2023-05 至 2024-03）为 400 道题。release 按题目公开日期而非机器学习训练集的 train/validation/test 随机切分。[官方版本表](https://github.com/LiveCodeBench/LiveCodeBench#dataset-versions)
- 官方 Hugging Face code_generation_lite 卡说明题目记录含 problem description、input/output examples、hidden test cases，并带 difficulty 与 release date；lite 版本为减少大数据体积而修剪/抽样测试，官方之后用它作 code-generation 评测。[官方数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite)
- 另有 code execution、test_generation、execution 等独立场景数据集，样本规模和字段不同，不应把特定子场景 count 说成整个 benchmark 的样本总数。[官方组织数据列表](https://huggingface.co/livecodebench)

## 访问状态

官方 GitHub 仓库和 Hugging Face 组织提供公开代码/数据入口及固定 release 参数；不同场景数据集分别发布。排行榜页面按 pass@1 等字段展示代码生成结果。[官方仓库](https://github.com/LiveCodeBench/LiveCodeBench)；[官方数据组织页](https://huggingface.co/livecodebench)

## 数据/代码/媒体许可与使用边界

LiveCodeBench 官方工具仓库根目录为 MIT 许可；这许可的是该仓库代码，不能据此自动判定题目正文、样例和测试等来自 LeetCode、AtCoder、Codeforces 的第三方竞赛内容也为 MIT。Hugging Face 官方数据页的 `license` metadata 当前显示通用值 `cc`，没有明确到 CC 版本；不可把它擅自扩展为 CC-BY-4.0 或据此覆盖源站条款。代码、benchmark 汇编/测试和原竞赛文本需分别审查。公开 Pages 建议只写原创简介、版本/指标信息并链接源站，不复制题面/测试。[工具仓库 MIT 文件](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/LICENSE)；[官方数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite)

## 官方样例与是否可在公开 GitHub Pages 转载

官方 README 和数据卡公开可查看代码场景、版本表与结构说明。[LiveCodeBench README](https://github.com/LiveCodeBench/LiveCodeBench)；[code_generation_lite 数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite) **不复制具体竞赛题面、完整样例/答案和隐藏测试**；用自写抽象案例阐明场景，并链接官方数据卡。官方仓库软件 MIT 许可不等于原竞赛题面授权。

## 指标

- code generation 主指标为 pass@1 和 pass@5，使用官方修改版 APPS checker；生成时仓库 README 默认采用多样本设置，实际报告仍要写清 release、scenario、n、temperature 与生成/评测超时。[官方 README](https://github.com/LiveCodeBench/LiveCodeBench#evaluation)
- 官方说明评测时限可能造成轻微分数浮动；可按日期窗口过滤题目以应对特定知识截止日期/污染分析。[官方 README](https://github.com/LiveCodeBench/LiveCodeBench#evaluation)
- 其他场景各有专属度量；不要把 code execution 或 test output prediction 的计分直接称作 code-generation pass@1。[官方数据场景说明](https://github.com/LiveCodeBench/LiveCodeBench#data)

## 版本关系

LiveCodeBench 是滚动更新 benchmark。官方列出的 v1-v6 逐步扩展收题时间窗和题数；`release_latest` 默认可随仓库更新而变化，应固定 release tag/代码 commit。`code_generation_lite` 是对较大 code-generation 测试用例进行删减/抽样的官方较轻数据，README 表示评测性能估计相似且作为后续默认版本，不能等同于原始完整版。[官方版本记录与 lite 说明](https://github.com/LiveCodeBench/LiveCodeBench#dataset-versions)；[数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite)

## 官方来源按角色分组

- **benchmark 定义、release 时间窗、运行和分数：**[LiveCodeBench 官方 GitHub 仓库](https://github.com/LiveCodeBench/LiveCodeBench)。
- **问题字段、lite 版与官方更新记录：**[code_generation_lite 数据卡](https://huggingface.co/datasets/livecodebench/code_generation_lite)。
- **官方代码许可：**[LiveCodeBench/LICENSE](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/LICENSE)。
- **官方论文：**[LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code](https://arxiv.org/html/2403.07974)。

## 模型发布引用

模型厂商和官方 leaderboard 的数字可能使用不同 release、场景、生成样本数或日期过滤，不能按 benchmark 名称直接横比。引用时应注明 release（例如 release_v6）、scenario、lite/full、pass@k、采样配置和 checker 版本，并将 leaderboard 当前值与论文历史快照分开。[官方仓库评测说明](https://github.com/LiveCodeBench/LiveCodeBench#inference-and-evaluation)

## 未核实项

- `cc` 是 Hugging Face 卡上的通用 license 元数据，没有指定具体许可文本；题目与测试的逐平台再分发条款未在 LiveCodeBench 软件仓库中汇总。
- 主仓库的当前 `release_latest` 与数据卡版本可能随时间变化；发布成绩时需重新固定数据 revision 和题目日期区间。
- Lite 测试删减/抽样的精确文件级映射及每个 release 下的当前问题数，不能仅由总体 release README 完整重建。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方仓库/数据卡清楚说明动态收题、release_v1-v6、题场景、lite 集用途及 pass@k。工具代码采用 MIT；竞赛题和测试来源为第三方，数据卡只有未细化的 `cc` 标记，因此不建议本站复制问题或测试。引用时应固定 release 和场景。
