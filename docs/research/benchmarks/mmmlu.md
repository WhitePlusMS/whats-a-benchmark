# MMMLU

核验日期：2026-09-23。

## 官方身份

MMMLU（Multilingual Massive Multitask Language Understanding）由 OpenAI 发布，是专业人工翻译的 MMLU 测试集多语言版本。此处全称多一个 M，不能与视觉语言 benchmark MMMU 混淆。[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/MMMLU)；[原 MMLU 论文](https://arxiv.org/abs/2009.03300)

## 官方定义与忠实中文概述

它将原始 MMLU test 翻译为 14 个 locale，用于检查不同语言下的同类多学科知识选择题表现。它保留 MMLU 学科框架和选择题形式；翻译是人工完成，并未定义成覆盖每种语言地区文化知识的完整本地基准。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)

## 任务输入/输出/环境

- 输入为一个 locale 下的 MMLU 问题及四个选项，要求选出正确答案；用户可选择逐语言报告或明确所含语言的汇总分数。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)
- 输出是选项答案；主要比较指标为每语言准确率。OpenAI 在模型报告中说明会按提示语言识别答案格式，但通用成绩依赖模型版本、提示和解析策略。[OpenAI GPT-OSS technical report](https://openai.com/index/gpt-oss-model-card/)；[Simple Evals](https://github.com/openai/simple-evals)
- 静态文本 QA，无在线仿真环境。统一评价时须保留各语言选项顺序和一致的提示模板，不把直接翻译比较误写成本地文化知识测验。

## 数据规模/split/字段/文件

- 数据卡定义 14 个 config：`AR_XY`、`BN_BD`、`DE_DE`、`ES_LA`、`FR_FR`、`HI_IN`、`ID_ID`、`IT_IT`、`JA_JP`、`KO_KR`、`PT_BR`、`SW_KE`、`YO_NG`、`ZH_CN`，每种 locale 均为 `test` split；数据以 CSV 文件发布。它是 MMLU 测试集的语言翻译，不是另设的训练数据。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)
- 官方数据卡未在 README 逐字段描述 CSV schema，也未给本轮读取到的逐语言固定行数。现有记录按 `Question`、`A`–`D`、`Answer`、`Subject` 解析；`Unnamed: 0` 是当前样例快照中的额外索引列，并未在数据卡文档列为规范字段。不要将该派生列当作官方稳定 ID。[官方 CSV 文件清单](https://huggingface.co/datasets/openai/MMMLU/tree/main/test)；[数据卡](https://huggingface.co/datasets/openai/MMMLU)

## 访问状态

14 个语言 CSV 公开于 OpenAI 官方 Hugging Face 数据集页面，权限页面标为 MIT。数据卡声明 OpenAI 发布译文和用于评测的代码，并引用原始 MMLU 论文及 OpenAI Simple Evals 仓库。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)

## 数据/代码/媒体许可与使用边界

HF 数据卡 metadata 将 MMMLU 标记为 MIT；与原 MMLU 一样，数据内容源自原测试集，因此公开转载时应保留 OpenAI 与原 MMLU 作者引用及 MIT 授权说明。代码位于 Simple Evals 仓库，应单独查看其代码许可。当前数据只有文本选择题，没有媒体文件。公开 license 标签不代表可忽略测试数据泄漏问题。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)；[OpenAI Simple Evals](https://github.com/openai/simple-evals)

## 官方样例与是否可在公开 GitHub Pages 转载

核对工作区现存 MMMLU 样例时发现两条均为 `ZH_CN / test`：

- 本地 `ZH_CN-0` 把 `Question`、A–D、`Answer=B` 和 `Subject=abstract_algebra` 展开为题面、选项和“B. 4”；`raw` 另包含 `Unnamed: 0=0`。
- 本地 `ZH_CN-1` 使用同一学科，把 `Answer=C` 展开为“C. 24”；`raw` 另包含 `Unnamed: 0=1`。本地题面将问题写成求 `<p>` 的“幂”，但标题称“子群的指数”，并且答案说明指向 24；题面用语、标题和答案语义并不自洽，须回查原行和翻译，不应把这条记录视为已通过内容核验。
- 两条的 locale/split 和字段映射符合该数据集的结构描述；但官方 Viewer 本轮不能读取记录，原 CSV 链接也无法通过网页工具载入。因此无法对题面、选项、正确答案与逐字 CSV 内容作当前 live 对照。“`ZH_CN-0/1`”是本地合成的索引式 ID，并非数据卡保证的稳定 ID；`Unnamed: 0` 也未被文档定义成稳定身份字段。[数据卡](https://huggingface.co/datasets/openai/MMMLU)

这两条含测试题和正确答案，会将仅有的 test split 题目及答案直接嵌入公开站点，增加受测数据暴露机会。OpenAI 数据卡没有声明 Mind2Web 那样的禁止再分发或 anti-training canary；因此这里将“不要复制 test 题/答案”作为评测完整性建议，而非冒称官方禁止。建议公开页面移除两条原始问答，只保留结构概述和官方链接；本轮不改 `content/`。[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)

## 指标

逐语言报告四选一准确率；如给跨语言汇总，必须写清 locale 范围、宏/微平均和提示/解析设置。OpenAI technical report 说明答案解析会匹配不同提示语言中 “Answer” 的表达；因此不同评测脚本和 locale 的原始分数不宜直接并在一起。[OpenAI GPT-OSS technical report](https://openai.com/index/gpt-oss-model-card/)；[Simple Evals](https://github.com/openai/simple-evals)

## 版本关系

MMMLU 于 2024 年发布，以原始 MMLU test 为翻译底本，覆盖 14 个 locale。原始 MMLU 与 MMMLU 共享题目/答案语义但翻译不同；OpenAI 数据集只列 test split，不含 MMLU 原版的 dev、validation。数据卡修正过 `ZH_CH` 拼写为 `ZH_CN`，需使用后者作为配置名。[OpenAI 数据卡历史](https://huggingface.co/datasets/openai/MMMLU)

## 官方来源按角色分组

- **14 个 locale、翻译属性、配置、split 和数据 license：**[OpenAI/MMMLU 官方数据卡](https://huggingface.co/datasets/openai/MMMLU)。
- **基础 MMLU 定义和题库来源：**[Hendrycks 等作者论文](https://arxiv.org/abs/2009.03300)。
- **OpenAI 对多语种测评与答案解析的报告：**[GPT-OSS model card](https://deploymentsafety.openai.com/gpt-oss/a2)；[Simple Evals](https://github.com/openai/simple-evals)。

## 模型发布引用

报告应列出 MMMLU 而非 MMMU，标注 14 个 locale 中实际采用的范围、对应数据 revision、逐语言准确率与聚合方法、提示语言、答案匹配规则和模型版本。因为所有记录均为测试题且公开可访问，应说明训练数据暴露风险；不能声称模型未见过题目，除非另有可信去污染证据。

## 未核实项

- 官方 Hugging Face Viewer 和 CSV 原始下载在本轮不可读取，故无法重新逐字验证现有两条题面及答案映射。应在样例删除/保留决策前以固定官方 commit 再核验。
- 数据卡未提供 CSV schema 专门定义和逐 locale 行数，本次未对 14 个文件逐行统计。
- 本次仅看到 HF metadata 的 MIT 声明；Simple Evals 代码条款与翻译/底本之间逐项权利链没有单独拆解。
- 数据卡未载明反训练 canary 或明确的污染预防分区；测试集暴露风险是评测完整性限制，不作为上游规则声称。

## 研究结论

**PASS_WITH_LIMITATIONS** — OpenAI 数据卡确认该项为 MMLU test 的 14 语言人工翻译，提供可访问 CSV 并声明 MIT。现存两条例子的结构映射看起来一致，但本轮无法逐字回源核对；二者均直接暴露 test 题及答案，不建议继续用于公开站点样例。建议页仅概述并链接原始数据。


## 2026-09-23 样例实源复核（本节为当前结论，取代前文相应旧结论）

- 固定 OpenAI 官方 Hugging Face revision：`64d5b3a05a263d14426f109345c38abaa7c7948d`；文件为 `test/mmlu_ZH-CN.csv`，locale 为 `ZH_CN`，split 为 `test`。首行空表头索引为 0；该数据没有稳定题目 ID。
- 为后续对照，将行解析为 `index, Question, A, B, C, D, Answer, Subject`，按 UTF-8 JSON、紧凑分隔符和键排序规范化后计算 SHA-256：`2fba2ac8a857c48d2c1ba2e3057c1366d8e8ee6d404a67b151f06b23882ced40`。网站题干、四个选项和答案标签直接取自该行，没有翻译或改写。
- OpenAI Hugging Face 数据卡 metadata 将 MMMLU 标记为 MIT；底本 MMLU 的 MIT notice 在 `content/assets/licenses/mmlu.txt`，页面注明 OpenAI 与原作者归属。Simple Evals 的代码许可不作为数据许可依据。
- 该行属于公开 test split，公开题目和答案可能增加训练/评测污染风险；这是评测完整性风险，不是上游禁止转载声明。本站明确提示风险。
- 原始入口：[不可变官方 CSV](https://huggingface.co/datasets/openai/MMMLU/blob/64d5b3a05a263d14426f109345c38abaa7c7948d/test/mmlu_ZH-CN.csv)，[OpenAI 数据卡](https://huggingface.co/datasets/openai/MMMLU)。
