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
  "terminal-bench-4": {
    context: "Agent 与工具使用",
    accent: "4.0",
    lead: "给 AI 一个终端，看它能否完成一项真实工作。",
    summary:
      "智能体需要在任务环境中使用工具、处理文件并交付结果。每道任务都有自己的验证方式，成绩反映模型与运行框架共同完成任务的表现。",
  },
};
