<script setup lang="ts">
import { computed } from "vue";
import {
  bfclAnnotation,
  bfclSource,
  findBfclCase,
  readBfclRecord,
} from "../content/bfclExperience";
import type { TaskSample } from "../types/benchmark";

const props = defineProps<{ sample: TaskSample }>();
const entry = computed(() => findBfclCase(props.sample.id));
const record = computed(() => readBfclRecord(props.sample.raw));
const annotation = computed(() => bfclAnnotation(props.sample.id));
</script>

<template>
  <div v-if="record && entry" class="bfcl-case-reference">
    <h4>可用工具</h4>
    <ul>
      <li v-for="tool in record.function" :key="tool.name">
        <code translate="no">{{ tool.name }}</code>
        <span>{{ tool.description }}</span>
      </li>
    </ul>
    <details v-if="annotation" class="case-visual-disclosure">
      <summary>查看官方参考调用</summary>
      <pre translate="no">{{
        JSON.stringify(annotation.ground_truth, null, 2)
      }}</pre>
      <a
        :href="bfclSource(entry, true)"
        target="_blank"
        rel="noreferrer"
        class="text-link"
        >查看官方标注来源 ↗</a
      >
    </details>
  </div>
</template>
<style scoped>
.bfcl-case-reference ul {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}
.bfcl-case-reference li {
  display: grid;
  gap: 3px;
  padding: 9px 0;
  border-bottom: 1px solid var(--border);
  overflow-wrap: anywhere;
}
.bfcl-case-reference li span {
  color: var(--text-secondary);
  font-size: 13px;
}
.bfcl-case-reference pre {
  margin-block: 12px;
  overflow: auto;
  color: var(--text-strong);
}
</style>
