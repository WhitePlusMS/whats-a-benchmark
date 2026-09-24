# Arena-Hard-v2.0

核验日期：2026-09-23。官方资料将其称作 `Arena-Hard-v2.0-Preview`；以下按这一官方版本名记录。

## 官方身份

由 Arena / LMArena 团队维护的自动评测数据集和工具链，用于近似 Chatbot Arena 的人类偏好比较；它不是 Chatbot Arena 本身。[官方 README](https://github.com/lmarena/arena-hard-auto#about)

## 官方定义与忠实中文概述

以较难的开放式用户提示测试 instruction-tuned LLM，由自动 judge 比较模型回答，作为人类偏好的较快、较低成本近似。v2.0-Preview 将 hard prompt 与 creative writing 分组报告。[官方 README](https://github.com/lmarena/arena-hard-auto#about)

## 任务输入/输出/环境

- 输入为单条自然语言 prompt；模型生成回答；自动 judge 以 baseline 与待测模型回答进行成对判断。[官方 README](https://github.com/lmarena/arena-hard-auto#evaluate)；[官方判断脚本](https://github.com/lmarena/arena-hard-auto/blob/main/gen_judgment.py)
- 配置有 judge model、temperature、token 上限、baseline/reference 等运行参数；官方 leaderboard 分别列出 Gemini 2.5 judge、GPT-4.1 judge 与 creative writing 的 ensemble 配置，数字不能跨配置直接视为同一个榜单。[官方 README](https://github.com/lmarena/arena-hard-auto#leaderboard)

## 数据规模/split/字段/文件

- v2.0-Preview 包括 500 条 hard real-world query 和 250 条来自 Chatbot Arena 的 creative writing query，总 750 条。[官方 README](https://github.com/lmarena/arena-hard-auto#about)；实际官方 `question.jsonl` 为 750 行。[官方 question.jsonl](https://github.com/lmarena/arena-hard-auto/blob/main/data/arena-hard-v2.0/question.jsonl)
- 官方题文件每行包含 `uid`、`category`、`subcategory`、`prompt` 等字段；仓库文件名为 `data/arena-hard-v2.0/question.jsonl`。[官方 question.jsonl](https://raw.githubusercontent.com/lmarena/arena-hard-auto/main/data/arena-hard-v2.0/question.jsonl#L0-L5)
- 官方 HF 仓库保存 `arena-hard-v0.1` 与 `arena-hard-v2.0-Preview` 的预生成回答和判断；GitHub README 指向相同 HF 仓库供下载。[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#L125-L135)；[README 下载指引](https://github.com/lmarena/arena-hard-auto#download-dataset)
- 未见官方 train/dev/test split 声明；不要把 HF 的单一 `train` 文件分区误认为官方 benchmark split。[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#L68-L75)

## 访问状态

数据访问与样例入口均直达官方 v2.0 原始题目 JSONL；HF 预生成结果集另作为结果数据链接，Viewer 状态不影响 GitHub 原始文件访问。[v2.0 question.jsonl](https://github.com/lmarena/arena-hard-auto/blob/main/data/arena-hard-v2.0/question.jsonl)；[HF Viewer 状态](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#dataset-viewer)

## 数据/代码/媒体许可与使用边界

- GitHub 根目录 `LICENSE` 为 Apache License 2.0；HF 页面也标 Apache-2.0。[官方 GitHub LICENSE](https://github.com/lmarena/arena-hard-auto/blob/main/LICENSE)；[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#L54-L62)
- 题集含来自 Chatbot Arena 的用户 query；Chatbot Arena 官方的公开说明描述其对人类偏好数据的去标识与有限公开，且早期 Conversation Data Release 对公开对话提出安全、使用免责声明。未找到单独解释 v2.0 两个来源子集之权利范围的文件，因此不能仅凭仓库 Apache 标签断言所有上游用户文本及嵌入的第三方材料均可无限制再发。[v2 来源说明](https://github.com/lmarena/arena-hard-auto#about)；[Arena 数据说明](https://arena.ai/blog/dataset#disclaimers-and-terms)
- 官方原始题文件公开可访问，但为公开 GitHub Pages 转载具体 prompt，仍有“仓库 Apache license 对全部内含第三方/用户文本的授权范围”未被独立证据闭合这一限制。本轮建议只展示事实、字段说明和官方链接，不复制题面；示例需后续逐条权利检查。
- README/LICENSE 授权代码，但其中预生成回答会含模型厂商输出，必须另外遵守相应模型条款；不建议转载 model answers 或 judge response。[官方 HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#dataset-overview)；[Arena 官方数据条款](https://arena.ai/blog/dataset#disclaimers-and-terms)

## 官方样例与是否可在公开 GitHub Pages 转载

`question.jsonl` 中可查到真实样例，但本记录不摘录原题。考虑题源包含 Chatbot Arena 对话/用户 query、仓库总许可证与个别源内容适用关系未逐条核清，不建议把真实 prompt 复制到公开 Pages；可引用 500+250 组成、类别、字段并链接原始文件。[官方 README](https://github.com/lmarena/arena-hard-auto#about)；[官方题文件](https://github.com/lmarena/arena-hard-auto/blob/main/data/arena-hard-v2.0/question.jsonl)

## 指标

README leaderboard 给出每个配置的 `Scores (%)` 和 `CI (%)`；模型回答由 judge 与 baseline 做成对判断。分数是自动偏好判定率/基准分，不应称为客观正确率；Judge、style-control 和子集配置改变会显著改变分值。[官方 README](https://github.com/lmarena/arena-hard-auto#leaderboard)

## 版本关系

`Arena-Hard-v0.1` 是旧版本；`Arena-Hard-v2.0-Preview` 在 2025-04-23 发布，加入更好的 judge、新 hard prompts、creative-writing 评测。官方 HF 存档同时有 v0.1 和 v2.0-Preview 数据目录。[官方 README](https://github.com/lmarena/arena-hard-auto#news)；[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto#dataset-overview)

## 官方来源按角色分组

- benchmark README / 工具 / leaderboard： [lmarena/arena-hard-auto](https://github.com/lmarena/arena-hard-auto)
- 官方题数据： [v2.0 question.jsonl](https://github.com/lmarena/arena-hard-auto/blob/main/data/arena-hard-v2.0/question.jsonl)
- 配套预生成结果数据： [lmarena-ai/arena-hard-auto HF](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto)
- 执行评分实现： [gen_judgment.py](https://github.com/lmarena/arena-hard-auto/blob/main/gen_judgment.py)
- 技术论文： [Arena-Hard and BenchBuilder arXiv:2406.11939](https://arxiv.org/abs/2406.11939)
- 上游 Arena 官方使用说明： [Chatbot Arena Conversation Dataset Release](https://arena.ai/blog/dataset)

## 模型发布引用

厂商模型卡/发布报告只作为对应模型和运行配置的二级成绩引用，不能用作 Arena-Hard 定义、v2 数据规模、许可证或正式 leaderboard 来源。本报告不引用厂商自测数据。

## 未核实项

- 750 行数来自查看官方文件元数据，不逐行验证 category 数量；官方 500+250 构成直接引用 README。
- Apache-2.0 对每一个 prompt 及嵌入的外部/用户文本的具体授权链未单独核实。
- Viewer 解析错误不等于底层 JSONL 缺损；本报告未下载文件核验全部记录。
- 历史 leaderboard 分数是仓库中静态发布配置，非本日重跑成绩。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方身份、题数、数据文件、核心字段、评测流程、版本和代码许可证已查明；因上游 prompt 权利链仍有未核实项，当前不建议将真实题目复制到 GitHub Pages。
