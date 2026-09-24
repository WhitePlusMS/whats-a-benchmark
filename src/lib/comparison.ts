import type { LocationQueryValue } from "vue-router";
import { byId } from "../content/catalog";

export const COMPARISON_LIMIT = 3;

/** Shared links may include archived entries, but never unknown or duplicate IDs. */
export function normalizeComparisonIds(ids: readonly string[]): string[] {
  return [...new Set(ids)]
    .filter((id) => byId.has(id))
    .slice(0, COMPARISON_LIMIT);
}

export function parseComparisonIds(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
): string[] {
  return normalizeComparisonIds(
    typeof value === "string" ? value.split(",") : [],
  );
}
