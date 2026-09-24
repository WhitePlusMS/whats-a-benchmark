# NL2Repo-Bench

核验日期：2026-09-23

## 官方身份

NL2Repo-Bench 是论文作者发布的 coding-agent 长时程仓库生成 benchmark；官方论文署名团队跨 ByteDance Seed、M-A-P、2077AI、Humanlaya Data、南京大学、北京大学、北京邮电大学、北京航空航天大学等单位，项目代码位于 `multimodal-art-projection/NL2RepoBench`。论文 arXiv 首发于 2025-12-14。官方 README 简称 NL2Repo；论文正式名称使用 NL2Repo-Bench，本候选保留正式名称。[官方论文](https://arxiv.org/abs/2512.12730)；[作者发布的 GitHub README](https://github.com/multimodal-art-projection/NL2RepoBench/blob/main/readme.md)

## 官方定义与忠实中文概述

任务从一份自然语言需求文档和空工作区开始，要求 agent 从零构建可安装、功能完整的 Python 库/代码仓库。开发时不给脚手架、源代码或测试；完成后在隔离环境中运行目标原仓库 pytest 套件进行执行式验证。[官方论文摘要及 §1](https://arxiv.org/html/2512.12730)

## 任务输入/输出/环境

- **输入**：单份任务说明文档。论文说明文档含 Project Description、Supports、API Usage Guide、Implementation Notes 四部分；实施时从空工作区开始，不提供原项目脚手架或测试。
- **输出**：agent 生成的完整 Python 软件仓库及其安装/运行结构；评测镜像执行原目标仓库 pytest 测试套件。
- **环境**：论文为每个任务构建 Docker 环境并按上游依赖配置、固定依赖版本与系统库，再验证原项目测试可运行。官方 README 说明默认本地执行，并要求 Docker 与 OpenHands runtime 镜像。[官方论文](https://arxiv.org/html/2512.12730)；[官方 GitHub README](https://github.com/multimodal-art-projection/NL2RepoBench/blob/main/readme.md)

## 数据规模/split/字段/文件

- 论文统计 **104 tasks**、9 类 Python library 项目：Web Development 10、Testing 13、Utility Libraries 11、Machine Learning 7、Data Analysis & Processing 18、Database Interaction 7、Networking Tools 9、Batch File Processing 5、System Tools 24；难度分布为 Easy 26、Medium 46、Hard 32。文档平均约 18,800 tokens。[官方论文 Table 1–2](https://arxiv.org/html/2512.12730)
- 论文没有报告传统训练/验证/测试 split；任务是人工构造并由原 pytest 套件验证的评测集合。不要把不同运行配置误写为 benchmark split。[官方论文](https://arxiv.org/html/2512.12730)
- 文档明确含四个语义字段：Project Description、Supports、API Usage Guide、Implementation Notes。论文提到完整数据集、Docker 环境和 evaluation toolkit 已发布；作者仓库可见 `docker_self/`、`openhands/`、`template/`、`test_files/`、`tests/`、`workspaces/` 等目录。未逐文件下载并确认完整 task data schema，因此本文不推断每个 task 都含这些目录或字段。[官方论文](https://arxiv.org/html/2512.12730)；[官方仓库](https://github.com/multimodal-art-projection/NL2RepoBench)

## 访问状态

官方 GitHub repo 公开，README 给出本地运行说明、Docker runtime、默认 Python 3.12 环境及 OpenHands headless batch setup；论文称释放 dataset、Docker environments 和 evaluation toolkit。数据/代码公开入口已确认，但本轮未逐项检出全量任务及 104 项可运行性。[作者发布的 GitHub README](https://github.com/multimodal-art-projection/NL2RepoBench/blob/main/readme.md)；[官方论文](https://arxiv.org/html/2512.12730)

## 数据/代码/媒体许可与使用边界

官方 GitHub 仓库根目录未显示 LICENSE；repo 内仍有 2026-08-21 未获答复的“License of this repo” issue。论文虽称发布数据、环境和工具包，但不构成开放许可。故 benchmark 任务、代码及媒体复用状态记为 **unknown**；未取得作者授权前只链接、不转载题面、测试、Docker image 或截图。[官方仓库文件列表](https://github.com/multimodal-art-projection/NL2RepoBench)；[官方仓库许可问题](https://github.com/multimodal-art-projection/NL2RepoBench/issues/18)

## 官方样例与是否可在公开 GitHub Pages 转载

官方论文展示任务文档结构示例并描述完整数据发布；由于 repo 未核实到适用于题目/测试/第三方原库素材的复用许可，不在公开 GitHub Pages 上转载原始样例、文档片段、测试或图像。可提供自写说明并链接论文和官方仓库；不设置 `sampleSet`。[官方论文](https://arxiv.org/html/2512.12730)；[官方许可问题](https://github.com/multimodal-art-projection/NL2RepoBench/issues/18)

## 指标

核心分数为平均 test pass rate：生成仓库完成后在测试镜像执行原项目 pytest suite，测试通过比例作为该任务分数。论文还报告 overall pass rate、Pass@1 fully-passed task count 与按难度/项目类别拆分结果；Pass@1 count 不等于平均 test pass rate。[官方论文 §4.1–4.2](https://arxiv.org/html/2512.12730)

## 版本关系

本条指 2025 论文所述 104-task NL2Repo-Bench。官方 repo README 的简称为 NL2Repo/Nl2RepoBench，论文正式名称有连字符和 Bench 后缀，故 ID 采用稳定正式名 `nl2repo-bench`，alias 兼收 `NL2Repo` 与 `NL2RepoBench`。当前未找到独立的 v1.x 版本或作者发布的后续正式任务版本；厂商表格中的 “NL2Repo” 不单独确认为不同基准。[官方论文](https://arxiv.org/abs/2512.12730)；[官方仓库 README](https://github.com/multimodal-art-projection/NL2RepoBench/blob/main/readme.md)

## 官方来源按角色分组

- **定义、任务构造、规模和评测指标**：[作者论文 arXiv 页面](https://arxiv.org/abs/2512.12730)；[论文 HTML 正文](https://arxiv.org/html/2512.12730)。
- **代码与运行入口**：[作者发布的 GitHub README](https://github.com/multimodal-art-projection/NL2RepoBench/blob/main/readme.md)；[官方仓库](https://github.com/multimodal-art-projection/NL2RepoBench)。
- **许可状态核对**：[官方仓库文件列表](https://github.com/multimodal-art-projection/NL2RepoBench)；[作者仓库 Issue #18](https://github.com/multimodal-art-projection/NL2RepoBench/issues/18)。

## 模型发布引用

本页指标与任务定义由 benchmark 作者论文提供。Qwen3.8-Max、GLM-5.3-Flash、DeepSeek-V4.1-Flash、Kimi K3 与 MiniMax M3 的官方材料列出 NL2Repo / NL2Repo-Bench，只登记为 `vendor-report`；不同厂商可能使用不同 scaffold，不能据名称省略配置。[Qwen3.8-Max](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)、[GLM-5.3-Flash](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)、[DeepSeek 更新日志](https://api-docs.deepseek.com/updates/)、[Kimi K3](https://github.com/MoonshotAI/Kimi-K3)、[MiniMax M3](https://www.minimax.io/blog/minimax-m3)

论文基线表中的 DeepSeek-V3.1/V3.2 和 GLM-4.6 是 benchmark 作者实测，不是模型厂商自报。

## 未核实项

- 本轮未固定官方 repo commit 或下载全量 task package；论文报告的 104-task dataset 与当前仓库内容对应关系未逐项复核。
- GitHub issue 仍未获答复、repo 根目录也未见 LICENSE；不能确定所有数据和作者代码的可复用许可。任务所涉上游开源库还各有独立许可。
- 论文提到的 evaluation toolkit、Docker images 与 GitHub 可见目录之间的完整版本/文件映射未逐项检查。
- 在项目现有 75 条 benchmark 记录中，未找到 `NL2Repo-Bench`、`NL2Repo` 或 `NL2RepoBench` 的 ID/name/alias 命中；与 SWE-bench 系列属于不同任务（从零生成而非修复），不是疑似同名重复。

## 研究结论

**PASS_WITH_LIMITATIONS**：正式名称、发布团队、104 任务构成、输入输出、隔离 pytest 评估和平均测试通过率均可从作者论文验证；数据精确文件清单与再利用许可未确认。

## 项目目录比对与候选判定

对当前 `content/benchmarks` 75 条按 ID、name、aliases 比对后无精确或疑似同名记录。建议归入编程与软件工程并标记 **值得新增**。它和已有 SWE-bench/SWE-bench Pro 主题相邻，但这里的任务从空工作区生成完整仓库，不能合并或视作别名。
