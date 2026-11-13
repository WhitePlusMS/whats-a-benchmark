<script setup lang="ts">
import { computed, ref } from "vue";
import {
  findTerminalBenchCase,
  type WalkthroughStep,
} from "../content/terminalBenchWalkthrough";
import type { TaskSample } from "../types/benchmark";
import Icon from "./Icon.vue";

const props = defineProps<{ sample: TaskSample }>();
const stepLabels: Record<WalkthroughStep, string> = {
  input: "接收材料",
  task: "理解任务",
  output: "交付结果",
  verify: "检查结果",
};
const stepOrder: WalkthroughStep[] = ["input", "task", "output", "verify"];
const activeStep = ref<WalkthroughStep>("input");
const activeCase = computed(() => findTerminalBenchCase(props.sample.id));
const currentStep = computed(() => activeCase.value?.steps[activeStep.value]);
</script>

<template>
  <div class="terminal-pilot">
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
          <div :key="activeCase.sampleId + ':' + activeStep" class="step-panel">
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
                    <span class="layer-outline layer-image"><b>IMAGE</b></span>
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
                >任务步骤 · 0{{ stepOrder.indexOf(activeStep) + 1 }} / 04</span
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
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped>
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
.walkthrough-empty {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-secondary);
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
