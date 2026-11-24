<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useHead } from "@unhead/vue";
import { kindLabels } from "../content/catalog";
import { healthcareName, healthcarePath } from "../content/healthcare";
import {
  catalogCategories,
  catalogCollections,
  matchesCatalogCategory,
} from "../lib/catalogQuery";
import { sampleAccessLabels } from "../content/labels";
import {
  useCatalogQuery,
  type CatalogFilterKey,
} from "../composables/catalogQuery";
import BenchmarkCard from "../components/BenchmarkCard.vue";
import CatalogFilters from "../components/CatalogFilters.vue";
import UiDialog from "../components/UiDialog.vue";
import Icon from "../components/Icon.vue";
import ComparisonSelectionBar from "../components/ComparisonSelectionBar.vue";
import { formatCount } from "../lib/displayFormats";
import { useCatalogNavigation } from "../composables/catalogNavigation";

const { catalogLocation } = useCatalogNavigation();
const {
  query,
  results,
  scope,
  currentCategory,
  hasFilters,
  stats,
  setFilter: updateFilter,
  reset,
} = useCatalogQuery();
const isEmbodied = computed(() => scope.value === "embodied");
const isHealthcare = computed(() => scope.value === "healthcare");
const visibleBenchmarks = computed(() => catalogCollections[scope.value]);
const visibleCategories = computed(() => catalogCategories[scope.value]);
const categoryLabel = computed(() =>
  isHealthcare.value ? "专题" : isEmbodied.value ? "任务" : "能力",
);
const title = computed(() =>
  isHealthcare.value
    ? healthcareName
    : isEmbodied.value
      ? "具身智能"
      : "到底测什么？",
);
useHead(() => ({
  title: `${title.value} · what's a benchmark?`,
}));
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
const publishers = computed(() => stats.value.publishers);
const localCount = computed(() => stats.value.localCount);
const sampleCount = computed(() => stats.value.sampleCount);
const categoryCounts = computed(() => stats.value.categoryCounts);
// 侧栏、面板和条件标签都从同一URL模型派生，不维护第二份筛选状态。
const activeFilters = computed(() =>
  [
    { key: "q", label: "搜索", value: query.value.q, remove: "移除搜索词" },
    {
      key: "category",
      label: categoryLabel.value,
      value: query.value.category
        ? currentCategory.value?.name || query.value.category
        : "",
      remove: `移除${categoryLabel.value}分类`,
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
  return visibleCategories.value
    .map((category) => ({
      category,
      items: results.value.filter((item) =>
        matchesCatalogCategory(item, category.id, scope.value),
      ),
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
        <nav v-if="isHealthcare" class="breadcrumbs" aria-label="面包屑">
          <RouterLink :to="catalogLocation">模型评测</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ healthcareName }}</span>
        </nav>
        <h1>{{ title }}</h1>
        <p>
          {{
            isHealthcare
              ? "汇集医疗健康领域的模型评测，涵盖临床推理、医疗工作流与安全。"
              : isEmbodied
                ? "机器人与物理交互的任务、数据与评测方法。"
                : "评测任务、真实案例、评分方法与版本关系。"
          }}
        </p>
      </div>
      <div class="catalog-stats" aria-label="目录收录情况">
        <span
          ><b>{{ formatCount(visibleBenchmarks.length) }}</b> 个评测</span
        ><span
          ><b>{{ formatCount(visibleCategories.length) }}</b> 类{{
            categoryLabel
          }}</span
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
          :placeholder="
            isHealthcare
              ? '搜索医疗健康评测或发布方…'
              : '搜索评测、能力或发布方…'
          "
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
        v-if="!isEmbodied"
        class="sample-shortcut"
        :class="{ active: query.sample === 'local' }"
        :aria-pressed="query.sample === 'local'"
        @click="setFilter('sample', query.sample === 'local' ? '' : 'local')"
      >
        <Icon
          :name="query.sample === 'local' ? 'tick' : 'book'"
          :size="17"
        />有站内案例<span>{{ localCount }} 项</span>
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
  <div v-if="scope === 'model'" class="container catalog-features">
    <RouterLink class="reading-feature" :to="healthcarePath">
      <span class="reading-feature-mark" aria-hidden="true"
        ><Icon name="healthcare" :size="21"
      /></span>
      <span class="reading-feature-copy">
        <strong>{{ healthcareName }}</strong>
        <small>浏览医疗健康专区</small>
      </span>
      <span class="reading-feature-action"
        >查看专区 <Icon name="up" :size="16"
      /></span>
    </RouterLink>
    <RouterLink
      v-if="!hasFilters"
      class="reading-feature"
      to="/benchmarks/terminal-bench-4/"
    >
      <span class="reading-feature-mark" aria-hidden="true"
        ><Icon name="code" :size="21"
      /></span>
      <span class="reading-feature-copy">
        <strong>Terminal-Bench 4.0 任务示例</strong>
        <small>从输入到验收，看看这项评测怎样出题</small>
      </span>
      <span class="reading-feature-action"
        >开始阅读 <Icon name="up" :size="16"
      /></span>
    </RouterLink>
  </div>
  <div id="catalog" class="container atlas-layout">
    <aside v-if="!isMobile" class="filters" aria-label="评测筛选">
      <CatalogFilters
        :query="query"
        :publishers="publishers"
        :category-counts="categoryCounts"
        :total="visibleBenchmarks.length"
        :categories="visibleCategories"
        :task-only="isEmbodied"
        :category-label="categoryLabel + '分类'"
        @change="setFilter"
      />
    </aside>
    <section class="results-section">
      <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ query.q ? `搜索“${query.q}”，` : "" }}找到
        {{ formatCount(results.length) }} 项评测。
      </p>
      <ComparisonSelectionBar inline />
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
              :search-query="query.q"
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
          :search-query="query.q"
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
      :total="visibleBenchmarks.length"
      :categories="visibleCategories"
      :task-only="isEmbodied"
      :category-label="categoryLabel + '分类'"
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
