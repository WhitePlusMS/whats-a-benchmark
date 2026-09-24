# Berkeley Function Calling Leaderboard（BFCL）

核验日期：2026-09-23

## 官方身份

BFCL 由 UC Berkeley Gorilla 团队发起，现由 Berkeley 研究团队维护并提供数据、执行评测代码和在线 leaderboard。BFCL 是基准及排行榜名称组合；分数必须注明 V 版本及任务类别。[官方方法/历史介绍](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html#berkeley-function-calling-leaderboard)（行 16–39）；[官方数据说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 199–213）

## 官方定义与忠实中文概述

评估大型语言模型是否能根据自然语言需求正确选择、构造、组合并在适用任务中执行函数/工具调用，也测试当工具不相关或不适用时能否不调用。不同版本逐渐扩展到真实函数数据、多轮多步、网页搜索、多跳、错误恢复、代理记忆与格式敏感性。[BFCL V4 数据说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 199–209）

## 任务输入/输出/环境

- 输入：用户问题（单轮或对话轮次）、一个或多个函数定义/参数 schema；V4 agentic 任务还可包含网页检索或 memory 的交互状态。
- 输出：一个或多个结构化函数调用，或判断无需调用；部分任务执行调用以核实参数/结果。
- 环境：AST 结构化比对、可执行函数环境；V4 包含 web search、agent memory 等代理场景。[官方 BFCL V1/V4 说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 267–285、V4 release sections）；[论文](https://openreview.net/pdf?id=2GmDdhBdDk)（§ 3 数据构成）。

## 数据规模/split/字段/文件

BFCL 不是固定单一 split。V1 初始分类包括 Python simple/multiple/parallel/parallel-multiple，及 chatting、relevance、REST API、SQL、Java、JavaScript 等；V2 Live 加真实用户与企业/开源贡献数据；V3 加 multi-turn/multi-step；V4 Agentic 增网页搜索、memory 与格式敏感任务。[官方版本说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 204–209、253–285）。官方数据 README 按 V1 的 Python 与非 Python 类别列出数量；按这些分类计数合计约 2K 条（包括不计入实时榜单的聊天能力及独立 SQL AST 类别），只能代表 V1，不能外推到 V2–V4。[官方 V1 数据构成](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md#bfcl-v1)。V4 另含 665 条 Agentic 与 5,200 条非计分 Format Sensitivity 记录，统计时须说明类别和是否计分。[BFCL V4 官方数据说明](https://gorilla.cs.berkeley.edu/blogs/15_bfcl_v4_web_search.html)。官方数据以多个 JSON/JSONL 类别文件保存，记录字段常见 `id`、`question`、`function`，多轮任务还会有轮次上下文与期望结果；样例文件：[V4 simple_python](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/BFCL_v4_simple_python.json)（行 990–991）。

## 访问状态

公开 GitHub 提供 V1–V4 数据类别、执行评测脚本及说明；在线 leaderboard 会持续更新。BFCL V4 数据在文件层面可读，类别文件不可视作具备统一 train/validation/test 标记。[数据 README](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 214–227）

## 数据/代码/媒体许可与使用边界

官方数据说明将数据及相关模型标注为 Apache-2.0；该许可适用于样例内容的复制和再发布，并须保留许可及版权声明。[数据 README 许可说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 343–353；GitHub metadata 标 license apache-2.0，行 196）。代码仓库及数据文件不要仅靠代码许可证推断；本轮引用的是数据目录自身的 LICENSE 声明。未发现需要转载媒体。

## 官方样例与是否可在公开 GitHub Pages 转载

本站 [content/benchmarks/bfcl.json](../../../content/benchmarks/bfcl.json) 当前引用并展示两条官方 BFCL V4 `simple_python` 记录，候选文件为 `artifacts/candidates/samples-text-round2.json`。逐条对照官方 JSON：`simple_python_0`（triangle area）对应源码行 990；`simple_python_1`（factorial）对应行 991，`id`、question 和 function schema 一致。[官方 V4 数据](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/BFCL_v4_simple_python.json#L990-L991)。官方 data README 许可明确为 Apache-2.0，故可以保留版权与许可、来源链接后在公开 GitHub Pages 转载。[许可说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md#L343-L353)。样例只代表 V4/simple_python；不能称为全部 BFCL 或榜单完整数据。

## 指标

不同 BFCL 版本、任务使用的指标不同。V1 使用 AST-based match（结构正确性）及 executable evaluation（真实执行正确性），另有 relevance detection；V2/V3/V4 有各自类别及聚合指标。当前 leaderboard 说明 Overall Accuracy 为子类别不加权平均；需依据所报版本的版本说明解释总分，并同时记录是否原生 function calling 或 prompt 方案。[官方数据 README 的评测说明](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md#evaluation)；[当前 V4 leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)（页面表头及说明）。

## 版本关系

BFCL V1 于 2024-02-26 发布，后续 V2 主要加入 Live 企业/OSS 数据，V3 加多轮多步；V4 Agentic 引入 agentic 场景。数据 README 当前写 latest version release date 2025-07-17；榜单提交与安装包可能滚动更新，研究结果应记录实际 commit/version。[官方数据 README](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 204–213）

## 官方来源按角色分组

- 任务、类别、数据文件和许可： [BFCL 数据 README](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md)（行 199–227、267–285、343–353）。
- 版本/历史方法、V1 初始规模和指标： [Gorilla 团队方法博客](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html)（行 21–39）。
- 实际榜单、发布/复现状态： [BFCL leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)。
- 作者论文： [ICML/OpenReview 论文](https://openreview.net/pdf?id=2GmDdhBdDk)。

## 模型发布引用

本批模型厂商材料若出现 BFCL 成绩，只作为模型报告引用，不取代 BFCL 官方数据版本、指标与榜单记录。此轮未核实某厂商分数的完整提示、工具模式、V 版本和复现配置，因此不将厂商数值写成已对齐的官方结果。

## 未核实项

- V4 数据范围包含计分任务与非计分 Format Sensitivity；规模数字必须标明是否计分及类别范围，不能与 V1 数量混用。[BFCL V4 官方数据与计分范围](https://gorilla.cs.berkeley.edu/blogs/15_bfcl_v4_web_search.html)。
- 类别 JSON 文件不断更新；站内两个样例在当前官方主干逐字段核对通过，但未固定仓库 commit。
- 在线 leaderboard 的当前版本号/更新时间需于展示分数时实时记录。

## 研究结论

**PASS_WITH_LIMITATIONS** — 基准发布方、版本演进、类别、输入输出、公开数据与数据许可已从第一方来源确认。两条本站 V4 simple_python 样例可逐条复核且可在遵守 Apache-2.0 条件下公开展示。BFCL 是持续演进的系列；各版本题量及总分不可混为同一静态套件。
