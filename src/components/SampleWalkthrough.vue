<script setup lang="ts">
import { computed } from "vue";
import type { TaskSample } from "../types/benchmark";

const props = defineProps<{ sample: TaskSample }>();
const guide = computed(() => props.sample.walkthrough);
const sourceText = computed(() => {
  const raw = props.sample.raw;
  return typeof raw === "string" ? raw : raw[guide.value?.sourceField || ""];
});
</script>

<template>
  <div v-if="guide" class="task-walkthrough">
    <p class="guide-label">任务导读 · 本站整理</p>
    <p class="guide-summary">{{ sample.prompt }}</p>
    <dl class="task-contract">
      <div>
        <dt><span aria-hidden="true">01</span> 模型拿到什么</dt>
        <dd>{{ guide.input }}</dd>
      </div>
      <div>
        <dt><span aria-hidden="true">02</span> 需要交付什么</dt>
        <dd>{{ guide.output }}</dd>
      </div>
    </dl>
    <section class="task-evidence" aria-label="原题关键片段">
      <p class="guide-label">沿着原题看问题</p>
      <figure v-for="part in guide.excerpts" :key="part.label">
        <figcaption>{{ part.label }} <span>原文节选</span></figcaption>
        <pre tabindex="0" :aria-label="part.label" translate="no">{{
          part.text
        }}</pre>
      </figure>
    </section>
    <section class="task-checks" aria-label="完成条件">
      <h4><span aria-hidden="true">03</span> 怎样才算完成</h4>
      <ul>
        <li v-for="check in guide.checks" :key="check">{{ check }}</li>
      </ul>
    </section>
    <p class="task-boundary">{{ guide.note }}</p>
    <details class="task-original">
      <summary>
        查看本条问题原文<span v-if="guide.sourceField">
          · {{ guide.sourceField }}</span
        >
      </summary>
      <p>
        保留来源文本与格式；上方中文导读和片段标题由本站整理。完整记录字段可切换至“原始数据”。
      </p>
      <pre tabindex="0" aria-label="问题原文" translate="no">{{
        sourceText
      }}</pre>
    </details>
  </div>
</template>

<style scoped>
.guide-label {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 12px;
}
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
  border-radius: 8px;
  padding: 15px;
}
.task-contract dt,
.task-checks h4 {
  margin: 0 0 10px;
  color: var(--text-strong);
  font-size: 13px;
  font-weight: 600;
}
.task-contract dt > span,
.task-checks h4 > span {
  color: var(--accent-text);
  margin-right: 8px;
  font-variant-numeric: tabular-nums;
}
.task-contract dd {
  margin: 0;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.85;
  overflow-wrap: anywhere;
}
.task-evidence figure {
  margin: 0 0 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
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
  font-size: 10px;
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
  margin-top: 24px;
  padding-left: 14px;
  border-left: 3px solid var(--accent-border-strong);
}
.task-checks ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.85;
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
