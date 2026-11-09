# iOS Interview Prep

Instructions for every AI coding agent on this project (Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, Windsurf and others). This file is the single source. `CLAUDE.md` imports it; do not copy its text into other agent files.

App name: **see `config/brand.json`** (currently "Prep Stops"). The name may change, so never hard-code it — `node scripts/check-brand.mjs` checks this.

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

## Rules every agent must read

The detailed rules live in `.claude/rules/` (also at `.agents/rules/`, a symlink to the same files). Claude Code loads them on its own; **other agents must open the matching file before they work on that kind of file**.

| Before you… | Read |
|---|---|
| State or write any fact (APIs, versions, tools, limits, URLs) | `.claude/rules/research.md` — web-search every fact; never rely on training data |
| Make a choice that belongs to the user (product, design, scope) | `.claude/rules/ask-dont-guess.md` — ask simple multiple-choice questions first |
| Write any text a learner sees (lessons, questions, UI, feedback) | `.claude/rules/plain-english.md` — simple English for a CEFR B1 reader |
| Edit `content/**` (lessons, topics, curriculum) | `.claude/rules/content.md` |
| Edit `questions.json` | `.claude/rules/questions.md` |
| Build or change any UI | `.claude/rules/design.md` |
| Write web app code (Next.js, Phase 5) | `.claude/rules/nextjs.md` — read the docs bundled in `node_modules/next/dist/docs/` first |
| Touch learner progress or the store | `.claude/rules/progress-store.md` |
| Write app code or tests | `.claude/rules/testing.md` — every product rule has a test |

## Workflows

The step-by-step workflows are in `.claude/skills/<name>/SKILL.md` (also at `.agents/skills/<name>/SKILL.md`, a symlink to the same files, so agents that read `.agents/skills/` find them). Claude Code runs them as `/name`; other agents should open the file and follow it. Edit the files under `.claude/` — the `.agents/` paths are symlinks, not copies.

| Workflow | File |
|---|---|
| Full topic, from research to review page | `.claude/skills/new-topic/SKILL.md` (steps in `docs/topic-workflow.md`) |
| Write a lesson | `.claude/skills/lesson-writer/SKILL.md` |
| Write a question bank | `.claude/skills/exam-writer/SKILL.md` |
| Fact-check a topic | `.claude/skills/content-fact-checker/SKILL.md` |
| Build a lesson diagram | `.claude/skills/diagram-animator/SKILL.md` |
| Review learner text as a B1 reader | `.claude/agents/plain-english-reviewer.md` |
| Build one web app screen from its approved design | `.claude/skills/build-screen/SKILL.md` |
| Check a screen (errors, 375px, dark mode, axe, keyboard) | `.claude/skills/ui-check/SKILL.md` |
| Review app code for accessibility | `.claude/agents/a11y-reviewer.md` |
| Check rule logic and its tests against the product rules | `.claude/agents/rules-tester.md` |

## Checks to run

Claude Code runs some of these automatically through hooks (`.claude/settings.json`). **Other agents must run them by hand** after the matching change:

| After you change… | Run |
|---|---|
| `content/levels.json`, `units.json`, `rules.json` or any `topic.json` | `node scripts/validate-curriculum.mjs`, then `node scripts/curriculum-report.mjs` |
| A `lesson.mdx` | `node .claude/hooks/check-lesson.mjs <file>`, `node .claude/hooks/check-plain-english.mjs <file>`, `node scripts/run-swift-examples.mjs <file>` |
| A `questions.json` | `node .claude/hooks/check-plain-english.mjs <file>`, `node scripts/run-swift-examples.mjs <file>` |
| `config/brand.json`, `config/design-tokens.json` or a page builder | `node scripts/check-brand.mjs` |

**Never edit generated files by hand.** Edit the source and run its builder:

| Generated file | Source and builder |
|---|---|
| `config/generated/tokens.css`, `docs/design/design-system.html` | `config/brand.json` + `config/design-tokens.json` → `node scripts/build-design-system.mjs` |
| `docs/topics.md` | `content/` → `node scripts/curriculum-report.mjs` |
| `docs/path-map.html` | `node scripts/build-path-page.mjs` |
| `docs/design/path-map-prototype.html` | `node scripts/build-path-prototype.mjs` |
| `docs/design/exam-prototype.html` | `node scripts/build-exam-prototype.mjs` |
| `docs/design/start-prototype.html` | `node scripts/build-start-prototype.mjs` |
| `docs/design/lesson-prototype.html` | `cd prototype && node build-lesson.mjs <topic-id>` |
| `docs/design/walkthrough.html` | `node scripts/build-walkthrough.mjs` |
| `docs/topics/<id>/review.html`, `docs/pilot/prototype-<id>.html` | `cd prototype && node build.mjs <topic-id>` |

## Product rules

- Levels are **cumulative**: a senior path includes fresh, junior and mid topics. Earlier-level topics can be skipped by passing a short placement test.
- A topic passes at **70%**. Passing unlocks the next topic. Retakes are unlimited and draw new questions.
- The path goes **by level, then by unit**. Order inside a unit is fixed. Bonus topics sit on a side branch and never block.
- Skip tests exist **per unit** and **per level**, only for stages **below** the learner's level; they reuse topic questions and pass at **80%**. Skipped topics count with the skip-test score.
- Locked topics are **fully locked** until the topic before is passed or skipped. Answer options are **shuffled** in every exam.
- **Topic score** = best exam score. **Progress** = done ÷ main topics. **Path score** = average of done main topics; at the end it is the total result. Bonus topics count in neither.
- A learner can **change level any time**; progress is kept. When a passed topic is updated, it shows an "Updated" badge and note; the pass stays.
- Screens and flows: `docs/ux/flows.md`.
- One path teaches both SwiftUI and UIKit. No Objective-C. iPhone and iPad only. Apple tools; third-party libraries are only mentioned.
- Every topic cites 1–3+ checked sources marked `official` or `community`; the policy is in `content/rules.json` (`sources`).
- Question types: `mcq`, `code-reading`, `written`, `code-write`. The first two are graded in the browser; the last two are graded by AI with a rubric.
- English only — and **simple English**. Learners come from the whole world with different English levels. All learner-facing text follows `.claude/rules/plain-english.md`.

## Stack

See `docs/stack.md` (verified 2026-10-22): Next.js 16 + TypeScript, MDX lessons, JSON question banks, Tailwind v4 + shadcn/ui, Motion, Shiki, Zustand persist, Gemini free tier for AI grading, Vercel Hobby.

## Layout

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
config/brand.json            # the ONLY place for app name, tagline, fonts and brand colors
config/design-tokens.json    # type scale, spacing, radius, shadows, motion, stage colors
scripts/                     # validators, reports and page builders (see the tables above)
prototype/                   # MDX lesson builders (npm install in prototype/ first)
.claude/rules/               # detailed rules (see "Rules every agent must read")
.claude/skills/              # workflows (see "Workflows")
.claude/agents/              # helper agents
.claude/hooks/               # automatic checks for Claude Code
.agents/rules, .agents/skills # symlinks to .claude/rules and .claude/skills, for other agents
```

## Git

- Commit messages: `type: lowercase title` in the imperative, no period at the end (for example `feat: add level picker`), with a short body when useful. Valid types: feat, fix, docs, style, refactor, remove, perf, test, change, ci.
- Commit or push only when the user asks.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
