import { useRouter } from "vue-router";
import { createCatalogQuery } from "../lib/catalogQuery";

export type { CatalogFilterKey } from "../lib/catalogQuery";

/** Connect the URL-backed catalog interface to the current Vue application. */
export function useCatalogQuery() {
  return createCatalogQuery(useRouter());
}
