# 单条内容文件、统一校验和公开产物生成

2026-09-22：取代集中式 catalog 数据数组和手工样例/Logo 映射登记。Vue 3 + Vite SSG 静态架构保持不变。

每条评测以 `content/benchmarks/<id>.json` 为唯一编辑入口，包含完整元数据、独立日期、品牌引用和可选样例。分类、品牌资源和模型发布资料作为共用实体独立保存，不按条目复制。ID 决定详情地址与引用身份，普通更新不改变 ID。

结构由 `src/content/schema.ts` 统一定义并推导类型。Node 内容管道读取作者文件，检查字段、来源、日期、类型、品牌、关系、样例格式和附件。浏览器不直接导入整个作者目录。`draft` 在公开投影前排除；`published` 出现在目录；`archived` 保留说明与历史详情，但不出现在目录搜索中。本站状态、资料公开程度与样例存在性独立表达。

构建前生成可重建的 `.generated`，元数据不包含样例正文；样例与素材在 `.generated/public` 按明确引用生成，Vite 只复制该生成目录。每次重新生成，旧样例不会从手工 public 目录回流。构建后对实际发布的详情、样例与附件清单校验，删除或撤回的文件不能留在产物中。

CLI 新建草稿、切换状态和删除都使用同一内容管道；状态更新在校验拟修改后的工作区后保存。删除先检查其他条目和发布报告的引用，阻止悬空链接；不自动级联删除共享源素材。采集工具只写候选目录，正式发布离线使用已审核内容。

不增加后台、数据库、动态评测或通用表单引擎。未来编辑界面复用这些结构与校验函数。维护方式详见 [内容维护手册](../CONTENT_MAINTENANCE.md)。

实现依据：[Zod schema 与类型定义](https://zod.dev/api)、[Vite publicDir 配置](https://vite.dev/config/shared-options.html#publicdir)。

构建入口使用 vite-ssg 的 Node API，保留其页面生成逻辑。Windows 实测出现生成目录短暂占用时，仅对自有 `.vite-ssg-temp`、`dist` 使用 [Node rm 有限重试](https://nodejs.org/api/fs.html#fspromisesrmpath-options)，拒绝符号链接；编译与渲染错误仍报错，完成后强制执行同一套产物校验。
