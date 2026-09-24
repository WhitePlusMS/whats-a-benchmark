# MRCR v2（Google DeepMind）

核验日期：2026-09-23

## 官方身份

此条是 Google DeepMind 在 `google-deepmind/eval_hub` 发布的 MRCR v2 实现。DeepMind 说明其公开内部版本并提供生成其他任务实例的代码；官方评测页称任务全名为 multi-round coreference resolution。[DeepMind 官方 MRCR v2 README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)；[DeepMind Evals](https://deepmind.google/research/evals/)

## 官方定义与忠实中文概述

MRCR v2 是固定简单任务复杂度的长上下文推理测评：在多轮用户—助手对话中，用户多次以格式、主题、风格组合提出写作请求，助手每次生成不同文本；模型最后按索引找回某次输出，并先输出一段专属随机字符串。它用于观察上下文长度增加时的泛化，而不是单纯定位短片段。[DeepMind README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)

## 任务输入/输出/环境

- **输入**：多轮合成长对话、指定目标类别及出现次序、独有随机字符串。
- **输出**：按要求先给随机字符串，再复现目标助手回答。
- **环境**：数据按 needle 数及 token 长度子集下载；仓库提供数据生成、默认与宽松评分代码。官方明确指出代码工具会显著简化任务，报告必须标注是否可用。[下载脚本](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/download.sh)；[评测说明](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)

## 数据规模/split/字段/文件

官方下载器提供 2、4、8-needle 数据；长度分组覆盖约 4K 至 8M token，文件名指向 `mrcr_v2p1_<n>needle_<length>_dynamic_fewshot_text_style_fast.csv`。README 说明 DeepMind 常报告 8-needle 的 `upto_128K` 累计变体与 `at_1M` 单点变体；不同长度范围和 needle 子集不能混为一个 split。生成器使用 format/topic/style 组合。公开仓库未在 README 给出固定总行数。[README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)；[下载脚本](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/download.sh)

## 访问状态

DeepMind 官方 GitHub 仓库公开生成与评分代码，下载脚本从 Google Cloud Storage 拉取 CSV 数据。可以按 needle 数和长度选取数据；未登录可读仓库，实际下载受网络可达性影响。[官方下载脚本](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/download.sh)

## 数据/代码/媒体许可与使用边界

`mrcr_v2` 目录含 Apache-2.0 LICENSE，授权该目录发布的工作在许可证条件下复制和分发；README 描述的数据是合成对话，并且仓库提供生成新实例的工具。[官方 LICENSE](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/LICENSE)；[官方 README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)。该许可不自动覆盖后续使用者自行生成的变体、模型输出或第三方报告截图。本站使用文字概述和官方代码链接，不转载真实数据记录。

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库公开任务说明与生成/评分代码；可在署名并遵守 Apache-2.0 条件下引用或再分发受该许可覆盖的文件。本站不展示真实记录或媒体，以免把某个长度、needle 数、运行设置误当作代表性样例；可以链接 DeepMind 官方说明和代码仓库。[官方 README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)

## 指标

官方代码实现 MRCR 复现匹配得分，并提供默认和更宽松模式。随机前缀须按规则匹配；MRCR 的随机基线随“任意助手响应”或“相关目标响应”的假设不同。报告应注明 needle 数、长度范围、评分模式及工具使用，不应只给一个未注明条件的百分数。[官方 README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)；[评分代码](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)

## 版本关系

本条专指 DeepMind 独立公开的数据与生成/评分代码。其方法承接 Michelangelo 论文提出的 MRCR 任务，但本次研究未从官方资料确认 v2 的单一首次发布日期。它与 OpenAI 的 `openai/mrcr` 是同一任务谱系下的不同实现：OpenAI 数据卡明确说其工作受 Gemini 首次介绍的 MRCR 启发并扩展难度；这不意味着数据、prompt、评分或结果可互换。[Michelangelo](https://arxiv.org/abs/2409.12640v2)；[OpenAI MRCR 数据卡](https://huggingface.co/datasets/openai/mrcr)

## 官方来源按角色分组

- **定义、变体、长度和工具限制**：[DeepMind 官方 README](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)。
- **数据下载与长度分组**：[官方下载脚本](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/download.sh)。
- **代码和数据文件许可**：[目录 LICENSE](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/LICENSE)。
- **任务论文**：[Michelangelo v2](https://arxiv.org/abs/2409.12640v2)。
- **另一独立 MRCR 实现**：[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/mrcr)。

## 模型发布引用

DeepMind 在不同模型页报告 MRCR v2 分数时会采用特定 needle 数、长度窗口和汇总法。引用时优先链接相应官方方法页，并记录工具开关和 `upto_128K`/`at_1M` 等聚合配置；不能把其它 MRCR 实现的分数直接视作复现。

## 未核实项

- 未逐项核对 GCS 中所有 CSV、代码下载路径与当前仓库 HEAD 对应关系；本轮未固定数据 revision 或哈希。
- 未确认公开数据总行数、每个子集完整文件清单与逐项题文内容。
- 未运行模型或评分脚本，也未将 DeepMind 与 OpenAI 分数对齐。

## 研究结论

**PASS_WITH_LIMITATIONS**：DeepMind 官方资料明确任务、needles、长度变体、代码工具影响和 Apache-2.0 条件。具体复现实验仍需固定下载文件、评分模式及工具配置；与 OpenAI MRCR 是独立实现，不能按名称合并。
