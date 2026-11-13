<script setup lang="ts">
import { ref } from "vue";
import { useArcGridCursor } from "../composables/arcGridCursor";
import {
  arcColors,
  arcColorNames,
  arcSymbolInk,
  arcCellSize,
} from "../lib/arcGrid";
import type { ArcGrid } from "../lib/arcGrid";
const props = defineProps<{
  grid: ArcGrid;
  color: number;
  numbers: boolean;
  differences?: boolean[][] | null;
}>();
const emit = defineEmits<{
  paint: [row: number, column: number, color: number];
}>();
const root = ref<HTMLDivElement>();
const focusIndex = useArcGridCursor(() => props.grid);
function keydown(event: KeyboardEvent, row: number, column: number) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (/^[0-9]$/.test(event.key)) {
    event.preventDefault();
    emit("paint", row, column, Number(event.key));
    return;
  }
  const width = props.grid[0].length;
  const index = row * width + column;
  let next = index;
  if (event.key === "ArrowRight")
    next = row * width + Math.min(width - 1, column + 1);
  else if (event.key === "ArrowLeft")
    next = row * width + Math.max(0, column - 1);
  else if (event.key === "ArrowDown")
    next = Math.min(props.grid.length - 1, row + 1) * width + column;
  else if (event.key === "ArrowUp")
    next = Math.max(0, row - 1) * width + column;
  else if (event.key === "Home") next = row * width;
  else if (event.key === "End") next = row * width + width - 1;
  else return;
  event.preventDefault();
  focusIndex.value = next;
  root.value
    ?.querySelectorAll<HTMLButtonElement>("button")
    [next]?.focus({ preventScroll: true });
  root.value
    ?.querySelectorAll<HTMLButtonElement>("button")
    [
      next
    ]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
}
</script>
<template>
  <div class="arc-editor-scroll">
    <div
      ref="root"
      class="arc-editor"
      role="grid"
      aria-label="你的预测网格"
      aria-describedby="arc-editor-help"
      :aria-rowcount="grid.length"
      :aria-colcount="grid[0].length"
      :style="{
        '--columns': grid[0].length,
        '--cell-size': `${arcCellSize}px`,
      }"
    >
      <div
        v-for="(row, y) in grid"
        :key="y"
        role="row"
        class="arc-editor-row"
        :aria-rowindex="y + 1"
      >
        <button
          v-for="(cell, x) in row"
          :key="x"
          type="button"
          role="gridcell"
          :aria-colindex="x + 1"
          :aria-label="`${y + 1} 行 ${x + 1} 列：${cell} ${arcColorNames[cell]}${differences?.[y]?.[x] ? '，与参考不同' : ''}`"
          :tabindex="focusIndex === y * row.length + x ? 0 : -1"
          :style="{ background: arcColors[cell], color: arcSymbolInk(cell) }"
          :class="{ different: differences?.[y]?.[x] }"
          @focus="focusIndex = y * row.length + x"
          @click="emit('paint', y, x, color)"
          @keydown="keydown($event, y, x)"
        >
          <span v-if="numbers" aria-hidden="true">{{ cell }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.arc-editor-scroll {
  overflow: auto;
  max-width: 100%;
  padding: 7px;
  border-radius: 5px;
  background: var(--surface-sunken);
}
.arc-editor {
  display: grid;
  grid-template-columns: repeat(var(--columns), var(--cell-size));
  width: max-content;
  margin: 0 auto;
  border: 1px solid #626775;
}
.arc-editor-row {
  display: contents;
}
.arc-editor button {
  position: relative;
  width: var(--cell-size);
  height: var(--cell-size);
  border: 0.5px solid #ffffff35;
  padding: 0;
  font: 11px monospace;
  border-radius: 0;
}
.arc-editor button.different::after {
  content: "";
  position: absolute;
  inset: 3px;
  border: 1.5px solid white;
  pointer-events: none;
}
.arc-editor button:focus-visible {
  z-index: 1;
  outline: 3px solid #fff;
  outline-offset: -3px;
  box-shadow: 0 0 0 2px #171923;
}
.arc-editor button:hover {
  box-shadow: inset 0 0 0 2px white;
}
</style>
