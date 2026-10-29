# 剩余无站内案例的 benchmark 清单

核验日期：2026-10-19（Asia/Shanghai）。目录基线为 `d14a139d232256dd7e9d3443988f2b7e33e1998e`，起始盘点为 215 项、185 项有站内记录、573 条展示记录、30 项没有独立 `sampleSet`。本轮确认 JobBench 官方项目来源链并补入两条公开任务后，当前为 **215 项，其中 186 项有站内案例记录，共 575 条展示记录，29 项没有独立 `sampleSet`**。展示记录包括明确标注的节录、公开训练例或部分输入，不代表全部都是可独立重跑的完整计分任务。

29 项中有 **7 项指数或评测体系**，应沿组成项查看案例，不与单项题集缺口混计。其余 **22 项**按本轮第一方证据分为：内部/专有、所核官方资料未提供当前版本原题 9 项；需登录并接受数据访问条件 2 项；公开但本站遵循披露请求或需转载批准 6 项；本次未找到或访问待核 5 项。这里的分类不是直接复制 `sampleAccess.status` 字面值，也不是对未来公开状态的保证。

## 一、内部或专有：所核官方资料没有当前版本原题（9 项）

“未给出原题”限定为本轮实际读取的官方文章、论文、数据入口；只有发布方明确说暂不发布时才记为明确不发布。仅写内部、专有或拿不到文件，不能证明发布方从未公开过任何示例。

| 目录条目 | 本轮核实的公开范围与补充条件 |
| --- | --- |
| Microsoft MAI Held-Out Code | [微软官方文章](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/)与[13 页报告](https://microsoft.ai/pdf/Frontier-Pre-training-at-Microsoft-AI.pdf?v=2)披露内部代码留出评测、来源于 MAI 自有代码库及 BPB 方法；未给可归属任务文本或记录下载。训练诊断图不是留出案例。需官方公开该评测记录或明确示例。 |
| Microsoft MAI Held-Out QA | 同一微软报告披露委托供应商构建并去污染的内部 QA 留出集；未给本项原题、记录或文件。不能用其他 QA 数据集补位。 |
| Microsoft MAI Held-Out STEM | 同一微软报告披露内部 STEM 留出评测的来源与方法；未给本项具体输入。不能由成绩图推造题目。 |
| Microsoft MAI Held-Out Math | 同一微软报告披露内部数学留出评测的来源与方法；未给本项具体输入。需本项可核实原文。 |
| Code Migration（Vals） | [官方页](https://www.vals.ai/benchmarks/code-migration)标为 Proprietary；公开迁移任务族、方法、模型/目标语言的聚合成绩，未给源仓库标识、逐题指令或任务包。Amazon MigrationBench 不能当作本项。 |
| MedCode（Vals） | [官方页](https://www.vals.ai/benchmarks/medcode)标为 Proprietary；公开脱敏住院记录的编码方法和汇总表现，未给患者级文档、逐例编码或病例 viewer。不能把错误类型图当病例。 |
| CursorBench 4.0 | [当前官方页](https://cursor.com/cursorbench)有 4.0 成绩与 2026-09-10 任务更新；[Composer 2 报告](https://cursor.com/resources/Composer2.pdf)确有脱敏案例，但结果明确对应 CursorBench-3。尚无证据把这些旧版节录归到 4.0；需要 4.0 的任务或明确跨版本对应关系。 |
| Mystery Game Puzzles | [Epoch 官方方法](https://epoch.ai/benchmarks/mystery-game-puzzles)明确表示，为保留游戏身份暂不公开 prompt、示例局面和模型轨迹。这项是明确不发布，不能借用 Chess Puzzles 或猜测游戏补题。 |
| OpenAI 前端偏好评测 | [GPT-5 开发者发布页](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering)报告内部成对偏好比较成绩，未公开本项的成对输入/输出和评审记录。页面精选生成作品没有被归为该评测任务，不能代替。 |

## 二、需登录并接受访问条件（2 项）

| 目录条目 | 实际入口、已取得内容与缺口 |
| --- | --- |
| LABBench2 | [官方 HF 数据卡](https://huggingface.co/datasets/EdisonScientific/labbench2)要求登录并同意分享联系信息后获取文件；[官方 harness](https://github.com/EdisonScientific/labbench2)公开。公开卡能核对 1,912 项任务及字段；2026-10-08 修订记录有真实 `tableqa2` ID `ac4dee87-fa10-40bb-a393-4d985779e63f`，但没有该题正文、输入或答案值，不能计作案例。未接受条款或申请访问。 |
| OSWorld 2.1 | [官方 HF 任务库](https://huggingface.co/datasets/xlangai/osworld_v2_tasks)对任务文件设置访问条件；[2.1 release](https://github.com/xlang-ai/OSWorld-V2/releases)要求代码、任务、资产与 VM 对齐。官网可见轨迹标为 2.0，不能据此认定属于 2.1。需取得目标版本任务及适用展示条件；本轮未接受条款或申请。 |

上述“受控”不等于已经证明必须人工审批；当前能确认的是登录、接受条件及联系信息要求。取得数据后仍需核对题目、附件和在线展示条件。

## 三、已有公开数据或示例，本站没有转载（6 项）

| 目录条目 | 公开情况与本站处理 |
| --- | --- |
| GPQA | [作者 GitHub 下载说明](https://github.com/idavidrein/gpqa#dataset-download)公开 ZIP 和解压密码，无需申请；[HF 卡](https://huggingface.co/datasets/Idavidrein/gpqa)是另一个受控入口，并明确请求不要在线以文字或图片展示数据集样例。本站保留下载入口、真实字段和结构，不放原题。 |
| GPQA Diamond | 同一个作者 ZIP 内有 Diamond CSV，198 行、78 列，已在固定修订验证；同样遵循作者不在线展示题目的请求。不是官方没有数据，也不应笼统归入“需要申请”。 |
| HealthBench | [官方发布页](https://openai.com/index/healthbench/)公开评测和数据入口，Footnotes 明确请求不要在线披露题目文字或图片。本站据此不转载原题。 |
| HealthBench Hard | 属于同一公开 HealthBench 发布范围及披露请求；没有站内原题不表示没有公开数据。 |
| HealthBench Professional | [官方发布页](https://openai.com/index/making-chatgpt-better-for-clinicians/)链接公开数据，脚注明确请求不要在线披露数据集案例；[论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)第 8 节另列数据包与字段。本站保留入口与结构说明。 |
| Video-MME | [官方 Dataset Examples](https://github.com/MME-Benchmarks/Video-MME#-dataset-examples)确有可见案例；紧接的 Dataset 条款要求转载任何部分前先获批准，限学术用途。本站补直达官方案例链接，未镜像视频、截帧、字幕或问答。 |

前五项是本站遵循作者的明确披露请求，不把它自动描述成相同法律性质的全面禁用条款；Video-MME 是官方明确的转载前批准要求。也不以 canary、禁止训练或受控测试答案推导出所有题干都不能展示。

### 本轮实际补充的 GPQA 结构

作者 GitHub 固定修订：`56686c06f5e19865c153de0fdb11be3890014df7`。[README](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/README.md#dataset-download)和[数据包](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/dataset.zip)均实际取得，仅静态读取 ZIP/CSV，没有运行评测代码。数据包为 2,348,038 字节，SHA-256 为 `461ae7329f15a3e35f8184d2dac24b990f34fdf12f366ca4062d8e6638cd08dc`。

| 包内文件 | 数据行数（不含表头） | 列数 | CSV SHA-256 |
| --- | ---: | ---: | --- |
| `dataset/gpqa_main.csv` | 448 | 78 | `acdeeac8f622267f2cd727d7d474202ea08dec80f7d3c3593b3ef8644f19b8e3` |
| `dataset/gpqa_diamond.csv` | 198 | 78 | `41d1213cd7a4998605a26c2798500652572007161b3a92817ba46b35befcd305` |
| `dataset/gpqa_extended.csv` | 546 | 78 | `0926ee24949d02ed6748eb75a2611546c34479e30ddc42efd01d6f1681aaa48a` |
| `dataset/gpqa_experts.csv` | 60 | 11 | `ed1c6864ddfe4c8aaf67b665d9901d36ec4fa8c09f08c5c4e5509865bc41a672` |

主集、Diamond 和 Extended 不是互斥划分，不能相加为总题量。以上只补正式条目的数据获取状态、实际列名、结构和来源哈希，**没有新增案例或发布题目值**。GitHub 固定文件核验与先前仅观察 HF HEAD 是两件事，没有将后者冒称为已核过 HF 文件。

## 四、本次未找到或访问受阻（5 项）

| 目录条目 | 本轮已核范围与仍缺证据 |
| --- | --- |
| FocusBench | [Meta 模型卡](https://research.meta.ai/static/muse-wonder-model-card)、[研究博客](https://research.meta.ai/blog/muse-wonder)及发布文披露内部个人助理评测定义；未取得可归属该评测的题文、完整输入或稳定任务 ID。能力演示未标为该评测任务，不能补位。 |
| MemoryBench（Meta） | 同一 Meta 卡定义的是内部长对话回忆评测；本次未取到可归属记录。[THUIR MemoryBench](https://huggingface.co/datasets/THUIR/MemoryBench)公开项目定义和来源不同，不能因同名替换。 |
| VBT（Verifiable Browsing Task） | Meta 模型卡给浏览信息验证任务的方法和工具说明，未给本项可归属题文或稳定 ID；通用浏览演示不计作本项案例。 |
| TapTap Maker Benchmark | [方法页](https://maker.taptap.cn/leaderboard/methodology.html)、[edition index](https://maker.taptap.cn/leaderboard/data/editions/index.json)及版本快照提供成绩、成本、速度、类别与版本指纹；本次未取到 public tasks 的实际题文/输入包。held-out 题面/答案/轨迹明确不发布，但不能由此把 public tasks 也说成从未公开。 |
| Design Arena | [现有官方 tournament 入口](https://www.designarena.ai/tournaments/33d366af-ea0b-4220-8cb1-c275096a452e)在本轮浏览器复查也返回 403；about、leaderboard 等直接请求同样受阻。旧记录所称 API 正文未找到可验证存档。只记录访问与来源缺口，不能写成官方没公开；同名偏好数据集未证明是同一平台 tournament。 |

## 本轮补入：JobBench 两条公开真实任务

初次检查只读取 Meta PDF 可提取正文，遗漏了名称上的超链接，曾将 JobBench 记为“内部/具体题目未找到”。续核已提取 [Meta 模型卡](https://research.meta.ai/static/muse-wonder-model-card)第 5 页的链接注释：JobBench 名称直接链接 [JobBench 官方主页](https://job-bench.github.io/)，主页和[官方评测仓库](https://github.com/Job-Bench/job-bench-eval)又链接同一公开 HF 题集及[作者论文](https://arxiv.org/abs/2605.26329)。这建立了直接项目来源联系，因此本轮撤销笼统的“Meta 私有自建题集”描述。Meta 卡仍没有说明其实际运行的数据 revision、split 或 harness 版本，这部分继续保留未知。

公开 HF 仓库 `JobBench/job-bench` 固定修订为 `d43a66575635da0d3f6cb9a20976dc1a60f3ffc9`，无需接受 gated 条款即可读取。其[固定数据卡](https://huggingface.co/datasets/JobBench/job-bench/blob/d43a66575635da0d3f6cb9a20976dc1a60f3ffc9/README.md)声明 MIT。所选任务为作者任务文字、rubric 与数据行，不包含第三方附件本体；根 LICENSE URL 本轮未找到独立正文，不由数据卡声明推定所有外部输入素材同许可。数据卡原字节另存 `content/assets/licenses/jobbench-data-card.txt`。

从该修订的 [tasks.parquet](https://huggingface.co/datasets/JobBench/job-bench/resolve/d43a66575635da0d3f6cb9a20976dc1a60f3ffc9/tasks.parquet)实际读取 65 行、9 列；文件 545,449 字节，SHA-256 为 `985f5581f665e73bd4a3e21441219e5ebf306ed99a457c8f66880b71ede05f78`，按稳定 ID 提取以下两条完整数据行，而非从未固定的 rows API 冒称 revision。

| 新增记录 | 原始内容、简析与边界 |
| --- | --- |
| `data_entry_keyers__task1` | [订单核对任务原文](https://huggingface.co/datasets/JobBench/job-bench/resolve/d43a66575635da0d3f6cb9a20976dc1a60f3ffc9/dataset/data_entry_keyers/task1/task_folder/TASK_INSTRUCTIONS.txt)：需要按扫描原单、CRM、ERP优先级核对销售订单并提交差异日志、总表、报告和检查单。保留全部 9 个来源字段、12 条原始 rubric、15 份输入附件的原路径/URL；prompt 为 1,903 字节，与固定任务文件逐字节相同。 |
| `purchasing_agents_except_wholesale_retail_and_farm_products__task3` | [采购审查任务原文](https://huggingface.co/datasets/JobBench/job-bench/resolve/d43a66575635da0d3f6cb9a20976dc1a60f3ffc9/dataset/purchasing_agents_except_wholesale_retail_and_farm_products/task3/task_folder/TASK_INSTRUCTIONS.txt)：预算调整后联合核查报价、合规、安装运费和供应商历史，产出审查CSV、比价表、评分卡及建议。保留全部 9 个字段、11 条原始 rubric、9 份输入附件路径/URL；prompt 为 2,933 字节、2,929 Unicode 字符，与固定任务文件逐字节相同。 |

`rubric_json` 保持原字符串，`task_card` 保持原 Markdown；数据行自带的 `main` / `@main` URL 也不擅自改写。工作簿、扫描图、CSV、SQLite 等输入文件未在本站镜像，所以两例都明确标注节选/输入未齐，不承诺可直接重跑，也没有生成交付物或假答案。最初取得的生物统计任务仅作研究候选，未加入本轮案例。

项目归属改为 JobBench 研究团队（多机构合作），`kind` 改为公开原创评测；发布日期按 arXiv 首次提交 **2026-05-25** 记录。Meta 引用日期 **2026-10-12** 单独解释。论文首次版本写 65 main + 65 easy，而当前固定数据卡为 65 main + 63 easy，二者分开保留，不强行调成一样。Logo 使用本轮实际从官网取得的 favicon 原字节：1,270 字节，SHA-256 `14907ca6d61ed70f8afea8e33cf1d092279465b21d7a95bc4f662a5f80d0a03e`；不再用 Meta 标识代替项目标识。

## 五、指数/体系另列（7 项）

这 7 项没有独立 `sampleSet` 不等于页面完全没有案例；有 `composition` 的现有页面可复用明确组成项的真实记录，只有 `related` 的页面则沿组成关联打开成员。成员题目不重复计成指数自有题目，私有实施也不由上游公开题代替。

| 目录条目 | 现有案例与边界 |
| --- | --- |
| Artificial Analysis Intelligence Index | [官方方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)所对应本站当前组成映射有 10 项，10 项均有站内记录；并非所有记录都包含完整输入/计分任务。 |
| Artificial Analysis Coding Agent Index | [官方方法](https://artificialanalysis.ai/methodology/coding-agents-benchmarking/)；本站当前 3 项组成评测均有站内记录。 |
| Artificial Analysis Speech-to-Speech Index | [官方方法](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking)；本站当前版本的 3 项组成评测均有站内记录，后续版本不可混计。 |
| AA Cyber Index | [官方文章](https://artificialanalysis.ai/articles/artificial-analysis-cyber-index/)定义 AA 改造的三种实施。站内 CWE-bench v1、CyberGym-E2E 上游有例，但不是已核实的 AA 专属计分行，仍有实施内容缺口。 |
| Vals Index | [官方组成说明](https://www.vals.ai/benchmarks/vals_index_v2)对应本站 7 项成员，6 项有站内记录；Code Migration 仍在前述专有缺口内。 |
| PSI / Personal Superintelligence Index | [Meta 模型卡](https://research.meta.ai/static/muse-wonder-model-card)列 7 个构件；本轮增加 JobBench 关联后，本站目前建立 4 个明确组成关联且它们有记录，不说成 7 项全有案例；FocusBench、VBT 等缺口继续保留。本页通过组成关联访问案例，没有伪造指数独立原题或权重。 |
| Jev Decision Index · 公开复现榜 0.3 | [社区复现 README](https://huggingface.co/spaces/multimodalart/jev-decision-index/blob/main/README.md)与[方法](https://huggingface.co/spaces/multimodalart/jev-decision-index/blob/main/methodology.html)区分公开复现和含私有部分的 Full 分。站内 GSM8K 上游题不等于 Jev 转成多选后的完整记录；本项也不是厂商原始题集。 |

## 本轮补充与验证

- 修改 `content/benchmarks/gpqa.json`、`gpqa-diamond.json`：修正可公开下载的数据入口，补实际字段/行数/固定来源与哈希，保留不在线转载题目的请求。
- 修改 `content/benchmarks/video-mme.json`：补实际观察到的 `#-dataset-examples` 官方案例锚点，保留转载前需批准的限制。
- 修改 `content/benchmarks/jobbench.json`：补两条经直接官方来源链核实的公开 main 记录及逐条中文简析，保留原始字段；纠正项目身份、作者、日期和数据访问。`content/brands.json`及 `content/assets/logos/jobbench.svg`补官网标识；`personal-superintelligence-index.json`增加 JobBench 组成关联。模板、schema 与页面组件没有修改。
- 本轮新增站内案例 **2 条**，当前为 186 项、575 条记录；无独立记录从 30 项减为 29 项。单纯补任务 ID、版本 hash、成绩或字段说明不算案例。
- `UPDATE_LOG.md` 同步记录原因、文件、影响和核验边界。具体来源快照、实际 HTTP 状态、SHA-256、GPQA 结构清单保存在本地 `artifacts/research/2026-10-19-remaining-cases/`；原始 ZIP 仅留在被忽略的证据目录，没有放入内容资源或版本发布。
- 验证通过：内容校验为 215 项、575 条记录、19 份发布资料；严格 TypeScript、46 项测试和生产构建通过，构建校验 220 个静态页及 GitHub Pages 404。Vite 仍有 chunk 大小提示，本轮未扩大为打包优化。
- 本地生产预览实际检查 5 个改动详情页；JobBench 两条原始 JSON 直接从页面原文解析后哈希分别为 `3526067f3df767adf163d71372b37b582205d98c1c96a40f21d240676780ab84`、`e0e3e6f530bed855704f9ae6b0eb4c5f493de50d114ab198088332800e9d0301`，与采用的固定源行一致。案例切换、许可展开、9 个原始字段与 390px 窄屏检查通过，没有整页横向溢出，raw 保持 540px 滚动区；Logo 实际加载，控制台无警告或错误。
- 本地 HTTP 核对新案例 JSON、官网 Logo 与许可依据文件均返回 200，分别与构建文件/已保存原字节一致；GPQA 两项页面显示公开入口，Video-MME 链接直达官方案例，PSI 关联可到 JobBench。原始记录、页面和资源核验结果保存在证据目录；既有 78 个排除文件哈希一致，215 项中只改动本轮 5 项目标条目。
- 临时预览进程已结束，4187 端口没有监听，临时浏览器页已关闭、窄屏覆盖已恢复。本轮没有提交推送或自动部署改动；生产页仍对应已发布的基线版本。
