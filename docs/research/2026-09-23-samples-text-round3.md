# 文本 benchmark 样例核查（第三轮，2026-09-23）

本轮按用户要求核对 SimpleQA、OpenAI MRCR、DeepMind MRCR v2、BrowseComp-ZH、AlignBench、C-Eval、CMMLU。只从 benchmark 第一方官方数据文件识别记录；没有用 README 中的说明性例子填充数据。许可与数据来源须分别核实，文件可下载本身不表示有再发布授权。

## 条件候选

### CMMLU：官方 dev split 的一条多选题

- 记录位置：`data/dev/agronomy.csv`，源文件首个数据行，第一列 source index 为 `0`。
- 题面：`肉牛屠宰后，胴体的哪个部位肉质较好`
- 选项：A 胸；B 腹；C 大腿；D 小腿。
- 原始答案：`C`。
- 数据来源：[官方 CSV](https://github.com/haonan-li/CMMLU/raw/refs/heads/master/data/dev/agronomy.csv)。
- 许可：[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)；[官方仓库的许可说明](https://github.com/haonan-li/CMMLU)。官方仓库将这项许可明确用于 CMMLU 数据集。
- 采用条件：仅在本站确认为非商业用途、为摘录保留署名和许可说明，并按相同方式共享该摘录时采用。由于当前未确认这些条件，本条不作为无条件许可候选，也没有写入正式内容。
- 记录原字段和值见 `artifacts/candidates/samples-text-round3.json`。题目来自 CSV 数据行，而不是 README 例题。

## 暂缓或排除

| Benchmark | 核验情况 | 本轮处理 |
|---|---|---|
| SimpleQA | OpenAI 的官方 `simple-evals` README 将 benchmark 标为 MIT，官方代码指向 OpenAI 托管的 CSV。当前无法从官方文件端点读取并核对一条具体原始记录。 | 不用搜索摘要或第三方镜像拼接题目。待能直接核对官方 CSV 原行后再补。 |
| OpenAI MRCR | 官方 Hugging Face 数据卡将数据集标为 MIT，Parquet 文件可见；数据表中的完整长 prompt 被截断。 | 记录和答案片段虽可见，但无法把完整 raw 当成已核验文本，暂不展示。 |
| DeepMind MRCR v2 | 官方 `eval_hub/mrcr_v2` 有 Apache-2.0 LICENSE，README 说明数据从外部 GCS 下载，但未明确说明该 LICENSE 对 GCS CSV 的覆盖关系。 | 不把代码许可推定为数据许可。 |
| BrowseComp-ZH | 官方仓库发布加密题集并使用 canary 解密；官方设计是减少题目公开导致的训练污染和评测泄漏。 | 为防止泄漏，不解密、不转载题面或答案。 |
| AlignBench | 官方仓库有 `data_release.jsonl`，但本轮未找到明确覆盖数据内容的再发布许可。 | 代码可见或许可代码开放，不等于数据可转载。 |
| C-Eval | 官方仓库明确数据集采用 CC-BY-NC-SA-4.0，并提供数据下载地址；本轮未核实官方文件中非 README 的具体记录。 | 若本站能满足非商业、署名和相同方式共享条件，可继续从官方 split 取样；目前未录为候选数据。 |

## 可复核的第一方页面

- [SimpleQA 官方发布说明](https://openai.com/index/introducing-simpleqa/) 与 [官方评测仓库](https://github.com/openai/simple-evals)。
- [OpenAI MRCR 官方数据卡](https://huggingface.co/datasets/openai/mrcr/blob/main/README.md)：介绍数据结构、题目机制和 MIT 元数据。
- [DeepMind MRCR v2 官方 README](https://raw.githubusercontent.com/google-deepmind/eval_hub/master/eval_hub/mrcr_v2/README.md) 与 [目录 LICENSE](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/LICENSE)。
- [BrowseComp-ZH 官方仓库](https://github.com/PALIN2018/BrowseComp-ZH)。
- [AlignBench 官方仓库](https://github.com/THUDM/AlignBench)。
- [C-Eval 官方仓库](https://github.com/hkust-nlp/ceval)。
- [CMMLU 官方 dev split 数据目录](https://github.com/haonan-li/CMMLU/tree/master/data/dev)。

本轮没有修改正式 `content/`、应用源码或 `UPDATE_LOG.md`；仅新增候选核查文件。所有没有完整第一方原文或明确数据许可的 benchmark 都保留在暂缓清单，没有补写或改造其样例。
