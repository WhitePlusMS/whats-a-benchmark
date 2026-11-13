<script setup lang="ts">
import { computed } from "vue";
import { useHumanEvalWorkbench } from "../composables/humanEvalWorkbench";
import {
  findHumanEvalCase,
  humanEvalExamples,
  readHumanEvalRecord,
} from "../content/humanEvalExperience";
import type { TaskSample } from "../types/benchmark";
import HumanEvalScene from "./HumanEvalScene.vue";

const props = defineProps<{ sample: TaskSample }>();
const activeCase = computed(() => findHumanEvalCase(props.sample.id));
const record = computed(() =>
  activeCase.value
    ? readHumanEvalRecord(props.sample.raw, activeCase.value)
    : null,
);
const examples = computed(() => {
  try {
    return record.value ? humanEvalExamples(record.value) : [];
  } catch {
    return [];
  }
});
const {
  example,
  exampleId,
  testsRevealed,
  step,
  length,
  selectExample,
  toggleTests,
  seek,
} = useHumanEvalWorkbench(
  () => activeCase.value,
  () => examples.value,
);
</script>

<template>
  <details
    v-if="activeCase && example && record"
    class="he-pilot case-visual-disclosure"
  >
    <summary>查看函数行为图解</summary>
    <p class="he-input-note">图解按公开示例整理，页面不执行 Python。</p>
    <div class="he-workbench-layout">
      <aside class="he-input-panel">
        <label for="he-example">换一组真实输入</label>
        <select
          id="he-example"
          :value="exampleId"
          @change="selectExample(($event.target as HTMLSelectElement).value)"
        >
          <optgroup label="模型可见的 docstring 示例">
            <option
              v-for="entry in examples.filter((e) => e.origin === 'prompt')"
              :key="entry.id"
              :value="entry.id"
            >
              题面示例 {{ entry.ordinal }}
            </option>
          </optgroup>
          <optgroup v-if="testsRevealed" label="评测端的公开测试">
            <option
              v-for="entry in examples.filter((e) => e.origin === 'test')"
              :key="entry.id"
              :value="entry.id"
            >
              公开测试 {{ entry.ordinal }}
            </option>
          </optgroup>
        </select>
        <span class="he-origin">{{
          example.origin === "prompt"
            ? "来自模型可见的 prompt"
            : "来自评测端的 test，不属于模型输入"
        }}</span>
        <pre class="he-call" translate="no">{{ example.call }}</pre>
        <div class="he-expected">
          <span>{{
            example.tolerance ? "公开断言的目标值" : "公开示例的预期输出"
          }}</span
          ><strong translate="no">{{
            example.expectedText.replace(/\s+/g, " ")
          }}</strong
          ><small v-if="example.tolerance"
            >绝对误差 &lt; {{ example.tolerance }}；不是精确相等。</small
          ><small v-else>按此公开示例的预期理解函数约定。</small>
        </div>
        <button
          type="button"
          class="he-reveal-tests"
          :aria-expanded="testsRevealed"
          aria-controls="he-public-tests"
          @click="toggleTests"
        >
          {{
            testsRevealed
              ? "收起公开测试用例"
              : `展开公开测试用例（${examples.filter((e) => e.origin === "test").length}）`
          }}<small>含预期结果 · 与参考代码分开</small>
        </button>
      </aside>
      <div class="he-observation">
        <HumanEvalScene
          :key="`${sample.id}:${example.id}`"
          :kind="activeCase.kind"
          :example="example"
          :step="step"
        />
        <div class="he-playback">
          <div class="he-step-buttons">
            <button
              type="button"
              :disabled="step === 0"
              @click="seek(step - 1)"
            >
              上一步</button
            ><button
              type="button"
              class="he-next"
              :disabled="step === length"
              @click="seek(step + 1)"
            >
              下一步 <span aria-hidden="true">→</span></button
            ><button type="button" @click="seek(step === length ? 0 : length)">
              {{ step === length ? "重新观察" : "看到最后" }}
            </button>
          </div>
          <label class="he-progress"
            ><span>图解进度 {{ step }} / {{ length }}</span
            ><input
              type="range"
              min="0"
              :max="length"
              :value="step"
              aria-label="图解进度"
              @input="seek(Number(($event.target as HTMLInputElement).value))"
          /></label>
        </div>
      </div>
    </div>

    <pre
      v-if="testsRevealed"
      id="he-public-tests"
      class="he-code"
      translate="no"
      >{{ record.test }}</pre
    >
  </details>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/human-eval-pilot.css"></style>
