export type ResearchFormat = "hf" | "jsonl" | "gz" | "json" | "text";
export type ResearchInput = readonly [
  id: string,
  url: string,
  format: ResearchFormat,
];
export type ResearchFetchResponse = {
  ok: boolean;
  status?: number;
  statusText?: string;
  text(): Promise<string>;
  arrayBuffer?(): Promise<ArrayBuffer>;
};
export type ResearchFetch = (
  url: string,
  init?: { signal?: AbortSignal },
) => Promise<ResearchFetchResponse>;
export function runResearchBatch(options: {
  root: string;
  inputs: readonly ResearchInput[];
  fetchImpl?: ResearchFetch;
  logger?: Pick<Console, "info" | "error">;
}): Promise<boolean>;
export function assertResearchBatchReady(
  root: string,
  requiredIds: readonly string[],
): Promise<void>;
