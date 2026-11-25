<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useTheme, type ThemePreset } from "../lib/theme";

const { presets, activeId, applyTheme } = useTheme();
const open = ref(false);
const root = ref<HTMLElement>();
const trigger = ref<HTMLButtonElement>();
const activePreset = computed(
  () => presets.find((preset) => preset.id === activeId.value) ?? presets[0],
);

function onDocClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) close();
}
function close() {
  open.value = false;
  document.removeEventListener("click", onDocClick);
}
function toggle() {
  open.value = !open.value;
  if (open.value) document.addEventListener("click", onDocClick);
  else document.removeEventListener("click", onDocClick);
}
function choose(preset: ThemePreset) {
  applyTheme(preset);
  close();
  trigger.value?.focus();
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && open.value) {
    event.preventDefault();
    close();
    trigger.value?.focus();
  }
}
function onFocusout(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) close();
}
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<template>
  <div
    ref="root"
    class="theme-switcher"
    @keydown="onKeydown"
    @focusout="onFocusout"
  >
    <button
      ref="trigger"
      class="theme-trigger"
      aria-label="主题色"
      :aria-expanded="open"
      :title="`主题色：${activePreset.name}`"
      @click="toggle"
    >
      <span class="theme-dot on" :style="{ background: activePreset.brand }" />
    </button>
    <div v-if="open" class="theme-menu" role="group" aria-label="主题色">
      <button
        v-for="preset in presets"
        :key="preset.id"
        class="theme-dot"
        :class="{ on: preset.id === activeId }"
        :aria-pressed="preset.id === activeId"
        :aria-label="preset.name"
        :title="preset.name"
        :style="{ background: preset.brand }"
        @click="choose(preset)"
      />
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
  display: inline-flex;
}
.theme-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
}
.theme-trigger:hover {
  background: var(--accent-softer);
}
.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  padding: 0;
}
.theme-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 60;
  display: flex;
  gap: 0;
  padding: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: 0 8px 28px rgb(37 41 50 / 14%);
}
.theme-menu .theme-dot {
  width: 44px;
  height: 44px;
  border: 13px solid var(--surface);
  cursor: pointer;
}
.theme-menu .theme-dot:hover {
  transform: scale(1.15);
}
.theme-menu .theme-dot.on {
  box-shadow:
    inset 0 0 0 2px var(--surface),
    0 0 0 1px var(--accent);
}
@media (max-width: 400px) {
  .theme-menu {
    display: grid;
    grid-template-columns: repeat(4, 44px);
    border-radius: 16px;
  }
}
@media (max-width: 780px) {
  /* 手机页眉可能换行，菜单固定在视口内，避免随触发点伸到屏幕左侧。 */
  .theme-menu {
    position: fixed;
    top: 96px;
    right: 20px;
  }
}
</style>
