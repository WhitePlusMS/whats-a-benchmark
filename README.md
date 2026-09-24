# what's a benchmark? · 到底测什么？

一个用中文介绍 AI 评测任务、样例、评分方法与版本关系的静态资料站。

## 功能

- 84 个评测条目、8 个能力方向：用途、发布方、任务、实际数据形式、评分方法、误读提醒与原始出处。
- 搜索、分类与发布方筛选、卡片/列表、批量名称识别，以及最多 3 个评测的分享链接对比。目录 URL 保存筛选、排序和视图；同次浏览从详情返回目录会恢复滚动位置。
- 18 个评测提供 27 条站内真实样例，覆盖文本、代码、选择题、长上下文节选、结构化任务记录、ARC 彩色网格与可播放音频。任务内容默认收起答案，选择题可选择选项后查看参考答案；切换样例重置选择与答案。原始数据保留实际字段，并标明节选、数据划分、来源与许可。
- 明确区分独立评测、子集、衍生、体系、内部评测；受限或未公开任务提供官方入口。
- 17 份官方发布资料索引、读榜指南、桌面和手机布局。

## 技术与本地验证

Vue 3 + Vite + TypeScript + Vue Router + Vite SSG + Lucide。Node.js 22.12+；已在 Node 22.22.1 验证。无后端、数据库、在线推理 API 或账号系统。

```powershell
npm ci
npm test
npm run build
# 需要查看生产版本时：
npm run preview
```

构建依次运行 TypeScript、内容校验、静态页面生成和产物检查。发布内容在 `dist/`，详情页有自己的 HTML，可以直接访问和刷新。不要直接双击 HTML；需通过 HTTP 静态服务器访问。

## GitHub Pages

1. 将源码放入目标 GitHub 仓库，默认分支为 `main`（其他分支请同步修改 workflow）。
2. 在仓库 Settings → Pages 中选择 **GitHub Actions**。
3. 推送后，`.github/workflows/pages.yml` 自动测试、构建并发布；也可以手动运行。

工作流从 Pages 配置读取真实站点路径和地址，兼容用户站点、项目子路径及已配置的自定义域名。`SITE_URL` 用于生成 sitemap，未配置时不捏造域名。

本地模拟仓库路径：

```powershell
$env:BASE_PATH='/benchmark-show/'
$env:SITE_URL='http://127.0.0.1:4174/benchmark-show/'
npm run build
npm run preview -- --port 4174
# 完成后 Ctrl+C；移除仅本终端的模拟配置：
Remove-Item Env:BASE_PATH
Remove-Item Env:SITE_URL
```

当前交付包含发布配置和静态产物；尚未绑定远程仓库，也没有声称已上线。

## 内容维护

1. 运行 `npm run content -- new my-benchmark`，创建 `content/benchmarks/my-benchmark.json` 草稿。
2. 在这一份文件中填写官方定义、任务协议、数据概况、访问与复用边界、来源角色、独立核验日期、版本关系和最多 6 个真实样例。每个事实区块都登记对应官方来源。模板及逐字段说明见 [内容维护手册](docs/CONTENT_MAINTENANCE.md)。
3. Logo、许可、图片、音频、视频、字幕和附件保存在 `content/assets`；共享分类、品牌与发布资料在 `content/categories.json`、`brands.json`、`releases.json` 中维护。
4. 运行 `npm run content -- publish my-benchmark` 校验并保存发布状态，再运行 `npm test` 和 `npm run build`，浏览器检查后发布静态产物。
5. 归档使用 `archive` 命令；删除前用 `check-delete` 查看引用，`delete` 会阻止有引用的删除。手工更新填写准确的核验日期并更新 `UPDATE_LOG.md`。

如果你已经从官方入口下载了某个 benchmark 数据文件，可以按照[本地数据转为站内样例流程](docs/LOCAL_SAMPLE_IMPORT.md)提供原始文件、版本、split、记录 ID 和数据许可证。维护者会先核对再发布边界，再从允许公开展示的数据中选取一条真实记录；可下载不等于可上传。

每条评测一个 JSON，统一 schema 推导类型并在构建前校验。`.generated` 自动产生公开目录、独立样例与所需附件；草稿不进入客户端包，归档保留历史详情。构建后检查旧页面、旧样例和附件残留。采集脚本只生成待审核候选，正式构建及访问不请求上游数据。已有开发服务运行时，用 `npm run content:generate` 更新它读取的内容。

## 资料与权利

本站解读与各评测原始内容分别标注。公开样例许可和署名见具体记录与 `content/assets/licenses/`；网格由原始数字矩阵渲染，音频和视频使用浏览器原生控件且不自动播放。卡片与详情使用发布机构或项目的官方标识，原始出处见 `content/brands.json` 和 `docs/LOGO_SOURCES.md`。无法核实或不适合小尺寸展示时使用发布方文字，不编造 Logo；品牌图不代表相关机构背书。分类导航仍使用功能图标，what's a benchmark? 标识为本站设计。

GPQA、BrowseComp、HealthBench 等明确请求避免公开转贴题目的材料不进入发布样例。`artifacts/research/` 与 `artifacts/candidates/` 是未发布的研究候选，已被 Git 忽略，也不属于 Pages 上传目录。不要将整个工作区作为网站上传。

目录是有日期的人工整理快照，不承诺实时排名或涵盖所有 benchmark。基础 75 项已完成官方来源重审；2026-09-23 又从国内六家模型发布页新增 9 项，当前共 84 项，每项均有独立证据记录。基础重审见 [75 项重审台账](docs/BENCHMARK_REAUDIT_PROGRESS.md)，本次扩展见 [国内模型发布页扩展台账](docs/CHINA_MODEL_RELEASE_PROGRESS.md)。官方报告只用于发现和记录引用，不代替 benchmark 的 README、数据卡、论文或项目页。
