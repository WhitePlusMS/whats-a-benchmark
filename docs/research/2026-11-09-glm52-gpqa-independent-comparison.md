# GLM-5.2 的 GPQA：发布数字、独立评测与已有聚合

核查日期：2026-11-09。对照当前本地条目、模型卡、公开榜单和聚合站；未自行运行 GPQA、核查完整请求配置或开展读者测试。动态页面未来可能变化。

## 一个模型、同一评测名称、不同来源

| 来源 | 页面显示 | 证据边界 |
| --- | --- | --- |
| [Z.ai 官方 GLM-5.2 模型卡](https://huggingface.co/zai-org/GLM-5.2) | 表格 GLM-5.2 列的 GPQA-Diamond 为 **91.2**。 | 这是模型开发方发布表的成绩。卡片有一条“HLE 与其他推理任务”的通用采样说明，但未将所有 GPQA 运行细节逐项单独展开；本次未核到完整提示、接口部署、种子和逐题输出，不能以一般设置补全。 |
| [Vals 模型页](https://www.vals.ai/models/zai_glm-5.2)与[GPQA 榜](https://www.vals.ai/benchmarks/gpqa) | GLM 5.2 为 **85.61%**，模型页另显示 ±1.77。 | [其方法页](https://www.vals.ai/benchmarks/gpqa)说明使用 Diamond 198 题及其提示/解析方式；本次未找到该行全部参数、逐题结果及 ±1.77 的明确定义，不擅自称其为特定置信区间。该页当前将 GPQA 标为归档，称不再对新模型继续跑此项。 |
| [whatmodel.sh 的自报对照](https://whatmodel.sh/claims) | 同名模型、自报 **91.2**，另一结果 **91.856**，标来源为 Epoch AI 内部评测。 | 这是第三方页面对 Epoch 的转录；本次未从 [Epoch GPQA 页面](https://epoch.ai/benchmarks/gpqa-diamond)直接读到该行，具体模型服务/档位和运行配置未知，不能把这个数表述为本站已核验的 Epoch 原始记录。 |

官方表与 Vals 页面两数相差 **5.59 个百分点**。它们没有完成逐题、版本、推理预算和重复次数的条件对齐；这一差异不能单独证明厂商虚报、独立评测更准确或某一个设置造成分差。上述第三方转录的 Epoch 数高于厂商数，说明不能仅挑一个较低结果就概括“第三方一定测得更低”，但它同样不能替代直接核验 Epoch 的结果。

[HF 的 `gpqa.yaml`](https://huggingface.co/zai-org/GLM-5.2/blob/main/.eval_results/gpqa.yaml)也写 91.2，来源字段明确是同一张模型卡；它是结构化转录，不是第二次独立测评。对应[社区 PR](https://huggingface.co/zai-org/GLM-5.2/discussions/12)显示已合并；这一状态仅说明记录已入仓库，不代表作者或 HF 重新跑了成绩。

## 与用户原设想的直接竞争

[The Model Gap 的文章](https://themodelgap.com/blog/self-reported-vs-independent-benchmarks)已经用**完全相同的 GLM-5.2、GPQA 和 Z.ai/Vals 数字**说明两类来源，并链接原出处；它还提供模型、benchmark 和公开成绩数据入口。该站自己报告后来将部分自报值替换为独立评测值；本次没有逐项审计其全站数据。

[whatmodel.sh](https://whatmodel.sh/claims)也已经将模型厂商报告和第三方结果并列显示，并列明来源；其“独立”类别包含不同类型的第三方，例如另一个模型厂商的论文，不代表每一项都是中立机构统一协议跑分。[Artificial Analysis 的 GPQA 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)则说明该页评测由其独立进行，并提供示例、成绩及成本信息。本次未在 AA 的动态表中直接读到 GLM-5.2 对应数值，不能推断它没有该模型或填入猜测值。

这比“类似功能可能有人做过”更具体：**至少已有一家站点对这一个模型、同一评测、同一对来源完成了并列解释**。因此把公开成绩与来源放一起，不能单独构成本站已证实的差异化。

## 防止从单例过度推断

[Epoch 的一项历史 GPQA 分析](https://epoch.ai/data-insights/self-reported-gpqa)选择了 2023–2025 年部分组织的代表性前沿模型，比较厂商报告与其标准化评测，认为该筛选样本中差异未达到其使用的显著性标准；其中 Mistral 一项使用公司认可的第三方成绩。这个历史研究不包含对本例 GLM-5.2 三个数字的解释，也不证明所有厂商报告都准确或不同平台的协议等同。它为“公开成绩普遍夸大”的说法提供必要的反证与范围限制。

本站 [GPQA Diamond 条目](../../content/benchmarks/gpqa-diamond.json)已解释 198 道题、版本、提示和答案抽取边界，但目前没有结构化模型成绩。用户原本拟增加的成绩库仍是提议；是否将多来源与不确定项做成对照卡、是否有读者比直接用现有站更受益，需真实任务测试及维护成本测量，当前没有产品需求、留存或付费验证。作者的数据集卡请求不在线展示题目样例，本站现有条目已记录该边界；其他网站的授权情况未核，不作推断。
