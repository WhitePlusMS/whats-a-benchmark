# UI/UX 修复清单与验收

日期：2026-10-08。修复分支：`codex/uiux-audit-fixes`。本轮以开始修复时的工作树快照为增量基线，保留原有未提交修改。

对应 [原审查报告](2026-10-08-uiux-audit.md)，依据 [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)。原审查保留修改前数字，下文记录规范缺项与阅读体验问题的修复。

## 修复结果

| 项目 | 修复前 | 修复后 |
| --- | --- | --- |
| 92 页外链 DOM 节点 | 2,869 | 862，减少约70% |
| AA Intelligence Index / Terminal-Bench 4.0 / MMMLU外链 | 16 / 58 / 33 | 2 / 11 / 10 |
| 最大卡片摘要 | 210字符 | 79字符；全部不超过80 |
| 空数据画像卡 | 30页共61个槽位 | 0张；非指数页集中列出缺项 |
| MMMLU / MMLU全空读分占位 | 8格 | 0格；整行不生成 |
| 样例分享 | 仅到样例区 | 原始ID与read/raw状态进URL |

外链按详情main内的外部链接计数，包括默认折叠内容，不表示请求数量。逐页唯一完整href之和为671（此前637）：来源列表现在保留原库存中不同hash的精确定位，34个此前因同页合并未单独显示的定位重新可达；没有增加来源库存。主要阅读区使用内部编号引用，外部入口和底部原始资料仍各有明确用途。

## 原审查问题逐项对应

| 范围 | 本轮处理 | 验收 |
| --- | --- | --- |
| 栏目反复列完整外链 | 编号跳至统一来源卡；保留所有原hash定位，点击/刷新展开祖先details | 92页引用目标存在；Arena折叠定位点击/刷新可达 |
| 同块数据、样例入口重复 | 主入口从邻近依据中排除，其他来源用编号补充 | 入口URL未改，引用状态通过 |
| 按钮文字与动作错配 | 站内“查看真实题目”；官方入口直达外链；申请/受限“查看样例获取方式” | 92页动作、图标与目标核对 |
| 无题目仍叫真实样例 | 非站内“样例与获取方式”；综合指数“组成评测的样例”并链接成员 | 18条本地、74条非本地状态覆盖 |
| 空画像与全空对比维度 | 画像按内容生成；任一对比项有值才生成维度；缺项统一说明 | 0空画像；常规/混合对比通过 |
| 限制混入研究流水 | 161条原限制移入带原来源的研究折叠记录；比较条件留正文 | 原270条限制的文字、来源完整保留 |
| 摘要与其他字段职责交叉 | 49条摘要缩短，85条内容整理；MMMLU许可/GeneBench旧说明收尾 | 原题、指标、来源、核验日期保持 |
| 样例解读反复讲出处 | 23条解读改为任务与判断要点；取样边界进核验记录 | 27样例两种视口逐条检查，无溢出，答案默认折叠 |
| 评分说明两处堆叠 | 指标/判分者/比较条件集中；核验进数据；版本解释进关系 | 11项有读分字段、81项无字段均覆盖 |
| 对比长段与失去表头 | 关键限制前两条分点；详情保留完整解释；首列、表头固定 | 手机键盘横向/纵向滚动通过，焦点容器避开托盘 |
| 发布资料无定位 | 17卡稳定ID，按11个月份分组并提供目录 | ID唯一、月份目录有效，详情引用带卡片锚点 |
| 指南案例只到根页 | 10课程稳定ID，10案例定位任务/评分/数据/组成 | 10案例实开，目标全部存在 |
| 关于重复核验说明 | 合并来源/内容核对两段 | 桌面、手机正文无溢出 |
| 焦点对比度 | 焦点#6957d4，补summary和滚动留白 | 白底约5.36:1、页面底约5.04:1；键盘焦点可见 |
| 搜索结果未播报 | 普通结果polite/atomic状态；输入name/autocomplete | MMMLU数量/URL更新；列表与返回保留状态 |
| 长列表无渲染控制 | 卡片content-visibility:auto及固有占位尺寸 | 92项DOM链接保留，屏外按需呈现 |
| 触摸、安全区 | touch-action:manipulation；托盘、页尾safe-area-inset | 390px布局与焦点留白通过；未在刘海真机验收 |
| 日期与原始名称 | Intl UTC中文日期/月份/计数；名称/指标/原题/raw/答案translate=no | 显示和原始数据核对 |
| 图片尺寸与主题色 | 图片要求正整数原始宽高，运行时校验/绑定；theme-color统一 | 尺寸夹具及无效尺寸测试通过；当前27样例无图片附件 |
| 404和已有能力 | 保留语义表、跳正文、真实链接、错误重试、reduced-motion | 404和6主路由两种视口通过 |

## 文件与影响

内容条目逐项列在下文；未编辑文案的条目也应用共用模板修复。业务职责未扩展到成绩数据库或外部下载。

| 文件组 | 原因和影响 |
| --- | --- |
| SourceList / sourceReferences / EvidenceLinks | 统一编号保留精确URL，减少重复显示 |
| DetailView / detail.css / sampleAccess / BenchmarkCard | 任务、样例、评分、数据、版本职责与动作名称 |
| SampleViewer / sampleLocation / sample-viewer.css | 任务解读、样例分享与维护说明折叠 |
| schema / sampleLoader / SampleMedia | 研究记录、空限制和图片尺寸约束 |
| CompareView / reading.css / ReleasesView | 按数据生成对比、固定表头、月份和发布卡定位 |
| GuideView / AboutView / ExploreView | 课程/案例定位、重复说明收拢、结果播报及输入属性 |
| displayFormats / main / App / PublisherMarks | 日期和原始名称、响应式锚点及目录返回 |
| tokens / base / layout / benchmark-card / index.html | 焦点、触摸、安全区、屏外呈现、主题色 |
| 4个测试 / CONTENT_MAINTENANCE / UPDATE_LOG | URL/尺寸回归、维护规范及变更记录 |

源码、样式、测试和维护文件清单：

- `src/components/SourceList.vue`
- `src/lib/sourceReferences.ts`
- `src/components/EvidenceLinks.vue`
- `src/views/DetailView.vue`
- `src/styles/detail.css`
- `src/lib/sampleAccess.ts`
- `src/components/BenchmarkCard.vue`
- `src/components/SampleViewer.vue`
- `src/styles/sample-viewer.css`
- `src/lib/sampleLocation.ts`
- `src/content/schema.ts`
- `src/components/SampleMedia.vue`
- `src/composables/sampleLoader.ts`
- `src/views/CompareView.vue`
- `src/styles/reading.css`
- `src/views/ReleasesView.vue`
- `src/views/GuideView.vue`
- `src/views/AboutView.vue`
- `src/views/ExploreView.vue`
- `src/lib/displayFormats.ts`
- `src/main.ts`
- `src/App.vue`
- `src/components/PublisherMarks.vue`
- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/styles/benchmark-card.css`
- `index.html`
- `tests/content.test.ts`
- `tests/sample-loader.test.ts`
- `tests/sample-viewer.test.ts`
- `tests/sample-location.test.ts`
- `docs/CONTENT_MAINTENANCE.md`
- `UPDATE_LOG.md`

新增交付：docs/reviews/2026-10-08-uiux-fixes.md、artifacts/uiux-fixes-validation.json、artifacts/uiux-fixes-desktop.jpg、artifacts/uiux-fixes-mobile.jpg。

## 检查与边界

- 直接运行本地vue-tsc --noEmit通过；内容生成92公开条目、0草稿；校验92条目、27样例、17报告通过。
- 完整自动测试43/43通过，涵盖内容引用/投影、目录URL、对比、样例加载/状态及分享；无新增依赖。
- 实开98个明确路由：92详情和6主页面，均检查1365×900和390×844；27样例两种视口逐条显示。
- read/raw深链接刷新、第二题恢复、历史返回、折叠引用展开与刷新、常规/混合对比、键盘滚动、搜索/列表/返回URL均通过。
- 按修改前快照核对：原题/raw/答案/选项/图格/媒体/来源/许可记录/取样日期一致；270条原限制在正文或记录中逐字保留；核验日期未冒充本轮重新研究。
- 修复范围以外的302个快照文件逐个SHA-256一致，包括原README、内容管线、模板、架构说明和既有截图。
- 浏览器无error日志；仍有原有vite-ssg触发的Vue Router next()弃用提示，本轮未改依赖。
- 未执行生产构建、全外链HTTP存活检测、真实评测或线上部署。本地页面验收不能代替生产产物和真机安全区确认。
- 临时Vite已终止，确认127.0.0.1:5173不再监听；浏览器临时页已关闭、视口已恢复。未提交、未推送。

![修复后的样例阅读区](../../artifacts/uiux-fixes-desktop.jpg)

## 92个详情的修复记录

共用模板作用于全部条目，文件路径为content/benchmarks/<id>.json。下表不列updatedAt；样例只编辑explanation，其余原始字段保持。

| id | 本轮文案编辑字段 | 摘要长度前→后 | 外链前→后 | 研究记录 | 桌面/手机 |
| --- | --- | ---: | ---: | ---: | --- |
| mmmlu | limitations、dataProfile.summary、dataProfile.scale、dataAccess.requirements、reusePolicy.license、reusePolicy.scope、reusePolicy.boundaries、样例解读、researchNotes | 69→69 | 33→10 | 6 | 通过 |
| swe-bench-verified | limitations、officialDefinition.summary、officialDefinition.task、researchNotes | 210→54 | 42→10 | 3 | 通过 |
| aa-intelligence-index | 未编辑文案；共用模板修复 | 33→33 | 16→2 | 0 | 通过 |
| gpqa-diamond | limitations、researchNotes | 73→73 | 27→6 | 3 | 通过 |
| hle | limitations、researchNotes | 75→75 | 28→6 | 2 | 通过 |
| aime-2025 | officialDefinition.summary、dataAccess.requirements、limitations、researchNotes | 135→42 | 30→9 | 3 | 通过 |
| terminal-bench-2 | limitations、officialDefinition.summary、dataAccess.requirements、researchNotes | 134→51 | 31→10 | 4 | 通过 |
| mmmu | limitations、officialDefinition.summary、researchNotes | 114→36 | 44→13 | 3 | 通过 |
| mmlu | limitations、officialDefinition.summary、researchNotes | 84→31 | 26→7 | 1 | 通过 |
| mmlu-pro | limitations、样例解读、officialDefinition.summary、researchNotes | 87→41 | 29→7 | 3 | 通过 |
| gpqa | limitations、researchNotes | 53→53 | 24→6 | 3 | 通过 |
| simpleqa | limitations、officialDefinition.summary、dataProfile.summary、dataAccess.requirements、sampleAccess.reason、researchNotes | 87→38 | 31→9 | 5 | 通过 |
| ceval | limitations、researchNotes | 48→48 | 28→10 | 2 | 通过 |
| human-eval | limitations、样例解读、officialDefinition.summary、researchNotes | 125→49 | 28→10 | 1 | 通过 |
| mbpp | limitations、样例解读、officialDefinition.summary、researchNotes | 92→42 | 29→8 | 3 | 通过 |
| livecodebench | officialDefinition.summary | 89→33 | 31→12 | 0 | 通过 |
| swe-bench | limitations、officialDefinition.summary、researchNotes | 118→54 | 52→11 | 3 | 通过 |
| swe-bench-pro | limitations、officialDefinition.summary、researchNotes | 198→41 | 48→10 | 2 | 通过 |
| aider-polyglot | officialDefinition.summary、sampleAccess.reason、researchNotes | 84→40 | 22→6 | 1 | 通过 |
| gsm8k | limitations、researchNotes | 55→55 | 28→9 | 2 | 通过 |
| math-500 | limitations、officialDefinition.summary、sampleAccess.reason、researchNotes | 89→51 | 32→9 | 3 | 通过 |
| aime-2024 | officialDefinition.summary、dataAccess.requirements、sampleAccess.reason、limitations、researchNotes | 96→42 | 25→7 | 3 | 通过 |
| arc-agi-2 | 未编辑文案；共用模板修复 | 45→45 | 30→21 | 0 | 通过 |
| frontiermath | sampleAccess.reason、limitations、researchNotes | 64→64 | 29→9 | 2 | 通过 |
| browsecomp | 未编辑文案；共用模板修复 | 69→69 | 31→10 | 0 | 通过 |
| tau-bench | 样例解读、officialDefinition.summary、researchNotes | 136→42 | 54→14 | 1 | 通过 |
| tau2-bench | limitations、officialDefinition.summary、researchNotes | 149→37 | 48→11 | 3 | 通过 |
| bfcl | officialDefinition.summary、样例解读 | 103→39 | 27→13 | 0 | 通过 |
| osworld | limitations、officialDefinition.summary、researchNotes | 114→36 | 32→8 | 2 | 通过 |
| gaia | reusePolicy.boundaries、limitations、researchNotes | 51→51 | 21→6 | 1 | 通过 |
| mcp-atlas | limitations、officialDefinition.summary、样例解读、researchNotes | 96→43 | 39→13 | 4 | 通过 |
| mmmu-pro | limitations、officialDefinition.summary、researchNotes | 124→46 | 45→12 | 3 | 通过 |
| mathvista | limitations、researchNotes | 78→78 | 24→8 | 2 | 通过 |
| charxiv | limitations、researchNotes | 41→41 | 27→8 | 1 | 通过 |
| screenspot-pro | limitations、officialDefinition.summary、researchNotes | 127→34 | 40→7 | 3 | 通过 |
| video-mme | limitations、officialDefinition.summary、dataAccess.requirements、researchNotes | 135→32 | 19→6 | 4 | 通过 |
| omnidocbench | limitations、officialDefinition.summary、sampleAccess.reason、researchNotes | 103→37 | 36→8 | 3 | 通过 |
| longbench | limitations、officialDefinition.summary、researchNotes | 87→37 | 23→8 | 3 | 通过 |
| longbench-v2 | limitations、reusePolicy.scope、sampleAccess.reason、researchNotes | 77→77 | 32→8 | 5 | 通过 |
| ruler | limitations、officialDefinition.summary、researchNotes | 117→39 | 26→7 | 3 | 通过 |
| mrcr | limitations、officialDefinition.summary、officialDefinition.task、sampleAccess.reason、样例解读、researchNotes | 123→35 | 20→7 | 5 | 通过 |
| mrcr-v2 | limitations、officialDefinition.summary、officialDefinition.task、sampleAccess.reason、样例解读、researchNotes | 129→41 | 35→10 | 5 | 通过 |
| ifeval | limitations、样例解读、researchNotes | 65→65 | 33→13 | 1 | 通过 |
| arena | 未编辑文案；共用模板修复 | 56→56 | 37→29 | 0 | 通过 |
| gdpval | limitations、officialDefinition.summary、dataAccess.requirements、researchNotes | 92→37 | 29→9 | 4 | 通过 |
| gdpval-aa | limitations、officialDefinition.summary、researchNotes | 126→48 | 36→13 | 2 | 通过 |
| healthbench | limitations、officialDefinition.summary、researchNotes | 107→45 | 37→9 | 2 | 通过 |
| healthbench-hard | limitations、officialDefinition.summary、researchNotes | 87→53 | 30→8 | 2 | 通过 |
| finance-agent | limitations、researchNotes | 61→61 | 27→8 | 1 | 通过 |
| openai-internal-coding | limitations、officialDefinition.summary、researchNotes | 145→44 | 15→6 | 1 | 通过 |
| terminal-bench-4 | limitations、officialDefinition.summary、dataAccess.requirements、researchNotes | 153→45 | 58→11 | 5 | 通过 |
| frontiercode-1-1-main | 未编辑文案；共用模板修复 | 79→79 | 25→8 | 0 | 通过 |
| cursorbench-4 | 未编辑文案；共用模板修复 | 61→61 | 22→4 | 0 | 通过 |
| gdpval-aa-v2-1 | officialDefinition.summary、limitations、researchNotes | 93→55 | 40→10 | 3 | 通过 |
| automationbench | 样例解读 | 59→59 | 25→15 | 0 | 通过 |
| terminal-bench-science-0-1 | limitations、officialDefinition.summary、officialDefinition.task、dataProfile.summary、dataAccess.requirements、researchNotes | 140→39 | 28→7 | 5 | 通过 |
| osworld-2 | limitations、officialDefinition.summary、dataProfile.scale、dataProfile.sourceUrls、sampleAccess.reason、researchNotes | 107→34 | 55→12 | 3 | 通过 |
| chartography | limitations、researchNotes | 78→78 | 22→6 | 2 | 通过 |
| wandr | limitations、officialDefinition.summary、officialDefinition.task、dataAccess.requirements、researchNotes | 173→38 | 28→7 | 5 | 通过 |
| agents-last-exam | officialDefinition.summary、样例解读、limitations、researchNotes | 85→40 | 23→8 | 3 | 通过 |
| benchcad | 样例解读、limitations、researchNotes | 76→76 | 31→14 | 1 | 通过 |
| arc-agi-3 | reusePolicy.license、limitations、researchNotes | 47→47 | 32→22 | 2 | 通过 |
| officeqa-pro | limitations、officialDefinition.summary、researchNotes | 125→35 | 41→12 | 4 | 通过 |
| healthbench-professional | limitations、officialDefinition.summary、researchNotes | 103→40 | 24→7 | 2 | 通过 |
| genebench-pro | limitations、dataAccess.requirements、reusePolicy.scope、reusePolicy.boundaries、sampleAccess.reason、样例解读、researchNotes | 68→68 | 32→9 | 4 | 通过 |
| lifescibench | limitations、officialDefinition.summary、researchNotes | 90→44 | 24→7 | 1 | 通过 |
| mind2web | limitations、officialDefinition.summary、researchNotes | 82→40 | 24→8 | 2 | 通过 |
| livecodebench-pro | limitations、officialDefinition.summary、officialDefinition.task、researchNotes | 97→35 | 36→13 | 1 | 通过 |
| small-overlapping-speech-bench | limitations、样例解读、officialDefinition.summary、sampleAccess.reason、researchNotes | 98→31 | 31→9 | 6 | 通过 |
| scicode | limitations、样例解读、officialDefinition.summary、dataAccess.requirements、researchNotes | 191→42 | 39→9 | 5 | 通过 |
| apex-agents | dataProfile.summary、dataAccess.requirements、sampleAccess.reason、researchNotes | 77→77 | 31→8 | 3 | 通过 |
| cmmlu | limitations、researchNotes | 53→53 | 26→6 | 2 | 通过 |
| browsecomp-zh | limitations、researchNotes | 59→59 | 26→10 | 1 | 通过 |
| swe-bench-multilingual | limitations、officialDefinition.summary、sampleAccess.reason、researchNotes | 117→52 | 36→7 | 3 | 通过 |
| arena-hard-v2 | 未编辑文案；共用模板修复 | 64→64 | 26→21 | 0 | 通过 |
| alignbench | sampleAccess.reason、limitations、researchNotes | 71→71 | 24→9 | 2 | 通过 |
| babyvision | sampleAccess.reason、limitations、researchNotes | 65→65 | 31→10 | 2 | 通过 |
| deep-swe-v1-1 | dataAccess.requirements、limitations、researchNotes | 67→67 | 26→12 | 3 | 通过 |
| ifbench | limitations、researchNotes | 67→67 | 25→7 | 2 | 通过 |
| nl2repo-bench | dataAccess.requirements、limitations、researchNotes | 58→58 | 29→12 | 3 | 通过 |
| paperbench | sampleAccess.reason、limitations、researchNotes | 75→75 | 26→9 | 2 | 通过 |
| skillsbench | officialDefinition.summary、limitations、researchNotes | 86→50 | 28→11 | 2 | 通过 |
| terminal-bench-2-1 | officialDefinition.summary、limitations、researchNotes | 113→41 | 43→14 | 3 | 通过 |
| toolathlon-verified | dataAccess.requirements、reusePolicy.license、limitations、researchNotes | 50→50 | 28→10 | 4 | 通过 |
| vending-bench-2 | dataAccess.requirements、limitations、researchNotes | 59→59 | 18→5 | 3 | 通过 |
| aa-briefcase | sampleAccess.reason、limitations、researchNotes | 39→39 | 28→5 | 1 | 通过 |
| aa-omniscience | dataAccess.requirements、reusePolicy.license、sampleAccess.reason、researchNotes | 31→31 | 38→6 | 2 | 通过 |
| aa-lcr | sampleAccess.reason、interpretation.disclosure.text、researchNotes | 36→36 | 28→5 | 1 | 通过 |
| gdp-pdf | dataAccess.requirements、reusePolicy.license、sampleAccess.reason、interpretation.disclosure.text、researchNotes | 34→34 | 38→5 | 4 | 通过 |
| critpt | sampleAccess.reason、limitations、researchNotes | 36→36 | 38→6 | 1 | 通过 |
| automationbench-aa | sampleAccess.reason | 53→53 | 27→4 | 0 | 通过 |
| terminal-bench-3 | sampleAccess.reason、limitations、researchNotes | 38→38 | 43→6 | 1 | 通过 |
