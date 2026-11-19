# 图表理解与数据提取：真实问题、本站评测和现有方案

核查日期：2026-11-09。基于当前本地条目和公开资料；未运行模型、提取客户图表或访谈本站用户，下面的个人自述不是用户规模或购买意愿。

## 具体使用问题

- [一位开发者](https://www.reddit.com/r/computervision/comments/1n0gj25/stuck_on_extracting_structured_data_from/)称客户项目需要从图表提取数值和标签，客户数据限制其使用所列云端大模型；其尝试的三种 OCR 在读取柱高、散点和曲线时效果不佳，也担心本地模型的算力成本。他在多个社区重复发过同一求助，不能算多个独立需求；我们没有客户图表、合同要求或独立复现。
- [一位科研读者](https://www.reddit.com/r/labrats/comments/1pwtypd/does_anyone_else_feel_like_webplotdigitizer_is/)说 WebPlotDigitizer 处理单图可用，但要从约 50 篇论文做元分析时，手动校准与点击耗时。评论里既有其他工具建议，也有工具作者自荐，其宣传和准确率主张不视为独立测评。
- [另一位材料领域提问者](https://www.reddit.com/r/materials/comments/1sv463s/what_tool_do_you_use_to_extract_data_from_a_plot/)希望自动识别坐标轴及多条曲线，减少当前手动操作。三条是具体个案，不说明提问者需要排行榜、本站或付费产品。

## 与本站三项评测的关系

| 本地条目 | 测量对象与已有样例 | 能否直接回答上述工作问题 |
| --- | --- | --- |
| [ChartQAPro](../../content/benchmarks/chartqapro.json) | 看图并回答事实、选择、假设和对话等问题；本站有 test-0 风电图题，原始答案与图的对应仍待复核。 | 覆盖读数与推理，但单题分数不等于整张图所有数值、标签都被正确恢复，也不测量批量校正时间。 |
| [CharXiv](../../content/benchmarks/charxiv.json) | 科学论文图表的描述与推理；本站保留五条验证集问题和来源定位，没有复制图像。 | 可帮助认识科学图表问答；缺少视觉输入时不能仅凭本站文字核验答案，更不等同完整曲线提取。 |
| [Chartography](../../content/benchmarks/chartography.json) | 专业图表问答；本站工程样例保留问题概述和公开答案，图像需到原文查看。 | 与专业读图有关；一题的答案不代表批量曲线恢复，也不代表某个解析器可在客户环境部署。 |

[ChartQAPro 论文](https://arxiv.org/html/2504.05506v2)对非年份数值采用 5% 相对误差容忍；例如标准值为 100、预测 104 在该规则下可记正确。年份、选择及事实判断使用精确匹配，文本与列表另有规则。业务若要求逐点、单位或报表金额精确一致，题目准确率不能自动当作其验收通过率；这是指标与任务的区别，不意味着该容差设计错误。零值等实现细节未在本次运行核验。

[Chartography 官方评测仓库](https://github.com/surge-ai/chartography)描述模型裁判收到问题、标准答案及模型回答，但不接收图表；排行榜配置使用每题 10 次运行。该规则评的是答案与标准答案的匹配，不能理解成裁判独立查看图像纠正标注。本次未跑模型或评判器。

来源数字存在待核查差异：[arXiv v2](https://arxiv.org/html/2504.05506v2)的 ChartQAPro 摘要称 1,341 图来自 **157** 个来源，[ACL Anthology 页面](https://aclanthology.org/2025.findings-acl.978/)摘要则为 **99** 个来源，两者都写 1,341 图、1,948 问。本站记录的是 arXiv 的 157；尚未逐图审计来源或确认差异由口径还是修订导致，不能自行判定哪个正确。未改产品条目。

## 已有工具与信息服务

- [WebPlotDigitizer 官方说明](https://automeris.io/docs/)已有人工输入结合计算机视觉，从图像恢复数据；它与以上用户求助直接相关，但人工校准成本可能影响批量场景。本次未操作或验证隐私条件和各图类型效果。
- [PaddleOCR 的 PP-Chart2Table 文档](https://github.com/PaddlePaddle/PaddleOCR/blob/main/docs/version3.x/module_usage/chart_parsing.en.md)提供图像转表格的本地推理接口，并展示 CPU/GPU 配置；它并非用户所提的普通 OCR 文本识别功能。文档称其分数来自 1,801 个内部测试样本且测试集暂无公开计划，不能把该数字直接与本站三个公开评测成绩或该客户的数据准确率比较。未安装、运行或估算用户硬件成本。
- [LLMBenchmark.ai 的 Chartography 页面](https://llmbenchmark.ai/benchmarks/chartography)已聚合模型发布成绩、标注报告方和部分工具设置，但它同时排序不同设置并提示这些值未由其复测；有工具、无工具、未知配置不能视作同一实验。[Priors](https://www.mypriors.com/benchmarks/bh-surge-chartography-100-tasks)也有 Chartography 成绩页。本次未逐行回查来源或验收交互。

## 对本站方向的含义

可以验证的读者任务是：给用户一份公开、有可靠原始数值的图表，分别查找“图表问答能力”“提取整张图表”“离线部署成本与可人工校正”的现有信息，记录能否找到合适来源和判断其局限。公开提问支持这些问题确实被提出，现有网站与工具也提供部分解决方案；**没有证据证明本站可以更快、更准确地解决，更没有付费或留存证据**。如果做样例，应逐图确认原始素材及再发布范围，且不能把任何单一 benchmark 的总分当作业务图表提取的保证。
