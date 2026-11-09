# Rubric Test — Strings and Characters (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 write-code) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** why no integer indexing | **Good:** Explains variable byte widths in Unicode UTF-8; finding character n requires walking from the start; requires String.Index so traversal cost is clear. | 100 | Yes | Pass (100%) |
| | **Average:** "Characters have different byte sizes so you cannot use integers like in C." (Misses traversal explanation). | 65 | Yes | Fail (65%) |
| | **Weak:** "Swift strings are one-based indexed." | 0 | No | Fail (0%) |
| **q25** grapheme clusters & canonical equivalence | **Good:** Defines extended grapheme cluster as one or more Unicode scalars producing one character; explains canonical equivalence treats visually/linguistically identical characters as equal; compares é with e + accent. | 100 | Yes | Pass (100%) |
| | **Average:** "A grapheme cluster is a visual character, and Swift compares them by how they look." (Misses decomposed vs precomposed explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Grapheme clusters are font files installed in macOS." | 0 | No | Fail (0%) |
| **q26** String vs Substring memory | **Good:** Explains Substring shares parent memory buffer; retaining it keeps the full parent string in memory; converting to String creates an independent buffer. | 100 | Yes | Pass (100%) |
| | **Average:** "A Substring shares memory with the original string so it can leak memory if kept." (Misses conversion step detail). | 75 | Yes | Pass (75%) |
| | **Weak:** "A Substring is a mutable reference type." | 0 | No | Fail (0%) |
| **q27** endIndex vs last character | **Good:** Explains endIndex is past the last character; subscripting crashes with out-of-bounds error; last character is at index(before: endIndex). | 100 | Yes | Pass (100%) |
| | **Average:** "endIndex is past the end so accessing it crashes." (Misses index(before:) method). | 75 | Yes | Pass (75%) |
| | **Weak:** "endIndex returns the last character safely." | 0 | No | Fail (0%) |
| **q28** value semantics & Copy-on-Write | **Good:** Explains String is a struct with value semantics; Copy-on-Write shares buffer until mutation; eliminates redundant copies on read-only passes. | 100 | Yes | Pass (100%) |
| | **Average:** "Strings copy only when mutated to save memory." (Misses struct value semantics). | 65 | Yes | Fail (65%) |
| | **Weak:** "Strings are pointers that point to class instances on the heap." | 0 | No | Fail (0%) |
| **q29** first character code-write | **Good:** Model answer: let city = "Tokyo"; let firstLetter = city[city.startIndex]; print(firstLetter). | 100 | Yes | Pass (100%) |
| | **Average:** Writes city[0] which fails to compile. | 25 (capped) | No (startIndex missed) | Fail (25%) |
| | **Weak:** Prints "T" literally without accessing city. | 25 | No | Fail (25%) |
| **q30** slice after colon code-write | **Good:** Model answer: finds colonIndex, advances with index(after:), slices and converts to String, prints cleanID. | 100 | Yes | Pass (100%) |
| | **Average:** Slices into a Substring but forgets to convert to String(record[nextIndex...]). | 60 (capped) | No (String conversion missed) | Fail (60%) |
| | **Weak:** Hard-codes print("8492") without string indexing or slicing. | 15 | No | Fail (15%) |
| **q31** interpolation code-write | **Good:** Model answer: let score = 95; let player = "Sam"; let summary = "\(player) scored \(score) points"; print(summary). | 100 | Yes | Pass (100%) |
| | **Average:** Uses string concatenation (+) instead of string interpolation (\(...)). | 50 (capped) | No (interpolation missed) | Fail (50%) |
| | **Weak:** Prints summary without declaring score or player variables. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify deep comprehension of Unicode correctness, variable-byte storage, and traversal performance.
2. Ensure candidates understand memory safety implications of Substring buffers.
3. Enforce idiomatic Swift string navigation and interpolation rather than legacy C-style indexing.
