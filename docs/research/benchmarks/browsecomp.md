# BrowseComp

核验日期：2026-09-23

## 官方身份

BrowseComp（Browsing Competition）由 OpenAI 发布，作者 Jason Wei 等；基准发布页、论文和 simple-evals 仓库为第一方资料。发布页日期为 2025-04-10。[OpenAI 官方发布](https://openai.com/index/browsecomp/)（行 13–20、40–41）；[论文 arXiv:2504.12516](https://arxiv.org/abs/2504.12516)；[OpenAI simple-evals](https://github.com/openai/simple-evals)

## 官方定义与忠实中文概述

衡量网页浏览代理定位网络上难以找到的信息的能力。题目要求搜索并串联多个线索；答案设计为简短、单一且可核验，以便自动/简单判分。官方同时提醒它不是开放式真实用户查询分布的代表。[OpenAI 发布页 About the BrowseComp benchmark](https://openai.com/index/browsecomp/)（行 40–53、108–112）

## 任务输入/输出/环境

- 输入：问题文本和参考答案；原始评测 loader 同时使用任务行中的 canary 字段/加密文本，具体字段可查看官方 `browsecomp_eval.py`。[官方评测实现](https://github.com/openai/simple-evals/blob/main/browsecomp_eval.py)
- 输出：代理给出的短文本答案，由官方答案判定逻辑评分。
- 环境：基准测浏览代理搜寻与综合信息能力，但没有定义统一的搜索产品、工具权限、搜索预算或 harness。比较分数必须同时报告浏览能力、工具、推理配置、采样与预算。[发布页](https://openai.com/index/browsecomp/)（行 47–53、88–108）；[论文](https://arxiv.org/abs/2504.12516)。

## 数据规模/split/字段/文件

官方发布题数为 1,266。任务样例包含问题和答案；官方评测实现另含防泄漏 canary 字段。simple-evals 将 benchmark 代码列入项目，数据以密文/加密记录交付；数据文件不应按普通公开纯文本样例读取。官方资料未声明标准训练、验证 split。[OpenAI 发布页](https://openai.com/index/browsecomp/)（行 40–41、112）；[simple-evals README](https://github.com/openai/simple-evals#evals)；[browsecomp_eval.py](https://github.com/openai/simple-evals/blob/main/browsecomp_eval.py)

## 访问状态

OpenAI 参考实现直接读取官方 Blob 上的加密 CSV；`dataAccess.url` 现直达该文件，而非评测脚本。只有在官方实现中解密后才能得到题目；公开密文不允许本站转载解密后的明文。[官方加密 CSV](https://openaipublic.blob.core.windows.net/simple-evals/browse_comp_test_set.csv)；[读取与解密实现](https://github.com/openai/simple-evals/blob/main/browsecomp_eval.py)；[禁止在线披露样题的发布说明](https://openai.com/index/browsecomp/)

## 数据/代码/媒体许可与使用边界

OpenAI 将 BrowseComp 列为 MIT License benchmark；项目仓库 LICENSE 为 MIT。发布页脚注还明确请求不要在线以纯文本或图片展示任何数据样例，以避免训练数据泄漏和评测作弊，并使用 canary 帮助过滤训练语料。[simple-evals README](https://github.com/openai/simple-evals#evals)；[MIT LICENSE](https://github.com/openai/simple-evals/blob/main/LICENSE)；[BrowseComp 官方防泄漏说明](https://openai.com/index/browsecomp/)（行 110–112）。此处应遵循明确的“不公开题目样例”请求：不在公开 GitHub Pages 转载题面、答案或其图片；MIT 许可不消除该防泄漏请求。发布页图表用于介绍总体结果，不等于可展示具体题目样例。

## 官方样例与是否可在公开 GitHub Pages 转载

本站 `content/benchmarks/browsecomp.json` 当前无样题，`sampleAccess.status` 为 `restricted`，原因字段明确记录不打包原题。候选审查文件 `artifacts/candidates/samples-text-round2.json` 也将 BrowseComp 排除。官方发布页本身目前展示示例区域并包含一条示范题（行 202），但脚注仍明示请求不要在线公开样题；故不把官方页面已出现的例子复制到本站。公开 GitHub Pages 不转载题目、答案、截图或转写。[OpenAI 官方示例和脚注](https://openai.com/index/browsecomp/)（行 42–53、110–112）；[本站现有记录](../../../content/benchmarks/browsecomp.json)。

## 指标

官方核心指标为 accuracy（正确题数/总题数）。官方论文还研究 test-time compute、64 次采样后的多数/加权/Best-of-N 聚合，以及按每道题 pass rate 的分布；这些需要与单次 accuracy 分开报告。发布页原始表列模型准确率（如 GPT-4o、GPT-4o browsing、o1、Deep Research），且说明 Deep Research 受过专门 BrowseComp 训练，不应无注释地视为同条件模型比较。[OpenAI 发布页 Performance/aggregation/pass rates](https://openai.com/index/browsecomp/)（行 82–107、112）；[论文](https://arxiv.org/abs/2504.12516)。

## 版本关系

官方发布材料称原始正式公开集为 1,266 题。论文说明早期版本为 1,287 题，随后复核并移除 21 条答案格式不匹配、歧义或答案错误的题目，形成公开 1,266 题版本。[论文 PDF](https://cdn.openai.com/pdf/5e10f4ab-d6f7-442e-9508-59515c65e35d/browsecomp.pdf#page=9)（§4.5）；[OpenAI 发布页](https://openai.com/index/browsecomp/)（行 40–41）。BrowseComp-Long-Context、BrowseComp-Plus 等名称不得并入原始 BrowseComp，需作为不同变体分别找一手定义和关系证据。

## 官方来源按角色分组

- 定义、样例政策、官方结果： [OpenAI BrowseComp 发布页](https://openai.com/index/browsecomp/)（行 13–20、40–53、108–115）。
- 方法、版本修订与实验： [BrowseComp 论文](https://arxiv.org/abs/2504.12516)。
- 评测程序和 MIT 声明： [OpenAI simple-evals README](https://github.com/openai/simple-evals#evals)、[LICENSE](https://github.com/openai/simple-evals/blob/main/LICENSE)、[browsecomp_eval.py](https://github.com/openai/simple-evals/blob/main/browsecomp_eval.py)。

## 模型发布引用

OpenAI 自己在 BrowseComp 发布页报告 GPT-4o、GPT-4o browsing、GPT-4.5、o1 和 Deep Research 结果；该表用于记录发布方自身评测报告，不作为第三方复核。OpenAI GPT-5.4 等后续报告若列 BrowseComp，也应单独记录模型、工具、预算、模型版本和分数口径，不取代基准来源。[官方原始结果表](https://openai.com/index/browsecomp/)（行 82–107）。

## 未核实项

- 此轮没有下载解密完整数据，也没有运行 benchmark。
- 发布页有公开显示样题和禁止再公开样例的并存事实；按其明确防泄漏请求，站点不复用这部分题面。
- 各二次实现的 encryption/decryption 方式、题目子集和评分器版本须逐个比对，不能自动继承原始分数口径。
- 本轮不复核厂商使用的具体 BrowseComp commit、agent harness 与搜索预算。

## 研究结论

**PASS_WITH_LIMITATIONS** — 原始题数、任务定义、指标、版本修订及 MIT 代码/基准说明均有第一方来源。官方明确请求不要在线公开样题，故公开 GitHub Pages 不转载原题；分数须连同 harness 和计算预算说明。
