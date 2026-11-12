<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import { useHumanEvalWorkbench } from "../composables/humanEvalWorkbench";
import {
  findHumanEvalCase,
  humanEvalCases,
  humanEvalExamples,
  readHumanEvalRecord,
} from "../content/humanEvalExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import { pythonLiteral } from "../lib/humanEvalIllustration";
import HumanEvalScene from "./HumanEvalScene.vue";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute();
const router = useRouter();
const mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "human-eval",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
// The parent/router waits for the final rendered layout on initial deep links.
watch(
  [data, error],
  ([loaded, failed]) => {
    if (loaded || failed) emit("settled");
  },
  { flush: "post" },
);
const activeCase = computed(() =>
  findHumanEvalCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((item) => item.id === activeCase.value?.sampleId),
);
const record = computed(() =>
  activeCase.value && sample.value
    ? readHumanEvalRecord(sample.value.raw, activeCase.value)
    : null,
);
const parsed = computed(() => {
  if (!record.value) return null;
  try {
    return humanEvalExamples(record.value);
  } catch {
    return null;
  }
});
const examples = computed(() => parsed.value || []);
const {
  example,
  exampleId,
  testsRevealed,
  solutionRevealed,
  step,
  length,
  selectExample,
  toggleTests,
  seek,
} = useHumanEvalWorkbench(
  () => activeCase.value,
  () => examples.value,
);
const signature = computed(
  () => record.value?.prompt.match(/^def .+:/m)?.[0] || "",
);
const recordUnavailable = computed(
  () =>
    !!data.value &&
    !!activeCase.value &&
    (!sample.value || !record.value || !parsed.value),
);
onMounted(() => {
  mounted.value = true;
});
function selectCase(id: string) {
  void selectSampleFromWalkthrough(router, id, "push");
}
</script>
<template>
  <div class="he-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="human-eval"
          publisher="OpenAI"
          large
        /><span>代码生成 · 从函数说明到正确实现</span>
      </div>
      <h1 translate="no">Human<span>Eval</span></h1>
      <p class="pilot-lead">不是写出答案，而是写出能产生答案的函数。</p>
      <p class="pilot-description">
        模型收到 Python 函数签名与
        docstring，补全函数体；评测端再用测试检查行为。先把真实输入放进图解里，看清代码究竟要做到什么。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >拆开一道函数题 <Icon name="down" :size="16" /></a
        ><a href="#score" class="pilot-link"
          >了解 pass@k <Icon name="down" :size="15" /></a
        ><button
          type="button"
          class="pilot-compare"
          :aria-pressed="selected"
          @click="$emit('toggle')"
        >
          <Icon name="compare" :size="17" />{{
            selected ? "已加入对比" : "加入评测对比"
          }}
        </button>
      </div>
      <p class="he-maintenance">
        官方已停止维护，仅供历史参考。<a
          href="https://github.com/openai/human-eval/blob/b9453e8f1865df0a0057a1383767caa400acfbcf/README.md#L3-L5"
          target="_blank"
          rel="noreferrer"
          >核对官方说明 ↗</a
        >
      </p>
    </header>
    <section
      id="task-walkthrough"
      class="walkthrough"
      aria-labelledby="he-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">六道真实题，六种观察方式</span>
          <h2 id="he-title">把函数的约定，变成看得见的变化。</h2>
          <p>
            输入与预期均取自公开原题或测试。图形与步进由本站编写，不执行
            Python，也不是模型作答。
          </p>
        </div>
        <a href="#samples" class="pilot-link"
          >完整原题与来源 <Icon name="down" :size="15"
        /></a>
      </div>
      <div
        class="he-case-selector"
        role="group"
        aria-label="选择 HumanEval 函数题"
      >
        <button
          v-for="entry in humanEvalCases"
          :key="entry.sampleId"
          type="button"
          :class="{ active: activeCase?.sampleId === entry.sampleId }"
          :aria-pressed="activeCase?.sampleId === entry.sampleId"
          aria-controls="he-workbench"
          @click="selectCase(entry.sampleId)"
        >
          <span class="he-case-glyph" aria-hidden="true">{{ entry.glyph }}</span
          ><span class="he-case-label"
            ><small>{{ entry.sampleId }}</small
            ><b>{{ entry.label }}</b
            ><span>{{ entry.caption }}</span></span
          >
        </button>
      </div>
      <div v-if="error || recordUnavailable" class="empty-state" role="alert">
        <h3>函数记录加载失败</h3>
        <p>没有用自造输入替代。可重试，或从下方原始来源核对。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载函数记录
        </button>
      </div>
      <div v-else-if="!activeCase" class="empty-state" role="status">
        <h3>没有匹配此编号的函数题</h3>
        <p>请从上方选择一道题，不会自动用第一题替代。</p>
      </div>
      <template v-else-if="sample && record && example">
        <article
          id="he-workbench"
          class="he-workbench"
          :aria-label="`${sample.id} 函数图解`"
        >
          <header class="he-workbench-heading">
            <div>
              <span class="he-eyebrow">{{ sample.id }} · 函数约定</span>
              <h3 translate="no">{{ activeCase.entryPoint }}</h3>
              <p>{{ activeCase.contract }}</p>
            </div>
            <span class="he-site-label">本站交互图解</span>
          </header>
          <div class="he-workbench-layout">
            <aside class="he-input-panel">
              <label for="he-example">换一组真实输入</label>
              <select
                id="he-example"
                :value="exampleId"
                @change="
                  selectExample(($event.target as HTMLSelectElement).value)
                "
              >
                <optgroup label="模型可见的 docstring 示例">
                  <option
                    v-for="entry in examples.filter(
                      (e) => e.origin === 'prompt',
                    )"
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
              <p class="he-input-note">
                地址保存当前函数题。切换题目会重新隐藏测试与参考实现，并从题面示例开始。
              </p>
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
                  ><button
                    type="button"
                    @click="seek(step === length ? 0 : length)"
                  >
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
                    @input="
                      seek(Number(($event.target as HTMLInputElement).value))
                    "
                /></label>
              </div>
            </div>
          </div>
          <div class="he-source-excerpt">
            <div>
              <b>{{
                example.origin === "prompt"
                  ? "对应的原题示例"
                  : "对应的原始测试断言"
              }}</b
              ><span
                >原文保留 ·
                {{ example.origin === "prompt" ? "prompt" : "test" }}</span
              >
            </div>
            <pre
              tabindex="0"
              :aria-label="
                example.origin === 'prompt' ? '原题示例原文' : '测试断言原文'
              "
              translate="no"
              >{{ example.sourceText }}</pre
            >
            <p v-if="example.tolerance">
              图中为便于阅读使用近似小数；检查标准以此处原始断言为准。目标值约为
              {{ pythonLiteral(example.expected) }}。
            </p>
            <p v-else-if="activeCase.kind === 'distance'">
              判断使用严格小于。浮点相减可能出现很长的小数；图解中的数值演示不代替
              Python 测试。
            </p>
          </div>
          <div class="he-workbench-footer">
            <span
              >本站根据公开参考实现解释算法 · 不执行提交代码、不运行
              harness、不生成模型成绩</span
            ><a :href="sample.source" target="_blank" rel="noreferrer"
              >查看此记录的原始来源 ↗</a
            >
          </div>
        </article>
        <div class="he-code-boundary">
          <section class="he-delivery" aria-labelledby="he-delivery-title">
            <span class="he-eyebrow">模型侧 · 补全代码</span>
            <h3 id="he-delivery-title">
              交付的是函数体，不是某个输入的返回值。
            </h3>
            <pre tabindex="0" aria-label="函数体交付位置示意" translate="no"
              >{{ signature }}
    # 此处由模型补全函数体（本站占位说明）</pre
            >
            <p>
              输入中的签名和 docstring 已给定；completion 接在 prompt
              后。公开参考实现和 test
              是评测记录里的其他字段，不等于它们会一起给模型。
            </p>
            <details :key="`${sample.id}-prompt`">
              <summary>查看模型收到的完整 prompt</summary>
              <pre
                tabindex="0"
                aria-label="完整模型输入 prompt"
                translate="no"
                >{{ record.prompt }}</pre
              >
            </details>
          </section>
          <section class="he-checking" aria-labelledby="he-checking-title">
            <span class="he-eyebrow">评测侧 · 检查行为</span>
            <h3 id="he-checking-title">测试候选程序，再汇总 pass@k。</h3>
            <p>
              harness 将补全代码与题目、测试组合，调用
              check(candidate)，并记录通过、失败或超时。这里没有候选程序，也没有任何测试通过率。
            </p>
            <p class="he-sandbox">
              执行生成代码需可靠安全沙箱；官方 reliability_guard
              不是安全沙箱。<a
                href="https://github.com/openai/human-eval/blob/b9453e8f1865df0a0057a1383767caa400acfbcf/human_eval/execution.py#L163-L174"
                target="_blank"
                rel="noreferrer"
                >安全说明 ↗</a
              >
            </p>
            <a href="#score" class="pilot-link"
              >k 是候选程序数，不是测试数 <Icon name="down" :size="14"
            /></a>
          </section>
        </div>
        <div
          id="he-public-tests"
          v-if="testsRevealed"
          class="he-evidence-panel"
        >
          <details :key="`${sample.id}-test`">
            <summary>查看此题完整公开 test（含所有断言）</summary>
            <pre tabindex="0" aria-label="完整公开测试代码" translate="no">{{
              record.test
            }}</pre>
          </details>
          <p>
            上方输入选择器现已加入所有公开测试。本页没有运行这些测试，不以展示的输入数量充当整题覆盖率。
          </p>
        </div>
        <section class="he-solution-panel">
          <button
            type="button"
            class="he-solution-button"
            :aria-expanded="solutionRevealed"
            aria-controls="he-canonical"
            @click="solutionRevealed = !solutionRevealed"
          >
            <span
              ><b>{{
                solutionRevealed
                  ? "收起公开参考函数体"
                  : "单独揭示公开参考函数体"
              }}</b
              ><small
                >canonical_solution ·
                不是模型生成结果，也不是唯一正确解法</small
              ></span
            ><Icon name="down" :size="18" />
          </button>
          <pre
            v-if="solutionRevealed"
            id="he-canonical"
            tabindex="0"
            aria-label="公开参考函数体"
            translate="no"
            >{{ record.canonical_solution }}</pre
          >
        </section>
        <p class="he-score-note">
          这 6 道题用于理解任务，不代替 164 道题的完整评测。pass@k 关心每题 k
          个候选程序中至少一个通过测试的概率估计，比较时仍要固定采样与执行条件。
        </p>
      </template>
      <div v-else class="sample-loading" role="status">
        正在加载公开函数记录…
      </div>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/human-eval-pilot.css"></style>
