# 稳定用户目标：项目现状、竞争与验证

更新日期：2026-11-10。用户明确希望项目吸引稳定用户，成为持续更新的产品。下面区分已观察事实、其他人的研究以及针对本站的待检验假设；尚未取得本站访问或留存数据，也未联系用户、开展访谈或进行产品改动。

## 当前观察到的入口和限制

1. 本次以普通 HTTP 请求访问 [首页](https://whiteplusms.github.io/whats-a-benchmark/)、[GPQA Diamond](https://whiteplusms.github.io/whats-a-benchmark/benchmarks/gpqa-diamond/) 和 [LIBERO](https://whiteplusms.github.io/whats-a-benchmark/benchmarks/libero/) 均返回 200。公开 [robots.txt](https://whiteplusms.github.io/whats-a-benchmark/robots.txt)允许抓取并指向 [sitemap](https://whiteplusms.github.io/whats-a-benchmark/sitemap.xml)；本次文件中有 323 个 URL。其数量是公开部署快照，不能说明每一页都被搜索引擎收录，更不能与工作树中 318 个条目作线上同步验收。
2. GPQA 和 LIBERO 请求返回的 HTML 都包含相应正文，但原始 HTML 的 title 和 description 仍为首页通用文案；本次浏览器实际打开 GPQA 后显示独立标题。项目的 [详情页](../../src/views/DetailView.vue)使用 useHead 更新标题和说明。[Google 文档](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)称 Google 可运行 JavaScript，也建议使用描述性标题；因此这是一个要用具体搜索引擎索引状态验证的候选问题，不证明页面无法抓取、排名下降或不能被其他搜索引擎收录，也不证明仅修改标题就会带来用户。
3. 外部 [AI Benchmark Radar 发现页](https://aibenchmarkradar.com/updates?lang=en)在其 2026-11-05 抓取快照中列出本项目 GitHub 仓库。这证明其列表包含一条公开链接，不证明人工推荐、点击次数或持续用户。该站已有中英解读、原始成绩、专题和 [RSS/JSON Feed](https://aibenchmarkradar.com/about?lang=zh)，持续更新入口亦非本站独有。
4. 本次 [GitHub 仓库公开页面](https://github.com/WhitePlusMS/whats-a-benchmark)显示 1 star、0 fork，均为读取时的动态快照；仓库 About 简介仍写 84 项，不能据此代替当前网站实际内容、所有访问者、留存或项目价值。工作树 `README_ZH.md` 面向中文读者解释任务、样例、评分和来源；本地已发布条目及部署内容各应按实际快照核查。
5. 用户确认网站尚未接入网站统计或站长平台。在 index.html、src、vite 配置、README 和 workflow 的有限关键词检索中也未发现常见网站统计脚本；此次未取得网站 UV、来源、首访、回访或搜索查询数据，不能据此判断已有用户数量或留存。匿名 GitHub REST 请求因限流返回 403，本地未发现 gh 命令，未获取仓库 traffic 报表。[GitHub 文档](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)说明有推送权限的用户可查看最近 14 天仓库流量；仓库访客不等于 GitHub Pages 访客。

## 哪些人可能需要反复来，哪些仍只是猜想

| 人群与触发 | 已有线索 | 尚缺的关键验证 |
| --- | --- | --- |
| 持续解读新模型的中文开发者、作者：每次新报告出现不熟悉评测和成绩 | [中文和英文社区问题](2026-11-09-benchmark-user-needs.md)与[已有阅读任务](2026-11-09-reader-study-protocol.md)证明有人询问评测含义、分数差异；AA、Eval Handbook、Radar 已有说明和成绩。 | 能否从搜索或他人引用找到本站；一次查完后下次新模型发布是否再次回来；本站能否比现成替代更省时。 |
| 具身研究者：选 LIBERO、RoboTwin 等环境、核对版本和复现设置 | [中文复现问题](2026-11-10-chinese-embodied-practitioner-workflows.md)和[160 项综述筛查](2026-11-10-predictive-embodied-survey-crosswalk.md)说明问题和目录范围，但官方文档及其他目录已提供不少答案。 | 是否需要中文汇总、哪类任务值得多次查询、本站具体哪些信息能改变其工作；研究者困惑不代表会使用本站。 |
| 开发者选模型：比较指定任务、价格、效果 | [Sotabase 对照](2026-11-10-sotabase-frontiercs2-robotics.md)、AA 和模型选型站已有榜单与成本。 | 公共成绩能否满足其判断；若必须反复比较模型和价格，本站当前无完整结构化成绩、自动评测或价格数据，该方向维护负担明显。 |

当前最贴近既有产品能力的初步假设，是帮助第一类读者反复读懂新发布报告；具身研究者是相邻且值得单独测试的另一人群。这个优先顺序是基于现有内容和竞争情况的判断，不是已知用户画像或市场规模，也不能因为读者一次搜索找到了答案就假定他会回访。

## 观察什么，才能判断稳定用户

- **发现**：未来可用搜索站长工具核对搜索展示、点击、查询词和落地页面；[Google Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)需要网站所有权验证，提供的是 Google 搜索数据，不覆盖所有流量，也不能直接计算全站留存。用户确认尚未接入站长平台；本次没有配置或访问账户。
- **完成一次具体任务**：让真实目标读者从一张发布表找到某 benchmark 测试内容、原始来源和成绩口径；同题对比本站、原报告及现有竞品，记录正确率、耗时、误读和维护准备时间。招募对象和联系由用户安排；目前并未邀请或测试任何人。
- **再次回来解决新问题**：先约定“有意义使用”，例如阅读一个新的评测详情并完成来源核对；按周比较首访群体在后续周是否再有一次有意义访问。需要选用合适且用户同意的统计方式或主动回访；同一设备、清除数据和跨设备都可能影响匿名统计，不能把 PV 或 GitHub stars 当作独立人的留存。
- **更新可持续性**：每次记录发现新资料、核验、编写、发布、修正所需时间，及内容从发布日期到可用的延迟；以真实记录估算，而不是假定自动抓取后无需审核。旧分数、AA 分数及第三方内容须分别核对来源条件，不能默认可同步转载。

一个可执行的四周试验提案：选 5–10 个目标读者、一个明确工作场景及少量当前评测，先定完成任务和是否回访的标准；第 1 周观察首个问题，第 2–4 周以自然出现的新报告或新评测观察是否再来。该周期、样本和阈值只是试验设计建议，不是统计代表性调查；在没有可行招募、测量方法与维护预算前，不把“每周更新”当作留存已经成立的证据。未经明确指示，本次未发送邀请或创建订阅。
