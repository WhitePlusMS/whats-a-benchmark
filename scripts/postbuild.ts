import { readFile, writeFile, copyFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { verifyBuild } from "./verify-public-output";
import { healthcarePath } from "../src/content/healthcare";
const { entries: benchmarks } = await verifyBuild();

// Pages needs an actual 404.html; known routes already have their own index.html.
await copyFile("dist/404/index.html", "dist/404.html");
await writeFile("dist/.nojekyll", "");
const routes = [
  "",
  "embodied/",
  healthcarePath.slice(1),
  "compare/",
  "releases/",
  "guide/",
  "about/",
  ...benchmarks.map((b) => `benchmarks/${b.id}/`),
];
for (const route of routes) {
  const html = await readFile(`dist/${route}index.html`, "utf8");
  assert(html.includes("<h1"), `Missing prerendered content: ${route}`);
  if (route === healthcarePath.slice(1))
    assert(
      html.includes("<h1>医疗健康</h1>") &&
        html.includes("/benchmarks/physicianbench/"),
      "医疗健康专区缺少预渲染标题或评测卡",
    );
  if (route.startsWith("benchmarks/"))
    assert(
      html.includes('id="task"') && html.includes('id="samples"'),
      `Missing benchmark body: ${route}`,
    );
}
// Never invent a deployment hostname. Actions supplies the actual Pages URL.
if (process.env.SITE_URL) {
  const root = process.env.SITE_URL.replace(/\/$/, "") + "/";
  const escapeXml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escapeXml(new URL(route, root).href)}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${root}sitemap.xml\n`,
  );
}
console.info(
  `[build] Verified ${routes.length} static pages and GitHub Pages 404.`,
);
