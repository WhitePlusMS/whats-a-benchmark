<script setup lang="ts">
import type { TaskSample } from "../types/benchmark";
defineProps<{
  task: NonNullable<TaskSample["gridTask"]>;
  showAnswer: boolean;
}>();
const colors = [
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
];
</script>
<template>
  <div class="arc-task">
    <p class="muted">数字 0–9 对应不同颜色。原始矩阵见“原始数据”。</p>
    <section
      v-for="(pair, p) in [...task.train, ...task.test]"
      :key="p"
      class="arc-pair"
    >
      <h4>
        {{
          p < task.train.length
            ? `示范 ${p + 1}`
            : `测试 ${p - task.train.length + 1}`
        }}
      </h4>
      <div class="arc-grids">
        <figure v-for="side in ['input', 'output'] as const" :key="side">
          <figcaption>{{ side === "input" ? "输入" : "输出" }}</figcaption>
          <svg
            v-if="side === 'input' || p < task.train.length || showAnswer"
            :viewBox="`0 0 ${(pair[side][0]?.length || 1) * 20} ${pair[side].length * 20}`"
            role="img"
            :aria-label="`${p < task.train.length ? '示范' : '测试'}网格${side === 'input' ? '输入' : '输出'}，${pair[side].length} 行 ${pair[side][0]?.length} 列`"
          >
            <g v-for="(row, y) in pair[side]" :key="y">
              <rect
                v-for="(cell, x) in row"
                :key="x"
                :x="x * 20"
                :y="y * 20"
                width="20"
                height="20"
                :fill="colors[cell]"
                stroke="#ffffff35"
                stroke-width=".7"
              >
                <title>{{ y + 1 }} 行 {{ x + 1 }} 列：{{ cell }}</title>
              </rect>
            </g>
          </svg>
          <div v-else class="arc-hidden">?<small>展开参考答案查看</small></div>
        </figure>
      </div>
    </section>
  </div>
</template>
<style scoped>
.arc-task {
  margin-top: 20px;
}
.arc-pair {
  margin-top: 22px;
}
.arc-pair h4 {
  font-size: 12px;
  margin: 0 0 10px;
  color: var(--muted-tint);
}
.arc-grids {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.arc-grids figure {
  margin: 0;
  min-width: 0;
}
.arc-grids figcaption {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 8px;
}
.arc-grids svg {
  width: 100%;
  max-height: 220px;
  display: block;
  background: var(--surface-sunken);
  border-radius: 4px;
}
.arc-hidden {
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--accent-softer);
  border: 1px dashed var(--accent-border);
  font-size: 38px;
  border-radius: 6px;
  color: var(--muted-tint);
}
.arc-hidden small {
  font-size: 11px;
  margin-top: 8px;
}
</style>
