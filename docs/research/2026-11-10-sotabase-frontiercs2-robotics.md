# Sotabase、FrontierCS 2 与机器人相关研发任务

调查日期：2026-11-10。根据本站本地目录、第三方公开页面、原论文和固定版本任务说明核查；没有运行模型或仿真、下载完整评测包、核对模型轨迹、访谈读者或测量站点流量。来源数据和页面可能继续更新。

## 对项目方向的竞争证据

[Sotabase](https://sotabase.com/) 自称关注新评测、独立评测和评测作者访谈。本次可见[评测目录](https://sotabase.com/benchmarks)仅列 FrontierCS 2 一项；它的[详情页](https://sotabase.com/benchmarks/frontiercs-2)在同一页面提供测试任务说明、12 个智能体通过率、任务成本、按领域划分的结果和逐任务入口，还有[对评测作者的访谈](https://sotabase.com/interviews/frontiercs-2)。这里证明上述功能已出现，不代表其覆盖了整个评测市场，也没有验证长期维护或读者效果。

需要区分站点宣称和具体数据来源：虽然 About 介绍包含独立评测，FrontierCS 2 页明确写其结果来自 **FrontierCS 2 团队**、数据截至 2026-10-20，不能将这张表表述成 Sotabase 另一次独立复测。它的首页综合指数当前也只基于这一项、48 个任务，不是对所有模型和基准的总体能力结论。原[官方站](https://frontier-cs.org/)页面标示 2026-11-09 更新，日期晚于第三方快照；网站日期是页面更新标记，并不能证明每个旧模型分数都发生变化。本次没有把两者成绩逐行核对。

这与用户原先设想的“评测说明＋成绩”及进一步“逐题解释＋来源”有直接重叠；但访谈、细分任务和模型成本本身亦不证明该站有人持续使用或付费。本站有中文说明、样例及发布资料索引，目前没有完整结构化成绩库；读取时的本地 `content/benchmarks` 按文件名及内容检索未发现 FrontierCS 2 或其官网独立条目，不能因此断言相近的 FrontierCode、FrontierScience 等是同一评测。

## 两个机器人相关任务是什么

[FrontierCS 2 论文](https://arxiv.org/html/2610.29932)附录 A 将 Diffusion Policy 和 MuJoCo Playground 列为 48 项中的两项 Robotics 任务。它主要评价**代码智能体是否能改进研究代码**，不是直接把 LLM 当机械臂策略部署，两个任务也不是两个新的独立真机榜单。

1. [Diffusion Policy 任务](https://sotabase.com/benchmarks/frontiercs-2/tasks/diffusion-policy)要求修改动作采样器，以固定的已训练网络在仿真中推 T 形块，比较任务结果及运行时间。[固定提交任务说明](https://github.com/FrontierCS/FrontierCS-2/blob/c1e9c25688c216a73c25dbb269b9bb70de10077d/tasks/problems/Robotics/diffusion_policy_cpu/README.md)限定可修改采样函数及可选辅助文件；不表示 AI 重新训练整套机器人模型。
2. [MuJoCo Playground 任务](https://sotabase.com/benchmarks/frontiercs-2/tasks/mujoco-playground)要求生成四足 Go1 仿真训练方案，在不同测试上比较速度跟踪、转向、能耗、平稳程度及奖励。其页面特别称该任务没有移除源码，而以原训练方案为基准；这与站点“一般移除论文关键实现”的概括有例外。固定提交的[任务说明](https://github.com/FrontierCS/FrontierCS-2/blob/c1e9c25688c216a73c25dbb269b9bb70de10077d/tasks/problems/Robotics/mujoco_playground_cpu/README.md)限定文件范围并说明 GPU 环境。本次未核验全部评价器，不能推断现场四足机器人已进行测试。

## 为什么总分高仍没有通过

第三方 Diffusion Policy 页的快照中，原代码综合分为 13.4，GLM 5.3 的一次运行综合分为 59.8，却仍标为未解决。原[官方规则](https://frontier-cs.org/)解释：通过要求在**每项指标、每个隐藏工况**上达到规定门槛，单个综合均值更高不足以证明全部条件通过。页面列出耗时、奖励和成功率等聚合信息，但未依据聚合值判断具体是哪一个隐藏工况导致未通过，也不能把 59.8 解读成机器人成功率。

同理，MuJoCo 页 GPT-6 Astra 的综合分 50.6 高于参考代码 49.6，结果仍显示未通过；页面中每项展示的是跨测试平均，不能只看表格均值推导所有隐藏门槛是否达标。每个智能体在该快照中每任务一次、限时 5 小时，不能将这个结果扩写成模型所有运行都失败或所有机器人任务都无法完成。作者访谈指出重复运行的需要；论文和网站后来版本可能变化。

这为本站潜在阅读任务提供了一个具体问题：看到高分时，区分该分是智能体任务综合分、单项机器人仿真成功率，还是整个基准的通过率，并找到通过条件和任务示例。Sotabase 和官方页面已经作了不少解释，本站是否能提供更清晰的中文阅读仍须通过与它们的对照测试，不能只根据某个不直观的数字断言现有方案缺乏解释。

## 访谈证据的边界

此前已收录的[八名研究者访谈](https://arxiv.org/html/2605.28966v1)报告他们会参考同伴、实际试用及成本，部分人希望看到任务细分；其单校小样本及自报不代表全部开发者。它与 Sotabase 的站点作者或 FrontierCS 作者访谈不是对本站的用户测试，也没有证据表明这些访谈对象愿意使用或付费。

Sotabase 页面声明其使用的 FrontierCS 2 数据为 MIT，但不同源代码、论文、模型输出或图片可能有各自授权；本次只链接、不转载，未完成逐资产许可核验。当前结论是：存在新竞品与可解释的机器人相关任务，并非已证明产品机会、市场规模或评测数据准确。
