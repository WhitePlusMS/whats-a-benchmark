import data from "../../.generated/releases.json";
import type { Release } from "../types/benchmark";
export const releases = data as Release[];
