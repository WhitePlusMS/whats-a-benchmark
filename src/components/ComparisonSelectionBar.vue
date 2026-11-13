<script setup lang="ts">
import { computed } from "vue";
import { byId } from "../content/catalog";
import { useComparison } from "../composables/compare";
import { COMPARISON_LIMIT } from "../lib/comparison";
import Icon from "./Icon.vue";

defineProps<{ inline?: boolean }>();
const { selected, notice, toggle, clear } = useComparison();
const compareUrl = computed(() => ({
  path: "/compare/",
  query: { ids: selected.value.join(",") },
}));
</script>

<template>
  <div
    v-if="selected.length"
    class="compare-dock"
    :class="{ 'compare-dock-inline': inline }"
    aria-label="已选评测"
  >
    <div class="dock-heading">
      <Icon name="compare" /><strong
        >评测对比
        <span>{{ selected.length }}/{{ COMPARISON_LIMIT }}</span></strong
      >
    </div>
    <div v-if="!inline" class="dock-items">
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
      >开始对比</RouterLink
    ><span v-else class="muted dock-instruction">再选择 1 个评测</span
    ><button class="icon-button" @click="clear" aria-label="清空对比">
      <Icon name="close" :size="18" />
    </button>
    <p v-if="notice" role="status" class="dock-notice">{{ notice }}</p>
  </div>
</template>
