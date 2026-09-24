# 阶跃星辰与通义千问近期发布评测来源核查（2026-09-23）

本文件是只读来源研究的交付记录。核对截止日为 2026-09-23；仅使用厂商官方发布页、官方 GitHub/Hugging Face/ModelScope 页面和基准维护者的一手页面/论文。文中不转录成绩；“官方报告”表示厂商发布的模型评测，不表示基准维护者独立验证了厂商成绩。未改 `content/benchmarks`、产品内容、进度文件或 `UPDATE_LOG.md`。

## 核心结论

- “阶跃星辰5”可对应的正式名称是 **Step 5 Preview**。阶跃星辰官网在 2026-09-20 发布页面，并称它是当前旗舰模型；页面写明开放权重计划于 2026-10-15 发布。因此截至本核对日，它是产品/API 可用的 Preview，官网尚未称开放权重已发布。官网页面上的评测表以图像呈现，页面可读文字仍能核对小节标题、模型名与表项；链接保留在下表。官网没有把“StepFun 5”写成单独正式版本名。
- 通义千问近期主要可确认的文本/多模态开放模型为 Qwen3.8、Qwen3.6、Qwen3.5；另有图像生成模型 Qwen-Image-2.1（2026-09-20）。Qwen3.8 是截至日最新一代开放模型。本次检查确认 Qwen3.8、Qwen3.6、Qwen3.5 卡片中列出大批厂商评测表；Qwen-Image-2.1 官方发布页未见模型能力 benchmark 成绩表，故不从推理框架性能文档推断模型成绩。
- 项目当前 75 条中有多项可直接对应；有些表项带不同版本、任务切片、工具条件或厂商自建测试，不能只按相似名字并入。例如 Step 5 的 “Terminal-Bench v4” 对照现有 Terminal-Bench 4.0 需核实精确版本写法；Qwen 3.8 的 Terminal Bench 2.1 不等于现有 2.0。

## 官方发布页及评测表逐页提取

下列名称保持各发布页的原始大小写、版本和条件标记。页面行/段落指可复查位置；厂商分数因任务目的未抄录。

### StepFun：Step 5 Preview

| 项目 | 核验记录 |
| --- | --- |
| 发布主体、日期 | 阶跃星辰；官方发布页标注 2026-09-20。产品页称模型已可经产品与 API 体验，开放权重预计 2026-10-15。 |
| 官方页 | [Step 5 Preview: Advancing the Pareto Frontier](https://www.stepfun.com/step-5-preview)。发布主体为 StepFun 官网；页面顶部为发布说明，末尾有 “Try Step 5 Preview”。 |
| 表格/图位置 | 同一发布页的 “DeepSWE v1.1” 至 “DRACO” 八个评测小节；各小节图表是图片内容，不是可选择文本。页面还在 “GDPval-AA v2.1” 小节旁说明采用 Artificial Analysis 截至 2026-09-20 的结果。 |
| 页面原名及条件 | `DeepSWE v1.1`（Step 5 Preview 标注 High；发布页另说 DeepSWE 使用 SWE-agent harness、temperature=1.0、top_p=0.95）；`StepCodeBench`（High）；`ProgramBench`（High）；`Terminal-Bench v4`（High）；`Agents' Last Exam (ALE-CLI)`（High）；`GDPval-AA v2.1`（High，页面说明使用 Artificial Analysis 2026-09-20 最新结果）；`FrontierFinance`（High）；`DRACO`（High）。发布页共通声明：除另有说明，使用 high reasoning effort。 |
| 评测来源性质 | 这是厂商自报对比结果。DeepSWE 的 benchmark 维护者是 [DataCurve 官方仓库](https://github.com/datacurve-ai/deep-swe)；GDPval-AA 的评测服务/榜单由 [Artificial Analysis](https://artificialanalysis.ai/evaluations/gdpval-aa) 维护，StepFun 写明其结果转引 AA。其他标签的 benchmark 原始定义/维护者在本次第一方检索中未全部确认，见“未核实项”。 |
| 独立模型卡说明 | 搜到一个 Step-5-Preview Hugging Face 卡片位于 `TypeSafeAI` 账号，非已确认 StepFun 官方组织；其表名与官网不完全一致（例如 `GDPval-AA v2` vs 官网 `GDPval-AA v2.1`），故未把该账号内容当作 StepFun 官方原始证据，也不以其补官网遗漏的成绩表项。 |

### Qwen：Qwen3.8（2026-08）

| 页面/发布日期 | 原始 benchmark 名及表格位置 | 设置、版本及表格归属 |
| --- | --- | --- |
| [QwenLM/Qwen3.8 README](https://github.com/QwenLM/Qwen3.8/blob/main/README.md)：官方仓库 news 栏可见 2026-08-12 `Qwen3.8-2.4T-A95B`、2026-08-14 `Qwen3.8-27B`。 | 官方 README 的 “Benchmarks” 段落链接两个官方模型卡。 | 同 README lines 235–247 标示由模型卡/发布博客提供详细结果。 |
| [Qwen3.8-2.4T-A95B 模型卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)，Benchmark Results 表（网页核对行约 235–291）。 | `Terminal Bench 2.1`; `SWE-bench Pro`; `DeepSWE 1.1`; `NL2Repo-Bench`; `FrontierSWE`; `MLS-Bench-Lite`; `PaperBench`; `AndroidBench`; `QwenSWEBench`; `QwenQoderBench`; `QwenReactBench`; `QwenSVGBench`; `CoWorkBench`; `WorkSpaceBench`; `JobBench`; `SkillsBench`; `Agents' Last Exam (Pass / Score)`; `Automation-Bench (Pass@1)`; `Toolathlon Verified (Pass@1)`; `WideSearch`; `HLE w/ tools`; `GPQA Diamond`; `HLE`; `IFBench`; `$OneMillion-Bench (expert score)`; `HealthBench`; `PLawBench`; `PRBench-Legal`; `PRBench-Finance`; `MRCR v2 256K (8-needle)`; `LongBench v2`. | 卡片介绍该检查点为 Qwen3.8-2.4T-A95B，但成绩表比较列名写 **Qwen3.8-Max**；卡片称 Max 是基于开放权重版本并具扩展功能的官方 API 版，不能将整张表无差别说成纯本地 2.4T checkpoint 的复测。脚注逐项注明不同设置：Terminal Bench 2.1 用 Claude Code、avg@10、5h timeout、max_tokens=131072；其他模型取 AA Terminus 2 / Codex 已发表最佳结果。SWE-bench Pro 用 Claude Code，temperature=1、top_p=.95、256K 上下文，并修正问题任务后重测全部基线。DeepSWE 1.1 用 Claude Code 与 mini-SWE-agent 两种 harness，报告较高者；模型配置同上。PaperBench 为 BasicAgent / Code-Dev / Claude Opus 4.6 judge / 3 次。AndroidBench 用公开 95 任务子集、avg@3。QwenSWEBench avg@3、8 小时、32,768 max tokens、temperature=1。QwenQoderBench avg@5、6 小时、同样 32,768 / temperature=1。WideSearch 4 次 average item-F1，外部模型 Claude Code、本模型 Qwen-Agent。MRCR 明确 256K、8 needle。表中 HLE 与 HLE w/ tools 分列，需保留工具条件。SkillsBench 引用公开 v1.1；脚注称 Qwen 系列在 OpenCode 上、共 87 tasks、三次平均。Automation-Bench 用公开 600 任务子集。 |
| [Qwen3.8-27B 模型卡](https://huggingface.co/Qwen/Qwen3.8-27B)，Benchmark Results → Text Performance 表（网页核对行约 277–299）。 | `Terminal Bench 2.1 (Terminus)`; `SWE-bench Pro`; `NL2Repo-Bench`; `DeepSWE 1.1`; `QwenSWEBench`; `CoWorkBench`; `JobBench`; `Agents' Last Exam`（行内拆成 `Pass@1`、`Score`）; `IFBench`; `GPQA Diamond`; `HLE`; `LiveCodeBench v6`. | 脚注：除 Opus 4.6 外的 SWE-bench Pro 使用 Claude Code，temperature=1、top_p=.95、256K；DeepSWE 1.1 使用 Claude Code、相同采样和窗口；QwenSWEBench 为厂商自建，Claude Code、avg@3、8h、32,768 tokens、temperature=1；Agents' Last Exam 显示 `Pass@1` 与 `Score` 两个字段。页面称 Qwen3.8 thinking 默认开启，并可调 reasoning effort；此为运行说明，不等同该表明确写出的每个模型评测 reasoning 档位，表中未给就不代填。 |

> 模型卡以 Qwen 组织账号发布，属于厂商第一方报告，而非基准维护者报告。Qwen3.8-2.4T-A95B 卡将 Qwen3.8-Max 的成绩与第三方官方榜单成绩并列，脚注注明出处；准确引用时需要保留表列对象、harness 和取数日期。

### Qwen：Qwen3.6（2026-04）

| 页面/发布日期 | 原始 benchmark 名及表格位置 | 设置、版本及表格归属 |
| --- | --- | --- |
| [Qwen3.6-35B-A3B 模型卡](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)，“Benchmark Results”→Language 与 Vision Language（网页核对行约 284–362）；官方 Qwen3.8 README 将其发行日期列为 2026-04-16。 | Language：`SWE-bench Verified`; `SWE-bench Multilingual`; `SWE-bench Pro`; `Terminal-Bench 2.0`; `Claw-Eval (Avg)`; `Claw-Eval (Pass^3)`; `SkillsBench (Avg5)`; `QwenClawBench`; `NL2Repo`; `QwenWebBench`; `TAU3-Bench`; `VITA-Bench`; `DeepPlanning`; `Tool Decathlon`; `MCPMark`; `MCP-Atlas`; `WideSearch`; `MMLU-Pro`; `MMLU-Redux`; `SuperGPQA`; `C-Eval`; `GPQA`; `HLE`; `LiveCodeBench v6`; `HMMT Feb 25`; `HMMT Nov 25`; `HMMT Feb 26`; `IMOAnswerBench`; `AIME26`. Vision Language：`MMMU`; `MMMU-Pro`; `Mathvista(mini)`; `ZEROBench_sub`; `RealWorldQA`; `MMBench (EN-DEV-v1.1)`; `SimpleVQA`; `HallusionBench`; `OmniDocBench1.5`; `CharXiv(RQ)`; `CC-OCR`; `AI2D_TEST`; `RefCOCO(avg)`; `ODInW13`; `EmbSpatialBench`; `RefSpatialBench`; `VideoMME (w sub.)`; `VideoMME (w/o sub.)`; `VideoMMMU`; `MLVU`; `MVBench`; `LVBench`. | SWE-bench series 用内部 agent scaffold（bash + file-edit）、temperature=1、top_p=.95、200K；Pro 的部分公开任务经修订且基线重测。Terminal-Bench 2.0：Harbor/Terminus-2，3h，32 CPU/48GB RAM，temperature=1、top_p=.95、top_k=20、max_tokens=80K、256K 上下文、5 次平均。SkillsBench：OpenCode，78 个自包含子集任务，avg 5 次。QwenClawBench、QwenWebBench 标为内部基准；QwenWebBench 脚注明双语、7 类、渲染+多模态判分、BT/Elo。TAU3-Bench 用官方 user model gpt-5.2 low reasoning + 默认 BM25；VITA-Bench 平均子域分数，judge 为 claude-4-sonnet；MCP-Atlas 是 public set + gemini-2.5-pro judge；AIME26 用 2026 I、II 全卷。VideoMME 在有/无字幕设定分列。 |
| [Qwen3.6-27B 模型卡](https://huggingface.co/Qwen/Qwen3.6-27B)；[官方发布博客](https://qwen.ai/blog?id=qwen3.6-27b)。 | 官方博客的 “Performance” 区以图表呈现 27B 评测；模型卡提供语言、视觉语言 benchmark 表。页面主要名称/版本与 35B-A3B 卡同一组，版本差异须看各卡列，不合并单项得分。 | 官方博客 HTML 未暴露可稳定定位的纯文本行；在本次可复查工具里无法逐图抄录博客图表的每个 benchmark 行，故不把搜索摘要补成完整列表。模型卡仍是可复查的一手详细来源。 |

### Qwen：Qwen3.5（2026-02 至 03）

官方仓库 [Qwen3.8 README 的 news 栏](https://github.com/QwenLM/Qwen3.8/blob/main/README.md)列出 2026-02-16 的 Qwen3.5 首次发布（397B-A17B）、02-24 的 122B-A10B、35B-A3B、27B，及 03-02 的 9B/4B/2B/0.8B。代表性 [Qwen3.5-9B 官方模型卡](https://huggingface.co/Qwen/Qwen3.5-9B)中 “Benchmark Results”分 Language 与 Vision Language 两张表（网页约 287–382 行）。这些是 Qwen 自报评测；卡片注明多数只给分数，没有逐项展开每个 benchmark 的完整 prompting/harness，不能把通用运行建议当成表格测评配置。

- **Language 原名**：`MMLU-Pro`; `MMLU-Redux`; `C-Eval`; `SuperGPQA`; `GPQA Diamond`; `IFEval`; `IFBench`; `MultiChallenge`; `AA-LCR`; `LongBench v2`; `HMMT Feb 25`; `HMMT Nov 25`; `LiveCodeBench v6`; `OJBench`; `BFCL-V4`; `TAU2-Bench`; `VITA-Bench`; `DeepPlanning`; `MMMLU`; `MMLU-ProX`; `NOVA-63`; `INCLUDE`; `Global PIQA`; `PolyMATH`; `WMT24++`; `MAXIFE`。
- **Vision Language 原名**：`MMMU`; `MMMU-Pro`; `MathVision`; `Mathvista(mini)`; `We-Math`; `DynaMath`; `ZEROBench`; `ZEROBench_sub`; `VlmsAreBlind`; `BabyVision`; `RealWorldQA`; `MMStar`; `MMBench (EN-DEV-v1.1)`; `SimpleVQA`; `HallusionBench`; `OmniDocBench1.5`; `CharXiv(RQ)`; `MMLongBench-Doc`; `CC-OCR`; `AI2D_TEST`; `OCRBench`; `ERQA`; `CountBench`; `RefCOCO(avg)`; `EmbSpatialBench`; `RefSpatialBench`; `LingoQA`; `Hypersim`; `Nuscene`; `VideoMME (w sub.)`; `VideoMME (w/o sub.)`; `VideoMMMU`; `MLVU`; `MVBench`; `LVBench`; `MMVU`; `ScreenSpot Pro`; `OSWorld-Verified`; `AndroidWorld`; `TIR-Bench`; `V*`; `SLAKE`; `PMC-VQA`; `MedXpertQA-MM`。
- **页面明确的设置**：TAU2-Bench 遵循官方设置，但 airline domain 使用 Claude Opus 4.5 system card 的修复；MMLU-ProX 是 29 种语言准确率均值；WMT24++ 是重新标注难度和平衡后的 WMT24 子集，55 种语言用 XCOMET-XXL 求均值；MAXIFE 对英语和多语言原始 prompt（共 23 个设置）求准确率；表中 BabyVision、TIR-Bench、V* 使用斜杠呈现两个条件结果，卡片的表注并未在当前位置完整解释这两个值各自对应何种设置，保留原样。

### Qwen：Qwen-Image-2.1（2026-09-20）

[官方 GitHub 仓库](https://github.com/QwenLM/Qwen-Image-2.1) news 栏确认 2026-09-20 发布；指向 Qwen 官网发布博客及 Hugging Face、ModelScope 权重。该 README 介绍生成/编辑能力与调用示例，未见模型效果 benchmark 成绩表。因此没有把工具链性能数据或示例图冒充模型 benchmark。

## 项目现有 75 条比对

本比对只读了 `content/benchmarks/*.json` 的 `id`、`name`（截至任务开始共 75 个条目）。状态判断表示名称层面的映射建议，不改变正式目录。

### 已收录：可以链接到现有 ID（若引用结果仍要保留发布页条件）

| 现有 ID | 发布页名称/版本 |
| --- | --- |
| `agents-last-exam` | Agents' Last Exam；Qwen 3.8 的 `Pass@1`/`Score` 双指标可映射基准主体，StepFun `ALE-CLI` 是 CLI 切片，需在结果层记录切片。 |
| `gdpval-aa-v2-1` | Qwen 卡 `GDPval-AA v2.1`；StepFun 官网同名。但 StepFun 另一账号 HF 镜像的 `v2` 文字不一致，采用 StepFun 官网发布页为准。 |
| `scicode` | StepFun 发布页未列入八个可见评测小节；其非官方 HF 卡表额外出现 SciCode，不因此算作已核实 StepFun 官网 benchmark 项。Qwen 表未见 SciCode。现有 ID 仍在目录中。 |
| `terminal-bench-4` | StepFun 写 `Terminal-Bench v4`；Qwen 3.8 写 2.1（Terminus），Qwen 3.6/3.5 写 2.0。仅 StepFun 的版本可能与 4.0 对应，须发布方确认 “v4” 与项目版本的确切映射。 |
| `swe-bench-pro`, `swe-bench-verified`, `swe-bench-multilingual` | Qwen3.6 表出现同名版本，且 SWE-bench Pro 有任务修订、私有内部 scaffold 等设置；不应以汇总 ID 替代具体结果配置。 |
| `mcp-atlas`, `healthbench`, `hle`, `gpqa-diamond`, `mmlu-pro`, `ceval`, `longbench-v2`, `livecodebench`, `mmmu`, `mmmu-pro`, `mathvista`, `mmmlu`, `ifeval`, `bfcl`, `video-mme`, `omnidocbench`, `charxiv`, `screenspot-pro`, `osworld` | Qwen3.5/3.6/3.8 卡中的匹配名称或子版本。精确到版本/子集：LiveCodeBench v6、OmniDocBench 1.5、CharXiv RQ、ScreenSpot Pro、OSWorld-Verified、VideoMME 字幕设置等，项目现有名称层不含这些区别。 |

### 疑似同名或同家族：需要核对后决定是否映射现有 ID

| 报告表项 | 候选现有 ID | 核对原因 |
| --- | --- | --- |
| StepFun `Terminal-Bench v4` | `terminal-bench-4` | 报告缩写省略 `.0`，可能是 4.0 的简称；核对 benchmark 版本原标记后再链接。 |
| StepFun `Agents' Last Exam (ALE-CLI)` | `agents-last-exam` | ALE-CLI 可能是基准的命令行特定任务集/封装，不应默认等同通用 ALE。 |
| Qwen `Automation-Bench (Pass@1)` | `automationbench` | 连字符/大小写近似，但现有 `AutomationBench` 是 Zapier 基准；Qwen 页写 600-task public subset，需核对官方引用链接是否真指向同一套数据/评测器。 |
| Qwen `Toolathlon Verified (Pass@1)` | `bfcl`（不应映射）/无 | 项目没有 Toolathlon 条目；它不等于 BFCL。建议新建候选。 |
| Qwen `Terminal Bench 2.1` / `Terminal-Bench 2.0` | `terminal-bench-2` | 2.1 与 2.0 版本不相同；仅 2.0 可对应现有 ID。 |
| Qwen `GPQA` | `gpqa` / `gpqa-diamond` | Qwen3.6 卡只写 GPQA，不能因 GPQA Diamond 是常用子集而自行细化。Qwen3.5/3.8 明写 Diamond 时可映射 `gpqa-diamond`。 |
| Qwen `HLE w/ tools` | `hle` | HLE 的带工具设置是评测条件，不是可以省略的普通 HLE 结果；可挂现有 ID，但结果须显式保留 with-tools。 |
| Qwen `MRCR v2 256K (8-needle)` | `mrcr-v2` | 可关联现有 MRCR v2，同时把 256K 与 8-needle 留在结果设置中。 |
| Qwen `CharXiv(RQ)` | `charxiv` | RQ 子集需与项目条目涵盖范围确认。 |
| Qwen `OSWorld-Verified` | `osworld` | Verified 变体及版本口径未核对；与一般 OSWorld 的 ID 关系需核对。 |
| Qwen `VideoMME (w sub.)` / `(w/o sub.)` | `video-mme` | 有字幕/无字幕为不同测评条件，页面分列，结果必须按条件区别。 |
| Qwen `SkillsBench (Avg5)` / v1.1 | `skillsbench` 候选（项目无现有 ID） | 项目目录没有 SkillsBench；“Avg5”是 Qwen 结果方法，不能误作 benchmark 版号。 |

### 值得新增候选：有独立维护者一手来源

| 建议基准名 | 发布页来源 | benchmark 一手来源与纳入理由 |
| --- | --- | --- |
| DeepSWE | Step 5: `DeepSWE v1.1`；Qwen3.8: `DeepSWE 1.1` | [DataCurve 官方 GitHub](https://github.com/datacurve-ai/deep-swe)、[项目页](https://deepswe.datacurve.ai/)及[论文](https://arxiv.org/abs/2607.07946)。有独立项目维护者和版本化 v1.1 页面；记录时必须分别保留模型方所用 harness、temperature、top_p、context 与成绩来源。 |
| SkillsBench | Qwen3.8 表脚注指 v1.1；Qwen3.6/3.5 也报告该名 | [SkillsBench v1.1 发布页](https://www.skillsbench.ai/blogs/skillsbench-1-1)、[官方仓库](https://github.com/benchflow-ai/skillsbench)。v1.1 有 87 task package、8 个领域；厂商报告 task subset 可能不同，需单独记版本与是否 Skills 条件。 |
| Toolathlon Verified | Qwen3.8: `Toolathlon Verified (Pass@1)` | [HKUST-NLP 官方 GitHub](https://github.com/hkust-nlp/Toolathlon)称这是最终 verified 版本，并提供任务、ground truth 与 evaluator。建议按 Verified 变体命名并注明 Pass@1 和 agent/harness。 |
| IFBench | Qwen3.8 表 | [Allen Institute for AI 官方仓库](https://github.com/allenai/IFBench)、[论文](https://arxiv.org/abs/2507.02833)。维护者源码称 OOD 约束与可执行 verifier 构成基准；需与现有 `ifeval` 分开，项目本身说明 IFBench 不等于经典 IFEval。 |

以下新名字虽出现在厂商自报表，但本轮没有找到可确认的独立原始 benchmark 发布方/定义页，暂不建议作为正式 benchmark 条目，仅留核实：StepCodeBench、ProgramBench、FrontierFinance、DRACO、NL2Repo-Bench/NL2Repo、FrontierSWE、MLS-Bench-Lite、PaperBench（只确认模型卡引用其名字）、AndroidBench、QwenSWEBench、QwenQoderBench、QwenReactBench、QwenSVGBench、CoWorkBench、WorkSpaceBench、JobBench、QwenClawBench、QwenWebBench、Claw-Eval、VITA-Bench、DeepPlanning、MCPMark、WideSearch、PRBench-Legal、PRBench-Finance、IFBench 以外的 IF 类变体、$OneMillion-Bench。对以 Qwen 命名或卡片标注 internal 的测项，不能因分数出现在官方卡上就推定为可复现的公共基准。

## 基准发布方与厂商成绩报告的边界

- 发布方基准源：基准维护者的官方 GitHub、官网或论文用于核对 benchmark 定义、版本、可用数据与参考运行脚本。例如 DeepSWE 维护者、SkillsBench、Toolathlon、AllenAI IFBench 的链接均在新增候选表中。
- 模型厂商报告：StepFun 官网及 Qwen 官方模型卡/发布博客用于核对“厂商报告了哪些名字、对哪一模型报告、声明了哪些设置”。它们是模型厂商一手来源，但不能取代基准项目的定义，也不能证明厂商成绩经独立复跑。
- 第三方榜单转引：StepFun 官网明确称 GDPval-AA v2.1 分数使用 Artificial Analysis 的 2026-09-20 结果；这是发布方明确说明的转引。引用时应同时指向 StepFun 的模型声明与 Artificial Analysis 的评测页。
- Qwen 卡中“official setup”仅说明其声称采用对应基准的官方设置；若同时改了数据子集、修复、harness、agent、裁判或采样，应以脚注的完整设置界定实际结果，不能按 benchmark 名称直接横向比较。

## 来源登记

| 来源 | 发布主体与日期 | 本文用途/可核验证据 |
| --- | --- | --- |
| [Step 5 Preview](https://www.stepfun.com/step-5-preview) | 阶跃星辰，页面标注 2026-09-20 | 发布身份；八个评测小节的原始名称；high effort 共通说明；DeepSWE harness 配置；GDPval-AA 时间与转引说明；页面写出的开放权重预计日期。评测图为图片。 |
| [Qwen3.8 README](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) | QwenLM 官方 GitHub；含各 release 日期 | Qwen3.8/3.6/3.5 的发行日及官方模型卡链接。 |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen 官方 HF 组织；卡片自引 Qwen3.8-Max 博客，2026-08 | 2.4T 权重身份；Benchmark Results 的表头、全部行名、脚注配置及 Max 成绩对象说明。 |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen 官方 HF 组织；2026-08 | Benchmark Results / Text Performance 行名及设置说明。 |
| [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) | Qwen 官方 HF 组织；仓库 README 记 2026-04-16 发布 | Benchmark Results 两表、版本名、脚注中内部基准与测评条件。 |
| [Qwen3.6-27B 官方博客](https://qwen.ai/blog?id=qwen3.6-27b) | Qwen Team，页面日期 2026-04-21 | 型号发布身份及 Performance 图表；无法从本次页面抽取完整可读 benchmark 行，故不用于填补卡片未列出的名称。 |
| [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) | Qwen 官方 HF 组织；Qwen3.8 README 记系列 2026-02-16 至 03-02 发布 | Benchmark Results → Language 和 Vision Language 表、显示出的 benchmark 原名与可见脚注。 |
| [Qwen-Image-2.1 官方仓库](https://github.com/QwenLM/Qwen-Image-2.1) | QwenLM 官方 GitHub，2026-09-20 | release announcement、权重链接；未发现模型评测成绩表。 |
| [DeepSWE 官方仓库](https://github.com/datacurve-ai/deep-swe) / [项目页](https://deepswe.datacurve.ai/) / [论文](https://arxiv.org/abs/2607.07946) | DataCurve 项目维护者；2026 年公开 | DeepSWE benchmark 的原始维护者证据。 |
| [SkillsBench v1.1](https://www.skillsbench.ai/blogs/skillsbench-1-1) / [官方仓库](https://github.com/benchflow-ai/skillsbench) | SkillsBench Team，发布页日期 2026-06-16 | v1.1 版本、任务数及评测范围。 |
| [Toolathlon 官方仓库](https://github.com/hkust-nlp/Toolathlon) | HKUST-NLP；README News 标注 2026-06-30 Verified 发布 | Toolathlon-Verified 的基准维护者证据。 |
| [IFBench 官方仓库](https://github.com/allenai/IFBench) / [论文](https://arxiv.org/abs/2507.02833) | Allen Institute for AI / 论文作者，论文 2025 | IFBench 原始定义与 IFEval 的差别。 |
| [Artificial Analysis GDPval-AA](https://artificialanalysis.ai/evaluations/gdpval-aa) | Artificial Analysis | StepFun 对 AA 结果的转引对象；版本/榜单时间依 StepFun 官网说明。 |

## 尚未核实

1. StepFun 官网评测图是图片表格；页面图像链接可核实对应小节与图表，但本次抓取无法可靠读取所有比较对象行及表头脚注。因此没有声称图表中除本模型外的全部对手、采样次数或每个 benchmark 细节；需要对官网原图人工复核时，以链接的小节图为准。
2. 阶跃星辰 HF 上 `TypeSafeAI/Step-5-Preview-BF16` 是否为经官方授权的发布镜像没有第一方归属证据；其与官网的 GDPval-AA 版本/结果差异也未解释。正文结论以 stepfun.com 为准，HF 页面只被用来识别潜在不一致。
3. Step 5 官网 `Terminal-Bench v4` 是否指 Terminal-Bench 4.0，及 `ALE-CLI` 是否可映射至通用 Agents' Last Exam，需 StepFun 或对应 benchmark 维护者确认。
4. `StepCodeBench`、`ProgramBench`、`FrontierFinance`、`DRACO`、部分 Qwen `...Bench` 项的独立维护者、方法、版本或数据许可未全部取得第一方证据，不能依厂商宣传文本编写正式基准定义。
5. Qwen3.6 官方 27B 博客含图表；本次可读抓取拿不到每张图的清晰文本。可核实发布日与官方模型卡，但不保证本文列尽博客图片上所有基准行。
6. Qwen3.8-2.4T-A95B 模型卡上部分对比成绩对象是 Qwen3.8-Max；本核对未逐项解开 hosted API 与开权重 checkpoint 在全部评测设置上的差异。
7. 对项目现有条目的比对依据只有当前 JSON `id`、`name` 与厂商展示原名，不能代替逐个现有 benchmark 页面/许可证/数据集范围复核；本轮没有做正式目录归并或增删。
