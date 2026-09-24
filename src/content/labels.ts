export const researchStatusLabels = {
  pass: "已完整核验",
  "pass-with-limitations": "已核验，有边界",
  partial: "部分核验",
  blocked: "核验受阻",
} as const;

export const sampleAccessLabels = {
  local: "站内真实样例",
  official: "官方入口查看",
  gated: "申请后查看",
  restricted: "原题限制公开",
  private: "题目未公开",
  "license-pending": "许可待核实",
  unverified: "样例尚未核实",
} as const;

export const dataAccessLabels = {
  public: "公开访问",
  gated: "受控访问",
  partial: "部分公开",
  private: "未公开",
  blocked: "当前无法访问",
  unknown: "尚未核实",
} as const;

export const reusePolicyLabels = {
  permitted: "可按许可使用",
  restricted: "使用范围受限",
  prohibited: "不可在本站转载",
  unknown: "许可范围未确认",
} as const;

export const disclosureLabels = {
  complete: "结构已公开",
  partial: "结构部分公开",
  "not-public": "结构未公开",
  unknown: "结构尚未核实",
} as const;

export const sourceRoleLabels = {
  definition: "官方定义",
  readme: "README",
  paper: "论文",
  code: "代码",
  data: "数据",
  access: "访问与许可",
  leaderboard: "排行榜",
  release: "评测发布说明",
  "vendor-report": "模型发布引用",
} as const;
