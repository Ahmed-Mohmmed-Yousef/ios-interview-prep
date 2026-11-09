# Rubric Test — Auto Layout (Step 5)

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
| **q24** `translatesAutoresizingMaskIntoConstraints` purpose | **Good:** Explains default true converts legacy autoresizing masks into implicit constraints; setting false disables these masks to prevent collisions with custom anchors. | 100 | Yes | Pass (100%) |
| | **Average:** "It tells UIKit to stop using autoresizing masks so your custom constraints will not conflict." | 85 | Yes | Pass (85%) |
| | **Weak:** "It enables automatic translation of text strings into other languages." | 0 | No | Fail (0%) |
| **q25** Content Hugging vs Compression Resistance | **Good:** Explains Content Hugging resists stretching and the lower priority stretches to fill extra width; Compression Resistance resists shrinking and higher priority prevents text truncation. | 100 | Yes | Pass (100%) |
| | **Average:** "Content hugging stops a view from stretching, and compression resistance stops it from being clipped." | 85 | Yes | Pass (85%) |
| | **Weak:** "Content hugging is for vertical stacks and compression resistance is for scroll views." | 0 | No | Fail (0%) |
| **q26** Leading/Trailing vs Left/Right anchors | **Good:** Explains leading and trailing flip automatically for right-to-left languages like Arabic and Hebrew; left and right remain fixed to physical sides and break localization. | 100 | Yes | Pass (100%) |
| | **Average:** "Leading and trailing adapt to RTL languages like Arabic, while left and right stay fixed." | 85 | Yes | Pass (85%) |
| | **Weak:** "Leading and trailing are faster for the GPU to render on screen." | 0 | No | Fail (0%) |
| **q27** `safeAreaLayoutGuide` purpose | **Good:** Defines safe area as visible screen space clear of hardware notches, Dynamic Island, and home bar; explains pinning interactive controls keeps them unobstructed across devices. | 100 | Yes | Pass (100%) |
| | **Average:** "Safe area guide prevents your buttons from being covered by the screen notch or home bar." | 85 | Yes | Pass (85%) |
| | **Weak:** "Safe area guide prevents memory crashes when allocating views." | 0 | No | Fail (0%) |
| **q28** Unsatisfiable constraints conflict | **Good:** Explains contradictory required constraints (priority 1000) make solver satisfaction impossible; lowering one priority below 1000 resolves the conflict gracefully. | 100 | Yes | Pass (100%) |
| | **Average:** "It happens when two required constraints conflict, and you fix it by lowering one priority." | 85 | Yes | Pass (85%) |
| | **Weak:** "It happens when you forget to import UIKit into the view controller." | 0 | No | Fail (0%) |
| **q29** `EdgePinner` pinEdges method | **Good:** Declares `class EdgePinner` with `@MainActor static func pinEdges(child: UIView, to parent: UIView)` disabling mask translation, adding subview, and activating 4 edge constraints. | 100 | Yes | Pass (100%) |
| | **Average:** Pins all 4 edges, but misses `child.translatesAutoresizingMaskIntoConstraints = false`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing 2 or more edge constraints or does not call addSubview. | 30 | No | Fail (30%) |
| **q30** `CenterPinner` centerInParent method | **Good:** Declares `class CenterPinner` with `@MainActor static func centerInParent(child: UIView, parent: UIView, size: CGSize)` centering with centerX/centerY and setting width/height. | 100 | Yes | Pass (100%) |
| | **Average:** Centers view correctly, but hardcodes width and height instead of using `size` argument. | 75 | Yes | Pass (75%) |
| | **Weak:** Does not center child in parent or fails to compile. | 25 | No | Fail (25%) |
| **q31** `PriorityConfigurator` configurePriorities | **Good:** Declares `struct PriorityConfigurator` with `@MainActor static func configurePriorities(titleLabel: UILabel, badgeLabel: UILabel)` setting title hugging to `.defaultLow` and badge hugging to `.defaultHigh`. | 100 | Yes | Pass (100%) |
| | **Average:** Sets hugging on only one label or uses compression resistance instead of hugging. | 70 | Yes | Pass (70%) |
| | **Weak:** Sets priorities to 0 or hardcoded invalid numbers. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Validate understanding of `translatesAutoresizingMaskIntoConstraints` and constraint conflicts.
2. Distinguish Content Hugging (stretching) from Compression Resistance (clipping).
3. Check right-to-left internationalization rules (leading/trailing vs left/right).
4. Verify safe area protection mechanics for modern hardware notches and home bars.
5. Test code implementation of edge pinning, center pinning, and layout priority assignment.
