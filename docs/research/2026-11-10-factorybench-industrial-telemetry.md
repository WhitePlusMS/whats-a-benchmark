# FactoryBench：工业设备信号问答与来源核查

调查日期：2026-11-10。与本站工业背景相关的新候选，但它评测工业信号问答，不是机器人抓取成功率，也不是现场故障诊断系统的验收。以本地 `content/benchmarks` 名称检索未发现同名已发布条目；未检查全站每段正文，不代表从未提及或已经决定新增。

## 测试什么

[FactoryBench 原论文](https://arxiv.org/html/2605.07675)和[数据卡](https://huggingface.co/datasets/FactoryBench/FactoryBench)介绍四个层次：状态、干预、反事实和决策；题目由时序信号、结构化模板和知识图谱产生。论文报告 69,691 题，另有覆盖模板并平衡部分答案维度的 3,000 题 Lite 子集，**Lite 是子集，不能将两者加成 72,691 个独立题目**。L1–L3 的结构化输出按规则计分，L4 自由回答使用三个 LLM 裁判；这些分别是机器评分与模型裁判，不等于现场专家逐题验收。

论文将 FactoryWave 自采信号与 AURSAD、voraus-AD 上游数据用于问题构造；真实机械臂记录中存在人为注入故障。受测的是模型对信号与假设条件的解释，原始信号来自真实设备并不意味着题目、故障和处置结论来自真实现场事故，更不能凭成绩保证 PLC、机械臂或整厂可部署。

## 固定版本文件和样例

只读查看两个 Hugging Face 仓库当时固定修订：主仓库 [`FactoryBench/FactoryBench` 的 `2561c2c9`](https://huggingface.co/datasets/FactoryBench/FactoryBench/tree/2561c2c90560ae3df90ef8136f774faa5fb4b4e3) 与 [`FactoryNet3/FactoryBench` 的 `51179609`](https://huggingface.co/datasets/FactoryNet3/FactoryBench/tree/5117960987cff51173ad8125b3b23b0e25702326)。API 返回的 README、Lite 第四层和 episode 元数据三个文件的 Git blob ID 分别相同；**仅检查这三个文件的 ID，不能断定两个仓库所有内容和维护关系相同**。

本次通过 HTTP 范围请求读取第二个仓库四个 Lite JSONL 文件各第一行，解析成功；L4 样例包含题目、参考答案、`root_cause`、来源和信号上下文。若自行实现模型评测，必须按正式提示模板只提供允许的输入，避免把答案和故障根因等标签连同整个记录直接发给模型。该观察仅涉及文件的记录结构；本次没有检查完整官方评测程序，**不能认定作者实验发生答案泄漏**。L2 第一条题目本身给出了碰撞对象，故障名称在此题属于已给条件，不应一律视作泄漏。

## 数据数量、引用和许可边界

- 论文注明其结果对应 `v1.0.0`，列 **8,983** 条 FactoryWave episodes；当前固定修订的[元数据文件](https://huggingface.co/datasets/FactoryBench/FactoryBench/blob/2561c2c90560ae3df90ef8136f774faa5fb4b4e3/factorywave/episodes.parquet)只读下载至内存并使用 PyArrow 读取为 **9,728** 行，与当前数据卡描述一致，相差 745。没有对照论文版本的实际文件、逐项匹配或核查为什么发生变化；不能将当前文件数量强行覆盖论文记录，也不能认定论文算错。
- 该数据卡的元数据及 BibTeX 把 AURSAD 关联为 `2202.03211`、voraus-AD 关联为 `2311.04153`；这两个 arXiv 页面分别是[语音通信](https://arxiv.org/abs/2202.03211)和[天文学](https://arxiv.org/abs/2311.04153)。正确上游资料可由论文参考文献及各作者来源核对：[AURSAD `2102.01409`](https://arxiv.org/abs/2102.01409)、[voraus-AD `2311.04765`](https://arxiv.org/abs/2311.04765)。FactoryBench 自身论文是 [`2605.07675`](https://arxiv.org/abs/2605.07675)。数据卡仍写匿名盲审引用，不能据此否认现有论文或识别维护者。
- 当前 FactoryBench 数据卡标 CC BY 4.0；[voraus-AD 官方仓库](https://github.com/vorausrobotik/voraus-ad-dataset)则将原始 100 Hz 和 500 Hz 数据标为 CC BY-NC-SA 4.0。论文称吸收了上游数据，具体题目、信号衍生关系和是否存在另行授权尚未逐项核查；商业使用或再发布相关材料前应确认适用权利，不能直接据单一总标签推断。
- 页面中的 `train` 命名，数据卡解释为单文件配置默认名，不是已证明存在训练／验证／测试划分；它称公开池未划分、另有私有污染检查集。当前 Viewer 显示部分结构转换错误，不等同原始 JSONL 均不可读；本次仅验证四行，未全量校验。

## 需求上的意义

这个例子能帮助检验工业人员是否希望了解「模型能否读设备信号、识别故障和提出处理建议」；但研究者设计了该评测，并不等于已经证明工厂一线会使用本项目，更不能用研究模型分数代表安全诊断能力。更具体的验证对象应是实际设备工程师：让其用同一例子判断信息是否足以理解信号来源、判定范围与限制，而不是先承诺通用诊断。
