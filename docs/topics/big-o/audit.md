# Audit: `big-o`

- **Date**: 2026-11-14
- **Result**: PASS (`independent: true`)
- **Baseline**: Swift 6.4 (verified locally with `swiftc` 6.4.2), Xcode 27.2
- **Versions**: `topic.json` v2, `questions.json` v2 (`lastVerified: 2026-11-14`)

## Sources Checked

- [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array) — HTTP 200
- [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string) — HTTP 200
- [apple/swift-algorithms (GitHub)](https://github.com/apple/swift-algorithms) — HTTP 200
- [Tech Interview Handbook: Study Cheatsheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/) — HTTP 200
- [Apple Support: Xcode](https://developer.apple.com/support/xcode/) — Xcode 27.2 stable baseline

## Findings and Fixes

| # | Area | Kind | What was found | Fix applied |
|---|---|---|---|---|
| 1 | `lesson.mdx` meta & `topic.json` | `outdated` | `baseline.xcode` was `"27"`, `lastVerified` was `"2026-11-09"`. | Updated `xcode` to `"27.2"`, aligned `lastVerified` to `"2026-11-14"`, and bumped `topic.json` and `questions.json` to v2 with a `changes` note. |
| 2 | `lesson.mdx` (`The simple idea`) | `wrong` | Stated Big-O focuses only on worst-case without noting average-case usage (such as hash lookups). | Clarified that interviews usually focus on worst-case, while average-case costs also use Big-O. |
| 3 | `lesson.mdx` (`In code`) | `untaught` | `squareAll` used `result.reserveCapacity(numbers.count)` without explaining what `reserveCapacity` does (`q8`, `q31`). | Added explanation of `reserveCapacity` avoiding repeated array resizing. |
| 4 | `lesson.mdx` (`Interview traps`) | `untaught` | `string.isEmpty` was not explained as checking `startIndex == endIndex` (`q26`), `Set` lookup usage (`contains`/`insert`) needed a concrete code pattern (`q30`), and rewriting simple recursion iteratively for $O(1)$ space (`q28`) was missing. | Added `startIndex == endIndex` for `string.isEmpty`, concrete `Set<Int>` usage (`contains`/`insert`), and iterative `for`/`while` rewrite for $O(1)$ space. |
| 5 | `lesson.mdx` structure & English | `rules` | `<TryIt>` appeared before `## Interview traps` instead of after `## Recap`, and some phrasing was above B1 plain English. | Moved `<TryIt>` after `## Recap` and simplified sentences (`<= 25` words). |
| 6 | `questions.json` (`q24`–`q28`) | `rules` | Written questions asked for `2–4 sentences` instead of `2–5 sentences`; `q24` prompt did not ask how Big-O simplifies formulas (required by rubric criterion 2); `q28` cited `In code` instead of `Interview traps`. | Updated prompts to `2–5 sentences`, updated `q24` prompt to ask how Big-O simplifies formulas, and updated `q28` `lessonSection` to `"Interview traps"`. |
| 7 | `questions.json` distractors (`q1`, `q5`, `q14`, `q15`) | `rules` | Several joke or off-domain distractors (battery power, cloud servers, encrypted string buffers, converting Int to String). | Replaced those distractors with plausible Swift/algorithm misconceptions. |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/big-o/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/big-o/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/big-o/questions.json` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/big-o/topic.json` — passed
- `node scripts/check-coverage.mjs big-o --strict` — `0 errors, 0 warnings`
- `node scripts/run-swift-examples.mjs content/topics/big-o/lesson.mdx` — `2 passed, 0 failed`
- `node scripts/run-swift-examples.mjs content/topics/big-o/questions.json` — `11 passed, 0 failed`
- `cd prototype && node build.mjs big-o` — rebuilt `docs/topics/big-o/review.html`
- `node scripts/check-publish-gate.mjs big-o --code` — passed
