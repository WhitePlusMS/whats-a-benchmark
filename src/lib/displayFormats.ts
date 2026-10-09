// 固定语言与 UTC，静态渲染和浏览器不会因宿主时区产生不同文本。
const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  timeZone: "UTC",
});
export const formatCount = new Intl.NumberFormat("zh-CN").format;
export const formatPercent = new Intl.NumberFormat("zh-CN", {
  style: "percent",
  maximumFractionDigits: 2,
}).format;
export function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}
export function formatMonth(value: string) {
  return monthFormatter.format(new Date(`${value}T00:00:00Z`));
}
