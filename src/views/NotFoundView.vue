<script setup lang="ts">
import { useHead } from "@unhead/vue";
useHead({ title: "页面未找到 · what's a benchmark?" });
</script>
<template>
  <div class="container empty-state not-found">
    <span class="eyebrow">404 / NOT FOUND</span>
    <h1>这条探索路径还不存在。</h1>
    <p>可以回到目录，搜索你想了解的评测。</p>
    <RouterLink class="primary-button" to="/">返回评测目录</RouterLink>
  </div>
</template>
