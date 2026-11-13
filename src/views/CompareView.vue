<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "@unhead/vue";
import { byId, categoryById, embodiedCategories } from "../content/catalog";
import {
  dataAccessLabels,
  reusePolicyLabels,
  sampleAccessLabels,
} from "../content/labels";
import type { Benchmark } from "../types/benchmark";
import { interpretationFields } from "../content/interpretation";
import Icon from "../components/Icon.vue";
import ComparisonCell, {
  type ComparisonValue,
} from "../components/ComparisonCell.vue";
import { useCatalogNavigation } from "../composables/catalogNavigation";
import { COMPARISON_LIMIT } from "../lib/comparison";
import { useComparison } from "../composables/compare";
useHead({ title: "评测对比 · what's a benchmark?" });
const { selected, toggle, clear } = useComparison();
const { catalogLocation, embodiedLocation } = useCatalogNavigation();
const items = computed(() =>
  selected.value
    .map((id) => byId.get(id))
    .filter((item): item is Benchmark => !!item),
);
const directory = computed(() =>
  items.value.length && items.value.every((item) => item.embodied)
    ? embodiedLocation.value
    : catalogLocation.value,
);
interface Dimension {
  label: string;
  primary?: boolean;
  value: (item: Benchmark) => ComparisonValue;
}
const overview: Dimension[] = [
  {
    label: "测什么",
    value: (item) => ({ text: item.officialDefinition.summary }),
  },
  {
    label: "能力方向",
    value: (item) => ({
      text: item.embodied
        ? item.embodied.tasks
            .map(
              (task) =>
                embodiedCategories.find((category) => category.id === task)
                  ?.name || task,
            )
            .join("、")
        : categoryById.get(item.category)?.name || "",
    }),
  },
  {
    label: "任务输入",
    primary: true,
    value: (item) => ({ text: item.taskContract.input }),
  },
  {
    label: "需要完成什么",
    primary: true,
    value: (item) => ({ text: item.taskContract.output }),
  },
  {
    label: "工具与运行条件",
    value: (item) => ({ text: item.taskContract.environment }),
  },
  { label: "数据概况", value: (item) => ({ text: item.dataProfile.summary }) },
  {
    label: "数据访问",
    value: (item) => ({ text: dataAccessLabels[item.dataAccess.status] }),
  },
  {
    label: "数据复用",
    value: (item) => ({ text: reusePolicyLabels[item.reusePolicy.status] }),
  },
  {
    label: "评分指标",
    primary: true,
    value: (item) => ({
      text: item.metric.name + "：" + item.metric.description,
    }),
  },
  {
    label: "具体版本",
    primary: true,
    value: (item) => ({ text: item.version, mono: true }),
  },
  { label: "发布方", value: (item) => ({ text: item.publisher }) },
  {
    label: "样例方式",
    value: (item) => ({
      text: item.composition
        ? "查看组成评测的样例"
        : sampleAccessLabels[item.sampleAccess.status],
    }),
  },
];
// 桌面表格与窄屏使用同一组维度和值。
function detailLink(item: Benchmark, anchor: string, label: string) {
  return { href: "/benchmarks/" + item.id + "/#" + anchor, label };
}
const dimensions = computed<Dimension[]>(() => [
  ...overview,
  {
    label: "关键限制",
    primary: true,
    value: (item) => ({
      notes: item.limitations.slice(0, 2).map((note) => note.text),
      link: detailLink(item, "score", "查看完整评分说明"),
    }),
  },
  ...interpretationFields
    .filter((field) =>
      items.value.some((item) => item.interpretation?.[field.key]),
    )
    .map(
      (field): Dimension => ({
        label: field.label,
        value: (item) => {
          const note = item.interpretation?.[field.key];
          const anchor =
            field.key === "disclosure"
              ? "data"
              : field.key === "versionChanges"
                ? "relations"
                : "score";
          return note
            ? {
                text: note.text,
                link: detailLink(item, anchor, "详细说明与依据"),
              }
            : {};
        },
      }),
    ),
  {
    label: "数据与许可",
    value: (item) => ({
      link: detailLink(item, "data", "查看获取方式与使用范围"),
    }),
  },
  {
    label: "参考资料",
    value: (item) => ({
      link: detailLink(item, "sources", "查看完整参考资料"),
    }),
  },
]);
const grouped = computed(() => [
  dimensions.value.filter((row) => row.primary),
  dimensions.value.filter((row) => !row.primary),
]);
</script>

<template>
  <div class="container reading-page comparison-page">
    <h1>评测对比</h1>
    <div v-if="items.length" class="comparison-selection" aria-label="已选评测">
      <ul class="comparison-chips">
        <li v-for="item in items" :key="item.id">
          <RouterLink :to="'/benchmarks/' + item.id + '/'" translate="no">{{
            item.name
          }}</RouterLink>
          <button
            type="button"
            :aria-label="'移出对比：' + item.name"
            @click="toggle(item.id)"
          >
            <Icon name="close" :size="16" />
          </button>
        </li>
      </ul>
      <button
        v-if="items.length > 1"
        type="button"
        class="text-link"
        @click="clear"
      >
        清空
      </button>
      <RouterLink
        v-if="items.length >= 2"
        :to="directory"
        class="secondary-button"
      >
        {{ items.length < COMPARISON_LIMIT ? "添加评测" : "返回目录" }}
      </RouterLink>
    </div>
    <template v-if="items.length >= 2">
      <div class="comparison-scroll" tabindex="0" aria-label="评测对比表">
        <table class="comparison-table">
          <thead>
            <tr>
              <th scope="col">对比维度</th>
              <th v-for="item in items" :key="item.id" scope="col">
                <span translate="no">{{ item.name }}</span>
                <span v-if="item.status === 'archived'" class="small-badge"
                  >本站已归档</span
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in dimensions" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td v-for="item in items" :key="item.id">
                <ComparisonCell :value="row.value(item)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="comparison-mobile">
        <component
          :is="index === 0 ? 'div' : 'details'"
          v-for="(rows, index) in grouped"
          :key="index"
          class="comparison-group"
        >
          <summary v-if="index === 1">更多对比维度</summary>
          <section
            v-for="row in rows"
            :key="row.label"
            class="comparison-dimension"
          >
            <h2>{{ row.label }}</h2>
            <dl>
              <div v-for="item in items" :key="item.id">
                <dt translate="no">{{ item.name }}</dt>
                <dd><ComparisonCell :value="row.value(item)" /></dd>
              </div>
            </dl>
          </section>
        </component>
      </div>
    </template>
    <div v-else class="comparison-empty">
      <p>
        {{
          items.length
            ? "再选一项即可开始对比。"
            : "从目录选择 2–3 项评测开始对比。"
        }}
      </p>
      <RouterLink :to="directory" class="primary-button">浏览评测</RouterLink>
    </div>
  </div>
</template>
