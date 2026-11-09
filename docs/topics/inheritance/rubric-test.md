# Rubric Test — Inheritance (Step 5)

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
| **q24** What inheritance is, supported types, base classes | **Good:** Explains inheritance allows subclasses to inherit stored/computed properties and methods from superclasses; only classes support inheritance in Swift; classes without superclasses are independent base classes without a universal root object. | 100 | Yes | Pass (100%) |
| | **Average:** "Inheritance allows subclasses to take methods from parents. It only works on classes." (Misses base class and universal root absence). | 80 | Yes | Pass (80%) |
| | **Weak:** "Inheritance works on structs and classes to share memory." | 0 | No | Fail (0%) |
| **q25** The override keyword and super calls | **Good:** Explains override tells the compiler to verify that a matching method exists in the superclass, preventing typos; super lets code invoke the superclass implementation. | 100 | Yes | Pass (100%) |
| | **Average:** "override replaces parent methods and super calls parent methods." (Misses compiler verification rationale). | 75 | Yes | Pass (75%) |
| | **Weak:** "override makes methods public." | 0 | No | Fail (0%) |
| **q26** Final modifier on classes/methods and performance | **Good:** Explains final prevents classes from being subclassed and methods from being overridden; unlocks direct static dispatch and compiler inlining instead of dynamic table dispatch. | 100 | Yes | Pass (100%) |
| | **Average:** "final stops subclassing and makes the program run faster." (Misses direct static dispatch / vtable explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "final means the variable cannot be changed." | 25 | No | Fail (25%) |
| **q27** Two-phase initialization rule | **Good:** Explains Phase 1 initializes all new subclass stored properties before calling super.init(); Phase 2 allows self referencing and method calls after super.init() completes. | 100 | Yes | Pass (100%) |
| | **Average:** "You must assign subclass properties before calling super.init()." (Misses Phase 2 description). | 70 | Yes | Pass (70%) |
| | **Weak:** "super.init() must always be called on line one of an init." | 0 | No | Fail (0%) |
| **q28** Composition and protocols vs deep inheritance | **Good:** Explains deep class hierarchies cause tight coupling and fragile base class bugs; composition and protocols provide decoupled reuse across value types without shared mutable state or retain cycles. | 100 | Yes | Pass (100%) |
| | **Average:** "Deep inheritance makes code hard to change. Protocols are more flexible." | 70 | Yes | Pass (70%) |
| | **Weak:** "Inheritance is deprecated in Swift." | 0 | No | Fail (0%) |
| **q29** Circle subclass overriding draw() code-write | **Good:** Model answer: class Circle: Shape with override func draw() -> String returning "Drawing circle". | 100 | Yes | Pass (100%) |
| | **Average:** Omits override keyword, causing build failure. | 50 (capped) | No (override missed) | Fail (50%) |
| | **Weak:** Creates Circle struct without inheriting from Shape. | 0 | No | Fail (0%) |
| **q30** SecureDocument subclass initializer code-write | **Good:** Model answer: initializes self.clearanceLevel before delegating up to super.init(title: title). | 100 | Yes | Pass (100%) |
| | **Average:** Calls super.init(title: title) before initializing self.clearanceLevel, violating two-phase initialization. | 50 (capped) | No (init order missed) | Fail (50%) |
| | **Weak:** Defines initializer that does not call super.init(). | 40 | No | Fail (40%) |
| **q31** PremiumGateway final subclass code-write | **Good:** Model answer: final class PremiumGateway: PaymentGateway with override var feePercentage: Double { 0.015 }. | 100 | Yes | Pass (100%) |
| | **Average:** Omits final modifier on the class declaration. | 50 (capped) | No (final missed) | Fail (50%) |
| | **Weak:** Redefines PaymentGateway instead of subclassing. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully evaluate:
1. Understanding of inheritance mechanics, class-only restriction, and absence of a universal root class.
2. Knowledge of compiler validation with `override` and `super` invocation.
3. Awareness of `final` devirtualization optimizations and two-phase initialization rules.
4. Architectural ability to reason about composition versus inheritance trade-offs.
