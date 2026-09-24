# GAIA

核验日期：2026-09-23。

## 官方身份

GAIA（General AI Assistants Benchmark）由 Grégoire Mialon、Clémentine Fourrier、Craig Swift、Thomas Wolf、Yann LeCun、Thomas Scialom 等作者提出，面向具备工具扩展能力的通用 AI 助手。作者论文和 gaia-benchmark 官方数据页是本记录的第一方来源。[GAIA 论文](https://arxiv.org/abs/2311.12983)；[官方数据集卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)

## 官方定义与忠实中文概述

GAIA 使用现实问题评估助手的推理、多模态处理、网页浏览和工具使用能力。题目对人类通常概念上直观，却要求模型完成若干行动或信息处理步骤；预期答案短小、事实明确，便于核验。[GAIA 论文](https://arxiv.org/abs/2311.12983)

GAIA 不规定唯一工具/API 路径；某一能力可以通过不同工具组合或已知信息完成，所以成绩不能直接解释为特定工具调用技能的纯测量。[GAIA 论文](https://arxiv.org/abs/2311.12983)

## 任务输入/输出/环境

- 输入：简短自然语言问题，部分记录附带 PDF、图片、表格、视频、音频等文件；实际需要的工具由题目决定。[GAIA 论文](https://arxiv.org/abs/2311.12983)
- 输出：题目要求的单一事实答案，通常为字符串、数字或逗号分隔项目。论文说明以按答案类型归一化的 quasi-exact match 与标准答案比较。[GAIA 论文：Evaluation](https://arxiv.org/abs/2311.12983)
- 环境：GAIA 本身不强制封闭模拟器或特定工具 API。具体 leaderboard 或模型供应商实现会选择不同 agent、浏览器、文件解析和代码环境；这些是外部运行协议，必须与题集定义区分。

## 数据规模/split/字段/文件

- 原论文设计 466 道问题及答案，并保留 300 道答案用于排行榜。[GAIA 论文](https://arxiv.org/abs/2311.12983)
- 当前官方 Hugging Face 数据卡称数据集 **超过 450 题**，分为三个难度等级；每级有 public dev/validation split 与 test split，后者带私有答案及元数据。部分问题通过 `file_name` 指向附件。[GAIA 官方数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)
- 数据卡记载 2025 年 10 月开始转为 Parquet split，并列出 `task_id`、`Question`、`Level`、`Final answer`、`file_name`、`file_path`、`Annotator Metadata` 字段。[GAIA 官方数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA/blob/main/README.md)
- 原论文 466 题总数和当前卡片“450+”是不同描述口径；应依据指定仓库快照及 split 说明引用，不把其拼成一个精确、永恒的公开题数。

## 访问状态

数据集在 Hugging Face gated access 下，需按站点流程申请访问。官方明确称加入 gating 是为了阻止 bot 抓取；并要求不要以可被爬取的格式分享 validation 或 test set。当前 leaderboard 入口在同一官方数据卡中链接。[官方 GAIA 数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)

## 数据/代码/媒体许可与使用边界

- 此次核对的 Hugging Face dataset card 未发现明确的 SPDX/data license 声明，因此题目、答案、元数据及附件的再分发许可为**未明确**；不能从页面可申请访问推断复制授权。
- gated prompt 明确要求不得将 GAIA submissions set 分享到 Hugging Face 上 gated/private 仓库之外；README 也要求不要以可爬取格式重发 validation 或 test。故不得把题面、答案、附件或整行数据复制到公开 GitHub Pages。[官方 GAIA 数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)
- 论文中公开的研究定义和数字可作归属引用；论文中展示的示例题面、截图或附件不因此自动取得 dataset 再发布许可。页面媒体权利未单独核实。

## 官方样例与是否可在公开 GitHub Pages 转载

官方 HF 数据集包含 dev/validation 与 test 数据，访问须 gated；数据卡明令不要在可爬取格式下重分享 validation/test，gated prompt 进一步约束整个 submissions set 的分享位置。**本站不转载任何实际 GAIA 题面、附件、答案、元数据记录或排行榜提交**；只提供 benchmark 概述及官方数据/论文链接。[GAIA 官方数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)；[论文](https://arxiv.org/abs/2311.12983)

## 指标

题目级准确率基于经答案类型归一化的准精确匹配；整体与各 level 结果可按答对题数汇总为百分比。论文的初始模型/人类数字属于指定题集和运行配置，不是当前 gated leaderboard 的普遍分数。[GAIA 论文](https://arxiv.org/abs/2311.12983)

## 版本关系

初版论文（2023/2024 会议稿）描述 466 题及保留答案的 leaderboard；当前数据仓库保留 `2023_*` 配置并于 2025 年把文件格式更新为 Parquet，同时执行 gating 限制。文件格式演进不等于建立了新的 GAIA benchmark 版本；第三方排行榜也可能只评估某一公开 validation 子集，应单独标明其协议和题数。[论文](https://arxiv.org/abs/2311.12983)；[官方数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)

## 官方来源按角色分组

- **任务设计、评测定义与论文原始总数：**[GAIA: a benchmark for General AI Assistants](https://arxiv.org/abs/2311.12983)。
- **当前题集访问、split、字段、附件和分享限制：**[gaia-benchmark/GAIA dataset card](https://huggingface.co/datasets/gaia-benchmark/GAIA)。
- **官方模型 leaderboard 入口：**数据卡所链接的 [GAIA leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard)。

## 模型发布引用

模型公司报告的 GAIA 分数属于其 agent、工具、模型和 split 配置下的结果，不改变 GAIA 原始定义。供应商引用若未交代 public dev/validation 或 test、题数、工具、采样与评分器，则仅作为厂商自述保留；不能将其称为官方 leaderboard 成绩。GAIA 官方 leaderboard 与数据卡是核对结果来源的优先入口。[GAIA 官方 leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard)

## 未核实项

- 官方仓库当下每个 gated split 的精确行数、所有附件格式/完整清单和公开 leaderboard 对应的仓库 commit，未逐文件下载比对。
- Dataset card 未找到题集数据 license；本记录不能判定隐藏题或公开 dev 样本具有独立转载许可。
- 各供应商 GAIA 结果使用的 prompt、agent harness、工具政策与采样数需按具体发布逐条审查。

## 研究结论

**PASS_WITH_LIMITATIONS**：原始题目目的、评分原则、当前 split 与字段均有作者论文/官方数据卡支持。数据 gated，官方要求不得向可爬取公开网站重分享验证/测试数据，且没有确认数据许可；BenchAtlas 只链接，不转载题目及答案。
