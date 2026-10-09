<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Benchmark } from "../types/benchmark";
import { useSampleViewer } from "../composables/sampleViewer";
import { createSampleLocation } from "../lib/sampleLocation";
import { sampleExternalUrl } from "../lib/sampleAccess";
import Icon from "./Icon.vue";
import ArcTask from "./ArcTask.vue";
import SampleMedia from "./SampleMedia.vue";
import CitedText from "./CitedText.vue";
const props = defineProps<{ item: Benchmark }>();
const baseUrl = import.meta.env.BASE_URL;
const ready = ref(false);
const viewer = useSampleViewer(
  () => props.item.id,
  () => ready.value && props.item.sampleAccess.status === "local",
  baseUrl,
);
const { selectSample, setMode } = createSampleLocation(useRouter(), viewer);
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
} = viewer;
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
      >{{ externalLinkLabel }} <Icon name="up" :size="17"
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
  <div v-else-if="!current" class="sample-loading" role="status">
    正在加载样例…
  </div>
  <div v-else class="sample-viewer">
    <div class="sample-toolbar">
      <div class="sample-tabs" role="group" aria-label="样例展示方式">
        <button
          :class="{ active: mode === 'read' }"
          :aria-pressed="mode === 'read'"
          @click="setMode('read')"
        >
          任务内容</button
        ><button
          :class="{ active: mode === 'raw' }"
          :aria-pressed="mode === 'raw'"
          @click="setMode('raw')"
        >
          原始数据<span
            v-if="current.excerpt"
            class="mode-note"
            >节选</span
          >
        </button>
      </div>
      <select
        :value="index"
        @change="
          selectSample(Number(($event.target as HTMLSelectElement).value))
        "
        aria-label="选择样例"
        name="sample"
        autocomplete="off"
      >
        <option v-for="(task, i) in data?.samples" :key="task.id" :value="i">
          {{ i + 1 }}. {{ task.title }}
        </option>
      </select>
    </div>
    <div class="sample-body">
      <div class="sample-question">
        <div class="section-line">
          <span class="sample-count" aria-live="polite" aria-atomic="true"
            >样例 {{ index + 1 }} / {{ data?.samples.length }}</span
          ><span class="small-badge">{{
            current.promptOrigin === "editorial"
              ? "官方公开案例 · 本站解读"
              : current.excerpt ? "原始记录节选" : "公开样例"
          }}</span>
        </div>
        <h3 translate="no">{{ current.title }}</h3>
        <template v-if="mode === 'read'">
          <p class="prompt-label">
            {{
              current.promptOrigin === "editorial"
                ? "具体任务 · 本站根据官方案例整理"
                : current.gridTask ? "操作说明 · 本站整理" : "原题内容"
            }}
          </p>
          <pre
            class="prompt-text"
            translate="no"
            :class="{ 'code-prompt': current.type === 'code' }"
            >{{ current.prompt }}</pre
          >
          <SampleMedia
            v-if="current.assets"
            :failed-assets="failedAssets"
            @asset-error="markAssetFailed"
            :key="`${item.id}:${current.id}`"
            :assets="current.assets"
            :title="current.title"
          />
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
            translate="no"
            >{{ current.answer }}</pre
          >
          <p v-if="!current.answer" class="muted">
            {{
              current.promptOrigin === "editorial"
                ? "任务说明由本站根据官方案例整理；原始数据可在上方切换查看。本条未附参考答案，完整案例与附件见来源。"
                : current.excerpt
                ? "本页节选不含参考答案，完整任务见原始来源。"
                : "此公开记录未附参考答案，完成标准见评分方法。"
            }}
          </p></template
        >
        <template v-else>
          <p class="muted">
            {{
              current.excerpt
                ? "以下为原始数据的精简版，保留来源字段和原始内容；省略范围见右侧说明，完整记录见来源。"
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
        <span class="insight-heading">怎样理解这道题</span>
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
            <dt>{{ current.promptOrigin === "editorial" ? "本页案例编号" : "记录编号" }}</dt>
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
                >阅读许可原文 <Icon name="up" :size="15"
              /></a>
            </dd>
          </dl>
        </details>
      </aside>
    </div>
  </div>
</template>
<style scoped src="../styles/sample-viewer.css"></style>
