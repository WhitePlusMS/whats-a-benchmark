# Humanity’s Last Exam（HLE）

核验日期：2026-09-23

## 官方身份

Humanity’s Last Exam（HLE）由 Center for AI Safety（CAIS）与 Scale AI 组织，是覆盖百余学科的多模态闭合式学术问答基准。研究者在 2026 年 1 月报告 HLE 已发表于 *Nature*；官网另公告 2025-04-03 完成 2,500 题版本，并移除被标记为可检索/有问题的题目后替换。[HLE 官网](https://lastexam.ai/)；[作者论文](https://arxiv.org/abs/2501.14249)

## 官方定义与忠实中文概述

HLE 的目标是衡量模型在广泛专业知识与困难闭合式学术问题上的能力。题目由学科专家贡献，经模型难度筛查和多轮专家审阅；要求答案明确且可验证，尽量不依赖简单网络检索。它测量结构化学术任务，不等同于开放式研究能力或通用智能。[作者论文](https://arxiv.org/abs/2501.14249)

## 任务输入/输出/环境

- **输入**：英文问题，可附图片；题型包括多项选择和 exact-match 短答案。约 14% 的题要求同时理解文本和图像；约 24% 为选择题，其余为 exact-match。[作者论文](https://arxiv.org/abs/2501.14249)
- **输出**：选择项或可核验的短答案；原论文以标准 system prompt 要求组织 reasoning 和 final answer，再使用 o3-mini judge 对照标准答案判断正确性，并可按置信度计算 calibration error。[作者论文](https://arxiv.org/abs/2501.14249)
- **工具条件**：原论文的对比采用 zero-shot chain-of-thought prompts；其题目审查说明原始评估模型不能访问诸如计算器/代码执行的工具，因此认为纯粹依赖这些工具才难的题会制造人为难度。论文还用带搜索工具的模型识别潜在可检索题并人工审查，但这不代表基准默认允许搜索。带工具的厂商结果必须单独标注，不能与论文无工具结果混为同一协议。[论文评估附录](https://arxiv.org/abs/2501.14249)

## 数据规模/split/字段/文件

- 官方论文与数据卡描述公开集为 2,500 题、百余学科；约 14% 要用图像，约 24% 是选择题，剩余为 exact-match 短答。[论文](https://arxiv.org/abs/2501.14249)；[CAIS 官方数据卡](https://huggingface.co/datasets/cais/hle)
- 官方数据字段包括 `id`、`question`、`image`、`image_preview`、`answer`、`answer_type`、`author_name`、`rationale`、`rationale_image`、`raw_subject`、`category`、`canary`；HF 当前列出公开 `test` split 2,500 例。[CAIS 官方数据卡](https://huggingface.co/datasets/cais/hle)
- 论文说明另保留 private held-out questions 用于评估公开集上的过拟合；held-out 数量未在所查资料中公开，不与 2,500 公开题相加估算。[作者论文](https://arxiv.org/abs/2501.14249)

## 访问状态

HLE 官网提供数据、论文及代码入口，CAIS GitHub README 指引通过 Hugging Face 加载公开集。HF 数据库要求访问者接受条件并共享联系信息后才可读取文件；页面虽可公开浏览元信息，不等于无需条件地下载。论文还确认保留私有留出集。[HLE 官网](https://lastexam.ai/)；[CAIS 官方仓库](https://github.com/centerforaisafety/hle)；[CAIS HF 数据卡](https://huggingface.co/datasets/cais/hle)

## 数据/代码/媒体许可与使用边界

CAIS 官方 HF 数据卡标注 MIT，同时明确要求不要公开分享、重新上传或分发数据集；作者 GitHub README 也提醒 benchmark data 不应进入训练语料，并提供 canary 便于过滤。官方论文公开可读且其 arXiv 页面许可标注 CC BY 4.0，但论文许可不应自动套用于数据文件、题目、答案或图像。[官方数据卡](https://huggingface.co/datasets/cais/hle)；[作者仓库 README](https://github.com/centerforaisafety/hle)；[作者论文](https://arxiv.org/abs/2501.14249)

## 官方样例与是否可在公开 GitHub Pages 转载

**不转载题目、答案、rationale、题目图像或截图，也不镜像/重新分发数据集。**官方数据卡明确禁止公开分享、重新上传或分发；官方仓库写明 benchmark data 不应出现在训练语料。仅给出不含题文的任务概述和官网/官方访问入口，并保留 private held-out 的防过拟合边界。[CAIS 官方数据卡](https://huggingface.co/datasets/cais/hle)；[作者仓库 README](https://github.com/centerforaisafety/hle)

## 指标

主要指标为正确率；论文以 o3-mini judge 判断答案是否等价于标准答案，数值可在小范围内近似一致。论文还报告 RMS calibration error，用以衡量模型自报置信度与正确率的匹配。图像题是否纳入、文本子集、答案判定器、模型版本和工具条件均会影响结果。[作者论文](https://arxiv.org/abs/2501.14249)

## 版本关系

官网记录原始 HLE 于 2025-04-03 完成并定为 2,500 题；另有于 2025-10-08 公告的动态 fork HLE-Rolling。论文还说明维护 private held-out set。固定 2,500 题公开版本、HLE-Rolling 和 private held-out 应分别记录，不能只写“HLE”后合并成绩。[HLE 官网新闻](https://lastexam.ai/)；[论文](https://arxiv.org/abs/2501.14249)

## 官方来源按角色分组

- **定义、方法、数据格式、工具基线、防过拟合留出集**：[HLE 作者论文](https://arxiv.org/abs/2501.14249)（§3–4 与附录 C）。
- **当前 2,500 题公告、版本新闻及官网入口**：[HLE 官网](https://lastexam.ai/)。
- **访问条件、字段、许可标签和禁止公开分发要求**：[CAIS 官方 Hugging Face 数据卡](https://huggingface.co/datasets/cais/hle)。
- **作者仓库、评估脚本及训练污染 canary 提示**：[CAIS 官方 GitHub](https://github.com/centerforaisafety/hle)。

## 模型发布引用

论文自身的主要设置为 zero-shot CoT、以 o3-mini judge 核验；论文明确评估题目时使用无工具条件。任何带搜索、Python、沙箱或 agent harness 的厂商结果属于不同运行设置，应标注工具和 harness，不能与原始无工具表格直接比较。对公开集还应披露数据版本，考虑题目已公开且另有私有留出集。[作者论文](https://arxiv.org/abs/2501.14249)

## 未核实项

- private held-out 的题量、访问权限和当前部署方式没有在已查官方材料中公开。
- 数据卡 MIT 元数据与“不得公开分享、重新上传或分发”的明示要求同时存在；本记录按更具体的基准完整性请求处理，不作法律解释。
- 本轮未逐版本对比 HLE-Rolling 变化清单与公开 `cais/hle` 当前 revision。
- 各厂商带工具结果的搜索范围、代码工具、预算、judge 和题目子集须逐报告查证。

## 研究结论

**PASS_WITH_LIMITATIONS**：论文、官网、作者仓库和 CAIS 数据卡确认 HLE 的公开题量、图文与答案类型、评估方法、工具设置边界、条件式数据访问和防泄漏要求。不得在本站转载或重新分发题目数据；跨无工具/有工具的成绩必须分开。
