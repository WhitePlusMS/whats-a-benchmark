<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Icon from "../components/Icon.vue";
useHead({ title: "阅读指南 · what's a benchmark?" });
const lessons = [
  {
    title: "评测与排行榜",
    summary: "Benchmark 是任务与评分方法；排行榜是这些规则下的结果。",
    body: "理解分数需要先了解任务。写一个 Python 函数、修复一个仓库问题和制作一份财务表格，是三种不同任务。评测结果应结合具体任务解读。",
    link: "/benchmarks/swe-bench-verified/",
    label: "SWE-bench Verified 的评测任务",
  },
  {
    title: "评分指标与比较范围",
    summary: "正确率、成功率、rubric 分数和对战评级，刻度不同。",
    body: "正确率表示指定问题答对的比例；任务成功率通常表示完成目标的比例；rubric 按情景标准给分；Elo 类评级来自相对比较。它们既不能直接相加，也不适合混成一张没有说明的雷达图。",
    link: "/benchmarks/gdpval-aa/",
    label: "GDPval-AA 的评分方法",
  },
  {
    title: "pass@k 与 pass^k",
    summary: "k 是机会数量，pass@1 与 pass@10 不能直接比较。",
    body: "HumanEval 的 pass@k 估计多次候选中至少一个正确解的概率。τ-bench 中的 pass^k 则强调连续 k 次都成功的可靠性。只看见一个“pass”而忽略符号，很容易把两种相反的要求读混。",
    link: "/benchmarks/tau-bench/",
    label: "τ-bench 的可靠性指标",
  },
  {
    title: "评测条件与运行配置",
    summary: "工具、预算、次数、代理框架与题目子集，都会影响结果。",
    body: "允许上网、运行代码或多轮修改时，系统能调用额外能力。读报告时一起看模型具体版本、题库范围、工具权限、推理预算和评分方式。对于 Agent，模型与执行框架共同决定表现。",
    link: "/benchmarks/terminal-bench-2/",
    label: "Terminal-Bench 的评测任务",
  },
  {
    title: "数据污染与评测饱和",
    summary: "题库污染与能力饱和，是两种需要分别考虑的现象。",
    body: "题目进入训练数据可能改变测试的独立性；许多模型都接近满分时，题库也会失去区分度。因此，有的评测更新题目或使用私有留出集，有的按题目发布时间划分。但“新”也不自动等于更适合你的任务。",
    link: "/benchmarks/livecodebench/",
    label: "LiveCodeBench 的数据更新方式",
  },
  {
    title: "评测与实际需求的相关性",
    summary: "先看任务是否相关，再决定这个指标值不值得关心。",
    body: "选择编程助手时，可以关注仓库修复或代码编辑任务；处理长文档时，需要关注长度、检索与推理要求；评估办公自动化能力时，可以查看真实交付物。任务与使用场景越相关，评测结果越有参考价值。",
    link: "/benchmarks/gdpval/",
    label: "GDPval 的职业任务与交付物",
  },
];
</script>
<template>
  <div class="container reading-page guide-page">
    <h1>阅读指南</h1>
    <p class="page-lead">
      了解评分指标、评测条件与数据限制，判断模型成绩的含义和适用范围。
    </p>
    <article v-for="(lesson, i) in lessons" :key="lesson.title" class="lesson">
      <span class="lesson-number">{{ String(i + 1).padStart(2, "0") }}</span>
      <div>
        <h2>{{ lesson.title }}</h2>
        <h3>{{ lesson.summary }}</h3>
        <p>{{ lesson.body }}</p>
        <RouterLink :to="lesson.link" class="text-link"
          >{{ lesson.label }}<Icon name="arrow" :size="17"
        /></RouterLink>
      </div>
    </article>
    <p class="muted">
      参考资料：<a
        href="https://github.com/openai/human-eval"
        target="_blank"
        rel="noreferrer"
        >HumanEval</a
      >、<a
        href="https://github.com/sierra-research/tau-bench"
        target="_blank"
        rel="noreferrer"
        >τ-bench</a
      >、<a
        href="https://www.anthropic.com/engineering/swe-bench-sonnet"
        target="_blank"
        rel="noreferrer"
        >SWE-bench 运行说明</a
      >。中文说明为本站整理。
    </p>
  </div>
</template>
