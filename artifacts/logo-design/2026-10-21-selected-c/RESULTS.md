# C 方案选定与落地记录

## 授权与范围

用户回复「C 吧」，选定上一轮 `c-task-check-v1.png`。本轮保持题卡、题干短线和大对号，按最简原则制作可复用的纯色 SVG，并替换本地项目页眉与 favicon。不延展到全站主题色或其他页面改版。

## 文件变化

- `symbol-v1.svg` / `symbol-v1.png`：第一轮几何构造及其 512px 白底渲染，查看后沿用该几何。使用 256 网格、真实开口、填充路径和 45° 对号，不含脑形或仿生细节。
- `assets/brand/`：正式透明彩色/黑色/白色 SVG、透明彩色 PNG、白底 PNG、16/32/48px ICO 与使用说明。PNG 均为 512×512 RGBA，alpha 范围 0–255。
- `public/favicon.svg`：更换为 C 方案，白色圆角底保持深色标签页可见；与透明彩色 SVG 的三个主体路径一致。
- `src/App.vue`：删除旧书本内嵌 SVG，页眉改用与 favicon 相同的地址，通过 BASE_URL 保留子路径；固定宽高并保留首页链接可访问名称，图像作为装饰使用空 alt。
- `src/styles/layout.css`：为品牌 img 防止 flex 收缩，移动端原 32px 规则转为匹配 img；其余布局与主题规则沿用。
- 根目录 `UPDATE_LOG.md`：追加本轮文件、原因、影响和实际验证。既有日志按字节保留。

## 实际验证与观察

1. 生成 SVG 后先渲染 512px 并实际查看，结构审核无问题后再接入。最终再次审核三份透明 SVG 与正式 favicon，四份均无结构问题；详见 `audit.json`。结构分数不用于证明美观或品牌独占性。
2. `preview.html` / `preview.png` 保存尺寸梯度、16/32/48px 放大像素、灰度、黑白、背景、镜像和旋转检查。透明深蓝版在深色底上对比不足，因此正式页眉/favicon 使用白底版；深色版材料使用白色单色 SVG。
3. `npm run typecheck` 退出 0；生成了 215 个公开条目，严格 TypeScript 检查成功。
4. `node_modules/.bin/tsx.cmd scripts/build-site.ts` 退出 0，生成 221 个路由，脚本核验 220 个普通静态页面及 GitHub Pages 404。构建仍报告已有的大体积 chunk 提示，本轮没有因此扩展为打包重构。
5. 对构建后 `dist` 使用临时只读本机静态预览，浏览器实际查看桌面/手机浅色与深色页眉。四种状态图标加载均成功、无横向溢出；桌面 36×36、手机 32×32。证据见 `browser-checks.json` 和 `header-desktop-light.png`、`header-desktop-dark.png`、`header-mobile-light.png`、`header-mobile-dark.png`。
6. 首次临时预览的 Windows Python MIME 映射把 SVG 返回为 `image/svg`，造成浏览器图片加载失败。确认源文件、生成副本和构建副本哈希相同且 XML 可解析后，只在临时预览进程中将映射设为 `image/svg+xml`，随后实际浏览器加载成功；未修改系统注册表或应用代码来规避此预览问题。
7. 测试后关闭临时浏览器标签，清除视口覆盖、恢复测试页原外观模式，并终止临时静态服务。未运行 npm dev/start:dev，未启停用户已有服务。

## 边界

本轮未新增业务逻辑、接口、依赖或测试代码；未调用网页端 GPT，未提交、推送或发布。既有 README、阅读指南与案例相关工作区改动未由本轮编辑。
