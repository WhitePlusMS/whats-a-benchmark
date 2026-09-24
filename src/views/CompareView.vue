<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "@unhead/vue";
import { byId, categoryById } from "../content/catalog";
import {
  dataAccessLabels,
  reusePolicyLabels,
  sampleAccessLabels,
} from "../content/labels";
import type { Benchmark } from "../types/benchmark";
import Icon from "../components/Icon.vue";
import { useComparison } from "../composables/compare";
useHead({ title: "评测对比 · what's a benchmark?" });
const { selected } = useComparison();
const items = computed(() =>
  selected.value
    .map((id) => byId.get(id))
    .filter((item): item is Benchmark => !!item),
);
const rows: { label: string; value: (b: Benchmark) => string }[] = [
  { label: "官方定义", value: (b) => b.officialDefinition.summary },
  { label: "能力方向", value: (b) => categoryById.get(b.category)?.name || "" },
  { label: "任务输入", value: (b) => b.taskContract.input },
  { label: "预期输出", value: (b) => b.taskContract.output },
  { label: "执行环境", value: (b) => b.taskContract.environment },
  { label: "数据概况", value: (b) => b.dataProfile.summary },
  {
    label: "数据访问",
    value: (b) =>
      `${dataAccessLabels[b.dataAccess.status]}：${b.dataAccess.requirements.join(" ")}`,
  },
  {
    label: "复用边界",
    value: (b) =>
      `${reusePolicyLabels[b.reusePolicy.status]}：${b.reusePolicy.scope}`,
  },
  {
    label: "评分指标",
    value: (b) => `${b.metric.name}：${b.metric.description}`,
  },
  { label: "具体版本", value: (b) => b.version },
  { label: "发布方", value: (b) => b.publisher },
  {
    label: "样例方式",
    value: (b) => sampleAccessLabels[b.sampleAccess.status],
  },
  {
    label: "适用限制",
    value: (b) => b.limitations.map((item) => item.text).join(" "),
  },
];
</script>
<template>
  <div class="container reading-page">
    <h1>评测对比</h1>
    <p class="page-lead">同时查看 2–3 项评测的任务、评分方法与适用限制。</p>
    <div
      v-if="items.length >= 2"
      class="comparison-scroll"
      tabindex="0"
      aria-label="评测对比表，可横向滚动"
    >
      <table class="comparison-table">
        <thead>
          <tr>
            <th scope="col">对比维度</th>
            <th v-for="item in items" :key="item.id" scope="col">
              <RouterLink :to="`/benchmarks/${item.id}/`"
                >{{ item.name }}<Icon name="up" :size="16"
              /></RouterLink>
              <span v-if="item.status === 'archived'" class="small-badge"
                >本站已归档</span
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label">
            <th scope="row">{{ row.label }}</th>
            <td v-for="item in items" :key="item.id">{{ row.value(item) }}</td>
          </tr>
          <tr>
            <th scope="row">参考资料</th>
            <td v-for="item in items" :key="item.id">
              <a
                :href="item.sources[0]?.url"
                target="_blank"
                rel="noreferrer"
                class="text-link"
                >查看来源 <Icon name="external" :size="15"
              /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="empty-state">
      <Icon name="compare" :size="36" />
      <h2>选择至少两项评测</h2>
      <p>点击评测卡片上的“对比”按钮，最多可以选择三项。</p>
      <RouterLink to="/" class="primary-button"
        >浏览评测 <Icon name="arrow" :size="17"
      /></RouterLink>
    </div>
  </div>
</template>
