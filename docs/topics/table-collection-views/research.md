# Research: Table and Collection Views (UIKit)

## 1. Core Concepts & Technical Facts

### Cell Reuse Pattern
- Rendering thousands of unique views would exhaust device memory and drop frames.
- UIKit recycles off-screen cells into a reuse queue managed by `UITableView` or `UICollectionView`.
- As new cells scroll into view, `dequeueReusableCell(withIdentifier:for:)` reclaims an existing cell from the queue instead of allocating a new instance.
- **`prepareForReuse()`**:
  - Called automatically right before a recycled cell is returned by the dequeue method.
  - Used to reset cell state: cancel ongoing image download tasks, clear text/images, reset selection checkmarks, restore default colors.
  - Failure to clean up produces visual glitches where old cell data flashes on newly scrolled rows.

### Diffable Data Sources (iOS 13+)
- Replaces traditional index-path-based `UITableViewDataSource` / `UICollectionViewDataSource`.
- Solves synchronization bugs and `NSInternalInconsistencyException` crashes caused by mismatches during `performBatchUpdates`.
- Structure:
  `UICollectionViewDiffableDataSource<SectionIdentifierType: Hashable, ItemIdentifierType: Hashable>`
- Updates are driven by snapshots:
  ```swift
  var snapshot = NSDiffableDataSourceSnapshot<Section, Item>()
  snapshot.appendSections([.main])
  snapshot.appendItems(items)
  dataSource.apply(snapshot, animatingDifferences: true)
  ```
- The framework calculates data differences automatically and renders fluid insertions, deletions, and moves with animations.
- Thread safety: `apply(snapshot)` can be called from background queues; UIKit handles diffing and dispatches animations safely to the main queue.

### Compositional Layout (iOS 13+)
- `UICollectionViewCompositionalLayout` organizes collection view geometry into a 4-tier hierarchy:
  1. **`NSCollectionLayoutItem`**: The individual visual element.
  2. **`NSCollectionLayoutGroup`**: Combines items horizontally or vertically.
  3. **`NSCollectionLayoutSection`**: Groups of items with optional headers, footers, and orthogonal scrolling.
  4. **`UICollectionViewCompositionalLayout`**: The container layout combining sections.
- Dimensions (`NSCollectionLayoutDimension`):
  - `.fractionalWidth(0.5)` / `.fractionalHeight(1.0)` — proportional to parent container.
  - `.absolute(120)` — fixed points.
  - `.estimated(60)` — dynamic self-sizing based on Auto Layout or text length.
- Orthogonal Scrolling (`section.orthogonalScrollingBehavior`):
  - Enables horizontal carousels embedded directly within a vertical list (e.g. App Store home page) without nesting child collection views.

### Modern Cell Configuration (iOS 14+)
- **`UICollectionView.CellRegistration`**: Type-safe registration without string identifiers or downcasting.
- **`UIListContentConfiguration`**: Modern replacement for legacy `cell.textLabel` and `cell.detailTextLabel`. Supports standard list styling (`.cell()`, `.subtitleCell()`, `.valueCell()`).

---

## 2. Common Misconceptions & Interview Traps

1. **"Non-unique items in Diffable Data Source snapshots"**:
   - *Trap*: Passing an array containing two items with the same `id` or `Hashable` value into `snapshot.appendItems(...)`.
   - *Correction*: Item identifiers must be strictly unique within the snapshot. Diffable data source throws an assertion crash if duplicates are detected.
2. **"Doing heavy work or image downloads inside the cell provider closure"**:
   - *Trap*: Synchronously reading image data or parsing JSON inside `dataSource = UICollectionViewDiffableDataSource { cell, indexPath, item in ... }`.
   - *Correction*: The cell provider must be fast and lightweight. Trigger asynchronous image fetches with proper cancellation in `prepareForReuse()`.
3. **"Stale cell data due to missing `prepareForReuse()` reset"**:
   - *Trap*: Failing to cancel image tasks in `prepareForReuse()`. When scrolling quickly, a slow network response can return late and overwrite the newly assigned image with an old picture.
   - *Correction*: Cancel data tasks and clear images inside `prepareForReuse()`.
4. **"Nesting collection views for horizontal scrolling"**:
   - *Trap*: Embedding a `UICollectionView` inside a `UITableViewCell` to create a horizontal carousel. This causes gesture conflicts, nested delegate nightmares, and poor memory recycling.
   - *Correction*: Use `UICollectionViewCompositionalLayout` with `section.orthogonalScrollingBehavior = .continuous`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: In UIKit, table views show single-column lists and collection views show grids. Cells are recycled using `dequeueReusableCell` to save memory. In modern iOS, we use diffable data sources with snapshots instead of manual reload calls. We clean up cell state in `prepareForReuse()`.
- **Junior**:
  - Focus: Explaining how cell recycling works (visible buffer + reuse queue). Contrasting traditional `reloadData` / batch update crashes with type-safe `DiffableDataSource` and unique `Hashable` identifiers. Using `UICollectionViewCompositionalLayout` (Item -> Group -> Section) and orthogonal scrolling for carousels. Using `UIListContentConfiguration` for cell content.
- **Senior**:
  - Focus: Deep dive into the Myers diff algorithm underlying diffable data sources. Eliminating scroll hitching by offloading snapshot calculations to background queues. Memory optimization for self-sizing dynamic cells (`estimated` sizing and `preferredLayoutAttributesFitting`). Image prefetching architecture with `UICollectionViewDataSourcePrefetching` and request cancellation tokens in `prepareForReuse`.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Updating collection views using diffable data sources**:
   - https://developer.apple.com/documentation/uikit/updating-collection-views-using-diffable-data-sources
2. **Apple Developer Documentation: UICollectionViewCompositionalLayout**:
   - https://developer.apple.com/documentation/uikit/uicollectionviewcompositionallayout
3. **Apple Developer Documentation: UITableView**:
   - https://developer.apple.com/documentation/uikit/uitableview
