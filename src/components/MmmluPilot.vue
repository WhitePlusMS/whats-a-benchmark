<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import { useMmmluWorkbench } from "../composables/mmmluWorkbench";
import {
  findMmmluCase,
  mmmluCases,
  readMmmluRecord,
  mmmluEnglishSource,
  mmmluCodeSource,
} from "../content/mmmluExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import MmmluScene from "./MmmluScene.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter(),
  mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "mmmlu",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findMmmluCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() => readMmmluRecord(sample.value?.raw));
const unavailable = computed(
  () => !!data.value && !!entry.value && (!sample.value || !record.value),
);
const { selectedOption, revealed, choose, reset } = useMmmluWorkbench(
  () => entry.value?.sampleId,
);
const letters = ["A", "B", "C", "D"];
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
  <div class="mm-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks benchmark-id="mmmlu" publisher="OpenAI" large /><span
          >多语言 · 同一学科框架，不同语言题面</span
        >
      </div>
      <h1 translate="no">MM<span>MLU</span></h1>
      <p class="pilot-lead">换一种语言，知识还接得上吗？</p>
      <p class="pilot-description">
        把 MMLU 的 test 题专业人工翻译成 14
        种语言。模型读题、理解四个选项，交付一个答案字母。这里从四道真实中文代数题，拆开语言与推理各自的难点。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >打开中文题工作台 <Icon name="down" :size="16" /></a
        ><a href="#score" class="pilot-link"
          >如何比较跨语言表现 <Icon name="down" :size="15" /></a
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
    </header>
    <section
      id="task-walkthrough"
      class="walkthrough"
      aria-labelledby="mm-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker"
            >ZH-CN · 公开 test · abstract_algebra</span
          >
          <h2 id="mm-title">先看原题，再让关系显形。</h2>
          <p>四条连续记录，不代表 57 个学科或 14 种语言的整体表现。</p>
        </div>
        <a href="#samples" class="pilot-link"
          >完整原始记录 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="mm-language-path" aria-label="数据来源关系">
        <span>MMLU test<b>57 个学科的底本</b></span
        ><i aria-hidden="true">→</i><span>专业人工翻译<b>14 种语言</b></span
        ><i aria-hidden="true">→</i
        ><span class="active">本站四条中文样例<b>仅抽象代数 · 行 0–3</b></span>
      </div>
      <div class="mm-cases" role="group" aria-label="选择 MMMLU 真实题目">
        <button
          v-for="c in mmmluCases"
          :key="c.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === c.sampleId"
          @click="select(c.sampleId)"
        >
          <small>0{{ c.index + 1 }}</small
          ><b>{{ c.label }}</b>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>题目记录加载失败</h3>
        <p>不使用自编题替代。上下独立加载，请分别重试。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载题目图解
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的题目</h3>
        <p>请从上方选择，不会用第一题替代。</p>
      </div>
      <article v-else-if="sample && record" class="mm-workbench">
        <div class="mm-question">
          <span class="mm-eyebrow">模型可见 · Question + A / B / C / D</span>
          <h3>{{ entry.label }}</h3>
          <p class="mm-original" translate="no">{{ record.question }}</p>
          <aside
            v-if="entry.kind === 'permutation'"
            class="mm-translation"
            role="note"
          >
            <b>译文提示 · 原题保持不变</b>
            <p>
              中文记录写作“幂”；对应英文问的是子群指数（index），不是阶或幂。本站图解按英文原意解释。
            </p>
            <p lang="en" translate="no">Find the index of &lt;p&gt; in S_5.</p>
            <a :href="mmmluEnglishSource" target="_blank" rel="noreferrer"
              >核对官方英文对应记录 ↗</a
            ><small
              >2026-11-12 读取的 Simple Evals 英文文件，并非此 HF
              固定修订内的英文配置。</small
            >
          </aside>
          <fieldset class="mm-options">
            <legend>本站选项练习 · 可先选，也可直接揭示</legend>
            <label
              v-for="(option, i) in record.options"
              :key="i"
              :class="{ chosen: selectedOption === i }"
              ><input
                type="radio"
                name="mmmlu-practice"
                :checked="selectedOption === i"
                @change="choose(i)"
              /><b>{{ letters[i] }}</b
              ><span translate="no">{{ option }}</span></label
            >
          </fieldset>
          <div class="mm-answer-actions">
            <button
              type="button"
              class="primary-button"
              :aria-expanded="revealed"
              aria-controls="mm-reference"
              @click="revealed = !revealed"
            >
              {{
                revealed ? "收起参考与图解" : "揭示参考标签与数学图解"
              }}</button
            ><button type="button" class="secondary-button" @click="reset">
              重新尝试
            </button>
          </div>
          <div
            v-if="revealed"
            id="mm-reference"
            class="mm-reference"
            aria-live="polite"
          >
            <span>原记录参考标签</span
            ><strong
              >{{ record.answer }} ·
              {{ record.options[letters.indexOf(record.answer)] }}</strong
            >
            <p v-if="selectedOption !== null">
              {{
                letters[selectedOption] === record.answer
                  ? "你的选择与参考标签一致。"
                  : "你的选择与参考标签不同，可对照右侧图解。"
              }}
            </p>
            <p v-else>尚未选择选项。可直接阅读图解，也可收起后重新尝试。</p>
          </div>
          <p class="mm-disclaimer">
            选项练习只比较本站选择与记录标签，不调用模型、不计正式准确率。答案不是模型输入。
          </p>
          <a
            :href="sample.source"
            target="_blank"
            rel="noreferrer"
            class="text-link"
            >核对中文 CSV · 零基行 {{ entry.index }} ↗</a
          >
        </div>
        <MmmluScene
          :key="`${entry.sampleId}:${revealed}`"
          :kind="entry.kind"
          :revealed="revealed"
        />
      </article>
      <p v-else class="empty-state" role="status">正在加载真实中文题目…</p>
      <div class="mm-protocol">
        <span>模型交付 → 解析字母 → 对照 Answer</span>
        <h3>同一道题，还要固定同一套检查方式。</h3>
        <p>
          固定版本 Simple Evals 模板要求最后写 Answer:
          字母，规范化响应后按多语言答案表达提取选项，再与参考 Answer
          比较。这里的点选练习不模拟该文本解析器，也不执行官方评测。
        </p>
        <a :href="mmmluCodeSource" target="_blank" rel="noreferrer"
          >查看固定版本评测代码 ↗</a
        >
        <p class="muted">
          比较语言表现需写清
          locale、样本范围、提示、采样与解析规则和平均方式。MMMLU
          是文本多语言评测，不是图文多学科的 MMMU。
        </p>
      </div>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/mmmlu-pilot.css"></style>
