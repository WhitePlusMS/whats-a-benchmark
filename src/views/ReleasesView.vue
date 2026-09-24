<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { releases } from "../content/releases";
import { byId } from "../content/catalog";
import Icon from "../components/Icon.vue";
useHead({ title: "发布资料索引 · what's a benchmark?" });
</script>
<template>
  <div class="container reading-page">
    <h1>发布资料索引</h1>
    <p class="page-lead">
      查阅官方模型发布资料及其中引用的评测，了解各项成绩对应的任务与指标。
    </p>
    <div class="release-grid">
      <article
        v-for="release in releases"
        :key="release.id"
        class="release-card"
      >
        <div class="section-line">
          <span class="publisher-mark">{{ release.publisher }}</span
          ><span class="muted">{{ release.date }}</span>
        </div>
        <h2>{{ release.title }}</h2>
        <p>{{ release.description }}</p>
        <div class="release-benchmarks">
          <RouterLink
            v-for="id in release.benchmarkIds"
            :key="id"
            :to="`/benchmarks/${id}/`"
            >{{ byId.get(id)?.name }}<Icon name="up" :size="13"
          /></RouterLink>
        </div>
        <p class="release-note">{{ release.note }}</p>
        <a
          class="text-link"
          :href="release.url"
          target="_blank"
          rel="noreferrer"
          >查看官方发布资料 <Icon name="external" :size="16" /></a
        ><a
          v-if="release.chartUrl"
          class="text-link"
          :href="release.chartUrl"
          target="_blank"
          rel="noreferrer"
          >打开官方成绩图 <Icon name="image" :size="16"
        /></a>
      </article>
    </div>
    <div class="info-banner">
      <Icon name="help" />
      <p>
        本页收录历史发布资料，保留发布日期。最新模型成绩请查阅相应的官方榜单。
      </p>
    </div>
  </div>
</template>
