<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { comparisonKey, createComparison } from "./composables/compare";
import { byId } from "./content/catalog";
import Icon from "./components/Icon.vue";
import ComparisonSelectionBar from "./components/ComparisonSelectionBar.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import { initTheme, useTheme } from "./lib/theme";
import { useCatalogNavigation } from "./composables/catalogNavigation";
// 引用同一份 SVG 的图形片段，使页眉可继承主题变量；独立 favicon 使用默认配色。
const brandLogoUrl = `${import.meta.env.BASE_URL}favicon.svg`;
const route = useRoute();
const isEmbodiedDetail = computed(
  () => !!byId.get(String(route.meta.benchmarkId || ""))?.embodied,
);
const { catalogLocation, embodiedLocation } = useCatalogNavigation();
initTheme();
const { colorModeIcon, colorModeLabel, cycleColorMode } = useTheme();
// Own selection state per application and dispose the navigation subscription.
const comparison = createComparison(useRouter());
const { selected } = comparison;
const isCatalog = computed(() => ["/", "/embodied/"].includes(route.path));
const showCompareDock = computed(
  () => selected.value.length > 0 && !/^\/compare\/?$/.test(route.path),
);
provide(comparisonKey, comparison);
onMounted(comparison.activate);
onUnmounted(comparison.dispose);
</script>

<template>
  <a class="skip-link" href="#main-content">跳到正文</a>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="what's a benchmark? 首页"
        ><svg
          viewBox="0 0 256 256"
          width="36"
          height="36"
          aria-hidden="true"
          focusable="false"
        >
          <use :href="`${brandLogoUrl}#brand-mark`" /></svg
        ><span translate="no"
          >what's a benchmark?<small>到底测什么？</small></span
        ></RouterLink
      >
      <nav class="main-nav" aria-label="主导航">
        <div class="catalog-switch">
          <RouterLink
            :to="route.path === '/' ? route.fullPath : catalogLocation"
            :class="{
              active:
                route.path === '/' ||
                (route.path.startsWith('/benchmarks/') && !isEmbodiedDetail),
            }"
            :aria-current="
              route.path === '/' ||
              (route.path.startsWith('/benchmarks/') && !isEmbodiedDetail)
                ? 'page'
                : undefined
            "
            ><Icon name="sparkle" :size="16" />模型评测</RouterLink
          >
          <RouterLink
            :to="
              route.path === '/embodied/' ? route.fullPath : embodiedLocation
            "
            :class="{ active: route.path === '/embodied/' || isEmbodiedDetail }"
            :aria-current="
              route.path === '/embodied/' || isEmbodiedDetail
                ? 'page'
                : undefined
            "
            ><Icon name="robot" :size="16" />具身评测</RouterLink
          >
        </div>
      </nav>
      <div class="header-actions">
        <RouterLink to="/guide/" class="secondary-button header-guide">
          <Icon name="book" :size="16" />评测入门
        </RouterLink>
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
          <svg
            viewBox="0 0 16 16"
            width="19"
            height="19"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
  <main id="main-content"><RouterView /></main>
  <footer
    class="site-footer"
    :class="{
      'with-compare-dock': showCompareDock,
      'catalog-footer': isCatalog,
    }"
  >
    <div class="container footer-inner">
      <div class="footer-brand" translate="no">
        what's a benchmark?<span>读懂每个 benchmark 到底测什么</span>
      </div>
      <nav class="footer-links" aria-label="页脚导航">
        <RouterLink to="/guide/">评测入门</RouterLink>
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
  <ComparisonSelectionBar
    v-if="showCompareDock"
    :class="{ 'catalog-compare-dock': isCatalog }"
  />
</template>
