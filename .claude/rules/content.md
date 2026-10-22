---
paths:
  - "content/**/*.mdx"
  - "content/**/*.md"
  - "content/**/*.json"
---

# Curriculum files
- The data model and the rules for adding, moving and retiring topics are in `docs/curriculum-schema.md`. Follow its "How to add or change things" table.
- Never change a topic `id` and never delete a topic folder — learner progress points to them.
- Every topic can be edited and improved at any time. Follow "Editing and improving topics" in `docs/curriculum-schema.md` (what can change, when to bump `version`, how to split, merge or retire).

# Lesson content rules

## Accuracy
- Every technical claim is verified against an official source **in this session** (see `research.md`). List those URLs in `meta.sources`.
- Baseline: **Swift 6.4, Xcode 27, iOS 27** (verified 2026-10-22 on developer.apple.com/support/xcode). Mention when behavior differs in older versions that interviewers still ask about.
- **Check what new Xcode project defaults change.** For example, new app projects put code on the main actor by default, which changes which classes are `Sendable`. When a fact depends on a project setting, say which setting it is.
- Never present a deprecated API as current. If an older API is still common in interviews (e.g. GCD, `ObservableObject`), say what replaced it and when.
- Code must compile under Swift 6 language mode (strict concurrency) unless the lesson is explicitly showing a pre-Swift-6 pattern — then label it.

## Copyright
- Write explanations in original words. Never copy Apple Developer Documentation text.
- The Swift book (swiftlang/swift-book) is Apache-2.0: short quotes are allowed with attribution.
- Always link to the official source so learners can go deeper.

## Voice
- **Plain English is required** — follow `.claude/rules/plain-english.md` (B1 reader, sentences of 25 words or fewer, common words, no idioms).
- Friendly, simple, direct. Explain each technical term the first time it appears.
- One idea per paragraph. Prefer an analogy plus a diagram over a long paragraph.
- Write for the topic's level: fresh = no prior knowledge assumed; staff = trade-offs, scale, and decision-making.

## Structure
Every lesson follows `docs/lesson-format.md` and the template in `.claude/skills/lesson-writer/template.mdx`: the same core sections in the same order, optional extras only from the list in the format doc, and the same `meta` export. Don't invent new sections or components; propose them to the user instead. Every Swift example shows its real output, checked with the Swift compiler.
