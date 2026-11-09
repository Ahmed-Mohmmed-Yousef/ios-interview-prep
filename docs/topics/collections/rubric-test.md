# Rubric Test — Arrays, Sets and Dictionaries (Step 5)

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
| **q24** compare collection types | **Good:** Defines Array (ordered, index, duplicates), Set (unordered, unique, fast membership), Dictionary (key-value, Hashable keys); gives clear selection guidance. | 100 | Yes | Pass (100%) |
| | **Average:** "Arrays have order, sets have unique items, and dictionaries have keys." (Misses Hashable and indexing guidance). | 70 | Yes | Pass (70%) |
| | **Weak:** "They are all basically the same thing in Swift." | 0 | No | Fail (0%) |
| **q25** array out of bounds vs dictionary nil | **Good:** States reading out-of-bounds array index causes fatal runtime crash; missing dictionary key returns nil safely; contrasts memory slots with optional lookups. | 100 | Yes | Pass (100%) |
| | **Average:** "Arrays crash if you go out of bounds, while dictionaries give you nil." (Misses architectural reasoning). | 80 | Yes | Pass (80%) |
| | **Weak:** "Both return nil when an element is missing." | 0 | No | Fail (0%) |
| **q26** Hashable requirement | **Good:** Explains Hashable computes integer hash value for buckets; enables O(1) amortized lookup; notes Equatable inheritance resolves hash collisions. | 100 | Yes | Pass (100%) |
| | **Average:** "Hashable is needed so the set can put items into hash buckets quickly." (Misses collision resolution). | 75 | Yes | Pass (75%) |
| | **Weak:** "Hashable encrypts elements for keychain security." | 0 | No | Fail (0%) |
| **q27** default subscript syntax | **Good:** Explains returns existing value or fallback; non-optional value enables in-place mutation like += 1; avoids manual optional binding. | 100 | Yes | Pass (100%) |
| | **Average:** "It gives you a default value if the key is not there so you can add to it." (Misses non-optional explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "It deletes the key if it equals zero." | 0 | No | Fail (0%) |
| **q28** Copy-on-Write optimization | **Good:** Explains collections are value types sharing storage until mutated; fresh buffer allocated on write; avoids redundant copying on function passes. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift collections only copy memory when you change them." (Misses struct value semantics). | 60 | Yes | Fail (60%) |
| | **Weak:** "Copy-on-write means collections are stored in immutable flash memory." | 0 | No | Fail (0%) |
| **q29** append and count code-write | **Good:** Model answer: var colors = ["Red", "Green"]; colors.append("Blue"); print(colors.count). | 100 | Yes | Pass (100%) |
| | **Average:** Declares with let instead of var, causing compile failure on append. | 50 (capped) | No (mutability missed) | Fail (50%) |
| | **Weak:** Prints 3 literally without array operations. | 25 | No | Fail (25%) |
| **q30** Set deduplication code-write | **Good:** Model answer: let tags = [...]; let uniqueTags = Set(tags); print(uniqueTags.contains("ios")). | 100 | Yes | Pass (100%) |
| | **Average:** Converts to set but searches using tags.contains instead of uniqueTags.contains. | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** Prints true without Set initialization. | 20 | No | Fail (20%) |
| **q31** dictionary default subscript code-write | **Good:** Model answer: var scores = ["Dana": 80]; scores["Dana", default: 0] += 15; print(scores["Dana"] ?? 0). | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let unwrapping and reassigns instead of default subscript. | 50 (capped) | No (default subscript missed) | Fail (50%) |
| | **Weak:** Hard-codes print(95) without dictionary mutation. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify deep comprehension of collection selection trade-offs (order vs uniqueness vs key-value lookup).
2. Protect candidates against the dangerous assumption that array subscripting returns nil.
3. Enforce idiomatic Swift syntax like default dictionary subscripts and Copy-on-Write value semantics.
