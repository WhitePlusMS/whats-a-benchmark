/** ARC's ten color symbols. Keep the same colors in the reader and practice board. */
export const arcColors = [
  "#171923",
  "#1479e8",
  "#ed343b",
  "#29b957",
  "#ffd633",
  "#979ba8",
  "#e43daa",
  "#f98f21",
  "#66d7ec",
  "#941b3a",
] as const;
export const arcColorNames = [
  "黑",
  "蓝",
  "红",
  "绿",
  "黄",
  "灰",
  "品红",
  "橙",
  "青",
  "酒红",
] as const;
/** Practice prediction and reference use exactly the same cell scale. */
export const arcCellSize = 28;
export type ArcGrid = number[][];
export type ArcPair = { input: ArcGrid; output: ArcGrid };

export function isArcGrid(value: unknown): value is ArcGrid {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= 30 &&
    Array.isArray(value[0]) &&
    value[0].length > 0 &&
    value[0].length <= 30 &&
    value.every(
      (row) =>
        Array.isArray(row) &&
        row.length === value[0].length &&
        row.every((cell) => Number.isInteger(cell) && cell >= 0 && cell <= 9),
    )
  );
}
export function cloneGrid(grid: ArcGrid): ArcGrid {
  return grid.map((row) => [...row]);
}
export function gridSize(grid: ArcGrid) {
  return `${grid.length} 行 × ${grid[0].length} 列`;
}
export function sameGridSize(a: ArcGrid, b: ArcGrid) {
  return a.length === b.length && a[0].length === b[0].length;
}
/** No alignment is inferred when sizes differ. This is not an ARC score. */
export function gridDifferences(a: ArcGrid, b: ArcGrid): boolean[][] | null {
  return sameGridSize(a, b)
    ? a.map((row, y) => row.map((cell, x) => cell !== b[y][x]))
    : null;
}
export function exactGridMatch(a: ArcGrid, b: ArcGrid) {
  return (
    sameGridSize(a, b) &&
    a.every((row, y) => row.every((cell, x) => cell === b[y][x]))
  );
}
export function resizeGrid(
  grid: ArcGrid,
  rows: number,
  columns: number,
): ArcGrid | null {
  if (![rows, columns].every((n) => Number.isInteger(n) && n >= 1 && n <= 30))
    return null;
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, x) => grid[y]?.[x] ?? 0),
  );
}
export function arcSymbolInk(value: number) {
  return [0, 9].includes(value) ? "#fff" : "#000";
}
