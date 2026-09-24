import { generateContent } from "./content-pipeline";
const workspace = await generateContent();
console.info(
  `[content] Generated ${workspace.entries.length} public entries; excluded ${workspace.documents.length - workspace.entries.length} drafts.`,
);
