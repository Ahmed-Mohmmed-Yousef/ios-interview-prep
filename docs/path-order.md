# Order and Prerequisites (Step 1.6)

Done 2026-10-22. The order lives in [content/units.json](../content/units.json) and the prerequisites live in each `topic.json`.

**Visual path page:** [iOS Interview Path Map](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM) (private artifact). Source file: [path-map.html](path-map.html). Rebuild it after any curriculum change with `node scripts/build-path-page.mjs`, then republish.

## Result

- **221 prerequisite links.** Only direct needs are listed; the validator checks that every need comes earlier on the road, so there are no loops.
- **0 conflicts left.** The 4 conflicts found were decided by the user (below).
- **2 short intros** (`briefIntro`): the lesson explains a few basics of a topic that comes later and links to it.

## Decisions (from the user)

| Conflict | Decision |
|---|---|
| "Memory Profiling with Instruments" (Memory) needs "Profiling with Instruments" (Performance, later) | Keep it in Memory. The lesson gives a short intro to Instruments |
| "Views and Modifiers" (first SwiftUI topic) needs "Xcode, Projects and Git" (App and System, later) | Keep both where they are. The lesson gives a short intro to Xcode |
| URLSession and SwiftUI's `.task` use async/await, but async/await was a mid topic | **Moved "async/await" to junior.** Actors, Sendable and Swift 6 stay at mid |
| "Loading Data in SwiftUI" (junior) needed URLSession (later unit) and async/await | **Moved "Loading Data in SwiftUI" to mid** |

## How to change order or prerequisites later

Edit the files directly:
- Order of main topics → move ids inside a unit's `topics` list in `units.json`.
- Prerequisites → edit `prerequisites` in `topic.json`.
- A need that comes later on the road → the validator rejects it as a prerequisite. Ask the user: move a topic, or add it to `briefIntro`.

Then run `node scripts/validate-curriculum.mjs`, `node scripts/curriculum-report.mjs` and `node scripts/build-path-page.mjs`.

`scripts/apply-order-prereqs.mjs` and `scripts/data/prerequisites-1.6.mjs` were the one-time input for this step. They are kept as history; **do not run them again**, because they would overwrite later edits.

## Open for Phase 2/3

Fresh Swift lessons come before the Xcode topic. Learners need a place to try code. Decide in Phase 2 (pilot) or Phase 3 (design) how lessons let learners run small examples, for example with a link to Swift Playgrounds or code that is shown with its output.
