# 非具身评测站内样例覆盖清单

核对日期：2026-11-06。依据项目 `content/benchmarks/*.json` 中已发布且没有 `embodied` 字段的条目；此清单是站内内容快照，并非对各官方数据源逐一重新访问的结论。

共 267 项，其中 220 项有至少一条站内样例，47 项没有站内样例。非具身目录包含模型、智能体和其他评测，不能将其全部理解为纯文本 LLM 评测。

样例数只统计 `sampleSet.samples`，不统计详情、外部资源链接或完整数据集。访问状态和资料入口取自各条目现有的 `sampleAccess`；`official`、`restricted`、`gated`、`private`、`unverified`、`license-pending` 等状态不代表数据一定可公开复制，也不代表本站已经独立验证完整数据。数据可能更新，请以具体来源和当前项目内容为准。

## 已复核的公开数据文件

2026-11-06 实际读取下列固定版本文件，只统计行数、字节数、字段名和哈希，没有在站内复制题目、对话或评分标准。作者的样例披露请求与数据是否可下载是两个不同问题。

| 评测 | 本次核验 | 固定版本来源 | 在线样例说明 |
| --- | --- | --- | --- |
| GPQA Main | 作者压缩包中 `gpqa_main.csv` 有 448 行、78 列；压缩包 2,348,038 字节，SHA-256 `461ae7329f15a3e35f8184d2dac24b990f34fdf12f366ca4062d8e6638cd08dc`。 | [公开数据包](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/dataset.zip)；[作者下载说明](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/README.md#dataset-download) | [作者数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)请求不要在线公开样例；Hugging Face 入口有访问条件，GitHub 公开包使用作者公开密码。 |
| GPQA Diamond | 同一作者压缩包中 `gpqa_diamond.csv` 有 198 行、78 列。 | [公开数据包](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/dataset.zip) | 同 GPQA Main。 |
| HealthBench | 官方 JSONL 有 5,000 行、60,258,154 字节，SHA-256 `e99dd3c6372c10d6fcc5e385c5fae69d0dd40392dae56836ef9493ae324ecd2f`；首行包含 `prompt`、`rubrics` 等字段。 | [官方固定版本 JSONL](https://huggingface.co/datasets/openai/healthbench/blob/40ee1968852fc57f625934251ac22be47077a8fb/2025-05-07-06-14-12_oss_eval.jsonl) | [OpenAI 发布页](https://openai.com/index/healthbench/)请求不要在线以文字或图片公开样例。 |
| HealthBench Hard | 官方 JSONL 有 1,000 行、12,581,564 字节，SHA-256 `b0320430e5cd974e746585594c1dd10b5a3fc2aff9c72b26106c2c4a069d74e9`。 | [官方固定版本 JSONL](https://huggingface.co/datasets/openai/healthbench/blob/40ee1968852fc57f625934251ac22be47077a8fb/hard_2025-05-08-21-00-10.jsonl) | 属于 HealthBench 数据，按同一披露请求处理。 |
| HealthBench Professional | 官方公开 JSONL 有 525 行、2,755,136 字节，SHA-256 `d44b08e6e952e04c945e2c406f02533d9e7a989a84e35820ee7efdff20c9e4e2`；首行包含 `conversation`、`rubric_items` 等字段。 | [官方固定版本 JSONL](https://huggingface.co/datasets/openai/healthbench-professional/blob/349962fd46dd02343a0d8a606491baf59154ea1a/healthbench_professional_eval.jsonl) | [官方数据卡](https://huggingface.co/datasets/openai/healthbench-professional)请求不要在线公开样例；这不代表私有留出部分公开。 |

## 站内样例清单

| 评测 | 类别 | 站内样例数 | 已记录访问状态 | 资料入口 |
| --- | --- | ---: | --- | --- |
| AA-AnalystAgent (`aa-analyst-agent`) | work | 2 | `local` | [资料](https://artificialanalysis.ai/evaluations/aa-analyst-agent) |
| AA-Briefcase v1.1 (`aa-briefcase`) | work | 4 | `local` | [资料](https://huggingface.co/datasets/ArtificialAnalysis/AA-Briefcase-Lite/resolve/4dec557b47d43867a1648c0974db1d8208c8b677/tasks/w1_t1.md) |
| AA Cyber Index (`aa-cyber-index`) | general | 0 | `official` | [资料](https://artificialanalysis.ai/articles/artificial-analysis-cyber-index/) |
| Artificial Analysis Intelligence Index (`aa-intelligence-index`) | general | 0 | `official` | [资料](https://artificialanalysis.ai/methodology/intelligence-benchmarking) |
| AA-LCR v1.1 (`aa-lcr`) | context | 5 | `local` | [资料](https://huggingface.co/datasets/ArtificialAnalysis/AA-LCR/resolve/9a77ef56b717057ade24ceab4d273712a0b4f19e/AA-LCR_Dataset.csv) |
| Artificial Analysis Multilingual Index (`aa-multilingual-index`) | general | 5 | `local` | [资料](https://huggingface.co/datasets/CohereLabs/Global-MMLU-Lite/resolve/36c2fd756f19ccf13a9a96c8e53ccecc02192b8b/zh/test-00000-of-00001.parquet) |
| AA-Omniscience (`aa-omniscience`) | knowledge | 6 | `local` | [资料](https://huggingface.co/datasets/ArtificialAnalysis/AA-Omniscience-Public-v1.1) |
| AgentHarm (`agentharm`) | alignment | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ai-safety-institute%2FAgentHarm&config=harmless_benign&split=test_public&offset=0&length=1) |
| Agents’ Last Exam (`agents-last-exam`) | work | 4 | `local` | [资料](https://agents-last-exam.org/demo) |
| Aider Polyglot (`aider-polyglot`) | coding | 5 | `local` | [资料](https://raw.githubusercontent.com/Aider-AI/polyglot-benchmark/7e0611e77b54e2dea774cdc0aa00cf9f7ed6144f/python/exercises/practice/wordy/.docs/instructions.md) |
| AIME 2024 (`aime-2024`) | reasoning | 4 | `local` | [资料](https://huggingface.co/datasets/MathArena/aime_2024_I/resolve/ea5b061c3e8039dc9858defaafc407d04b995e9f/data/train-00000-of-00001.parquet) |
| AIME 2025 (`aime-2025`) | reasoning | 3 | `local` | [资料](https://huggingface.co/datasets/MathArena/aime_2025/resolve/c94da77eb22bbd6439e62a323bec18493a421302/data/train-00000-of-00001.parquet) |
| AIME 2026 (`aime-2026`) | reasoning | 1 | `local` | [资料](https://live.poshenloh.com/past-contests/aime/2026I) |
| AlignBench (`alignbench`) | alignment | 7 | `local` | [资料](https://raw.githubusercontent.com/THUDM/AlignBench/5b79d4a84e566db26e755c719935c62a0e1b0527/data/data_v1.1_release.jsonl) |
| Anthropic ECI（AECI） (`anthropic-eci`) | general | 0 | `unverified` | [资料](https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf) |
| APEX-Agents (`apex-agents`) | work | 1 | `local` | [资料](https://www.mercor.com/apex/apex-agents-leaderboard/management-consultant-agent/) |
| APEX-Agents 1.1 (`apex-agents-1-1`) | work | 1 | `local` | [资料](https://www.mercor.com/apex/apex-agents-leaderboard/corporate-lawyer-agent/) |
| API-Bank (`api-bank`) | agents | 1 | `local` | [资料](https://github.com/AlibabaResearch/DAMO-ConvAI/blob/188835d4f9948563a6b9c8ac50cd0f3ae4021ed6/api-bank/lv1-lv2-samples/level-1-given-desc/AddAgenda-level-1-1.jsonl) |
| ARC-AGI-2 (`arc-agi-2`) | reasoning | 4 | `local` | [资料](https://github.com/arcprize/ARC-AGI-2/blob/main/data/training/6e19193c.json) |
| ARC-AGI-3 (`arc-agi-3`) | reasoning | 1 | `local` | [资料](https://arcprize.org/blog/arc-agi-3-preview-30-day-learnings) |
| Chatbot Arena (`arena`) | alignment | 4 | `local` | [资料](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k/viewer/default/train?row=2) |
| Arena Creative Writing (`arena-creative-writing`) | writing | 5 | `local` | [资料](https://arena.ai/blog/arena-category) |
| Arena-Hard v2.0 (`arena-hard-v2`) | alignment | 5 | `local` | [资料](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto/resolve/15f3746e21432264ce9b453999bde4f3c946d2e6/data/arena-hard-v2.0/question.jsonl) |
| Arena Vision (`arena-vision`) | multimodal | 9 | `local` | [资料](https://arena.ai/blog/re-introducing-vision-arena-categories) |
| Arena WebDev (`arena-webdev`) | writing | 1 | `local` | [资料](https://arena.ai/blog/webdev-arena) |
| Artificial Analysis Coding Agent Index (`artificial-analysis-coding-agent-index`) | general | 0 | `official` | [资料](https://artificialanalysis.ai/methodology/coding-agents-benchmarking/) |
| Artificial Analysis Speech-to-Speech Index (`artificial-analysis-speech-to-speech-index`) | general | 0 | `official` | [资料](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking) |
| AutomationBench (`automationbench`) | work | 5 | `local` | [资料](https://github.com/zapier/AutomationBench/blob/main/automationbench/domains/simple/tasks.py) |
| AutomationBench-AA (`automationbench-aa`) | work | 3 | `local` | [资料](https://artificialanalysis.ai/evaluations/automationbench-aa) |
| b³ Agent Security (`b3-agent-security`) | agents | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=Lakera%2Fb3-agent-security-benchmark-weak&config=default&split=test&offset=0&length=1) |
| BabyVision (`babyvision`) | multimodal | 7 | `local` | [资料](https://www.unipat.ai/blog/BabyVision) |
| BankerToolBench (`bankertoolbench`) | work | 1 | `local` | [资料](https://huggingface.co/datasets/handshake-ai-research/bankertoolbench/resolve/6407cdc22a218d59a1e41d8598679d02d821d6ff/tasks.jsonl) |
| BenchCAD (`benchcad`) | multimodal | 4 | `local` | [资料](https://github.com/BenchCAD/BenchCAD-main/blob/main/QA/test_data/records.jsonl) |
| BFCL (`bfcl`) | agents | 5 | `local` | [资料](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/BFCL_v4_simple_python.json) |
| Big Bench Audio (BBA) (`big-bench-audio`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ArtificialAnalysis%2Fbig_bench_audio&config=default&split=train&offset=0&length=1) |
| BioMysteryBench (`biomysterybench`) | work | 6 | `local` | [资料](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench) |
| BRIGHT (`bright`) | knowledge | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=xlangai%2FBRIGHT&config=examples&split=biology&offset=0&length=1) |
| BrowseComp (`browsecomp`) | agents | 1 | `local` | [资料](https://openai.com/index/browsecomp/) |
| BrowseComp-ZH (`browsecomp-zh`) | agents | 2 | `local` | [资料](https://arxiv.org/pdf/2504.19314v2#page=2) |
| BullshitBench v2 (`bullshitbench-v2`) | knowledge | 4 | `local` | [资料](https://raw.githubusercontent.com/petergpt/bullshit-benchmark/main/questions.v2.json) |
| C-Eval (`ceval`) | knowledge | 4 | `local` | [资料](https://huggingface.co/datasets/ceval/ceval-exam/resolve/617524a00b307ff6f9933702f724131fe12ca7ce/computer_network/dev-00000-of-00001.parquet) |
| Chartography (`chartography`) | multimodal | 1 | `local` | [资料](https://surgehq.ai/blog/chartography) |
| ChartQAPro (`chartqapro`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ahmed-masry%2FChartQAPro&config=default&split=test&offset=0&length=1) |
| CharXiv (`charxiv`) | multimodal | 5 | `local` | [资料](https://huggingface.co/datasets/princeton-nlp/CharXiv/viewer/default/validation?row=1) |
| Chess Puzzles (`chess-puzzles`) | reasoning | 4 | `local` | [资料](https://epoch-benchmarks-staging-public.s3.us-east-2.amazonaws.com/inspect_ai_logs/6DcmBdRZz57U5cusZNBeGW.eval) |
| CMMLU (`cmmlu`) | knowledge | 4 | `local` | [资料](https://raw.githubusercontent.com/haonan-li/CMMLU/master/data/dev/agronomy.csv) |
| Code Migration (`code-migration`) | coding | 0 | `private` | [资料](https://www.vals.ai/benchmarks/code-migration) |
| Creative Writing v3 (`creative-writing-v3`) | writing | 5 | `local` | [资料](https://github.com/EQ-bench/creative-writing-bench/blob/main/data/creative_writing_prompts_v3.json) |
| CritPt (`critpt`) | reasoning | 5 | `local` | [资料](https://huggingface.co/datasets/CritPt-Benchmark/CritPt/resolve/e0892bc952bd95cdd28f4c73c5f04d963243ed1a/data/train-00000-of-00001.parquet) |
| CursorBench 4.0 (`cursorbench-4`) | coding | 0 | `private` | [资料](https://cursor.com/cursorbench) |
| CWE-bench v1 (`cwe-bench-v1`) | coding | 1 | `local` | [资料](https://cwe-bench.com/) |
| Cybench (`cybench`) | agents | 1 | `local` | [资料](https://raw.githubusercontent.com/andyzorigin/cybench/ca483c6443f17a20ba7d6bac3d274859a1721e51/benchmark/hackthebox/cyber-apocalypse-2024/crypto/%5BVery%20Easy%5D%20Dynastic/metadata/metadata.json) |
| CyberBench Patch v1.1 (`cyberbench-patch-v1-1`) | coding | 2 | `local` | [资料](https://www.vals.ai/benchmarks/cyber) |
| CyberGym-E2E (`cybergym-e2e`) | coding | 1 | `local` | [资料](https://www.cybergym.io/cybergym-e2e/) |
| CyScenarioBench (`cyscenariobench`) | alignment | 0 | `private` | [资料](https://www.irregular.com/research/cyscenariobench) |
| DeepSWE v1.1 (`deep-swe-v1-1`) | coding | 4 | `local` | [资料](https://raw.githubusercontent.com/datacurve-ai/deep-swe/main/tasks/ts-pattern-match-each/instruction.md) |
| DeepSearchQA (`deepsearchqa`) | agents | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=google%2Fdeepsearchqa&config=deepsearchqa&split=eval&offset=0&length=1) |
| Dense200 (`dense200`) | multimodal | 0 | `license-pending` | [资料](https://huggingface.co/datasets/Mountchicken/Rex-Omni-EvalData/resolve/daff862ba483f56ccaba9af5a12e118a9372ede8/_annotations/box_eval/Dense200.jsonl) |
| Design Arena (`design-arena`) | writing | 0 | `unverified` | [资料](https://www.designarena.ai/tournaments/33d366af-ea0b-4220-8cb1-c275096a452e) |
| DRACO (`draco`) | agents | 1 | `local` | [资料](https://huggingface.co/datasets/perplexity-ai/draco/resolve/ce076749809027649ebd331bcb70f42bf720d387/test.jsonl) |
| Earthborne Rangers (EBR-bench) (`ebr-bench`) | agents | 1 | `local` | [资料](https://epoch.ai/publications/ebr-bench-update) |
| EmbodiedX (`embodiedx`) | agents | 3 | `local` | [资料](https://efficient-embodied-ai.github.io/challenge/) |
| EQ-Bench 4 (`eq-bench-4`) | alignment | 5 | `local` | [资料](https://github.com/EQ-bench/EQ-bench-site/blob/108382e3f5017dce6f90c643e6bb4842825f62df/eqbench4/eqbench4_docs/transcripts/claude-fable-5/29.json) |
| EVA-Bench (`eva-bench`) | agents | 1 | `local` | [资料](https://github.com/ServiceNow/eva/blob/2918ca6ef5cd1726143e0c6da785058a4420303a/data/airline_dataset.json) |
| Excel Modeling Benchmark (EMB) (`excel-emb`) | work | 1 | `local` | [资料](https://raw.githubusercontent.com/vals-ai/emb-public-dataset/main/problems/06%20Dataroom%20Summaries/M003-scratch/instructions.md) |
| ExploitBench (`exploitbench`) | alignment | 1 | `local` | [资料](https://raw.githubusercontent.com/exploitbench/exploitbench/9d0173bcf8835b74a45f60450ae7f184e29e7607/benchmarks/v8-small.yaml) |
| ExploitGym (`exploitgym`) | alignment | 1 | `local` | [资料](https://raw.githubusercontent.com/sunblaze-ucb/exploitgym/a8029e47135a29f1c1a6e79109bf86fba379b3f3/data/task_ids/sample.txt) |
| FACTS Parametric (`facts-parametric`) | knowledge | 4 | `local` | [资料](https://storage.googleapis.com/deepmind-media/FACTS/FACTS_benchmark_suite_paper.pdf) |
| fev-bench (`fev-bench`) | reasoning | 1 | `local` | [资料](https://raw.githubusercontent.com/autogluon/fev/refs/tags/v0.7.0/benchmarks/fev_bench/tasks.yaml) |
| Finance Agent (`finance-agent`) | work | 7 | `local` | [资料](https://www.vals.ai/benchmarks/fabv2) |
| FinanceBenchmark (`finbenchmark`) | work | 5 | `local` | [资料](https://raw.githubusercontent.com/gaschwanden/finbenchmark/main/TASKS.md) |
| Finch (FinWorkBench) (`finch-finworkbench`) | work | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=FinWorkBench%2FFinch&config=Finch_Dataset_All&split=test&offset=0&length=1) |
| FLEURS (`fleurs`) | multimodal | 1 | `local` | [资料](https://huggingface.co/datasets/google/fleurs/resolve/70bb2e84b976b7e960aa89f1c648e09c59f894dd/data/en_us/test.tsv) |
| FocusBench (`focusbench`) | agents | 0 | `unverified` | [资料](https://research.meta.ai/static/muse-wonder-model-card) |
| FrontierCode 1.1 Extended (`frontiercode-1-1-extended`) | coding | 1 | `local` | [资料](https://cognition.com/blog/frontier-code-1.1) |
| FrontierCode 1.1 Main (`frontiercode-1-1-main`) | coding | 1 | `local` | [资料](https://cognition.com/frontiercode) |
| FrontierFinance（Samaya） (`frontierfinance`) | work | 0 | `official` | [资料](https://huggingface.co/datasets/samaya-ai/FrontierFinance) |
| FrontierMath (`frontiermath`) | reasoning | 3 | `local` | [资料](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tier 4 (`frontiermath-v2-tier-4`) | reasoning | 2 | `local` | [资料](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tiers 1–3 (`frontiermath-v2-tiers-1-3`) | reasoning | 3 | `local` | [资料](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierScience (`frontierscience`) | reasoning | 5 | `local` | [资料](https://huggingface.co/datasets/openai/frontierscience/resolve/25ed67db7da8f4591484e764008ff585544f5a30/research/test.jsonl) |
| FrontierScience Research (`frontierscience-research`) | reasoning | 3 | `local` | [资料](https://huggingface.co/datasets/openai/frontierscience/resolve/25ed67db7da8f4591484e764008ff585544f5a30/research/test.jsonl) |
| FrontierSWE v2 (`frontierswe-v2`) | coding | 4 | `local` | [资料](https://raw.githubusercontent.com/Proximal-Labs/frontier-swe-v2/main/tasks/sglang-inference-system-optimization/instruction.md) |
| Full-Duplex-Bench (`full-duplex-bench`) | multimodal | 1 | `local` | [资料](https://github.com/DanielLin94144/Full-Duplex-Bench/tree/3e799c45a045256f47d5f1c9cda90157e2d2ec9e/v1_v1.5/evaluation/example_data/pause_handling_example/1) |
| GAIA (`gaia`) | agents | 1 | `local` | [资料](https://arxiv.org/html/2311.12983) |
| GDP.pdf (`gdp-pdf`) | context | 3 | `local` | [资料](https://surgehq.ai/benchmarks/gdp-pdf) |
| GDPval (`gdpval`) | work | 4 | `local` | [资料](https://openai.com/index/gdpval/) |
| GDPval-AA (`gdpval-aa`) | work | 1 | `local` | [资料](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| GDPval-AA v2.1 (`gdpval-aa-v2-1`) | work | 1 | `local` | [资料](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| GeneBench-Pro (`genebench-pro`) | work | 5 | `local` | [资料](https://huggingface.co/datasets/openai/genebench-pro-public-package/blob/eb75a3c0996b3cedcc9af685bad02fd166848fa2/problems/txr1_mtb_causal_sv/eval_config.json) |
| GIFT-Eval (`gift-eval`) | reasoning | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=Salesforce%2FGiftEvalParquet&config=bitbrains_fast_storage_5T_long&split=train&offset=0&length=1) |
| GIFT-Eval-CTX (`gift-eval-ctx`) | reasoning | 1 | `local` | [资料](https://huggingface.co/datasets/Salesforce/GiftEvalCTX) |
| Global-MMLU (`global-mmlu`) | knowledge | 1 | `local` | [资料](https://huggingface.co/datasets/CohereLabs/Global-MMLU/resolve/0e619dbeb34206cd48705a1a0ea7fb21cae09993/en/dev-00000-of-00001.parquet) |
| GPQA (`gpqa`) | knowledge | 0 | `restricted` | [资料](https://huggingface.co/datasets/Idavidrein/gpqa) |
| GPQA Diamond (`gpqa-diamond`) | knowledge | 0 | `restricted` | [资料](https://huggingface.co/datasets/Idavidrein/gpqa) |
| GraphWalks (`graphwalks`) | reasoning | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=openai%2Fgraphwalks&config=default&split=train&offset=0&length=1) |
| GSM8K (`gsm8k`) | reasoning | 7 | `local` | [资料](https://github.com/openai/grade-school-math) |
| HANDBOOK.md (`handbook-md`) | agents | 2 | `local` | [资料](https://raw.githubusercontent.com/surge-ai/handbook/374bc876ba008169e0dc30c1a751859d525cedc4/tasks/hr_crestwood_university_79786c46/instruction.md) |
| Harvey Legal Agent Benchmark (LAB) (`harvey-lab`) | work | 3 | `local` | [资料](https://raw.githubusercontent.com/harveyai/harvey-labs/v1.0/tasks/corporate-ma/review-data-room-red-flag-review/task.json) |
| Harvey LAB-AA v1.1 (`harvey-lab-aa-v1-1`) | work | 1 | `local` | [资料](https://artificialanalysis.ai/articles/harvey-lab-aa-v1-1) |
| HealthBench (`healthbench`) | work | 0 | `restricted` | [资料](https://openai.com/index/healthbench/) |
| HealthBench Hard (`healthbench-hard`) | work | 0 | `restricted` | [资料](https://openai.com/index/healthbench/) |
| HealthBench Professional (`healthbench-professional`) | work | 0 | `restricted` | [资料](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf) |
| HLAB-Vals-1.1 (`hlab-vals-v1-1`) | work | 0 | `private` | [资料](https://www.vals.ai/benchmarks/hlab) |
| Humanity’s Last Exam (`hle`) | knowledge | 2 | `local` | [资料](https://scale.com/blog/humanitys-last-exam-results) |
| HLE-Diamond (`hle-diamond`) | knowledge | 0 | `gated` | [资料](https://huggingface.co/datasets/cais/hle-diamond) |
| HumanEval (`human-eval`) | coding | 6 | `local` | [资料](https://github.com/openai/human-eval/blob/master/data/HumanEval.jsonl.gz) |
| τ^τ-bench (Hyper-τ) (`hyper-tau-bench`) | coding | 5 | `local` | [资料](https://raw.githubusercontent.com/sierra-research/hyper-tau-bench/main/data/tau2/hyper/tasks/002_airline_plus_construction_core_evidence_seeded_performance_hard.json) |
| IFBench (`ifbench`) | alignment | 6 | `local` | [资料](https://raw.githubusercontent.com/allenai/IFBench/main/ifbench/data/IFBench_test.jsonl) |
| IFEval (`ifeval`) | alignment | 6 | `local` | [资料](https://arxiv.org/html/2311.07911#S2.SS1) |
| JailbreakBench (`jailbreakbench`) | alignment | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=JailbreakBench%2FJBB-Behaviors&config=judge_comparison&split=test&offset=201&length=1) |
| Jev Decision Index · 公开复现榜0.3 (`jev-decision-index`) | general | 0 | `official` | [资料](https://huggingface.co/spaces/multimodalart/jev-decision-index/commit/f03e5a6bcd25828757da1bedc899239f99d9ec11) |
| JobBench (`jobbench`) | work | 2 | `local` | [资料](https://huggingface.co/datasets/JobBench/job-bench/resolve/d43a66575635da0d3f6cb9a20976dc1a60f3ffc9/dataset/data_entry_keyers/task1/task_folder/TASK_INSTRUCTIONS.txt) |
| Business Operation（Kimi 内部） (`kimi-business-operation`) | work | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Kimi Code Bench 2.0 (`kimi-code-bench-2`) | coding | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Kimi Code Bench 3.0 Long-horizon (`kimi-code-bench-3-long-horizon`) | coding | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| DECK-Arena（Kimi 内部） (`kimi-deck-arena`) | writing | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Design Bench（Kimi 内部） (`kimi-design-bench`) | writing | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Financial Modeling（Kimi 内部） (`kimi-financial-modeling`) | work | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Financial Research（Kimi 内部） (`kimi-financial-research`) | work | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| Kimi Hallu Bench (`kimi-hallu-bench`) | knowledge | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| KORA V2 (`kora-v2`) | alignment | 1 | `local` | [资料](https://raw.githubusercontent.com/korabench/benchmark/2.2.0/data/scenarios.jsonl) |
| LABBench2 (`labbench2`) | work | 0 | `gated` | [资料](https://huggingface.co/datasets/EdisonScientific/labbench2) |
| Legal Research Bench (Vals AI) (`legal-research-vals`) | work | 5 | `local` | [资料](https://raw.githubusercontent.com/vals-ai/legal-research-bench/main/data/public.json) |
| LegalBench (`legalbench`) | work | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=nguha%2Flegalbench&config=hearsay&split=test&offset=0&length=1) |
| Long-Horizon Terminal-Bench (LHTB) (`lhtb`) | agents | 3 | `local` | [资料](https://raw.githubusercontent.com/zli12321/LHTB/main/tasks/langchain-version-migration/instruction.md) |
| LifeSciBench (`lifescibench`) | work | 2 | `local` | [资料](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf) |
| LinuxArena (`linuxarena`) | alignment | 1 | `local` | [资料](https://huggingface.co/datasets/anonymouslinuxarena/linuxarena-public/resolve/2fd29f9c7bc190fb873bd76c6bd648f22b9ab0a7/data/sample.jsonl) |
| LiveBench (`livebench`) | general | 3 | `local` | [资料](https://huggingface.co/datasets/livebench/reasoning/resolve/6fc6498a5dfba553f69f4413feabade1f1a2d384/data/test-00000-of-00001.parquet) |
| LiveClawBench (`liveclawbench`) | agents | 1 | `local` | [资料](https://github.com/Mosi-AI/LiveClawBench/blob/303dc77ea8d8b6c5b6fc561348b24d13f0c4e448/tasks/ai-copyright-international-jurisprudence/instruction.md) |
| LiveCodeBench (`livecodebench`) | coding | 4 | `local` | [资料](https://huggingface.co/datasets/livecodebench/code_generation_lite/resolve/0fe84c3912ea0c4d4a78037083943e8f0c4dd505/test.jsonl) |
| LiveCodeBench Pro (`livecodebench-pro`) | coding | 3 | `local` | [资料](https://arxiv.org/pdf/2506.11928v1) |
| LOCA-bench (`loca-bench`) | context | 2 | `local` | [资料](https://raw.githubusercontent.com/hkust-nlp/LOCA-bench/8b6fac49d9edd92922593e703b74ea255357c3ec/task-configs/final_256k_set_config.json) |
| LoCoMo (`locomo`) | context | 1 | `local` | [资料](https://raw.githubusercontent.com/snap-research/locomo/3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376/data/locomo10.json) |
| LongBench (`longbench`) | context | 4 | `local` | [资料](https://huggingface.co/datasets/THUDM/LongBench/resolve/5e628be450b7e67fb7ae6e201bd6d8f7056f7672/data.zip) |
| LongBench v2 (`longbench-v2`) | context | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=zai-org%2FLongBench-v2&config=default&split=train&offset=0&length=1) |
| Longform Writing (`longform-writing`) | writing | 5 | `local` | [资料](https://eqbench.com/results/creative-writing-longform/openrouter__pony-alpha_longform_report.html) |
| LongMemEval (`longmemeval`) | context | 1 | `local` | [资料](https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned/resolve/98d7416c24c778c2fee6e6f3006e7a073259d48f/longmemeval_oracle.json) |
| LVBench (`lvbench`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=DongfuJiang%2FLVBench&config=default&split=test&offset=0&length=1) |
| MAEB (`maeb`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=mteb%2Fbirdclef25-mini&config=default&split=train&offset=0&length=1) |
| Microsoft MAI Held-Out Code (`mai-held-out-code`) | coding | 0 | `private` | [资料](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/) |
| Microsoft MAI Held-Out Math (`mai-held-out-math`) | reasoning | 0 | `private` | [资料](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/) |
| Microsoft MAI Held-Out QA (`mai-held-out-qa`) | knowledge | 0 | `private` | [资料](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/) |
| Microsoft MAI Held-Out STEM (`mai-held-out-stem`) | reasoning | 0 | `private` | [资料](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/) |
| MATH-500 (`math-500`) | reasoning | 3 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=HuggingFaceH4%2FMATH-500&config=default&split=test&offset=0&length=1) |
| ArXivLean (`matharena-arxivlean`) | reasoning | 5 | `local` | [资料](https://huggingface.co/datasets/MathArena/arxivlean-0626/resolve/1ced46a1d45d57c6de242d51c0baf574b96022ea/data/train-00000-of-00001.parquet) |
| ArXivMath (`matharena-arxivmath`) | reasoning | 5 | `local` | [资料](https://huggingface.co/datasets/MathArena/arxivmath-0626/resolve/dca0d771ab20c1b8e8c50d0921bf693f7bfe663d/data/train-00000-of-00001.parquet) |
| BrokenArXiv (`matharena-brokenarxiv`) | reasoning | 5 | `local` | [资料](https://huggingface.co/datasets/MathArena/brokenarxiv-0626/resolve/73dd424784fbdeab599557fcba3d77559c89d1ee/data/train-00000-of-00001.parquet) |
| MATH-Vision (`mathvision`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=MathLLMs%2FMathVision&config=default&split=test&offset=0&length=1) |
| MathVista (`mathvista`) | multimodal | 4 | `local` | [资料](https://huggingface.co/datasets/AI4Math/MathVista/viewer/default/testmini?row=0) |
| MBPP (`mbpp`) | coding | 6 | `local` | [资料](https://huggingface.co/datasets/google-research-datasets/mbpp) |
| MCP-Atlas (`mcp-atlas`) | agents | 5 | `local` | [资料](https://huggingface.co/datasets/ScaleAI/MCP-Atlas/viewer/default/train?p=0) |
| MedCode (`medcode`) | work | 0 | `private` | [资料](https://www.vals.ai/benchmarks/medcode) |
| MedScribe (`medscribe`) | work | 1 | `local` | [资料](https://www.vals.ai/benchmarks/medscribe) |
| MemoryArena (`memoryarena`) | context | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ZexueHe%2Fmemoryarena&config=progressive_search&split=test&offset=0&length=1) |
| MemoryBench (Meta) (`memorybench-meta`) | context | 0 | `unverified` | [资料](https://research.meta.ai/static/muse-wonder-model-card) |
| MentalHealthBench (`mentalhealthbench`) | alignment | 1 | `local` | [资料](https://openai.com/index/introducing-mentalhealthbench/) |
| MIEB-lite (`mieb-lite`) | multimodal | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=mteb%2Fresisc45&config=default&split=test&offset=0&length=1) |
| MILU (`milu`) | knowledge | 2 | `local` | [资料](https://arxiv.org/html/2411.02538v3) |
| Mind2Web (`mind2web`) | agents | 4 | `local` | [资料](https://osu-nlp-group.github.io/Mind2Web/) |
| MirrorCode (`mirrorcode`) | coding | 4 | `local` | [资料](https://raw.githubusercontent.com/epoch-research/MirrorCode/main/mc/cal/cal_util_linux.jsonl) |
| MLCR-AA (`mlcr-aa`) | context | 3 | `local` | [资料](https://artificialanalysis.ai/evaluations/mlcr-aa) |
| MMLongBench-Doc (`mmlongbench-doc`) | multimodal | 1 | `local` | [资料](https://raw.githubusercontent.com/mayubo2333/MMLongBench-Doc/main/data/samples.json) |
| MMLU (`mmlu`) | knowledge | 4 | `local` | [资料](https://huggingface.co/datasets/cais/mmlu/resolve/c30699e8356da336a370243923dbaf21066bb9fe/anatomy/test-00000-of-00001.parquet) |
| MMLU-Pro (`mmlu-pro`) | knowledge | 10 | `local` | [资料](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro) |
| MMLU-ProX (`mmlu-prox`) | knowledge | 1 | `local` | [资料](https://huggingface.co/datasets/li-lab/MMLU-ProX/resolve/8e6106a6c6ce1c5027e66cc338143cf997b2aa09/en/validation-00000-of-00001.parquet) |
| MMMLU (`mmmlu`) | knowledge | 4 | `local` | [资料](https://huggingface.co/datasets/openai/MMMLU/viewer/default/test) |
| MMMU (`mmmu`) | multimodal | 3 | `local` | [资料](https://huggingface.co/datasets/MMMU/MMMU) |
| MMMU-Pro (`mmmu-pro`) | multimodal | 4 | `local` | [资料](https://huggingface.co/datasets/MMMU/MMMU_Pro) |
| MRCR（OpenAI 公开集） (`mrcr`) | context | 3 | `local` | [资料](https://huggingface.co/datasets/openai/mrcr/blob/f4c69fae7cf81f7ca26b9fee34b392a50f6b8a1d/2needle/2needle_0.parquet) |
| MRCR v2（DeepMind） (`mrcr-v2`) | context | 4 | `local` | [资料](https://storage.googleapis.com/download/storage/v1/b/mrcr_v2/o/mrcr_v2p1_2needle_in_(4096%2C8192)_dynamic_fewshot_text_style_fast.csv?generation=1752091035115105&alt=media) |
| MTEB Code (`mteb-code`) | knowledge | 1 | `local` | [资料](https://huggingface.co/datasets/mteb/CodeSearchNetCCRetrieval) |
| Multi-IF (`multi-if`) | alignment | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=facebook%2FMulti-IF&config=default&split=train&offset=0&length=1) |
| Mystery Game Puzzles (`mystery-game-puzzles`) | reasoning | 0 | `private` | [资料](https://epoch.ai/benchmarks/mystery-game-puzzles) |
| MysteryMechanism (`mysterymechanism`) | reasoning | 3 | `local` | [资料](https://www.vals.ai/benchmarks/mysterymechanism) |
| NC Bench (`nc-bench`) | writing | 3 | `local` | [资料](https://www.nc-bench.com/tests) |
| NL2Repo-Bench (`nl2repo-bench`) | coding | 4 | `local` | [资料](https://raw.githubusercontent.com/multimodal-art-projection/NL2RepoBench/main/test_files/fastapi-users/start.md) |
| OCR-Reasoning (`ocr-reasoning`) | multimodal | 1 | `local` | [资料](https://huggingface.co/datasets/mx262/OCR-Reasoning/resolve/df6bc7b799fde39b6bcffcd5c4205343ce985aa5/annotations.json) |
| OCRBench v2 (`ocrbench-v2`) | multimodal | 1 | `local` | [资料](https://papers.nips.cc/paper_files/paper/2025/file/8c2e6bb15be1894b8fb4e0f9bcad1739-Paper-Datasets_and_Benchmarks_Track.pdf) |
| OfficeQA Pro (`officeqa-pro`) | work | 2 | `local` | [资料](https://arxiv.org/pdf/2603.08655v1#page=4) |
| OfficeQA Pro V2 (`officeqa-pro-v2`) | work | 3 | `local` | [资料](https://www.databricks.com/blog/introducing-officeqa-pro-v2-new-benchmark-enterprise-grounded-reasoning) |
| OmniDocBench (`omnidocbench`) | multimodal | 4 | `local` | [资料](https://raw.githubusercontent.com/opendatalab/OmniDocBench/main/demo_data/omnidocbench_demo/OmniDocBench_demo.json) |
| OpenAI 前端偏好评测 (`openai-internal-coding`) | coding | 0 | `restricted` | [资料](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering) |
| OpenVibeEval (`openvibeeval`) | writing | 3 | `local` | [资料](https://openvibeeval.com/prompt/digital-garden/) |
| OSWorld (`osworld`) | agents | 3 | `local` | [资料](https://raw.githubusercontent.com/xlang-ai/OSWorld/main/evaluation_examples/examples/chrome/030eeff7-b492-4218-b312-701ec99ee0cc.json) |
| OSWorld 2.0 (`osworld-2`) | agents | 1 | `local` | [资料](https://osworld-v2.xlang.ai/) |
| OSWorld 2.1 (`osworld-2-1`) | agents | 0 | `gated` | [资料](https://huggingface.co/datasets/xlangai/osworld_v2_tasks) |
| PaperBench (`paperbench`) | agents | 4 | `local` | [资料](https://raw.githubusercontent.com/openai/frontier-evals/main/project/paperbench/data/papers/adaptive-pruning/rubric.json) |
| PSI / Personal Superintelligence Index (`personal-superintelligence-index`) | general | 0 | `official` | [资料](https://research.meta.ai/static/muse-wonder-model-card) |
| PersonaMem-v2 (`personamem-v2`) | context | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=bowen-upenn%2FPersonaMem-v2&config=benchmark&split=benchmark_text&offset=0&length=1) |
| PhysicianBench (`physicianbench`) | agents | 1 | `local` | [资料](https://github.com/HealthRex/PhysicianBench/blob/c7efa8fd5b1e4744ada50668efe4b7e84023cbb0/tasks/v1/aortic_aneurysm_cad/instruction.md) |
| PinchBench (`pinchbench`) | coding | 1 | `local` | [资料](https://github.com/pinchbench/skill/blob/819384ae830492365b8363fc26bc2602e73f216d/tasks/task_access_log_anomaly.md) |
| PLawBench (`plawbench`) | work | 1 | `local` | [资料](https://raw.githubusercontent.com/SKYLENAGE-AI/PLawbench/f6ee07b36c1f4c0bfc2af8ca27183d3dd3175c56/practical_case_analysis_250.jsonl) |
| PostTrainBench (`posttrainbench`) | agents | 1 | `local` | [资料](https://raw.githubusercontent.com/aisa-group/PostTrainBench/ea8d65bc375e61c8ac77a7aea86effcc995378fb/AGENTS.md) |
| PostTrainBench v1.2 (`posttrainbench-1-2`) | agents | 1 | `local` | [资料](https://github.com/aisa-group/PostTrainBench/blob/ea8d65bc375e61c8ac77a7aea86effcc995378fb/src/harbor_adapter/README.md) |
| PRBench (`prbench`) | work | 5 | `local` | [资料](https://huggingface.co/datasets/ScaleAI/PRBench) |
| PRBench Finance (`prbench-finance`) | work | 6 | `local` | [资料](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/finance-00000-of-00001.parquet) |
| PRBench Legal (`prbench-legal`) | work | 5 | `local` | [资料](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/legal-00000-of-00001.parquet) |
| ProgramBench (`programbench`) | coding | 4 | `local` | [资料](https://huggingface.co/datasets/programbench/ProgramBench-Tests/resolve/de0ddfb637590c7ecb54fa0b5301f6dc7dfbcee5/eradman__entr.8e2e8b4/tests/aa2ac39b58a8.tar.gz) |
| Pronunciation Robustness (`pronunciation-robustness`) | multimodal | 1 | `local` | [资料](https://artificialanalysis.ai/methodology/text-to-speech/pronunciation-robustness-overview) |
| Rapidata SVG Generation (`rapidata-svg`) | writing | 6 | `local` | [资料](https://huggingface.co/datasets/Rapidata/svg-benchmark/viewer/default/train?row=0) |
| Riemann-bench (`riemann-bench`) | reasoning | 1 | `local` | [资料](https://cdn.prod.website-files.com/68dcd2ceb173c46fa029931c/69c1b790b26a4957a6838910_445938fb.png) |
| Roboflow Vision Evals (`roboflow-vision-evals`) | multimodal | 5 | `local` | [资料](https://playground.roboflow.com/evals/visual-reasoning) |
| RULER (`ruler`) | context | 5 | `local` | [资料](https://arxiv.org/html/2404.06654v3) |
| RWS M-GATE (`rws-mgate`) | knowledge | 2 | `local` | [资料](https://www.rws.com/about/news/2026/TrainAI-launches-m-gate/) |
| SciCode (`scicode`) | coding | 4 | `local` | [资料](https://huggingface.co/datasets/SciCode1/SciCode/blob/main/problems_dev.jsonl) |
| SciCode-Verified (`scicode-verified`) | coding | 1 | `local` | [资料](https://huggingface.co/datasets/shhu2001/SciCode-Verified/resolve/eea11a866be6860725258702b39ef8651ed26abd/data/problems_test.jsonl) |
| ScreenSpot-Pro (`screenspot-pro`) | multimodal | 3 | `local` | [资料](https://arxiv.org/html/2504.07981v1) |
| SHADE-Arena (`shade-arena`) | alignment | 1 | `local` | [资料](https://raw.githubusercontent.com/jkutaso/SHADE-Arena/6614e77191c1f8e2d0c44c123c6f915905ebafae/task_pairs/expenditure_accounting/README.md) |
| Lech Mazur Short-Story (`short-story`) | writing | 5 | `local` | [资料](https://raw.githubusercontent.com/lechmazur/writing/main/prompts_wc/prompt_wc_0.txt) |
| SimpleBench (`simplebench`) | reasoning | 7 | `local` | [资料](https://raw.githubusercontent.com/simple-bench/SimpleBench/main/simple_bench_public.json) |
| SimpleQA (`simpleqa`) | knowledge | 7 | `local` | [资料](https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv) |
| SimpleQA Verified (`simpleqa-verified`) | knowledge | 5 | `local` | [资料](https://huggingface.co/datasets/google/simpleqa-verified/resolve/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/simpleqa_verified.csv) |
| scBench / SingleCellBench (`singlecellbench`) | agents | 1 | `local` | [资料](https://github.com/latchbio/scbench/blob/0bc34032bfa402dad29fc40b4cf10ea8fc03193e/evals/qc/bd_rhapsody_tnbc_panel_aware_qc.json) |
| SkillsBench (`skillsbench`) | agents | 4 | `local` | [资料](https://raw.githubusercontent.com/benchflow-ai/skillsbench/main/tasks/sec-financial-report/task.md) |
| Small Overlapping Speech Bench (`small-overlapping-speech-bench`) | multimodal | 3 | `local` | [资料](https://huggingface.co/datasets/laion/small-overlapping-speech-bench) |
| SpatialBench Verified (`spatialbench-verified`) | agents | 0 | `official` | [资料](https://github.com/latchbio/spatialbench/blob/5042c4f3ee597da1590650c7b894d068ae968e26/example_evals/spatial_analysis/xenium_kidney_spatial_cn7_composition_day14.json) |
| Speech Agent Arena (`speech-agent-arena`) | agents | 1 | `local` | [资料](https://artificialanalysis.ai/speech-to-speech/arena/overview) |
| SPEED-Bench (`speed-bench`) | agents | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=nvidia%2FSPEED-Bench&config=qualitative&split=test&offset=0&length=1) |
| SpreadsheetBench 2 (`spreadsheetbench-v2`) | work | 3 | `local` | [资料](https://spreadsheetbench.github.io/) |
| StrongREJECT (`strongreject`) | alignment | 1 | `local` | [资料](https://raw.githubusercontent.com/alexandrasouly/strongreject/f7cad6c17e624e21d8df2278e918ae1dddb4cb56/strongreject_dataset/strongreject_small_dataset.csv) |
| svgbench.ai (`svgbench`) | writing | 9 | `local` | [资料](https://svgbench.ai/api/prompt/prompt_daf3f932ceaa) |
| SWE-Atlas-QnA (`swe-atlas-qna`) | coding | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FSWE-Atlas-QnA&config=default&split=test&offset=0&length=1) |
| SWE-bench (`swe-bench`) | coding | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench&config=default&split=test&offset=0&length=1) |
| SWE-bench Multilingual (`swe-bench-multilingual`) | coding | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Multilingual&config=default&split=test&offset=0&length=1) |
| SWE-bench Multimodal (`swe-bench-multimodal`) | coding | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Multimodal&config=default&split=dev&offset=0&length=1) |
| SWE-bench Pro (`swe-bench-pro`) | coding | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FSWE-bench_Pro&config=default&split=test&offset=0&length=1) |
| SWE-bench Pro v2-Hard (`swe-bench-pro-v2-hard`) | coding | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FSWE-bench_Pro&config=hard&split=test&offset=0&length=1) |
| SWE-bench Verified (`swe-bench-verified`) | coding | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Verified&config=default&split=test&offset=0&length=1) |
| SWE-ContextBench (`swe-contextbench`) | coding | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=jiayuanz3%2FSWEContextBench&config=default&split=train&offset=0&length=1) |
| SWE-Marathon (`swe-marathon`) | coding | 1 | `local` | [资料](https://huggingface.co/datasets/rdesai2/swe-marathon/resolve/8129e0634100dbb6fe0cdc32d703bf2aa03f6cbb/tasks.jsonl) |
| SWE-rebench (`swe-rebench`) | coding | 4 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=nebius%2FSWE-rebench&config=default&split=test&offset=0&length=1) |
| SWE Refactor Bench (`swe-refactor-bench`) | coding | 1 | `local` | [资料](https://raw.githubusercontent.com/Einsia/SWE-Refactor-Bench/0d5d7310e64970826ffbe53fb53a349114acd69c/tasks/lang06-jsonnet-cpp-to-csharp/instruction.md) |
| TapTap Maker Benchmark (`taptap-maker`) | coding | 0 | `unverified` | [资料](https://maker.taptap.cn/leaderboard/methodology.html) |
| τ-bench (`tau-bench`) | agents | 3 | `local` | [资料](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/tasks_dev.py#L903-L925) |
| τ-Voice (`tau-voice`) | agents | 1 | `local` | [资料](https://github.com/sierra-research/tau2-bench/tree/96a3ef92329baf908ffe9dfe188cea34e8701d2a/data/tau2/domains/airline) |
| τ²-bench (`tau2-bench`) | agents | 3 | `local` | [资料](https://raw.githubusercontent.com/sierra-research/tau2-bench/37199f36924c8896f5e048360691f8476cd89ba1/data/tau2/domains/telecom/tasks.json) |
| τ³-Banking (`tau3-banking`) | work | 3 | `local` | [资料](https://raw.githubusercontent.com/sierra-research/tau2-bench/main/data/tau2/domains/banking_knowledge/tasks/task_001.json) |
| Tax Agent Bench (`tax-agent-bench`) | work | 5 | `local` | [资料](https://raw.githubusercontent.com/vals-ai/tax-agent-bench/main/data/public.json) |
| Terminal-Bench 2.0 (`terminal-bench-2`) | agents | 4 | `local` | [资料](https://hub.harborframework.com/tasks/terminal-bench/dna-assembly/latest) |
| Terminal-Bench 2.1 (`terminal-bench-2-1`) | agents | 4 | `local` | [资料](https://hub.harborframework.com/tasks/terminal-bench/dna-assembly/latest) |
| Terminal-Bench 3.0 (`terminal-bench-3`) | agents | 4 | `local` | [资料](https://github.com/harbor-framework/terminal-bench/pull/906) |
| Terminal-Bench 4.0 (`terminal-bench-4`) | agents | 4 | `local` | [资料](https://hub.harborframework.com/tasks/terminal-bench/layout-config-recreation2) |
| Terminal-Bench-Science 0.1 (`terminal-bench-science-0-1`) | work | 3 | `local` | [资料](https://hub.harborframework.com/tasks/terminal-bench-science/symbolic-regression/2) |
| TIME (`time-series-time`) | reasoning | 0 | `license-pending` | [资料](https://huggingface.co/datasets/Real-TSF/TIME-ProcessedCSV/resolve/683bb21b470f5a26586e1ab2295f0a2a1529ef0f/Australia_Solar/H/item0.csv) |
| ToneBench (`tonebench`) | writing | 3 | `local` | [资料](https://benchmark.towardsai.com/methodology.html) |
| Toolathlon-Verified (`toolathlon-verified`) | agents | 3 | `local` | [资料](https://raw.githubusercontent.com/hkust-nlp/Toolathlon/main/tasks/finalpool/find-alita-paper/docs/task.md) |
| ToolRet (`toolret`) | agents | 1 | `local` | [资料](https://huggingface.co/datasets/hugFu/ToolRet-Queries/raw/main/README.md) |
| ToolSandbox (`toolsandbox`) | agents | 1 | `local` | [资料](https://github.com/apple-aiml-research/ToolSandbox/blob/c8571d7854316d2e1c5f288e59fe1e34e53f6dd1/tool_sandbox/scenarios/single_tool_call_scenarios.py) |
| TubeLab Scriptwriting Benchmark (`tubelab`) | writing | 2 | `local` | [资料](https://tubelab.net/benchmark/scriptwriting) |
| Vals Index (`vals-index`) | general | 0 | `official` | [资料](https://www.vals.ai/benchmarks/vals_index_v2) |
| VBT (Verifiable Browsing Task) (`vbt`) | agents | 0 | `unverified` | [资料](https://research.meta.ai/static/muse-wonder-model-card) |
| Vending-Bench 2 (`vending-bench-2`) | agents | 1 | `local` | [资料](https://andonlabs.com/blog/opus-4-6-vending-bench) |
| Vibe Code Bench 1–100 (`vibe-code-bench-1-100`) | coding | 1 | `local` | [资料](https://www.vals-ai.com/benchmarks/vcb-1-100) |
| Vibe Code Bench v1.1 (`vibe-code-bench-v1-1`) | coding | 1 | `local` | [资料](https://gist.githubusercontent.com/lgnashold/e9bba36be5e468d8f8a2f330ae8d6aea/raw/0bd7400df1f9d444c54350f13af2a02aac72bd67/app_instructions.txt) |
| Video-MME (`video-mme`) | multimodal | 0 | `restricted` | [资料](https://github.com/MME-Benchmarks/Video-MME#-dataset-examples) |
| Video-MME v2 (`video-mme-v2`) | multimodal | 0 | `restricted` | [资料](https://arxiv.org/html/2604.05015) |
| VoiceCodeBench (`voice-code-bench`) | multimodal | 1 | `local` | [资料](https://huggingface.co/datasets/besimple-ai/voice-code-bench/resolve/8edfa398aa5575816d940793e4e2b8c6430184da/data/metadata.jsonl) |
| V*Bench (`vstar-bench`) | multimodal | 1 | `local` | [资料](https://huggingface.co/datasets/craigwu/vstar_bench/resolve/d9ae62c903da0c98336e85c5ee89cd863b04b4da/test_questions.jsonl) |
| WANDR (`wandr`) | agents | 3 | `local` | [资料](https://raw.githubusercontent.com/perplexityai/wandr/ccb0baeb96f1c77a48e47f92122c57479ee99700/datasets/wandr/accounting-ai-claims/instruction.md) |
| WebArena Verified (`webarena-verified`) | agents | 1 | `local` | [资料](https://github.com/ServiceNow/webarena-verified/blob/6473f72db5dcefc97b5725b59e734504edc28a21/assets/dataset/webarena-verified.json) |
| WebVoyager (`webvoyager`) | agents | 2 | `local` | [资料](https://github.com/MinorJerry/WebVoyager/blob/main/data/WebVoyager_data.jsonl) |
| WeirdML v2 (`weirdml-v2`) | coding | 1 | `local` | [资料](https://htihle.github.io/prompts/task_prompt_shapes_easy.html) |
| When2Call (`when2call`) | agents | 1 | `local` | [资料](https://datasets-server.huggingface.co/rows?dataset=nvidia%2FWhen2Call&config=test&split=mcq&offset=0&length=1) |
| WMT24++ (`wmt24pp`) | knowledge | 1 | `local` | [资料](https://huggingface.co/datasets/google/wmt24pp/resolve/fd7405c06494bc66a57b25f55d217a72f96e60dc/en-de_DE.jsonl) |
| xdev-bench-hard (`xdev-bench-hard`) | coding | 0 | `unverified` | [资料](https://www.kimi.ai/blog/kimi-k3-1-pro) |
| ZeroBench Main (`zerobench-main`) | multimodal | 1 | `local` | [资料](https://arxiv.org/html/2502.09696v3) |
