<script setup lang="ts">
import { computed, ref } from "vue";
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { byId } from "../content/catalog";
import Icon from "../components/Icon.vue";
import SampleViewer from "../components/SampleViewer.vue";

useHead({ title: "用真实案例看懂 Benchmark · what's a benchmark?" });

// 只选择已收录的评测；题面、答案、原始记录与许可仍由原查看器按需加载。
// 这里解释各类任务的共同规则，切换集合中的案例不会把首题误当成整个评测。
const examples = {
  choice: {
    benchmarkId: "cmmlu",
    label: "答一道题",
    icon: "book",
    title: "选择题：选对答案，才算答对",
    summary:
      "CMMLU 用中文多项选择题考察不同学科的知识与推理。可以先选一个选项，再点击「查看参考答案」。",
    input: "中文题目和 A–D 四个选项。这里展示官方 dev 划分中的真实记录。",
    output: "选出一个答案；数据中的 Answer 字段保存官方答案。",
    scoring:
      "按答案是否正确计分，再按官方口径汇总各学科表现。zero-shot 与 five-shot 的提示条件不同。",
    boundary:
      "一道农学题只能展示一种题型；整个 CMMLU 覆盖 67 个主题，也不能由选择题成绩直接推断实际工作表现。",
    source: "https://github.com/haonan-li/CMMLU",
  },
  code: {
    benchmarkId: "human-eval",
    label: "写一段代码",
    icon: "code",
    title: "代码题：让程序通过测试",
    summary:
      "HumanEval 给出 Python 函数签名与说明，要求补全实现。它用程序的实际行为检验功能正确性。",
    input:
      "函数签名、docstring 和题内示例。题内示例与评测用的测试代码各有作用。",
    output: "补全函数实现。参考解只是一个实现，其他通过测试的实现也可能正确。",
    scoring:
      "运行生成的代码，检查是否通过该题测试；pass@k 估计每题 k 个候选中至少一个通过的表现，再跨题汇总。",
    boundary:
      "它考察限定的函数级编程任务。通过这些测试，不能直接说明能维护大型仓库；还要核对 k、采样和运行条件。",
    source: "https://github.com/openai/human-eval",
  },
  tools: {
    benchmarkId: "tau-bench",
    label: "完成一次操作",
    icon: "workflow",
    title: "工具任务：把事情真正办完",
    summary:
      "τ-bench 让代理在模拟客服环境里与用户交互，并按业务政策调用工具。这里使用已收录的原版 retail 任务。",
    input:
      "原记录的 instruction 是模拟用户的身份与诉求设定；代理通过对话了解需求，并获得业务政策和可用工具。",
    output:
      "完成任务所需的对话和工具操作。取消、换货等操作需要反映在环境状态里。",
    scoring:
      "核对任务结束时的数据库状态与必要回复信息。pass^k 衡量同一任务的 k 次独立运行都成功的可靠性。",
    boundary:
      "本页没有运行代理，也没有真实操作订单。原版任务与后续版本要分开看，模拟客服的表现不能直接等同于生产业务效果。",
    source: "https://github.com/sierra-research/tau-bench",
  },
} as const;
const activeKey = ref<keyof typeof examples>("choice");
const active = computed(() => examples[activeKey.value]);
const item = computed(() => byId.get(active.value.benchmarkId));
const route = useRoute();
let waitingForInitialSample = true;
// 首次加载会改变案例区域高度；详情页的评分深链接在最终布局中定位一次。
// 此后换题不再滚动，避免打断阅读；查看器在 DOM 更新后才发出 settled。
function alignInitialScoreAnchor() {
  if (!waitingForInitialSample) return;
  waitingForInitialSample = false;
  if (route.hash === "#metrics")
    document.getElementById("metrics")?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
}
</script>

<template>
  <div class="container reading-page guide-page">
    <header class="guide-intro">
      <p class="guide-label">评测入门</p>
      <h1><span>用真实案例</span><span>看懂 Benchmark</span></h1>
      <p class="guide-lead">先看模型要做什么、怎样才算完成，再理解那个分数。</p>
    </header>

    <section class="guide-definition" aria-labelledby="definition-title">
      <h2 id="definition-title">Benchmark 是什么？</h2>
      <p>
        用一组任务和约定的测试、评分规则，衡量模型或系统在特定范围内的表现。
      </p>
      <div
        class="guide-equation"
        aria-label="任务、测试条件与评分方法共同定义一项评测"
      >
        <strong>任务</strong><span aria-hidden="true">+</span>
        <strong>测试条件</strong><span aria-hidden="true">+</span>
        <strong>评分方法</strong>
      </div>
    </section>

    <section
      id="samples"
      class="guide-examples"
      aria-labelledby="examples-title"
    >
      <div class="guide-section-heading">
        <h2 id="examples-title">看三种真实任务</h2>
        <a href="#metrics" class="text-link"
          >分数怎么读 <Icon name="down" :size="15"
        /></a>
      </div>
      <div class="guide-task-switch" role="group" aria-label="选择任务类型">
        <button
          v-for="(example, key) in examples"
          :key="key"
          type="button"
          :class="{ active: activeKey === key }"
          :aria-pressed="activeKey === key"
          aria-controls="guide-example"
          @click="activeKey = key"
        >
          <Icon :name="example.icon" :size="18" />{{ example.label }}
        </button>
      </div>

      <div id="guide-example" :key="activeKey" class="guide-example">
        <div class="guide-example-heading">
          <h3>{{ active.title }}</h3>
          <RouterLink
            :to="`/benchmarks/${active.benchmarkId}/`"
            class="text-link"
          >
            {{ item?.name }} 详情 <Icon name="up" :size="15" />
          </RouterLink>
        </div>
        <p class="guide-example-summary">{{ active.summary }}</p>
        <SampleViewer
          v-if="item"
          :item="item"
          @settled="alignInitialScoreAnchor"
        />

        <dl class="guide-reading-keys">
          <div>
            <dt>给它什么</dt>
            <dd>{{ active.input }}</dd>
          </div>
          <div>
            <dt>要它做什么</dt>
            <dd>{{ active.output }}</dd>
          </div>
          <div>
            <dt>怎么判分</dt>
            <dd>{{ active.scoring }}</dd>
          </div>
          <div>
            <dt>能说明什么</dt>
            <dd>{{ active.boundary }}</dd>
          </div>
        </dl>
        <div class="guide-example-footnote">
          <p>
            原题与原始记录来自官方；中文说明为本站整理。这里用于阅读案例，未执行评测。
          </p>
          <a
            :href="active.source"
            target="_blank"
            rel="noreferrer"
            class="text-link"
          >
            官方方法说明 <Icon name="up" :size="15" />
          </a>
        </div>
      </div>
    </section>

    <!-- 详情页的评分入口直接到这里；保留有实际内容的 metrics 锚点。 -->
    <section id="metrics" class="guide-scores" aria-labelledby="metrics-title">
      <h2 id="metrics-title">一条案例，怎么变成一个分数？</h2>
      <ol class="guide-score-steps">
        <li>
          <h3>先认识任务</h3>
          <p>
            案例帮你理解输入、目标与难点。看懂一道题，还需要继续了解整个评测覆盖了哪些任务。
          </p>
        </li>
        <li>
          <h3>按规则运行与判分</h3>
          <p>
            在指定题集、模型版本、工具和预算下运行，再按对应规则判断答案或任务结果。
          </p>
        </li>
        <li>
          <h3>按口径汇总结果</h3>
          <p>
            准确率、pass@k、任务成功率各有定义。综合指数还需要展开组成项与权重。
          </p>
        </li>
      </ol>
      <p class="guide-score-takeaway">
        比较两个分数前，先对齐评测版本、题目范围和运行条件。分数反映的是这些条件下的表现。
      </p>
    </section>

    <section class="guide-next" aria-labelledby="next-title">
      <div>
        <h2 id="next-title">带着这四个问题，去看具体评测</h2>
        <p>
          看输入、看目标、看判分、看边界。详情页还能继续查看数据、案例和官方资料。
        </p>
      </div>
      <RouterLink to="/" class="primary-button"
        >浏览评测目录 <Icon name="up" :size="17"
      /></RouterLink>
    </section>
  </div>
</template>

<style scoped src="../styles/guide.css"></style>
