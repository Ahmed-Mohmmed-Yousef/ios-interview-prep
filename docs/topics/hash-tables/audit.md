# Audit: `hash-tables`

- **Date**: 2026-11-14
- **Result**: PASS (`independent: true`)
- **Baseline**: Swift 6.4 (verified locally with `swiftc` 6.4.2), Xcode 27.2
- **Versions**: `topic.json` v2, `questions.json` v2 (`lastVerified: 2026-11-14`)

## Sources Checked

- [Dictionary (Swift)](https://developer.apple.com/documentation/swift/dictionary) — HTTP 200
- [Set (Swift)](https://developer.apple.com/documentation/swift/set) — HTTP 200
- [Hashable (Swift)](https://developer.apple.com/documentation/swift/hashable) — HTTP 200
- [Tech Interview Handbook: Hash Table Cheatsheet](https://www.techinterviewhandbook.org/algorithms/hash-table/) — HTTP 200
- [Apple Support: Xcode](https://developer.apple.com/support/xcode/) — Xcode 27.2 stable baseline

## Findings and Fixes

| # | Area | Kind | What was found | Fix applied |
|---|---|---|---|---|
| 1 | `lesson.mdx` meta & `topic.json` | `outdated` | `baseline.xcode` was `"27"`, `lastVerified` was `"2026-11-09"`. | Updated `xcode` to `"27.2"`, aligned `lastVerified` to `"2026-11-14"`, and bumped `topic.json` and `questions.json` to v2 with a `changes` note. |
| 2 | `lesson.mdx` (`<InterviewAnswer level="senior">`) | `wrong` | Falsely claimed Swift uses "flat hash tables with control bytes for high cache locality and SIMD probing" (that describes SwissTable/Abseil, not Swift). | Fixed to Swift's actual open addressing with linear probing, an inline bitmap for occupied buckets, contiguous keys/values arrays, power-of-two sizes, and no tombstones (resizing around 75% load). Also clarified open addressing + linear probing in `The simple idea`. |
| 3 | `lesson.mdx` (`The simple idea`, `In code`, `Trap 2`) | `untaught` | Automatic `Hashable` synthesis (`q10`), SipHash collision DoS protection (`q14`), and key APIs tested in questions (`Set.insert(_:).inserted`, `Set.intersection`, `Dictionary(_:uniquingKeysWith:)`, `removeValue(forKey:)`, `reserveCapacity`, `updateValue`) were missing from the main lesson. | Added automatic `Hashable` synthesis to `The simple idea`, SipHash collision DoS protection to `Trap 2`, and a verified Swift `<CodeExample>` + bullet guide in `In code`. |
| 4 | `lesson.mdx` structure | `rules` | `<TryIt>` appeared before `## Interview traps` instead of after `## Recap`. | Moved `<TryIt>` after `## Recap`. |
| 5 | `questions.json` (`q19`) | `untaught` | `q19` tested optional chaining (`counts["swift"]? += 1`) before `optional-chaining` is taught and used `"objc"` in key data. | Replaced `q19` in place with `Dictionary.updateValue(_:forKey:)`, verified `"1 true"` output with `swiftc`. |
| 6 | `questions.json` (`q3`, `q13`, `q17`, `q23`, difficulty mix) | `rules` | `lessonSection` pointed to non-explanatory sections (`See it`, `The simple idea`, `How to answer in the interview`), and difficulty mix had `61%` medium (`warn` in `check-coverage`). | Aligned `lessonSection` to where each concept is taught (`The simple idea` / `In code`), re-leveled `q14`, `q20`, `q25`, and `q26` to difficulty `3` (`10` easy / `15` medium / `6` hard across 31 live questions). |
| 7 | `questions.json` distractors (`q4`, `q12`, `q13`) | `rules` | Joke or Objective-C distractors (`autorelease pools`, `ARC deallocates empty buckets`, `expire daily`). | Replaced with plausible Swift misconceptions. |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/hash-tables/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/hash-tables/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/hash-tables/questions.json` — passed
- `node .claude/hooks/check-plain-english.mjs content/topics/hash-tables/topic.json` — passed
- `node scripts/check-coverage.mjs hash-tables --strict` — `0 errors, 0 warnings`
- `node scripts/run-swift-examples.mjs content/topics/hash-tables/lesson.mdx` — `3 passed, 0 failed`
- `node scripts/run-swift-examples.mjs content/topics/hash-tables/questions.json` — `11 passed, 0 failed`
- `cd prototype && node build.mjs hash-tables` — rebuilt `docs/topics/hash-tables/review.html`
- `node scripts/check-publish-gate.mjs hash-tables --code` — passed
