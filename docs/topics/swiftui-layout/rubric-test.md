# Rubric Test — Stacks and Layout (Step 5)

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
| **q24** 3-step layout negotiation process | **Good:** Explains parent proposes size; child chooses its own size and reports back; parent positions child in coordinates; parent cannot force size. | 100 | Yes | Pass (100%) |
| | **Average:** "Parent proposes a size and child chooses its size based on content." (Misses parent positioning step). | 70 | Yes | Pass (70%) |
| | **Weak:** "Parent calculates exact coordinates and forces the child into that box." | 0 | No | Fail (0%) |
| **q25** Spacer behavior in HStack vs VStack | **Good:** Explains Spacer expands along the primary axis of its stack; expands horizontally in HStack to push left and right; expands vertically in VStack to push top and bottom. | 100 | Yes | Pass (100%) |
| | **Average:** "A Spacer expands to push views apart in a stack." (Misses explicit primary axis comparison between HStack and VStack). | 65 | Yes | Pass (65%) |
| | **Weak:** "Spacer has a fixed width of twenty points on all screens." | 0 | No | Fail (0%) |
| **q26** frame overflow and clipping | **Good:** Explains frame defines proposed layout dimensions but does not clip content by default; text/images bleed outside; requires .clipped() to cut off content. | 100 | Yes | Pass (100%) |
| | **Average:** "Content bleeds outside the frame unless you use the clipped modifier to cut it off." (Misses layout positioning detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Frames crash if content is larger than the width and height." | 0 | No | Fail (0%) |
| **q27** space distribution in HStack | **Good:** Explains SwiftUI offers space to least flexible views first; divides remaining space among flexible views; mentions .layoutPriority can adjust priority. | 100 | Yes | Pass (100%) |
| | **Average:** "SwiftUI gives space to rigid views first and then shares remaining space with flexible views." (Misses layoutPriority). | 70 | Yes | Pass (70%) |
| | **Weak:** "HStack divides space equally among all children at all times." | 0 | No | Fail (0%) |
| **q28** ZStack layering and touch interaction | **Good:** Explains ZStack draws views from back to front along the Z-axis; earlier views sit behind later views; foreground views can block touches to underlying views. | 100 | Yes | Pass (100%) |
| | **Average:** "ZStack draws views in code order, with earlier views behind later views." (Misses touch blocking implications). | 80 | Yes | Pass (80%) |
| | **Weak:** "ZStack draws views randomly based on GPU rendering speed." | 0 | No | Fail (0%) |
| **q29** LabeledRow code-write | **Good:** Model answer declaring `struct LabeledRow: View` with `HStack { Text("Username"); Spacer(); Text("john_doe") }`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses a fixed frame or padding instead of a `Spacer()` to separate the labels. | 60 (capped) | No (Spacer missed) | Fail (60%) |
| | **Weak:** Puts views inside a VStack instead of an HStack. | 30 | No | Fail (30%) |
| **q30** StatusCard code-write | **Good:** Model answer declaring `struct StatusCard: View` with `ZStack { Color.blue.frame(width: 150, height: 80); Text("Active") }`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses an HStack or background modifier rather than a ZStack container. | 60 (capped) | No (ZStack missed) | Fail (60%) |
| | **Weak:** Hardcodes text without the blue color view. | 30 | No | Fail (30%) |
| **q31** HeaderStack code-write | **Good:** Model answer with `VStack(alignment: .leading, spacing: 6)` containing `Text("Welcome").bold()` and `Text("Please log in")`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses default center alignment instead of `.leading` alignment on the stack. | 70 | Yes | Pass (70%) |
| | **Weak:** Declares views without a stack container. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Confirm mastery of the 3-step SwiftUI layout negotiation process (parent proposes, child decides, parent positions).
2. Validate practical understanding of stack containers (`VStack`, `HStack`, `ZStack`) and axis-dependent `Spacer` mechanics.
3. Test edge-case behaviors: frame overflow without `.clipped()` and space rationing with `.layoutPriority`.
4. Assess code implementations for composite layouts, spacing configurations, and depth stacking.
