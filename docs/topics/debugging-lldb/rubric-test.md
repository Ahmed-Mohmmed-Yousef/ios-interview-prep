# Rubric Test — Debugging with Breakpoints and LLDB (Step 5)

Run 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** Compare po, p, and v in LLDB | **Good:** Explains po prints textual debug descriptions via `CustomDebugStringConvertible`; p evaluates expressions with full types and assigns `$R0`; v reads stack memory directly without compilation or side effects. | 100 | Yes | Pass (100%) |
| | **Average:** "po prints object descriptions, p evaluates expressions with types, and v reads variables fast without side effects." | 85 | Yes | Pass (85%) |
| | **Weak:** "po is for Objective-C, p is for Python, and v is for Swift." | 0 | No | Fail (0%) |
| **q25** Conditional and Action Breakpoints vs print statements | **Good:** Explains conditional breakpoints evaluate expressions to pause only on target loop iterations; action breakpoints with automatic continue log live messages without rebuilding or polluting git commits. | 100 | Yes | Pass (100%) |
| | **Average:** "Conditional breakpoints pause loops when conditions match. Action breakpoints log messages without stopping or editing code." | 85 | Yes | Pass (85%) |
| | **Weak:** "Conditional breakpoints make the app compile faster in debug mode." | 0 | No | Fail (0%) |
| **q26** Step Over vs Step Into vs Step Out | **Good:** Explains Step Over (n) executes current line advancing in the same frame; Step Into (s) enters inner function; Step Out (finish) finishes current function and pauses in caller. | 100 | Yes | Pass (100%) |
| | **Average:** "Step over moves to the next line. Step into enters the called function. Step out returns to the caller function." | 85 | Yes | Pass (85%) |
| | **Weak:** "Step over skips the line completely without running it." | 0 | No | Fail (0%) |
| **q27** Exception Breakpoints and crash diagnosis | **Good:** Explains Exception Breakpoints pause at the exact throw site before the call stack unwinds; without them crashes collapse and highlight AppDelegate or main.swift generically. | 100 | Yes | Pass (100%) |
| | **Average:** "Exception breakpoints stop the app at the line that crashed before the stack collapses, avoiding generic main.swift crashes." | 85 | Yes | Pass (85%) |
| | **Weak:** "Exception breakpoints delete all crashes from the App Store console." | 0 | No | Fail (0%) |
| **q28** Accidental bugs from expression evaluation and remedies | **Good:** Explains p and po run code live in process memory, so mutating expressions alter state; remedies include using v (`frame variable`) for reading memory and evaluating only pure getters. | 100 | Yes | Pass (100%) |
| | **Average:** "Evaluating methods in LLDB can change app variables in memory. Use v or read-only properties to avoid side effects." | 85 | Yes | Pass (85%) |
| | **Weak:** "LLDB commands are simulated and cannot affect memory." | 0 | No | Fail (0%) |
| **q29** `BugReport` struct with `debugDescription` | **Good:** Defines `BugReport` conforming to `CustomDebugStringConvertible` with `id: Int` and `severity: String`, returning `[severity] Bug #id`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements struct and protocol, but returns formatted string missing severity brackets. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing protocol conformance or wrong property types. | 20 | No | Fail (20%) |
| **q30** `BreakpointConditionEvaluator` struct | **Good:** Implements static `shouldPause(iteration:target:) -> Bool` returning `iteration == target`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements method, but makes it an instance method instead of static. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant true for all iterations. | 20 | No | Fail (20%) |
| **q31** `DebugLoggerAction` class | **Good:** Implements class with `private(set) messages` array, `log(message:)` appending messages, and `lastLog()` returning last message. | 100 | Yes | Pass (100%) |
| | **Average:** Implements class and methods, but uses public array without `private(set)`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing messages array or invalid method signatures. | 10 | No | Fail (10%) |

---

## Verdict

The rubrics successfully:
1. Validate clear distinctions between LLDB inspection commands (`po`, `p`, `v`).
2. Test knowledge of Conditional and Action Breakpoints for rapid diagnosis without rebuilding.
3. Assess understanding of execution stepping commands (`n`, `s`, `finish`, `c`).
4. Reinforce Exception Breakpoints to catch crashes before stack unwinding.
5. Emphasize side-effect risks in debugger expression evaluation.
6. Grade Swift 6 debugging structs, evaluators, and loggers accurately.
