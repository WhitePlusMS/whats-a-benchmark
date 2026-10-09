# OfficeQA-Pro and OSWorld-2: final public-source check

核验日期：2026-10-08。本文只记录公开来源、响应状态和版本/题目关联事实，不作样例采纳或许可结论。未读取 gated 数据文件，未提交 HF 访问申请或接受条款。

## OfficeQA-Pro

Databricks 现行公开 README 将 OfficeQA Pro 定义为 133 道全部标为 hard 的题；OfficeQA Full 为相同的 133 道 hard 题再加 113 道 easy 题。README 同时说明 Pro/Full 的问题和答案 CSV 位于 gated HF 数据集，授权后才能加载 officeqa_pro.csv。[官方 README](https://github.com/databricks/officeqa)；[原始 README](https://raw.githubusercontent.com/databricks/officeqa/main/README.md)（2026-10-08 获取，SHA-256 d72c40ee82cc96e0adbf8f4dd1d87ce22a1e4feb85c72931be2076c7f3c151d3）。

Databricks 2025-12-09 博客公开了一道标为 Hard 的 USDA 预算预测题：基于 1990–1998 年数据，用基础线性回归预测 1999 年总支出，要求输出斜率、截距和预测值。博客将当时的 Hard 子集描述为 113 题；该例没有公布当前 Pro CSV 的 UID，也没有提供与当前 133 行 Pro 集合的交叉映射。[官方博客](https://www.databricks.com/blog/introducing-officeqa-benchmark-end-to-end-grounded-reasoning)，Example OfficeQA Questions > Hard。

同一官方技术报告的 v1 PDF 另有明确的 Pro 样题：Figure 3 标为 “Sample questions from OfficeQA Pro”，其中 UID0013 要求使用 1929–1942 财年的美国联邦个人所得税收入净退款数据（名义十亿美元），以未变换的年份为预测变量、收入为结果拟合普通最小二乘线性回归，并将斜率与截距四舍五入到千分位后用方括号和逗号输出。Figure 3 未列这道题的答案。报告第 2.2 节称 Pro 有 133 题，另提供 113 道较易题组成 OfficeQA-Full；第 2.3 节说明两种系统都答对的问题归为 Easy 并只保留在 Full。[官方技术报告 v1 PDF](https://arxiv.org/pdf/2603.08655v1)，Figure 3、§2.2、§2.3。

因此，公开论文中的 UID0013 是明确标为 OfficeQA Pro 的公开样题。旧博客里的 USDA 预测例仍没有公开 UID 或当前 CSV 行映射；本段不把它与 UID0013 或当前 Pro 行建立对应关系。匿名访问 officeqa_pro.csv 返回 HTTP 401；未读取 CSV。

## OSWorld-2

当前 benchmark 条目 `osworld-2` 的名称与版本为 OSWorld 2.0。官方项目站也明确标为 OSWorld 2.0，并公开具体失败案例 Task035 Purchase Requests：采购请求和审批散布在表格、财务频道与私信；目标是提交包含全部请求及正确审批状态的采购单。站点还公开 Task008 Oracle Reimbursement 等案例摘要。[官方 OSWorld 2.0 页面](https://osworld-v2.xlang.ai/)，Failure Cases > Task035 > Task setup。

OSWorld 2.1 release 页面日期为 2026-09-16。公开 osworld-v2.1 manifest 固定代码 commit 325ab352e2ff7410854bf8e3324c391bc60e7526、108 项 task、task 数据集 commit 0a1aadad95aa79b00b3783e717d865089ab06e26、完整 gated assets commit 384b3834faba5700a7b589e6cc181490c9808949，以及 website commit 60c89fe6a8ed934668619d8d26132848239eb8ee。[v2.1 manifest](https://raw.githubusercontent.com/xlang-ai/OSWorld-V2/osworld-v2.1/benchmark_releases/osworld-v2.1.json)（2026-10-08 获取，SHA-256 978686683bdf9f946703c1d316cbbd29c0e3ea97396e48d940ee92c597806ecf）。

版本固定的 task-class README 和公开评测指南都说明正式 V2 task class 由 gated Hugging Face 数据集提供，公开 GitHub checkout 不包含这些实现；读取任务需通过 release-aware loader 下载至 evaluation_examples/task_class。完整 assets 也 gated，公开 runtime assets 只是最小匿名镜像。[v2.1 task-class README](https://github.com/xlang-ai/OSWorld-V2/blob/osworld-v2.1/evaluation_examples/task_class/README.md)；[v2.1 public evaluation guideline](https://github.com/xlang-ai/OSWorld-V2/blob/main/docs/PUBLIC_EVALUATION_GUIDELINE_v2.1.md)。

本轮确认了与当前条目版本一致的官方公开 2.0 Task035 示例。v2.1 manifest 的任务仓库和版本固定信息仍作为后续版本边界记录；不据此推断 Task035 属于 v2.1。官方 task-showcase 路由 HTTP 200，但响应是 JavaScript 页面，没有可独立读取的静态任务记录；trajectory viewer 返回 HTTP 530；匿名 GitHub 树 API 返回 403 rate limit。它们是本次检查的边界，不代表全网不存在其他公开材料。未访问 gated task/asset 文件。

## 机器可读证据

逐源 URL、响应码、revision、具体记录定位和未确认字段见 2026-10-08-officeqa-osworld-final-check-a.json，位于 artifacts/candidates。
