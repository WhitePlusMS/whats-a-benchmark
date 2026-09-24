# GeneBench-Pro

核验日期：2026-09-23

## 官方身份

GeneBench-Pro 是 OpenAI 发布的研究级计算生物学智能体 benchmark，覆盖基因组学、定量生物学与转化医学。它扩展了 OpenAI 的 GeneBench，侧重模型在真实分析流程中的判断、探索和迭代，而不是单项生物学知识问答。[OpenAI GeneBench-Pro 介绍](https://openai.com/index/introducing-genebench-pro/)；[论文](https://cdn.openai.com/pdf/6dc7175d-d9e7-4b8d-96b8-48fe5798cd5b/oai_genebench_benchmark.pdf)

## 官方定义与忠实中文概述

每道题提供一份复杂数据、一段实验背景和一个与下游决策相关的目标估计量。模型需检查数据、选择合适分析方法、根据诊断迭代分析并提交最终结论。官方称全套包含 129 道问题；因构建时掌握合成数据生成过程，可将分析结果与已知目标作确定性比对评分。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)

## 任务输入/输出/环境

- **输入**：问题提示、实验上下文及相关数据文件；任务刻意包含数据质量问题、歧义或分析决策。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)
- **输出**：依据每题定义的 answer schema 提交分析结论和规定字段。公开包中的 `eval_config.json` 记录 prompt、可见数据文件清单、答案结构、参考值和 grader contract。[官方公开包 README](https://huggingface.co/datasets/openai/genebench-pro-public-package)
- **环境**：隔离工作区，含 Python、科学计算库和常见基因组学软件（例如 PLINK 2.0）；官方说明题目不要求特定领域专用工具。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)

## 数据规模/split/字段/文件

- 完整 benchmark 规模为 129 道问题；OpenAI 公开的是 10 道代表案例，二者不可混为同一套公开完整数据。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)；[官方公开包](https://huggingface.co/datasets/openai/genebench-pro-public-package)
- 公开包以 `problems.csv` 每题一行作索引；每题目录包含 `eval_config.json`、`data_files/` 和 `report_public.pdf`，包级还含 `manifest.json`、文件校验和、参考定义与 grader。[公开包 README](https://huggingface.co/datasets/openai/genebench-pro-public-package)
- 公开包包含该 10 个 case study 的 ground truth 和 grader 容差，README 明确称其供公开案例、复现和模型分析使用，不是隐藏答案 leaderboard。不能把它描述成 129 题的隐藏测试集或完整 benchmark dump。[公开包 README](https://huggingface.co/datasets/openai/genebench-pro-public-package)
- OpenAI 介绍提及向 Artificial Analysis 提供 50 题子集的计划；本轮未在 AA 当前公开评测方法目录中核实该子集已上线，故不将计划写作已经发布或可下载事实。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)；[AA 方法目录](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 访问状态

OpenAI 提供官方介绍、交互式问题图谱及 10 个案例的详情页；Hugging Face 提供 10 案例自包含公开包。[OpenAI 案例详情](https://openai.com/index/genebench-pro/case-studies/)；[OpenAI 官方公开包](https://huggingface.co/datasets/openai/genebench-pro-public-package) 本轮没有发现完整 129 题可下载入口，完整集访问状态记为“官方公开入口未核实”。

## 数据/代码/媒体许可与使用边界

Hugging Face 页面将该公开 case-study package 标为 MIT，并在 README 中称该**公开包**依 MIT License。此许可结论限于该发布包，不外推至完整未公开 benchmark、OpenAI 网页 UI、第三方来源材料或其它关联资源。公开案例含任务提示和参考答案，故若目标是保留隐藏题评测效力，不应将公开包中的案例当作未泄漏 leaderboard 题目。[官方公开包许可和用途](https://huggingface.co/datasets/openai/genebench-pro-public-package)

## 官方样例与是否可在公开 GitHub Pages 转载

OpenAI 的 10 个案例页面提供题目和支持材料预览，Hugging Face 官方包明确将公开 case-study package 置于 MIT 许可。[OpenAI 案例详情](https://openai.com/index/genebench-pro/case-studies/)；[Hugging Face 公开包](https://huggingface.co/datasets/openai/genebench-pro-public-package) **结论：可以链接官方材料；若转载包内具体文件，保留 MIT 许可和必要归属，并确认该文件确属公开包且未含另行受限素材。公开案例必须标为代表案例，不能暗示其等于全部 129 题或隐藏评测集。**

## 指标

官方介绍报告 pass rate，并称以已知数据生成目标确定性评分。每题具有规定答案和容差；汇总成绩仍取决于报告使用的题集、模型推理配置和是否启用 Pro 模式等条件。不能把官方 pass rate 当成专家主观评分，也不能混同于 GeneBench 原版分数。[OpenAI GeneBench-Pro 介绍](https://openai.com/index/introducing-genebench-pro/)；[公开 grader 契约](https://huggingface.co/datasets/openai/genebench-pro-public-package)

## 版本关系

GeneBench-Pro 扩展原始 GeneBench，题目更长、更复杂，关注计算生物学中的多阶段推断和研究判断。两者名称相近但任务集、范围与成绩需分开引用。当前可核实的公开包为 GeneBench-Pro 的 10 个 case studies；官方所述 50 题第三方子集仍按待核实发布计划处理。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)；[GeneBench 原版论文](https://cdn.openai.com/pdf/6dc7175d-d9e7-4b8d-96b8-48fe5798cd5b/oai_genebench_benchmark.pdf)

## 官方来源按角色分组

- **定义、规模、构建、评分与报告结果**：[OpenAI GeneBench-Pro 介绍](https://openai.com/index/introducing-genebench-pro/)。
- **案例原始提示和网页预览**：[OpenAI Inside GeneBench-Pro](https://openai.com/index/genebench-pro/case-studies/)。
- **公开包字段、内容边界、运行契约及 MIT 标记**：[OpenAI Hugging Face public package](https://huggingface.co/datasets/openai/genebench-pro-public-package)。
- **前身 GeneBench**：[OpenAI GeneBench 论文 PDF](https://cdn.openai.com/pdf/6dc7175d-d9e7-4b8d-96b8-48fe5798cd5b/oai_genebench_benchmark.pdf)。

## 模型发布引用

OpenAI 介绍报告其模型在 GeneBench-Pro 上的 pass rate；这是 OpenAI 发布的内部运行结果，需连同题目版本、推理档位和 Pro 设置读取。由于本轮任务只做 benchmark 身份与协议资料，没有引用该结果作跨模型结论。[OpenAI 介绍](https://openai.com/index/introducing-genebench-pro/)

## 未核实项

- 完整 129 题的公开访问、版本快照、split 划分及其与 10 个公开案例的包含关系未由公开材料完整说明。
- 50 题 Artificial Analysis 子集的当前正式发布状态、题目清单和评分实现未核实。
- 公开 package 的 MIT License 是否覆盖每个嵌入的第三方素材，需按实际文件追踪来源；不由根目录许可标记推断。
- 不同模型发布的运行预算、重试和工具配置若未在对应报告披露，不能认为配置一致。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 对 129 题规模、任务目标、隔离工具环境和确定性评分有明确描述；现有可公开复现包是 10 题代表案例，并明确包含答案、用于复现而非隐藏答案排行榜。50 题第三方子集及完整集公开范围尚需后续核验。


## 2026-09-23 样例实源复核（本节为当前结论，取代前文相应旧结论）

- 固定官方 revision：Hugging Face commit `eb75a3c0996b3cedcc9af685bad02fd166848fa2`。官方 `problems.csv` 的 split 为 `release`，公开案例 ID 为 `txr1_mtb_causal_sv`，eval_uuid 为 `0e5c8fd6-aac7-4aa0-915d-5e6b0d550c99`。
- 本站只复制该记录的原始 `task` 字段；没有复制数据文件、ground truth 或 grader。案例目录标题标注 Synthetic，但 task 文本内含“data came from a real experiment”的通用句。两处表述存在冲突，网站说明保留此事实，不推断实际患者或实验来源。
- 官方 README 说明公开包面向公开分发并按 MIT 许可；公开包根目录 `LICENSE` 原文已保存为 `content/assets/licenses/genebench-pro.txt`（SHA-256 `7de1e115d165f176e68f962acdb809b5ab8d8ae78d3981e0701392b2ac50c713`）。
- 原始入口：[不可变 eval_config.json](https://huggingface.co/datasets/openai/genebench-pro-public-package/blob/eb75a3c0996b3cedcc9af685bad02fd166848fa2/problems/txr1_mtb_causal_sv/eval_config.json)，[官方 README](https://huggingface.co/datasets/openai/genebench-pro-public-package/blob/eb75a3c0996b3cedcc9af685bad02fd166848fa2/README.md)。
