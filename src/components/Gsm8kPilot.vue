<script setup lang="ts">
import { computed } from "vue";
import { findGsm8kCase } from "../content/gsm8kExperience";
import type { TaskSample } from "../types/benchmark";
import Gsm8kScene from "./Gsm8kScene.vue";

const props = defineProps<{ sample: TaskSample; revealed: boolean }>();
const entry = computed(() => findGsm8kCase(props.sample.id));
</script>

<template>
  <details v-if="entry?.kind === 'download'" class="case-visual-disclosure">
    <summary>查看下载时间轴</summary>
    <Gsm8kScene :entry="entry" :step="revealed ? 3 : 0" />
  </details>
</template>
