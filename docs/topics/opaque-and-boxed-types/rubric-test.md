# Rubric Test — Opaque and Boxed Types: some vs any (Step 5)

Done 2026-11-09. Topic: `opaque-and-boxed-types` (mid).
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
| **q24** (written) Difference between some and any | **Good:** Explains some creates an opaque type where the compiler knows the single concrete type, preserving type identity and static dispatch; any creates a boxed existential type holding different types dynamically via witness tables. | 100 | Yes | Pass (100%) |
| | **Average:** "some means one fixed type with fast calls, while any means a box that can hold different types dynamically." | 80 | Yes | Pass (80%) |
| | **Weak:** "some is for private structs and any is for public classes." | 0 | No | Fail (0%) |
| **q25** (written) Fixed underlying type rule for some return types | **Good:** Explains opaque types represent one fixed underlying type determined at compile time; returning different types across branches prevents the compiler from resolving a single underlying type. | 100 | Yes | Pass (100%) |
| | **Average:** "some requires returning the same struct from all return statements because the compiler needs to know what it is." | 80 | Yes | Pass (80%) |
| | **Weak:** "You can never use if statements inside functions that return protocols." | 0 | No | Fail (0%) |
| **q26** (written) Why SwiftUI uses some View instead of any View | **Good:** Explains some View preserves the exact concrete view hierarchy type at compile time with zero box overhead; enables SwiftUI view diffing optimizations and avoids existential container heap allocations. | 100 | Yes | Pass (100%) |
| | **Average:** "SwiftUI uses some View to avoid boxing overhead and let the compiler optimize view layouts directly." | 80 | Yes | Pass (80%) |
| | **Weak:** "SwiftUI does not support protocols." | 0 | No | Fail (0%) |
| **q27** (written) Structure of an existential container | **Good:** Explains existential container includes a 3-word inline buffer, a type metadata pointer, and witness table pointers; values larger than 3 words allocate storage on the heap. | 100 | Yes | Pass (100%) |
| | **Average:** "An existential container has a 3-word buffer and pointers for the witness table, using heap memory if the struct is too big." | 80 | Yes | Pass (80%) |
| | **Weak:** "Existential containers are Objective-C dictionaries storing JSON strings." | 0 | No | Fail (0%) |
| **q28** (written) Opening existentials in modern Swift | **Good:** Explains opening an existential extracts the underlying concrete value from the any box at the call site; allows passing any Protocol into functions expecting generic types or some Protocol. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift automatically unboxes an any value when passing it to a generic function that takes some." | 80 | Yes | Pass (80%) |
| | **Weak:** "Opening existentials means force-unwrapping optionals." | 0 | No | Fail (0%) |
| **q29** (code-write) Greeter protocol and makeGreeter function | **Good:** Model answer: protocol Greeter with func greet() -> String; struct Friend returning 'Hello, friend!'; makeGreeter returning some Greeter; prints "Hello, friend!". | 100 | Yes | Pass (100%) |
| | **Average:** Declares makeGreeter returning Friend directly instead of some Greeter. | 70 | Yes | Pass (70%) |
| | **Weak:** Writes class without conforming to Greeter. | 20 | No (protocol and opaque return missed) | Fail (20%) |
| **q30** (code-write) [any Renderable] heterogeneous array | **Good:** Model answer: protocol Renderable; TextItem and ImageItem structs; array [any Renderable] mapped and joined; prints "Text, Image". | 100 | Yes | Pass (100%) |
| | **Average:** Uses [some Renderable] instead of [any Renderable], causing compiler failure on mixed types. | 50 (capped) | No (any existential box missed) | Fail (50%) |
| | **Weak:** Writes empty array without items or conformance. | 15 | No | Fail (15%) |
| **q31** (code-write) doubleSize taking some Scalable parameter | **Good:** Model answer: protocol Scalable with var size: Int; func doubleSize(item: some Scalable) -> Int returning size * 2; Window struct with size 15; prints "30". | 100 | Yes | Pass (100%) |
| | **Average:** Writes doubleSize taking concrete Window instead of some Scalable. | 60 | No (some parameter missed) | Fail (60%) |
| | **Weak:** Returns hardcoded 30 without Scalable protocol. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully verify:
1. Static dispatch and type identity of `some` vs existential boxing of `any`.
2. Exact return type consistency rule for opaque return types.
3. Existential container memory layout (3-word buffer, heap fallback, witness tables).
4. Practical usage of heterogeneous arrays `[any Protocol]` and generic parameters `some Protocol`.
