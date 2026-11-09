# Rubric Test — Lists and ForEach (Step 5)

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
| **q24** List vs ScrollView + VStack performance | **Good:** Explains that List uses lazy row recycling and only loads visible cells into memory, whereas ScrollView with VStack loads every row eagerly causing memory spikes on large collections. | 100 | Yes | Pass (100%) |
| | **Average:** "List is lazy and recycles cells. ScrollView loads everything at once, which can be slower." (Misses explicit memory spike detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "List only holds text strings while ScrollView holds images." | 0 | No | Fail (0%) |
| **q25** computed UUID id danger | **Good:** Explains computed id generates a fresh UUID on every access/redraw; unstable identity breaks SwiftUI diffing engine; causes scroll position jumps, animation glitches, and state loss. | 100 | Yes | Pass (100%) |
| | **Average:** "Computed UUID creates a new ID every time the view renders, so SwiftUI thinks all rows are new and animations look bad." | 80 | Yes | Pass (80%) |
| | **Weak:** "UUID() computed property is deprecated in Swift 6." | 0 | No | Fail (0%) |
| **q26** .onDelete on List compilation error | **Good:** Explains .onDelete is defined on DynamicViewContent, which List does not conform to; ForEach conforms to it; fix is to nest ForEach inside List and attach .onDelete to ForEach. | 100 | Yes | Pass (100%) |
| | **Average:** "List does not have onDelete. You must put a ForEach inside the List and put onDelete on that." (Misses DynamicViewContent protocol). | 70 | Yes | Pass (70%) |
| | **Weak:** "onDelete only works on Core Data managed objects." | 0 | No | Fail (0%) |
| **q27** id: \.self on duplicate elements | **Good:** Explains duplicate elements produce identical IDs; identical IDs confuse SwiftUI diffing algorithm; causes wrong row deletions, broken selections, and visual glitching. | 100 | Yes | Pass (100%) |
| | **Average:** "If elements are duplicate, SwiftUI gets confused because IDs must be unique, causing delete bugs." | 70 | Yes | Pass (70%) |
| | **Weak:** "id: \.self causes a fatal runtime crash whenever an array has more than 10 items." | 0 | No | Fail (0%) |
| **q28** Identifiable optimization & animations | **Good:** Explains Identifiable gives a stable persistent key; SwiftUI matches IDs between render passes to find inserts, deletes, and moves; animates only modified rows without rebuilding the whole list. | 100 | Yes | Pass (100%) |
| | **Average:** "Identifiable lets SwiftUI know which items moved or got added so it only animates those items." (Misses diffing mechanism details). | 80 | Yes | Pass (80%) |
| | **Weak:** "Identifiable caches the rendered bitmap images into GPU memory." | 0 | No | Fail (0%) |
| **q29** ProductItem Identifiable code-write | **Good:** Model answer with `struct ProductItem: Identifiable`, `let id = UUID()`, `let name: String`, instantiates and prints `item.name`. | 100 | Yes | Pass (100%) |
| | **Average:** Declares `var id = UUID()` as computed property or omits instantiation print. | 60 | Yes | Pass (60%) |
| | **Weak:** Struct does not conform to Identifiable and omits id property. | 20 (capped) | No (Identifiable missed) | Fail (20%) |
| **q30** SimpleCityList code-write | **Good:** Model answer with `struct SimpleCityList: View`, `let cities = ["Paris", "Tokyo"]`, and `List(cities, id: \.self) { city in Text(city) }`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses standard VStack instead of List inside body. | 60 (capped) | No (List missed) | Fail (60%) |
| | **Weak:** Omits View conformance and body property entirely. | 20 (capped) | No (View missed) | Fail (20%) |
| **q31** DeletableItemList code-write | **Good:** Model answer with `struct DeletableItemList: View`, `@State private var items`, `List`, `ForEach`, and `.onDelete { items.remove(atOffsets: $0) }`. | 100 | Yes | Pass (100%) |
| | **Average:** Attaches `.onDelete` to `List` instead of `ForEach`. | 50 (capped) | No (ForEach onDelete missed) | Fail (50%) |
| | **Weak:** Uses immutable let items array and omits onDelete closure. | 20 (capped) | No (mutability & onDelete missed) | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Confirm comprehension of list cell recycling, virtualization, and lazy loading performance vs eager ScrollView.
2. Verify understanding of stable identity, diffing mechanics, and the dangers of computed UUIDs or duplicate identifiers.
3. Test practical SwiftUI skills including `DynamicViewContent`, `ForEach` placement, and swipe-to-delete implementations.
