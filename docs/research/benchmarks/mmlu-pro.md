# MMLU-Pro

核验日期：2026-09-23。

## 官方身份

MMLU-Pro 由 University of Waterloo 等研究者提出，论文发表于 NeurIPS 2024，旨在扩展原始 MMLU 并提高推理难度与提示稳定性。[作者论文](https://arxiv.org/abs/2406.01574)；[作者代码仓库](https://github.com/TIGER-AI-Lab/MMLU-Pro)

## 官方定义与忠实中文概述

这是英语、多学科的选择题评测集。它重新筛选部分 MMLU 题，结合 STEM 网站、TheoremQA 和 SciBench 等来源，并增加推理题及干扰项；它与原 MMLU 共享一部分题，但不是改名后的同一题库。官方数据卡统计 12,032 题：6,810 题来自 MMLU、5,222 题为新增。[作者数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)；[论文](https://arxiv.org/abs/2406.01574)

## 任务输入/输出/环境

- 输入为学科题干和若干选项；多数题十选一，手工审阅后少数题少于十项。模型可直接作答或按官方论文常用的 5-shot CoT 提示完成，validation 子集用于抽取 few-shot 示例。[数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)；[作者论文](https://arxiv.org/abs/2406.01574)
- 输出是答案字母（A–J）；官方计分脚本解析模型输出并统计准确率。CoT 与 direct、不同答案抽取规则、zero/five-shot 会产生不同设置，成绩必须注明。[官方仓库](https://github.com/TIGER-AI-Lab/MMLU-Pro)
- 静态文本题库，无外部仿真环境。与 MMLU 相比，题目经过校订和增强，但作者数据卡也记录多次纠错和 schema 格式更新，重现结果要固定 revision。[数据卡维护记录](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)

## 数据规模/split/字段/文件

- 官方数据卡当前描述 12,032 道主题问题、14 个学科；总计数会随 card 版本变化，HF 页面另显示验证样本 70 行。不要据“约 12K”将历史数据快照当作当前准确行数。[作者数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)
- HF Parquet schema 字段为 `question_id`、`question`、`options`（list，通常 10 项但不保证固定）、`answer`（选项字母）、`answer_index`、`cot_content`、`category`、`src`。作者数据卡按 `validation` 和 `test` split 发布；5-shot 示例取自 validation。当前 viewer 能直接显示 validation 字段和样例，具体 test 行数应以所用 revision 的 manifest 为准。[官方数据卡 Viewer](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)
- 题目源字段 `src` 用于标示来源类别，不表示所涉原始来源许可自动相同。[数据卡来源构成与许可](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)；[作者论文](https://arxiv.org/abs/2406.01574)

## 访问状态

作者在 HF 公开 Parquet、数据卡、validation/test 和官方代码；无需申请即可访问。维护日志记录 2024 年答案/拼写纠正、2025 年医疗题答案修正及类别说明、2026 年选项前导空格修复，读取时需锁定 revision。[作者数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)

## 数据/代码/媒体许可与使用边界

作者论文许可附录说明 MMLU-Pro 数据集以 MIT 授权发布，列出四类来源各自条款：原始 MMLU MIT、STEM 网站 open-licensed、TheoremQA MIT、SciBench MIT。作者仓库代码也标 MIT。论文网页自身的文字/图表使用 arXiv 页许可，不与数据权利混淆；无图像/视频媒体字段。[作者论文许可附录](https://arxiv.org/abs/2406.01574)；[官方仓库许可](https://github.com/TIGER-AI-Lab/MMLU-Pro/blob/main/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

数据卡的 validation 样例和官方论文示例公开展示题目与正确答案；MIT 数据许可支持在署名和保留许可文本前提下复用已覆盖材料。公开介绍仍建议只用 validation，不复制 test 问题/答案，不把 `cot_content` 当成必须公开的内容。此前保存的两条例子为 `question_id` 1、2，均标为 `validation / math`，含 `question/options/answer/answer_index/cot_content/category/src`；记录里的答案索引与字母/选项映射一致。它们不是 test 样例。转载前固定 HF revision，因为公开卡显示维护者持续修订。[官方数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)；[作者论文](https://arxiv.org/abs/2406.01574)

## 指标

主要指标是选择题准确率，官方论文报告总分及 14 学科分项，实验通常 5-shot CoT；一部分基线使用 zero-shot。公开榜单分数不一定共享 prompt、shot 数或模型时点。重现需说明 direct/CoT、shot 数、validation exemplar、答案解析和采用的 micro/macro 汇总口径；不要将多个 setup 的数字直比。[作者论文](https://arxiv.org/abs/2406.01574)；[作者数据卡榜单说明](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)

## 版本关系

2024 作者论文/NeurIPS 2024 版描述 12,032 题。官方数据卡持续演进：截至核验日显示 2026 年格式修复、2025 年类别维护和医疗答案修正等记录。用作正式分数比较时，应锁定数据集 commit、代码 commit、prompt 版本和类别统计版本。MMLU-Pro 是 MMLU 的增强派生基准，不得与原始 MMLU 或后续多语种 MMLU-ProX 混称。[作者论文](https://arxiv.org/abs/2406.01574)；[HF revision 页面](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)

## 官方来源按角色分组

- **任务动机、构造、评测协议、指标与多来源许可说明：**[MMLU-Pro 作者论文](https://arxiv.org/abs/2406.01574)。
- **当前 schema、split、逐次维护记录及数据授权：**[TIGER-Lab/MMLU-Pro 数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)。
- **推理与准确率解析代码、提示范例：**[TIGER-AI-Lab/MMLU-Pro](https://github.com/TIGER-AI-Lab/MMLU-Pro)。

## 模型发布引用

发布结果时应标注 HF 数据 revision、官方代码 revision、split、direct/CoT、shot 数、提示文本、选项数处理、答案提取规则和准确率汇总方式，并引用 NeurIPS 2024 论文。若结果用了另一实现或另一个 prompt，应与作者基线分开报告。

## 未核实项

- HF 页面总行数和 split 计数随数据修订变化，本次未下载 Parquet 对所有 test 记录逐项计数。
- 论文称题目来源及整体 MIT 条款，但 STEM Website 具体站点授权的逐条清单本次未追溯；需复用具体来源文本时应进一步核验。
- 已保存的 validation 样例字段和答案映射可从现有快照复核；此轮未逐条从全量 Parquet 重载，以验证该快照仍与最新 commit 一致。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方作者论文、代码及数据卡支持其身份、题源、字段、validation/test 结构、准确率评测和 MIT 授权。题库持续维护；复现需要固定快照和评分设置，测试样本公开意味着不能把公开可得当作“未暴露”。
