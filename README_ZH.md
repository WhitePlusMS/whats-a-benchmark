# what's a benchmark? · 到底测什么？

**看懂 AI 评测名称背后的任务、样例和评分含义。**

[English](README.md) · 简体中文

一个基于官方来源整理的 AI 评测知识站。你可以查询模型发布报告里出现的评测名称，查看真实任务长什么样、分数如何计算，以及不同版本之间有什么关系，也可以把几项评测放在一起比较。

网站界面与本站解读目前使用**简体中文**，原始任务样例保留来源语言。英文 README 提供项目与使用说明，不代表网站已经提供英文界面。

## 收录概况

截至 **2026 年 9 月 24 日**的内容快照：

| 内容                   | 数量 |
| ---------------------- | ---: |
| 评测条目               |   84 |
| 能力分类               |    8 |
| 站内真实样例           |   27 |
| 提供站内样例的评测     |   18 |
| 收录的官方模型发布资料 |   17 |

覆盖编程、数学、知识问答、Agent 与工具、视觉理解、长上下文、指令遵循及真实工作与专业任务。

## 主要功能

- **查找评测**：按名称、别名、能力或发布方搜索；按分类、发布方、样例查看方式与评测类型筛选，支持卡片/列表及名称、年份排序。
- **批量识别**：粘贴模型报告中的名称列表，以换行、逗号或分号分隔，一次最多识别 60 项；保留版本号与年份差异。
- **理解评测协议**：分栏查看官方定义、任务输入输出、执行环境、数据结构、评分方法、局限及访问条件，每个栏目附对应依据。
- **阅读真实样例**：展示文本、代码、选择题、长上下文节选、结构化任务记录、ARC 网格和音频；可查看原始字段、展开已有参考答案，并核对记录来源与许可。
- **横向对比与分享**：同时比较 2–3 项评测，对比选择保存在 URL 中；目录筛选、排序和视图也可通过 URL 恢复。
- **追溯版本与来源**：区分原版、子集、衍生、体系和内部评测，查看有依据的版本关系与官方发布资料引用。
- **适配桌面与手机**：响应式布局、分栏详情和静态页面直达链接，支持详情地址直接访问与刷新。

本站用于阅读和理解评测，不执行评测任务、不调用模型 API，也不生成一套统一的模型排名。无法提供站内样例的条目会说明获取条件，并提供对应官方入口。

## 快速开始

需要 **Node.js 22.12+** 和 npm。项目已在 Node.js 22.22.1 验证，GitHub Actions 使用 Node.js 22。

在仓库根目录执行：

```sh
npm ci
npm test
npm run build
npm run preview
```

打开预览命令输出的本地 HTTP 地址。发布产物在 `dist/`，应通过 HTTP 静态服务器访问，不要直接双击 HTML。预览结束后按 `Ctrl+C` 停止服务。

需要开发调试且尚无开发服务运行时，可以执行 `npm run dev`。已有服务运行时，修改内容后执行 `npm run content:generate` 更新它读取的数据即可。

### 常用命令

| 命令                       | 用途                                 |
| -------------------------- | ------------------------------------ |
| `npm run dev`              | 生成内容并启动 Vite 开发模式         |
| `npm run content:generate` | 校验源内容并重新生成公开数据         |
| `npm run validate`         | 校验内容、引用和所引用的素材         |
| `npm run typecheck`        | 生成内容并执行严格 TypeScript 检查   |
| `npm test`                 | 生成内容并执行自动测试               |
| `npm run build`            | 类型检查、静态页面生成与发布产物核验 |
| `npm run preview`          | 本地预览生产构建                     |
| `npm run content -- help`  | 查看内容维护命令                     |

`typecheck`、`test` 和 `build` 会自动准备生成数据；首次检出无需手工创建或提交 `.generated/`。提交修改前应分别运行测试与构建，`build` 本身不执行测试套件。

## 项目结构

```text
content/
  benchmarks/       每项评测一份 JSON 源文件
  assets/           Logo、许可原文与允许公开的样例素材
  templates/        草稿条目模板
  categories.json   共用能力分类
  brands.json       发布机构标识及来源
  releases.json     官方发布资料与评测引用
src/
  components/       可复用展示组件
  composables/      查询、对比与样例交互状态
  content/          统一 schema 与生成数据适配
  lib/              搜索、查询与对比规则
  styles/           主题变量及按职责划分的样式
  views/            目录、详情、对比与阅读页面
scripts/            内容维护、生成与构建核验
tests/              自动回归测试
docs/               架构、内容维护流程与研究记录
.generated/         自动生成的公开元数据与样例，Git 忽略
dist/               可部署静态网站，Git 忽略
```

技术栈为 **Vue 3、TypeScript、Vite、Vite SSG、Vue Router、Zod 和 Lucide**，采用静态站结构，无需后端、数据库或账号系统。

内容 JSON 经统一 schema 校验后生成公开数据。目录元数据供页面使用，样例正文按需加载；草稿不进入公开产物，归档条目保留历史详情。全局样式使用单一入口，主题变量和页面职责分别管理。模块边界与状态约定见[架构维护说明](docs/ARCHITECTURE.md)。

## 内容维护

先创建草稿：

```sh
npm run content -- new my-benchmark
```

编辑 `content/benchmarks/my-benchmark.json`，填写官方定义、任务协议、数据概况、访问与复用条件、评分、限制、版本关系和支持各项说明的来源。确认允许公开展示后，每项评测最多添加 6 条真实样例。

填写并核对内容后执行：

```sh
npm run content -- publish my-benchmark
npm run validate
npm test
npm run build
```

`publish` 只改变本地源文件状态，不会上传网站。同一维护命令还支持 `archive`、`draft`、`check-delete` 和 `delete`，撤回或删除前会检查引用关系。手工修改应在 [UPDATE_LOG.md](UPDATE_LOG.md) 记录原因与影响。

采集与整理脚本将未发布资料写入 `artifacts/research/` 和 `artifacts/candidates/`，两者均由 Git 忽略，也不进入部署目录。样例整理要求采集批次成功，候选仍需内容与许可审核后才能采用；正常构建不抓取上游数据集。

字段定义、状态生命周期和溯源要求见[内容维护手册](docs/CONTENT_MAINTENANCE.md)与[本地数据转为站内样例流程](docs/LOCAL_SAMPLE_IMPORT.md)。

## 部署

### GitHub Pages

项目已包含 [Pages 工作流](.github/workflows/pages.yml)：

1. 创建 GitHub 仓库，将源码推送到 `main`；使用其他默认分支时同步修改工作流触发分支。
2. 在 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. 推送提交，或在 **Actions** 中手动运行工作流。

工作流会安装依赖、执行测试、构建，并只上传 `dist/`。站点路径和地址读取自 Pages 配置，支持项目子路径与已配置的自定义域名。

使用其他静态托管服务时，发布 `dist/` 内的文件。需要时设置以下构建环境变量：

| 变量        | 含义                                                  |
| ----------- | ----------------------------------------------------- |
| `BASE_PATH` | 网站路径前缀，例如 `/whats-a-benchmark/`，默认 `/`    |
| `SITE_URL`  | 完整公开站点地址，用于生成 sitemap 及 robots 中的入口 |

部署地址未确定时保持 `SITE_URL` 未设置。不要将整个工作区或未审核的研究候选上传为网站。

## 参与完善

欢迎修正定义、来源、版本关系和样例溯源信息。请提供精确的官方出处，注明对应评测 ID；新增版本时说明它与已有条目的任务或协议差异。

代码修改遵循现有模块与命名风格，保持严格类型并复用已有组件。提交前运行 `npm test` 和 `npm run build`；涉及界面时，在浏览器中检查桌面和手机宽度下的实际交互，并同步相关文档与 `UPDATE_LOG.md`。

## 资料来源与使用权利

评测定义以发布者的论文、仓库、项目页和数据卡为依据。模型发布报告用于记录采用情况或报告结果，不能替代评测本身的定义。目录是有日期的人工整理快照，各条目单独记录核验日期。

原始任务材料与本站解读分别标注。样例署名和复用说明随记录保存，可用的许可原文位于 [content/assets/licenses](content/assets/licenses/)。能够下载不等于允许公开再分发，数据集中的第三方媒体也需单独核对；受限或未核实的材料不作为公开样例。

Logo 的权利归相应所有者，不代表相关机构背书。来源记录在 [content/brands.json](content/brands.json) 和 [Logo 来源说明](docs/LOGO_SOURCES.md)。第三方数据、素材的许可只适用于各自材料，不代表项目源码采用同一许可；当前尚未指定仓库整体的源码许可证。

## 更多文档

- [架构与样式维护](docs/ARCHITECTURE.md)
- [内容维护手册](docs/CONTENT_MAINTENANCE.md)
- [真实样例导入流程](docs/LOCAL_SAMPLE_IMPORT.md)
- [官方来源采集流程](docs/RESEARCH_WORKFLOW.md)
- [产品设计](docs/PRODUCT_DESIGN.md)
- [更新说明](UPDATE_LOG.md)
