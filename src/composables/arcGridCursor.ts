import { ref, watch } from "vue";
import type { ArcGrid } from "../lib/arcGrid";

/** Painting replaces the grid, but the roving tab stop must stay on that cell. */
export function useArcGridCursor(getGrid: () => ArcGrid) {
  const focusIndex = ref(0);
  watch(
    () => `${getGrid().length}:${getGrid()[0].length}`,
    () => {
      focusIndex.value = 0;
    },
    { flush: "sync" },
  );
  return focusIndex;
}
