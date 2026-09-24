# 多媒体与交互 Benchmark 真实样例来源核查

日期：2026-09-23

## 结论

本批只形成两个可展示候选组：Chartography 的 3 条真实图表问答记录，以及 ARC-AGI-3 Public Demo 的 3 条官方人类交互回放。它们的 ID、题面/答案或回放地址来自官方数据浏览器、官方报告和官方回放页。没有下载媒体：Chartography 的数据集卡片标注 CC BY 4.0，但各图表的原始来源是第三方，未能逐图确认再发布权；ARC-AGI-3 报告称 Public Demo 回放开源，但没有核实回放媒体的独立再发布许可。因此候选目前保留官方 URL，不复制到本地媒体目录。

这不是完整环境的模拟。ARC-AGI-3 候选应链接官方回放页，页面呈现真实人类动作回放；Chartography 候选应呈现原始问题、参考答案和官方图像链接。

## 可核对的真实记录

### Chartography

官方数据浏览器：[surgeai/chartography](https://huggingface.co/datasets/surgeai/chartography)。页面公开 `task_id`、`chart_path`、`prompt`、`golden_answer`、`domain_combined`、`source_type`、`source_url` 等原始列，卡片标注 CC BY 4.0。候选 JSON 收录 3 条原始 viewer 记录，包括机械工程屈曲点、材料效率排序和跑道距离图表题。图像链接按官方仓库路径构造为 HF `resolve/main` URL。

**再发布边界：**数据集级许可不能自动证明源论文/手册图表可镜像。可以先展示题面、答案、来源链接和官方媒体外链；本批没有下载或重新托管图像。

### ARC-AGI-3

官方人类回放说明：[Measuring Human Performance on ARC-AGI-3](https://arcprize.org/blog/arc-agi-3-human-dataset)。该文说明 Public Demo 有 342 条、25 个公开环境的人类逐步回放，并链接实际 replay。候选收录 3 个官方 `r11l` 回放 session，分数均为 6，split 为 Public Demo。

**再发布边界：**说明页称 Public Demo 数据开源，但本次没有核实 replay JSON/GIF 的具体媒体再发布许可，所以不下载、不镜像；通过官方 replay URL 呈现。官方回放是历史交互记录，不等于可操作的完整游戏环境，也不包含未记录的推理过程。

## 仅外链或暂不纳入

| Benchmark | 官方证据 | 处理决定 |
|---|---|---|
| Mind2Web | [作者仓库](https://github.com/OSU-NLP-Group/Mind2Web)说明测试集解压文件不要在线再分发；原始浏览器会话媒体需访问受限来源。HF viewer 未能展示行记录。 | 无稳定记录 ID 和原始题目/媒体证据，不收录样例。没有尝试绕过访问限制。 |
| Terminal-Bench 4 | [v4.0.0 官方发行页](https://github.com/harbor-framework/terminal-bench/releases/tag/v4.0.0)；官方模板提示 benchmark 数据不应进入训练语料。 | 仅可展示版本/任务清单链接；不公开复刻任务文本或环境。 |
| Terminal-Bench-Science 0.1 | [官方 0.1.0 release notes](https://github.com/harbor-framework/terminal-bench-science/blob/main/release-notes-v0.1.0.md)列 70 项及 DOI；模板含相同数据卫生提示。 | 仅元数据和链接，不复制任务文本/科学数据。 |
| WANDR | [官方仓库](https://github.com/perplexityai/wandr)及 HF 数据页公开任务元数据/部分指令链接；特殊 Apache 条款排除第三方材料。 | 只保留来源链接，不镜像具体指令或第三方引用材料。 |
| APEX-Agents 1.1 | [官方 HF 卡片](https://huggingface.co/datasets/mercor/apex-agents-v1.1)声明仅用于评测、禁止训练并禁止抓取；样例内容受联系信息门控。 | 不访问受限内容。只记录官方文档出现的任务 ID `128-jr-1-f7f95d92` 作为元数据，不展示题面。 |
| HealthBench Professional | [官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)有示意样例；[官方说明](https://openai.com/index/healthbench/)要求不要在线公开数据样例以降低训练泄漏。 | 只链接官方论文/说明，不摘录或截取示例。 |
| Video-MME | [官方仓库](https://github.com/MME-Benchmarks/Video-MME)称视频版权归原所有者，未经同意不得传播/复制。 | 只链接官方主页，不下载或复制视频、题目。 |
| MathVista | [官方仓库](https://github.com/lupantech/MathVista)说明原始图像和题目版权属于来源作者。 | 未完成逐条授权核查，不纳入图像样例。 |
| ScreenSpot-Pro | [官方 HF 数据页](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)虽列 MIT 元数据，但截图涉及商业软件 UI，单图再发布权未核实。 | 仅链接数据页，不下载/镜像截图。 |
| MMMU | [官方项目页](https://mmmu-benchmark.github.io/)；本次未确认某条样例记录及其媒体授权。 | 不纳入，避免把未核实素材当成可再发布内容。 |

## 后续接入建议

候选细节和逐条字段见 [`artifacts/candidates/samples-media-batch.json`](../../artifacts/candidates/samples-media-batch.json)。正式站点接入前，Chartography 需逐图确认源素材许可；ARC 回放需确认 replay 资源的再发布许可或保持官方页面外链。受反训练/防泄漏声明约束的 HealthBench、Terminal-Bench、APEX 内容不应被复制到公开样例库。对于 Mind2Web 等无法从官方公开端点核验 ID 和原始数据的条目，宁可留空，不用 README 示例冒充数据记录。

本批未修改 `content/`、应用代码、`UPDATE_LOG.md`，也未下载任何大数据集或媒体。
