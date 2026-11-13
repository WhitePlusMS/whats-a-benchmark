<script setup lang="ts">
import { computed } from "vue";
import {
  findIfevalCase,
  readIfevalRecord,
  ruleLabels,
} from "../content/ifevalExperience";
import type { TaskSample } from "../types/benchmark";
import IfevalWorkbench from "./IfevalWorkbench.vue";

const props = defineProps<{ sample: TaskSample }>();
const entry = computed(() => findIfevalCase(props.sample.id));
const record = computed(() => readIfevalRecord(props.sample.raw));
</script>

<template>
  <div v-if="entry && record && record.key === entry.key" class="if-pilot">
    <h4>检查器收到的条件</h4>
    <ol class="if-case-rules">
      <li v-for="(id, i) in record.instruction_id_list" :key="id">
        {{ ruleLabels[id] }} <code>{{ JSON.stringify(record.kwargs[i]) }}</code>
      </li>
    </ol>
    <details class="case-visual-disclosure">
      <summary>试用格式检查</summary>
      <IfevalWorkbench :record="record" :sample-id="sample.id" />
    </details>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/ifeval-pilot.css"></style>
