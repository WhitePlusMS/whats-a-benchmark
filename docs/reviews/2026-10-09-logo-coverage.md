# Benchmark 图片标识缺项盘点

核查日期：2026-10-09。用户随后授权全部接入，当前结果如下；初次统计与第一方来源证据保留在后文。

## 2026-10-09 接入后的当前状态

| 项目 | 接入后 |
| --- | ---: |
| 已发布benchmark | 151 |
| 有图片映射 | 151 |
| 空brandIds | 0 |
| 注册素材 | 79 |
| 本轮新增原素材 / 复用原素材 | 21 / 3 |
| 本轮补齐条目 | 26 |

- 下方保留的是接入前125/151、缺26项的初次盘点快照，不能再当作当前数量。本轮逐项来源与映射见[最新来源清单](../LOGO_SOURCES.md#2026-10-09-补齐26项缺图)及[接入审计](../../artifacts/candidates/2026-10-09-logo-assets.json)。
- 5项使用官方维护者身份图片（GPQA/Diamond、MMLU、BrowseComp-ZH、LiveCodeBench Pro），没有宣称找到了专属Logo；CMMLU原图为README标题图，MAA原图为官方机构账户标识。详见最新来源清单。
- 全部26项仅改brandIds，其他内容/样例不变；21份源素材与生成文件SHA一致。类型检查、内容校验、47/47测试通过；浏览器151个容器/156张标识均加载成功，文字回退0，列表/详情尺寸与小屏验证通过。


## 初次盘点数量与统计口径（接入前快照）

| 项目 | 数量 |
| --- | ---: |
| 已发布 benchmark | 151 |
| 已配置至少一个图片标识 | 125 |
| `brandIds` 为空、使用发布方文字占位 | 26（17.2%） |
| 注册图片素材 | 58 |
| 已引用但源文件或生成资源缺失 | 0 |

- `content/benchmarks/*.json` 与 `.generated/catalog.json` 都为151项，全部为published，品牌映射逐项一致。源品牌注册和生成品牌目录均为58项，所需源文件及生成文件存在。
- 125是配置图片的条目数量，包含机构/项目标识和账户图片，不能解释为125个benchmark都有专属Logo。本报告未做所有图片的浏览器解码验收。
- 现有来源登记明确记录5个条目使用作者头像或identicon：LiveBench、SimpleBench、BullshitBench v2、Lech Mazur Short-Story、WeirdML v2。身份图片与正式Logo需分开记录，来源见[已有标识登记](../LOGO_SOURCES.md)。

## 26项缺图的分类分布

| 当前分类 | 缺图数 | 全部名称 |
| --- | ---: | --- |
| 编程与软件工程 | 5 | LiveCodeBench、LiveCodeBench Pro、SciCode、DeepSWE v1.1、NL2Repo-Bench |
| 数理与逻辑推理 | 3 | AIME 2025、AIME 2024、CritPt |
| 知识与专业问答 | 4 | GPQA Diamond、MMLU、GPQA、CMMLU |
| Agent 与工具使用 | 6 | Mind2Web、BrowseComp-ZH、PaperBench、SkillsBench、Toolathlon-Verified、Vending-Bench 2 |
| 图像、文档与音视频 | 3 | BenchCAD、Small Overlapping Speech Bench、BabyVision |
| 长文本与记忆 | 1 | GDP.pdf |
| 指令遵循与偏好 | 1 | IFBench |
| 真实工作与专业任务 | 3 | Agents’ Last Exam、OfficeQA Pro、APEX-Agents |

## 核查结果

- 10项已经定位正式的发布方或项目素材，其中3项本地素材已存在，7项本轮定位到第一方Logo文件。包括：DeepSWE v1.1、APEX-Agents、PaperBench、GDP.pdf、Agents’ Last Exam、BabyVision、BenchCAD、CMMLU、OfficeQA Pro、Toolathlon-Verified。
- 另3项找到官方站点声明且有图形内容的网站图标：LiveCodeBench、SkillsBench、Vending-Bench 2。这类线索未直接认定为独立benchmark专属Logo，采纳前仍需确认品牌含义与视觉效果。
- AIME 2024/2025定位到MAA机构Logo指南，但本机访问受403限制，尚未确认独立图片素材；机构标识与AIME专属Logo分开记录。
- 其余11项本轮仅定位到账户头像、空SVG，或官方Logo入口访问失败。未定位到Logo不代表不存在Logo。

## 全部26项与第一方证据

表中HTTP状态仅表明当次请求；多数新增图片由HEAD核验类型，DataCurve官网SVG与站点favicon由GET核验正文。尚未下载、验图或接入。所有条目的本地 `brandIds` 都为空。

| # | Benchmark | 当前分类 | 发布方 | 本轮事实与边界 | 来源及图片线索 |
| --- | --- | --- | --- | --- | --- |
| 1 | [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | 知识与专业问答 | David Rein 等研究者 | 与GPQA同一来源，本轮尚未定位项目Logo | [第一方来源](https://github.com/idavidrein/gpqa) · [素材线索](https://avatars.githubusercontent.com/u/26013403?s=60&v=4)（200 / image/jpeg） |
| 2 | [AIME 2025](../../content/benchmarks/aime-2025.json) | 数理与逻辑推理 | MAA（原始竞赛） | 同AIME2024，MAA机构标识指南已定位；未确认独立图片资源 | [第一方来源](https://maa.org/maa-invitational-competitions/) · [素材线索](https://maa.org/wp-content/uploads/2025/05/MAA-Logo-Guidelines.pdf)（未验证独立图片） |
| 3 | [MMLU](../../content/benchmarks/mmlu.json) | 知识与专业问答 | Dan Hendrycks 等研究者 | 本轮仅定位作者账户头像；尚未定位项目Logo | [第一方来源](https://github.com/hendrycks/test) · [素材线索](https://avatars.githubusercontent.com/u/11670606?s=60&v=4)（200 / image/jpeg） |
| 4 | [GPQA](../../content/benchmarks/gpqa.json) | 知识与专业问答 | David Rein 等研究者 | 本轮仅定位作者账户头像；尚未定位项目Logo | [第一方来源](https://github.com/idavidrein/gpqa) · [素材线索](https://avatars.githubusercontent.com/u/26013403?s=60&v=4)（200 / image/jpeg） |
| 5 | [LiveCodeBench](../../content/benchmarks/livecodebench.json) | 编程与软件工程 | LiveCodeBench 研究团队 | 官网明确声明favicon.svg，作为站点图标线索，不直接认定专属Logo | [第一方来源](https://livecodebench.github.io/) · [素材线索](https://livecodebench.github.io/images/favicon.svg)（200 / image/svg+xml） |
| 6 | [AIME 2024](../../content/benchmarks/aime-2024.json) | 数理与逻辑推理 | MAA（原始竞赛） | 第一方MAA机构标识指南已定位；本机直连403，尚未确认独立图片资源，不称AIME专属Logo | [第一方来源](https://maa.org/maa-invitational-competitions/) · [素材线索](https://maa.org/wp-content/uploads/2025/05/MAA-Logo-Guidelines.pdf)（未验证独立图片） |
| 7 | [Agents’ Last Exam](../../content/benchmarks/agents-last-exam.json) | 真实工作与专业任务 | UC Berkeley RDI | 官网明确alt=Agents' Last Exam logo，官方README亦有assets/logo.png | [第一方来源](https://agents-last-exam.org/) · [素材线索](https://agents-last-exam.org/media/brand/agenthle-logo.jpg)（200 / image/jpeg） |
| 8 | [BenchCAD](../../content/benchmarks/benchcad.json) | 图像、文档与音视频 | BenchCAD 作者团队 | 官方README以alt=BenchCAD引用benchcad-icon.svg | [第一方来源](https://github.com/BenchCAD/BenchCAD-main) · [素材线索](https://raw.githubusercontent.com/BenchCAD/BenchCAD-main/main/assets/benchcad-icon.svg)（200 / image/svg+xml） |
| 9 | [OfficeQA Pro](../../content/benchmarks/officeqa-pro.json) | 真实工作与专业任务 | Databricks | 官方README标题OfficeQA前嵌入logo.png；OfficeQA系列项目标识，不宣称Pro独立标识 | [第一方来源](https://github.com/databricks/officeqa) · [素材线索](https://github.com/databricks/officeqa/raw/main/logo.png)（200 / image/png） |
| 10 | [Mind2Web](../../content/benchmarks/mind2web.json) | Agent 与工具使用 | The Ohio State University / Mind2Web 研究团队 | 官网favicon.svg返回200，但完整SVG仅有根元素、没有任何图形节点（361字符），不能显示为有效图片；组织账户头像另有线索，专属Logo仍待查 | [第一方来源](https://osu-nlp-group.github.io/Mind2Web/) · [素材线索](https://osu-nlp-group.github.io/Mind2Web/static/images/favicon.svg)（200 / image/svg+xml） |
| 11 | [LiveCodeBench Pro](../../content/benchmarks/livecodebench-pro.json) | 编程与软件工程 | LiveCodeBench Pro 研究团队 | 仓库作者头像可访问；论文所链www.livecodebenchpro.com超时且本机TLS校验失败，本轮尚未定位Logo | [第一方来源](https://github.com/GavinZhengOI/LiveCodeBench-Pro) · [素材线索](https://avatars.githubusercontent.com/u/33168669?s=200&v=4)（200 / image/jpeg） |
| 12 | [Small Overlapping Speech Bench](../../content/benchmarks/small-overlapping-speech-bench.json) | 图像、文档与音视频 | LAION e.V.（Hugging Face 数据集由 ChristophSchuhmann 账号发布） | 仅定位数据发布账户头像/自动生成社交缩略图，本轮未验证素材状态、未定位专属Logo | [第一方来源](https://huggingface.co/datasets/laion/small-overlapping-speech-bench) · [素材线索](https://cdn-avatars.huggingface.co/v1/production/uploads/1665438593823-617c01b3274d1c00141c2635.png)（未验证独立图片） |
| 13 | [SciCode](../../content/benchmarks/scicode.json) | 编程与软件工程 | SciCode 研究团队 | 已定位官方仓库组织头像；尚未核对独立项目Logo | [第一方来源](https://github.com/scicode-bench/SciCode) · [素材线索](https://avatars.githubusercontent.com/u/175031294?s=200&v=4)（200 / image/png） |
| 14 | [APEX-Agents](../../content/benchmarks/apex-agents.json) | 真实工作与专业任务 | Mercor / APEX-Agents 团队 | 本地已注册mercor，对应源文件与生成资源均存在；该条目brandIds为空 | [第一方来源](https://www.mercor.com/apex/) · [素材线索](https://www.mercor.com/favicon.png)（200 / image/png） |
| 15 | [CMMLU](../../content/benchmarks/cmmlu.json) | 知识与专业问答 | CMMLU 研究团队 | 官方README标题邻近title-icon使用fig/logo.jpg；区别于作者头像 | [第一方来源](https://github.com/haonan-li/CMMLU) · [素材线索](https://github.com/haonan-li/CMMLU/raw/master/fig/logo.jpg)（200 / image/jpeg） |
| 16 | [BrowseComp-ZH](../../content/benchmarks/browsecomp-zh.json) | Agent 与工具使用 | BrowseComp-ZH 研究团队 | 本轮仅定位作者PALIN2018个人头像；尚未定位项目Logo | [第一方来源](https://github.com/PALIN2018/BrowseComp-ZH) · [素材线索](https://avatars.githubusercontent.com/u/35458200?s=60&v=4)（200 / image/png） |
| 17 | [BabyVision](../../content/benchmarks/babyvision.json) | 图像、文档与音视频 | UniPat AI 与合作者 | 官方README引用assets/baby_logo.png，UniPat官方项目页亦提供baby_logo2.png | [第一方来源](https://github.com/UniPat-AI/BabyVision) · [素材线索](https://raw.githubusercontent.com/UniPat-AI/BabyVision/main/assets/baby_logo.png)（200 / image/png） |
| 18 | [DeepSWE v1.1](../../content/benchmarks/deep-swe-v1-1.json) | 编程与软件工程 | DataCurve AI | 官网有现成SVG图像；本地未注册DataCurve品牌且该条目brandIds为空 | [第一方来源](https://datacurve.ai/) · [素材线索](https://datacurve.ai/Datacurve-Wordmark.svg)（200 / image/svg+xml） |
| 19 | [IFBench](../../content/benchmarks/ifbench.json) | 指令遵循与偏好 | Allen Institute for AI (Ai2) | 已定位allenai组织账户头像；本轮尚未逐像素核对其与Ai2正式机构Logo关系 | [第一方来源](https://github.com/allenai/IFBench) · [素材线索](https://avatars.githubusercontent.com/u/5667695?s=200&v=4)（200 / image/png） |
| 20 | [NL2Repo-Bench](../../content/benchmarks/nl2repo-bench.json) | 编程与软件工程 | NL2Repo-Bench authors (official repository: multimodal-art-projection) | 仅定位官方仓库组织头像，未判断其是否自选Logo；尚未定位benchmark专属Logo | [第一方来源](https://github.com/multimodal-art-projection/NL2RepoBench) · [素材线索](https://avatars.githubusercontent.com/u/136257670?s=60&v=4)（200 / image/png） |
| 21 | [PaperBench](../../content/benchmarks/paperbench.json) | Agent 与工具使用 | OpenAI | 本地已注册openai，对应源文件与生成资源均存在；该条目brandIds为空 | [第一方来源](https://openai.com/index/paperbench/) · [素材线索](https://avatars.githubusercontent.com/u/14957082?s=200&v=4)（200 / image/png） |
| 22 | [SkillsBench](../../content/benchmarks/skillsbench.json) | Agent 与工具使用 | SkillsBench Team / BenchFlow | 官网声明favicon.svg；OG社交预览和合作方Modal图标不作为Logo | [第一方来源](https://www.skillsbench.ai/) · [素材线索](https://www.skillsbench.ai/favicon.svg)（200 / image/svg+xml） |
| 23 | [Toolathlon-Verified](../../content/benchmarks/toolathlon-verified.json) | Agent 与工具使用 | HKUST NLP Group | 官方README首部Logo标记assets/toolathlon.svg；Toolathlon项目标识，Verified与项目关系由README明确 | [第一方来源](https://github.com/hkust-nlp/Toolathlon) · [素材线索](https://github.com/hkust-nlp/Toolathlon/raw/main/assets/toolathlon.svg)（200 / image/svg+xml） |
| 24 | [Vending-Bench 2](../../content/benchmarks/vending-bench-2.json) | Agent 与工具使用 | Andon Labs | 官方Andon Labs评测页声明站点图标；发布方标识，非Vending-Bench2专属图形 | [第一方来源](https://andonlabs.com/evals/vending-bench-2) · [素材线索](https://andonlabs.com/favicon.svg)（200 / image/svg+xml） |
| 25 | [GDP.pdf](../../content/benchmarks/gdp-pdf.json) | 长文本与记忆 | Surge AI | 本地已注册surge-ai，对应源文件与生成资源均存在；该条目brandIds为空 | [第一方来源](https://surgehq.ai/benchmarks/gdp-pdf) · [素材线索](https://avatars.githubusercontent.com/u/66688196?s=200&v=4)（200 / image/png） |
| 26 | [CritPt](../../content/benchmarks/critpt.json) | 数理与逻辑推理 | CritPt 团队 | 仅定位官方仓库组织账户头像；尚未定位专属Logo | [第一方来源](https://github.com/CritPt-Benchmark/CritPt) · [素材线索](https://avatars.githubusercontent.com/u/234323621?s=200&v=4)（200 / image/png） |

## DataCurve与已有素材漏绑

- DeepSWE v1.1的发布方是DataCurve AI，当前条目 `brandIds: []`，品牌库未注册DataCurve。官方主页的页头/页尾通过 `img alt="Datacurve"` 使用[Datacurve-Wordmark.svg](https://datacurve.ai/Datacurve-Wordmark.svg)，GET为200、image/svg+xml、3810字节、262×44。官网另声明[icon.svg](https://datacurve.ai/icon.svg)，GET为200、image/svg+xml、1020字节、51×51，含明暗模式颜色；官方GitHub组织亦有账户图片。这是已定位到真实素材但未注册/绑定的缺项。
- PaperBench → OpenAI：`content/brands.json` 已有openai，`content/assets/logos/openai.png`和生成公开文件都存在，但PaperBench未填brandIds。OpenAI的PaperBench发布页明确项目归属。
- GDP.pdf → Surge AI：素材库已有surge-ai及 `logos/surge-ai.png`，该条目未绑定。
- APEX-Agents → Mercor：素材库已有mercor及 `logos/mercor.png`；APEX-Agents 1.1已绑定同一发布方，但原APEX-Agents未绑定。既有LOGO_SOURCES文档称两个版本都已绑定，当前数据与该记录不一致，应以当前条目字段为准。
- 三项已注册素材的官方assetUrl本轮均GET返回200 image/png；可以沿用既有素材与映射机制，无需重复下载或增加第二套发布方映射。

## 空图与未完成边界

- Mind2Web官网的[静态favicon.svg](https://osu-nlp-group.github.io/Mind2Web/static/images/favicon.svg)为200 image/svg+xml，但GET取得的完整361字符SVG只有根元素，没有path、circle、rect等图形内容，不能因200而当作有效标识。官网组织账户头像只作为另一个待核查身份线索。
- LiveCodeBench Pro的论文链接榜单域名，本轮网页工具超时，本机TLS验证失败；未绕过证书校验，未采用其作者个人头像冒充项目Logo。
- CMMLU使用README项目 `fig/logo.jpg`，区别于作者头像；OfficeQA使用整个系列的 `logo.png`，不宣称Pro版本有独立Logo；Toolathlon使用官方README的 `alt="Logo"` SVG，不借用模型厂商图标。
- GitHub组织/个人头像、Hugging Face自动社交缩略图、合作方图标和论文示意图均未直接认定为benchmark专属Logo。

## 初次盘点的实现归属与拟实施范围（历史）

当前架构由每个 `content/benchmarks/*.json` 的brandIds关联 `content/brands.json`；`scripts/content-pipeline.ts`把已引用素材复制到 `.generated/public/logos/`，`src/content/brands.ts`从生成目录和catalog构造索引，`PublisherMarks.vue`统一展示图片或文字占位。缺项集中在素材登记/条目绑定/来源核查，当前没有发现所引用文件缺失或源数据与生成映射不一致。

初次盘点仅新增本报告并更新 `UPDATE_LOG.md`，当时尚未接入素材。用户随后授权全部接入，已按原生成流程完成；当前数量、身份边界与验收结果见本报告开头及最新来源清单。
