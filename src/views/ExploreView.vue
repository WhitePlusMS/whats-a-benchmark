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
import Icon from "../components/Icon.vue";
import { formatCount } from "../lib/displayFormats";
useHead({ title: "到底测什么？ · what's a benchmark?" });
const showFilters = ref(false);
const searchInput = ref<HTMLInputElement>();
const isMac = ref(true);
function onGlobalKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.value?.focus();
  }
}
onMounted(() => {
  isMac.value = /mac/i.test(navigator.platform);
  window.addEventListener("keydown", onGlobalKeydown);
});
onUnmounted(() => window.removeEventListener("keydown", onGlobalKeydown));
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
// 未筛选的默认浏览状态按能力分类分组展示；筛选或列表视图回到平铺结果。
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
  if (key === "category") showFilters.value = false;
}
</script>
<template>
  <div class="hero">
    <section class="catalog-header container">
      <div>
        <h1>到底测什么？</h1>
        <p>查询评测任务、真实样例、评分方法与版本关系。</p>
        <RouterLink to="/guide/#tasks" class="text-link"
          >按工作任务找评测</RouterLink
        >
      </div>
      <div class="catalog-stats" aria-label="目录收录情况">
        <span
          ><b>{{ formatCount(benchmarks.length) }}</b> 个评测</span
        >
        <span
          ><b>{{ formatCount(categories.length) }}</b> 类能力</span
        >
        <span
          ><b>{{ formatCount(sampleCount) }}</b> 条真实样例</span
        >
      </div>
    </section>
    <section class="container search-section" aria-label="搜索评测">
      <div class="search-box">
        <Icon name="search" :size="20" /><input
          ref="searchInput"
          aria-label="搜索评测"
          type="search"
          name="benchmark-search"
          autocomplete="off"
          :value="query.q"
          @input="setFilter('q', ($event.target as HTMLInputElement).value)"
          placeholder="搜索评测名称、能力或发布方…"
        /><button
          v-if="query.q"
          class="icon-button"
          aria-label="清空搜索"
          @click="setFilter('q', '')"
        >
          <Icon name="close" :size="18" /></button
        ><span v-else class="search-hint">例如 GPQA / 数学 / OpenAI</span
        ><kbd class="search-kbd">{{ isMac ? "⌘K" : "Ctrl K" }}</kbd>
      </div>
    </section>
  </div>
  <div class="container atlas-layout" id="catalog">
    <button
      class="mobile-filter-button"
      @click="showFilters = !showFilters"
      :aria-expanded="showFilters"
    >
      <Icon name="filter" :size="18" />能力分类与筛选<Icon
        name="down"
        :size="16"
      />
    </button>
    <aside
      class="filters"
      :class="{ 'is-open': showFilters }"
      aria-label="评测筛选"
    >
      <div class="filter-heading">能力分类</div>
      <button
        class="category-filter"
        :class="{ active: !query.category }"
        @click="setFilter('category', '')"
      >
        <Icon name="grid" :size="18" /><span>全部评测</span
        ><small>{{ benchmarks.length }}</small></button
      ><button
        v-for="cat in categories"
        :key="cat.id"
        class="category-filter"
        :class="{ active: query.category === cat.id }"
        @click="setFilter('category', cat.id)"
      >
        <Icon :name="cat.glyph" :size="18" /><span>{{ cat.name }}</span
        ><small>{{ categoryCounts.get(cat.id) || 0 }}</small>
      </button>
      <div class="filter-more">
        <label for="publisher">发布方</label
        ><select
          id="publisher"
          name="publisher"
          autocomplete="off"
          :value="query.publisher"
          @change="
            setFilter('publisher', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">全部发布方</option>
          <option v-for="p in publishers" :key="p" :value="p">
            {{ p }}
          </option></select
        ><label for="sample-status">样例查看方式</label
        ><select
          id="sample-status"
          name="sample-status"
          autocomplete="off"
          :value="query.sample"
          @change="
            setFilter('sample', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">全部方式</option>
          <option
            v-for="(label, key) in sampleAccessLabels"
            :value="key"
            :key="key"
          >
            {{ label }}
          </option></select
        ><label for="kind">评测类型</label
        ><select
          id="kind"
          name="benchmark-kind"
          autocomplete="off"
          :value="query.kind"
          @change="
            setFilter('kind', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">全部类型</option>
          <option v-for="(label, key) in kindLabels" :value="key" :key="key">
            {{ label }}
          </option>
        </select>
      </div>
      <RouterLink to="/guide/" class="sidebar-tip"
        ><Icon name="book" /><strong>评测阅读指南</strong
        ><span>指标、版本与评测条件</span
        ><span class="tip-link">查看指南</span
      ></RouterLink>
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
            }}<span>{{ results.length }}</span>
          </h2>
          <p v-if="query.category">
            {{ currentCategory?.description }}
          </p>
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
          <div class="view-toggle">
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
      <div v-if="hasFilters" class="active-filters">
        <span v-if="query.q" class="filter-chip"
          >搜索：<b>{{ query.q }}</b
          ><button aria-label="移除搜索词" @click="setFilter('q', '')"
            ><Icon name="close" :size="13" /></button
        ></span>
        <span v-if="query.category" class="filter-chip"
          >能力：<b>{{ currentCategory?.name }}</b
          ><button aria-label="移除能力分类" @click="setFilter('category', '')"
            ><Icon name="close" :size="13" /></button
        ></span>
        <span v-if="query.publisher" class="filter-chip"
          >发布方：<b>{{ query.publisher }}</b
          ><button aria-label="移除发布方筛选" @click="setFilter('publisher', '')"
            ><Icon name="close" :size="13" /></button
        ></span>
        <span v-if="query.sample" class="filter-chip"
          >样例：<b>{{ sampleAccessLabels[query.sample as keyof typeof sampleAccessLabels] }}</b
          ><button aria-label="移除样例筛选" @click="setFilter('sample', '')"
            ><Icon name="close" :size="13" /></button
        ></span>
        <span v-if="query.kind" class="filter-chip"
          >类型：<b>{{ kindLabels[query.kind as keyof typeof kindLabels] }}</b
          ><button aria-label="移除类型筛选" @click="setFilter('kind', '')"
            ><Icon name="close" :size="13" /></button
        ></span>
        <span class="filter-count">{{ results.length }} 项结果</span>
        <button class="clear-all" @click="reset">清空全部</button>
      </div>
      <template v-if="groupedResults.length">
        <section
          v-for="group in groupedResults"
          :key="group.category.id"
          class="category-group"
        >
          <div class="category-group-heading">
            <h3>
              <Icon :name="group.category.glyph" :size="19" />{{
                group.category.name
              }}
            </h3>
            <span>{{ group.items.length }} 个条目</span>
          </div>
          <p class="category-group-desc">{{ group.category.description }}</p>
          <div class="cards">
            <BenchmarkCard
              v-for="(item, index) in group.items"
              :key="item.id"
              :item="item"
              :style="{ '--i': index % 12 }"
            />
          </div>
        </section>
      </template>
      <div
        v-else
        class="cards"
        :class="{ 'list-view': query.view === 'list' }"
      >
        <BenchmarkCard
          v-for="(item, index) in results"
          :key="item.id"
          :item="item"
          :style="{ '--i': index % 12 }"
        />
      </div>
      <div v-if="!results.length" class="empty-state">
        <Icon name="search" :size="32" />
        <h3>未找到匹配的评测</h3>
        <p>试试英文简称，或放宽发布方和能力筛选。</p>
        <button class="primary-button" @click="reset">查看全部评测</button>
      </div>
      <p class="catalog-footnote">
        共 {{ sampleCount }} 条真实样例，覆盖
        {{ localCount }} 个评测；其他条目注明样例获取方式与原始来源。
      </p>
    </section>
  </div>
</template>
