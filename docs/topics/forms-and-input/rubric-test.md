# Rubric Test — Forms and User Input (Step 5)

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
| **q24** Purpose and platform appearance of `Form` | **Good:** Model answer explaining Form is designed for data entry and settings; renders on iOS as an inset grouped list with rounded cards and dividers, and on macOS as an aligned vertical grid. | 100 | Yes | Pass (100%) |
| | **Average:** "Form groups input controls into sections and gives them native styling on iOS." (Misses macOS grid description). | 70 | Yes | Pass (70%) |
| | **Weak:** "Form is a replacement for UICollectionView flow layout on all platforms." | 0 | No | Fail (0%) |
| **q25** How `@FocusState` manages and dismisses keyboard | **Good:** Explains `@FocusState` tracks and controls active keyboard focus; attaches via `.focused()` modifier; setting the value to `false` or `nil` dismisses the keyboard programmatically. | 100 | Yes | Pass (100%) |
| | **Average:** "@FocusState tracks which field is focused, and you set it to false to dismiss the keyboard." (Misses mention of .focused() modifier). | 85 | Yes | Pass (85%) |
| | **Weak:** "You dismiss the keyboard by calling resignFirstResponder on the window." | 0 | No | Fail (0%) |
| **q26** Importance of matching `Picker` tags | **Good:** Explains each option must have a `.tag()` matching the selection binding type exactly; mismatched tags prevent SwiftUI from linking options, causing selection taps to fail to update state. | 100 | Yes | Pass (100%) |
| | **Average:** "Tags must match the selection type or the picker will not work when selected." (Brief but captures both key points). | 80 | Yes | Pass (80%) |
| | **Weak:** "Tags are only used for VoiceOver screen reading in accessibility mode." | 0 | No | Fail (0%) |
| **q27** Form validation and disabling submit | **Good:** Explains using computed properties like `isFormValid` checking input requirements; attaches `.disabled(!isFormValid)` to the submit button so SwiftUI updates it reactively. | 100 | Yes | Pass (100%) |
| | **Average:** "You check the inputs in a computed property and disable the button if it is false." (Brief explanation of both criteria). | 80 | Yes | Pass (80%) |
| | **Weak:** "You display a UIAlertView when the user presses submit." | 0 | No | Fail (0%) |
| **q28** Why `SecureField` must be used for passwords | **Good:** Explains `SecureField` masks characters with dots, disables keyboard suggestion caching, and prevents credential leaks compared to `TextField`. | 100 | Yes | Pass (100%) |
| | **Average:** "SecureField masks text with dots so people nearby cannot read passwords." (Misses keyboard cache and credential leak details). | 70 | Yes | Pass (70%) |
| | **Weak:** "SecureField automatically hashes the password with SHA-256." | 0 | No | Fail (0%) |
| **q29** `RegistrationForm` struct validation | **Good:** Model answer declaring `struct RegistrationForm` with `username` and `password`, and `isSubmitAllowed` requiring `username.count >= 3 && password.count >= 6`. | 100 | Yes | Pass (100%) |
| | **Average:** Correct struct and validation, but uses `> 3` and `> 6` instead of `>= 3` and `>= 6`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing properties or computed property returns hardcoded true. | 30 | No | Fail (30%) |
| **q30** `AccountType` enum | **Good:** Model answer declaring `enum AccountType: String, CaseIterable, Identifiable` with `personal`, `business`, `creator` cases and `var id: String { rawValue }`. | 100 | Yes | Pass (100%) |
| | **Average:** Conforms to protocols and cases, but forgets `id` property or returns UUID instead of `rawValue`. | 75 | Yes | Pass (75%) |
| | **Weak:** Declares a struct or misses `CaseIterable` and `Identifiable` protocols. | 40 (capped) | No | Fail (40%) |
| **q31** `ProfileDraft` struct with reset | **Good:** Model answer declaring `struct ProfileDraft` with `displayName` and `isNewsletterSubscribed`, and `mutating func reset()` clearing name and setting toggle to false. | 100 | Yes | Pass (100%) |
| | **Average:** Correct struct and properties, but omits `mutating` keyword on reset method. | 70 | Yes | Pass (70%) |
| | **Weak:** Reset method does not mutate properties or only resets one field. | 40 (capped) | No | Fail (40%) |

---

## Verdict

The rubrics successfully:
1. Assess foundational knowledge of `Form` platform adaptation and semantic structure.
2. Verify understanding of `@FocusState` for keyboard management and dismissal.
3. Validate picker tag type alignment and two-way binding behavior.
4. Score implementation accuracy for validation models, enums with `Identifiable`, and mutating state resets.
