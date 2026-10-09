# 原始数据展示修正核对

核对日期：2026-10-09。此次修正原始数据的格式与内容，不新增benchmark，也不以文本摘要代替原始数据。

| 检查口径 | 结果 |
| --- | --- |
| 已发布条目 / 案例记录 | 151 / 149 |
| 有案例的详情页（含指数成员） / 原有缺口 | 139 / 12 |
| 修正案例 | 96 |
| 原生JSON字段投影 / 原文、表格、配置片段 | 32 / 64 |
| 原有Source样例 | 53条保持不变 |

继续复用原来的raw字段、样例文件生成、按需加载和SampleViewer。任务说明的editorial标记不限制原始数据类型；JSON保留实际字段和值，其他格式使用来源原文。删节说明位于explanation，不发明 *_excerpt 等原始字段。

Terminal-Bench 4的原始json格式代码块保留了作者自己的注释与占位符；它是源文件中的示例文本，没有被执行或伪装成真实输出。HTML/PDF表格在必要时按原表格标签呈现，不宣称原作者提供了JSON数据行。

| 条目 | 原始数据格式 | 原始来源 |
| --- | --- | --- |
| AA-AnalystAgent (`aa-analyst-agent`) | 源文本、表格或配置片段 | [来源](https://artificialanalysis.ai/evaluations/aa-analyst-agent) |
| Aider Polyglot (`aider-polyglot`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/Aider-AI/polyglot-benchmark/7e0611e77b54e2dea774cdc0aa00cf9f7ed6144f/python/exercises/practice/wordy/.docs/instructions.md) |
| AIME 2024 (`aime-2024`) | 原生JSON字段投影 | [来源](https://huggingface.co/datasets/MathArena/aime_2024_I/resolve/ea5b061c3e8039dc9858defaafc407d04b995e9f/data/train-00000-of-00001.parquet) |
| AIME 2025 (`aime-2025`) | 原生JSON字段投影 | [来源](https://huggingface.co/datasets/MathArena/aime_2025/resolve/c94da77eb22bbd6439e62a323bec18493a421302/data/train-00000-of-00001.parquet) |
| AlignBench (`alignbench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/THUDM/AlignBench/5b79d4a84e566db26e755c719935c62a0e1b0527/data/data_v1.1_release.jsonl) |
| APEX-Agents (`apex-agents`) | 源文本、表格或配置片段 | [来源](https://www.mercor.com/apex/apex-agents-leaderboard/management-consultant-agent/) |
| APEX-Agents 1.1 (`apex-agents-1-1`) | 源文本、表格或配置片段 | [来源](https://www.mercor.com/apex/apex-agents-leaderboard/corporate-lawyer-agent/) |
| ARC-AGI-3 (`arc-agi-3`) | 源文本、表格或配置片段 | [来源](https://arcprize.org/blog/arc-agi-3-preview-30-day-learnings) |
| Chatbot Arena (`arena`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=lmarena-ai%2Farena-human-preference-55k&config=default&split=train&offset=2&length=1) |
| Arena Creative Writing (`arena-creative-writing`) | 源文本、表格或配置片段 | [来源](https://arena.ai/blog/arena-category) |
| Arena-Hard v2.0 (`arena-hard-v2`) | 原生JSON字段投影 | [来源](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto/resolve/15f3746e21432264ce9b453999bde4f3c946d2e6/data/arena-hard-v2.0/question.jsonl) |
| Arena Vision (`arena-vision`) | 源文本、表格或配置片段 | [来源](https://arena.ai/blog/re-introducing-vision-arena-categories) |
| Arena WebDev (`arena-webdev`) | 源文本、表格或配置片段 | [来源](https://arena.ai/blog/webdev-arena) |
| AutomationBench-AA (`automationbench-aa`) | 源文本、表格或配置片段 | [来源](https://artificialanalysis.ai/evaluations/automationbench-aa) |
| BabyVision (`babyvision`) | 源文本、表格或配置片段 | [来源](https://www.unipat.ai/blog/BabyVision) |
| BioMysteryBench (`biomysterybench`) | 源文本、表格或配置片段 | [来源](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench) |
| BrowseComp (`browsecomp`) | 源文本、表格或配置片段 | [来源](https://openai.com/index/browsecomp/) |
| BrowseComp-ZH (`browsecomp-zh`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/pdf/2504.19314v2#page=2) |
| BullshitBench v2 (`bullshitbench-v2`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/petergpt/bullshit-benchmark/main/questions.v2.json) |
| Chartography (`chartography`) | 源文本、表格或配置片段 | [来源](https://surgehq.ai/blog/chartography) |
| CharXiv (`charxiv`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=princeton-nlp%2FCharXiv&config=default&split=validation&offset=1&length=1) |
| Chess Puzzles (`chess-puzzles`) | 原生JSON字段投影 | [来源](https://epoch-benchmarks-staging-public.s3.us-east-2.amazonaws.com/inspect_ai_logs/6DcmBdRZz57U5cusZNBeGW.eval) |
| Creative Writing v3 (`creative-writing-v3`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/EQ-bench/creative-writing-bench/main/data/creative_writing_prompts_v3.json) |
| CyberBench Patch v1.1 (`cyberbench-patch-v1-1`) | 源文本、表格或配置片段 | [来源](https://www.vals.ai/benchmarks/cyber) |
| Design Arena (`design-arena`) | 源文本、表格或配置片段 | [来源](https://www.designarena.ai/tournaments/33d366af-ea0b-4220-8cb1-c275096a452e) |
| Earthborne Rangers (EBR-bench) (`ebr-bench`) | 源文本、表格或配置片段 | [来源](https://epoch.ai/publications/ebr-bench-update) |
| EQ-Bench 4 (`eq-bench-4`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/EQ-bench/EQ-bench-site/108382e3f5017dce6f90c643e6bb4842825f62df/eqbench4/eqbench4_docs/transcripts/claude-fable-5/29.json) |
| Excel Modeling Benchmark (EMB) (`excel-emb`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/vals-ai/emb-public-dataset/main/problems/06%20Dataroom%20Summaries/M003-scratch/instructions.md) |
| FACTS Parametric (`facts-parametric`) | 源文本、表格或配置片段 | [来源](https://storage.googleapis.com/deepmind-media/FACTS/FACTS_benchmark_suite_paper.pdf) |
| Finance Agent (`finance-agent`) | 源文本、表格或配置片段 | [来源](https://www.vals.ai/benchmarks/fabv2) |
| FinanceBenchmark (`finbenchmark`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/gaschwanden/finbenchmark/main/TASKS.md) |
| FrontierCode 1.1 Main (`frontiercode-1-1-main`) | 源文本、表格或配置片段 | [来源](https://cognition.com/frontiercode) |
| FrontierMath (`frontiermath`) | 源文本、表格或配置片段 | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tier 4 (`frontiermath-v2-tier-4`) | 源文本、表格或配置片段 | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tiers 1–3 (`frontiermath-v2-tiers-1-3`) | 源文本、表格或配置片段 | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierSWE v2 (`frontierswe-v2`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/Proximal-Labs/frontier-swe-v2/main/tasks/sglang-inference-system-optimization/instruction.md) |
| GAIA (`gaia`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/html/2311.12983) |
| GDP.pdf (`gdp-pdf`) | 源文本、表格或配置片段 | [来源](https://surgehq.ai/benchmarks/gdp-pdf) |
| GDPval (`gdpval`) | 源文本、表格或配置片段 | [来源](https://openai.com/index/gdpval/) |
| GDPval-AA (`gdpval-aa`) | 源文本、表格或配置片段 | [来源](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| GDPval-AA v2.1 (`gdpval-aa-v2-1`) | 源文本、表格或配置片段 | [来源](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| Harvey Legal Agent Benchmark (LAB) (`harvey-lab`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/harveyai/harvey-labs/v1.0/tasks/corporate-ma/review-data-room-red-flag-review/task.json) |
| Humanity’s Last Exam (`hle`) | 源文本、表格或配置片段 | [来源](https://scale.com/blog/humanitys-last-exam-results) |
| τ^τ-bench (Hyper-τ) (`hyper-tau-bench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/sierra-research/hyper-tau-bench/main/data/tau2/hyper/tasks/002_airline_plus_construction_core_evidence_seeded_performance_hard.json) |
| Legal Research Bench (Vals AI) (`legal-research-vals`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/vals-ai/legal-research-bench/main/data/public.json) |
| Long-Horizon Terminal-Bench (LHTB) (`lhtb`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/zli12321/LHTB/main/tasks/langchain-version-migration/instruction.md) |
| LifeSciBench (`lifescibench`) | 源文本、表格或配置片段 | [来源](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf) |
| LiveCodeBench (`livecodebench`) | 原生JSON字段投影 | [来源](https://huggingface.co/datasets/livecodebench/code_generation_lite/resolve/0fe84c3912ea0c4d4a78037083943e8f0c4dd505/test.jsonl) |
| LiveCodeBench Pro (`livecodebench-pro`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/pdf/2506.11928v1) |
| LongBench (`longbench`) | 原生JSON字段投影 | [来源](https://huggingface.co/datasets/THUDM/LongBench/resolve/5e628be450b7e67fb7ae6e201bd6d8f7056f7672/data.zip) |
| LongBench v2 (`longbench-v2`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=zai-org%2FLongBench-v2&config=default&split=train&offset=0&length=1) |
| Longform Writing (`longform-writing`) | 源文本、表格或配置片段 | [来源](https://eqbench.com/results/creative-writing-longform/openrouter__pony-alpha_longform_report.html) |
| MATH-500 (`math-500`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=HuggingFaceH4%2FMATH-500&config=default&split=test&offset=0&length=1) |
| MathVista (`mathvista`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=AI4Math%2FMathVista&config=default&split=testmini&offset=0&length=1) |
| MedScribe (`medscribe`) | 源文本、表格或配置片段 | [来源](https://www.vals.ai/benchmarks/medscribe) |
| Mind2Web (`mind2web`) | 源文本、表格或配置片段 | [来源](https://osu-nlp-group.github.io/Mind2Web/) |
| MirrorCode (`mirrorcode`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/epoch-research/MirrorCode/main/mc/cal/cal_util_linux.jsonl) |
| MLCR-AA (`mlcr-aa`) | 源文本、表格或配置片段 | [来源](https://artificialanalysis.ai/evaluations/mlcr-aa) |
| MysteryMechanism (`mysterymechanism`) | 源文本、表格或配置片段 | [来源](https://www.vals.ai/benchmarks/mysterymechanism) |
| NL2Repo-Bench (`nl2repo-bench`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/multimodal-art-projection/NL2RepoBench/main/test_files/fastapi-users/start.md) |
| OfficeQA Pro (`officeqa-pro`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/html/2603.08655v1#S2.F3) |
| OmniDocBench (`omnidocbench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/opendatalab/OmniDocBench/main/demo_data/omnidocbench_demo/OmniDocBench_demo.json) |
| OpenVibeEval (`openvibeeval`) | 源文本、表格或配置片段 | [来源](https://openvibeeval.com/prompt/digital-garden/) |
| OSWorld (`osworld`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/xlang-ai/OSWorld/main/evaluation_examples/examples/chrome/030eeff7-b492-4218-b312-701ec99ee0cc.json) |
| OSWorld 2.0 (`osworld-2`) | 源文本、表格或配置片段 | [来源](https://osworld-v2.xlang.ai/) |
| PaperBench (`paperbench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/openai/frontier-evals/main/project/paperbench/data/papers/adaptive-pruning/rubric.json) |
| PRBench (`prbench`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FPRBench&config=default&split=finance&offset=0&length=1) |
| Roboflow Vision Evals (`roboflow-vision-evals`) | 源文本、表格或配置片段 | [来源](https://playground.roboflow.com/evals/visual-reasoning) |
| RULER (`ruler`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/html/2404.06654v3) |
| RWS M-GATE (`rws-mgate`) | 源文本、表格或配置片段 | [来源](https://www.rws.com/about/news/2026/TrainAI-launches-m-gate/) |
| ScreenSpot-Pro (`screenspot-pro`) | 源文本、表格或配置片段 | [来源](https://arxiv.org/html/2504.07981v1) |
| Lech Mazur Short-Story (`short-story`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/lechmazur/writing/main/prompts_wc/prompt_wc_0.txt) |
| SimpleBench (`simplebench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/simple-bench/SimpleBench/main/simple_bench_public.json) |
| SkillsBench (`skillsbench`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/benchflow-ai/skillsbench/main/tasks/sec-financial-report/task.md) |
| SpreadsheetBench 2 (`spreadsheetbench-v2`) | 源文本、表格或配置片段 | [来源](https://spreadsheetbench.github.io/) |
| svgbench.ai (`svgbench`) | 原生JSON字段投影 | [来源](https://svgbench.ai/api/prompt/prompt_daf3f932ceaa) |
| SWE-bench (`swe-bench`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench&config=default&split=test&offset=0&length=1) |
| SWE-bench Multilingual (`swe-bench-multilingual`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Multilingual&config=default&split=test&offset=0&length=1) |
| SWE-bench Pro (`swe-bench-pro`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FSWE-bench_Pro&config=default&split=test&offset=0&length=1) |
| SWE-bench Verified (`swe-bench-verified`) | 原生JSON字段投影 | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Verified&config=default&split=test&offset=0&length=1) |
| τ²-bench (`tau2-bench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/sierra-research/tau2-bench/37199f36924c8896f5e048360691f8476cd89ba1/data/tau2/domains/telecom/tasks.json) |
| τ³-Banking (`tau3-banking`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/sierra-research/tau2-bench/main/data/tau2/domains/banking_knowledge/tasks/task_001.json) |
| Tax Agent Bench (`tax-agent-bench`) | 原生JSON字段投影 | [来源](https://raw.githubusercontent.com/vals-ai/tax-agent-bench/main/data/public.json) |
| Terminal-Bench 2.0 (`terminal-bench-2`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/harbor-framework/terminal-bench-2/main/dna-assembly/task.toml) |
| Terminal-Bench 2.1 (`terminal-bench-2-1`) | 源文本、表格或配置片段 | [来源](https://hub.harborframework.com/tasks/terminal-bench/dna-assembly/latest) |
| Terminal-Bench 3.0 (`terminal-bench-3`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/harbor-framework/terminal-bench/v3.0.0/tasks/foodstuff-beta-activity/task.toml) |
| Terminal-Bench 4.0 (`terminal-bench-4`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/harbor-framework/terminal-bench/v4.0.0/tasks/layout-config-recreation2/task.toml) |
| Terminal-Bench-Science 0.1 (`terminal-bench-science-0-1`) | 源文本、表格或配置片段 | [来源](https://hub.harborframework.com/tasks/terminal-bench-science/symbolic-regression/2) |
| ToneBench (`tonebench`) | 源文本、表格或配置片段 | [来源](https://benchmark.towardsai.com/methodology.html) |
| Toolathlon-Verified (`toolathlon-verified`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/hkust-nlp/Toolathlon/main/tasks/finalpool/find-alita-paper/docs/task.md) |
| TubeLab Scriptwriting Benchmark (`tubelab`) | 源文本、表格或配置片段 | [来源](https://tubelab.net/benchmark/scriptwriting) |
| Vending-Bench 2 (`vending-bench-2`) | 源文本、表格或配置片段 | [来源](https://andonlabs.com/blog/opus-4-6-vending-bench) |
| Vibe Code Bench 1–100 (`vibe-code-bench-1-100`) | 源文本、表格或配置片段 | [来源](https://www.vals-ai.com/benchmarks/vcb-1-100) |
| Vibe Code Bench v1.1 (`vibe-code-bench-v1-1`) | 源文本、表格或配置片段 | [来源](https://gist.githubusercontent.com/lgnashold/e9bba36be5e468d8f8a2f330ae8d6aea/raw/0bd7400df1f9d444c54350f13af2a02aac72bd67/app_instructions.txt) |
| WANDR (`wandr`) | 源文本、表格或配置片段 | [来源](https://raw.githubusercontent.com/perplexityai/wandr/ccb0baeb96f1c77a48e47f92122c57479ee99700/datasets/wandr/accounting-ai-claims/instruction.md) |
| WeirdML v2 (`weirdml-v2`) | 源文本、表格或配置片段 | [来源](https://htihle.github.io/prompts/task_prompt_shapes_easy.html) |

类型检查、内容校验及47项自动测试通过；生成数据逐项对照与代表性浏览器验证结果见UPDATE_LOG。原有12项缺口沿用[覆盖核对记录](2026-10-08-all-cases-coverage.md)，不以伪造字段或相邻版本题目补位。
