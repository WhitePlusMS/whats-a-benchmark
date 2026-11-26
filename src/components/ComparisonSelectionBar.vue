<script setup lang="ts">
import { computed } from "vue";
import { byId } from "../content/catalog";
import { useComparison } from "../composables/compare";
import { COMPARISON_LIMIT } from "../lib/comparison";
import Icon from "./Icon.vue";

const { selected, toggle, clear } = useComparison();
const compareUrl = computed(() => ({
  path: "/compare/",
  query: { ids: selected.value.join(",") },
}));
</script>

<template>
  <section class="compare-dock" aria-label="已选评测">
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
      :to="compareUrl"
      :class="selected.length >= 2 ? 'primary-button' : 'secondary-button'"
      >{{ selected.length >= 2 ? "开始对比" : "查看已选" }}</RouterLink
    ><button
      v-if="selected.length >= 2"
      type="button"
      class="icon-button dock-clear"
      aria-label="清空对比"
      @click="clear"
    >
      清空
    </button>
  </section>
</template>
