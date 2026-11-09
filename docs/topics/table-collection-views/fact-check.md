# Fact-Check — Table and Collection Views (Step 6)

Run 2026-11-09. Topic: `table-collection-views` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/table-collection-views/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/table-collection-views/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Updating collection views using diffable data sources](https://developer.apple.com/documentation/uikit/updating-collection-views-using-diffable-data-sources), [Apple Developer Documentation: UICollectionViewCompositionalLayout](https://developer.apple.com/documentation/uikit/uicollectionviewcompositionallayout), and [Apple Developer Documentation: UITableView](https://developer.apple.com/documentation/uikit/uitableview).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Cell reuse mechanics | Off-screen cells enter a reuse pool and are dequeued via `dequeueReusableCell` | Confirmed |
| `prepareForReuse()` | Runs right before dequeuing; resets state and cancels pending image downloads | Confirmed |
| Diffable data sources | `UICollectionViewDiffableDataSource` uses `Hashable` types to calculate animations | Confirmed |
| Unique snapshot items | Duplicate item identifiers throw fatal assertion crashes in diffable snapshots | Confirmed |
| Compositional Layout | 4-tier hierarchy: Item (`NSCollectionLayoutItem`), Group, Section, and Layout | Confirmed |
| Orthogonal scrolling | `section.orthogonalScrollingBehavior = .continuous` creates native horizontal carousels | Confirmed |
| Modern cell registration | `UICollectionView.CellRegistration` eliminates string reuse identifiers and downcasts | Confirmed |
| Main actor isolation | UIKit collection layout classes and methods execute on `@MainActor` under Swift 6 | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `auto-layout` and `protocols` are confirmed in prerequisites list.
2. **Progression in Batch 2D**: Ninth and final topic in Batch 2D (SwiftUI & UIKit), completing the entire Junior Level Wave 2 Batch 2D sequence.
