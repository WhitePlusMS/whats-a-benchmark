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

发布命令只把源文件状态变为已发布，不会直接上传网站；源文件整体校验通过后才保存。构建得到 `dist/`，推送到已配置的仓库后由 Pages 工作流部署。目前本地目录尚未初始化 Git 或绑定远程仓库。

首次安装执行 `npm ci`。`typecheck`、`test` 和 `build` 都会先生成公开数据，全新检出不需要手工准备 `.generated`。如已有开发服务运行，编辑内容后执行 `npm run content:generate` 更新其读取的数据，无需另开服务。

## 每条文件需要填写什么

- `id`：小写英文、数字和短横线，必须与文件名一致。创建后保持稳定；修改显示名称只改 `name`。
- `status`：`draft` 草稿、`published` 已发布、`archived` 本站归档。
- `order`：编辑精选顺序，数值越小越靠前；同值按 ID 排列。
- `name`、`subtitle`：正式名称和辅助描述；`subtitle` 用于检索。
- `category`、`tags`：共享分类 ID 和能力标签。
- `publisher`、`brandIds`：完整发布方文字和标识 ID 数组，联合发布可引用多个 Logo；没有核实 Logo 时用空数组。
- `year`、`version`、`kind`：首次年份（未知填 `null`）、具体版本、独立/子集/衍生/体系/内部类型。
- `researchStatus`：本轮证据核验结论，取 `pass`、`pass-with-limitations`、`partial` 或 `blocked`；不能用文案完整度冒充资料完整度。
- `officialDefinition`：忠实中文概述、官方任务定义及其 `sourceUrls`。
- `taskContract`：模型收到的输入、应提交的输出、运行环境与官方依据，三项不能互相复制。
- `dataProfile`：数据概述、公开程度、规模、split、字段和文件。官方未披露的栏目保留空数组并使用准确的 `disclosure`，不得推测补齐。
- `dataAccess`：数据访问状态、要求、可选官方入口及依据。公开、受控访问必须给出入口。
- `reusePolicy`：数据/代码/媒体适用的许可、使用范围、具体边界及依据；仓库代码许可不能自动替代题目或媒体许可。
- `sampleAccess`：站内真实样例、官方入口、受控访问、限制公开、私有、许可待核实或尚未核实，并说明原因。
- `metric`、`limitations`：指标和每条限制都带 `sourceUrls`，不能保存无法回指来源的自由文本结论。
- `sources`：统一登记本条所有证据，角色取 `definition`、`readme`、`paper`、`code`、`data`、`access`、`leaderboard`、`release` 或 `vendor-report`。模型发布报告只说明“采用或引用该评测”，不得支撑非内部评测的官方定义。
- `related`：有关联说明、依据和目标 ID 的版本/子集/衍生关系。关联不会自动反向写回另一条；需要双向说明时分别维护，校验会阻止悬空引用。
- `verifiedAt`：本条资料实际核验日期；`updatedAt` 可选，表示编辑日期。两者均为 `YYYY-MM-DD`，不能用批量更新时间冒充全部重新核验。
- `sampleSet`：可选，存在时自动生成站内样例。此时 `sampleAccess.status` 必须为 `local`，`reusePolicy.status` 必须为 `permitted`；没有样例时，页面直接采用 `sampleAccess` 的原因和官方入口。

每个 `sourceUrls` 必须逐字对应 `sources` 中已登记的 URL。页面会按栏目显示这些依据，并在参考资料区按官方定义、README、论文、代码、数据、访问与许可、榜单和发布说明分组；`vendor-report` 单独显示为模型发布引用。

草稿允许正文不完整，但 ID、状态和已填写的关联字段仍会检查。正式条目采用严格校验，拼错或多写字段会报“文件 → 字段”错误。发布资料文件本身是公开内容，不能引用草稿。

## 添加或修改样例

可直接参照 `content/benchmarks/gsm8k.json`、`benchcad.json`。在条目中填写 `sampleSet.retrievedAt` 及 `sampleSet.samples`，每条评测最多 6 个精选样例：

| 字段 | 含义 |
| --- | --- |
| `id`、`title`、`type` | 原始记录 ID、样例标题、展示题型 |
| `prompt`、`answer` | 原题与可选的公开参考答案 |
| `options` | 选择题选项，至少两项，仅 choice 使用 |
| `explanation` | 本站中文解读，与原文分开 |
| `raw` | 原始记录对象或原始文本；不会执行代码 |
| `source`、`split`、`excerpt` | 来源、数据划分、是否节选 |
| `license`、`licensePath` | 权利/署名说明，可选许可文件路径 |
| `assets` | 可选的图片、音频、视频、字幕或任务附件；每项都可单独记录原始来源 |

支持 `text`、`code`、`choice`、`grid`、`image`、`audio`、`video`、`record` 八种展示类型。`grid` 必须有合法的 train/test 输入输出矩阵及答案展开提示；`image`、`audio`、`video` 必须在 `assets` 中包含同类型素材。`record` 用于直接展示任务卡、环境状态、断言等结构化记录。代码只按代码格式显示，不会在浏览器执行。

素材按类型放在 `content/assets/images/`、`audio/`、`videos/`、`captions/` 或 `files/`。视频可填写海报与 WebVTT 字幕，音频和视频使用浏览器原生控件、只预载元数据且不自动播放；只有官方数据同时提供的字幕或逐字稿才能填写。任务环境类评测展示真实任务记录或附件，不在前端伪造可交互环境。

需要许可原文时放在 `content/assets/licenses/`，填写如 `licenses/mmlu.txt`。构建只复制公开条目实际引用的素材；单个素材不能为空或超过 25 MiB，全部引用路径都必须留在对应素材目录内。题面、答案、raw 和媒体内容必须与许可范围一致。`restricted`、`private`、`unknown` 条目不能携带发布样例。

正式接入必须同时核验第一方记录地址和覆盖该数据内容的许可。仓库代码许可不能自动视为数据许可；数据集卡的总许可也不能自动覆盖其中来自第三方的图片、视频或网页截图。权利范围不明确时不提供 `sampleSet`，在 `sampleAccess` 写清具体原因和官方入口，不复制、下载或热链嵌入素材。

用户自行下载数据后交给维护者的处理步骤、所需版本信息、许可材料、记录哈希和当前候选分级见[本地下载数据转为站内真实样例](LOCAL_SAMPLE_IMPORT.md)。接收本地文件不改变上述门槛；下载权限、登录权限或第三方镜像均不能替代公开再发布授权。

撤回样例时删除整段 `sampleSet`，重新构建后对应样例 JSON 及不再被任何条目引用的附件会退出产物。归档本身不会自动撤回样例。

## 更新与版本

普通文案、来源和样例修正直接编辑原文件，运行 `npm run validate` 和 `npm run build`。实际重新核验了哪条资料，就更新哪条的 `verifiedAt`。

有实质区别、需要独立解释的新版本或子集建立新 ID，通过 `related` 关联原条目。不要为改标题重命名 ID，也不要把新题集覆盖到旧版本上。新增 category 或 brand 后，引用同一共享 ID 即可。

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

维护命令会追加 `UPDATE_LOG.md`；手工修改内容也应记录原因和影响。文件历史建议由 Git 保存，撤销通过恢复正确内容再构建完成；本站不引入另一套历史数据库。

## 采集与发布边界

`research-samples.mjs` 只保存原始候选，两个 `prepare-*.mjs` 只写 `artifacts/candidates`，不会覆盖 `content`。`preparedAt` 仅表示整理时间；采用候选时需独立确认来源抓取日期、题型、字段与许可，再填写正式条目的 `sampleSet`。

正式构建不访问上游数据接口。构建前校验全部正式结构和引用；构建后对实际详情、样例、附件清单逐项检查，拒绝旧文件残留。只在 Vue 中隐藏条目不能代替草稿隔离。

后续管理界面应读写这些相同的内容文件并复用校验规则。当前交付为本地文件/命令维护，不包含在线后台、账号或远程写入服务。

从模型发布成绩表寻找新评测时，先遵循[官方报告采集流程](RESEARCH_WORKFLOW.md)，再使用上述新增与发布命令。
