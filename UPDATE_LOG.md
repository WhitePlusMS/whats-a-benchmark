# 更新说明

## 2026-09-23 — 无站内样例入口修复与五条官方数据接入

- 原因：用户发现“没有站内样例”可能被误读为“benchmark 没有数据”，并要求所有无样例条目提供准确外部入口，同时研究用户自行下载官方数据后选取一条真实记录公开展示的合规流程。
- 逐项复核 71 个无 `sampleSet` 条目的 `dataAccess`、`sampleAccess` 与证据链接。专项 197 个去重入口没有确认失效链接；13 个 403 属官方站访问策略，2 个 HEAD 客户端失败经 GET 为 200。审计明细写入 `artifacts/source-link-audit.json`。
- 14 个重点条目修正泛主页、错误的数据含义或缺失的访问入口；另为 DeepSWE、SkillsBench、Terminal-Bench 2/2.1、MathVista、LifeSciBench、MMMU、MCP-Atlas、MMMLU 增加精确官方任务页、示例页或 Viewer。相关 `content/benchmarks/*.json`、`docs/research/benchmarks/*.md` 和存在的候选副本保持同步。
- 全站审计发现 BFCL 两个旧博客锚点底页已 404，改用官方 GitHub 数据 README 的 V1 分类和 Evaluation 位置；同步修正 BFCL V4 计分 Agentic 与非计分 Format Sensitivity 的规模口径。新链接均返回 200。最终覆盖更新 `artifacts/source-link-audit.json`，复核 547 个来源/发布链接；唯一 HEAD 404 为 GET 200 的 StepFun 官方页面，没有剩余经 GET 确认的 404。
- `SampleViewer.vue` 对没有专用样例入口的条目使用 `sampleAccess.sourceUrls[0]` 显示“查看官方说明”；`DetailView.vue` 对没有专用数据入口的条目显示“查看官方访问说明”。只有数据公开且 `reusePolicy=permitted` 时才提示用户提交本地下载文件复核，避免鼓励复制受限数据。
- `content/benchmarks/genebench-pro.json`、`mcp-atlas.json`、`mmmlu.json`、`mrcr.json`、`mrcr-v2.json` 各新增一条来自官方固定版本的真实记录，并同步 reaudit 候选与研究档案。长上下文使用明确标注的真实节选；MCP-Atlas 不含 claims、trajectory 或外部服务返回。
- `content/assets/licenses/` 新增或复用覆盖数据本身的 MIT、CC BY 4.0、Apache-2.0 许可原文；`artifacts/research/` 保存 MRCR 两项的下载版本、文件哈希、行位置与行哈希。当前站内样例由 13 个 benchmark、22 条增至 18 个 benchmark、27 条。
- 新增 `docs/research/2026-09-23-downloadable-sample-candidates.md` 与 `docs/LOCAL_SAMPLE_IMPORT.md`：接入前 71 项分为 A 类 5 项、B 类 44 项、C 类 22 项；A 类已完成接入，当前剩余 66 项。README、产品设计和内容维护手册同步当前数量及用户本地数据导入门槛。
- 最终检查通过：84 条公开内容、27 条样例、17 份发布资料；75 份 reaudit 候选；严格 TypeScript；12 项自动测试；生产构建 90 个路由并通过 89 个静态页面与 Pages 404 检查。全局 `npm`/`npx` 启动器仍指向缺失文件，本轮使用项目内执行器，未改用户全局环境。
- 真实浏览器覆盖五条新增样例、SkillsBench、GPQA 与 OpenAI 内部评测；375px 宽度无整页横向溢出，控制台无警告或错误。4173 启动时被其他进程占用，本轮改用 4174 并只停止自己启动的预览；最终 4173/4174 均无监听。重新生成 `artifacts/benchatlas-static.zip`：3,165,615 字节、263 个条目，含 84 个详情页、18 份样例 JSON、11 份许可、首页、404 与 `.nojekyll`。

## 2026-09-23 — 国内六家模型发布页与九项 benchmark 扩展

- 原因：用户要求继续核查智谱、DeepSeek、Kimi、MiniMax、阶跃星辰和通义千问的官方模型发布页，从厂商公开成绩表中识别尚未收录的 benchmark，并继续遵守真实来源、版本分离和不编造样例的要求。
- 新增三份厂商研究记录：`docs/research/2026-09-23-china-releases-zhipu-deepseek.md`、`2026-09-23-china-releases-kimi-minimax.md`、`2026-09-23-china-releases-stepfun-qwen.md`。所有搜索、发现和官方来源核对由 GPT-6 Luna 完成，主任务负责证据审核、正式内容集成与验收。
- `content/releases.json` 新增 `glm53-flash`、`deepseek-v41-flash`、`kimi-k3`、`minimax-m3`、`step5-preview`、`qwen38` 六份官方发布资料，发布记录总数由 11 增至 17。厂商材料统一标为 `vendor-report`，只表达“该厂商发布资料引用了此评测”。
- `content/benchmarks/` 新增 `babyvision.json`、`deep-swe-v1-1.json`、`ifbench.json`、`nl2repo-bench.json`、`paperbench.json`、`skillsbench.json`、`terminal-bench-2-1.json`、`toolathlon-verified.json`、`vending-bench-2.json`，目录由 75 项增至 84 项。
- 九项均新增同 ID 的 `docs/research/benchmarks/<id>.md` 研究档案，并在 `artifacts/candidates/domestic-release-expansion/` 保留隔离候选。正式内容逐项记录官方定义、任务协议、数据范围、访问/复用边界、指标、版本关系及厂商引用。
- 保留 Terminal-Bench 2.0、2.1、4.0 为三个独立版本；IFBench 与 IFEval 只建立关系；Step 5 明确为 Preview/API 可用且开放权重仍是页面计划；智谱 GLM-5.3-Flash 专题页与官方仓库日期冲突没有静默合并。
- 九项未加入 `sampleSet`。原因是本轮没有同时核实到可公开再分发、可定位至真实记录且不会违反数据卫生或受控访问要求的样例；站内仍为 13 个 benchmark、22 条真实记录，没有用模型生成内容补数量。
- `tests/search.test.ts` 新增九个正式名称的唯一匹配回归，并检查 Terminal-Bench 2.0、2.1、4.0 不互相碰撞；`README.md`、`docs/PRODUCT_DESIGN.md`、`docs/CHINA_MODEL_RELEASE_PROGRESS.md` 与 `docs/VERIFICATION.md` 同步数量、采用范围和维护边界。
- 最终检查通过：84 条公开内容、22 条样例、17 份发布资料；严格 TypeScript；12 项自动测试；生产构建渲染 90 个路由，静态检查确认 89 个页面和 Pages 404。全局 `npm`/`npx` 启动器损坏，本轮使用项目内执行器完成检查，未改动用户全局环境。
- 真实浏览器覆盖桌面首页、17 张发布资料卡、Terminal-Bench 2.1 详情，以及 375px 实际内容宽度下的九个新增详情页；无整页横向溢出，控制台无警告或错误。临时视口已恢复，验收标签已关闭。
- 重新生成 `artifacts/benchatlas-static.zip`：3,142,760 字节、253 个条目，包含 84 个详情页、13 份样例 JSON、根首页、404 与 `.nojekyll`。本轮没有部署、推送或启动开发服务；验收用 4173 预览已停止，4173/4174 均无监听。

## 2026-09-23 — 75 项 benchmark 官方来源重审与证据结构迁移

- 原因：现有详情把任务、数据格式、访问状态和样例说明压在少数字段中，部分文字无法稳定回指 benchmark 官方 README、数据卡或论文；用户要求逐项按官方材料重审，禁止用模型厂商报告或推测补齐。
- 新增 `docs/BENCHMARK_REAUDIT_PROGRESS.md` 作为唯一进度台账。75 项均建立同 ID 的 `docs/research/benchmarks/<id>.md` 证据记录，并在 `artifacts/candidates/reaudit/` 保留与正式内容逐字符串一致的审核候选。
- `src/content/schema.ts` 已切换为唯一正式结构：官方定义、任务合同、数据概况、访问状态、复用政策、样例状态、指标、限制、关系和来源角色。旧字段与临时双 schema 已删除，不保留向后兼容。
- `scripts/validate-reaudit-candidates.ts` 与 `content:reaudit-check` 全量核对 75 份候选、研究结论、迁移前稳定身份、证据 URL、来源角色、数据栏目、复用范围和样例许可组合；三组各 25 项的 GPT-6 Luna 交叉复核及最终全量校验均通过。
- 75 份正式内容已一次性迁移到新结构；迁移前版本保存在 `artifacts/content-pre-reaudit/benchmarks/`，只用于稳定身份审计。网站、搜索、卡片、详情、对比和样例组件均只读取新结构。
- 详情页按“官方定义—任务协议—数据与使用边界—真实样例—评分方法—关系—官方资料”展示，每个事实区块直接列出依据；模型厂商报告单独列为“模型发布资料中的引用”，不再混入 benchmark 官方资料。
- 样例复核后保留 13 个 benchmark 的 22 条真实记录。Finance Agent、MCP-Atlas、MMLU、MMMLU、SWE-bench Verified 的 8 条旧样例因回源、split 或转载证据不足撤回，没有用推测内容补位。
- 更新 `BenchmarkCard.vue`、`DetailView.vue`、`CompareView.vue`、`ExploreView.vue`、`SampleViewer.vue`、`EvidenceLinks.vue`、搜索与标签映射，使目录状态、来源角色、访问/复用边界和部分核验状态可见。
- 最终验证：75 份候选严格校验、75 条正式内容与 22 条样例校验、严格 TypeScript、11 项测试和生产构建全部通过；构建生成 81 个路由页面并通过静态产物检查。
- 重新生成 `artifacts/benchatlas-static.zip`：3,063,798 字节、147 个条目；压缩包内含 75 个详情页、13 个样例 JSON、根首页、404 与 `.nojekyll`。
- 真实浏览器验收覆盖 APEX-Agents、GSM8K、HealthBench 和双条目对比：官方来源分区、真实样例、禁止转载说明及模型报告分离均正确。390px 宽度无整页横向溢出，刷新后控制台无错误。
- 搜索、资料探寻、残留扫描和三组内容交叉复核均由 GPT-6 Luna 执行；主任务负责结构设计、正式迁移、自动检查和浏览器验收。只启动了本任务临时生产预览，并在验收后停止；未启动开发服务、未部署或推送。

## 2026-09-23 — 第一批五项 benchmark 官方来源研究

- 原因：BenchAtlas 官方来源重审按批次推进，需要将评测定义、访问状态、数据/代码/媒体许可、版本与公开样例边界逐项追溯到第一方资料。
- 新增 `docs/research/benchmarks/apex-agents.md`、`arc-agi-2.md`、`arc-agi-3.md`、`arena-hard-v2.md`、`chatbot-arena.md`：分别整理五项评测统一栏目、官方来源与逐项位置锚点、未核实项和研究状态。
- APEX-Agents 明确区分原版 480 tasks/33 worlds 与 1.1 版 240 tasks/31 worlds；记录 HF gated 需要同意分享联系信息，及 CC-BY-4.0 标签与 evaluation-only、禁止爬取/抓取限制并存，未访问受限文件。
- ARC-AGI-2 区分公开 training/evaluation 和非公开 holdout，记录公开仓库 Apache-2.0 与 evaluation 泄漏边界；ARC-AGI-3 区分交互任务、135 环境数据划分、MIT 工具代码和未获数据/媒体许可的环境记录。
- Arena-Hard-v2.0 明确官方名称为 v2.0-Preview、500 hard + 250 creative-writing prompts、judge/config 影响和题源许可待逐条确认；Chatbot Arena 区分动态平台与 33K/57.5K 两个公开快照、评分方法和数据使用边界。
- 本批只新增 research Markdown 和更新说明；未改 `content`、源码、生成产物，也未读取 gated benchmark 数据。各条样例转载结论均按官方来源及现有授权证据给出。

## 2026-09-23 — 启动 75 项 benchmark 官方来源重审

- 原因：用户通过 APEX-Agents 发现现有任务概述没有稳定回指 benchmark 官方 README/数据卡，参考资料也缺少直接数据入口并混入模型厂商报告。问题涉及全目录，不能只修单条。
- 新增 `docs/BENCHMARK_REAUDIT_PROGRESS.md`：列出全部 75 项评测的研究、正式内容和验收状态，并写明统一完成标准、架构任务与执行记录。后续所有批次以此文件为唯一进度台账。
- 本步骤只建立跟踪基线，没有修改正式 benchmark 内容、页面或生成产物；下一步先完成新 schema 与 APEX-Agents 试点，再按五批逐项研究和迁移。
- 搜索、资料探寻和官方来源查证全部交由 GPT-6 Luna；主任务负责结构设计、证据复核、正式内容集成和验证。
- 第一批 15 项已新增独立证据记录至 `docs/research/benchmarks/`：1 项 PASS、12 项 PASS_WITH_LIMITATIONS、2 项 PARTIAL。APEX-Agents 已区分原版 480 任务/33 worlds 与 1.1 的 240/31；AIME 2024/2025 因缺少 MAA 第一方 AI 数据包、split 和转载授权保持 PARTIAL，不再用模型报告补齐。
- 第一批同时逐字段复核了 BenchCAD、BFCL、AutomationBench 的站内真实样例；BrowseComp 与 BrowseComp-ZH 保持防泄漏边界。当前仅更新研究证据和进度台账，正式内容迁移等待新 schema 一次性落地。
- 第二批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。重点澄清 GDPval 原始 benchmark 与 GDPval-AA 第三方 Agent 协议、GeneBench-Pro 完整集与公开代表案例、GPQA 的禁止在线披题要求，以及 CMMLU/FrontierMath 的官方来源冲突；冲突未被静默合并。
- 第三批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。记录 HealthBench 系列和 HLE 的公开披露限制、LifeSciBench 的许可/隐私/专有/生物安全附件边界、LiveCodeBench 竞赛题权利、LongBench 21 个上游来源，以及 MATH-500、MathVista、MBPP 的数据与媒体许可范围。
- 第四批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。研究发现 MCP-Atlas 现有样例把官方 500 条公开子集误标为 `train`，MMMLU 第二条样例的题面、标题和答案语义不一致，正式迁移前必须纠正或撤回；同时区分 MMMU 媒体权利、MRCR 两种实现、OfficeQA gated 变体和 OSWorld 各版本。
- 第五批 15 项独立研究记录已完成。全目录现有 75 份与正式 benchmark ID 同名的证据文件，每份均通过 13 栏结构检查；结论为 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL。修正 4 个研究文件 ID（C-Eval、Chatbot Arena、CursorBench 4.0、HumanEval），确保后续迁移可与正式内容一一映射。
- 第五批复核了 SciCode、Small Overlapping Speech Bench 与 τ-bench 的现有样例；ScreenSpot-Pro、SimpleQA 保持 PARTIAL。SWE-bench、Terminal-Bench 各版本分别记录，Video-MME 与 WANDR 的媒体/第三方材料边界未被代码许可证覆盖。
- `docs/BENCHMARK_REAUDIT_PROGRESS.md` 新增唯一候选结构：官方定义、任务合同、数据概况、访问状态、复用政策、样例状态、带来源的指标/限制/关系和明确来源角色。候选先隔离在 `artifacts/candidates/reaudit`，避免正式内容在迁移中同时支持新旧结构。
- `schema.ts` 新增隔离候选的严格 `reauditedEntrySchema`，`validate-reaudit-candidates.ts` 与 `content:reaudit-check` 提供逐文件校验。它拒绝旧字段、中文自由状态值、未登记的证据 URL、模型厂商报告冒充非内部官方定义、样例状态/许可不一致和缺少访问入口；当前正式站点仍只读取旧 schema，候选全部通过后再一次性切换。
- 首轮 75 份候选全部生成，但严格校验发现各小组宽泛自检未统一枚举、数组类型、证据引用和旧字段删除，未进入正式内容。校验脚本增加按 ID 分组执行能力，要求三个小组分别修复到零错误后再进行全量审核。
- 三组候选均按严格 schema 重构后，全量输出 `[reaudit] 75 candidates passed strict validation.`；候选与现有正式内容的稳定 ID、名称、顺序、分类、发布方、年份和类型核对为零差异。研究状态同步为 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL。
- 样例重审后候选保留 13 项共 22 条真实样例；Finance Agent、MCP-Atlas、MMLU、MMMLU、SWE-bench Verified 共 8 条旧样例因无法满足当前第一方回源、split 或第三方转载证据门槛而撤回，未用推测修补。

## 2026-09-23 — 代理类 benchmark 第二轮真实样例核验

- 原因：用户要求展示尽可能多的真实 benchmark 记录，并明确禁止编撰；本轮仅做官方来源和许可证据整理，不改正式内容或源码。
- 新增 `artifacts/candidates/samples-agent-round2.json`：保存 MCP-Atlas 的官方 CC-BY-4.0 真实记录字段、Terminal-Bench 2.0 有条件候选，以及 τ²-bench、OSWorld 2、OfficeQA、GDPval、SWE-bench Multilingual、WANDR、Terminal-Bench Science/4.0 的暂缓原因和官方证据 URL。
- 新增 `docs/research/2026-09-23-samples-agent-round2.md`：记录每条样例的 ID、split、原始字段、精确第一方来源及许可结论；明确排除参考解法、隐藏测试、答案键、工具轨迹和来源许可不清的第三方材料。
- MCP-Atlas 数据卡直接声明 CC-BY-4.0，因此题面与 TASK ID 可署名展示；其 GTFA_CLAIMS 和 TRAJECTORY 不进入候选字段，控制答案泄漏。
- Terminal-Bench 2.0 的题目位于根许可证标注 Apache-2.0 的官方任务仓库，但未发现独立数据卡；因此只列有条件候选，不将其写成独立数据许可证。
- OfficeQA 的访问条件限制答案键使用；OpenAI GDPval 数据卡未声明再发布许可；OSWorld V2 任务/素材 gated；其他项目分别存在第三方来源授权、canary 防污染或数据许可范围未明问题。本轮均不将其并入正式内容。

## 2026-09-23 — 扩展真实样例与多媒体展示

- 原因：用户要求尽可能多地展示 benchmark 官方真实记录，并支持文字、代码、图片、音频、视频及附件；严格禁止编撰。
- 进度：[x] 现有样例架构审查；[x] 多媒体 schema 与组件；[x] 三轮真实数据采用与排除审查；[x] 扩大公开数据核验；[x] 完整构建与浏览器验收。
- `src/content/schema.ts`：样例类型新增 `audio`、`video`、`record`；媒体统一为严格 `assets` 联合结构，支持图片、音频、视频、字幕、海报和普通附件。媒体型样例必须包含同类型真实附件；每项评测精选样例上限由 3 条调整为 6 条。
- `SampleViewer.vue`：使用浏览器原生控件展示媒体，禁止自动播放；支持官方字幕、官方转录文本、附件链接、媒体独立来源及加载失败提示。本站说明继续与原始记录分开。
- `content-pipeline.ts`、`verify-public-output.ts`：媒体、海报、字幕和附件全部进入安全路径、引用复制与产物残留检查；单个发布附件设置 25 MiB 项目预算，超限时必须采用经许可的轻量真实片段或官方入口。
- `tests/content.test.ts`：更新图片结构测试，新增音频、视频、字幕及媒体类型不匹配的校验用例。现有正式内容没有图片型样例，因此本次不需要旧字段迁移。
- 新增 `docs/research/2026-09-23-sample-architecture-audit.md`；来源搜索与样例发现按用户要求由 GPT-6 Luna 执行，主任务负责真实性、许可与正式接入审核。
- `content/benchmarks/benchcad.json`：接入官方 `QA/test_data/records.jsonl` 的 2 条真实问答记录，保留 record_id、family、qa_pairs 与数值答案标签，并增加官方数据文件和 CC BY 4.0 数据集卡来源。
- `content/benchmarks/automationbench.json`：接入官方 simple domain 的 example_id 3001，展示原始用户请求、模拟邮件、联系人初始状态和验收断言；许可说明明确排除第三方 API schema 材料。
- `content/benchmarks/agents-last-exam.json`：接入官方 `demo/hello` task card 的真实字段，仅将 summary 作为任务摘要展示，不扩写完整题目或答案。
- 新增 `docs/research/2026-09-23-samples-text-code.md`、`docs/research/2026-09-23-samples-media.md` 与两份候选清单。首轮媒体核验发现 Chartography、ARC-AGI-3 等虽有官方可视内容，但独立媒体再发布权未确认，因此仅保留研究记录，没有下载、热链或写入正式样例。
- `docs/CONTENT_MAINTENANCE.md`：同步 8 种样例形式、每项最多 6 条、媒体目录/字幕/25 MiB 限制，以及第一方来源与数据许可双重核验规则。
- 第一批接入后验证：74 条公开内容完成生成，TypeScript 检查和 11 项生命周期/结构测试通过；站内真实样例由 19 条增至 23 条。
- `content-pipeline.ts`、`types/benchmark.ts`、`ExploreView.vue`：目录投影新增自动计算的 `sampleCount`；首页由“拥有样例的评测数”改为展示真实样例记录总数，并同时注明覆盖评测数，避免把 13 个样例组误读成只有 13 条数据。
- `tests/content.test.ts`：为目录 `sampleCount` 增加有样例和无样例两种断言，保证后续增删数据时首页总数跟随正式内容自动变化。
- `content/benchmarks/bfcl.json`：接入 BFCL V4 `simple_python_0`、`simple_python_1` 两条官方数据记录，原样保留 question 与 function；源记录没有标准答案，因此页面不补造调用结果。条目公开状态依据 BFCL 数据目录的 Apache-2.0 声明完成核实。
- `content/benchmarks/mcp-atlas.json`：接入官方公开 train split 的任务 `689f4d693e212e8ef3390731`；只展示原始 TASK 与 PROMPT，不复制 GTFA_CLAIMS、TRAJECTORY 或工具清单。
- 新增 `content/benchmarks/small-overlapping-speech-bench.json`、两段 `content/assets/audio/` 原始 MP3 与本地署名许可说明：加入 LAION Small Overlapping Speech Bench 及 `clip_000`、`clip_001` 两条 test 记录，播放器、参考 transcript、逐说话人时间与原始字段均可核对。官方没有给出年份、版本或别名，因此不推测补齐。
- 两段音频从候选中已核验的官方固定 URL 下载，未转码或裁剪；文件分别为 422,253、335,853 字节，SHA-256 为 `96CE8FE481481559BD3F2B2B566380AB1B83DE7A7D6F67AED4D1A530FE635DAA`、`AD8E304656636F7C1D944FFD064B266A8FBDA0271F518C8EDD594F6A52AA7288`，均带 MP3 ID3 头。
- `content/benchmarks/scicode.json`：接入官方 dev 数据中的 `ewald_summation` 子任务 10.1，只保留逐字题面与身份字段，不公开 ground-truth code、测试或参考输出。
- `content/benchmarks/tau-bench.json`：接入原版 retail `TASKS_DEV[0]` 的真实 instruction 与 user_id，排除 actions 参考结果，并明确标注官方已将该批任务列为过时版本。
- 第三轮另核验 CMMLU 真题，但 CC BY-NC-SA 的非商业和相同方式共享条件尚未确认适用于本站，因此只保留条件候选；APEX、GAIA、BrowseComp-ZH、Terminal-Bench 等发布方限制抓取、重分享或训练语料收录的内容继续不转载。
- `README.md`、`AboutView.vue`、`PRODUCT_DESIGN.md`、`VERIFICATION.md`：同步 75 个 benchmark、18 组 30 条真实样例、8 种展示类型、媒体权利边界、音频校验值和本轮构建/测试结果；上一轮 74 条内容的验收记录保留为历史快照。
- 浏览器目视验收发现音频初始显示 `0:00 / 0:00` 容易被误认为加载失败；`SampleViewer.vue` 将音频预载由 `none` 调整为 `metadata`，进入页面即可显示官方文件时长，仍不自动播放或预下载完整音频。
- 真实浏览器验收：首页显示 75 个评测、30 条真实样例和覆盖 18 个评测；两段音频可播放/暂停、显示 0:26/0:20 时长，换题会收起答案并重置模式；参考 transcript、原始 JSON、记录 ID、test split、CC BY 4.0 与本地许可链接均可展开。BFCL、MCP-Atlas、SciCode、τ-bench 的新增题面和来源也已逐页加载核对。
- 浏览器没有样例、媒体或运行错误。开发页导航会报告 `vite-ssg` 内部仍使用 `next()` 的 Vue Router 弃用警告，定位在依赖包 `node_modules/vite-ssg/dist/index.mjs`，项目自己的守卫未使用该旧写法；未修改依赖产物掩盖警告。
- 首次类型检查没有进入 TypeScript，因为当前系统 npm wrapper 错误指向不可读取的 `%AppData%` npm 副本；改为显式调用项目本地 `vue-tsc` 后发现并立即修复媒体引用的两处真实编译错误，复查通过。未安装或修改全局工具。
- 最终验收：内容生成得到 75 条公开评测、18 份样例文件和 30 条真实记录；严格 TypeScript、11 项测试、生产构建及产物校验全部通过。最终根路径构建含 80 个静态路由与独立 404；`artifacts/benchatlas-static.zip` 为 2,838,520 字节、154 个压缩条目，已核对 75 个详情页、18 个样例 JSON、两段音频、许可文件、`index.html`、`404.html` 与 `.nojekyll`。本轮没有启动或停止用户服务，没有提交、推送或部署。

## 2026-09-23 — 从官方模型发布资料扩展评测收录

- 原因：用户提供的 Claude Opus 5.5 官方成绩表暴露新评测与版本缺口，要求通过多家官方发布表广泛搜集评测资料。
- 进度（当前工具无 TodoWrite）：[x] 确定来源与版本核验规则；[x] 多厂商候选研究；[x] 内容与报告映射审核合并；[x] 类型/内容/构建与浏览器验证；[x] 更新数量与交付记录。
- 使用 research 技能组织来源研究；第一批任务因额度限制中断。用户指定后，所有搜索探寻任务改由 GPT-6 Luna 执行，主任务负责审核和集成，不调用网页端 GPT。
- 新增 `docs/RESEARCH_WORKFLOW.md`，说明从官方报告发现、追溯原始评测、区分版本与运行设置、核验样例许可及候选审核流程；复用现有单文件内容架构，不新增后台或成绩排名数据库。
- `tests/search.test.ts` 新增官方 Opus 5.5 九行名称回归测试，要求每行准确且唯一映射，并确认 Terminal-Bench 2.0、OSWorld、GDPval-AA 旧条目仍可独立识别；防止扩充内容导致同名版本误匹配。
- `docs/research/2026-09-23-collection-summary.md` 汇总三组来源、截图九项逐条映射、采纳修正和未收录边界；三个厂商组研究文档保存具体原始链接与候选形成过程，供后续新增和核验复用。

- 最终验证：74 条、19 个样例、11 份报告通过内容校验，TypeScript 与 11 项测试通过；根路径构建完成 80 个页面及独立 404。SSG 清理占用由现有有限重试处理，完整产物检查通过。
- 真实浏览器验证：截图九名称均唯一匹配；74 张目录卡片和 61 个 Logo 实例加载，11 张报告卡；FrontierCode 私有提示/数据结构、Cursor 手机搜索、OSWorld 新旧版本跳转与刷新正常。1280px 桌面和 390px 手机无整页横向溢出，正常流程控制台无警告或错误。
- `docs/VERIFICATION.md`、采集汇总和 `artifacts/benchatlas-static.zip` 同步交付：静态包 2,193,675 字节、142 项，已打开核对 74 个详情、31 个 Logo、10 个样例文件及 Pages 必备文件。
- 临时视口已恢复、验收标签已关闭、本任务 4173 生产预览已停止；未启动开发服务，未操作用户已有服务，未提交、推送或部署。

## 2026-09-22 — 单条内容文件与维护生命周期

- 原因：新增、更新、删除涉及多处登记，旧采集脚本可以覆盖正式内容；按最简原则保留 Vue 页面和静态架构，统一内容入口与发布校验。
- 进度清单（当前工具无 TodoWrite）：[x] 数据无损迁移；[x] 结构/引用校验与公开产物生成；[x] 新建/发布/归档/删除工具；[x] 页面接入与题型声明；[x] 测试、构建、浏览器验收；[x] 维护文档与交付。
- 第一阶段：通过一次性脚本导出原始 49 条记录与样例核对基线，迁移至 `content/benchmarks`，共享分类、标识、发布资料和附件集中在 `content`；添加构建期结构校验依赖，避免手写两套字段定义。
- `src/content/schema.ts`、`scripts/content-pipeline.ts`：统一字段结构、题型检查、ID/引用/日期/附件校验；草稿在生成前过滤，样例独立输出，标识与许可仅发布被引用的素材。`.generated` 是可重建产物，页面只读取其中的已验证数据。
- 页面接入：目录只显示已发布条目，归档详情保留并说明本站归档原因；移除全局核验日期；代码题按 type 渲染，并实现已声明的图片题型。迁移接入中暴露 About 页旧日期导入，已立即修复，TypeScript 通过。
- `content-maintenance.ts`、`content-cli.ts` 与模板：提供新建草稿、发布、转草稿、归档、删除影响查询及阻止有引用条目的删除；状态切换先校验再保存，操作追加更新日志。
- `verify-public-output.ts`、`postbuild.ts`：检查实际构建目录中的详情、样例、附件清单和样例内容，阻止遗漏、陈旧数据与删除残留；来源检查脚本直接读取正式内容。
- 迁移逐字段与哈希核对通过：49 条原有元数据、19 个样例的题面/答案/来源/许可、顺序及 33 个附件内容不变。旧 public 样例/附件目录与两份登记文件移至忽略的 `artifacts/content-migration-backup`，不再参与构建，结果见 `artifacts/content-migration-check.json`。
- 两份 prepare 脚本改为仅写入 `artifacts/candidates`，不触碰正式内容与登记清单；候选不会进入构建。本轮未重新采集上游数据。
- 浏览器自查补齐归档行为：DetailView 隐藏归档条目的新增对比入口，归档原因单独显示以避免重复句号；CompareView 对历史链接中的归档条目标注状态。子路径构建出现一次 Windows 临时目录 EBUSY，重新执行后通过，没有修改依赖或绕过检查。
- 后续完整构建复现 SSG 临时目录清理 EBUSY：检查已安装 vite-ssg 实现与 Node 官方 rm 文档后，新增 `scripts/build-site.ts`，构建前精确清理自有临时目录，仅对构建末尾该目录的 EBUSY/rmdir 执行最多 5 次退避清理，并强制执行原产物校验。其他错误继续失败；不修改依赖、不全局替换文件系统方法。
- 连续子路径/根路径构建进一步暴露 Vite 清理旧 dist 时同类 EBUSY；构建前将自有 dist 同样以 Node 有限重试方式清理，避免依赖内部不重试的同步清理。临时目录和 dist 均拒绝符号链接，不触及作者内容。
- `tests/content.test.ts`：新增 7 项生命周期和数据边界测试，连同 3 项既有搜索测试，10 项全部通过。覆盖草稿隔离、失败发布不改源文件、独立日期、引用阻止删除、归档、样例撤回、旧产物残留及非法题型结构。
- `README.md`、`docs/CONTENT_MAINTENANCE.md`、`docs/adr/0003-content-lifecycle.md`：补全逐字段说明、命令、版本规则、样例题型、共享资源和候选发布边界；更新 Logo 文档和旧设计文档的架构替代说明，避免维护者继续编辑旧登记文件。
- 完成临时条目的新建→发布→归档→删除实测；真实浏览器确认归档不参与搜索、详情提示与历史对比状态、图片题型、390px 布局，以及正式 MMMLU 单选/答案/原始数据/切题重置。1920px 最终目录有 49 张卡片，Logo 全部成功加载；HumanEval 依据 type 显示代码格式。正常流程无浏览器警告或错误。
- 根路径与项目子路径构建通过；最终根路径构建实际触发临时清理重试并通过完整产物检查。49 个正式条目、10 组共 19 个样例、33 个附件保留；测试内容和图片均已删除，源目录、生成目录和 dist 均无测试标记。
- 更新 `docs/VERIFICATION.md` 与静态包 `artifacts/benchatlas-static.zip`：2,065,175 字节、112 项，核对 49 个详情、26 个 Logo、10 个样例文件、404.html 与 .nojekyll。已停止本任务生产预览，4173/4174 无监听；浏览器视口已恢复。未启动开发服务，未提交、推送或上线。

## 2026-09-22 — 优化资料站文案、页面层级与连续查阅

- 用户确认实施上一轮参考 VibeHub 得出的优化方向。保留现有数据、来源与 Vue 3 静态架构，优先改善查阅效率。
- `ExploreView.vue`、`BenchmarkCard.vue`：删除大型宣传区、重复副标题与导读句；首页前置搜索和目录；对比操作增加文字；列表视图进入 URL，清空筛选保留视图和排序。
- `DetailView.vue`、`SampleViewer.vue`：改用“任务概述、任务样例、评分方法、版本与衍生评测、参考资料”等中性栏目，样例优先展示，数据结构与记录许可按需展开；原题、中文说明、答案、来源及许可继续区分。
- `GuideView.vue`、`AboutView.vue`、`ReleasesView.vue`、`CompareView.vue`、`App.vue`：统一页面名称和对比操作名称，移除装饰性英文标题与面向读者无用的实现说明。
- 新增 `src/composables/catalogNavigation.ts`，更新 `src/main.ts`：按应用实例记录目录 URL 与离开时的滚动位置，让详情返回目录恢复筛选、排序、视图和位置；静态预生成之间不共享状态。
- `main.css`、`responsive.css`：删除旧首页宣传图样式，压缩页头和空白，统一中性色，保留品牌强调色，文字按钮与手机布局适配。
- 当前工具未提供 TodoWrite，以本节记录进度：文案、目录、详情、视觉集成、构建、浏览器验收和自行审核均完成。依照用户最新要求，本轮不以网页版 GPT 复审作为完成条件。
- 已完成阶段性 TypeScript 检查，无编译错误；未启动开发服务。
- `ArcTask.vue`、六组样例 JSON 与两份样例制备脚本：精简中文解读中的重复自证句，统一“原始数据”用词；原始任务字段、来源、许可和答案数据保持原样，ARC 中文操作提示同步更新。
- `README.md`：同步资料站定位、URL 浏览状态和样例交互。`scripts/postbuild.ts` 将旧标题文本检查改为稳定任务/样例栏目检查；首轮构建在旧标题断言处失败，修正后完整构建通过。
- 样例选择题使用原生单选与可点击标签，切题或切换评测清空选择；不计算分数。真实浏览器已确认 SWE-bench 样例与数据结构可展开、原始数据可切换。锚点调整移除重复顶部偏移，防止样例跳转多留空白。
- 独立源码复核发现中等屏宽下两列卡片规则会覆盖列表单列规则，改为 `.cards.list-view` 明确列表优先级，并纳入浏览器验收。
- 自查修正 `App.vue` 的目录链接：在目录页使用当前 URL，在详情页使用已记录的目录 URL，避免当前筛选被旧状态替换。用户最新要求本轮自行审核，后续以源码自查、自动检查与真实浏览器结果验收。
- 自动检查：TypeScript、内容校验、3 项既有名称识别测试、根路径与 `/benchmark-show/` 子路径生产构建均通过；49 个条目、10 组共 19 个样例与 55 个预生成页面保持完整。
- 浏览器验收：1440px 桌面、1000px 平板列表及 390px 手机布局；搜索、排序、视图与目录返回位置恢复；手机筛选选择后收起；两项评测对比；MMMLU 单选、答案、原始数据、切题重置；SWE-bench 样例与数据结构；ARC 测试输出隐藏/展开；GPQA 转载限制、未公开题目提示均通过。
- 目录位置恢复实测为离开前后 384px；1000px 屏宽的列表卡片与父区域均为约 709.8px。最新桌面首页 45 个 Logo 图片实例全部成功加载，无整页横向溢出；正常操作无浏览器警告或错误。详情样例锚点顶部为 148px，位于固定导航下方。
- 子路径真实浏览器确认筛选 URL、详情跳转、样例加载、Logo 与许可路径正确，刷新后列表视图保留；目录导航最新修正已复测。
- 新增 `artifacts/screenshots/ux-desktop.png`、`ux-mobile.png`、`ux-detail.png`，更新 `docs/VERIFICATION.md`，记录本轮实际结果；`.gitignore` 排除临时复审输入。
- 更新根路径静态包 `artifacts/benchatlas-static.zip`（2,064,069 字节），核对 112 个压缩条目，包含 26 个 Logo、49 个详情、404.html 和 .nojekyll。未远程推送或部署。
- 已终止本轮全部生产预览，确认 4173/4174 无监听；未启动开发服务，浏览器临时视口已恢复。

## 2026-09-22 — 开始产品实现

- 新建 `src/lib/search.ts`、`src/composables/compare.ts` 与卡片、图标、样例组件，实现名称规范化、别名检索、批量名称识别、最多三项对照和带取消保护的样例加载。
- 新建 `src/views` 下的图鉴、详情、对照、发布会索引、入门指南、关于、404 页面；更新 `src/main.ts` 与 `src/App.vue`，建立静态路由、页头、导航和对照浮层。
- 新建 `src/content/releases.ts`，将官方模型发布资料映射到真实评测条目；新增样例准备脚本、样例清单、实际样例与许可文本。
- 新建 `src/styles`，实现原创图鉴视觉、分类卡片、任务示意、详情阅读区和数据格式视图。
- 原始资料新增发现：HealthBench 也要求避免公开转载样例，因此相关条目明确使用官方阅读入口。

- `package.json` / `package-lock.json`：锁定依赖；将 TypeScript 固定为 5.9.3，修复当前 vue-tsc 不兼容 TypeScript 7 的实际编译错误；采用图标包的新名称 `@lucide/vue`。
- `src/content/catalog.ts`：录入分类、来源、任务形式、指标解释、版本关系、官方访问入口；包含厂商衍生评测和明确标注的内部评测。
- `scripts/research-samples.mjs`：增加公开数据的有界采集脚本，原始候选暂存在 `artifacts/research`，不直接发布未审核记录。
- 验证：基础项目及目录类型检查通过；已经通过浏览器查看 Claude Opus 4.6 官方成绩表原图，识别 MCP-Atlas、Finance Agent、GDPval-AA 等名称。

- 用户确认直接开工，授权自主完成产品与资料研究。
- 新建 `package.json`、`tsconfig.json`、`vite.config.ts`、`index.html`、`.gitignore`，建立 Vue 3 + TypeScript + Vite 静态项目。
- 新建 `src/main.ts`、`src/App.vue`、`public/favicon.svg`，建立应用入口与原创站点标识。
- 新建 `src/types/benchmark.ts`，明确评测、来源、样例、发布资料的类型；原始样例与中文解读分开。
- 新建 `scripts/validate-content.ts`、`scripts/postbuild.ts` 的初始入口，后续随内容完善校验与静态产物。
- 本步骤原因：先建立最小可编译项目，再增加资料和交互；不启动开发服务。

## 2026-09-22 — AI 评测图鉴需求梳理与网站设计

### 本轮范围

遵循用户调用的 grill-with-docs 技能，完成需求分析、代表性原始资料研究、领域术语梳理和可供确认的网站设计。用户已将首版范围交由设计者决定；方案选择以评测解读和样例浏览为主，通过官方链接查看成绩。

### 文件与影响

| 文件 | 修改内容 | 原因 | 影响 |
| --- | --- | --- | --- |
| `CONTEXT.md` | 新建评测、榜单、版本、子集、衍生、样例、配置、报告与来源等术语 | 防止内容采集和页面设计混用概念 | 为后续内容类型与中文解释提供统一词汇 |
| `docs/PRODUCT_DESIGN.md` | 新建首版范围、用户流程、页面、卡片示意、样例交互、视觉、候选内容、技术方案与验收清单 | 将口头需求变成可执行和可核对的设计 | 明确约 40 条首批采集目标、纯前端边界、内容质量规则和实施检查点 |
| `docs/RESEARCH_NOTES.md` | 新建十组代表性评测的原始来源及影响设计的事实 | 防止依赖名称印象设计样例和版本关系 | 明确 GPQA/BrowseComp 的转载限制，以及题目、环境和报告的差异 |
| `docs/adr/0001-benchmark-identity.md` | 记录评测、版本关系与报告分别建模的决策 | 避免把厂商运行设置当作新评测或丢失真实衍生关系 | 后续条目可以保留来源、配置与版本语义 |
| `docs/adr/0002-static-pages.md` | 记录基于 Vue + Vite 的静态详情页预生成方案 | 支持 GitHub Pages 上的详情直达与正文可读取性 | 增加构建阶段静态生成，无运行时后端 |
| `UPDATE_LOG.md` | 新建本轮变更、原因、影响和验证边界 | 满足项目更新记录要求 | 保留本轮设计工作的可追踪记录 |

### 验证与边界

- 工作区原为空目录，不存在已初始化的 Git 仓库或应用代码。
- 已阅读用户指定技能及其引用的 grilling、domain-modeling 说明和文档格式要求。
- 已通过官方项目页面、原始发布、官方仓库和官方数据卡研究十组代表性内容；约 40 条是首批采集目标，不是本轮已收录数量。
- 已检查 6 份 Markdown 文档的本地链接，断链数量为 0；已核对设计状态、首批目标和待实施事项的表述一致。
- 仅新增 Markdown 文档，未安装依赖、未修改应用代码、未执行编译、未进行浏览器运行验收。
- 未启动、停止或重启任何服务；未创建远程仓库、推送或部署。
- 当前工具无 TodoWrite，设计文档末尾使用阶段清单跟踪。
- 网站实现与内容采集待设计确认后进入；没有将文档完成表述为网站完成。

### 编译与交互收尾

- `src/views/DetailView.vue`：将来源域名格式化移入脚本，修复 Vue 模板中直接使用 URL 构造器引起的类型错误；类型检查已通过。
- `src/main.ts`、`src/styles/main.css`、`src/styles/responsive.css`：按正确顺序加载响应式覆盖，提高正文对比度，补齐手机筛选、单列卡片、详情、样例与对照布局，支持减少动态效果偏好。
- `scripts/validate-content.ts`：校验唯一 ID、分类、来源、关系、样例清单、真实记录字段以及发布资料关联，阻止未审阅样例误入发布目录。
- `scripts/postbuild.ts`：检查每条详情的预生成正文，生成 Pages 404 和 .nojekyll；仅在提供真实 SITE_URL 时生成 sitemap/robots。
- `tests/search.test.ts`：覆盖发布图名称差异、版本区分、批量分隔符与未知名称等真实使用边界。

### 真实样例与发布资料补充

- 新增 `src/components/ArcTask.vue`：把 ARC 官方公开训练题的实际矩阵渲染为彩色网格，测试输出随答案展开显示；支持原始 JSON 核对。
- `src/content/catalog.ts`、样例清单、类型、SampleViewer：新增 MMMLU 和与 MMLU/MMMU 的关系，接入中文原始题面与 ARC 任务；共 48 条评测、10 组样例。根据 Scale 原始发布资料确认 MCP-Atlas 首次发布为 2025 年。
- `scripts/prepare-extra-samples.mjs`、`public/samples`、`public/licenses`：保存两组经许可核对的实际记录及 ARC 许可；原样例脚本保留新增清单，修正 GSM8K 解读中的鸭蛋笔误。
- `src/content/releases.ts`、`ReleasesView.vue`：增加 Gemini 3.1 Pro 官方模型卡索引、Claude 原图入口，并补上成绩图中的 MMMLU。
- `.github/workflows/pages.yml`、`README.md`：添加 Pages 发布流程与维护说明，路径和 sitemap 使用真实 Pages 元数据。未执行远程发布。
- `.gitignore`：排除未发布的研究候选；新增 `scripts/audit-sources.ts`，供维护时检查来源 HTTP 状态。

### 来源复核与代码可维护性

- `src/content/catalog.ts`：C-Eval 官网连接不稳定，改用已核对可访问的官方仓库与数据卡；同步官方 2025 年公开完整测试集的说明。
- `package.json` / 锁文件新增固定版本 Prettier；格式化全部源码、脚本与测试，保持易读的统一代码风格，未改变运行行为。
- `artifacts/source-link-audit.json`：70 个来源链接的检查结果，无 404；部分官方站点对自动 HEAD 请求返回 403，不将其误判为不存在。
- 子路径生产构建通过：48 条详情、19 个真实样例、4 组发布资料，含独立 404 和带实际测试地址的 sitemap。

### 部署权限与异常路径验收

- `.github/workflows/pages.yml`：构建阶段增加 `pages: read`，用于 configure-pages 读取真实部署地址；发布权限仍仅放在部署阶段。
- 浏览器已验证 `/benchmark-show/` 子路径下详情直达、样例加载、对照上限与分享刷新、手机筛选和列表、横向表格滚动及未知地址页面。
- 通过临时阻止单个样例请求复现失败提示，再解除阻止并点击重试，真实样例成功恢复；测试阻止规则已清除。

### 交付文档与视觉记录

- `docs/PRODUCT_DESIGN.md`、`docs/adr/0002-static-pages.md`：同步实际实施状态和集中式内容文件方案，区分本地验收与未执行的线上发布。
- `docs/RESEARCH_NOTES.md`：补充模型官方成绩图、MMMLU、ARC 公开任务、许可和 Pages 资料。
- `docs/VERIFICATION.md`：记录构建、19 个真实样例、真实浏览器交互、失败重试、手机和子路径结果及验证边界。
- `artifacts/screenshots/desktop.png` / `mobile-check.png`：保存实际桌面与手机首页截图。
- 键盘验收：Tab 首先到达“跳到正文”，Enter 后继续 Tab 能到正文搜索框；搜索框与批量识别按钮可通过键盘访问。

### 可读性修正

- `src/styles/main.css`、`src/styles/responsive.css`：根据实际浏览器计算的对比度结果，加深偏浅的前景文字（页头副标题、辅助说明、数量、页脚等）；保留彩色背景、分类图标及深底按钮的白色文字。原因是低对比度会降低普通读者的阅读体验，属于必要修正。
- `src/components/ArcTask.vue`：同步加深隐藏答案提示文字，修复该组件局部样式中的低对比度。首页和 GSM8K 详情实际文字对比度复测无低于 4.5:1 的检测项。

### 独立复审修正与版本核验

- `src/content/catalog.ts`、`releases.ts`：拆开 OpenAI MRCR 与 DeepMind MRCR v2；保留 Anthropic 报告指向 OpenAI 的实际链接，Gemini 指向 DeepMind 实现，共 49 条。补齐 MATH-500 的 OpenAI 原始子集出处与 2023 年份。
- `SampleViewer.vue`：ARC 操作说明标为本站提示；原始格式明确包含参考答案，防止误读。
- 样例类型、两份制备脚本及 9 组带本地许可的样例：分离 licensePath 与署名文字，添加适配部署子路径的许可链接；内容校验检查真实许可文件。原始题目与答案未改写。
- 名称识别测试新增 MRCR 不同实现的区分；README、产品设计与验收文档同步数量及答案展示说明。

### 最终验收与交付

- 最终根路径与 `/benchmark-show/` 子路径构建均通过：49 个条目、10 组 19 个样例、55 个预生成页面；3 项名称识别测试通过。
- 真实浏览器确认 ARC 标签、原始答案提示、MRCR 消歧，以及子路径许可链接实际打开 Apache 正文；正常页面无控制台错误。
- 网页版 GPT 增量复审结论 PASS，原 3 项必须修复与 2 项建议均关闭，MRCR 拆分通过，无剩余 MUST_FIX。验收记录保存复审链接及证据边界。
- 更新桌面/手机截图，新增真实 ARC 样例截图；生成并检查 `artifacts/benchatlas-static.zip`（根路径构建）。
- 终止本任务启动的两项生产预览，4173/4174 已无监听；未启动开发服务，未操作其他服务。
- 最后同步产品设计与验收文档状态。没有远程推送或部署。

## 2026-09-22 — 用真实发布方标识替换评测通用图标

- 用户反馈卡片分类图标辨识度不足，要求采用发布机构 Logo。按最简原则复用一个 PublisherMarks 组件，应用于评测卡片、详情标题与首页 SWE-bench 示例；联合发布并排展示，未核实标识使用发布方文字。
- 新增 `src/content/brand-assets.json`、`brands.ts` 与 `public/logos/`：保存原始机构/项目素材、明确条目关联和官方来源，不根据作者个人所属机构猜测发布方。
- `main.css`、`responsive.css`：删除失去用途的分类图标样式；Logo 组件保持素材比例、原色，并适配列表与手机。
- `validate-content.ts`：构建时检查标识来源、文件路径、文件存在、条目关联与 SVG 的主动内容。
- `AboutView.vue`、`README.md`：同步真实 Logo 的来源规则与权利说明；`.gitignore` 排除临时复审附件。已完成首轮 TypeScript 检查，最终构建与浏览器验收待记录。

- 最终接入 26 个真实标识，覆盖 43 个条目，6 个条目使用发布方文字；Aider 横向字标按原比例呈现，C-Eval 使用官方账号的圆形标识。`docs/LOGO_SOURCES.md` 保存完整出处与回退原因。
- 真实浏览器：桌面卡片、390px 手机卡片/列表/联合Logo详情均无横向溢出；首页 47 个标识实例（含首页示例与联合发布）全部加载。模拟 OpenAI/SWE-bench 图片失败后正确显示发布方文字，阻止规则已清理。
- `/benchmark-show/` 子路径构建及浏览器检查通过，全部 Logo 路径带正确前缀，无破图。保存 `publisher-logos-desktop.png`、`publisher-logos-mobile.png`。

- 专项复审发现 scoped CSS 中 `:global(.list-view)` 的后续选择器被编译丢弃；改为对完整选择器使用 :global，实测构建 CSS 已变为 `.list-view .publisher-marks` 等精确规则，避免列表被错误设为 44px 宽。
- 联合标识改为逐个图片回退对应机构名称，即使只失败一张也保留各方身份；不再通过过滤失败图片隐藏其中一方。

- 为静态首屏图片增加函数 ref 检查，覆盖错误发生在 Vue 绑定监听器之前的情况。经真实浏览器暂停/恢复脚本验证，预先失败图片正确转为 OpenAI 文字。最终列表宽度与父区域一致，保留截图 publisher-logos-list.png。首轮仅检查横向溢出不足以发现窄容器问题，验收记录已如实补充。

- 最终网页版 GPT 增量复审 PASS，三项问题全部关闭；docs/VERIFICATION.md 记录修正依据与边界。静态包已更新为 2,090,952 字节并核对包含 26 个标识资源。本轮启动的生产预览已停止，没有启动开发服务。

- 2026-09-22T08:38:27.810Z 内容维护：新建 content/benchmarks/maintenance-check.json 草稿，尚不公开。需重新构建后发布生效。

- 2026-09-22T08:38:27.958Z 内容维护：content/benchmarks/maintenance-check.json 状态更新为 published。需重新构建后发布生效。

- 2026-09-22T08:38:28.067Z 内容维护：content/benchmarks/maintenance-check.json 状态更新为 archived，原因：临时验收：验证归档详情与图片样例，验收后移除。。需重新构建后发布生效。

- 2026-09-22T08:38:28.070Z 内容维护：新建 content/benchmarks/maintenance-draft-check.json 草稿，尚不公开。需重新构建后发布生效。

- 2026-09-22T08:43:51.966Z 内容维护：删除 content/benchmarks/maintenance-check.json；重新构建将移除页面、样例及失去引用的公开附件，共享素材源文件保留。需重新构建后发布生效。

- 2026-09-22T08:43:53.616Z 内容维护：删除 content/benchmarks/maintenance-draft-check.json；重新构建将移除页面、样例及失去引用的公开附件，共享素材源文件保留。需重新构建后发布生效。

### 本轮首批采用（2026-09-23）

- `content/benchmarks/` 新增 Anthropic 9 条、Google/国内来源 8 条；各自保留核验日、原始来源、指标限制和版本关系，旧条目不覆盖。
- `content/brands.json` 与 `content/assets/logos/` 新增 Cognition、Cursor、Zapier、Surge AI、Perplexity 官方标识，供发布方显示复用。
- `content/releases.json` 增补 Gemini 三项关联，并新增 DeepSeek-V3.2-Exp、Qwen3、Kimi K2 官方资料摘录；日期按所链接资料的公开日期。
- 原因：将模型发布表中出现的评测追溯为可查阅条目；影响仅为静态内容和资源增加，无页面结构或后台变更。

- `content/releases.json` 新增 Claude Opus 5.5，映射九行表格与正文 WANDR；官方以 HTML 表格呈现，未找到对应独立图像素材，因此不添加伪原图链接。Qwen3/Kimi K2 标题注明技术报告，避免把论文日期误读为模型首发日。
- `docs/LOGO_SOURCES.md` 补全五个新增 Logo 的官方出处与实际素材链接；`docs/CONTENT_MAINTENANCE.md` 连接新的采集流程。首批 66 条内容类型检查与 11 项测试通过。

- `README.md` 同步首批 66 条 / 8 份报告数量、候选目录边界与采集流程入口；待 OpenAI 最终审核后更新完整数量。

- 最终采用 OpenAI 8 条，新增 GPT-5.4、GPT-5.6、GPT-6 Astra 三份发布资料；`content/benchmarks/benchcad.json` 的 IoU/准确率方向统一为越高越好。当前总量 74 条、11 份报告、31 个 Logo；`README.md` 同步最终数量。
- 报告只关联已明确版本的评测；保留 OfficeQA 命名推断依据，排除没有注明版本的 Mind2Web 速度关联；未将 GDPval-AA v2 合并为 v2.1。新增条目均未搬运未经逐题核验转载许可的样例。

## 2026-09-24 — 确认并统一项目名称

- 原因：用户确认英文名称为 `what's a benchmark?`，中文名称为“到底测什么？”，以日常提问表达资料站定位。遵循最简原则，仅调整命名和对应说明。
- `src/App.vue`：更新页眉、页脚及首页链接无障碍名称，保留英文全小写和问号。
- `index.html`、`src/views/ExploreView.vue`：更新站点标题、首页主标题和默认描述；目录分类回退文字改为“评测目录”。
- `src/views/DetailView.vue`、`CompareView.vue`、`AboutView.vue`、`GuideView.vue`、`ReleasesView.vue`、`NotFoundView.vue`：同步各页面标题；关于页使用中文站名；详情默认描述与返目录文案保持自然语句。
- `package.json`、`package-lock.json`：内部包名统一为 `whats-a-benchmark`，依赖与版本不变。`tests/content.test.ts` 同步临时目录前缀及其安全清理断言。
- `.github/workflows/pages.yml`：同步工作流显示名称，发布路径与行为不变。
- `README.md`、`CONTEXT.md`、`docs/PRODUCT_DESIGN.md`、`docs/LOCAL_SAMPLE_IMPORT.md`：同步项目名称；产品设计中的暂定提案更新为用户已确认的命名。
- `content/assets/licenses/small-overlapping-speech-bench.txt`：本站再发布说明的主语改为 This site；原发布方、许可证、来源及未转码未裁剪事实不变。
- 历史研究、验收、更新日志和旧交付快照保留当时名称；当前构建产物随构建更新。目录路由、内容数据、样例、筛选与对比逻辑不变。
- 验证：类型检查、生产构建、12 项现有测试及真实浏览器检查已通过；两处内容称谓收尾后再次通过类型检查、90 路由构建及静态产物校验。当前工具无 TodoWrite，以本条记录跟踪改名与验收。
- 收尾复查：`content/benchmarks/screenspot-pro.json` 与 `content/benchmarks/swe-bench-multilingual.json` 中两处旧站名改为“本站”，仅更新本站称谓，评测事实与来源核验日期不变。
- 首轮验证：TypeScript、生产构建和 12 项现有测试通过；浏览器桌面与 390px 视口（实际内容宽 375px）确认首页、页眉、页脚与关于页新名称正常，根节点 scrollWidth 与 clientWidth 均为 375，无横向溢出，控制台无警告或错误。已恢复视口、关闭测试标签并停止临时预览。
## 2026-09-24 — 页眉增加版本点缀 🚀

- 原因：用户希望为本次大版本稍加火箭元素，遵循最简原则。
- `src/App.vue`：仅在页眉英文站名后添加一个 🚀，作为装饰并设置 aria-hidden；正式名称、页面标题、页脚和导航行为不变，不新增动画或样式。
- 验证：待类型检查、构建与浏览器确认。
## 2026-09-24 — 架构、样式与状态管理优化

- 原因：样式覆盖分散、组件承担多种职责、目录查询规则集中于页面、对比链接与选择栏状态不一致。遵循最简、单一职责及严格类型原则，不引入新框架或向后兼容层。
- 进度：[x] 只读梳理与原件备份；[x] 样式归属及样例职责调整；[x] 查询/对比规则集成；[x] 全量类型、测试与生产构建；[x] 桌面/手机浏览器验收；[x] 最终变更清单及服务清理。
- 本轮开始时目录无 Git 元数据，原件备份于用户临时目录 benchmark-architecture-20260924；随后按用户要求建立 Git 基线。保留既有站名、火箭装饰和正式评测内容。
- src/styles/main.css 改为唯一全局样式入口；新增 tokens.css、base.css、shared.css、layout.css、catalog.css、reading.css、detail.css，按职责集中基础规则及断点。删除 responsive.css，原非媒体查询的颜色/字号覆盖已合入对应基础规则。
- src/styles/benchmark-card.css 与 src/components/BenchmarkCard.vue：卡片专属样式由组件加载，保留列表父容器上下文；状态标签使用明确状态选择器，修复文字色和边框色被基础标签覆盖。
- src/styles/sample-viewer.css 与 src/components/SampleViewer.vue：样例专属基础、交互及响应式样式集中，并由组件 scoped 加载；src/main.ts 移除旧 responsive.css 导入。
- src/composables/sampleLoader.ts：集中样例请求、取消、错误、重试和过期响应保护，保留客户端挂载门控及构建时 schema 校验，不把完整校验库引入客户端。
- src/components/SampleMedia.vue：集中图片/音频/视频/附件、字幕/来源与媒体失败展示；SampleViewer 保留题目选择、模式和答案交互。tests/sample-loader.test.ts 覆盖挂载门控、取消、旧响应、卸载、错误和重试，两项通过。
- 本阶段类型检查通过；最终构建、浏览器结果将在下方补齐。
- src/lib/catalogQuery.ts、src/composables/catalogQuery.ts、src/views/ExploreView.vue：集中查询参数解析、有限筛选键、排序/视图类型、筛选交集、清空行为和统计；继续以 URL 为唯一筛选来源，保留分类收起及清空时的排序/视图。
- src/lib/comparison.ts、src/composables/compare.ts、src/App.vue、src/views/CompareView.vue：对比页 URL 驱动表格与底栏，直接打开/刷新分享链接恢复选择；移除及清空同步 URL，离开后保留本次应用选择；上限与 ID 去重校验统一，实例隔离并清理路由订阅，挂载后读取分享参数以保持静态页面水合一致。
- tests/catalog-query.test.ts、tests/comparison.test.ts：新增六项用例，覆盖参数边界、筛选交集和排序、分享恢复、移除与清空、导航历史、上限及实例隔离；均通过。
- src/lib/search.ts：预计算标准化名称及搜索语料，批量名称查询复用索引；保留原匹配字段、版本区分及排名规则，减少输入时重复计算。
- 本阶段类型检查通过；样式与本轮修改文件已格式化。
- Git：按用户要求初始化本地仓库，并从本轮修改前原件构造初始源码基线 43ddeef；本轮优化保留为未提交差异。未配置远程、未推送。`.gitignore` 补充本地 .env 文件和 artifacts/*.zip 忽略，保留 .env.example。
- README.md、docs/ARCHITECTURE.md：补齐内容链路、模块职责、样式文件归属、URL 状态语义、样例请求生命周期及验证约定。完整目录元数据仍随首页加载，作为规模增长后的可测量优化项，不为当前目录增加第二套数据链路。
- 样式收尾：合组相邻且声明完全相同的选择器，删除无引用的 .sample-image 与已被覆盖的选项旧规则；对外部样例说明使用明确选择器，维持 scoped 迁移前的间距优先级。
- 已完成首轮全量 20 项自动测试、严格 TypeScript、90 路由生产构建和 89 个静态页面及 Pages 404 检查；构建仍提示主包超过 500 kB，未隐藏该告警。
- 最终样式收尾后再次通过严格 TypeScript 与生产构建：90 个路由、89 个静态页面及 Pages 404 核验成功。公开内容仍为 84 项、27 条样例、17 份发布资料，未修改评测数据。
- 真实浏览器：1440px 视口比较目录 30 个节点与详情/样例 15 个节点的尺寸、显示方式、字号和文字色；详情基线完全一致，目录仅状态标签文字色按预期修复。验证对比分享刷新恢复、移除和清空同步表格/底栏，搜索/列表状态从详情返回后恢复。
- 390px 视口（实际内容宽 375px）验证分类筛选后收起、7 项数学结果、ARC 网格答案从 5 个增至 6 个、音频样例原生控件且不自动播放、查询链接刷新、17 张发布资料卡、阅读指南和关于页；已测页面无整页横向溢出。
- 临时阻止 ARC 样例请求后显示加载失败，解除阻止并点击重试恢复成功。正常操作控制台无警告/错误；故障模拟仅产生预期的 samples 请求失败日志。阻止规则与视口覆盖已恢复，验收标签已关闭。
- 本地分支使用 main，与既有 Pages 工作流一致；初始基线 43ddeef 已提交，本轮优化保持未提交，可直接查看完整 Git diff。未添加远程或推送。
- 结束前停止本轮临时生产预览，确认 4173 端口无监听；未启动开发服务。git diff --check 通过，原件备份保留供核对。

## 2026-09-24 — improve-codebase-architecture 候选审查

- 原因：用户主动调用该技能，要求在现有架构优化基础上，按 module/interface/depth/seam/locality/leverage 与 deletion test 检查深化机会。
- 范围：读取 CONTEXT.md、三个 ADR、Git 基线与最近未提交变更；搜索探查由 GPT-6 Luna 执行。仓库仅有初始基线，未推断长期提交热点。
- 产物：HTML 报告位于 C:\Users\admin\AppData\Local\Temp\architecture-review-20260924-092624.html，报告不进入仓库；含两个候选的前后结构图、文件证据、删除检验、收益和优先建议。
- 结论：目录查询的真实 Router seam 测试覆盖、任务样例重置与媒体失败状态寿命，均为 Worth exploring，没有 Strong 候选。保留现有评测对比、样式归属、静态内容管道及三个 ADR。
- 验证：HTML 静态解析、候选数、前后图容器及推荐区检查通过；已请求在 Codex 文件面板显示报告。内置浏览器因本地 file URL 安全策略拒绝预览，未绕过该限制，未声称 CDN 图形完成视觉验收。
- 本轮只更新本日志，未修改业务代码或实施候选，未启停服务；按技能流程等待用户选择深入讨论的候选。

## 2026-09-24 — 落实架构审查的全部候选

- 原因：用户明确要求全部修复。遵循单一职责、最简与严格类型原则，落实报告中的目录查询接口验证、样例交互生命周期两个候选。
- `src/lib/catalogQuery.ts`、`src/composables/catalogQuery.ts`、`src/views/ExploreView.vue`：目录页面统一消费 URL 查询接口的结果、统计及操作，真实 Router 由应用注入；连续筛选合并未完成目标，防止不同条件相互覆盖，界面仍只读取已生效的 URL。
- `tests/catalog-query.test.ts`：增加真实内存路由的生产接口测试，覆盖连续筛选、空结果、清空保留排序和视图及历史恢复。
- `src/composables/sampleViewer.ts`：集中加载结果、当前任务与交互状态；新结果回到第一题，切题重置展示模式、选项、答案及媒体失败记录，模式切换保留状态。
- `src/components/SampleViewer.vue`：移除重复状态重置逻辑，消费统一查看接口；`src/components/SampleMedia.vue`：只读失败列表加错误事件代替可写双向数组，失败去重及当前题目资产校验由父级状态模块负责。
- `tests/sample-viewer.test.ts`：新增两项生产接口生命周期测试，覆盖挂载门控、模式保留、切题、重试、评测切换、停用与无关媒体错误。
- `docs/ARCHITECTURE.md`：同步模块职责、单向媒体错误通信及验证约定。
- 阶段验证：严格 TypeScript 通过，样例加载及查看接口四项测试通过；全量构建和浏览器验证待下方补齐。未新增依赖、未修改正式评测内容。
- 最终验证：严格 TypeScript、全量 24 项自动测试通过；生产生成 90 个路由，89 个静态页面与 GitHub Pages 404 校验通过。保留既有主包约 652.52 kB（gzip 185.81 kB）的体积提示。
- 目录接口附加测试验证连续筛选后立即离开页面，不会被待完成筛选拉回目录；使用 Router 自带的导航取消，不引入串行导航队列。
- 真实浏览器：目录搜索/列表/年份排序从详情返回后恢复，清空筛选保留视图与排序并恢复 84 项；MMMLU 选项与答案展开跨任务/原始模式保留；HumanEval 从原始模式切到第二题回到任务内容并收起答案。
- 媒体故障验收：临时阻止 clip_000 音频请求后显示失败提示；解除阻止再切换模式，失败提示仍保留且不重新挂载音频；切到 clip_001 再返回 clip_000，失败记录清除，音频 readyState=4。正常操作控制台无警告/错误，375px 实际内容宽度下无整页横向溢出。
- 已解除网络阻止、恢复视口并关闭临时验收标签；临时生产预览已停止。未启动开发服务，未新增依赖或修改正式内容。
- Git 差异检查通过；本轮新文件纳入可审查差异，优化改动仍未提交，未配置远程或推送。两个审查候选已全部落实。

## 2026-09-24 — 第二轮深入架构复审（只读）

- 原因：用户再次调用 improve-codebase-architecture，要求扩大和加深审查。采用 codebase-design 的 module/interface/seam 与 deletion test，按 CONTEXT.md 和三个 ADR 判断实际收益；未修改业务代码、内容或测试。
- 范围：三条 GPT-6 Luna 审查线分别检查内容 schema/维护与生成链路、前端状态/路由/样例生命周期、样式归属及页面模块依赖。仓库仅有 43ddeef 基线，不推断长期提交热点，重点依据当前架构优化差异。
- Strong：src/content/schema.ts 的 draftRelationSchema 拒绝 published 关系中的 sourceUrls；scripts/content-maintenance.ts 的 setStatus 保留关系只改状态，经 loadContent 内存覆盖复现转草稿先报 unknown sourceUrls。aime-2025 还有合法入向关系和发布报告引用，本报告不声称该条目当前可直接撤回；结构冲突与正常引用阻止必须分开。现有 tests/content.test.ts 夹具清空 related，未覆盖有来源关系的状态往返。
- Worth exploring（低优先）：src/composables/compare.ts 的连续同步 toggle 都读取旧 URL；真实 memory Router 从 mmmlu,swe-bench-verified,gpqa-diamond 连续移除前两项后，仍得到 mmmlu,gpqa-diamond。当前无异步守卫，普通独立点击通常不会触发，不扩大为常见 UI 故障。现有测试每次等待导航，缺少交叠调用覆盖。
- 保留结论：样式单入口、分域规则、局部 scoped、列表祖先上下文、搜索索引、当前样例/媒体分工、公开投影及静态站路线没有新增足够证据支持继续重构。未将目录水合猜测或测试覆盖边界冒充已确认故障。
- 验证：重跑目录查询、对比、样例加载及样例查看共 12 项测试，全部通过；额外只读探针复现上述两个缺口。未重新构建、未启动或停止服务，未做线上或浏览器交互验收。
- 报告：C:\Users\admin\AppData\Local\Temp\architecture-review-20260924-130253.html。包含 2 个候选、4 个前后示意、证据与 ADR/删除检验；jsdom 静态 DOM、数量及锚点检查通过，已请求在 Codex 文件面板打开。CDN Mermaid 图形没有完成浏览器视觉验收，未绕过此前本地 file URL 安全限制。
- 本轮仓库只追加本日志；候选尚未实施，Git 优化改动继续保留未提交状态，未推送。建议优先修复内容状态转换约束，报告不预先设计新 interface。

## 2026-09-24 — 全量代码功能审查（逐文件覆盖）

- 原因：用户指出前两轮仅为架构热点抽查，没有覆盖全部代码功能。本轮改为当前磁盘全量代码清单、逐文件职责/异常/验证矩阵及定向故障复现，未修改业务实现。
- 新增 `docs/CODE_FUNCTION_REVIEW.md`：覆盖 66 个唯一代码/配置/测试文件（40 src、13 scripts、6 tests、5根配置、1 HTML、1工作流），逐项保存当前行数和 SHA-256 前缀，给出页面、状态、媒体、内容生命周期、采集和发布流程的功能结论与未验证边界。锁文件只做结构/顶层依赖核对，不冒充第三方依赖源码审计。
- 搜索、目录盘点和三条分工审查均由 GPT-6 Luna 执行；主审复核关键实现及报告措辞，纠正手工行数、搜索索引字段范围和普通点击与同步调用的区别。已删除 responsive.css 不计入当前文件，第三方依赖和生成产物不计入第一方源码。
- 确认 8 项：F1 草稿关系不接受正式 sourceUrls；F2 采集失败仍 exit 0 且保留可能被复用的旧记录；F3 批量纯符号名称误给目录前五项；F4 版本关系未在本栏目显示依据；F5 畸形样例对象被当成成功加载；F6 对比连续同步移除覆盖；F7 日志写入失败时源修改已经落盘；F8 缺 favicon 时生成失败先清空旧输出。各项有触发条件、影响范围及测试缺口，F4为模板静态确认，其余使用无副作用内存或TEMP夹具探针，不声称真实项目已遭遇注入故障。
- 验证：严格 TypeScript 通过；全部24项自动测试通过；三个mjs语法检查通过；实际内容校验通过84条目/27样例/17报告；直接verifyBuild检查现有dist通过；jsdom遍历90个现有页面，单一H1、当前页锚点、2043个站内链接目标均通过。
- 未重新生成或构建真实项目，未启动/停止服务，未请求外部数据源或部署；没有把静态审查等同于全分支动态验证。图片/视频/字幕/file实载、Vue自动挂载、水合、浏览器键盘/视觉、远端Pages、部分文件锁和写盘失败分支仍明确列为覆盖缺口。
- 本轮仓库仅新增审查报告并追加本日志；代码/配置快照校验未变化，发现项尚未修复。既有Git优化改动保持未提交，未推送。

## 2026-09-24 — 全量审查修复（F1–F8 已完成）

- 原因：用户要求修复全量代码功能报告的全部 8 项问题。遵循最简、单一职责、严格类型原则，保留此前 Git 未提交差异与静态站架构。
- F1：src/content/schema.ts 的草稿关系复用正式关系定义，仅将 sourceUrls 设为可选；有来源的正式条目撤回时不再丢失或拒绝关系证据。tests/content.test.ts 验证发布→草稿→发布、来源保留和公开样例退出。
- F7：scripts/content-maintenance.ts 在内容已经成功写入后，单独捕获日志追加失败并明确警告“内容操作已完成、请手工补记、不要重复执行”，避免附属日志故障误报整个变更失败。测试覆盖新建、归档和删除三个实际落盘结果。
- F8：scripts/content-pipeline.ts 在清理旧生成结果前读取并验证 favicon，后续写入已读取的内容；缺失或空文件立即中止。测试逐文件比较旧输出字节不变，再恢复输入验证成功生成。此为输入失败保护，不宣称任意磁盘写入中断均可事务回滚。
- F4：src/views/DetailView.vue 的每条关系复用 EvidenceLinks 展示精确依据；src/styles/detail.css 增加关系容器、独立导航链接与窄屏换行，避免嵌套链接并保留既有卡片外观。
- 阶段检查：严格 TypeScript 通过；内容专项 10/10 通过。其余修复、全量构建及浏览器验收继续执行，结果随后补记。
- docs/CONTENT_MAINTENANCE.md、docs/ARCHITECTURE.md：补充草稿关系来源保留、日志失败时的实际成功语义和生成输入失败保护边界；修正文档中“尚未初始化 Git”的过期描述。
- F2：scripts/research-samples.mjs 使用新增 scripts/research-batch.mjs 记录 running/success/failed 批次及各来源结果，任一失败返回非零退出码；scripts/research-batch.d.mts 提供测试导入的明确类型。scripts/prepare-samples.mjs 在任何下载、建目录或写候选前核验批次与八项所需输入，阻止旧研究文件被当成本批成功结果。tests/research-samples.test.ts 使用 TEMP 与 mock fetch 验证全失败、部分失败、成功、旧文件拒绝及真实 CLI 退出码，不请求外网。维护手册同步批次操作说明。
- F2 复核补充：前置检查也拒绝空 rows，避免上游空数据在整理中途才报错；6 项采集专项测试通过。所有采集故障测试均在 TEMP 与模拟网络下完成，正式研究数据未改写。
- F3：src/lib/search.ts 在批量名称标准化为空时返回无匹配，普通空搜索保持全目录；tests/search.test.ts 补纯符号回归。
- F5：src/composables/sampleLoader.ts 检查必要的非空展示字段、题型、选项、媒体记录及网格输入输出结构；损坏记录进入现有错误/重试流程，不在客户端引入完整内容 schema。tests/sample-loader.test.ts 保留错误 ID、取消/过期响应覆盖，新增畸形记录、空标题、媒体/网格容器及重试；tests/sample-viewer.test.ts 验证查看接口错误后恢复。修正测试断言跨异步重试引起的 TypeScript never 收窄，严格类型通过。TEMP 探针验证18个正式样例文件、27条记录全部可被新加载器接受。
- F6：src/composables/compare.ts 对连续操作合并尚未完成的目标选择，界面继续只读生效的URL；直接替换导航保留Router取消语义。tests/comparison.test.ts 覆盖同步移除、清空/添加组合与离开页面后的取消，不引入串行导航队列。
- 最终自动检查：全量39/39测试通过；收尾测试断言修正后相关12/12再通过；严格TypeScript、三个变更mjs语法检查、内容校验（84条目/27样例/17报告）通过。
- 生产构建：90个路由成功，postbuild核验89个明确静态页面与Pages404；保留主包652.69kB、gzip185.88kB体积告警。磁盘共有91个HTML，即90路由页加独立404.html副本，不把副本混入路由数。
- 全量新产物核验：84个详情、2,051个站内链接与hash目标、34条关系的证据URL及顺序全部通过；每页单H1，解析后DOM无嵌套链接。关系源码额外确认导航与证据链接为兄弟元素。
- 真实浏览器：MMLU-Pro关系来源准确，桌面与390px视口（375px实际内容宽）无整页横向溢出；批量输入 -;___;MMLU-Pro 前两项无候选而第三项准确识别；三项对比分享刷新后恢复，依次移除前两项仅保留GPQA Diamond，清空同步URL和底栏。临时阻止样例请求出现失败提示，解除后重试恢复两条样例及答案展开。
- 正常交互控制台无警告/错误；故障注入仅出现预期fetch失败日志。网络阻止已清除、视口已恢复、临时标签已关闭，生产预览已停止。未启动开发服务、未修改正式评测内容、未访问真实采集上游或部署。
- docs/CODE_FUNCTION_REVIEW.md 保留原审查快照并追加F1–F8修复验收；docs/ARCHITECTURE.md、docs/CONTENT_MAINTENANCE.md同步当前约定。全部8项已修复，测试数从24增至39。任意磁盘写入故障的事务回滚、真实上游和远端部署不属于本轮已验证范围。
- 最终收尾：4173/4174 均无监听；git diff --check 通过。新增采集批次模块、类型声明和测试已纳入 Git 可审查差异（intent-to-add），本轮全部优化仍为未提交修改；未配置远程、未推送。

## 2026-09-24 — GitHub 中英文 README 完善

- 原因：用户准备创建 GitHub 仓库，要求补齐 README 与 README_ZH；按真实实现整理公开项目入口，遵循最简、文档与实现一致原则。
- README.md：改为完整英文项目说明，包含产品定位、带日期的收录统计、实际功能、运行要求、快速开始、命令表、目录结构、内容维护、GitHub Pages/静态托管、贡献与来源权利说明。
- README_ZH.md：新增对应中文说明，顶部与英文版互相切换；明确网站界面目前为中文，原始任务保留来源语言，不把双语文档描述为已支持英文网站。
- 两份文档核对现有 package.json、Pages 工作流与维护手册；明确 publish 只改本地状态、build 不代替测试、正式构建不抓取上游数据、候选不部署。未编造仓库地址、在线演示、构建状态或源码许可证；未修改功能、内容数据或部署配置。
- 验证通过：实际源文件统计为84条published、8类、18项含27条样例、17份报告；两版各15个本地Markdown链接共30个目标均存在，命令和部署环境变量与实现一致。两份Markdown格式、严格TypeScript及git diff --check通过；文档变更未重跑业务测试或生产构建，未启动服务。
- Git：README_ZH.md 已纳入可审查差异，本轮仅修改README.md、README_ZH.md和本更新日志；保留原有工作区修改，未提交、未推送。

## 2026-09-24 — 绑定 GitHub 远程仓库

- 原因：用户指定 GitHub 仓库 WhitePlusMS/whats-a-benchmark，要求配置 origin。
- .git/config：新增 origin，fetch/push 地址均为 https://github.com/WhitePlusMS/whats-a-benchmark.git；配置前无远程仓库，当前分支为 main。
- 验证：git remote -v 确认地址正确。本次仅配置本地远程地址并记录说明，未提交、拉取或推送，未验证远程访问权限；现有工作区修改保持不变。

## 2026-09-24 — 首次推送并启用 GitHub Pages 自动部署

- 原因：用户明确要求将已完成的项目推送到 WhitePlusMS/whats-a-benchmark，并自动执行 Pages 部署。
- 提交范围：本轮已审查的架构与样式优化、F1–F8修复、39项回归测试、中英文README及维护/审查文档，保留初始基线历史。docs/CONTENT_MAINTENANCE.md 同步已绑定的实际远程仓库与main推送触发规则。
- 推送前验证：严格TypeScript、39/39自动测试和git diff --check通过。既有生产构建及浏览器验收记录见上文；GitHub Actions 将对推送提交重新安装依赖、测试、构建与部署。
- 部署结果以对应提交的GitHub Actions结论与实际站点访问为准，记录本段时尚未推送，不预先宣称上线成功。

- 发布完成：提交 dda3c34 已推送 origin/main，远端 HEAD 与本地一致，main 已建立跟踪关系。通过既有本地代理完成推送，未修改全局 Git/网络配置。
- GitHub Pages 已选择 GitHub Actions。首次构建与测试成功；空仓库初始化的 github-pages 环境规则仍指向不存在的 mater，已精确改为 main（仅允许该分支，未取消分支限制），重跑失败的部署任务后成功。
- 验证记录：工作流 https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/35975671314 的第2次尝试为 Success；站点 https://whiteplusms.github.io/whats-a-benchmark/ 已用真实浏览器打开，84项目录、MMMLU详情及动态真实样例正常加载。
- 后续 main 推送会自动执行测试、构建、部署。工作流仍有上游 Actions Node 20 运行时迁移警告，但本次已在平台提供的运行时成功执行；不将告警写成部署失败。本次未启动本地服务。
