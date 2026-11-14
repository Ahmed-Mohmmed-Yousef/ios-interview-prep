# Audit: error-handling (2026-11-14)

Independent check (`content-fact-checker`, fix mode), baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2, Xcode 27.2). **Result: pass.**

## Fixes made (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| Lesson hook, option b | Errors are "lightweight values" | WRONG | TSPL ErrorHandling "Specifying the Error Type" | Removed "lightweight values"; now says throwing has a cost close to returning a value |
| Lesson hook, option c | "only caught inside an Xcode debug session" | RULES (joke option) | — | Replaced with believable mistake (unchecked errors without `try`) |
| Lesson, whole | No typed throws `throws(MyError)` | OUTDATED | SE-0413 (Swift 6.0); TSPL "Specifying the Error Type" | Added typed throws explanation and checked Swift 6 example (`throws(FileError)`); noted most code uses plain `throws` |
| Trap 1 | Errors "returned as values using dedicated registers" | UNVERIFIED (ABI detail) | TSPL Note | Removed register claim; kept no stack unwinding and return-like cost |
| Trap 2 | "Reserve try! for unit tests or when an error is mathematically impossible" | WRONG advice | TSPL "Disabling Error Propagation" & "Deferred Actions" | Use when you know it will not fail (e.g. bundled resource); noted `defer` does not run on crash |
| The simple idea, first sentence | Copied word for word from TSPL | COPIED | TSPL ErrorHandling | Paraphrased in original B1 English |
| Simple idea, item 4 | `try!` "disables error handling" | WRONG (imprecise) | TSPL | Now says disables error propagation and crashes if it throws |
| Junior answer | "compile-time checked mechanism", "completion storage", "upon scope exit"; Result "for asynchronous workflows" | HARD-ENGLISH / OUTDATED | Concurrency.md (`async throws`); Apple Result docs | Rewritten in B1 English; notes `async throws` for modern async code and `Result` for stored outcomes/completion handlers |
| Recap | 7 points | RULES | docs/lesson-format.md (3–5) | Condensed to 5 points |
| q7 option b explanation | "defer statements still run if the scope exits before the crash" | WRONG | TSPL ControlFlow "Deferred Actions" | Replaced option b with a believable `try?`/`try!` mix-up |
| q11, q22 | Test `Result.get()` | UNTAUGHT | Apple Result `get()` docs | Taught `Result.get()` in lesson; retired q11 (name trivia), kept q22 |
| q13, q21 | Bind associated values in a `catch` pattern | UNTAUGHT | TSPL do-catch example | Added `catch PrinterError.paperJam(let page)` to lesson example |
| q12 | Exact compiler message trivia | RULES | `swiftc` | Retired q12; added q33 (`code-reading` failing to compile without `try`) |
| q27 rubric key criterion | "passed as typed values using registers" | WRONG / unfair | TSPL Note | Updated rubric and modelAnswer to cost close to returning a normal value |
| q9 | "stack-safe value returns", "kernel intervention" | HARD-ENGLISH / joke | — | Rewritten in B1 English with believable options |
| q15, q28 | Result preferred "across asynchronous boundaries" | OUTDATED | Apple Result docs; Concurrency.md | Updated to storing outcomes or passing them to completion handlers |
| q24, q25, q26 | Prompt / rubric mismatches | RULES | questions.md | Aligned prompts and rubrics |
| q24–q28 | "Answer in 2–4 sentences" | RULES | questions.md (2–5) | Changed to 2–5 sentences |
| q1d, q3d, q4b/c, q6a/d, q10d, q13b/d | Joke options / `Recoverable` confusion / hard English | RULES / HARD-ENGLISH | plain-english.md | Replaced with believable mistakes in B1 English |
| Bank | Difficulty 26% easy; missing typed throws | RULES | questions.md (~40/40/20) | Re-leveled q4, q8, q10, q18, q19 to easy; added q32 (`throws`), q33 (missing `try`), q34 (typed throws) for 32 live questions (44% easy / 38% medium / 19% hard) |
| Metadata | `topic.json` v1, `lastVerified` `2026-11-09` | RULES | docs/audit/README.md | Bumped `topic.json` to v2 with `changes` note and `questions.json` to v2; aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs error-handling` — all passed.
