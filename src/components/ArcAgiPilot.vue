<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import { arcCases, findArcCase } from "../content/arcExperience";
import { gridDifferences, gridSize } from "../lib/arcGrid";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import ArcGrid from "./ArcGrid.vue";
import ArcPractice from "./ArcPractice.vue";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";
defineProps<{ selected: boolean }>();
defineEmits<{ toggle: [] }>();
const route = useRoute();
const router = useRouter();
const mounted = ref(false);
const pairIndex = ref(0);
const showDifferences = ref(false);
const numbers = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "arc-agi-2",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const activeCase = computed(() =>
  findArcCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((item) => item.id === activeCase.value?.sampleId),
);
const task = computed(() => sample.value?.gridTask);
const pair = computed(() => task.value?.train[pairIndex.value]);
const differences = computed(() =>
  pair.value ? gridDifferences(pair.value.input, pair.value.output) : null,
);
const differenceCount = computed(
  () => differences.value?.flat().filter(Boolean).length,
);
watch(
  () => activeCase.value?.sampleId,
  () => {
    pairIndex.value = 0;
    showDifferences.value = false;
    numbers.value = false;
  },
  { flush: "sync" },
);
watch(pairIndex, () => {
  showDifferences.value = false;
});
onMounted(() => {
  mounted.value = true;
});
function selectCase(id: string) {
  void selectSampleFromWalkthrough(router, id, "push");
}
</script>
<template>
  <div class="arc-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="arc-agi-2"
          publisher="ARC Prize"
          large
        /><span>抽象推理 · 从示范迁移到新输入</span>
      </div>
      <h1 translate="no">ARC-AGI<span>-2</span></h1>
      <p class="pilot-lead">不给规则，只给几组前后变化。</p>
      <p class="pilot-description">
        从彩色网格中找出共同规律，再为新输入画出完整输出。尺寸和每一个格子都必须正确，才算答对。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >打开真实网格 <Icon name="down" :size="16"
        /></a>
        <a href="#score" class="pilot-link"
          >了解评分方式 <Icon name="down" :size="15"
        /></a>
        <button
          class="pilot-compare"
          type="button"
          :aria-pressed="selected"
          @click="$emit('toggle')"
        >
          <Icon name="compare" :size="17" />{{
            selected ? "已加入对比" : "加入评测对比"
          }}
        </button>
      </div>
    </header>
    <section
      id="task-walkthrough"
      class="walkthrough"
      aria-labelledby="arc-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">把真实题目放上观察台</span>
          <h2 id="arc-title">你能把这个变化，迁移到下一张图吗？</h2>
          <p>
            四道公开 training 题，网格直接来自官方整数矩阵。此处的“测试”是题内
            test 配对，不是私有评测集。
          </p>
        </div>
        <a href="#samples" class="pilot-link"
          >原始矩阵与来源 <Icon name="down" :size="15"
        /></a>
      </div>
      <div
        class="arc-case-selector"
        role="group"
        aria-label="选择 ARC 公开训练题"
      >
        <button
          v-for="entry in arcCases"
          :key="entry.sampleId"
          type="button"
          :class="{ active: activeCase?.sampleId === entry.sampleId }"
          :aria-pressed="activeCase?.sampleId === entry.sampleId"
          aria-controls="arc-observation"
          @click="selectCase(entry.sampleId)"
        >
          <span class="arc-case-code">{{ entry.sampleId }}</span
          ><b>{{ entry.label }}</b
          ><span>{{ entry.caption }}</span>
        </button>
      </div>
      <div v-if="error" class="empty-state" role="alert">
        <h3>网格加载失败</h3>
        <p>没有用示意网格替代。可以重试，或查看下方来源。</p>
        <button class="primary-button" type="button" @click="reload">
          重新加载网格
        </button>
      </div>
      <div v-else-if="!activeCase" class="empty-state" role="status">
        <h3>没有匹配此编号的题目</h3>
        <p>请从上方选择一道公开训练题，不会用第一题替代。</p>
      </div>
      <template v-else-if="sample && task && pair">
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
              <label
                ><input v-model="numbers" type="checkbox" /> 显示颜色编号</label
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
                    >{{ example.input.length }} ×
                    {{ example.input[0].length }} →
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
          <div class="arc-observation-footer">
            <span>颜色只是编号 0–9 · 中文提示为本站说明</span
            ><a :href="sample.source" target="_blank" rel="noreferrer"
              >核对这道题的源 JSON <Icon name="up" :size="14"
            /></a>
          </div>
        </article>
        <ArcPractice
          v-for="(testPair, index) in task.test"
          :key="`${sample.id}:${index}`"
          :sample-id="sample.id"
          :pair="testPair"
          :numbers="numbers"
        />
        <div class="arc-score-note">
          <b>这里检查一张网格，正式评测检查整道任务。</b>
          <p>
            一题可能含多个测试输入，全部答对才算解决。这里可无限练习，不是官方评测接口，也不是模型分数。正式比较还须固定尝试次数、评测划分和成本条件。
          </p>
          <a class="pilot-link" href="#score"
            >继续核对评分与限制 <Icon name="down" :size="14"
          /></a>
        </div>
      </template>
      <div v-else class="sample-loading" role="status">正在加载官方网格…</div>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/arc-pilot.css"></style>
