# 模型发布成绩：Hugging Face Community Evals 与 Evaluation Cards

同题补充：[Auto-BenchmarkCard 名称筛查与 HumanEval、AlignBench、GPQA 对照](2026-11-10-auto-benchmarkcard-competition.md)核对 68 个名称命中及计分字段的具体限制；不把名称命中当协议相同或用户需求验证。

调查时间：2026-11-09。依据公开文档、页面、一次只读 API 和公开讨论；未提交 PR、未运行模型或核查完整平台数据。下列能力和数字是特定页面及时间快照，不代表本站已实现或商业需求已验证。

## 与项目原想法的直接重叠

[Hugging Face Community Evals](https://huggingface.co/blog/community-evals) 将已注册的 benchmark 数据集与模型仓库中的成绩联系起来。依据[官方结果文档](https://huggingface.co/docs/hub/en/eval-results)，结果可出现在模型页并进入相应数据集榜单；公开 PR 中的社区成绩在 PR 开放时也能显示，不必先合并。记录可带数据集修订、来源、备注、日期和验证信息，但很多字段是可选的；有来源链接不保证原始表格可比或已独立复跑。

官方文档对状态的区分很关键：`community` 说明来自未合并的开放 PR；`verified` 对应有效的 verifyToken、使用 HF Jobs 和 inspect-ai 运行的可审计结果。**不能把 community 当已合并，也不能把任意 verified 理解为各来源的所有主张都正确或不同协议自动可比。**模型和 benchmark 管理方还可按平台规则关闭争议 PR 或隐藏结果。

[EvalEval 与 Hugging Face 的互通说明](https://huggingface.co/blog/eee-community-evals)称 Every Eval Ever（EEE）保留结构化结果，提供跨链到来源记录的转换工具，并说明转换器对缺模型、成绩冲突等作标记。博客中的转换器当时支持 GPQA、MMLU-Pro、HLE 和 GSM8K 四项；这是该工具的指定范围，不能推广为 Community Evals 只支持四项。博客所示字段与实际每条记录的完整性需分别检查。

[Evaluation Cards](https://evalcards.evalevalai.com/) 项目页展示模型、评测及结果浏览，并计算来源、完整性、可复现性和可比性信号；其 2026-11-03 快照自报 340,532 条模型—benchmark—指标结果和 3,467 个 single benchmarks，数字是平台自己的口径，未核验去重或单项准确性，不能与本站 JSON 数量直接比较。其[说明文章](https://huggingface.co/blog/evaleval/evaluation-cards-launch)还介绍面向研究者和摘要读者的不同视图；本次未逐项体验、审计所有卡片或验证其统计方法。

这两者与“模型发布资料 + benchmark + 成绩 + 来源和条件”的设想有直接重叠。评测卡、中文解释、原文链接都不是自动形成的独有优势；具体语种覆盖、样例深度、结果质量及读者可用性仍需同题比较。

## 真实单点：同一个模型页的两个成绩

对 [Qwen/Qwen3.8-2.4T-A95B 模型卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)，只读请求模型信息接口并展开 `evalResults`，本次得到 9 条结果，包含：

1. [Terminal-Bench 2.1 的 PR #38](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/discussions/38/files)将 `86.6` 关联到该仓库，备注明确它是 `Qwen3.8-Max` 产品层报告的成绩、可能不等同单独的开放 checkpoint，并记录 Claude Code、avg@10、5 小时与 token 设置。接口返回 `pullRequest: 38`、`verified: false`；[PR 页面](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/discussions/38)显示 ready to merge。**该成绩已经被接口返回，但不能因此说已合并或经 HF 验证。**
2. 同一接口的 GPQA Diamond 为 `92.6`，返回 `pullRequest: 6`、`verified: false`；[PR #6](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/discussions/6/files)将模型卡作为来源，但 GPQA 记录没有相同的产品层备注。而[原始模型卡表格](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)把 92.6 放在 `Qwen3.8-Max` 列下。模型网页本次也在评价区展示 92.6；这不足以证明纯开放 checkpoint 独立运行得到该分数。

两项是不同 benchmark、不同 PR 和不同备注，不能把 86.6 与 92.6 互相比强弱。GPQA 记录的日期由 API 返回，但 PR YAML 未写日期；官方文档说省略时默认为 git 提交时间，因此不能把这个值直接当真实评测运行时间。PR #6 页面本次还显示 HLE 条目的任务 ID 元数据错误，**该错误针对 HLE，不能据此说 GPQA 数值无效**。网页与 API 为当次快照，状态可能改变。

这补充了[此前 Qwen 成绩归属记录](2026-11-09-release-score-attribution-case.md)：当时只确认 #38 提案未合并；本次进一步确认未合并成绩已进入只读 API，并核对 GPQA 模型卡列名与提案字段。它说明追溯的实际必要性，也说明既有平台已在解决这类问题；未测试不同用户能否从现有界面看懂。

## 使用者公开问题

- [Community Evals 发布讨论](https://www.reddit.com/r/LocalLLaMA/comments/1qxk5jn/)中，一位评论者希望并排比较多个模型在多个 benchmark 上的表现，并问 API；发布者回复提供榜单和模型结果接口，另一评论者也提出并排比较。发布者自称 HF 员工，属于平台发布说明；两位评论者的身份、独立性和实际使用行为未知。这是历史时点的功能建议，不代表当前产品仍无比较功能或本站已有用户需求。
- [量化模型评测提问](https://www.reddit.com/r/LocalLLaMA/comments/1w7j1il/)中，发帖者自述单张 3090 上评测量化模型耗时，希望找到较快且覆盖不同能力的测试或他人结果。评论提到小样本测试与工具，具体耗时、其 SWE-bench 运行及建议有效性均未独立验证；这可能属于本地执行与预算问题，不自动转化成资料站需求。

## 对下一步的意义

如果继续验证原方向，读者题目应要求找到**原始表列中的实际模型、是否为社区 PR、是否独立运行、关键配置和日期依据**，再同样使用模型卡、HF 结果界面、Evaluation Cards 和本站候选页面比较。当前没有完成测试，也未确认 Evaluation Cards 包含此特定 Qwen 记录；先以能否节省查找时间、减少归属错误及维护成本验证，再决定是否建设成绩库。
