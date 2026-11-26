<script setup lang="ts">
import { useId } from "vue";
import { kindLabels } from "../content/catalog";
import type { Category } from "../types/benchmark";
import { sampleAccessLabels } from "../content/labels";
import type { CatalogFilterKey, CatalogQuery } from "../lib/catalogQuery";
import { formatInclusionMonth } from "../lib/catalogQuery";
import Icon from "./Icon.vue";
defineProps<{
  query: CatalogQuery;
  publishers: readonly string[];
  inclusionMonths: readonly string[];
  categoryCounts: ReadonlyMap<string, number>;
  total: number;
  categories: readonly Category[];
  taskOnly?: boolean;
}>();
const emit = defineEmits<{ change: [key: CatalogFilterKey, value: string] }>();
// 桌面和手机复用同一套控件，各实例仍有唯一的 label/id。
const id = useId();
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
    <div
      v-if="inclusionMonths.length || query.included || !taskOnly"
      class="filter-more"
    >
      <template v-if="inclusionMonths.length || query.included">
        <label
          :for="`${id}-included`"
          title="本站首次入库的月份（按主分支记录，北京时间），不是评测发布日期"
          >收录时间</label
        >
        <select
          :id="`${id}-included`"
          name="included"
          autocomplete="off"
          :class="{ 'has-selection': query.included }"
          :value="query.included"
          @change="
            emit(
              'change',
              'included',
              ($event.target as HTMLSelectElement).value,
            )
          "
        >
          <option value="">全部收录时间</option>
          <option
            v-if="query.included && !inclusionMonths.includes(query.included)"
            :value="query.included"
          >
            {{ formatInclusionMonth(query.included) }}
          </option>
          <option v-for="month in inclusionMonths" :key="month" :value="month">
            {{ formatInclusionMonth(month) }}
          </option>
        </select>
      </template>
      <template v-if="!taskOnly">
        <label :for="`${id}-publisher`">发布方</label
        ><select
          :id="`${id}-publisher`"
          name="publisher"
          autocomplete="off"
          :class="{ 'has-selection': query.publisher }"
          :value="query.publisher"
          @change="
            emit(
              'change',
              'publisher',
              ($event.target as HTMLSelectElement).value,
            )
          "
        >
          <option value="">全部发布方</option>
          <option
            v-for="publisher in publishers"
            :key="publisher"
            :value="publisher"
          >
            {{ publisher }}
          </option>
        </select>
        <label :for="`${id}-sample`">案例查看方式</label
        ><select
          :id="`${id}-sample`"
          name="sample-status"
          autocomplete="off"
          :class="{ 'has-selection': query.sample }"
          :value="query.sample"
          @change="
            emit('change', 'sample', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">全部方式</option>
          <option
            v-for="(label, key) in sampleAccessLabels"
            :key="key"
            :value="key"
          >
            {{ label }}
          </option>
        </select>
        <label :for="`${id}-kind`">评测类型</label
        ><select
          :id="`${id}-kind`"
          name="benchmark-kind"
          autocomplete="off"
          :class="{ 'has-selection': query.kind }"
          :value="query.kind"
          @change="
            emit('change', 'kind', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">全部类型</option>
          <option v-for="(label, key) in kindLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </template>
    </div>
    <RouterLink to="/guide/" class="sidebar-tip"
      ><Icon name="book" :size="17" /><span
        ><strong>评测入门</strong><small>指标、版本与评测条件</small></span
      ><Icon name="up" :size="15"
    /></RouterLink>
  </div>
</template>
