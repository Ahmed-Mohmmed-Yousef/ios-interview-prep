# Audit: inlinearray-and-span (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2, tested with and without `-default-isolation MainActor`). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"`, `ios: "27"` | OUTDATED | `developer.apple.com/support/xcode/` (`Xcode 27.2`) | Updated `baseline` to `{ swift: "6.4", xcode: "27.2", ios: "27.2" }` |
| `How to answer` (senior) | Called `InlineArray` a "fixed-size value collection" | WRONG | Apple `InlineArray` docs; `swift` check (`a is any Collection == false`) | Changed to "fixed-size value array" and explained in `The simple idea` that `InlineArray` does not conform to `Collection` or `Sequence` (it conforms to `Iterable` in Swift 6.4) |
| `The simple idea`, `In code`, `Interview traps` | `~Copyable`, `borrowing`, out-of-bounds trap (`q5`), and `for-in` over `InlineArray` (`q30`) lacked explanation or code demo | UNTAUGHT | Apple `InlineArray` / `Span` docs; `swiftc` | Explained `~Copyable`, `borrowing`, iOS 26.0+ availability, and runtime trap on out-of-bounds `Span` access; added a `for value in fixed` loop in the first `<CodeExample>` |
| `The simple idea`, `How to answer` (staff) | "eagerly", "buffer overflows", "heap churn or ARC traffic", "preserving" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Simplified prose and explained "eagerly (right away)" and "buffer overflows" in B1 English; split sentences to stay under 25 words |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q1`, `q3`, `q4`, `q5`, `q7`, `q9`, `q11`, `q12`, `q16` | Weak, Objective-C (`NSArray`), or invented (`ReadSpan`, `StaticSpan`) distractors | RULES | `.claude/rules/questions.md`, `AGENTS.md` | Replaced with realistic Swift distractors (such as `MutableSpan`, `MutableRawSpan`, `Copyable`, `Array`, `@escaping`) |
| `q11` | Option length ratio `1.48` | RULES | `.claude/rules/questions.md` | Shortened option `c` text for tighter option-length balance |
| `q26`, `q29`, `q30`, `q31`, `q32` | Prompt vs rubric alignment (`q26` did not ask what `Span` is; `q29` limited to "internal" APIs; `q30`–`q32` did not explicitly ask to call `run()`) | RULES | `.claude/rules/questions.md` | Aligned prompts and rubric criteria |
| `q1`, `q10`, `q22`, `q26`, `q32` | "enclosing type", untaught `Sendable`, "occupy", "ensures", "Scopes" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Replaced with "parent type", "concurrency", "use", "makes sure", and "Puts" |
| `questions.json` metadata | `version: 1` | RULES | `docs/audit/README.md` | Bumped `questions.json` to `version: 2`; kept `lastVerified: "2026-11-14"` synced across all files and left `topic.json` `status: "review"` |

## Checks run (2026-11-14)

- `node scripts/run-swift-examples.mjs content/topics/inlinearray-and-span/lesson.mdx` (2 passed, 0 failed)
- `node scripts/run-swift-examples.mjs content/topics/inlinearray-and-span/questions.json` (11 passed, 0 failed)
- `swiftc -swift-version 6 -default-isolation MainActor` on all lesson examples and question snippets (13 passed)
- `node .claude/hooks/check-lesson.mjs` and `node .claude/hooks/check-plain-english.mjs` (0 errors)
- `.claude/hooks/validate-content.sh` on `lesson.mdx` and `questions.json` (passed)
- `node scripts/validate-curriculum.mjs` (passed)
- `node scripts/check-coverage.mjs inlinearray-and-span --strict` (0 errors, 0 warnings)
- `node scripts/check-publish-gate.mjs inlinearray-and-span --code` (`ok   inlinearray-and-span`)
