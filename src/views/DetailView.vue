<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import type { Source } from "../content/schema";
import { byId, categoryById, kindLabels } from "../content/catalog";
import {
  dataAccessLabels,
  disclosureLabels,
  researchStatusLabels,
  reusePolicyLabels,
  sampleAccessLabels,
  sourceRoleLabels,
} from "../content/labels";
import { releases } from "../content/releases";
import { useComparison } from "../composables/compare";
import { useCatalogNavigation } from "../composables/catalogNavigation";
import EvidenceLinks from "../components/EvidenceLinks.vue";
import Icon from "../components/Icon.vue";
import SampleViewer from "../components/SampleViewer.vue";
import PublisherMarks from "../components/PublisherMarks.vue";

const route = useRoute();
const item = computed(() =>
  byId.get(String(route.meta.benchmarkId || route.params.id)),
);
const category = computed(
  () => item.value && categoryById.get(item.value.category),
);
const featuredIn = computed(() =>
  releases.filter((release) =>
    item.value ? release.benchmarkIds.includes(item.value.id) : false,
  ),
);
const { selected, toggle } = useComparison();
const { catalogLocation } = useCatalogNavigation();

interface SourceGroup {
  label: string;
  url: string;
  host: string;
  count: number;
  roles: Source["role"][];
}
function canonicalUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  return url.href;
}
function groupSources(sources: Source[]): SourceGroup[] {
  const groups = new Map<string, SourceGroup>();
  for (const source of sources) {
    const key = canonicalUrl(source.url);
    const existing = groups.get(key);
    if (existing) {
      existing.count++;
      if (!existing.roles.includes(source.role))
        existing.roles.push(source.role);
      continue;
    }
    groups.set(key, {
      label: source.label,
      url: source.url,
      host: new URL(source.url).hostname,
      count: 1,
      roles: [source.role],
    });
  }
  return [...groups.values()];
}
const officialSources = computed(() =>
  groupSources(
    item.value?.sources.filter((source) => source.role !== "vendor-report") ||
      [],
  ),
);
const vendorReports = computed(() =>
  groupSources(
    item.value?.sources.filter((source) => source.role === "vendor-report") ||
      [],
  ),
);
const profileGroups = computed(() => {
  if (!item.value) return [];
  return [
    { label: "规模", values: item.value.dataProfile.scale },
    { label: "数据划分", values: item.value.dataProfile.splits },
    { label: "主要字段", values: item.value.dataProfile.fields },
    { label: "文件与目录", values: item.value.dataProfile.files },
  ];
});
const dataAccessUrl = computed(
  () => item.value?.dataAccess.url || item.value?.dataAccess.sourceUrls[0],
);
const dataAccessLinkLabel = computed(() =>
  item.value?.dataAccess.url ? "打开官方数据入口" : "查看官方访问说明",
);
useHead(() => ({
  title: `${item.value?.name || "未找到评测"} · what's a benchmark?`,
  meta: [
    {
      name: "description",
      content:
        item.value?.officialDefinition.summary ||
        "了解 AI 评测的任务、样例与评分方法。",
    },
  ],
}));
</script>

<template>
  <div v-if="item" class="container detail-page">
    <nav class="breadcrumbs" aria-label="面包屑">
      <RouterLink :to="catalogLocation">返回目录</RouterLink><span>/</span>
      <RouterLink :to="{ path: '/', query: { category: item.category } }">
        {{ category?.name }}
      </RouterLink>
      <span>/</span><span>{{ item.name }}</span>
    </nav>

    <aside v-if="item.status === 'archived'" class="info-banner" role="note">
      <p><strong>本站已归档</strong> · {{ item.archiveNote }}</p>
      <p>保留历史资料与引用，不表示官方评测已停用。</p>
    </aside>

    <header class="detail-heading">
      <div class="detail-title-line">
        <PublisherMarks
          :benchmark-id="item.id"
          :publisher="item.publisher"
          large
        />
        <div>
          <div class="tags">
            <span>{{ kindLabels[item.kind] }}</span>
            <span>{{ category?.name }}</span>
            <span>{{ researchStatusLabels[item.researchStatus] }}</span>
          </div>
          <h1>{{ item.name }}</h1>
        </div>
      </div>
      <p class="detail-summary">{{ item.officialDefinition.summary }}</p>
      <div class="detail-cta">
        <a href="#samples" class="primary-button">
          <Icon name="file" :size="18" />
          {{ sampleAccessLabels[item.sampleAccess.status] }}
          <Icon name="arrow" :size="17" />
        </a>
        <button
          v-if="item.status === 'published'"
          class="secondary-button"
          @click="toggle(item.id)"
          :aria-pressed="selected.includes(item.id)"
        >
          <Icon name="compare" :size="18" />
          {{ selected.includes(item.id) ? "已加入对比" : "加入评测对比" }}
        </button>
      </div>
    </header>

    <div class="detail-facts">
      <div>
        <small>发布方</small><strong>{{ item.publisher }}</strong>
      </div>
      <div>
        <small>首次发布年份</small>
        <strong>{{ item.year || "尚未核实" }}</strong>
      </div>
      <div>
        <small>评测版本</small><strong>{{ item.version }}</strong>
      </div>
      <div>
        <small>数据访问</small>
        <strong>{{ dataAccessLabels[item.dataAccess.status] }}</strong>
      </div>
      <div>
        <small>资料核验日期</small><strong>{{ item.verifiedAt }}</strong>
      </div>
    </div>

    <nav class="detail-nav" aria-label="详情导航">
      <a href="#definition">官方定义</a>
      <a href="#task">任务协议</a>
      <a href="#data">数据与使用边界</a>
      <a href="#samples">真实样例</a>
      <a href="#score">评分方法</a>
      <a v-if="item.related.length" href="#relations">版本关系</a>
      <a href="#sources">参考资料</a>
    </nav>

    <section id="definition" class="detail-section">
      <div class="section-title-row">
        <h2>官方定义</h2>
        <span class="small-badge">{{
          researchStatusLabels[item.researchStatus]
        }}</span>
      </div>
      <p class="task-description">{{ item.officialDefinition.task }}</p>
      <EvidenceLinks
        :sources="item.sources"
        :urls="item.officialDefinition.sourceUrls"
      />
    </section>

    <section id="task" class="detail-section">
      <h2>任务协议</h2>
      <div class="contract-grid">
        <article>
          <small>任务输入</small>
          <p>{{ item.taskContract.input }}</p>
        </article>
        <article>
          <small>预期输出</small>
          <p>{{ item.taskContract.output }}</p>
        </article>
        <article>
          <small>执行环境</small>
          <p>{{ item.taskContract.environment }}</p>
        </article>
      </div>
      <EvidenceLinks
        :sources="item.sources"
        :urls="item.taskContract.sourceUrls"
      />
    </section>

    <section id="data" class="detail-section">
      <div class="section-title-row">
        <h2>数据与使用边界</h2>
        <span class="small-badge">
          {{ disclosureLabels[item.dataProfile.disclosure] }}
        </span>
      </div>
      <p class="task-description">{{ item.dataProfile.summary }}</p>
      <div class="profile-grid">
        <article v-for="group in profileGroups" :key="group.label">
          <small>{{ group.label }}</small>
          <ul v-if="group.values.length">
            <li v-for="value in group.values" :key="value">{{ value }}</li>
          </ul>
          <p v-else>官方资料未单独披露。</p>
        </article>
      </div>
      <EvidenceLinks
        :sources="item.sources"
        :urls="item.dataProfile.sourceUrls"
      />

      <div class="policy-grid">
        <article>
          <div class="section-title-row">
            <h3>数据访问</h3>
            <span class="small-badge">
              {{ dataAccessLabels[item.dataAccess.status] }}
            </span>
          </div>
          <ul v-if="item.dataAccess.requirements.length">
            <li
              v-for="requirement in item.dataAccess.requirements"
              :key="requirement"
            >
              {{ requirement }}
            </li>
          </ul>
          <a
            v-if="dataAccessUrl"
            :href="dataAccessUrl"
            target="_blank"
            rel="noreferrer"
            class="text-link"
          >
            {{ dataAccessLinkLabel }} <Icon name="up" :size="15" />
          </a>
          <EvidenceLinks
            :sources="item.sources"
            :urls="item.dataAccess.sourceUrls"
          />
        </article>
        <article>
          <div class="section-title-row">
            <h3>复用与许可</h3>
            <span class="small-badge">
              {{ reusePolicyLabels[item.reusePolicy.status] }}
            </span>
          </div>
          <dl class="policy-definition">
            <dt>许可记录</dt>
            <dd>{{ item.reusePolicy.license }}</dd>
            <dt>适用范围</dt>
            <dd>{{ item.reusePolicy.scope }}</dd>
          </dl>
          <ul v-if="item.reusePolicy.boundaries.length">
            <li v-for="boundary in item.reusePolicy.boundaries" :key="boundary">
              {{ boundary }}
            </li>
          </ul>
          <EvidenceLinks
            :sources="item.sources"
            :urls="item.reusePolicy.sourceUrls"
          />
        </article>
      </div>
    </section>

    <section id="samples" class="detail-section">
      <div class="section-title-row">
        <h2>真实样例</h2>
        <span class="small-badge">
          {{ sampleAccessLabels[item.sampleAccess.status] }}
        </span>
      </div>
      <SampleViewer :item="item" />
      <EvidenceLinks
        :sources="item.sources"
        :urls="item.sampleAccess.sourceUrls"
      />
    </section>

    <section id="score" class="detail-section">
      <h2>评分方法</h2>
      <div class="score-layout">
        <div class="metric-panel">
          <small>主要指标</small>
          <h3>{{ item.metric.name }}</h3>
          <span>
            {{
              item.metric.direction === "higher"
                ? "↑ 通常越高越好"
                : item.metric.direction === "lower"
                  ? "↓ 通常越低越好"
                  : "各分项方向不同"
            }}
          </span>
          <p>{{ item.metric.description }}</p>
          <EvidenceLinks
            :sources="item.sources"
            :urls="item.metric.sourceUrls"
          />
        </div>
        <div class="caveat-panel">
          <h3>适用范围与限制</h3>
          <ul>
            <li v-for="note in item.limitations" :key="note.text">
              <p>{{ note.text }}</p>
              <EvidenceLinks :sources="item.sources" :urls="note.sourceUrls" />
            </li>
          </ul>
          <RouterLink to="/guide/" class="text-link">
            评测指标说明 <Icon name="arrow" :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section v-if="item.related.length" id="relations" class="detail-section">
      <h2>版本与衍生评测</h2>
      <div class="relation-list">
        <article
          v-for="relation in item.related"
          :key="relation.id"
          class="relation-item"
        >
          <RouterLink :to="`/benchmarks/${relation.id}/`" class="relation-link">
            <span class="small-badge">{{ relation.label }}</span>
            <div>
              <h3>{{ byId.get(relation.id)?.name }}</h3>
              <p>{{ relation.detail }}</p>
            </div>
            <Icon name="arrow" :size="20" />
          </RouterLink>
          <EvidenceLinks :sources="item.sources" :urls="relation.sourceUrls" />
        </article>
      </div>
    </section>

    <section id="sources" class="detail-section">
      <h2>官方资料</h2>
      <p class="section-intro">
        同一官方页面的多个段落定位合并展示；各栏目仍保留精确的证据链接。
      </p>
      <div class="source-list">
        <a
          v-for="(source, index) in officialSources"
          :key="canonicalUrl(source.url)"
          :href="source.url"
          target="_blank"
          rel="noreferrer"
        >
          <span class="source-number">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <span>
            <strong>{{ source.label }}</strong>
            <small>
              {{
                source.roles.map((role) => sourceRoleLabels[role]).join(" · ")
              }}
              · {{ source.host }}
              <template v-if="source.count > 1">
                · {{ source.count }} 处定位
              </template>
            </small>
          </span>
          <Icon name="up" :size="21" />
        </a>
      </div>

      <template v-if="vendorReports.length">
        <div class="source-subheading">
          <h3>模型发布资料中的引用</h3>
          <p>这些资料说明某次模型发布采用了该评测，不用于定义评测本身。</p>
        </div>
        <div class="source-list source-list-secondary">
          <a
            v-for="source in vendorReports"
            :key="canonicalUrl(source.url)"
            :href="source.url"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <strong>{{ source.label }}</strong>
              <small>{{ source.host }}</small>
            </span>
            <Icon name="up" :size="19" />
          </a>
        </div>
      </template>

      <div v-if="featuredIn.length" class="featured-in">
        <span>本站收录的相关模型发布资料</span>
        <RouterLink
          v-for="release in featuredIn"
          :key="release.id"
          to="/releases/"
        >
          {{ release.title }} <Icon name="up" :size="13" />
        </RouterLink>
      </div>
    </section>
  </div>

  <div v-else class="container empty-state">
    <h1>没有找到这个评测</h1>
    <RouterLink to="/" class="primary-button">返回评测目录</RouterLink>
  </div>
</template>
