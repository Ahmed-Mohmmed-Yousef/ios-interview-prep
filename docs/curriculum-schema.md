# Curriculum Data Model (Step 1.1)

This is how the curriculum is stored. It is built to grow: adding or changing a topic touches very few files, and a validator catches mistakes.

## Decisions (from the user, 2026-10-22)

| Question | Decision |
|---|---|
| SwiftUI and UIKit | One path teaches both |
| Skipping earlier topics | Two kinds of skip test: **per unit** and **per whole level** |
| Skip-test questions | Reused from the topics' own question banks (medium and hard questions) |
| Skip-test pass mark | **80%** |
| Topic pass mark | **70%** |
| Bonus topics | Yes — a **side branch** next to the main road. Never blocks the next topic |
| Order inside a unit | **Fixed** — pass a topic to unlock the next |
| Path order | **By level, then by unit** — each level is a stage on the road |

## Words we use

- **Level** — fresh, junior, mid, senior, staff.
- **Unit** — a subject, such as "Memory" or "Concurrency". One unit can have topics at many levels.
- **Topic** — one lesson plus one exam.
- **Stage** — one level's part of the road. A senior path has 4 stages: fresh, junior, mid, senior.
- **Main topic** — on the road. Must be passed to go on.
- **Bonus topic** — on a side branch. Optional. Not in the final percentage.

## Files

```
content/
  levels.json                 # the 5 levels, in order
  units.json                  # units in order; each lists its topics in order
  rules.json                  # pass marks and exam sizes
  topics/<topic-id>/
    topic.json                # what the topic is (curriculum entry)
    lesson.mdx                # the lesson (Phase 2+)
    questions.json            # the question bank (Phase 2+)
```

**One source of truth for each thing:**
- *Order and unit membership* live only in `units.json`.
- *What a topic is* (level, goal, prerequisites, status) lives only in `topic.json`.
- *Numbers* (pass marks, exam sizes) live only in `rules.json`.

### `levels.json`

```jsonc
{
  "version": 2,
  "levels": [
    {
      "id": "fresh",
      "title": "Fresh",
      "summary": "Looking for your first iOS job.",          // one line, shown on the level picker
      "description": "You know Swift basics and ...",        // 1–3 short sentences
      "selfCheck": ["I can write Swift code with ..."]       // "You are here if you can…" list
    }
    // ... junior, mid, senior, staff — array order is the level order
  ]
}
```

How the levels were defined, with sources: [docs/levels.md](levels.md).

### `units.json`

```jsonc
{
  "version": 1,
  "units": [
    {
      "id": "memory",
      "title": "Memory",
      "goal": "Understand how iOS apps use and free memory.",
      "topics": ["value-vs-reference", "arc-basics", "retain-cycles"],   // main road, in order
      "bonus": [
        { "topic": "unsafe-pointers", "after": "arc-basics" }           // side branch after a main topic
      ]
    }
  ]
}
```

Array order is the unit order. One `topics` list holds topics of **all** levels; each level's stage shows only the topics at that level, in this order.

### `topic.json`

```jsonc
{
  "id": "arc-basics",                    // kebab-case, same as the folder name, never changes
  "title": "ARC Basics",
  "level": "junior",                     // the level that introduces this topic
  "goal": "After this topic you can explain how ARC decides when to free an object.",
  "prerequisites": ["value-vs-reference"],
  "status": "planned",                   // planned | draft | review | published | retired
  "version": 1,                          // bump when the lesson or questions change in a way the learner should know
  "lastVerified": null,                  // "YYYY-MM-DD" after a fact check
  "tags": ["memory"],                    // optional, free words for search and filters
  "sources": [{ "title": "...", "url": "https://...", "kind": "official" }],  // kind: official | community
                                         // (policy in rules.json "sources"; see docs/sources.md)
  "briefIntro": ["instruments-profiling"], // optional: topics that come LATER on the road but this lesson
                                         // needs a little of — the lesson explains the basics in a few
                                         // lines and links to them (only when the user accepted it)
  "replacedBy": null,                    // only for retired topics: the new topic id
  "changes": [                           // optional history, newest last; one entry per version after 1
    { "version": 2, "date": "2027-06-20", "note": "Updated for iOS 28: new @State behavior." }
  ]
}
```

### `rules.json`

```jsonc
{
  "version": 1,
  "topicPassMark": 70,
  "skipPassMark": 80,
  "topicExamSize": 10,
  "unitSkipTest":  { "questionsPerTopic": 2, "min": 6,  "max": 20 },
  "levelSkipTest": { "questionsPerTopic": 1, "min": 15, "max": 40 }
}
```

The skip-test sizes are a first proposal — the user should confirm them.

## How a path is built

For a learner who picks level **L**:

1. Stages = every level from `fresh` up to **L**.
2. For each stage, go through the units in order. Show the unit's **published** topics whose level equals that stage. Skip units with no topics in that stage.
3. Bonus topics appear next to their `after` topic.

Unlocking:
- Main topics form one road across all stages. Passing a topic (70%) unlocks the next one.
- A bonus topic opens when its `after` topic is passed. It never blocks anything.
- **Unit skip test:** covers the main topics of one unit inside one stage. Pass (80%) → those topics are marked skipped.
- **Level skip test:** covers all main topics of one stage. Pass (80%) → the whole stage is skipped.

## How to add or change things

| I want to… | Do this |
|---|---|
| Add a topic | Create `content/topics/<id>/topic.json` with `status: "planned"`. Add the id to a unit's `topics` (or `bonus`) list at the right place |
| Move a topic | Move its id in `units.json`. Nothing else changes |
| Change a topic's level | Change `level` in `topic.json`. It moves to the other stage automatically |
| Add a unit | Add it to `units.json` |
| Hide a topic for now | Set `status` to anything except `published` |
| Remove a topic | Set `status: "retired"`, remove it from `units.json`, and set `replacedBy` if there is a new topic. **Never delete the folder** — saved progress points to it |
| Rename a topic | Change `title` only. Never change `id` |
| Update after a new iOS version | Fact-check, update content, bump `version`, set `lastVerified` |

## Editing and improving topics later

**Every topic is meant to be improved over time** — better explanations, new diagrams, more questions, fixes, new iOS versions. Nothing in this model is fixed except the topic `id`.

### What can change, and how

| Part | Can it change? | How |
|---|---|---|
| Title, goal, tags | Yes, any time | Edit `topic.json` |
| Level | Yes | Edit `level`. The topic moves to the other stage by itself |
| Unit or order | Yes | Move the id in `units.json` |
| Main ↔ bonus | Yes | Move the id between `topics` and `bonus` in `units.json` |
| Prerequisites | Yes | Edit `prerequisites`. The validator checks the order |
| Lesson text, code, diagrams | Yes | Edit `lesson.mdx`. Run `/content-fact-checker` after |
| Questions | Yes — add, fix or retire | Add new ids; fix in place; to remove one, set `"retired": true` on it. **Never reuse or renumber a question id** |
| Sources | Yes | Edit `sources`, set `lastVerified` |
| Split one topic into two | Yes | Keep the old id for the bigger part. Create a new topic for the other part |
| Merge two topics | Yes | Keep one id. Retire the other with `replacedBy` pointing to the kept one |
| Topic `id` | **No** | Learner progress points to it. Retire and replace instead |

### When to bump `version`

- **Bump** (and add a `changes` entry) when a learner who passed should know: new or changed facts, a new section, a changed exam.
- **Do not bump** for small fixes: typos, clearer wording, a better diagram with the same meaning.

### What protects learners when content changes

- Progress is saved by topic `id`, so edits never lose a learner's progress.
- Progress also saves the topic `version` the learner passed. When the version goes up, the app can show "This topic was updated" and what changed (from `changes`). Whether a retake is needed is decided in Phase 3.
- Retired topics and retired questions stay in the files, so old results still make sense.

## Validation

`scripts/validate-curriculum.mjs` runs automatically (content hook) when any of these files change. It checks:

- Every id is kebab-case and matches its folder name.
- Every topic's `level` exists in `levels.json`.
- Every topic in `units.json` has a folder. Every non-retired topic is in exactly one unit, once.
- Retired topics are not in `units.json`. `replacedBy` points to a real topic.
- Prerequisites exist, are main topics, and come **earlier on the road** than the topic (so there are no loops).
- A bonus topic's `after` is a main topic in the same unit and the same level.
- A published topic has `lesson.mdx`, `questions.json` and at least one source, and all its prerequisites are published too.
- `rules.json` numbers are in range.
- Every source is marked `official` or `community`. `official` sources are on a site listed in `rules.json` `sources.officialHosts`; `community` sources appear only in the units and topics listed in `sources.communityAllowed`.
- `changes` (if present): each entry has a version, a date and a note; versions go up; the last one equals the topic `version`.

## Still open (decide in later phases)

- How skipped topics count in the final percentage (Phase 3, results design).
- What the learner sees when a passed topic gets a new `version` (Phase 3).
