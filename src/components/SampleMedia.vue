<script setup lang="ts">
import type { SampleAsset } from "../content/schema";
import { ref } from "vue";
import Icon from "./Icon.vue";
import SampleImageDialog from "./SampleImageDialog.vue";
defineProps<{
  assets: SampleAsset[];
  title: string;
  failedAssets: readonly string[];
}>();
// 由查看器保留当前样例的失败记录，切换到原始数据再返回时不重复请求失败媒体。
const emit = defineEmits<{ assetError: [path: string] }>();
const baseUrl = import.meta.env.BASE_URL;
const openedImage = ref<Extract<SampleAsset, { kind: "image" }> | null>(null);
function assetUrl(path: string) {
  return `${baseUrl}${path}`;
}
function markAssetFailed(path: string) {
  emit("assetError", path);
}
function assetCaption(asset: SampleAsset) {
  return asset.kind === "file"
    ? asset.description || asset.label
    : asset.caption;
}
</script>
<template>
  <div class="sample-assets">
    <figure
      v-for="asset in assets"
      :key="`${asset.kind}:${asset.path}`"
      class="sample-media"
    >
      <button
        v-if="asset.kind === 'image' && !failedAssets.includes(asset.path)"
        class="sample-image-button"
        :aria-label="`放大图片：${asset.alt}`"
        aria-haspopup="dialog"
        @click="openedImage = asset"
      >
        <img
          :src="assetUrl(asset.path)"
          :alt="asset.alt"
          :width="asset.width"
          :height="asset.height"
          loading="lazy"
          @error="markAssetFailed(asset.path)"
        /><span class="image-action"
          ><Icon name="image" :size="15" />点击放大<span
            >{{ asset.width }} × {{ asset.height }}</span
          ></span
        >
      </button>
      <audio
        v-else-if="asset.kind === 'audio' && !failedAssets.includes(asset.path)"
        :src="assetUrl(asset.path)"
        :aria-label="asset.caption || title"
        controls
        preload="metadata"
        @error="markAssetFailed(asset.path)"
      ></audio>
      <video
        v-else-if="asset.kind === 'video' && !failedAssets.includes(asset.path)"
        :src="assetUrl(asset.path)"
        :poster="asset.poster ? assetUrl(asset.poster) : undefined"
        :aria-label="asset.caption || title"
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
          (asset.kind === 'audio' || asset.kind === 'video') && asset.transcript
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
  <SampleImageDialog
    v-if="openedImage"
    :asset="openedImage"
    :url="assetUrl(openedImage.path)"
    @close="openedImage = null"
    @asset-error="markAssetFailed"
  />
</template>
<style scoped>
.sample-assets {
  margin: 20px 0;
  display: grid;
  gap: 16px;
}
.sample-media {
  margin: 0;
  min-width: 0;
}
.sample-image-button {
  display: block;
  max-width: 100%;
  padding: 0;
  text-align: left;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
}
.sample-image-button:hover {
  border-color: var(--accent-border-strong);
}
.image-action {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 6px 10px;
  color: var(--accent-text);
  font-size: 12px;
  background: var(--surface-subtle);
}
.image-action > span {
  margin-left: auto;
  font-size: 11px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.sample-image-button img {
  border-radius: 0;
}
@media (max-width: 700px) {
  .image-action {
    min-height: 44px;
  }
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
  font-weight: 600;
}
.media-transcript pre {
  margin-top: 10px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
