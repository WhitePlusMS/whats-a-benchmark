# what's a benchmark?

**Understand what AI benchmarks actually measure.**

English · [简体中文](README_ZH.md)

A source-backed reference site for exploring AI evaluation tasks, real examples, scoring methods, and relationships between benchmark versions. Search names from model release reports, inspect what a task looks like, and compare evaluation protocols side by side.

The website's interface and editorial explanations are currently in **Simplified Chinese**. Original examples retain their source language; this English README documents the project and how to run it.

## At a glance

Catalog snapshot as of **September 24, 2026**:

| Coverage                               | Count |
| -------------------------------------- | ----: |
| Benchmark entries                      |    84 |
| Capability categories                  |     8 |
| Real task examples                     |    27 |
| Benchmarks with on-site examples       |    18 |
| Official model release reports indexed |    17 |

Categories cover coding, mathematics, knowledge, agents and tools, visual understanding, long context, instruction following, and professional tasks.

## Features

- **Find benchmarks:** search names, aliases, capabilities, or publishers; filter by category, publisher, example availability, and benchmark type. Switch between card and list views and sort by name or year.
- **Recognize a list:** paste up to 60 names separated by newlines, commas, or semicolons. Version and year differences remain meaningful.
- **Read the protocol:** inspect official definitions, inputs and outputs, execution requirements, data structure, scoring, limitations, and access conditions, with evidence links beside each section.
- **Explore real examples:** view text, code, multiple-choice questions, long-context excerpts, structured records, ARC grids, and audio. Inspect original fields, reveal available reference answers, and read provenance and licensing notes.
- **Compare and share:** compare two or three benchmarks side by side. Selection is encoded in the comparison URL; catalog filters, sorting, and view preferences are also reflected in the URL.
- **Trace versions and sources:** distinguish originals, subsets, derivatives, suites, and internal evaluations. Follow supported relationships and official report references.
- **Browse on desktop or mobile:** responsive layouts and statically generated detail pages that support direct links and refreshes.

This is a reading and discovery tool. It does not execute evaluations, call model APIs, or generate a unified model ranking. Entries without suitable on-site examples explain their availability and link to official resources.

## Quick start

Use **Node.js 22.12+** and npm. The project has been verified with Node.js 22.22.1; the GitHub Actions workflow uses Node.js 22.

From the repository root:

```sh
npm ci
npm test
npm run build
npm run preview
```

Open the local HTTP address printed by the preview command. The deployable site is generated in `dist/`; serve it over HTTP rather than opening its HTML files directly. Stop the preview with `Ctrl+C` when finished.

For development, run `npm run dev` if a development server is not already running. After editing content, use `npm run content:generate` to refresh the data consumed by an existing server.

### Commands

| Command                    | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `npm run dev`              | Generate content and start Vite development mode                 |
| `npm run content:generate` | Validate authoring content and regenerate the public projection  |
| `npm run validate`         | Validate content, references, and referenced assets              |
| `npm run typecheck`        | Generate content and run strict TypeScript checks                |
| `npm test`                 | Generate content and run automated tests                         |
| `npm run build`            | Run type checks, generate static pages, and verify public output |
| `npm run preview`          | Serve the production build locally                               |
| `npm run content -- help`  | Show content lifecycle commands                                  |

`typecheck`, `test`, and `build` generate their content inputs automatically. You do not need to check in or manually create `.generated/`. Run both tests and the build before submitting a change; `build` does not run the test suite itself.

## Project structure

```text
content/
  benchmarks/       One JSON authoring file per benchmark
  assets/           Logos, license texts, and permitted sample assets
  templates/        Draft entry template
  categories.json   Shared capability categories
  brands.json       Publisher identities and logo sources
  releases.json     Official reports and benchmark references
src/
  components/       Reusable presentation components
  composables/      Query, comparison, and sample interaction state
  content/          Shared schema and adapters for generated data
  lib/              Search, query, and comparison rules
  styles/           Design tokens and styles grouped by responsibility
  views/            Catalog, details, comparison, and reading pages
scripts/            Content maintenance, generation, and build verification
tests/              Automated regression tests
docs/               Architecture, editorial workflows, and research records
.generated/         Generated public metadata and sample files (ignored)
dist/               Deployable static site (ignored)
```

Built with **Vue 3, TypeScript, Vite, Vite SSG, Vue Router, Zod, and Lucide**. It runs as a static site without a backend, database, or account system.

Authoring JSON passes through a shared schema into a public projection. Catalog metadata is available to the app, while sample bodies load on demand. Drafts are excluded from public output; archived entries retain their historical detail pages. Global styles have one entry point, with tokens and page-specific responsibilities separated. See the [architecture guide](docs/ARCHITECTURE.md) for module boundaries and state rules.

## Maintain content

Create a draft:

```sh
npm run content -- new my-benchmark
```

Edit `content/benchmarks/my-benchmark.json`. Record the official definition, task protocol, data profile, access and reuse conditions, scoring, limitations, version relationships, and supporting sources. Add up to six real examples only when their public display is supported by the applicable permissions.

After filling in and reviewing the entry:

```sh
npm run content -- publish my-benchmark
npm run validate
npm test
npm run build
```

The `publish` command changes the local source status; it does not upload the website. The same CLI supports `archive`, `draft`, `check-delete`, and `delete`. References are checked before withdrawal or deletion. Record the reason and impact of manual changes in [UPDATE_LOG.md](UPDATE_LOG.md).

Research and preparation scripts write unpublished records under `artifacts/research/` and `artifacts/candidates/`. These directories are ignored by Git and excluded from deployment. Sample preparation requires a successful collection batch; candidates still need editorial and licensing review before adoption. Normal builds do not fetch upstream datasets.

See the [content maintenance guide](docs/CONTENT_MAINTENANCE.md) and [local sample import workflow](docs/LOCAL_SAMPLE_IMPORT.md) for field definitions, lifecycle behavior, and provenance requirements.

## Deploy

### GitHub Pages

The repository includes a [Pages workflow](.github/workflows/pages.yml):

1. Create your GitHub repository and push the source to `main`. If you use another default branch, update the workflow trigger.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Push a commit or run the workflow manually from **Actions**.

The workflow installs dependencies, runs tests, builds, and uploads only `dist/`. It reads the base path and site URL from the Pages configuration, supporting project subpaths and configured custom domains.

For other static hosts, publish the contents of `dist/`. Configure these build environment variables when needed:

| Variable    | Meaning                                                             |
| ----------- | ------------------------------------------------------------------- |
| `BASE_PATH` | Public path prefix, such as `/whats-a-benchmark/`; defaults to `/`  |
| `SITE_URL`  | Full public site URL, used to generate the sitemap and robots entry |

Leave `SITE_URL` unset until the deployment address is known. Do not upload the entire workspace or unpublished research candidates.

## Contribute

Corrections to definitions, sources, version relationships, and sample provenance are welcome. Include a precise official source and identify the affected benchmark ID. For a new version, explain how its tasks or protocol differ from existing entries.

For code changes, follow existing module and naming conventions, keep types strict, and reuse existing components. Run `npm test` and `npm run build`; verify UI changes in a browser at desktop and mobile widths. Update the relevant documentation and `UPDATE_LOG.md`.

## Sources and usage rights

Definitions are grounded in benchmark publishers' papers, repositories, project pages, and dataset cards. Model release reports document usage or reported results; they do not replace the benchmark's own definition. The catalog is a dated editorial snapshot, with verification dates recorded per entry.

Original task material and this site's explanations are labeled separately. Sample attribution and reuse notes are attached to each record, with available license texts in [content/assets/licenses](content/assets/licenses/). Download access alone is not permission to redistribute a dataset or its third-party media. Restricted or unverified material is not added as a public sample.

Logos retain their respective ownership and do not imply endorsement. Provenance is recorded in [content/brands.json](content/brands.json) and [logo sources](docs/LOGO_SOURCES.md). Third-party data and asset licenses apply to their respective material; they do not establish a license for this project's source code. A repository-wide source code license has not yet been specified.

## Documentation

The detailed guides are currently in Chinese.

- [Architecture and styling](docs/ARCHITECTURE.md)
- [Content maintenance](docs/CONTENT_MAINTENANCE.md)
- [Importing real examples](docs/LOCAL_SAMPLE_IMPORT.md)
- [Official-source research workflow](docs/RESEARCH_WORKFLOW.md)
- [Product design](docs/PRODUCT_DESIGN.md)
- [Update log](UPDATE_LOG.md)
