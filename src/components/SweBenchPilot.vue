<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import { findSweBenchCase, sweBenchCases } from "../content/sweBenchExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";

defineProps<{ selected: boolean }>();
defineEmits<{ toggle: [] }>();

type Step = "input" | "investigate" | "output" | "verify";
const steps: readonly { id: Step; label: string }[] = [
  { id: "input", label: "接收问题" },
  { id: "investigate", label: "理解问题" },
  { id: "output", label: "交付补丁" },
  { id: "verify", label: "检查结果" },
];
const activeStep = ref<Step>("input");
const mounted = ref(false);
const route = useRoute();
const router = useRouter();
const { data, error, reload } = useSampleLoader(
  () => "swe-bench-verified",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
// 与下方样例查看器使用同一个 URL；未知样例不静默显示其他题。
const activeCase = computed(() =>
  findSweBenchCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((item) => item.id === activeCase.value?.sampleId),
);
const guide = computed(() => sample.value?.walkthrough);
const currentStep = computed(() => {
  if (!sample.value || !guide.value || !activeCase.value) return undefined;
  switch (activeStep.value) {
    case "input":
      return {
        title: "从一份真实的软件问题开始",
        text: guide.value.input,
        note: "左侧是题目记录中的原文片段，不是模型的操作过程。",
      };
    case "investigate":
      return {
        title: activeCase.value.investigation,
        text: sample.value.prompt,
        note: "图解依据题目材料整理，不代表本站运行了代码。",
      };
    case "output":
      return {
        title: "交付能够应用的代码补丁",
        text: guide.value.output,
        note: "图形只表示交付物类型，本站没有展示参考补丁。",
      };
    case "verify":
      return {
        title: "用问题测试和回归测试检查",
        text: guide.value.checks[0],
        note: guide.value.checks[1] || guide.value.note,
      };
  }
});

watch(
  () => activeCase.value?.sampleId,
  () => {
    activeStep.value = "input";
  },
);
onMounted(() => {
  mounted.value = true;
});
function selectCase(sampleId: string) {
  void selectSampleFromWalkthrough(router, sampleId);
}
</script>

<template>
  <div class="swe-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="swe-bench-verified"
          publisher="SWE-bench 团队 / OpenAI"
          large
        />
        <span>编程与软件工程</span>
      </div>
      <h1 translate="no">SWE-bench <span>Verified</span></h1>
      <p class="pilot-lead">给 AI 一个真实的软件问题，看它能否修好代码。</p>
      <p class="pilot-description">
        模型需要理解问题、修改指定版本的代码，并交付可应用的补丁。评测程序再用问题测试和回归测试检查结果。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button">
          看一道真实任务 <Icon name="down" :size="16" />
        </a>
        <a href="#score" class="pilot-link">
          了解评分方式 <Icon name="down" :size="15" />
        </a>
        <button
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
      aria-labelledby="swe-walkthrough-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">SWE-bench Verified 的真实任务</span>
          <h2 id="swe-walkthrough-title">
            {{
              sample?.title ||
              (data ? "该任务暂未提供图解" : "从一道真实问题开始")
            }}
          </h2>
          <p>选择一道任务，看看问题是什么、如何交付与检查。</p>
        </div>
        <a href="#samples" class="pilot-link">
          查看完整原题 <Icon name="up" :size="15" />
        </a>
      </div>

      <div
        v-if="data"
        class="case-selector"
        role="group"
        aria-label="选择真实任务"
      >
        <button
          v-for="task in sweBenchCases"
          :key="task.sampleId"
          type="button"
          class="case-button"
          :class="{ active: activeCase?.sampleId === task.sampleId }"
          :aria-pressed="activeCase?.sampleId === task.sampleId"
          @click="selectCase(task.sampleId)"
        >
          {{ task.label }}
        </button>
      </div>

      <div
        v-if="sample && guide && activeCase && currentStep"
        class="walkthrough-card"
      >
        <div class="step-selector" role="group" aria-label="任务阅读步骤">
          <button
            v-for="(step, index) in steps"
            :key="step.id"
            type="button"
            class="step-button"
            :class="{ active: activeStep === step.id }"
            :aria-pressed="activeStep === step.id"
            aria-controls="swe-step-content"
            @click="activeStep = step.id"
          >
            <span class="step-number">0{{ index + 1 }}</span>
            <span>{{ step.label }}</span>
          </button>
        </div>
        <div
          id="swe-step-content"
          class="step-content"
          aria-live="polite"
          aria-atomic="true"
        >
          <Transition name="step-switch" mode="out-in">
            <div
              :key="activeCase.sampleId + ':' + activeStep"
              class="step-panel"
            >
              <div class="step-visual">
                <div v-if="activeStep === 'input'" class="evidence-window">
                  <div class="scene-bar">
                    <span class="scene-dots" aria-hidden="true"
                      ><i></i><i></i><i></i
                    ></span>
                    <span>问题记录</span><span>原文片段</span>
                  </div>
                  <pre tabindex="0" aria-label="题目原文片段" translate="no">{{
                    guide.excerpts[0]?.text
                  }}</pre>
                  <div class="scene-caption">
                    {{ guide.excerpts[0]?.label }}
                  </div>
                </div>

                <div
                  v-else-if="activeStep === 'investigate'"
                  class="diagram-window"
                >
                  <div class="scene-bar">
                    <span>{{ activeCase.label }}</span
                    ><span>根据原题整理</span>
                  </div>
                  <div
                    v-if="activeCase.visual === 'matrix'"
                    class="matrix-scene"
                  >
                    <div
                      class="matrix-pair"
                      role="img"
                      aria-label="题面中的右下二乘二矩阵：平铺时对角线为真，嵌套时四格均为真"
                    >
                      <div>
                        <span>平铺写法</span>
                        <div class="matrix-grid">
                          <b
                            v-for="(cell, index) in [true, false, false, true]"
                            :key="index"
                            :class="{ filled: cell }"
                            >{{ cell ? "T" : "·" }}</b
                          >
                        </div>
                      </div>
                      <span class="diagram-arrow" aria-hidden="true">→</span>
                      <div>
                        <span>嵌套写法</span>
                        <div class="matrix-grid">
                          <b v-for="index in 4" :key="index" class="filled"
                            >T</b
                          >
                        </div>
                      </div>
                    </div>
                    <p>T 表示存在依赖 · 展示原题矩阵右下 2 × 2</p>
                  </div>
                  <div
                    v-else-if="activeCase.visual === 'missing-column'"
                    class="diagram-flow"
                  >
                    <div class="column-pair">
                      <span>time</span><span class="removed">flux</span>
                    </div>
                    <span class="flow-caption">原题中删除必需列 flux</span>
                    <div class="issue-message">
                      expected 'time' … found 'time'
                    </div>
                    <span class="flow-caption">题面记录的异常信息</span>
                  </div>
                  <div
                    v-else-if="activeCase.visual === 'migration'"
                    class="diagram-flow"
                  >
                    <div class="flow-row">
                      <span>structured ndarray</span><b>→</b
                      ><span>NdarrayMixin</span>
                    </div>
                    <span class="flow-caption">题面描述的现有行为</span>
                    <div class="flow-row">
                      <span>FutureWarning</span><b>→</b><span>Column</span>
                    </div>
                    <span class="flow-caption"
                      >题面提案：先提醒，后续版本再调整</span
                    >
                  </div>
                  <div v-else class="diagram-flow">
                    <div class="flow-row">
                      <span>ITRS</span><b>→</b><span>站心位置</span><b>→</b
                      ><span>AltAz / HADec</span>
                    </div>
                    <span class="flow-caption">题面讨论的坐标变换关系</span>
                  </div>
                </div>

                <div v-else-if="activeStep === 'output'" class="artifact-scene">
                  <Icon name="code" :size="34" />
                  <strong>代码补丁</strong>
                  <span>应用到指定仓库的修改</span>
                  <small>交付物示意 · 不是参考答案</small>
                </div>
                <div v-else class="verification-scene">
                  <div>
                    <span>FAIL_TO_PASS</span><small>修复问题的测试</small>
                  </div>
                  <div>
                    <span>PASS_TO_PASS</span><small>保留原有功能的测试</small>
                  </div>
                  <p>评测程序检查两类测试 · 页面未运行评测</p>
                </div>
              </div>
              <div class="step-explanation">
                <span class="step-eyebrow"
                  >任务步骤 · 0{{
                    steps.findIndex((step) => step.id === activeStep) + 1
                  }}
                  / 04</span
                >
                <h3>{{ currentStep.title }}</h3>
                <p>{{ currentStep.text }}</p>
                <p class="step-note">{{ currentStep.note }}</p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="walkthrough-footer">
          <span>图解为本站整理；原题片段和完整来源见下方。</span>
          <a href="#samples" class="pilot-link"
            >查看原题和来源 <Icon name="up" :size="15"
          /></a>
        </div>
      </div>
      <div v-else-if="error" class="walkthrough-status" role="alert">
        <p>任务资料加载失败，请重新加载。</p>
        <button type="button" class="secondary-button" @click="reload">
          重新加载
        </button>
      </div>
      <p v-else-if="data" class="walkthrough-status">
        此样例尚未整理图解，可查看下方原题。
      </p>
      <p v-else class="walkthrough-status" role="status">正在加载真实任务…</p>
    </section>

    <aside class="score-summary">
      <div>
        <span>评分与比较</span>
        <h2>修复问题，也要保留原有功能</h2>
      </div>
      <div>
        <p>
          评测将补丁应用到指定仓库，用问题测试与回归测试检查；比较成绩时还要核对模型、运行框架和尝试次数。
        </p>
        <a href="#score" class="pilot-link"
          >查看评分说明 <Icon name="down" :size="15"
        /></a>
      </div>
    </aside>
  </div>
</template>

<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/swe-bench-pilot.css"></style>
