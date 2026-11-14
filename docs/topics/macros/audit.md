# Audit: macros (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (`content/topics/macros/lesson.mdx` and `topic.json`)

| Location | Claim / Issue | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"` | OUTDATED | `docs/audit/README.md`, `swiftc` 6.4.2 / Xcode 27.2 | Updated to `xcode: "27.2"` |
| `topic.json`, `meta.sources` | Lesson states `extension` replaced `conformance`, without citing SE-0402 | RULES | `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0402-extension-macros.md` (HTTP 200) | Added `SE-0402: Extension Macros` to `sources` in `topic.json` and `lesson.mdx` |
| `## The simple idea` (Analogy, `SwiftSyntax`, sandbox, `peer`) | "inside the same rules", "Apple's library", missing "safe and repeatable (deterministic)", 24-word `peer` bullet | HARD-ENGLISH / UNTAUGHT | `.claude/rules/plain-english.md`; WWDC23 10166 | Simplified analogy and `peer` bullet; changed to "the Swift library"; added "This keeps builds safe and repeatable (deterministic)." |
| `## In code` (`@Observable`) | `@Observable` struct restriction appeared only in QuickCheck 2, not in main prose | UNTAUGHT | WWDC23 10167; `swiftc` compile error check | Added "`@Observable` works only on classes, not on structs." in `## In code` prose |
| `## In code` (`#Predicate` example) | `struct Product` fails to compile under `-default-isolation MainActor` (`KeyPath<Product, ...>` does not conform to `Sendable`) | OUTDATED | `swiftc -swift-version 6 -default-isolation MainActor` | Changed to `nonisolated struct Product` and added `<VersionNote since="Xcode 27">` explaining default main-actor isolation and `nonisolated` |
| `## In code` (comparison table) | Row label "Runs when" did not match "Compiler adds `_prop` backing storage"; "Zero wrapper object" | RULES | `docs/lesson-format.md` | Renamed row label to "How it works"; clarified runtime storage as "None per property unless the macro adds fields" |
| `## Interview traps`, `## How to answer in the interview` | Sentences up to 25 words with "which", "while", "and", "deterministic", "diagnostics" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Split long sentences into <= 20-word B1 sentences and simplified wording |

## Question bank fixes (`content/topics/macros/questions.json`, bumped to v2)

| Location | Claim / Issue | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `macros-q1` option `a` | Said all Swift macros expand "inside a compiler plugin" (built-in `#line`/`#function` are compiler-integrated) | WRONG | SE-0382; TSPL Macros | Changed option `a` to "At compile time before the binary is linked." (45 chars, balanced with 44-char distractor) |
| `macros-q2` option `d` explanation | Used "suppresses a protocol conformance" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Simplified to "Wrong. The tilde is for noncopyable types like ~Copyable, not macros." |
| `macros-q7` | Prompt said "Apple"; option `c` used "deterministic"; `lessonSection` pointed at `"See it"` (diagram spec only) | RULES / UNTAUGHT / HARD-ENGLISH | `.claude/rules/questions.md`; `.claude/rules/plain-english.md` | Changed prompt to "Why does Swift run macro plugins inside a sandbox?", option `c` to "repeatable", and `lessonSection` to `"The simple idea"` |
| `macros-q14` option `b` explanation | Mentioned untaught `BodyMacro` protocol name | UNTAUGHT | `lesson.mdx` | Rewrote explanation using `@attached(body)` without untaught protocol name |
| `macros-q20`, `macros-q22`, `macros-q24`, `macros-q31` | `#Predicate` structs (`TaskItem`, `Book`, `User`, `Item`) fail or emit extra `Sendable` keypath errors under `-default-isolation MainActor` | OUTDATED | `swiftc -swift-version 6 -default-isolation MainActor` | Added `nonisolated` to the structs (`q20`, `q22`, `q24`, and `q31` prompt/starterCode/modelAnswer) |
| `macros-q25` | Rubric gave 30% for giving one example of each, but prompt did not ask for examples | RULES | `.claude/rules/questions.md` | Updated prompt to ask for "one example of each" |
| `macros-q26`, `macros-q28` modelAnswers | Used "operate on", "filesystem", "deterministic", and 22-23 word sentences | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewrote in B1 English with short sentences |
| `macros-q27` | Rubric criterion 3 scored `@ObservationIgnored`, which the prompt did not ask about; criterion 1 mentioned untaught "helper methods" | RULES | `.claude/rules/questions.md`; `lesson.mdx` | Aligned rubric and `modelAnswer` strictly to the three attached roles taught (`member`, `memberAttribute`, `extension`) |
| `macros-q28` | Rubric gave 20% for build cost, but prompt only asked about where they apply and runtime storage | RULES | `.claude/rules/questions.md` | Updated prompt to ask about "where they apply, runtime storage, and build cost" |

## Checks run (2026-11-14)

- `node .claude/hooks/check-lesson.mjs content/topics/macros/lesson.mdx` — passed
- `node .claude/hooks/check-plain-english.mjs` on `lesson.mdx`, `questions.json`, and `topic.json` — passed
- `bash .claude/hooks/validate-content.sh` on `lesson.mdx` and `questions.json` — passed (0 errors; 32 live questions: 16 mcq / 8 code-reading / 5 written / 3 code-write; difficulty 12 easy / 15 medium / 5 hard; answers 6a / 6b / 6c / 6d)
- `node scripts/check-coverage.mjs macros --strict` — passed (`ok   macros — 0 errors, 0 warnings`)
- `node scripts/run-swift-examples.mjs` on `lesson.mdx` (3/3 passed) and `questions.json` (11/11 passed), plus `swiftc -swift-version 6 -default-isolation MainActor` on all lesson and question Swift code — all passed
- `node scripts/check-publish-gate.mjs macros --code` — passed (`ok   macros`)
