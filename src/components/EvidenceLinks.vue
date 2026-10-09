<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { Source } from "../content/schema";
import { sourceReference } from "../lib/sourceReferences";
import { sourceRoleLabels } from "../content/labels";
import UiTooltip from "./UiTooltip.vue";

const props = defineProps<{
  sources: Source[];
  urls: string[];
  excludeUrls?: string[];
}>();
const route = useRoute();
const links = computed(() => {
  const byUrl = new Map(
    props.sources.map((source, index) => [
      source.url,
      sourceReference(source, index),
    ]),
  );
  return [...new Set(props.urls)]
    .filter((url) => !props.excludeUrls?.includes(url))
    .flatMap((url) => {
      const reference = byUrl.get(url);
      return reference ? [{ ...reference, host: new URL(url).hostname }] : [];
    });
});
</script>

<template>
  <sup v-if="links.length" class="evidence-links" aria-label="本段参考资料">
    <UiTooltip v-for="reference in links" :key="reference.id">
      <template #default="{ describedBy }">
        <RouterLink
          :to="{
            path: route.path,
            query: route.query,
            hash: `#${reference.id}`,
          }"
          :aria-describedby="describedBy"
          :aria-label="`参考资料 ${reference.number}：${reference.source.label}`"
          >[{{ reference.number }}]</RouterLink
        >
      </template>
      <template #content>
        <span class="ui-tooltip-kicker"
          >参考资料 [{{ reference.number }}] ·
          {{ sourceRoleLabels[reference.source.role] }}</span
        >
        <strong>{{ reference.source.label }}</strong>
        <span class="ui-tooltip-meta" translate="no">{{ reference.host }}</span>
      </template>
    </UiTooltip>
  </sup>
</template>

<style scoped>
.evidence-links {
  display: inline;
  vertical-align: super;
  margin-inline-start: 3px;
  color: var(--accent-text);
  font-size: 11px;
  line-height: 1;
}
.evidence-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  padding: 2px 3px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}
.evidence-links a:hover,
.evidence-links a:focus-visible {
  color: var(--accent-text);
  background: var(--accent-softer);
}
</style>
