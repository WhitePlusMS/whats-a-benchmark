# SimpleQA

核验日期：2026-09-23。

## 官方身份

SimpleQA 由 OpenAI 于 2024 年 10 月发布，作者为 Jason Wei 等 OpenAI 研究人员。官方说明其目标是测量语言模型对短事实性问题作答的事实准确度。[OpenAI 发布页](https://openai.com/index/introducing-simpleqa/)；[官方论文](https://cdn.openai.com/papers/simpleqa.pdf)

## 官方定义与忠实中文概述

SimpleQA 使用简短、可核查且预期有单一答案的事实查询。它以窄范围任务降低任意长篇回答中事实判断的复杂度；官方明确指出，短事实回答表现是否能代表长篇文本事实性尚未确定。[OpenAI 发布页](https://openai.com/index/introducing-simpleqa/)

## 任务输入/输出/环境

- **输入**：一个短事实问题，模型在官方参考运行中直接生成简短回答。
- **输出与评分**：官方 `simpleqa_eval.py` 将问题与参考答案交给 grader，分为 `CORRECT`、`INCORRECT`、`NOT_ATTEMPTED`。代码同时记录正确率、错误率和未尝试比例；准确率单项无法表达错误回答和弃答之间的差别。[官方评分实现](https://github.com/openai/simple-evals/blob/main/simpleqa_eval.py)
- **环境**：官方实现允许不同模型 API 作为回答器/grader。答案评分含模型裁判，结果可能受 grader、提示词及运行模型影响；是否联网检索也会改变被测系统设置。

## 数据规模/split/字段/文件

- OpenAI 发布页报告 4,326 个问题，并描述问题由人工创建、经第二位独立标注者核对一致答案，另由第三位标注者抽查 1,000 题。[OpenAI 发布页](https://openai.com/index/introducing-simpleqa/)
- 官方实现从 `https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv` 读取 CSV，将每行转为记录，并取 `problem`、`answer` 字段用于提问和评分。[官方数据读取代码](https://github.com/openai/simple-evals/blob/main/simpleqa_eval.py)
- CSV 官方端点在本轮联网读取时返回工具不支持的二进制内容类型；本机直接请求也未取得响应。因此没有查看当前 CSV 表头/逐行内容、计数或校验和，没有从搜索摘要、第三方镜像或旧本地文件拼造样例。本轮确认的是官方代码中 endpoint 和字段引用，而非对 CSV 本体完成逐字段验证。

## 访问状态

`dataAccess.url` 和样例入口现直达 `simple-evals` 代码引用的 OpenAI 官方 CSV endpoint。HEAD 请求返回 200、`application/octet-stream`、2,012,910 字节；本次仍未下载/解析 CSV 正文或核验行数与 hash，因此 `dataAccess.status=partial`、`sampleAccess.status=unverified` 保持不变。[官方 CSV](https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv)；[官方读取代码](https://github.com/openai/simple-evals/blob/main/simpleqa_eval.py)

## 数据/代码/媒体许可与使用边界

许可单独记录如下：`simple-evals` 仓库的 LICENSE 文件明确许可该仓库代码为 MIT；仓库 README 的 Evals 清单将 SimpleQA benchmark 列为 MIT License，且其法律说明要求上传数据者具备充分权利。官方 CSV 文件本体/响应头在本轮没有读取，故无法独立确认 CSV 对象是否附带许可文件或说明。这里据官方 README 记录 benchmark 级 MIT 声明，但不把代码文件许可证自动等同于每个外部数据对象的授权证明；做公开托管题目之前应再获取并固定 CSV 本体与对应授权证据。[官方 README](https://github.com/openai/simple-evals/blob/main/README.md)；[仓库 LICENSE](https://github.com/openai/simple-evals/blob/main/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

当前没有已核实并保存在本站的 SimpleQA 样例。本轮未能读取官方 CSV 的真实数据行，故不复制题目、答案或“看起来像官方”的示例。先提供官方发布页和仓库/CSV 入口；在原始记录和数据许可范围核验完成前维持 link-only。

## 指标

官方代码把答案交由 grader 判断为正确、错误或未作答，并输出相应比例；单题布尔 `score` 只在标签为正确时为真。准确、错误和弃答指标应一起报告。官方文章还讨论答案频率与准确性/一致性等分析，这些不能与上述 SimpleQA grader 计分混成一个指标。[官方评分实现](https://github.com/openai/simple-evals/blob/main/simpleqa_eval.py)；[官方发布页](https://openai.com/index/introducing-simpleqa/)

## 版本关系

本条指 OpenAI 2024 年公开的原始 SimpleQA 数据与其 `simple-evals` 参考实现。官方代码仓库声明 2025 年 7 月后不再维护新模型结果，但继续托管 SimpleQA 参考实现；引用数据时应固定 CSV 文件 revision/快照，避免将之后的整理版或第三方变体合并为原始集。[官方仓库](https://github.com/openai/simple-evals)

## 官方来源按角色分组

- **定义、构造、4,326 题统计和范围局限**：[OpenAI 发布页](https://openai.com/index/introducing-simpleqa/)。
- **数据 CSV 地址、读取字段和评分逻辑**：[官方 `simpleqa_eval.py`](https://github.com/openai/simple-evals/blob/main/simpleqa_eval.py)。
- **benchmark 级许可声明及仓库使用条件**：[官方 README](https://github.com/openai/simple-evals/blob/main/README.md)。
- **代码仓库 MIT 正文**：[官方 LICENSE](https://github.com/openai/simple-evals/blob/main/LICENSE)。
- **研究方法**：[SimpleQA 官方论文](https://cdn.openai.com/papers/simpleqa.pdf)。

## 模型发布引用

报告成绩需说明原始 CSV 快照、是否联网、模型提示和采样设置、回答模型、grader 模型/提示及三类结果比例。OpenAI 发布页呈现的是该团队当时的模型与设置；使用其它 grader 或字符串匹配规则的结果应作为不同协议单独说明。

## 未核实项

- 官方 CSV 文件本体在本轮无法由可用读取工具解析；未核实实际 header、首尾行、记录数、字节数、ETag 或哈希。
- 官方 benchmark README 标注 MIT，但没有在 CSV 对象本体确认独立授权文件/元数据；外部 CSV 的授权范围需继续交叉核实。
- 没有核验当前 CSV 是否与论文发布时版本逐行完全相同。

## 研究结论

**PARTIAL** — OpenAI 发布页、论文、参考代码确认了数据用途、4,326 题声明、CSV endpoint、字段引用与评分类别。官方 README 对 benchmark 标记 MIT，代码 LICENSE 也为 MIT，但两项证据分开记录；CSV 本体和真实记录在本轮未能独立读取，所以不收录样例，也暂不把许可结论延伸到该文件的公开托管。
