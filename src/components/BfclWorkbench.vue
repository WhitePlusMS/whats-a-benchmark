<script setup lang="ts">
import { computed } from "vue";
import {
  bfclAnnotation,
  bfclSource,
  bfclStatusLabels,
  bfclInputLimit,
  bfclRoot,
  type BfclRecord,
  type BfclCase,
} from "../content/bfclExperience";
import { useBfclWorkbench } from "../composables/bfclWorkbench";
const props = defineProps<{ record: BfclRecord; entry: BfclCase }>();
const {
  selectedName,
  inputs,
  included,
  revealed,
  checked,
  selectedFunction,
  result,
  preview,
  reset,
  loadExample,
} = useBfclWorkbench(() => props.record);
const annotation = computed(() => bfclAnnotation(props.record.id));
</script>
<template>
  <div class="bf-workbench">
    <div class="bf-request">
      <span class="bf-eyebrow">真实用户请求 · {{ record.id }}</span>
      <blockquote lang="en" translate="no">
        {{ record.question[0][0].content }}
      </blockquote>
      <p>{{ entry.note }}</p>
    </div>
    <div class="bf-workspace">
      <section class="bf-tool-list" aria-labelledby="bf-tools-title">
        <span class="bf-eyebrow">01 · 先选操作</span>
        <h3 id="bf-tools-title">题目给了哪些工具？</h3>
        <p>原始函数名与描述。选择一个，不在这里执行。</p>
        <div role="group" aria-label="选择 BFCL 函数">
          <button
            v-for="f in record.function"
            :key="f.name"
            type="button"
            :aria-pressed="selectedName === f.name"
            @click="selectedName = f.name"
          >
            <code translate="no">{{ f.name }}</code
            ><span lang="en" translate="no">{{ f.description }}</span
            ><small
              >{{ f.parameters.required.length }} 个必填参数 ·
              {{ Object.keys(f.parameters.properties).length }} 个参数</small
            >
          </button>
        </div>
      </section>
      <section class="bf-arguments" aria-labelledby="bf-arguments-title">
        <span class="bf-eyebrow">02 · 再填参数</span>
        <h3 id="bf-arguments-title">按这份 schema 组装</h3>
        <p v-if="!selectedFunction" class="bf-waiting">
          尚未选择函数。先读左侧描述，判断它是否回答这个请求。
        </p>
        <template v-else
          ><p class="bf-input-help">
            每项填写一个 JSON 值，例如
            <code>5</code>、<code>"Brazil"</code>、<code>[3,4]</code>。每项最多
            {{ bfclInputLimit }} 字符；草稿只在当前浏览器内处理。
          </p>
          <div
            v-for="(p, key) in selectedFunction.parameters.properties"
            :key="key"
            class="bf-param"
          >
            <div class="bf-param-label">
              <label :for="`bf-param-${key}`"
                ><code>{{ key }}</code></label
              ><span
                >{{ p.type }}{{ p.items ? `〈${p.items.type}〉` : "" }} ·
                {{
                  selectedFunction.parameters.required.includes(key)
                    ? "必填"
                    : "可选"
                }}</span
              >
            </div>
            <p lang="en" translate="no">{{ p.description }}</p>
            <small v-if="p.default !== undefined"
              >schema 默认值：{{ JSON.stringify(p.default) }}</small
            ><label
              v-if="!selectedFunction.parameters.required.includes(key)"
              class="bf-include"
              ><input
                type="checkbox"
                v-model="included[key]"
                :aria-label="`包含可选参数 ${key}`"
              />包含此可选参数（不勾选即省略）</label
            ><input
              :id="`bf-param-${key}`"
              :aria-label="`参数 ${key} 的 JSON 值`"
              type="text"
              v-model="inputs[key]"
              :maxlength="bfclInputLimit"
              :disabled="
                !selectedFunction.parameters.required.includes(key) &&
                !included[key]
              "
              autocomplete="off"
              spellcheck="false"
              :placeholder="
                !selectedFunction.parameters.required.includes(key) &&
                !included[key]
                  ? '已省略'
                  : '输入 JSON 字面量'
              "
            />
          </div>
        </template>
      </section>
    </div>
    <section class="bf-preview" aria-labelledby="bf-preview-title">
      <span class="bf-eyebrow">03 · 看交付结构</span>
      <h3 id="bf-preview-title">提交的是调用，不是函数返回值。</h3>
      <p>
        本站结构预览，保留输入词法；含“待填写”时不是有效
        JSON。不是所有模型的正式输出协议。
      </p>
      <pre translate="no" tabindex="0" aria-label="调用结构预览">{{
        preview
      }}</pre>
      <div class="bf-actions">
        <button type="button" class="primary-button" @click="checked = true">
          对照本例标注</button
        ><button type="button" class="pilot-link" @click="reset">
          清空调用练习
        </button>
      </div>
      <div v-if="checked" class="bf-result" aria-live="polite">
        <h4>{{ bfclStatusLabels[result.status] }}</h4>
        <p>
          仅本站支持范围的结构与候选值对照，不是官方 AST
          评测结果，也没有执行函数。
        </p>
        <ul>
          <li
            v-for="row in result.rows"
            :key="row.name"
            :data-status="row.status"
          >
            <b>{{ row.name }}</b
            ><span>{{ bfclStatusLabels[row.status] }}</span>
            <p>{{ row.reason }}</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="bf-reference">
      <button
        type="button"
        class="secondary-button"
        :aria-expanded="revealed"
        aria-controls="bf-answer"
        @click="revealed = !revealed"
      >
        {{ revealed ? "收起官方标注" : "查看官方调用标注" }}
      </button>
      <div v-if="revealed" id="bf-answer">
        <h3>另一个官方文件中的 ground_truth</h3>
        <p>
          这些是可接受参数候选，不是函数执行结果。空串候选可标记可选参数允许省略；不代表
          integer 参数可以传字符串空值。
        </p>
        <pre translate="no" tabindex="0" aria-label="官方 ground_truth 原文">{{
          JSON.stringify(annotation, null, 2)
        }}</pre>
        <a :href="bfclSource(entry, true)" target="_blank" rel="noreferrer"
          >核对该题 possible_answer 原文 ↗</a
        ><button type="button" class="secondary-button" @click="loadExample">
          载入一例标注调用
        </button>
        <p>
          载入按钮按官方候选整理一例，默认省略可选项；不是源文件中的原始调用字符串。
        </p>
      </div>
    </section>
    <details class="bf-boundary">
      <summary>本站检查哪些内容，不检查什么？</summary>
      <p>
        只针对这五条单轮记录，比对给定函数名、schema 类型和官方参数候选。不运行
        Python、工具、网络查询或模型，也不支持官方各模型 handler
        的全部解码格式。
      </p>
      <p>
        输入采用 JSON 字面量：integer 要求整数词法，5.0、5e0 和 true 不视为整数
        5。只支持安全整数、一维整数数组及 ASCII
        字符串规范化；超范围显示未判定，不冒称官方失败或通过。字符串比较忽略大小写，删除
        ASCII 空格与 ,./-_*^，单引号转双引号；数组不排序。
      </p>
      <p>
        作者：Gorilla / BFCL 团队 ·
        Apache-2.0。题目与标注分别链接到固定版本；本站检查器为独立教学实现。
      </p>
      <a :href="bfclRoot + 'LICENSE'" target="_blank" rel="noreferrer"
        >查看原许可全文 ↗</a
      >
    </details>
  </div>
</template>
