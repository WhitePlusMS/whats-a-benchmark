<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSampleLoader } from "../composables/sampleLoader";
import {
  findRoboQuestCase,
  roboQuestCases,
  searchConcepts,
} from "../content/roboQuestExperience";
import { selectSampleFromWalkthrough } from "../lib/sampleLocation";
import Icon from "./Icon.vue";
import PublisherMarks from "./PublisherMarks.vue";
import SampleMedia from "./SampleMedia.vue";

defineProps<{ selected: boolean }>();
defineEmits<{ toggle: [] }>();
const route = useRoute();
const router = useRouter();
const mounted = ref(false);
const concept = ref(0);
const failedAssets = ref<string[]>([]);
const {
  data,
  error,
  reload: reloadSamples,
} = useSampleLoader(
  () => "roboquest",
  () => mounted.value,
  import.meta.env.BASE_URL,
);
const activeCase = computed(() =>
  findRoboQuestCase(mounted.value ? route.query.sample : undefined),
);
const sample = computed(() =>
  data.value?.samples.find((item) => item.id === activeCase.value?.sampleId),
);
const raw = computed(() =>
  sample.value?.raw && typeof sample.value.raw === "object"
    ? (sample.value.raw as Record<string, unknown>)
    : {},
);
watch(
  () => activeCase.value?.sampleId,
  () => {
    concept.value = 0;
    failedAssets.value = [];
  },
);
onMounted(() => {
  mounted.value = true;
});
function reload() {
  failedAssets.value = [];
  return reloadSamples();
}
function selectCase(id: string) {
  void selectSampleFromWalkthrough(router, id);
}
</script>

<template>
  <div class="roboquest-pilot">
    <header class="pilot-intro">
      <div class="pilot-heading-line">
        <PublisherMarks
          benchmark-id="roboquest"
          publisher="DeCLaRe Lab"
          large
        /><span>具身智能 · 观察、操作与主动提交</span>
      </div>
      <h1 translate="no">Robo<span>Quest</span></h1>
      <p class="pilot-lead">看见插销，不等于能打开盒子。</p>
      <p class="pilot-description">
        让机器人在仿真环境中理解物体关系、规划动作并完成任务。打开木盒只是中途：还要取出目标、放好、松手，最后主动提交。
      </p>
      <div class="pilot-actions">
        <a href="#task-walkthrough" class="primary-button"
          >看真实任务 <Icon name="down" :size="16"
        /></a>
        <a href="#score" class="pilot-link"
          >了解评分方式 <Icon name="down" :size="15"
        /></a>
        <button
          class="pilot-compare"
          type="button"
          :aria-pressed="selected"
          @click="$emit('toggle')"
        >
          <Icon name="compare" :size="17" />{{
            selected ? "已加入对比" : "加入评测对比"
          }}
        </button>
      </div>
    </header>
    <section
      id="task-walkthrough"
      class="walkthrough"
      aria-labelledby="roboquest-title"
    >
      <div class="walkthrough-heading">
        <div>
          <span class="walkthrough-kicker">从任务现场理解评测</span>
          <h2 id="roboquest-title">同一种能力，四份不同的材料</h2>
          <p>每个入口都是独立材料，不是同一次运行的前后步骤。</p>
        </div>
        <a href="#samples" class="pilot-link"
          >原始记录与来源 <Icon name="down" :size="15"
        /></a>
      </div>
      <div
        class="case-selector"
        role="group"
        aria-label="选择 RoboQuest 任务材料"
      >
        <button
          v-for="task in roboQuestCases"
          :key="task.sampleId"
          class="case-button"
          type="button"
          :class="{ active: activeCase?.sampleId === task.sampleId }"
          :aria-pressed="activeCase?.sampleId === task.sampleId"
          aria-controls="roboquest-material"
          @click="selectCase(task.sampleId)"
        >
          {{ task.label }}
        </button>
      </div>
      <article
        v-if="sample && activeCase"
        id="roboquest-material"
        :key="sample.id"
        class="rq-material"
      >
        <div class="rq-material-heading">
          <span class="rq-badge">{{ activeCase.badge }}</span>
          <h3>{{ sample.title }}</h3>
          <p>{{ sample.prompt }}</p>
        </div>
        <div v-if="activeCase.kind === 'demo'" class="rq-demo">
          <div class="rq-media-stage">
            <SampleMedia
              :assets="sample.assets || []"
              :title="sample.title"
              :failed-assets="failedAssets"
              @asset-error="failedAssets.push($event)"
            />
          </div>
          <aside class="rq-side">
            <span class="rq-eyebrow">观看时留意</span>
            <h4>真正的终点，在盒子之外</h4>
            <ol class="rq-goals">
              <li>
                <b>解开阻挡</b><span>插销与盒盖互相限制，顺序不唯一。</span>
              </li>
              <li>
                <b>取出橘子，竖放到托盘</b
                ><span>打开盒盖只是任务的一部分。</span>
              </li>
              <li>
                <b>松手，再按 SUBMIT</b
                ><span>首次提交即结束回合，错误提交或不提交都失败。</span>
              </li>
            </ol>
            <p class="rq-note">
              官方开发示范，共 1740 帧。视频不是模型评测成绩，也不是下面两条
              Puzzle Box 记录的录像。
            </p>
          </aside>
        </div>
        <div
          v-else-if="activeCase.kind === 'observation'"
          class="rq-observation"
        >
          <div class="rq-camera-heading">
            <b>同一时刻 · 三路相机</b
            ><span>决策 1 的输入，不是动作后的画面 · 点击图片放大</span>
          </div>
          <SampleMedia
            :assets="sample.assets || []"
            :title="sample.title"
            :failed-assets="failedAssets"
            overview
            @asset-error="failedAssets.push($event)"
          />
          <div class="rq-command">
            <div>
              <span class="rq-eyebrow">目标动作 · arm</span>
              <h4>向左侧最前方的红色滑块移动</h4>
              <p>
                训练实例 002e0374cb9719d0，与开发示范 episode 000000
                不同。以下是保存的目标调用，本站不会执行。
              </p>
            </div>
            <div
              class="rq-coordinate"
              role="img"
              aria-label="末端世界坐标的 z 从 1.296 米变为目标 1.160 米，x 和 y 不变；仅为调用参数示意"
            >
              <span>末端 z <b>1.296 m</b></span
              ><span class="rq-vector">↓ <small>目标差 −0.136 m</small></span
              ><span>目标 z <b>1.160 m</b></span
              ><small>x = 1.944 · y = −3.775 m</small>
            </div>
          </div>
          <div class="rq-call">
            <code>{{ sample.walkthrough?.excerpts[0]?.text }}</code>
            <p>
              <b>40 ticks</b> 是此调用的仿真步数，不是 40 次模型决策。<b
                >tier A</b
              >
              是单步几何核验等级，不代表任务成功；没有动作后的观测或整回合重放。
            </p>
          </div>
        </div>
        <div v-else-if="activeCase.kind === 'result'" class="rq-result">
          <div class="rq-result-diagram">
            <span class="rq-eyebrow">配置示意 · 不是场景还原</span>
            <div
              class="rq-box"
              role="img"
              aria-label="五插销无遮罩木盒的配置示意，不表示真实排列或操作顺序"
            >
              <span class="rq-box-title">PUZZLE BOX</span>
              <div class="rq-bolts">
                <i v-for="n in 5" :key="n"><b></b></i>
              </div>
              <span>5 个插销 · 无遮罩</span>
            </div>
            <p>chain_length=5 · cover=none<br />观测级别 pb_visible</p>
            <div class="rq-submit-line">
              <span>物理提交</span><b aria-hidden="true">→</b
              ><strong>{{ raw.outcome }}</strong>
            </div>
            <p class="rq-note">
              发布方记录的结果状态；本站没有这次运行的录像，也未独立重跑。
            </p>
          </div>
          <div class="rq-result-reading">
            <span class="rq-eyebrow">官方 CSV · 单个回合</span>
            <h4>先看判定，再看完成成本</h4>
            <dl class="rq-metrics">
              <div>
                <dt>模型决策</dt>
                <dd>{{ raw.decisions }}<small> 次</small></dd>
              </div>
              <div>
                <dt>仿真步数</dt>
                <dd>{{ raw.ticks }}<small> ticks</small></dd>
              </div>
              <div>
                <dt>仿真时间</dt>
                <dd>{{ raw.sim_seconds }}<small> 秒</small></dd>
              </div>
              <div>
                <dt>实际用时</dt>
                <dd>{{ raw.wall_seconds }}<small> 秒</small></dd>
              </div>
            </dl>
            <p class="rq-result-status">
              success={{ raw.success }} · progress={{ raw.progress }} ·
              submitted={{ raw.submitted }}
            </p>
            <p>
              本行模型：{{
                raw.model
              }}。这只能说明发布方对该实例记录了成功，不能当作整个评测的成功率。
            </p>
            <p class="rq-note">
              决策、ticks、仿真时间与实际用时各有口径，不能互换。token
              等其余成本字段保留在下方原始数据。
            </p>
          </div>
        </div>
        <div v-else class="rq-search">
          <div class="rq-search-visual">
            <span class="rq-eyebrow">任务关系示意 · 非真实地图</span
            ><svg
              viewBox="0 0 540 270"
              role="img"
              aria-label="搜索区域、托盘与提交按钮之间的任务关系示意，不是官方场景布局"
            >
              <rect
                x="18"
                y="22"
                width="250"
                height="218"
                rx="12"
                class="rq-room"
              />
              <path d="M38 95H130V42M158 218V143H246" class="rq-wall" />
              <g :class="{ 'rq-highlight': concept === 0 }">
                <circle cx="80" cy="58" r="20" />
                <circle cx="210" cy="103" r="20" />
                <text x="80" y="65">?</text>
                <text x="210" y="110">?</text>
              </g>
              <path d="M208 178H310" class="rq-path" />
              <g :class="{ 'rq-highlight': concept === 1 }">
                <rect x="322" y="132" width="100" height="65" rx="8" />
                <text x="372" y="171">托盘</text>
              </g>
              <path d="M373 121V77" class="rq-path" />
              <g :class="{ 'rq-highlight': concept === 2 }">
                <rect x="320" y="26" width="104" height="44" rx="22" />
                <text x="372" y="54">SUBMIT</text>
              </g>
              <text x="144" y="267" class="rq-map-label">
                搜索区域 · 布局与数量均为示意
              </text>
            </svg>
          </div>
          <div class="rq-search-reading">
            <h4>找到，还要搬到，再主动提交</h4>
            <div
              class="rq-concepts"
              role="group"
              aria-label="理解 Search Room 的要求"
            >
              <button
                v-for="(entry, i) in searchConcepts"
                :key="entry.label"
                type="button"
                :aria-pressed="concept === i"
                @click="concept = i"
              >
                {{ entry.label }}
              </button>
            </div>
            <p aria-live="polite">{{ searchConcepts[concept]?.text }}</p>
            <p class="rq-note">
              本站该条记录仅保存任务名称「Search
              Room」。图解来自本站概览，不含官方图像、具体题目布局、完整轨迹或单次成绩；完整任务说明请查阅
              <a
                href="https://declare-lab.github.io/RoboQuest/tasks.html"
                target="_blank"
                rel="noreferrer"
                class="pilot-link"
                >官方任务页面 <Icon name="up" :size="14" /></a
              >。
            </p>
          </div>
        </div>
        <div v-if="failedAssets.length" class="rq-media-retry">
          <p class="rq-note">此处与下方原始记录的媒体独立加载，请分别重试。</p>
          <button
            type="button"
            class="secondary-button"
            @click="failedAssets = []"
          >
            重新加载上方媒体
          </button>
        </div>
        <footer class="walkthrough-footer">
          <span>保留原题、原始字段与许可，四份资料独立解读。</span>
          <div>
            <a href="#samples" class="pilot-link">查看这份原始记录</a
            ><a
              :href="sample.source"
              target="_blank"
              rel="noreferrer"
              class="pilot-link"
              >原始来源 <Icon name="up" :size="14"
            /></a>
          </div>
        </footer>
      </article>
      <div v-else-if="error" class="rq-empty" role="alert">
        <p>任务资料加载失败。</p>
        <button class="secondary-button" @click="reload">重新加载</button>
      </div>
      <div v-else-if="data" class="rq-empty" role="status">
        没有匹配此编号的任务资料。请从上方选择一份材料，不会替换为其他实例。
      </div>
      <p v-else class="rq-empty" role="status">正在加载真实任务…</p>
    </section>
    <aside class="rq-score">
      <div>
        <span class="rq-eyebrow">评分与比较</span>
        <h2>完成任务，并在正确状态下提交</h2>
      </div>
      <p>
        开发示范不是模型成绩，单步核验不是任务成功，单个成功回合也不是总体成功率。比较时要同时核对任务配置、观测条件与运行预算。<a
          href="#score"
          class="pilot-link"
          >查看完整评分说明 <Icon name="down" :size="15"
        /></a>
      </p>
    </aside>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/roboquest-pilot.css"></style>
