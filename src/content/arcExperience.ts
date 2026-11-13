export const arcCases = [
  { sampleId: "6e19193c", label: "10 × 10", caption: "同尺寸网格" },
  { sampleId: "00576224", label: "2 × 2 → 6 × 6", caption: "输出尺寸变化" },
  { sampleId: "007bbfb7", label: "3 × 3 → 9 × 9", caption: "五组示范" },
  { sampleId: "009d5c81", label: "14 × 14", caption: "多色网格" },
] as const;

/** Missing query means the first case, never silently substitute an unknown ID. */
export function findArcCase(sampleId: unknown) {
  if (sampleId === undefined || sampleId === null || sampleId === "")
    return arcCases[0];
  return arcCases.find((item) => item.sampleId === sampleId);
}
export function isUnknownArcSample(
  benchmarkId: string,
  sampleId: unknown,
  samples?: readonly { id: string }[],
  routePath = `/benchmarks/${benchmarkId}/`,
) {
  return (
    benchmarkId === "arc-agi-2" &&
    routePath === "/benchmarks/arc-agi-2/" &&
    !!samples &&
    sampleId !== undefined &&
    sampleId !== null &&
    sampleId !== "" &&
    !samples.some((sample) => sample.id === sampleId)
  );
}
