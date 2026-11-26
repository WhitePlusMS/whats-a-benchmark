<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from "vue";
import { useTheme, type ThemePreset } from "../lib/theme";
import Icon from "./Icon.vue";

const { presets, activeId, applyTheme } = useTheme();
const open = ref(false);
const root = ref<HTMLElement>();
const trigger = ref<HTMLButtonElement>();
const menuId = useId();
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
      type="button"
      class="theme-trigger"
      aria-label="主题色"
      :aria-expanded="open"
      :aria-controls="menuId"
      :title="`主题色：${activePreset.name}`"
      @click="toggle"
    >
      <span class="theme-dot" aria-hidden="true" />
    </button>
    <Transition name="motion-menu">
      <div
        v-show="open"
        :id="menuId"
        :inert="!open"
        class="theme-menu"
        role="group"
        aria-label="主题色"
      >
        <button
          v-for="preset in presets"
          :key="preset.id"
          type="button"
          class="theme-choice"
          :aria-label="preset.name"
          :aria-pressed="preset.id === activeId"
          @click="choose(preset)"
        >
          <span
            class="theme-dot"
            :style="{
              '--swatch-light': preset.brand,
              '--swatch-dark': preset.darkBrand,
            }"
            aria-hidden="true"
          >
            <Icon v-if="preset.id === activeId" name="tick" :size="13" />
          </span>
        </button>
      </div>
    </Transition>
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
  background: light-dark(
    var(--swatch-light, var(--theme-brand)),
    var(--swatch-dark, var(--theme-dark-brand))
  );
  forced-color-adjust: none;
}
.theme-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(6, var(--ui-touch-target));
  gap: 2px;
  width: max-content;
  max-height: calc(100dvh - 108px);
  padding: 6px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--ui-card-radius);
  box-shadow: 0 8px 28px var(--dock-shadow);
}
.theme-choice {
  display: grid;
  place-items: center;
  min-height: var(--ui-touch-target);
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
}
.theme-choice .theme-dot {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  color: light-dark(#fff, #12151c);
}
.theme-choice:hover {
  background: var(--surface-sunken);
}
.theme-choice[aria-pressed="true"] {
  border-color: var(--accent-border);
  background: var(--accent-softer);
}
@media (forced-colors: active) {
  .theme-choice[aria-pressed="true"] {
    border-color: Highlight;
  }
}
@media (max-width: 780px) {
  /* 手机页眉可能换行，菜单固定在视口内，避免随触发点伸到屏幕左侧。 */
  .theme-menu {
    position: fixed;
    top: 96px;
    right: 18px;
  }
}
@media (max-width: 420px) {
  .theme-menu {
    grid-template-columns: repeat(4, var(--ui-touch-target));
  }
}
</style>
