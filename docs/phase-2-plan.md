# Phase 2 Plan — Pilot Topic

**Goal:** build one topic completely, from research to a clickable prototype, to test the lesson and exam format before we write 164 topics. Every step ends with something you review and approve before the next one starts.

Live status is in [PROGRESS.md](../PROGRESS.md).

## Decisions (from the user, 2026-10-22)

| Question | Decision |
|---|---|
| Pilot topic | **Structs vs Classes** (`structs-vs-classes`, fresh level) |
| How to preview it | A **clickable prototype page** (private artifact) with the real lesson, animation and exam |
| How learners see code results | **Code is shown with its output.** A link to Swift Playground for people who want to try it |

**Fact for this phase:** this Mac has **Swift 6.4** (Xcode 27). Every code example and every "what does this print?" question is **run with the real compiler** before you see it.

## Steps

| Step | What we do | You get | You decide |
|---|---|---|---|
| **2.1 Lesson format** | Check the lesson template against learning research (web search) and your choices. Add a "code + output" block. Decide the final sections and the components a lesson can use | Updated template + `docs/lesson-format.md` | Approve the sections and components |
| **2.2 Topic research** | Research Structs vs Classes from official sources (the Swift book, Apple's "Choosing Between Structures and Classes", Swift 6.4 changes) and how interviews ask it at each level | `docs/pilot/research.md` | — |
| **2.3 Write the lesson** | Use `/lesson-writer` to write `lesson.mdx` in simple English. Run every code example | The lesson file (status `draft`) | Wording, analogy, depth |
| **2.4 Build the animation** | Use `/diagram-animator` to build the "copy vs shared" animation, with step controls and a reduced-motion version | The animation as a prototype page | Approve the animation |
| **2.5 Write the exam** | Use `/exam-writer` to write 30+ questions of all 4 types, with explanations and rubrics. Run every code question | `questions.json` | Question style and difficulty |
| **2.6 Fact-check** | Use `/content-fact-checker` against official sources, plus simple English and copyright checks. Run all code again | A fact-check report, with fixes applied | — |
| **2.7 Prototype page** | One page: lesson, animation and a 10-question exam with a result screen. Browser-graded questions are scored live. For written and code answers, I test each rubric with good, average and weak sample answers | Prototype link + rubric test notes | Your feedback on the whole experience |
| **2.8 Improve once** | Apply your feedback as **version 2**, with a `changes` entry. This proves the edit workflow | Version 2 of the topic | Approve the result |
| **2.9 Lessons learned** | Update the template, rules and skills with what we learned. Run all checks. Save with Git | Updated rules and skills, a commit | Approve Phase 2 |

## Rules for every step

- Web-search every fact ([research.md](../.claude/rules/research.md)). Simple English ([plain-english.md](../.claude/rules/plain-english.md)). Ask, don't guess ([ask-dont-guess.md](../.claude/rules/ask-dont-guess.md)).
- Update [PROGRESS.md](../PROGRESS.md) as each step starts, finishes and is approved.
- The prototype is for learning, not the real app. The app is built in Phase 5, after the design work in Phase 3.

## Questions we expect during Phase 2

- **Step 2.1:** Should every lesson have the same sections, or can some be optional? How long should a lesson be?
- **Step 2.4:** What style for diagrams: simple shapes, or iPhone-like visuals?
- **Step 2.7:** Should learners see the right answer at once after each question, or only at the end of the exam?
