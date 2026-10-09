# 最后缺口官方事实核验（B组补充）

本文件只记录截至 2026-10-08 检查的官方公开来源事实，供后续逐项复核。没有改正式 benchmark 条目、样例、许可状态或目录，也不把本文件候选视作已采纳案例。原始响应使用公开 HTTP GET 读取；候选 JSON 保存了所核页面响应文本的 SHA-256、日期和定位。FrontierMath 数学题用符号与自有表述准确重述，未整段复制题目原文；同一公开题页的三条标题短引合计不超过25个英文词，每条不超过10词。

## EBR-bench

Epoch 的官方页面将 2026-09-22 列为 v4 methodology 更新日期，当前默认设置为单智能体并禁用一张卡；页面还说明每局覆盖游戏开头五天、最多21个可评分目标。2026-10-07官方更新报告了一个具体运行事件：GPT-6 Astra 在原版基准上取得100%，并利用一张绕过基础时间限制预期的卡；Epoch 说明之后会禁用该卡。该事件可作为特定版本下的公开运行案例事实，但没有逐局状态、任务prompt或目标明细，不能称为当前禁卡默认设置下的样例行。报告没有在检查到的正文中给出该卡名称。Epoch 页面说明其使用游戏内容用于研究与评论，且不分发或出售底层版权游戏材料；本候选不包含卡牌、规则或媒体。来源许可事实及范围仍由root判定。

来源：[EBR-bench官方方法与版本页面](https://epoch.ai/benchmarks/ebr-bench)（HTTP 200，SHA-256 `92569afa49a5d43e116f149735526ef2cb76ab41b30a7a56c9a54743185a665f`）；[2026-10-07官方更新](https://epoch.ai/publications/ebr-bench-update)（HTTP 200，SHA-256 `355aab245e0a6b2447efa403fb016276e50a8faae73051930224b5f095f6a99d`）。

## MedCode 与 Code Migration

Vals 的 MedCode 官方页面标注为 Proprietary，更新时间为2026-10-06。页面说明评测输入涉及脱敏住院文档及主/次 ICD-10-CM 编码，也提到2,755个诊断编码；文字未说明这是患者人数。实际公开HTML的 `data-has-examples=false`、`data-active-view=results`；没有单个患者记录、case ID、具体病历输入或对应答案编码。页面中的F32.A等代码类别/通过率说明是聚合图表，不是患者样例。

Vals 的 Code Migration 页面同样标注 Proprietary、更新于2026-10-06。页面给出CLI源仓库与目标语言迁移的汇总结构及隐藏测试汇总结果；公开HTML也是 `data-has-examples=false`、`data-active-view=results`，没有某一个源仓库、某个目标语言组合、任务ID或实际迁移指令。

两个页面声明并公开加载了相同的Astro客户端模块。按页面实际 `script src` 获取的40字节 `page.Vn21zqoU.js` 只导入共享模块并执行初始化；1,539字节 `hoisted.CoU7OQMV.js` 读取 `data-has-examples`，只有值为true才允许切换到examples视图，页面为false时保留results。检查到的这条已声明客户端路径没有患者记录或迁移任务的数据请求/载荷。源脚本哈希、响应状态和长度保存在候选JSON。此检查只描述这两个官方页面及其公开客户端路径，不推断其网站其他页面或未链接数据的状态。

来源：[MedCode官方页面](https://www.vals.ai/benchmarks/medcode)（HTTP 200，SHA-256 `766b6c5b569f7a117cb93d40364e19282af9d7abdcef110480d977c7e7de7861`）；[Code Migration官方页面](https://www.vals.ai/benchmarks/code-migration)（HTTP 200，SHA-256 `01b924a642017e6a6497e36bc4d19cd346fa1148364e37e1b11640c2012d2b6f`）。

## CursorBench 4.0

Cursor 官方 evals 页面实际公开显示CursorBench 4.0榜单的模型、Score、Cost、Tokens、Steps，以及2026-09-10列出的任务类别变化，没有逐任务prompt或task ID。Cursor官方博客明确说明其当时生产版本为CursorBench 3.1。Composer 2 Technical Report 的Appendix C.1 / Figure 12确实展示一项具体CursorBench任务，但该报告在结果段明确称评测结果为CursorBench-3；因此不把该具体任务移植为4.0案例。检查的4.0页面及该报告没有给出把该任务映射到v4的证据，也未在4.0页面找到任务数据许可证声明。

来源：[Cursor官方evals与版本changelog](https://prod.cursor.com/evals)（HTTP 200，SHA-256 `46df74872d0387bf4f87c248e116422e720072a650fe4bebe05c4e4bcca1a63a`）；[Cursor官方CursorBench博客](https://prod.cursor.com/blog/cursorbench)（HTTP 200，SHA-256 `cb30a27beb84d6e41ea5bbcdf6e44542a171c003150ad9bc791828ff89a09469`）；[Composer 2 Technical Report](https://cursor.com/resources/Composer2.pdf)（官方PDF公开解析，Appendix C.1 / Figure 12为任务定位，结果段明确标CursorBench-3；本轮未下载完整PDF）。

## FrontierMath 系列与 v2 子集

官方公共题页明确列出 Tier 1、Tier 2 和 Tier 4 标题，并分别给出题目和答案。本批选取完整短题和一条完整Tier 4题，便于逐条核对全部输入对象、参数、约束与最终目标：

- 系列父条目 `frontiermath`：Tier 2“ A recursive construction on large permutations”公开题。设 W 为由互异正整数构成的有限字；对非空 w=LmR，其中 m 为 w 的最大字母，定义 F(w)=F(L)F(R)m，且 F(ε)=ε。令 n=10¹²，σ 在 Sₙ 上均匀分布；X 是满足 (F(σ))⁻¹(i+1)<(F(σ))⁻¹(i) 的 i∈{1,…,n−1} 个数的期望。目标是 ⌊X⌋，页面答案为499999999972。页面没有给稳定problem ID，也没有把该标题映射到固定v1/v2数据行，因此只按系列公开Tier 2题陈述。
- `frontiermath-v2-tiers-1-3`：Tier 1“Counting nonzero solutions of homogeneous equations”公开题。在有限域𝔽_(5¹⁸)上，统计满足 x³y+y³z+z³x=0 的非零射影点(x:y:z)，按共同非零倍数视为同一点。页面答案为3814708984376。v2 Tiers 1-3 hub说明2026-06-12版本共295道基础题、10道Tiers 1-3公开题，并链接同一公共题页；它没有将该标题映射到稳定v2行号，所以这里只陈述题页中的Tier 1公开题及hub的分组级关联证据。
- `frontiermath-v2-tier-4`：Tier 4“An optimization problem in BMO space”公开题。定义 c 为在所有可积 f:[0,1]→ℝ 上的 ∫₀¹(f(t)³+|f(t)|)dt 上确界，约束为 ∫₀¹f(t)dt=−10、∫₀¹f(t)²dt=100+1/12，并且对每个子区间 J⊆[0,1]，平均平方偏差 (1/|J|)∫_J|f(t)−(1/|J|)∫_Jf(s)ds|²dt ≤1/12。目标为 c+1985/2；页面答案为 √3/36+(√3/6)e^(−20√3−1/6)。v2 Tier 4 hub说明43题扩展集中有2道公开题，并链接该公共题页；未将此标题猜成某个稳定v2行号。

两个v2 hub均记载2026-06-12修订、整套338题（Tiers 1-3共295、Tier 4共43）及12道公开题（前者10、后者2）。hub提供公共题页链接但未列出该页公开题对应的具体版本行ID；所以此处的版本关系仅到官方页面链接及tier级别，不宣称固定样例成员身份。Epoch“Use this data”页称Epoch数据按CC BY并注明作者后可用，同时明确题目和答案属于各自创建者、外部项目数据保留原许可证；因此没有仅凭通用数据许可为具体数学题作许可结论，待root按题目实际权利范围决定。

来源：[FrontierMath公开题页](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems)（HTTP 200，SHA-256 `01160b8b13b607cdeb05d36ee4b1bf3a46d73b2d99da90b4732e3660dee5aab5`）；[v2 Tiers 1-3 hub](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2)（HTTP 200，SHA-256 `5f270533d9bf7d5fdf1f614af6d19f06173c41fbe858adaad511a6ed9b8a9a01`）；[v2 Tier 4 hub](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)（HTTP 200，SHA-256 `429dae7f5f97bd43da63f2ab692a416d3e08d5ae566ab883d040856a56aa0539`）；[Epoch数据许可说明](https://epoch.ai/benchmarks/use-this-data)（HTTP 200，SHA-256 `830a5be287007e2de4449c07912a83b95e3a1a836a7b3128c2bdc64edbe13833`）。

本文件仅供root逐项判定是否适合作为本站案例。缺少具体任务的项目仍记录已查来源与待补字段；FrontierMath v2题名到固定成员的映射、数据权利范围和是否采纳均保持待核，不由研究记录代作结论。
