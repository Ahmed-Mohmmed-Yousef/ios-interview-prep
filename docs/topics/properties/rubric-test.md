# Rubric Test — Properties (Step 5)

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
| **q24** stored vs computed properties | **Good:** Explains stored properties allocate memory to store values directly; computed properties calculate values on demand using getters/setters without allocating storage. | 100 | Yes | Pass (100%) |
| | **Average:** "Stored properties hold data, while computed properties calculate something when called." (Misses explicit memory allocation explanation). | 70 | Yes | Pass (70%) |
| | **Weak:** "Stored properties are static; computed properties are asynchronous." | 0 | No | Fail (0%) |
| **q25** why lazy requires var | **Good:** Explains lazy properties are not initialized during instance creation; initial value assigned upon first read access after init completes; let constants require value before init finishes. | 100 | Yes | Pass (100%) |
| | **Average:** "Lazy properties need var because their value is set later when accessed." (Misses let constant initialization rule). | 75 | Yes | Pass (75%) |
| | **Weak:** "Lazy properties can change into nil at any moment." | 0 | No | Fail (0%) |
| **q26** willSet/didSet and initializers | **Good:** Explains willSet runs before storage and receives newValue; didSet runs after storage and receives oldValue; observers are suppressed during initializers. | 100 | Yes | Pass (100%) |
| | **Average:** "willSet runs before changes and didSet runs after, but they only run after init." (Misses newValue/oldValue naming). | 70 | Yes | Pass (70%) |
| | **Weak:** "willSet and didSet validate inputs inside init methods." | 0 | No | Fail (0%) |
| **q27** read-only computed property uses var | **Good:** Explains computed properties evaluate getter dynamically on each access; let represents fixed immutable storage; return value can change over time. | 100 | Yes | Pass (100%) |
| | **Average:** "Computed properties need var because the compiler does not allow let for computed properties." (Misses dynamic evaluation reasoning). | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** "var makes the computed property publicly visible." | 0 | No | Fail (0%) |
| **q28** let instance mutation on struct vs class | **Good:** Explains structs are value types so a let instance freezes all properties including var; classes are reference types so let only freezes the reference pointer, leaving var properties mutable. | 100 | Yes | Pass (100%) |
| | **Average:** "In a struct, let stops you from changing any properties, but in a class you can still change var properties." (Misses value type vs reference type rationale). | 75 | Yes | Pass (75%) |
| | **Weak:** "let always prevents mutating properties on both structs and classes." | 0 | No | Fail (0%) |
| **q29** Circle diameter computed property code-write | **Good:** Model answer: struct Circle with radius: Double, computed diameter returning radius * 2, prints 10.0. | 100 | Yes | Pass (100%) |
| | **Average:** Declares diameter as a stored property initialized once rather than a computed property. | 55 (capped) | No (computed property missed) | Fail (55%) |
| | **Weak:** Computes radius * 2 in a loose function without a struct. | 25 | No | Fail (25%) |
| **q30** BankAccount balance didSet observer code-write | **Good:** Model answer: struct BankAccount with balance: Int = 0, didSet observer printing New balance, updates to 150. | 100 | Yes | Pass (100%) |
| | **Average:** Uses willSet instead of requested didSet observer. | 60 (capped) | No (didSet missed) | Fail (60%) |
| | **Weak:** Prints balance without attaching a property observer. | 25 | No | Fail (25%) |
| **q31** HeavyLoader lazy data property code-write | **Good:** Model answer: class HeavyLoader with lazy var data: [String] = { ["loaded"] }(), prints count 1. | 100 | Yes | Pass (100%) |
| | **Average:** Declares data with let instead of lazy var, causing compile error. | 60 (capped) | No (lazy var missed) | Fail (60%) |
| | **Weak:** Declares normal array without lazy initialization closure. | 35 | No | Fail (35%) |

---

## Verdict

The rubrics successfully:
1. Verify essential understanding of property types in Swift (stored vs computed vs lazy).
2. Validate knowledge of property observer lifecycles (newValue, oldValue, suppression during `init`).
3. Confirm comprehension of value type vs reference type property mutability (let struct vs let class).
