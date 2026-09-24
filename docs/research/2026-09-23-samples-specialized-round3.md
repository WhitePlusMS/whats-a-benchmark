# 专项 benchmark 样例来源核验（第三批，2026-09-23）

本轮按第一方数据源核查 APEX-Agents、GAIA、LifeSciBench、SciCode、Terminal-Bench 2.0 与 τ-bench。只把有具体数据许可、且公开展示没有违背发布方数据政策的记录列为候选。未把仓库代码许可自动解释为数据许可；未复制解答、隐藏测试或评分键。

## 可供正式接入审查的样例

### SciCode：1 条 dev 子任务

- **记录：**`ewald_summation` 的 `problem_id=10`、`step_number=10.1`，来自官方 [`problems_dev.jsonl`](https://huggingface.co/datasets/SciCode1/SciCode/blob/main/problems_dev.jsonl)。任务要求写 Python 函数，从 `recvec` 计算 Ewald 求和参数 alpha，并将结果乘以 `alpha_scaling`（固定为 5）。候选 JSON 保留了题面原文，没有带出同一条记录的参考实现、测试或答案。
- **划分：**官方文件名是 `problems_dev.jsonl`；页面将数据预览显示为 validation。此处按上游文件名记录为 dev，不推断为 test。
- **数据许可：**官方 Hugging Face 数据页将数据集标为 Apache-2.0：[数据集页](https://huggingface.co/datasets/SciCode1/SciCode/tree/main)。官方 GitHub README 也确认 benchmark 已在 Hugging Face 发布：[SciCode 官方仓库](https://github.com/scicode-bench/SciCode)。该许可是数据集仓库的许可元数据，与仅仅发现某个代码仓库有许可证不同。
- **接入提示：**本站如采用，应标明 SciCode、记录 id、dev 划分和官方数据链接，并遵循 Apache-2.0 的归属/许可保留要求。样例不显示 ground-truth code、test_cases、答案或解释性解法。

候选原始题面与授权元信息位于 [`artifacts/candidates/samples-specialized-round3.json`](../../artifacts/candidates/samples-specialized-round3.json)。

### τ-bench：1 条旧版 retail dev prompt

- **记录：**官方 [`tasks_dev.py`](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/tasks_dev.py) 中 `TASKS_DEV[0]`，`user_id=olivia_ito_3591`。源文件未给这条 task 单独的 task id，因此候选明确用列表位置加 `user_id` 定位，不伪造官方编号。题面要求扮演顾客，因旅行无法收货而请求取消待收货订单并全额退款。
- **划分与版本：**retail 的 `tasks_dev.py`。上游 README 警告此仓库的 airline/retail tasks 是过时版本，要求使用 τ³-bench 的修订任务；因此本站只能标“原始 τ-bench 旧版示例”，不可当作当前 leaderboard 版本的任务。
- **数据许可：**[τ-bench 官方仓库](https://github.com/sierra-research/tau-bench)自称“Code and Data”，其 [`LICENSE`](https://github.com/sierra-research/tau-bench/blob/main/LICENSE) 为 MIT；零售 mock-data 的 [`readme.md`](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/data/readme.md) 另写明可将其中部分数据用于其他用途。候选只含 mock user id 与任务指令，不含订单数据库记录。
- **接入提示：**MIT 声明和来源链接须一起保留。源任务还带有 `actions`，该字段是目标动作/参考结果，因此候选没有复制，避免把答案直接展示出来。

## 已核对但不转载的项目

| Benchmark | 第一方证据 | 许可与发布限制 | 本轮处理 |
|---|---|---|---|
| APEX-Agents | [官方 Hugging Face 数据卡](https://huggingface.co/datasets/mercor/apex-agents)写明 480 个任务、33 个 worlds、金标准输出，并标 CC-BY 4.0。 | 同一数据卡明确说只用于模型评测，禁止训练/微调/参数拟合，也禁止 crawling 或 scraping。BenchAtlas 是可被搜索引擎与采集工具读取的公开站点。单看 CC-BY 不能忽略同一数据卡的专门使用限制。 | 不抓取或重发具体 prompt、文件、rubric、gold output；只可链接官方数据卡。 |
| GAIA | [官方数据卡](https://huggingface.co/datasets/gaia-benchmark/GAIA)说明有公开 dev 与测试数据，并提供附件字段。 | 明确要求不要以可抓取格式重分享 validation/test；gated prompt 要求不得在 Hugging Face gated/private 仓库之外重分享数据集。 | 公开网站不符合限制，不复制题面、附件或答案。 |
| LifeSciBench | [OpenAI 官方发布页](https://openai.com/index/introducing-life-sci-bench/)描述任务结构和精选例子；[官方预印本 Appendix A.5](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)谈数据开放与安全披露。 | 论文称任务、rubric、附件或评测材料的公开可能受许可、隐私、专有信息或生物安全限制，并说明部分内容被排除或限制；没有找到覆盖具体任务内容的公开数据许可证。精选论文示例不等于整套任务获得再发布许可。 | 不转载具体题面和附件，只链接官方说明与论文。 |
| Terminal-Bench 2.0 | [官方 Harbor 数据仓库](https://github.com/harbor-framework/terminal-bench-2)含可直接查看的 task instruction、环境、solution 与 tests；仓库标 Apache-2.0。官方任务说明可见例如 [`dna-assembly/instruction.md`](https://github.com/harbor-framework/terminal-bench-2/blob/main/dna-assembly/instruction.md)。 | [官方 benchmark 公告](https://www.tbench.ai/news/announcement-2-0)明确写着 benchmark data 不应出现在训练语料中。虽然仓库许可证是 Apache-2.0，但把原文放进公开可抓取网页会增加进入训练语料的风险。 | 不转载 prompt、solution、tests 或环境文件；保留官方任务目录链接。 |

## 结论和边界

- 这六个目标中，本轮确认 2 条可供后续正式接入审查的真实题面：SciCode 1 条、τ-bench 旧版 retail 1 条。
- APEX-Agents、GAIA 和 Terminal-Bench 2.0 的重点风险来自发布方明确的数据政策；LifeSciBench 的重点风险是整套题目没有公开许可且包含安全/隐私/专有信息审查边界。它们没有被误记成“可转载”。
- `artifacts/candidates/` 是待审核区，本轮写入的 SciCode 与 τ-bench 条目还不是正式站内发布内容。接入前仍应在界面标明 split、版本、来源与许可；对 τ-bench 明示任务已过时。
