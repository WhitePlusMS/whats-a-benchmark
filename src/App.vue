<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { comparisonKey, createComparison } from "./composables/compare";
import { COMPARISON_LIMIT } from "./lib/comparison";
import { byId } from "./content/catalog";
import Icon from "./components/Icon.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import { initTheme, useTheme } from "./lib/theme";
import { useCatalogNavigation } from "./composables/catalogNavigation";
const route = useRoute();
const { catalogLocation } = useCatalogNavigation();
initTheme();
const { colorModeIcon, colorModeLabel, cycleColorMode } = useTheme();
// Own selection state per application and dispose the navigation subscription.
const comparison = createComparison(useRouter());
const { selected, notice, toggle, clear } = comparison;
provide(comparisonKey, comparison);
onMounted(comparison.activate);
onUnmounted(comparison.dispose);
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
        ><span translate="no"
          >what's a benchmark?<small>到底测什么？</small></span
        ></RouterLink
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
      <div class="header-actions">
        <ThemeSwitcher />
        <button
          class="icon-button"
          :aria-label="`外观${colorModeLabel}，点击切换`"
          :title="`外观：${colorModeLabel}`"
          @click="cycleColorMode"
        >
          <Icon :name="colorModeIcon" :size="18" />
        </button>
        <a
          class="icon-button"
          href="https://github.com/WhitePlusMS/whats-a-benchmark"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub 仓库"
          title="GitHub 仓库"
        >
          <svg viewBox="0 0 16 16" width="19" height="19" fill="currentColor" aria-hidden="true">
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
  <main id="main-content"><RouterView /></main>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand" translate="no">
        what's a benchmark?<span>读懂每个 benchmark 到底测什么</span>
      </div>
      <nav class="footer-links" aria-label="页脚导航">
        <RouterLink to="/guide/">阅读指南</RouterLink>
        <RouterLink to="/releases/">发布资料</RouterLink>
        <RouterLink to="/about/">来源与收录规范</RouterLink>
        <a
          href="https://github.com/WhitePlusMS/whats-a-benchmark"
          target="_blank"
          rel="noreferrer"
          >GitHub</a
        >
      </nav>
    </div>
    <div class="container footer-note">
      由
      <a href="https://github.com/WhitePlusMS" target="_blank" rel="noreferrer"
        >WhitePlusMS</a
      >
      维护 · 内容以官方来源为准 · 通过
      <a
        href="https://github.com/WhitePlusMS/whats-a-benchmark/issues"
        target="_blank"
        rel="noreferrer"
        >GitHub Issues</a
      >
      提交纠错
    </div>
  </footer>
  <div v-if="selected.length" class="compare-dock" aria-label="已选评测">
    <div class="dock-heading">
      <Icon name="compare" /><strong
        >评测对比
        <span>{{ selected.length }}/{{ COMPARISON_LIMIT }}</span></strong
      >
    </div>
    <div class="dock-items">
      <button
        v-for="id in selected"
        :key="id"
        @click="toggle(id)"
        :aria-label="`移出对比：${byId.get(id)?.name}`"
      >
        <span translate="no">{{ byId.get(id)?.name }}</span
        ><Icon name="close" :size="14" />
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
