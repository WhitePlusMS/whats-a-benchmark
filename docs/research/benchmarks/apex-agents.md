# APEX-Agents

核验日期：2026-09-23。对象区分为原版 `mercor/apex-agents` 与后续 `mercor/apex-agents-v1.1`；不能把两版规模合并。

## 官方身份

Mercor 发布的专业服务长程、多应用 agent benchmark。原版 HF 数据卡标注 480 项任务、33 个 worlds；Mercor 的后续 1.1 发布收敛为 240 项、31 个 worlds。[原版 HF 身份与规模](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L169-L186)；[1.1 HF 身份与规模](https://huggingface.co/datasets/mercor/apex-agents-v1.1#dataset-overview#L85-L105)

## 官方定义与忠实中文概述

衡量 AI agent 能否在投资银行、管理咨询和公司法务等专业服务场景中，完成长程且跨应用的工作任务；agent 需要从模拟项目世界的文件、应用状态和工具中寻找上下文并交付结果。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L169-L187)

## 任务输入/输出/环境

- 每个任务包含单轮 prompt、逐项二元 rubric、gold output、metadata，以及对关联 world 文件和工件的引用。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L189-L201)
- World 提供日历、聊天、代码执行、文档、文件系统、邮件、PDF、表格、演示文稿等应用；原版部分 world 还含金融数据应用。数据卡说明禁用网页搜索以保持可复现。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L187-L187)
- judge 对每项标准独立判定 Met / Not met；原版均值约 4.06 项/任务。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#evaluation#L195-L201)

## 数据规模/split/字段/文件

- 原版为 480 tasks（每个职业领域 160）、33 worlds（投行 10、咨询 11、法律 12）、平均每 world 166 个文件；480 项、3 个领域。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L172-L186)
- 1.1 为 240 tasks（每领域 80）、31 worlds（投行 8、咨询 11、法律 12）、5,182 个文件；表格列出任务输入文件与文件输出的数量。[1.1 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1#dataset-overview#L90-L105)
- 1.1 不是常规表格数据集，而是 Harbor runnable delivery：`environment/`、`tasks/`、`worlds/`、`manifest.json`、`registry.json`、`run_task.sh`；任务包内含 instruction、metadata、agent config、环境 overlay、solution、grader。HF 页面要求先同意分享联系信息后才能访问文件；本次未接受或读取 gated 文件。[1.1 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1#distribution#L126-L141)；[HF gated 状态](https://huggingface.co/datasets/mercor/apex-agents-v1.1#L71-L75)
- 当前可见数据卡未声明常规 train/test split。不可据此假定它提供标准 split。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#how-to-load-the-dataset#L219-L226)

## 访问状态

HF 页面可公开查看数据卡与目录预览；文件受 gated 条件保护，用户须同意分享联系信息。1.1 同样 gated。仅访问页面公开可见部分；未登录、未接受条件、未下载，也未尝试程序化访问文件。[原版 HF 页面](https://huggingface.co/datasets/mercor/apex-agents#L154-L159)；[1.1 HF 页面](https://huggingface.co/datasets/mercor/apex-agents-v1.1#L71-L75)

## 数据/代码/媒体许可与使用边界

- 两个 HF 页面都标注 `cc-by-4.0`。但原版数据卡另行写明：用途仅限模型评测；禁止训练、微调、参数拟合，也禁止 crawling/scraping。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L172-L178)；[1.1 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1#dataset-overview#L90-L97)
- 1.1 gated 条件要求同意分享联系信息。CC-BY 元数据与专门的 evaluation-only / no-scraping 使用条件同时出现；仅凭 HF 的 CC 标签不能消解其余明示条件，故本站不得抓取、镜像或展示原始任务/文件/媒体。公开 GitHub Pages 可展示身份、规模等经引用的事实摘要与官方链接；不可转载题面、rubric、gold outputs、世界资产。若将来拟转载任何原始材料，需另行取得 Mercor 明确书面许可。[原版限制](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L172-L178)；[1.1 限制与门控](https://huggingface.co/datasets/mercor/apex-agents-v1.1#L71-L75)
- Mercor 对 worlds 另有声明：场景为假设性模拟，不构成专业意见；相关市场信息源自公开及第三方资料且未经独立核验。[1.1 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1#legal-disclaimer-on-the-content-of-worlds#L225-L227)
- 配套 1.1 agent harness 代码在 Mercor 的 GitHub 仓库；代码仓库存在不代表其包含或授权重发任务数据。[官方 agent repo README](https://github.com/Mercor-Intelligence/apex_loop_truncated_tools_agent#readme)

## 官方样例与是否可在公开 GitHub Pages 转载

HF 页面公开目录预览展示 task 文件名与部分元数据，但正文和文件需通过 gated 条件访问；公开样例可做页面链接，不复制受限记录。480 条/33 worlds 属原版，1.1 更新为 240 条/31 worlds。由于 no-crawling / evaluation-only 条件，不建议在公开 GitHub Pages 摘录真实任务、rubric、gold answer、文件或媒体。[原版 HF 页面](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L154-L178)；[1.1 HF 页面](https://huggingface.co/datasets/mercor/apex-agents-v1.1#distribution#L126-L141)

## 指标

Mercor HF 原版数据卡列出 pass@1、pass@8、Pass^8、mean score 及领域分项；规则是每条 rubric criterion 二元判分。[原版 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents#evaluation#L195-L211) 1.1 页面说明需固定 agent harness revision 与 100-turn / 10,800 秒预算才能与发布成绩比较；改变运行预算或 revision 会使结果不具可比性。[1.1 HF 数据卡](https://huggingface.co/datasets/mercor/apex-agents-v1.1#agent-implementation#L196-L202)

## 版本关系

原版 APEX-Agents（480/33）与 APEX-Agents 1.1（240/31）是不同发布快照。1.1 说明经三轮审查筛选每领域 80 项，且修订 world 文件以明确必要信息；新页面称 judge、task specification、tooling、environment 有更新。[Mercor 1.1 发布说明](https://www.mercor.com/blog/introducing-apex-agents-1-1/#task-updates)；[两版 HF 卡](https://huggingface.co/datasets/mercor/apex-agents#dataset-overview#L172-L186)、[1.1](https://huggingface.co/datasets/mercor/apex-agents-v1.1#dataset-overview#L90-L105)

## 官方来源按角色分组

- 发布方数据卡：原版 [mercor/apex-agents](https://huggingface.co/datasets/mercor/apex-agents)、1.1 [mercor/apex-agents-v1.1](https://huggingface.co/datasets/mercor/apex-agents-v1.1)
- 发布方说明： [APEX-Agents 1.1 announcement](https://www.mercor.com/blog/introducing-apex-agents-1-1/)
- 参考实现： [Mercor APEX 1.1 agent](https://github.com/Mercor-Intelligence/apex_loop_truncated_tools_agent)
- 论文： [APEX-Agents arXiv:2601.14242](https://arxiv.org/abs/2601.14242)
- 官方榜单入口： [Mercor APEX](https://www.mercor.com/apex/)

## 模型发布引用

模型厂商报告只可作为“厂商报告在某配置下评测”的二级引用，不作为 benchmark 定义、数据规模、许可或独立验证依据。当前报告不采纳厂商分数。

## 未核实项

- gated 内容中的原始文件清单、逐条数据字段、示例题目、答案和媒体均未访问；不要从文件预览以外推断字段完整性。
- HF 展示 `cc-by-4.0` 与独立的 evaluation-only、禁止抓取条件如何在特定再发布场景中共同适用，公开页面未给出法律解释；本报告按最严格的明示使用边界处理。
- 1.1 页面采用约束的接收/同意流程，不代表本研究已获 Mercor 访问授权。

## 研究结论

**PASS_WITH_LIMITATIONS** — benchmark 身份、两版规模、评分及显式使用边界已由 Mercor/HF 一手页面核实；gated 内容未访问。只建议引用事实并链接官方来源，不转载样例数据。
