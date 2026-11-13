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
