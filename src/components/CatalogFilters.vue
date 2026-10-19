<script setup lang="ts">
import { useId } from "vue";
import { categories, kindLabels } from "../content/catalog";
import { sampleAccessLabels } from "../content/labels";
import type { CatalogFilterKey, CatalogQuery } from "../lib/catalogQuery";
import Icon from "./Icon.vue";
defineProps<{
  query: CatalogQuery;
  publishers: readonly string[];
  categoryCounts: ReadonlyMap<string, number>;
  total: number;
}>();
const emit = defineEmits<{ change: [key: CatalogFilterKey, value: string] }>();
// 桌面和手机复用同一套控件，各实例仍有唯一的 label/id。
const id = useId();
</script>
<template>
  <div class="catalog-filter-content">
    <div class="filter-heading">能力分类</div>
    <div class="category-filters" role="group" aria-label="能力分类">
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
        @click="emit('change', 'category', cat.id)"
      >
        <Icon :name="cat.glyph" :size="17" /><span>{{ cat.name }}</span
        ><small>{{ categoryCounts.get(cat.id) || 0 }}</small>
      </button>
    </div>
    <div class="filter-more">
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
    </div>
    <RouterLink to="/guide/" class="sidebar-tip"
      ><Icon name="book" :size="17" /><span
        ><strong>评测阅读指南</strong><small>指标、版本与评测条件</small></span
      ><Icon name="up" :size="15"
    /></RouterLink>
  </div>
</template>
