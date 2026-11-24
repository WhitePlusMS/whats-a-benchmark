<script setup lang="ts">
import { computed } from "vue";
import {
  BookOpen,
  Bot,
  Code2,
  Sigma,
  Workflow,
  Image,
  Files,
  CheckCheck,
  BriefcaseBusiness,
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  Plus,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  GitCompareArrows,
  Sparkles,
  ArrowLeft,
  CircleHelp,
  Compass,
  Sun,
  Moon,
  SunMoon,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "@lucide/vue";
const props = withDefaults(defineProps<{ name: string; size?: number }>(), {
  size: 20,
});
const icons = {
  book: BookOpen,
  robot: Bot,
  code: Code2,
  sigma: Sigma,
  workflow: Workflow,
  image: Image,
  files: Files,
  check: CheckCheck,
  briefcase: BriefcaseBusiness,
  search: Search,
  up: ArrowUpRight,
  filter: SlidersHorizontal,
  close: X,
  plus: Plus,
  tick: Check,
  down: ChevronDown,
  grid: LayoutGrid,
  list: List,
  compare: GitCompareArrows,
  sparkle: Sparkles,
  back: ArrowLeft,
  help: CircleHelp,
  compass: Compass,
  sun: Sun,
  moon: Moon,
  sunmoon: SunMoon,
  zoomin: ZoomIn,
  zoomout: ZoomOut,
  fit: Maximize,
};
// 未注册的图标名立刻暴露，不再静默渲染成问号圈。
const resolved = computed(() => {
  const icon = icons[props.name as keyof typeof icons];
  if (!icon) console.warn(`[Icon] 未注册的图标名: ${props.name}`);
  return icon || CircleHelp;
});
</script>
<template>
  <svg
    v-if="name === 'robot-arm'"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M3 21h12M6 21v-3h6v3M8 18v-3m1-4 3-6m2-1 5 3m1 2v3m-2 2 2-2 2 2" />
    <circle cx="8" cy="13" r="2" />
    <circle cx="13" cy="4" r="1.5" />
    <circle cx="20" cy="8" r="1.5" />
  </svg>
  <component
    v-else
    :is="resolved"
    :size="size"
    :stroke-width="1.7"
    aria-hidden="true"
  />
</template>
