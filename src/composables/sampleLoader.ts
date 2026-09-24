import { ref, watch } from "vue";
import type { SampleFile } from "../types/benchmark";

const sampleTypes = new Set([
  "text",
  "code",
  "choice",
  "grid",
  "image",
  "audio",
  "video",
  "record",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isAsset(value: unknown): boolean {
  if (!isRecord(value) || !hasText(value.path)) return false;
  if (value.kind === "image") return hasText(value.alt);
  if (value.kind === "audio") return true;
  if (value.kind === "file") return hasText(value.label);
  if (value.kind !== "video") return false;
  return (
    !("captions" in value) ||
    (isRecord(value.captions) &&
      hasText(value.captions.path) &&
      hasText(value.captions.language) &&
      hasText(value.captions.label))
  );
}

function isGrid(value: unknown): boolean {
  if (
    !Array.isArray(value) ||
    !value.length ||
    !value.every(
      (row: unknown) =>
        Array.isArray(row) &&
        row.length > 0 &&
        row.every((cell: unknown) => typeof cell === "number"),
    )
  )
    return false;
  return value.every((row: unknown[]) => row.length === value[0].length);
}

function isGridPair(value: unknown): boolean {
  return isRecord(value) && isGrid(value.input) && isGrid(value.output);
}

function isSample(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (
    !hasText(value.id) ||
    !hasText(value.title) ||
    typeof value.type !== "string" ||
    !sampleTypes.has(value.type) ||
    !hasText(value.prompt) ||
    !hasText(value.explanation) ||
    !(typeof value.raw === "string" || isRecord(value.raw)) ||
    !hasText(value.source) ||
    !hasText(value.license) ||
    !hasText(value.split) ||
    typeof value.excerpt !== "boolean"
  )
    return false;

  return (
    (!("answer" in value) || typeof value.answer === "string") &&
    (!("options" in value) ||
      (Array.isArray(value.options) &&
        value.options.every((option) => typeof option === "string"))) &&
    (!("assets" in value) ||
      (Array.isArray(value.assets) &&
        value.assets.length > 0 &&
        value.assets.every(isAsset))) &&
    (!("gridTask" in value) ||
      (isRecord(value.gridTask) &&
        Array.isArray(value.gridTask.train) &&
        value.gridTask.train.length > 0 &&
        value.gridTask.train.every(isGridPair) &&
        Array.isArray(value.gridTask.test) &&
        value.gridTask.test.length > 0 &&
        value.gridTask.test.every(isGridPair)))
  );
}

/** Build-time validation checks full content; runtime checks only fields consumed by the viewer. */
function readSampleFile(value: unknown, benchmarkId: string): SampleFile {
  if (
    !value ||
    typeof value !== "object" ||
    !("benchmarkId" in value) ||
    value.benchmarkId !== benchmarkId ||
    !("samples" in value) ||
    !Array.isArray(value.samples) ||
    !value.samples.length ||
    !value.samples.every(isSample)
  )
    throw new Error("Invalid sample file");
  return value as SampleFile;
}

/** 调用者提供挂载门控，使静态生成阶段只渲染加载状态，不发起浏览器请求。 */
export function useSampleLoader(
  getBenchmarkId: () => string,
  canLoad: () => boolean,
  baseUrl: string,
) {
  const data = ref<SampleFile | null>(null);
  const error = ref(false);
  const retry = ref(0);

  watch(
    [getBenchmarkId, canLoad, retry],
    async ([benchmarkId, enabled], _, onCleanup) => {
      data.value = null;
      error.value = false;
      if (!enabled) return;
      // watcher 失效（切换、重试或卸载）时立即取消；即使 fetch 忽略取消也不接受旧结果。
      const controller = new AbortController();
      onCleanup(() => controller.abort());
      try {
        const response = await fetch(`${baseUrl}samples/${benchmarkId}.json`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Sample HTTP ${response.status}`);
        const result = readSampleFile(await response.json(), benchmarkId);
        if (!controller.signal.aborted) data.value = result;
      } catch (cause) {
        if (!controller.signal.aborted) {
          error.value = true;
          console.error("[samples] Unable to load the selected task.", cause);
        }
      }
    },
    { immediate: true },
  );

  function reload() {
    retry.value++;
  }
  return { data, error, reload };
}
