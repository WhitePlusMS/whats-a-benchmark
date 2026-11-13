<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { byId, categoryById, embodiedCategories } from "../content/catalog";
import {
  dataAccessLabels,
  disclosureLabels,
  researchStatusLabels,
  reusePolicyLabels,
} from "../content/labels";
import { releases } from "../content/releases";
import { useComparison } from "../composables/compare";
import { useCatalogNavigation } from "../composables/catalogNavigation";
import { groupSourceReferences } from "../lib/sourceReferences";
import { compositionSample, sampleSectionTitle } from "../lib/sampleAccess";
import { formatDate, formatPercent } from "../lib/displayFormats";
import CitedText from "../components/CitedText.vue";
import SourceList from "../components/SourceList.vue";
import Icon from "../components/Icon.vue";
import SampleViewer from "../components/SampleViewer.vue";
import BenchmarkDetailHeader from "../components/BenchmarkDetailHeader.vue";
import TerminalBenchPilot from "../components/TerminalBenchPilot.vue";
import SweBenchPilot from "../components/SweBenchPilot.vue";
import RoboQuestPilot from "../components/RoboQuestPilot.vue";
import ArcAgiPilot from "../components/ArcAgiPilot.vue";
import BfclPilot from "../components/BfclPilot.vue";
import CalvinPilot from "../components/CalvinPilot.vue";
import IfevalPilot from "../components/IfevalPilot.vue";
import MmmluPilot from "../components/MmmluPilot.vue";
import LiberoPilot from "../components/LiberoPilot.vue";
import Gsm8kPilot from "../components/Gsm8kPilot.vue";
import HumanEvalPilot from "../components/HumanEvalPilot.vue";
import { humanEvalInitialAnchor } from "../lib/deferredDetailAnchor";

const route = useRoute();
const item = computed(() =>
  byId.get(String(route.meta.benchmarkId || route.params.id)),
);
const caseVisuals: Partial<Record<string, Component>> = {
  "terminal-bench-4": TerminalBenchPilot,
  "swe-bench-verified": SweBenchPilot,
  roboquest: RoboQuestPilot,
  "arc-agi-2": ArcAgiPilot,
  "human-eval": HumanEvalPilot,
  gsm8k: Gsm8kPilot,
  libero: LiberoPilot,
  bfcl: BfclPilot,
  calvin: CalvinPilot,
  ifeval: IfevalPilot,
  mmmlu: MmmluPilot,
};
const caseVisual = computed(() => item.value && caseVisuals[item.value.id]);
function reportSamplesReady() {
  humanEvalInitialAnchor.settled(route.fullPath);
}
const categoryName = computed(() => {
  const benchmark = item.value;
  if (!benchmark) return;
  return benchmark.embodied
    ? embodiedCategories.find(
        (entry) => entry.id === benchmark.embodied?.tasks[0],
      )?.name
    : categoryById.get(benchmark.category)?.name;
});
const statusTone = computed(() => {
  const status = item.value?.researchStatus;
  if (status === "blocked") return "bad";
  if (status === "partial" || status === "pass-with-limitations") return "warn";
  return "ok";
});
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
const { catalogLocation, embodiedLocation } = useCatalogNavigation();
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
      <RouterLink :to="item.embodied ? embodiedLocation : catalogLocation"
        >返回目录</RouterLink
      ><span>/</span>
      <RouterLink
        :to="{
          path: item.embodied ? '/embodied/' : '/',
          query: { category: item.embodied?.tasks[0] || item.category },
        }"
        >{{ categoryName }}</RouterLink
      >
      <span>/</span><span translate="no">{{ item.name }}</span>
    </nav>
    <aside v-if="item.status === 'archived'" class="info-banner" role="note">
      <p><strong>本站已归档</strong> · {{ item.archiveNote }}</p>
      <p>保留历史资料与引用，不表示官方评测已停用。</p>
    </aside>
    <BenchmarkDetailHeader
      :item="item"
      :category-name="categoryName"
      :selected="selected.includes(item.id)"
      @toggle="toggle(item.id)"
    />
    <dl class="detail-facts">
      <div>
        <dt>发布方</dt>
        <dd translate="no">{{ item.publisher }}</dd>
      </div>
      <div>
        <dt>{{ item.releaseDate ? "版本发布日期" : "首次发布年份" }}</dt>
        <dd class="num">
          <time v-if="item.releaseDate" :datetime="item.releaseDate">{{
            formatDate(item.releaseDate)
          }}</time
          ><template v-else>{{ item.year || "尚未核实" }}</template>
        </dd>
      </div>
      <div>
        <dt>评测版本</dt>
        <dd class="mono" translate="no">{{ item.version }}</dd>
      </div>
      <div>
        <dt>数据访问</dt>
        <dd>{{ dataAccessLabels[item.dataAccess.status] }}</dd>
      </div>
      <div>
        <dt>资料核验日期</dt>
        <dd>
          <time class="mono" :datetime="item.verifiedAt">{{
            formatDate(item.verifiedAt)
          }}</time>
        </dd>
      </div>
      <div>
        <dt>资料核验状态</dt>
        <dd class="status-dot" :class="statusTone">
          {{ researchStatusLabels[item.researchStatus] }}
        </dd>
      </div>
    </dl>
    <nav class="detail-nav" aria-label="详情导航">
      <a href="#samples">{{ sampleTitle }}</a>
      <a href="#definition">测什么</a><a href="#task">具体任务</a>
      <a v-if="item.composition" href="#composition">指数组成</a>
      <a href="#score">评分与比较</a><a href="#data">数据与许可</a>
      <a
        v-if="item.related.length || item.interpretation?.versionChanges"
        href="#relations"
        >版本关系</a
      ><a href="#sources">参考资料</a>
    </nav>

    <section id="samples" class="detail-section">
      <div id="task-walkthrough" class="case-section-heading">
        <div>
          <p class="case-benchmark-name" translate="no">{{ item.name }}</p>
          <h2>{{ sampleTitle }}</h2>
        </div>
        <a href="#score" class="text-link">评分方式 <Icon name="down" :size="16" /></a>
      </div>
      <template v-if="item.composition">
        <!-- 组成项没有站内样例时，只展示入口，不承诺下方存在真实案例。 -->
        <p class="task-description">
          指数汇总多个评测，本身没有独立题库。
          <template v-if="constituentSample"
            >下面展示一个组成评测的真实案例；各项任务和执行协议分别核对。</template
          >
          <template v-else
            >可通过下方组成项查看官方样例入口及获取方式。</template
          >
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
          <SampleViewer :item="constituentSample" :detail-id="item.id" @settled="reportSamplesReady" />
        </template>
        <div class="composition-samples">
          <RouterLink
            v-for="component in item.composition.items"
            :key="component.id"
            :to="`/benchmarks/${component.id}/#samples`"
            ><span translate="no">{{
              byId.get(component.id)?.name
            }}</span></RouterLink
          >
        </div>
      </template>
      <SampleViewer
        v-else
        :item="item"
        :wide-visual="
          !!caseVisual &&
          !['swe-bench-verified', 'gsm8k', 'bfcl'].includes(item.id)
        "
        @settled="reportSamplesReady"
      >
        <template v-if="caseVisual" #visual="{ sample, showAnswer }">
          <component
            :is="caseVisual"
            :key="sample.id"
            :sample="sample"
            v-bind="
              ['gsm8k', 'mmmlu'].includes(item.id)
                ? { revealed: showAnswer }
                : {}
            "
          />
        </template>
      </SampleViewer>
    </section>

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
        >了解不同评分指标</RouterLink
      >
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
        {{
          item.dataProfile.disclosure === "not-public"
            ? "官方未公开"
            : "本站尚未整理"
        }}：{{ missingProfileLabels.join("、") }}。可通过下方官方资料核对。
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
            >{{ dataAccessLinkLabel }} <Icon name="up" :size="16"
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
          </RouterLink>
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

    <section v-if="item.embodied?.resources?.length" class="detail-section">
      <h2>相关资源</h2>
      <div class="relation-list">
        <article
          v-for="resource in item.embodied.resources"
          :key="resource.url"
          class="relation-item"
        >
          <a
            :href="resource.url"
            target="_blank"
            rel="noreferrer"
            class="relation-link"
            ><span class="small-badge">{{ resource.type }}</span>
            <h3>{{ resource.label }}</h3></a
          >
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
          ><span translate="no">{{ release.title }}</span></RouterLink
        >
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
