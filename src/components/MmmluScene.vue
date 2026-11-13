<script setup lang="ts">
import { computed, ref } from "vue";
import {
  polynomialMod5,
  permutationPower,
  type MmmluCase,
} from "../content/mmmluExperience";
const props = defineProps<{ kind: MmmluCase["kind"]; revealed: boolean }>();
const level = ref(0),
  power = ref(0),
  element = ref(0),
  statement = ref(1);
const root = computed(() => polynomialMod5(element.value)!);
const cycle = [1, 2, 3, 5, 4];
const points = [
  { x: 160, y: 38 },
  { x: 264, y: 114 },
  { x: 224, y: 236 },
  { x: 96, y: 236 },
  { x: 56, y: 114 },
];
const activeNode = computed(() => permutationPower(1, power.value));
</script>
<template>
  <div class="mm-scene" :class="`mm-scene-${kind}`">
    <div class="mm-scene-label">
      {{
        revealed ? "本站数学图解 · 非官方解析" : "原题里的对象 · 尚未揭示解答"
      }}
    </div>
    <template v-if="!revealed">
      <div
        v-if="kind === 'field'"
        class="mm-generators"
        aria-label="题目给出三个根式，次数尚待求解"
      >
        <span>√2</span><span>√3</span><span>√18</span><b>Q → Q(√2, √3, √18)</b>
        <p>三个根式，真的带来三次独立扩张吗？</p>
      </div>
      <div v-else-if="kind === 'permutation'" class="mm-input-diagram">
        <div class="mm-symbols">
          <span v-for="n in 5" :key="n">{{ n }}</span>
        </div>
        <b>(1 2 5 4) ∘ (2 3)</b>
        <p>先作用右侧置换。要数的是子群在 S₅ 中的指数。</p>
      </div>
      <div v-else-if="kind === 'roots'" class="mm-input-diagram">
        <b>f(x) = x⁵ + 3x³ + x² + 2x</b>
        <div class="mm-symbols">
          <span v-for="n in [0, 1, 2, 3, 4]" :key="n">{{ n }}</span>
        </div>
        <p>Z₅ 只有这五个元素。哪些代入后余数为零？</p>
      </div>
      <div v-else class="mm-input-diagram">
        <div class="mm-nested">
          <b>G</b>
          <div>
            <b>H</b>
            <div><b>K</b></div>
          </div>
        </div>
        <p>包含关系看得见，正规性可以直接传递吗？</p>
      </div>
      <p class="mm-unrevealed">
        先选一个选项，或直接打开下方图解核对。本站不运行模型。
      </p>
    </template>
    <template v-else-if="kind === 'field'">
      <h4>多一个写法，不一定多一个维度。</h4>
      <div class="mm-control-row" role="group" aria-label="选择域扩张层级">
        <button
          v-for="(label, i) in ['有理数 Q', '加入 √2', '再加入 √3']"
          :key="i"
          type="button"
          :aria-pressed="level === i"
          @click="level = i"
        >
          {{ label }}
        </button>
      </div>
      <div
        class="mm-field-tower"
        aria-label="域塔：Q 到 Q(根号2) 为2次，再到 Q(根号2,根号3) 为2次"
      >
        <div :class="{ active: level === 2 }">
          <b>Q(√2, √3)</b><span>基：1，√2，√3，√6</span>
        </div>
        <i>↑ ×2</i>
        <div :class="{ active: level === 1 }">
          <b>Q(√2)</b><span>基：1，√2</span>
        </div>
        <i>↑ ×2</i>
        <div :class="{ active: level === 0 }"><b>Q</b><span>基：1</span></div>
      </div>
      <div class="mm-basis" aria-label="当前层级的基">
        <span
          v-for="v in level === 0
            ? ['1']
            : level === 1
              ? ['1', '√2']
              : ['1', '√2', '√3', '√6']"
          :key="v"
          >{{ v }}</span
        >
      </div>
      <p class="mm-result">
        √18 = 3√2，已在第一层中。总次数 2 × 2 = 4。这里的 4 是 Q
        上向量空间的维数，域的元素并非只有四个。
      </p>
      <details>
        <summary>为什么加入 √3 还需要一次二次扩张？</summary>
        <p>
          若 √3 = a + b√2（a、b 为有理数），平方后要求 ab = 0；由此要求 a² = 3
          或 b² = 3/2，均无有理解。因此 √3 不在 Q(√2) 中。
        </p>
      </details>
    </template>
    <template v-else-if="kind === 'permutation'">
      <h4>一圈数阶，分块数指数。</h4>
      <p>右侧 (2 3) 先作用：p = (1 2 3 5 4)。</p>
      <svg
        class="mm-cycle"
        viewBox="0 0 320 285"
        role="img"
        :aria-label="`从1连续作用 p ${power}次，到达 ${activeNode}；五次回到1`"
      >
        <defs>
          <marker
            id="mm-cycle-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7" fill="currentColor" />
          </marker>
        </defs>
        <path
          v-for="segment in [
            'M185 54 L238 94',
            'M255 142 L236 207',
            'M196 236 L125 236',
            'M87 207 L65 142',
            'M78 95 L135 54',
          ]"
          :key="segment"
          :d="segment"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          marker-end="url(#mm-cycle-arrow)"
        />
        <g
          v-for="(n, i) in cycle"
          :key="n"
          :class="{ active: activeNode === n }"
        >
          <circle :cx="points[i]!.x" :cy="points[i]!.y" r="26" />
          <text :x="points[i]!.x" :y="points[i]!.y + 7" text-anchor="middle">
            {{ n }}
          </text>
        </g>
        <text x="160" y="145" text-anchor="middle">
          p{{
            power === 0
              ? "⁰"
              : power === 1
                ? ""
                : power === 2
                  ? "²"
                  : power === 3
                    ? "³"
                    : power === 4
                      ? "⁴"
                      : "⁵"
          }}
        </text>
      </svg>
      <div class="mm-control-row">
        <button type="button" :disabled="power === 0" @click="power--">
          上一次作用</button
        ><span aria-live="polite">{{ power }} / 5</span
        ><button type="button" :disabled="power === 5" @click="power++">
          再作用一次 p</button
        ><button type="button" @click="power = 0">回到起点</button>
      </div>
      <p>
        图中五个节点是被置换的符号；〈p〉 = {e, p, p², p³, p⁴}
        的五个元素则是五个置换，不是这些符号。
      </p>
      <div
        class="mm-cosets"
        aria-label="24个陪集，每个含5个元素，共120个；示意不枚举元素"
      >
        <span v-for="n in 24" :key="n">5</span>
      </div>
      <p class="mm-result">
        |S₅| = 5! = 120；指数 [S₅ : 〈p〉] = 120 ÷ 5 = 24。
      </p>
      <p>
        上方每格是一个陪集的大小示意，不是元素枚举。〈p〉不是正规子群，这里不构造商群。
      </p>
    </template>
    <template v-else-if="kind === 'roots'">
      <h4>五个元素，一个也不用猜。</h4>
      <p>“所有零”指零点：f(x) 在 Z₅ 中等于 0 的 x。</p>
      <div class="mm-residues" role="group" aria-label="选择模5代入元素">
        <button
          v-for="n in [0, 1, 2, 3, 4]"
          :key="n"
          type="button"
          :aria-pressed="element === n"
          @click="element = n"
        >
          <b>x = {{ n }}</b
          ><span>余 {{ polynomialMod5(n)!.residue }}</span
          ><small>{{
            polynomialMod5(n)!.residue === 0 ? "零点" : "非零点"
          }}</small>
        </button>
      </div>
      <div class="mm-mod-machine" aria-live="polite">
        <b>x = {{ element }}</b
        ><span>↓ 代入整数多项式</span><strong>{{ root.value }}</strong
        ><span>↓ 除以 5，取余数</span
        ><b>{{ root.value }} = 5 × {{ root.quotient }} + {{ root.residue }}</b>
        <div class="mm-remainder" aria-label="余数亮点">
          <i v-for="n in 5" :key="n" :class="{ filled: n <= root.residue }" />
        </div>
        <strong>{{
          root.residue === 0 ? "余数为 0，是零点" : "余数非 0，不是零点"
        }}</strong>
      </div>
      <p class="mm-result">穷举整个 Z₅：零点集是 {0, 4}。</p>
    </template>
    <template v-else>
      <h4>一个反例，就能推翻全称断言。</h4>
      <div class="mm-control-row" role="group" aria-label="选择群论反例">
        <button
          type="button"
          :aria-pressed="statement === 1"
          @click="statement = 1"
        >
          陈述 1：因子群</button
        ><button
          type="button"
          :aria-pressed="statement === 2"
          @click="statement = 2"
        >
          陈述 2：正规性
        </button>
      </div>
      <template v-if="statement === 1"
        ><p>取非阿贝尔群 G = S₃，正规子群 N = A₃。</p>
        <div class="mm-buckets">
          <div><b>A₃</b><span>e</span><span>(123)</span><span>(132)</span></div>
          <div>
            <b>(12)A₃</b><span>(12)</span><span>(13)</span><span>(23)</span>
          </div>
        </div>
        <p>把六个元素分成两个陪集，得到 S₃/A₃ ≅ C₂。</p>
        <div
          class="mm-cayley"
          role="img"
          aria-label="C2乘法表：E乘E为E，E乘T与T乘E均为T，T乘T为E。关于主对角线对称，所以交换。"
        >
          <span>×</span><b>E</b><b>T</b><b>E</b><span>E</span><span>T</span
          ><b>T</b><span>T</span><span>E</span>
        </div>
        <p>
          E 表示 A₃，T 表示另一个陪集。乘法表对称，因子群是阿贝尔群，而 S₃
          不是。
        </p>
        <p class="mm-result">陈述 1 为假。</p></template
      >
      <template v-else
        ><div class="mm-nested mm-normal">
          <b>G = A₄</b>
          <div>
            <b>H = V₄ ◁ G</b>
            <p>{e, (12)(34), (13)(24), (14)(23)}</p>
            <div>
              <b>K ◁ H</b>
              <p>{e, (12)(34)}</p>
            </div>
          </div>
        </div>
        <p>V₄ 在 A₄ 中正规；V₄ 是阿贝尔群，所以 K 在 V₄ 中正规。</p>
        <div class="mm-conjugate">
          <b>(12)(34) ∈ K</b><span>↓ 用 g = (123) 共轭：gkg⁻¹</span
          ><b>(23)(14) ∉ K</b>
        </div>
        <p>
          共轭把 K 的元素送出 K，所以 K 不在 A₄
          中正规。正规性不能沿包含链直接传递。
        </p>
        <p class="mm-result">陈述 2 也为假。</p></template
      >
    </template>
  </div>
</template>
