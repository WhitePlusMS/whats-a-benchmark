<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useRoute } from "vue-router";
import { comparisonKey } from "./composables/compare";
import { byId } from "./content/catalog";
import Icon from "./components/Icon.vue";
import { useCatalogNavigation } from "./composables/catalogNavigation";
const route = useRoute();
const { catalogLocation } = useCatalogNavigation();
// State belongs to this application instance so static rendering cannot leak selections.
const selected = ref<string[]>([]);
const notice = ref("");
function toggle(id: string) {
  notice.value = "";
  if (selected.value.includes(id))
    selected.value = selected.value.filter((value) => value !== id);
  else if (selected.value.length < 3) selected.value.push(id);
  else notice.value = "最多对比 3 个评测，请先移除一个。";
}
function clear() {
  selected.value = [];
  notice.value = "";
}
provide(comparisonKey, { selected, toggle, clear, notice });
const compareUrl = computed(() => ({
  path: "/compare/",
  query: { ids: selected.value.join(",") },
}));
</script>

<template>
  <a class="skip-link" href="#main-content">跳到正文</a>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="what's a benchmark? 首页"
        ><svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
          <rect width="40" height="40" rx="11" fill="currentColor" />
          <path
            d="M10 12h7l3 3 3-3h7v17h-7l-3 3-3-3h-7zM20 15v16"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linejoin="round"
          /></svg
        ><span>what's a benchmark? <span aria-hidden="true">🚀</span><small>到底测什么？</small></span></RouterLink
      >
      <nav class="main-nav" aria-label="主导航">
        <RouterLink
          :to="route.path === '/' ? route.fullPath : catalogLocation"
          :class="{
            active: route.path === '/' || route.path.startsWith('/benchmarks/'),
          }"
          >评测目录</RouterLink
        ><RouterLink to="/releases/">发布资料</RouterLink
        ><RouterLink to="/guide/">阅读指南</RouterLink>
      </nav>
      <RouterLink to="/about/" class="about-link"
        >关于 <Icon name="up" :size="16"
      /></RouterLink>
    </div>
  </header>
  <main id="main-content"><RouterView /></main>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">what's a benchmark?<span>到底测什么？</span></div>
      <div>
        <RouterLink to="/about/">来源与收录规范</RouterLink
        ><span>任务 · 样例 · 指标 · 版本</span>
      </div>
    </div>
  </footer>
  <div v-if="selected.length" class="compare-dock" aria-label="已选评测">
    <div class="dock-heading">
      <Icon name="compare" /><strong
        >评测对比 <span>{{ selected.length }}/3</span></strong
      >
    </div>
    <div class="dock-items">
      <button
        v-for="id in selected"
        :key="id"
        @click="toggle(id)"
        :aria-label="`移出对比：${byId.get(id)?.name}`"
      >
        {{ byId.get(id)?.name }}<Icon name="close" :size="14" />
      </button>
    </div>
    <RouterLink
      v-if="selected.length >= 2"
      :to="compareUrl"
      class="primary-button"
      >开始对比 <Icon name="arrow" :size="16" /></RouterLink
    ><span v-else class="muted dock-instruction">再选择 1 个评测</span
    ><button class="icon-button" @click="clear" aria-label="清空对比">
      <Icon name="close" :size="18" />
    </button>
    <p v-if="notice" role="status" class="dock-notice">{{ notice }}</p>
  </div>
</template>
