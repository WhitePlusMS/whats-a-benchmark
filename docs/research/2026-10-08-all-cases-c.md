# Benchmark 案例取证记录（C2）

日期：2026-10-08。范围：按生产 JSON 过滤出的 30 项中的首批 10 项。此记录只整理公开来源事实、原始字段和许可边界，不作最终采纳结论，不修改生产代码。

候选结构化记录：`artifacts/candidates/2026-10-08-all-cases-c2.json`。每个 benchmarkId 对应一条，`rawRecord` 只收录公开来源中核验到的字段；文章示例、网页 DOM 或构成成员均通过 `caseScope` 标出，避免称为原始数据行。

本批 ID：alignbench、arena、arena-hard-v2、eq-bench-4、ifbench、aa-intelligence-index、aa-multilingual-index、arena-vision、babyvision、chartography。

许可判断逐项区分代码、题目文本、数据和媒体。公开示例、研究用途或 no_train 均不自动意味着可再发布/在线展示；多模态条目需要配套图片。图片只记录官方页面链接，没有下载，也没有宣称可展示许可。

关键边界：Arena Vision 的官方公开博客另列一个 Captioning 示例“Please describe the photo in English.”并链接512×339 PNG；这是独立公站示例，不是 gated Chat/Battle 数据行。图片未镜像，底层媒体许可未知；该博客例子不改变 gated 数据协议。Arena-Hard v2 行来自固定提交 JSONL，但仓库 Apache-2.0 不证明用户提示数据授权；IFBench 数据卡标 ODC-BY-1.0，代码 Apache-2.0；AA Intelligence Index 是组合评测，其 SciCode validation 行不能冒称 AA 的 test 项；AA Multilingual 的样例来自 CohereLabs/Global-MMLU-Lite zh/test，不能换成 MMMLU；Chartography 数据卡把原始在线图表排除在 CC BY-4.0 数据授权之外。

尚存缺口均按条目写入 JSON 的 `blockedFacts`。本批记录可以作为核验线索，许可与媒体展示仍待逐条判断。

## 第二批：10 项取证

本批 ID：charxiv、mathvista、mmmu、mmmu-pro、omnidocbench、roboflow-vision-evals、screenspot-pro、video-mme、arena-creative-writing、arena-webdev。

CharXiv、MathVista、MMMU、MMMU-Pro 的题目字段来自 Hugging Face 公共 rows API。CharXiv 明确区分 CC BY-SA 题目与原作者图表版权；MathVista 的图片在 866 MB 的 images.zip 中，未下载或解包，单文件路径请求返回 404；MMMU/MMMU-Pro 图片源使用带时效签名 URL，许可虽标 Apache-2.0，底层题图来源仍需核验。

OmniDocBench 对官方 42,208,096-byte JSON 仅做 0–349,999 字节 Range 请求并解析首个对象，定位到 page 0 与其 443,653-byte 图像。数据卡声明仅供研究、非商业，未见独立数据 license；GitHub Apache-2.0 是代码许可。

ScreenSpot-Pro 使用官方论文 Appendix D Figure 5 第一项，原文 instruction 为 Blur Dissolve，附图和 bbox 均来自论文；HF 标注 MIT、arXiv 论文标注 CC BY 4.0，但软件截图底层权利尚未确认。

Video-MME 保留为外部说明缺口，不采纳或重构题目：现有题干/选项仅来自公开讲座 PDF 转录，未定位官方原始题库 row。作者 README 原文限定 academic research only、禁止商业用途、视频版权归视频所有者，并规定未经 prior approval 不得对 Video-MME 全部或部分 distribute、publish、copy、disseminate 或 modify。该范围包含 publish，但没有单独定义在线展示，也没有明文 no-training 条款；本站据“whole or in part”广义限制不转载案例题文或视频。

Roboflow Vision Evals 官网公开六类任务及整体评测说明，但没找到可定位的一条图片、提示和 ground truth 样本，按 missing 记录。Arena Creative Writing 与 WebDev Arena 采用官方博客直接公开的真实提示示例，均未定位原始 battle ID 或单条提示授权。

逐项的原始字段、媒体链接、许可范围与 blockedFacts 见 C2 JSON。

## 第三批：最后 10 项

本批按生产目录 ID 覆盖 creative-writing-v3、design-arena、longform-writing、nc-bench、openvibeeval、rapidata-svg、short-story、svgbench、tonebench、tubelab。与前两批合计覆盖 30 项。

| ID | 官方原例或缺口 | 权利与范围记录 |
|---|---|---|
| creative-writing-v3 | v3 官方 JSON 对象 `1`，Historical Fiction / “Gladiator”，保留原 `writing_prompt` 及 `<SEED>` 占位标记。 | 未核实提示数据许可；README 的代码/复现信息不替代题目文本授权。 |
| design-arena | 方法页说明用户实时输入提示、四模型盲投；检查总榜和 Image 子榜后仍未找到可定位的固定 prompt/输出，按 missing。 | 未发现具体任务数据许可证；未以输入框占位文本代替案例。 |
| longform-writing | 官方 `data/prompt1.txt` 是含 `{writing_prompt}` 与 `{n_chapters}` 的模板；没找到与具体结果匹配的公开 seed prompt，按 missing。 | README 的 MIT 记录指仓库；不据此延伸到实际题目或模型作品。 |
| nc-bench | HF public rows API 的 basic row 0；原始 `id`、`task`、四条 `chat_prompt` 消息均保留。最后一条 user message 是续写目标，没有标准答案字段。 | HF dataset API 的数据卡许可为 Apache-2.0；IBM GitHub 代码许可单独记录。 |
| openvibeeval | 官网页面 Digital Garden prompt ID 与公开 preview；官方方法页声明 prompt 公开。 | prompt、生成结果、截图未找到统一再发布许可证；可见性不推导作品权利。 |
| rapidata-svg | HF train row 0：真实任务 “Make an SVG of a horse riding an astronaut”，包含两张 768×768 PNG、两份 SVG 字段与模型比较。 | 数据卡明确 CC BY 4.0；保留固定 dataset SHA。图片缓存 URL 是带签名的临时地址，可从同一 rows API 刷新。 |
| short-story | 官方 `prompt_wc_0.txt` 的模板与固定十元素 brief 实例；原样保留未解析的 `{min_count}` / `{max_count}`。 | 在检查的 README/data 文档中未找到 prompt/data 独立许可。 |
| svgbench | 官方 Best SVGs 与 prompt detail API 关联 `lion`、prompt ID `prompt_daf3f932ceaa` 和 generation `gen_528217605706`；另记录官方 SVG media endpoint。 | 未找到 prompt/生成 SVG 的显式许可；榜单统计是实时快照。 |
| tonebench | 只记录官方 Script 7 的任务名和公开概要（个人技术流程/agentic workflow case study）；没有拼成逐字 prompt。 | 官网称约 11,000-token 输入并隐藏非公开 reference；具体任务、reference 和模型作品许可仍未知。 |
| tubelab | 官方任务卡公开科学纪录片题目 “The Company That Put Poison In Everyone's Blood” 与 PFOA/DuPont/Teflon 摘要节选；卡片有省略号，故不是完整 brief。 | 未确认题目、原视频或生成脚本的再发布许可。 |

案例取证记录只引用官方公开内容；缺少题目时明确保留 missing/partial 状态。多模态项均指向真实媒体：Rapidata SVG 两张图片和 SVGBench 的 SVG 输出；OpenVibeEval 案例另有真实生成截图。完整原始字段、locator、许可来源和受限事实见统一 C2 JSON；本批没有改动生产文件。
## 追加核验：TapTap Maker 与 BrowseComp-ZH

本次仅复核官方公开界面、客户端所取数据和论文/README，不访问受限题库或尝试解密。

| ID | 官方来源与本次可见内容 | 记录状态与缺失项 |
|---|---|---|
| taptap-maker | [官方方法页](https://maker.taptap.cn/leaderboard/methodology.html)区分公开题与 held-out 题，并说明公开题按类别用于难度榜；类别明细尚未发布，held-out 的题面、答案和轨迹不公开。当前[版本索引](https://maker.taptap.cn/leaderboard/data/editions/index.json)列出版本日期、数据集版本和模型数量；榜单客户端 `assets/js/board.js` 经 `common.js` 加载 `data/latest.json` 与 `data/editions/{edition}.json`。当前 2026-09-10 快照包含 edition 指纹和模型汇总成绩，没有题面、任务 ID 或逐题记录字段。 | 未找到可定位的公开具体任务实例、题目清单或任务级公开 manifest；现有版本索引/成绩快照不能作为案例。抽查若干可能的 data 路径返回 HTTP 403，不能据此推定隐藏文件的实际内容或其完整访问策略。保持 missing。 |
| browsecomp-zh | 作者[论文 arXiv:2504.19314](https://arxiv.org/pdf/2504.19314v2#page=2)第 2 页 Figure 1 的第一条例子为 Art 题：绘画形式起源于元代、盛行于清末，传说由古代知名画家酒后兴起创作，2010–2015 年列入某省级非遗名录，绘制者需精通多种画法并善书多种字体；问该形式名称。作者公布答案为“锦灰堆”。 | 已按 root 决定登记为编辑性中文概述，原题仅留必要短引；题目是论文主动公开的样例，并非从加密 XLSX 解密。README 将数据集限定为学术研究用途；MIT 声明不扩展为题库整体再发布许可，数据复用状态仍为 restricted。 |

来源核验日期：2026-10-08。以上是来源字段与可见范围记录，不构成数据许可或最终采纳结论。
