# 具身评测：成功率、重复次数与不确定性

## LIBERO-MAX：同名成绩与案例不自动可比

本站 [LIBERO-MAX](../../content/benchmarks/libero-max.json) 的摩卡壶案例记录相机变化的配置，并无模型实际执行结果。[官方项目](https://liberomax.github.io/)公布 8,000 对 Base/Dynamic 案例上的 14 个策略结果及按事件类型的分析；每对保持任务、初始状态、种子与已执行前缀一致。这是评测发布方已有的成绩和分析，不是本站或 Artificial Analysis 的独家功能。

[CaPtain 论文](https://arxiv.org/html/2610.40799)报告使用其中 80 个 Lite 案例，在 Dynamic 条件下 CaPtain-4B 的 host success 为 61.2%，strict success 为 50.0%。前者检查结束状态是否满足环境目标，后者还要求智能体调用 `finish()`；两者是同一报告中的不同指标，不能只记一个“LIBERO-MAX 成功率”。该论文使用自己的运行框架和资源上限；论文写 80 个 Lite 案例，不能据此当作官方完整 8,000 对或 Lite 800 对结果。这里未运行、未复算成绩，也未核实这些案例与本站摩卡壶案例是否重合。

[Embodied First Exam 的 LIBERO-MAX 适配](https://github.com/mll-lab-nu/embodied-first-exam/blob/main/tasks/libero-max/README.md)说明选了 64 个案例、两个访问模式，共 128 个任务；其编码智能体适配只使用 Dynamic，不提供 Base/Dynamic 配对统计。它公布选择过程及评测接口，说明面向研究者整理与运行此评测也已有第三方方案；不能把 128 个任务理解为 128 对原始配对案例或直接与官方榜排名。

调查时间：2026-11-09。以下区分论文报告、网站公开方法和本次演示计算；没有运行机器人、复算原始逐次数据或调查项目读者。

## 一个真实表格：总试验数不等于每格样本数

[RESONATE 论文](https://arxiv.org/html/2611.02937)报告 8 种控制配置、8 种场景、每组合 5 次，共 320 次真机试验；参与者还提供主观评分。在 S5 Crossing 3 中，表格分别列 DWA 成功率 100%、MPPI 80%。按论文所述每格 5 次，可对应 5/5 与 4/5；不能把整个研究的 320 当作这两格各自的样本数。实验环境使用外部跟踪设备，人与不同回合并非必然满足独立同分布；本次未核对原始回放或计算这两个策略差异的显著性。

该案例属于[本轮社交导航调查](2026-11-09-social-navigation-crosswalk.md)关联方向，不是本地 [Habitat 3.0](../../content/benchmarks/habitat-3.json) 或 [R2R-CE](../../content/benchmarks/r2r-vlnce.json) 的成绩。现场限定条件和其他指标仍须看原论文。

## 小样本为什么要解释：独立的假设演示

下面是**虚构的独立二项试验示例**，用 Python 标准库正态分位数按 95% Wilson score interval 计算；不是任何机器人论文的原始区间：

| 成功次数 / 试验次数 | 表面成功率 | 95% Wilson 区间（约） |
| --- | --- | --- |
| 5/5 | 100% | 56.55%–100% |
| 8/10 | 80% | 49.02%–94.33% |
| 80/100 | 80% | 71.12%–86.66% |

此演示假定试验对应相同概率且相互独立，区间反映这种抽样模型的不确定性；不含跨任务、机器人、环境、提示、训练随机种子或系统版本变化，也不构成部署安全保证。**不能据两个分别计算的区间重叠与否，就断言两模型显著不同或等价**；同题配对比较需要逐次结果和适当统计方法。百分比是多个任务/seed 的非等权均值、或总次数不清楚时，也不能简单乘以总次数反推成功数。

[机器人评估实践论文](https://arxiv.org/html/2409.09491)强调明确初始条件、成功判据、失败模式和统计分析；[PhAIL 论文](https://arxiv.org/html/2605.29710)讨论有限样本、完成时间分布、bootstrap 区间与同条件比较。后者的 HRT 不等于二项成功率，其方法和统计结论按该实验研究理解。

## 现有竞品及不同区间定义

- [Bot Landscape 方法](https://botlandscape.com/methodology.html#result-intervals)已描述由成功率和次数推算结果区间，并按相同 benchmark、划分、条件和指标分组。它采用均匀先验 Beta 后验，在全成功/全失败边界使用其声明的一侧区间，例如 10/10 为 76.2%–100%。这是其贝叶斯规则，**不是**上表的 Wilson 频率学区间；条件平均、四舍五入和独立性等仍会影响输入与解释。本次未运行对方计算或确认每条数据准确。
- [PhAIL 网站](https://phail.ai/)展示真实机器人任务和结果；其论文对论文所研究的 HRT 给出 bootstrap 区间，而页面不同基准各有自己的任务和分数。本次未将论文某一指标自动套到网站全部 ± 展示。
- [LLM Benchmarks](https://llmbenchmarks.io/en/)首页显示来源、日期和比较规则，提供中文切换入口；[社区回复](https://www.reddit.com/r/LocalLLaMA/comments/1wz6mga/)描述其某个成绩详情展示由网站依据题数推算的 Wilson 区间，同时明确不代表重复种子的不确定性。本次未完成该站详情交互验收或独立核验回复中的特定分数。

这些方案表明“成绩来源 + 试验数 + 不确定性”已经有具体实现，不能视作本站独有。站点所选区间或阈值也不自动是通用标准。

### 已有工具的新版本：LeRobot v0.7.0

[LeRobot v0.7.0 发布说明](https://github.com/huggingface/lerobot/releases/tag/v0.7.0)列出评测功能：在任务、套件和总体层级报告成功次数与 95% Wilson 区间。[官方示例](https://huggingface.co/blog/lerobot/lerobot-release-v070)中 9/10 是 90%，Wilson 区间约 59.6%–98.2%。这说明开发者自己运行评测时，框架已有样本数与区间输出；本次未安装该版本或验收实际运行，区间仍依赖适当的试验假设，不能覆盖跨任务或硬件的全部不确定性。

LeRobot [添加策略的文档](https://huggingface.co/docs/lerobot/en/bring_your_own_policies)也要求附可复现评测和已发布检查点，并对其贡献场景建议仿真每套件至少 50 次、仅真机方案至少 10 次。这是该项目对提交材料的要求，不是“10 次真机测试已经足以证明可靠”的通用标准。文档中的示例结果是模板数字，不应当作真实模型成绩。

[一位开发者](https://www.reddit.com/r/humanoidrobotics/comments/1w2c6g9/any_sim_benchmark_that_actually_gives_you_a/)询问能否信任仿真 benchmark 来决定是否值得占用真机测试时间；回复者分享自己结合仿真、实机反馈与校准的实践，并未对其提到的 RoboColiseum 给出受控对照结论。[SIMPLER 作者论文](https://arxiv.org/html/2405.05941)用配对仿真及实机测试研究相对排名相关性，同时说明其主要关注刚体操作等限制；仿真排名相关并不等于把某个模拟成功率转换为任意实机成功概率。此类问题可指导阅读任务设计，不证明提问者需要本站。

## 使用者表达的需求与尚待验证的机会

已有台账 #14 的[机器人课程作者](https://www.reddit.com/r/ROS/comments/1xgmw5t/)问需要多少真机尝试才能信任成功率；他现有记录只是离线动作误差，不证明机器人实际完成任务。同一人和问题不重复计数。[另一位语言模型使用者](https://www.reddit.com/r/LocalLLaMA/comments/1wz6mga/)询问小幅分差是否可能属于评测波动，并希望看到样本数、区间或多次运行；他举的统计推算与评论者建议均未由本站验证为某个模型的实际显著性结论。

可用候选卡让读者找出上述 RESONATE 表格中每一格的试验次数、总试验次数以及实验限定，并与原论文、现有站点比较时间和正确率；但尚无读者测试，因此不知道这种解释能否改善体验或带来回访。

## 2026-11-10：LIBERO 配对比较中的初始状态身份

本站 [LIBERO](../../content/benchmarks/libero.json) 的指标说明已提醒比较时区分任务组、初始状态和随机种子；站内展示的 π0.5 记录是一条第三方仿真尝试，带 task、trial、seed 和成功状态，不是多策略配对实验。不能仅凭单条样例断言其受以下问题影响。

[LeRobot #4152](https://github.com/huggingface/lerobot/issues/4152) 的报告者提出：在其使用的 LIBERO-Plus、LeRobot 0.6.1、Gymnasium 1.3.0 和特定同步向量环境条件下，提前结束的环境可能发生额外重置，导致后续回合实际加载的初始状态序号依赖之前的结束时机；相同 task、seed、episode 标号和 batch size 也未必形成同初始状态配对。报告者给出的两环境最小演示是通过人为强制一次成功来触发，而不是测得真实策略成绩；其另一次多策略结果的初始状态是事后重建，作者也称仅作动机而非核心证明。本次未安装环境或复现。

可以直接核对的代码边界：报告指定的 [LeRobot 固定提交](https://github.com/huggingface/lerobot/blob/1bb9933215dcb7ffeeae6d3746cda3f73f5a59e2/src/lerobot/envs/libero.py) 中，`reset()` 按当前序号载入初始状态后增加计数，`step()` 在 `terminated` 时调用 `reset()`。这两处源码支持代码路径存在；是否出现第二次自动重置及具体影响，仍取决于向量环境、调用流程与结束时机，不能只凭这两行代码推广到所有运行。

[独立方法论文](https://arxiv.org/html/2611.00896v1)报告 LeRobot 0.6.1、有限任务和模拟控制器下的受控实验：混合结束时机的同步配置出现初始状态序号不一致，而其测试的同步同结束时机对照未发现记录的序号／指纹不一致。异步配置存在不同 batch size 下映射差异，但作者未隔离原因；论文中的显著性数值是合成示例，**没有完成真实 VLA 策略的共享向量环境验证**，也不主张现有排行榜普遍无效。论文提及检查器和缓存文件，但写明公开 artifact URL 当时尚不可用；本次无法核验其工具实际可获得性或独立运行。

[修复 PR #4224](https://github.com/huggingface/lerobot/pull/4224)提出按评估回合分配状态并增加回归测试；2026-11-10 查看仍为 Open。作者报告早期版本测试结果，并称 11 月修订后的新 CI 尚待工作流批准；不能称该修复已经合并、发布或由本站验证。

现有工具方面，[robostats](https://pypi.org/project/robostats/)自述可按任务和场景键记录逐回合结果、报告重叠及适用的统计比较；它需要可用的逐回合身份信息。工具按记录的键配对，不自动证明实际仿真初态确实相同；前述论文也将执行环境的身份检查视为补充。本次未安装、核验该工具或重新计算任何成绩。

对产品定位而言，这构成一个明确的**研究者可比性问题**：读者需要知道结果对应什么初态、运行环境和配对方式。但官方 issue、修复提案、论文及统计工具已经提供相关资料，尚未证明本站提供整理能节省时间或得到用户使用，也不应将这个案例说成单条 benchmark 分数有误。

### 用本站样例的真实来源检查逐回合数据

2026-11-10，在内存中读取与本站 π0.5 单次样例相同固定提交的三份 LIBERO 标准四套件日志：[π0.5](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/results/openpi-libero/official-full/episodes.jsonl)、[OpenVLA](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/results/runs/openvla/libero/openvla-libero-full-v1/episodes.jsonl)、[ACT](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/results/runs/act/libero/act-libero-full-v1/episodes.jsonl)。分别均有 2,000 条 JSON 记录和 2,000 个不重复的 `(suite, task_id, trial)` 组合；三组组合的交集均为 2,000。以 `success` 布尔字段计数，分别为 1,942、1,383、498 次，和作者[汇总](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/README.md)一致。这是对作者文件的计数，不是本次重跑模型或对其评分程序的验证。

记录中的 `seed`：π0.5 全为 7、OpenVLA 全为 0、ACT 全为 7；三份记录顶层及嵌套字段中均未发现包含 `init` 或 `state` 的字段名。**这不证明实际初态不同，也不证明初态无法从其他源码或资产恢复**；它说明仅靠这三份日志中的同名 task/trial 和 seed 字段，不能直接验明逐对初态一致。也不能把上面的 LeRobot #4152 自动归到这组日志：作者[π0.5 报告](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/docs/openpi-libero-EVAL_REPORT.md)称使用 openpi，并披露当时工作区有未提交改动，不等同该 issue 的运行环境。

同一作者已经发布[中文跨策略报告](https://github.com/ctegdf/pi05-libero-eval/blob/3a02da0c37ce82022fd5f58e92203d571d2383cd/analysis-report/cross_policy_report_zh.md)，列出 LIBERO、Plus、Pro 分数和扰动细分，并提醒策略的 checkpoint 数、动作重规划及语言输入不同；Pro 部分扰动未覆盖。它是与“成绩＋条件＋中文解释”直接重叠的现有资料，不代表所有场景与本站重复。作者对差异原因和无基础设施错误的判断尚未由本次复现，不能当作已排除所有流程差异；本次也未对三策略做配对显著性检验。

补充核对 [robostats 0.2.0 的 PyPI 包](https://pypi.org/project/robostats/0.2.0/)：只在内存读取 wheel 内容、未安装或执行。`io.py` 说明场景身份由调用方指定的字段组合，`recording.py` 接受调用方传入的 `scenario_id`；`presets.py` 注册 RoboTwin 与 RoboDojo 两个预设。工具能保存和对照传入的身份，**不能替用户补出源数据没有提供、且未从其他材料核实的身份**。PyPI 所列 GitHub 仓库和录制文档链接在本次读取返回 404，不据此推断项目永久不可用；包文件本身可获取，功能和统计正确性未运行验证。

复核文件哈希：π0.5 JSONL SHA-256 `b620518fa9992501c18e4536d321f943b33beeb21982dd64f0004a28fbe74e2f`；OpenVLA `34e596ad290590c1a211764be6d95d225268117527a0befa7181578af35095f9`；ACT `2fdceb078be98d244ae503287da1d47a576eca19a9ff651fdd8b36bd93d1dff1`；读取的 robostats wheel 为 `6cc6f67f7938779b1becf7275f2c49c0f0489b6392503d005b71b970713a5f7e`。
# 2026-11-10：图像方向和环境几何状态

[专项核查](2026-11-10-libero-camera-orientation-fixture-drift.md)补充固定版 OpenVLA/openpi 画面转换、开发者复现提问、小规模方向实验和 OpenVLA 环境复用报告；后者的修复 PR 未合并、仿真验证未勾选。不能推定本站单次录像或所有 LIBERO 成绩受影响。

