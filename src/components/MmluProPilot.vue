<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  mmluProCases,
  findMmluProCase,
  readMmluProRecord,
  mmluProCardSource,
  mmluProCodeSource,
  mmluProDataSource,
} from "../content/mmluProExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import MmluProTask from "./MmluProTask.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter(),
  mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "mmlu-pro",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findMmluProCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() =>
  entry.value ? readMmluProRecord(sample.value?.raw) : null,
);
const unavailable = computed(
  () =>
    !!data.value &&
    !!entry.value &&
    (!record.value || record.value.questionId !== entry.value.questionId),
);
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
  <div class="mp-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="mmlu-pro"
          publisher="TIGER-Lab"
          large
        /><span>跨学科知识 · 更难的选择</span>
      </div>
      <h1 translate="no">MMLU<span>-Pro</span></h1>
      <p class="pilot-lead">多想一步，再做选择。</p>
      <p class="pilot-description">
        十条真实 validation
        示例：读懂题干、作答，再对照公开标注。从数学关系到专业知识，先尝试作答，再辨析答案与推导的依据。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >试一道真实题 <Icon name="down" :size="16" /></a
        ><a href="#score" class="pilot-link"
          >正式评分怎样算 <Icon name="down" :size="15" /></a
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
      aria-labelledby="mp-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">读题 → 选择 → 对照与辨析</span>
          <h2 id="mp-title">答案之外，解释也值得检查。</h2>
          <p>这十条是公开示范题，不是未见过的 test 题，也不是完整评测。</p>
        </div>
        <a href="#samples" class="pilot-link">完整原始记录 ↓</a>
      </div>
      <div class="mp-cases" role="group" aria-label="选择 MMLU-Pro 真实题目">
        <button
          v-for="(c, i) in mmluProCases"
          :key="c.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === c.sampleId"
          @click="select(c.sampleId)"
        >
          <small>{{ String(i + 1).padStart(2, "0") }} · {{ c.category }}</small
          ><b>{{ c.label }}</b>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>题目加载失败</h3>
        <p>上下独立加载，请分别重试。不用自编题替代。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载答题区
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的题目</h3>
        <p>请从上方选择，不会默认用第一条替代。</p>
      </div>
      <template v-else-if="record && sample"
        ><MmluProTask :key="entry.sampleId" :record="record" :entry="entry" />
        <div class="mp-evidence">
          <a :href="mmluProDataSource" target="_blank" rel="noreferrer"
            >固定 validation 源文件 · question_id {{ entry.questionId }} ↗</a
          ><a href="#samples">本站原始记录 ↓</a>
        </div></template
      >
      <p v-else class="empty-state" role="status">正在加载真实记录…</p>
      <details class="mp-protocol">
        <summary>示例、评分与许可边界</summary>
        <p>
          固定数据卡声明 14 学科、12032 条 test 和 70 条
          validation。这里选取十条 validation 示例，公开 CoT
          来自数据集示范文本；不代表本轮运行任何模型。
        </p>
        <p>
          固定本地实现默认每学科取 5 条 validation
          示例构建提示。输出经过多级正则提取答案，仍失败时随机猜有效选项；本站练习不模仿这个回退。总正确率按题数汇总，并非
          14 学科等权平均。
        </p>
        <a :href="mmluProCodeSource" target="_blank" rel="noreferrer"
          >核对固定评分代码 ↗</a
        >
        <p>
          数据卡和论文将数据集声明为 MIT；代码仓库为 Apache-2.0。此前本站链接的
          Apache 全文不能当作数据 MIT 许可。本站保留既有题目与来源，不杜撰 MIT
          版权原文。
        </p>
        <a :href="mmluProCardSource" target="_blank" rel="noreferrer"
          >固定数据卡与 MIT 声明 ↗</a
        >
      </details>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/mmlu-pro-pilot.css"></style>
