<script setup lang="ts">
import { computed } from "vue";
import type { Source } from "../content/schema";
import { splitCitationTail } from "../lib/citationText";
import EvidenceLinks from "./EvidenceLinks.vue";

const props = defineProps<{
  text: string;
  sources: Source[];
  urls: string[];
  excludeUrls?: string[];
}>();
const parts = computed(() => splitCitationTail(props.text));
</script>

<template>
  {{ parts.leading
  }}<span class="citation-tail"
    >{{ parts.tail
    }}<EvidenceLinks
      :sources="sources"
      :urls="urls"
      :exclude-urls="excludeUrls"
  /></span>
</template>

<style scoped>
/* 句末词与它的出处是一个阅读单元，不能把编号单独推到下一行。 */
.citation-tail {
  white-space: nowrap;
}
</style>
