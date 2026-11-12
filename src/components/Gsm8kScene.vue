<script setup lang="ts">
import type { Gsm8kCase } from "../content/gsm8kExperience";
defineProps<{ entry: Gsm8kCase; step: number }>();
</script>
<template>
  <div class="gsm-scene" :aria-label="`${entry.label}数量关系示意`">
    <div class="gsm-scene-head">
      <span>数量关系图 · 本站示意</span
      ><span>{{ step ? "参考推导已展开" : "先读已知条件" }}</span>
    </div>
    <template v-if="entry.kind === 'eggs'">
      <div class="gsm-egg-grid">
        <span
          v-for="n in 16"
          :key="n"
          class="gsm-egg"
          :class="{
            breakfast: n <= 3,
            baking: n > 3 && n <= 7,
            market: n > 7 && step > 0,
          }"
          ><span>{{
            n <= 3 ? "早餐" : n <= 7 ? "烘焙" : step ? "出售" : "余下"
          }}</span></span
        >
      </div>
      <div class="gsm-equation">
        16 枚 − 3 枚 − 4 枚 = <b>{{ step ? "9 枚" : "?" }}</b
        ><span>每枚 × $2 → {{ step >= 2 ? "$18 / 天" : "每天收入 ?" }}</span>
      </div>
    </template>
    <template v-else-if="entry.kind === 'fabric'">
      <div class="gsm-fabric-row">
        <b>蓝布</b>
        <div class="gsm-roll">1 卷</div>
        <div class="gsm-roll">1 卷</div>
      </div>
      <div class="gsm-fabric-row">
        <b>白布</b>
        <div class="gsm-roll white">{{ step ? "1 卷" : "蓝布的一半" }}</div>
      </div>
      <div class="gsm-equation">
        白布 = 蓝布 ÷ 2 <span>合计 {{ step >= 2 ? "3 卷" : "? 卷" }}</span>
      </div>
    </template>
    <template v-else-if="entry.kind === 'house'">
      <p class="gsm-axis-note">金额比例尺 · 每格 $10,000</p>
      <div class="gsm-bar-row">
        <b>全部成本</b>
        <div class="gsm-money-track">
          <span style="width: 40%">购房 $80k</span
          ><span class="gsm-warm" style="width: 25%">翻修 $50k</span>
        </div>
        <strong>{{ step ? "$130k" : "?" }}</strong>
      </div>
      <div class="gsm-bar-row">
        <b>房屋价值</b>
        <div class="gsm-money-track">
          <span style="width: 40%">原价 $80k</span
          ><span v-if="step >= 2" class="gsm-growth" style="width: 60%"
            >增值 $120k</span
          ><span v-else class="gsm-pending" style="width: 60%"
            >增加原价的 150%</span
          >
        </div>
        <strong>{{ step >= 2 ? "$200k" : "?" }}</strong>
      </div>
      <div v-if="step >= 3" class="gsm-bar-row">
        <b>减去成本</b>
        <div class="gsm-money-track">
          <span class="gsm-deduct" style="width: 65%">成本 $130k</span
          ><span class="gsm-growth" style="width: 35%">利润 $70k</span>
        </div>
      </div>
      <p class="gsm-scene-note">
        “增加 150%” ≠ “变成原价的 150%”。成本还包括翻修支出。
      </p>
    </template>
    <template v-else-if="entry.kind === 'sprints'">
      <div class="gsm-training">
        <div v-for="n in 3" :key="n">
          <b>训练 {{ n }}</b
          ><span v-for="m in 3" :key="m">60 m <i aria-hidden="true">→</i></span>
        </div>
      </div>
      <div class="gsm-equation">
        3 次 × 3 段 = {{ step ? "9 段" : "? 段"
        }}<span>× 60 米 → {{ step >= 2 ? "540 米 / 周" : "? 米 / 周" }}</span>
      </div>
    </template>
    <template v-else-if="entry.kind === 'download'">
      <div class="gsm-file">
        <span style="width: 40%">40% {{ step ? "· 80 GB" : "" }}</span
        ><span>未完成 60%</span>
      </div>
      <div
        class="gsm-timeline"
        :style="{
          gridTemplateColumns:
            step >= 3
              ? 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 5fr)'
              : 'repeat(3, minmax(0, 1fr))',
        }"
      >
        <div>
          <b>首次下载</b
          ><strong
            ><span class="gsm-time-full">{{ step ? "40 分钟" : "耗时 ?" }}</span
            ><span class="gsm-time-compact">{{
              step ? "40" : "?"
            }}</span></strong
          ><small>2 GB / 分钟</small>
        </div>
        <div class="gsm-warm">
          <b>系统重启</b
          ><strong
            ><span class="gsm-time-full">20 分钟</span
            ><span class="gsm-time-compact">20</span></strong
          ><small>进度归零 ↺</small>
        </div>
        <div>
          <b>完整重下</b
          ><strong
            ><span class="gsm-time-full">{{
              step >= 3 ? "100 分钟" : "耗时 ?"
            }}</span
            ><span class="gsm-time-compact">{{
              step >= 3 ? "100" : "?"
            }}</span></strong
          ><small>200 GB · 从 0 开始</small>
        </div>
      </div>
      <dl class="gsm-time-key" aria-label="时间轴说明，单位为分钟">
        <div>
          <dt>① 首次下载</dt>
          <dd>{{ step ? "40 分钟" : "耗时待求" }} · 2 GB / 分钟</dd>
        </div>
        <div>
          <dt>② 系统重启</dt>
          <dd>20 分钟 · 进度归零 ↺</dd>
        </div>
        <div>
          <dt>③ 完整重下</dt>
          <dd>{{ step >= 3 ? "100 分钟" : "耗时待求" }} · 200 GB 从 0 开始</dd>
        </div>
      </dl>
      <p class="gsm-scene-note">
        {{
          step >= 3
            ? "时间轴按耗时比例绘制：40 + 20 + 100 = 160 分钟。"
            : "此时仅示意先后顺序，不表示耗时比例。重启之后不是只下载剩余 60%。"
        }}
      </p>
    </template>
    <template v-else-if="entry.kind === 'months'">
      <div class="gsm-months">
        <div>
          <div class="gsm-month-plot">
            <span class="gsm-month-bar" style="height: 33.333333%">60</span>
          </div>
          <b>第一月</b>
        </div>
        <div>
          <div class="gsm-month-plot">
            <span
              class="gsm-month-bar"
              :style="{ height: step ? '100%' : '50%' }"
              >{{ step ? "180" : "首月 × 3" }}</span
            >
          </div>
          <b>第二月</b>
        </div>
        <div>
          <div class="gsm-month-plot">
            <span
              class="gsm-month-bar third"
              :style="{ height: step >= 2 ? '70%' : '50%' }"
              >{{ step >= 2 ? "126" : "次月 × 70%" }}</span
            >
          </div>
          <b>第三月</b>
        </div>
      </div>
      <p class="gsm-scene-note">
        {{
          step >= 2
            ? "柱高按下载次数绘制，第三月以第二月为基数减少 30%。"
            : "未知月份暂用占位柱，不表示数量比例。"
        }}
      </p>
      <div class="gsm-equation">
        三个月相加 → {{ step >= 3 ? "366 次" : "? 次" }}
      </div>
    </template>
    <template v-else>
      <div v-if="step < 3" class="gsm-weeks">
        <div v-for="week in 4" :key="week">
          <b>第 {{ week }} 周</b>
          <div>
            <span v-for="day in 7" :key="day" aria-label="一天三枚">●●●</span>
          </div>
          <strong>{{ step ? "21 枚" : "7 天 × 3 枚" }}</strong>
        </div>
      </div>
      <div v-else class="gsm-cartons">
        <div v-for="box in 7" :key="box">
          <b>1 打</b
          ><span v-for="egg in 12" :key="egg" aria-hidden="true">●</span>
        </div>
      </div>
      <div class="gsm-equation">
        {{ step >= 2 ? "84 枚" : "4 周 × 7 天 × 3 枚" }} ÷ 12 枚/打
        <span>= {{ step >= 3 ? "7 打" : "? 打" }}</span>
      </div>
    </template>
    <div class="gsm-target">
      <span>需要交付</span><b>{{ entry.target }}</b
      ><strong>{{
        step === entry.steps.length ? "见下方最终答案" : "?"
      }}</strong>
    </div>
  </div>
</template>
<style scoped src="../styles/gsm8k-scene.css"></style>
