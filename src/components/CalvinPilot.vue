<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  calvinCases,
  findCalvinCase,
  readCalvinRecord,
  calvinRoot,
  calvinThirdParty,
} from "../content/calvinExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import CalvinWorkbench from "./CalvinWorkbench.vue";
import PublisherMarks from "./PublisherMarks.vue";
import Icon from "./Icon.vue";
defineProps<{ selected: boolean }>();
const emit = defineEmits<{ toggle: []; settled: [] }>();
const route = useRoute(),
  router = useRouter(),
  mounted = ref(false);
const { data, error, reload } = useSampleLoader(
  () => "calvin",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const entry = computed(() =>
  findCalvinCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((s) => s.id === entry.value?.sampleId),
);
const record = computed(() =>
  entry.value ? readCalvinRecord(sample.value?.raw, entry.value.kind) : null,
);
const unavailable = computed(
  () => !!data.value && !!entry.value && !record.value,
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
  <div class="cv-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks benchmark-id="calvin" publisher="CALVIN" large /><span
          >语言条件操控 · 长程任务链</span
        >
      </div>
      <h1 translate="no">CAL<span>VIN</span></h1>
      <p class="pilot-lead">做对第一步，还要把下一步接上。</p>
      <p class="pilot-description">
        听懂指令，操作物体，再从改变后的环境继续。一次五任务链考察的不只是单个动作，还包括连续执行能走多远。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >打开真实任务链 <Icon name="down" :size="16" /></a
        ><a href="#score" class="pilot-link"
          >连续成功怎样算 <Icon name="down" :size="15" /></a
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
      aria-labelledby="cv-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">任务配置 / 训练记录 / 单帧观察</span>
          <h2 id="cv-title">一条真实配置，五个连续目标。</h2>
          <p>四份独立材料，分别读；不是同一次运行，也没有模型成功成绩。</p>
        </div>
        <a href="#samples" class="pilot-link"
          >完整原始记录 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="cv-cases" role="group" aria-label="选择 CALVIN 真实材料">
        <button
          v-for="(c, i) in calvinCases"
          :key="c.sampleId"
          type="button"
          :aria-pressed="entry?.sampleId === c.sampleId"
          @click="select(c.sampleId)"
        >
          <small>0{{ i + 1 }} · {{ c.badge }}</small
          ><b>{{ c.label }}</b>
        </button>
      </div>
      <div v-if="error || unavailable" class="empty-state" role="alert">
        <h3>任务记录加载失败</h3>
        <p>不以自编场景替代。上下独立加载，请分别重试。</p>
        <button type="button" class="primary-button" @click="reload">
          重新加载任务工作台
        </button>
      </div>
      <div v-else-if="!entry" class="empty-state" role="status">
        <h3>没有匹配此编号的材料</h3>
        <p>请从上方选择，不会默认用第一条替代。</p>
      </div>
      <template v-else-if="record && sample"
        ><CalvinWorkbench :key="entry.sampleId" :record="record" />
        <div class="cv-evidence">
          <span>{{ entry.badge }}</span
          ><a :href="sample.source" target="_blank" rel="noreferrer"
            >核对这份材料的原始来源 ↗</a
          ><a href="#samples">查看原文与完整精度 ↓</a>
        </div></template
      >
      <p v-else class="empty-state" role="status">正在加载真实记录…</p>
      <details class="cv-protocol">
        <summary>比较结果前，先区分两套执行设置</summary>
        <div>
          <p>
            官方固定版本：每条链开始时重置环境一次；每个子任务最多 360
            环境步。子任务之间保留环境，model.reset
            只重置策略内部状态，不是重置仿真。
          </p>
          <p>
            此处序列来自 OpenBMB 实现：每子任务上限 720 步，默认
            reset=False；可选 reset=True
            会逐子任务回到链的初始环境，是另一种条件。两者都写 1,000
            条，不表示序列与运行协议逐项相同。
          </p>
          <a
            :href="`${calvinRoot}calvin_models/calvin_agent/evaluation/evaluate_policy.py`"
            target="_blank"
            rel="noreferrer"
            >官方固定评测循环 ↗</a
          >
          ·
          <a
            :href="`${calvinThirdParty}eval_calvin.py`"
            target="_blank"
            rel="noreferrer"
            >第三方固定运行设置 ↗</a
          >
          <p>
            本站只阅读配置、元数据与已保存数值，没有运行机器人或官方评测。官方代码的
            MIT 许可不自动确立数据与场景素材的再发布权。
          </p>
        </div>
      </details>
    </section>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style src="../styles/calvin-pilot.css"></style>
