# Content Audit: `noncopyable-types`

Date: 2026-11-14
Checker: `content-fact-checker` (independent)
Baseline: Swift 6.4 (tested with Apple Swift 6.4.2), Xcode 27.2

## Findings and fixes

| Location | Claim | Verdict | Evidence URL / Tool | Fix applied |
|---|---|---|---|---|
| `lesson.mdx` ("The simple idea") | "a noncopyable `struct` or `enum` can define a `deinit`" | WRONG | `swiftc -swift-version 6` (`error: deinitializers are not yet supported on noncopyable enums`); SE-0390 | Changed to state that a noncopyable `struct` can define `deinit` and noncopyable enums do not support `deinit` yet. |
| `lesson.mdx` ("Recap") | "Adding `: ~Copyable` to a `struct` or `enum` enforces single ownership at compile time and allows a `deinit`." | WRONG | `swiftc -swift-version 6` | Split so `deinit` is stated only for noncopyable structs. |
| `lesson.mdx` ("The simple idea") | "Two extra keywords complete the picture:" followed by 3 bullets (`consume`, `discard self`, `copy`) | WRONG | Direct file inspection | Changed "Two extra keywords" to "Three more keywords". |
| `lesson.mdx` ("The simple idea") | `consuming` says "The caller cannot use that value again, or the compiler reports an error." (without scoping to noncopyable values) | WRONG | `swiftc -swift-version 6` (copyable `String` passed to `consuming` still usable by caller unless `consume` is used); SE-0377 | Scoped to "For a noncopyable value, the caller cannot use that variable again." Also noted `consume` works on copyable and noncopyable variables. |
| `lesson.mdx` ("The simple idea") | `copy` "creates an explicit copy of a `Copyable` value when inside a `borrowing` or `consuming` parameter" | WRONG | SE-0377 | Changed "when inside" to "such as inside". |
| `lesson.mdx` ("The simple idea") | "you suppress that default conformance" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Simplified to "you turn off that default `Copyable` conformance". |
| `lesson.mdx` ("The simple idea") & `q32` | `<T: ~Copyable & Protocol>` combination used in `q32` was not explicitly shown in the lesson | UNTAUGHT | `swiftc -swift-version 6`; SE-0427 | Added "If a generic function uses such a protocol, write `<T: ~Copyable & Resource>`." to "The simple idea". |
| `questions.json` (`q1` option c) | Explanation said `~Copyable` structs and enums can have properties, methods, and `deinit` | WRONG | `swiftc -swift-version 6` | Changed to "`~Copyable` structs can have stored properties, methods, and `deinit`." |
| `questions.json` (`q2` prompt & options) | Asked which types "can conform to `~Copyable`" | WRONG | SE-0390; SE-0427 (`~Copyable` suppresses `Copyable`, not a protocol conformance) | Reworded to "Which two Swift types can be declared as noncopyable with `: ~Copyable`?" and aligned explanations. |
| `questions.json` (`q5` prompt) | Asked what happens after passing "a caller's variable" to `consuming` without specifying `~Copyable` | WRONG | `swiftc -swift-version 6`; SE-0377 | Specified "a caller's `~Copyable` variable". |
| `questions.json` (`q11` option a) | Credited only SE-0427 for updating `Optional` | WRONG | SE-0427; SE-0437 | Updated explanation to cite Swift 6 (SE-0427 and SE-0437). |
| `questions.json` (`q25` prompt) | Asked about `borrowing` vs `consuming` in general while rubric requires "ends caller access" | WRONG | `swiftc -swift-version 6`; `.claude/rules/questions.md` | Specified "on a `~Copyable` type" in the prompt. |
| `questions.json` (`q1`, `q18`, `q20`) | Right option noticeably longer than wrong options (ratios 1.40–1.48) | RULES | `.claude/rules/questions.md` | Shortened the right option text in `q1` (ratio 1.07), `q18` (1.32), and `q20` (1.21). |

## Verification summary

- Official sources checked via web search: Apple Xcode 27 / Swift 6.4 release support, WWDC24 session 10170, SE-0377, SE-0390, SE-0427, SE-0432, SE-0437.
- Compiler checks: `swiftc -swift-version 6` (with and without `-default-isolation MainActor`) and `node scripts/run-swift-examples.mjs` on `lesson.mdx` (2/2 passed) and `questions.json` (11/11 passed).
- Content checks: `check-lesson.mjs`, `check-plain-english.mjs`, `validate-content.sh`, `validate-curriculum.mjs`, `check-coverage.mjs noncopyable-types --strict`, and `check-publish-gate.mjs noncopyable-types --code`.
