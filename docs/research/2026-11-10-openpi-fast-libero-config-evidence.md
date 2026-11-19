# π0-FAST 在 LIBERO：成绩、训练配置与复现问题

核查时间：2026-11-10。根据官方历史文档、使用者 issue、两个待合并 PR 和开发者公开结果文件；未训练模型、运行仿真、审计完整日志或访谈用户。所有成绩均是仿真任务，不是真机能力。

## 一张模型成绩表会丢掉什么

[openpi 固定版本 7cf5f60 的 LIBERO README](https://github.com/Physical-Intelligence/openpi/blob/7cf5f609837e87179cbd28d48a915fc3447d8124/examples/libero/README.md)列出微调 30k 步的 π0-FAST 在 LIBERO-10 为 **60.2%**，四套件平均 **85.5%**；两者不是同一指标。官方同时写明该配置没有特别调参，也没有针对 LIBERO 优化 FAST tokenizer，结果主要是微调示例。

开发者在 [issue #1047](https://github.com/Physical-Intelligence/openpi/issues/1047) 和[消融仓库](https://github.com/Severus-Yang0/libero-delta-ablation)自报：从 `pi0_fast_base` 分别微调，在平均值/标准差归一化下，启用额外 delta 动作变换的 LIBERO-10 成绩为 **60.5 ± 1.0%**，关闭为 **84.7 ± 1.7%**；分位数归一化下分别为 **75.1 ± 1.5%** 和 **85.9 ± 0.6%**。作者称每种条件微调 30k 步、三个训练种子，每套 10 个任务、每任务评估 50 次；`±` 是三个训练种子的标准差，不是置信区间。

这四组是不同训练配置产生的权重，不是把官方已发布 checkpoint 的推理开关一改就得到 85%。[提议 PR #1048](https://github.com/Physical-Intelligence/openpi/pull/1048)新增独立配置，并说明保留原有配置供已发布权重使用；本次页面显示 PR 仍为 Open。作者同时发布实验脚本及权重入口，本次没有下载或独立验证权重和完整结果。

开发者公开的两份 `result.json` 提供更具体的可核对记录：训练目录为 `s42`、平均值/标准差条件下，额外变换[启用](https://raw.githubusercontent.com/Severus-Yang0/libero-delta-ablation/main/results/pi0_fast_libero_s42/libero_10/result.json)为 **59.6%**，[关闭](https://raw.githubusercontent.com/Severus-Yang0/libero-delta-ablation/main/results/pi0_fast_libero_no_delta_s42/libero_10/result.json)为 **85.6%**；两份文件都记录 500 次 episode、每任务 50 次和评测 `seed=7`，与训练目录里的 `s42` 是不同用途的随机种子。两文件都标记 `complete=true`，分别记下不同权重路径及相同源码提交和补丁 hash；这只证明所读文件这样记录，并非本站验证实际训练或逐次轨迹。作者另记录原发布权重的一个同设置结果 **59.4%**；不能以它一条覆盖或重写官方历史成绩。

## 已发布权重的另一类问题：推理配置

[issue #849](https://github.com/Physical-Intelligence/openpi/issues/849)中多位账号报告机械臂旋转或结果异常，但部分评论提及不同模型与训练方式，不能假设都由同一原因引起，也不把评论人数当成互相独立的客户。另一位贡献者提出：特定 `pi0_fast_libero` 已发布权重的归一化设置与较新代码默认值不匹配，并报告对固定合成输入做了两版本动作对照；其 [PR #971](https://github.com/Physical-Intelligence/openpi/pull/971)提出按配置恢复选项，当次仍显示 Open。该定位是贡献者的诊断和待合并方案，本次未独立复现，也不能认定全部模型、所有代码版本都存在同一问题。

两类问题不能混为一谈：消融研究比较重新训练后的不同配置；issue #849 的方案针对特定已发布权重的推理兼容性。对后来使用分位数归一化微调的权重，PR 作者也提醒应匹配其训练设置，不能无差别套用另一种归一化。

## 对项目及需求判断的意义

站内已有 [LIBERO](../../content/benchmarks/libero.json) 及变体资料。这个案例表明，若未来增加模型成绩，至少要能让读者追溯**具体套件、权重、训练配置、评测配置、种子与数据来源**；否则“π0-FAST 的 LIBERO 分数”可能将不同实验混成一条。此处的提问及后续工作说明有开发者遇到过复现问题，但解决入口已在 issue、PR、消融仓库和原始结果中公开；未证明这些人需要本站、会回访或付费，也未比较哪种呈现更有效。
