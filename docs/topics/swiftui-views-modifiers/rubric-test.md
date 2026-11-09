# Rubric Test — Views and Modifiers (Step 5)

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
| **q24** structs vs classes for SwiftUI views | **Good:** Explains views are lightweight UI descriptions; stack-allocated value types avoid reference counting; fast recreation enables frequent diffing. | 100 | Yes | Pass (100%) |
| | **Average:** "Views are structs because structs are value types that allocate on the stack and can be recreated quickly." (Misses diffing explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Views are structs because classes cannot conform to View in Swift." | 0 | No | Fail (0%) |
| **q25** modifier order and layout wrapping | **Good:** Explains modifiers wrap views in containers rather than mutating; compares .padding().background() with .background().padding(); notes visual color boundary difference. | 100 | Yes | Pass (100%) |
| | **Average:** "Modifiers wrap views into new layers. Applying padding before background makes a larger colored area than background before padding." | 80 | Yes | Pass (80%) |
| | **Weak:** "Modifier order matters because modifiers execute concurrently on background threads." | 0 | No | Fail (0%) |
| **q26** some View opaque return type | **Good:** Explains some View is an opaque return type; hides deeply nested generic types like ModifiedContent; preserves compile-time type safety. | 100 | Yes | Pass (100%) |
| | **Average:** "some View hides the long generic modifier names while letting the compiler know it conforms to View." (Misses opaque return type origin). | 70 | Yes | Pass (70%) |
| | **Weak:** "some View means the body can return any optional view that can be nil." | 0 | No | Fail (0%) |
| **q27** custom ViewModifier implementation | **Good:** Declares struct conforming to ViewModifier; implements body(content: Content) -> some View; writes View extension wrapping modifier() for dot syntax. | 100 | Yes | Pass (100%) |
| | **Average:** "Make a struct conforming to ViewModifier and implement body(content:). Then use .modifier(MyModifier()) on views." (Misses View extension). | 70 | Yes | Pass (70%) |
| | **Weak:** "Subclass UIViewModifier from UIKit." | 0 | No | Fail (0%) |
| **q28** slow tasks inside var body | **Good:** Explains body is called frequently on the main thread when state changes; slow work blocks main thread causing frame drops; recommends .task modifier. | 100 | Yes | Pass (100%) |
| | **Average:** "Body runs very often on the main thread, so slow network calls will freeze the app." (Misses .task or view model recommendation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Body only runs once when the app launches so tasks will not repeat." | 0 | No | Fail (0%) |
| **q29** StatusBadge code-write | **Good:** Model answer declaring `struct StatusBadge: View` with `var body: some View` and `Text("Online").padding(8).background(Color.green)`. | 100 | Yes | Pass (100%) |
| | **Average:** Declares view but puts background before padding, altering desired layout. | 70 | Yes | Pass (70%) |
| | **Weak:** Declares class StatusBadge instead of struct. | 30 (capped) | No (struct required) | Fail (30%) |
| **q30** CardStyle ViewModifier code-write | **Good:** Model answer declaring `struct CardStyle: ViewModifier`, applying `.padding(16)` and `.background(Color.gray.opacity(0.2))`, with `View.cardStyle()` extension. | 100 | Yes | Pass (100%) |
| | **Average:** Creates modifier struct properly but forgets the `View` extension method. | 75 | Yes | Pass (75%) |
| | **Weak:** Creates a custom view container instead of a ViewModifier. | 25 | No | Fail (25%) |
| **q31** UserGreeting view code-write | **Good:** Model answer with `let name: String`, `var body: some View`, displaying `Text("Hello, \(name)!").bold()`. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets `.bold()` modifier but implements struct and text interpolation properly. | 80 | Yes | Pass (80%) |
| | **Weak:** Omits stored name property and hardcodes greeting string. | 40 (capped) | No (name property missed) | Fail (40%) |

---

## Verdict

The rubrics successfully:
1. Validate core conceptual understanding of SwiftUI value-type view architecture and stack allocation efficiency.
2. Confirm knowledge of hierarchical modifier wrapping, order dependencies, and opaque return types (`some View`).
3. Assess proficiency with custom `ViewModifier` encapsulation and idiomatic `View` extensions.
4. Verify practical code authoring for custom views, modifier chains, and memberwise initialization.
