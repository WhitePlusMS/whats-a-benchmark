<script setup lang="ts">
import { computed } from "vue";
import { findSweBenchCase } from "../content/sweBenchExperience";
import type { TaskSample } from "../types/benchmark";

const props = defineProps<{ sample: TaskSample }>();
const activeCase = computed(() => findSweBenchCase(props.sample.id));
</script>

<template>
  <figure v-if="activeCase" class="swe-pilot">
    <figcaption>{{ activeCase.investigation }}</figcaption>
    <div class="diagram-window">
      <div v-if="activeCase.visual === 'matrix'" class="matrix-scene">
        <div
          class="matrix-pair"
          role="img"
          aria-label="题面中的右下二乘二矩阵：平铺时对角线为真，嵌套时四格均为真"
        >
          <div>
            <span>平铺写法</span>
            <div class="matrix-grid">
              <b
                v-for="(cell, index) in [true, false, false, true]"
                :key="index"
                :class="{ filled: cell }"
                >{{ cell ? "T" : "·" }}</b
              >
            </div>
          </div>
          <span class="diagram-arrow" aria-hidden="true">→</span>
          <div>
            <span>嵌套写法</span>
            <div class="matrix-grid">
              <b v-for="index in 4" :key="index" class="filled">T</b>
            </div>
          </div>
        </div>
        <p>T 表示存在依赖 · 展示原题矩阵右下 2 × 2</p>
      </div>
      <div
        v-else-if="activeCase.visual === 'missing-column'"
        class="diagram-flow"
      >
        <div class="column-pair">
          <span>time</span><span class="removed">flux</span>
        </div>
        <span class="flow-caption">原题中删除必需列 flux</span>
        <div class="issue-message">expected 'time' … found 'time'</div>
        <span class="flow-caption">题面记录的异常信息</span>
      </div>
      <div v-else-if="activeCase.visual === 'migration'" class="diagram-flow">
        <div class="flow-row">
          <span>structured ndarray</span><b>→</b><span>NdarrayMixin</span>
        </div>
        <span class="flow-caption">题面描述的现有行为</span>
        <div class="flow-row">
          <span>FutureWarning</span><b>→</b><span>Column</span>
        </div>
        <span class="flow-caption">题面提案：先提醒，后续版本再调整</span>
      </div>
      <div v-else class="diagram-flow">
        <div class="flow-row">
          <span>ITRS</span><b>→</b><span>站心位置</span><b>→</b
          ><span>AltAz / HADec</span>
        </div>
        <span class="flow-caption">题面讨论的坐标变换关系</span>
      </div>
    </div>
  </figure>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/swe-bench-pilot.css"></style>
