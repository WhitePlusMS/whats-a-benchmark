<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  ifevalCases,
  findIfevalCase,
  readIfevalRecord,
  ifevalSourceRoot,
  ruleLabels,
} from "../content/ifevalExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import IfevalWorkbench from "./IfevalWorkbench.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter(),
  mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "ifeval",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findIfevalCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() => readIfevalRecord(sample.value?.raw));
const unavailable = computed(
  () =>
    !!data.value &&
    !!entry.value &&
    (!record.value || record.value.key !== entry.value.key),
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
  <div class="if-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="ifeval"
          publisher="Google Research"
          large
        /><span>指令遵循 · 把文字要求变成可检查的约束</span>
      </div>
      <h1 translate="no">IF<span>Eval</span></h1>
      <p class="pilot-lead">回答写得再流畅，也不能漏掉一个条件。</p>
      <p class="pilot-description">
        读一个真实提示，找到它的可验证要求，再观察文本怎样经过检查器。这里有 6
        条原始记录和本地格式实验，不调用模型，不把格式合格当成内容正确。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >打开约束实验台 <Icon name="down" :size="16" /></a
        ><a href="#score" class="pilot-link"
          >四种分数怎样算 <Icon name="down" :size="15" /></a
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
      aria-labelledby="if-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker"
            >真实 prompt → response → 指令检查器</span
          >
          <h2 id="if-title">不是找唯一答案，而是逐条兑现要求。</h2>
          <p>原始集 541 个提示。本站六条展示不同约束，不代表整体表现。</p>
        </div>
        <a href="#samples" class="pilot-link"
          >完整原始记录 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="if-cases" role="group" aria-label="选择 IFEval 真实提示">
        <button
          v-for="(c, i) in ifevalCases"
          :key="c.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === c.sampleId"
          @click="select(c.sampleId)"
        >
          <small>0{{ i + 1 }} · {{ c.key }}</small
          ><b>{{ c.label }}</b>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>原始提示加载失败</h3>
        <p>不使用自编题替代。上下独立加载，请分别重试。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载约束实验台
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的提示</h3>
        <p>请从上方选择，不会用第一条替代。</p>
      </div>
      <template v-else-if="record && sample"
        ><article class="if-task">
          <div>
            <span class="walkthrough-kicker">模型收到 · 完整英文原题</span>
            <h3>{{ entry.label }}</h3>
            <p class="if-original" lang="en" translate="no">
              {{ record.prompt }}
            </p>
            <a
              :href="`${ifevalSourceRoot}data/input_data.jsonl#L${entry.line}`"
              target="_blank"
              rel="noreferrer"
              >固定数据 · key {{ record.key }} · 第 {{ entry.line }} 行 ↗</a
            >
          </div>
          <aside>
            <span class="walkthrough-kicker">这条记录交给检查器的条件</span>
            <ol>
              <li v-for="(id, i) in record.instruction_id_list" :key="id">
                <b>{{ ruleLabels[id] }}</b
                ><code>{{ JSON.stringify(record.kwargs[i]) }}</code>
              </li>
            </ol>
            <p class="if-boundary">{{ entry.note }}</p>
            <small
              >条件直接来自 instruction_id_list 与
              kwargs；原题中的其他语义要求不因此消失。</small
            >
          </aside>
        </article>
        <IfevalWorkbench :record="record" :sample-id="entry.sampleId"
      /></template>
      <p v-else class="empty-state" role="status">正在加载真实提示…</p>
      <div class="if-protocol">
        <h3>单题检查，不等于整套评测分数。</h3>
        <div class="if-score-grid">
          <div><b>strict</b><span>原响应逐条检查</span></div>
          <div><b>loose</b><span>每条规则在 8 个候选中独立找满足项</span></div>
          <div>
            <b>prompt-level</b><span>全部规则满足的提示 / 全部提示</span>
          </div>
          <div>
            <b>instruction-level</b><span>满足的规则条数 / 全部规则条数</span>
          </div>
        </div>
        <p>
          strict / loose
          各有提示级与指令级两项，正式比较应并列说明口径。本站没有模型响应数据，没有运行官方
          Python harness。
        </p>
        <a
          :href="`${ifevalSourceRoot}evaluation_main.py`"
          target="_blank"
          rel="noreferrer"
          >固定版本评分代码 ↗</a
        >
        ·
        <a
          :href="`${ifevalSourceRoot}instructions.py`"
          target="_blank"
          rel="noreferrer"
          >逐条检查器代码 ↗</a
        >
      </div>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/ifeval-pilot.css"></style>
