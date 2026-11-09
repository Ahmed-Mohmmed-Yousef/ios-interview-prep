# Rubric Test — Error Handling (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** try vs try? vs try! | **Good:** Explains try inside do-catch or throwing functions; try? converts errors to nil, returning Optional; try! asserts success and crashes if error thrown. | 100 | Yes | Pass (100%) |
| | **Average:** "try is for throwing, try? gives an optional, and try! forces the value." (Misses crash consequence of try!). | 70 | Yes | Pass (70%) |
| | **Weak:** "try! is used for background threads." | 0 | No | Fail (0%) |
| **q25** enums with associated values for errors | **Good:** Explains enums model closed sets of related failure states; associated values provide diagnostic details (like HTTP code); callers use pattern matching in catch. | 100 | Yes | Pass (100%) |
| | **Average:** "Enums group errors into cases and can hold extra values for each error." (Misses pattern matching in catch explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Enums are required because classes cannot conform to Error." | 0 | No | Fail (0%) |
| **q26** defer execution and reverse order | **Good:** Explains defer schedules execution at scope exit; runs whether scope exits normally or by throwing; multiple defers execute in reverse order (LIFO). | 100 | Yes | Pass (100%) |
| | **Average:** "defer runs code when a function finishes, but multiple defers run backwards." (Misses error throwing guarantee). | 75 | Yes | Pass (75%) |
| | **Weak:** "defer delays execution by five seconds." | 0 | No | Fail (0%) |
| **q27** Swift errors vs Java/C++ exceptions | **Good:** Explains Swift error handling does not unwind call stack; errors passed as typed values using registers matching return speed; try marks call sites explicitly. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift does not unwind the stack so it is much faster than Java exceptions." (Misses explicit try annotation safety). | 75 | Yes | Pass (75%) |
| | **Weak:** "Swift uses Java exception architecture under the hood." | 0 | No | Fail (0%) |
| **q28** Result type and asynchronous usage | **Good:** Defines Result enum with success and failure; captures outcome as a first-class value; preferred for asynchronous completion handlers or stored outcomes. | 100 | Yes | Pass (100%) |
| | **Average:** "Result is an enum with success and failure, used in async network callbacks." (Misses first-class value rationale). | 75 | Yes | Pass (75%) |
| | **Weak:** "Result replaces optional chaining." | 0 | No | Fail (0%) |
| **q29** MathError and throwing divide code-write | **Good:** Model answer: enum MathError: Error with divisionByZero, throwing divide function, do-catch call with try, prints 5. | 100 | Yes | Pass (100%) |
| | **Average:** Omits throws keyword in divide function declaration, causing compile failure. | 60 (capped) | No (throws missed) | Fail (60%) |
| | **Weak:** Divides numbers without error handling or enum. | 25 | No | Fail (25%) |
| **q30** ParseError and parseAge with try? code-write | **Good:** Model answer: enum ParseError: Error, parseAge returning Int(text) or throwing, calls with try?, prints true. | 100 | Yes | Pass (100%) |
| | **Average:** Uses do-catch instead of requested try? to check for failure. | 75 | Yes | Pass (75%) |
| | **Weak:** Checks text with if without throwing. | 25 | No | Fail (25%) |
| **q31** processItem defer execution order code-write | **Good:** Model answer: processItem prints Start, adds two defers, prints End; output: Start, End, Second defer, First defer. | 100 | Yes | Pass (100%) |
| | **Average:** Declares defers in reverse order inside code, altering intended demonstration. | 60 (capped) | No (order missed) | Fail (60%) |
| | **Weak:** Prints strings without using defer. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify deep comprehension of Swift error-handling paradigms (`try`, `try?`, `try!`, and compile-time checked `throws`).
2. Validate practical knowledge of `defer` scope cleanup and its reverse (LIFO) execution order.
3. Confirm mastery of `Result` enum modeling and asynchronous failure propagation.
