<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useCatalogNavigation } from "../composables/catalogNavigation";
useHead({ title: "页面未找到 · what's a benchmark?" });
const { catalogLocation, embodiedLocation, lastCatalog } = useCatalogNavigation();
</script>
<template>
  <div class="container empty-state not-found">
    <h1>找不到这个页面</h1>
    <p>返回评测目录，可以按名称搜索。</p>
    <RouterLink
      class="primary-button"
      :to="lastCatalog === 'embodied' ? embodiedLocation : catalogLocation"
      >返回评测目录</RouterLink
    >
  </div>
</template>
