<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import {
  benchmarks,
  categories,
  kindLabels,
} from "../content/catalog";
import { sampleAccessLabels } from "../content/labels";
import { searchBenchmarks, recognizeNames } from "../lib/search";
import BenchmarkCard from "../components/BenchmarkCard.vue";
import Icon from "../components/Icon.vue";
useHead({ title: "到底测什么？ · what's a benchmark?" });
const route = useRoute();
const router = useRouter();
const batchOpen = ref(false);
const batchInput = ref("");
const showFilters = ref(false);
// 视图与筛选一同保留在 URL 中，返回目录时恢复原有浏览方式。
const view = computed(() => (route.query.view === "list" ? "list" : "grid"));
const q = computed(() =>
  typeof route.query.q === "string" ? route.query.q : "",
);
const category = computed(() =>
  typeof route.query.category === "string" ? route.query.category : "",
);
const publisher = computed(() =>
  typeof route.query.publisher === "string" ? route.query.publisher : "",
);
const sampleStatus = computed(() =>
  typeof route.query.sample === "string" ? route.query.sample : "",
);
const kind = computed(() =>
  typeof route.query.kind === "string" ? route.query.kind : "",
);
const sort = computed(() =>
  typeof route.query.sort === "string" ? route.query.sort : "featured",
);
const publishers = [...new Set(benchmarks.map((item) => item.publisher))].sort(
  (a, b) => a.localeCompare(b, "zh"),
);
const localCount = benchmarks.filter(
  (item) => item.sampleAccess.status === "local",
).length;
const sampleCount = benchmarks.reduce((total, item) => total + item.sampleCount, 0);
const hasFilters = computed(
  () =>
    !!(
      q.value ||
      category.value ||
      publisher.value ||
      sampleStatus.value ||
      kind.value
    ),
);
const results = computed(() => {
  const items = searchBenchmarks(q.value).filter(
    (item) =>
      (!category.value || item.category === category.value) &&
      (!publisher.value || item.publisher === publisher.value) &&
      (!sampleStatus.value || item.sampleAccess.status === sampleStatus.value) &&
      (!kind.value || item.kind === kind.value),
  );
  if (sort.value === "name")
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  if (sort.value === "year")
    return [...items].sort((a, b) => (b.year || 0) - (a.year || 0));
  return items;
});
const batchResults = computed(() => recognizeNames(batchInput.value));
function setFilter(key: string, value: string) {
  router.replace({
    path: "/",
    query: { ...route.query, [key]: value || undefined },
  });
  if (key === "category") showFilters.value = false;
}
function reset() {
  router.replace({
    path: "/",
    query: { view: route.query.view, sort: route.query.sort },
  });
}
</script>
<template>
  <section class="catalog-header container">
    <div>
      <h1>到底测什么？</h1>
      <p>查询评测任务、真实样例、评分方法与版本关系。</p>
    </div>
    <div class="catalog-stats" aria-label="目录收录情况">
      <span
        ><b>{{ benchmarks.length }}</b> 个评测</span
      >
      <span
        ><b>{{ categories.length }}</b> 类能力</span
      >
      <span
        ><b>{{ sampleCount }}</b> 条真实样例</span
      >
    </div>
  </section>
  <section class="container search-section" aria-label="搜索评测">
    <div class="search-box">
      <Icon name="search" :size="23" /><input
        aria-label="搜索评测"
        :value="q"
        @input="setFilter('q', ($event.target as HTMLInputElement).value)"
        placeholder="搜索评测名称、能力或发布方…"
      /><button
        v-if="q"
        class="icon-button"
        aria-label="清空搜索"
        @click="setFilter('q', '')"
      >
        <Icon name="close" :size="18" /></button
      ><span v-else class="search-hint">例如 GPQA / 数学 / OpenAI</span>
    </div>
    <button
      class="batch-button"
      :aria-expanded="batchOpen"
      @click="batchOpen = !batchOpen"
    >
      <Icon name="copy" :size="18" />批量查询评测
    </button>
    <div v-if="batchOpen" class="batch-panel">
      <div class="section-line">
        <div>
          <h3>批量查询评测</h3>
          <p>每行一个，也可以用逗号或分号分隔。最多识别 60 项。</p>
        </div>
        <button
          class="icon-button"
          aria-label="关闭批量查询"
          @click="batchOpen = false"
        >
          <Icon name="close" />
        </button>
      </div>
      <textarea
        aria-label="批量评测名称"
        v-model="batchInput"
        rows="3"
        placeholder="SWE-bench Verified, GPQA Diamond, AIME 2025"
      ></textarea>
      <div class="batch-results" aria-live="polite">
        <div v-for="row in batchResults" :key="row.input">
          <strong>{{ row.input }}</strong
          ><span v-if="!row.matches.length" class="muted">暂未收录</span
          ><span v-else-if="row.matches.length > 1" class="muted"
            >请选择具体条目：</span
          ><RouterLink
            v-for="match in row.matches"
            :key="match.id"
            :to="`/benchmarks/${match.id}/`"
            >{{ match.name }} <Icon name="up" :size="13"
          /></RouterLink>
        </div>
      </div>
    </div>
  </section>
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
        :class="{ active: !category }"
        @click="setFilter('category', '')"
      >
        <Icon name="grid" :size="18" /><span>全部评测</span
        ><small>{{ benchmarks.length }}</small></button
      ><button
        v-for="cat in categories"
        :key="cat.id"
        class="category-filter"
        :class="{ active: category === cat.id }"
        @click="setFilter('category', cat.id)"
      >
        <Icon :name="cat.glyph" :size="18" /><span>{{ cat.name }}</span
        ><small>{{
          benchmarks.filter((b) => b.category === cat.id).length
        }}</small>
      </button>
      <div class="filter-more">
        <label for="publisher">发布方</label
        ><select
          id="publisher"
          :value="publisher"
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
          :value="sampleStatus"
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
          :value="kind"
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
        ><span class="tip-link">查看指南 <Icon name="arrow" :size="15" /></span
      ></RouterLink>
    </aside>
    <section class="results-section">
      <div class="results-toolbar">
        <div>
          <h2>
            {{
              category
                ? categories.find((cat) => cat.id === category)?.name ||
                  "评测目录"
                : "全部评测"
            }}<span>{{ results.length }}</span>
          </h2>
          <p v-if="category">
            {{ categories.find((cat) => cat.id === category)?.description }}
          </p>
        </div>
        <div class="result-controls">
          <label class="sr-only" for="sort">排序方式</label
          ><select
            id="sort"
            :value="sort"
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
              :class="{ active: view === 'grid' }"
              aria-label="卡片视图"
              :aria-pressed="view === 'grid'"
              @click="setFilter('view', 'grid')"
            >
              <Icon name="grid" :size="17" /></button
            ><button
              :class="{ active: view === 'list' }"
              aria-label="列表视图"
              :aria-pressed="view === 'list'"
              @click="setFilter('view', 'list')"
            >
              <Icon name="list" :size="18" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="hasFilters" class="active-filters">
        <span
          >{{ q ? `搜索“${q}”` : "已应用筛选" }} ·
          {{ results.length }} 项结果</span
        ><button @click="reset">
          清空筛选 <Icon name="close" :size="13" />
        </button>
      </div>
      <div class="cards" :class="{ 'list-view': view === 'list' }">
        <BenchmarkCard v-for="item in results" :key="item.id" :item="item" />
      </div>
      <div v-if="!results.length" class="empty-state">
        <Icon name="search" :size="34" />
        <h3>未找到匹配的评测</h3>
        <p>试试英文简称，或放宽发布方和能力筛选。</p>
        <button class="primary-button" @click="reset">查看全部评测</button>
      </div>
      <p class="catalog-footnote">
        共 {{ sampleCount }} 条真实样例，覆盖 {{ localCount }} 个评测；其他条目注明样例获取方式与原始来源。
      </p>
    </section>
  </div>
</template>
