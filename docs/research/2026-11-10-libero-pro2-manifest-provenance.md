# LIBERO-Pro2.0：任务数量、训练演示与来源差异

核查日期：2026-11-10。本研究从本站已有条目出发，对照作者论文、项目 README、训练数据与固定版评测清单；未运行模型或仿真、下载 HDF5、复验物理执行，也未访谈用户。

## 对照本站已有条目

本站 [LIBERO-Pro2.0](../../content/benchmarks/libero-pro2.json)区分静态扰动、运行时干预、训练示范和留出测试，并展示一段 `libero_10/task_0/BASE` 训练预览及一个 `libero_spatial/task_0/S01` 测试配置；两者都没有被当作模型成绩。条目写“1,646 个有效任务与扰动组合”，这与[作者 GitHub README](https://github.com/LIBERO-Pro-Team/LIBERO-Pro2.0)当前表述一致，但与论文和评测资源清单存在差异，不能只依据某一处静默覆盖。

## 1,646、1,648 与 1,688 分别来自哪里

| 来源 | 数量与范围 | 边界 |
| --- | --- | --- |
| [论文正文 §3.2](https://arxiv.org/html/2610.24587) | 1,648 个经筛选扰动实例，训练 1,313、留出评测 335；另有 40 个基础任务。 | 论文的分类和资源清单不完全一致，尚未找到逐项对应关系。 |
| [作者 GitHub README](https://github.com/LIBERO-Pro-Team/LIBERO-Pro2.0) | 概览写 1,646 个有效任务—扰动组合。 | 与论文相差 2；未找到差异原因，不能断言哪个数字正确或判断具体模型成绩受影响。 |
| [评测资源卡](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Eval)和[固定版清单](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Eval/blob/d1933228f8be59f5d8fa1d8e2e251b463dfb64bc/manifests/task_manifest.json) | 1,688 个目录项 = 40 个 BASE + 863 个静态 + 785 个动态；扰动项也是 1,648。 | 清单的目录项数量不自动证明每项均被论文的六轮审核或正式榜单使用。 |

本次只读解析该固定版 `task_manifest.json` 和[划分清单](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Eval/blob/d1933228f8be59f5d8fa1d8e2e251b463dfb64bc/manifests/benchmark_split_v1.json)，按 `suite + base_task_id` 匹配：训练集 1,349 项 = 32 BASE + 691 静态 + 626 动态；测试集 339 项 = 8 BASE + 172 静态 + 159 动态。也就是说，清单中训练扰动 1,317、测试扰动 331，而论文写 1,313 和 335；两者总数恰好都是 1,648，但每侧差 4。**总数相同不能证明逐个条目相同，也不能用相减结果假定具体哪四项调整了归属。**没有逐项对照论文实验配置与结果，因此不判断哪份清单对应论文报告的运行。

评测资源说明服务中的 D20/D21 对应论文 D19/D20；它们的编号命名空间不同。站内案例 `S01` 是静态变体，不受这条 D 编号提醒直接影响；运行结果应保留原始编号及版本，不自动按名称合并。

## 40,470 条存储演示不等于同数独立采集

[当前训练数据卡](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train)写 32 个训练基础任务、1,349 个任务/变化实例、40,470 条存储示范，实际等于 1,349 × 30，包含 BASE。论文写 39,390 条，对应 1,313 × 30 条作者报告的训练扰动实例；两组实例范围和来源说明不同，不能把数值差简单解释为模型版本变化。

训练数据[固定版的作者审计](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train/blob/6c4c5524676815a88880a7025badd17fb724f7f4/manifests/source_final_audit.json)报告 106 个实例各将一个经验证的成功源轨迹复制为 30 条记录；其余 1,243 个实例各有 30 个源。按这一声明，来源计数为 1,243 × 30 + 106 = **37,396**，与 40,470 相差 3,074。作者旧版数据卡[固定提交](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train/commit/8d82e5bc7a6797b1972d2b586f2e9329fde7bdab)说明该计数只去除明确声明的复制，未做全库内容去重，部分来源缺少指纹；不能把 37,396 当作独立复验的全局唯一值。

可具体查到本站同一基础任务的另一个训练变体：[libero_10/task_0/D03 元数据](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train/blob/6c4c5524676815a88880a7025badd17fb724f7f4/data/libero_10/task_0/D03/metadata.json)标记 `single_success_fanout=true`、`successful_trajectories=30`、`unique_successful_trajectories=1`；[来源索引](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train/blob/6c4c5524676815a88880a7025badd17fb724f7f4/data/libero_10/task_0/D03/source_index.json)中的前几条记录有相同来源记录号和指纹、不同复制序号。本次仅读取元数据和索引，没有下载 HDF5 来验证各数组。此 D03 不是本站展示的 `BASE` 视频，不能将 D03 的复制情况套到 BASE。

本站展示的 [BASE 元数据](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train/blob/6c4c5524676815a88880a7025badd17fb724f7f4/data/libero_10/task_0/BASE/metadata.json)列 `generator=privileged_state_oracle`、30 条成功轨迹及尝试记录；所以这条示范来源可进一步说明为仿真中的特权状态 oracle，而不应自行称为真人遥操作。论文所述训练数据来自模型及人工演示，不能自动推断它与所查看的数据包是完全相同的一组，也不能仅凭差异认定论文不实。

## 用户问题与已有替代

随机按存储 episode 划训练和验证，可能把已声明的复制来源分到两侧；作者旧版资料已明确提醒避免这样做，并提供 `keep_without_declared_fanout`。正式 benchmark 划分本身按基础任务分组，训练和留出测试的同一基础任务变体不会交叉；**不能把自行随机拆包的风险说成官方已发生测试泄漏**。

[官方训练数据卡](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Train)已有 Viewer，相关行含 `keep_without_declared_fanout` 与 `fanout_copy_index`；[评测文档](https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro2.0-Eval/blob/main/docs/evaluation.md)已有划分、编号映射、训练与评测分离及运行准备说明。[中文 VLA 综述](https://tingdeliu.github.io/VLA-Survey/)也介绍该 benchmark 和论文数量。因此来源解释、中文介绍与筛选并非全无人做；本次没有核验所有工具交互，也没有发现直接针对这一具体数字差异的独立读者访谈。

对项目的可测价值是：让读者查明**本站展示的是哪一种运行、可从多少存储记录推断多少来源、哪些数字来自论文而哪些来自实际清单**。要证明该整理值得维护，还需要与上述原站、现有中文资料完成相同任务的读者对照；当前不能据此推算需求规模或付费意愿。
