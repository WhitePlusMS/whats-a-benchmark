<script setup lang="ts">
import { ref } from "vue";
import type { SampleAsset } from "../content/schema";
import UiDialog from "./UiDialog.vue";
import Icon from "./Icon.vue";
defineProps<{ asset: Extract<SampleAsset, { kind: "image" }>; url: string }>();
const emit = defineEmits<{ close: []; assetError: [path: string] }>();
const open = ref(true);
// 适应窗口与按原始像素滚动分别呈现；只缩放显示，不改动图片内容。
const scale = ref<number | null>(null);
function resize(step: number) {
  scale.value = Math.max(0.5, Math.min(3, (scale.value ?? 1) + step));
}
function updateOpen(value: boolean) {
  open.value = value;
  if (!value) emit("close");
}
</script>
<template>
  <UiDialog
    :model-value="open"
    title="案例图片"
    layout="image"
    @update:model-value="updateOpen"
  >
    <div class="image-controls" role="group" aria-label="图片缩放">
      <button
        :class="{ active: scale === null }"
        :aria-pressed="scale === null"
        @click="scale = null"
      >
        <Icon name="fit" :size="16" />适应窗口
      </button>
      <button
        :class="{ active: scale === 1 }"
        :aria-pressed="scale === 1"
        @click="scale = 1"
      >
        原始尺寸
      </button>
      <span class="zoom-controls"
        ><button
          aria-label="缩小图片"
          :disabled="scale === null || scale <= 0.5"
          @click="resize(-0.5)"
        >
          <Icon name="zoomout" :size="18" /></button
        ><span aria-live="polite">{{
          scale === null ? "适应" : `${Math.round(scale * 100)}%`
        }}</span
        ><button
          aria-label="放大图片"
          :disabled="scale !== null && scale >= 3"
          @click="resize(0.5)"
        >
          <Icon name="zoomin" :size="18" /></button
      ></span>
    </div>
    <div
      class="image-stage"
      :class="{ 'is-scaled': scale !== null }"
      :style="{ '--image-height': `${asset.height + 40}px` }"
      tabindex="0"
      aria-label="图片查看区域，可滚动查看放大后的图片"
    >
      <img
        :src="url"
        :alt="asset.alt"
        :width="asset.width"
        :height="asset.height"
        :style="
          scale !== null
            ? {
                width: `${asset.width * scale}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }
            : undefined
        "
        @error="emit('assetError', asset.path)"
      />
    </div>
    <template #footer
      ><div class="image-caption">
        <p>{{ asset.caption || asset.alt }}</p>
        <span
          >{{ asset.width }} × {{ asset.height }} ·
          {{
            scale === null ? "可切换原始尺寸查看细节" : "可横向或纵向滚动查看"
          }}</span
        >
      </div>
      <a
        v-if="asset.source"
        :href="asset.source"
        target="_blank"
        rel="noreferrer"
        class="image-original"
        >原始来源<Icon name="up" :size="15" /></a
    ></template>
  </UiDialog>
</template>
<style scoped>
.image-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
}
.image-controls button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 40px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}
.image-controls button:hover {
  background: var(--surface-sunken);
  color: var(--text-strong);
}
.image-controls button.active {
  background: var(--accent-softer);
  color: var(--accent-text);
}
.image-controls button:disabled {
  opacity: 0.35;
}
.zoom-controls {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.zoom-controls > span {
  min-width: 42px;
  text-align: center;
  color: var(--muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.image-stage {
  display: grid;
  place-items: center;
  height: min(64dvh, var(--image-height));
  padding: 20px;
  overflow: auto;
  overscroll-behavior: contain;
  background: #11151a;
}
.image-stage img {
  display: block;
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: calc(64dvh - 40px);
  margin: auto;
  object-fit: contain;
}
.image-stage.is-scaled {
  display: block;
}
.image-caption {
  min-width: 0;
}
.image-caption p {
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
  overflow-wrap: anywhere;
}
.image-caption > span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: var(--muted);
}
.image-original {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  font-size: 12px;
  white-space: nowrap;
  color: var(--accent-text);
}
@media (max-width: 700px) {
  .image-controls {
    padding: 6px 8px;
    gap: 2px;
  }
  .image-controls button {
    padding: 6px 8px;
    min-height: 44px;
  }
  .zoom-controls {
    gap: 0;
  }
  .zoom-controls button {
    min-width: 44px;
  }
  .zoom-controls > span {
    min-width: 34px;
  }
  .image-stage {
    height: min(54dvh, var(--image-height));
    padding: 12px;
  }
  .image-stage img {
    max-height: calc(54dvh - 24px);
  }
  .image-caption p {
    font-size: 11px;
  }
}
@media (max-height: 500px) {
  .image-stage {
    height: 34dvh;
  }
  .image-stage img {
    max-height: calc(34dvh - 24px);
  }
}
</style>
