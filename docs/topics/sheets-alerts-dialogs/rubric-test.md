# Rubric Test — Sheets, Alerts and Dialogs (Step 5)

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
| **q24** Boolean vs Item presentation safety | **Good:** Model answer explaining `.sheet(isPresented:)` takes a Boolean binding and can crash when optional models become nil during dismiss animations; `.sheet(item:)` binds to an Identifiable item and passes an unwrapped instance that stays valid throughout dismissal. | 100 | Yes | Pass (100%) |
| | **Average:** "sheet(isPresented:) uses a bool and sheet(item:) uses an identifiable item so the data is unwrapped and does not crash." | 80 | Yes | Pass (80%) |
| | **Weak:** "sheet(item:) runs on a background worker thread for better performance." | 0 | No | Fail (0%) |
| **q25** Presentation detents usage and purpose | **Good:** Model answer explaining presentation detents control sheet resting heights on iOS 16+ using `.presentationDetents([.medium, .large])`, custom fractions with `.fraction(0.4)`, or fixed `.height(250)`. | 100 | Yes | Pass (100%) |
| | **Average:** "Presentation detents configure sheet heights like medium and large on iOS 16." (Brief but mentions purpose and syntax). | 80 | Yes | Pass (80%) |
| | **Weak:** "Presentation detents control landscape split view column proportions." | 0 | No | Fail (0%) |
| **q26** Missing navigation bar inside sheets | **Good:** Model answer explaining sheets exist in an isolated presentation window hierarchy outside the parent NavigationStack, and adding a title requires wrapping the sheet content in its own nested `NavigationStack`. | 100 | Yes | Pass (100%) |
| | **Average:** "Sheets do not inherit parent navigation, so you must add a NavigationStack inside the sheet." | 85 | Yes | Pass (85%) |
| | **Weak:** "You must set navigationBarHidden to false in the presenting view." | 0 | No | Fail (0%) |
| **q27** Interactive dismiss disabled purpose and scenarios | **Good:** Model answer explaining `.interactiveDismissDisabled` stops the downward swipe dismissal gesture; used when forms contain unsaved edits, active text input, or background tasks to prevent accidental data loss. | 100 | Yes | Pass (100%) |
| | **Average:** "It stops the user from swiping down to close the sheet when they have unsaved form text." | 85 | Yes | Pass (85%) |
| | **Weak:** "It removes the cancel button from the navigation toolbar." | 0 | No | Fail (0%) |
| **q28** Alert vs Confirmation Dialog comparison | **Good:** Model answer describing alerts as centered dialogs for critical errors and binary choices, and confirmation dialogs as bottom sheets listing contextual action options with an automatic Cancel button. | 100 | Yes | Pass (100%) |
| | **Average:** "Alert is a popup in the center for errors and confirmationDialog is a list of actions sliding up from the bottom." | 80 | Yes | Pass (80%) |
| | **Weak:** "Alert is for SwiftUI and confirmationDialog is only available in UIKit." | 0 | No | Fail (0%) |
| **q29** `AppSheet` identifiable enum | **Good:** Model answer declaring `enum AppSheet: Identifiable` with `settings` and `profile(username: String)` cases, and `id: String` computed property returning distinct strings. | 100 | Yes | Pass (100%) |
| | **Average:** Correct enum cases and Identifiable conformance, but id uses integer hash instead of clear string representations. | 75 | Yes | Pass (75%) |
| | **Weak:** Missing `Identifiable` conformance or missing cases. | 35 | No | Fail (35%) |
| **q30** `SheetCoordinator` struct with state methods | **Good:** Model answer declaring `struct SheetCoordinator` with `activeSheet: String? = nil` and mutating methods `present(name:)` and `dismiss()`. | 100 | Yes | Pass (100%) |
| | **Average:** Correct struct and methods, but activeSheet is non-optional or missing `mutating` on dismiss. | 70 | Yes | Pass (70%) |
| | **Weak:** Struct does not modify activeSheet or fails to compile. | 25 | No | Fail (25%) |
| **q31** `FormEditor` struct with canDismiss property | **Good:** Model answer declaring `struct FormEditor` with `text: String` and `isSaved: Bool`, and computed property `canDismiss: Bool` returning `isSaved || text.isEmpty`. | 100 | Yes | Pass (100%) |
| | **Average:** Correct properties, but logic uses `&&` instead of `||`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing computed property or returns hardcoded boolean. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Distinguish between Boolean and Identifiable item presentation bindings.
2. Evaluate knowledge of presentation detents and nested navigation stacks.
3. Test understanding of interactive dismissal prevention for unsaved changes.
4. Verify code construction for enum routes, coordinators, and form dismissal conditions.
