<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useArcPractice } from "../composables/arcPractice";
import {
  arcColors,
  arcCellSize,
  arcColorNames,
  arcSymbolInk,
  gridDifferences,
  gridSize,
} from "../lib/arcGrid";
import type { ArcPair } from "../lib/arcGrid";
import ArcGrid from "./ArcGrid.vue";
import ArcGridEditor from "./ArcGridEditor.vue";
const props = defineProps<{
  pair: ArcPair;
  sampleId: string;
  numbers: boolean;
}>();
const open = ref(false);
const rows = ref<number | string>(1);
const columns = ref<number | string>(1);
const sizeError = ref(false);
const practice = useArcPractice(
  () => props.pair,
  () => props.sampleId,
);
const {
  draft,
  color,
  history,
  revealed,
  checked,
  reset,
  paint,
  undo,
  check,
  reveal,
  copyInput,
  clear,
} = practice;
watch(
  draft,
  (grid) => {
    rows.value = grid.length;
    columns.value = grid[0].length;
    sizeError.value = false;
  },
  { immediate: true },
);
const differences = computed(() =>
  revealed.value ? gridDifferences(draft.value, props.pair.output) : null,
);
const differenceCount = computed(
  () => differences.value?.flat().filter(Boolean).length,
);
function applySize() {
  sizeError.value = !practice.resize(Number(rows.value), Number(columns.value));
}
function startOver() {
  reset();
  rows.value = draft.value.length;
  columns.value = draft.value[0].length;
  sizeError.value = false;
}
</script>
<template>
  <section class="arc-practice" aria-labelledby="arc-practice-title">
    <div class="arc-practice-intro">
      <div>
        <span class="arc-eyebrow">换一个输入，规则还成立吗？</span>
        <h3 id="arc-practice-title">现在，交付一张完整的网格。</h3>
        <p>
          这是同一公开训练题中的测试输入，不是私有评测题。先确定输出尺寸，再填入颜色。
        </p>
        <button
          type="button"
          class="primary-button"
          :aria-expanded="open"
          aria-controls="arc-practice-board"
          @click="open = !open"
        >
          {{ open ? "收起作答画板" : "试着画出测试输出" }}
        </button>
        <small>本站练习 · 可反复修改 · 不运行模型，不计正式成绩</small>
      </div>
      <figure class="arc-test-input">
        <figcaption>
          测试输入 <span>{{ gridSize(pair.input) }}</span>
        </figcaption>
        <ArcGrid
          :grid="pair.input"
          label="公开训练题的测试输入"
          :numbers="numbers"
        />
      </figure>
    </div>
    <div v-if="open" id="arc-practice-board" class="arc-practice-board">
      <div class="arc-practice-tools">
        <form class="arc-size-form" @submit.prevent="applySize">
          <span>画板尺寸</span>
          <label
            >行
            <input
              v-model="rows"
              type="number"
              min="1"
              max="30"
              step="1"
              required
              aria-label="预测网格行数"
          /></label>
          <label
            >列
            <input
              v-model="columns"
              type="number"
              min="1"
              max="30"
              step="1"
              required
              aria-label="预测网格列数"
          /></label>
          <button type="submit" class="arc-tool">应用尺寸</button>
        </form>
        <p v-if="sizeError" class="arc-feedback" role="alert">
          行、列必须是 1–30 的整数。
        </p>
        <p class="arc-helper">
          初始空画板沿用输入尺寸，不提示答案尺寸。调整时保留左上角已有内容，裁掉的部分可撤销。
        </p>
        <div class="arc-palette" role="group" aria-label="选择作答颜色">
          <button
            v-for="(hex, value) in arcColors"
            :key="value"
            type="button"
            :style="{ '--swatch': hex, '--swatch-ink': arcSymbolInk(value) }"
            :aria-label="`使用颜色 ${value} ${arcColorNames[value]}`"
            :aria-pressed="color === value"
            :title="`${value} ${arcColorNames[value]}`"
            @click="color = value"
          >
            <span>{{ value }}</span>
          </button>
        </div>
        <p id="arc-editor-help" class="arc-helper">
          选色后点格子。键盘：Tab 进入画板，方向键移动，0–9 直接填色，Enter /
          空格填入所选颜色。宽画板可横向滚动。
        </p>
        <div class="arc-edit-actions">
          <button type="button" class="arc-tool" @click="copyInput">
            复制测试输入
          </button>
          <button
            type="button"
            class="arc-tool"
            :disabled="!history.length"
            @click="undo"
          >
            撤销
          </button>
          <button type="button" class="arc-tool" @click="clear">
            清空颜色
          </button>
          <button type="button" class="arc-tool" @click="startOver">
            重开练习
          </button>
        </div>
      </div>
      <div class="arc-answer-layout" :class="{ 'has-reference': revealed }">
        <figure class="arc-draft">
          <figcaption>
            你的预测 <span>{{ gridSize(draft) }}</span>
          </figcaption>
          <ArcGridEditor
            :grid="draft"
            :color="color"
            :numbers="numbers"
            :differences="differences"
            @paint="paint"
          />
        </figure>
        <figure v-if="revealed" class="arc-reference">
          <figcaption>
            公开参考输出 <span>{{ gridSize(pair.output) }}</span>
          </figcaption>
          <div
            class="arc-reference-scroll"
            tabindex="0"
            role="region"
            aria-label="参考输出网格，较宽时可横向滚动"
          >
            <ArcGrid
              :grid="pair.output"
              label="公开训练题的测试参考输出"
              :numbers="numbers"
              :differences="differences"
              :style="{
                width: `${pair.output[0].length * arcCellSize + 2}px`,
                height: `${pair.output.length * arcCellSize + 2}px`,
              }"
            />
          </div>
        </figure>
      </div>
      <div class="arc-check-actions">
        <button type="button" class="primary-button" @click="check">
          检查完整网格
        </button>
        <button
          type="button"
          class="arc-tool"
          :aria-expanded="revealed"
          :aria-disabled="revealed"
          @click="reveal"
        >
          {{ revealed ? "参考输出已揭示" : "揭示参考输出" }}
        </button>
        <span v-if="revealed" class="arc-revealed"
          >已查看参考 · 重开练习可重新隐藏</span
        >
      </div>
      <div class="arc-check-result" aria-live="polite" aria-atomic="true">
        <p v-if="checked === true">
          <b>完整匹配。</b> 此测试输入的输出尺寸与每一格都正确。{{
            revealed
              ? "已查看过参考，仅作练习对照。"
              : "这是本站单题练习的检查结果。"
          }}
        </p>
        <p v-else-if="checked === false">
          <b>尚未完整匹配。</b>
          输出尺寸和每一格都必须一致。可以继续调整，或主动揭示参考输出。
        </p>
        <p v-else>检查只判断整张网格是否相同，不把像素正确比例当作题目得分。</p>
        <p v-if="revealed">
          {{
            differences
              ? `白框标出 ${differenceCount} 个与参考不同的位置（当前画板与参考同尺寸）。`
              : "当前画板与参考尺寸不同，不做逐格对齐。"
          }}
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped src="../styles/arc-practice.css"></style>
