# Aider Polyglot Benchmark

核验日期：2026-09-23

## 官方身份

Aider Polyglot 是 Aider 项目为衡量 LLM 代码编辑能力设计的 Exercism 编程练习基准，由 Aider-AI 维护题目集和运行 harness/leaderboard。它是 benchmark 与其 leaderboard 的组合生态，二者不是同一对象。[Aider 官方 benchmark 说明](https://aider.chat/2024/12/21/polyglot.html#L105-L117)；[Aider leaderboard](https://github.com/Aider-AI/aider/blob/main/aider/website/docs/leaderboards/index.md#L202-L204)

## 官方定义与忠实中文概述

基准选取 Exercism 六种语言中最难的 225 道练习，测量模型能否依据自然语言请求修改已有代码、生成可运行文件并通过测试。Aider 的测试还覆盖模型能否使用 Aider 接受的编辑格式将改动写入本地文件，故成绩反映模型与编辑器/harness 联合表现。[Aider 官方 benchmark harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L192-L200)；[Aider 官方设计说明](https://aider.chat/2024/12/21/polyglot.html#L110-L117)

## 任务输入/输出/环境

- 输入：每题的自然语言编程要求、练习现有源码，以及该练习配套单元测试；模型通过 Aider 的代码编辑流程修改文件。[官方 harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L192-L200)
- 输出：对练习文件的代码改动。成功标准是所有该题测试通过；Aider leaderboard 还单独记录编辑格式是否可解析/格式正确。[官方 harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L248-L270)（report 字段）；[leaderboard](https://github.com/Aider-AI/aider/blob/main/aider/website/docs/leaderboards/index.md#L211-L215)
- 环境：官方建议在 Docker 容器中运行，因为会执行模型生成代码；README 提醒当前脚本使用 bash，Windows 上运行不便。[官方 harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L197-L200)；[同一 README limitations](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L276-L290)

## 数据规模/split/字段/文件

- 225 题，语言分布：C++ 26、Go 39、Java 47、JavaScript 49、Python 34、Rust 30。[Aider 官方设计说明](https://aider.chat/2024/12/21/polyglot.html#L165-L175)
- 题目来源是 Exercism 对应语言 track，官方题库仓库有 `cpp/`、`go/`、`java/`、`javascript/`、`python/`、`rust/` 六个目录；没有 train/dev/test split 的官方声明。[题库 README](https://github.com/Aider-AI/polyglot-benchmark#L164-L187)；[仓库文件树](https://github.com/Aider-AI/polyglot-benchmark#L148-L157)
- 官方并未定义一个统一 JSONL 行 schema；存储结构是语言分目录下的练习文件。不可将第三方包装器的 schema 当作 Aider 原始格式。[题库 README](https://github.com/Aider-AI/polyglot-benchmark#L164-L187)
- 设计选择过程：Aider 报告最初从六语言 Exercism 697 道问题中筛出由其当时七个模型中不超过三个解决的 225 道；这描述初版选题过程，不是此后每次 leaderboard run 的统一配置。[Aider 官方设计说明](https://aider.chat/2024/12/21/polyglot.html#L139-L165)

## 访问状态

题目公开于 [Aider-AI/polyglot-benchmark](https://github.com/Aider-AI/polyglot-benchmark)，执行与统计工具公开于 [Aider 主仓 benchmark 目录](https://github.com/Aider-AI/aider/tree/main/benchmark)。官方 harness 使用 Docker、Aider 版本、模型名、edit-format、threads 等参数；复现实验必须记录这些配置和代码版本。[harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L210-L247)

## 数据/代码/媒体许可与使用边界

官方题库说明每道练习来自 Exercism tracks，内容版权归 Exercism 所有，依照 Exercism 的开源许可使用，并指向各语言 track/仓库查看具体许可；Aider 题库本身没有在 README 中给出统一的整体数据 license。[官方题库 README](https://github.com/Aider-AI/polyglot-benchmark#L172-L187) 因此运行/引用可链接到原题库，但公开 GitHub Pages 转载整道练习内容前，须按涉及的语言仓库和文件核对适用许可与署名要求；不能仅凭“open source licenses”推定所有文件许可相同。Aider harness 软件许可不代表 Exercism 题目内容许可。

## 官方样例与是否可在公开 GitHub Pages 转载

官方样例入口是公开题库六语言目录以及 Aider leaderboard 页面。[题库目录](https://github.com/Aider-AI/polyglot-benchmark#L148-L157)；[leaderboard 指标呈现](https://github.com/Aider-AI/aider/blob/main/aider/website/docs/leaderboards/index.md#L202-L215) **结论：不建议直接转载题目正文/测试代码，除非逐文件许可核实后满足要求；可以用自己的文字概述和链接做样例索引。**官方没有授予整套内容一项可直接复制到 Pages 的统一许可。

## 指标

- Aider leaderboard 的主排序量是 `pass_rate_2`：在配置的多次尝试中，通过全部测试的任务比例；另列 `percent_cases_well_formed`（输出符合编辑格式的比例）、`edit_format`、成本等运行字段。[leaderboard 源码说明](https://github.com/Aider-AI/aider/blob/main/aider/website/docs/leaderboards/index.md#L211-L216)；[harness README 报告字段说明](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L248-L270)
- `pass_rate_1`/`pass_rate_2` 受尝试数、模型、prompt/edit format、Aider commit 影响；数字不是只由题集名称决定。[harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L236-L247)；[报告复现字段](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L248-L270)

## 版本关系

Aider 于 2024-12-21 将 Polyglot 作为比旧版 Python-only 代码编辑 benchmark 更难的新基准发布。不要把旧版 133 个 Python 练习结果和新版 Polyglot 225 题结果混称为同一版本。[Aider 官方发布文](https://aider.chat/2024/12/21/polyglot.html#L105-L122) 当前官方题库仓库没有可见的语义版本或正式 split 编号；应以具体 Git commit 与 Aider harness commit 固定版本。[题库仓库文件页](https://github.com/Aider-AI/polyglot-benchmark#L141-L157)

## 官方来源按角色分组

- **基准设计/初版规模**：[Aider 官方博客](https://aider.chat/2024/12/21/polyglot.html#L110-L175)。
- **官方题目/出处与许可**：[Aider-AI/polyglot-benchmark README](https://github.com/Aider-AI/polyglot-benchmark#L164-L187)。
- **执行协议/环境/报告指标**：[Aider benchmark harness README](https://github.com/Aider-AI/aider/blob/main/benchmark/README.md#L192-L270)。
- **榜单呈现**：[Aider leaderboard 源文件](https://github.com/Aider-AI/aider/blob/main/aider/website/docs/leaderboards/index.md#L202-L215)。

## 模型发布引用

本轮以 Aider 官方设计文、harness 和 leaderboard 为 benchmark 一手来源。官方博客同时列出初始 leaderboard 模型快照，但这些是 Aider 自己运行的评测结果，不是模型厂商发布报告；未另行核验需纳入的厂商报告。[Aider 官方博客结果区](https://aider.chat/2024/12/21/polyglot.html#L176-L195)

## 未核实项

- 六语言 Exercism 各题的当前 license、第三方素材及题目具体版权声明需逐仓库/逐文件确认。
- 225 题仓库后续 commit 是否改题、修测试或删题，需要在实际比较前固定 commit 并逐项 diff；没有官方稳定数据版本号。
- Aider 详细 run 结果与工具设置随模型/版本变化，不能把当前排行榜数字直接当 benchmark 固有属性。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方定义、225 题规模、语言分布、执行流程、榜单指标及 Exercism 内容版权均有第一方来源；题目逐文件许可和版本稳定性需要继续审查。
