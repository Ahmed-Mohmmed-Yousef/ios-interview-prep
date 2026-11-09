# Rubric Test — @State and @Binding (Step 5)

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
| **q24** @State vs @Binding differences | **Good:** Explains @State owns and stores local source of truth in persistent memory; @Binding owns no data and provides a two-way connection to data owned elsewhere. | 100 | Yes | Pass (100%) |
| | **Average:** "@State holds the data in a view. @Binding lets a child view update the parent's data." (Misses lack of local storage in binding). | 75 | Yes | Pass (75%) |
| | **Weak:** "@State is for structs and @Binding is for reference classes." | 0 | No | Fail (0%) |
| **q25** marking @State as private | **Good:** Explains @State is a view-local source of truth; marking private enforces encapsulation; prevents external views from bypassing component interfaces. | 100 | Yes | Pass (100%) |
| | **Average:** "It should be private so other views cannot change it directly without a binding." | 80 | Yes | Pass (80%) |
| | **Weak:** "Private is required because public properties crash in SwiftUI." | 0 | No | Fail (0%) |
| **q26** dollar sign prefix ($) projected value | **Good:** Explains $ accesses the projected value of a property wrapper; for @State it returns Binding; connects controls like Toggle or TextField for two-way sync. | 100 | Yes | Pass (100%) |
| | **Average:** "The dollar sign creates a binding to the state property to pass into toggles." (Misses projected value concept). | 70 | Yes | Pass (70%) |
| | **Weak:** "The dollar sign converts numbers into currency strings." | 0 | No | Fail (0%) |
| **q27** initializing @State in custom init | **Good:** Explains SwiftUI initializes @State storage only once when entering view hierarchy; subsequent parent redraws passing new values are ignored; recommends let or @Binding. | 100 | Yes | Pass (100%) |
| | **Average:** "SwiftUI only sets up state once, so if the parent changes the parameter, the child state will not update." (Misses let/Binding recommendation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Custom init crashes because property wrappers cannot be initialized." | 0 | No | Fail (0%) |
| **q28** unidirectional data flow with @State and @Binding | **Good:** Explains state flows downward from a single source of truth; user actions flow upward via bindings; state mutations trigger automatic UI invalidation and redraw. | 100 | Yes | Pass (100%) |
| | **Average:** "Data flows down from parent state to child views, and child views send updates back through bindings to redraw." | 80 | Yes | Pass (80%) |
| | **Weak:** "Data flows bidirectionally through global NotificationCenter singletons." | 0 | No | Fail (0%) |
| **q29** StepCounter code-write | **Good:** Model answer declaring `struct StepCounter: View` with `@State private var steps: Int = 0` and `VStack { Text("Steps: \(steps)") }`. | 100 | Yes | Pass (100%) |
| | **Average:** Declares public @State variable instead of private. | 80 | Yes | Pass (80%) |
| | **Weak:** Declares standard let property instead of @State. | 30 (capped) | No (@State missed) | Fail (30%) |
| **q30** ToggleButton code-write | **Good:** Model answer with `struct ToggleButton: View`, `@Binding var isSelected: Bool`, and `Button("Toggle") { isSelected.toggle() }`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses @State instead of @Binding in child button view. | 40 (capped) | No (@Binding missed) | Fail (40%) |
| | **Weak:** Omits button action closure and leaves binding unused. | 30 | No | Fail (30%) |
| **q31** TextInputRow code-write | **Good:** Model answer with `struct TextInputRow: View`, `@Binding var text: String`, and `TextField("Enter name", text: $text)`. | 100 | Yes | Pass (100%) |
| | **Average:** Passes text instead of $text into TextField. | 60 (capped) | No ($ binding missed) | Fail (60%) |
| | **Weak:** Hardcodes a static string instead of binding. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Confirm comprehension of state ownership, lifetime outside struct instances, and the role of `@Binding` as a data reference.
2. Verify understanding of encapsulation best practices (`private` access control) and the projected value (`$`) operator.
3. Assess knowledge of architectural traps (custom `init` state initialization and body mutation loops).
4. Validate practical SwiftUI code authoring for stateful controls, bindings, and interactive view updates.
