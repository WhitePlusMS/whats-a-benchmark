<script setup lang="ts">
import { computed } from "vue";
import { findCalvinCase, readCalvinRecord } from "../content/calvinExperience";
import type { TaskSample } from "../types/benchmark";
import CalvinWorkbench from "./CalvinWorkbench.vue";

const props = defineProps<{ sample: TaskSample }>();
const record = computed(() => {
  const entry = findCalvinCase(props.sample.id);
  return entry ? readCalvinRecord(props.sample.raw, entry.kind) : null;
});
</script>

<template>
  <div v-if="record" class="cv-pilot"><CalvinWorkbench :record="record" /></div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/calvin-pilot.css"></style>
