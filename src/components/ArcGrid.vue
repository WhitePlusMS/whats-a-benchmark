<script setup lang="ts">
import { arcColors, arcColorNames, arcSymbolInk } from "../lib/arcGrid";
import type { ArcGrid } from "../lib/arcGrid";
defineProps<{
  grid: ArcGrid;
  label: string;
  numbers?: boolean;
  differences?: boolean[][] | null;
}>();
</script>
<template>
  <svg
    class="arc-grid"
    :viewBox="`0 0 ${grid[0].length * 20} ${grid.length * 20}`"
    role="img"
    :aria-label="`${label}，${grid.length} 行 ${grid[0].length} 列`"
  >
    <title>
      {{ label }}，{{ grid.length }} 行 {{ grid[0].length }} 列。颜色编号
      0–9，矩阵可在原始数据中查阅。
    </title>
    <g v-for="(row, y) in grid" :key="y">
      <g v-for="(cell, x) in row" :key="x">
        <rect
          :x="x * 20"
          :y="y * 20"
          width="20"
          height="20"
          :fill="arcColors[cell]"
          stroke="#ffffff35"
          stroke-width=".7"
        >
          <title>
            {{ y + 1 }} 行 {{ x + 1 }} 列：{{ cell }}（{{
              arcColorNames[cell]
            }}）{{ differences?.[y]?.[x] ? "，与另一网格不同" : "" }}
          </title>
        </rect>
        <rect
          v-if="differences?.[y]?.[x]"
          :x="x * 20 + 2"
          :y="y * 20 + 2"
          width="16"
          height="16"
          fill="none"
          stroke="#fff"
          stroke-width="1.5"
        />
        <text
          v-if="numbers"
          :x="x * 20 + 10"
          :y="y * 20 + 13.5"
          text-anchor="middle"
          :fill="arcSymbolInk(cell)"
          font-size="10"
          font-family="monospace"
          font-weight="600"
          aria-hidden="true"
        >
          {{ cell }}
        </text>
      </g>
    </g>
  </svg>
</template>
<style scoped>
.arc-grid {
  display: block;
  width: 100%;
  max-height: 360px;
  background: #171923;
  border: 1px solid #626775;
  border-radius: 3px;
}
</style>
