# 全量代码功能审查 · 2026-09-24

> 本文正文保存修复前的审查快照与复现证据。用户随后授权修复全部 F1–F8；下方“修复验收记录”单独记录实施及最新验证，不将原来的文件哈希或 24 项测试当作修改后的证据。

本轮改用当前磁盘全量清单，不再只按架构热点抽查。覆盖 **66 个代码、配置与测试文件**：40 个 src 文件、13 个工具脚本、6 个测试文件、5 个根配置、1 个 HTML 入口、1 个发布工作流。源码按文件完整阅读；package-lock.json 采用结构与顶层依赖核对，不等于审计第三方依赖实现。

**“全量”指静态文件覆盖，不表示所有运行分支均已动态验证，更不表示代码无缺陷。** 本轮没有重建项目、启动服务、操作线上环境或修改业务代码。前几轮的浏览器/构建结果不冒充本轮验证。

## 本轮确认的问题

优先级：P2 = 应修复的功能或维护流程问题；P3 = 低影响或特定异常条件问题。以下是修复前发现，当前处理结果见文末修复验收记录。

### F1 / P2：带来源关系的条目不能正常转草稿

- 位置：[schema.ts](<E:/项目demo/benchmark show/src/content/schema.ts:418>)、[content-maintenance.ts](<E:/项目demo/benchmark show/scripts/content-maintenance.ts:32>)。
- `setStatus` 保留正式条目的 related，只修改状态；草稿关系严格对象却不接受 sourceUrls。
- **已隔离复现**：在 TEMP 夹具中保留 mmlu-pro 的有来源关系，移除全部入向关系和发布报告引用，再调用真实 `setStatus(..., 'draft')`，仍报 `related.0: Unrecognized key: "sourceUrls"`。不是正常的引用保护阻止撤回。
- 影响：撤回维护操作受阻。校验发生在写盘之前，本次失败没有修改正式内容。
- 测试缺口：现有夹具先清空 related，未覆盖保留来源的发布→草稿→发布往返。
- 修复方向：统一关系结构在状态转换中的语义，保留来源证据；不通过丢弃来源绕过校验。

### F2 / P2：采集全失败仍返回成功，旧研究记录可被后续消费

- 位置：[research-samples.mjs](<E:/项目demo/benchmark show/scripts/research-samples.mjs:80>)、[prepare-samples.mjs](<E:/项目demo/benchmark show/scripts/prepare-samples.mjs:5>)。
- 采集 catch 只输出错误，不提供失败退出状态；同 ID 的旧文件没有失效标记，整理脚本直接按固定名称读 rows。
- **已隔离复现**：TEMP 副本中模拟 11 个 fetch 全部失败，进程仍 exit 0，预置 mmlu.json 原样保留。没有请求外网。
- 影响：调用者难以辨认本轮采集失败，旧记录可能进入新整理候选。输出仍在候选目录，不能据此断言已污染正式发布内容。
- 修复方向：明确整批/部分失败结果，避免失败来源的旧文件被当成本批成功输出。

### F3 / P3：批量查询把纯符号当作任意五项候选

- 位置：[search.ts](<E:/项目demo/benchmark show/src/lib/search.ts:50>)。
- **已复现**：`recognizeNames('-;___')` 生成两行，每行返回 mmmlu、swe-bench-verified、gpqa-diamond、hle、aime-2025。
- 原因：原始输入非空，标准化后为空；回退搜索把空查询当成全部目录，再取前五项。
- 影响：粘贴分隔线等输入时，批量识别给出无依据的候选。
- 修复方向：识别阶段显式处理规范化后为空的名称，保留普通目录空查询展示全部的行为。

### F4 / P3：版本关系没有在所属栏目展示对应来源

- 位置：[DetailView.vue](<E:/项目demo/benchmark show/src/views/DetailView.vue>) 的 relations 区域。
- schema 保存并验证每条关系的 sourceUrls，但关系行只渲染名称、标签、解释和目标评测链接。
- **静态确认**：模板不消费 relation.sourceUrls。总来源表仍有来源，故不是全部证据丢失；按 URL 去锚点合并后，读者也难以直接定位某条关系的精确依据。
- 影响：关系说明的就近溯源弱于其他事实栏目，也与“各栏目保留精确依据”说明不一致。
- 修复方向：在关系所在位置提供来源入口，补关系说明与来源配对的渲染验证。

### F5 / P3：畸形样例记录没有进入错误与重试状态

- 位置：[sampleLoader.ts](<E:/项目demo/benchmark show/src/composables/sampleLoader.ts:6>)。
- **内存探针复现**：fetch 返回 `{ benchmarkId: 'x', samples: [{}] }` 被接受，error 为 false。
- 原因：传输检查只判断记录为非空对象，没有验证显示所需的最小字段。
- 影响：异常/损坏响应可能呈现空内容，正常错误提示和重试入口不出现。正式内容仍受构建 schema 校验，本轮没有发现正式样例损坏。
- 修复方向：补最小消费字段检查与异常响应测试，不将完整作者内容 schema 塞入浏览器。

### F6 / P3：对比 interface 的同步连续移除丢失前一次操作

- 位置：[compare.ts](<E:/项目demo/benchmark show/src/composables/compare.ts:37>)。
- **真实内存 Router 已复现**：从 mmmlu,swe-bench-verified,gpqa-diamond 同步移除前两项，最终留下 mmmlu,gpqa-diamond，预期只剩 gpqa-diamond。
- 原因：两次调用读取同一份尚未替换的 URL，后一次目标覆盖前一次。
- 触发边界：同一同步轮次调用；当前没有异步导航守卫，普通独立点击通常会先完成微任务导航，不声称普通快速点击必然触发。
- 修复方向：对比 module 自身吸收连续变更，保持 Router 的导航取消语义；补交叠调用测试。

### F7 / P2：日志失败时，维护命令报错但内容已经变更

- 位置：[content-maintenance.ts](<E:/项目demo/benchmark show/scripts/content-maintenance.ts:45>)。
- 新建、状态修改、删除都先完成内容操作，随后追加 UPDATE_LOG；追加失败被当作整个命令失败传出。
- **TEMP 实际复现**：将夹具的 UPDATE_LOG.md 建成目录以注入写入失败，执行归档得到 EISDIR，但源 JSON 已变为 archived 并写入归档原因。
- 影响：命令结果不能明确告知用户实际已提交的变更，盲目重试新建/删除尤其容易误判。此为故障注入结果，不表示真实项目日志目前不可写。
- 修复方向：明确内容操作与日志记录的结果语义，优先给出准确状态，避免为了日志引入通用事务框架。

### F8 / P2：favicon 缺失时，生成失败前已清空旧输出

- 位置：[content-pipeline.ts](<E:/项目demo/benchmark show/scripts/content-pipeline.ts:271>)。
- loadContent 没有验证 public/favicon.svg；generateContent 先 resetGenerated，再在最后复制 favicon。
- **TEMP 实际复现**：预置旧 .generated 标记文件并移除夹具 favicon，生成报 ENOENT，旧标记消失且目录留下部分新文件。
- 影响：生成失败后不能继续使用此前完整的生成结果，可能影响已运行的本地前端。作者源数据未被删除，修复缺失文件后可重新生成。
- 修复方向：至少把所有必需复制输入纳入替换前校验；进一步失败保护按实际需要处理，不把可重建产物等同于业务数据事务。

## 功能与验证总表

| 功能链路 | 本轮验证 | 结果与边界 |
|---|---|---|
| 页面路由、详情、栏目、404、站内跳转 | 全部相关源码静态审查；jsdom 检查现有 90 页 | 单一 H1、当前页锚点、2,043 个站内链接目标通过；未验证真实服务器未知路径状态码 |
| 目录搜索、过滤、排序、清空、视图与历史 | 真实内存路由测试和静态审查 | 对应测试通过；批量符号误识别见 F3 |
| 评测对比、分享、三项上限、跨页记忆 | 状态测试、内存 Router 探针 | 常规测试通过；同步重复调用见 F6 |
| 样例加载、取消、重试、过期响应 | loader/viewer 测试、畸形响应探针 | 正常生命周期测试通过；畸形记录见 F5 |
| 文本/代码/选择题/网格/记录/图片/音频/视频/附件 | schema、所有渲染分支与关联样式静态审查 | 并非所有类型均有当前正式样例或组件挂载测试，尤其图片/视频/字幕/file 实载未验证 |
| 定义、访问/许可、指标、限制、关系、来源展示 | 页面模板与 schema 消费契约核对 | F4；未在线重核 84 条资料事实和许可 |
| 草稿/发布/归档/撤回/删除/引用保护 | 全部维护源码、TEMP 生命周期测试与探针 | F1、F7；现有其他维护测试通过 |
| 公开投影、附件复制、生成清理与产物审核 | 内容测试、实际源校验、verifyBuild 只读核验 | 84 个条目、27 条样例、17 份报告通过；现有 dist 清单检查通过；生成失败保护见 F8 |
| 研究采集、候选整理、重审校验、来源审计 | 5 个工具完整静态审查；模拟失败探针 | F2；未请求真实上游 |
| 样式管理、断点、焦点、动效偏好 | 10 个 CSS 及局部样式静态审查 | 未新增足够证据支持再拆分；本轮未重跑浏览器视觉、键盘或屏幕阅读器验收 |
| npm 命令、严格类型、Vite/SSG、Pages 发布 | 配置审查、严格类型检查、三个 mjs 语法检查 | 通过；本轮未重建、部署或做远端 Actions 验收 |

## 实际执行的检查

- `node node_modules/vue-tsc/bin/vue-tsc.js --noEmit`：通过。
- `node node_modules/tsx/dist/cli.mjs --test tests/*.test.ts`：24/24 通过，覆盖 6 个测试文件。
- `scripts/validate-content.ts`：84 个公开条目、27 条样例、17 份报告通过。
- 直接调用 `verifyBuild()`：现有 dist 的样例/附件/详情路径清单通过；没有重新生成内容或构建。
- 三个 `.mjs` 的 `node --check`：通过。
- jsdom 遍历现有 90 个页面：单一 H1、当前页 hash 目标、2,043 个站内链接目标通过。
- 定向探针：无入向引用夹具的真实状态转换；采集全失败的退出码/旧文件；符号批量识别；畸形样例响应；对比连续同步操作。

## 不计作已确认缺陷的限制与缺口

- 两个 prepare 脚本未设置应用级请求超时，慢源/持续不结束的响应可能拖延任务；本轮未模拟此情况，也不声称每个请求会无限挂起。
- `prepare-samples` 的中文标题/解释按行位置绑定，上游排序变化需要人工复核。候选不会自动发布；未声称当前正式样例已错配。
- 搜索索引有明确字段范围，包含 taskContract.input/output，但不含 environment 等所有详情字段；不能仅凭架构文档中的“全文”一词推断必须支持每个字段。
- 没有 Vue 页面/媒体分支的自动挂载测试。已有 composable 测试不能代替 App 注入、水合、DOM、键盘与媒体加载验证。
- 生成与日志故障已有两个定向探针；文件锁重试、其他磁盘写失败、网络各错误码与 JSON 解析失败尚未全部逐分支模拟。
- GitHub Pages 工作流仅静态检查；未配置/验证远端部署。依赖锁检查不构成漏洞审计。
- `docs/CONTENT_MAINTENANCE.md` 仍写“尚未初始化 Git”，与已建立的本地 Git 基线不一致，属文档漂移。
- 当前主包体积告警来自此前构建，本轮没有新的性能采样，不以告警本身推断应拆出第二套数据链路。

## 全量文件快照与覆盖索引

下表覆盖当前机器清单全部 66 个唯一文件；文件内容的 SHA-256 前 12 位用于绑定本次审查版本。行数由机器统一计算，包含末尾换行产生的空行。文件列为已纳入审查，不等于所有分支均有测试或没有缺陷。


| 文件 | 行数 | SHA-256 前缀 | 审查/验证方式 |
|---|---:|---|---|
| [.github/workflows/pages.yml](<E:/项目demo/benchmark show/.github/workflows/pages.yml>) | 47 | 1C09D68EB602 | 完整静态审查；未运行远端工作流 |
| [.gitignore](<E:/项目demo/benchmark show/.gitignore>) | 20 | 278E7B84898F | 完整静态阅读；相关验证见职责表 |
| [index.html](<E:/项目demo/benchmark show/index.html>) | 19 | 6C3B408E8256 | 完整静态阅读；相关验证见职责表 |
| [package-lock.json](<E:/项目demo/benchmark show/package-lock.json>) | 3198 | 820E884233A8 | 锁文件结构、顶层依赖一致性；非依赖源码审计 |
| [package.json](<E:/项目demo/benchmark show/package.json>) | 36 | 324235A4EFA7 | 完整静态阅读；相关验证见职责表 |
| [scripts/audit-sources.ts](<E:/项目demo/benchmark show/scripts/audit-sources.ts>) | 47 | 0B8BE9D35EA1 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/build-site.ts](<E:/项目demo/benchmark show/scripts/build-site.ts>) | 51 | 2D42F158DC32 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/content-cli.ts](<E:/项目demo/benchmark show/scripts/content-cli.ts>) | 48 | 305CDF69AAFF | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/content-maintenance.ts](<E:/项目demo/benchmark show/scripts/content-maintenance.ts>) | 74 | 1E30F92976E7 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/content-pipeline.ts](<E:/项目demo/benchmark show/scripts/content-pipeline.ts>) | 295 | 41A01979138B | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/generate-content.ts](<E:/项目demo/benchmark show/scripts/generate-content.ts>) | 6 | 5151FD11FD91 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/postbuild.ts](<E:/项目demo/benchmark show/scripts/postbuild.ts>) | 43 | BB7F2317ACD0 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/prepare-extra-samples.mjs](<E:/项目demo/benchmark show/scripts/prepare-extra-samples.mjs>) | 80 | A659944A88DB | 完整静态阅读、语法检查；research另有失败探针 |
| [scripts/prepare-samples.mjs](<E:/项目demo/benchmark show/scripts/prepare-samples.mjs>) | 210 | 3BAFF3E61AF4 | 完整静态阅读、语法检查；research另有失败探针 |
| [scripts/research-samples.mjs](<E:/项目demo/benchmark show/scripts/research-samples.mjs>) | 85 | F6562EAFAEE3 | 完整静态阅读、语法检查；research另有失败探针 |
| [scripts/validate-content.ts](<E:/项目demo/benchmark show/scripts/validate-content.ts>) | 9 | F5AF76405EB4 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/validate-reaudit-candidates.ts](<E:/项目demo/benchmark show/scripts/validate-reaudit-candidates.ts>) | 102 | B291C726C3C0 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [scripts/verify-public-output.ts](<E:/项目demo/benchmark show/scripts/verify-public-output.ts>) | 70 | 00C02C33BCA2 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/App.vue](<E:/项目demo/benchmark show/src/App.vue>) | 98 | 4B756F5B28A4 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/ArcTask.vue](<E:/项目demo/benchmark show/src/components/ArcTask.vue>) | 116 | 8EC50CCA2E23 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/BenchmarkCard.vue](<E:/项目demo/benchmark show/src/components/BenchmarkCard.vue>) | 61 | E46470D985BC | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/EvidenceLinks.vue](<E:/项目demo/benchmark show/src/components/EvidenceLinks.vue>) | 56 | 4B88771C5EAC | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/Icon.vue](<E:/项目demo/benchmark show/src/components/Icon.vue>) | 70 | D3D3F7E47F26 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/PublisherMarks.vue](<E:/项目demo/benchmark show/src/components/PublisherMarks.vue>) | 151 | E4F1B1FBED10 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/SampleMedia.vue](<E:/项目demo/benchmark show/src/components/SampleMedia.vue>) | 148 | 65C1327BF4F3 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/components/SampleViewer.vue](<E:/项目demo/benchmark show/src/components/SampleViewer.vue>) | 235 | 36AD9F861842 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/composables/catalogNavigation.ts](<E:/项目demo/benchmark show/src/composables/catalogNavigation.ts>) | 18 | 1C2167FFE038 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/composables/catalogQuery.ts](<E:/项目demo/benchmark show/src/composables/catalogQuery.ts>) | 10 | 0AFD24E11480 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/composables/compare.ts](<E:/项目demo/benchmark show/src/composables/compare.ts>) | 78 | 25F9D2F631DE | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/composables/sampleLoader.ts](<E:/项目demo/benchmark show/src/composables/sampleLoader.ts>) | 63 | 3C2257CFDA21 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/composables/sampleViewer.ts](<E:/项目demo/benchmark show/src/composables/sampleViewer.ts>) | 66 | DFB03911DA0A | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/content/brands.ts](<E:/项目demo/benchmark show/src/content/brands.ts>) | 11 | C41460A3406B | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/content/catalog.ts](<E:/项目demo/benchmark show/src/content/catalog.ts>) | 20 | EAB585D6B2D3 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/content/labels.ts](<E:/项目demo/benchmark show/src/content/labels.ts>) | 52 | 83885E08825D | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/content/releases.ts](<E:/项目demo/benchmark show/src/content/releases.ts>) | 4 | 43F26EEC3CF8 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/content/schema.ts](<E:/项目demo/benchmark show/src/content/schema.ts>) | 452 | 7AEC69D201D5 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/lib/catalogQuery.ts](<E:/项目demo/benchmark show/src/lib/catalogQuery.ts>) | 121 | F2086AB95487 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/lib/comparison.ts](<E:/项目demo/benchmark show/src/lib/comparison.ts>) | 20 | 3EAAEEAD6246 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/lib/search.ts](<E:/项目demo/benchmark show/src/lib/search.ts>) | 73 | E0923490371F | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/main.ts](<E:/项目demo/benchmark show/src/main.ts>) | 64 | 43662FFCA517 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/styles/base.css](<E:/项目demo/benchmark show/src/styles/base.css>) | 164 | 5F29113EFBB4 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/benchmark-card.css](<E:/项目demo/benchmark show/src/styles/benchmark-card.css>) | 210 | 9339B899768A | 完整静态审查；本轮未做视觉验收 |
| [src/styles/catalog.css](<E:/项目demo/benchmark show/src/styles/catalog.css>) | 457 | 7766523A860F | 完整静态审查；本轮未做视觉验收 |
| [src/styles/detail.css](<E:/项目demo/benchmark show/src/styles/detail.css>) | 435 | 107334B29866 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/layout.css](<E:/项目demo/benchmark show/src/styles/layout.css>) | 277 | 5C53EEB287C0 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/main.css](<E:/项目demo/benchmark show/src/styles/main.css>) | 9 | 33536E5A6438 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/reading.css](<E:/项目demo/benchmark show/src/styles/reading.css>) | 207 | EC8DCFA07198 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/sample-viewer.css](<E:/项目demo/benchmark show/src/styles/sample-viewer.css>) | 312 | 936B7B09F3C5 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/shared.css](<E:/项目demo/benchmark show/src/styles/shared.css>) | 141 | 57608FAF56A7 | 完整静态审查；本轮未做视觉验收 |
| [src/styles/tokens.css](<E:/项目demo/benchmark show/src/styles/tokens.css>) | 14 | C678D3E091EC | 完整静态审查；本轮未做视觉验收 |
| [src/types/benchmark.ts](<E:/项目demo/benchmark show/src/types/benchmark.ts>) | 14 | 853E2444F6E5 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/AboutView.vue](<E:/项目demo/benchmark show/src/views/AboutView.vue>) | 46 | 0017FE9E0FE7 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/CompareView.vue](<E:/项目demo/benchmark show/src/views/CompareView.vue>) | 107 | AC80DA719DA1 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/DetailView.vue](<E:/项目demo/benchmark show/src/views/DetailView.vue>) | 440 | A131F25864EB | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/ExploreView.vue](<E:/项目demo/benchmark show/src/views/ExploreView.vue>) | 261 | F1A7EB7B0578 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/GuideView.vue](<E:/项目demo/benchmark show/src/views/GuideView.vue>) | 87 | 74DDB9C0871B | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/NotFoundView.vue](<E:/项目demo/benchmark show/src/views/NotFoundView.vue>) | 13 | 9E8269EE7A1D | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [src/views/ReleasesView.vue](<E:/项目demo/benchmark show/src/views/ReleasesView.vue>) | 59 | 35E90323D725 | 完整静态阅读、类型检查；具体运行覆盖见下表 |
| [tests/catalog-query.test.ts](<E:/项目demo/benchmark show/tests/catalog-query.test.ts>) | 163 | 3E68CA13E81D | 完整静态阅读；24项全套执行通过 |
| [tests/comparison.test.ts](<E:/项目demo/benchmark show/tests/comparison.test.ts>) | 104 | D7145D0C4D94 | 完整静态阅读；24项全套执行通过 |
| [tests/content.test.ts](<E:/项目demo/benchmark show/tests/content.test.ts>) | 364 | 6B5C894EAEDE | 完整静态阅读；24项全套执行通过 |
| [tests/sample-loader.test.ts](<E:/项目demo/benchmark show/tests/sample-loader.test.ts>) | 119 | 0FE65C6928B4 | 完整静态阅读；24项全套执行通过 |
| [tests/sample-viewer.test.ts](<E:/项目demo/benchmark show/tests/sample-viewer.test.ts>) | 116 | 4830AC2536ED | 完整静态阅读；24项全套执行通过 |
| [tests/search.test.ts](<E:/项目demo/benchmark show/tests/search.test.ts>) | 103 | 3B9F2E964EFD | 完整静态阅读；24项全套执行通过 |
| [tsconfig.json](<E:/项目demo/benchmark show/tsconfig.json>) | 27 | BCFA353B2F43 | 完整静态阅读；相关验证见职责表 |
| [vite.config.ts](<E:/项目demo/benchmark show/vite.config.ts>) | 11 | 6B06AF1BC944 | 完整静态阅读、类型检查；具体运行覆盖见下表 |

## 前端：逐文件职责、异常分支与覆盖

以下表格描述本轮及自动化覆盖。此前的手动浏览器验收见 UPDATE_LOG，不把缺少自动挂载测试等同于从未手测。schema 的完整校验审查另见内容章节。

### 应用、类型与内容适配

| 文件 | 职责、输入与输出 | 异常/边界分支 | 测试覆盖 |
|---|---|---|---|
| `src/main.ts` | ViteSSG 创建应用；静态详情、栏目、404 路由；目录滚动位置注入；hash/导航滚动。输入为生成目录和 Vue Router 路由状态。 | 未命中进入 NotFound；SSR 不安装 window 守卫；保存位置、hash、同路径分别处理。 | 无路由/SSG 测试；主审另做产物目标核验，非浏览器导航验收。 |
| `src/App.vue` | 站点框架与导航；按应用实例创建对比状态并提供；展示底栏、选中项、提示。 | 选择为空时隐藏 dock；不足两项禁入对比入口；卸载 dispose。 | `comparison.test.ts` 测状态机，未挂载 App 验导航/ARIA/真实布局。 |
| `src/types/benchmark.ts` | 从内容 schema 推导公开 Benchmark、Category、TaskSample、SampleFile 消费类型；样例传输文件契约含 benchmarkId/retrievedAt/samples。 | TS 类型本身无运行时检查。 | loader/viewer fixtures；未证明真实网络 JSON。 |
| `src/content/catalog.ts` | 将生成 catalog/categories JSON 适配为公开列表、全量列表、ID/类别索引和类型标签。输入为构建生成文件。 | 默认依赖生成文件与强制类型断言；没有运行时兜底。 | content tests 校验生成投影；页面功能无组件测试。 |
| `src/content/brands.ts` | 生成品牌资产转 id 映射，并从 benchmark 自身品牌引用生成关联。 | 缺失品牌由 PublisherMarks 过滤，全部缺失显示文字。 | content tests 的资产/引用验证覆盖上游；没有 PublisherMarks 渲染测试。 |
| `src/content/labels.ts` | 状态/访问/许可/披露/来源角色枚举到中文标签。 | 映射新增枚举需同步，否则调用方可能取 undefined。 | 未单测映射与各页面枚举呈现。 |
| `src/content/releases.ts` | 生成发布资料适配为 Release 数组。 | 强制类型断言，无本地错误恢复。 | content tests 检查生成输入链路，未测试发布资料页。 |
| `src/content/schema.ts` (449，另一审查负责) | 本审查仅核对消费契约：TaskSample 与 SampleAsset 是 types 导出；样例 assets 的 kind 分派到图/音/视频/file，gridTask 供 ARC；各栏目 sourceUrls 应映射到 sources；relation 有 sourceUrls；样例访问 URL 和 sourceUrls 分别使用。 | 关系来源在详情关系区未展示；样例传输读入不复用全量 schema（设计说明如此）。schema 本身的校验结论不在本报告评价。 | 由数据审查者负责。 |

### 查询、识别、比较及样例生命周期

| 文件 | 职责、输入与输出 | 异常/边界分支 | 测试覆盖 |
|---|---|---|---|
| `src/lib/search.ts` | NFKC/小写/分隔符归一化；建名字与字段索引；按精确名、部分名、corpus 排序；批量切分和识别。 | 空查询回全目录；批量最多60；同一原始字符串去重但大小写变体不去重；规范化为空时误命中前五候选；全文字段范围较窄。 | `search.test.ts` 覆盖名称、年份版本、常见分隔符、重复值、未知名、60上限和新增名称；未覆盖标点空串、索引字段全文范围、异形 Unicode 标点。 |
| `src/lib/comparison.ts` | 比较选择上限3；按 ID 去重、去未知项；解析分享 URL 字符串。 | 数组 query 不解析；过滤未知后再限额；全量条目 map 允许 archived。 | `comparison.test.ts` 覆盖未知/重复/归档、数组 query 和上限。 |
| `src/composables/compare.ts` | 应用实例级选择；对比页 URL 权威，其他页面记忆选择；切换/清空更新 URL；挂载后恢复分享选择。 | SSR/hydration 先关闭 active；无效 ID 忽略；上限提示；导航失败退出；快速连续 URL 更新可能互相覆盖。 | `comparison.test.ts` 覆盖分步 await、历史、分享、隔离，不覆盖连续 toggle。 |
| `src/lib/catalogQuery.ts` | URL scalar 查询解析、筛选交集、名称/年份排序、重置和目录统计；创建 router-backed 状态接口。 | 重复参数变空；未知 sort/view 回默认；未知筛选自然空结果；reset 留 sort/view；快速筛选用 queuedQuery 合并。 | `catalog-query.test.ts` 覆盖解析、交集、排序不变更源数据、未知过滤、连续筛选、reset、history、离开目录竞态。 |
| `src/composables/catalogQuery.ts` | 将当前 Vue Router 接入目录查询接口。 | 依赖 setup 环境的 useRouter。 | 由 catalog-query 集成式内存路由测试覆盖工厂；未测 Vue 注入本身。 |
| `src/composables/catalogNavigation.ts` | 提供/注入应用实例目录 URL Ref。 | 缺少 provider 时立即抛出清晰 Error。 | 无专用测试。 |
| `src/composables/sampleLoader.ts` | 等挂载门控后请求样例 JSON；切题/重试/卸载取消请求；忽略过期结果；提供错误与 reload。 | HTTP 错误、JSON/网络异常、错误 ID/空 samples；对象内字段未经核验。console.error；abort 不置错。 | `sample-loader.test.ts` 覆盖门控、abort、过期响应、ID错误、重试、关闭；缺少损坏单条对象字段（本轮探针发现）。 |
| `src/composables/sampleViewer.ts` | 协调当前样例索引、read/raw 模式、选项、答案和失败媒体路径。 | 新数据/换题清状态；媒体失败仅接受当前资产路径；模式切换保留状态。 | `sample-viewer.test.ts` 覆盖重置、模式保持、换题、重试、切换条目和无关 asset。 |

### 组件

| 文件 | 职责、输入与输出 | 异常/边界分支 | 测试覆盖 |
|---|---|---|---|
| `src/components/BenchmarkCard.vue` | 展示目录卡片、发布方标识、类型/核验状态、概要、样例入口及对比 toggle。输入 Benchmark，通过 inject 调用比较状态。 | 核验状态仅 partial/blocked 显示；选择文案/aria 随状态变更。 | 无组件渲染/无障碍测试；comparison composable 间接覆盖状态。 |
| `src/components/EvidenceLinks.vue` | 将栏目 URLs 按 source URL 顺序去重映射为官方依据链接。 | 找不到 source 的 URL 被静默过滤；重复 URL 只显示一次；新开外链。 | 无组件测试；schema/内容校验覆盖上游内容。 |
| `src/components/Icon.vue` | icon 名到 Lucide Vue 图标映射并提供未知名 help fallback。 | 未知图标降级 CircleHelp；图标 aria-hidden。 | 无组件测试。 |
| `src/components/PublisherMarks.vue` | 从品牌关联展示标志；缺少、加载失败、SSR 已失败图像回退发布方文字。 | 图片 complete 且 naturalWidth 0 的补偿；benchmarkId 变化清失败记录；缺资源回退。 | 无 jsdom/浏览器图片错误测试；Content tests 校验文件存在。 |
| `src/components/ArcTask.vue` | 将数字格任务示范/测试输入输出绘为 SVG；测试输出答案前隐藏。 | 无测试时不渲染；answer false 隐藏测试输出；row/column labels。 | 无专用组件测试；样例 schema 测试非法矩阵。 |
| `src/components/SampleMedia.vue` | 展示 image/audio/video/file、poster、字幕、转录、caption 与媒体源；向父级发失败事件。 | 失败媒体以错误提示代替；file 不进入媒体错误支路；路径由 BASE_URL 前缀。 | 无媒体组件/实际文件加载测试；样例 schema 检查部分类型结构。 |
| `src/components/SampleViewer.vue` | 客户端挂载后按本地样例状态加载；外部/受限入口；展示任务、raw、选项、答案、ARC、媒体、解释及出处许可。 | 外部入口 URL 可无；dataAccess 与 reuse 条件决定下载提示；loader loading/error；答案/许可/资产均条件渲染。 | composable 测试覆盖状态，未有 Vue 渲染、组件交互、媒体加载、ARIA/浏览器测试。 |

### 页面

| 文件 | 职责、输入与输出 | 异常/边界分支 | 测试覆盖 |
|---|---|---|---|
| `src/views/ExploreView.vue` | 首页目录搜索、批量识别、分类/发布方/样例/类型筛选、排序/视图、卡片、空状态。状态经 URL。 | 未匹配空态；移动筛选开闭；批量关闭；类别选择关闭 mobile 面板；清筛保留展示参数。 | search 与 catalog-query lib 测试；没有页面联动、键盘、移动端验收。 |
| `src/views/DetailView.vue` | 评测全量详情：面包屑、归档说明、定义、任务、数据访问/许可、样例、评分/限制、关系、资料及模型报告关联；head meta。 | 找不到 item 显示空态；归档禁止加入对比；source URL 去 hash 合并；无数据入口时从 sourceUrls 回退；无 relation/vendor/release 时隐藏。relation 精确 sourceUrls 未在关系区显示。 | content 数据测试覆盖源结构；没有渲染/来源分组/归档路由测试。 |
| `src/views/CompareView.vue` | 根据选择构建表格；对比定义、输入输出、环境、访问/许可、分数、版本、限制和首个来源。 | 少于两项显示空态；无效 ID 映射被滤除；归档列标识。 | comparison 状态测试，无表格渲染/语义浏览器测试。 |
| `src/views/AboutView.vue` | 展示收录、来源、样例权利与隐私说明；数量取 published benchmarks。 | 计数随目录投影变化。 | 无视图内容测试。 |
| `src/views/GuideView.vue` | 静态阅读指南，内部链接到示例评测并列参考资料。 | 链接内容依赖路由中对应 ID 存在。 | 主审的生成页内部目标核验间接确认目标存在；没有观点/内容测试。 |
| `src/views/NotFoundView.vue` | 通配和显式 404 视图，head 标题及返回目录入口。 | 任何未匹配路由均可达。 | 没有真实路由测试；主审产物检查未等价于未知 URL 服务端 404 状态检查。 |
| `src/views/ReleasesView.vue` | 发布资料卡片、关联评测入口、官方发布与成绩图链接。 | chartUrl 缺失隐藏；benchmarkIds 依赖管道引用校验。 | content test 有 release 引用/删除保护，未测试页面呈现。 |

### 样式

| 文件 | 职责、输入与输出 | 异常/边界分支 | 测试覆盖 |
|---|---|---|---|
| `src/styles/main.css` | 唯一全局样式入口，按 token/base/shared/layout/catalog/reading/detail 顺序导入。 | component stylesheet 另行加载。 | 无 CSS 构建/视觉测试（本轮禁构建）。 |
| `src/styles/tokens.css` | 语义颜色及焦点颜色变量。 | 颜色 token 缺省无 fallback。 | 无样式测试。 |
| `src/styles/base.css` | 元素默认、容器、skip link、focus-visible、sr-only、响应式容器、减少动画。 | 700/1190断点、prefers-reduced-motion。 | 无视觉/键盘实测。 |
| `src/styles/shared.css` | 按钮、标签、空态、阅读页通用样式和移动阅读布局。 | 700断点。 | 无样式测试。 |
| `src/styles/layout.css` | 页眉导航、页脚、comparison dock。 | 1190/900/700断点，手机 dock 换行。 | 无浏览器布局验证。 |
| `src/styles/catalog.css` | 目录检索、批量输入、筛选、工具栏、卡片网格与空态布局。 | 1190/900/700响应式，手机筛选折叠。 | 无视觉/窄屏检查。 |
| `src/styles/benchmark-card.css` | 卡片、列表模式上下文、核验状态标记与卡片操作。 | list-view 桌面/窄屏重排；700断点。 | 无视觉测试。 |
| `src/styles/detail.css` | 详情结构、证据区、数据与许可、评分、关系、来源列表。 | 900/700响应式；长值换行。 | 无视觉/窄屏/锚点遮挡测试。 |
| `src/styles/reading.css` | 发布卡、对比表横滚、指南、关于及 404 样式。 | 700断点；对比表设置最小宽度。 | 无视觉/横向滚动键盘实测。 |
| `src/styles/sample-viewer.css` | 样例媒体、任务、raw、选项答案、出处和查看器布局。 | 900/700断点；媒体宽度/文本换行。 | 无实际媒体、键盘或视觉测试。 |

### 前端测试文件

| 文件 | 主要输入/输出和覆盖 | 异常分支/空缺 |
|---|---|---|
| `tests/search.test.ts` | normalize、搜索排序入口、AIME/MRCR 版本、批量中文分隔、去重、unknown、60项、多个发布名精确对应。 | 标点-only 规范化空串、全文字段覆盖和重复大小写不测。 |
| `tests/catalog-query.test.ts` | LocationQuery 标量解析、display fallback、filter/reset、交集、year sort、不可变源列表、未知筛选、memory router 连续筛选与 history、离开目录竞态。 | 没有 ExploreView DOM、快速输入 debounce/滚动与真实浏览器验证。 |
| `tests/comparison.test.ts` | 分享 ID 归一化、归档保留、active hydration、移除/清除、其它页面记忆、历史、上限提示、应用实例隔离。 | 操作按顺序 await；连续 toggle 覆盖缺失。 |
| `tests/sample-loader.test.ts` | fetch 延迟、abort、过期响应、mounted gate、错误 ID、retry、disable 清状态、unmount cleanup。 | response 样例对象只有 `{}` 的畸形记录未拒绝；不覆盖真实文件、HTTP错误码和 JSON parse 错误分别表现。 |
| `tests/sample-viewer.test.ts` | read/raw 保状态、切题重置、答案/选项重置、媒体失败去重/限定、retry/benchmark 切换及 gate。 | 纯 composable 测试，无组件 DOM、答案 disclosure 和媒体事件集成。 |
| `tests/content.test.ts` | 草稿不投影；公开投影/独立更新日期；归档/撤样例/删除产物清理；引用删除保护；品牌/资源/日期/未知字段校验；多种题型及许可限制。 | 属于内容管道/建模覆盖，不验 UI、路由和真实浏览器。schema 本身完整结论归数据审查。 |


## 内容与构建：逐文件功能分支

| 文件 | 输入/输出与职责 | 审查的异常分支 | 本轮验证及缺口 |
|---|---|---|---|
| `src/content/schema.ts` | 作者内容/来源/关系/状态/题型/资产路径 → 严格结构和类型 | 缺字段、未知字段、重复ID、来源未登记、题型不匹配、许可条件、归档原因、草稿宽松正文 | 类型与内容测试通过；有来源关系转草稿见 F1；媒体路径不等于媒体实际可播放 |
| `scripts/content-pipeline.ts` | 作者目录 → workspace/公开投影/删除影响/生成JSON与复制资源 | 草稿隔离、归档保留、关系/报告引用、realpath越界、符号链接、大小/空文件、重置生成目录 | 内容测试、实际校验及 TEMP 生成故障；F8；文件锁/写盘中断未穷举 |
| `scripts/content-maintenance.ts` | new/status/delete请求 → 源文件变更与日志 | 非法ID、重名、发布前校验、入向引用、归档说明、临时替换、日志故障 | 直接函数测试与 TEMP 故障注入；F1/F7；未逐个模拟 new/delete 的日志故障 |
| `scripts/content-cli.ts` | argv → 维护函数、stdout/stderr/退出码 | help、缺ID、未知命令、空归档原因、维护异常 | 完整静态/类型；自动测试主要直接调用函数，未覆盖全部CLI进程输入输出 |
| `scripts/generate-content.ts` | 当前工作区 → 生成输出、数量日志 | 生成器错误向上传播 | 底层函数测试；没有独立脚本stdout测试；本轮未对真实工作区生成 |
| `scripts/validate-content.ts` | 当前工作区 → 校验结果与数量 | 读取/结构/引用/资源错误向上传播 | 本轮实际执行通过，84条目/27样例/17报告 |
| `scripts/verify-public-output.ts` | workspace+生成/发布目录 → 清单与样例内容断言 | 旧样例/资源/页面残留、遗漏、样例JSON过期 | 内容测试+现有dist验证通过；不校验所有附件字节与HTML正文新鲜度 |
| `scripts/postbuild.ts` | dist及可选SITE_URL → 404.html/.nojekyll/sitemap/robots | 缺预渲染正文、缺固定路由、站点URL、XML转义 | 完整静态/类型；本轮未执行会写dist的入口；现有HTML另核验 |
| `scripts/build-site.ts` | 配置与内容 → Vite SSG构建及产物审核 | 固定目录清理、拒绝符号链接、仅处理指定临时目录EBUSY rmdir、保留编译失败 | 完整静态/类型；本轮未构建，Windows文件锁分支未故障注入 |
| `tests/content.test.ts` | TEMP夹具 → schema/维护/生成/产物断言 | 无效发布不落盘、引用删除拒绝、撤样例清理、未知字段/日期/路径与题型 | 7项通过；fixture清空related掩盖F1；F7/F8尚未加入正式回归测试 |

附加检查：`content/templates/benchmark.json` 完整读取，空白草稿不应直接发布；84个正式条目及共用分类/品牌/报告经过统一校验。这里检查程序结构、引用和资源，并未对84份条目的每项事实及许可进行外部复核。

## 工具、入口与配置：逐文件功能分支

| 文件 | 功能与输入输出 | 异常/覆盖说明 |
|---|---|---|
| `scripts/audit-sources.ts` | 从已校验正式内容收集唯一URL，5路HEAD探测，写来源状态报告 | 每请求15秒超时；HTTP拦截不等于事实错误；本轮未触网执行 |
| `scripts/research-samples.mjs` | 11来源的JSON/JSONL/gzip/文本 → 未发布研究记录 | 45秒请求超时、解析异常；模拟全部失败仍exit0并留旧文件，见F2 |
| `scripts/prepare-samples.mjs` | 研究rows与下载许可 → 8组候选、preparedAt | 缺输入/许可失败、顺序绑定标题、无本批状态检查；F2衔接；未联网执行 |
| `scripts/prepare-extra-samples.mjs` | ARC/MMMLU公开记录与许可 → 候选JSON | HTTP失败抛错，未设应用级超时；retrievedAt为本机本次获取日期，不是上游发布日期；未联网执行 |
| `scripts/validate-reaudit-candidates.ts` | 候选、旧基线、研究档案 → schema/身份/结论/来源角色审核 | 缺目录、字段不一致、研究结论格式、候选集合不一致；本轮静态/类型，未执行候选命令；属于旧75项重审专用工具，不等于当前84项正式校验 |
| `package.json` | 定义生成、类型、测试、构建、预览与维护入口 | test/build调用生成链路；本轮为只读使用底层等效类型/测试入口，未触发pre生成 |
| `package-lock.json` | 精确依赖解析锁 | 解析结构及顶层依赖对应；不审计node_modules源码或联网漏洞库 |
| `tsconfig.json` | strict/noUnused/noEmit及src/scripts/tests范围 | mjs不在TS类型检查内，另做node语法检查；本轮通过 |
| `vite.config.ts` | Vue插件、.generated/public、BASE_PATH、SSG nested输出 | 根路径/子路径配置静态核对；本轮未重新构建两种base |
| `.github/workflows/pages.yml` | main/手动 → install/test/build/upload/deploy | build与deploy权限分离、真实Pages输出配置；未远端执行 |
| `.gitignore` | 排除依赖、生成/构建、本地环境、候选和交付包 | 当前磁盘盘点也检查忽略目录中的第一方代码，未将vendor列入源码审查 |
| `index.html` | 中文页面壳、站点描述、favicon、Vue入口 | BASE_URL占位符及唯一app根；现有生成HTML已检查 |

## 结论与处理顺序

先处理维护结果与生成失败的正确性（F1、F7、F8）以及采集批次失败（F2），再修页面/查询的小缺陷（F3、F4）和异常响应/时序（F5、F6）。不因这次扩大审查而推翻现有静态站、统一schema、样式分域或增加后台/全局状态框架。

这份报告完成的是全量第一方代码功能静态审查与定向验证；真实浏览器全分支、上游在线服务、远端部署和第三方依赖安全审计仍是明确边界。发现后的修复与验证单独记录如下。

## 修复验收记录

用户授权全部修复后，保留现有静态站和样式归属，按原有模块修正已确认问题，不引入后台、通用事务框架或另一套状态管理。实施和最终验收结果见本节及 UPDATE_LOG.md。

| 编号 | 修复 | 定向验证 |
|---|---|---|
| F1 | 草稿复用正式关系结构，来源可缺省但既有来源不丢失 | 有出向来源、无入向引用的发布→草稿→发布；草稿样例不公开 |
| F2 | 采集先置 running，记录各来源结果；任一失败非零退出；prepare 在副作用前核验成功批次和所需输入 | TEMP 与模拟网络：全失败、部分失败、成功后失败、running、缺失文件、旧文件、真实 CLI 退出码 |
| F3 | 批量名称标准化后为空时不再回退全目录 | 纯分隔符输入与普通空目录搜索分别验证 |
| F4 | 每条关系旁复用 EvidenceLinks，保留精确来源 URL；关系导航和外链分离 | 全量静态产物链接核对及桌面/窄屏浏览器验收 |
| F5 | 请求边界检查样例必需字段及渲染所需容器结构，异常进入统一重试状态 | 损坏记录、错误 ID、异常媒体/网格、重试恢复和正式样例兼容 |
| F6 | 连续操作合并待完成选择，界面仍读取已生效 URL | 同步连续移除、清空组合、取消及离开页面；浏览器分享和移除 |
| F7 | 内容已保存后的日志失败单独警告，并明确要求补记而非重复操作 | TEMP 日志目录故障注入，验证新建、归档、删除实际结果 |
| F8 | 清理旧输出前读取并验证 favicon，输出使用已读取内容 | 缺失/空文件时旧输出逐文件字节不变；恢复输入后正常生成 |

**F1–F8 全部已修复并完成本轮验收。** 最新结果：

- 严格 TypeScript 通过；全量测试 **39/39** 通过，收尾测试断言修正后相关 **12/12** 再通过；变更的三个 mjs 语法检查通过。
- 内容重新生成及校验通过：84 个公开条目、27 条样例、17 份报告。加载器逐份接受 18 个正式样例文件中的全部 27 条记录。
- 生产构建通过：90 个路由页，加 postbuild 复制的 Pages `404.html`，磁盘共 91 个 HTML。全量检查 84 个详情、2,051 个站内链接及锚点、34 条关系的精确来源和顺序通过；每页单 H1。原审查阶段的页数统计保留为历史，不用于替代这次新产物检查。
- 浏览器验证：MMLU-Pro 关系来源在桌面与 390px 视口下正确呈现，实际内容宽 375px，无整页横向溢出；纯符号批量输入无候选而正常名称准确匹配；对比分享刷新、移除、清空同步 URL 和底栏；样例请求阻断后提示失败，解除并重试恢复题面和答案操作。
- 正常交互无控制台警告/错误；故障注入只有预期 fetch 失败日志。临时网络规则、视口覆盖、标签及生产预览已清理。
- 文档中的 Git 初始化状态已纠正。未修改正式评测内容、请求真实采集上游、推送或部署；生成输入失败保护不等于所有磁盘写入中断均支持事务回滚。构建保留既有主包体积提示（652.69 kB，gzip 185.88 kB），未增加第二套数据链路。
