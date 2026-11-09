# Fact-Check — Debugging with Breakpoints and LLDB (Step 6)

Run 2026-11-09. Topic: `debugging-lldb` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/debugging-lldb/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/debugging-lldb/questions.json`.
- **Official Documentation**:
  - Verified against [Stepping through code and inspecting variables to isolate bugs (Xcode)](https://developer.apple.com/documentation/xcode/stepping-through-code-and-inspecting-variables-to-isolate-bugs) and [LLDB Tutorial (LLVM)](https://lldb.llvm.org/use/tutorial.html).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `po` Command Mechanics | Evaluates expressions dynamically via `expression -O --` to format debug descriptions | Confirmed |
| `p` Command Mechanics | Evaluates expressions dynamically via `expression --` with type metadata and `$R` vars | Confirmed |
| `v` Command Mechanics | `frame variable` reads debug symbol stack memory directly without running code | Confirmed |
| Expression Side Effects | Evaluating mutating calls in `p`/`po` permanently alters live process memory | Confirmed |
| CustomDebugStringConvertible | Implementing `debugDescription` customizes output for `po` and debugger formatting | Confirmed |
| Stepping Commands | `n` (step-over), `s` (step-in), `finish` (step-out), `c` (continue) control flow | Confirmed |
| Conditional Breakpoints | Pauses execution only when a boolean expression evaluates to true | Confirmed |
| Action Breakpoints | Injects logging actions with auto-continue to avoid rebuilding or adding `print` statements | Confirmed |
| Exception Breakpoints | Pauses execution at throw location before the call stack unwinds | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `xcode-and-git-basics` is confirmed as published prerequisite.
2. **Progression in Batch 2F**: Fourth topic in Batch 2F (Architecture & Testing).
