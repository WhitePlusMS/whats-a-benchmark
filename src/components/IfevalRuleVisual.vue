<script setup lang="ts">
import { computed } from "vue";
import type { RuleResult } from "../content/ifevalExperience";
const props = defineProps<{
  result: RuleResult;
  text: string;
  active: boolean;
}>();
const slots = computed(() =>
  Array.from(
    {
      length: Math.min(
        24,
        Math.max(props.result.target || 0, props.result.count || 0),
      ),
    },
    (_, i) => i,
  ),
);
const progress = computed(() =>
  Math.min(100, (100 * (props.result.count || 0)) / (props.result.target || 1)),
);
const chars = computed(() =>
  Array.from(props.text.slice(0, 160)).map((char, i) => ({
    char,
    index: i,
    hit: char === ",",
  })),
);
const excerpt = computed(() => props.result.matches.slice(0, 12));
const stateText = computed(() =>
  !props.active
    ? "等待片段"
    : { pass: "子检查满足", fail: "子检查不满足", unknown: "未判定" }[
        props.result.state
      ],
);
</script>
<template>
  <article class="if-rule" :class="active ? result.state : 'idle'">
    <header>
      <h4>
        {{ result.label
        }}<template v-if="result.id === 'length_constraints:number_words'">
          ≥ {{ result.target || (result.id && "—") }}</template
        >
      </h4>
      <span class="if-state">{{ stateText }}</span>
    </header>
    <template v-if="result.id === 'punctuation:no_comma'">
      <div class="if-scan" aria-label="片段前160字符的逗号扫描">
        <span
          v-for="(c, i) in chars"
          :key="i"
          :class="{ hit: c.hit }"
          :title="`字符 ${i + 1}`"
          >{{ c.char === "\n" ? "↵" : c.char === " " ? "·" : c.char }}</span
        ><span v-if="!chars.length" class="muted"
          >字符进入 → 只拦截 , → 其余放行</span
        >
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? 0) : "—" }}</b> 枚英文逗号
        <small>全文计数；轨道只展示前 160 字符</small>
      </p>
    </template>
    <template
      v-else-if="result.id === 'detectable_content:number_placeholders'"
    >
      <div class="if-slots" aria-label="十二个目标槽位">
        <span
          v-for="i in slots.length
            ? slots
            : Array.from({ length: 12 }, (_, i) => i)"
          :key="i"
          :class="{ filled: active && i < (result.count || 0) }"
          ><small>{{ i + 1 }}</small
          >{{
            active && result.matches[i] ? result.matches[i]!.text : "[ … ]"
          }}</span
        >
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? 0) : "—" }}</b> / 至少 12
        <small>图最多展示 24 槽，计数不截断</small>
      </p>
    </template>
    <template v-else-if="result.id === 'length_constraints:number_words'">
      <div class="if-budget">
        <div :style="{ width: `${active ? progress : 0}%` }"></div>
        <span>阈值 {{ result.target ?? "—" }}</span>
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? "?") : "—" }}</b> 个 ASCII 计数单元
      </p>
      <div class="if-token-row">
        <span v-for="(m, i) in excerpt" :key="i">{{ m.text }}</span>
      </div>
      <small>仅展示前 12 个单元。非 ASCII 输入不作词数结论。</small>
    </template>
    <template
      v-else-if="result.id === 'detectable_format:number_highlighted_sections'"
    >
      <div class="if-highlights">
        <span v-for="(m, i) in excerpt" :key="i"
          ><small>匹配 {{ i + 1 }}</small
          ><code>{{ m.text }}</code></span
        ><span v-if="!excerpt.length"
          ><code>*…*</code> 或 <code>**…**</code></span
        >
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? 0) : "—" }}</b> / 至少 3
        <small># Heading 不计数</small>
      </p>
    </template>
    <template v-else-if="result.id === 'combination:repeat_prompt'">
      <div class="if-prefix-sample">
        <small>{{
          result.matches.length ? "匹配到的开头" : "当前片段的开头"
        }}</small>
        <p translate="no">
          {{
            result.matches[0]?.text ||
            text.slice(0, 180) ||
            "等待输入；复述范围来自 kwargs.prompt_to_repeat。"
          }}
        </p>
      </div>
    </template>
    <template v-else-if="result.id === 'detectable_format:title'">
      <p class="if-match-text">
        <b>命中片段：</b
        ><code v-for="(m, i) in excerpt" :key="i">{{ m.text }}</code
        ><span v-if="!excerpt.length">{{
          active ? "未找到匹配" : "等待片段"
        }}</span>
      </p>
      <p>
        位置不限，原请求中的字面
        <code>&lt;&lt;title&gt;&gt;</code> 也可能被命中。
      </p>
    </template>
    <template v-else-if="result.id === 'detectable_format:multiple_sections'">
      <div class="if-section-track">
        <div v-for="(m, i) in excerpt" :key="i">
          <b>段标 {{ i + 1 }}</b
          ><code>{{ m.text.trim() }}</code>
        </div>
        <div v-if="!excerpt.length">PARAGRAPH 1 → PARAGRAPH 2</div>
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? "?") : "—" }}</b> / 至少 2
        <small>重复编号也计数</small>
      </p>
    </template>
    <template v-else-if="result.id === 'change_case:english_capital'">
      <div class="if-case-scan" aria-label="前160字符的ASCII小写热区">
        <span
          v-for="(c, i) in chars"
          :key="i"
          :class="{ hit: /[a-z]/.test(c.char) }"
          >{{ c.char === "\n" ? "↵" : c.char }}</span
        ><span v-if="!chars.length">Aa → 大写子检查 → 英语识别待运行</span>
      </div>
      <p class="if-readout">
        <b>{{ active ? (result.count ?? 0) : "—" }}</b> 个 ASCII 小写字符
      </p>
      <p class="if-pending">英语 langdetect：未运行</p>
    </template>
    <template v-else-if="result.id === 'keywords:existence'">
      <div class="if-keywords">
        <div
          v-for="word in ['correlated', 'experiencing']"
          :key="word"
          :class="{
            filled: result.matches.some((m) => m.text.toLowerCase() === word),
          }"
        >
          <b>{{ word }}</b
          ><small>{{
            !active
              ? "等待片段"
              : result.state === "unknown"
                ? "未扫描 / 未判定"
                : `${result.matches.filter((m) => m.text.toLowerCase() === word).length} 次命中`
          }}</small>
        </div>
      </div>
      <ul
        v-if="result.matches.length"
        class="if-match-context"
        aria-label="关键词命中上下文"
      >
        <li v-for="(m, i) in excerpt" :key="i" translate="no">
          <span
            >{{ m.start > 18 ? "…" : ""
            }}{{ text.slice(Math.max(0, m.start - 18), m.start) }}</span
          ><mark>{{ m.text }}</mark
          ><span
            >{{ text.slice(m.end, m.end + 18)
            }}{{ text.length > m.end + 18 ? "…" : "" }}</span
          >
        </li>
      </ul>
      <small v-if="result.matches.length"
        >展示前 12 个匹配的上下文；高亮可能只占单词的一部分。</small
      >
    </template>
    <p class="if-rule-note">
      {{ active ? result.detail : "输入或载入本站格式片段，观察对应约束。" }}
    </p>
    <code class="if-rule-id">{{ result.id }}</code>
  </article>
</template>
