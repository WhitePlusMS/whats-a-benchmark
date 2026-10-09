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
import { interpretationFields } from "../content/interpretation";
import Icon from "../components/Icon.vue";
import { useComparison } from "../composables/compare";
useHead({ title: "评测对比 · what's a benchmark?" });
const { selected } = useComparison();
const items = computed(() =>
  selected.value
    .map((id) => byId.get(id))
    .filter((item): item is Benchmark => !!item),
);
const rows: { label: string; value: (item: Benchmark) => string }[] = [
  { label: "测什么", value: (item) => item.officialDefinition.summary },
  {
    label: "能力方向",
    value: (item) => categoryById.get(item.category)?.name || "",
  },
  { label: "任务输入", value: (item) => item.taskContract.input },
  { label: "需要完成什么", value: (item) => item.taskContract.output },
  { label: "工具与运行条件", value: (item) => item.taskContract.environment },
  { label: "数据概况", value: (item) => item.dataProfile.summary },
  {
    label: "数据访问",
    value: (item) => dataAccessLabels[item.dataAccess.status],
  },
  {
    label: "数据复用",
    value: (item) => reusePolicyLabels[item.reusePolicy.status],
  },
  {
    label: "评分指标",
    value: (item) => `${item.metric.name}：${item.metric.description}`,
  },
  { label: "具体版本", value: (item) => item.version },
  { label: "发布方", value: (item) => item.publisher },
  {
    label: "样例方式",
    value: (item) =>
      item.composition
        ? "查看组成评测的样例"
        : sampleAccessLabels[item.sampleAccess.status],
  },
];
// 全空维度不生成；单列缺项统一使用短标记，只解释一次。
const readingRows = computed(() =>
  interpretationFields.filter((field) =>
    items.value.some((item) => item.interpretation?.[field.key]),
  ),
);
const hasMissingReading = computed(() =>
  readingRows.value.some((field) =>
    items.value.some((item) => !item.interpretation?.[field.key]),
  ),
);
function readingAnchor(key: (typeof interpretationFields)[number]["key"]) {
  return key === "disclosure"
    ? "data"
    : key === "versionChanges"
      ? "relations"
      : "score";
}
</script>
<template>
  <div class="container reading-page">
    <h1>评测对比</h1>
    <p class="page-lead">
      同时查看 2–3
      项评测的任务、评分方法与适用限制。完整数据和依据可从各项详情继续阅读。
    </p>
    <p v-if="hasMissingReading" class="comparison-note">
      — 表示本站尚未整理该项，不表示官方没有披露。
    </p>
    <div
      v-if="items.length >= 2"
      class="comparison-scroll"
      tabindex="0"
      aria-label="评测对比表，可横向和纵向滚动"
    >
      <table class="comparison-table">
        <thead>
          <tr>
            <th scope="col">对比维度</th>
            <th v-for="item in items" :key="item.id" scope="col">
              <RouterLink :to="`/benchmarks/${item.id}/`"
                ><span translate="no">{{ item.name }}</span
                ><Icon name="arrow" :size="16" /></RouterLink
              ><span v-if="item.status === 'archived'" class="small-badge"
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
          <tr v-for="field in readingRows" :key="field.key">
            <th scope="row">{{ field.label }}</th>
            <td v-for="item in items" :key="item.id">
              <template v-if="item.interpretation?.[field.key]"
                ><p>{{ item.interpretation[field.key]?.text }}</p>
                <RouterLink
                  :to="`/benchmarks/${item.id}/#${readingAnchor(field.key)}`"
                  class="text-link"
                  >详细说明与依据 <Icon name="arrow" :size="14" /></RouterLink
              ></template>
              <span v-else aria-label="本站尚未整理">—</span>
            </td>
          </tr>
          <tr v-if="items.some((item) => item.limitations.length)">
            <th scope="row">关键限制</th>
            <td v-for="item in items" :key="item.id">
              <ul v-if="item.limitations.length">
                <li
                  v-for="note in item.limitations.slice(0, 2)"
                  :key="note.text"
                >
                  {{ note.text }}
                </li>
              </ul>
              <span v-else>—</span>
              <RouterLink
                :to="`/benchmarks/${item.id}/#score`"
                class="text-link"
                >查看完整评分说明 <Icon name="arrow" :size="14"
              /></RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">数据与许可</th>
            <td v-for="item in items" :key="item.id">
              <RouterLink :to="`/benchmarks/${item.id}/#data`" class="text-link"
                >查看获取方式与使用范围 <Icon name="arrow" :size="14"
              /></RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">参考资料</th>
            <td v-for="item in items" :key="item.id">
              <RouterLink
                :to="`/benchmarks/${item.id}/#sources`"
                class="text-link"
                >查看完整参考资料 <Icon name="arrow" :size="15"
              /></RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="empty-state">
      <Icon name="compare" :size="36" />
      <h2>选择至少两项评测</h2>
      <p>点击评测卡片上的“对比”按钮，最多可以选择 3 项。</p>
      <RouterLink to="/" class="primary-button"
        >浏览评测 <Icon name="arrow" :size="17"
      /></RouterLink>
    </div>
  </div>
</template>
