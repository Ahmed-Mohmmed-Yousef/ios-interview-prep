# Phase 1 Plan — Curriculum Map

**Goal:** decide *what* learners study at each level, and *in what order*. Every later phase builds on this, so we do it in small steps. You review and approve each step before the next one starts.

## Design principle: easy to grow and change

The curriculum must be easy to add to and update for years. These rules make that possible:

1. **One folder per topic.** Each topic lives in `content/topics/<topic-id>/` with its own `topic.json`. Adding a topic = adding a folder. Nothing else breaks.
2. **Topic ids never change.** The id is the key for learner progress. If a title changes, the id stays. If a topic is replaced, the old one is marked `retired` and points to the new one.
3. **Topics are grouped into units.** A unit is a group of related topics (for example "Memory" or "Concurrency"). Paths are built from units, so we can add a topic to a unit without touching the paths.
4. **Paths are built, not hand-written.** A level's path = all published topics at that level and below, sorted by prerequisites and unit order. Add a topic with the right level and prerequisites, and it appears in the right place automatically.
5. **Every topic has a status:** `planned` → `draft` → `review` → `published` → `retired`. Only `published` topics are shown to learners. We can plan 200 topics and publish them one by one.
6. **Every topic has a version and a `lastVerified` date.** When Apple releases a new iOS or Swift version, we know which topics to check, and progress can tell the learner "this topic was updated".
7. **Validation.** A schema and the content hook check every change: unknown prerequisites, prerequisite loops, missing sources, wrong levels.

## Sub-phases

Each step ends with something you can review.

| Step | What we do | You get | You decide |
|---|---|---|---|
| **1.1 Data model** | Design the file format for topics, units and paths (the rules above), plus the schema and validation | `docs/curriculum-schema.md`, hook checks | Approve the format |
| **1.2 Level definitions** | Research what each level (fresh → staff) is expected to know and do in real interviews today | `docs/levels.md`: one clear description per level, with sources | Agree what each level means |
| **1.3 Research topics** | Collect topics from official sources (Swift book, Apple docs, recent WWDC sessions, Swift Evolution) and check how interviews ask about them | `docs/research/` notes with links | — |
| **1.4 Units** | Group the topics into units (for example: Swift Language, UI, Memory, Concurrency, Data, Architecture, Testing, Performance, System Design, Soft Skills) | Unit list with a short goal for each | Add / remove / rename units |
| **1.5 Topics per level** | Put each topic in a unit and give it a level and a learning goal ("After this topic you can explain…") | Full topic list | Add / remove / move topics |
| **1.6 Order and prerequisites** | Link topics with prerequisites and set the walking order | A visual path page for each level | Approve the order |
| **1.7 Sources** | Attach official sources to every topic, checked on the web | Sources in each `topic.json` | — |
| **1.8 Final check** | Validate everything, write all files, mark Phase 1 done | `content/` files, ready for Phase 2 | Final approval |

## Progress

Live status is in [PROGRESS.md](../PROGRESS.md).

## Decisions needed during Phase 1

- ~~**SwiftUI and UIKit**~~ — decided: one path teaches both.
- ~~**Soft skills**~~ — decided: required from senior up.
- ~~**Algorithms**~~ — decided: a Coding Interview unit in Swift, counts in the score.
- ~~**Path size**~~ — decided: map all 164 topics now, write and publish them in waves.

All decisions with dates are listed in [PROGRESS.md](../PROGRESS.md). Summary of the result: [phase-1-summary.md](phase-1-summary.md).

## Rules for every step

- Web-search every fact (`.claude/rules/research.md`).
- Simple English (`.claude/rules/plain-english.md`).
- No lessons and no app code in Phase 1.
