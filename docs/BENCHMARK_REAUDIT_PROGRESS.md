# 75 项 benchmark 官方来源重审进度

开始日期：2026-09-23。

目标：逐项重审全部正式 benchmark，使任务概述、数据规模与字段、访问状态、许可、样例状态、指标、版本关系和参考资料均能回指官方来源。模型厂商报告只记录“引用或采用该评测”，不得替代 benchmark 官方定义。

## 完成标准

每项必须同时满足：

- [x] GPT-6 Luna 已核对官方 README、数据卡、论文、项目页、仓库、数据入口和排行榜中实际存在的材料。
- [x] 建立独立证据记录，区分官方定义、数据入口、代码、榜单、版本公告和模型厂商报告。
- [x] 正式内容中的任务概述、数据结构、指标、访问状态和许可边界均有对应证据；缺失信息明确标为未知。
- [x] 站内样例来自官方真实记录，保留记录 ID、split、来源和许可；不能转载时显示具体原因与官方入口。
- [x] 通过内容校验、严格 TypeScript、测试、生产构建和代表性浏览器验收。

状态：`未开始`、`研究中`、`待复核`、`已完成`、`受阻`。受阻表示官方资料不可访问或证据冲突，页面仍须准确披露缺口。

## 正式内容候选结构

正式内容与审核候选使用同一结构：`content/benchmarks/<id>.json` 是网站唯一内容源，`artifacts/candidates/reaudit/<id>.json` 保留逐字符串一致的审核副本。除身份、分类、品牌、关系、状态和真实 `sampleSet` 外，每项统一包含：

- `researchStatus`：`pass`、`pass-with-limitations`、`partial` 或 `blocked`。
- `officialDefinition`：`summary`、`task` 和支撑它们的 `sourceUrls`。
- `taskContract`：`input`、`output`、`environment` 和 `sourceUrls`。
- `dataProfile`：`summary`、`disclosure`、`scale`、`splits`、`fields`、`files` 和 `sourceUrls`；未知项使用明确状态或空数组，不编造。
- `dataAccess`：`status`、`requirements`、可选 `url` 和 `sourceUrls`。
- `reusePolicy`：`status`、`license`、`scope`、`boundaries` 和 `sourceUrls`；代码、数据和媒体范围分开描述。
- `sampleAccess`：`status`、`reason`、可选 `url` 和 `sourceUrls`；站内样例必须为 `local`。
- `metric.sourceUrls`：指标定义的官方证据。
- `limitations`：每条为 `{ text, sourceUrls }`，不再使用无法定位的自由文本列表。
- `sources`：每项为 `{ label, url, role }`，`role` 取 `definition`、`readme`、`paper`、`code`、`data`、`access`、`leaderboard`、`release`、`vendor-report`。
- `related[].sourceUrls`：版本、子集或衍生关系必须有来源；没有关系时保持空数组。

所有 `sourceUrls` 必须精确出现在同一候选的 `sources` 中。模型厂商报告只能使用 `vendor-report`，不得单独支撑非内部 benchmark 的官方定义、任务合同或数据结构。

## 架构与页面

- [x] 75 项均已建立与正式 ID 同名的独立官方来源研究记录；每份包含统一的 13 个栏目和结论状态。
- [x] 75 份隔离候选通过严格 schema；稳定身份零变化，证据 URL、状态枚举和样例/许可组合完成机器校验。
- [x] 新内容结构：官方定义、任务合同、数据概况、访问状态、复用政策、样例状态和来源角色。
- [x] 新详情页：官方定义、任务、数据、访问/使用边界、样例、指标、版本、官方资料、模型发布引用分区。
- [x] 新目录状态：站内样例、公开入口、受控访问、禁止公开、私有、许可待核实、研究未完成。
- [x] APEX-Agents 试点迁移与浏览器验收。
- [x] 全站迁移、校验、构建和浏览器抽查。

## 第一批

| Benchmark | 研究 | 内容 | 验收 | 备注 |
| --- | --- | --- | --- | --- |
| Agents’ Last Exam | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| Aider Polyglot | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| AIME 2024 | 已完成 | 已完成 | 已完成 | PARTIAL：缺少 MAA 官方 AI 数据包和转载授权 |
| AIME 2025 | 已完成 | 已完成 | 已完成 | PARTIAL：缺少 MAA 官方 AI 数据包和转载授权 |
| AlignBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| APEX-Agents | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；gated，仅限评测 |
| ARC-AGI-2 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| ARC-AGI-3 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；媒体许可未确认 |
| Arena-Hard v2.0 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| Chatbot Arena | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| AutomationBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；已有样例逐字段复核 |
| BenchCAD | 已完成 | 已完成 | 已完成 | PASS；已有样例逐字段复核 |
| BFCL | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；已有样例逐字段复核 |
| BrowseComp-ZH | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；加密防泄漏 |
| BrowseComp | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；官方请求不要公开题目 |

## 第二批

| Benchmark | 研究 | 内容 | 验收 | 备注 |
| --- | --- | --- | --- | --- |
| C-Eval | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；非商业、署名及相同方式共享 |
| Chartography | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；逐图第三方权利未确认 |
| CharXiv | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；图表版权属于原作者 |
| CMMLU | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；官方许可元数据冲突 |
| CursorBench 4.0 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；任务集未公开 |
| Finance Agent | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；数据许可未覆盖于代码 MIT |
| FrontierCode 1.1 Main | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；私有任务集 |
| FrontierMath | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；版本题量口径不同 |
| GAIA | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；gated 且禁止公开重分享 |
| GDPval-AA v2.1 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；第三方 Agent 协议 |
| GDPval-AA | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；与原始 GDPval 分离 |
| GDPval | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；完整集访问范围未确认 |
| GeneBench-Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；完整集与 10 题公开案例分离 |
| GPQA Diamond | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；作者请求不要在线披露题目 |
| GPQA | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；作者请求不要在线披露题目 |

## 第三批

| Benchmark | 研究 | 内容 | 验收 | 备注 |
| --- | --- | --- | --- | --- |
| GSM8K | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| HealthBench Hard | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；禁止在线公开样例 |
| HealthBench Professional | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；禁止在线公开样例 |
| HealthBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；禁止在线公开样例 |
| Humanity’s Last Exam | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；禁止重传或分发 |
| HumanEval | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| IFEval | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| LifeSciBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；附件存在许可/隐私/安全边界 |
| LiveCodeBench Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；竞赛题权利另行核验 |
| LiveCodeBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；竞赛题权利另行核验 |
| LongBench v2 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；混合来源上下文 |
| LongBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；21 个上游来源分别核验 |
| MATH-500 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；派生发布未单列许可 |
| MathVista | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；媒体逐项追溯 |
| MBPP | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；数据与代码许可分离 |

## 第四批

| Benchmark | 研究 | 内容 | 验收 | 备注 |
| --- | --- | --- | --- | --- |
| MCP-Atlas | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；现有样例 split 标注需纠正并重新逐字核验 |
| Mind2Web | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；测试集禁止重分发 |
| MMLU-Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| MMLU | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| MMMLU | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；第二条现有样例语义需回查固定版本 |
| MMMU-Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；媒体权利逐项判断 |
| MMMU | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；媒体权利逐项判断 |
| MRCR v2（DeepMind） | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；与 OpenAI 实现分离 |
| MRCR（OpenAI） | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；与 DeepMind v2 分离 |
| OfficeQA Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；gated 且变体独立 |
| OmniDocBench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；PDF/媒体权利未统一覆盖 |
| OpenAI 前端偏好评测 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；仅记录官方已披露事实 |
| OSWorld 2.0 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；与 2.1 和 Verified 分离 |
| OSWorld | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；部分任务 gated |
| RULER | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；第三方文本权利分离 |

## 第五批

| Benchmark | 研究 | 内容 | 验收 | 备注 |
| --- | --- | --- | --- | --- |
| SciCode | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；现有样例逐字段复核 |
| ScreenSpot-Pro | 已完成 | 已完成 | 已完成 | PARTIAL；第三方软件截图权利未核实 |
| SimpleQA | 已完成 | 已完成 | 已完成 | PARTIAL；官方 CSV 本轮无法读取 |
| Small Overlapping Speech Bench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；两段音频逐字段复核 |
| SWE-bench Multilingual | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；第三方 issue/PR 权利未逐库核验 |
| SWE-bench Pro | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| SWE-bench Verified | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| SWE-bench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS |
| τ-bench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；现有过时版样例逐字段复核 |
| τ²-bench | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；任务数据许可未独立界定 |
| Terminal-Bench 2.0 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；版本和防训练边界独立记录 |
| Terminal-Bench 4.0 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；不借用旧版任务 |
| Terminal-Bench-Science 0.1 | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；canary 与防训练要求 |
| Video-MME | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；禁止未经许可再分发视频/数据 |
| WANDR | 已完成 | 已完成 | 已完成 | PASS_WITH_LIMITATIONS；第三方材料逐项遵守来源条款 |

## 执行记录

- 2026-09-23：建立覆盖 75 项的唯一进度台账；APEX-Agents 已完成官方数据页、访问门槛和用途限制核验，并按新结构迁移。
- 2026-09-23：第一批 15 项均已建立独立官方来源研究记录。1 项 PASS、12 项 PASS_WITH_LIMITATIONS、2 项 PARTIAL；BenchCAD、BFCL、AutomationBench 的现有站内样例已与官方记录逐字段复核。
- 2026-09-23：第二批 15 项研究记录完成，均为 PASS_WITH_LIMITATIONS；确认 GDPval 与 AA 协议、数据访问、版本口径、许可冲突和题目防泄漏边界，等待正式迁移。
- 2026-09-23：第三批 15 项研究记录完成，均为 PASS_WITH_LIMITATIONS；HealthBench/HLE 的披露限制、LifeSciBench 附件边界、LongBench 混合来源和多项数据/代码许可已分别记录。
- 2026-09-23：第四批 15 项研究记录完成，均为 PASS_WITH_LIMITATIONS；发现 MCP-Atlas split 标注和 MMMLU 第二条样例语义存在待修问题，并厘清 MMMU/MRCR/OSWorld 多版本与媒体、gated 数据边界。
- 2026-09-23：第五批 15 项研究记录完成。75 份研究档案与正式 ID 一一对应，均有 13 个栏目；总计 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL。
- 2026-09-23：确定正式内容候选结构；75 项将先进入隔离候选目录，完成字段引用和证据复核后再一次性迁移，不在生产内容中保留新旧双结构。
- 2026-09-23：75 份候选通过全量严格校验；稳定 ID、名称、顺序、分类、发布方、年份和类型与现有正式内容一致。根据证据暂保留 13 项共 22 条站内样例，撤回 5 项共 8 条无法满足当前回源或转载门槛的旧样例。
- 2026-09-23：在正式迁移前，将现有 75 份生产内容完整备份到 `artifacts/content-pre-reaudit/benchmarks/`；该备份只用于稳定身份审计；交叉复核通过后，75 份候选已一次性迁入正式内容。
- 2026-09-23：候选校验增加研究结论一致性、迁移前稳定身份、模型发布资料角色、数据分区重复、复用范围重复和异常拼接标点检查；已据此完成第二组 25 项交叉复核，范围校验为 25/25 通过。

- 2026-09-23：三组各 25 项的 GPT-6 Luna 交叉复核全部完成；最终结论为 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL，0 项 BLOCKED。
- 2026-09-23：生产 schema 已删除旧字段和临时双结构；搜索、卡片、详情、对比及样例组件只读取官方定义、任务合同、数据/复用/样例状态和带来源字段。
- 2026-09-23：最终保留 13 个 benchmark 的 22 条可回源真实样例；5 个 benchmark 的 8 条旧样例因回源、split 或转载证据不足撤回。
- 2026-09-23：全量候选校验、正式内容校验、严格 TypeScript、11 项测试、81 路由生产构建和静态产物检查通过。
- 2026-09-23：浏览器验收 APEX-Agents、GSM8K、HealthBench 和对比页；390px 手机宽度无整页溢出，控制台无错误。模型发布资料与 benchmark 官方资料分区正确。
- 2026-09-23：最新生产构建再次完成首页、APEX、GSM8K 与关于页冒烟检查；验收用 4173、4174 预览均已停止，端口无监听。
