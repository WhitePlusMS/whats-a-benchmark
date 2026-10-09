<script setup lang="ts">
import { onBeforeUnmount, ref, useId } from "vue";

// 公共提示层只承载静态说明，触发链接/按钮及其动作由调用者保留。
const tooltipId = `tooltip-${useId()}`;
const trigger = ref<HTMLElement>();
const popup = ref<HTMLElement>();
const position = ref({ left: "0px", top: "0px" });
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function clearCloseTimer() {
  clearTimeout(closeTimer);
  closeTimer = undefined;
}
function removePositionListeners() {
  window.removeEventListener("scroll", onViewportChange, true);
  window.removeEventListener("resize", onViewportChange);
}
function hide() {
  clearCloseTimer();
  if (popup.value?.matches(":popover-open")) popup.value.hidePopover();
  removePositionListeners();
}
function show() {
  clearCloseTimer();
  if (!trigger.value || !popup.value) return;
  // 原生顶层避免表格、卡片或折叠记录的 overflow 裁切；hint 同时只显示一个提示。
  if (!popup.value.matches(":popover-open")) popup.value.showPopover();
  place();
  window.addEventListener("scroll", onViewportChange, true);
  window.addEventListener("resize", onViewportChange);
}
function place() {
  if (!trigger.value || !popup.value) return;
  const anchor = trigger.value.getBoundingClientRect();
  const content = popup.value.getBoundingClientRect();
  const edge = 12;
  const gap = 8;
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const left = Math.max(
    edge,
    Math.min(
      anchor.left + anchor.width / 2 - content.width / 2,
      width - content.width - edge,
    ),
  );
  const preferredTop = anchor.top - content.height - gap;
  const top =
    preferredTop >= edge
      ? preferredTop
      : Math.min(anchor.bottom + gap, height - content.height - edge);
  position.value = { left: `${left}px`, top: `${Math.max(edge, top)}px` };
}
function onViewportChange() {
  // Tab 聚焦时浏览器会自动滚动；跟随该滚动，避免焦点刚到提示就消失。
  if (trigger.value?.contains(document.activeElement)) place();
  else hide();
}
function onClick(event: MouseEvent) {
  if (event.target instanceof Node && !popup.value?.contains(event.target))
    hide();
}
function scheduleHide() {
  clearCloseTimer();
  if (trigger.value?.contains(document.activeElement)) return;
  // 留出跨越触发点和浮层间隙的时间，移入说明文字后继续保持显示。
  closeTimer = setTimeout(hide, 150);
}
function onToggle() {
  // Esc、点击外部或另一个 hint 的原生关闭也要释放监听。
  if (!popup.value?.matches(":popover-open")) {
    clearCloseTimer();
    removePositionListeners();
  }
}
onBeforeUnmount(hide);
</script>

<template>
  <span
    ref="trigger"
    class="ui-tooltip"
    @mouseenter="show"
    @mouseleave="scheduleHide"
    @focusin="show"
    @focusout="hide"
    @click.capture="onClick"
  >
    <slot :described-by="tooltipId" />
    <span
      ref="popup"
      :id="tooltipId"
      class="ui-tooltip-content"
      role="tooltip"
      popover="hint"
      :style="position"
      @mouseenter="clearCloseTimer"
      @mouseleave="scheduleHide"
      @toggle="onToggle"
    >
      <slot name="content" />
    </span>
  </span>
</template>
