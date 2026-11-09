# Rubric Test — Dark Mode and Dynamic Type (Step 5)

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
| **q24** Semantic colors adaptation and hardcoding drawbacks | **Good:** Explains semantic colors resolve dynamically to light or dark shades based on the active trait collection; hardcoded colors fail to adapt and cause contrast and legibility bugs. | 100 | Yes | Pass (100%) |
| | **Average:** "Semantic colors switch between light and dark backgrounds. Hardcoded colors stay white or black." | 85 | Yes | Pass (85%) |
| | **Weak:** "Semantic colors compress asset sizes in Xcode." | 0 | No | Fail (0%) |
| **q25** `UILabel` Dynamic Type configuration | **Good:** Mentions using `UIFont.preferredFont`, setting `adjustsFontForContentSizeCategory = true`, setting `numberOfLines = 0`, and removing fixed height constraints. | 100 | Yes | Pass (100%) |
| | **Average:** "Set preferredFont and adjustsFontForContentSizeCategory to true so the text scales." | 75 | Yes | Pass (75%) |
| | **Weak:** "Set label text alignment to center in storyboard." | 0 | No | Fail (0%) |
| **q26** `@ScaledMetric` in SwiftUI | **Good:** Explains non-text elements like icons and padding do not scale automatically with text; `@ScaledMetric` scales numeric dimensions relative to a text style for visual balance. | 100 | Yes | Pass (100%) |
| | **Average:** "ScaledMetric scales numbers like icon sizes when font size changes." | 80 | Yes | Pass (80%) |
| | **Weak:** "ScaledMetric converts metric units like meters to feet." | 0 | No | Fail (0%) |
| **q27** Fixed height constraints and adaptive layouts | **Good:** Explains fixed heights cut off and truncate enlarged typography; describes removing fixed heights, using intrinsic sizing, and switching horizontal layouts to vertical stacks. | 100 | Yes | Pass (100%) |
| | **Average:** "Fixed heights cut off text. You should let the label size itself and wrap lines." | 80 | Yes | Pass (80%) |
| | **Weak:** "Fixed heights speed up GPU texture caching." | 0 | No | Fail (0%) |
| **q28** `traitCollectionDidChange` vs `registerForTraitChanges` | **Good:** Explains `traitCollectionDidChange` is deprecated in iOS 17 and `registerForTraitChanges` targets specific traits, executing closures safely without retain cycles. | 100 | Yes | Pass (100%) |
| | **Average:** "traitCollectionDidChange is deprecated in iOS 17 so you register for specific traits instead." | 80 | Yes | Pass (80%) |
| | **Weak:** "They are identical methods with different names in Swift." | 0 | No | Fail (0%) |
| **q29** `DynamicColorFactory` makeAdaptiveColor method | **Good:** Declares `struct DynamicColorFactory` with `static func makeAdaptiveColor() -> UIColor` returning dynamic color checking `.dark` style for white and black. | 100 | Yes | Pass (100%) |
| | **Average:** Constructs dynamic color, but checks `.light` style with inverted logic. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not return a dynamic UIColor or fails to compile. | 25 | No | Fail (25%) |
| **q30** `AccessibleLabelFactory` makeAccessibleLabel method | **Good:** Declares `class AccessibleLabelFactory` with `@MainActor static func makeAccessibleLabel(textStyle:)` setting preferredFont, enabling auto-scaling, and multiline wrapping. | 100 | Yes | Pass (100%) |
| | **Average:** Sets preferredFont and auto-scaling, but forgets `numberOfLines = 0`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not configure label or fails to compile. | 25 | No | Fail (25%) |
| **q31** `CustomFontScaler` scaleCustomFont method | **Good:** Declares `struct CustomFontScaler` with `static func scaleCustomFont(size: CGFloat, textStyle: UIFont.TextStyle) -> UIFont` using `UIFontMetrics` scaledFont. | 100 | Yes | Pass (100%) |
| | **Average:** Scales font, but hardcodes text style instead of using the method argument. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not use UIFontMetrics or fails to compile. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Assess semantic colors adaptability versus hardcoded color contrast failures.
2. Verify complete UIKit Dynamic Type setup (`preferredFont`, `adjustsFontForContentSizeCategory`, `numberOfLines = 0`).
3. Validate `@ScaledMetric` proportional scaling for non-text components in SwiftUI.
4. Test adaptive layout handling to avoid text truncation and clipping at accessibility sizes.
5. Verify modern trait observation via `registerForTraitChanges` in iOS 17+.
6. Validate code implementations for dynamic color factories, accessible labels, and custom font scaling.
