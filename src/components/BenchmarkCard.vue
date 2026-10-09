<script setup lang="ts">
import type { Benchmark } from "../types/benchmark";
import { kindLabels } from "../content/catalog";
import { researchStatusLabels } from "../content/labels";
import { useComparison } from "../composables/compare";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";
defineProps<{ item: Benchmark }>();
const { selected, toggle } = useComparison();
</script>
<template>
  <article class="benchmark-card">
    <div class="card-top">
      <PublisherMarks :benchmark-id="item.id" :publisher="item.publisher" />
      <div class="card-badges">
        <span class="kind-label">{{ kindLabels[item.kind] }}</span>
        <span
          v-if="
            item.researchStatus === 'partial' ||
            item.researchStatus === 'blocked'
          "
          class="kind-label evidence-state"
          >{{ researchStatusLabels[item.researchStatus] }}</span
        >
      </div>
    </div>
    <RouterLink :to="`/benchmarks/${item.id}/`" class="card-title"
      ><h3 translate="no">{{ item.name }}</h3>
      <Icon name="up" :size="18"
    /></RouterLink>
    <p class="card-tldr">{{ item.subtitle }}</p>
    <p class="card-summary">{{ item.officialDefinition.summary }}</p>
    <div class="tags">
      <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="card-meta">
      <span :title="item.publisher" translate="no">{{ item.publisher }}</span
      ><span>{{ item.year || "年份待考" }}</span>
    </div>
    <div class="card-actions">
      <RouterLink :to="`/benchmarks/${item.id}/#samples`"
        ><Icon name="file" :size="15" />{{
          item.composition
            ? "查看组成样例"
            : item.sampleAccess.status === "local"
              ? "查看真实题目"
              : "查看样例获取方式"
        }}<Icon name="arrow" :size="15" /></RouterLink
      ><button
        class="compare-toggle"
        :class="{ chosen: selected.includes(item.id) }"
        :aria-label="`${selected.includes(item.id) ? '移出' : '加入'}对比：${item.name}`"
        :aria-pressed="selected.includes(item.id)"
        @click="toggle(item.id)"
      >
        <Icon :name="selected.includes(item.id) ? 'tick' : 'plus'" :size="16" />
        <span>{{ selected.includes(item.id) ? "已选" : "对比" }}</span>
      </button>
    </div>
  </article>
</template>

<!-- 列表模式依赖目录父容器，因此保留明确类名的非 scoped 规则。 -->
<style src="../styles/benchmark-card.css"></style>
