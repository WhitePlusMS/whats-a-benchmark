<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ComponentPublicInstance } from "vue";
import { brands, benchmarkBrands } from "../content/brands";

const props = withDefaults(
  defineProps<{
    benchmarkId: string;
    publisher: string;
    large?: boolean;
  }>(),
  { large: false },
);
const failed = ref<string[]>([]);
const baseUrl = import.meta.env.BASE_URL;
const marks = computed(() =>
  (benchmarkBrands[props.benchmarkId] || [])
    .map((id) => brands[id])
    .filter((brand) => brand),
);
function markFailed(id: string) {
  if (!failed.value.includes(id)) failed.value.push(id);
}
// Static HTML can finish loading an image before Vue attaches its error listener.
function checkImage(
  element: Element | ComponentPublicInstance | null,
  id: string,
) {
  if (
    element instanceof HTMLImageElement &&
    element.complete &&
    element.naturalWidth === 0
  ) {
    markFailed(id);
  }
}
// A missing local image falls back to the publisher's name, never a made-up logo.
watch(
  () => props.benchmarkId,
  () => {
    failed.value = [];
  },
);
</script>

<template>
  <span class="publisher-marks" :class="{ large }">
    <span
      v-for="mark in marks"
      :key="mark.id"
      class="publisher-logo"
      :class="{ wide: mark.wide, 'is-fallback': failed.includes(mark.id) }"
      :style="{ backgroundColor: failed.includes(mark.id) ? undefined : mark.background }"
      :title="mark.name"
    >
      <img
        v-if="!failed.includes(mark.id)"
        :ref="(element) => checkImage(element, mark.id)"
        :src="`${baseUrl}${mark.file}`"
        :alt="`${mark.name} 标识`"
        width="40"
        height="40"
        decoding="async"
        @error="markFailed(mark.id)"
      />
      <span v-else class="publisher-name" translate="no">{{ mark.name }}</span>
    </span>
    <span v-if="!marks.length" class="publisher-name" translate="no">{{
      publisher
    }}</span>
  </span>
</template>

<style scoped>
.publisher-marks {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  min-width: 0;
  max-width: 100%;
}
.publisher-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  background: white;
}
.publisher-logo img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.publisher-logo.is-fallback {
  height: auto;
  min-height: 44px;
  background: transparent;
}
/* 横向标识在详情页和移动端也保持横向尺寸，避免被large规则覆盖。 */
.publisher-logo.wide,
.large .publisher-logo.wide {
  width: 84px;
  flex-basis: 84px;
}
.publisher-logo.wide img,
.large .publisher-logo.wide img {
  width: 80px;
}
.publisher-name {
  /* 文字占位使用主题色的半透明玻璃底，柔化边缘并透出后方背景。 */
  display: inline-block;
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  border: 1px solid color-mix(in srgb, var(--surface) 75%, transparent);
  border-radius: 8px;
  backdrop-filter: blur(12px) saturate(140%);
  box-shadow: 0 2px 8px var(--dock-shadow);
  padding: 4px 6px;
  color: var(--muted-tint);
  font-size: 12px;
  line-height: 1.5;
  font-weight: 600;
  overflow-wrap: anywhere;
}
.large .publisher-logo {
  width: 54px;
  height: 54px;
  flex-basis: 54px;
}
.large .publisher-logo img {
  width: 48px;
  height: 48px;
}
.large .publisher-name {
  max-width: 110px;
}
:global(.list-view .publisher-marks) {
  flex-direction: column;
  align-items: flex-start;
}
:global(.list-view .publisher-logo.wide) {
  width: 44px;
  flex-basis: 44px;
}
:global(.list-view .publisher-logo.wide img) {
  width: 44px;
}
@media (max-width: 600px) {
  .large {
    gap: 4px;
  }
  .large .publisher-logo {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  }
  .large .publisher-logo img {
    width: 36px;
    height: 36px;
  }
}
</style>
