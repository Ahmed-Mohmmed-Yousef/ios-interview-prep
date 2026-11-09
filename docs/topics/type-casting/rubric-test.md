# Rubric Test — Type Casting and Any (Step 5)

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
| **q24** Differences between is, as?, and as! | **Good:** Explains is tests type and returns boolean; as? conditionally downcasts and returns optional (nil on failure); as! force-downcasts and crashes at runtime if failed. | 100 | Yes | Pass (100%) |
| | **Average:** "is checks type, as? gives an optional, and as! forces it." (Misses crash consequence of as!). | 70 | Yes | Pass (70%) |
| | **Weak:** "They are all identical ways to declare variables." | 0 | No | Fail (0%) |
| **q25** Any vs AnyObject | **Good:** Explains Any holds any type (structs, enums, tuples, functions, and classes); AnyObject is restricted to class instances (reference types only). | 100 | Yes | Pass (100%) |
| | **Average:** "Any is for everything and AnyObject is for objects." (Lacks concrete reference vs value type distinction). | 75 | Yes | Pass (75%) |
| | **Weak:** "AnyObject is a newer replacement for Any." | 0 | No | Fail (0%) |
| **q26** Memory impact of casting & safe production patterns | **Good:** Explains type casting does not mutate or copy instance memory; safe production casting uses as? with optional binding (if let or guard let). | 100 | Yes | Pass (100%) |
| | **Average:** "It does not change memory, and you should use if let." | 80 | Yes | Pass (80%) |
| | **Weak:** "Casting creates a new copy of the object on the heap." | 0 | No | Fail (0%) |
| **q27** Pattern matching in switch statements | **Good:** Explains case let x as TargetType checks and binds downcast value to a constant; case is TargetType checks type without binding constant. | 100 | Yes | Pass (100%) |
| | **Average:** "case let binds the variable and case is just checks it." | 75 | Yes | Pass (75%) |
| | **Weak:** "Switch statements cannot check types in Swift." | 0 | No | Fail (0%) |
| **q28** Problems with [Any] vs generics/protocols | **Good:** Explains [Any] bypasses compile-time type safety, requiring runtime casts that risk bugs; generics and protocols provide compile-time safety and clear API contracts. | 100 | Yes | Pass (100%) |
| | **Average:** "Using Any makes code unsafe because you have to cast everything." (Misses generic contract explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Any is forbidden by the App Store." | 0 | No | Fail (0%) |
| **q29** countAdminPermissions code-write | **Good:** Model answer: if let admin = user as? Admin { return admin.permissions.count } return 0; outputs 2 and 0. | 100 | Yes | Pass (100%) |
| | **Average:** Uses as! without checking, crashing when user is a base User. | 50 (capped) | No (safe downcast missed) | Fail (50%) |
| | **Weak:** Returns 0 unconditionally. | 0 | No | Fail (0%) |
| **q30** parseIntegerItem code-write | **Good:** Model answer: checks as? Int and returns num * 2; checks as? String and Int(text) returning text * 2; falls back to -1. | 100 | Yes | Pass (100%) |
| | **Average:** Handles Int correctly but fails to parse string digits, returning -1 for string inputs. | 60 | Yes | Pass (60%) |
| | **Weak:** Multiplies item directly without type casting. | 0 | No | Fail (0%) |
| **q31** countBooks using is operator code-write | **Good:** Model answer: loops through items, increments count when item is Book, returns count; outputs 2. | 100 | Yes | Pass (100%) |
| | **Average:** Uses as? Book without counting or uses filter with syntax errors. | 60 | Yes | Pass (60%) |
| | **Weak:** Returns items.count without filtering books. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics accurately measure:
1. Understanding of type checking (`is`) vs conditional downcasting (`as?`) vs forced downcasting (`as!`).
2. Knowledge of type system boundaries (`Any` vs `AnyObject`).
3. Pattern matching techniques within `switch` statements.
4. Architectural reasons to avoid `[Any]` in favor of protocols and generics.
