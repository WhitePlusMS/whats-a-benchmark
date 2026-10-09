<script setup lang="ts">
import type { SampleAsset } from "../content/schema";
import Icon from "./Icon.vue";
defineProps<{
  assets: SampleAsset[];
  title: string;
  failedAssets: readonly string[];
}>();
// 由查看器保留当前样例的失败记录，切换到原始数据再返回时不重复请求失败媒体。
const emit = defineEmits<{ assetError: [path: string] }>();
const baseUrl = import.meta.env.BASE_URL;
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
      <img
        v-if="asset.kind === 'image' && !failedAssets.includes(asset.path)"
        :src="assetUrl(asset.path)"
        :alt="asset.alt"
        :width="asset.width"
        :height="asset.height"
        loading="lazy"
        @error="markAssetFailed(asset.path)"
      />
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
</style>
