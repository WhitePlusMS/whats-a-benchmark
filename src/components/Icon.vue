<script setup lang="ts">
import { computed } from "vue";
import {
  BookOpen,
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
} from "@lucide/vue";
const props = withDefaults(defineProps<{ name: string; size?: number }>(), {
  size: 20,
});
const icons = {
  book: BookOpen,
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
};
// 未注册的图标名立刻暴露，不再静默渲染成问号圈。
const resolved = computed(() => {
  const icon = icons[props.name as keyof typeof icons];
  if (!icon) console.warn(`[Icon] 未注册的图标名: ${props.name}`);
  return icon || CircleHelp;
});
</script>
<template>
  <component
    :is="resolved"
    :size="size"
    :stroke-width="1.7"
    aria-hidden="true"
  />
</template>
