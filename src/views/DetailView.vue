<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { byId, categoryById, kindLabels } from "../content/catalog";
import {
  dataAccessLabels,
  disclosureLabels,
  researchStatusLabels,
  reusePolicyLabels,
  sampleAccessLabels,
} from "../content/labels";
import { releases } from "../content/releases";
import { useComparison } from "../composables/compare";
import { useCatalogNavigation } from "../composables/catalogNavigation";
import { groupSourceReferences } from "../lib/sourceReferences";
import {
  compositionSample,
  sampleAction,
  sampleSectionTitle,
} from "../lib/sampleAccess";
import { formatDate, formatPercent } from "../lib/displayFormats";
import CitedText from "../components/CitedText.vue";
import SourceList from "../components/SourceList.vue";
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
const scoreInterpretation = computed(() => {
  const reading = item.value?.interpretation;
  return [
    { key: "judge", label: "谁来评分", value: reading?.judge },
    {
      key: "comparison",
      label: "比较成绩前先核对",
      value: reading?.comparison,
    },
  ].flatMap((row) => (row.value ? [{ ...row, ...row.value }] : []));
});
const featuredIn = computed(() =>
  releases.filter(
    (release) => item.value && release.benchmarkIds.includes(item.value.id),
  ),
);
const { selected, toggle } = useComparison();
const { catalogLocation } = useCatalogNavigation();
const sourceGroups = computed(() =>
  groupSourceReferences(item.value?.sources || []),
);
const officialSources = computed(() =>
  sourceGroups.value.filter((group) => !group.vendorReport),
);
const vendorReports = computed(() =>
  sourceGroups.value.filter((group) => group.vendorReport),
);
const allProfileGroups = computed(() =>
  item.value
    ? [
        { label: "规模", values: item.value.dataProfile.scale },
        { label: "数据划分", values: item.value.dataProfile.splits },
        { label: "主要字段", values: item.value.dataProfile.fields },
        { label: "文件与目录", values: item.value.dataProfile.files },
      ]
    : [],
);
const profileGroups = computed(() =>
  allProfileGroups.value.filter((group) => group.values.length),
);
const missingProfileLabels = computed(() =>
  allProfileGroups.value
    .filter((group) => !group.values.length)
    .map((group) => group.label),
);
const dataAccessUrl = computed(
  () => item.value?.dataAccess.url || item.value?.dataAccess.sourceUrls[0],
);
const dataAccessLinkLabel = computed(() =>
  item.value?.composition
    ? "查看指数方法说明"
    : item.value?.dataAccess.url
      ? "打开官方数据入口"
      : "查看官方访问说明",
);
const primaryAction = computed(() => item.value && sampleAction(item.value));
const sampleTitle = computed(
  () => item.value && sampleSectionTitle(item.value),
);
const constituentSample = computed(
  () => item.value && compositionSample(item.value, byId),
);
// 数据获取与交叉导航只补充新出处，已在相邻概况/定义/版本说明中注明的来源不重列。
const accessEvidenceExclusions = computed(() => [
  ...(item.value?.dataProfile.sourceUrls || []),
  ...(dataAccessUrl.value ? [dataAccessUrl.value] : []),
]);
const relationEvidenceExclusions = computed(() => [
  ...(item.value?.officialDefinition.sourceUrls || []),
  ...(item.value?.interpretation?.versionChanges?.sourceUrls || []),
]);
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
      <RouterLink :to="{ path: '/', query: { category: item.category } }">{{
        category?.name
      }}</RouterLink>
      <span>/</span><span translate="no">{{ item.name }}</span>
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
            <span>{{ kindLabels[item.kind] }}</span
            ><span>{{ category?.name }}</span
            ><span>{{ researchStatusLabels[item.researchStatus] }}</span>
          </div>
          <h1 translate="no">{{ item.name }}</h1>
          <p class="detail-subtitle">{{ item.subtitle }}</p>
        </div>
      </div>
      <p class="detail-summary">{{ item.officialDefinition.summary }}</p>
      <div class="detail-cta">
        <a
          v-if="primaryAction"
          :href="primaryAction.href"
          :target="primaryAction.external ? '_blank' : undefined"
          :rel="primaryAction.external ? 'noreferrer' : undefined"
          class="primary-button"
        >
          <Icon
            :name="primaryAction.external ? 'external' : 'file'"
            :size="18"
          />{{ primaryAction.label
          }}<Icon :name="primaryAction.external ? 'up' : 'arrow'" :size="17" />
        </a>
        <button
          v-if="item.status === 'published'"
          class="secondary-button"
          @click="toggle(item.id)"
          :aria-pressed="selected.includes(item.id)"
        >
          <Icon name="compare" :size="18" />{{
            selected.includes(item.id) ? "已加入对比" : "加入评测对比"
          }}
        </button>
      </div>
    </header>
    <div class="detail-facts">
      <div>
        <small>发布方</small
        ><strong translate="no">{{ item.publisher }}</strong>
      </div>
      <div>
        <small>首次发布年份</small
        ><strong>{{ item.year || "尚未核实" }}</strong>
      </div>
      <div>
        <small>评测版本</small
        ><strong translate="no">{{ item.version }}</strong>
      </div>
      <div>
        <small>数据访问</small
        ><strong>{{ dataAccessLabels[item.dataAccess.status] }}</strong>
      </div>
      <div>
        <small>资料核验日期</small
        ><strong
          ><time :datetime="item.verifiedAt">{{
            formatDate(item.verifiedAt)
          }}</time></strong
        >
      </div>
    </div>
    <nav class="detail-nav" aria-label="详情导航">
      <a href="#definition">测什么</a><a href="#task">具体任务</a>
      <a v-if="item.composition" href="#composition">指数组成</a>
      <a href="#samples">{{ sampleTitle }}</a
      ><a href="#score">评分与比较</a><a href="#data">数据与许可</a>
      <a
        v-if="item.related.length || item.interpretation?.versionChanges"
        href="#relations"
        >版本关系</a
      ><a href="#sources">参考资料</a>
    </nav>

    <section id="definition" class="detail-section">
      <h2>测什么</h2>
      <p class="task-description">
        <CitedText
          :text="item.officialDefinition.task"
          :sources="item.sources"
          :urls="item.officialDefinition.sourceUrls"
        />
      </p>
    </section>
    <section id="task" class="detail-section">
      <h2>
        <CitedText
          text="具体任务"
          :sources="item.sources"
          :urls="item.taskContract.sourceUrls"
          :exclude-urls="item.officialDefinition.sourceUrls"
        />
      </h2>
      <div class="contract-grid">
        <article>
          <small>模型收到什么</small>
          <p>{{ item.taskContract.input }}</p>
        </article>
        <article>
          <small>需要完成什么</small>
          <p>{{ item.taskContract.output }}</p>
        </article>
        <article>
          <small>工具与运行条件</small>
          <p>{{ item.taskContract.environment }}</p>
        </article>
      </div>
    </section>
    <section v-if="item.composition" id="composition" class="detail-section">
      <h2>
        指数组成 · <span translate="no">{{ item.version }}</span>
      </h2>
      <p class="task-description">
        <CitedText
          text="权重表示各项对总分的贡献；计分与换算见下表。不同版本的总分不能直接混比。"
          :sources="item.sources"
          :urls="item.composition.sourceUrls"
        />
      </p>
      <div
        class="composition-scroll"
        tabindex="0"
        aria-label="指数组成表，可横向滚动"
      >
        <table class="composition-table">
          <thead>
            <tr>
              <th scope="col">能力分组</th>
              <th scope="col">评测</th>
              <th scope="col">权重</th>
              <th scope="col">计分口径</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="component in item.composition.items" :key="component.id">
              <td>{{ component.group }}</td>
              <th scope="row">
                <RouterLink
                  :to="`/benchmarks/${component.id}/`"
                  class="text-link"
                  translate="no"
                  >{{ byId.get(component.id)?.name }}</RouterLink
                >
              </th>
              <td>{{ formatPercent(component.weight / 100) }}</td>
              <td>{{ component.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="samples" class="detail-section">
      <div class="section-title-row">
        <h2>{{ sampleTitle }}</h2>
        <span v-if="!item.composition" class="small-badge">{{
          sampleAccessLabels[item.sampleAccess.status]
        }}</span>
      </div>
      <template v-if="item.composition">
        <p class="task-description">
          指数汇总多个评测，本身没有独立题库。下面展示一个组成评测的真实案例；各项任务和执行协议分别核对。
        </p>
        <template v-if="constituentSample">
          <p class="task-description">
            案例来自
            <RouterLink
              :to="`/benchmarks/${constituentSample.id}/#samples`"
              class="text-link"
              translate="no"
              >{{ constituentSample.name }}</RouterLink
            >，原题、答案与许可由该组成项提供。
          </p>
          <SampleViewer :item="constituentSample" />
        </template>
        <div class="composition-samples">
          <RouterLink
            v-for="component in item.composition.items"
            :key="component.id"
            :to="`/benchmarks/${component.id}/#samples`"
            ><span translate="no">{{ byId.get(component.id)?.name }}</span
            ><Icon name="arrow" :size="15"
          /></RouterLink>
        </div>
      </template>
      <SampleViewer v-else :item="item" />
    </section>

    <section id="score" class="detail-section">
      <h2>评分与比较条件</h2>
      <div class="score-layout">
        <div class="metric-panel">
          <small>主要指标</small>
          <h3 translate="no">{{ item.metric.name }}</h3>
          <span>{{
            item.metric.direction === "higher"
              ? "↑ 通常越高越好"
              : item.metric.direction === "lower"
                ? "↓ 通常越低越好"
                : "各分项方向不同"
          }}</span>
          <p>
            <CitedText
              :text="item.metric.description"
              :sources="item.sources"
              :urls="item.metric.sourceUrls"
            />
          </p>
        </div>
        <div
          v-if="scoreInterpretation.length || item.limitations.length"
          class="caveat-panel"
        >
          <div
            v-for="row in scoreInterpretation"
            :key="row.key"
            class="score-reading"
          >
            <h3>{{ row.label }}</h3>
            <p>
              <CitedText
                :text="row.text"
                :sources="item.sources"
                :urls="row.sourceUrls"
              />
            </p>
          </div>
          <h3 v-if="item.limitations.length">适用范围与限制</h3>
          <ul v-if="item.limitations.length">
            <li v-for="note in item.limitations" :key="note.text">
              <p>
                <CitedText
                  :text="note.text"
                  :sources="item.sources"
                  :urls="note.sourceUrls"
                />
              </p>
            </li>
          </ul>
        </div>
      </div>
      <RouterLink to="/guide/#metrics" class="text-link score-guide"
        >了解不同评分指标 <Icon name="arrow" :size="16"
      /></RouterLink>
    </section>

    <section id="data" class="detail-section">
      <div class="section-title-row">
        <h2>数据与许可</h2>
        <span class="small-badge">{{
          disclosureLabels[item.dataProfile.disclosure]
        }}</span>
      </div>
      <p class="task-description">
        <CitedText
          :text="item.dataProfile.summary"
          :sources="item.sources"
          :urls="item.dataProfile.sourceUrls"
        />
      </p>
      <div v-if="profileGroups.length" class="profile-grid">
        <article v-for="group in profileGroups" :key="group.label">
          <small>{{ group.label }}</small>
          <ul>
            <li v-for="value in group.values" :key="value">{{ value }}</li>
          </ul>
        </article>
      </div>
      <p
        v-if="missingProfileLabels.length && !item.composition"
        class="profile-missing"
      >
        本站尚未整理：{{
          missingProfileLabels.join("、")
        }}。可通过下方官方资料核对。
      </p>
      <div v-if="item.interpretation?.disclosure" class="data-disclosure">
        <h3>公开核验范围</h3>
        <p>
          <CitedText
            :text="item.interpretation.disclosure.text"
            :sources="item.sources"
            :urls="item.interpretation.disclosure.sourceUrls"
          />
        </p>
      </div>
      <div class="policy-grid">
        <article>
          <div class="section-title-row">
            <h3>
              <CitedText
                text="怎样获取数据"
                :sources="item.sources"
                :urls="item.dataAccess.sourceUrls"
                :exclude-urls="accessEvidenceExclusions"
              />
            </h3>
            <span class="small-badge">{{
              dataAccessLabels[item.dataAccess.status]
            }}</span>
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
            >{{ dataAccessLinkLabel }} <Icon name="up" :size="15"
          /></a>
        </article>
        <article>
          <div class="section-title-row">
            <h3>能否使用这些数据</h3>
            <span class="small-badge">{{
              reusePolicyLabels[item.reusePolicy.status]
            }}</span>
          </div>
          <dl class="policy-definition">
            <dt>许可记录</dt>
            <dd>
              <CitedText
                :text="item.reusePolicy.license"
                :sources="item.sources"
                :urls="item.reusePolicy.sourceUrls"
              />
            </dd>
            <dt>适用范围</dt>
            <dd>{{ item.reusePolicy.scope }}</dd>
          </dl>
          <ul v-if="item.reusePolicy.boundaries.length">
            <li v-for="boundary in item.reusePolicy.boundaries" :key="boundary">
              {{ boundary }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section
      v-if="item.related.length || item.interpretation?.versionChanges"
      id="relations"
      class="detail-section"
    >
      <h2>版本与衍生评测</h2>
      <div v-if="item.interpretation?.versionChanges" class="version-reading">
        <p>
          <CitedText
            :text="item.interpretation.versionChanges.text"
            :sources="item.sources"
            :urls="item.interpretation.versionChanges.sourceUrls"
          />
        </p>
      </div>
      <div v-if="item.related.length" class="relation-list">
        <article
          v-for="relation in item.related"
          :key="relation.id"
          class="relation-item"
        >
          <RouterLink :to="`/benchmarks/${relation.id}/`" class="relation-link"
            ><span class="small-badge">{{ relation.label }}</span>
            <div>
              <h3 translate="no">{{ byId.get(relation.id)?.name }}</h3>
            </div>
            <Icon name="arrow" :size="20"
          /></RouterLink>
          <p>
            <CitedText
              :text="relation.detail"
              :sources="item.sources"
              :urls="relation.sourceUrls"
              :exclude-urls="relationEvidenceExclusions"
            />
          </p>
        </article>
      </div>
    </section>

    <section id="sources" class="detail-section">
      <h2>参考资料</h2>
      <p class="section-intro">
        正文编号对应下列原始资料。同页不同段落可展开查看。
      </p>
      <SourceList :groups="officialSources" />
      <template v-if="vendorReports.length">
        <div class="source-subheading">
          <h3>模型发布资料中的引用</h3>
          <p>这些资料记录模型发布采用的评测，不用于定义评测本身。</p>
        </div>
        <SourceList :groups="vendorReports" />
      </template>
      <div v-if="featuredIn.length" class="featured-in">
        <span>相关模型发布资料</span>
        <RouterLink
          v-for="release in featuredIn"
          :key="release.id"
          :to="`/releases/#${release.id}`"
          ><span translate="no">{{ release.title }}</span
          ><Icon name="arrow" :size="13"
        /></RouterLink>
      </div>
      <details
        v-if="item.researchNotes?.length"
        id="research"
        class="research-notes"
      >
        <summary>资料核验记录 · {{ item.researchNotes.length }} 项</summary>
        <p>以下说明本站核对资料的范围，不表示已独立运行评测或核实全部数据。</p>
        <ul>
          <li v-for="note in item.researchNotes" :key="note.text">
            <p>
              <CitedText
                :text="note.text"
                :sources="item.sources"
                :urls="note.sourceUrls"
              />
            </p>
          </li>
        </ul>
      </details>
    </section>
  </div>
  <div v-else class="container empty-state">
    <h1>没有找到这个评测</h1>
    <RouterLink to="/" class="primary-button">返回评测目录</RouterLink>
  </div>
</template>
