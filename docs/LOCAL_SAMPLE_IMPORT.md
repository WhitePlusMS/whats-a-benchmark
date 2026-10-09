# 本地数据取证与站内真实案例

本指南说明如何把官方来源中的具体案例纳入对应 benchmark。维护者需从公开官方入口取得真实数据，并核对所展示字段及公开边界。任务说明可以用中文整理并标为 editorial；“原始数据”则保留来源实际的 JSON 字段、配置、CSV 或文本内容，精简版通过选择字段或明确的文本节选实现，不把本站解读包装成假原始记录，也不因 JSON 格式而只留下标题式短引。

能下载不等于能公开再发布。Hugging Face、GitHub、论文附件或第三方镜像可以证明文件存在，但不能自动证明题面、答案、图片、音频、网页内容、源代码或模型输出均允许复制到公开网站。仓库代码许可证也不自动覆盖评测数据。Editorial 案例需对应官方公开且可定位的实际任务事实，不能用方法说明、泛化模板或相邻评测的题目补位；官方明确禁止在线展示时仍须遵守。

## 历史候选分级（2026-09-23）

以下统计是 2026-09-23 的历史快照，不能用来推断当前目录或样例完整度：当时84个 benchmark 中71个没有站内样例；5个A类项目各接入一条真实记录；当时有18个 benchmark、27条站内样例，66个没有站内样例。该轮A/B/C分级也是历史工作分组，不是当前许可结论：

- **A 类 5 项，已接入**：官方数据入口、数据层许可证和记录定位方式已经闭环，已从官方固定版本各选取一条记录。
- **B 类 44 项**：可以获得全部或部分数据，但具体记录仍有许可证、第三方素材、数据卫生、隐私、split 或稳定 ID 等问题需要复核。
- **C 类 22 项**：当时因禁止在线展示、禁止再分发、no-train/canary、gated/private 或权利不明等因素分入待核组。单独的 `no-train` 或 `canary` 标记不自动等同于在线展示禁令；逐项依照明确的在线披露限制、获取条件和实际展示字段判断。即使底层许可为 `unknown` 或 `restricted`，满足具体任务事实、本站原创解读和必要短引边界的纯文字 editorial 案例仍可单独核对；原始数据、题目、选项和附件仍须取得覆盖相应内容的许可。

逐项依据见[可下载样例候选核查](research/2026-09-23-downloadable-sample-candidates.md)。

本轮已接入的 A 类：

| Benchmark | 官方入口 | 数据层许可 | 选取边界 |
|---|---|---|---|
| GeneBench-Pro | [官方公开案例 Viewer](https://huggingface.co/datasets/openai/genebench-pro-public-package/viewer) | MIT | 从 `release` split 选一个公开案例，保留 `eval_id`，明确它不是隐藏测试题。 |
| MCP-Atlas | [官方数据卡与 Viewer](https://huggingface.co/datasets/ScaleAI/MCP-Atlas) | CC BY 4.0 | 可选一条 `train` 记录；只展示许可覆盖字段，不复制 trajectory 中的外部服务返回内容。 |
| MMMLU | [OpenAI 官方数据集](https://huggingface.co/datasets/openai/MMMLU) | MIT | 保存语言 subset、`test` split、revision、行位置和行哈希；明确属于公开测试集。 |
| MRCR | [OpenAI 官方数据集](https://huggingface.co/datasets/openai/mrcr) | MIT | 保存 `train` split、revision、行位置或行哈希及 `date_added`。 |
| MRCR v2 | [DeepMind 官方数据目录](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2) | Apache-2.0 | 保存 commit、CSV 文件名、配置、行位置和行哈希，不用重新生成的数据冒充官方 release 行。 |

## 用户需要提供什么

若准备导入 Source 原始记录，请保留原始下载文件，不要先复制到 `content/assets`。向维护者提供：

1. 本地文件的完整路径，以及它来自哪个官方数据页面。
2. 下载日期、数据集版本、Git commit 或 Hugging Face revision；能固定版本时不要只写 `main` 或 `latest`。
3. 官方许可证页面或随数据下载的许可文件，以及下载时接受的额外条款。
4. 准备展示的 split、配置名和官方记录 ID；没有稳定 ID 时提供文件名、行号及原始行 SHA-256。
5. 说明希望展示哪些字段，哪些字段可以省略。图片、音频、视频、网页摘录、第三方代码和模型轨迹必须单独说明来源。

不要提供通过绕过登录、申请、点击协议、付费、API 权限或访问控制取得的数据，也不要要求维护者接受 gated 条款来获取任务。历史上列为 C 类不代表今天已完成复核；逐项记录可公开来源和限制。明确禁止在线展示的题面或数据不应复制到网站；若同一评测另有官方公开的具体任务演示，可按纯文字 editorial 边界独立评估，不把这理解成对受限题库的转载许可。

## 维护者如何处理

1. 对照官方页面确认文件版本、split、字段和记录身份，计算原始文件及选中记录的哈希。
2. 核对数据许可证实际覆盖所选记录和准备展示的字段。代码许可证不能替代数据许可，数据卡标签不能替代第三方媒体或上游内容许可。
3. 检查禁止再分发、禁止在线展示、no-train、canary、仅评估、仅学术、隐私和敏感数据等限制。区分明确禁止在线披露/展示与仅限制训练或数据用途的标签；公开网页会被搜索和抓取，页面免责声明不能抵消官方禁令。
4. 只提取一条必要字段最少的真实记录，保留原始语言；中文解释单独写入 `explanation`，不能伪装成原始数据。
5. 在 `content/benchmarks/<id>.json` 中加入 `sampleSet`，同时把 `sampleAccess.status` 改为 `local`。完整原题、选项、网格或媒体仍需对所展示内容确认 `permitted`。Editorial 只标明任务说明的整理方式，不限定 `raw` 的格式；对应原始数据可以是真实字段投影或原文节选。保留底层数据真实的许可状态，逐条在 `sample.license` 说明实际字段的展示依据和边界。两类都保存官方来源、版本/行号/案例ID，以及明确省略的字段或文本范围。
6. 需要许可原文或媒体时再把核实后的文件放入 `content/assets`。媒体逐个记录来源；无法核权的字段直接省略，不做热链或本地镜像。
7. 运行内容校验、严格 TypeScript、自动测试和生产构建，再用真实浏览器检查样例切换、原始数据、答案提示、许可链接和手机布局。

## 最终记录格式

每条正式 Source 样例至少保存这些身份信息：

```json
{
  "recordId": "官方 ID；没有时使用版本、split 与行哈希组合",
  "split": "官方 split / subset / 配置 / 文件档",
  "sourceUrl": "第一方数据或记录入口",
  "sourceRevision": "不可变 commit 或 dataset revision",
  "license": "覆盖数据本身的许可证",
  "attribution": "发布方、作者及上游归属",
  "retrievedAt": "实际下载日期",
  "fieldsIncluded": ["实际展示字段"],
  "fieldsOmitted": ["因权利或敏感性省略的字段"],
  "recordSha256": "原始记录规范化后的 SHA-256"
}
```

正式网站仍使用现有 `sampleSet.samples` schema；上面的字段用于导入核验和溯源。`raw` 使用来源实际格式：JSON 保留原生字段名称、嵌套结构和所选值；CSV、TOML、Markdown 或普通文本可保持原始文本。精简版标记 `excerpt: true`，在 `explanation` 中说明省略字段和截短范围；不能将“省略了正文”等本站备注伪装成来源字段。`promptOrigin: "editorial"` 仅标明中文任务说明由本站整理，不再限制 `raw` 为240字符短字符串。数据、媒体和引用范围仍逐项核验，不把格式支持当作复用授权。综合指数继续复用组成基准的 `SampleViewer`，不另造题目或从普通关联继承。
