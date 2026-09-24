# 代表性评测资料核验

核验日期：2026-09-22。用途：支撑网站信息结构和首批内容选型。本文件是研究记录，不是完整条目库，也没有完成逐题转载审核。

## 1. 已检查的十组资料

| 评测 | 发布方 / 来源主体 | 测什么 | 对网站设计的影响 | 原始资料 |
| --- | --- | --- | --- | --- |
| MMLU / MMLU-Pro | Hendrycks 等原作者 / TIGER-Lab | 多学科知识与推理 | Pro 调整题目、选项和来源，应保留与原版的衍生关系；数据查看器可用于核对实际字段 | [MMLU 仓库](https://github.com/hendrycks/test)、[MMLU-Pro 数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro) |
| GPQA / Diamond | David Rein 等作者 | 物理、化学、生物专业选择题 | Diamond 需与原题集关联；访问条件明确要求不在网上披露题目文本或图片，本站使用外链和题型解释 | [官方数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)、[官方仓库](https://github.com/idavidrein/gpqa) |
| Humanity's Last Exam（HLE） | Center for AI Safety、Scale AI 及专家贡献者 | 跨专业领域的高难度文字/图文问题 | 有公开示例和私有留出题集；“可以在官网看到示例”与“本站已完成转载审核”分开记录 | [官网与 Examples](https://lastexam.ai/) |
| SWE-bench / Verified | SWE-bench 作者团队；Verified 与 OpenAI 合作 | 根据仓库和 issue 修改代码，通过测试 | Verified 是人工核验的 500 个样本子集；需要仓库任务样例组件，而非统一问答卡 | [Verified 原始发布](https://openai.com/index/introducing-swe-bench-verified/) |
| LiveCodeBench | LiveCodeBench 作者团队 | 持续更新的编程竞赛任务及相关执行/预测任务 | 内容需保存 release、题目时间窗口和任务类型；原竞赛题的展示条件另行检查 | [官方仓库及 Data / Explorer 入口](https://github.com/LiveCodeBench/LiveCodeBench) |
| AIME | Mathematical Association of America（MAA） | 人类数学竞赛题，答案为指定范围的整数 | AI 评测采用具体年份和试卷，不能把所有 AIME 名称合成同一题集；转载范围待逐卷确认 | [MAA 官方竞赛说明](https://maa.org/maa-invitational-competitions/) |
| MMMU / MMMU-Pro | MMMU 作者团队 | 基于图表、图示等材料进行多学科理解与推理 | 版本、任务 split 与图片来源都需要保留；正文和图片的许可分别检查 | [官方主页、样例及数据入口](https://mmmu-benchmark.github.io/) |
| Terminal-Bench | Terminal-Bench 项目团队 | 在终端环境中完成实际任务 | 官网区分 Model 与 Agent，任务与运行环境共同影响结果；需要显示任务目标、环境和验证方式 | [官方主页与任务入口](https://www.tbench.ai/) |
| GDPval | OpenAI | 完成职业场景中的工作任务并交付成果 | 官方公开集有 220 个任务，含说明、参考文件及交付相关字段，适合“输入—任务—交付物”呈现；附件单独核验 | [官方数据卡与真实任务](https://huggingface.co/datasets/openai/gdpval) |
| BrowseComp | OpenAI | 通过网页浏览搜寻难找到但答案明确的信息 | 官方发布了 1,266 个问题，并请求不要把题目以文本或图片形式重新发布；本站不存放其原题 | [官方发布与脚注](https://openai.com/index/browsecomp/) |

以上中文描述为本站研究概括，不能用作官方逐字译文。这里核验的是任务类型、来源入口和影响设计的关键事实，没有核验所有历史成绩、当前榜首或每一条样例。

## 2. 三条影响结构的证据

### 公开题库不等于可以复制到公开网站

[GPQA 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)在访问条件与正文中都要求避免网上披露样例；[BrowseComp 发布页](https://openai.com/index/browsecomp/)脚注也提出同类请求。因此样例展示方式必须逐条记录。未公开或有转载限制的评测仍可收录，但采用官方入口和本站任务结构解释。

对于 HLE、MMLU-Pro 等可见示例，仍须在采集时核对具体素材条件与署名，不能仅凭“网页可访问”认定所有题目、图片、附件可重新托管。

### 同一个 benchmark 的成绩可能对应不同运行条件

[Anthropic 的 SWE-bench 工程说明](https://www.anthropic.com/engineering/swe-bench-sonnet)明确讨论工具、代理框架与执行过程；[SWE-bench Verified 的原始发布](https://openai.com/index/introducing-swe-bench-verified/)单独定义数据集及筛选流程。因此本站区分评测定义与厂商的结果报告，解释可比条件而不混排数字。

### 版本是事实身份的一部分

[LiveCodeBench 官方仓库](https://github.com/LiveCodeBench/LiveCodeBench)提供 release 和任务选择；[MMLU-Pro 数据卡](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)持续记录修订；[Terminal-Bench 官网](https://www.tbench.ai/)明确标示当前版本。因此发布日期、所选版本和本站核验日期使用三个字段。

## 3. 首批样例采集顺序

1. 从 MMLU-Pro 官方数据查看器选择少量可核对来源的结构化样例。
2. 核对 HLE 官网公开示例的素材条件，用作文字题/图文题展示候选。
3. 核对 SWE-bench 公开任务，用作仓库问题与测试说明展示候选。
4. 核对 GDPval 的公开任务及参考附件，用作真实交付任务展示候选。
5. GPQA、BrowseComp 直接采用受限展示模式，保留官方阅读入口。

本轮没有下载、重新发布或改写任何原始题目。上述顺序是实施建议，不是已完成采集声明。

## 4. 技术依据

- [Vue 官方快速开始](https://vuejs.org/guide/quick-start)：Vue 官方脚手架支持基于 Vite 的项目。
- [Vue 的 TypeScript 说明](https://vuejs.org/guide/typescript/overview)：Vite 转译不等于完成类型检查，实施阶段需单独执行 Vue/TypeScript 类型检查。
- [Vue Router 路由模式](https://router.vuejs.org/guide/essentials/history-mode.html)：history 深层路径需要服务器配合；hash 有其搜索可见性取舍。
- [vite-ssg 官方仓库](https://github.com/antfu-collective/vite-ssg)：支持 Vue 3 + Vite 的静态生成和自定义生成路由。
- [Vite 静态部署文档](https://vite.dev/guide/static-deploy)：GitHub Pages 项目站点需设置正确的 base，并通过构建部署。
- [GitHub Pages 说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)：托管产物为静态 HTML、CSS 与 JavaScript。

技术文档支持方案可行性，不代表本地依赖已安装或构建验证已通过。

## 5. 实施阶段补充（2026-09-22）

- 已通过浏览器查看 [Claude Opus 4.6 原始成绩图](https://www-cdn.anthropic.com/images/4zrzovbb/website/f9564dd2f758237bd9dbe775674c4a375aff1e8a-2600x2968.png)，识别其中的 MCP-Atlas、Finance Agent、GDPval-AA、MMMLU 等名称。
- [Gemini 3.1 Pro 模型卡](https://deepmind.google/models/model-cards/gemini-3-1-pro/)：区分有工具/无工具、终端框架、业务领域和长上下文配置，作为发布资料索引第四组来源。
- [MMMLU 官方数据卡](https://huggingface.co/datasets/openai/MMMLU)：MMLU test 的 14 种语言专业人工翻译，标注 MIT。站内保存 ZH_CN/test 前两条真实记录，并解释与 MMMU 的不同。
- [ARC-AGI-2 官方任务](https://github.com/arcprize/ARC-AGI-2/blob/main/data/training/6e19193c.json)：使用公开 training 划分的 6e19193c，按 Apache-2.0 署名与保留许可；数字矩阵直接渲染，没有自编任务。
- HealthBench 的官方发布同样请求避免在线转载题目，采用受限入口，与 GPQA/BrowseComp 保持一致。
- MATH-500、GDPval 的候选记录仅在未发布研究目录研究，未进入 public 或 dist。最终站内 19 个样例来自 10 个条目；其他条目显示准确访问方式。
- C-Eval 官网本轮连接不稳定，入口改为官方 GitHub 与 Hugging Face；官方仓库记载 2025 年已公开完整测试集。
- [GitHub Actions Pages 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 与 [configure-pages 元数据](https://github.com/actions/configure-pages/blob/v5/action.yml)用于最终部署配置。

上述补充描述实施阶段完成项；前文关于未下载/尚未安装的表述仅记录最初设计阶段。

## 6. 复审后的来源更正

- MATH-500 的 500 题划分来自 OpenAI 2023 年《Let's Verify Step by Step》；[PRM800K 官方仓库的 MATH Splits](https://github.com/openai/prm800k#math-splits)明确记录随机保留的 500 个测试问题。原始题库作者与子集创建者分开标注。
- [DeepMind MRCR v2](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)是该团队公开的内部实现，官方说明区分默认/宽松评分、needle 数、累计/单点长度与工具权限。
- [Anthropic Opus 4.6 发布页](https://www.anthropic.com/news/claude-opus-4-6)称 MRCR v2，但实际链接到 [OpenAI MRCR 数据卡](https://huggingface.co/datasets/openai/mrcr)；[Gemini 3.1 Pro 方法](https://deepmind.google/models/evals-methodology/gemini-3-1-pro/)指向 DeepMind eval_hub。因此两个来源保留独立条目，不能只按 v2 名称合并，更不能推断相同成绩口径。
