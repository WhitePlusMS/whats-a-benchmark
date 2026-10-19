<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Icon from "./Icon.vue";
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    layout?: "sheet" | "image";
  }>(),
  { layout: "sheet" },
);
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
const dialog = ref<HTMLDialogElement>();
let trigger: HTMLElement | null = null;
let savedPage:
  | {
      overflow: string;
      scrollBehavior: string;
      position: string;
      top: string;
      width: string;
      x: number;
      y: number;
    }
  | undefined;
// 原生模态负责语义和Esc；固定正文可阻止正在运行的锚点动画继续改变阅读位置。
function restorePage() {
  if (!savedPage) return;
  const page = savedPage;
  savedPage = undefined;
  Object.assign(document.body.style, {
    position: page.position,
    top: page.top,
    width: page.width,
  });
  document.documentElement.style.overflow = page.overflow;
  window.scrollTo({ left: page.x, top: page.y, behavior: "instant" });
  document.documentElement.style.scrollBehavior = page.scrollBehavior;
  if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  trigger = null;
}
function syncOpen() {
  const element = dialog.value;
  if (!element) return;
  if (props.modelValue && !element.open) {
    trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    savedPage = {
      overflow: document.documentElement.style.overflow,
      scrollBehavior: document.documentElement.style.scrollBehavior,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      x: window.scrollX,
      y: window.scrollY,
    };
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({
      left: savedPage.x,
      top: savedPage.y,
      behavior: "instant",
    });
    Object.assign(document.body.style, {
      position: "fixed",
      top: `${-savedPage.y}px`,
      width: "100%",
    });
    document.documentElement.style.overflow = "hidden";
    element.showModal();
  } else if (!props.modelValue && element.open) element.close();
}
function close() {
  dialog.value?.close();
}
function onClose() {
  restorePage();
  emit("update:modelValue", false);
}
function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Tab" || !dialog.value) return;
  const controls = [
    ...dialog.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
    ),
  ].filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  // 在首尾控件主动循环，避免浏览器将反向Tab交给地址栏，保留明确的操作上下文。
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
watch(() => props.modelValue, syncOpen, { flush: "post" });
onMounted(syncOpen);
onBeforeUnmount(() => {
  dialog.value?.close();
  restorePage();
});
</script>
<template>
  <dialog
    ref="dialog"
    class="ui-dialog"
    :class="`ui-dialog-${layout}`"
    :aria-label="title"
    @close="onClose"
    @click.self="close"
    @keydown="onKeydown"
  >
    <div class="dialog-panel">
      <header class="dialog-heading">
        <h2>{{ title }}</h2>
        <button
          class="icon-button dialog-close"
          aria-label="关闭"
          autofocus
          @click="close"
        >
          <Icon name="close" :size="20" />
        </button>
      </header>
      <div class="dialog-content"><slot /></div>
      <footer v-if="$slots.footer" class="dialog-footer">
        <slot name="footer" />
      </footer>
    </div>
  </dialog>
</template>
<style scoped>
.ui-dialog {
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  padding: 0;
  width: min(520px, calc(100% - 32px));
  max-width: none;
  max-height: calc(100dvh - 40px);
  box-shadow:
    0 20px 70px rgb(0 0 0 / 24%),
    0 4px 12px rgb(0 0 0 / 12%);
  overflow: hidden;
}
.ui-dialog::backdrop {
  background: rgb(8 12 20 / 72%);
}
.dialog-panel {
  display: flex;
  flex-direction: column;
  max-height: inherit;
}
.dialog-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.dialog-heading h2 {
  font-size: 16px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.dialog-close {
  min-width: 44px;
  min-height: 44px;
  border-radius: 8px;
}
.dialog-close:hover {
  color: var(--text-strong);
  background: var(--surface-sunken);
}
.dialog-content {
  overflow-y: auto;
  overscroll-behavior: contain;
  min-height: 0;
  padding: 16px 20px;
}
.dialog-footer {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  padding: 12px 20px max(12px, env(safe-area-inset-bottom));
  flex-shrink: 0;
}
.ui-dialog-image {
  width: min(1280px, calc(100% - 40px));
}
.ui-dialog-image .dialog-content {
  padding: 0;
  overflow: hidden;
}
@media (max-width: 700px) {
  .ui-dialog-sheet {
    margin: auto 0 0;
    width: 100vw;
    max-width: 100vw;
    max-height: 88dvh;
    border-radius: 18px 18px 0 0;
    border-bottom: 0;
  }
  .ui-dialog-image {
    width: calc(100% - 16px);
    max-height: calc(100dvh - 24px);
  }
  .dialog-heading {
    padding-left: 16px;
  }
  .dialog-content {
    padding: 12px 16px;
  }
  .dialog-footer {
    padding-left: 16px;
    padding-right: 16px;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .ui-dialog[open] {
    animation: dialog-enter 180ms cubic-bezier(0.25, 1, 0.5, 1);
  }
  @keyframes dialog-enter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
}
</style>
