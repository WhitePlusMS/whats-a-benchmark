# 国内模型发布页扩展台账

日期：2026-09-23。范围：智谱 AI / Z.ai、DeepSeek、Kimi / Moonshot AI、MiniMax、阶跃星辰 / StepFun、通义千问 / Qwen 的官方发布页、官方模型卡与技术报告。

## 执行规则

- 所有搜索、发现和来源核对由 GPT-6 Luna 子任务完成；主任务只审核、归并和实施。
- 模型厂商材料只证明“该发布资料报告了这个 benchmark”；非内部评测的定义必须来自 benchmark 发布方的一手页面、论文、仓库或数据卡。
- 名称相似不自动合并。Terminal-Bench 2.0、2.1、4.0 保持独立；IFBench 与 IFEval 保持独立并建立关系。
- 数据可访问不等于允许再分发。九项新增条目均未加入 `sampleSet`，页面提供官方入口、访问和许可边界。
- 厂商表里的 tools、harness、reasoning effort、上下文、trial、pass@k 和子集信息保留在发布说明或限制中，不改写成 benchmark 固有属性。

## 六家发布资料核查

| 厂商 | 采用的代表资料 | 日期口径 | 正式发布资料记录 |
| --- | --- | --- | --- |
| 智谱 AI / Z.ai | GLM-5.3-Flash 官方专题页 | 专题页 2026-09-23；GLM-V 仓库另写 2026-08-26，保留冲突 | `glm53-flash` |
| DeepSeek | DeepSeek-V4.1-Flash 官方更新日志 | 2026-09-10 | `deepseek-v41-flash` |
| Kimi / Moonshot AI | Kimi K3 官方 README 与技术报告 | 2026-07-27 | `kimi-k3` |
| MiniMax | MiniMax M3 官方博客与评测方法 | 2026-06-01 | `minimax-m3` |
| 阶跃星辰 / StepFun | Step 5 Preview 官方发布页 | 2026-09-20；开放权重日期仍是页面计划 | `step5-preview` |
| 通义千问 / Qwen | Qwen3.8 官方仓库与模型卡 | 2.4T-A95B 2026-08-12；27B 2026-08-14 | `qwen38` |

原始提取记录：

- `docs/research/2026-09-23-china-releases-zhipu-deepseek.md`
- `docs/research/2026-09-23-china-releases-kimi-minimax.md`
- `docs/research/2026-09-23-china-releases-stepfun-qwen.md`

## 新增 benchmark

| ID | 结论 | 关键边界 |
| --- | --- | --- |
| `babyvision` | PASS_WITH_LIMITATIONS | 388 项、22 子类、4 类；BabyVision-Gen 与 Mini 分开；仓库只写 research purposes，不转载题图。 |
| `deep-swe-v1-1` | PASS_WITH_LIMITATIONS | v1.1 为 113 项长时程工程任务；上游仓库许可与防训练污染限制需逐项遵守。 |
| `ifbench` | PASS_WITH_LIMITATIONS | 58 个 OOD 约束；83 个 verifier key 包含经典 IFEval，不能误写为 83 项 IFBench 测试。 |
| `nl2repo-bench` | PASS_WITH_LIMITATIONS | 104 项、九类 Python 仓库生成；官方仓库未确认许可证。 |
| `paperbench` | PASS_WITH_LIMITATIONS | 20 篇 ICML 2024 论文、8,316 个 rubric 节点；PaperBench 与 Code-Dev 变体分开。 |
| `skillsbench` | PASS_WITH_LIMITATIONS | 采用固定 v1.1：87 项、8 个领域；早期论文快照数字不套用。 |
| `terminal-bench-2-1` | PASS_WITH_LIMITATIONS | 2.0 的独立修订版；官网称修订 28 项，仓库称 26 项，保留冲突。 |
| `toolathlon-verified` | PASS_WITH_LIMITATIONS | Verified final release 日期明确；论文 108 项不是最终版精确总数，轨迹受控且禁止公开镜像。 |
| `vending-bench-2` | PARTIAL | 官方页足以确认长期经营任务和余额指标；固定数据包、可执行仓库和再分发许可未确认。 |

九项均有同 ID 的 `docs/research/benchmarks/<id>.md` 与隔离候选 `artifacts/candidates/domestic-release-expansion/<id>.json`。正式内容位于 `content/benchmarks/<id>.json`。

## 数量变化

- benchmark：75 → 84。
- 模型发布资料：11 → 17。
- 站内真实样例：仍为 13 个 benchmark、22 条；没有用模型生成或许可不明的数据补数量。

## 验收状态

- [x] 九份候选通过严格 `entrySchema`。
- [x] 九项无现有 ID、名称或版本冲突；2.1 和 IFBench 的关系已显式建模。
- [x] 正式内容校验通过：84 项、22 条样例、17 份发布资料。
- [x] 严格 TypeScript 检查通过。
- [x] 12 项自动测试通过，新增名称唯一匹配与 Terminal-Bench 版本消歧回归。
- [x] 生产构建与静态产物检查通过：90 个路由页面、89 个静态页面及 GitHub Pages 404。
- [x] 真实浏览器桌面与手机验收通过：17 张发布卡、九个新增详情页均可访问，375px 实际内容宽度无整页横向溢出，控制台无警告或错误。
- [x] 静态压缩包已重建并抽查：3,142,760 字节、253 个条目，包含 84 个详情页、13 份样例 JSON、首页、404 与 `.nojekyll`。
