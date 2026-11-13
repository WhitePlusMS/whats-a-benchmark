<script setup lang="ts">
import { computed, ref } from "vue";
import {
  findRoboQuestCase,
  searchConcepts,
} from "../content/roboQuestExperience";
import type { TaskSample } from "../types/benchmark";
import SampleMedia from "./SampleMedia.vue";

const props = defineProps<{ sample: TaskSample }>();
const concept = ref(0);
const failedAssets = ref<string[]>([]);
const activeCase = computed(() => findRoboQuestCase(props.sample.id));
const raw = computed(() =>
  typeof props.sample.raw === "object" && props.sample.raw
    ? (props.sample.raw as Record<string, unknown>)
    : {},
);
</script>

<template>
  <div class="roboquest-pilot">
    <article
      v-if="activeCase"
      id="roboquest-material"
      :key="sample.id"
      class="rq-material"
    >
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
              <b>取出橘子，竖放到托盘</b><span>打开盒盖只是任务的一部分。</span>
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
      <div v-else-if="activeCase.kind === 'observation'" class="rq-observation">
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
        <button
          type="button"
          class="secondary-button"
          @click="failedAssets = []"
        >
          重新加载媒体
        </button>
      </div>
    </article>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/roboquest-pilot.css"></style>
