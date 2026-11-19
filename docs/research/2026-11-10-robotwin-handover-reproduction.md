# RoboTwin 双臂传递：同任务样例、成功率与复现需求

核查时间：2026-11-10。基于本站工作树、公开任务代码、第三方单次诊断、论文、开发者讨论与已有工具；未运行策略、仿真或真机，也未向参与者访谈。用户报告及第三方结果不是本站独立复现。

## 同一个任务，四种不同的数字

本站 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)已有 Handover Block 的任务描述，以及引用第三方的单次诊断与视频。任务描述是左臂抓取、交给右臂并放到目标垫上；视频对应某次第三方仿真运行，不是总体模型成绩。[官方任务页](https://robotwin-platform.github.io/doc/tasks/handover_block.html)

| 来源 | 数字 | 实际含义及边界 |
| --- | --- | --- |
| [官方任务页](https://robotwin-platform.github.io/doc/tasks/handover_block.html) | Aloha-AgileX 数据生成成功率 83% | 官方列举的数据生成环节成功率；不是 LingBot-VA 或本站样例的模型测试成功率。具体采样分母本次未找到。 |
| [LingBot-VA 论文表 S1](https://arxiv.org/html/2601.21998) | Handover Block：Easy 99%、Hard 78% | 作者报告的模型在两个场景条件下的仿真成绩；论文还列出其他模型和 50 个任务。不能直接把 Easy 与 Hard 解释成不同模型，也不能代入本站那一次运行。 |
| [复现讨论 #27](https://github.com/Robbyant/lingbot-va/issues/27) | 一位参与者称该任务由 0.18 升至 0.9 | 该参与者称调整 SAPIEN 与 RoboTwin 版本后复现效果改善，并提到注意力模式重要；具体执行次数、种子和完整逐项变动未充分披露，不能把差异归因于某个单独因素，不能与论文结果当成相同实验。 |
| [本站引用的单次诊断](https://huggingface.co/datasets/VincentNi/robotwin-sft-8tasks-sapien-eval/blob/1d983da91efdcd5fba132dd29234be2b18947d91/handover_block/robotwin_handover_block_123500000/robotwin_handover_block_123500000_g000_s42_diag.json) | `success=true` | 一条第三方记录，`seed=123500000`、121 次动作；不是 100% 成功率，也未证明与上述模型、版本及测试种子相同。文件名中的 `s42` 与 JSON 的 `seed` 不能未经说明当作同一个字段。 |

2026-11-10 只读取得上述固定修订的 JSON，并对照 [RoboTwin 提交 `2eeec322` 的 `handover_block.py`](https://github.com/RoboTwin-Platform/RoboTwin/blob/2eeec322/envs/handover_block.py)：该版本 `check_success` 检查积木功能点与目标功能点的 x、y 误差分别小于 0.03，z 误差小于 0.01，且右夹爪打开。按第三方诊断中两个功能点坐标自行相减，绝对误差约为 **0.019761、0.016345、0.000804**，均小于上述数值；诊断的右夹爪开放字段为字符串 `"True"`。这和该代码版本的末态条件在数值上相符，但未证明诊断生成时使用的正是此提交、复测成功或全过程已经实现预期交接。特别是末态检查并不显式检查左臂到右臂的交接历史，不能从末态字段独立证明过程。

## 谁遇到什么问题，后续做了什么

[LingBot-VA #27](https://github.com/Robbyant/lingbot-va/issues/27)的原提问者在 8 GPU 上复训后报告总成功率低于论文，同时称使用官方已后训练权重可以得到接近报告的表现；这是该用户对其运行的判断，不保证整条评测链条无问题。项目贡献者建议梯度累积并提供训练配置、损失曲线。原提问者之后报告：8 GPU、累积 8、50,000 训练步下，在 `demo_clean` 每任务 50 次的设置得到 91.2%；另一个 15,000 步检查点报告 81.1%。这些是用户自报的不同检查点结果，细节及同种子配对未独立核查。

同一讨论中的另一位参与者报告官方权重在一些任务上分数偏低，随后提到 Handover Block 从 0.18 到 0.9，同时改用 `sapien==3.0.0b1` 和 RoboTwin `2eeec322`，还称 attention 模式重要；讨论不足以量化哪项改动单独造成多少提升。该 issue 在 2026-04-02 关闭并置顶；关闭后另有使用者在五月报告，即使使用指定 RoboTwin 提交和 SAPIEN 版本，一些其他任务仍有较大差距。该后续报告未独立复现，也不能证明所有人的同一问题都未解决。

另一位参与者在讨论中称相同 GPU 数和梯度累积设置下训练较长时间仍表现低，询问损失曲线和学习率；随后称回退其他修改、检查权重加载及后端后，早期损失曲线改善，并报告一次 `place_object_basket` 8/11 的小样本测试。这不是最终全套结果，也不能证明某一个操作是唯一原因。

这些讨论展示了真实的复现排查需求，但用户讨论的是怎样**训练和运行**，不是明确要求使用 benchmark 资料网站；多个评论者也不能自动视作本站用户或付费用户。

## 现有方案与可比性

- [LingBot-VA 固定版 README](https://github.com/Robbyant/lingbot-va/blob/7c6ffa9bfc4b83582cafc860fab4c82cc7deeeeb/README.md)已经给出 RoboTwin `2eeec322`、`sapien==3.0.0b1` 和 client/server 运行说明。其多 GPU 运行把 50 个任务通过重复填充为 56 个再分组；聚合结果时应检查去重，不能把执行分组数视作 56 个不同任务。这里仅按 README 描述，未运行聚合脚本或验证实际结果是否重复计数。
- [RoboTwin 榜单规则](https://robotwin-platform.github.io/leaderboard.html)说明标准训练数据为 50 任务各 50 条 clean 演示，clean 与 randomized 各每任务 100 次；#27 中每任务 50 次的复现不是相同试验数量。当前榜单同时容纳 co-train 与单任务 SFT，默认平均两个条件；单条 Easy 成绩不能当默认总榜均分。
- 固定版 README 将公开 `lingbot-va-posttrain-robotwin` 标成 shared backbone；论文描述 MoT 架构。#27 中的模型版本对应关系是评论者提出的问题，本次未确认该论文表 S1 的精确 checkpoint 哈希，不能把 shared 版本结果直接当论文模型的逐项复测。
- 已有 [RoboSeed](https://github.com/PrimitiveX/RoboSeed/blob/db28b03fcbeba2bf9a41b5ab6e6b29f72df47145/README.md)提供模型来源、训练配方、每任务次数、资源和逐项成绩；其表中的 **LingBot-VLA 2.0** 不应自动当作本例 **LingBot-VA** 的同一模型或 checkpoint。这是跨评测成绩整理已有方案，尚未验证所有字段和统计。

可尝试的读者测试：给读者官方任务页、论文表、这个 issue 和一张来源对照卡，要求分别判断 83%、99%、0.18→0.9 与单次成功各自指什么，并指出哪些不能比较。与现有官方文档和 RoboSeed 比较找到答案的耗时、错误和维护成本；目前并无读者实验，不能声称本站已解决该需求。
