# Phase 4 Plan — Content Production

**Goal:** produce the entire curriculum (164 topics across 14 units and 5 levels), level by level, following the verified 8-step workflow from the pilot topic. Every topic has a friendly lesson in simple English, verified code examples, an exam bank of 30+ questions, and a review page for your approval.

Live status is in [PROGRESS.md](../PROGRESS.md).

## Decisions (from the user, 2026-11-08)

| Decision | Choice | Reason |
|---|---|---|
| **Where per-topic notes live** | `docs/topics/<topic-id>/` | Keeps research notes, fact-check reports, and rubric test logs clean and isolated in `docs/` alongside the review page, matching the pilot pattern without cluttering the content data model. |
| **Production batching** | **Level by level** | A learner experiences the path cumulatively from Fresh upward. Producing all Fresh topics first completes the first full playable stage. |

---

## Steps

### Step 4.0 — Tooling and review setup
- Generalize `prototype/build.mjs` to build review pages for any topic ID:
  - Handle topics with or without `<Diagram>`.
  - Output to `docs/topics/<topic-id>/review.html` (while keeping backward compatibility for `docs/pilot/prototype-structs-vs-classes.html`).
- Reorganize pilot notes from `docs/pilot/` to `docs/topics/structs-vs-classes/` for consistency.
- Verify `protect-generated.sh` and hooks.

---

### Step 4.1 — Wave 1: Fresh level (21 remaining topics)
The Fresh stage consists of **22 main topics** (0 bonus). `structs-vs-classes` was completed and verified in Phase 2, leaving 21 topics to write:

#### Batch 1A: Swift Language Core
1. `swift-basics` (Unit: Swift Language) — First stop on the path
2. `optionals` (Unit: Swift Language)
3. `operators` (Unit: Swift Language)
4. `strings-and-characters` (Unit: Swift Language)
5. `collections` (Unit: Swift Language)
6. `control-flow` (Unit: Swift Language)
7. `functions` (Unit: Swift Language)

#### Batch 1B: Swift Language Intermediate Types & Logic (5 topics)
8. `closures-basics` (Unit: Swift Language)
9. `enumerations` (Unit: Swift Language)
10. `properties` (Unit: Swift Language)
11. `methods-and-initialization` (Unit: Swift Language)
12. `error-handling` (Unit: Swift Language)

#### Batch 1C: Coding Interview (3 topics)
13. `big-o` (Unit: Coding Interview)
14. `arrays-and-strings` (Unit: Coding Interview)
15. `hash-tables` (Unit: Coding Interview)

#### Batch 1D: SwiftUI Basics (5 topics)
16. `swiftui-views-modifiers` (Unit: SwiftUI)
17. `swiftui-layout` (Unit: SwiftUI)
18. `state-and-binding` (Unit: SwiftUI)
19. `swiftui-lists` (Unit: SwiftUI)
20. `swiftui-navigation` (Unit: SwiftUI)

#### Batch 1E: App and System (1 topic)
21. `xcode-and-git-basics` (Unit: App and System)

*(Note: `optional-chaining`, `inheritance`, `type-casting`, `protocols`, `extensions`, `access-control`, and `view-controller-lifecycle` are Junior level topics and will be produced in Wave 2, per the curriculum schema and user decision on 2026-11-09).*

---

### Step 4.2 — Wave 2: Junior level
- 44 main topics + 1 bonus topic.
- Introduces concurrency basics (`async-await`), architecture patterns (`mvc`, `mvvm`), and core interview algorithms.

### Step 4.3 — Wave 3: Mid level
- 44 main topics + 9 bonus topics.
- Introduces Swift concurrency deep dives (`structured-concurrency`), data persistence, performance profiling, and testing strategy.

### Step 4.4 — Wave 4: Senior level
- 30 main topics + 5 bonus topics.
- Introduces Mobile System Design, advanced architecture, memory internals, and senior behavioral leadership.

### Step 4.5 — Wave 5: Staff level
- 9 main topics.
- High-level platform architecture, technical vision, cross-team influence, and incident management.

---

## Workflow for every topic (docs/topic-workflow.md)

Each topic runs through the strict 8 steps before publishing:
1. **Research**: official Apple documentation, Swift book, WWDC videos. Key code facts verified with `swiftc -swift-version 6`.
2. **Lesson**: authored in CEFR B1 Plain English with the standard sections: Guess first, Concept analogy, Code with output, Traps, Sample answers, and Recap.
3. **Diagram**: interactive illustrated diagram (when visual explanation is beneficial).
4. **Exam**: 30+ verified questions across all 4 formats (`mcq`, `code-reading`, `written`, `code-write`), with rubric scoring and explanation for every option.
5. **Fact-check**: verified with Swift 6 compiler and official sources.
6. **Review page**: generated with `prototype/build.mjs <topic-id>`.
7. **User review**: presented to you for approval.
8. **Publish**: validator check and status updated to `published`.
