# Audit: `closures-basics`

- **Date:** 2026-11-14
- **Mode:** `fix` (independent audit)
- **Result:** `pass`
- **Topic version:** 1 → 2 (`lastVerified`: `2026-11-14`)
- **Bank version:** 1 → 2 (`31` live questions, `0` retired)
- **Baseline verified:** Swift `6.4` (`swiftlang-6.4.2.1.9`), Xcode `27.2`, iOS `27.2`

## Official sources checked

- *The Swift Programming Language: Closures* — `https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/` (HTTP 200 OK)

## Findings and fixes

| Kind | Where | Finding | Fix applied | Status |
|---|---|---|---|---|
| Outdated | `topic.json`, `lesson.mdx`, `questions.json` | `baseline` had `xcode: "27", ios: "27"`, `lastVerified` was `2026-11-09`, and source URLs missed the trailing `/`. | Updated baseline to Swift `6.4` / Xcode `27.2` / iOS `27.2`, aligned `lastVerified` to `2026-11-14`, and updated source URLs. | Fixed |
| Untaught | `lesson.mdx`, `questions.json` (`q11`) | Implicit `return` in single-expression closures was only mentioned in the junior `InterviewAnswer`, not in `The simple idea` or `In code`. | Added implicit `return` explicitly to `The simple idea` and `In code`. | Fixed |
| Untaught | `lesson.mdx`, `questions.json` (`q17`, `q18`, `q28`, `q30`) | `map` and `filter` were tested heavily (`q17`, `q18`, `q28`, `q30`) without a clear explanation or example in `In code`. | Explained `map` and `filter` in `In code` and added a Swift 6 verified `<CodeExample>`. | Fixed |
| Untaught | `questions.json` (`q14`, `q26`, `q28`) | `q14` cited untaught generic name `Element`; `q26` referenced `call stack`; `q28` referenced `custom completion handlers`. | Replaced with `(String, String) -> Bool`, `finishes running`, and `sorted`. | Fixed |
| Untaught | `questions.json` (`q27`) | `lessonSection` pointed to `How to answer in the interview` instead of the teaching section. | Changed `lessonSection` to `The simple idea`. | Fixed |
| Rules | `questions.json` (`q24`–`q28`) | Written questions asked for `2–4 sentences` instead of `2–5 sentences`. | Updated `q24`–`q28` prompts to `Answer in 2–5 sentences.` | Fixed |
| Rules | `lesson.mdx`, `questions.json` (`q1`, `q2`, `q8`, `q10`, `q11`) | `<TryIt>` sat above `Interview traps`, and the Hook plus `q1`/`q2`/`q8`/`q10`/`q11` had implausible/joke distractors (OS threads, hardware registers, disk storage). | Moved `<TryIt>` after `Recap` and replaced distractors with believable Fresh-level Swift mistakes. | Fixed |
| Hard English | `lesson.mdx`, `questions.json` | Used B2/C1 terms (`functionality`, `anonymously`, `underlying`, `signify`, `idiomatic`, `redundant`, `identical`, `delimit`, `exclusively`, `invocation`, `yielding`). | Rewrote prose, options, explanations, model answers, and rubrics in clear B1 English. | Fixed |

## Verification

- `node scripts/run-swift-examples.mjs content/topics/closures-basics/lesson.mdx` — passed (`3` Swift examples, verified under `swift -swift-version 6` and `swiftc -swift-version 6 -default-isolation MainActor`)
- `node scripts/run-swift-examples.mjs content/topics/closures-basics/questions.json` — passed (`11` verified code snippets)
- `node .claude/hooks/check-lesson.mjs content/topics/closures-basics/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs` (`lesson.mdx`, `questions.json`, `topic.json`) — passed
- `validate-content.sh` (`lesson.mdx`, `questions.json`) — passed
- `node scripts/validate-curriculum.mjs` — passed
- `node scripts/check-coverage.mjs closures-basics` — `0 errors, 0 warnings`
- `node scripts/check-publish-gate.mjs closures-basics --code` — `ok closures-basics`
- `cd prototype && node build.mjs closures-basics` — rebuilt `docs/topics/closures-basics/review.html`
