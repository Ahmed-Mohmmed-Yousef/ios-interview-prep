# Rubric Test — Optional Chaining (Step 5)

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
| **q24** Optional chaining vs forced unwrapping | **Good:** Explains optional chaining queries properties and methods with a question mark; returns nil safely if any link is nil; forced unwrapping crashes on nil. | 100 | Yes | Pass (100%) |
| | **Average:** "Optional chaining uses question marks and does not crash, unlike exclamation marks." (Misses return type wrapping explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Optional chaining makes all variables mutable." | 0 | No | Fail (0%) |
| **q25** Return type rules and flattening | **Good:** Explains optional chaining always returns an optional; accessing non-optional Int produces Int?; accessing Int? produces Int? because Swift collapses nested optionals. | 100 | Yes | Pass (100%) |
| | **Average:** "It always returns an optional, but accessing an optional gives you Int? instead of double." (Omits explanation of flattening mechanism). | 80 | Yes | Pass (80%) |
| | **Weak:** "Optional chaining always unwraps optionals into non-optionals." | 0 | No | Fail (0%) |
| **q26** Void method execution check | **Good:** Explains calling Void methods through optional chaining yields Void? (or ()?); comparing the outcome against nil tells if the method executed. | 100 | Yes | Pass (100%) |
| | **Average:** "It returns an optional tuple, and you check if it is nil." | 75 | Yes | Pass (75%) |
| | **Weak:** "You cannot call Void methods on optionals in Swift." | 0 | No | Fail (0%) |
| **q27** Short-circuiting during property assignment | **Good:** Explains Swift evaluates the target on the left first; if nil, the assignment short-circuits and expressions or function calls on the right never execute. | 100 | Yes | Pass (100%) |
| | **Average:** "If the object is nil, the assignment is skipped." (Misses explanation of right-hand side side-effect prevention). | 60 | Yes | Pass (60%) |
| | **Weak:** "The right side always evaluates to create the object." | 0 | No | Fail (0%) |
| **q28** Optional chaining vs optional binding | **Good:** Explains optional chaining queries properties concisely on one line while keeping results wrapped in optionals; optional binding unwraps values into constants for multi-line scopes. | 100 | Yes | Pass (100%) |
| | **Average:** "Chaining is for single lines and binding is for if let blocks." | 70 | Yes | Pass (70%) |
| | **Weak:** "They are identical keywords in Swift." | 0 | No | Fail (0%) |
| **q29** readCylinders code-write | **Good:** Model answer: returns vehicle?.engine?.cylinders ?? 0; prints 6 and 0. | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let statements instead of optional chaining with nil-coalescing. | 60 (capped) | No (chaining missed) | Fail (60%) |
| | **Weak:** Returns cylinders directly without checking nil. | 25 | No | Fail (25%) |
| **q30** getTestScore dictionary lookup code-write | **Good:** Model answer: returns account?.profile?.scores[test]; correctly returns Int?. | 100 | Yes | Pass (100%) |
| | **Average:** Force unwraps profile with exclamation mark before subscripting. | 50 (capped) | No (safe chaining missed) | Fail (50%) |
| | **Weak:** Returns 0 instead of querying the dictionary. | 0 | No | Fail (0%) |
| **q31** runTask Void method check code-write | **Good:** Model answer: let call: Void? = service?.logger?.logMessage("Started"); return call != nil; prints true and false. | 100 | Yes | Pass (100%) |
| | **Average:** Checks service != nil && service?.logger != nil then calls method separately without inspecting Void? return. | 75 | Yes | Pass (75%) |
| | **Weak:** Calls method with forced unwrap service!.logger!.logMessage("Started"). | 25 | No | Fail (25%) |

---

## Verdict

The rubrics accurately measure:
1. Understanding of optional chaining semantics and safety compared to forced unwrapping.
2. Knowledge of return type rules, including optional flattening and Void-return handling.
3. Awareness of assignment short-circuiting and side-effect suppression.
4. Practical ability to query nested models, collections, and methods using Swift 6 syntax.
