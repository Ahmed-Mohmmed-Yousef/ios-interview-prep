# Rubric Test — Navigation (Step 5)

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
| **q24** why NavigationStack replaced NavigationView | **Good:** Explains NavigationView had eager loading problems and navigation state bugs; NavigationStack provides data-driven routing with NavigationLink(value:); loads screens lazily when tapped. | 100 | Yes | Pass (100%) |
| | **Average:** "NavigationStack replaced NavigationView to separate data from destinations and prevent eager view loading." (Misses historical state bugs). | 80 | Yes | Pass (80%) |
| | **Weak:** "NavigationStack was created because NavigationView did not support dark mode." | 0 | No | Fail (0%) |
| **q25** .navigationTitle on NavigationStack container | **Good:** Explains navigation bar reflects active top child view; modifiers on NavigationStack configure outer container rather than active screen; fix is attaching to child content view inside stack. | 100 | Yes | Pass (100%) |
| | **Average:** "The navigation bar is configured by child views, so putting the title on NavigationStack does not show anything." (Misses container distinction). | 70 | Yes | Pass (70%) |
| | **Weak:** "navigationTitle only works inside UIKit UINavigationController subclasses." | 0 | No | Fail (0%) |
| **q26** NavigationPath vs [Route] array | **Good:** Explains NavigationPath is type-erased to store heterogeneous Hashable destinations; typed array like [Route] is limited to one homogeneous type; use NavigationPath for multi-type stacks. | 100 | Yes | Pass (100%) |
| | **Average:** "NavigationPath lets you push different data types onto the stack, while standard arrays only take one type." | 80 | Yes | Pass (80%) |
| | **Weak:** "NavigationPath is deprecated in favor of raw URL query strings." | 0 | No | Fail (0%) |
| **q27** programmatic pop to root | **Good:** Explains stack is bound to NavigationPath via NavigationStack(path: $path); clearing path with path = NavigationPath() or removeLast removes all screens; SwiftUI animates back to root. | 100 | Yes | Pass (100%) |
| | **Average:** "You bind a NavigationPath to the stack and assign a new empty NavigationPath() to pop all screens." (Misses animation detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "You call popViewControllerAnimated(true) on the root window scene." | 0 | No | Fail (0%) |
| **q28** why values must conform to Hashable | **Good:** Explains NavigationStack uses Hashable to track, compare, and identify destinations; matches value types against registered .navigationDestination blocks; missing conformance causes compiler error. | 100 | Yes | Pass (100%) |
| | **Average:** "Values need Hashable so SwiftUI can match them with navigationDestination closures." | 70 | Yes | Pass (70%) |
| | **Weak:** "Hashable is required because all Swift structs inherit from NSObject." | 0 | No | Fail (0%) |
| **q29** UserRoute Hashable code-write | **Good:** Model answer with `struct UserRoute: Hashable`, `let username: String`, instantiates and prints `route.username`. | 100 | Yes | Pass (100%) |
| | **Average:** Conforms to Equatable instead of Hashable, or omits instantiation print. | 60 | Yes | Pass (60%) |
| | **Weak:** Struct does not conform to Hashable and declares mutable class reference. | 20 (capped) | No (Hashable missed) | Fail (20%) |
| **q30** SimpleNavStack code-write | **Good:** Model answer with `struct SimpleNavStack: View`, `NavigationStack`, `List(items, id: \.self)`, and `.navigationTitle("Numbers")` on the list. | 100 | Yes | Pass (100%) |
| | **Average:** Attaches `.navigationTitle("Numbers")` to `NavigationStack` instead of `List`. | 60 (capped) | No (proper title placement missed) | Fail (60%) |
| | **Weak:** Omits View conformance and body property entirely. | 20 (capped) | No (View missed) | Fail (20%) |
| **q31** DeepLinkStack code-write | **Good:** Model answer with `struct DeepLinkStack: View`, `@State private var path = NavigationPath()`, `NavigationStack(path: $path)`, and `Button` appending to `path`. | 100 | Yes | Pass (100%) |
| | **Average:** Creates `NavigationStack` without binding `path: $path`. | 50 (capped) | No (path binding missed) | Fail (50%) |
| | **Weak:** Declares immutable let path and omits button action. | 20 (capped) | No (state & button missed) | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Confirm comprehension of value-based navigation, lazy destination resolution, and differences from deprecated `NavigationView`.
2. Verify understanding of navigation bar ownership and proper placement of `.navigationTitle()`.
3. Test practical SwiftUI skills including `NavigationPath` state management, programmatic deep linking, and pop-to-root implementations.
