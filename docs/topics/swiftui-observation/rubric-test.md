# Rubric Test — Data Flow with @Observable (Step 5)

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
| **q24** Performance improvement of `@Observable` | **Good:** Model answer explaining property-level runtime tracking versus `ObservableObject` whole-object invalidation; views only redraw when properties read inside their body change, preventing unnecessary renders. | 100 | Yes | Pass (100%) |
| | **Average:** "@Observable tracks each property so only views that use the changed property redraw, rather than the whole screen." (Misses contrast with ObservableObject). | 70 | Yes | Pass (70%) |
| | **Weak:** "@Observable is faster because it moves all drawing to background threads." | 0 | No | Fail (0%) |
| **q25** Model ownership and passing in views | **Good:** Explains `@State` for ownership in parent view, plain properties like `let model: Model` for read access, and `@Bindable` when child views need two-way bindings. | 100 | Yes | Pass (100%) |
| | **Average:** "You store it with @State in the parent and pass it with @Bindable when you need text field bindings." (Misses plain property passing). | 70 | Yes | Pass (70%) |
| | **Weak:** "You use @StateObject in the parent and @ObservedObject in child views." | 0 | No | Fail (0%) |
| **q26** Purpose of `@ObservationIgnored` | **Good:** Explains it opts a stored property out of change tracking, and gives practical examples like internal IDs, temporary cache data, or logger objects. | 100 | Yes | Pass (100%) |
| | **Average:** "It stops a property from updating the view when changed, useful for internal things." (Lacks specific examples). | 75 | Yes | Pass (75%) |
| | **Weak:** "It deletes the property from memory when the view disappears." | 0 | No | Fail (0%) |
| **q27** Environment injection with `@Observable` | **Good:** Explains using `.environment(model)` for injection and `@Environment(Model.self)` for reading; contrasts with older `@EnvironmentObject` and notes no protocol conformance required. | 100 | Yes | Pass (100%) |
| | **Average:** "You inject with .environment(model) and read with @Environment(Model.self)." (Misses contrast with @EnvironmentObject and protocol difference). | 80 | Yes | Pass (80%) |
| | **Weak:** "You must write a custom EnvironmentKey struct with defaultValue." | 0 | No | Fail (0%) |
| **q28** Why `@StateObject` cannot be used with `@Observable` | **Good:** Explains `@StateObject` requires conformance to `ObservableObject`, while `@Observable` uses the Observation framework; causes compile error; use `@State` instead. | 100 | Yes | Pass (100%) |
| | **Average:** "@StateObject is only for ObservableObject. @Observable does not conform to it, so it does not compile." (Misses mentioning @State as the solution). | 80 | Yes | Pass (80%) |
| | **Weak:** "@StateObject works fine with @Observable if you import Combine." | 0 | No | Fail (0%) |
| **q29** `ItemStore` observable class | **Good:** Model answer declaring `@Observable class ItemStore`, stored property `var items: [String] = []`, and `func addItem(_ item: String) { items.append(item) }`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements class with `@Observable` and `items`, but addItem method takes no parameter or uses hardcoded string. | 70 | Yes | Pass (70%) |
| | **Weak:** Declares a struct or omits the `@Observable` macro entirely. | 40 (capped) | No | Fail (40%) |
| **q30** `PlayerProfile` with ignored token | **Good:** Model answer declaring `@Observable class PlayerProfile` with `username: String`, `points: Int`, `@ObservationIgnored var sessionToken: String`, and full initializer. | 100 | Yes | Pass (100%) |
| | **Average:** Correct properties and `@Observable`, but forgets `@ObservationIgnored` attribute on `sessionToken`. | 60 (capped) | No | Fail (60%) |
| | **Weak:** Missing initializer and class does not compile. | 40 | No | Fail (40%) |
| **q31** `observeModel` function with tracking | **Good:** Model answer declaring `@Observable class Counter`, using `withObservationTracking` with read closure and `onChange`, incrementing count, and printing values. | 100 | Yes | Pass (100%) |
| | **Average:** Implements `withObservationTracking` and mutates count, but forgets to read property inside the tracking block. | 60 | Yes | Pass (60%) |
| | **Weak:** Uses Combine publisher sink or NotificationCenter instead of `withObservationTracking`. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Differentiate property-level tracking in Observation from whole-object invalidation in `ObservableObject`.
2. Assess correct view ownership (`@State`), passing (plain properties), and bindings (`@Bindable`).
3. Verify comprehension of `@ObservationIgnored` and type-based environment injection.
4. Score implementation accuracy for `@Observable` models, stored properties, and runtime tracking with `withObservationTracking`.
