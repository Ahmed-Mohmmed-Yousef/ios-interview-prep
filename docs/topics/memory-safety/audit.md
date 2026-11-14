# Content Audit: `memory-safety`

- **Audit date:** 2026-11-14
- **Checker:** `content-fact-checker` (independent, fix mode)
- **Baseline:** Swift 6.4 (`Apple Swift version 6.4.2` verified locally with `swiftc -swift-version 6`, `-strict-memory-safety`, and `-default-isolation MainActor`), Xcode 27.2
- **Status:** `review` (left as `review` for coordinator)

## Findings and Changes

### `topic.json`

| Location | Claim | Verdict | Evidence URL | Fix / Outcome |
|---|---|---|---|---|
| `topic.json` | Title, level (`senior`), goal, prerequisite (`structs-vs-classes`), and 3 official sources | OK | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Verified all 3 URLs via `check-sources.mjs` and web search. Kept `version: 1`, `status: "review"`, `lastVerified: "2026-11-14"`. |

### `lesson.mdx`

| Location | Claim | Verdict | Evidence URL | Fix / Outcome |
|---|---|---|---|---|
| `meta.summary` | "audits unsafe pointer code" | HARD-ENGLISH | — | Changed "audits" to "checks". |
| `The simple idea` (L30) | "definite initialization" unexplained | HARD-ENGLISH | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Simplified to "initialization checks". |
| `The simple idea` (L34) | Compile-time `mutating` `self` + `inout` conflict only implied | UNTAUGHT | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Added explicit example `oscar.shareHealth(with: &oscar)` alongside `&score` aliasing and nested-function capture. |
| `The simple idea` (L36) | Strict Memory Safety flags, Xcode setting name, and unsafe constructs | OK / HARD-ENGLISH | https://github.com/swiftlang/swift-evolution/blob/main/proposals/0458-strict-memory-safety.md | Verified `-strict-memory-safety`, `.strictMemorySafety()`, and `"Strict Memory Safety"` (`SWIFT_STRICT_MEMORY_SAFETY`). Added `unowned(unsafe)` and split long sentences. |
| `In code` (L68) | "alias" not defined; `mutating` `self` aliasing missing | UNTAUGHT | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Defined **alias** ("point to the same variable") and noted `oscar.shareHealth(with: &oscar)` fails at compile time. |
| `In code` (L100) | Only mentioned "closure", while `q30` uses a nested function | UNTAUGHT | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Changed to "closure or nested function". |
| `In code` (L107–135) | `@unsafe`, `unsafe`, `withUnsafePointer(to: &value)` safe, unnecessary `unsafe` warning | OK | https://github.com/swiftlang/swift-evolution/blob/main/proposals/0458-strict-memory-safety.md | Verified with `swiftc -swift-version 6 -strict-memory-safety` (and `-default-isolation MainActor`): `withUnsafePointer` compiles cleanly without `unsafe`; adding `unsafe` triggers `#UnnecessaryEffectMarker::UnnecessaryUnsafe`. |
| `In code` (L137+) | When to use `@unsafe`, module-by-module `.strictMemorySafety()` rollout, and `Span`/`InlineArray` definitions missing from main section | UNTAUGHT | https://www.swift.org/blog/swift-6.2-released/ | Added concise teaching paragraphs explaining when to mark helpers `@unsafe`, enabling `.strictMemorySafety()` per target, and defining `Span` and `InlineArray`. |
| `In code` table (L141) | `p.share(with: &p)` described as "Passing the same variable twice as inout" | WRONG | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Clarified as `Passing the same variable twice as inout (or mutating self + inout)`. |
| `QuickCheck` 2 (L149–151) | "audit" and semicolon in `<Explanation>` | HARD-ENGLISH | — | Changed "audit" to "check" and split semicolon sentence into two sentences. |
| `InterviewAnswer` (`staff`) | "auditing", "via", "gradually", "eliminate unsafe surfaces" | HARD-ENGLISH | — | Simplified to "checking", "with", "step by step", and "remove unsafe code". |
| `Recap` (L183) | Semicolon joining two clauses | HARD-ENGLISH | — | Split into two sentences. |

### `questions.json`

| Location | Claim | Verdict | Evidence URL | Fix / Outcome |
|---|---|---|---|---|
| `memory-safety-q1`–`q3`, `q5`–`q8`, `q10`, `q12`, `q17`–`q18`, `q20`, `q22`–`q24`, `q26` | Core exclusivity and Strict Memory Safety facts, code outputs, and compile errors | OK | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Verified against official docs and `swiftc -swift-version 6` (11/11 pass). |
| `memory-safety-q4` | `var bindings` in option c explanation | HARD-ENGLISH | — | Changed to `var variables`. |
| `memory-safety-q9` | `Simultaneous` in exp b; `nested function` in exp d | HARD-ENGLISH | — | Changed to `Overlapping` and `closure`. |
| `memory-safety-q11` | Semicolon in option a explanation | HARD-ENGLISH | — | Split into two sentences. |
| `memory-safety-q13` | Semicolon in option a | HARD-ENGLISH | — | Split into two sentences. |
| `memory-safety-q14` | "boundary" and "audit" in option b and explanation | HARD-ENGLISH | — | Simplified to "code" and "review". |
| `memory-safety-q15` | "relies on memory-unsafe preconditions" and "audit" | HARD-ENGLISH | — | Simplified to "depends on memory-unsafe rules" and "review". |
| `memory-safety-q16` | `lessonSection` pointed to `How to answer in the interview` | RULES | — | Updated `lessonSection` to `In code` (now taught in main section). |
| `memory-safety-q19` | `, which` clause in option a explanation | HARD-ENGLISH | — | Split into two sentences. |
| `memory-safety-q21` | Semicolon in option d explanation | HARD-ENGLISH | — | Split into two sentences. |
| `memory-safety-q25` | Rubric criterion 3 scores overlapping reads, not asked in prompt | RULES | — | Updated prompt to ask "when overlapping accesses are safe". |
| `memory-safety-q27` | Rubric criterion 3 scores the fix, not asked in prompt; prompt > 25 words | RULES / HARD-ENGLISH | — | Added second sentence asking how to fix the crash. |
| `memory-safety-q28` | Rubric criterion 3 scores `Span`/`InlineArray` alternative, not asked in prompt; "audit" in rubric | RULES / HARD-ENGLISH | — | Added second sentence asking for a safer alternative; changed "audit" to "review". |
| `memory-safety-q29` | "roll out" / "gradually" and `lessonSection` | HARD-ENGLISH / RULES | — | Replaced with "adopt ... step by step"; updated `lessonSection` to `In code`. |
| `memory-safety-q30` | `starterCode` (`var step = 3`, no `run()`), `prompt` (`total` 10 + `step` 3 = `13`), `rubric` (`addStep(&step)`), and `modelAnswer` (`var total = 10; let delta = 3`) contradicted each other | WRONG | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Aligned `starterCode`, `prompt`, `rubric`, `modelAnswer`, and `verify` (`output: "20"`) around `var step = 10` and `let delta = step`. |
| `memory-safety-q31` | Prompt referenced `Box` instead of `AccountHolder.pair`; `starterCode` omitted `AccountHolder().swapBalances()` | WRONG | https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety | Changed `Box` to `AccountHolder.pair` in prompt and added `AccountHolder().swapBalances()` to `starterCode`. |
| `memory-safety-q32` | Used `withUnsafePointer(to: byte)` instead of `&var` taught in lesson | RULES | https://github.com/swiftlang/swift-evolution/blob/main/proposals/0458-strict-memory-safety.md | Aligned prompt, rubric, and `modelAnswer` to `var byte: UInt8 = 65` and `withUnsafePointer(to: &byte)`. |
