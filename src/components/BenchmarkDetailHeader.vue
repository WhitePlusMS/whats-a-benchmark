<script setup lang="ts">
import { computed } from "vue";
import { kindLabels } from "../content/catalog";
import { benchmarkDetailIntros } from "../content/benchmarkDetailIntros";
import { sampleAction } from "../lib/sampleAccess";
import type { Benchmark } from "../types/benchmark";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";

const props = defineProps<{
  item: Benchmark;
  categoryName?: string;
  selected: boolean;
}>();
defineEmits<{ toggle: [] }>();

const intro = computed(() => benchmarkDetailIntros[props.item.id]);
const context = computed(
  () =>
    intro.value?.context ??
    [kindLabels[props.item.kind], props.categoryName]
      .filter(Boolean)
      .join(" · "),
);
const titleAccent = computed(() => {
  const accent = intro.value?.accent;
  return accent && props.item.name.endsWith(accent) ? accent : "";
});
const titleStart = computed(() =>
  titleAccent.value
    ? props.item.name.slice(0, -titleAccent.value.length)
    : props.item.name,
);
const action = computed(() => sampleAction(props.item));
</script>

<template>
  <header class="benchmark-detail-header">
    <div class="benchmark-header-context">
      <PublisherMarks
        :benchmark-id="item.id"
        :publisher="item.publisher"
        large
      />
      <span>{{ context }}</span>
    </div>
    <h1 translate="no">
      {{ titleStart }}<span v-if="titleAccent">{{ titleAccent }}</span>
    </h1>
    <p class="benchmark-header-lead">{{ intro?.lead ?? item.subtitle }}</p>
    <p class="benchmark-header-summary">
      {{ intro?.summary ?? item.officialDefinition.summary }}
    </p>
    <div class="benchmark-header-actions">
      <a href="#samples" class="primary-button">
        {{ action }}
        <Icon name="down" :size="16" />
      </a>
      <a href="#score" class="benchmark-header-link">
        了解评分方式 <Icon name="down" :size="15" />
      </a>
      <button
        v-if="item.status === 'published'"
        type="button"
        class="benchmark-header-compare"
        :aria-pressed="selected"
        @click="$emit('toggle')"
      >
        <Icon name="compare" :size="17" />
        {{ selected ? "已加入对比" : "加入对比" }}
      </button>
    </div>
    <p v-if="item.id === 'human-eval'" class="benchmark-header-note">
      官方已停止维护，仅供历史参考。<a
        href="https://github.com/openai/human-eval/blob/b9453e8f1865df0a0057a1383767caa400acfbcf/README.md#L3-L5"
        target="_blank"
        rel="noreferrer"
        >核对官方说明 ↗</a
      >
    </p>
  </header>
</template>

<style scoped>
.benchmark-detail-header {
  padding: 28px 0 34px;
}
.benchmark-header-context {
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--accent-text);
  font-size: 12px;
  font-weight: 650;
}
.benchmark-header-context > span:last-child {
  min-width: 0;
  overflow-wrap: anywhere;
}
.benchmark-detail-header h1 {
  margin-top: 18px;
  color: var(--text-strong);
  font-size: clamp(36px, 4vw, 50px);
  line-height: 1.1;
  letter-spacing: -0.045em;
  overflow-wrap: anywhere;
}
.benchmark-detail-header h1 span,
.benchmark-header-note a {
  color: var(--accent-text);
}
.benchmark-header-lead {
  margin-top: 16px;
  color: var(--text-strong);
  font-size: clamp(18px, 1.6vw, 21px);
  font-weight: 650;
  letter-spacing: -0.02em;
}
.benchmark-header-summary {
  max-width: 730px;
  margin-top: 9px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.9;
}
.benchmark-header-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-top: 21px;
}
.benchmark-header-actions .primary-button {
  gap: 8px;
}
.benchmark-header-link,
.benchmark-header-compare {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: var(--ui-touch-target);
  font-size: 13px;
  font-weight: 600;
}
.benchmark-header-link,
.benchmark-header-compare[aria-pressed="true"] {
  color: var(--accent-text);
}
.benchmark-header-compare {
  color: var(--text-secondary);
}
.benchmark-header-link:hover,
.benchmark-header-compare:hover {
  color: var(--text-strong);
}
.benchmark-header-note {
  margin-top: 12px;
  color: var(--muted);
  font-size: 12px;
}
@media (max-width: 700px) {
  .benchmark-detail-header {
    padding: 22px 0 28px;
  }
  .benchmark-detail-header h1 {
    font-size: clamp(32px, 8vw, 42px);
  }
}
</style>
