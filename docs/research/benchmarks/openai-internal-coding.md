# OpenAI 前端偏好评测（公开披露）

核验日期：2026-09-23。

## 官方身份

这是对 OpenAI 在 GPT-5 开发者发布材料中公开提及的前端工程人类偏好比较的记录，并非 OpenAI 公布名称、题集或可复现协议的正式 benchmark。OpenAI 表示，在生成 Web 应用前端代码时，测试人员并排比较 GPT-5 与 o3 的结果，GPT-5 获选比例为 70%。[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)

## 官方定义与忠实中文概述

该披露说明一种围绕前端代码生成结果的 side-by-side 人类偏好比较：比较者看 GPT-5 和 o3 的输出并选择偏好项。OpenAI 将结论描述为 GPT-5 在前端代码的审美、进取程度和准确性方面更强。来源没有给出正式基准名称或更完整的研究方法，因此不扩写为标准化前端质量榜单。[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)

## 任务输入/输出/环境

- 已公开：任务涉及 Web 应用前端代码；两个模型输出作并排比较；测试人员选择偏好项。
- 未公开：提示词、项目/代码底座、模型采样与工具配置、比较者人数与资历、样本量、盲化方式、平局/无效票处理、评分聚合和误差区间。
- 因此只能陈述 OpenAI 的公开描述，无法据此重建运行环境或复现实验。

## 数据规模/split/字段/文件

OpenAI 没有公开样本量、数据集、split、样例字段或用于复现的任务文件。70% 是官方发布页披露的 GPT-5 偏好结果，不可推断为 70% 的模型绝对正确率或独立统计显著性。[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)

## 访问状态

没有机器可读内部评测集或数据下载页。样例入口只指向 OpenAI 对精选前端作品的说明，不能据此将 gallery 当成比较评测数据；`dataAccess.url` 保持缺省，避免制造数据下载按钮。[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)

## 数据/代码/媒体许可与使用边界

没有公开评测数据或代码许可。发布页可链接引用；不得从少量示例反向拼造所谓官方题集，也不复制页面展示的媒体素材作为基准数据。结论与 70% 数值应标为 OpenAI 自行披露，不能描述为独立复测。

## 官方样例与是否可在公开 GitHub Pages 转载

**不转载偏好比较样本**：官方没有公开比较数据或复用许可。页面的精选作品示例仅能作为 OpenAI 发布页链接，不能充当 benchmark 样例，也不能由其推断评测任务内容。

## 指标

唯一披露的量化结果是偏好率：并排比较中 GPT-5 被测试者选中的比例为 70%。发布材料未公布分母、区间估计、平局处理或显著性检验；不可将它解释为 pass rate、质量分或覆盖所有前端任务的总体偏好概率。[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)

## 版本关系

披露对应 GPT-5 对 o3 的特定发布期比较。它不能与 GPT-5-Codex 对移动网站的人类偏好披露、OpenAI 后续模型评测，或 Triple Whale 在 GPT-5.6 发布材料中提及的七任务前端评测混为同一 benchmark；后者由 Triple Whale 以其 QA rubric 自述，方法和对象均不同。[OpenAI GPT-5 developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)；[GPT-5 Codex 发布说明](https://openai.com/index/introducing-upgrades-to-codex/)；[GPT-5.6 发布说明](https://openai.com/index/gpt-5-6/)

## 官方来源按角色分组

- 70% 偏好率、比较对象及高层描述：[OpenAI GPT-5 for developers](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)
- 后续 GPT-5-Codex 移动网站偏好描述（未给出协议/数值）：[OpenAI Codex 升级说明](https://openai.com/index/introducing-upgrades-to-codex/)
- Triple Whale 七任务前端 QA rubric 的第三方自述（独立评测，不是 OpenAI 内部评测）：[OpenAI GPT-5.6 发布说明](https://openai.com/index/gpt-5-6/)

## 模型发布引用

OpenAI 发布材料报告 GPT-5 在测试人员的并排选择中胜过 o3 的比例为 70%。这是 OpenAI 自己对一项未公开完整方法的偏好比较所作披露，不是公开数据集的可复现榜单，也没有据此推导其他模型或运行条件下的成绩。

## 未核实项

- 任务数、前端任务类别、提示词、测试器人数/资历、模型运行配置及盲化程序均未披露。
- 偏好率分母、平局处理、置信区间与显著性均未公布。
- 公开材料未给出正式 eval 名称；本条标题仅便于目录检索，不代表 OpenAI 官方名称。

## 研究结论

**PASS_WITH_LIMITATIONS** — OpenAI 第一方来源明确披露比较对象、前端代码场景和 GPT-5 70% 偏好率；方法细节与数据集均未公开。仅作为厂商公开披露记录，不能作为可复现 benchmark 条目或独立验证结论。
