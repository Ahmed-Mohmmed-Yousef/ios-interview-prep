# Rubric Test — Table and Collection Views (Step 5)

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
| **q24** Cell reuse mechanism and performance | **Good:** Explains off-screen cells enter a reuse queue and are reclaimed by dequeueReusableCell; recycling prevents memory spikes and dropped frames across large datasets. | 100 | Yes | Pass (100%) |
| | **Average:** "Cell reuse puts off-screen cells into a pool so you reuse them instead of allocating thousands of cells." | 85 | Yes | Pass (85%) |
| | **Weak:** "Cell reuse writes table contents to disk to save battery power." | 0 | No | Fail (0%) |
| **q25** `prepareForReuse()` purpose and omissions | **Good:** Explains prepareForReuse resets visual state and cancels active asynchronous download tasks; omitting it causes visual glitches and stale images flashing on recycled cells. | 100 | Yes | Pass (100%) |
| | **Average:** "It resets cell state like images and text. If you omit it, old images will show on new rows." | 85 | Yes | Pass (85%) |
| | **Weak:** "It configures Auto Layout constraints when a cell is initialized." | 0 | No | Fail (0%) |
| **q26** Diffable Data Sources vs traditional data sources | **Good:** Identifies manual index path math and batch update crashes in legacy sources; explains snapshots of Hashable items calculate diffs and animations automatically. | 100 | Yes | Pass (100%) |
| | **Average:** "Diffable data sources use Hashable snapshots so you do not get crashes with index paths." | 85 | Yes | Pass (85%) |
| | **Weak:** "Diffable data sources are only used on macOS and iPadOS." | 0 | No | Fail (0%) |
| **q27** 4-tier Compositional Layout hierarchy | **Good:** Explains Item defines individual cell size, Group arranges items horizontally or vertically, Section groups items with headers/insets, and Layout combines sections for the view. | 100 | Yes | Pass (100%) |
| | **Average:** "The hierarchy is Item, Group, Section, and Layout to build rows and sections." | 85 | Yes | Pass (85%) |
| | **Weak:** "The hierarchy starts with UIViewController down to CALayer." | 0 | No | Fail (0%) |
| **q28** Orthogonal scrolling vs nested collection views | **Good:** Defines orthogonal scrolling as perpendicular horizontal scrolling within vertical lists; explains it eliminates gesture collisions, nested delegates, and duplicate reuse pools. | 100 | Yes | Pass (100%) |
| | **Average:** "Orthogonal scrolling lets you scroll horizontally inside a vertical list without nesting another collection view." | 85 | Yes | Pass (85%) |
| | **Weak:** "Orthogonal scrolling converts collection views into 3D Metal scenes." | 0 | No | Fail (0%) |
| **q29** `SnapshotBuilder` createSnapshot method | **Good:** Declares `struct SnapshotBuilder` with `static func createSnapshot(items: [String])` appending section 1 and items, returning snapshot. | 100 | Yes | Pass (100%) |
| | **Average:** Creates snapshot and appends items, but forgets to append section 1 first. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not return a snapshot or fails to compile. | 25 | No | Fail (25%) |
| **q30** `LayoutFactory` createListLayout method | **Good:** Declares `class LayoutFactory` with `@MainActor static func createListLayout(rowHeight:)` constructing Item, Group with rowHeight, Section, and returning layout. | 100 | Yes | Pass (100%) |
| | **Average:** Constructs layout, but hardcodes row height instead of using `rowHeight` argument. | 75 | Yes | Pass (75%) |
| | **Weak:** Does not construct compositional layout or fails to compile. | 30 | No | Fail (30%) |
| **q31** `CleanableCell` prepareForReuse method | **Good:** Declares `class CleanableCell: UITableViewCell` with `var activeDownloadID: Int? = 42`, overriding `prepareForReuse()` calling super and setting `activeDownloadID = nil`. | 100 | Yes | Pass (100%) |
| | **Average:** Sets property to nil, but forgets to call `super.prepareForReuse()`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not inherit from UITableViewCell or fails to reset state. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Assess foundational knowledge of cell reuse and scroll performance economics.
2. Verify cleanup responsibilities in `prepareForReuse()` to avoid recycled visual glitches.
3. Validate understanding of `Hashable` diffable snapshots versus legacy batch update crashes.
4. Test the four-tier compositional layout hierarchy and orthogonal carousel mechanics.
5. Verify code implementation of snapshots, compositional layout factories, and cell cleanup.
