<script setup lang="ts">
import { computed } from "vue";
import type { Source } from "../content/schema";
import Icon from "./Icon.vue";

const props = defineProps<{ sources: Source[]; urls: string[] }>();
const links = computed(() => {
  const byUrl = new Map(props.sources.map((source) => [source.url, source]));
  return [...new Set(props.urls)]
    .map((url) => byUrl.get(url))
    .filter((source): source is Source => !!source);
});
</script>

<template>
  <div class="evidence-links" aria-label="本段官方依据">
    <span>官方依据</span>
    <a
      v-for="source in links"
      :key="source.url"
      :href="source.url"
      target="_blank"
      rel="noreferrer"
      >{{ source.label }} <Icon name="up" :size="12"
    /></a>
  </div>
</template>

<style scoped>
.evidence-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 16px;
  color: var(--muted);
  font-size: 11px;
}
.evidence-links > span {
  font-weight: 600;
}
.evidence-links a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: white;
}
.evidence-links a:hover {
  color: var(--accent);
  border-color: #b8b0dc;
}
</style>
