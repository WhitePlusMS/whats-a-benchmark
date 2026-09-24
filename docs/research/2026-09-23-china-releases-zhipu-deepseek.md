# 智谱 AI（Zhipu/GLM）与 DeepSeek 近期模型发布评测来源研究

核验日期与截点：2026-09-23。范围是官方发布公告、官方 Hugging Face 模型卡/报告和项目官方页面；未使用二手媒体或搜索摘要作为事实依据。分数不在此重录。仅作为 `content/benchmarks` 后续审核用研究记录，不构成正式目录修改。

## 方法与证据边界

模型厂商成绩表只能证明该厂商报告在特定页面列出了某个评测名称和成绩；它本身不等于 benchmark 的定义、作者归属、公开数据或复现协议。下文先照页面记录原名、版本字样和可见的运行设置，再把benchmark发布者来源另列。报告未披露的提示、工具权限、推理预算、采样次数、指标或评测器均记“页内未说明”，不推断默认值。表格页可随来源链接直达；模型卡中的图片图表保留图片/页面入口，不据像素估算未提供的表项。

“Thinking/think”“with tools”“minimal harness”“max effort”“Pass@k”如出现在表格或脚注，记为厂商本次运行的配置/指标标签；除非 benchmark 发布方定义了新数据、任务或协议，不视作独立 benchmark。

## 截止日前可确认的主要发布资料

| 发布主体与模型 | 官方发布日期/状态 | 发布材料及成绩位置 | 证据说明 |
| --- | --- | --- | --- |
| Z.ai / 智谱，GLM-5.3-Flash | 2026-08-26 官方仓库公告称已发布；2026-09-23 官方博客再次发布介绍文 | [官方 GLM-V 仓库更新](https://github.com/zai-org/GLM-V)；[官方 AutoClaw/Z.ai 发布文](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)，“Complex Tasks and Agentic Performance”及“Native Multimodal Intelligence”两表 | 两个第一方来源日期不一致，分别记录为模型发布/仓库公告与专题博客日期，不能合写成同一首发日。博客署名 AutoClaw Team，明示 Published: September 23, 2026；GLM-V repo project update 写 2026/08/26 released。 |
| Z.ai，GLM-5.3 | 页面确有官方卡；独立发布日未从第一方公告核实 | [官方模型卡](https://huggingface.co/zai-org/GLM-5.3)，“Benchmark”表 | 卡上展示发布日期早于截点所需的成绩数据，但页面未给可核发布日；作为报告材料记录，不能用它证明模型在截点前某一天发布。表内PostTrainBench脚注另注明结果截至 2026-08-14。 |
| Z.ai，GLM-5.2 | 至迟 2026-06-24 已推出；首次发布日期未核实 | [官方模型卡](https://huggingface.co/zai-org/GLM-5.2)，“Benchmark”表 | Hugging Face 官方组织页关联该卡，官方卡介绍模型并列出成绩。另有[官方产品公告](https://autoclaw.z.ai/blog/product/autoclaw-v1-9-0-glm-5-2-auto-design/)（2026-06-24）证实该模型当时已推出。 |
| Z.ai，GLM-5.1 | 官方模型卡存在；首次发布日期未从第一方发布公告核实 | [官方模型卡](https://huggingface.co/zai-org/GLM-5.1)，“Benchmark”表及 `bench_51` 图 | 官方卡有比较表与配套图；本次只记录卡中可读表项。精确首次发布日期未由本次打开的官方页面单独确认。 |
| Z.ai，GLM-5 | 官方模型卡与技术报告存在；模型发布日未由本轮官方公告确认 | [官方模型卡](https://huggingface.co/zai-org/GLM-5)，“Benchmark”与脚注 | 官方卡给出 GLM-5 技术博客和报告入口；模型家族主卡用于识别后续比较项，不作为本轮近期重点逐行抄录。 |
| DeepSeek，DeepSeek-V4.1-Flash | 2026-09-10 | [DeepSeek API 官方更新日志](https://api-docs.deepseek.com/updates/)，2026-09-10 “DeepSeek-V4.1-Flash Release” | 发布日期、模型名、成绩列表和“HLE 仅测纯文本子集”脚注均在同一官方页。该公告不是独立 benchmark 报告。 |
| DeepSeek，DeepSeek-V4-Flash-Vision-Exp | 2026-08-21 | [API 官方更新日志](https://api-docs.deepseek.com/updates/)，2026-08-21 “DeepSeek-V4-Flash-Vision-Exp Release”；[官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | 公告给日期、Harness 配置和发布范围；HF 官方卡的可读成绩表在 Introduction 下（表头及行约 176–194）。 |
| DeepSeek，DeepSeek-V4-Pro-0813 / V4-Pro GA | 2026-08-13 | [官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)，“Introduction”成绩表；[官方更新日志](https://api-docs.deepseek.com/updates/)，2026-08-13 | 模型卡称其为 V4-Pro 正式版，取代 preview；官方日志称 GA 已上线并补充成绩及 Harness 说明。 |
| DeepSeek，DeepSeek-V4-Flash-0731 | 2026-07-31 | [DeepSeek API 官方更新日志](https://api-docs.deepseek.com/updates/)，2026-07-31 “DeepSeek-V4-Flash Update” | 发布更新说明明确公开测试 API 版本、列分数、说明 Code Agent 使用 DeepSeek Harness minimal mode / max effort / `top_p=0.95` / `temperature=1.0`；DSBench 两项为内部集。 |
| DeepSeek，DeepSeek-V4（Pro / Flash Preview） | 2026-04-24 | [DeepSeek API 官方更新日志](https://api-docs.deepseek.com/updates/)，2026-04-24 “DeepSeek-V4”；模型技术报告入口在[官方 V4-Pro-0813 卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | 首发公告页只确认 V4 API 发布，不含主要 benchmark 成绩表；V4 官方技术报告/模型卡后续列出 preview 对比。 |
| DeepSeek，DeepSeek-V3.2 / V3.2-Speciale | 2025-12-01 | [API 官方发布公告](https://api-docs.deepseek.com/news/news251201/)；[官方 V3.2 模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V3.2) | 公告确认 successor、模型及报告入口；模型卡保留 V3.1-Terminus 对比表。只作为上代参考。 |
| DeepSeek，DeepSeek-V3.2-Exp | 2025-09-29 | [API 官方公告](https://api-docs.deepseek.com/news/news250929/)；[官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp) | 官方模型卡直接列基准表，并把纯推理与 Agentic Tool Use 分组；已由项目 2026-09-23 国内厂商研究记录覆盖，下面仍列作对照依据。 |

注：DeepSeek官方 `/updates/` 页面是可滚动的同一更新日志，各日期标题锚点/章节比静态固定页码更稳定；上表给出日期和标题以定位。GLM 卡为活动文档，表格行号可能随更新变化。

## 官方厂商报告表项提取

### Z.ai / 智谱

**GLM-5.3-Flash 官方页面**：[专题发布文](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)（2026-09-23）；[GLM-V 官方仓库](https://github.com/zai-org/GLM-V)项目更新同时标明 2026-08-26 released。日期口径不一致，分别保留，不据此推断一个统一首发时间。可读表“Complex Tasks and Agentic Performance”：`Terminal Bench 2.1`、`DeepSWE v1.1`、`NL2Repo`、`Toolathlon Verified`、`AutomationBench v1.0.6`、`Agents’ Last Exam`、`HLE with Tools`、`GDPval-AA v2`。同页“Native Multimodal Intelligence”表：`OfficeQA Pro`、`CharXiv Reasoning with Tools`、`Chartography with Tools`、`BabyVision`、`MVBench`、`MMVU`。表项没有 pass@k 标注；“with Tools”是成绩标签。文中只概括工具/多步任务能力，没有给这两张表的 harness、thinking/effort、温度或重复次数，均未知。

**GLM-5.3 官方卡**：[模型卡](https://huggingface.co/zai-org/GLM-5.3)，Benchmark 主表可见：`Terminal Bench 2.1`、`Terminal Bench 3.0`、`DeepSWE (v1.1)`、`NL2Repo`、`ProgramBench (Almost Solved)`、`FrontierSWE`、`SWE-Marathon (v1.1)`、`PostTrainBench`、`CyberGym`、`ExploitGym (2h / 6h)`、`ExploitBench`、`Toolathlon Verified`、`AutomationBench (v1.0.6)`、`Agents’ Last Exam (ALE-CLI)`、`HLE w/ Tools`、`GDPval-AA v2`。可见的具体 task / variant 信息只按原表保留；非表格名称不推定等同另一 ID。卡上 `PostTrainBench` 脚注给 Claude Code 2.1.207、max effort、`temperature=1.0`、`top_p=1.0`、`max_new_tokens=128000`、1M context、加权三次运行及失败退回官方 zero-shot baseline；这只支持 PostTrainBench 的该条结果配置。其它表项条件不据此套用。当前页面还链接作者团队技术报告 [GLM-5: from Vibe Coding to Agentic Engineering](https://arxiv.org/abs/2602.15763)，但该报告早于此版本，不能替代 GLM-5.3 各新表项的说明。

**GLM-5.2 官方卡**：[模型卡](https://huggingface.co/zai-org/GLM-5.2)，`Benchmark`表（Reasoning / Coding / Agentic 三组）原名依次为：`HLE`、`HLE (w/ Tools)`、`CritPt`、`AIME 2026`、`HMMT Nov. 2025`、`HMMT Feb. 2026`、`IMOAnswerBench`、`GPQA-Diamond`、`SWE-bench Pro`、`NL2Repo`、`DeepSWE`、`ProgramBench`、`Terminal Bench 2.1 (Terminus-2)`、`Terminal Bench 2.1 (Best Reported Harness)`、`FrontierSWE (Dominance)`、`PostTrainBench`、`SWE-Marathon`、`MCP-Atlas (Public Set)`、`Tool-Decathlon`。表题有类别，未注明的运行条件不详；HLE tools 明示工具设置。两个 Terminal Bench 2.1 行是不同 harness 项，不能合并成同一运行结果。

**GLM-5.1 官方卡**：[模型卡](https://huggingface.co/zai-org/GLM-5.1)，Benchmark 表：`HLE`、`HLE (w/ Tools)`、`AIME 2026`、`HMMT Nov. 2025`、`HMMT Feb. 2026`、`IMOAnswerBench`、`GPQA-Diamond`、`SWE-Bench Pro`、`NL2Repo`、`Terminal-Bench 2.0 (Terminus-2)`、`Terminal-Bench 2.0 (Best self-reported)`、`CyberGym`、`BrowseComp`、`BrowseComp (w/ Context Manage)`、`τ³-Bench`、`MCP-Atlas (Public Set)`、`Tool-Decathlon`、`Vending Bench 2`。除名称所示配置外该表不提供统一 setting 说明。`(Best self-reported)` 明确不同于同表 Terminus-2 行。

**GLM-5 官方卡**：[模型卡](https://huggingface.co/zai-org/GLM-5)有成绩表及细分注释；当前卡版本不保证等同首次发布稿。部分注释明确报告了 `Terminal-Bench 2.0 (Terminus 2)` 的评测框架/超时/温度/上下文/资源上限、`Terminal-Bench 2.0 (Claude Code)` 的模型配置和五次平均、MCP-Atlas 500-task public subset、think mode、Gemini 3 Pro judge，及 τ²-bench 的 prompt/domain 调整。应按当时该卡表和脚注录入运行结果，不能移用于 GLM-5.3 等版本。

### DeepSeek

**DeepSeek-V4.1-Flash（2026-09-10）**：[官方更新日志](https://api-docs.deepseek.com/updates/)，`2026-09-10 / DeepSeek-V4.1-Flash Release` 名称逐项为：`GPQA Diamond`、`HLE`、`Codeforces (Rating)`、`MathArena Apex`、`Terminal-Bench 2.1`、`Terminal-Bench 3.0`、`Terminal-Bench 4.0`、`DeepSWE v1.1`、`ProgramBench`、`NL2Repo-Bench`、`CyberGym`、`SEC-Bench Pro`、`ExploitGym`、`HLE (w/tools)`、`Automation-Bench`、`Agents' Last Exam`、`Chartography (w/tools)`、`BabyVision (w/tools)`、`ZeroBench-main (w/tools)`。该公告没有给这些行统一的 thinking-effort、harness 或 pass@k 设定；仅 HLE 脚注可证实只测试了 HLE 纯文本子集。

**DeepSeek-V4-Flash-Vision-Exp（2026-08-21）**：[官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)，Introduction 表以 `Text Agent Capabilities` 与 `Multimodal Agent Capabilities` 分组。原表：`Terminal Bench 2.1`、`NL2Repo`、`Cybergym`、`DeepSWE`、`Toolathlon-Verified`、`DSBench-Hard`、`AutomationBench (Public)`、`ApexBench (Pass@1)`、`Agents' Last Exam`、`Chartography`、`ZeroBench (Pass@5)`。脚注：上述 text-agent 评测使用 DeepSeek Harness minimal mode、`max` reasoning effort、`temperature=1.0`、`top_p=0.95`；对照模型 V4-Flash-0731 在 ApexBench 和 Agents' Last Exam 忽略输入中的多模态元素。该条件不应自动解释成图表中所有模型列都使用相同文本/视觉输入。

**DeepSeek-V4-Pro-0813（2026-08-13）**：[官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)，Introduction 表：`HLE (wo / w tools)`、`Terminal Bench 2.1`、`NL2Repo`、`Cybergym`、`DeepSWE`、`Toolathlon-Verified`、`Agents' Last Exam`、`AutomationBench (Public)`、`DSBench-FullStack†`、`DSBench-Hard†`。表脚注说明公开 benchmark 中 Code Agent 任务使用 DeepSeek Harness minimal mode、`max` reasoning effort、`temperature=1.0`、`top_p=0.95`；DSBench-FullStack 和 DSBench-Hard 为内部测试集。卡还介绍 `reasoning_effort` 支持 low/high/max，但这不是将各成绩分别绑定到某一 effort 的逐行数据，表格本身未提供 pass@k。

**DeepSeek-V4-Flash-0731（2026-07-31）**：[更新日志](https://api-docs.deepseek.com/updates/)，对应日期表项：`Terminal Bench 2.1`、`NL2Repo`、`Cybergym`、`DeepSWE`、`Toolathlon verified`、`Agent Last Exam`、`Automation Bench (Public)`、`DSBench-FullStack`、`DSBench-Hard`。公告指定 public Code Agent 任务用 DeepSeek Harness minimal mode、max effort、`top_p=0.95`、`temperature=1.0`；DSBench 两项为内部集。大小写/连字符照页面记录，别名归并前仍需检查任务定义。

**DeepSeek-V3.2-Exp 官方模型卡（2025-09-29）**：[官方卡](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp)，按该卡表格原始拼写：`MMLU-Pro`、`GPQA-Diamond`、`Humanity's Last Exam`、`LiveCodeBench`、`AIME 2025`、`HMMT 2025`、`Codeforces`、`Aider-Polyglot`、`BrowseComp`、`BrowseComp-zh`、`SimpleQA`、`SWE Verified`、`SWE-bench Multilingual`、`Terminal-bench`。表格分 `Reasoning Mode w/o Tool Use` 和 `Agentic Tool Use`；页面称两列 V3.1-Terminus / V3.2-Exp。原表没有提供各项的 shots、pass@k、温度等设置。项目上一份 2026-09-23 Google/中国厂商研究文档已对该发布来源及核心表项作过记录，此处用作历史版次交叉参照。

## benchmark 发布者与厂商报告的区分

以下是能从 benchmark 自己的第一方仓库、论文或主页直接确认的归属；模型卡只是报告出处，不是发布者证明：

| 评测 | benchmark 第一方来源 | 与厂商表的关系/本轮边界 |
| --- | --- | --- |
| DeepSWE | [DataCurve 项目/任务仓库](https://github.com/datacurve-ai/deep-swe)、[作者榜单](https://deepswe.datacurve.ai/) | 厂商写 `DeepSWE` 或 `DeepSWE v1.1`。官方仓库可见 v1.1 verifier 协议；`v1.1` 应随结果保留。 |
| Toolathlon / Tool Decathlon | [HKUST-NLP 官方仓库](https://github.com/hkust-nlp/Toolathlon)、[项目主页](https://toolathlon.xyz/) | GLM 的 `Tool-Decathlon`、`Toolathlon Verified` 与 DeepSeek `Toolathlon-Verified` 高度指向此项目，但 `Verified` 榜单/切分口径应从其 leaderboard 定义核对；不是厂商自创 benchmark。 |
| BabyVision | [作者团队官方仓库](https://github.com/UniPat-AI/BabyVision)、[论文](https://arxiv.org/abs/2601.06521) | GLM-5.3-Flash、DeepSeek-V4.1-Flash 使用同名；表格标签可能是不同模态/运行设置。未核具体 release/split 的时候只归入待核对。 |
| AutomationBench | [Zapier 官方仓库](https://github.com/zapier/AutomationBench) | GLM/DeepSeek 成绩来自厂商表；Zapier 是 benchmark 发布方。`v1.0.6`、`Public` 与正式榜私有部分需逐结果保留；项目现有条目已是 AutomationBench 1.0。 |
| Vending-Bench 2 | [Andon Labs 官方评测页](https://andonlabs.com/evals/vending-bench-2) | GLM-5.1 报告列出同名项目；作者页说明一年模拟经营 vending machine，按最终余额评分，排行榜均值为 5 次运行。项目目录未见此 ID。 |
| Terminal-Bench | [官方版本索引](https://www.tbench.ai/benchmarks)、[Harbor Terminal-Bench 2.0 仓库](https://github.com/harbor-framework/terminal-bench-2) | 厂商所写 2.1 / 3.0 / 4.0 不因共享家族名与现有 v2.0 / v4.0 自动视为同一数据快照；需核官方具体发行说明和 harness。 |
| NL2Repo-Bench | [作者论文](https://arxiv.org/abs/2512.12730) | DeepSeek 写 `NL2Repo-Bench`，智谱卡多写 `NL2Repo`。论文题名明确是 NL2Repo-Bench，但目前未找到可明确证明两种表述在这些厂商结果中对应完全相同协议/版本的第一方结果链接，暂记“疑似同名/版本待核”，不把名称扩展或缩短直接当作身份结论。 |

上述第一方入口只确认所链接项目自身；仍未从 benchmark 发布方独立确认的厂商表名称包括 `ProgramBench`、`FrontierSWE`、`SWE-Marathon`、`PostTrainBench`、`CritPt`、`MathArena Apex`、`SEC-Bench Pro`、`ExploitGym`、`ExploitBench`、`ZeroBench-main`、`MMVU` 和 `MVBench`。它们是下一轮作者/论文/数据卡核对目标。DeepSeek 的 `DSBench-FullStack` 与 `DSBench-Hard` 被其本人标为内部测试集，不属于可建公共 benchmark 条目的证据。`Codeforces (Rating)` 指 rating 结果标签；当前材料不足以将其建成有明确模型任务合同的独立条目。

## 与项目现有 75 项目录的逐类比对

逐个读取 `content/benchmarks/*.json` 的 ID 和 `name`（共 75 条），同时检查有争议的几个版本字段。当前目录按名称匹配，不因基准关系接近就改 ID。

### 已收录（同名/官方别名有强对应）

- `HLE` → `hle`；`HLE (w/ Tools)` / `HLE with Tools` 是报告运行配置，记到 release/result。
- `GPQA-Diamond` → `gpqa-diamond`；`SWE-bench Pro` / `SWE-Bench Pro` → `swe-bench-pro`。
- `Aider-Polyglot` → `aider-polyglot`；`BrowseComp` → `browsecomp`；`BrowseComp-zh` → `browsecomp-zh`；`SimpleQA` → `simpleqa`。
- `AIME 2025` → `aime-2025`；只有名称明确为 AIME 2026 时才不能套用此 ID，本目录目前没有 AIME 2026。
- `LiveCodeBench` → `livecodebench`；`SWE-bench Multilingual` → `swe-bench-multilingual`；`SWE Verified` → `swe-bench-verified`。
- `MMLU-Pro` → `mmlu-pro`；`MCP-Atlas (Public Set)` → `mcp-atlas`，但该次 public subset/模型配置仍需随结果保留。
- `Terminal Bench 4.0` → `terminal-bench-4`；名称和当前目录版本相符。
- `OfficeQA Pro` → `officeqa-pro`；`CharXiv` → `charxiv`；`Chartography` → `chartography`。`Reasoning with Tools` / `with Tools` 是运行条件标签。
- `Agents’ Last Exam` → `agents-last-exam`，但 `(ALE-CLI)` 细分场景需在结果配置中保留，不能假设等于全套成绩。
- `AutomationBench` → `automationbench` 现有条目；报告中的 `v1.0.6`、`Public` 与目录当前版本 1.0 的对应关系要再按 Zapier 官方发布记录核。
- `Terminal-Bench 2.0`（GLM-5.1）→ `terminal-bench-2`；该条目已明确 v2.0。报告中 `Terminal Bench 2.1` 不能套用此 ID。
- `GDPval-AA v2.1` → `gdpval-aa-v2-1` 是目录现有具体版本；发布页只写 `GDPval-AA v2` 的结果标成疑似同系列/版本需核，不自动改写成 v2.1。
- `Vending Bench 2` 未发现 ID/name 精确相同条目（见待新增项）；注意 GLM-5.1 表列的是美元余额，不是通用 accuracy。

### 疑似同名/版次或协议需核对

- `Terminal-Bench 2.1`：已有 `terminal-bench-2` 是 **2.0**。同为家族的版本号不等于同 ID；先核 benchmark 官方 2.1 数据/规则是否新版本或独立发布。
- `Terminal-Bench 3.0`：目录没有 3.0 ID。需确认是否独立版、准确官方写法及和 TB2/TB4 的版本关系。
- `DeepSWE` vs `DeepSWE v1.1`：有 DataCurve 官方 v1.1；项目无条目。裸 `DeepSWE` 是否映射 v1.1 需看该份模型报告实际评测日期/配置，不能凭系列名归一化。
- `NL2Repo` vs `NL2Repo-Bench`：模型报告表拼写不同；有同名方向的论文，但本轮未证实厂商各自采用哪个实现/版本，不能仅扩写名称后并入同一条。
- `Tool-Decathlon` / `Toolathlon Verified` / `Toolathlon-Verified`：均可能对应 HKUST-NLP Toolathlon 的结果或 verified leaderboard/split，项目目前无条目；建档前核 split 和正式指标名称。
- `AutomationBench v1.0.6`、`AutomationBench (Public)`：现有条目版本为 1.0；核该更新是同一基准版本演进还是厂商/leaderboard subset 配置。
- `GDPval-AA v2` 对 `GDPval-AA v2.1`：有目录 v2.1，需检查官方版本和表中 v2 是否别名/省略小版本还是不同快照。
- `Agents' Last Exam (ALE-CLI)`、`Agents' Last Exam`：通用名称已收录，但 CLI 专项行应明确其是否官方子集、评测框架或榜单过滤器。
- `BrowseComp (w/ Context Manage)`：`BrowseComp` 已收录；上下文管理在报告里表现为运行策略，无证据表明它是新 benchmark。
- `DeepSWE (v1.1)`、`SWE-Marathon (v1.1)`等显式版本只应在其各自定义确认后给出具体版本字段，不与 SWE-bench 系列混同。
- `AIME 2026`、`HMMT Nov. 2025`、`HMMT Feb. 2026`、`HMMT 2025`、`IMOAnswerBench`、`MathArena Apex`：题集年份/系列近似不能代替相同固定题目、规则与评分合同，目录里暂无线性等价条目。
- `ZeroBench` / `ZeroBench-main`：目录未检出对应条目。DeepSeek Vision 卡的 `ZeroBench (Pass@5)` 与 V4.1 公告的 `ZeroBench-main (w/tools)` 需先追 benchmark 发布方、版本及运行方式，不按名称相似直接合并。
- `BabyVision`：虽有作者源头并在两个厂商表出现；目录无同名 ID，先核视觉任务子集与表中设置。

### 值得进入候选审核的新条目（有足够信号但仍需要正式建档核验）

高优先级：

1. **DeepSWE v1.1**：DataCurve 第一方项目仓库与 leaderboard 均可访问；厂商多份近期表独立引用。为新条目候选，使用带版号的准确 ID/名称，不和 SWE-bench 既有项目合并。
2. **Toolathlon / Toolathlon Verified**：HKUST-NLP 官方仓库/主页及 ICLR 论文入口可追；多个最新厂商报告出现，值得建档。应以作者对 verified score / leaderboard 的解释确定显示名和版本，不把 “Tool-Decathlon” 默认当正式独立版本。
3. **NL2Repo-Bench**：论文直接描述面向完整仓库生成的评测任务，数份官方模型表引用 NL2Repo。但具体厂商结果与论文版本映射需要额外确认，候选可先建“待核”研究行。
4. **BabyVision**：UniPat-AI 官方仓库和作者论文可追，已在智谱和 DeepSeek 最新多模态表中出现；宜候选，保留 vendor run 设置未知。
5. **Terminal-Bench 2.1 / 3.0**：在两家厂商的近期官方表反复出现；目录只有 2.0 与 4.0。建议先对照 Terminal-Bench 官方发布页，分别判定新版本还是待完善版族关系后再新建。
6. **Vending-Bench 2**：Andon Labs 第一方页可核任务与指标，智谱卡也直接报告；模型报告里的数字是模拟结束时账户余额，官方榜单页面显示跨 5 次运行的平均，值得候选建档。

后续优先核的厂商表项（本次没有足够 benchmark-owner 资料，不建议直接写入正式目录）：`ProgramBench`、`FrontierSWE`、`SWE-Marathon v1.1`、`PostTrainBench`、`CritPt`、`MathArena Apex`、`SEC-Bench Pro`、`ExploitGym`、`ExploitBench`、`ZeroBench-main`、`MVBench`、`MMVU`。DeepSeek 自称 internal 的 `DSBench-FullStack` 与 `DSBench-Hard` 只记公司内部评测，不做外部基准候选。

## 未核实与限制

- 由于厂商页和模型卡持续更新，链接指向现行页面而非已归档快照。除日期固定的公告外，未来版本可能替换成绩/图片。需要用 Git/HF 历史或 Wayback 固定摘要前，不应把当前页面直接视作历史版本快照。
- GLM-5.3 模型卡未给首发日期。GLM-5.3-Flash 专题博客日期为 2026-09-23，但 GLM-V 官方仓库把 release 日期列为 2026-08-26；两个一手来源有口径差异，本研究不自行裁定。
- DeepSeek V4.1-Flash 公告有全套名字但没有逐项设置；不得依据 API 模型支持 thinking 或模型可用工具，推定发布表评测使用了相同设置。
- 官方表写了 HMMT、IMOAnswerBench、CritPt、ProgramBench、NL2Repo 等名称，但该成绩表本身不提供这些项目的官方定义、题集版本或评分规则。
- 不将论文 arXiv 页面存在视作可下载/可重发全套 benchmark 数据的许可。模型报告和评测发布方角色分开维护，样例许可需另外核验。
- 未对分数作转录、换算或排名，也未访问模型 API 执行实测。
- 项目中发现 75 个 JSON benchmark 文件；本轮只读了其 ID/name 与若干版本字段，未修改任何正式 benchmark 文件、release、代码、进度或 `UPDATE_LOG.md`。

## 主要第一方来源清单

- Z.ai： [GLM-5.3-Flash 发布文](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)；[GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)、[GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)、[GLM-5.1](https://huggingface.co/zai-org/GLM-5.1)、[GLM-5](https://huggingface.co/zai-org/GLM-5) 官方模型卡；[GLM-5.3 技术报告](https://arxiv.org/abs/2602.15763)。
- DeepSeek： [官方 API 更新日志](https://api-docs.deepseek.com/updates/)；[V4-Pro-0813 官方模型卡和报告](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)；[V4-Flash-Vision-Exp 官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)；[V3.2-Exp 官方卡](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp)、[V3.2 官方卡](https://huggingface.co/deepseek-ai/DeepSeek-V3.2)。
- Benchmark 发布者： [DataCurve DeepSWE](https://github.com/datacurve-ai/deep-swe)、[HKUST-NLP Toolathlon](https://github.com/hkust-nlp/Toolathlon)、[UniPat-AI BabyVision](https://github.com/UniPat-AI/BabyVision)、[Zapier AutomationBench](https://github.com/zapier/AutomationBench)、[Andon Labs Vending-Bench 2](https://andonlabs.com/evals/vending-bench-2)、[Terminal-Bench 版本页](https://www.tbench.ai/benchmarks)、[NL2Repo-Bench 作者论文](https://arxiv.org/abs/2512.12730)。



