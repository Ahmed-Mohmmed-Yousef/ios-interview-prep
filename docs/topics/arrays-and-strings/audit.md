# Audit: `arrays-and-strings`

- **Date**: 2026-11-14
- **Result**: PASS (`independent: true`)
- **Baseline**: Swift 6.4 (verified locally with `swiftc` 6.4.2), Xcode 27.2
- **Versions**: `topic.json` v2, `questions.json` v2 (`lastVerified: 2026-11-14`)

## Sources Checked

- [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array) — HTTP 200
- [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string) — HTTP 200
- [Tech Interview Handbook: Array Cheatsheet](https://www.techinterviewhandbook.org/algorithms/array/) — HTTP 200
- [Tech Interview Handbook: String Cheatsheet](https://www.techinterviewhandbook.org/algorithms/string/) — HTTP 200
- [Apple Support: Xcode](https://developer.apple.com/support/xcode/) — Xcode 27.2 stable baseline

## Findings and Fixes

| # | Area | Kind | What was found | Fix applied |
|---|---|---|---|---|
| 1 | `lesson.mdx` meta & `topic.json` | `outdated` | `baseline.xcode` was `"27"`, `lastVerified` was `"2026-11-09"`. | Updated `xcode` to `"27.2"`, aligned `lastVerified` to `"2026-11-14"`, and bumped `topic.json` and `questions.json` to v2 with a `changes` note. |
| 2 | `lesson.mdx` (`Trap 3`) & `questions.json` (`q9`) | `wrong` | Claimed `result += text` in a loop degrades to $O(n^2)$ in Swift. In Swift, `+=` on a uniquely owned `String` uses exponential growth and takes amortized $O(n)$ total time; $O(n^2)$ copies happen with repeated `+` (`result = result + text`) or mutating shared CoW copies. | Fixed `Trap 3` and `q9` to distinguish uniquely owned `+=` (amortized $O(n)$) from repeated `+` or shared CoW copies ($O(n^2)$), while still recommending `joined(separator:)` or `reserveCapacity`. |
| 3 | `lesson.mdx` (`The simple idea`, `In code`) | `untaught` | Prefix sum arrays (`q14`, `q23`) and `reverse()` vs `reversed()` (`q15`) were tested without being taught in the lesson. | Added prefix sum arrays and `reverse()` vs `reversed()` to `The simple idea` and added a verified Swift `<CodeExample>` in `In code`. |
| 4 | `lesson.mdx` (`Trap 1`) | `untaught` | Parent buffer memory retention of `ArraySlice`/`Substring` was only mentioned in Senior interview notes (`q11`). | Added the parent-buffer retention note and `Array(slice)` / `String(substring)` conversion to `Trap 1`. |
| 5 | `lesson.mdx` structure | `rules` | `<TryIt>` appeared before `## Interview traps` instead of after `## Recap`. | Moved `<TryIt>` after `## Recap`. |
| 6 | `questions.json` (`q23`) | `rules` | `q23` used force unwrapping `prefix.last!`. | Replaced with `(prefix.last ?? 0)` and re-verified with `swiftc`. |
| 7 | `questions.json` (`q24`–`q28`) | `rules` | Written prompts asked for `2–4 sentences` instead of `2–5 sentences`. | Updated prompts to `2–5 sentences`. |
| 8 | `questions.json` distractors (`q1`, `q2`, `q5`, `q10`–`q13`) | `rules` | Several joke or implausible distractors (e.g., GPU strings, sleeping 1 ms, screen freezing). | Replaced with plausible Swift/algorithm misconceptions. |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/arrays-and-strings/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/arrays-and-strings/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/arrays-and-strings/questions.json` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/arrays-and-strings/topic.json` — passed
- `node scripts/check-coverage.mjs arrays-and-strings --strict` — `0 errors, 0 warnings`
- `node scripts/run-swift-examples.mjs content/topics/arrays-and-strings/lesson.mdx` — `3 passed, 0 failed`
- `node scripts/run-swift-examples.mjs content/topics/arrays-and-strings/questions.json` — `11 passed, 0 failed`
- `cd prototype && node build.mjs arrays-and-strings` — rebuilt `docs/topics/arrays-and-strings/review.html`
- `node scripts/check-publish-gate.mjs arrays-and-strings --code` — passed
