<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { Benchmark, SampleFile } from "../types/benchmark";
import type { SampleAsset } from "../content/schema";
import { sampleAccessLabels } from "../content/labels";
import Icon from "./Icon.vue";
import ArcTask from "./ArcTask.vue";
const props = defineProps<{ item: Benchmark }>();
const baseUrl = import.meta.env.BASE_URL;
const ready = ref(false);
const data = ref<SampleFile | null>(null);
const error = ref(false);
const index = ref(0);
const mode = ref<"read" | "raw">("read");
const showAnswer = ref(false);
const selectedOption = ref<number | null>(null);
const failedAssets = ref<string[]>([]);
const retry = ref(0);
const current = computed(() => data.value?.samples[index.value]);
const externalTitle = computed(
  () => sampleAccessLabels[props.item.sampleAccess.status],
);
// 没有可直接展示的样例时，仍提供对应栏目的官方依据。
// `url` 表示具体数据/申请入口；回退到 sourceUrls 时只称“官方说明”，避免误导为可下载数据。
const externalUrl = computed(
  () =>
    props.item.sampleAccess.url || props.item.sampleAccess.sourceUrls[0],
);
const externalLinkLabel = computed(() =>
  props.item.sampleAccess.url ? "打开官方入口" : "查看官方说明",
);
const canSubmitDownloadedSample = computed(
  () =>
    props.item.dataAccess.status === "public" &&
    props.item.reusePolicy.status === "permitted",
);
onMounted(() => {
  ready.value = true;
});
watch(
  [() => props.item.id, ready, retry],
  async (_, __, onCleanup) => {
    data.value = null;
    error.value = false;
    index.value = 0;
    mode.value = "read";
    showAnswer.value = false;
    selectedOption.value = null;
    failedAssets.value = [];
    if (!ready.value || props.item.sampleAccess.status !== "local") return;
    // 离开当前评测时取消请求，避免较慢的旧响应覆盖新页面的样例。
    const controller = new AbortController();
    const benchmarkId = props.item.id;
    onCleanup(() => controller.abort());
    try {
      const response = await fetch(`${baseUrl}samples/${benchmarkId}.json`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Sample HTTP ${response.status}`);
      const result = (await response.json()) as SampleFile;
      if (
        result.benchmarkId !== benchmarkId ||
        !Array.isArray(result.samples) ||
        !result.samples.length
      )
        throw new Error("Invalid sample file");
      if (!controller.signal.aborted) data.value = result;
    } catch (cause) {
      if (!controller.signal.aborted) {
        error.value = true;
        console.error("[samples] Unable to load the selected task.", cause);
      }
    }
  },
  { immediate: true },
);
watch(index, () => {
  showAnswer.value = false;
  selectedOption.value = null;
  failedAssets.value = [];
  // 每个新样例默认先显示任务，避免沿用原始数据模式而直接暴露答案。
  mode.value = "read";
});
function assetUrl(path: string) {
  return `${baseUrl}${path}`;
}
function markAssetFailed(path: string) {
  if (!failedAssets.value.includes(path)) failedAssets.value.push(path);
}
function assetCaption(asset: SampleAsset) {
  return asset.kind === "file"
    ? asset.description || asset.label
    : asset.caption;
}
</script>
<template>
  <div v-if="item.sampleAccess.status !== 'local'" class="external-sample">
    <h3>{{ externalTitle }}</h3>
    <p>{{ item.sampleAccess.reason }}</p>
    <a
      v-if="externalUrl"
      class="secondary-button"
      :href="externalUrl"
      target="_blank"
      rel="noreferrer"
      >{{ externalLinkLabel }} <Icon name="up" :size="17"
    /></a>
    <p v-if="canSubmitDownloadedSample" class="downloaded-sample-note">
      如果你从官方入口合法下载了数据，可以将原始文件、记录 ID、数据划分和许可说明一并交给维护者复核。只有确认允许公开展示后，本站才会选取真实记录。
    </p>
  </div>
  <div v-else-if="error" class="empty-state" role="alert">
    <h3>样例加载失败</h3>
    <p>请重试，或通过参考资料查看原始任务。</p>
    <button class="primary-button" @click="retry++">重新加载</button>
  </div>
  <div v-else-if="!current" class="sample-loading" role="status">
    正在加载样例…
  </div>
  <div v-else class="sample-viewer">
    <div class="sample-toolbar">
      <div class="sample-tabs" role="group" aria-label="样例展示方式">
        <button
          :class="{ active: mode === 'read' }"
          :aria-pressed="mode === 'read'"
          @click="mode = 'read'"
        >
          任务内容</button
        ><button
          :class="{ active: mode === 'raw' }"
          :aria-pressed="mode === 'raw'"
          @click="mode = 'raw'"
        >
          原始数据<span v-if="current.answer" class="mode-note">含答案</span>
        </button>
      </div>
      <select v-model.number="index" aria-label="选择样例">
        <option v-for="(task, i) in data?.samples" :key="task.id" :value="i">
          {{ i + 1 }}. {{ task.title }}
        </option>
      </select>
    </div>
    <div class="sample-body">
      <div class="sample-question">
        <div class="section-line">
          <span class="sample-count"
            >样例 {{ index + 1 }} / {{ data?.samples.length }}</span
          ><span class="small-badge">{{
            current.excerpt ? "原始记录节选" : "公开样例"
          }}</span>
        </div>
        <h3>{{ current.title }}</h3>
        <template v-if="mode === 'read'">
          <p class="prompt-label">
            {{ current.gridTask ? "操作说明 · 本站整理" : "原题内容" }}
          </p>
          <pre
            class="prompt-text"
            :class="{ 'code-prompt': current.type === 'code' }"
            >{{ current.prompt }}</pre
          >
          <div v-if="current.assets" class="sample-assets">
            <figure
              v-for="asset in current.assets"
              :key="`${asset.kind}:${asset.path}`"
              class="sample-media"
            >
              <img
                v-if="
                  asset.kind === 'image' && !failedAssets.includes(asset.path)
                "
                :src="assetUrl(asset.path)"
                :alt="asset.alt"
                loading="lazy"
                @error="markAssetFailed(asset.path)"
              />
              <audio
                v-else-if="
                  asset.kind === 'audio' && !failedAssets.includes(asset.path)
                "
                :src="assetUrl(asset.path)"
                :aria-label="asset.caption || current.title"
                controls
                preload="metadata"
                @error="markAssetFailed(asset.path)"
              ></audio>
              <video
                v-else-if="
                  asset.kind === 'video' && !failedAssets.includes(asset.path)
                "
                :src="assetUrl(asset.path)"
                :poster="asset.poster ? assetUrl(asset.poster) : undefined"
                :aria-label="asset.caption || current.title"
                controls
                preload="metadata"
                @error="markAssetFailed(asset.path)"
              >
                <track
                  v-if="asset.captions"
                  kind="captions"
                  :src="assetUrl(asset.captions.path)"
                  :srclang="asset.captions.language"
                  :label="asset.captions.label"
                />
              </video>
              <a
                v-else-if="asset.kind === 'file'"
                class="sample-file secondary-button"
                :href="assetUrl(asset.path)"
                target="_blank"
                rel="noreferrer"
                >{{ asset.label }} <Icon name="up" :size="16"
              /></a>
              <p v-else class="media-error" role="alert">
                媒体加载失败，请通过原始来源查看。
              </p>
              <figcaption v-if="assetCaption(asset)">
                {{ assetCaption(asset) }}
              </figcaption>
              <details
                v-if="
                  (asset.kind === 'audio' || asset.kind === 'video') &&
                  asset.transcript
                "
                class="media-transcript"
              >
                <summary>查看官方转录文本</summary>
                <pre>{{ asset.transcript }}</pre>
              </details>
              <a
                v-if="asset.source"
                class="text-link media-source"
                :href="asset.source"
                target="_blank"
                rel="noreferrer"
                >查看媒体原始来源 <Icon name="up" :size="14"
              /></a>
            </figure>
          </div>
          <ArcTask
            v-if="current.gridTask"
            :task="current.gridTask"
            :show-answer="showAnswer"
          />
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
            v-if="current.answer"
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
            v-if="current.answer"
            v-show="showAnswer"
            :id="`sample-answer-${item.id}`"
            class="answer-content"
            >{{ current.answer }}</pre
          >
          <p v-if="!current.answer" class="muted">
            {{
              current.excerpt
                ? "本页节选不含参考答案，完整任务见原始来源。"
                : "此公开记录未附参考答案，完成标准见评分方法。"
            }}
          </p></template
        >
        <template v-else>
          <p class="muted">
            {{
              current.excerpt
                ? "以下为原始记录节选，完整记录见来源。"
                : current.answer
                  ? "以下为该样例的原始记录，包含参考答案。"
                  : "以下为该样例的原始记录。"
            }}
          </p>
          <pre class="raw-content" tabindex="0" aria-label="原始记录">{{
            typeof current.raw === "string"
              ? current.raw
              : JSON.stringify(current.raw, null, 2)
          }}</pre>
        </template>
      </div>
      <aside class="sample-insight">
        <span class="insight-heading">本站解读</span>
        <p>{{ current.explanation }}</p>
        <a
          :href="current.source"
          target="_blank"
          rel="noreferrer"
          class="text-link"
          >查看原始来源 <Icon name="up" :size="15"
        /></a>
        <details :key="current.id" class="sample-provenance">
          <summary>记录与许可</summary>
          <dl>
            <dt>记录编号</dt>
            <dd>{{ current.id }}</dd>
            <dt>数据划分</dt>
            <dd>{{ current.split }}</dd>
            <dt>展示方式</dt>
            <dd>
              {{
                current.excerpt
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
                >阅读许可原文 <Icon name="up" :size="15"
              /></a>
            </dd>
          </dl>
        </details>
      </aside>
    </div>
  </div>
</template>
<style scoped>
.mode-note {
  margin-left: 6px;
  font-size: 10px;
  color: var(--muted);
}
.downloaded-sample-note {
  max-width: 760px;
  margin-top: 14px;
  font-size: 12px;
  color: var(--muted);
}
.sample-assets {
  margin: 20px 0;
  display: grid;
  gap: 16px;
}
.sample-media {
  margin: 0;
  min-width: 0;
}
.sample-media img,
.sample-media video {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
}
.sample-media audio {
  display: block;
  width: 100%;
  max-width: 680px;
}
.sample-media figcaption,
.media-source {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}
.sample-file {
  display: inline-flex;
}
.media-error {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
}
.media-transcript {
  margin-top: 12px;
}
.media-transcript summary {
  cursor: pointer;
  font-size: 12px;
  font-weight: 550;
}
.media-transcript pre {
  margin-top: 10px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.sample-count,
.prompt-label {
  font-size: 12px;
  color: var(--muted);
}
.prompt-label {
  margin-bottom: 10px;
}
.code-prompt {
  font-family: "Cascadia Code", Consolas, monospace;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #f8f9fb;
  font-size: 12px;
}
.sample-options {
  margin: 20px 0 0;
  border: 0;
  padding: 0;
  min-width: 0;
}
.sample-options legend {
  font-size: 12px;
  color: var(--muted);
}
.answer-options li {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0;
  margin-bottom: 8px;
}
.answer-options label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  overflow-wrap: anywhere;
}
.answer-options input {
  margin: 5px 0 0;
  accent-color: var(--accent);
  flex-shrink: 0;
}
.answer-options .option-selected {
  border-color: var(--accent);
  background: #f5f3fc;
}
.sample-question > .muted {
  margin-top: 20px;
}
.sample-provenance {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.sample-provenance summary {
  cursor: pointer;
  font-size: 12px;
  font-weight: 550;
}
.sample-provenance summary:focus-visible {
  outline: 3px solid #b2a7ef;
  outline-offset: 3px;
}
.sample-provenance dd a {
  margin-top: 8px;
}
@media (max-width: 700px) {
  .sample-tabs button {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
