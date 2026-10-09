import { computed, ref } from "vue";

/**
 * 主题色板是全站换肤的唯一数据源：新增颜色只在这里加一行参数。
 * brand 用于亮色的填充与文字（白字/白底对比度均需过 AA），hover 是亮色
 * 悬停加深，darkBrand 是暗色下的文字与焦点色（按钮底色由 tokens.css 派生）。
 */
export interface ThemePreset {
  id: string;
  name: string;
  brand: string;
  hover: string;
  darkBrand: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: "violet", name: "鸢尾紫", brand: "#6957d4", hover: "#5845ba", darkBrand: "#a08ef0" },
  { id: "indigo", name: "靛蓝", brand: "#3b56d9", hover: "#3147b8", darkBrand: "#93a5f0" },
  { id: "teal", name: "黛绿", brand: "#0e8465", hover: "#0b6d53", darkBrand: "#4cc9a5" },
  { id: "amber", name: "蜜橙", brand: "#b45309", hover: "#96460a", darkBrand: "#f09a5c" },
  { id: "rose", name: "玫红", brand: "#c42b6d", hover: "#a52259", darkBrand: "#f06f9f" },
  { id: "graphite", name: "石墨", brand: "#4b5563", hover: "#3c4450", darkBrand: "#9aa5b4" },
];

const THEME_STORAGE_KEY = "wab-theme";
const DEFAULT_ID = THEME_PRESETS[0].id;

const activeId = ref(DEFAULT_ID);

function writeThemeVars(preset: ThemePreset) {
  const style = document.documentElement.style;
  style.setProperty("--theme-brand", preset.brand);
  style.setProperty("--theme-brand-hover", preset.hover);
  style.setProperty("--theme-dark-brand", preset.darkBrand);
}

/** Persist as resolved variable values so the anti-flash script stays palette-agnostic. */
function persist(preset: ThemePreset) {
  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify({
      "--theme-brand": preset.brand,
      "--theme-brand-hover": preset.hover,
      "--theme-dark-brand": preset.darkBrand,
    }),
  );
}

/** Restore the selected id on startup; CSS variables were already applied inline. */
export function initTheme() {
  // vite-ssg 在 Node 中执行 setup，没有 localStorage；变量由内联脚本兜底。
  if (typeof localStorage === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "null");
    const match = THEME_PRESETS.find(
      (preset) => preset.brand === saved?.["--theme-brand"],
    );
    if (match) activeId.value = match.id;
  } catch {
    /* 损坏的存储按默认主题处理 */
  }
}

export function useTheme() {
  return {
    presets: THEME_PRESETS,
    activeId: computed(() => activeId.value),
    applyTheme(preset: ThemePreset) {
      writeThemeVars(preset);
      persist(preset);
      activeId.value = preset.id;
    },
  };
}
