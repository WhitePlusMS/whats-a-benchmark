# AIHOT 页面样式与交互参考

观察日期：2026-10-19。用户要求关注排版、布局、标签、操作和小动画；本报告为 `ui-craft` Craft Report，仅记录观察与后续建议。本轮新增研究文档和本地截图，未实施产品界面修改。

## 核查范围（Checked）

- 实际打开：[精选](https://aihot.news/)、[全部动态](https://aihot.news/all)、[热点榜](https://aihot.news/hot)、[日报](https://aihot.news/daily)、[主题目录](https://aihot.news/topics)、[DeepSeek 主题内页](https://aihot.news/topics/deepseek)、[模型榜](https://aihot.news/leaderboard)、[内容详情](https://aihot.news/items/keozax8pv30p50qbxgwff3kkb)。这些是代表页面，未逐条遍历全部文章及附属管理页面。
- 操作：分类切换、搜索提交、模型榜表格/图切换、手机筛选面板、图片展开和 Esc 关闭。分类结果 URL 与选中状态、手机筛选后的可取消标签、图片加载及关闭后焦点恢复均有实际观察。
- 布局：桌面 1280×900、手机 390×844；深色外观随系统，未修改站点外观偏好。未开展正式性能、全站无障碍或浅色模式审计，未验证参考站的减少动态效果设置。
- 对照本站线上目录、现有列表视图与 MMMU 真实案例页面；代码事实由 GPT-6 LUNA 只读描述，主任务结合实际页面判断建议。另完整读取 `src/components/SampleMedia.vue`，确认当前图片为内嵌显示。
- 来源页面的新闻、评分与模型结论不属于本轮事实核验范围。

## 判断（Verdict）

最值得借鉴的是清楚的阅读层级、紧凑的内容容器，以及围绕具体操作提供的轻反馈。本站已有搜索、筛选、列表视图、URL 状态、返回位置保留、卡片悬停及减少动态效果支持，后续应复用已有结构，集中完善入口、状态和案例阅读。

## 五项可落地的参考

| 参考点 | 实际观察 | 对本站的建议 | 顺序 |
| --- | --- | --- | --- |
| 首屏与列表密度 | 全部动态页标题和工具栏较紧凑，主内容很快进入视线；时间、来源、标签的视觉重量低于标题与摘要。 | 缩小目录头部和统计区的占高，调整现有列表行的内边距、摘要和元数据，突出“查看真实题目/案例”入口。保留有意义的状态边界；有案例、需申请、内部未公开不靠同一种弱化灰字区分。 | 先做 |
| 筛选状态 | 桌面用紧凑分类分段；手机把筛选放入底部面板。选中后入口有提示，正文上方出现可直接取消的“只看模型”标签，URL 保存分类。 | 复用现有分类/发布方/案例状态筛选和活动条件标签；手机将筛选入口、选中数量、清除动作组织得更清楚，避免展开较长筛选区后找不到结果。 | 先做 |
| 图片原地查看 | 缩略图进入覆盖式看图层，背景变暗；实测原图加载成功，Esc 关闭后焦点回到原图片按钮。 | 在现有 `SampleMedia.vue` 图片展示上增加统一放大入口；关闭后保留案例选择、题目、解析和滚动位置。窄屏图表需要可查看原尺寸或缩放，不能只把整张图缩小塞入屏幕。保留图片说明、来源与加载失败提示。 | 先做 |
| 克制的微动效 | 动态卡片悬停稳定态为上移 1px、边框透明度由 0.08 到 0.12，过渡约 200ms，没有悬停阴影。图片关闭恢复焦点也减少了操作割裂。 | 基于本站已有 2px 悬停、全局过渡和减少动态效果规则，统一按钮、筛选选中态、任务/原始数据切换的反馈；动效只说明操作结果。具体时长需在本站预览再定，不把参考值作为所有组件的硬标准。 | 随前三项实施 |
| 导航与内容分组 | 主题目录按公司/模型、技术方向、内容类型分组；主题内页把简介、统计和大事记放在内容之前。日报采用独立的历史目录和阅读栏。 | 目录继续围绕能力、发布方、案例可见性组织；可在现有阅读指南或分类入口增加“一句话用途 + 条目数 + 案例情况”。评测版本关系以后可用简短时间轴表达，只有日期和关系经来源核实后才进入时间轴。 | 后续 |

首批建议只覆盖目录、筛选和案例看图三个区域，先做可交互预览，再评估是否需要调整全站布局。本站目前三个顶层入口清楚，尚无证据表明需要新增一整套常驻全站侧栏。

## 实测样式参数

以下是本次桌面全部动态页卡片的计算样式，不是对参考站整个设计系统的推定：

| 项目 | 本次观测值 |
| --- | --- |
| 页面背景 | `rgb(19, 25, 28)` |
| 卡片背景 | `rgb(26, 34, 38)` |
| 卡片内边距 | 上 15px / 左右 18px / 下 14px |
| 卡片圆角 | 12px |
| 标题 | 17px / 字重 650 / 行高 26.35px |
| 默认边框 | 白色透明度 0.08 |
| 悬停边框 | 白色透明度 0.12 |
| 悬停位移 | 向上 1px |
| 过渡 | 200ms；transform/box-shadow 使用 `cubic-bezier(0.25, 1, 0.5, 1)` |

可以借鉴字号、间距和边框的相互比例。本站品牌色、真实案例和证据说明仍应围绕自己的内容建立层级。

## 与现有实现的对应

- 目录、排序、视图和活动筛选：`src/views/ExploreView.vue`、`src/styles/catalog.css`；本轮已在线确认卡片与列表切换有效。已有列表需要打磨密度，无须另做一套列表功能。
- 卡片入口与反馈：`src/components/BenchmarkCard.vue`、`src/styles/benchmark-card.css`；案例入口已经存在，应改善可见性和文字层级。
- 查询与返回：`src/lib/catalogQuery.ts`、`src/composables/catalogQuery.ts`、`src/main.ts` 已有查询/视图状态和导航位置处理，后续复用。
- 案例切换与解析：`src/components/SampleViewer.vue`、`src/styles/sample-viewer.css`，已有任务/原始数据、多案例选择、参考答案和解析区域。
- 媒体：`src/components/SampleMedia.vue` 当前图片内嵌显示，音频/视频已有原生控制、文字说明与媒体来源。放大图片是可补充的体验，原始数据与许可说明继续保留。
- 全局动效与减少动态效果：`src/styles/base.css`；后续所有新增过渡继续遵守已有减少动态效果规则。

## 参考时的取舍

热点榜把前三项突出、后续条目压紧，模型榜把表格和价格/评分图放在同一区域切换，这些都体现了视觉重点随任务变化。本站可以用这种层级思路组织内容；评测目录中不能把各题集不同口径的分数拼成统一排行榜。新闻热度、来源头像堆叠和逐日时间线也不应直接变成每个评测的装饰。

## 本地证据

截图和测量保存在 `artifacts/research/2026-10-19-aihot-design-reference/`，属于本地研究材料，不进入产品静态资源：

- [全部动态桌面](../../artifacts/research/2026-10-19-aihot-design-reference/all-desktop.jpg)、[卡片悬停](../../artifacts/research/2026-10-19-aihot-design-reference/all-hover-desktop.jpg)、[精选首页](../../artifacts/research/2026-10-19-aihot-design-reference/home-desktop.jpg)。
- [主题目录](../../artifacts/research/2026-10-19-aihot-design-reference/topics-desktop.jpg)、[主题内页](../../artifacts/research/2026-10-19-aihot-design-reference/topic-detail-desktop.jpg)、[热点榜](../../artifacts/research/2026-10-19-aihot-design-reference/hot-desktop.jpg)、[日报](../../artifacts/research/2026-10-19-aihot-design-reference/daily-desktop.jpg)。
- [模型表格](../../artifacts/research/2026-10-19-aihot-design-reference/leaderboard-desktop.jpg)、[模型图形切换](../../artifacts/research/2026-10-19-aihot-design-reference/leaderboard-chart-desktop.jpg)、[内容详情](../../artifacts/research/2026-10-19-aihot-design-reference/item-desktop.jpg)。
- [手机信息流](../../artifacts/research/2026-10-19-aihot-design-reference/all-mobile.jpg)、[手机筛选面板](../../artifacts/research/2026-10-19-aihot-design-reference/filter-mobile.jpg)、[手机已选状态](../../artifacts/research/2026-10-19-aihot-design-reference/filtered-mobile.jpg)、[手机看图层](../../artifacts/research/2026-10-19-aihot-design-reference/image-modal-mobile.jpg)。
- [本站目录](../../artifacts/research/2026-10-19-aihot-design-reference/benchmark-catalog-desktop.jpg)、[本站列表](../../artifacts/research/2026-10-19-aihot-design-reference/benchmark-list-desktop.jpg)、[本站案例](../../artifacts/research/2026-10-19-aihot-design-reference/benchmark-cases-desktop.jpg)。
- [页面与交互范围、计算样式测量](../../artifacts/research/2026-10-19-aihot-design-reference/observations.json)。

本轮只核对研究文档和截图完整性，无应用代码变更，因此没有重跑应用测试或构建。未启动开发服务，未调用网页端 GPT，未提交推送。
