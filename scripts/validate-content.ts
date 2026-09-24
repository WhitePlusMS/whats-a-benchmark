import { loadContent } from "./content-pipeline";
const workspace = await loadContent();
const samples = workspace.entries.flatMap(
  (entry) => entry.sampleSet?.samples || [],
);
console.info(
  `[content] Validated ${workspace.entries.length} public entries, ${samples.length} samples and ${workspace.releases.length} reports.`,
);
