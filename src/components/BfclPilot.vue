<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  bfclCases,
  findBfclCase,
  readBfclRecord,
  bfclBase,
  bfclSource,
} from "../content/bfclExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import BfclWorkbench from "./BfclWorkbench.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter(),
  mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "bfcl",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findBfclCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() =>
  entry.value ? readBfclRecord(sample.value?.raw) : null,
);
const unavailable = computed(
  () =>
    !!data.value &&
    !!entry.value &&
    (!record.value || record.value.id !== entry.value.sampleId),
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
  <div class="bf-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="bfcl"
          publisher="Gorilla / BFCL"
          large
        /><span>工具调用 · 从请求到结构化参数</span>
      </div>
      <h1 translate="no">BF<span>CL</span></h1>
      <p class="pilot-lead">知道答案，还要会选工具、填参数。</p>
      <p class="pilot-description">
        从五条真实任务出发，把用户请求变成一份调用。这里练的是函数与参数，不是计算面积、查询首都或真的执行工具。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >打开调用练习 <Icon name="down" :size="16" /></a
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
      aria-labelledby="bf-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker"
            >真实请求 → 工具 schema → 调用结构</span
          >
          <h2 id="bf-title">同样的参数，为什么会选错函数？</h2>
          <p>
            两条 simple_python、三条 multiple；只代表所选单轮任务，不代表整个
            BFCL。
          </p>
        </div>
        <a href="#samples" class="pilot-link"
          >完整原始记录 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="bf-cases" role="group" aria-label="选择 BFCL 真实任务">
        <button
          v-for="(c, i) in bfclCases"
          :key="c.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === c.sampleId"
          @click="select(c.sampleId)"
        >
          <small>0{{ i + 1 }} · {{ c.category }}</small
          ><b>{{ c.label }}</b>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>调用题目加载失败</h3>
        <p>不以自编题替代。上下独立加载，请分别重试。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载调用工作台
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的题目</h3>
        <p>请从上方选择，不会默认用第一条替代。</p>
      </div>
      <template v-else-if="record && sample"
        ><BfclWorkbench :key="entry.sampleId" :record="record" :entry="entry" />
        <div class="bf-evidence">
          <span>Gorilla / BFCL · Apache-2.0</span
          ><a :href="bfclSource(entry)" target="_blank" rel="noreferrer"
            >核对完整任务与工具定义 ↗</a
          ><a href="#samples">查看本站原始记录 ↓</a>
        </div></template
      >
      <p v-else class="empty-state" role="status">正在加载真实记录…</p>
      <details class="bf-protocol">
        <summary>五题练习，不等于 BFCL 总分</summary>
        <p>
          本页五题属于单轮 Non-live AST 类别。multiple 是多个工具中选一个，不是
          parallel。正式运行还涉及模型输出解码；多轮检查执行后的状态与响应，Agentic
          有另一套检查方式。
        </p>
        <p>
          固定版本总体权重：Non-live 10%、Live 10%、Irrelevance 10%、Multi-turn
          30%、Agentic
          40%；类别内部还有不同聚合规则。不是五题简单平均，也不能跨版本直接比较。Format
          Sensitivity 为非计分集合。
        </p>
        <a
          :href="bfclBase + 'eval_checker/eval_runner_helper.py'"
          target="_blank"
          rel="noreferrer"
          >核对固定版本聚合代码 ↗</a
        >
      </details>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/bfcl-pilot.css"></style>
