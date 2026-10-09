<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Icon from "../components/Icon.vue";
import { categoryById } from "../content/catalog";
useHead({ title: "阅读指南 · what's a benchmark?" });
// 直接进入现有目录分类，不创建第二套筛选状态或模型推荐规则。
const tasks = [
  {
    title: "修复真实代码项目",
    category: "coding",
    detail: "关注仓库修复与测试验证，并核对代理框架。",
  },
  {
    title: "制作报告、表格与办公成果",
    category: "work",
    detail: "关注交付物及验收标准，而不只看问答正确率。",
  },
  {
    title: "操作电脑与通用工具",
    category: "agents",
    detail: "关注动作、工具权限、最终状态与长程执行。",
  },
  {
    title: "阅读和分析长文档",
    category: "context",
    detail: "关注文档长度、输入方式与跨文档推理。",
  },
  {
    title: "创作故事、脚本与设计作品",
    category: "writing",
    detail: "关注作品要求、评审维度与审美偏好。",
  },
  {
    title: "理解跨能力评测与综合指数",
    category: "general",
    detail: "先展开分项，再核对版本、权重与汇总规则。",
  },
];
const lessons = [
  {
    id: "benchmark",
    title: "评测与排行榜",
    summary: "Benchmark 是任务与评分方法；排行榜是这些规则下的结果。",
    body: "理解分数需要先了解任务。写一个 Python 函数、修复一个仓库问题和制作一份财务表格，是三种不同任务。评测结果应结合具体任务解读。",
    link: "/benchmarks/swe-bench-verified/#task",
    label: "SWE-bench Verified 的评测任务",
  },
  {
    id: "metrics",
    title: "评分指标与比较范围",
    summary: "正确率、成功率、rubric 分数和对战评级，刻度不同。",
    body: "正确率表示指定问题答对的比例；任务成功率通常表示完成目标的比例；rubric 按情景标准给分；Elo 类评级来自相对比较。它们既不能直接相加，也不适合混成一张没有说明的雷达图。",
    link: "/benchmarks/gdpval-aa/#score",
    label: "GDPval-AA 的评分方法",
  },
  {
    id: "pass-k",
    title: "pass@k 与 pass^k",
    summary: "k 是机会数量，pass@1 与 pass@10 不能直接比较。",
    body: "HumanEval 的 pass@k 估计多次候选中至少一个正确解的概率。τ-bench 中的 pass^k 则强调连续 k 次都成功的可靠性。只看见一个“pass”而忽略符号，很容易把两种相反的要求读混。",
    link: "/benchmarks/tau-bench/#score",
    label: "τ-bench 的可靠性指标",
  },
  {
    id: "conditions",
    title: "评测条件与运行配置",
    summary: "工具、预算、次数、代理框架与题目子集，都会影响结果。",
    body: "允许上网、运行代码或多轮修改时，系统能调用额外能力。读报告时一起看模型具体版本、题库范围、工具权限、推理预算和评分方式。对于 Agent，模型与执行框架共同决定表现。",
    link: "/benchmarks/terminal-bench-2/#task",
    label: "Terminal-Bench 的评测任务",
  },
  {
    id: "contamination",
    title: "数据污染与评测饱和",
    summary: "题库污染与能力饱和，是两种需要分别考虑的现象。",
    body: "题目进入训练数据可能改变测试的独立性；许多模型都接近满分时，题库也会失去区分度。因此，有的评测更新题目或使用私有留出集，有的按题目发布时间划分。但“新”也不自动等于更适合你的任务。",
    link: "/benchmarks/livecodebench/#data",
    label: "LiveCodeBench 的数据更新方式",
  },
  {
    id: "relevance",
    title: "评测与实际需求的相关性",
    summary: "先看任务是否相关，再决定这个指标值不值得关心。",
    body: "选择编程助手时，可以关注仓库修复或代码编辑任务；处理长文档时，需要关注长度、检索与推理要求；评估办公自动化能力时，可以查看真实交付物。任务与使用场景越相关，评测结果越有参考价值。",
    link: "/benchmarks/gdpval/#task",
    label: "GDPval 的职业任务与交付物",
  },
  {
    id: "indices",
    title: "综合分接近，不代表每项能力接近",
    summary: "看到“总分只差一分”，先展开组成项和权重。",
    body: "综合指数会平均不同任务的表现。先查看与你的工作相关的分项，再核对指数版本；如果组成项或权重改变，同一模型的总分也可能变化。不要直接相加 Elo 和正确率，必须遵循指数的换算规则。",
    link: "/benchmarks/aa-intelligence-index/#composition",
    label: "展开 AA 智能指数的组成",
  },
  {
    id: "judges",
    title: "真人偏好与任务完成是不同证据",
    summary: "看到“真人盲测领先”，先问投票者在判断什么。",
    body: "读起来舒服的回答可以赢得偏好，但投票未必验证了事实或运行了代码。看对话体验可以参考偏好评测；要判断工作是否做完，还应看任务产物和验收规则。模型裁判也应注明所用版本与评分方式。",
    link: "/benchmarks/arena/#score",
    label: "查看 Arena 的评分者与边界",
  },
  {
    id: "uncertainty",
    title: "小幅领先要结合不确定性",
    summary: "看到“领先 0.5 分”，不要仅凭小数位判断强弱。",
    body: "核对样本量、重复次数、置信区间和运行条件。Arena 的 raw rank 与 rank spread 分别呈现名次估计和排名范围；终端评测还会受到资源配置影响。差异是否可靠需要相应统计证据，不能只看名次。",
    link: "/benchmarks/terminal-bench-4/#task",
    label: "核对终端评测的运行条件",
  },
  {
    id: "cost",
    title: "单次调用价格与完成任务成本",
    summary: "看到“更便宜”，先核对费用覆盖了哪些步骤。",
    body: "整项任务可能包含多轮调用、失败重试、工具、文档预处理及评分。比如 GDP.pdf 的 AA 费用不含裁判和 OCR，不能当作完整业务流程成本。先比较相同口径，再结合成功率与实际等待时间。",
    link: "/benchmarks/gdp-pdf/#score",
    label: "查看 GDP.pdf 的实施差异",
  },
  {
    id: "families",
    title: "名称相近，先核对评测本体",
    summary: "LiveBench 与 LiveCodeBench 是不同评测，机构复测也需要注明条件。",
    body: "LiveBench 是跨能力评测体系，LiveCodeBench 侧重竞赛编程。查到相近名称时，先看发布者和任务定义；同一题集由不同机构运行时，再看执行框架、预算和评分协议，不把每份结果都当作新的题库。",
    link: "/benchmarks/livebench/#task",
    label: "查看 LiveBench 的任务范围",
  },
  {
    id: "creation",
    title: "创作与设计要看作品怎样被评审",
    summary: "写作质量、约束完成与真人审美偏好，需要分别理解。",
    body: "Creative Writing v3 同时采用评分细则和作品两两比较，分数应结合具体维度阅读。长篇故事生成关注叙事和作品完整性，长文档问答关注检索与推理；不能仅凭输入输出很长就把它们归为同一种能力。",
    link: "/benchmarks/creative-writing-v3/#score",
    label: "查看创意写作的评分方法",
  },
];
</script>
<template>
  <div class="container reading-page guide-page">
    <h1>阅读指南</h1>
    <p class="page-lead">
      了解评分指标、评测条件与数据限制，判断模型成绩的含义和适用范围。
    </p>
    <section
      id="tasks"
      class="task-entry-section"
      aria-labelledby="tasks-title"
    >
      <h2 id="tasks-title">按我要做的事找评测</h2>
      <p class="muted">
        先找到相关任务，再阅读它的评分与限制。这些入口不构成模型推荐。
      </p>
      <div class="task-entry-grid">
        <RouterLink
          v-for="task in tasks"
          :key="task.category"
          :to="{ path: '/', query: { category: task.category } }"
        >
          <h3>{{ task.title }}</h3>
          <p>{{ task.detail }}</p>
          <span class="text-link"
            >{{ categoryById.get(task.category)?.name }}
            <Icon name="arrow" :size="16"
          /></span>
        </RouterLink>
      </div>
    </section>
    <nav class="reading-index" aria-label="指南目录">
      <a v-for="lesson in lessons" :key="lesson.id" :href="`#${lesson.id}`">{{
        lesson.title
      }}</a>
    </nav>
    <article
      v-for="(lesson, i) in lessons"
      :id="lesson.id"
      :key="lesson.id"
      class="lesson"
    >
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
      >、<a
        href="https://artificialanalysis.ai/methodology/intelligence-benchmarking"
        target="_blank"
        rel="noreferrer"
        >AA 方法与版本历史</a
      >
      、<a
        href="https://arena.ai/blog/ranking-method"
        target="_blank"
        rel="noreferrer"
        >Arena 排名方法</a
      >
      、<a
        href="https://www.anthropic.com/engineering/infrastructure-noise"
        target="_blank"
        rel="noreferrer"
        >运行环境与评测波动</a
      >、<a
        href="https://livebench.ai/"
        target="_blank"
        rel="noreferrer"
        >LiveBench 官方资料</a
      >、<a
        href="https://github.com/EQ-bench/creative-writing-bench"
        target="_blank"
        rel="noreferrer"
        >Creative Writing v3 官方方法</a
      >。中文说明为本站整理，案例不表示本站运行过相关评测。
    </p>
  </div>
</template>
