---
license: mit
pretty_name: JobBench
tags:
- benchmark
- agents
- llm-agents
- white-collar-tasks
size_categories:
- n<1K
configs:
- config_name: default
  data_files:
  - split: main
    path: tasks.parquet
  - split: easy
    path: easy.parquet
---

# JobBench

Real-world white-collar tasks across ~35 professions. Each task has a prompt,
reference files, a weighted rubric, and a human-readable brief.

The dataset ships **two splits**:

- **main** — 65 full tasks. Some include a `files_required_to_search/` folder
  of ground-truth materials the agent is expected to discover via search.
- **easy** — 63 simplified tasks (shorter prompts, no `files_required_to_search/`).
  Useful for cheaper smoke tests and capability ranking.

The `main` and `easy` splits share the 35 occupations and the `task1`/`task2`/`task3`
naming, but the *content* of a given task slot can differ between splits — they are
parallel selections, not a 1:1 simplification of each other.

## Structure

```
/
├── tasks.parquet       (main split, 65 rows)
├── easy.parquet        (easy split, 63 rows)
├── dataset/            (main split files; referenced by tasks.parquet)
└── dataset_easy/       (easy split files; referenced by easy.parquet)
```

Each task directory looks like:

```
<split-folder>/<occupation>/taskN/
├── RUBRICS.json                          # weighted pass/fail criteria
├── task_card.md                          # human-readable task brief
├── task_folder/
│   ├── TASK_INSTRUCTIONS.txt             # prompt the agent reads
│   └── ...                               # starter files
└── files_required_to_search/             # main split only
```

## Columns (same schema for both splits)

| Column | Type | Description |
|---|---|---|
| `task_id` | str | `<occupation>__taskN` |
| `occupation` | str | Profession folder name |
| `task_num` | int | Task number within occupation |
| `prompt` | str | Contents of `TASK_INSTRUCTIONS.txt` |
| `reference_files` | list[str] | Starter files in `task_folder/` (excludes `files_required_to_search/`) |
| `reference_file_urls` | list[str] | `https://huggingface.co/.../resolve/main/...` for each starter file |
| `reference_file_hf_uris` | list[str] | `hf://datasets/.../...` for each starter file |
| `rubric_json` | str | Raw `RUBRICS.json` content |
| `task_card` | str | Raw `task_card.md` content |

## Using the dataset

Runner code lives at <https://github.com/Job-Bench/job-bench-eval>. Its
`setup.sh` fetches both splits and reorganizes them into a unified local
layout:

```
jobbench/dataset/main/<profession>/taskN/...
jobbench/dataset/easy/<profession>/taskN/...
```

Benchmark and judge runners default to `main` and accept a `SPLIT=easy` env
var to switch.

To pull a specific split's raw files manually:

```bash
hf download JobBench/job-bench --repo-type=dataset --include 'dataset/**' --local-dir ./        # main
hf download JobBench/job-bench --repo-type=dataset --include 'dataset_easy/**' --local-dir ./   # easy
```
