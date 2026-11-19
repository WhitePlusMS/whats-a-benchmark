# 未标具身条目全文检索与样例数据异常

核查时间：2026-11-09。检查范围为当前工作区本地 JSON、生成样例文件及查看器源码，不代表线上部署状态，也没有运行浏览器交互或修改产品数据。

## 未标具身条目的补充检索

当前 `content/benchmarks` 中有 318 条 `published`，其中 268 条没有 `embodied` 字段。本次递归扫描这 268 条的字符串字段，包括 `sampleSet.samples[].raw`、任务合同、数据说明、限制等，以中英文机器人、机械臂、无人机、驾驶、抓取等词查找。为避免来源链接和通用引文淹没有效命中，**没有扫描** `sourceUrls`、`sources`、`url`、`source`、`license`、`reusePolicy`、`brandIds`、时间字段和 `researchNotes`；因此本次不是所有字段或所有隐含语义的完整审计。关键词搜索也不一定能找出没有显式名称的控制任务，不能推断 268 条中的其余项目全部与具身无关。

命中示例经检查：

- [EmbodiedX](../../content/benchmarks/embodiedx.json) 已在既有盘点中登记：是具身模型运行性能评测，不应因未标 `embodied` 就排除。没有在本轮改分类。
- [FACTS Parametric](../../content/benchmarks/facts-parametric.json)的命中来自样例附带的论文后续正文；其评测目标是无工具事实问答，不是机器人控制。该异常详见下文。
- [MRCR](../../content/benchmarks/mrcr.json)、[MRCR v2](../../content/benchmarks/mrcr-v2.json)的命中来自长文本中的话题或虚构内容，任务是长上下文信息检索，不因文中提及机器人或无人机而成为实体机器人评测。
- APEX-Agents、GAIA、LiveCodeBench Pro 的相关中文命中为“抓取”网页或数据，而不是抓取物体。
- 此次搜索只发现本站字段中出现相关词的记录；此前从官方任务页补查出的 [FrontierSWE v2 的 TORCS 视觉驾驶控制子任务](2026-11-09-untagged-embodied-task-review.md)不在本轮关键词结果中，是关键词覆盖不完整的反例。它属于软件智能体编写仿真控制程序，不能当真实机器人实测。

## 新发现：两个样例字段与其说明不一致

后续只读复核：本地源 JSON 的 FACTS 四条 `raw` 长度仍为 43,661、43,873、43,445、43,233 字符；CyberBench 的 OpenSC 样例仍为 1,662,226 字符，字符串未命中 `OpenSC` 或 `opensc`。这是源文件当次状态，不代表线上状态；未进一步重新下载官方页面、核定许可或修改数据。

进一步对照官方来源与查看器后，确认如下具体边界；本轮仍未修改样例或在浏览器运行：

- [FACTS 论文 HTML 的 Table 5](https://arxiv.org/html/2512.10791)连续给出四个公开例题及答案，随后进入 `4.1.2 Data Processing`。例如本地 triphosgene 样例 `raw` 在对应表行之后继续包含该章节、后续内容和参考文献；其说明却称保留短表行。四条 `raw` 的起始位置各不相同，但均延伸到论文末尾，因此不能作为各自独立短节选。论文网页显示的文章许可不自动证明底层完整评测题库或其他素材可以再分发。
- [Vals 的 Patch Examples](https://www.vals.ai/benchmarks/cyber)将 libxml2 与 `oss-fuzz:416295951` / `opensc` 写在相邻列表项。本站 OpenSC 样例 `raw` 却从更早的评分说明开始，包含大量页面结构，最后停在前一个 libxml2 列表项；该字段本身没有到达所声明的 OpenSC 条目。官网公开描述可供确认案例存在，但本轮未核定其转载授权。
- 本地 [SampleViewer.vue](../../src/components/SampleViewer.vue)的原始数据模式对字符串使用文本插值输出到 `pre`，并依据 `excerpt` 显示“节选”说明；源数据在当前路径下不会被代码自动截成目标行。此为源码行为，不证明线上部署、浏览器性能或可执行 HTML 安全问题。

### FACTS Parametric 的 4 条样例

[源 JSON](../../content/benchmarks/facts-parametric.json)的四条样例 `raw` 分别约 **43,233–43,873 个字符**。每条从所选论文表格行开始，却继续包含论文后续章节、结论和参考文献；四条尾部大量重复。样例解释称仅保留“短表行”，与实际 `raw` 内容不符。官方 [FACTS 论文 Table 5](https://arxiv.org/html/2512.10791)能够单独定位四条公开问题；此前字段包含的大段后续正文不属于四条问题本身。

运行现有内容生成后，`.generated/public/samples/facts-parametric.json` 为 **185,010 字节**，同样包含四条大段正文。`SampleViewer.vue` 的“原始数据”模式通过 Vue 文本插值把 `current.raw` 显示在 `<pre>` 中；代码没有对该文本裁剪。这里只核验代码路径和本地生成文件，没有验证线上页面、浏览器卡顿或许可法律结论。

### CyberBench Patch 的 OpenSC 样例

[源 JSON](../../content/benchmarks/cyberbench-patch-v1-1.json)中 `public-case-cyberbench-patch-v1-1-opensc` 的 `raw` 有 **1,662,226 个字符**，包含大量 HTML/结构化页面内容，而该样例说明称仅保留公开案例描述。其正文中没有 `OpenSC` 或 `opensc` 字符串；任务编号 `416295951` 出现在页面数据结构中，不能因此断言它是清晰的目标案例正文。[官方 CyberBench 页面](https://www.vals.ai/benchmarks/cyber)公开说明了该 OpenSC 案例，可作为后续逐项核对依据；当前抓取网页可能变化。

生成文件 `.generated/public/samples/cyberbench-patch-v1-1.json` 为 **1,665,640 字节**，保留了该超长 `raw`。查看器用文本插值展示而非直接执行 HTML；本轮未进行浏览器性能或安全测试，不推断 XSS 或线上影响。

## 长记录不都属于错误

本次同时查看样例 raw 大小，MRCR 的几个结构化记录包含几十万至百万量级字符；它本来是长上下文检索，不能只因为长就删减或判错。CyberBench 与 FACTS 的问题依据是**所称节选/对应案例和实际字段不符**，而不是单纯大小。其他条目尚未逐条审计；本次没有验证全部样例的原文、来源或许可。

## 后续核验方向

优先人工核对这两条的样例字段与各自官方来源，决定是否将 `raw` 改为恰当且确有许可依据的目标片段并同步生成结果；对长上下文类保留真实任务性质。修改前应检查原始案例可展示范围及既有样例/生成验证，不推断整套数据可转载。本轮只记录发现，不修改评测内容、服务或代码。
