import assets from "../../.generated/brands.json";
import { allBenchmarks } from "./catalog";
import type { Brand } from "./schema";
export const brands: Record<string, Brand> = Object.fromEntries(
  (assets as Brand[]).map((brand) => [brand.id, brand]),
);
// Associations come from the entry itself; no second hand-maintained registry.
export const benchmarkBrands: Record<string, string[]> = Object.fromEntries(
  allBenchmarks.map((item) => [item.id, item.brandIds]),
);
