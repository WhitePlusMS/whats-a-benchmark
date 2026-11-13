<script lang="ts">
export interface ComparisonValue {
  text?: string;
  mono?: boolean;
  notes?: string[];
  link?: { href: string; label: string };
}
</script>

<script setup lang="ts">
defineProps<{ value: ComparisonValue }>();
</script>

<template>
  <p v-if="value.text" :class="{ mono: value.mono }">{{ value.text }}</p>
  <ul v-else-if="value.notes?.length">
    <li v-for="note in value.notes" :key="note">{{ note }}</li>
  </ul>
  <p v-else-if="value.notes || !value.link" class="muted">本站尚未整理</p>
  <RouterLink v-if="value.link" :to="value.link.href" class="text-link">{{
    value.link.label
  }}</RouterLink>
</template>
