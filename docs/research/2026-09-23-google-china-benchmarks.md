# Google 与国内厂商评测来源核查（2026-09-23）

本次只新增候选数据，没有改动 `content/benchmarks`、`content/releases.json`、更新日志或产品内容。候选处于交给主任务审核的阶段；候选文件中的 `status: published` 是符合当前 schema 的审核候选状态，不代表已发布进正式目录。

## 发布资料覆盖

本轮覆盖了五份模型官方发布评测材料，满足 Google 加国内至少两家厂商的来源要求：

| 厂商 / 模型 | 官方资料与核实日期 | 候选中能确认的基准 |
| --- | --- | --- |
| Google DeepMind / Gemini 3.1 Pro | [模型卡](https://deepmind.google/models/model-cards/gemini-3-1-pro/)（2026-02-19）；[配套评测方法](https://deepmind.google/models/evals-methodology/gemini-3-1-pro) | LiveCodeBench Pro、SciCode、APEX-Agents 等。方法页说明 LiveCodeBench Pro Elo 来自公开榜单、SciCode 分数来自 Artificial Analysis；模型结果使用 Gemini API 的 `gemini-3.1-pro-preview`，通常报告 pass@1。 |
| DeepSeek / DeepSeek-R1 | [官方仓库与技术报告入口](https://github.com/deepseek-ai/DeepSeek-R1)（已有发布索引记录，2025-01-20） | 沿用已有评测索引；本轮没有为该 release 擅自添加基准 ID。 |
| DeepSeek / DeepSeek-V3.2-Exp | [官方发布仓库](https://github.com/deepseek-ai/DeepSeek-V3.2-Exp)及[官方公告](https://api-docs.deepseek.com/news/news250929/)（2025-09-29） | BrowseComp-zh、SWE-bench Multilingual。README 表格把两者列在 Agentic Tool Use，比较 V3.1-Terminus 与 V3.2-Exp。 |
| Qwen / Qwen3 | [Qwen3 技术报告](https://arxiv.org/abs/2505.09388)（官方 QwenLM 仓库所载，arXiv 日期 2025-05-14） | AlignBench v1.1。只为此报告挂接这一条已核对候选，没有根据相似名称推断其他版号。 |
| Moonshot AI / Kimi K2 | [Kimi K2 技术报告](https://arxiv.org/abs/2507.20534)（2025-07-28） | Arena Hard v2.0、SWE-bench Multilingual、LongBench v2。Arena Hard 在表中区分 Hard Prompt 和 Creative Writing；LongBench v2 已在本项目收录。 |

DeepSeek-R1 是既有记录，其他四份均已在 `artifacts/candidates/google-china-releases.json` 形成候选，Google 项只在原 Gemini 3.1 Pro 记录上增补已识别的三个 ID。DeepSeek V3.2 的 arXiv 技术报告与 V3.2-Exp 的官方发布表不是同一份材料；本轮把中文搜索和多语言软件工程条目归给 V3.2-Exp，而不归到 2025-12 正式版。

## 新 benchmark 候选

### LiveCodeBench Pro

- 主来源：[论文](https://arxiv.org/abs/2506.11928)与[项目页](https://livecodebenchpro.com/)。论文定义其为持续更新的 Codeforces、ICPC、IOI 题目基准；Gemini 配套方法页确认其 Elo 结果取自公开排行榜。
- 候选解读：以竞赛题解答衡量算法编程表现，主指标记为 Elo。题集持续更新，因此版本/题目范围需伴随任何模型结果记录。
- 保留的不确定性：没有确认可独立取得整套原题、测试及许可；`availability` 保持 `unknown`，没有复制样例。

### SciCode

- 主来源：[项目仓库](https://github.com/scicode-bench/SciCode)、[论文](https://arxiv.org/abs/2407.13168)。官方项目说明 80 个主问题拆成 338 个子问题，覆盖科学编程任务；评测说明要求获取数值测试数据并运行测试。仓库标明 Apache-2.0，数据入口可访问。
- 候选解读：分别记录主问题解决率和子问题解决率；两种粒度不能混为一分。官方 Gemini 方法文档注明自身模型卡成绩转引 Artificial Analysis。
- 样例处理：虽确认代码仓库有许可证和下载路径，仍未将具体题目、答案或测试复制进候选，因此无需主张题面二次展示许可。

### APEX-Agents

- 主来源：[Mercor 官方基准页](https://www.mercor.com/apex/apex-agents-leaderboard/)、[论文](https://arxiv.org/abs/2601.14242)和[官方样例页](https://www.mercor.com/apex/apex-agents-leaderboard/investment-banking-analyst-agent/)。官方页描述 31 个 worlds、240 项任务及 rubric；使用专业人员创建的情境文件，在实际软件工具环境中执行任务，专家 rubric 由语言模型裁判评分。
- 指标：Mean Score 是每任务通过标准比例的均值；Pass@1 是单次运行完整通过 rubric 的任务比例。
- 保留的不确定性：完整任务集私有，仅开放子集、评测代码和部分样例公开。标记 `public` 指存在官方可用的公开子集，不表示全量可访问。

### CMMLU

- 主来源：[官方仓库](https://github.com/haonan-li/CMMLU)和[论文](https://arxiv.org/abs/2306.09212)。任务是中文语境的多学科知识和推理选择题；DeepSeek-V3 官方表曾列出 CMMLU（5-shot Accuracy），本条年标记按 2023 首发论文，而非后续报告版本。
- 限制：选择题知识成绩不能代表开放式中文交互；提示示例数和数据划分影响可比性。

### BrowseComp-ZH

- 主来源：[论文](https://arxiv.org/abs/2504.19314)与[作者数据仓库](https://github.com/PALIN2018/BrowseComp-ZH)。仓库说明有 289 个中文多跳检索推理问题、加密表格、解密脚本和 canary token 访问流程；DeepSeek-V3.2-Exp 官方评测表有同名项。
- 限制：基准适用于有搜索工具的 Agent 系统；搜索索引时变。数据加密及防训练措施表示公开仓库不意味着允许将题目再发布，故本站不附题目样例。

### SWE-bench Multilingual

- 主来源：[官方介绍](https://www.swebench.com/multilingual.html)与[数据集说明](https://www.swebench.com/SWE-bench/guides/datasets/)。其为 SWE-bench 家族中的新基准：300 个真实软件工程任务、42 个仓库、9 种编程语言。任务是根据 issue 和修复前仓库生成代码修改，以 fail-to-pass 与 pass-to-pass 测试判定解决情况。
- 候选类型标为 `derivative` 表明沿用 SWE-bench 系列方法与协议；它不是原 Python 数据集的筛选子集。DeepSeek-V3.2-Exp README 及 Kimi K2 报告都列了 Multilingual 结果。
- 限制：总数较小，按语言切分后更小；需记录 agent scaffold 和测试环境。

### Arena-Hard v2.0

- 主来源：[LMSYS 官方仓库](https://github.com/lmarena/arena-hard-auto)及[Kimi K2 技术报告](https://arxiv.org/abs/2507.20534)。仓库记录 2025-04-23 发布 v2.0；500 条高难度用户提示和 250 条创意写作提示，使用自动裁判。Kimi K2 报告明确以 Arena Hard v2.0 表项呈现 Hard Prompt 和 Creative Writing 的不同胜率。
- 限制：自动裁判、提示设置和版本会影响结果；只用“胜率”不可省略裁判与子任务信息。

### AlignBench

- 主来源：[论文](https://arxiv.org/abs/2311.18743)、[官方仓库](https://github.com/THUDM/AlignBench)。论文介绍多维中文对齐基准，并使用规则校准的多维 LLM-as-Judge；Qwen3 报告中辨认到 AlignBench v1.1。
- 年份修正：原论文于 2023 年 11 月预印本公开，所以条目年份为 2023。官方仓库记录 v1.1 于 2024-06-15 更新；候选把它作为当前引用的版本信息，不改变基准首发年份。
- 限制：LLM 裁判存在偏差；分数要与版本、维度和裁判设置一起读。

## 已发现但不纳入本批候选的表项

- Gemini 3.1 Pro 模型卡/方法文档还列了 HLE、ARC-AGI-2、GPQA Diamond、Terminal-Bench 2.0、SWE-Bench Verified、SWE-Bench Pro、GDPval-AA、τ2-bench、MCP Atlas、BrowseComp、MMMU-Pro、MMMLU 和 MRCR v2；这些 ID 已在现有 49 条目录中，故只留在 Gemini release 的原有 `benchmarkIds`，不重复造条目。MRCR v2 的 1M 结果是 pointwise，而 128K 是累计分数，方法文档已说明口径不同。
- Qwen3 技术报告还对比了已有或版本边界需再核验的 IFEval、Arena-Hard、WritingBench 等条目；原始名称不等于本项目已确认的严格 benchmark 版本。本批只纳入报告能明确辨认版本的 AlignBench v1.1。Qwen 早期官方仓库的 C-Eval、CMMLU 结果不可混作 Qwen3 结果；CMMLU 候选引用的是 DeepSeek-V3 表。
- Kimi K2 报告还包括 LiveCodeBench、LongBench v2、MRCR、DROP、FRAMES、SWE-bench Verified 等。项目内已存在基础 LiveCodeBench、LongBench v2、MRCR 与 SWE-bench Verified；Kimi release 只补接已有 LongBench v2 与新建 Multilingual、Arena Hard v2.0，不据此创建重复条目。
- DeepSeek-V3.2-Exp README 的 MMLU-Pro、GPQA-Diamond、HLE、LiveCodeBench、AIME 2025、HMMT 2025、Codeforces、Aider-Polyglot、BrowseComp、SimpleQA、SWE Verified 与 Terminal-bench 大多已有目录项；Codeforces 尚无条目，但其当前任务格式和统一指标不足以在本轮建立准确、可复用的独立说明，暂不收录。保留该官方表作为后续逐项追溯入口。

## 待主任务审核项

1. 最终 schema 校验需由主任务统一运行。JSON 字段按 `entrySchema` 和 `releaseSchema` 结构填写；候选 benchmark ID 需在合并 release 前确认不与并行任务冲突。
2. LiveCodeBench Pro 的 Elo 计算细节和公开题目/测试可取得范围，还需以该项目页完整的 leaderboard 和许可进一步核实；当前保留 `availability: unknown`。
3. APEX-Agents 页面会随排行榜与开放数据版本变化；当前任务数、样例及公开子集边界是 2026-09-23 查验时页面所述。
4. Qwen3 报告中 AlignBench v1.1 的具体表格、裁判配置可由主任务在原 PDF 中复核；AlignBench 官方仓库已核实 v1.1 更新日为 2024-06-15，而基准首发年份仍为 2023。
5. 本批未附任何 `sampleSet`：虽有多个可浏览入口，但未确认各样例任务、标准答案和素材的逐项再发布许可。官方链接保留为核实入口。
