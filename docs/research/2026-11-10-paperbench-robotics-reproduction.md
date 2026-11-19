# PaperBench 中的机器人复现任务与导航评测边界

核查日期：2026-11-10。本文只检查公开文件，没有运行评测、下载模型镜像或操作机器人。

## 原版 PaperBench：机器人是部分论文的实验对象

本站 [PaperBench](../../content/benchmarks/paperbench.json) 分类为智能体科研复现，其任务是按论文与 rubric 构建并验证复现代码；它不是机器人策略榜。[原版论文](https://arxiv.org/abs/2504.01848)报告 20 篇 ICML 2024 论文和 8,316 个可评分节点。仓库固定修订 `b78dab1da774a6456b1ed9c48c9ff194ee3ff36d` 的论文目录列出 23 个文件夹，其中包含额外开发论文；不能将目录数与论文公布的 20 篇直接等同。

本轮请求该固定修订 23 份 `rubric.json` 均返回 200，再对全文扫描 robot、locomotion、manipulation、antmaze、kitchen、humanoid、mujoco、walker、embodied 等词并抽查上下文。关键词命中四个目录，另外 `self-composing-policies` 等不应因名称推定含机器人。扫描不能排除未使用这些词的相关任务，也不是 23 篇论文全文语义审计。

| 原版任务 | 直接证据 | 解释 |
| --- | --- | --- |
| [fre](https://raw.githubusercontent.com/openai/frontier-evals/b78dab1da774a6456b1ed9c48c9ff194ee3ff36d/project/paperbench/data/papers/fre/rubric.json) | 评分要求设置 AntMaze、ExORL walker 与 D4RL Kitchen；[原论文](https://proceedings.mlr.press/v235/frans24a.html)说明其仿真机器人实验。 | 复现强化学习论文的仿真训练和评估；不代表真实机器人实验。本站已有 FRE 样例，但条目整体是科研复现。 |
| [ftrl](https://raw.githubusercontent.com/openai/frontier-evals/b78dab1da774a6456b1ed9c48c9ff194ee3ff36d/project/paperbench/data/papers/ftrl/rubric.json) | 要求实现 Meta-World 的 RoboticSequence；[原论文](https://raw.githubusercontent.com/mlresearch/v235/main/assets/wolczyk24a/wolczyk24a.pdf)要求单次回合依次完成锤击、推动、拔销、绕墙推动。 | 关联本站 [Meta-World](../../content/benchmarks/meta-world.json)，但这个串行任务不是 MT50 或 ML10 成绩；PaperBench 测论文复现，不能与策略任务成功率合榜。 |
| [rice](https://raw.githubusercontent.com/openai/frontier-evals/b78dab1da774a6456b1ed9c48c9ff194ee3ff36d/project/paperbench/data/papers/rice/rubric.json) | 要求 MuJoCo Hopper-v3、Walker2d-v3 等环境和强化学习复现实验。 | 关联仿真运动控制，测量对象仍是论文复现。 |
| [sapg](https://raw.githubusercontent.com/openai/frontier-evals/b78dab1da774a6456b1ed9c48c9ff194ee3ff36d/project/paperbench/data/papers/sapg/rubric.json) | rubric 要求使用 Shadow 和 Allegro 手进行 manipulation；[原作者代码](https://github.com/jayeshs999/sapg)将 Shadow／Allegro 训练列为 Isaac Gym 环境。 | 原论文相关任务有仿真环境；本轮没有验证全部复现设置，不推断实机。 |

## 第三方扩展：MapGPT 与本站 R2R 不能混成一条成绩

[Pipeline Lab PaperBench Expanded](https://github.com/pipelinelabai/paperbench-expanded/tree/48ae869c1129de854a0c5715fe9d3f5f4bc4bf66) 是第三方扩展，不是 OpenAI 原版。其作者声明 93 项，12 项公开、81 项受控访问；本轮只能核实公开材料，不能把公开 12 项结果当成全部 93 项结果。

[公开任务 12 固定版指令](https://github.com/pipelinelabai/paperbench-expanded/blob/48ae869c1129de854a0c5715fe9d3f5f4bc4bf66/tasks/12-mapgpt-r2r/instruction.md)要求 agent 复现 MapGPT，在离散 R2R 导航图上使用预计算图像和本地 Qwen2.5-VL-7B 跑 72 场景 216 条轨迹；提交代码必须从空结果目录独立重跑，验证器从轨迹重新计算 NE、OSR、SR、SPL。该任务固定要求本地模型，不等于原版 [MapGPT](https://github.com/chen-judge/MapGPT) 使用 GPT-4V／GPT-4o 的结果。仓库不直接打包观测和权重，其默认运行镜像需要另行取得；[公开任务清单](https://github.com/pipelinelabai/paperbench-expanded/blob/48ae869c1129de854a0c5715fe9d3f5f4bc4bf66/docs/tasks.md)声明任务 12 的资源为 1 GPU、8 CPU、32 GiB、100 GiB 存储声明和 agent 18 小时上限，实际资源、许可及能否运行未验证。

本站 [R2R](../../content/benchmarks/r2r.json) 是离散图导航评测；[R2R-CE](../../content/benchmarks/r2r-vlnce.json) 将 R2R 路线用于 Habitat 连续环境。两者与上述复现任务有关联，但任务目标、行动空间、模型、数据范围和评分均不相同。即使指标同名，也不能直接把 PaperBench Expanded 的复现总分与 R2R 或 R2R-CE 的 SR 排一张榜。

## 已有工具和用户问题

- [VLN-CE 官方说明](https://github.com/jacobkrantz/VLN-CE)记录同一基线论文的 val_unseen SPL 为 0.30，而榜单为 0.27；作者指出硬件及 Habitat 版本／构建是可复现性因素。不能据此断言单一原因，也不能将不同 split 或构建的成绩随意并排。
- [NaVid-VLN-CE issue #6](https://github.com/jzhzhang/NaVid-VLN-CE/issues/6) 记录一名用户在 Orin 和 CUDA 11.4 上运行 R2R 评测时遇到无窗口 EGL 上下文问题。这是一条具体排障线索，不能推断问题普遍性或支付意愿。
- [AgentCanvas 的 MapGPT 分析页](https://jianzhou0420.github.io/AgentCanvas/pages/developer-guide/nodesets/method/mapgpt.html)已有任务范围、实现及结果口径说明，因此“解释 MapGPT 与标明 72 场景子集”本身不是本站独有优势。

## 与用户给出的 GPQA 页面

[Artificial Analysis 的 GPQA Diamond 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)称其独立评测，并提供得分、成本、token、耗时和发布日期视图；页面抓取显示 `27 of 617 models`，这是当前页面显示数量，不应解释为 617 个不同模型版本均有完整可比数据。本站 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) 已详细记录 198 题、与 Main 的嵌套关系、固定版文件的结构和 hash，以及成绩可比性条件；这些是资料梳理，不等于本站独立评测或成绩数据库。AA 的 [方法论](https://artificialanalysis.ai/methodology/intelligence-benchmarking)可供核查，不能把厂商自报成绩冒充 AA 测得成绩。

AA 页面展示示例题，但 [GPQA 原作者 Hugging Face 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)对在线公开示例有明确限制。不能仅因其他网站展示示例就推断本站可以转载；双方是否具有不同许可或授权，本轮不知道。

产品判断：通用榜单、指标图和 Benchmark 介绍确实高度重叠；版本协议与来源证据、机器人仿真与实机的边界、科研复现与导航成功率区分是可供验证的切入点，但已有替代工具，价值与需求尚需用户访谈和使用数据，不能凭这些材料断言具有商业护城河。

## 同名站点的检索边界

另有 [PaperBench.net](https://www.paperbench.net/) 自称支持由智能体发现论文、维护 benchmark，并称贡献默认私有、公开需审核；它与 OpenAI 的 PaperBench 及 Pipeline Lab 扩展不是同一产品。2026-11-10 在未登录状态输入 GPQA 并回车，当前页面未显示搜索结果，同时提示登录查看贡献；该观察不能证明站点没有 GPQA 或没有成绩功能，也不能评价登录后功能和覆盖。
