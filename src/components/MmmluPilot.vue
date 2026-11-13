<script setup lang="ts">
import { computed } from "vue";
import { findMmmluCase } from "../content/mmmluExperience";
import type { TaskSample } from "../types/benchmark";
import MmmluScene from "./MmmluScene.vue";

const props = defineProps<{ sample: TaskSample; revealed: boolean }>();
const entry = computed(() => findMmmluCase(props.sample.id));
</script>

<template>
  <div v-if="entry && revealed" class="mm-pilot">
    <MmmluScene :kind="entry.kind" :revealed="revealed" />
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/mmmlu-pilot.css"></style>
