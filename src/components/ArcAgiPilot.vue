<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { gridDifferences, gridSize } from "../lib/arcGrid";
import type { TaskSample } from "../types/benchmark";
import ArcGrid from "./ArcGrid.vue";
import ArcPractice from "./ArcPractice.vue";

const props = defineProps<{ sample: TaskSample }>();
const pairIndex = ref(0);
const showDifferences = ref(false);
const numbers = ref(false);
const task = computed(() => props.sample.gridTask);
const pair = computed(() => task.value?.train[pairIndex.value]);
const differences = computed(() =>
  pair.value ? gridDifferences(pair.value.input, pair.value.output) : null,
);
const differenceCount = computed(
  () => differences.value?.flat().filter(Boolean).length,
);
watch(pairIndex, () => {
  showDifferences.value = false;
});
</script>

<template>
  <div v-if="task && pair" class="arc-pilot">
    <article
      id="arc-observation"
      class="arc-observation"
      :aria-label="`观察公开训练题 ${sample.id}`"
    >
      <div class="arc-observation-head">
        <div>
          <span class="arc-eyebrow">官方示范 · {{ sample.id }}</span>
          <h3>输入 → 输出</h3>
        </div>
        <div class="arc-observation-controls">
          <label><input v-model="numbers" type="checkbox" /> 显示颜色编号</label
          ><button
            class="arc-tool"
            type="button"
            :disabled="!differences"
            :aria-pressed="showDifferences"
            @click="showDifferences = !showDifferences"
          >
            {{ showDifferences ? "隐藏变化标记" : "标出变化位置" }}
          </button>
        </div>
      </div>
      <div class="arc-inspect-layout">
        <aside class="arc-example-rail">
          <span class="arc-eyebrow"
            >交叉核对 {{ task.train.length }} 组示范</span
          >
          <div
            class="arc-example-selector"
            role="group"
            aria-label="选择示范配对"
          >
            <button
              v-for="(example, index) in task.train"
              :key="index"
              type="button"
              :aria-pressed="pairIndex === index"
              :class="{ active: pairIndex === index }"
              aria-controls="arc-example-pair"
              @click="pairIndex = index"
            >
              <span>示范 {{ index + 1 }}</span
              ><small
                >{{ example.input.length }} × {{ example.input[0].length }} →
                {{ example.output.length }} ×
                {{ example.output[0].length }}</small
              >
            </button>
          </div>
          <p>每组都要成立。某一组看起来像，不足以确定规则。</p>
        </aside>
        <div
          id="arc-example-pair"
          class="arc-example-pair"
          :key="`${sample.id}:${pairIndex}`"
        >
          <div class="arc-grid-pair">
            <figure>
              <figcaption>
                输入 <span>{{ gridSize(pair.input) }}</span>
              </figcaption>
              <ArcGrid
                :grid="pair.input"
                :label="`示范 ${pairIndex + 1} 输入`"
                :numbers="numbers"
                :differences="showDifferences ? differences : null"
              />
            </figure>
            <span class="arc-pair-arrow" aria-hidden="true">→</span>
            <figure>
              <figcaption>
                输出 <span>{{ gridSize(pair.output) }}</span>
              </figcaption>
              <ArcGrid
                :grid="pair.output"
                :label="`示范 ${pairIndex + 1} 输出`"
                :numbers="numbers"
                :differences="showDifferences ? differences : null"
              />
            </figure>
          </div>
          <p class="arc-pair-caption" aria-live="polite">
            {{
              differences
                ? showDifferences
                  ? `白框标出 ${differenceCount} 个发生变化的位置；颜色仍是原始值，不推断变化规则。`
                  : "两张网格尺寸相同。可以标出同一位置上取值改变的格子。"
                : "输出尺寸变了。两张网格按各自尺寸展示，不将放大后的画面对齐，也不把它当作逐格变化。"
            }}
          </p>
        </div>
      </div>
    </article>
    <ArcPractice
      v-for="(testPair, index) in task.test"
      :key="`${sample.id}:${index}`"
      :sample-id="sample.id"
      :pair="testPair"
      :numbers="numbers"
    />
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/arc-pilot.css"></style>
