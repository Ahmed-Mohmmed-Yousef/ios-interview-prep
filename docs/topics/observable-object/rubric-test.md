# Rubric Test — ObservableObject and @StateObject (Step 5)

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
| **q24** Difference between `@StateObject` and `@ObservedObject` | **Good:** Model answer explaining that `@StateObject` owns model lifecycle and persists across redraws, while `@ObservedObject` does not own lifecycle and recreates instances on parent redraws if initialized inline. | 100 | Yes | Pass (100%) |
| | **Average:** "@StateObject owns the object and keeps it alive. @ObservedObject is for objects passed from outside." (Misses inline initialization hazard). | 80 | Yes | Pass (80%) |
| | **Weak:** "@StateObject is for structs and @ObservedObject is for classes." | 0 | No | Fail (0%) |
| **q25** What is `objectWillChange` and when does it fire | **Good:** Explains it is a Combine publisher required by `ObservableObject`; fires during `willSet` before the new value is stored; notifies observing SwiftUI views to prepare to redraw. | 100 | Yes | Pass (100%) |
| | **Average:** "It is a publisher that fires when a published property changes to redraw the view." (Misses willSet timing before property updates). | 80 | Yes | Pass (80%) |
| | **Weak:** "It fires after the view has finished rendering on the device screen." | 0 | No | Fail (0%) |
| **q26** Why coarse-grained invalidation hurts performance | **Good:** Explains invalidation occurs at the whole-object level rather than property level; any `@Published` change invalidates all observing views even if reading unchanged properties; causes excess body evaluations in large hierarchies. | 100 | Yes | Pass (100%) |
| | **Average:** "Every view redrawing on any change creates excess recalculations." (Misses explanation of object-level vs property-level granularity). | 70 | Yes | Pass (70%) |
| | **Weak:** "It hurts performance because Combine runs all publishers on the audio queue." | 0 | No | Fail (0%) |
| **q27** Migration steps to `@Observable` | **Good:** Explains replacing `ObservableObject` protocol with `@Observable` macro; removing `@Published` from stored properties; replacing `@StateObject` with `@State` and `@ObservedObject` with regular properties or `@Bindable`. | 100 | Yes | Pass (100%) |
| | **Average:** "Add @Observable to the class, remove @Published, and change @StateObject to @State." (Misses @ObservedObject to @Bindable/property). | 70 | Yes | Pass (70%) |
| | **Weak:** "Just import Observation and leave all property wrappers unchanged." | 0 | No | Fail (0%) |
| **q28** Why `@EnvironmentObject` can crash and prevention | **Good:** Explains that missing environment objects cause fatal runtime crashes; prevented by injecting at navigation root or migrating to `@Environment(Model.self)`. | 100 | Yes | Pass (100%) |
| | **Average:** "If you forget to inject it with .environmentObject, the app crashes." (Misses prevention techniques). | 50 (capped) | Yes | Fail (50%) |
| | **Weak:** "It crashes because @EnvironmentObject is not thread-safe with CoreData." | 0 | No | Fail (0%) |
| **q29** `TaskTracker` observable class | **Good:** Model answer declaring `class TaskTracker: ObservableObject` with `@Published var completedCount: Int = 0` and `completeTask()` incrementing it. | 100 | Yes | Pass (100%) |
| | **Average:** Implements class with `ObservableObject` and `completeTask`, but forgets `@Published` on `completedCount`. | 70 | Yes | Pass (70%) |
| | **Weak:** Declares a struct instead of a class. | 40 (capped) | No | Fail (40%) |
| **q30** `MessageFeed` with published array | **Good:** Model answer declaring `class MessageFeed: ObservableObject` with `@Published var messages: [String] = []` and `postMessage(_ text: String)` appending text. | 100 | Yes | Pass (100%) |
| | **Average:** Correct class and `@Published`, but `postMessage` takes no argument or appends empty string. | 70 | Yes | Pass (70%) |
| | **Weak:** Omits `ObservableObject` conformance completely. | 40 (capped) | No | Fail (40%) |
| **q31** `CustomCounter` with manual `objectWillChange.send()` | **Good:** Model answer declaring `class CustomCounter: ObservableObject` with `var value: Int = 0 { willSet { objectWillChange.send() } }`. | 100 | Yes | Pass (100%) |
| | **Average:** Declares `willSet` observer, but forgets to call `objectWillChange.send()`. | 60 (capped) | No | Fail (60%) |
| | **Weak:** Uses `@Published` wrapper instead of manual `objectWillChange.send()`. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Distinguish lifecycle ownership (`@StateObject`) from borrowed observation (`@ObservedObject`).
2. Test comprehension of Combine publisher timing (`objectWillChange` in `willSet`).
3. Differentiate coarse-grained object invalidation from modern property-level tracking.
4. Verify migration strategies from Combine-based `ObservableObject` to Swift macros.
5. Score implementation accuracy for `ObservableObject`, `@Published`, and manual publisher emissions.
