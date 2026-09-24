# Kimi / Moonshot AI 与 MiniMax 近期模型发布评测来源核查（2026-09-23）

本文件是只读来源研究记录，服务于后续 benchmark 目录与发布记录审核。截止日为 2026-09-23。只把厂商自报成绩作为“厂商报告事实”，不把它们当作独立基准的官方排行榜结果；benchmark 名称和版本按第一方表格原样保留。此次没有修改 `content/benchmarks`、`content/releases.json`、源码、进度文件或 `UPDATE_LOG.md`。

## 范围与来源规则

- 检索对象：Moonshot AI / Kimi 与 MiniMax 的主要近期模型发布资料；优先采用厂商官网、厂商官方 GitHub / Hugging Face 卡、厂商署名的技术报告。官方页面没有显示发布日期时明确写出“页面未标日期”，不从搜索摘要、外部模型目录或媒体报道补日期。
- 成绩表里的设置仅按页面明示记录。`thinking`、工具、提示、上下文长度、agent harness、采样与平均次数分别影响结果；跨模型列也可能来自外部榜单或模型自报报告，须看脚注。
- 下方“基准官方来源”是 benchmark 作者/维护方的第一方入口；“发布/厂商报告”是报告模型成绩的来源。厂商自己创建的内部评测没有独立 benchmark 官方来源，标记为“厂商内部”；本轮无法确认第一方基准入口的则标记“待查”，不凭名称推断。
- 日期的“技术报告日期”取报告自身页面。网页文章有明确日期则照录；无日期仅记录页面未注明。当前官网菜单中出现的产品，不足以证明它在截止日已发布；只纳入可找到厂商发布文档/报告支持的项目。

## 可确认的主要近期发布资料

| 厂商 / 模型 | 发布主体与日期证据 | 第一方发布页 / 技术报告 | 成绩表位置与可核实性 |
| --- | --- | --- | --- |
| Moonshot AI / Kimi K2 | Kimi Team；技术报告 arXiv 提交日 2025-07-28 | [官方 GitHub](https://github.com/MoonshotAI/Kimi-K2)、[技术报告](https://arxiv.org/abs/2507.20534) | GitHub README 的 Evaluation Results；含 instruction 与 base 两组表。项目 `content/releases.json` 已有 Kimi K2 条目，但仅挂 Arena-Hard v2、SWE-bench Multilingual、LongBench v2，值得复核遗漏。 |
| Moonshot AI / Kimi K2.5 | Kimi Team；技术报告日期 2026-02-02 | [官方 GitHub / README](https://github.com/MoonshotAI/Kimi-K2.5)、[技术报告](https://arxiv.org/abs/2602.02276)、[官方博客](https://www.kimi.ai/blog/kimi-k2-5) | GitHub README 第 3 节 Evaluation Results，正文表格可读；脚注在表后。官方博客附录有 benchmark 表图与设置脚注。 |
| Moonshot AI / Kimi K2.6 | Moonshot AI；官方博客未显示发布日期；页面明确称模型已开放与可用，故可确认发布存在，但本文不填外推日期 | [官方博客](https://www.kimi.ai/blog/kimi-k2-6)、[官方 Hugging Face 模型卡](https://huggingface.co/moonshotai/Kimi-K2.6) | 博客有“Benchmark Table”与脚注，但网页文本抽取未呈现完整表格正文；只记录可读的正文/脚注名称和内部成绩图入口，不从图片或检索摘要猜表项。脚注明确多数外部报告分数引用官方来源。 |
| Moonshot AI / Kimi K3 | Kimi Team；技术报告日期 2026-07-27 | [官方 GitHub / README](https://github.com/MoonshotAI/Kimi-K3)、[技术报告](https://arxiv.org/abs/2607.24653)、[官方博客](https://www.kimi.ai/blog/kimi-k3) | README 第 3 节 Evaluation Results 表为可读 Markdown，后附评测方法脚注。博客有图表及简要对比。技术报告表适合作为逐项复核主入口。 |
| MiniMax / MiniMax-M2.1 | MiniMax；官方 GitHub 发布说明未显示具体日期 | [官方 GitHub](https://github.com/MiniMax-AI/MiniMax-M2.1)、[官方 Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M2.1) | README `Benchmarks` 表为可读 Markdown；官方发布页明确列四项。 |
| MiniMax / MiniMax-M2.5 | MiniMax；官方 GitHub 发布说明未显示具体日期 | [官方 GitHub](https://github.com/MiniMax-AI/MiniMax-M2.5)、[官方 Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M2.5) | README 的 coding/search/agent 图表是图片；官方图像入口见 README（`figures/bench_*.png`）。图片链接保留在仓库页。正文可确认 VIBE-Pro、SWE-bench Verified 多 harness、BrowseComp、Wide Search、RISE 等名称；勿把图片中未能逐字读取的行补写。 |
| MiniMax / MiniMax-M2.7 | MiniMax；官网新闻页明确日期 2026-03-18 | [官方新闻 / 成绩说明](https://www.minimax.io/news/minimax-m27-en)、[官方 GitHub](https://github.com/MiniMax-AI/MiniMax-M2.7)、[官方 Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M2.7)、[官方模型系列技术报告](https://arxiv.org/abs/2605.26494) | 新闻页正文有 MLE Bench Lite、SWE-Pro、VIBE-Pro、SWE Multilingual、Multi SWE Bench、Terminal Bench 2、NL2Repo、GDPval-AA、Toolathon、MM Claw；GitHub README 正文同样可查。系列论文是 M2 至 M2.7 技术报告，不能视作每个单独模型均有独立评测表。 |
| MiniMax / MiniMax M3 | MiniMax Research；官方博客明确日期 2026-06-01 | [官方博客及评测方法](https://www.minimax.io/blog/minimax-m3)、[官方 Hugging Face 模型卡](https://huggingface.co/MiniMaxAI/MiniMax-M3)、[MSA 技术报告](https://arxiv.org/abs/2606.13392) | 博客正文第“Frontier Coding and Agentic Capabilities”段落可读列出五项；更宽的 benchmark 表在官方图片中。评测方法列出更多表项及 runner/scaffold/样本配置，但部分结果是 MiniMax 内部评测。MSA 论文讲注意力，不可误称完整 M3 benchmark 技术报告。 |

## 逐发布页摘取的成绩表名称与设置

下表不复述分数，仅记录表里出现的原名、版本标注、评测条件和正文/图位置。`—` 表示该行没有在所核页面的可读文字中确认设置；不等于未使用工具或 thinking。

### Kimi / Moonshot AI

#### Kimi K2（2025-07-28，官方技术报告）

README 有 `Instruction model evaluation results` 与 `Base model evaluation results` 两张表。可读的原名包括：LiveCodeBench v6（Aug 24–May 25）、OJBench、SWE-bench Verified、SWE-bench Multilingual、MMLU、MMLU-Pro、MMLU-Redux-2.0、SimpleQA、TriviaQA、GPQA-Diamond、SuperGPQA、EvalPlus、MATH、GSM8K、C-Eval、CSimpleQA、Tau2-Bench、ACEBench (En)。表中明示的指标/条件包括 Pass@1、EM、Correct、Avg@8、shot 数；SWE-bench Verified/Multilingual 的工具增强行说明 bash/editor 工具、single-attempt patch、no test-time compute；另一个 Verified 结果用了并行 test-time compute 与内部排序模型。AIME、HMMT、CNMO、PolyMath-en、GPQA-Diamond、EvalPlus、Tau2 使用 avg@k 稳定化；除 SWE Verified Agentless 以外，其余指标使用 8k 输出 token，Agentless Verified 使用 16k。表格位置：[官方 README](https://github.com/MoonshotAI/Kimi-K2/blob/main/README.md) `Evaluation Results`。

#### Kimi K2.5（2026-02-02 技术报告）

来源：[官方 README](https://github.com/MoonshotAI/Kimi-K2.5) 第 3 节（完整文字表）及[官方博客](https://www.kimi.ai/blog/kimi-k2-5)附录表。README 中可读的表项原名为：

- Reasoning & Knowledge：HLE-Full；HLE-Full (w/ tools)；AIME 2025；HMMT 2025 (Feb)；IMO-AnswerBench；GPQA-Diamond；MMLU-Pro。
- Image & Video：MMMU-Pro；CharXiv (RQ)；MathVision；MathVista (mini)；ZeroBench；ZeroBench (w/ tools)；OCRBench；OmniDocBench 1.5；InfoVQA (val)；SimpleVQA；WorldVQA；VideoMMMU；MMVU；MotionBench；VideoMME；LongVideoBench；LVBench。
- Coding：SWE-Bench Verified；SWE-Bench Pro；SWE-Bench Multilingual；Terminal Bench 2.0；PaperBench；CyberGym；SciCode；OJBench (cpp)；LiveCodeBench (v6)。
- Long Context：Longbench v2；AA-LCR。
- Agentic Search：BrowseComp；BrowseComp (w/ctx manage)；BrowseComp (Agent Swarm)；WideSearch (item-f1)；WideSearch (item-f1 Agent Swarm)；DeepSearchQA；FinSearchCompT2&T3；Seal-0。

通用设置：K2.5 列为 Thinking；Kimi 默认 temperature=1.0、top-p=0.95、上下文 256k。HLE、AIME 2025、HMMT 2025 (Feb)、GPQA-Diamond 最大 completion budget 96k；AIME/HMMT 为 avg@32，GPQA-Diamond 为 avg@8。HLE-Full 为 text+image，表中同时另列工具版；HLE 工具设置有 search/code interpreter/web browsing。所有 agentic search 基准使用 search、code interpreter、web browsing；BrowseComp 使用 discard-all context 策略，WideSearch/Seal-0 为 avg@4。多模态评测 max-tokens=64k、avg@3；ZeroBench w/tools 是每步 24k、最多 30 步。Coding 系列使用 Moonshot 内部框架、特定工具组并平均 5 次；Terminal-Bench 2.0 使用 Terminus-2 且 K2.5 为 non-thinking。LongBench v2 输入标准化至约 128k。官方方法和表注见 README 第 3 节下方 footnotes。

#### Kimi K2.6（官方博客/模型卡，无可读完整表）

官方博客的 `Benchmark Table` 标题之后表格正文未在文本抽取中出现；文章可读取到的直接评测名称为 Kimi Code Bench、Kimi Design Bench、Claw Bench（内部）；脚注还明示 IMO-AnswerBench、HLE / Humanity’s Last Exam（full 与 text-only；工具版）、BrowseComp、DeepSearchQA、WideSearch、Claw Eval v1.1、APEX-Agents、Terminal-Bench 2.0、SWE-Bench 系列（Verified、Multilingual、Pro）与 MMMU-Pro。脚注说明 K2.6 与 K2.5 为 thinking mode，temperature=1.0、top-p=1.0、上下文 262,144；除另注明外，多数 K2.6 评测有 thinking。HLE 等 reasoning 最大生成 98,304；HLE text-only K2.6 工具使用 search/code-interpreter/web-browsing，full 工具版最大生成 262,144、per-step 49,152 并压缩历史。BrowseComp 用 discard-all；DeepSearchQA 无 context management，超上下文任务计失败；WideSearch 使用 “hide tool result”。APEX-Agents 使用公开 480 项中的 452 项。Terminal-Bench 2.0 用 Terminus-2、preserve-thinking；SWE 系列用内部适配 SWE-agent 的工具链。博客的表格与图：请从[官方博客](https://www.kimi.ai/blog/kimi-k2-6)的 “Benchmark Table” 和带说明的图片入口复核；不得从搜寻摘要另抄未呈现在页面正文中的行。

#### Kimi K3（2026-07-27 技术报告）

来源：[官方 README](https://github.com/MoonshotAI/Kimi-K3) 第 3 节 `Evaluation Results`，表为可读 Markdown；[arXiv 技术报告](https://arxiv.org/abs/2607.24653)。原名如下（只写表中行）：

- Reasoning & Knowledge：GPQA Diamond；CritPt；AA-LCR；HLE-Full。
- Coding：DeepSWE；ProgramBench；Terminal-Bench 2.1；FrontierSWE；SWE-Marathon；PostTrainBench；MLS-Bench-Lite；SciCode；Kimi Code Bench 2.0（in-house）。
- Agentic：BrowseComp；DeepSearchQA (F1)；ResearchRubrics；GDPval-AA v2 (Elo)；Toolathlon-Verified；MCPMark-Verified；MCP-Atlas；AutomationBench；JobBench；AA-Briefcase (Elo)；Agents’ Last Exam；APEX-Agents；OfficeQA Pro；SpreadsheetBench 2；OSWorld-Verified；OSWorld 2.0；SaaS-Bench；τ³-Banking；Harvey Lab-AA；CorpFin v2；Finance Agent v2；Legal Research Bench。
- Vision：WorldVQA ForceAnswer；OmniDocBench；PerceptionBench；Video-MME (w. sub)；MMVU；BabyVision w/ python；MMMU-Pro；CharXiv (RQ)；MathVision；ZeroBench (pass@5)。

配置：表头明确 Kimi K3 使用 `(max)` reasoning effort；Claude Fable 5 `(max, w/ fallback)`；GPT-5.6 Sol `(max)`；Claude Opus 4.8 `(max)`；GPT-5.5 `(xhigh)`；GLM-5.2 `(max)`。K3 温度 1.0；single-step 默认 top-p 0.95，agentic top-p 1.0。HLE-Full、MMMU-Pro、CharXiv、MathVision、ZeroBench 的单元格分别以 “without/with tool augmentation” 成对记分；Python 工具用于视觉多步任务。APEX-Agents 成绩引用 leaderboard / Artificial Analysis；GDPval-AA v2、AA-Briefcase、τ³-Banking、Harvey Lab-AA、APEX-Agents 成绩引用 Artificial Analysis / APEX 官方榜；SciCode 引用 Artificial Analysis；CritPt 与 AA-LCR 也引自 Artificial Analysis。DeepSWE v1.1，K3 用 Kimi Code harness；Terminal-Bench 2.1 用 Kimi Code harness；APEX-Agents 等评测有公开子集与回合限制，细节应逐条看 README footnotes。HLE-Full 的分子分母顺序是无工具/有工具；不要把单工具和工具增强分数合成单一成绩。详细可读表与脚注：[官方 README 表](https://github.com/MoonshotAI/Kimi-K3/blob/main/README.md)。

### MiniMax

#### MiniMax-M2.1（官方发布 README）

`Benchmarks` 表原名四项：SWE-bench Verified、Multi-SWE-bench、SWE-bench Multilingual、Terminal-bench 2.0。公开 README 表未在该处给出 thinking、工具或 pass@k 说明，也未展开 scaffold / runs；这些配置均标“本页未说明”。表格：[MiniMax 官方 README](https://github.com/MiniMax-AI/MiniMax-M2.1) `Benchmarks`。

#### MiniMax-M2.5（官方发布 README 与图表）

正文可读原名：VIBE Pro；SWE-Bench Verified；BrowseComp；Wide Search；RISE (Realistic Interactive Search Evaluation)。SWE-Bench Verified 正文有 Droid、OpenCode 两种 harness 的结果。GitHub README 还链接 benchmark 图表 `figures/bench_*.png`；其图像入口位于[官方仓库](https://github.com/MiniMax-AI/MiniMax-M2.5)的 Coding、Search and Tool calling、Agentic 能力部分。直接 PNG 可由仓库链接打开，例如 `figures/bench_1.png`、`figures/bench_12.png`；本次将原页面/图链接作为证据，未下载受限材料或转录无法核读的图内行。正文未说明通用 thinking、工具策略或 pass@k；BrowseComp 叙述含 context management，但具体配置须以相应图/后续方法说明为准。

#### MiniMax-M2.7（2026-03-18 官方新闻页）

官方新闻正文（与官方 GitHub README 相符）原名：MLE Bench Lite（新闻页称 22 ML competitions）；SWE-Pro；SWE Multilingual；Multi SWE Bench；VIBE-Pro；Terminal Bench 2；NL2Repo；GDPval-AA；Toolathon；MM Claw（含 MM Claw end-to-end benchmark 与 skill compliance）。方法/表注没有在新闻页给出通用采样设置。清单来自[官方新闻](https://www.minimax.io/news/minimax-m27-en)第 1–3 项，可读段落；数值仍属于 MiniMax 自报。M2 系列[技术报告](https://arxiv.org/abs/2605.26494)覆盖 M2 至 M2.7 的训练与评测方法，但它不是独立 benchmark 定义来源。

#### MiniMax M3（2026-06-01 官方发布页）

发布正文清晰列出的公开 benchmark 名称：SWE-Bench Pro；Terminal-Bench 2.1；SWE-fficiency；KernelBench Hard；MCP Atlas。评测方法附录还点名：SWE-Bench Verified；SWE Atlas-Codebase QNA；NL2Repo；SWE Atlas-Test Writing；LiveSQLBench (Base-Full v1)；VIBE-V2（internal）；SVG-Bench（internal）；CL-bench；PostTrainBench；AIME2025、BFCL、GPQA Main、GSM8K、HumanEval（PostTrainBench 子基准）；Kernelbench-Hard；PaperBench；GDPval-Rubrics（internal）；BrowseComp；DRACO；BankerToolBench；OfficeQA Pro；SpreadSheetBench-v1；YC-Bench；LOCA-Bench (256k)；MCP Atlas；Apex-Agents；Claw-Eval；OSWorld-Verified；OmniDocBench v1.5；MMMU Pro；VideoMMMU；Video-MME。

正文还明确说明 M3 支持 thinking 启用/关闭，但该模式描述是 API 能力，不足以把每个表项判定为开/关；评测方法对具体任务另述：SWE-Bench Verified 内部环境 + Claude Code scaffold、改写默认 system prompt、每题 4 次取平均；SWE-Bench Pro 按官方评测逻辑；Terminal-Bench 2.1 用 Terminus 2、8C16G、2 小时、max output 128K；NL2Repo 与 SWE Atlas-Codebase QNA 对不同模型使用不同 agent scaffold；VIBE-V2、SVG-Bench、GDPval-Rubrics 均明确为内部基准/评估；LiveSQLBench 为 v1、600 题、22 个 PostgreSQL 数据库；PostTrainBench 为 12 小时 Ralph-Loop，4 个 base model、5 项非 LLM-as-judge 子任务；Kernelbench-Hard 平均 9 题；PaperBench 是 19 篇论文、Opus-4.6 评分；BrowseComp 超 64K tokens 时 discard history；OSWorld-Verified 361 个 nogdrive 样本、200 步；OmniDocBench 用公开 v1.5 数据；视频表项按公开方法/输入设置并以 LLM-as-a-Judge 评分。来源及完整 runner 配置见[官方 M3 博客](https://www.minimax.io/blog/minimax-m3) `Evaluation Methodology`；公开行和内部评估不可混标。

## 与项目现有 75 条目录按 ID / 名称比对

比对对象是本工作区 `content/benchmarks/*.json` 的 75 个 ID 与 `name`。这里的“已收录”只说明项目已有候选/条目名称，不能证明表内数据版本、来源或配置已经匹配。

### 已收录（发布页原名与现有 ID 明确对应）

| 现有 ID | 当前名称 | 本次出现的发布表原名 |
| --- | --- | --- |
| `aime-2025` | AIME 2025 | Kimi K2.5 AIME 2025；Kimi K2 表中也出现 AIME 2025（但该模型报告使用 avg@k，口径单列）。 |
| `alignbench` | AlignBench | 本轮模型发布表未找到。 |
| `apex-agents` | APEX-Agents | Kimi K2.6、Kimi K3、MiniMax M3。 |
| `automationbench` | AutomationBench | Kimi K3。 |
| `browsecomp` | BrowseComp | Kimi K2.5/K2.6/K3；MiniMax-M2.5正文、M3方法。 |
| `browsecomp-zh` | BrowseComp-ZH | 本轮所列较新发布表未找到；不据 MiniMax/Kimi 名称近似推断。 |
| `ceval` | C-Eval | Kimi K2 base table。 |
| `charxiv` | CharXiv | Kimi K2.5/K3 的 `CharXiv (RQ)`；需核 RQ 子集/提示定义是否与主条目相同。 |
| `finance-agent` | Finance Agent | Kimi K3 的 `Finance Agent v2`；疑似版本升级，见下节。 |
| `gdpval-aa` | GDPval-AA | MiniMax-M2.7 `GDPval-AA`；Kimi K3 写 `GDPval-AA v2`，不视作同版本。 |
| `gpqa-diamond` | GPQA Diamond | Kimi K2/K2.5/K3。 |
| `gsm8k` | GSM8K | Kimi K2 base 与 MiniMax M3 的 PostTrainBench 子任务。 |
| `hle` | Humanity’s Last Exam | Kimi K2.5/K2.6/K3 的 HLE-Full 与工具变体；数据/图文子集与工具条件要在 model release 层标注。 |
| `human-eval` | HumanEval | MiniMax M3 的 PostTrainBench 子任务。 |
| `livecodebench` | LiveCodeBench | Kimi K2 的 `LiveCodeBench v6` 与 K2.5 `LiveCodeBench (v6)`；需明确版本与题集日期。 |
| `longbench-v2` | LongBench v2 | Kimi K2.5 的 `Longbench v2`（官方大小写如表）。 |
| `mathvista` | MathVista | Kimi K2.5 `MathVista (mini)`；子集未必等同总集。 |
| `mcp-atlas` | MCP-Atlas | Kimi K3 / MiniMax M3（方法写 MCP Atlas）。 |
| `mmlu-pro` | MMLU-Pro | Kimi K2 base/K2.5。 |
| `mmmu-pro` | MMMU-Pro | Kimi K2.5/K2.6/K3；工具与视觉设置需随报告记录。 |
| `omnidocbench` | OmniDocBench | Kimi K2.5 `OmniDocBench 1.5`、Kimi K3 `OmniDocBench`、MiniMax M3 `OmniDocBench v1.5`。 |
| `osworld` | OSWorld | Kimi K3 的 `OSWorld-Verified`（子集名不同，待核）、`OSWorld 2.0` 有专门 ID；不能将 Verified 自动并入普通 OSWorld。 |
| `osworld-2` | OSWorld 2.0 | Kimi K3 `OSWorld 2.0`。 |
| `scicode` | SciCode | Kimi K2.5/K3；K3 表注说明数值引自 Artificial Analysis。 |
| `swe-bench-multilingual` | SWE-bench Multilingual | Kimi K2/K2.5/K2.6 与 MiniMax-M2.1/M2.7。 |
| `swe-bench-pro` | SWE-bench Pro | Kimi K2.5/K2.6/K3 与 MiniMax M3 的 `SWE-Bench Pro`。 |
| `swe-bench-verified` | SWE-bench Verified | Kimi K2/K2.5/K2.6、MiniMax M2.1/M2.5/M3。 |
| `terminal-bench-2` | Terminal-Bench 2.0 | Kimi K2.5/K2.6、MiniMax M2.1/M2.5/M2.7 的 2 / 2.0 写法。Kimi K3 与 M3 的 2.1 必须区分。 |
| `video-mme` | Video-MME | Kimi K2.5 / K3、MiniMax M3；Kimi 无版本标注，K3 和 M3 还出现字幕设置。 |

### 疑似同名或版本相邻，需要先核对原条目合同

| 发布表原名 | 可能的现有 ID | 为什么不能直接合并 |
| --- | --- | --- |
| HLE-Full / HLE w/ tools | `hle` | 图文全集、text-only 子集、工具、上下文管理均不同；页面以单元格分别呈现。 |
| AIME 2025 / AIME2025 | `aime-2025` | K2.5 使用 avg@32 与 96k completion；K2/M3 另有自己的任务或训练任务用法。官方竞赛没有统一 AI 测试配置。 |
| HMMT 2025 (Feb) | `aime-2025` 无 | 年份相同不表示与 AIME 相同，单独基准。 |
| CharXiv (RQ) | `charxiv` | 表中限定 RQ 变体，需核项目条目覆盖的问答划分。 |
| MathVista (mini) | `mathvista` | mini 子集与全量协议可能不同。 |
| OmniDocBench 1.5 / v1.5 | `omnidocbench` | 现有条目是否固定 v1.5 尚待查；保留版本字段。 |
| LiveCodeBench v6 (Aug 24–May 25) | `livecodebench` | 同一 benchmark 但题目范围版本明确，模型分数不可只挂无版本 ID。 |
| Longbench v2 | `longbench-v2` | 可对应，但表注说明约 128k 统一输入上下文。 |
| SWE-bench Verified / Pro / Multilingual | 对应 `swe-bench-*` | 名称/家族相近但现有本就分开；各发布有不同 harness、工具集和 run aggregation，不能把成绩直接横比。 |
| Terminal-bench 2、2.0、2.1 | `terminal-bench-2` | 2.1 是新版；不要因名称相似挂接 2.0。 |
| GPT K3 表 `GDPval-AA v2` | `gdpval-aa-v2-1` | 项目现有是 v2.1；“v2”没有明确指向 v2.1。 |
| `Finance Agent v2` | `finance-agent` | v2 可能是新版本任务集/报告面板，尚不能等同未标版条目。 |
| `OSWorld-Verified` | `osworld` | 验证子集、固定使用 361 nogdrive 样本与不同步数上限，独立发布时需核是否另立 ID。 |
| `MMMU Pro` / `MMMU-Pro` | `mmmu-pro` | 可以对应 benchmark 家族，但报告还含工具版、图像前缀协议及成对记分，release 结果要带 setting。 |
| `Video-MME (w. sub)` | `video-mme` | 明示 subtitles 注入/视频帧采样配置；先核既有 ID 能否表达该视听设置。 |
| `MLE Bench Lite` / `MLS-Bench-Lite` | 无 | 拼写非常相近，但本轮资料分别来自 MiniMax 和 Kimi，不能未经基准第一方证据就当成同一 benchmark。 |
| `Toolathon` / `Toolathlon-Verified` | 无 | 名称近似且厂商/发布版本不同；等待两项基准方官方页面确认关系。 |
| `MiniMax internal RISE`, `Kimi Code Bench`, `Kimi Design Bench`, `AI Office Bench`, `General Agent Bench`, `Claw Bench`, `Kimi Code Bench 2.0` | 无 | 厂商自建基准或内部系列；如目录收录需保留厂商来源、许可/可复现性及版本边界。 |

### 值得作为新增候选，先做 benchmark 方来源审核

下列名称在项目 75 条中没有明确 ID。添加候选不等于建议立即进入正式目录。已有足够的项目第一方入口时给出链接；否则标明待查。表中“发布证据”仍是模型厂商表/方法，不能替代基准方定义。

| 原名（版本照录） | 首次见于本轮资料 | 基准官方来源与厂商报告边界 | 建议与阻塞点 |
| --- | --- | --- | --- |
| HMMT 2025 (Feb) | Kimi K2.5 | 竞赛主办方 [HMMT](https://www.hmmt.org/)；成绩见 Moonshot K2.5 README | 候选可跟进；须确认 February 赛卷、split 与版权授权，不把 HMMT 与 AIME 合并。 |
| IMO-AnswerBench | Kimi K2.5 | 首方基准仓库需查；成绩见 Moonshot K2.5 README | 名称可确认，评测定义/官方数据入口本轮未核，暂不建条目。 |
| MathVision | Kimi K2.5/K3 | benchmark 第一方项目入口待查；成绩及 K3 方法见 Moonshot K2.5/K3 README | 新候选；记录 K2.5/K3 的工具配置差异。 |
| ZeroBench | Kimi K2.5/K3 | 第一方基准项目入口待查；厂商表区分普通、w/tools、pass@5 | 新候选；不同 pass@k 与工具变体应拆配置而非另造 ID。 |
| OCRBench | Kimi K2.5 | 第一方项目入口待查；成绩来自 Moonshot 表 | 新候选；先查现有视觉条目是否包含相同版本。 |
| InfoVQA | Kimi K2.5 | 基准/数据源需核其论文和作者仓库；厂商表明确 `val` | 新候选；命名建议保留 val 标记在发布结果层。 |
| SimpleVQA | Kimi K2.5 | 第一方来源待查；厂商表为该精确原名 | 新候选。 |
| WorldVQA | Kimi K2.5/K3 | Moonshot 自建 [官方项目仓库](https://github.com/MoonshotAI/WorldVQA)；成绩在 Kimi 表 | 新候选，但应注明由发布厂商建设，检查数据/许可和独立复现条件。 |
| VideoMMMU | Kimi K2.5 | 第一方 benchmark 页面待查；厂商表 | 新候选。 |
| MMVU | Kimi K2.5/K3 | 第一方 benchmark 页面待查；厂商表 | 新候选。 |
| MotionBench | Kimi K2.5 | 第一方 benchmark 页面待查；厂商表 | 新候选；需先核多模态任务定义。 |
| Video-MME v2 / VideoMMMU v? | Kimi K2.5/K3 | 项目现有 Video-MME；版本/命名应分别核官方源 | Video-MME 不新建；VideoMMMU 另作候选。 |
| LVBench | Kimi K2.5 | 第一方项目入口待查；厂商表 | 新候选。 |
| PaperBench | Kimi K2.5/K3/M3 | [官方项目仓库](https://github.com/scaleapi/paperbench)；K2.5/K3/M3 均有模型厂商报告 | 候选优先级高；分数需记录 rubric/judge，M3 表注为 19 papers、Opus-4.6 scoring。 |
| CyberGym | Kimi K2.5 | 第一方项目入口待查；厂商表 | 新候选；安全基准许可与任务访问方式需核。 |
| OJBench (cpp) | Kimi K2.5/K2 | 第一方项目入口待查；厂商表可读 | 新候选；语言限定 cpp 要与总基准定义核对。 |
| AA-LCR | Kimi K2.5/K3 | [Artificial Analysis 第一方评测/方法](https://artificialanalysis.ai/)；Moonshot K3 明确转引其分数 | 候选；这是第三方评测方结果，应与 Moonshot 自测分列。 |
| WideSearch (item-f1) | Kimi K2.5/K2.6、MiniMax-M2.5 | 第一方项目入口待查；各厂商报告 | 新候选；`item-f1` 与 Agent Swarm、hide-tool-result 条件是不同 setting。 |
| DeepSearchQA | Kimi K2.5/K2.6/K3 | [Google Research 项目/论文入口](https://research.google/)需精确核实；Moonshot K3 README 含 F1 结果 | 新候选；待定位 benchmark 作者正式 repo/paper，再确定协议。 |
| FinSearchComp | Kimi K2.5 | 第一方项目入口待查；名称出现在 MiniMax-M2 README 的 Artificial Analysis 引用及 Kimi 报告 | 新候选；T2&T3 子集必须带版本。 |
| Seal-0 | Kimi K2.5 | 第一方来源待查；厂商成绩表 | 新候选。 |
| CritPt | Kimi K3 | 第一方来源待查；Kimi 报告 | 新候选。 |
| DeepSWE (v1.1 tasks) | Kimi K3 | [官方 leaderboard](https://deepswe.datacurve.ai/)；Kimi K3 README 区分 Kimi Code harness 与官方榜所用 mini-SWE-agent | 新候选；数据版本、harness 与 leaderboard 分数来源须写明。 |
| ProgramBench | Kimi K3 | 第一方 benchmark 来源待查 | 新候选。 |
| Terminal-Bench 2.1 | Kimi K3、MiniMax M3 | [Terminal-Bench 项目](https://www.tbench.ai/)；两家均写 2.1，报告 harness 不同 | 候选需独立版本标识，不得并为 Terminal-Bench 2.0。 |
| FrontierSWE | Kimi K3 | 第一方来源待查 | 新候选。 |
| SWE-Marathon | Kimi K3 | 第一方来源待查 | 新候选。 |
| PostTrainBench | Kimi K3、MiniMax M3 | 第一方 benchmark 来源待查；MiniMax 把它描述为自设流程，Kimi 表独立列名 | 高风险同名；目前仅记录候选名称，先查是否同一项目/同一 benchmark。 |
| MLS-Bench-Lite | Kimi K3 | 第一方来源待查 | 需与 MiniMax `MLE Bench Lite` 判异同后再建。 |
| ResearchRubrics | Kimi K3 | 第一方来源待查 | 新候选。 |
| Toolathlon-Verified | Kimi K3 | 第一方来源待查；勿与 MiniMax `Toolathon` 直接合并 | 新候选但要求来源先行。 |
| MCPMark-Verified | Kimi K3 | 第一方来源待查 | 新候选。 |
| JobBench | Kimi K3 | 第一方来源待查 | 新候选。 |
| AA-Briefcase | Kimi K3 | [Artificial Analysis](https://artificialanalysis.ai/)；K3 表注明 Elo | 候选；要和 GDPval-AA 区分，记录 Elo 与测试版本。 |
| SpreadsheetBench 2 | Kimi K3 | 第一方 benchmark 项目源待查 | 新候选；版本 2 不能无验证挂到已有无条目版本。 |
| SaaS-Bench | Kimi K3 | 第一方来源待查 | 新候选。 |
| τ³-Banking | Kimi K3 | 第一方来源待查 | 新候选；不能与 τ-bench / τ²-bench 混同。 |
| Harvey Lab-AA | Kimi K3 | Harvey / Artificial Analysis 源待精确核实；Kimi 明确引用 Artificial Analysis | 新候选；外部数据，不归为 Moonshot 自测。 |
| CorpFin v2 | Kimi K3 | [Vals AI](https://www.vals.ai/)；Kimi README 标成绩来源 | 新候选；保留版本 v2。 |
| Finance Agent v2 | Kimi K3 | [Vals AI](https://www.vals.ai/)；Kimi README 标成绩来源 | 先审是否现有 `finance-agent` 的新版；不要重复造同一 ID。 |
| Legal Research Bench | Kimi K3 | Vals AI 入口待精确核证 | 新候选。 |
| PerceptionBench | Kimi K3 | Moonshot [官方项目仓库](https://github.com/MoonshotAI/PerceptionBench)；Moonshot 报告也称 in-house | 候选并显著标记厂商开发/评测来源；其官网公开论文描述任务。 |
| BabyVision | Kimi K3 | 第一方项目入口待查；Kimi 表为 `w/ python` | 新候选；工具版为主要设置。 |
| MLE Bench Lite | MiniMax M2.7 | [OpenAI 官方 benchmark 仓库](https://github.com/openai/mle-bench)；MiniMax 自报 22 个 ML competitions | 候选；核清 Lite 具体 22 项子集与官方 benchmark 定义。 |
| VIBE-Pro | MiniMax M2.5/M2.7 | MiniMax 说明是其 VIBE benchmark Pro 版本；独立项目定义源待查 | 候选；厂商自定义版本需可访问的任务/评测资料。 |
| Multi-SWE-Bench | MiniMax M2.1/M2.5/M2.7 | 第一方来源待查；厂商报告可读 | 新候选；与 SWE-bench 多语言条目有亲缘但任务不同。 |
| NL2Repo | MiniMax M2.7/M3、Kimi K2.6（Kimi M3 页称引用 Qwen） | 第一方来源待查；各厂商报告给出不同 scaffold | 新候选。 |
| Toolathon | MiniMax M2.7 | 第一方来源待查；MiniMax 新闻明确名字/准确率 | 和 `Toolathlon-Verified` 分开保留，待基准方确认关系。 |
| MM Claw | MiniMax M2.7 | MiniMax 自建评测；报告说明依据 OpenClaw 常见任务建集 | 厂商内部/厂商定义；不当作外部 benchmark。 |
| SWE-fficiency | MiniMax M3 | [官方项目仓库](https://github.com/SWE-fficiency/SWE-fficiency)；MiniMax 使用公开 workflow、自报运行 | 新候选；公开数据集/官方 workflow，可继续核数据许可与具体 run config。 |
| KernelBench Hard | MiniMax M3 | [官方 KernelBench 仓库](https://github.com/ScalingIntelligence/KernelBench)；M3 报告明示其自定义 Hard 子集条件 | 新候选；版本/9题平均、硬件与相对 TFLOPs 指标必须固定。 |
| SWE Atlas-Codebase QNA | MiniMax M3 | [Scale Labs 官方评测入口](https://labs.scale.com/)；M3 多模型用内部 scaffold | 新候选；具体 QNA 数据和配置待查。 |
| SWE Atlas-Test Writing | MiniMax M3 | Scale Labs 官方入口待精确链接；MiniMax 内部评估部分模型 | 新候选，先定位基准方资产。 |
| LiveSQLBench (Base-Full v1) | MiniMax M3 | 第一方项目来源待精确核实；MiniMax 报告描述公开 v1 数据集 | 新候选；版本与 600 问、22 数据库以及 scaffold 限定。 |
| VIBE-V2 | MiniMax M3 | MiniMax 内部 benchmark | 如登记则厂商自建，不是 VIBE-Pro 的自动等同版本。 |
| SVG-Bench | MiniMax M3 | MiniMax 内部 benchmark | 厂商内部候选。 |
| CL-bench | MiniMax M3 | [官方项目入口](https://github.com/THUDM/CL-bench)；MiniMax 称沿官方流程 | 新候选；成绩是厂商自跑。 |
| GDPval-Rubrics | MiniMax M3 | 基于 public GDPval cases 与 rubrics，由 MiniMax 内部评测 | 不与 GDPval / GDPval-AA 视为一条结果；属于派生内部配置，暂只在 M3 release 注记。 |
| DRACO | MiniMax M3 | 第一方项目入口待查；MiniMax 用 Opus 4.6 scoring | 新候选；裁判模型要随成绩记。 |
| BankerToolBench | MiniMax M3 | 第一方项目入口待查；报告称 public dataset，M2.7 作评分器 | 新候选；judge/scaffold 必须显著保留。 |
| SpreadSheetBench-v1 | MiniMax M3 | 第一方项目入口待查；MiniMax 称公开集 | 需与 Kimi `SpreadsheetBench 2` 判同异后分别表述。 |
| YC-Bench | MiniMax M3 | 官方 codebase/config 由厂商说明，但此处未锁定源链接 | 新候选；只记“final assets (fund)”原始指标，不补解释。 |
| LOCA-Bench (256k) | MiniMax M3 | 官方 LOCA-bench 源待精确链接 | 新候选；模式与 Environment Description Length=256k 是配置的一部分。 |
| Claw-Eval | MiniMax M3 | 官方项目入口待查；M3 用公开 codebase、自报 General Task Group 161 tasks、Gemini 3.0 Flash 作评分器 | 新候选；Pass³（原文 superscript 3）不是 pass@3 定义，需查原文。 |
| VideoMMMU | MiniMax M3 | 第一方 benchmark 来源待查 | 候选；报告披露 1 FPS、最多 512 帧、裁判评测等设置。 |

MiniMax M3 方法页中其余明确标记为内部评测的 `VIBE-V2`、`SVG-Bench`、`GDPval-Rubrics` 及若干厂商 harness 分数，建议在 release/厂商结果层保留引用；是否成为全站 benchmark 条目由后续目录政策决定。

## benchmark 定义来源与成绩来源的边界

1. Kimi / MiniMax 模型 README、技术报告和产品博客是**厂商模型成绩**的一手来源。它们能证明厂商在特定表格或图里报告了某个名称与设置，不自动证明 benchmark 的权威定义、开放数据、复现性或跨厂商可比性。
2. benchmark 的第一方来源应回到 benchmark 作者/维护组织的论文、仓库、数据卡或官方 leaderboard。比如 MLE Bench、KernelBench、Terminal-Bench、PaperBench、CL-bench、DeepSWE、SWE-bench、MCP Atlas、APEX-Agents、Artificial Analysis、Vals AI 的候选入口已在上表链接；需注意多个页面中 MiniMax 与 Kimi 的分数是各自重跑，而不是直接从榜单抄取。
3. 如果厂商声称一行来自公开榜单或外部团队（例如 Kimi K3 的 AA、APEX-Agents、DeepSWE 说明；MiniMax M3 的外部 API/leaderboard 结果），该行应该标记第三方成绩来源与对应日期，同时仍将“发布报告含该表项”的证据指向厂商原文。不要把外部 benchmark 作者和表格发布者混作同一主体。
4. 厂商内部基准（Kimi Code Bench、Kimi Design Bench、AI Office/General Agent/Claw Bench；MiniMax 的 VIBE Pro/V2、MM Claw、GDPval-Rubrics 等）来源虽是一手，但并非独立公开 benchmark；标注 owner=vendor、可访问性/方法透明度，不与开放 benchmark 混排。
5. 对截图表格只引用表页和厂商原始图片；本轮没有拿搜索摘要替代原图，也没有下载需登录/受限材料。若后续需要恢复全部图表行，直接打开官方 README 指向的图片，并逐行记录图片链接和可读行号/截图位置。

## 未核实项与建议的下一轮复核

- Kimi K2.6 与 M2.1/M2.5 的官网页面未在正文显示发布日期。当前日期字段需要从官方模型卡的提交时间/发布公告再核实；此文件不采用第三方汇总站日期。
- Kimi K2.6 和 Kimi K3 博客上存在图表，但 K2.6 全表正文不可读，K3 则有可读技术报告；若要建立 release record，应以技术报告为主、博客图作补充。
- MiniMax-M2.5 README 的多张成绩表以 PNG 呈现。本轮能确认仓库页的图入口和正文提到的基准名，未对图像进行逐像素 OCR；未知行不列为事实。
- 各候选“官方来源待查”意味着本轮没有锁定 benchmark 所有者的精确 canonical URL；不要仅凭厂商报告页把候选提升为正式条目。
- `MLE Bench Lite` 与 `MLS-Bench-Lite`、`Toolathon` 与 `Toolathlon-Verified`、`SpreadSheetBench-v1` 与 `SpreadsheetBench 2`、`HLE-Full` 与当前 `hle`、`GDPval-AA v2` 与 `gdpval-aa-v2-1` 等名字关系均需 benchmark 第一方资料确认。
- Kimi K3 的表里有一批新金融、法律、办公、视觉和长程 coding 项目。即便同一厂商一张表列出，也应按 benchmark owner、版本、scaffold 和公开数据逐条评估，不能按数量直接批量建条目。
- 分数在本文刻意省略；release 候选如要加分，需另存模型名/精确 API 或 checkpoint、任务版本、工具/推理设置、run 统计与直接表格/图片证据。
