---
name: lesson-writer
description: Write or rewrite one topic lesson (content/topics/<topic-id>/lesson.mdx) for the iOS interview prep app, following the fixed lesson template, verified against official Apple/Swift sources.
when_to_use: '"write the lesson for X", "create lesson", "rewrite this topic", "draft the ARC lesson", any new or changed lesson.mdx'
argument-hint: "[topic-id]"
---

# Lesson writer

Write the lesson for topic `$ARGUMENTS`.

## Steps

1. **Find the topic.** Read `content/topics/<topic-id>/topic.json` (title, level, goal, prerequisites, and `briefIntro` — topics that come later, which this lesson must explain in a few lines and link to) and `content/units.json` (its unit and the topics before and after it). If the topic doesn't exist, stop and ask the user. The model is described in `docs/curriculum-schema.md`.
2. **Research first — never from memory.** Follow `.claude/rules/research.md`:
   - Fetch the relevant official pages: Swift book chapter, Apple Developer Documentation, related WWDC sessions, Swift Evolution proposals.
   - Note what changed in recent Swift/iOS versions (current baseline is in `docs/stack.md`).
   - Search for how this topic is commonly asked in interviews at this level.
3. **Editing an existing lesson?** Keep what works and improve the rest. Follow "Editing and improving topics" in `docs/curriculum-schema.md`: for a change the learner should know about, bump `version` in `topic.json` and add a `changes` entry; for small fixes, do not bump. Then skip to step 6.
   **New lesson? Copy the template** `template.mdx` (next to this file) to `content/topics/<topic-id>/lesson.mdx` and fill every section. Keep section order and component names exactly.
   Follow the format in `docs/lesson-format.md`: core sections in order, a guess first (3–4 options), 2–3 quick checks, 2+ traps, 2+ interview answers (topic level + one higher), code shown with its output, a `<TryIt>` link, optional extras only when they help. Put learner text between tags, not in attributes.
4. **Write in plain English** (`.claude/rules/plain-english.md`) **for the level** (`.claude/rules/content.md` → Voice). Simple words at every level — staff lessons go deeper in ideas, not in harder English. Keep the whole lesson readable in about the `estimatedMinutes` set in `meta` (aim for 8–15 minutes).
5. **Diagrams:** for each `<Diagram>`, write a short spec in the lesson as a comment (what moves, which steps, the static fallback). Building the component is `/diagram-animator`'s job.
6. **Self-check** before finishing:
   - Every claim traceable to a URL in `meta.sources`.
   - Swift code compiles under Swift 6 language mode (or is labeled as a legacy pattern), and every `output` block is the real output — run `node scripts/run-swift-examples.mjs content/topics/<topic-id>/lesson.mdx` (Swift 6 mode, compares each output block). If you show an error in a code comment, compile that line once to confirm the error.
   - No copied Apple documentation text.
   - Plain English pass: no sentence over 25 words, no idioms, every technical term explained on first use.
   - `meta.lastVerified` set to today. Set `status` to `draft` in `topic.json` (never `published` — the user decides that).
7. **Report** to the user: what the lesson covers, which sources were used, and anything you couldn't verify (marked `UNVERIFIED` in the file).

Then suggest running `/exam-writer <topic-id>` and `/content-fact-checker <topic-id>`.
