# CMMLU

核验日期：2026-09-23。

## 官方身份

CMMLU（Chinese Massive Multitask Language Understanding）由 Haonan Li 等作者发布，旨在测量大型语言模型在中文语境中的知识与推理能力。官方仓库连接论文、榜单和 Hugging Face 数据。[官方仓库](https://github.com/haonan-li/CMMLU)；[作者论文](https://arxiv.org/abs/2306.09212)

## 官方定义与忠实中文概述

基准覆盖从基础教育到专业水平的 67 个主题，包括自然科学、人文、社会科学、工程和日常生活知识；部分任务依赖中国语境，不能简单视为可从其他语言平移的通用知识题。[作者论文](https://arxiv.org/abs/2306.09212)；[官方仓库](https://github.com/haonan-li/CMMLU)

## 任务输入/输出/环境

- 每题为中文四选一单项选择题，输入由题干和 A–D 选项构成，输出唯一正确选项。题目以填空式选择或直接问答形式呈现；公式可使用 LaTeX 或常见纯文本写法。[作者论文](https://arxiv.org/abs/2306.09212)
- 作者论文采用 zero-shot 和 few-shot（至多 5 个示例）。开源模型主要用下一个 token 在 A–D 上的概率选答案；无法访问 logits 的商业模型采用生成后正则表达式匹配。公开榜单另显示 zero-shot、five-shot 结果。基准是静态题库，没有仿真环境。[作者论文](https://arxiv.org/abs/2306.09212)；[官方仓库](https://github.com/haonan-li/CMMLU)

## 数据规模/split/字段/文件

- 作者论文报告 11,528 道题、67 个主题；每个主题至少 105 题，按每科 5 道 dev few-shot 示例和 100 道以上 test 题划分。类别为 17 个 STEM、13 个人文、22 个社会科学和 15 个其他主题，其中 16 个为中国特定主题。[作者论文统计](https://arxiv.org/html/2306.09212)
- 官方仓库在 `data/` 下按主题提供 development 与 test CSV；未定义独立 validation split。每行包含中文题干、四个选项和答案；仓库展示 CSV 示例，但没有对每个文件逐项列出固定 schema 说明。[官方仓库](https://github.com/haonan-li/CMMLU)
- 作者论文质量抽检为每科随机抽查 5% 问答并在线核验，估计约 2% 存在答案缺失或标注错误的噪声；这是作者在论文中的估计，不等于独立复核结论。[作者论文](https://arxiv.org/html/2306.09212)

## 访问状态

数据与评测代码公开于官方 GitHub；作者也提供 Hugging Face 数据入口。Hugging Face 当前页面因旧式 `cmmlu.py` 数据集加载脚本而无法使用在线 viewer，但页面与仓库仍给出下载/本地加载说明。[官方仓库](https://github.com/haonan-li/CMMLU)；[Hugging Face 数据集](https://huggingface.co/datasets/haonan-li/cmmlu)

## 数据/代码/媒体许可与使用边界

- 作者 GitHub README 将数据许可标为 CC BY-NC-SA 4.0；当前 Hugging Face 页面元数据则标为 CC BY-NC 4.0，缺少 ShareAlike 条款，二者不一致。为避免扩大权利范围，应暂按较严格的 CC BY-NC-SA 4.0 处理，直到发布者澄清。论文页面本身也列出 CC BY-NC-SA 4.0。[官方仓库许可](https://github.com/haonan-li/CMMLU)；[Hugging Face 页面](https://huggingface.co/datasets/haonan-li/cmmlu)；[论文页面许可](https://arxiv.org/abs/2306.09212)
- 本基准为文本选择题，没有图像/视频媒体项。上述数据许可是非商业且要求相同方式共享；仓库未在本文核验到独立的代码许可声明，不能以数据许可替代代码权利判断。

## 官方样例与是否可在公开 GitHub Pages 转载

作者仓库 README 中有一条题目示例，并公开全部数据文件。鉴于数据许可存在 CC BY-NC-SA 与 HF CC BY-NC 两种标记，页面不复制真实题目、选项或答案；仅写概述并链接官方来源。取得发布者对准确数据许可的确认后，再评估是否可按非商业、署名和相同方式共享条件转载。[官方仓库](https://github.com/haonan-li/CMMLU)；[Hugging Face 数据集](https://huggingface.co/datasets/haonan-li/cmmlu)

## 指标

以选项准确率为主要指标，官方结果报告 zero-shot 与 five-shot，并按 STEM、人文、社会科学、其他及中国特定主题等维度分组。作者论文对总体分数使用跨主题 macro average，而非将各题直接合并做简单微平均；复现应保持原评分策略并注明推理策略。[作者论文](https://arxiv.org/html/2306.09212)；[官方榜单](https://github.com/haonan-li/CMMLU)

## 版本关系

论文当前页面展示 v2（2024-01-17），初次提交为 2023-06-15。此次没有找到官方数据语义版本编号或数据变更日志；评测报告应固定仓库分支/commit、数据 revision 和所用推理脚本。[作者论文版本记录](https://arxiv.org/abs/2306.09212)；[官方仓库](https://github.com/haonan-li/CMMLU)

## 官方来源按角色分组

- 发布方简介、文件布局、CSV 格式、许可证和榜单：[haonan-li/CMMLU](https://github.com/haonan-li/CMMLU)
- 作者数据集入口及其当前 license 元数据：[haonan-li/cmmlu](https://huggingface.co/datasets/haonan-li/cmmlu)
- 作者论文、任务统计、评估策略与版本：[CMMLU: Measuring massive multitask language understanding in Chinese](https://arxiv.org/abs/2306.09212)

## 模型发布引用

模型团队发布的 CMMLU 分数应注明 zero/five-shot、数据 revision、生成匹配或 next-token 概率策略以及类别宏平均方法；不能用一份厂商数字代表所有评测设置。本记录未引用模型厂商报告。

## 未核实项

- 官方 GitHub 与 HF 的数据许可标签不同；未找到发布者对该差异的正式说明。
- Hugging Face 在线 dataset viewer 当前不能解析旧数据加载脚本；本文未下载 67 个主题文件逐条校验题量、字段、答案和精确 split 总数。
- 论文估计约 2% 数据噪声；未进行独立抽样复核。
- 官方榜单动态/历史结果与数据文件快照未在本次固定到不可变版本。

## 研究结论

**PASS_WITH_LIMITATIONS** — 任务身份、67 主题、11,528 题、题型、评测方式及公开访问均有作者一手材料支持。许可元数据冲突尚未澄清；GitHub Pages 目前只作介绍和链接，不转载题目、选项或答案。
