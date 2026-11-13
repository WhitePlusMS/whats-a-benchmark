<script setup lang="ts">
import { computed } from "vue";
import type { TaskSample } from "../types/benchmark";
import { sampleSourceText } from "../lib/sampleSourceText";

const props = defineProps<{ sample: TaskSample }>();
const guide = computed(() => props.sample.walkthrough);
const sourceText = computed(() =>
  sampleSourceText(props.sample.raw, guide.value?.sourceField),
);
</script>

<template>
  <div v-if="guide" class="task-walkthrough">
    <p class="guide-summary">{{ guide.summary || sample.prompt }}</p>
    <dl class="task-contract">
      <div>
        <dt>模型拿到什么</dt>
        <dd>{{ guide.input }}</dd>
      </div>
      <div>
        <dt>需要交付什么</dt>
        <dd>{{ guide.output }}</dd>
      </div>
    </dl>
    <section class="task-checks" aria-label="完成条件">
      <h4>怎样才算完成</h4>
      <ul>
        <li v-for="check in guide.checks" :key="check">{{ check }}</li>
      </ul>
    </section>
    <slot />
    <p class="task-boundary">{{ guide.note }}</p>
    <details class="task-original task-evidence">
      <summary>查看来源节选</summary>
      <figure v-for="part in guide.excerpts" :key="part.label">
        <figcaption>{{ part.label }} <span>原文节选</span></figcaption>
        <pre tabindex="0" :aria-label="part.label" translate="no">{{
          part.text
        }}</pre>
      </figure>
    </details>
    <details class="task-original">
      <summary>
        查看本条来源原文<span v-if="guide.sourceField">
          · {{ guide.sourceField }}</span
        >
      </summary>
      <p>
        保留来源文本与格式；上方中文导读和片段标题由本站整理。完整记录字段可切换至“原始数据”。
      </p>
      <pre tabindex="0" aria-label="来源原文" translate="no">{{
        sourceText
      }}</pre>
    </details>
  </div>
</template>

<style scoped>
.guide-summary {
  margin: 0 0 22px;
  color: var(--text-strong);
  font-size: 15px;
  line-height: 1.9;
}
.task-contract {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0 0 24px;
}
.task-contract > div {
  background: var(--surface-subtle);
  border: 1px solid var(--border);
  border-radius: var(--ui-control-radius);
  padding: 15px;
}
.task-contract dt,
.task-checks h4 {
  margin: 0 0 10px;
  color: var(--text-strong);
  font-size: 13px;
  font-weight: 600;
}
.task-contract dd {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--ui-text-body);
  line-height: 1.7;
  overflow-wrap: anywhere;
}
.task-evidence figure {
  margin: 10px 0 16px;
  border: 1px solid var(--border);
  border-radius: var(--ui-control-radius);
  overflow: hidden;
}
.task-evidence figcaption {
  padding: 10px 13px;
  background: var(--surface-subtle);
  color: var(--text-strong);
  font-size: 12px;
  line-height: 1.7;
}
.task-evidence figcaption > span {
  display: inline-block;
  color: var(--muted);
  font-size: var(--ui-text-meta);
  margin-left: 8px;
}
.task-evidence pre,
.task-original pre {
  margin: 0;
  padding: 14px;
  font:
    12px/1.8 "Cascadia Code",
    Consolas,
    monospace;
  color: var(--text-strong);
  background: var(--surface);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  overflow: auto;
}
.task-checks {
  margin-top: 0;
  padding-left: 14px;
  border-left: 3px solid var(--accent-border-strong);
}
.task-checks ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-secondary);
  font-size: var(--ui-text-body);
  line-height: 1.7;
}
.task-checks li + li {
  margin-top: 7px;
}
.task-boundary {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.85;
  margin: 18px 0 22px;
}
.task-original {
  border-top: 1px solid var(--border);
  padding-top: 15px;
}
.task-original summary {
  cursor: pointer;
  color: var(--accent-text);
  font-size: 12px;
  line-height: 1.8;
}
.task-original summary span {
  color: var(--muted);
  overflow-wrap: anywhere;
}
.task-original p {
  margin: 12px 0;
  font-size: 12px;
  line-height: 1.8;
  color: var(--muted);
}
.task-original pre {
  max-height: 480px;
  background: var(--surface-sunken);
  border-radius: 6px;
}
@media (max-width: 600px) {
  .task-contract {
    grid-template-columns: 1fr;
  }
  .guide-summary {
    font-size: 14px;
  }
}
</style>
