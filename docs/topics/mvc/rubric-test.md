# Rubric Test — MVC and Its Problems (Step 5)

Run 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** Massive View Controller problem and causes | **Good:** Explains Massive View Controller as an antipattern caused by tight coupling between `UIViewController` and the view lifecycle, where developers put networking, layout, data sources, and business rules into one file. | 100 | Yes | Pass (100%) |
| | **Average:** "View controllers become massive when developers put table view data sources, network requests, and view styling in one file." | 85 | Yes | Pass (85%) |
| | **Weak:** "Massive view controller happens when an app supports both portrait and landscape orientation." | 0 | No | Fail (0%) |
| **q25** Three techniques to slim down UIViewController | **Good:** Describes extracting networking into dedicated service classes, splitting complex screens into child view controllers, and moving table data sources and formatters into separate Swift types. | 100 | Yes | Pass (100%) |
| | **Average:** "Extract networking into services and use child view controllers to split large screens." | 80 | Yes | Pass (80%) |
| | **Weak:** "Hide long methods by folding code blocks in the Xcode editor." | 0 | No | Fail (0%) |
| **q26** Why keeping business logic out of UIViewController improves testing | **Good:** Explains testing `UIViewController` requires loading views and lifecycle states (slow and fragile); pure Swift models have no UIKit dependencies and run in milliseconds. | 100 | Yes | Pass (100%) |
| | **Average:** "Testing view controllers requires loading UIKit views. Pure Swift models can be tested quickly without views." | 85 | Yes | Pass (85%) |
| | **Weak:** "View controllers can only be tested using manual screen touches on a real iPhone." | 0 | No | Fail (0%) |
| **q27** Smalltalk MVC vs Apple Cocoa MVC | **Good:** Explains in original Smalltalk MVC Views observed Models directly; in Apple Cocoa MVC the Controller mediates all communication and Views and Models never touch directly. | 100 | Yes | Pass (100%) |
| | **Average:** "In Smalltalk views listened to models directly, while in Cocoa the controller sits in the middle between them." | 85 | Yes | Pass (85%) |
| | **Weak:** "Smalltalk was developed by Google for Android phones." | 0 | No | Fail (0%) |
| **q28** How Coordinators solve navigation bloat | **Good:** Explains standard controllers hardcode transitions creating coupling; Coordinators extract navigation logic, instantiate screens, and manage app flow. | 100 | Yes | Pass (100%) |
| | **Average:** "Coordinators handle push and present navigation so view controllers do not know about next screens." | 85 | Yes | Pass (85%) |
| | **Weak:** "Coordinators align buttons on the screen using Auto Layout." | 0 | No | Fail (0%) |
| **q29** `Account` struct with `canWithdraw(amount:)` | **Good:** Defines `Account` struct with `Double balance` and `canWithdraw` returning true for positive amounts within balance. | 100 | Yes | Pass (100%) |
| | **Average:** Implements struct with balance and method, but allows negative amounts. | 60 | Yes | Fail (60%) |
| | **Weak:** Missing struct or invalid method signature. | 20 | No | Fail (20%) |
| **q30** `TemperatureFormatter` with `toFahrenheit` and `format` | **Good:** Implements static `toFahrenheit` with correct formula `(c * 9/5) + 32` and `format` returning integer degrees with `°F`. | 100 | Yes | Pass (100%) |
| | **Average:** Correct conversion formula, but format returns decimal string without `°F`. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns raw celsius temperature without conversion. | 10 | No | Fail (10%) |
| **q31** `UserListDataSource` with `add` and `count` | **Good:** Implements class with `private(set)` array, `add(name:)` appending names, and `count()` returning count. | 100 | Yes | Pass (100%) |
| | **Average:** Implements class and methods correctly, but uses public mutable array instead of `private(set)`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not store users or implement count method. | 10 | No | Fail (10%) |

---

## Verdict

The rubrics successfully:
1. Validate understanding of Cocoa MVC roles and mediation rules.
2. Test knowledge of Massive View Controller causes and concrete decomposition strategies.
3. Assess comprehension of unit test friction caused by UIKit lifecycle coupling.
4. Distinguish between Smalltalk MVC direct view observation and Apple Cocoa MVC controller mediation.
5. Grade clean Swift 6 model and helper implementations accurately.
