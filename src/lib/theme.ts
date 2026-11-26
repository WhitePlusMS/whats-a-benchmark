import { computed, ref } from "vue";

/**
 * 主题色板是全站换肤的唯一数据源：新增颜色只在这里加一行参数。
 * brand 用作亮色强调色，hover 是亮色悬停填色。文字、浅层背景及暗色按钮
 * 从这组色值由 tokens.css 派生，在两种外观下使用各自的对比度。
 */
export interface ThemePreset {
  id: string;
  name: string;
  brand: string;
  hover: string;
  darkBrand: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  // 默认与 C 方案的深蓝题卡一致，橙色对号作为固定识别点。
  {
    id: "navy",
    name: "深海蓝",
    brand: "#092d56",
    hover: "#062344",
    darkBrand: "#8cb6e2",
  },
  {
    id: "indigo",
    name: "靛蓝",
    brand: "#3b56d9",
    hover: "#3147b8",
    darkBrand: "#93a5f0",
  },
  {
    id: "violet",
    name: "鸢尾紫",
    brand: "#6957d4",
    hover: "#5845ba",
    darkBrand: "#a08ef0",
  },
  {
    id: "sea",
    name: "海盐青",
    brand: "#126b79",
    hover: "#0e5360",
    darkBrand: "#63c4d0",
  },
  {
    id: "teal",
    name: "黛绿",
    brand: "#0e8465",
    hover: "#0b6d53",
    darkBrand: "#4cc9a5",
  },
  {
    id: "olive",
    name: "橄榄绿",
    brand: "#536a2a",
    hover: "#40541e",
    darkBrand: "#a9c16e",
  },
  {
    id: "amber",
    name: "蜜橙",
    brand: "#b45309",
    hover: "#96460a",
    darkBrand: "#f09a5c",
  },
  {
    id: "garnet",
    name: "石榴红",
    brand: "#a63f36",
    hover: "#8d2f27",
    darkBrand: "#f59a8e",
  },
  {
    id: "rose",
    name: "玫红",
    brand: "#c42b6d",
    hover: "#a52259",
    darkBrand: "#f06f9f",
  },
  {
    id: "cocoa",
    name: "可可棕",
    brand: "#79543f",
    hover: "#65412f",
    darkBrand: "#d6aa8b",
  },
  {
    id: "plum",
    name: "梅子紫",
    brand: "#795173",
    hover: "#623f5d",
    darkBrand: "#d2a1ca",
  },
  {
    id: "graphite",
    name: "石墨",
    brand: "#4b5563",
    hover: "#3c4450",
    darkBrand: "#9aa5b4",
  },
];

const THEME_STORAGE_KEY = "wab-theme";
const COLOR_MODE_KEY = "wab-color-mode";
const DEFAULT_ID = THEME_PRESETS[0].id;

export type ColorMode = "system" | "light" | "dark";
const COLOR_MODE_CYCLE: ColorMode[] = ["system", "light", "dark"];
export const COLOR_MODE_LABELS: Record<ColorMode, string> = {
  system: "跟随系统",
  light: "浅色",
  dark: "深色",
};
const COLOR_MODE_ICONS: Record<ColorMode, string> = {
  system: "sunmoon",
  light: "sun",
  dark: "moon",
};

const activeId = ref(DEFAULT_ID);
const colorMode = ref<ColorMode>("system");

function writeThemeVars(preset: ThemePreset) {
  const style = document.documentElement.style;
  style.setProperty("--theme-brand", preset.brand);
  style.setProperty("--theme-brand-hover", preset.hover);
  style.setProperty("--theme-dark-brand", preset.darkBrand);
}

/** Persist as resolved variable values so the anti-flash script stays palette-agnostic. */
function persist(preset: ThemePreset) {
  try {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({
        "--theme-brand": preset.brand,
        "--theme-brand-hover": preset.hover,
        "--theme-dark-brand": preset.darkBrand,
      }),
    );
  } catch {
    // 浏览器禁止保存时仍可使用本次选择，不让外观设置中断阅读。
  }
}

function systemPrefersDark() {
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

function syncThemeColor() {
  const dark =
    colorMode.value === "dark" ||
    (colorMode.value === "system" && systemPrefersDark());
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#10131a" : "#f7f8fa");
}

function writeColorMode(mode: ColorMode) {
  colorMode.value = mode;
  if (mode === "system") {
    document.documentElement.removeAttribute("data-color-mode");
  } else {
    document.documentElement.dataset.colorMode = mode;
  }
  syncThemeColor();
  try {
    if (mode === "system") localStorage.removeItem(COLOR_MODE_KEY);
    else localStorage.setItem(COLOR_MODE_KEY, mode);
  } catch {
    // 与主题色保持一致：当前页面立即生效，存储失败不影响操作。
  }
}

/** Restore state on startup; CSS variables and the mode attribute were applied inline. */
export function initTheme() {
  // vite-ssg 在 Node 中执行 setup，没有 localStorage；变量由内联脚本兜底。
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "null");
    const match = THEME_PRESETS.find(
      (preset) => preset.brand === saved?.["--theme-brand"],
    );
    if (match) activeId.value = match.id;
    const savedMode = localStorage.getItem(COLOR_MODE_KEY);
    if (savedMode === "light" || savedMode === "dark")
      colorMode.value = savedMode;
  } catch {
    /* 损坏的存储按默认主题处理 */
  }
  syncThemeColor();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (colorMode.value === "system") syncThemeColor();
  });
}

export function useTheme() {
  return {
    presets: THEME_PRESETS,
    activeId: computed(() => activeId.value),
    colorMode: computed(() => colorMode.value),
    colorModeIcon: computed(() => COLOR_MODE_ICONS[colorMode.value]),
    colorModeLabel: computed(() => COLOR_MODE_LABELS[colorMode.value]),
    applyTheme(preset: ThemePreset) {
      writeThemeVars(preset);
      activeId.value = preset.id;
      persist(preset);
    },
    cycleColorMode() {
      const next =
        COLOR_MODE_CYCLE[
          (COLOR_MODE_CYCLE.indexOf(colorMode.value) + 1) %
            COLOR_MODE_CYCLE.length
        ];
      writeColorMode(next);
    },
  };
}
