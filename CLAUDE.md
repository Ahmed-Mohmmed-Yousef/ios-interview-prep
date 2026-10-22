# iOS Interview Prep

A free, public web app that prepares iOS developers for technical interviews at five levels: **fresh, junior, mid, senior, staff**.

Each level is a path of topics. Each topic has a friendly lesson (analogies, animated diagrams, code) followed by an exam. Results are shown per topic and for the whole path. Progress is saved in the browser (login comes later).

## Status

**`PROGRESS.md` is the single source of truth for status** — all phases, steps, the user's requirements and the change log. Read it at the start of every session.

The app is **not scaffolded yet** — no code until the planning phases are approved by the user.

### Keep PROGRESS.md up to date (required)

Update it in the same turn as the work, every time:
- A step starts (🔄), finishes (🟡 waiting for review), or the user approves it (✅).
- A phase is planned: add its steps as a checklist under the phase.
- The user gives a new rule or requirement: add a row to "Your rules and requirements".
- A plan changes: edit the checklist (mark dropped items ❌, never just delete them) and say why in the change log.
- Add a dated line to the change log (newest first) and update "Last updated".

## Product rules

- Levels are **cumulative**: a senior path includes fresh, junior and mid topics. Earlier-level topics can be skipped by passing a short placement test.
- A topic passes at **70%**. Passing unlocks the next topic. Retakes are unlimited and draw new questions.
- The path goes **by level, then by unit**. Order inside a unit is fixed. Bonus topics sit on a side branch and never block.
- Skip tests exist **per unit** and **per level**; they reuse topic questions and pass at **80%**.
- One path teaches both SwiftUI and UIKit. No Objective-C. iPhone and iPad only. Apple tools; third-party libraries are only mentioned.
- Every topic cites 1–3+ checked sources marked `official` or `community`; the policy is in `content/rules.json` (`sources`).
- Question types: `mcq`, `code-reading`, `written`, `code-write`. The first two are graded in the browser; the last two are graded by AI with a rubric.
- English only — and **simple English**. Learners come from the whole world with different English levels. All learner-facing text follows `.claude/rules/plain-english.md`.

## Stack

See `docs/stack.md` (verified 2026-10-22): Next.js 16 + TypeScript, MDX lessons, JSON question banks, Tailwind v4 + shadcn/ui, Motion, Shiki, Zustand persist, Gemini free tier for AI grading, Vercel Hobby.

## Planned layout

```
content/                     # data model: docs/curriculum-schema.md
  levels.json                # the 5 levels, in order
  units.json                 # units in order, each with its topics in order (+ bonus side branches)
  rules.json                 # pass marks, exam sizes
  topics/<topic-id>/
    topic.json               # title, level, goal, prerequisites, status, version, sources
    lesson.mdx               # lesson, exports `meta`
    questions.json           # question bank
docs/                        # decisions and plans
scripts/validate-curriculum.mjs  # run: node scripts/validate-curriculum.mjs
scripts/curriculum-report.mjs    # rebuilds docs/topics.md — run after any curriculum change
scripts/run-swift-examples.mjs   # compiles every Swift example in a lesson and checks its output block
scripts/build-path-page.mjs      # rebuilds docs/path-map.html — then republish the Path Map artifact (URL in PROGRESS.md)
.claude/rules/               # always-on and path-scoped rules
.claude/skills/              # lesson-writer, exam-writer, content-fact-checker, diagram-animator
```

## Working rules

- **Web-search every fact** before stating or writing it — see `.claude/rules/research.md`. Never rely on training data for APIs, versions, tools or limits.
- **Ask, don't guess** — when something is unclear or is the user's choice, ask simple questions first. See `.claude/rules/ask-dont-guess.md`.
- Content rules: `.claude/rules/content.md`. Question rules: `.claude/rules/questions.md`. UI rules: `.claude/rules/design.md`.
- Use the project skills for content work: `/lesson-writer`, `/exam-writer`, `/content-fact-checker`, `/diagram-animator`.
- A PostToolUse hook validates files under `content/` after every edit.
