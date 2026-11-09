# Research: Strong, Weak, and Unowned References

## 1. Core Concepts & Technical Facts

### Strong References
- **Default Reference**: In Swift, any variable, constant, or property referring to a class instance is `strong` by default unless specified otherwise.
- **Reference Count**: A strong reference increments the instance's strong reference count by 1.
- **Lifetime**: The instance remains in memory as long as at least one active strong reference points to it.
- **Trade-off**: If two instances hold strong references to each other, a retain cycle occurs, preventing both from ever deallocating.

### Weak References
- **Definition**: A reference that does not keep a strong hold on the instance it refers to. It does not increment the strong reference count.
- **Declaration Rules**:
  - Must always be declared with `weak`.
  - Must always be declared as a variable (`var`), never a constant (`let`).
  - Must always have an optional type (`Type?`) because the value can become `nil` at runtime.
- **Automatic Zeroing**: When the referenced instance deallocates, ARC automatically sets the weak reference to `nil`.
- **Runtime Mechanism**: Swift uses runtime *side tables* to track weak counts. When the strong count hits 0, the object deinitializes; once all weak references are zeroed or resolved, the side table is freed.
- **Best Use Cases**:
  - When the referenced object has a shorter lifetime or can become `nil` at any point during the owner's lifetime.
  - Delegate properties: `weak var delegate: CustomDelegate?`.
  - Parent pointers in tree structures (child points weakly to parent; parent points strongly to children).
  - Escaping closures where the capturing object may deallocate before the closure executes (`[weak self]`).

### Unowned References
- **Definition**: A reference that does not increment the strong reference count, but is assumed to always have a value once set.
- **Declaration Rules**:
  - Declared with `unowned`.
  - Can be declared as a constant (`let`) or a variable (`var`).
  - Non-optional by default (e.g. `unowned let customer: Customer`), though optional unowned (`unowned(optional)`) is also permitted in Swift.
- **Dangling Reference Hazard**: ARC does **not** zero an unowned reference when the target instance deallocates. Accessing an unowned reference after the instance is deallocated triggers a runtime crash (`Fatal error: Attempted to read an unowned reference but the object was already deallocated`).
- **Variants**:
  - `unowned(safe)`: Default in Swift. Performs runtime checks and crashes cleanly with an assertion failure if accessed after deallocation.
  - `unowned(unsafe)`: Disables runtime checks for performance; accessing after deallocation results in undefined behavior (memory corruption / dangling pointer).
- **Best Use Cases**:
  - When the other instance has the *same* lifetime or a *longer* lifetime than the referring instance.
  - Classic Apple example: `CreditCard` and `Customer`. A credit card cannot exist without a customer; the customer may outlive the card, but the card will never outlive the customer.

### Summary Comparison Table

| Feature | Strong | Weak | Unowned |
|---|---|---|---|
| Increments Strong Count | Yes (+1) | No (0) | No (0) |
| Can be `let` | Yes | No (always `var`) | Yes (or `var`) |
| Optionality | Optional or Non-Optional | Always Optional (`?`) | Usually Non-Optional |
| When Target Deallocates | Target stays alive | Becomes `nil` automatically | Dangling reference (runtime crash on access) |
| Lifetime Relationship | Owner / independent | Target has shorter / nullable life | Target has same or longer life |

---

## 2. Common Misconceptions & Interview Traps

1. **"Weak can be declared as `let`"**:
   - *Correction*: `weak let` causes a compile error. Because ARC must change the variable to `nil` when the referenced instance deallocates, weak references must always be mutable (`var`).
2. **"Unowned is just weak without optionals"**:
   - *Correction*: Weak references are automatically zeroed by the runtime when the target deallocates. Unowned references are NOT zeroed; accessing them after target deallocation causes a runtime trap.
3. **"Always use unowned because it avoids optional unwrapping"**:
   - *Correction*: In real-world iOS development, unexpected asynchronous events, view controller dismissal, or network callbacks can invalidate lifetime assumptions. Using `weak` is significantly safer whenever lifetime guarantees cannot be strictly verified.
4. **"Weak references keep objects alive until read"**:
   - *Correction*: Weak references do not keep objects alive. If all strong references disappear, the object deallocates immediately regardless of how many weak references exist.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: Strong keeps objects alive. Weak does not keep objects alive and turns to `nil` when the object is freed. Weak is always `var` and optional.
- **Junior**:
  - Focus: Strong vs weak vs unowned. Weak becomes `nil` (used for delegates and closures). Unowned expects the object to never be `nil` while referenced (crashes if accessed after deallocation). Choose weak when target can outlive or die before, unowned when target lives as long or longer.
- **Senior**:
  - Focus: Swift runtime internals (side tables for weak references vs unowned reference counts stored in object metadata), `unowned(safe)` vs `unowned(unsafe)`, memory impact of side tables, and architectural guidelines (preferring `weak` for safety in asynchronous UI architectures).

---

## 4. Official Sources & References

1. **The Swift Programming Language: Automatic Reference Counting**:
   - https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting
2. **WWDC21: ARC in Swift: Basics and beyond**:
   - https://developer.apple.com/videos/play/wwdc2021/10216/
