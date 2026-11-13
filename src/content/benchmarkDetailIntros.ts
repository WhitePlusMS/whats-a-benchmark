interface BenchmarkDetailIntro {
  context: string;
  accent: string;
  lead: string;
  summary: string;
}

// Editorial introductions carried over from the interactive examples.
export const benchmarkDetailIntros: Partial<
  Record<string, BenchmarkDetailIntro>
> = {
  "arc-agi-2": {
    context: "抽象推理 · 从示范迁移到新输入",
    accent: "-2",
    lead: "不给规则，只给几组前后变化。",
    summary:
      "从彩色网格中找出共同规律，再为新输入画出完整输出。尺寸和每一个格子都必须正确，才算答对。",
  },
  "human-eval": {
    context: "代码生成 · 从函数说明到正确实现",
    accent: "Eval",
    lead: "不是写出答案，而是写出能产生答案的函数。",
    summary:
      "模型收到 Python 函数签名与 docstring，补全函数体；评测端再用测试检查行为。先把真实输入放进图解里，看清代码究竟要做到什么。",
  },
  roboquest: {
    context: "具身智能 · 观察、操作与主动提交",
    accent: "Quest",
    lead: "看见插销，不等于能打开盒子。",
    summary:
      "让机器人在仿真环境中理解物体关系、规划动作并完成任务。打开木盒只是中途：还要取出目标、放好、松手，最后主动提交。",
  },
  "swe-bench-verified": {
    context: "编程与软件工程",
    accent: "Verified",
    lead: "给 AI 一个真实的软件问题，看它能否修好代码。",
    summary:
      "模型需要理解问题、修改指定版本的代码，并交付可应用的补丁。评测程序再用问题测试和回归测试检查结果。",
  },
  "terminal-bench-4": {
    context: "Agent 与工具使用",
    accent: "4.0",
    lead: "给 AI 一个终端，看它能否完成一项真实工作。",
    summary:
      "智能体需要在任务环境中使用工具、处理文件并交付结果。每道任务都有自己的验证方式，成绩反映模型与运行框架共同完成任务的表现。",
  },
};
