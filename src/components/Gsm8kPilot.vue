<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGsm8kWorkbench } from "../composables/gsm8kWorkbench";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  gsm8kCases,
  findGsm8kCase,
  readGsm8kRecord,
  extractGsm8kAnswer,
  checkGsm8kAnswer,
} from "../content/gsm8kExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import Gsm8kScene from "./Gsm8kScene.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter();
const mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "gsm8k",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findGsm8kCase(mounted.value ? route.query.sample : undefined),
);
const { step, draft, checked, referenceRevealed, seek } = useGsm8kWorkbench(
  () => entry.value,
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() => readGsm8kRecord(sample.value?.raw));
const unavailable = computed(
  () => !!data.value && !!entry.value && (!sample.value || !record.value),
);
const result = computed(() =>
  record.value ? checkGsm8kAnswer(draft.value, record.value.answer) : null,
);
const codeUrl =
  "https://github.com/openai/grade-school-math/blob/3101c7d5072418e28b9008a6636bde82a006892c/grade_school_math/dataset.py";
watch(
  [data, error],
  ([loaded, failed]) => {
    if (loaded || failed) emit("settled");
  },
  { flush: "post" },
);
onMounted(() => (mounted.value = true));
function select(id: string) {
  void selectSampleFromWalkthrough(router, id, "push");
}
</script>
<template>
  <div class="gsm-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks benchmark-id="gsm8k" publisher="OpenAI" large /><span
          >数学推理 · 把文字变成数量关系</span
        >
      </div>
      <h1 translate="no">GSM<span>8K</span></h1>
      <p class="pilot-lead">数字不难，难的是把关系接对。</p>
      <p class="pilot-description">
        鸭蛋、布料、房屋与下载进度：模型读一段英文应用题，串起几步算术，交付最终答案。先自己理清条件，再打开参考推导。
      </p>
      <div class="pilot-actions">
        <a class="primary-button" href="#task-walkthrough"
          >拆开一道应用题 <Icon name="down" :size="16" /></a
        ><a class="pilot-link" href="#score"
          >怎样检查答案 <Icon name="down" :size="15" /></a
        ><button
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
      aria-labelledby="gsm-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">七个真实故事 · 七种数量关系</span>
          <h2 id="gsm-title">读懂这一题，要经过哪些转换？</h2>
          <p>
            来自公开 test
            的真实题目。图解是本站解释，不是模型作答，也不运行官方评测。
          </p>
        </div>
        <a class="pilot-link" href="#samples"
          >完整原始记录 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="gsm-cases" role="group" aria-label="选择 GSM8K 真实题目">
        <button
          v-for="item in gsm8kCases"
          :key="item.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === item.sampleId"
          @click="select(item.sampleId)"
        >
          <span aria-hidden="true">{{ item.glyph }}</span
          ><b>{{ item.label }}</b
          ><small>test · index {{ item.index }}</small>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>题目记录加载失败</h3>
        <p>没有用自编题目替代原题。请重试，或通过下方来源核对。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载题目记录
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的题目</h3>
        <p>请从上方选择一道题，不会自动替换为第一题。</p>
      </div>
      <template v-else-if="sample && record">
        <article class="gsm-workbench">
          <header class="gsm-workbench-head">
            <div>
              <span
                >公开 test · 零基 index {{ entry.index }} · JSONL 第
                {{ entry.index + 1 }} 行</span
              >
              <h3>{{ entry.label }}</h3>
            </div>
            <span class="gsm-badge">本站交互图解</span>
          </header>
          <div class="gsm-layout">
            <aside class="gsm-question">
              <span class="gsm-eyebrow">模型可见 · question</span>
              <h4>先看题目</h4>
              <p class="gsm-translation">{{ entry.question }}</p>
              <small>本站中文导读，正式题面以英文原文为准。</small>
              <details :key="`${sample.id}-question`" open>
                <summary>完整英文原题</summary>
                <p translate="no">{{ record.question }}</p>
              </details>
              <p v-if="entry.kind === 'download'" class="gsm-note">
                原题 “How load” 的拼写按源文件保留。
              </p>
            </aside>
            <div class="gsm-observe">
              <Gsm8kScene :entry="entry" :step="step" />
              <div class="gsm-controls">
                <button
                  v-if="step === 0"
                  class="primary-button"
                  type="button"
                  @click="seek(1)"
                >
                  揭示参考推导 <Icon name="down" :size="16" /></button
                ><template v-else
                  ><button type="button" @click="seek(step - 1)">
                    {{ step === 1 ? "收起推导" : "上一步" }}</button
                  ><button
                    type="button"
                    class="primary-button"
                    :disabled="step === entry.steps.length"
                    @click="seek(step + 1)"
                  >
                    {{
                      step === entry.steps.length
                        ? "已到最终答案"
                        : "继续推导 →"
                    }}</button
                  ><button type="button" @click="seek(0)">
                    重新读题
                  </button></template
                ><span>{{ step }} / {{ entry.steps.length }}</span>
              </div>
              <div v-if="step > 0" class="gsm-reasoning" aria-live="polite">
                <span>参考推导 · 第 {{ step }} 步</span>
                <p>{{ entry.steps[step - 1] }}</p>
                <div v-if="step === entry.steps.length" class="gsm-answer">
                  <span>参考最终答案</span
                  ><code>#### {{ extractGsm8kAnswer(record.answer) }}</code>
                </div>
              </div>
              <p v-else class="gsm-note">
                答案与推导暂未展开。图中只整理题目条件，不替你先算出结果。
              </p>
            </div>
          </div>
          <footer class="gsm-footer">
            <span
              >图形、翻译与步进均为本站编写 · 不是官方界面或模型运行记录</span
            ><a :href="sample.source" target="_blank" rel="noreferrer"
              >核对这一条原始记录 ↗</a
            >
          </footer>
        </article>
        <div class="gsm-boundary">
          <section class="gsm-check">
            <span class="gsm-eyebrow">模型交付 → 答案提取 → 字符串比较</span>
            <h3>会算，还要能被提取器读到。</h3>
            <p>
              原仓库取第一个匹配的 “####
              数字”，去掉逗号后比较字符串。只检查最终答案，不评价推理是否正确；不是任意格式的数值归一化。
            </p>
            <label for="gsm-draft">本站练习：输入你的解答或最终答案</label
            ><textarea
              id="gsm-draft"
              v-model="draft"
              rows="3"
              placeholder="可写推导，最后用 #### 加空格和数字标记答案"
              spellcheck="false"
            /><button
              type="button"
              class="primary-button"
              :disabled="!draft.trim()"
              @click="checked = true"
            >
              检查提取与答案
            </button>
            <div v-if="checked && result" class="gsm-result" role="status">
              <p v-if="result.extracted === null">
                未提取到答案。标记后须有一个空格，再直接接数字，不要先放货币符号。
              </p>
              <p v-else>
                提取结果：<code>{{ result.extracted }}</code> ·
                {{
                  result.matches
                    ? "与参考最终答案字符串一致。"
                    : "与参考最终答案字符串不一致。"
                }}
              </p>
              <small
                >仅此条本站练习结果，不是模型成绩或官方评测运行；不会验证你的推导。</small
              >
            </div>
            <p class="gsm-note">
              例如：#### 1,000 与 #### 1000 提取后相同；#### 1.0 与 #### 1
              不同；####1 和 #### $1 无法匹配。
            </p>
          </section>
          <section class="gsm-evidence">
            <span class="gsm-eyebrow">评测端的参考资料</span>
            <h3>参考解不是模型输入。</h3>
            <p>
              question 是题面；answer 保存自然语言推导与最终答案。训练或
              few-shot 可能另带示例，具体输入取决于运行配置。
            </p>
            <div class="gsm-reference">
              <button
                type="button"
                :aria-expanded="referenceRevealed"
                aria-controls="gsm-reference-answer"
                @click="referenceRevealed = !referenceRevealed"
              >
                {{
                  referenceRevealed
                    ? "收起完整参考 answer"
                    : "主动揭示完整参考 answer（含最终答案）"
                }}
              </button>
              <pre
                v-if="referenceRevealed"
                id="gsm-reference-answer"
                tabindex="0"
                translate="no"
                >{{ record.answer }}</pre
              >
            </div>
            <p>
              双尖括号 &lt;&lt;…&gt;&gt;
              是计算器标注，不是另一个答案。这里的图解遵循参考推导，但不意味着只有这一种解法。
            </p>
            <a :href="codeUrl" target="_blank" rel="noreferrer"
              >查看固定版本 dataset.py 提取规则 ↗</a
            >
            <p class="gsm-note">
              其他框架可能使用 boxed 或不同评分逻辑，不能与此原始提取规则混称。
            </p>
          </section>
        </div>
        <p class="gsm-scope">
          这 7 道公开 test 题只用于理解任务，不代替完整的 1,319
          道测试题，也不是隐藏或未污染的新题。比较成绩还需固定
          prompt、采样次数、计算器和答案抽取方式。上方与下方选题由同一地址同步，换题会收起本地推导与练习。
        </p>
      </template>
      <div v-else class="sample-loading" role="status">
        正在加载公开题目记录…
      </div>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/gsm8k-pilot.css"></style>
