export type WalkthroughStep = "input" | "task" | "output" | "verify";

interface StepVisual {
  left: string;
  leftLabel: string;
  leftIcon: string;
  right: string;
  rightLabel: string;
  rightIcon: string;
}

interface StepDetail {
  title: string;
  description: string;
  note: string;
  visual: StepVisual;
}

export interface TerminalBenchCase {
  sampleId: string;
  kind: "layout" | "cad" | "coq" | "anonymization";
  label: string;
  title: string;
  disclaimer: string;
  verificationUrl?: string;
  steps: Record<WalkthroughStep, StepDetail>;
}

// 任务说明与验证代码均固定到 Terminal-Bench v4.0.0 对应的提交。
const taskRoot =
  "https://raw.githubusercontent.com/harbor-framework/terminal-bench/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks";

export const terminalBenchCases: readonly TerminalBenchCase[] = [
  {
    sampleId: "official-case-terminal-bench-4-layout-config-recreation2",
    kind: "layout",
    label: "图稿还原",
    title: "把一张图稿还原成可编辑的布局",
    disclaimer: "页面图形为任务示意，原题图像及素材未在本站展示。",
    steps: {
      input: {
        title: "先拿到一张图稿和配套素材",
        description:
          "题目提供一张由图片元素组成的图稿，以及这些元素的素材文件。智能体需要利用这些材料重建布局。",
        note: "输入包含 layout.png 和 components 文件夹。",
        visual: {
          left: "layout.png",
          leftLabel: "图稿",
          leftIcon: "image",
          right: "components/",
          rightLabel: "素材",
          rightIcon: "files",
        },
      },
      task: {
        title: "拆解图稿里的元素和层级",
        description:
          "识别图像与文字元素，确定它们的顺序、位置、尺寸和样式，使布局可以重新组合和编辑。",
        note: "这是对任务要求的解释，不是模型执行过程的录像。",
        visual: {
          left: "IMAGE",
          leftLabel: "图像元素",
          leftIcon: "image",
          right: "TEXT",
          rightLabel: "文字元素",
          rightIcon: "files",
        },
      },
      output: {
        title: "写出可编辑的布局配置",
        description:
          "按题目要求生成 config.json，记录组件列表和画布样式；组件按从底层到顶层的顺序排列。",
        note: "图中的代码只示意结构，完整字段和约束见原题。",
        visual: {
          left: "components",
          leftLabel: "元素列表",
          leftIcon: "files",
          right: "config.json",
          rightLabel: "布局配置",
          rightIcon: "code",
        },
      },
      verify: {
        title: "重新渲染，再与原图比较",
        description:
          "题目要求使用提供的渲染程序和素材，将配置还原成图像，并与原图达到至少 98% 的像素一致率。",
        note: "98% 是这道题的要求，不是模型成绩或所有任务的统一标准。",
        visual: {
          left: "原图",
          leftLabel: "输入",
          leftIcon: "image",
          right: "≥ 98%",
          rightLabel: "像素一致率",
          rightIcon: "check",
        },
      },
    },
  },
  {
    sampleId: "official-task-terminal-bench-4-cad-model",
    kind: "cad",
    label: "CAD 建模",
    title: "根据二维工程图生成三维模型",
    disclaimer: "图形为任务示意，本站未展示原题图纸或模型。",
    verificationUrl: `${taskRoot}/cad-model/tests/test_outputs.py`,
    steps: {
      input: {
        title: "先拿到二维工程图",
        description: "任务提供 schematic.png，图中描述了需要建模的物体。",
        note: "本站保留原题指令，但没有镜像这张工程图。",
        visual: {
          left: "schematic.png",
          leftLabel: "题目文件",
          leftIcon: "image",
          right: "二维工程图",
          rightLabel: "建模依据",
          rightIcon: "files",
        },
      },
      task: {
        title: "还原工程图描述的物体",
        description: "根据二维工程图表达的结构和尺寸，建立对应的三维几何模型。",
        note: "这是对任务目标的说明，不代表实际模型操作过程。",
        visual: {
          left: "二维图",
          leftLabel: "结构与尺寸",
          leftIcon: "image",
          right: "三维几何",
          rightLabel: "建模目标",
          rightIcon: "workflow",
        },
      },
      output: {
        title: "交付 STEP 文件",
        description:
          "按照原题要求，将描述该物体的 STEP 文件写到 /app/out.step。",
        note: "本站没有展示或运行该任务的参考模型。",
        visual: {
          left: "三维模型",
          leftLabel: "建模成果",
          leftIcon: "workflow",
          right: "out.step",
          rightLabel: "交付文件",
          rightIcon: "files",
        },
      },
      verify: {
        title: "检查文件和几何属性",
        description:
          "官方验证程序会加载 STEP 文件，检查网格是否闭合，并比较体积、表面积和惯性等几何属性。",
        note: "这些检查来自该任务的固定版本验证代码。",
        visual: {
          left: "out.step",
          leftLabel: "交付文件",
          leftIcon: "files",
          right: "几何校验",
          rightLabel: "闭合与属性",
          rightIcon: "check",
        },
      },
    },
  },
  {
    sampleId: "official-task-terminal-bench-4-coq-block-bound",
    kind: "coq",
    label: "形式化证明",
    title: "在 Coq 项目中完成一个定理证明",
    disclaimer: "图形为任务示意，本站未展示完整项目或编写证明。",
    verificationUrl: `${taskRoot}/coq-block-bound/tests/test_state.py`,
    steps: {
      input: {
        title: "先拿到已有的 Coq 项目",
        description:
          "Main.v 中包含已有类型、函数和一个尚未完成证明的 target_theorem。",
        note: "原题描述了文件内容；完整项目定义未在本站展示。",
        visual: {
          left: "Main.v",
          leftLabel: "已有文件",
          leftIcon: "files",
          right: "target_theorem",
          rightLabel: "待证定理",
          rightIcon: "code",
        },
      },
      task: {
        title: "在约束下完成证明",
        description:
          "证明 target_theorem，可以添加辅助定义和引理，但不能修改题目列出的类型签名。",
        note: "原题禁止用 Admitted、Axiom 等方式绕过证明。",
        visual: {
          left: "已有定义",
          leftLabel: "保持签名",
          leftIcon: "files",
          right: "证明与引理",
          rightLabel: "任务目标",
          rightIcon: "code",
        },
      },
      output: {
        title: "交付完整的证明文件",
        description: "在 Main.v 中完成目标证明；按需添加辅助定义和 .v 文件。",
        note: "页面没有伪造证明代码或模型运行结果。",
        visual: {
          left: "证明代码",
          leftLabel: "完成定理",
          leftIcon: "code",
          right: "Main.v",
          rightLabel: "项目文件",
          rightIcon: "files",
        },
      },
      verify: {
        title: "编译并检查证明约束",
        description:
          "验证程序运行 coqc 编译，并检查原有类型签名、证明依赖和禁止使用的声明。",
        note: "原题要求 coqc -Q . Top Main.v 成功退出。",
        visual: {
          left: "coqc",
          leftLabel: "编译项目",
          leftIcon: "code",
          right: "证明检查",
          rightLabel: "签名与依赖",
          rightIcon: "check",
        },
      },
    },
  },
  {
    sampleId: "official-task-terminal-bench-4-data-anonymization",
    kind: "anonymization",
    label: "数据匿名化",
    title: "为关联的 CSV 文件编写匿名化工具",
    disclaimer: "图形为任务示意，原始 CSV 和策略文件未在本站展示。",
    verificationUrl: `${taskRoot}/data-anonymization/tests/test_outputs.py`,
    steps: {
      input: {
        title: "先拿到关联数据和处理策略",
        description:
          "任务提供 input 目录中的关联 CSV 文件，以及 policy.yaml 中的匿名化规则。",
        note: "本站保留原题指令，没有镜像原始数据和策略文件。",
        visual: {
          left: "input/*.csv",
          leftLabel: "关联数据",
          leftIcon: "files",
          right: "policy.yaml",
          rightLabel: "处理规则",
          rightIcon: "code",
        },
      },
      task: {
        title: "按规则处理数据并保持关联",
        description:
          "对指定字段做匿名化，同时确保同一个实体在不同文件和相关记录中使用一致的标识。",
        note: "图形只解释任务关系，不包含真实个人数据。",
        visual: {
          left: "策略规则",
          leftLabel: "字段转换",
          leftIcon: "code",
          right: "实体关联",
          rightLabel: "跨文件一致",
          rightIcon: "workflow",
        },
      },
      output: {
        title: "交付命令行工具和输出文件",
        description:
          "编写 /app/anon.py，读取输入目录和策略，并将处理后的 CSV 写入指定输出目录。",
        note: "输出需保留文件名、表头、列序、行序和行数。",
        visual: {
          left: "anon.py",
          leftLabel: "命令行工具",
          leftIcon: "code",
          right: "output/*.csv",
          rightLabel: "匿名化结果",
          rightIcon: "files",
        },
      },
      verify: {
        title: "检查规则、一致性和资源限制",
        description:
          "验证程序检查字段处理、跨文件关联和输出行数，并测试同一种子的结果可重复、不同种子会改变依赖种子的转换结果，以及内存上限。",
        note: "原题指定 --max-memory 64MB；具体检查见固定版本验证代码。",
        visual: {
          left: "处理结果",
          leftLabel: "规则与关联",
          leftIcon: "files",
          right: "64 MB",
          rightLabel: "内存上限",
          rightIcon: "check",
        },
      },
    },
  },
];

/** 空查询使用首题；未知的样例 ID 不冒充成已整理的图解。 */
export function findTerminalBenchCase(
  sampleId: unknown,
): TerminalBenchCase | undefined {
  if (typeof sampleId !== "string" || !sampleId) return terminalBenchCases[0];
  return terminalBenchCases.find((item) => item.sampleId === sampleId);
}
