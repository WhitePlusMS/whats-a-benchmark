# SWE-bench Verified

核验日期：2026-09-23。

## 官方身份

SWE-bench Verified 是 SWE-bench 作者与 OpenAI Preparedness 合作发布的、从原始 SWE-bench test set 中筛选的 500 项子集。它不是独立收集的新基准，也不等于后续 SWE-bench Pro。OpenAI 将 Verified 定义为经软件开发者人工筛查、减少问题描述含糊或测试不公样本的版本。[SWE-bench 官方仓库](https://github.com/SWE-bench/SWE-bench)；[OpenAI 发布说明](https://openai.com/index/introducing-swe-bench-verified/)

## 官方定义与忠实中文概述

每个任务给出 GitHub issue 原文与修复前的代码库，要求 agent 修改代码形成补丁。Verified 继承原 benchmark 的 issue-to-patch 形式，仅替换为经过人工质量筛查的 500 项子集；筛选关注问题描述是否足够明确、FAIL_TO_PASS 测试是否会不公平地拒绝有效解，以及其他重大质量问题。它是筛选质量改良，不是原数据集所有问题均由人工重新编写或证明能由 agent 求解。[OpenAI 方法说明](https://openai.com/index/introducing-swe-bench-verified/)

## 任务输入/输出/环境

- 输入：`problem_statement`、固定仓库与 base commit；官方数据还可能含提示、测试版本和环境设置 commit。任务不向 agent 展示判分用的 FAIL_TO_PASS / PASS_TO_PASS 测试。
- 输出：模型产生的代码补丁。官方评测将补丁应用到匹配代码状态，在 Docker 隔离环境运行两类测试；目标测试通过且回归测试通过，才记为 resolved。
- SWE-bench 官方 Docker evaluation harness 负责构建/准备环境、应用补丁、执行测试与汇总结果；它是评测器。生成补丁所用的 SWE-agent、Agentless、OpenHands 或自定义 agent scaffold 是被评估系统的一部分，不能与 harness 或数据集本身混为一谈。需同时报告数据版本和 harness commit/配置。[Harness 文档](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)；[OpenAI 定义与判分](https://openai.com/index/introducing-swe-bench-verified/)

## 数据规模/split/字段/文件

- 当前官方 HF 数据集 `princeton-nlp/SWE-bench_Verified` 的 `test` split 显示 500 行，覆盖 12 个 Python 仓库。[官方数据卡/Viewer](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)
- 官方字段包括 `repo`、`instance_id`、`base_commit`、`patch`、`test_patch`、`problem_statement`、`hints_text`、`created_at`、`version`、`FAIL_TO_PASS`、`PASS_TO_PASS`、`environment_setup_commit` 与 `difficulty`。其中 patch/test patch 是关联 PR 的参考改动和判分测试，不是给 agent 的可见题面。
- OpenAI 披露使用 93 名有 Python 经验的软件开发者，人工标注原 test set 中随机抽取的 1,699 条；每条由 3 人标注，再依筛选规则形成 Verified 的 500 条。该 1,699 是构造/分析标注样本，不是 Verified split 的规模。[OpenAI 选集方法](https://openai.com/index/introducing-swe-bench-verified/)

## 访问状态

Verified 数据集及 SWE-bench 评测代码可公开访问；官方 HF 页面显示 `test` 500 条，官方 quickstart 提供读取入口。论文/发布页也公开人工标注和方法解释。公开可访问不代表这些第三方 issue、PR、代码、gold patch 与测试都获得统一的公开转载许可。[HF 数据卡](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)；[官方 quickstart](https://github.com/SWE-bench/SWE-bench/blob/main/docs/guides/quickstart.md)

## 数据/代码/媒体许可与使用边界

- SWE-bench GitHub 仓库 MIT 许可证适用于该仓库许可范围内的软件代码；Verified 数据卡当前未见声明统一覆盖其样本内容的许可证标签。[官方 LICENSE](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)；[Verified 数据卡](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)
- Verified 复用原始 GitHub issue 文本及对应 PR 补丁/测试。代码变更的权利依各上游代码仓库许可证；issue/PR 文本与人工标注另有来源。未找到由 SWE-bench/OpenAI 声明可一揽子转授权这几类资产的依据。因此，不能把 MIT 软件许可或 HF 可下载状态解释为题面、gold patch、test patch、参考答案或人工标注的通用转载许可。
- 本站仅保留原创概述和官方链接，不复制题面、答案 patch、测试代码、人工标注、轨迹或仓库代码。

## 官方样例与是否可在公开 GitHub Pages 转载

OpenAI 发布页含具体任务题面和测试片段用于说明筛查问题，但页面公开展示不是对本站重新收录第三方 issue、代码及测试的许可。本站不复制官方示例或 Verified 数据行；提供[OpenAI 说明](https://openai.com/index/introducing-swe-bench-verified/)和[官方数据集](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)链接即可。若未来考虑转载单一任务，需分别核实源代码项目、原 issue/PR 内容、gold/test patch 与标注的权利。

## 指标

主结果为 solved/resolved rate：完整通过该任务的 FAIL_TO_PASS 与 PASS_TO_PASS 判分测试的题数除以明确的 500 项测试集。不同论文可能报告 pass@1、不同生成采样数或多轮尝试；应写明计分单位、重复采样规则、预测补丁格式、超时和评测 harness。OpenAI 2024 发布页所报分数是当时模型与 scaffold 的实验快照，不代表当前 leaderboard。[OpenAI 判分方式](https://openai.com/index/introducing-swe-bench-verified/)；[SWE-bench Harness](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)

## 版本关系

Verified 是 SWE-bench 原始测试集的 500 项子集，保留其 12 个 Python 仓库与 issue/PR 派生的任务形式；SWE-bench Lite 是另一个为快速评测而进行的子采样版本，二者筛选目的不同。OpenAI 2024 发布说明称 Verified “supersedes”当时原始 SWE-bench 和 Lite 测试集，是当时评测推荐的替代集合，不表示 Verified 与原版同一数据，也不表示现行所有 SWE-bench 结果都自动转为 Verified。SWE-bench Pro 是 Scale AI 的独立基准，有其自己的 V1/V2 题目和评测协议。[SWE-bench 官方版本说明](https://github.com/SWE-bench/SWE-bench)；[OpenAI 版本说明](https://openai.com/index/introducing-swe-bench-verified/)

## 官方来源按角色分组

- **原始基准定义、数据读取与更新：**[SWE-bench 官方仓库](https://github.com/SWE-bench/SWE-bench)及[论文](https://arxiv.org/abs/2310.06770)。
- **Verified 500 项选集、人工标注流程与历史发布语境：**[OpenAI 官方说明](https://openai.com/index/introducing-swe-bench-verified/)。
- **当前 Verified split、字段与公开 Viewer：**[官方 Hugging Face 数据卡](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)。
- **Docker 评测流程：**[官方 evaluation harness 文档](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)。
- **软件代码许可证：**[SWE-bench LICENSE](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)。

## 模型发布引用

引用 Verified 成绩需确认其数据 revision 与 test split 确为 Verified 500 题，并注明使用的 agent scaffold、模型工具、采样/重试方案、预测格式、SWE-bench evaluator 版本和 Docker 环境配置。不得将 SWE-bench 全集、Lite、Verified 或 Scale SWE-bench Pro 的成绩混用。若厂商只写“SWE-bench”而没有 Verified 标记或可复现配置，应按未明确变体的厂商自报结果记录。

## 未核实项

- Verified HF 数据卡未为题面、PR patch、测试和 OpenAI 人工标注声明统一数据许可；未逐项检查 12 个上游仓库和原 issue/PR 的具体条款。
- 本次没有重新运行 500 项，也未逐项验证当前镜像、测试稳定性或预测评分脚本版本。
- leaderboard、第三方 agent harness 与评测环境持续更新；本记录未采录当前排行榜分数。

## 研究结论

**PASS_WITH_LIMITATIONS** — 第一方来源确认 Verified 是原 SWE-bench test set 的 500 项人工筛查子集，并说明构造样本、字段和 Docker 测试判分方式。开源 harness 许可不等于第三方 issue/代码/patch/test 的数据转载授权；本站仅提供原创概述和官方链接。
