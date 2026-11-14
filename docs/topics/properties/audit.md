# Audit: `properties`

- **Date**: 2026-11-14
- **Result**: PASS (`independent: true`)
- **Baseline**: Swift 6.4 (verified locally with `swiftc` 6.4.2), Xcode 27.2
- **Versions**: `topic.json` v2, `questions.json` v2 (`lastVerified: 2026-11-14`)

## Sources Checked

- [The Swift Programming Language: Properties](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties) — HTTP 200
- [Apple Support: Xcode](https://developer.apple.com/support/xcode/) — Xcode 27.2 stable baseline

## Findings and Fixes

| # | Area | Kind | What was found | Fix applied |
|---|---|---|---|---|
| 1 | `lesson.mdx` meta & `topic.json` | `outdated` | `baseline.xcode` was `"27"`, `lastVerified` was `"2026-11-09"`. | Updated `xcode` to `"27.2"` and aligned `lastVerified` to `"2026-11-14"`. Bumped `topic.json` and `questions.json` to v2 with a `changes` note. |
| 2 | `lesson.mdx` observers | `wrong` | Observer phrasing did not clearly state that `willSet` and `didSet` run every time a property is set, even if the new value equals the current value. | Explicitly stated that `willSet` and `didSet` run on every set even when the value stays the same. |
| 3 | `lesson.mdx` (`let` structs vs classes) | `untaught` | `let` constant struct vs `let` constant class stored property rules (`q8`, `q16`, `q26`) were not stated clearly together in the lesson. | Added clear explanation and verified behavior for `let` struct vs `let` class stored properties. |
| 4 | `lesson.mdx` (`lazy`) | `untaught` | Non-thread-safety of `lazy var` across simultaneous threads (`q5`, `q14`, `q25`) was not clearly explained. | Documented that `lazy var` is not thread-safe if accessed by multiple threads before initialization completes. |
| 5 | `lesson.mdx` (`get`/`set`, `static let`, `didSet`, computed observers) | `untaught` | Computed `get`/`set` (`newValue`), lazy thread-safe `static let` type properties, `didSet` self-assignment non-recursion, and no observers on computed properties (`q4`, `q7`, `q10`, `q13`, `q15`, `q18`–`q23`, `q27`, `q28`, `q30`, `q31`) needed explicit lesson coverage. | Added computed `get`/`set` (`newValue`) example and explanation, `static let` lazy thread-safe note, `didSet` self-assignment rule, and a Trap card on computed property observers. |
| 6 | `lesson.mdx` structure | `rules` | `<TryIt>` appeared before `## Interview traps` instead of after `## Recap`. | Moved `<TryIt>` to after `## Recap`. |
| 7 | `lesson.mdx` & `questions.json` | `hardEnglish` | Some sentences were dense or above CEFR B1 reading level. | Rewrote sentences in plain B1 English (`<= 25` words, no contractions) and verified with `check-plain-english.mjs`. |
| 8 | `questions.json` (`q19`) | `rules` | Option length imbalance on `q19`. | Balanced option lengths so the correct option is within `1.5x` of the longest distractor. |
| 9 | `questions.json` (`q24`–`q28`) | `rules` | Written prompts asked for `2–4 sentences` instead of `2–5 sentences`. | Updated prompts to `2–5 sentences`. |
| 10 | `questions.json` (`q12`, distractors) | `rules` | Difficulty mix and several joke/out-of-scope distractors needed cleanup. | Adjusted `q12` difficulty to `1` (10 easy / 15 medium / 6 hard across 31 live questions) and replaced weak/joke distractors with plausible ones. |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/properties/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/properties/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/properties/questions.json` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/properties/topic.json` — passed
- `node scripts/check-coverage.mjs properties --strict` — `0 errors, 0 warnings`
- `node scripts/run-swift-examples.mjs content/topics/properties/lesson.mdx` — `2 passed, 0 failed`
- `node scripts/run-swift-examples.mjs content/topics/properties/questions.json` — `11 passed, 0 failed`
- `cd prototype && node build.mjs properties` — rebuilt `docs/topics/properties/review.html`
- `node scripts/check-publish-gate.mjs properties --code` — passed
