import type { TaskSample } from "../types/benchmark";

/** 选择器保留序号和可读的短题名，正文始终展示完整标题。 */
export function samplePickerLabel(
  sample: Pick<TaskSample, "title" | "shortTitle">,
) {
  let width = 0;
  let label = "";
  for (const character of sample.shortTitle ?? sample.title) {
    width += /[^\x00-\xff]/u.test(character) ? 2 : 1;
    if (width > 20) return label.trimEnd() + "…";
    label += character;
  }
  return label;
}
