# 本地下载数据转为站内真实样例

这个流程用于处理一种常见情况：官方数据允许用户下载，但 what's a benchmark? 尚未内置具体记录。用户可以把自己从官方入口取得的原始文件交给维护者；维护者只在数据许可、记录身份和公开展示边界全部核实后，选取一条真实记录写入对应 benchmark 的单个 JSON 文件。

能下载不等于能公开再发布。Hugging Face、GitHub、论文附件或第三方镜像可以证明文件存在，但不能自动证明题面、答案、图片、音频、网页内容、源代码或模型输出均允许复制到公开网站。

## 当前候选分级

本轮核查开始时，84 个 benchmark 中有 71 个没有站内样例。5 个 A 类项目已各接入一条真实记录，当前为 18 个 benchmark、27 条站内样例，仍有 66 个 benchmark 没有站内样例。官方来源与许可核查结果为：

- **A 类 5 项，已接入**：官方数据入口、数据层许可证和记录定位方式已经闭环，已从官方固定版本各选取一条记录。
- **B 类 44 项**：可以获得全部或部分数据，但具体记录仍有许可证、第三方素材、数据卫生、隐私、split 或稳定 ID 等问题需要复核。
- **C 类 22 项**：存在禁止在线展示、禁止再分发、no-train/canary、gated/private 或权利不明等边界，目前不应复制为站内样例。

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

请保留原始下载文件，不要先复制到 `content/assets`。向维护者提供：

1. 本地文件的完整路径，以及它来自哪个官方数据页面。
2. 下载日期、数据集版本、Git commit 或 Hugging Face revision；能固定版本时不要只写 `main` 或 `latest`。
3. 官方许可证页面或随数据下载的许可文件，以及下载时接受的额外条款。
4. 准备展示的 split、配置名和官方记录 ID；没有稳定 ID 时提供文件名、行号及原始行 SHA-256。
5. 说明希望展示哪些字段，哪些字段可以省略。图片、音频、视频、网页摘录、第三方代码和模型轨迹必须单独说明来源。

不要提供通过绕过登录、申请、点击协议、付费、API 权限或访问控制取得的数据。对于 C 类项目，即使用户已经下载，默认仍不进入公开网站，除非官方条款已经改变或取得了明确书面授权。

## 维护者如何处理

1. 对照官方页面确认文件版本、split、字段和记录身份，计算原始文件及选中记录的哈希。
2. 核对数据许可证实际覆盖所选记录和准备展示的字段。代码许可证不能替代数据许可，数据卡标签不能替代第三方媒体或上游内容许可。
3. 检查禁止再分发、禁止在线展示、no-train、canary、仅评估、仅学术、隐私和敏感数据等限制。公开网页会被搜索和抓取，页面上的免责声明不能抵消官方禁令。
4. 只提取一条必要字段最少的真实记录，保留原始语言；中文解释单独写入 `explanation`，不能伪装成原始数据。
5. 在 `content/benchmarks/<id>.json` 中加入 `sampleSet`，同时把 `sampleAccess.status` 改为 `local`，并确认 `reusePolicy.status` 为 `permitted`。原始来源、split、记录 ID、许可和删节状态进入样例字段。
6. 需要许可原文或媒体时再把核实后的文件放入 `content/assets`。媒体逐个记录来源；无法核权的字段直接省略，不做热链或本地镜像。
7. 运行内容校验、严格 TypeScript、自动测试和生产构建，再用真实浏览器检查样例切换、原始数据、答案提示、许可链接和手机布局。

## 最终记录格式

每条正式样例至少保存这些身份信息：

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

正式网站仍使用现有 `sampleSet.samples` schema；上面的字段用于导入审核记录和溯源。完成核验后再将必要信息映射到 `id`、`prompt`、`answer`、`raw`、`source`、`license`、`split`、`excerpt` 与可选媒体字段，避免为了通用导入器而牺牲真实性。
