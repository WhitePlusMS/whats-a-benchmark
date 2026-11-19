# Eval Handbook 与本地评测：同名候选清单

核查日期：2026-11-09。源为 [Eval Handbook 公开目录](https://evals.zenheart.site/benchmarks/) HTML 中的 `a.card[data-name]` 和当前本地 `content/benchmarks/*.json`；不是对方全部页面或本站线上状态。对方页面标 507 个目录卡片，本次从 HTML 提取 507；本地取 `status=published` 的 318 个文件。

方法：对显示名称做 Unicode NFKC 规范化和大小写折叠，移除空格及一般标点，保留字母、数字、`+` 和 `*`；仅对名称做相等匹配，不扫描正文、别名或来源 URL。匹配出 107 个本地候选，其中 106 个各对应一张对方卡片，1 个对应多张。**这是机器候选，未逐条核实是否同一数据集、子集、版本、方法或结果，不能称为 107 项已验证重合，也不能据此宣称其他 211 项未被覆盖。** 对方多个卡片可能指向同一事物，卡片数也不是独立测试数。

特别注意：Job Bench 和 JobBench 本轮规范化相同，对方页面自述两者是否同指尚未确认；HumanEval 和 HumanEval+ 保留 `+` 后分开。Intelligence Index 等名称即使相同，版本也可能不同。每条链接供后续逐项审阅，只有 GPQA 等少量实例已在[竞品分析](2026-11-09-eval-handbook-comparison.md)进行核对。

| 本地条目 | 目录候选 |
| --- | --- |
| [AA Cyber Index](../../content/benchmarks/aa-cyber-index.json) | [AA Cyber Index](https://evals.zenheart.site/benchmarks/aa-cyber-index/) |
| [Agents’ Last Exam](../../content/benchmarks/agents-last-exam.json) | [Agents' Last Exam](https://evals.zenheart.site/benchmarks/agents-last-exam/) |
| [Aider Polyglot](../../content/benchmarks/aider-polyglot.json) | [Aider Polyglot](https://evals.zenheart.site/benchmarks/aider/) |
| [AIME 2024](../../content/benchmarks/aime-2024.json) | [AIME 2024](https://evals.zenheart.site/benchmarks/aime24/) |
| [AIME 2025](../../content/benchmarks/aime-2025.json) | [AIME 2025](https://evals.zenheart.site/benchmarks/aime-25/) |
| [AIME 2026](../../content/benchmarks/aime-2026.json) | [AIME 2026](https://evals.zenheart.site/benchmarks/aime-26/) |
| [AlignBench](../../content/benchmarks/alignbench.json) | [AlignBench](https://evals.zenheart.site/benchmarks/alignbench/) |
| [APEX-Agents](../../content/benchmarks/apex-agents.json) | [APEX-Agents](https://evals.zenheart.site/benchmarks/apex-agents/) |
| [Artificial Analysis Intelligence Index](../../content/benchmarks/aa-intelligence-index.json) | [Artificial Analysis Intelligence Index](https://evals.zenheart.site/benchmarks/aa-intelligence-index/) |
| [ArXivMath](../../content/benchmarks/matharena-arxivmath.json) | [ArXivMath](https://evals.zenheart.site/benchmarks/arxivmath/) |
| [AutomationBench](../../content/benchmarks/automationbench.json) | [AutomationBench](https://evals.zenheart.site/benchmarks/automationbench/) |
| [BabyVision](../../content/benchmarks/babyvision.json) | [BabyVision](https://evals.zenheart.site/benchmarks/babyvision/) |
| [BankerToolBench](../../content/benchmarks/bankertoolbench.json) | [BankerToolBench](https://evals.zenheart.site/benchmarks/bankertoolbench/) |
| [BenchCAD](../../content/benchmarks/benchcad.json) | [BenchCAD](https://evals.zenheart.site/benchmarks/benchcad/) |
| [BioMysteryBench](../../content/benchmarks/biomysterybench.json) | [BioMysteryBench](https://evals.zenheart.site/benchmarks/biomysterybench/) |
| [BrokenArXiv](../../content/benchmarks/matharena-brokenarxiv.json) | [BrokenArXiv](https://evals.zenheart.site/benchmarks/brokenarxiv/) |
| [BrowseComp](../../content/benchmarks/browsecomp.json) | [BrowseComp](https://evals.zenheart.site/benchmarks/browsecomp/) |
| [BrowseComp-ZH](../../content/benchmarks/browsecomp-zh.json) | [BrowseComp-ZH](https://evals.zenheart.site/benchmarks/browsecomp-zh/) |
| [C-Eval](../../content/benchmarks/ceval.json) | [C-Eval](https://evals.zenheart.site/benchmarks/ceval/) |
| [Chartography](../../content/benchmarks/chartography.json) | [Chartography](https://evals.zenheart.site/benchmarks/chartography/) |
| [Chatbot Arena](../../content/benchmarks/arena.json) | [Chatbot Arena](https://evals.zenheart.site/benchmarks/arena/) |
| [CMMLU](../../content/benchmarks/cmmlu.json) | [CMMLU](https://evals.zenheart.site/benchmarks/cmmlu/) |
| [Creative Writing v3](../../content/benchmarks/creative-writing-v3.json) | [Creative Writing v3](https://evals.zenheart.site/benchmarks/creative-writing-v3/) |
| [CritPt](../../content/benchmarks/critpt.json) | [CritPt](https://evals.zenheart.site/benchmarks/critpt/) |
| [Cybench](../../content/benchmarks/cybench.json) | [Cybench](https://evals.zenheart.site/benchmarks/cybench/) |
| [CyScenarioBench](../../content/benchmarks/cyscenariobench.json) | [CyScenarioBench](https://evals.zenheart.site/benchmarks/cyscenariobench/) |
| [DeepSearchQA](../../content/benchmarks/deepsearchqa.json) | [DeepSearchQA](https://evals.zenheart.site/benchmarks/deepsearchqa/) |
| [Dense200](../../content/benchmarks/dense200.json) | [Dense200](https://evals.zenheart.site/benchmarks/dense200/) |
| [DRACO](../../content/benchmarks/draco.json) | [DRACO](https://evals.zenheart.site/benchmarks/draco/) |
| [EVA-Bench](../../content/benchmarks/eva-bench.json) | [EVA-Bench](https://evals.zenheart.site/benchmarks/eva-bench/) |
| [ExploitBench](../../content/benchmarks/exploitbench.json) | [ExploitBench](https://evals.zenheart.site/benchmarks/exploitbench/) |
| [ExploitGym](../../content/benchmarks/exploitgym.json) | [ExploitGym](https://evals.zenheart.site/benchmarks/exploitgym/) |
| [FLEURS](../../content/benchmarks/fleurs.json) | [FLEURS](https://evals.zenheart.site/benchmarks/fleurs/) |
| [FrontierMath](../../content/benchmarks/frontiermath.json) | [FrontierMath](https://evals.zenheart.site/benchmarks/frontiermath/) |
| [FrontierScience Research](../../content/benchmarks/frontierscience-research.json) | [FrontierScience (Research)](https://evals.zenheart.site/benchmarks/frontier-science-research/) |
| [Full-Duplex-Bench](../../content/benchmarks/full-duplex-bench.json) | [Full Duplex Bench](https://evals.zenheart.site/benchmarks/full-duplex-bench/) |
| [GAIA](../../content/benchmarks/gaia.json) | [GAIA](https://evals.zenheart.site/benchmarks/gaia/) |
| [GDP.pdf](../../content/benchmarks/gdp-pdf.json) | [GDP.pdf](https://evals.zenheart.site/benchmarks/gdp-pdf/) |
| [GDPval](../../content/benchmarks/gdpval.json) | [GDPval](https://evals.zenheart.site/benchmarks/gdpval/) |
| [GDPval-AA](../../content/benchmarks/gdpval-aa.json) | [GDPval-AA](https://evals.zenheart.site/benchmarks/gdpval-aa/) |
| [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | [GPQA Diamond](https://evals.zenheart.site/benchmarks/gpqa/) |
| [GraphWalks](../../content/benchmarks/graphwalks.json) | [GraphWalks](https://evals.zenheart.site/benchmarks/graphwalks/) |
| [GSM8K](../../content/benchmarks/gsm8k.json) | [GSM8K](https://evals.zenheart.site/benchmarks/gsm8k/) |
| [HealthBench](../../content/benchmarks/healthbench.json) | [HealthBench](https://evals.zenheart.site/benchmarks/healthbench/) |
| [HumanEval](../../content/benchmarks/human-eval.json) | [HumanEval](https://evals.zenheart.site/benchmarks/humaneval/) |
| [Humanity’s Last Exam](../../content/benchmarks/hle.json) | [Humanity's Last Exam](https://evals.zenheart.site/benchmarks/hlehle/) |
| [IFBench](../../content/benchmarks/ifbench.json) | [IFBench](https://evals.zenheart.site/benchmarks/ifbench/) |
| [IFEval](../../content/benchmarks/ifeval.json) | [IFEval](https://evals.zenheart.site/benchmarks/ifeval/) |
| [JobBench](../../content/benchmarks/jobbench.json) | [Job Bench](https://evals.zenheart.site/benchmarks/job-bench/)、[JobBench](https://evals.zenheart.site/benchmarks/jobbench/)（名称归一后有歧义） |
| [LABBench2](../../content/benchmarks/labbench2.json) | [LAB-Bench 2](https://evals.zenheart.site/benchmarks/labbench2/) |
| [LegalBench](../../content/benchmarks/legalbench.json) | [LegalBench](https://evals.zenheart.site/benchmarks/legalbench/) |
| [LifeSciBench](../../content/benchmarks/lifescibench.json) | [LifeSciBench](https://evals.zenheart.site/benchmarks/lifescibench/) |
| [LiveBench](../../content/benchmarks/livebench.json) | [LiveBench](https://evals.zenheart.site/benchmarks/livebench/) |
| [LiveCodeBench](../../content/benchmarks/livecodebench.json) | [LiveCodeBench](https://evals.zenheart.site/benchmarks/lcb/) |
| [LOCA-bench](../../content/benchmarks/loca-bench.json) | [LOCA-bench](https://evals.zenheart.site/benchmarks/loca-bench/) |
| [LongBench](../../content/benchmarks/longbench.json) | [LongBench](https://evals.zenheart.site/benchmarks/longbench/) |
| [LVBench](../../content/benchmarks/lvbench.json) | [LVBench](https://evals.zenheart.site/benchmarks/lvbench/) |
| [MATH-500](../../content/benchmarks/math-500.json) | [MATH-500](https://evals.zenheart.site/benchmarks/math500/) |
| [MATH-Vision](../../content/benchmarks/mathvision.json) | [MATH-Vision](https://evals.zenheart.site/benchmarks/mathvision/) |
| [MathVista](../../content/benchmarks/mathvista.json) | [MathVista](https://evals.zenheart.site/benchmarks/mathvista/) |
| [MBPP](../../content/benchmarks/mbpp.json) | [MBPP](https://evals.zenheart.site/benchmarks/mbpp/) |
| [MCP-Atlas](../../content/benchmarks/mcp-atlas.json) | [MCP-Atlas](https://evals.zenheart.site/benchmarks/mcp-atlas/) |
| [Mind2Web](../../content/benchmarks/mind2web.json) | [Mind2Web](https://evals.zenheart.site/benchmarks/mind2web/) |
| [MMLU](../../content/benchmarks/mmlu.json) | [MMLU](https://evals.zenheart.site/benchmarks/mmlu/) |
| [MMLU-Pro](../../content/benchmarks/mmlu-pro.json) | [MMLU-Pro](https://evals.zenheart.site/benchmarks/mmlu-pro/) |
| [MMLU-ProX](../../content/benchmarks/mmlu-prox.json) | [MMLU-ProX](https://evals.zenheart.site/benchmarks/mmlu-prox/) |
| [MMMLU](../../content/benchmarks/mmmlu.json) | [MMMLU](https://evals.zenheart.site/benchmarks/mmmlu/) |
| [MMMU](../../content/benchmarks/mmmu.json) | [MMMU](https://evals.zenheart.site/benchmarks/mmmu/) |
| [MMMU-Pro](../../content/benchmarks/mmmu-pro.json) | [MMMU-Pro](https://evals.zenheart.site/benchmarks/mmmu-pro/) |
| [MTEB Code](../../content/benchmarks/mteb-code.json) | [MTEB Code](https://evals.zenheart.site/benchmarks/mteb-code/) |
| [Multi-IF](../../content/benchmarks/multi-if.json) | [Multi-IF](https://evals.zenheart.site/benchmarks/multiif/) |
| [NL2Repo-Bench](../../content/benchmarks/nl2repo-bench.json) | [NL2Repo-Bench](https://evals.zenheart.site/benchmarks/nl2repo/) |
| [OCRBench v2](../../content/benchmarks/ocrbench-v2.json) | [OCRBench v2](https://evals.zenheart.site/benchmarks/ocr-bench-v2/) |
| [OfficeQA Pro](../../content/benchmarks/officeqa-pro.json) | [OfficeQA Pro](https://evals.zenheart.site/benchmarks/officeqa-pro/) |
| [OmniDocBench](../../content/benchmarks/omnidocbench.json) | [OmniDocBench](https://evals.zenheart.site/benchmarks/omnidocbench/) |
| [OSWorld](../../content/benchmarks/osworld.json) | [OSWorld](https://evals.zenheart.site/benchmarks/osworld/) |
| [PaperBench](../../content/benchmarks/paperbench.json) | [PaperBench](https://evals.zenheart.site/benchmarks/paperbench/) |
| [PLawBench](../../content/benchmarks/plawbench.json) | [PLawBench](https://evals.zenheart.site/benchmarks/plawbench/) |
| [PostTrainBench](../../content/benchmarks/posttrainbench.json) | [PostTrainBench](https://evals.zenheart.site/benchmarks/posttrain-bench/) |
| [PRBench Finance](../../content/benchmarks/prbench-finance.json) | [PRBench-Finance](https://evals.zenheart.site/benchmarks/prbench-finance/) |
| [PRBench Legal](../../content/benchmarks/prbench-legal.json) | [PRBench-Legal](https://evals.zenheart.site/benchmarks/prbench-legal/) |
| [ProgramBench](../../content/benchmarks/programbench.json) | [ProgramBench](https://evals.zenheart.site/benchmarks/program-bench/) |
| [RULER](../../content/benchmarks/ruler.json) | [RULER](https://evals.zenheart.site/benchmarks/ruler/) |
| [SciCode](../../content/benchmarks/scicode.json) | [SciCode](https://evals.zenheart.site/benchmarks/scicode/) |
| [ScreenSpot-Pro](../../content/benchmarks/screenspot-pro.json) | [ScreenSpot-Pro](https://evals.zenheart.site/benchmarks/screenspot-pro/) |
| [SHADE-Arena](../../content/benchmarks/shade-arena.json) | [SHADE-Arena](https://evals.zenheart.site/benchmarks/shade-arena/) |
| [SimpleQA](../../content/benchmarks/simpleqa.json) | [SimpleQA](https://evals.zenheart.site/benchmarks/simpleqa/) |
| [SimpleQA Verified](../../content/benchmarks/simpleqa-verified.json) | [SimpleQA Verified](https://evals.zenheart.site/benchmarks/simpleqa-verified/) |
| [SkillsBench](../../content/benchmarks/skillsbench.json) | [SkillsBench](https://evals.zenheart.site/benchmarks/skillsbench/) |
| [Speech Agent Arena](../../content/benchmarks/speech-agent-arena.json) | [Speech Agent Arena](https://evals.zenheart.site/benchmarks/speech-agent-arena/) |
| [SWE Refactor Bench](../../content/benchmarks/swe-refactor-bench.json) | [SWE Refactor Bench](https://evals.zenheart.site/benchmarks/swe-refactor-bench/) |
| [SWE-bench Multilingual](../../content/benchmarks/swe-bench-multilingual.json) | [SWE-bench Multilingual](https://evals.zenheart.site/benchmarks/swebench-multilingual/) |
| [SWE-bench Multimodal](../../content/benchmarks/swe-bench-multimodal.json) | [SWE-bench Multimodal](https://evals.zenheart.site/benchmarks/swebench-mm/) |
| [SWE-bench Pro](../../content/benchmarks/swe-bench-pro.json) | [SWE-bench Pro](https://evals.zenheart.site/benchmarks/swebench-pro/) |
| [SWE-bench Verified](../../content/benchmarks/swe-bench-verified.json) | [SWE-bench Verified](https://evals.zenheart.site/benchmarks/swebench/) |
| [SWE-Marathon](../../content/benchmarks/swe-marathon.json) | [SWE-Marathon](https://evals.zenheart.site/benchmarks/swe-marathon/) |
| [Toolathlon-Verified](../../content/benchmarks/toolathlon-verified.json) | [Toolathlon Verified](https://evals.zenheart.site/benchmarks/toolathlon-verified/) |
| [V*Bench](../../content/benchmarks/vstar-bench.json) | [V*Bench](https://evals.zenheart.site/benchmarks/vstar/) |
| [Vals Index](../../content/benchmarks/vals-index.json) | [Vals Index](https://evals.zenheart.site/benchmarks/vals-index/) |
| [Vending-Bench 2](../../content/benchmarks/vending-bench-2.json) | [Vending-Bench 2](https://evals.zenheart.site/benchmarks/vending-bench-2/) |
| [Video-MME](../../content/benchmarks/video-mme.json) | [Video-MME](https://evals.zenheart.site/benchmarks/video-mme/) |
| [Video-MME v2](../../content/benchmarks/video-mme-v2.json) | [Video-MME-v2](https://evals.zenheart.site/benchmarks/video-mme-v2/) |
| [WebVoyager](../../content/benchmarks/webvoyager.json) | [WebVoyager](https://evals.zenheart.site/benchmarks/webvoyager/) |
| [WMT24++](../../content/benchmarks/wmt24pp.json) | [WMT24++](https://evals.zenheart.site/benchmarks/wmt24/) |
| [τ-bench](../../content/benchmarks/tau-bench.json) | [τ-bench](https://evals.zenheart.site/benchmarks/tau-bench/) |
| [τ-Voice](../../content/benchmarks/tau-voice.json) | [τ-Voice](https://evals.zenheart.site/benchmarks/tau-voice/) |
| [τ²-bench](../../content/benchmarks/tau2-bench.json) | [τ²-bench](https://evals.zenheart.site/benchmarks/tau2-bench/) |
