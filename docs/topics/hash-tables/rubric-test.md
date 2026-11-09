# Rubric Test — Hash Tables (Step 5)

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
| **q24** hash table lookup and storage mechanics | **Good:** Explains hash function turns keys into bucket indices in O(1) time; collisions happen when hashes overlap; Equatable confirms exact key. | 100 | Yes | Pass (100%) |
| | **Average:** "Hash functions convert keys into indexes to jump to buckets in O(1) time. Collisions happen when two keys share an index." (Misses Equatable check). | 80 | Yes | Pass (80%) |
| | **Weak:** "Hash tables sort keys alphabetically into linked lists." | 0 | No | Fail (0%) |
| **q25** Equatable and Hashable contract parity | **Good:** Explains equal instances (a == b) must produce identical hashes; custom hash(into:) must hash the same fields checked in ==; breaking causes missing keys. | 100 | Yes | Pass (100%) |
| | **Average:** "Equal instances must produce the same hash value, or else dictionaries cannot find the keys." (Misses matching hash(into:) properties). | 70 | Yes | Pass (70%) |
| | **Weak:** "Hashable creates memory pointers for Equatable comparisons." | 0 | No | Fail (0%) |
| **q26** SipHash random seeds and hashValue persistence | **Good:** Explains SipHash uses per-process random seeds to prevent hash collision attacks; hash values change on each launch; saving to disk causes corrupt lookups. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift randomizes hash values every time the app opens, so if you save hash values to disk they will not match next time." (Misses collision attack defense). | 50 (capped) | No (key attack detail missed) | Fail (50%) |
| | **Weak:** "hashValue changes because memory addresses change on 64-bit devices." | 0 | No | Fail (0%) |
| **q27** Two Sum optimization from O(n^2) to O(n) | **Good:** Explains dictionary caches seen numbers and indices; checking target - current takes O(1) average lookup time; trades O(n) space for O(n) linear time. | 100 | Yes | Pass (100%) |
| | **Average:** "Store numbers in a dictionary and look up target - current in O(1) time to avoid nested loops." (Misses explicit O(n) space trade-off). | 80 | Yes | Pass (80%) |
| | **Weak:** "Sort the array and run binary search on both ends." | 0 | No | Fail (0%) |
| **q28** mutating Set elements and prevention | **Good:** Explains mutating properties changes hash or equality; object remains stuck in old bucket; lookups fail; recommends immutable structs with let properties. | 100 | Yes | Pass (100%) |
| | **Average:** "If you change a property on an object in a Set, the set cannot find it anymore because it is in the wrong bucket." (Misses recommendation of immutable structs). | 80 | Yes | Pass (80%) |
| | **Weak:** "Mutating objects in a Set creates strong reference cycles." | 0 | No | Fail (0%) |
| **q29** characterFrequencies code-write | **Good:** Model answer with `counts[character, default: 0] += 1` and clean dictionary return. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `counts[char] = (counts[char] ?? 0) + 1` with extra unwrapping logic. | 85 | Yes | Pass (85%) |
| | **Weak:** Returns an array of character tuples instead of a dictionary. | 30 | No | Fail (30%) |
| **q30** findTwoSum code-write with Set | **Good:** Model answer using `Set<Int>`, checking `seen.contains(complement)` and returning `(complement, number)`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses nested loops over numbers to find pair, taking O(n^2) instead of O(n) with Set. | 40 (capped) | No (Set check missed) | Fail (40%) |
| | **Weak:** Returns target without finding matching pairs. | 0 | No | Fail (0%) |
| **q31** firstUniqueCharacter code-write | **Good:** Model answer building frequency dictionary and scanning original string in order for count == 1. | 100 | Yes | Pass (100%) |
| | **Average:** Iterates over dictionary keys instead of original string, losing character order. | 50 (capped) | No (original order missed) | Fail (50%) |
| | **Weak:** Returns the first character of the string without checking frequencies. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Verify understanding of hash table internals: hashing, bucket indexing, collisions, and Equatable resolution.
2. Confirm knowledge of the `Hashable` contract, SipHash random seeding, and why `hashValue` must not be persisted.
3. Assess the algorithmic transition in Two Sum from $O(n^2)$ brute force to $O(n)$ space-time optimization.
4. Evaluate code implementations for frequency counting, set-based complements, and order-preserving uniqueness detection.
