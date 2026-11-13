<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { Benchmark, TaskSample } from "../types/benchmark";
import { useSampleViewer } from "../composables/sampleViewer";
import { createSampleLocation } from "../lib/sampleLocation";
import { findMmluProCase } from "../content/mmluProExperience";
import { findBfclCase } from "../content/bfclExperience";
import { samplePickerLabel } from "../lib/samplePickerLabel";
import { sampleExternalUrl } from "../lib/sampleAccess";
import { nextLiberoMediaRetryToken } from "../lib/liberoMediaRetry";
import Icon from "./Icon.vue";
import ArcTask from "./ArcTask.vue";
import SampleMedia from "./SampleMedia.vue";
import CitedText from "./CitedText.vue";
import SampleWalkthrough from "./SampleWalkthrough.vue";
const props = defineProps<{
  item: Benchmark;
  detailId?: string;
  wideVisual?: boolean;
}>();
const emit = defineEmits<{ settled: [] }>();
const slots = defineSlots<{
  visual?(props: { sample: TaskSample; showAnswer: boolean }): unknown;
}>();
const hasVisualMedia = computed(
  () => !!slots.visual && ["roboquest", "libero"].includes(props.item.id),
);
const hasVisualGrid = computed(
  () => !!slots.visual && props.item.id === "arc-agi-2",
);
const baseUrl = import.meta.env.BASE_URL;
const ready = ref(false);
const viewer = useSampleViewer(
  () => props.item.id,
  () => ready.value && props.item.sampleAccess.status === "local",
  baseUrl,
);
const { selectSample, setMode } = createSampleLocation(
  useRouter(),
  viewer,
  () => props.detailId ?? props.item.id,
);
const {
  data,
  error,
  reload,
  index,
  current,
  mode,
  showAnswer,
  selectedOption,
  failedAssets,
  markAssetFailed,
  retryMedia: retryViewerMedia,
} = viewer;
const rawHasAnswer = computed(
  () => !!(current.value?.answer || current.value?.gridTask),
);
const showExplanation = computed(
  () =>
    mode.value === "raw" ||
    showAnswer.value ||
    !(current.value?.options && current.value.answer),
);
const mediaRetryToken = ref("");
function retryMedia() {
  if (props.item.id === "libero")
    mediaRetryToken.value = nextLiberoMediaRetryToken();
  retryViewerMedia();
}
// 通知嵌入页：加载成功或失败的界面已渲染，可据此处理受高度变化影响的锚点。
watch(
  [data, error],
  ([loaded, failed]) => {
    if (loaded || failed) emit("settled");
  },
  { flush: "post" },
);
// 没有可直接展示的样例时，仍提供对应栏目的官方依据。
// `url` 表示具体数据/申请入口；回退到 sourceUrls 时只称“官方说明”，避免误导为可下载数据。
const externalUrl = computed(() => sampleExternalUrl(props.item));
const externalLinkLabel = computed(() =>
  props.item.sampleAccess.status === "gated"
    ? "查看申请入口"
    : props.item.sampleAccess.url
      ? "查看官方样例入口"
      : "查看官方说明",
);
const canSubmitDownloadedSample = computed(
  () =>
    props.item.dataAccess.status === "public" &&
    props.item.reusePolicy.status === "permitted",
);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <div v-if="item.sampleAccess.status !== 'local'" class="external-sample">
    <template v-if="item.embodied?.taskExample">
      <h3>{{ item.embodied.taskExample.title }}</h3>
      <ol>
        <li v-for="step in item.embodied.taskExample.steps" :key="step">
          {{ step }}
        </li>
      </ol>
      <p>{{ item.embodied.taskExample.note }}</p>
    </template>
    <p>
      <CitedText
        :text="item.sampleAccess.reason"
        :sources="item.sources"
        :urls="item.sampleAccess.sourceUrls"
        :exclude-urls="externalUrl ? [externalUrl] : []"
      />
    </p>
    <a
      v-if="externalUrl"
      class="secondary-button"
      :href="externalUrl"
      target="_blank"
      rel="noreferrer"
      >{{ externalLinkLabel }} <Icon name="up" :size="16"
    /></a>
    <details v-if="canSubmitDownloadedSample" class="downloaded-sample-note">
      <summary>向维护者提供真实样例</summary>
      <p>
        如果你从官方入口合法下载了数据，可以将原始文件、记录
        ID、数据划分和许可说明一并交给维护者复核。只有确认允许公开展示后，本站才会选取真实记录。
      </p>
    </details>
  </div>
  <div v-else-if="error" class="empty-state" role="alert">
    <h3>样例加载失败</h3>
    <p>请重试，或通过参考资料查看原始任务。</p>
    <button class="primary-button" @click="reload">重新加载</button>
  </div>
  <div v-else-if="!data" class="sample-loading" role="status">
    正在加载样例…
  </div>
  <div v-else class="sample-viewer">
    <div class="sample-toolbar">
      <div
        v-if="current"
        class="sample-tabs"
        role="group"
        aria-label="样例展示方式"
      >
        <button
          :class="{ active: mode === 'read' }"
          :aria-pressed="mode === 'read'"
          @click="setMode('read')"
        >
          任务内容</button
        ><button
          :class="{ active: mode === 'raw' }"
          :aria-pressed="mode === 'raw'"
          :aria-describedby="
            rawHasAnswer ? 'sample-raw-note-' + item.id : undefined
          "
          @click="setMode('raw')"
        >
          原始数据
        </button>
      </div>
      <div class="sample-picker">
        <button
          class="sample-step"
          aria-label="上一个案例"
          title="上一个案例"
          :disabled="index <= 0"
          @click="selectSample(index - 1)"
        >
          <Icon name="back" :size="17" />
        </button>
        <select
          :value="index"
          @change="
            selectSample(Number(($event.target as HTMLSelectElement).value))
          "
          aria-label="选择样例"
          name="sample"
          autocomplete="off"
        >
          <option v-if="!current" :value="-1" disabled>选择有效样例</option>
          <option v-for="(task, i) in data?.samples" :key="task.id" :value="i">
            {{ i + 1 }}. {{ samplePickerLabel(task) }}
          </option>
        </select>
        <button
          class="sample-step sample-next"
          aria-label="下一个案例"
          title="下一个案例"
          :disabled="index >= (data?.samples.length || 0) - 1"
          @click="selectSample(index + 1)"
        >
          <Icon name="back" :size="17" />
        </button>
      </div>
    </div>
    <p
      v-if="rawHasAnswer"
      :id="'sample-raw-note-' + item.id"
      class="sample-raw-note"
    >
      原始数据含参考答案。
    </p>
    <p v-if="!current" class="empty-state" role="status">
      没有匹配此编号的样例，请重新选择。
    </p>
    <div
      v-else
      class="sample-body"
      :class="{ 'sample-body-wide': wideVisual && mode === 'read' }"
    >
      <div class="sample-question">
        <div class="section-line">
          <span class="sample-count" aria-live="polite" aria-atomic="true"
            >样例 {{ index + 1 }} / {{ data?.samples.length }}</span
          ><span class="small-badge">{{
            item.embodied
              ? "来源记录 · 本站解读"
              : current.promptOrigin === "editorial"
                ? "官方公开案例 · 本站解读"
                : current.excerpt
                  ? "原始记录节选"
                  : "公开样例"
          }}</span>
        </div>
        <h3 translate="no">{{ current.title }}</h3>
        <template v-if="mode === 'read'">
          <div v-if="failedAssets.length" class="sample-media-retry">
            <button type="button" class="secondary-button" @click="retryMedia">
              重新加载本条记录媒体
            </button>
          </div>
          <SampleWalkthrough
            v-if="current.walkthrough"
            :key="`${item.id}:${current.id}`"
            :sample="current"
          >
            <SampleMedia
              v-if="item.embodied && current.assets && !hasVisualMedia"
              overview
              :failed-assets="failedAssets"
              :retry-token="item.id === 'libero' ? mediaRetryToken : undefined"
              @asset-error="markAssetFailed"
              :assets="current.assets"
              :title="current.title"
            />
            <div v-if="$slots.visual" class="case-visual">
              <slot name="visual" :sample="current" :show-answer="showAnswer" />
            </div>
          </SampleWalkthrough>
          <template v-else>
            <p class="prompt-label">
              {{
                item.embodied
                  ? "任务与记录"
                  : current.promptOrigin === "editorial"
                    ? "具体任务 · 本站根据官方案例整理"
                    : current.gridTask
                      ? "操作说明 · 本站整理"
                      : "原题内容"
              }}
            </p>
            <pre
              class="prompt-text"
              translate="no"
              :class="{ 'code-prompt': current.type === 'code' }"
              >{{ current.prompt }}</pre
            >
          </template>
          <SampleMedia
            v-if="
              current.assets &&
              !hasVisualMedia &&
              !(current.walkthrough && item.embodied)
            "
            :failed-assets="failedAssets"
            :retry-token="item.id === 'libero' ? mediaRetryToken : undefined"
            @asset-error="markAssetFailed"
            :key="`${item.id}:${current.id}`"
            :assets="current.assets"
            :title="current.title"
          />
          <ArcTask
            v-if="current.gridTask && !hasVisualGrid"
            :task="current.gridTask"
            :show-answer="showAnswer"
          />
          <div v-if="$slots.visual && !current.walkthrough" class="case-visual">
            <slot name="visual" :sample="current" :show-answer="showAnswer" />
          </div>
          <fieldset v-if="current.options" class="sample-options">
            <legend>选项</legend>
            <ol class="answer-options" type="A">
              <li
                v-for="(option, i) in current.options"
                :key="i"
                :class="{ 'option-selected': selectedOption === i }"
              >
                <label>
                  <input
                    v-model="selectedOption"
                    type="radio"
                    :name="`sample-option-${item.id}`"
                    :value="i"
                  />
                  <span>{{ option }}</span>
                </label>
              </li>
            </ol>
          </fieldset>
          <button
            v-if="current.answer && !hasVisualGrid"
            class="answer-button"
            @click="showAnswer = !showAnswer"
            :aria-expanded="showAnswer"
            :aria-controls="`sample-answer-${item.id}`"
          >
            <Icon name="down" :size="16" />{{
              showAnswer ? "收起参考答案" : "查看参考答案"
            }}
          </button>
          <pre
            v-if="current.answer && showAnswer && !hasVisualGrid"
            :id="`sample-answer-${item.id}`"
            class="answer-content"
            translate="no"
            >{{ current.answer }}</pre
          >
          <p
            v-if="!current.answer && !item.embodied && !current.walkthrough"
            class="muted"
          >
            {{
              item.id === "bfcl" && findBfclCase(current.id)
                ? "官方参考调用来自独立标注文件。"
                : current.promptOrigin === "editorial"
                  ? "任务说明由本站根据官方案例整理；原始数据可在上方切换查看。本条未附参考答案，完整案例与附件见来源。"
                  : current.excerpt
                    ? "本页节选不含参考答案，完整任务见原始来源。"
                    : "此公开记录未附参考答案，完成标准见评分方法。"
            }}
          </p></template
        >
        <template v-else>
          <div v-if="item.id === 'mmlu-pro'" class="muted">
            <p>
              以下包含数据集公开答案与示范
              CoT，未经本站改写；公开解释不保证每一步正确，不是模型隐藏思维或本轮输出。
            </p>
            <p v-if="findMmluProCase(current.id)?.correction">
              <strong>公开解释纠错：</strong
              >{{ findMmluProCase(current.id)?.correction }}
            </p>
          </div>
          <p v-else-if="current.gridTask" class="muted">原始网格含参考输出。</p>
          <p v-else-if="item.id === 'human-eval'" class="muted">
            原始记录含参考代码与测试。
          </p>
          <p v-else-if="item.id === 'gsm8k'" class="muted">
            原始记录含参考推导与答案。
          </p>
          <p class="muted">
            {{
              current.excerpt
                ? "以下为原始数据的精简版，保留来源字段和原始内容；删节说明见「记录与许可」，完整记录见原始来源。"
                : "以下为该样例的原始数据，保留来源格式和内容。"
            }}
          </p>
          <pre
            class="raw-content"
            tabindex="0"
            aria-label="原始数据"
            translate="no"
            >{{
              typeof current.raw === "string"
                ? current.raw
                : JSON.stringify(current.raw, null, 2)
            }}</pre
          >
        </template>
      </div>
      <aside class="sample-insight">
        <div v-if="current.references?.length">
          <span class="insight-heading">本条记录的参考网页</span>
          <ul>
            <li v-for="reference in current.references" :key="reference.url">
              <a
                :href="reference.url"
                target="_blank"
                rel="noreferrer"
                class="text-link"
                >{{ reference.label }}</a
              >
            </li>
          </ul>
        </div>
        <template v-if="showExplanation">
          <span class="insight-heading">{{
            item.embodied ? "怎样理解这条记录" : "怎样理解这道题"
          }}</span>
          <p>{{ current.explanation }}</p>
        </template>
        <a
          :href="current.source"
          target="_blank"
          rel="noreferrer"
          class="text-link"
          >查看原始来源 <Icon name="up" :size="16"
        /></a>
        <details :key="current.id" class="sample-provenance">
          <summary>记录与许可</summary>
          <dl>
            <dt>
              {{
                current.promptOrigin === "editorial"
                  ? "本页案例编号"
                  : "记录编号"
              }}
            </dt>
            <dd translate="no">{{ current.id }}</dd>
            <dt>数据划分</dt>
            <dd>{{ current.split }}</dd>
            <dt>展示方式</dt>
            <dd>
              {{
                current.promptOrigin === "editorial"
                  ? "任务说明由本站整理，原始数据保留来源格式及内容，删节范围另行说明"
                  : current.excerpt
                    ? "节选，完整内容见来源"
                    : "保留原题语言，中文解读由本站整理"
              }}
            </dd>
            <dt>出处与许可</dt>
            <dd>
              {{ current.license }}
              <a
                v-if="current.licensePath"
                :href="`${baseUrl}${current.licensePath}`"
                target="_blank"
                rel="noreferrer"
                class="text-link"
                >阅读许可原文 <Icon name="up" :size="16"
              /></a>
            </dd>
          </dl>
        </details>
      </aside>
    </div>
  </div>
</template>
<style scoped src="../styles/sample-viewer.css"></style>
