import type { ContentEntry, TaskSample, Category } from "../content/schema";
export type { TaskSample, Category, Source, Release } from "../content/schema";
export type CategoryId = Category["id"];
export type BenchmarkKind = ContentEntry["kind"];
/** A public projection has metadata only; sample bodies are fetched on demand. */
export type Benchmark = Omit<ContentEntry, "sampleSet"> & {
  sampleCount: number;
};
export interface SampleFile {
  benchmarkId: string;
  retrievedAt: string;
  samples: TaskSample[];
}
