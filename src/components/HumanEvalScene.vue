<script setup lang="ts">
import { computed } from "vue";
import type {
  HumanEvalExample,
  HumanEvalKind,
} from "../content/humanEvalExperience";
import {
  balanceTrace,
  bracketTrace,
  decimalParts,
  deviationParts,
  distanceTrace,
  distanceDisplay,
  formatIllustrationNumber as fmt,
  insertionTokens,
} from "../lib/humanEvalIllustration";
const props = defineProps<{
  kind: HumanEvalKind;
  example: HumanEvalExample;
  step: number;
}>();
const numbers = computed(() =>
  Array.isArray(props.example.args[0])
    ? (props.example.args[0] as number[])
    : [],
);
const threshold = computed(() => props.example.args[1] as number);
const pairs = computed(() =>
  props.kind === "distance"
    ? distanceTrace(numbers.value, threshold.value)
    : [],
);
const pair = computed(() =>
  props.step ? pairs.value[props.step - 1] : undefined,
);
const displayedDistance = computed(() =>
  pair.value ? distanceDisplay(pair.value.distance, threshold.value) : null,
);
const brackets = computed(() =>
  props.kind === "brackets"
    ? bracketTrace(props.example.args[0] as string)
    : [],
);
const bracket = computed(() => brackets.value[props.step - 1]);
const decimal = computed(() =>
  props.kind === "decimal"
    ? decimalParts(props.example.args[0] as number)
    : null,
);
const balances = computed(() =>
  props.kind === "balance" ? balanceTrace(numbers.value) : [],
);
const balance = computed(() =>
  props.step ? balances.value[props.step - 1] : undefined,
);
const deviation = computed(() =>
  props.kind === "deviation" ? deviationParts(numbers.value) : null,
);
const tokens = computed(() =>
  props.kind === "insertion"
    ? insertionTokens(numbers.value, threshold.value)
    : [],
);
function numberX(n: number) {
  const min = Math.min(...numbers.value),
    max = Math.max(...numbers.value);
  return 65 + ((n - min) / (max - min || 1)) * 470;
}
function numberY(index: number) {
  return 65 + (index % 3) * 44;
}
function bracketX(index: number) {
  return 30 + (index / Math.max(1, brackets.value.length)) * 540;
}
function bracketY(depth: number) {
  return (
    140 -
    (depth / Math.max(1, ...brackets.value.map((item) => item.depth))) * 104
  );
}
const bracketLine = computed(() =>
  [
    [30, 140],
    ...brackets.value
      .slice(0, props.step)
      .map((item) => [bracketX(item.index + 1), bracketY(item.depth)]),
  ]
    .map((point) => point.join(","))
    .join(" "),
);
function balanceX(index: number) {
  return 42 + (index / Math.max(1, numbers.value.length)) * 510;
}
function balanceY(n: number) {
  const values = [
    0,
    ...balances.value.flatMap((item) =>
      item.balance === null ? [] : [item.balance],
    ),
  ];
  const min = Math.min(-1, ...values),
    max = Math.max(1, ...values);
  return 185 - ((n - min) / (max - min)) * 140;
}
const balanceLine = computed(() =>
  [
    [balanceX(0), balanceY(0)],
    ...balances.value
      .slice(0, props.step)
      .flatMap((item) =>
        item.balance === null
          ? []
          : [[balanceX(item.index + 1), balanceY(item.balance)]],
      ),
  ]
    .map((point) => point.join(","))
    .join(" "),
);
const summary = computed(() => {
  if (props.kind === "distance")
    return pair.value
      ? `比较第 ${pair.value.left + 1}、${pair.value.right + 1} 个数：绝对差${displayedDistance.value?.approximate ? "约为" : "为"} ${displayedDistance.value?.text}；按未舍入值比较，${pair.value.close ? "小于" : "不小于"}阈值 ${threshold.value}。${pair.value.close ? "找到一对，返回 True。" : props.step === pairs.value.length ? "没有符合的数对，返回 False。" : "这对不够近，继续找。"}`
      : "先把数放到数轴上。找的是任意一对，不只相邻输入项。";
  if (props.kind === "brackets")
    return bracket.value
      ? `读到第 ${props.step} 个字符${bracket.value.char === " " ? "：空格，忽略" : ` ${bracket.value.char}`}；当前深度 ${bracket.value.depth}。${bracket.value.boundary ? "回到 0，完成一个外层组。" : "不在这里切分。"}`
      : "从深度 0 开始。左括号加 1，右括号减 1，空格不改变深度。";
  if (props.kind === "decimal")
    return props.step === 0
      ? "把这个正数拆成整数单位和不足一个单位的余量。"
      : props.step === 1
        ? `完整的整数部分是 ${decimal.value?.integer}。只保留剩下的一段。`
        : `小数余量约为 ${fmt(decimal.value!.decimal)}，不是把原数四舍五入。`;
  if (props.kind === "balance")
    return !numbers.value.length
      ? "没有存取操作，余额一直为 0，因此返回 False。"
      : balance.value
        ? `第 ${props.step} 次操作后余额为 ${balance.value.balance}。${balance.value.below ? "已经小于 0，立即返回 True，后续操作不再执行。" : props.step === numbers.value.length ? "全程没有负数，返回 False。" : "等于 0 也不算透支，继续。"}`
        : "余额从 0 开始。图中只累积读到的操作，遇到负数便停止。";
  if (props.kind === "deviation")
    return props.step === 0
      ? "先看这组数的位置，目标是到均值的平均绝对距离。"
      : props.step === 1
        ? `均值 μ = ${fmt(deviation.value!.mean)}，先确定共同的中心。`
        : props.step <= numbers.value.length + 1
          ? `第 ${props.step - 1} 个数到均值的绝对距离为 ${fmt(deviation.value!.distances[props.step - 2])}。不保留正负号，也不平方。`
          : `距离合计 ${fmt(deviation.value!.total)}，除以 ${numbers.value.length} 个数，得到约 ${fmt(deviation.value!.result)}。`;
  if (!numbers.value.length)
    return "没有相邻元素，也就没有插入位置。输出仍是空列表。";
  if (!props.step) return "保留输入顺序，只在相邻元素的间隙加入分隔数。";
  const token = tokens.value[props.step - 1];
  return token
    ? `${token.inserted ? "在两元素之间插入分隔数" : `保留第 ${token.inputIndex! + 1} 个原元素`} ${token.value}。${props.step === tokens.value.length ? "到最后一个原元素为止，末尾不加分隔数。" : ""}`
    : "";
});
</script>
<template>
  <div class="he-scene" :data-scene="kind">
    <div v-if="kind === 'distance'" class="he-distance">
      <div class="he-scene-heading">
        <span>数轴上的距离</span><b>threshold = {{ threshold }}</b>
      </div>
      <svg
        viewBox="0 0 600 245"
        role="img"
        :aria-label="`数轴示意，输入 ${numbers.join('、')}。${summary}`"
      >
        <line x1="40" y1="200" x2="560" y2="200" class="he-axis" />
        <text x="40" y="227" class="he-svg-note">较小</text>
        <text x="530" y="227" class="he-svg-note">较大</text>
        <path
          v-if="pair"
          :d="`M ${numberX(numbers[pair.left])} ${numberY(pair.left)} L ${numberX(numbers[pair.right])} ${numberY(pair.right)}`"
          class="he-distance-link"
        />
        <g
          v-for="(number, index) in numbers"
          :key="index"
          :class="{
            'he-active-point':
              pair && (index === pair.left || index === pair.right),
          }"
        >
          <line
            :x1="numberX(number)"
            :x2="numberX(number)"
            :y1="numberY(index)"
            y2="200"
            class="he-guide"
          />
          <circle
            :cx="numberX(number)"
            :cy="numberY(index)"
            r="14"
            class="he-point"
          />
          <text
            :x="numberX(number)"
            :y="numberY(index) + 4"
            text-anchor="middle"
            class="he-index"
          >
            {{ index + 1 }}
          </text>
          <text
            :x="numberX(number)"
            :y="numberY(index) - 22"
            text-anchor="middle"
            class="he-value"
          >
            {{ number }}
          </text>
        </g>
      </svg>
      <div class="he-distance-check">
        <span>绝对差</span
        ><strong
          :title="
            displayedDistance ? `未舍入值：${displayedDistance.raw}` : undefined
          "
          >{{
            displayedDistance
              ? `${displayedDistance.approximate ? "≈ " : ""}${displayedDistance.text}`
              : "待比较"
          }}</strong
        ><b>{{ pair ? (pair.close ? "<" : "≥") : "?" }}</b
        ><strong>{{ threshold }}</strong
        ><span>阈值</span>
      </div>
      <p class="he-chart-note">
        图中使用简洁数值，判断使用未舍入值。若舍入会掩盖阈值边界，则保留完整精度。
      </p>
      <details v-if="displayedDistance" class="he-precision">
        <summary>查看当前未舍入值</summary>
        <code>{{ displayedDistance.raw }}</code>
      </details>
      <p class="he-chart-note">
        圆内数字是输入位置。连线连接当前数对；距离按横轴数值计算，不按斜线长度。省略反向重复数对，不是
        Python 逐行跟踪。
      </p>
    </div>
    <div v-else-if="kind === 'brackets'" class="he-brackets">
      <div class="he-scene-heading">
        <span>逐字符走过括号</span><b>深度 {{ bracket?.depth || 0 }}</b>
      </div>
      <div class="he-character-strip" aria-label="括号字符，圆点表示空格">
        <span
          v-for="token in brackets"
          :key="token.index"
          :class="{
            read: token.index < step,
            current: token.index === step - 1,
            boundary: token.boundary && token.index < step,
            space: token.char === ' ',
          }"
          >{{ token.char === " " ? "·" : token.char }}</span
        >
      </div>
      <svg
        viewBox="0 0 600 170"
        role="img"
        :aria-label="`括号深度轨迹。${summary}`"
      >
        <line x1="30" y1="140" x2="570" y2="140" class="he-axis" />
        <text x="8" y="144" class="he-svg-note">0</text>
        <polyline :points="bracketLine" class="he-trace" />
        <g
          v-for="token in brackets.slice(0, step).filter((t) => t.boundary)"
          :key="token.index"
        >
          <circle
            :cx="bracketX(token.index + 1)"
            cy="140"
            r="6"
            class="he-point"
          />
          <text
            :x="bracketX(token.index + 1)"
            y="163"
            text-anchor="middle"
            class="he-svg-note"
          >
            切分
          </text>
        </g>
      </svg>
      <div class="he-group-output">
        <span>已完成的组</span
        ><code v-for="(group, index) in bracket?.groups || []" :key="index">{{
          group
        }}</code
        ><small v-if="!bracket?.groups.length">尚未切出完整组</small>
      </div>
      <p class="he-chart-note">
        · 代表原字符串中的空格。括号深度回到 0 的位置才是外层分组边界。
      </p>
    </div>
    <div v-else-if="kind === 'decimal' && decimal" class="he-decimal">
      <div class="he-scene-heading">
        <span>一个数，两部分</span><b>正浮点数</b>
      </div>
      <div class="he-number-equation">
        <strong>{{ example.args[0] }}</strong
        ><span>=</span>
        <div :class="{ illuminated: step >= 1 }">
          <b>{{ decimal.integer }}</b
          ><small>整数部分</small>
        </div>
        <span>+</span>
        <div :class="{ illuminated: step >= 2 }">
          <b>{{ fmt(decimal.decimal) }}</b
          ><small>小数余量（约）</small>
        </div>
      </div>
      <div class="he-unit-window">
        <div class="he-unit-label">
          <span>放大剩下的 1 个单位</span
          ><b>{{ step >= 2 ? `${fmt(decimal.decimal * 100)}%` : "不足 1" }}</b>
        </div>
        <div
          class="he-unit-track"
          role="img"
          :aria-label="`不足一个单位的余量约为 ${fmt(decimal.decimal)}`"
        >
          <span
            :style="{ width: `${decimal.decimal * 100}%` }"
            :class="{ illuminated: step >= 2 }"
          ></span>
        </div>
        <div class="he-unit-ticks">
          <span>0</span><span>0.5</span><span>1</span>
        </div>
      </div>
      <p class="he-chart-note">
        示意按十进制显示到 6
        位。浮点余量可能不是精确十进制；公开测试中标有容差的断言按其容差检查。
      </p>
    </div>
    <div v-else-if="kind === 'balance'" class="he-balance">
      <div class="he-scene-heading">
        <span>余额不是只看最后一笔</span><b>当前 {{ balance?.balance ?? 0 }}</b>
      </div>
      <svg
        viewBox="0 0 600 225"
        role="img"
        :aria-label="`从零开始的余额轨迹。${summary}`"
      >
        <rect
          x="30"
          :y="balanceY(0)"
          width="540"
          :height="205 - balanceY(0)"
          class="he-negative-zone"
        />
        <line
          x1="30"
          :y1="balanceY(0)"
          x2="570"
          :y2="balanceY(0)"
          class="he-axis"
        />
        <text x="9" :y="balanceY(0) + 4" class="he-svg-note">0</text>
        <polyline :points="balanceLine" class="he-trace" />
        <circle :cx="balanceX(0)" :cy="balanceY(0)" r="5" class="he-point" />
        <g
          v-for="item in balances
            .slice(0, step)
            .filter((item) => item.balance !== null)"
          :key="item.index"
        >
          <circle
            :cx="balanceX(item.index + 1)"
            :cy="balanceY(item.balance!)"
            r="6"
            class="he-point"
            :class="{ 'he-below': item.below }"
          />
          <text
            :x="balanceX(item.index + 1)"
            :y="balanceY(item.balance!) - 13"
            text-anchor="middle"
            class="he-value"
          >
            {{ item.balance }}
          </text>
        </g>
        <text x="42" y="220" class="he-svg-note">起点</text>
        <text x="480" y="220" class="he-svg-note">操作顺序 →</text>
      </svg>
      <div class="he-operation-strip">
        <span v-if="!numbers.length" class="he-empty-list">[] · 没有操作</span>
        <div
          v-for="item in balances"
          :key="item.index"
          :class="{
            read: item.index < step,
            current: item.index === step - 1,
            skipped: item.balance === null && balance?.below,
          }"
        >
          <small>第 {{ item.index + 1 }} 笔</small
          ><b>{{ item.operation > 0 ? "+" : "" }}{{ item.operation }}</b
          ><small v-if="item.balance === null && balance?.below"
            >不再执行</small
          >
        </div>
      </div>
      <p class="he-chart-note">
        阴影区是负余额。首次低于 0
        就提前返回；未读取的后续操作不画成已执行轨迹。
      </p>
    </div>
    <div v-else-if="kind === 'deviation' && deviation" class="he-deviation">
      <div class="he-scene-heading">
        <span>到同一个中心的距离</span
        ><b>μ {{ step >= 1 ? `= ${fmt(deviation.mean)}` : "= ?" }}</b>
      </div>
      <svg
        :viewBox="`0 0 600 ${numbers.length * 43 + 65}`"
        role="img"
        :aria-label="`每个数到均值的绝对距离。${summary}`"
      >
        <line
          v-if="step >= 1"
          :x1="numberX(deviation.mean)"
          y1="22"
          :x2="numberX(deviation.mean)"
          :y2="numbers.length * 43 + 25"
          class="he-mean-axis"
        />
        <text
          v-if="step >= 1"
          :x="numberX(deviation.mean)"
          y="15"
          text-anchor="middle"
          class="he-svg-note"
        >
          均值 {{ fmt(deviation.mean) }}
        </text>
        <g v-for="(number, index) in numbers" :key="index">
          <line
            x1="65"
            :y1="43 + index * 43"
            x2="535"
            :y2="43 + index * 43"
            class="he-guide"
          />
          <line
            v-if="step >= index + 2"
            :x1="numberX(number)"
            :x2="numberX(deviation.mean)"
            :y1="43 + index * 43"
            :y2="43 + index * 43"
            class="he-distance-link"
          />
          <circle
            :cx="numberX(number)"
            :cy="43 + index * 43"
            r="7"
            class="he-point"
          />
          <text x="18" :y="47 + index * 43" class="he-value">{{ number }}</text>
          <text
            v-if="step >= index + 2"
            :x="(numberX(number) + numberX(deviation.mean)) / 2"
            :y="33 + index * 43"
            text-anchor="middle"
            class="he-svg-note"
          >
            距离 {{ fmt(deviation.distances[index]) }}
          </text>
        </g>
      </svg>
      <div class="he-average">
        <span>绝对距离</span>
        <div>
          <b
            v-for="(distance, index) in deviation.distances"
            :key="index"
            :class="{ pending: step < index + 2 }"
            >{{ step >= index + 2 ? fmt(distance) : "?" }}</b
          >
        </div>
        <strong>{{
          step >= numbers.length + 2
            ? `合计 ${fmt(deviation.total)} ÷ ${numbers.length} ≈ ${fmt(deviation.result)}`
            : `最后再除以 ${numbers.length}`
        }}</strong>
      </div>
    </div>
    <div v-else-if="kind === 'insertion'" class="he-insertion">
      <div class="he-scene-heading">
        <span>填间隙，不填两端</span><b>delimeter = {{ threshold }}</b>
      </div>
      <div class="he-conveyor">
        <span class="he-row-label">输入</span>
        <div class="he-token-row">
          <span v-if="!numbers.length" class="he-empty-list">[]</span>
          <div v-for="(number, index) in numbers" :key="index" class="he-token">
            <b>{{ number }}</b
            ><small>原 {{ index + 1 }}</small>
          </div>
        </div>
        <span class="he-flow-arrow" aria-hidden="true">↓</span
        ><span class="he-row-label">逐项构造输出</span>
        <div class="he-token-row">
          <span v-if="!tokens.length" class="he-empty-list"
            >[] · 空列表保持为空</span
          >
          <div
            v-for="(token, index) in tokens"
            :key="index"
            class="he-token"
            :class="{
              inserted: token.inserted,
              pending: index >= step,
              current: index === step - 1,
            }"
          >
            <b>{{ index < step ? token.value : "·" }}</b
            ><small>{{
              token.inserted ? "插入" : `原 ${token.inputIndex! + 1}`
            }}</small>
          </div>
        </div>
      </div>
      <p class="he-chart-note">
        实线框是原元素，虚线框是插入项。即使数值相同，也保留来源标记；{{
          numbers.length
        }}
        个原元素对应 {{ Math.max(0, numbers.length - 1) }} 个间隙。
      </p>
    </div>
    <p
      class="he-scene-summary"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ summary }}
    </p>
  </div>
</template>
<style scoped src="../styles/human-eval-scene.css"></style>
