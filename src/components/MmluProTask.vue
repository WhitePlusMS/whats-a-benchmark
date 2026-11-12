<script setup lang="ts">
import {
  mmluProPipeline,
  type MmluProRecord,
  type MmluProCase,
} from "../content/mmluProExperience";
import { useMmluProPractice } from "../composables/mmluProPractice";
const props = defineProps<{ record: MmluProRecord; entry: MmluProCase }>();
const { selected, revealed, explanation, original, step, result, reset } =
  useMmluProPractice(() => props.record);
</script>
<template>
  <article class="mp-task">
    <div class="mp-meta">
      validation · {{ record.category }} · question_id {{ record.questionId }}
    </div>
    <h3>{{ entry.label }}</h3>
    <p class="mp-question" lang="en" translate="no">{{ record.question }}</p>
    <fieldset class="mp-options">
      <legend>选择一个答案</legend>
      <label
        v-for="option in record.options"
        :key="option.index"
        :class="{ 'mp-selected': selected === option.index }"
      >
        <input
          v-model="selected"
          type="radio"
          :name="'mmlu-pro-' + entry.sampleId"
          :value="option.index"
        />
        <b>{{ option.letter }}</b
        ><span lang="en" translate="no">{{ option.text }}</span>
      </label>
    </fieldset>
    <p class="mp-small">
      {{ record.options.length }} 个有效选项<span v-if="record.omitted"
        >；原数组另有 {{ record.omitted }} 个 N/A 占位，已从练习中排除</span
      >。原始数组保留在下方原始记录。
    </p>
    <div class="mp-actions">
      <button
        type="button"
        class="primary-button"
        @click="revealed = !revealed"
        :aria-expanded="revealed"
        aria-controls="mp-answer"
      >
        {{ revealed ? "收起答案" : "查看标注与解读" }}</button
      ><button type="button" class="mp-button" @click="reset">重置本题</button>
    </div>
    <section v-if="revealed" id="mp-answer" class="mp-answer">
      <p role="status">
        {{
          result === "waiting"
            ? "尚未作答，不计为答对。"
            : result === "correct"
              ? "你的选择与官方标注一致。"
              : "你的选择与官方标注不一致。"
        }}
        参考答案：<strong
          >{{ record.answer }}.
          {{
            record.options.find((o) => o.index === record.answerIndex)?.text
          }}</strong
        >
      </p>
      <p class="mp-small">
        这里只比较本站选择与公开标注，不运行模型，不是榜单成绩。
      </p>
      <button
        type="button"
        class="mp-button"
        @click="explanation = !explanation"
        :aria-expanded="explanation"
        aria-controls="mp-explanation"
      >
        {{ explanation ? "收起" : "展开" }}本站精炼解读
      </button>
      <div v-if="explanation" id="mp-explanation" class="mp-explanation">
        <p v-for="line in entry.explanation" :key="line">{{ line }}</p>
        <div v-if="record.questionId === 30" class="mp-pipeline">
          <h4>按依赖检查这个 5 指令方案</h4>
          <p>
            初始 R0=A、R1=B、R2=C；三者全程不改写。这里只演示寄存器关系，不是
            CPU 模拟器。
          </p>
          <div class="mp-actions">
            <button
              type="button"
              class="mp-button"
              :disabled="step === 0"
              @click="step--"
            >
              上一步</button
            ><span aria-live="polite">第 {{ step + 1 }} / 5 条</span
            ><button
              type="button"
              class="mp-button"
              :disabled="step === 4"
              @click="step++"
            >
              下一步
            </button>
          </div>
          <ol class="mp-instructions">
            <li
              v-for="(row, i) in mmluProPipeline"
              :key="row.instruction"
              :class="{ 'mp-active': step === i }"
              :aria-current="step === i ? 'step' : undefined"
            >
              <button type="button" @click="step = i">
                <code>{{ row.instruction }}</code
                ><span>{{ row.result }}</span
                ><b>{{ row.cycles }} 周期</b>
              </button>
            </li>
          </ol>
          <p class="mp-dependency" role="status">
            {{
              step === 3
                ? "第 4 条产出 R6 → 第 5 条立即读取 R6：唯一相邻依赖，因此第 4 条耗 2 周期。"
                : step === 4
                  ? "第 5 条读取 R5 和 R6，最终得到 AB + ABC + BC。相邻依赖的额外周期已计在第 4 条。"
                  : "下一条不立即读取本条产出的寄存器，因此按题面规则本条耗 1 周期。"
            }}
          </p>
          <p>
            <strong>1 + 1 + 1 + 2 + 1 = 6 周期</strong>；没有添加题面未给出的
            STALL 指令。
          </p>
        </div>
        <a
          v-if="record.questionId === 65"
          href="https://icj-web.leman.un-icc.cloud/judges-ad-hoc"
          target="_blank"
          rel="noreferrer"
          >国际法院专案法官说明 ↗</a
        >
      </div>
      <div v-if="entry.correction" class="mp-correction">
        <strong>公开解释纠错</strong>
        <p>{{ entry.correction }}</p>
        <a
          v-if="record.questionId === 20"
          href="https://pubmed.ncbi.nlm.nih.gov/36794934/"
          target="_blank"
          rel="noreferrer"
          >核对细菌细胞壁与质膜关系（论文摘要）↗</a
        >
      </div>
      <button
        type="button"
        class="mp-button"
        @click="original = !original"
        :aria-expanded="original"
        aria-controls="mp-original"
      >
        {{ original ? "收起" : "展开" }}数据中的原始 CoT
      </button>
      <div v-if="original" id="mp-original">
        <p class="mp-small">
          这是数据集公开提供的示范推理文本，不是本站生成内容，也不是任何模型的隐藏思维或本轮输出。原文未经改写，不保证每一步正确。
        </p>
        <pre lang="en" translate="no" tabindex="0">{{ record.cot }}</pre>
      </div>
    </section>
  </article>
</template>
