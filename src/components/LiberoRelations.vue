<script setup lang="ts">
defineProps<{ train: boolean }>();
</script>
<template>
  <div class="libero-relations">
    <svg
      v-if="train"
      viewBox="0 0 440 260"
      role="img"
      aria-label="目标关系示意：白杯放在 plate_1，黄白杯放在 plate_2，两项同时满足。示意不代表相机方位。"
    >
      <g class="plate">
        <ellipse cx="110" cy="172" rx="78" ry="25" />
        <ellipse cx="330" cy="172" rx="78" ry="25" />
      </g>
      <g class="cup">
        <path d="M76 88h61l-6 65q-24 15-49 0z" />
        <path d="M138 102h13q18 22-17 29" fill="none" stroke-width="6" />
        <ellipse cx="106" cy="88" rx="30" ry="9" />
      </g>
      <g class="cup yellow">
        <path d="M296 88h61l-6 65q-24 15-49 0z" />
        <path d="M358 102h13q18 22-17 29" fill="none" stroke-width="6" />
        <ellipse cx="326" cy="88" rx="30" ry="9" />
      </g>
      <text x="110" y="38">白杯</text>
      <text x="330" y="38">黄白杯</text>
      <text x="110" y="220">plate_1</text>
      <text x="330" y="220">plate_2</text>
      <text x="220" y="141" class="and">AND</text>
      <text x="110" y="244" class="sub">场景定义的左盘</text>
      <text x="330" y="244" class="sub">场景定义的右盘</text>
    </svg>
    <svg
      v-else
      viewBox="0 0 440 310"
      role="img"
      aria-label="黑碗关系示意：目标 akita_black_bowl_1 在 ramekin 和 plate_1 之间，需放到 plate_1。另一黑碗是干扰物；不是场景坐标复刻。"
    >
      <rect x="12" y="16" width="416" height="278" rx="20" class="table" />
      <path d="M42 100h65l-9 37H51z" class="ramekin" />
      <ellipse cx="351" cy="126" rx="58" ry="22" class="plate" />
      <g class="target">
        <circle cx="208" cy="110" r="49" />
        <path d="M173 96h70q-6 48-35 46t-35-46" class="bowl" />
      </g>
      <path d="M258 80Q309 42 345 88m-14-5 14 5-3-15" class="arrow" />
      <text x="75" y="170" class="sub">ramekin</text>
      <text x="208" y="170">目标黑碗</text>
      <text x="351" y="170" class="sub">plate_1</text>
      <text x="208" y="195" class="sub">akita_black_bowl_1</text>
      <path d="M58 222h55q-5 39-27 35t-28-35" class="bowl" />
      <text x="242" y="247" class="sub">另一黑碗：不是本题目标</text>
    </svg>
    <p>本站关系示意，不代表相机方位、物体坐标或运动轨迹。</p>
  </div>
</template>
<style scoped>
.libero-relations svg {
  width: 100%;
  display: block;
  max-height: 350px;
}
.libero-relations p {
  font-size: 11px;
  color: var(--muted);
  text-align: center;
  margin-top: 8px;
}
svg text {
  fill: var(--text-strong);
  text-anchor: middle;
  font: 600 16px sans-serif;
}
.sub {
  font-size: 12px;
  font-weight: 400;
}
.and {
  fill: var(--accent-text);
  font-size: 14px;
}
.plate {
  fill: var(--surface);
  stroke: var(--accent-text);
  stroke-width: 2;
}
.cup {
  fill: #e6e5df;
  stroke: #5b6874;
  stroke-width: 2;
}
.yellow {
  fill: #f2d977;
  stroke: #8a7026;
}
.table {
  fill: var(--surface-sunken);
  stroke: var(--border);
}
.ramekin {
  fill: #dfded7;
  stroke: #7c8082;
  stroke-width: 2;
}
.bowl {
  fill: #34383f;
  stroke: #87939d;
  stroke-width: 2;
}
.target circle {
  fill: var(--accent-soft);
  stroke: var(--accent-text);
  stroke-width: 2;
  stroke-dasharray: 5 4;
}
.arrow {
  fill: none;
  stroke: var(--accent-text);
  stroke-width: 3;
}
</style>
