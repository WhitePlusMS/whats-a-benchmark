# C 方案与主题换色联动

## 问题与处理

用户询问新固定色 Logo 是否让变色功能失去意义。只读核对确认：主题变量仍控制按钮、链接、导航、分类选中、焦点等；脱节的是页眉使用外部 img 后，无法继承页面变量。

按最简原则保留 C 的几何与橙色对号，让题卡和题干跟随现有 `--theme-brand`。新增默认「深海蓝」以保持用户选定的蓝橙外观，原有六种主题和持久化机制继续使用。

## 文件与影响

- `public/favicon.svg`：为现有四个图形元素增加 `#brand-mark` 分组；两个题卡路径使用 `var(--theme-brand, #092D56)`，对号保持 `#F58A08`，白底和全部几何坐标保持。独立 favicon 没有页面主题变量，继续显示蓝橙标识。
- `src/App.vue`：将 img 改为 SVG `<use>`，通过原有 BASE_URL 地址引用同一文件的分组；不复制路径，不生成新的图片 URL，不引入组件或换色监听器。保留首页可访问名称与装饰 SVG 语义。
- `src/styles/layout.css`：原来的 img 防挤压和手机尺寸规则改为匹配 SVG，仍为桌面 36px、手机 32px。
- `src/lib/theme.ts`：在现有色板首项增加 `navy / 深海蓝`，brand `#092d56`、hover `#062344`、darkBrand `#8cb6e2`；其余六项与切换、存储逻辑保持。
- `src/styles/tokens.css`：首屏三个默认主题变量与深海蓝一致，使静态页面、首屏和运行后的默认色统一。
- `assets/brand/README.md`：更新共享图形、站内主题、固定宣传素材及实际检查说明。
- `UPDATE_LOG.md`：追加本轮原因、文件、影响和验证；既有内容按字节保留。

## 实际验证

- `npm run typecheck` 成功，生成 215 个公开条目并通过严格 TypeScript 检查。
- `node_modules/.bin/tsx.cmd scripts/build-site.ts` 成功，生成 221 个路由并核验 220 个普通静态页面和 GitHub Pages 404；已有大 chunk 提示未扩展为本轮打包优化。
- SVG XML 可解析，`#brand-mark`、三个路径和蓝色回退值存在；与上一轮透明 SVG 的路径 d 完全一致。源 SVG 与 dist 副本哈希一致；结构审核无问题，见 `svg-audit.json`。
- 浏览器在默认新来源下显示「主题色：深海蓝」。随后通过真实菜单逐一切换七种主题，在浅色和深色中核对菜单当前值、页面 CSS 变量、SVG 引用、36px 尺寸及无横向溢出，共 14 种状态，详见 `browser-checks.json`。
- 保存 14 份 `logo-<主题>-<模式>.png` 实际图标截图，并核对渲染颜色。截图有压缩色差，逐像素精确相等判定不适用；使用每通道 24 的 RGB 容差检查主题题卡和固定橙色对号，全部通过，最少题卡色像素 40、对号像素 90。详见 `pixel-checks.json`；没有用读取变量代替实际画面检查。
- 玫红深色页面刷新后仍显示玫红和 dark；手机 390px 浅色/深色下题卡保持所选绿色、对号橙色、图标 32px、无横向溢出。详见 `lifecycle-checks.json`、`reload-rose-dark.png`、`mobile-teal-light.png`、`mobile-teal-dark.png` 及两份手机图标截图。
- 深海蓝默认色的白底/白字对比约 13.80:1，深色文字与页面表面对比约 7.88:1，暗色按钮与白字约 5.07:1；沿用既有暗色派生规则，没有新建一套语义配色。

## 预览与范围

`header-navy-light/dark.png` 展示默认蓝橙；`header-teal-light/dark.png` 和 `theme-picker-teal.png` 展示题卡随主题而对号固定。所有预览来自构建后的本机浏览器页面。

没有新增业务逻辑、接口、依赖或重复单元测试。未运行 npm dev/start:dev，未调用网页端 GPT，未提交推送或发布。测试后恢复默认选择和系统外观、清除视口覆盖并关闭临时标签；临时静态验证服务已终止。
