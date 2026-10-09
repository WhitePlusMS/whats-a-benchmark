<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { releases } from "../content/releases";
import { byId } from "../content/catalog";
import type { Release } from "../types/benchmark";
import { formatDate, formatMonth } from "../lib/displayFormats";
import Icon from "../components/Icon.vue";
useHead({ title: "发布资料索引 · what's a benchmark?" });
// 发布日期用于阅读分组，原始 release.id 继续承担卡片的稳定定位。
const grouped = new Map<
  string,
  { id: string; label: string; items: Release[] }
>();
for (const release of [...releases].sort((a, b) =>
  b.date.localeCompare(a.date),
)) {
  const month = release.date.slice(0, 7);
  const group = grouped.get(month) || {
    id: `release-month-${month}`,
    label: formatMonth(release.date),
    items: [],
  };
  group.items.push(release);
  grouped.set(month, group);
}
const groups = [...grouped.values()];
</script>
<template>
  <div class="container reading-page">
    <h1>发布资料索引</h1>
    <p class="page-lead">
      查阅官方模型发布资料及其中引用的评测，了解各项成绩对应的任务与指标。
    </p>
    <nav class="reading-index" aria-label="按发布月份跳转">
      <a v-for="group in groups" :key="group.id" :href="`#${group.id}`">{{
        group.label
      }}</a>
    </nav>
    <section
      v-for="group in groups"
      :id="group.id"
      :key="group.id"
      class="release-month"
    >
      <h2>{{ group.label }}</h2>
      <div class="release-grid">
        <article
          v-for="release in group.items"
          :id="release.id"
          :key="release.id"
          class="release-card"
        >
          <div class="section-line">
            <span class="publisher-mark" translate="no">{{
              release.publisher
            }}</span
            ><time class="muted" :datetime="release.date">{{
              formatDate(release.date)
            }}</time>
          </div>
          <h3 translate="no">{{ release.title }}</h3>
          <p>{{ release.description }}</p>
          <div class="release-benchmarks">
            <RouterLink
              v-for="id in release.benchmarkIds"
              :key="id"
              :to="`/benchmarks/${id}/`"
              ><span translate="no">{{ byId.get(id)?.name }}</span
              ><Icon name="arrow" :size="13"
            /></RouterLink>
          </div>
          <p class="release-note">{{ release.note }}</p>
          <a
            class="text-link"
            :href="release.url"
            target="_blank"
            rel="noreferrer"
            >查看官方发布资料 <Icon name="external" :size="16"
          /></a>
          <a
            v-if="release.chartUrl"
            class="text-link"
            :href="release.chartUrl"
            target="_blank"
            rel="noreferrer"
            >打开官方成绩图 <Icon name="image" :size="16"
          /></a>
        </article>
      </div>
    </section>
    <div class="info-banner">
      <Icon name="help" />
      <p>
        本页收录历史发布资料，保留发布日期。最新模型成绩请查阅相应的官方榜单。
      </p>
    </div>
  </div>
</template>
