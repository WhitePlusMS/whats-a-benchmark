# 内容维护：新增、更新、归档与删除

日常只编辑 `content/benchmarks/<id>.json`。一条评测的官方定义、任务协议、数据结构、访问和复用边界、来源、Logo 引用、核验日期与精选样例都在同一个文件；目录、详情路由、对比数据、样例文件和附件清单由构建自动生成。已有题型无需修改 Vue 页面。

## 文件归属

| 位置 | 用途 | 是否手工维护 |
| --- | --- | --- |
| `content/benchmarks/<id>.json` | 单条评测完整内容 | 是 |
| `content/categories.json` | 共用能力分类，新增分类无需改类型枚举 | 是 |
| `content/brands.json` | 机构/项目标识与官方出处 | 是 |
| `content/releases.json` | 公开模型发布资料及引用的评测 ID | 是 |
| `content/assets/` | Logo、许可原文、样例图片、音频、视频、字幕与附件 | 是 |
| `content/templates/benchmark.json` | 新建草稿模板 | 通常不用改 |
| `.generated/` | 已校验的公开元数据与按需加载样例 | 否，自动重建 |
| `dist/` | 最终静态网站 | 否，自动重建 |
| `artifacts/candidates/` | 采集/整理候选，尚未采用 | 不会自动发布 |

`src/content/catalog.ts`、`brands.ts`、`releases.ts` 只负责读取生成结果，不再添加条目或手工登记映射。共享素材只登记一次；新增一个未知机构时，仍需要新增素材文件和品牌记录。

## 新增一个评测

在项目根目录执行，以下 `my-benchmark` 是自选稳定 ID 的示例：

```powershell
npm run content -- new my-benchmark
```

这会创建 `content/benchmarks/my-benchmark.json`，默认 `status: "draft"`。填好该文件后执行：

```powershell
npm run content -- publish my-benchmark
npm test
npm run build
```

发布命令只把源文件状态变为已发布，不会直接上传网站；源文件整体校验通过后才保存。构建得到 `dist/`，推送到已配置的仓库后由 Pages 工作流部署。远程仓库为 [WhitePlusMS/whats-a-benchmark](https://github.com/WhitePlusMS/whats-a-benchmark)，`origin` 已绑定；推送到 `main` 会触发 Pages 工作流。

首次安装执行 `npm ci`。`typecheck`、`test` 和 `build` 都会先生成公开数据，全新检出不需要手工准备 `.generated`。如已有开发服务运行，编辑内容后执行 `npm run content:generate` 更新其读取的数据，无需另开服务。

## 每条文件需要填写什么

- `id`：小写英文、数字和短横线，必须与文件名一致。创建后保持稳定；修改显示名称只改 `name`。
- `status`：`draft` 草稿、`published` 已发布、`archived` 本站归档。
- `order`：编辑精选顺序，数值越小越靠前；同值按 ID 排列。
- `name`、`subtitle`：正式名称和辅助描述；`subtitle` 用于检索。
- `category`、`tags`：共享分类 ID 和能力标签。
- 主分类按主要测量目标选择：修复或生成可运行程序用 `coding`；专业办公、金融、法律、医疗或科学工作产出用 `work`；通用浏览、终端或多工具执行用 `agents`；跨能力体系和综合指数用 `general`；故事、脚本、视觉设计作品用 `writing`。跨领域信息以现有 `tags` 补充，不新增第二套分类字段。
- 情绪理解和多轮交流按任务目标归入 `alignment`，不因输出是文字就归为写作。长篇故事生成用 `writing`，长文检索和跨文档推理用 `context`；PDF 文件格式本身不能决定其是否属于多模态。中文、自然语言翻译和编程语言分别写明确标签，避免含糊的“多语言”。
- `publisher`、`brandIds`：完整发布方文字和标识 ID 数组，联合发布可引用多个 Logo；没有核实 Logo 时用空数组。
- `year`、`version`、`kind`：首次年份（未知填 `null`）、具体版本、独立/子集/衍生/体系/内部类型。
- `researchStatus`：本轮证据核验结论，取 `pass`、`pass-with-limitations`、`partial` 或 `blocked`；不能用文案完整度冒充资料完整度。
- `officialDefinition`：摘要用一句任务加一项关键区别，目标不超过 80 个字符；版本历史、规模差异和核验过程归对应详情字段。官方任务定义及 `sourceUrls` 保留完整依据。
- `taskContract`：模型收到的输入、应提交的输出、运行环境与官方依据，三项不能互相复制。
- `dataProfile`：数据概述、公开程度、规模、split、字段和文件。官方未披露的栏目保留空数组并使用准确的 `disclosure`，不得推测补齐。
- `dataAccess`：数据访问状态、要求、可选官方入口及依据。公开、受控访问必须给出入口。
- `reusePolicy`：数据/代码/媒体适用的许可、使用范围、具体边界及依据；仓库代码许可不能自动替代题目或媒体许可。
- `sampleAccess`：站内真实案例、官方入口、受控访问、限制公开、私有、许可待核实或尚未核实，并说明原因。“真实案例”可以是获准展示的原始记录，也可以是基于官方公开具体任务事实撰写的本站解读；两者的来源与许可范围需分开说明。
- `metric`、`limitations`：指标和每条限制都带 `sourceUrls`，不能保存无法回指来源的自由文本结论。
- `researchNotes`：可选的 `{ text, sourceUrls }` 数组，记录本站取样、commit/行号/哈希、未下载或未独立核验的范围。页面在资料区折叠展示；影响成绩解释的限制保留在 `limitations`，没有已整理限制时用空数组。
- `interpretation`：可选的读分解读，四个栏目 `judge`（谁评分）、`comparison`（比较条件）、`disclosure`（公开核验范围）、`versionChanges`（版本影响）均采用 `{ text, sourceUrls }`。草稿模板给出空位；未整理的栏目直接删除，不填无依据的占位事实。全部未整理时删除整个对象。详情和对比共用栏目定义，不再分别维护文案；缺省表示本站未整理，不表示官方未披露。
- `composition`：可选，仅 `kind: "suite"` 使用。`items` 每项包含已有评测 `id`、能力组 `group`、对总指数的百分比 `weight` 和计分口径 `detail`；组成依据统一写入 `sourceUrls`。必须覆盖完整指数、ID 唯一、权重大于零且合计 100%。成员可链接已有原版条目，但 `detail` 必须注明指数实际采用的版本、子集或实施差异；任务和评分有实质区别时另建衍生条目。
- `sources`：统一登记本条所有证据，角色取 `definition`、`readme`、`paper`、`code`、`data`、`access`、`leaderboard`、`release` 或 `vendor-report`。模型发布报告只说明“采用或引用该评测”，不得支撑非内部评测的官方定义。
- `related`：有关联说明、依据和目标 ID 的版本/子集/衍生关系。关联不会自动反向写回另一条；需要双向说明时分别维护，校验会阻止悬空引用。
- `verifiedAt`：本条资料实际核验日期；`updatedAt` 可选，表示编辑日期。两者均为 `YYYY-MM-DD`，不能用批量更新时间冒充全部重新核验。
- `sampleSet`：可选，存在时自动生成站内案例。此时 `sampleAccess.status` 必须为 `local`。任务说明与原始数据分开：中文任务说明可以标为 editorial，`raw` 则保留真正源数据的精简字段或原文，不因 JSON 格式而只放标题短引。原题、选项、网格和媒体仍核对对应许可；原生事实元数据、配置和必要原文节录逐项说明展示范围，不推定整套题库授权。明确禁止在线展示的限制继续保留。没有案例时直接采用 `sampleAccess` 的原因和官方入口。

每个 `sourceUrls` 必须逐字对应 `sources` 中已登记的 URL。正文用编号引用，底部集中展示完整来源；同页不同 hash 保留独立编号和精确外链，`vendor-report` 单独显示。已有数据/样例主入口时，邻近引用不再重复该入口。空数据画像按需隐藏，尚未整理的项目集中说明一次。

带出处的正文统一使用 `CitedText`，传入原文、sources、urls和可选excludeUrls；内部用Intl按词分段，将完整句末词和尾部标点与引用保持在一起，防止手机末行只剩编号，不改写原文。底层 `EvidenceLinks` 只负责上标与提示，不能独立生成编号行，也不要在内容JSON中拼接编号。任务只补充定义未引用的出处，数据获取只补充概况和主入口之外的出处，关系卡只补充定义/版本说明未引用的出处；仍按完整URL比较，保留不同hash的精确定位。已有原始记录出处的本地样例、仅提供成员导航的综合指数样例不再加外围编号。非本地样例的补充引用贴在获取说明句末，排除已有官方入口。底部完整来源和各字段sourceUrls保留。分词行为参考 [MDN Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)。

不要逐页编写引用按钮或hover样式。来源提示仍由公共 `UiTooltip` 和全局 `styles/tooltip.css` 提供，直接读取已登记的名称、类型和域名；鼠标悬停与键盘聚焦均可查看，点击编号定位完整参考资料。

其他界面需要静态悬停说明时复用 `UiTooltip`：默认插槽保留原链接/按钮，并用插槽的 `describedBy` 关联 `aria-describedby`；`content` 插槽只放说明文字，不放交互按钮。公共层统一处理顶层显示、屏幕边缘、移入浮层保持、Esc与失焦关闭；不会请求外网。原生提示层的行为参考 [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using)，键盘和语义参考 [WAI Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)。

草稿允许正文不完整，但 ID、状态和已填写的关联字段仍会检查。正式条目采用严格校验，拼错或多写字段会报“文件 → 字段”错误。发布资料文件本身是公开内容，不能引用草稿。

综合指数直接沿用详情模板，无需新建路由或组件。可参照 `content/benchmarks/aa-intelligence-index.json` 的完整组成，以及 `automationbench-aa.json` 的私有拆分说明。指数案例区只复用 `composition.items` 中明确列出的成员已有本地案例，不从普通 `related` 关系或子集/衍生条目自动继承，也不另造独立题目。组成成员与普通关联同样参与缺失/自身引用检查、撤回检查和删除保护；草稿中的组成引用也会被保护。这里只解释既有指数，不计算或保存模型成绩。

## 添加或修改样例

可直接参照 `content/benchmarks/gsm8k.json`、`benchcad.json`。在条目中填写 `sampleSet.retrievedAt` 及 `sampleSet.samples`，每条评测最多 6 个精选样例：

| 字段 | 含义 |
| --- | --- |
| `id`、`title`、`type` | 原始记录 ID、样例标题、展示题型 |
| `prompt`、`answer` | 原题与可选的公开参考答案 |
| `options` | 选择题选项，至少两项，仅 choice 使用 |
| `explanation` | 解释这道题的任务和判断要点，与原文分开；核验过程放 researchNotes，出处和许可放对应字段 |
| `raw` | 原始记录对象或原始文本；不会执行代码 |
| `source`、`split`、`excerpt` | 来源、数据划分、是否节选 |
| `license`、`licensePath` | 权利/署名说明，可选许可文件路径 |
| `assets` | 可选的图片、音频、视频、字幕或任务附件；每项都可单独记录原始来源 |

`promptOrigin: "editorial"` 只标明任务说明由本站整理，不决定原始数据的格式。所有 `raw` 都使用真实来源：JSON 保留实际字段名称、嵌套和所选值；Markdown、YAML、TOML、CSV 或网页/论文原文可保留对应文本。精简版标记 `excerpt: true`，省略字段或文本截取范围写在 `explanation`，不在原数据中发明 `*_excerpt` 等字段或填入本站说明。不再按240字符硬截。`sample.license` 和底层 `reusePolicy` 分别记录所展字段的实际依据和原始资料范围，不能因格式支持或本站解读而扩大许可。

支持 `text`、`code`、`choice`、`grid`、`image`、`audio`、`video`、`record` 八种展示类型。`grid` 必须有合法的 train/test 输入输出矩阵及答案展开提示；`image`、`audio`、`video` 必须在 `assets` 中包含同类型素材。`record` 用于直接展示任务卡、环境状态、断言等结构化记录。代码只按代码格式显示，不会在浏览器执行。

素材按类型放在 `content/assets/images/`、`audio/`、`videos/`、`captions/` 或 `files/`。视频可填写海报与 WebVTT 字幕，音频和视频使用浏览器原生控件、只预载元数据且不自动播放；只有官方数据同时提供的字幕或逐字稿才能填写。任务环境类评测展示真实任务记录或附件，不在前端伪造可交互环境。

图片 asset 必填真实固有 `width`、`height`（正整数），组件据此预留空间；不要填写猜测尺寸。样例可用 `?sample=<原始记录ID>&sampleView=raw#samples` 分享指定记录与原始模式；阅读模式省略 sampleView，参考答案展开和所选答案不写入 URL。

需要许可原文时放在 `content/assets/licenses/`，填写如 `licenses/mmlu.txt`。构建只复制公开条目实际引用的素材；单个素材不能为空或超过 25 MiB，全部引用路径都必须留在对应素材目录内。所展题面、答案、选项、网格和媒体内容与实际许可范围一致。底层题库受限或未知时，可独立核对官方已公开的案例事实、原生元数据及必要原文节录，不借 editorial 标记复制完整受控记录、未获授权的第三方材料或附件。`no-train` 或 `canary` 本身不等同于禁止在线展示；明确的在线披露限制仍遵守。

Source 样例正式接入前，必须核验第一方记录地址和覆盖实际展示字段的许可。仓库代码许可不能自动视为数据许可；数据集卡的总许可也不能自动覆盖其中来自第三方的图片、视频或网页截图。对公开来源中可定位的具体任务事实，可以在不转载原始数据的前提下制作纯文字 editorial 案例，并如实保留底层许可状态；如果官方明确禁止在线展示该类内容，或案例只能通过登录、申请、付费、接受受控条款或绕过访问控制取得，则不得以此方式展示。无法确认某条具体案例来自该评测时，记录来源和缺口，不用通用方法描述或相邻评测内容填充。

用户自行下载数据后交给维护者的处理步骤、所需版本信息、许可材料、记录哈希和当前候选分级见[本地下载数据转为站内真实样例](LOCAL_SAMPLE_IMPORT.md)。接收本地文件不改变上述门槛；下载权限、登录权限或第三方镜像均不能替代公开再发布授权。

撤回样例时删除整段 `sampleSet`，重新构建后对应样例 JSON 及不再被任何条目引用的附件会退出产物。归档本身不会自动撤回样例。

## 更新与版本

普通文案、来源和样例修正直接编辑原文件，运行 `npm run validate` 和 `npm run build`。实际重新核验了哪条资料，就更新哪条的 `verifiedAt`。

有实质区别、需要独立解释的新版本或子集建立新 ID，通过 `related` 关联原条目。不要为改标题重命名 ID，也不要把新题集覆盖到旧版本上。新增 category 或 brand 后，引用同一共享 ID 即可。

从来源目录对照收录时，按评测本体、命名版本/子集和机构实施协议分别记录。同一题集的 AA、Vals 等复测不因报告机构不同自动新增评测；Arena 的专项榜单须明确任务范围和母平台关系。不能只根据名称相近建立关系，例如 LiveBench 与 LiveCodeBench、Novelcrafter NC Bench 与 IBM NC-Bench、真人 SVG 盲选与其他同名 SVG 仓库。

2026-10-08 的 AIHOT 来源对照与第一方依据见 [覆盖核对记录](research/2026-10-08-aihot-coverage.md)。该页面用于发现线索，不作为评测定义或数据许可的替代来源。未找到足够第一方依据的候选保留草稿和具体缺口，不进入公开目录。

## 归档、转草稿与删除

```powershell
npm run content -- archive my-benchmark "本站暂不继续维护该版本"
npm run content -- publish my-benchmark
npm run content -- draft my-benchmark
npm run content -- check-delete my-benchmark
npm run content -- delete my-benchmark
```

- 归档：不出现在目录、搜索及新增对比入口；保留原详情地址与历史引用，显示“本站已归档”，不宣称官方已废弃该评测。
- 恢复发布：重新进行完整校验，并移除归档提示。
- 转草稿：不再生成公开详情和样例；若仍被公开评测或报告引用，必须先处理引用。
- 删除检查：列出其他评测（含草稿）和发布资料的引用，以及将退出发布的样例和独占资源。
- 删除：有任何条目/报告引用时拒绝操作；无引用时只删除这一份内容文件，不自动删除共享素材源文件。重新构建后旧详情、样例和失去引用的公开附件全部退出产物。

维护命令会追加 `UPDATE_LOG.md`；手工修改内容也应记录原因和影响。如果内容操作已完成但日志不可写，命令会明确警告并正常结束：此时应修复日志文件并手工补记，不要重复新建或删除。内容校验或保存失败仍按失败处理。文件历史由 Git 保存，撤销通过恢复正确内容再构建完成；本站不引入另一套历史数据库。

## 采集与发布边界

`research-samples.mjs` 只保存原始候选，两个 `prepare-*.mjs` 只写 `artifacts/candidates`，不会覆盖 `content`。`preparedAt` 仅表示整理时间；采用候选时需独立确认来源抓取日期、题型、字段与许可，再填写正式条目的 `sampleSet`。

`research-samples.mjs` 在 `artifacts/research/batch.json` 记录最近一批采集状态和各来源结果；任一来源失败即以非零状态退出。`prepare-samples.mjs` 先确认整批成功及所需八项输入有效，才创建候选目录、下载许可或写候选。没有清单、采集中或失败批次不能整理；即使磁盘保留旧研究文件，也必须先重新成功采集。候选仍需人工审核，批次成功不代表已确认转载许可。

正式构建不访问上游数据接口。生成前校验全部正式结构、引用和必需的 favicon；输入缺失或为空时保留此前的生成结果。此检查不等于任意磁盘写入中断均可自动回滚。构建后对实际详情、样例、附件清单逐项检查，拒绝旧文件残留。只在 Vue 中隐藏条目不能代替草稿隔离。

后续管理界面应读写这些相同的内容文件并复用校验规则。当前交付为本地文件/命令维护，不包含在线后台、账号或远程写入服务。

从模型发布成绩表寻找新评测时，先遵循[官方报告采集流程](RESEARCH_WORKFLOW.md)，再使用上述新增与发布命令。
