# Toolathlon-Verified

核验日期：2026-09-23

## 官方身份

Toolathlon-Verified 是 HKUST NLP Group 发布的 Toolathlon 最终核验版。官方仓库 2026-06-30 新闻说明任务提示、ground truth 和 evaluator 已复核并对齐，明确称该版为 benchmark 的 verified final version。官方论文题名为 *The Tool Decathlon: Benchmarking Language Agents for Diverse, Realistic, and Long-Horizon Task Execution*，arXiv 首发于 2025-10-29。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方论文](https://arxiv.org/abs/2510.25726)

## 官方定义与忠实中文概述

基准评估语言 agent 在真实软件环境中进行通用工具使用和长时程任务执行的能力。任务涉及多种真实应用与工具，环境带有初始化状态，agent 通过逐轮观测和操作改变环境；任务完成由独立执行评测脚本对最终环境状态进行确定性核验。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方论文 §2](https://arxiv.org/html/2510.25726)

## 任务输入/输出/环境

- **输入**：自然语言任务指令、任务所需的预置环境状态或 `initial_workspace` 文件；任务配置指定可用 MCP server 与工具。
- **输出**：agent 的多轮工具调用与环境变更；专用 evaluation script 根据静态 ground-truth 快照或动态参考流程判定任务完成并给出 0–1 reward。
- **环境**：32 个应用/MCP server；主要任务在每任务隔离的容器内运行，也有远端应用环境。官方仓库自建需 Linux、Docker/Podman、应用服务和凭据；也提供公开评测服务。Verified README 给出单任务最长 5400 秒、每轮最大输出 64K 及 reasoning effort 等默认项；采样温度等沿用模型提供方默认值。[官方论文](https://arxiv.org/html/2510.25726)；[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)

## 数据规模/split/字段/文件

- **原论文口径**：108 tasks，32 个 MCP server / 604 个工具，7 个本地工具包 / 16 个工具，单任务平均可见 69.9 个工具；其中 72/108 tasks 带环境状态初始化。论文按 Research、Campus、Finance、Tech、Business、Daily、E-commerce 七类汇总结果。[官方论文 Table 2](https://arxiv.org/html/2510.25726)
- **Verified 最终版口径**：官方 README 称仓库对应最终版，源码树有 `tasks/finalpool/`；但本轮未能可靠读取完整目录/任务总数，因此不把原论文的 108 直接宣称为 2026 finalpool 精确任务数，也不将其与 verified task count 混同。未见官方 train/validation/test split 声明。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方 finalpool 目录](https://github.com/hkust-nlp/Toolathlon/tree/main/tasks/finalpool)
- **任务文件**：官方 repo 公开 `tasks/finalpool/<taskname>`、run/evaluator 脚本及配置；论文说明每项任务可能含 state initialization script 或 `initial_workspace/`。未逐任务固定并读取 schema，不概括为统一字段清单。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方论文 §2.3](https://arxiv.org/html/2510.25726)
- **轨迹数据另行受控**：官方 Hugging Face 数据集收录已跑模型轨迹，需登录并接受其 benchmark-only 条件；这不是公开 task pool 的同一数据对象。[官方 HF 轨迹数据卡](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories)

## 访问状态

官方 GitHub 代码与 finalpool 目录公开；README 提供公开评测服务及本地部署路径。自建评测需要 Docker/Podman、容器化应用和 API/账号凭据。模型运行轨迹数据在官方 Hugging Face gated dataset 中，须登录接受访问条件；目录可见不代表文件可下载。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方 HF 轨迹数据卡](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories)

## 数据/代码/媒体许可与使用边界

本轮未在官方 repo 根目录找到许可文件或 README 中的通用 benchmark 任务数据转载授权；不能假设 GitHub 公共可见即允许复制。HF 轨迹数据卡明确为 contamination-sensitive artifacts，限制训练、衍生训练数据生成、检索语料用途，并禁止公开镜像或重新分发原始轨迹。故 reuse policy 对官方任务内容标记 **unknown**，轨迹集另有明确限制；不转载原始任务、轨迹或媒体。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方 HF 轨迹数据卡](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories)

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库 README 展示一个邮件与 Canvas 任务，并公开 finalpool 任务目录入口。HF 轨迹仓库明确要求不得公开镜像/分发原始轨迹；任务数据自身未核实转载许可。因此公开站只保留自写简介与链接，不复刻任务 prompt、ground truth、evaluator、轨迹或图像；无 `sampleSet`。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方 HF 轨迹数据卡](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories)

## 指标

论文报告平均 **Pass@1 success rate**（各模型评测 3 次并报告平均及标准差），另含 Pass@3、Pass³ 与平均 turns。官方论文把 task reward 定义在 0–1，依据执行后的环境状态与逐任务评测脚本计算；这些是原论文实验统计口径，具体模型结果不代表 Verified 2026-06-30 release 的独立重测。[官方论文 §2.1、§2.4、§4.1](https://arxiv.org/html/2510.25726)

## 版本关系

本候选的稳定身份为 `Toolathlon-Verified`，代表 2026-06-30 最终核验版；论文 2025 年发布的 Toolathlon 是其早期论文/基准定义，不能将论文首发日误写成 Verified final release 日期。官网 repo 同时公告后续轨迹上传，轨迹数据更新不等于基准任务版本变更。[官方仓库 README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)；[官方论文](https://arxiv.org/abs/2510.25726)

## 官方来源按角色分组

- **身份、Verified 发布和运行入口**：[HKUST NLP 官方 GitHub README](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)。
- **定义、任务/环境机制、原论文规模和指标**：[Toolathlon 论文](https://arxiv.org/abs/2510.25726)，特别是任务定义、环境、评估和实验章节。
- **最终版任务文件入口**：[官方 `tasks/finalpool` 目录](https://github.com/hkust-nlp/Toolathlon/tree/main/tasks/finalpool)。
- **受控评测轨迹访问及禁止再分发条件**：[HKUST NLP 官方 Hugging Face 数据卡](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories)。

## 模型发布引用

本条的身份、任务、规模和指标只由基准作者的论文与仓库支撑。Qwen3.8-Max、GLM-5.3-Flash、DeepSeek-V4-Flash-Vision-Exp 与 Kimi K3 的官方材料列出 Toolathlon Verified / Toolathlon-Verified，只登记为 `vendor-report`。[Qwen3.8-Max](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)、[GLM-5.3-Flash](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)、[DeepSeek 模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)、[Kimi K3](https://github.com/MoonshotAI/Kimi-K3)

官方 Verified 轨迹库含多模型轨迹，但它为受控入口，不能据其任务数据卡推断所有任务文本可公开转载。

## 未核实项

- finalpool 全量目录在浏览器页面未完整呈现，故 Verified release 精确任务数未核实；108 是 2025 原论文数据，不自动等同最终版 count。
- 未找到适用于所有 benchmark task content、code、image/media 的统一许可文本；需继续按每项任务和上游应用逐一确认。
- HF 轨迹文件实际内容需登录接受条件后访问，本轮未下载或检查文件字段；文件列表中的轨迹包和容量不能用作评测 task pool 的规模。
- 当前 75 条目录无 `toolathlon-verified` 或 Toolathlon 别名；MCP-Atlas 等属于工具/agent 邻近基准，不是 Toolathlon 同名记录。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方身份、Verified 日期、原论文任务构造、评测机制、访问路径与轨迹限制均有一手来源；最终版任务数、逐任务许可与样例转载权尚未证实。

## 项目目录比对与候选判定

按现有 `content/benchmarks` 的 75 条 ID、name 和 aliases 精确核对，没有 Toolathlon/Toolathlon-Verified 记录。建议 **值得新增**，采用官方自称 `Toolathlon-Verified`，不另建早期论文版本作为第二条。`MCP-Atlas` 等只有研究范围邻近，既不疑似同名也不是同一数据集。
