<script setup lang="ts">
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
  ArrowRight,
  SlidersHorizontal,
  X,
  Plus,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  Copy,
  GitCompareArrows,
  Sparkles,
  FileText,
  ArrowLeft,
  ExternalLink,
  CircleHelp,
  Compass,
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
  arrow: ArrowRight,
  filter: SlidersHorizontal,
  close: X,
  plus: Plus,
  tick: Check,
  down: ChevronDown,
  grid: LayoutGrid,
  list: List,
  copy: Copy,
  compare: GitCompareArrows,
  sparkle: Sparkles,
  file: FileText,
  back: ArrowLeft,
  external: ExternalLink,
  help: CircleHelp,
  compass: Compass,
};
</script>
<template>
  <component
    :is="icons[props.name as keyof typeof icons] || CircleHelp"
    :size="size"
    :stroke-width="1.7"
    aria-hidden="true"
  />
</template>
