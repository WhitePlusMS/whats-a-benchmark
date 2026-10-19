<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useHead } from "@unhead/vue";
import { benchmarks, categories, kindLabels } from "../content/catalog";
import { sampleAccessLabels } from "../content/labels";
import {
  useCatalogQuery,
  type CatalogFilterKey,
} from "../composables/catalogQuery";
import BenchmarkCard from "../components/BenchmarkCard.vue";
import CatalogFilters from "../components/CatalogFilters.vue";
import UiDialog from "../components/UiDialog.vue";
import Icon from "../components/Icon.vue";
import { formatCount } from "../lib/displayFormats";

useHead({ title: "到底测什么？ · what's a benchmark?" });
const showFilters = ref(false);
const isMobile = ref(false);
const searchInput = ref<HTMLInputElement>();
const isMac = ref(true);
let mobileQuery: MediaQueryList | undefined;
function syncViewport() {
  isMobile.value = mobileQuery?.matches ?? false;
  if (!isMobile.value) showFilters.value = false;
}
function onGlobalKeydown(event: KeyboardEvent) {
  // 模态打开时保持其原生焦点边界，快捷键不把焦点拉回背景。
  if (
    !showFilters.value &&
    (event.metaKey || event.ctrlKey) &&
    event.key.toLowerCase() === "k"
  ) {
    event.preventDefault();
    searchInput.value?.focus();
  }
}
onMounted(() => {
  isMac.value = /mac/i.test(navigator.platform);
  mobileQuery = window.matchMedia("(max-width: 700px)");
  syncViewport();
  mobileQuery.addEventListener("change", syncViewport);
  window.addEventListener("keydown", onGlobalKeydown);
});
onUnmounted(() => {
  mobileQuery?.removeEventListener("change", syncViewport);
  window.removeEventListener("keydown", onGlobalKeydown);
});
const {
  query,
  results,
  currentCategory,
  hasFilters,
  stats,
  setFilter: updateFilter,
  reset,
} = useCatalogQuery();
const { publishers, localCount, sampleCount, categoryCounts } = stats;
// 侧栏、面板和条件标签都从同一URL模型派生，不维护第二份筛选状态。
const activeFilters = computed(() =>
  [
    { key: "q", label: "搜索", value: query.value.q, remove: "移除搜索词" },
    {
      key: "category",
      label: "能力",
      value: query.value.category
        ? currentCategory.value?.name || query.value.category
        : "",
      remove: "移除能力分类",
    },
    {
      key: "publisher",
      label: "发布方",
      value: query.value.publisher,
      remove: "移除发布方筛选",
    },
    {
      key: "sample",
      label: "案例",
      value:
        sampleAccessLabels[
          query.value.sample as keyof typeof sampleAccessLabels
        ] || query.value.sample,
      remove: "移除案例筛选",
    },
    {
      key: "kind",
      label: "类型",
      value:
        kindLabels[query.value.kind as keyof typeof kindLabels] ||
        query.value.kind,
      remove: "移除类型筛选",
    },
  ].filter((item) => item.value),
);
const filterCount = computed(
  () => activeFilters.value.filter((item) => item.key !== "q").length,
);
const groupedResults = computed(() => {
  if (hasFilters.value || query.value.view === "list") return [];
  return categories
    .map((category) => ({
      category,
      items: results.value.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length);
});
function setFilter(key: CatalogFilterKey, value: string) {
  void updateFilter(key, value);
}
</script>

<template>
  <div class="hero">
    <section class="catalog-header container">
      <div class="catalog-intro">
        <h1>到底测什么？</h1>
        <p>评测任务、真实案例、评分方法与版本关系。</p>
      </div>
      <div class="catalog-stats" aria-label="目录收录情况">
        <span
          ><b>{{ formatCount(benchmarks.length) }}</b> 个评测</span
        ><span
          ><b>{{ formatCount(categories.length) }}</b> 类能力</span
        ><span
          ><b>{{ formatCount(sampleCount) }}</b> 条真实案例</span
        >
      </div>
    </section>
    <section class="container search-section" aria-label="搜索评测">
      <div class="search-box">
        <Icon name="search" :size="19" /><input
          ref="searchInput"
          aria-label="搜索评测"
          type="search"
          name="benchmark-search"
          autocomplete="off"
          :value="query.q"
          @input="setFilter('q', ($event.target as HTMLInputElement).value)"
          placeholder="搜索评测、能力或发布方…"
        /><button
          v-if="query.q"
          class="icon-button"
          aria-label="清空搜索"
          @click="setFilter('q', '')"
        >
          <Icon name="close" :size="18" /></button
        ><kbd v-else class="search-kbd">{{ isMac ? "⌘K" : "Ctrl K" }}</kbd>
      </div>
      <button
        class="sample-shortcut"
        :class="{ active: query.sample === 'local' }"
        :aria-pressed="query.sample === 'local'"
        @click="setFilter('sample', query.sample === 'local' ? '' : 'local')"
      >
        <Icon
          :name="query.sample === 'local' ? 'tick' : 'book'"
          :size="17"
        />站内案例<span>{{ localCount }}</span>
      </button>
      <button
        class="mobile-filter-button"
        aria-haspopup="dialog"
        :aria-expanded="showFilters"
        @click="showFilters = true"
      >
        <Icon name="filter" :size="17" />筛选<span
          v-if="filterCount"
          class="selection-count"
          >{{ filterCount }}</span
        ><Icon name="down" :size="15" />
      </button>
    </section>
  </div>
  <div id="catalog" class="container atlas-layout">
    <aside v-if="!isMobile" class="filters" aria-label="评测筛选">
      <CatalogFilters
        :query="query"
        :publishers="publishers"
        :category-counts="categoryCounts"
        :total="benchmarks.length"
        @change="setFilter"
      />
    </aside>
    <section class="results-section">
      <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ query.q ? `搜索“${query.q}”，` : "" }}找到
        {{ formatCount(results.length) }} 项评测。
      </p>
      <div class="results-toolbar">
        <div>
          <h2>
            {{
              query.category ? currentCategory?.name || "评测目录" : "全部评测"
            }}<span>{{ results.length }} 项</span>
          </h2>
          <p v-if="query.category">{{ currentCategory?.description }}</p>
        </div>
        <div class="result-controls">
          <label class="sr-only" for="sort">排序方式</label
          ><select
            id="sort"
            name="sort"
            autocomplete="off"
            :value="query.sort"
            @change="
              setFilter('sort', ($event.target as HTMLSelectElement).value)
            "
          >
            <option value="featured">编辑精选</option>
            <option value="name">名称 A–Z</option>
            <option value="year">发布年份</option>
          </select>
          <div class="view-toggle" role="group" aria-label="目录显示方式">
            <button
              :class="{ active: query.view === 'grid' }"
              aria-label="卡片视图"
              :aria-pressed="query.view === 'grid'"
              @click="setFilter('view', 'grid')"
            >
              <Icon name="grid" :size="16" /></button
            ><button
              :class="{ active: query.view === 'list' }"
              aria-label="列表视图"
              :aria-pressed="query.view === 'list'"
              @click="setFilter('view', 'list')"
            >
              <Icon name="list" :size="16" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="hasFilters" class="active-filters" aria-label="当前筛选条件">
        <span class="filter-summary"
          >已选 {{ activeFilters.length }} 项条件</span
        ><button
          v-for="filter in activeFilters"
          :key="filter.key"
          class="filter-chip"
          :aria-label="filter.remove"
          @click="setFilter(filter.key as CatalogFilterKey, '')"
        >
          <span
            >{{ filter.label }}：<b>{{ filter.value }}</b></span
          ><Icon name="close" :size="14" /></button
        ><button class="clear-all" @click="reset">清空条件</button>
      </div>
      <template v-if="groupedResults.length">
        <section
          v-for="group in groupedResults"
          :key="group.category.id"
          class="category-group"
        >
          <div class="category-group-heading">
            <h3>
              <Icon :name="group.category.glyph" :size="18" />{{
                group.category.name
              }}
            </h3>
            <span>{{ group.items.length }} 项</span>
          </div>
          <p class="category-group-desc">{{ group.category.description }}</p>
          <div class="cards">
            <BenchmarkCard
              v-for="(item, index) in group.items"
              :key="item.id"
              :item="item"
              :style="{ '--i': Math.min(index, 4) }"
            />
          </div>
        </section>
      </template>
      <div v-else class="cards" :class="{ 'list-view': query.view === 'list' }">
        <BenchmarkCard
          v-for="(item, index) in results"
          :key="item.id"
          :item="item"
          :style="{ '--i': Math.min(index, 4) }"
        />
      </div>
      <div v-if="!results.length" class="empty-state">
        <Icon name="search" :size="30" />
        <h3>未找到匹配的评测</h3>
        <p>试试英文简称，或移除上方的筛选条件。</p>
        <button class="primary-button" @click="reset">查看全部评测</button>
      </div>
      <p class="catalog-footnote">
        {{ sampleCount }} 条真实案例，覆盖
        {{ localCount }} 个评测；其余条目保留获取方式与官方说明。
      </p>
    </section>
  </div>
  <UiDialog
    v-if="isMobile"
    v-model="showFilters"
    title="筛选评测"
    layout="sheet"
    ><p v-if="query.q" class="sheet-search-context">
      在“{{ query.q }}”的搜索结果中筛选
    </p>
    <CatalogFilters
      :query="query"
      :publishers="publishers"
      :category-counts="categoryCounts"
      :total="benchmarks.length"
      @change="setFilter" /><template #footer
      ><button class="clear-all" :disabled="!hasFilters" @click="reset">
        清空条件</button
      ><button class="primary-button" @click="showFilters = false">
        查看 {{ results.length }} 项结果<Icon
          name="up"
          :size="16"
        /></button></template
  ></UiDialog>
</template>
