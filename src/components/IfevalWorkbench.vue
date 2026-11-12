<script setup lang="ts">
import { computed } from "vue";
import { useIfevalWorkbench } from "../composables/ifevalWorkbench";
import {
  inspectIfeval,
  ifevalPresets,
  variantLabels,
  type IfevalRecord,
  type CheckState,
} from "../content/ifevalExperience";
import IfevalRuleVisual from "./IfevalRuleVisual.vue";
const props = defineProps<{ record: IfevalRecord; sampleId: string }>();
const { draft, selectedVariant, showMatrix, reset } = useIfevalWorkbench(
  () => props.sampleId,
);
const analysis = computed(() => inspectIfeval(props.record, draft.value));
const presets = computed(() => ifevalPresets(props.record));
const active = computed(() => draft.value.length > 0);
const label = (s: CheckState) =>
  ({ pass: "满足", fail: "不满足", unknown: "未判定" })[s];
const symbol = (s: CheckState) => ({ pass: "✓", fail: "×", unknown: "?" })[s];
</script>
<template>
  <div class="if-lab">
    <div class="if-editor">
      <div class="if-editor-heading">
        <div>
          <span class="walkthrough-kicker">本站格式实验 · 非模型记录</span>
          <h3>改一处，看看哪条规则变了。</h3>
        </div>
        <button type="button" class="secondary-button" @click="reset">
          清空练习
        </button>
      </div>
      <p>
        不生成完整答案，不上传文本，不执行官方评测。教学子检查不判断事实、风格或任务质量。
      </p>
      <div class="if-presets" role="group" aria-label="载入本站格式片段">
        <button
          v-for="p in presets"
          :key="p.label"
          type="button"
          @click="draft = p.text"
        >
          {{ p.label }}
        </button>
      </div>
      <label for="if-draft"
        >可编辑格式片段
        <small>最多 12,000 字符；切题清空，不保存草稿</small></label
      >
      <textarea
        id="if-draft"
        v-model="draft"
        maxlength="12000"
        spellcheck="false"
        rows="6"
        placeholder="在这里输入片段，或点上方教学片段。没有官方参考回答。"
        aria-describedby="if-scope"
      ></textarea>
      <p id="if-scope" class="if-scope">
        词数、关键词、复述与段标的教学检查仅支持 ASCII；这些规则遇到非 ASCII
        字符会标「未判定」。逗号、方括号、星号与标题仍按各自规则检查。全大写英语条件因未运行
        langdetect，始终不作完整通过结论。
      </p>
    </div>
    <div class="if-flow-caption">
      <span
        >当前检查：{{
          selectedVariant === 0
            ? "strict 原片段"
            : `loose 候选 ${selectedVariant + 1}`
        }}</span
      ><b>每条约束独立检查</b><span>再看全部条件能否合取</span>
    </div>
    <div class="if-visuals">
      <IfevalRuleVisual
        v-for="(row, i) in analysis.rows"
        :key="record.instruction_id_list[i]"
        :result="row[selectedVariant]!"
        :text="analysis.variants[selectedVariant]!"
        :active="active"
      />
    </div>
    <div class="if-summary" aria-live="polite">
      <div>
        <small>本站支持范围内 · strict 合取</small
        ><strong>{{ active ? label(analysis.strictAll) : "等待片段" }}</strong>
      </div>
      <span aria-hidden="true">→</span>
      <p>
        这里只检查已有的格式规则，不是正式 IFEval
        分数。即使显示「满足」，也不能证明写出了合格回答。
      </p>
    </div>
    <button
      type="button"
      class="if-matrix-toggle"
      :aria-expanded="showMatrix"
      aria-controls="if-loose"
      @click="showMatrix = !showMatrix"
    >
      {{ showMatrix ? "收起" : "展开" }} loose 的 8 个候选
    </button>
    <section v-if="showMatrix" id="if-loose" class="if-loose">
      <h3>每条规则先 OR，再把规则 AND。</h3>
      <p>
        每条指令可以由不同候选满足。不要求存在同一个候选同时满足全部指令。空白候选不通过；「删除
        *」删除所有 ASCII 星号，不是通用去 Markdown。
      </p>
      <div class="if-variants" role="group" aria-label="观察宽松候选">
        <button
          v-for="(name, i) in variantLabels"
          :key="name"
          type="button"
          :aria-pressed="selectedVariant === i"
          @click="selectedVariant = i"
        >
          {{ i + 1 }} · {{ name }}
        </button>
      </div>
      <pre class="if-candidate" translate="no">{{
        analysis.variants[selectedVariant] || "（此候选为空）"
      }}</pre>
      <div
        class="if-matrix-scroll"
        tabindex="0"
        role="region"
        aria-label="宽松检查矩阵，可横向滚动"
      >
        <table>
          <caption>
            行内任一候选满足 → 该规则的 loose 结果
          </caption>
          <thead>
            <tr>
              <th scope="col">规则 / 候选</th>
              <th
                v-for="(n, i) in variantLabels"
                :key="n"
                scope="col"
                :title="n"
              >
                {{ i + 1 }}
              </th>
              <th scope="col">OR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in analysis.rows" :key="i">
              <th scope="row">{{ row[0]!.label }}</th>
              <td v-for="(r, j) in row" :key="j" :class="active ? r.state : ''">
                <span :aria-label="active ? label(r.state) : '等待片段'">{{
                  active ? symbol(r.state) : "—"
                }}</span>
              </td>
              <td :class="active ? analysis.loose[i] : ''">
                {{ active ? label(analysis.loose[i]!) : "—" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="if-loose-result">
        本站支持范围内 loose 合取：<b>{{
          active ? label(analysis.looseAll) : "等待片段"
        }}</b
        >。✓ 满足 · × 不满足 · ? 未判定。未知不是失败，也不能当作通过。
      </p>
    </section>
  </div>
</template>
