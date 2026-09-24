# SWE-bench Multilingual

核验日期：2026-09-23。

## 官方身份

SWE-bench Multilingual 由 Kabir Khandpur、Kilian Lieret、Carlos E. Jimenez、Ofir Press 和 John Yang 与 SWE-bench 团队合作提出，收录于 SWE-bench 官方 benchmark 家族页面，并在 SWE-bench Hugging Face 空间发布。[作者/项目介绍](https://www.swebench.com/multilingual.html)；[官方数据集](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)

## 官方定义与忠实中文概述

评估模型/agent 能否在多种编程语言的真实软件仓库中，根据 GitHub issue 修改代码并修复问题。它沿用 SWE-bench 的实例格式和测试验证思路，规模刻意控制为 300 个精选任务，覆盖 42 个仓库和 9 种语言。[官方介绍](https://www.swebench.com/multilingual.html)

## 任务输入/输出/环境

- **输入**：issue 描述、对应仓库的解题前版本和评测环境。数据集记录还包含版本、issue/PR 指针、测试 patch 和执行脚本等字段。
- **输出**：模型产生代码修改 patch。成功要求 F2P 测试通过以确认问题被修复，并且 P2P 测试通过以确认既有行为保持正常。[官方任务说明](https://www.swebench.com/multilingual.html)
- **环境**：官方 harness 基于不同编程语言的 Docker 环境运行，并为任务提供基础和实例镜像；模型成绩依赖 agent scaffold、工具预算、运行命令和环境版本，不等于裸模型写代码能力。[官方数据指南](https://www.swebench.com/SWE-bench/guides/datasets/)

## 数据规模/split/字段/文件

- 官方数据集 test split 为 300 行，覆盖 42 仓库及 C、C++、Go、Java、JavaScript、TypeScript、PHP、Ruby、Rust 九种语言。官方卡显示各语言计数：Ruby 44、Rust 43、PHP 43、Java 43、Go 42、C 30、JavaScript 26、TypeScript 17、C++ 12。issue 文本主要为英语，但作者声明没有按 issue 语言过滤清理。[HF 官方数据页](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)
- 记录包含 `instance_id`、`repo`、`issue_id`、`base_commit`、`problem_statement`、`version`、`issue_url`、`pr_url`、`patch`、`test_patch`、`FAIL_TO_PASS`、`PASS_TO_PASS` 等。官方 HF 数据指南指出该变体将 F2P/P2P 存为 string list，原始 SWE-bench 中有不同编码形式；还无 `environment_setup_commit` 字段。[官方数据指南](https://www.swebench.com/SWE-bench/guides/datasets/)

## 访问状态

SWE-bench 官方网站、GitHub harness 和 Hugging Face 公开 dataset 可访问；HF 页列出 test split 300 行及 Apache/Docker harness 使用入口。可下载状态与将原始 issue/PR/代码补丁摘录到第三方站点的权利状态分开处理。[官方站点](https://www.swebench.com/multilingual.html)；[HF 数据集卡](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)

## 数据/代码/媒体许可与使用边界

HF 数据页的 dataset metadata 标记 MIT，SWE-bench 仓库页面也显示项目代码采用 MIT。数据集样本仍从数十个独立开源项目的 GitHub issue/PR 导出，其中包含第三方 issue 文本、源码差异、测试内容和仓库名称/链接；官方页面没有在本轮所查材料中逐实例列出上游项目许可证或明确阐释 MIT 标签对每份上游内容的覆盖方式。故不把聚合数据集的 MIT 标签当成已逐仓库核准的第三方素材权利清单；本站采用链接模式，不本地复制 issue、patch、测试代码或仓库素材。[HF 数据集许可标签](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)；[官方项目页](https://www.swebench.com/multilingual.html)

## 官方样例与是否可在公开 GitHub Pages 转载

当前 BenchAtlas 未保留该条目具体任务样例。本轮不新增 issue/PR 题面、patch、测试或截图样例：官方任务源链接公开可读，但问题正文及代码来自不同上游仓库，未逐条核验项目授权和再发布范围。可展示官方任务入口与原创协议摘要。

## 指标

核心指标为任务解决率（resolved rate）：通过评测 harness 中 F2P 与 P2P 测试判定成功任务的比例。按语言分项样本数约 12–44 条，差异较小的分数可能受少量实例影响。必须列明 agent scaffold、模型工具/成本预算、镜像与 harness 版本和成功规则。官方基线所报 Claude 3.7 Sonnet + SWE-agent、$2.50 预算 43% 是特定协议的历史基线，不作跨 setup 比较。[官方介绍](https://www.swebench.com/multilingual.html)

## 版本关系

该条目是 SWE-bench 家族的多语言变体，与主 SWE-bench、Verified、Lite、Multimodal、Pro 不是同一数据集。沿用的评测框架不表示数据同一；其 300 项精选样本也不能和 Python 原版任务数或分数直接混比。[SWE-bench 官方数据集指南](https://www.swebench.com/SWE-bench/guides/datasets/)；[多语言介绍](https://www.swebench.com/multilingual.html)

## 官方来源按角色分组

- **定义、构造过程、样本规模、F2P/P2P 规则、局限**：[SWE-bench Multilingual 作者介绍](https://www.swebench.com/multilingual.html)。
- **数据入口、split/schema/语言计数与许可元数据**：[官方 Hugging Face dataset](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)。
- **变体列表、数据结构与运行方式**：[SWE-bench 官方数据集指南](https://www.swebench.com/SWE-bench/guides/datasets/)。
- **执行框架及项目代码**：[SWE-bench 官方仓库](https://github.com/SWE-bench/SWE-bench)。

## 模型发布引用

应报告模型版本、agent scaffold、上下文/工具权限、运行预算、数据 revision、镜像覆盖、harness 版本及 resolved-rate 分母。厂商发布页引用该 benchmark 时只证明其采用了该项评测；其数字不可脱离具体执行条件作为通用榜单结果。

## 未核实项

- 未枚举 42 个上游仓库的许可证，也未逐条检查 issue 正文、PR patch、测试代码及其中可能引用的素材授权。
- HF Viewer 公开 300 行；本轮未下载并锁定其全量 Parquet、记录哈希或完整复跑 harness。
- 官方卡当前支持的模型榜单/模型成绩可能使用不同工具预算和 agent 设置；未做横向可比性审计。

## 研究结论

**PASS_WITH_LIMITATIONS** — SWE-bench 官方材料充分支持多语言任务定义、规模、数据结构与 F2P/P2P 评分方式。第三方 issue/PR/源码权利未逐实例核准；已有 BenchAtlas 未保留题目样例，本轮保持链接模式，不把 dataset 级 MIT metadata 扩大解释为上游所有素材的清权证明。
