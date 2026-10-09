# Editorial 样例原始来源精简投影核对（coding / reasoning / knowledge）

- 2026-10-08；共 30 条：coding 16、reasoning 10、knowledge 4。
- 每条单独记录载体、定位、版本/快照、响应哈希、原始字段路径/原文投影、省略范围及既有 proof 中的许可来源声明。
- `formalEditorialPrompt` 与 `rawProjection` 分开保存；网页、PDF、Markdown 内容写作短原文节录；不把本地摘要包装成原始 JSON 记录。
- 许可字段只转录来源声明及其 scope 文本，不作许可结论。

## 本轮读取边界与字段事实

- 四个 SWE-bench 系列数据 API 的记录列名是 `instance_id`、`base_commit`、`version`、`problem_statement`；旧 proof 中的 `problem_statement_excerpt` 是本地截取标签。
- FrontierMath 官方页面直接呈现 HTML 的 Problem/Solution 文本而非数据行；当前 `frontiermath-v2-tiers-1-3` formal sample 对应 Tier 1 Counting nonzero solutions，旧 A2 相同 benchmarkId 候选定位到 Tier 3 Tsirelson，二者 scope 不同，本文件记录当前正式样例的 Tier 1。
- CyberBench 现按原始 HTML 列表项保存逐字片段，包含源码中的 `<code>` 标签；旧的无标签可见文本形式不作为原始 HTML 片段。
- LiveCodeBench 已用 Range 重新读取 pinned JSONL row 0；`question_content` 精确节录来自原字段连续前 25 个 whitespace words。
- Chess `.eval` 是 ZIP。Range 读取确认 central directory 列出 100 个独立 `samples/{n}_epoch_1.json` 成员；目录无 FEN 索引，所以本轮未解压任何 sample member，也未读取/保存 reasoning。
- RWS 当前直连 HTTP 返回 202/空响应，但官方文章可通过网页索引在 “Four patterns stood out” 处定位 stumper 句；没有响应体哈希。
- LiveCodeBench-Pro 取公开论文 A11 示例页；未访问 gated 数据行。

### `aider-polyglot`
- 载体：Markdown excerpt；版本/快照：see locator/source hash; no immutable revision in current sample。
- 原始定位：wordy instructions / Iteration 3 example; pinned commit 7e0611e77b54e2dea774cdc0aa00cf9f7ed6144f。
- 原始字段路径：blockquote。
- 原始投影：> What is 3 plus 2 multiplied by 3?

15 (i.e. not 9)
- 响应 SHA-256：b9e24dd95b27fa04f706e4dd9e5c7f430684b1af13a1cfde34faee705300aeee。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.

### `cyberbench-patch-v1-1`
- 载体：HTML source fragment；版本/快照：Current HTML response SHA-256 b922ea90b7b078f9ded13b375e042735d3deeb590f56941b17ecfef82357062a; fetched 2026-10-09。
- 原始定位：HTML h3#patch-examples, first following ul/li; exact sentence within the li。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：<li><code>oss-fuzz:435781342</code> (<code>libxml2</code>) contrasts symptom-level namespace handling patches in <code>SAX2.c</code> with GPT-5.5’s passing <code>parserInternals.c</code> lifecycle fix.</li>
- 响应 SHA-256：b922ea90b7b078f9ded13b375e042735d3deeb590f56941b17ecfef82357062a。
- 省略范围：One original HTML list item only; adjacent case-study items and interactive benchmark data omitted.
- 传输/来源事实：{"httpStatus": 200, "responseBytes": 1729685, "sha256": "b922ea90b7b078f9ded13b375e042735d3deeb590f56941b17ecfef82357062a", "responseTextExact": "<li><code>oss-fuzz:435781342</code> (<code>libxml2</code>) contrasts symptom-level namespace handling patches in <code>SAX2.c</code> with GPT-5.5’s passing <code>parserInternals.c</code> lifecycle fix.</li>"}
- 既有许可来源记载：CyberBench is proprietary; task-level source provenance varies；scope：Public case summary; underlying PoC/source snapshot；URL：https://www.vals.ai/benchmarks/cyber, https://www.vals.ai/benchmarks。

### `frontiercode-1-1-main`
- 载体：HTML text excerpt；版本/快照：Official page captured 2026-10-08; displayed version selector includes FrontierCode 1.1。
- 原始定位：What a task looks like > Task description; fetched official page 2026-10-08。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Encapsulate all warning logs in a new auto LOG_WARNING() -> std::ostream & method in src/logger.h such that:
- 响应 SHA-256：b29d15bff7e1022a613dffd4dedf97c125b3fd038c8dcd3bf24f57bea51508e1。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No task-data license found on checked official pages；scope：Official leaderboard sample and methodology pages.；URL：https://cognition.com/frontiercode, https://cognition.com/blog/frontier-code, https://cognition.com/blog/frontier-code-1.1。

### `frontierswe-v2`
- 载体：Markdown text excerpt；版本/快照：instruction.md SHA-256 3e7d8998c7865b4d04c1e4e217ba68386f26111b6988e899d2f78928cd61ff03。
- 原始定位：instruction.md opening task paragraph。
- 原始字段路径：task instruction text。
- 原始投影：Your workspace runs an SGLang serving instance with Qwen3.5-4B on a B200 GPU. Make it serve requests as fast as possible.
- 响应 SHA-256：3e7d8998c7865b4d04c1e4e217ba68386f26111b6988e899d2f78928cd61ff03。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：Task prompt license not explicitly stated；scope：Task instruction.md；URL：https://github.com/Proximal-Labs/frontier-swe-v2/blob/main/README.md, https://raw.githubusercontent.com/Proximal-Labs/frontier-swe-v2/main/tasks/sglang-inference-system-optimization/instruction.md。

### `hyper-tau-bench`
- Source: [official task JSON](https://raw.githubusercontent.com/sierra-research/hyper-tau-bench/main/data/tau2/hyper/tasks/002_airline_plus_construction_core_evidence_seeded_performance_hard.json); HTTP 200, 5,562 bytes; SHA-256 `aa1fdc915727a067f27249bceac99b6bbdfb41e59330cd6256c46bdf16e8831b`.
- Native fields: `id`, `source_domain`, `task_type`, `task_description`. Exact values: id `002_airline_plus_construction_core_evidence_seeded_performance_hard`; source_domain `airline_plus`; task_type `construction`.
- Exact `task_description` excerpt: “Build the complete airline+ customer service domain from scratch as two customer journeys: book travel and manage an existing reservation.” This is the source field’s first full sentence (20 words); the remainder of the field is omitted.
- License facts recorded: repository LICENSE is MIT; checked task JSON does not itself declare a task-data license. Evidence: https://github.com/sierra-research/hyper-tau-bench/blob/main/LICENSE and the task JSON URL above.
### `livecodebench`
- 载体：native JSONL fields；版本/快照：HF dataset revision 0fe84c3912ea0c4d4a78037083943e8f0c4dd505; row line hash is SHA-256 of exact JSONL line bytes excluding newline。
- 原始定位：test.jsonl row_idx=0; HTTP Range bytes=0-100000/1252609773; exact first-line SHA-256 below; pinned dataset revision 0fe84c3912ea0c4d4a78037083943e8f0c4dd505。
- 原始字段路径：question_title, question_content, platform, question_id。
- 原始投影：{"question_title": "A. Short Sort", "question_id": "1873_A", "platform": "codeforces", "question_content": "There are three cards with letters $\\texttt{a}$, $\\texttt{b}$, $\\texttt{c}$ placed in a row in some order. You can do the following operation at most once:"}
- 响应 SHA-256：eba9fa95de36e7eb53bfb392826ea4d335a9b65347abeed1c5f6a034c0580b5d。
- 省略范围：The projection truncates the original question_content after a continuous 25-word prefix; other original fields (contest_id, contest_date, starter_code, difficulty, public_test_cases, private_test_cases, metadata) omitted.
- 传输/来源事实：{"httpStatus": 206, "contentRange": "bytes 0-100000/1252609773", "responseBytes": 100001, "exactRowSha256": "eba9fa95de36e7eb53bfb392826ea4d335a9b65347abeed1c5f6a034c0580b5d", "rowFieldsObserved": ["question_title", "question_content", "platform", "question_id", "contest_id", "contest_date", "starter_code", "difficulty", "public_test_cases", "private_test_cases", "metadata"]}

### `livecodebench-pro`
- 载体：PDF paper text excerpt；版本/快照：No accessible dataset revision or record ID established。
- 原始定位：arXiv:2506.11928v1 p.30 Appendix A11; example rated 1300, linked Codeforces 2050D; no gated row read。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：You are given a string s, consisting of digits from 0 to 9. In one operation, you can pick any digit in this string
- 响应 SHA-256：f9a943529752d98d77879bc815901272ef8bfab4cd023d3b4de031333b346398。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 本轮边界：arXiv:2506.11928v1 p.30 Appendix A11; example rated 1300, linked Codeforces 2050D; no gated row read
- 既有许可来源记载：No task-data license verified；scope：Official toolkit README and paper; neither establishes an individual dataset row license in the checked evidence.；URL：https://raw.githubusercontent.com/GavinZhengOI/LiveCodeBench-Pro/main/README.md, https://livecodebench.github.io/pdfs/paper.pdf。

### `mirrorcode`
- 载体：native JSONL fields；版本/快照：cal_util_linux.jsonl SHA-256 3ac574d03a91b55da73db07583f97de833a3f6dadea5adcd958bf79d77f5f267。
- 原始定位：first row; current main URL mutable; exact source snapshot hash from prior proof。
- 原始字段路径：test_file, test_name, description, command。
- 原始投影：{"test_file": "bigyear", "test_name": "1m-month", "description": "Gregorian - Monday-based month", "command": "cal -1m 12 2147483646"}
- 响应 SHA-256：3ac574d03a91b55da73db07583f97de833a3f6dadea5adcd958bf79d77f5f267。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：MIT repository license; test source coverage unresolved；scope：Software repo license does not establish upstream testcase data terms.；URL：https://raw.githubusercontent.com/epoch-research/MirrorCode/main/LICENSE, https://github.com/epoch-research/MirrorCode/blob/main/mc/cal/cal.py, https://github.com/util-linux/util-linux/tree/82ab7a2b175874c8af845fcbd376ac33b78e30be/tests/ts/cal。

### `nl2repo-bench`
- 载体：Markdown text excerpt；版本/快照：start.md SHA-256 25411723fd6040f8eb3b58a3cd9ee4a93cf8f018694e7bf8e50addbc51978b1d。
- 原始定位：test_files/fastapi-users/start.md。
- 原始字段路径：Natural Language Instruction (Prompt)。
- 原始投影：Please create a Python project named FastAPI-Users-Auth to implement a complete user authentication and authorization management system.
- 响应 SHA-256：25411723fd6040f8eb3b58a3cd9ee4a93cf8f018694e7bf8e50addbc51978b1d。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：Original repo license scope unresolved；scope：The raw LICENSE path returned 404 and an open issue explicitly asks about repository licensing; no data/text reuse license verified.；URL：https://raw.githubusercontent.com/multimodal-art-projection/NL2RepoBench/main/LICENSE, https://github.com/multimodal-art-projection/NL2RepoBench/issues/18。

### `swe-bench`
- 载体：native datasets-server row fields；版本/快照：HF dataset commit c6fe717fd7a4c3ac1daa4055a4fd082c6a1d28a2。
- 原始定位：test row_idx=0; pinned revision c6fe717fd7a4c3ac1daa4055a4fd082c6a1d28a2。
- 原始字段路径：instance_id, base_commit, version, problem_statement。
- 原始投影：{"instance_id": "astropy__astropy-11693", "base_commit": "3832210580d516365ddae1a62071001faf94d416", "version": "4.2", "problem_statement": "'WCS.all_world2pix' failed to converge when plotting WCS with non linear distortions"}
- 响应 SHA-256：282873bcf8cf850e75ca3a79d86f99a71d228df0456270cae6dc37ef9ee7d932。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：HF card did not state a dataset license; upstream Astropy source repository uses BSD-3-Clause；scope：Dataset card metadata and upstream source-code license checked; GitHub issue prose license scope not established.；URL：https://huggingface.co/datasets/SWE-bench/SWE-bench/blob/c6fe717fd7a4c3ac1daa4055a4fd082c6a1d28a2/README.md, https://github.com/astropy/astropy/blob/main/LICENSE.rst。

### `swe-bench-multilingual`
- 载体：native datasets-server row fields；版本/快照：HF dataset commit 846e647b9f33c0b51b739d005d13d85493c9af09。
- 原始定位：test row_idx=0; pinned revision 846e647b9f33c0b51b739d005d13d85493c9af09。
- 原始字段路径：instance_id, base_commit, version, problem_statement。
- 原始投影：{"instance_id": "apache__druid-13704", "base_commit": "51dfde02840017092486fb75be2b16566aff6a19", "version": "13704", "problem_statement": "Support Post aggregation function pow(f1,f2) to cater for square, cube , square root."}
- 响应 SHA-256：c26c620992a8388ab2e0630f9d33e629f64952799bf818647db493d37c96af58。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：MIT (HF dataset card metadata); Apache-2.0 for upstream Druid code；scope：HF card metadata states MIT for the dataset; upstream repository code LICENSE is separately Apache-2.0.；URL：https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual/blob/846e647b9f33c0b51b739d005d13d85493c9af09/README.md, https://github.com/apache/druid/blob/master/LICENSE。

### `swe-bench-pro`
- 载体：native datasets-server row fields；版本/快照：HF dataset commit 2d52cb3df914a3fcf80c7f66738b3a88ae37fc50; card identifies default V2.0.0。
- 原始定位：default/test row_idx=0; pinned revision 2d52cb3df914a3fcf80c7f66738b3a88ae37fc50。
- 原始字段路径：instance_id, base_commit, version, problem_statement。
- 原始投影：{"instance_id": "instance_NodeBB__NodeBB-00c70ce7b0541cfc94afe567921d7668cdc8f4ac-vnan", "base_commit": "ae3fa85f40db0dca83d19dda1afb96064dffcc83", "version": "2.0.0", "problem_statement": "## Title: Post cache access and slug existence checks behave inconsistently"}
- 响应 SHA-256：87ebcb951736d5efffb92856fb5912c8bd44dbae0339df6985ab10a7441d69c2。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：Task content follows upstream repository licenses; no single license established for this row；scope：SWE-bench Pro card's task-content statement; this row's individual task-text license was not separately resolved.；URL：https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro/blob/2d52cb3df914a3fcf80c7f66738b3a88ae37fc50/README.md。

### `swe-bench-verified`
- 载体：native datasets-server row fields；版本/快照：HF dataset commit 78f471bf655a3137b2e8a75af1501690ec009ec3。
- 原始定位：test row_idx=0; pinned revision 78f471bf655a3137b2e8a75af1501690ec009ec3。
- 原始字段路径：instance_id, base_commit, version, problem_statement。
- 原始投影：{"instance_id": "astropy__astropy-12907", "base_commit": "d16bfe05a744909de4b27f5875fe0d4ed41ce607", "version": "4.3", "problem_statement": "Modeling's `separability_matrix` does not compute separability correctly for nested CompoundModels"}
- 响应 SHA-256：c6e45619b3730abeb9c84e0cc48a15da3f77e6a800d01fc45392f40006e6e037。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：HF card did not state a dataset license; upstream Astropy source repository uses BSD-3-Clause；scope：Dataset card metadata and upstream source-code license were checked; issue-text license scope was not established.；URL：https://huggingface.co/datasets/SWE-bench/SWE-bench_Verified/blob/78f471bf655a3137b2e8a75af1501690ec009ec3/README.md, https://github.com/astropy/astropy/blob/main/LICENSE.rst。

### `vibe-code-bench-1-100`
- 载体：HTML task example text；版本/快照：Official page HTML SHA-256 f5d7b6e6e3004243522c3ec8f604e5bf582e8cc51c1f309567a7d7e81ffdd736; accessed 2026-10-08.。
- 原始定位：Vals example Zeeter / iteration 1; current HTML bytes hash (differs from prior proof)。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Add a private Saved area where signed-in members can save and unsave posts from the feed, profiles, and post detail.
- 响应 SHA-256：2493c289efbe70acee331a304d11e9230c40ee7d6fc3a308a955bbb3ea24587c。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No benchmark-data reuse license located；scope：Public standalone Zeeter example on Vals page.；URL：https://www.vals-ai.com/benchmarks/vcb-1-100。

### `vibe-code-bench-v1-1`
- 载体：plain text excerpt；版本/快照：Gist revision 0bd7400df1f9d444c54350f13af2a02aac72bd67; app_instructions.txt SHA-256 c89db0c3c6d325193190060c5e9a468e55d0cb59cb9cb22b7bb799702d6e0655.。
- 原始定位：gist app_instructions.txt; pinned revision 0bd7400df1f9d444c54350f13af2a02aac72bd67。
- 原始字段路径：Title, Goal。
- 原始投影：Title: Zeeter Social Network

Goal
Deliver a simple short-form publishing platform where users share quick updates and engage with content.
- 响应 SHA-256：c89db0c3c6d325193190060c5e9a468e55d0cb59cb9cb22b7bb799702d6e0655。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：No benchmark-data reuse license located；scope：Public standalone Zeeter specification/example.；URL：https://www.vals.ai/benchmarks/vibe-code, https://gist.github.com/lgnashold/e9bba36be5e468d8f8a2f330ae8d6aea。

### `weirdml-v2`
- 载体：HTML author page text；版本/快照：prompt page SHA-256 70def5f9caddc94613cb28e84c88a276c8af4f905e0bae24dd88690f7ddfaef2。
- 原始定位：Task Prompt: Shapes (Easy), opening paragraph。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：This is a challenge to test how good you are at doing machine learning on an unknown dataset.
- 响应 SHA-256：70def5f9caddc94613cb28e84c88a276c8af4f905e0bae24dd88690f7ddfaef2。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No explicit prompt license located；scope：Author-published task prompt；URL：https://htihle.github.io/prompts/task_prompt_shapes_easy.html, https://htihle.github.io/weirdml_v2.html。

### `bullshitbench-v2`
- 载体：native JSON fields；版本/快照：questions.v2.json SHA-256 43F43D14BD20DDF17A29FAFAD2C3E9862E06C2E9C4A5BC94CF08D6EE2A6B1ECE。
- 原始定位：questions.v2.json; techniques.misapplied_mechanism.questions[id=sw_mm_01]。
- 原始字段路径：id, question, domain_group, technique。
- 原始投影：{"id": "sw_mm_01", "question": "What's the thermal conductivity of our CI/CD pipeline? We've got a build failure in the integration stage", "domain_group": "software", "technique": "misapplied_mechanism"}
- 响应 SHA-256：43f43d14bd20ddf17a29fafad2c3e9862e06c2e9c4a5bc94cf08d6ee2a6b1ece。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：MIT repository license; question-data scope not explicit；scope：Repository README and LICENSE; explicit question-data scope not found.；URL：https://github.com/petergpt/bullshit-benchmark/blob/main/README.md, https://raw.githubusercontent.com/petergpt/bullshit-benchmark/main/LICENSE。

### `facts-parametric`
- 载体：PDF table fields；版本/快照：PDF SHA-256 f079762c7a3ce79e725e79fa009fa3afd63eb3cbf77f6507c1f9901640752cb7; Table 5。
- 原始定位：FACTS benchmark paper Table 5。
- 原始字段路径：Question, Answer, URL Suffix, Topic, Answer Type。
- 原始投影：{"Question": "who played harmonica on the rockford files theme song", "Answer": "Tommy Morgan", "URL Suffix": "Tommy_Morgan", "Topic": "People (artists)", "Answer Type": "Performer"}
- 响应 SHA-256：f079762c7a3ce79e725e79fa009fa3afd63eb3cbf77f6507c1f9901640752cb7。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：No explicit dataset/example license located；scope：Official report example and public-dataset metadata；URL：https://storage.googleapis.com/deepmind-media/FACTS/FACTS_benchmark_suite_paper.pdf, https://www.kaggle.com/benchmarks/google/facts-parametric/leaderboard。

### `hle`
- 载体：HTML article excerpt；版本/快照：Scale article capture SHA-256 27668620A50CD2E81A10DD28ED4FE1825412512BD59A2960C6AE7D56A926F327。
- 原始定位：Scale article Ecology example; article excerpt only。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Hummingbirds within Apodiformes uniquely have a bilaterally paired oval bone, a sesamoid embedded in the caudolateral portion of the expanded, cruciate aponeurosis
- 响应 SHA-256：27668620a50cd2e81a10dd28ed4fe1825412512bd59a2960c6ae7d56a926f327。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：MIT metadata; explicit HLE non-distribution request also shown；scope：MIT is dataset page metadata; HLE card request covers dataset redistribution.；URL：https://huggingface.co/datasets/cais/hle, https://scale.com/blog/humanitys-last-exam-results。

### `rws-mgate`
- 载体：browser-indexed HTML text excerpt；版本/快照：RWS release 2026-08-24 SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855。
- 原始定位：Official article “Four patterns stood out,” web index lines 245–246; direct HTTP response 202/0 bytes。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：One example stumper sentence, “Everything I told you is what I thought I had said I would,” sounds awkward enough to be wrong
- 响应 SHA-256：不可用/本轮未取得。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 本轮边界：Official article “Four patterns stood out,” web index lines 245–246; direct HTTP response 202/0 bytes
- 既有许可来源记载：No benchmark data license located；scope：Public press-release example；URL：https://www.rws.com/about/news/2026/TrainAI-launches-m-gate/, https://www.linkedin.com/posts/rws-group_mgate-trainai-multilingual-activity-7510610256272441344-p-KR。

### `aime-2024`
- Source: [pinned Parquet row](https://huggingface.co/datasets/MathArena/aime_2024_I/resolve/ea5b061c3e8039dc9858defaafc407d04b995e9f/data/train-00000-of-00001.parquet); HTTP 200, 6,187 bytes; SHA-256 `e4033c704609cc7cdfe712ed410357b190733dec75aa5b54a39adc55add49393`.
- Locator/schema: row 0 of 15; native columns `problem_idx`, `problem`, `answer`.
- Exact row projection: `problem_idx=1`; `problem` is the complete original string shown below; `answer=204`.

```text
Every morning Aya goes for a $9$-kilometer-long walk and stops at a coffee shop afterwards. When she walks at a constant speed of $s$ kilometers per hour, the walk takes her $4$ hours, including $t$ minutes spent in the coffee shop. When she walks at $s + 2$ kilometers per hour, the walk takes her $2$ hours and $24$ minutes, including $t$ minutes spent in the coffee shop. Suppose Aya walks at $s + \frac{1}{2}$
kilometers per hour. Find the number of minutes the walk takes her, including the $t$ minutes spent in the coffee shop.
```
- License facts recorded: MathArena card declares CC-BY-NC-SA-4.0 for its release; the source-specific contest rights question is not resolved by that declaration. Evidence: https://huggingface.co/datasets/MathArena/aime_2024_I/blob/ea5b061c3e8039dc9858defaafc407d04b995e9f/README.md and https://maa.org/maa-invitational-competitions/.
### `aime-2025`
- 载体：native row fields；版本/快照：MathArena/aime_2025 revision c94da77eb22bbd6439e62a323bec18493a421302; train row_idx=0 / problem_idx=1; 30 rows; Parquet SHA-256 9f9066ff48ad2e31f9bf1b1ac6d5e80693195f987985f2859f89dd25ffa51c2d.。
- 原始定位：train row_idx=0; MathArena revision c94da77eb22bbd6439e62a323bec18493a421302; current API response。
- 原始字段路径：problem_idx, problem, answer, problem_type。
- 原始投影：{"problem_idx": 1, "problem": "Find the sum of all integer bases $b>9$ for which $17_b$ is a divisor of $97_b.$", "answer": 70, "problem_type": ["Number Theory"]}
- 响应 SHA-256：9ec9f2ac4995de0343728648daba6005b2182858f14f2d00a5d798e4ad127e15。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：CC-BY-NC-SA-4.0 (MathArena dataset card)；scope：MathArena dataset card declaration for the 30-row release; MAA-specific rights to contest text not established.；URL：https://huggingface.co/datasets/MathArena/aime_2025/blob/c94da77eb22bbd6439e62a323bec18493a421302/README.md, https://maa.org/maa-invitational-competitions/。

### `arc-agi-3`
- 载体：HTML text excerpt；版本/快照：Preview article SHA-256 4BACC4350908EFA0C1928F093F26AD1DB227DB6303ECE95A5C6E3FBB02EC926B。
- 原始定位：preview games table, ls20; no underlying grid。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：ls20 — Navigate a map while bringing a matching symbol to another object; the symbol must pass through transformations to reach the goal.
- 响应 SHA-256：4bacc4350908efa0c1928f093f26ad1db227db6303ece95a5c6e3fbb02ec926b。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 本轮边界：preview games table, ls20; no underlying grid
- 既有许可来源记载：No benchmark-data license found on checked official pages；scope：Website text and preview game descriptions.；URL：https://arcprize.org/blog/arc-agi-3-preview-30-day-learnings, https://arcprize.org/blog/arc-agi-3-launch, https://docs.arcprize.org/full-play-test。

### `chess-puzzles`
- Source: public Inspect `.eval` ZIP at https://epoch-benchmarks-staging-public.s3.us-east-2.amazonaws.com/inspect_ai_logs/6DcmBdRZz57U5cusZNBeGW.eval; object length 48,757,423 bytes, accepts byte ranges.
- Locator: only member `samples/1_epoch_1.json` was decompressed (646,985 compressed bytes; 936,262 uncompressed bytes); decompressed member SHA-256 `f305e7145dbb11d2b109c68dfa1a49e689010ecca1c6bf41297b4a1d30b1408a`.
- Exact native projection: `id=1`; `input="6k1/3R4/2N3p1/PpPp4/1P1r4/5r2/6K1/8 b - - 3 56"`; `target="d4d3"`; `metadata={}`. The input matches the displayed formal FEN and the stored target is `d4d3`.
- Read boundary: only `id`, `input`, `target`, and `metadata` were emitted and retained. Other fields, including messages/output/scores/events, were not emitted or stored; no other sample member was decompressed.
- License facts recorded: Epoch's benchmark data attribution page describes use/distribution/reproduction with attribution; the chess-puzzle page states question/answer property remains with creators. Evidence: https://epoch.ai/benchmarks/chess-puzzles and https://epoch.ai/benchmarks/use-this-data.
### `frontiermath`
- 载体：HTML text excerpt；版本/快照：FrontierMath Tier 4 v2 hub date 2026-06-12; sample-page SHA-256 01160B8B13B607CDEB05D36EE4B1BF3A46D73B2D99DA90B4732E3660DEE5AAB5。
- 原始定位：Tier 2 / A recursive construction on large permutations / Problem。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Let \(W\) be the set of finite words with all distinct letters over the alphabet of positive integers. Define a function \(F:W\rightarrow W\)
- 响应 SHA-256：01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No explicit problem-data license found on checked official pages；scope：Official sample page and benchmark hub.；URL：https://epoch.ai/benchmarks/frontiermath-tier-4-v2, https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems。

### `frontiermath-v2-tier-4`
- 载体：HTML text excerpt；版本/快照：sample SHA-256 01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5; v2 hub SHA-256 429dae7f5f97bd43da63f2ab692a416d3e08d5ae566ab883d040856a56aa0539。
- 原始定位：Tier 4 / An optimization problem in BMO space / Problem。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Let \[  c = \sup_{f} \int_{0}^{1} (f(t)^{3}+|f(t)|)dt\] where supremum is taken over all integrable functions \(f : [0,1] \to \mathbb{R}\) such that \(\int_{0}^{1}f(t)dt=-10\)
- 响应 SHA-256：01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No explicit sample-data license located；scope：Published sample problem；URL：https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems, https://epoch.ai/benchmarks/frontiermath-tier-4-v2。

### `frontiermath-v2-tiers-1-3`
- 载体：HTML text excerpt；版本/快照：sample SHA-256 01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5; v2 hub SHA-256 429dae7f5f97bd43da63f2ab692a416d3e08d5ae566ab883d040856a56aa0539。
- 原始定位：Tier 1 / Counting nonzero solutions of homogeneous equations / Problem; old A2 item for same ID incorrectly locates Tier 3。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：How many nonzero points are there on \([x^3y+y^3z+z^3x=0]\) over \(\mathbb{F}_{5^{18}}\) up to scaling? Answer: 3814708984376.
- 响应 SHA-256：01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 既有许可来源记载：No explicit sample-data license located；scope：Published sample problem；URL：https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems, https://epoch.ai/benchmarks/frontiermath-tier-4-v2。

### `math-500`
- 载体：native datasets-server row fields；版本/快照：see locator/source hash; no immutable revision in current sample。
- 原始定位：test row_idx=0 current rows API; prior proof pins dataset revision 6e4ed1a2a79af7d8630a6b768ec859cb5af4d3be; solution omitted。
- 原始字段路径：unique_id, problem, answer, subject, level。
- 原始投影：{"unique_id": "test/precalculus/807.json", "problem": "Convert the point $(0,3)$ in rectangular coordinates to polar coordinates.", "answer": "\\left( 3, \\frac{\\pi}{2} \\right)", "subject": "Precalculus", "level": 2}
- 响应 SHA-256：1f19cfded0869148fef2d4aeebbda764b446a3a9af3d8be1fcda5faa42eb651e。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.

### `mysterymechanism`
- 载体：HTML text excerpt；版本/快照：page SHA-256 6b14df833ee0f35b42e3626d2ae64a38d7e458723eb48707e42416b2c3dcb769。
- 原始定位：first frozen example; source HTML contains rendered text rather than a JSON row。
- 原始字段路径：非结构化原文，无 JSON 字段路径。
- 原始投影：Agent-visible question
Recover an executable mathematical expression mapping the anonymous inputs to one measured output.
Bounds
x1 ∈ [0.05, 0.70]
x2 ∈ [0.05, 30.0]
- 响应 SHA-256：6b14df833ee0f35b42e3626d2ae64a38d7e458723eb48707e42416b2c3dcb769。
- 省略范围：Only the shown original text excerpt is represented; surrounding page/document content omitted.
- 本轮边界：first frozen example; source HTML contains rendered text rather than a JSON row
- 既有许可来源记载：No explicit example-data license located；scope：Published frozen example；URL：https://www.vals.ai/benchmarks/mysterymechanism。

### `simplebench`
- 载体：native JSON fields；版本/快照：simple_bench_public.json SHA-256 4ea0bb96b35f61c97dbf5a7dc059986398441f0cbb17fa709ae2b0e9ba4f76e4。
- 原始定位：eval_data[question_id=4]; options omitted。
- 原始字段路径：question_id, prompt, answer。
- 原始投影：{"question_id": 4, "prompt": "There are two sisters, Amy who always speaks mistruths and Sam who always lies. You don't know which is which.", "answer": "C"}
- 响应 SHA-256：4ea0bb96b35f61c97dbf5a7dc059986398441f0cbb17fa709ae2b0e9ba4f76e4。
- 省略范围：Other source fields omitted; the projection preserves the listed native source paths.
- 既有许可来源记载：MIT repo license; dataset coverage unclear；scope：README identifies benchmark input but does not explicitly license question text.；URL：https://raw.githubusercontent.com/simple-bench/SimpleBench/main/LICENSE, https://raw.githubusercontent.com/simple-bench/SimpleBench/main/README.md, https://raw.githubusercontent.com/simple-bench/SimpleBench/main/simple_bench_public.json。

## 跨条目字段事实

- SWE-bench、SWE-bench Verified、SWE-bench Pro、SWE-bench Multilingual 的 datasets-server 响应均有 `instance_id`、`base_commit`、`version`、`problem_statement` 原列名；旧 proof 的 `problem_statement_excerpt` 是本地标注而不是原始列。
- 当前 `frontiermath-v2-tiers-1-3` 样例对应 Tier 1 “Counting nonzero solutions…”；旧 `all-cases-a2` 同 benchmarkId 的原始记录定位为 Tier 3 Tsirelson space，二者不是同一道题，本报告按正式样例当前 Tier 1 定位。
- RWS 当前直接 HTTP 返回 202/0 字节；浏览器索引可见官方文章 “Four patterns stood out” 第 246 行的例句。响应体哈希因此留空。
