# Meta-World：任务协议、评测问题与本站数据版本

核查日期：2026-11-09。依据本站工作树、官方文档、维护者回复、公开 issue 与少量远程元数据字节；未运行仿真或复现报告的问题。

## 本站现有条目和不同协议

[本站 Meta-World](../../content/benchmarks/meta-world.json)已有 MT50、ML10 的区分，展示一个 LeRobot MT50 训练演示和一条本站用官方脚本专家生成的 ML10 杠杆单次记录。后者记录 Meta-World 3.1.1、`lever-pull-v3`、seed 42 和 91 步后 `success=1`；它不是学习策略的成功率，也不是官方批量榜单成绩。

[官方协议说明](https://metaworld.farama.org/benchmark/benchmark_descriptions/)区分多任务 MT50 的 50 个已定义训练任务，与元学习 ML10 的 10 个训练任务和 5 个保留测试任务。根据[官方评测说明](https://metaworld.farama.org/evaluation/evaluation/)，MT 测试使用训练见过的目标位置，一回合任意时刻成功即可计为成功；元学习则包含针对测试目标的适应过程及测试回合。不要把训练演示、单次脚本专家轨迹、MT50 以及 ML10 的测试结果当成同一指标。实际运行参数、实现版本及汇总方式仍需回查。

[Meta-World+ 论文](https://arxiv.org/html/2505.11289)分别比较 V1 与 V2 **奖励函数**，而 `lever-pull-v3` 中的 v3 是环境名称版本，两种版本号指代不同对象。作者在其具体算法、实现和实验条件下报告不同奖励会影响训练结果；这不是说所有机器人评测都由奖励函数决定，也不能只凭一个数字推断根因。

## 评测工具问题：与本站使用版本的关系

[Meta-World #606](https://github.com/Farama-Foundation/Metaworld/issues/606) 的使用者报告：在其 Meta-World 3.1.1 和代码 `c0dafaf` 的特定批量元学习评估条件下，按任务名收集先结束的回合可能偏向提前成功的环境，因而和文档要求的每目标固定回合数不同。作者给了玩具环境复现，并提出[修复 PR #607](https://github.com/Farama-Foundation/Metaworld/pull/607)；读取时二者仍为开放状态，本次未独立运行或核实 PR 测试。

本站 ML10 单次演示也标为 3.1.1、引用 `c0dafaf`，但它记录的是一个环境中脚本专家的一次运行，**没有证据表明用了 issue 所讨论的批量评测函数**。因此不能把该报告直接说成本站 91 步、该任务成功记录有误，也不能推断其他已发表的模型成绩受到影响；若将来增加批量 ML 评测，再单独核实实现、运行配置和修复状态。

## 本站固定的 MT50 转换数据版本

[LeRobot #4409](https://github.com/huggingface/lerobot/issues/4409) 的报告者称，旧数据修订 `a59f742d218c903328164257ecf180f9b18018a1` 中 `push-back-v3` 与 `push-v3` 共用一个自然语言任务标签；报告者区分了任务 ID、标签与轨迹，并未声称轨迹缺失。维护者指出已由数据提交 [`edc045076b35461d3ae65c05e3f2a892237b05b6`](https://huggingface.co/datasets/lerobot/metaworld_mt50/commit/edc045076b35461d3ae65c05e3f2a892237b05b6)修复，随后关闭问题。

本站引用固定修订 `b46a1c185a2368660650a82ac5a5083a56722f48`。本轮通过只读 HTTP 分别取得三个修订中的两个小型元数据文件，计算 SHA-256：

| 修订 | `meta/tasks.parquet` SHA-256 | `meta/info.json` 的 `total_tasks` |
| --- | --- | ---: |
| 旧报告修订 `a59f742…` | `dc19dbb16dcfd32d405e7277bf64b927337bcb39b5a5eeadb751109e5d40d0bb` | 49 |
| 修复提交 `edc0450…` | `0ad158f5b5692f5edd9eb1bd1849ac52490539684ea5f435d0022bb8e08cf569` | 50 |
| 本站固定修订 `b46a1c…` | `0ad158f5b5692f5edd9eb1bd1849ac52490539684ea5f435d0022bb8e08cf569` | 50 |

本站和修复提交的 `meta/info.json` 字节也相同，SHA-256 均为 `75bb576147cf85f68aef5c16f14b20cabb0b85828f501a7fe2bd45f6a2f46be5`。**结论只覆盖这两个元数据文件**：相同任务表不证明两个提交全部轨迹、每个 episode 标签或本站渲染媒体相同；未重新解析或校验全部 Parquet。本站已选用的演示是 task_id 0，而 issue 涉及 37 和 38，不能把那项历史问题直接套到本站样例。

## 现有资料与需求意义

Farama 官方已有任务、可观测性、奖励和[评估方法](https://metaworld.farama.org/evaluation/evaluation/)说明；[LeRobot 文档](https://huggingface.co/docs/lerobot/metaworld)已有训练及评估入口；[司南 Meta-World 页面](https://robo.sinanlab.com/benchmarks)也聚合公开模型成绩。官方 issue 和修复已经提供可追溯的用户问题与解决过程，本站的潜在价值需要验证是否能帮助读者更快定位**具体数据版本、协议与已解决状态**，而非把维护者提供的材料视为本站独有。没有读者测试或付费证据。
