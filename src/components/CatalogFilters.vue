<script setup lang="ts">
import { computed, useId } from "vue";
import { kindLabels } from "../content/catalog";
import type { Category } from "../types/benchmark";
import { sampleAccessLabels } from "../content/labels";
import type {
  catalogFacetOptions,
  CatalogFilterKey,
  CatalogQuery,
} from "../lib/catalogQuery";
import { formatInclusionMonth } from "../lib/catalogQuery";
import Icon from "./Icon.vue";
const props = defineProps<{
  query: CatalogQuery;
  facets?: ReturnType<typeof catalogFacetOptions>;
  inclusionMonths: readonly string[];
  categoryCounts: ReadonlyMap<string, number>;
  total: number;
  categories: readonly Category[];
  taskOnly?: boolean;
}>();
const emit = defineEmits<{ change: [key: CatalogFilterKey, value: string] }>();
// 桌面和手机复用同一套控件，各实例仍有唯一的 label/id。
const id = useId();
function namedOptions(values: Set<string>, labels: Readonly<Record<string, string>>) {
  return [...values].map((value) => ({ value, label: labels[value] ?? value }));
}
const fields = computed(() => {
  const months = [...new Set([
    ...props.inclusionMonths,
    ...(props.query.included ? [props.query.included] : []),
  ])].sort().reverse();
  const inclusion = {
    key: "included" as const,
    label: "收录时间",
    all: "不限月份",
    options: months.map((value) => ({ value, label: formatInclusionMonth(value) })),
  };
  const facets = props.facets;
  const available = [inclusion, ...(facets ? [
    {
      key: "publisher" as const,
      label: "发布方",
      all: "全部发布方",
      options: [...facets.publishers].sort((a, b) => a.localeCompare(b, "zh"))
        .map((value) => ({ value, label: value })),
    },
    {
      key: "sample" as const,
      label: "案例查看方式",
      all: "全部方式",
      options: namedOptions(facets.sampleTypes, sampleAccessLabels),
    },
    {
      key: "kind" as const,
      label: "评测类型",
      all: "全部类型",
      options: namedOptions(facets.kinds, kindLabels),
    },
  ] : [])];
  return available.filter((field) => field.options.length > 0);
});
</script>
<template>
  <div class="catalog-filter-content">
    <div class="filter-heading">{{ taskOnly ? "任务分类" : "能力分类" }}</div>
    <div
      class="category-filters"
      role="group"
      :aria-label="taskOnly ? '任务分类' : '能力分类'"
    >
      <button
        class="category-filter"
        :class="{ active: !query.category }"
        :aria-pressed="!query.category"
        @click="emit('change', 'category', '')"
      >
        <Icon name="grid" :size="17" /><span>全部评测</span
        ><small>{{ total }}</small>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-filter"
        :class="{ active: query.category === cat.id }"
        :aria-pressed="query.category === cat.id"
        :disabled="!categoryCounts.get(cat.id) && query.category !== cat.id"
        @click="
          emit('change', 'category', query.category === cat.id ? '' : cat.id)
        "
      >
        <Icon :name="cat.glyph" :size="17" /><span>{{ cat.name }}</span
        ><small>{{ categoryCounts.get(cat.id) || 0 }}</small>
      </button>
    </div>
    <div v-if="fields.length" class="filter-more">
      <template v-for="field in fields" :key="field.key">
        <label
          :for="`${id}-${field.key}`"
          :title="field.key === 'included' ? '本站首次入库的月份（按主分支记录，北京时间），不是评测发布日期' : undefined"
        >{{ field.label }}</label>
        <select
          :id="`${id}-${field.key}`"
          :name="field.key"
          autocomplete="off"
          :class="{ 'has-selection': query[field.key] }"
          :value="query[field.key]"
          @change="
            emit('change', field.key, ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">{{ field.all }}</option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </template>
    </div>
  </div>
</template>
