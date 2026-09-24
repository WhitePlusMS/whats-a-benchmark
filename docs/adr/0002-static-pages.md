# 使用 Vue 与 Vite 构建可独立访问的静态详情页

当前内容入口已更新为单条 JSON 与构建生成目录，详见 [内容生命周期决策](0003-content-lifecycle.md)。本文件保留静态路由方案及首次验证记录。

用户要求 Vue 3 + Vite、纯前端并部署到 GitHub Pages。方案采用 Vue Router 配合 vite-ssg，在构建时为已收录评测生成真实 HTML 文件；运行时仍是纯静态网站，不引入服务端部署。详情独立链接和可读取正文是这个知识图鉴的基本用途，因此承担少量预生成配置成本。

单纯的 history 路由需要服务器为任意深层路径回退到入口；hash 路由更简单，但不利于按评测名检索和分享页面元信息。构建时从内容数据枚举路径，使用 nested 输出与正确的仓库 base，以静态文件直接满足详情访问。浏览器专属逻辑仅在客户端执行，避免预生成报错。

依据：[Vue Router 路由模式](https://router.vuejs.org/guide/essentials/history-mode.html)、[vite-ssg 官方仓库](https://github.com/antfu-collective/vite-ssg)、[Vite 的 GitHub Pages 部署说明](https://vite.dev/guide/static-deploy)、[GitHub Pages 静态托管说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

2026-09-22 实施验证：根路径与 /benchmark-show/ 子路径生产构建通过，48 个评测各自生成嵌套 index.html，详情直达、样例加载与对照刷新已在真实浏览器验证。线上 Pages 发布仍需绑定目标仓库。
