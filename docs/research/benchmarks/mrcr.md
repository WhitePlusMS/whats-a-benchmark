# MRCR（OpenAI 公开数据集）

核验日期：2026-09-23

## 官方身份

OpenAI MRCR 是 OpenAI 发布的长上下文多针（multiple-needle）基准数据集，官方 Hugging Face 数据卡将全名写为 Multi-round co-reference resolution，并明确说该评测受 Gemini 首先提出的 MRCR 启发、扩展任务难度以支持复现。[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/mrcr)；[OpenAI GPT-4.1 发布页](https://openai.com/index/gpt-4-1/)

## 官方定义与忠实中文概述

给模型一段由用户—助手多轮组成的合成对话；同一写作请求（例如某主题的诗或博客）会重复出现多次，随后要求模型找出第 i 次对应的助手输出。目标前置一段随机字母数字字符串，模型须先输出该字符串，再复现指定内容。它检验相似内容的长上下文区分和顺序定位。[OpenAI MRCR 数据卡](https://huggingface.co/datasets/openai/mrcr)

## 任务输入/输出/环境

- **输入**：合成多轮 `messages` 长对话、指定 needle 次序，以及随机前缀要求。
- **输出**：随机前缀后跟目标回答；模型缺少正确前缀时官方示例评分将该样本计为 0。
- **环境**：公开数据包含 2、4、8-needle 样本和不同长度区间；官方示例以 OpenAI API 运行并演示长度过滤。外部复测须记录模型快照、上下文长度限制、system/developer 设定和评分方式。[OpenAI 数据卡运行示例与说明](https://huggingface.co/datasets/openai/mrcr)

## 数据规模/split/字段/文件

官方 Viewer 当前显示一个 `train` split、2,400 行，总数据约 1.39 GB。schema 包括 `prompt`、`answer`、`random_string_to_prepend`、`n_needles`、`desired_msg_index`、`total_messages`、`n_chars`、`date_added`。数据卡说明包含 438 种实体、10 种写作形式、每个长度 bin 100 条；token bin 从 4,096–8,192 延伸至 524,288–1,048,576。2025-12-05 更正了生成缺陷数据；`date_added` 标识修订记录。[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/mrcr)

## 访问状态

OpenAI 的 Hugging Face 数据集公开可浏览/下载，不是受控访问集。数据卡提供 Parquet 文件路径和运行示例；公开可下载不等于所有引用或媒体可忽略许可证条件。[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/mrcr)

## 数据/代码/媒体许可与使用边界

OpenAI 官方 Hugging Face 页面标注该数据集为 MIT。该标签是该数据发布的许可元数据；此公开集是合成对话，但其中由模型生成的文本和发布数据的后续使用仍应按数据卡及适用法律处理。[OpenAI MRCR 数据卡](https://huggingface.co/datasets/openai/mrcr)。本站仅说明任务与链接，不转载真实长对话、答案或样本媒体。

## 官方样例与是否可在公开 GitHub Pages 转载

官方数据卡提供示意性对话和 Parquet 样例预览。由于内容本身是数据集中真实生成文本，本站不复制长样本或目标答案；公开页面保留任务结构概述和数据卡链接。OpenAI 数据卡的 MIT 元数据不能替代遵循其条件以及核查复用内容的完整分发语境。[官方数据卡](https://huggingface.co/datasets/openai/mrcr)

## 指标

OpenAI 数据卡采用 Python `difflib.SequenceMatcher` 比率比较预测与真值：先验证前缀，匹配后移除前缀再比较答案。不同 needle 数与上下文长度的样本难度不同；报告必须标明所用长度/needle 切片和数据修订。[官方评分说明](https://huggingface.co/datasets/openai/mrcr)

## 版本关系

此条是 OpenAI 发布的公开数据集（2025-04-12 初发；2025-12-05 更新部分错误 ground truth 与样本）。数据卡明确其受 Gemini MRCR 启发并扩展任务难度。Google DeepMind 另行公开了自己的 MRCR v2 数据生成、长度分组和评分实现；两者方法有共同谱系，但 OpenAI MRCR 数据记录、提示、修订和计分应独立处理，不能因为其他厂商在报告中称其为 “MRCR v2” 就认定与 DeepMind 发行物相同。[OpenAI 数据卡](https://huggingface.co/datasets/openai/mrcr)；[DeepMind MRCR v2](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)

## 官方来源按角色分组

- **数据、任务、revision、schema 与评分**：[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/mrcr)。
- **结果报告**：[OpenAI GPT-4.1 发布页](https://openai.com/index/gpt-4-1/)。
- **任务谱系与另一种官方实现**：[Google DeepMind MRCR v2](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)。
- **任务论文**：[Michelangelo](https://arxiv.org/abs/2409.12640v2)。

## 模型发布引用

模型发布材料上的 “MRCR” 或 “MRCR v2” 标签应按其链接到的数据和实现识别。若报告使用 OpenAI 数据卡，明确数据修订、2/4/8 needle、长度区间和 SequenceMatcher 计分；若引用 DeepMind MRCR v2，另按 DeepMind 的长度/评分配置记载。名称相似不等于协议一致。

## 未核实项

- 未下载或哈希校验当前 2,400 条记录；页面展示规模和字段可能随仓库更新。
- 未独立复现 OpenAI GPT-4.1 发布页中的结果。
- 未将 OpenAI MRCR 与 DeepMind MRCR v2 逐样本、逐评分规则比对。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 第一方数据卡公开支持任务定义、2,400 条数据、schema、revision、SequenceMatcher 计分和 MIT 标签。需将此数据集与 DeepMind 的 MRCR v2 实现分开标注和比较；本站不转载真实样本。
