# Rubric Test — Key Paths (Step 5)

Done 2026-11-09. Topic: `key-paths` (mid bonus).
Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** (written) Definition of key paths and compile-time safety | **Good:** Explains a key path is a strongly typed reference to a property created with backslash syntax; read via subscript; checked at compile time, avoiding runtime crashes from string typos. | 100 | Yes | Pass (100%) |
| | **Average:** "A key path points to a property with a backslash and is read with subscripts, which is safer than strings." | 80 | Yes | Pass (80%) |
| | **Weak:** "Key paths are pointers to C arrays." | 0 | No | Fail (0%) |
| **q25** (written) KeyPath vs WritableKeyPath vs ReferenceWritableKeyPath | **Good:** Explains KeyPath is read-only; WritableKeyPath allows reading and writing mutable properties on value types; ReferenceWritableKeyPath allows modifying mutable properties on reference classes. | 100 | Yes | Pass (100%) |
| | **Average:** "KeyPath is read-only, WritableKeyPath is for struct vars, and ReferenceWritableKeyPath is for class properties." | 85 | Yes | Pass (85%) |
| | **Weak:** "They are different names for standard variables." | 0 | No | Fail (0%) |
| **q26** (written) Key paths as functions in higher-order functions | **Good:** Explains Swift allows \\Root.Value key paths wherever a closure of type (Root) -> Value is expected; simplifies higher-order functions by replacing verbose closures with syntax like users.map(\\.name). | 100 | Yes | Pass (100%) |
| | **Average:** "Swift turns key paths into closures so you can write users.map(\\.name) cleanly." | 80 | Yes | Pass (80%) |
| | **Weak:** "Key paths are functions that run on background threads." | 0 | No | Fail (0%) |
| **q27** (written) @dynamicMemberLookup with key paths | **Good:** Explains @dynamicMemberLookup allows types to handle arbitrary member access through subscript(dynamicMember:); using KeyPath ensures lookups are verified at compile time with autocomplete and type safety. | 100 | Yes | Pass (100%) |
| | **Average:** "@dynamicMemberLookup forwards properties using key paths so wrapper structs can access wrapped fields type-safely." | 80 | Yes | Pass (80%) |
| | **Weak:** "@dynamicMemberLookup converts Swift to Python." | 0 | No | Fail (0%) |
| **q28** (written) SwiftUI usage of key paths in data flow | **Good:** Mentions using key paths in List or ForEach to specify unique identifiers (e.g. id: \\.id); mentions using key paths with dynamic member lookup to project nested bindings ($state.user.name). | 100 | Yes | Pass (100%) |
| | **Average:** "SwiftUI uses key paths for item IDs in ForEach(items, id: \\.id) and to create nested state bindings." | 85 | Yes | Pass (85%) |
| | **Weak:** "SwiftUI only uses key paths for animations." | 25 | No (both key uses missed) | Fail (25%) |
| **q29** (code-write) Product struct and price key path | **Good:** Model answer: struct Product with let name and let price; instance Laptop (1200); pricePath = \\Product.price; prints "1200". | 100 | Yes | Pass (100%) |
| | **Average:** Declares struct and reads property directly without using key path subscript. | 70 | Yes | Pass (70%) |
| | **Weak:** Writes class without price property. | 20 | No (requirements missed) | Fail (20%) |
| **q30** (code-write) InventoryItem with WritableKeyPath update | **Good:** Model answer: struct InventoryItem with let id and var count; item count 10; updates via WritableKeyPath to 25; prints "25". | 100 | Yes | Pass (100%) |
| | **Average:** Declares count with let, causing compiler error on WritableKeyPath mutation. | 50 (capped) | No (WritableKeyPath missed) | Fail (50%) |
| | **Weak:** Writes empty struct with hardcoded print. | 10 | No (requirements missed) | Fail (10%) |
| **q31** (code-write) Student array map with key path | **Good:** Model answer: Student struct; array of 3 students; students.map(\\.name); prints "Ava, Leo, Mia". | 100 | Yes | Pass (100%) |
| | **Average:** Uses closure students.map { $0.name } instead of key path \\.name. | 60 | No (key path syntax missed) | Fail (60%) |
| | **Weak:** Hardcodes print("Ava, Leo, Mia") without map or Student struct. | 20 | No (data structures missed) | Fail (20%) |

---

## Verdict

The rubrics successfully verify:
1. Accurate understanding of key path syntax and compile-time safety.
2. Recognition of differences across `KeyPath`, `WritableKeyPath`, and `ReferenceWritableKeyPath`.
3. Ability to use key paths as first-class functions in higher-order operations.
4. Deep architectural understanding of `@dynamicMemberLookup` and SwiftUI data flow integration.
