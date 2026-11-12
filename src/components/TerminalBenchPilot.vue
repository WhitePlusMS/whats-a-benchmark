<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";
import {
  findTerminalBenchCase,
  terminalBenchCases,
  type WalkthroughStep,
} from "../content/terminalBenchWalkthrough";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";

defineProps<{ selected: boolean }>();
defineEmits<{ toggle: [] }>();

const stepLabels: Record<WalkthroughStep, string> = {
  input: "接收材料",
  task: "理解任务",
  output: "交付结果",
  verify: "检查结果",
};
const stepOrder: WalkthroughStep[] = ["input", "task", "output", "verify"];
const activeStep = ref<WalkthroughStep>("input");
const route = useRoute();
const router = useRouter();
const mounted = ref(false);
// 静态 HTML 始终以首题生成；挂载后再恢复查询参数，避免深链接水合不一致。
const activeCase = computed(() =>
  findTerminalBenchCase(mounted.value ? route.query.sample : undefined),
);
const currentStep = computed(() => activeCase.value?.steps[activeStep.value]);
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
  <div class="terminal-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="terminal-bench-4"
          publisher="Terminal-Bench 团队"
          large
        />
        <span>Agent 与工具使用</span>
      </div>
      <h1 translate="no">Terminal-Bench <span>4.0</span></h1>
      <p class="pilot-lead">给 AI 一个终端，看它能否完成一项真实工作。</p>
      <p class="pilot-description">
        智能体需要在任务环境中使用工具、处理文件并交付结果。每道任务都有自己的验证方式，成绩反映模型与运行框架共同完成任务的表现。
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
      aria-labelledby="walkthrough-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">Terminal-Bench 4.0 的真实任务</span>
          <h2 id="walkthrough-title">
            {{ activeCase?.title || "该任务暂未提供图解" }}
          </h2>
          <p>选择一道任务，看看它需要什么、交付什么、如何验收。</p>
        </div>
        <a href="#samples" class="pilot-link">
          查看完整原题 <Icon name="up" :size="15" />
        </a>
      </div>

      <div class="case-selector" role="group" aria-label="选择真实任务">
        <button
          v-for="task in terminalBenchCases"
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
      <div v-if="activeCase && currentStep" class="walkthrough-card">
        <div class="step-selector" role="group" aria-label="任务阅读步骤">
          <button
            v-for="(step, index) in stepOrder"
            :key="step"
            type="button"
            class="step-button"
            :class="{ active: activeStep === step }"
            :aria-pressed="activeStep === step"
            aria-controls="task-step-content"
            @click="activeStep = step"
          >
            <span class="step-number">0{{ index + 1 }}</span>
            <span>{{ stepLabels[step] }}</span>
          </button>
        </div>
        <div
          id="task-step-content"
          class="step-content"
          aria-live="polite"
          aria-atomic="true"
        >
          <Transition name="step-switch" mode="out-in">
            <div
              :key="activeCase.sampleId + ':' + activeStep"
              class="step-panel"
            >
              <!-- 图形和示例结构均为本站示意，不能当作原题附件或模型输出。 -->
              <div class="step-visual" aria-hidden="true">
                <div
                  v-if="
                    activeCase.kind === 'layout' &&
                    (activeStep === 'input' || activeStep === 'task')
                  "
                  class="scene-window"
                >
                  <div class="scene-bar">
                    <span class="scene-dots"><i></i><i></i><i></i></span>
                    <span translate="no">layout.png</span>
                    <span>示意</span>
                  </div>
                  <div
                    class="artboard"
                    :class="{ 'artboard-layers': activeStep === 'task' }"
                  >
                    <span class="art-header"></span>
                    <span class="art-image"><i></i></span>
                    <span class="art-title"></span>
                    <span class="art-line art-line-one"></span>
                    <span class="art-line art-line-two"></span>
                    <span class="art-button"></span>
                    <template v-if="activeStep === 'task'">
                      <span class="layer-outline layer-image"
                        ><b>IMAGE</b></span
                      >
                      <span class="layer-outline layer-text"><b>TEXT</b></span>
                    </template>
                  </div>
                  <div class="scene-caption" translate="no">
                    {{
                      activeStep === "input"
                        ? "layout.png + components/"
                        : "位置 · 尺寸 · 样式 · 层级"
                    }}
                  </div>
                </div>
                <div
                  v-else-if="
                    activeCase.kind === 'layout' && activeStep === 'output'
                  "
                  class="scene-window code-window"
                >
                  <div class="scene-bar">
                    <span class="scene-dots"><i></i><i></i><i></i></span>
                    <span translate="no">config.json</span>
                    <span>结构示意</span>
                  </div>
                  <pre v-pre>
{
  "components": [
    { "type": "IMAGE", ... },
    { "type": "TEXT", ... }
  ],
  "style": { ... }
}</pre
                  >
                  <div class="scene-caption" translate="no">
                    /app/output/config.json
                  </div>
                </div>
                <div
                  v-else-if="activeCase.kind === 'layout'"
                  class="verify-scene"
                >
                  <div class="verify-pair">
                    <div>
                      <span class="verify-picture"><i></i><b></b></span
                      ><small>原图</small>
                    </div>
                    <span class="verify-arrow">→</span>
                    <div>
                      <span class="verify-picture"><i></i><b></b></span
                      ><small>重新渲染</small>
                    </div>
                  </div>
                  <div class="verify-threshold">
                    <strong>≥ 98<span>%</span></strong
                    ><span>像素一致率要求</span>
                  </div>
                </div>
                <div v-else class="scene-window concept-window">
                  <div class="scene-bar">
                    <span class="scene-dots"><i></i><i></i><i></i></span>
                    <span>{{ activeCase.label }}</span>
                    <span>示意</span>
                  </div>
                  <div class="concept-flow">
                    <div class="concept-node">
                      <Icon :name="currentStep.visual.leftIcon" :size="25" />
                      <strong translate="no">{{
                        currentStep.visual.left
                      }}</strong>
                      <small>{{ currentStep.visual.leftLabel }}</small>
                    </div>
                    <span class="concept-arrow">→</span>
                    <div class="concept-node">
                      <Icon :name="currentStep.visual.rightIcon" :size="25" />
                      <strong translate="no">{{
                        currentStep.visual.right
                      }}</strong>
                      <small>{{ currentStep.visual.rightLabel }}</small>
                    </div>
                  </div>
                  <div class="scene-caption">
                    {{ stepLabels[activeStep] }} · 任务示意
                  </div>
                </div>
              </div>
              <div class="step-explanation">
                <span class="step-eyebrow"
                  >任务步骤 · 0{{ stepOrder.indexOf(activeStep) + 1 }} /
                  04</span
                >
                <h3>{{ currentStep.title }}</h3>
                <p>{{ currentStep.description }}</p>
                <p class="step-note">{{ currentStep.note }}</p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="walkthrough-footer">
          <span>{{ activeCase.disclaimer }}</span>
          <div class="walkthrough-links">
            <a href="#samples" class="pilot-link"
              >查看原题和来源 <Icon name="up" :size="15"
            /></a>
            <a
              v-if="activeStep === 'verify' && activeCase.verificationUrl"
              :href="activeCase.verificationUrl"
              target="_blank"
              rel="noreferrer"
              class="pilot-link"
              >查看验收代码 <Icon name="up" :size="15"
            /></a>
          </div>
        </div>
      </div>
      <p v-else class="walkthrough-empty">
        此样例尚未整理图解，可查看下方原题。
      </p>
    </section>

    <aside class="score-summary">
      <div>
        <span>评分与比较</span>
        <h2>每道任务都有自己的验收方式</h2>
      </div>
      <div>
        <p>
          评测用任务验证结果汇总通过率。比较成绩前，还要核对评测版本、模型、运行框架、资源设置和重复次数。
        </p>
        <a href="#score" class="pilot-link"
          >查看评分说明 <Icon name="down" :size="15"
        /></a>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.terminal-pilot {
  padding-top: 28px;
}
.pilot-intro {
  max-width: 900px;
  padding: 0 0 36px;
}
.pilot-heading-line {
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--accent-text);
  font-size: 12px;
  font-weight: 650;
}
.pilot-intro h1 {
  margin-top: 18px;
  color: var(--text-strong);
  font-size: clamp(36px, 4vw, 50px);
  line-height: 1.1;
  letter-spacing: -0.045em;
  overflow-wrap: anywhere;
}
.pilot-intro h1 span {
  color: var(--accent-text);
}
.pilot-lead {
  margin-top: 16px;
  color: var(--text-strong);
  font-size: clamp(18px, 1.6vw, 21px);
  font-weight: 650;
  letter-spacing: -0.02em;
}
.pilot-description {
  max-width: 730px;
  margin-top: 9px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.9;
}
.pilot-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-top: 21px;
}
.pilot-actions .primary-button {
  gap: 8px;
}
.pilot-link,
.pilot-compare {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 40px;
  color: var(--accent-text);
  font-size: 13px;
  font-weight: 600;
}
.pilot-link:hover,
.pilot-compare:hover {
  color: var(--text-strong);
}
.pilot-compare {
  color: var(--text-secondary);
}
.pilot-compare[aria-pressed="true"] {
  color: var(--accent-text);
}
.walkthrough {
  padding: 30px 0 34px;
  border-top: 1px solid var(--border);
}
.walkthrough-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}
.walkthrough-kicker,
.score-summary > div:first-child > span {
  color: var(--accent-text);
  font-size: 12px;
  font-weight: 650;
}
.walkthrough-heading h2,
.score-summary h2 {
  margin-top: 6px;
  color: var(--text-strong);
  font-size: 25px;
  letter-spacing: -0.025em;
}
.walkthrough-heading p {
  margin-top: 7px;
  color: var(--muted);
  font-size: 13px;
}
.walkthrough-heading > .pilot-link {
  flex-shrink: 0;
}
.case-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.case-button {
  min-height: 42px;
  padding: 8px 15px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
}
.case-button:hover {
  border-color: var(--accent-border-strong);
}
.case-button.active {
  border-color: var(--accent-border-strong);
  background: var(--accent-softer);
  color: var(--accent-text);
}
.walkthrough-empty {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-secondary);
}
.walkthrough-card {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}
.step-selector {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-bottom: 1px solid var(--border);
}
.step-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 58px;
  padding: 12px 20px;
  color: var(--muted);
  text-align: left;
  font-size: 13px;
  font-weight: 600;
}
.step-button + .step-button {
  border-left: 1px solid var(--border);
}
.step-button:hover {
  background: var(--surface-subtle);
  color: var(--text-strong);
}
.step-button.active {
  background: var(--accent-softer);
  color: var(--accent-text);
}
.step-button.active::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: var(--accent-text);
  content: "";
}
.step-number {
  font-family: monospace;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
}
.step-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
}
.step-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  padding: 26px;
  border-right: 1px solid var(--border);
  background: var(--surface-subtle);
}
.scene-window {
  width: min(100%, 330px);
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: 9px;
  background: var(--surface);
  box-shadow: 0 12px 28px -22px var(--dock-shadow);
}
.scene-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-family: monospace;
  font-size: 10px;
}
.scene-dots {
  display: flex;
  gap: 4px;
}
.scene-dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--border-strong);
}
.artboard {
  position: relative;
  height: 150px;
  margin: 18px 22px;
  border: 1px solid var(--border);
  background: var(--surface-sunken);
}
.artboard > span:not(.layer-outline) {
  position: absolute;
  display: block;
  border-radius: 2px;
  background: var(--border-strong);
}
.art-header {
  top: 12%;
  left: 8%;
  width: 84%;
  height: 7%;
  opacity: 0.38;
}
.art-image {
  top: 30%;
  left: 8%;
  width: 37%;
  height: 49%;
  background: var(--accent-soft) !important;
}
.art-image i {
  position: absolute;
  right: 14%;
  bottom: 15%;
  left: 14%;
  height: 45%;
  background: var(--accent-border);
  clip-path: polygon(0 100%, 35% 20%, 55% 65%, 75% 38%, 100% 100%);
}
.art-title {
  top: 32%;
  left: 54%;
  width: 33%;
  height: 8%;
}
.art-line {
  left: 54%;
  height: 4%;
  opacity: 0.5;
}
.art-line-one {
  top: 47%;
  width: 36%;
}
.art-line-two {
  top: 56%;
  width: 26%;
}
.art-button {
  top: 69%;
  left: 54%;
  width: 23%;
  height: 10%;
  background: var(--accent-border-strong) !important;
}
.layer-outline {
  position: absolute;
  border: 1px dashed var(--accent-text);
}
.layer-outline b {
  position: absolute;
  top: -15px;
  left: -1px;
  padding: 0 3px;
  background: var(--accent-text);
  color: var(--surface);
  font: 9px monospace;
}
.layer-image {
  top: 28%;
  left: 7%;
  width: 39%;
  height: 53%;
}
.layer-text {
  top: 30%;
  left: 52%;
  width: 40%;
  height: 32%;
}
.scene-caption {
  padding: 0 12px 11px;
  color: var(--muted);
  font-family: monospace;
  font-size: 10px;
  text-align: center;
  overflow-wrap: anywhere;
}
.concept-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30px minmax(0, 1fr);
  align-items: center;
  padding: 22px 18px 18px;
}
.concept-node {
  display: flex;
  min-width: 0;
  min-height: 125px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 6px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface-subtle);
  text-align: center;
}
.concept-node > svg {
  margin-bottom: 4px;
  color: var(--accent-text);
}
.concept-node strong {
  max-width: 100%;
  color: var(--text-strong);
  font-size: 12px;
  overflow-wrap: anywhere;
}
.concept-node small {
  color: var(--muted);
  font-size: 11px;
}
.concept-arrow {
  color: var(--accent-text);
  text-align: center;
}
.code-window pre {
  min-height: 150px;
  margin: 0;
  padding: 20px 24px 10px;
  color: var(--text-secondary);
  font: 12px / 1.8 monospace;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.verify-scene {
  width: min(100%, 330px);
  text-align: center;
}
.verify-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}
.verify-pair > div {
  display: grid;
  gap: 7px;
  justify-items: center;
  color: var(--muted);
  font-size: 12px;
}
.verify-picture {
  position: relative;
  width: 106px;
  height: 77px;
  border: 1px solid var(--border-strong);
  border-radius: 5px;
  background: var(--surface);
}
.verify-picture i,
.verify-picture b {
  position: absolute;
  top: 17px;
  bottom: 16px;
  display: block;
  background: var(--accent-soft);
}
.verify-picture i {
  left: 12px;
  width: 34px;
}
.verify-picture b {
  right: 12px;
  width: 36px;
  height: 12px;
  background: var(--border);
}
.verify-arrow {
  color: var(--accent-text);
  font-size: 20px;
}
.verify-threshold {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  margin-top: 22px;
  color: var(--text-secondary);
  font-size: 12px;
}
.verify-threshold strong {
  color: var(--accent-text);
  font-size: 37px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
}
.verify-threshold strong span {
  margin-left: 2px;
  font-size: 0.55em;
}
.step-explanation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px 34px;
}
.step-eyebrow {
  color: var(--accent-text);
  font-size: 12px;
  font-weight: 650;
}
.step-explanation h3 {
  margin-top: 12px;
  color: var(--text-strong);
  font-size: 21px;
  letter-spacing: -0.02em;
}
.step-explanation > p {
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.9;
}
.step-explanation > .step-note {
  margin-top: 16px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}
.walkthrough-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 20px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
}
.walkthrough-footer .pilot-link {
  flex-shrink: 0;
}
.walkthrough-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
}
.score-summary {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 25px;
  align-items: start;
  padding: 26px 28px;
  margin-bottom: 32px;
  border: 1px solid var(--accent-border);
  border-radius: 10px;
  background: var(--accent-softer);
}
.score-summary h2 {
  font-size: 19px;
}
.score-summary p {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.85;
}
.score-summary .pilot-link {
  margin-top: 4px;
}
@media (prefers-reduced-motion: no-preference) {
  .step-switch-enter-active {
    transition:
      opacity 220ms ease,
      transform 220ms ease;
  }
  .step-switch-leave-active {
    transition: opacity 120ms ease;
  }
  .step-switch-enter-from {
    opacity: 0;
    transform: translateY(5px);
  }
  .step-switch-leave-to {
    opacity: 0;
  }
}
@media (max-width: 700px) {
  .terminal-pilot {
    padding-top: 22px;
  }
  .pilot-intro {
    padding-bottom: 28px;
  }
  .pilot-intro h1 {
    font-size: clamp(32px, 8vw, 42px);
  }
  .walkthrough-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }
  .walkthrough-heading h2 {
    font-size: 22px;
  }
  .case-selector {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .step-button {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
    min-height: 62px;
    padding: 10px;
    font-size: 12px;
  }
  .step-panel,
  .score-summary {
    grid-template-columns: 1fr;
  }
  .step-visual {
    min-height: 230px;
    padding: 22px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .step-explanation {
    padding: 24px;
  }
  .walkthrough-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
    padding: 12px 20px;
  }
  .score-summary {
    gap: 12px;
    padding: 22px;
  }
}
@media (max-width: 360px) {
  .step-button {
    padding: 9px 6px;
    font-size: 11px;
  }
  .verify-pair {
    gap: 10px;
  }
  .verify-picture {
    width: 85px;
  }
}
</style>
