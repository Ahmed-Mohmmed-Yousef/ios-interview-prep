# Topic Research: Pagination

**Topic ID:** `pagination`  
**Level:** Mid  
**Prerequisites:** `urlsession`, `swiftui-lists`  
**Date Researched:** 2026-11-10  
**Target Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Official Documentation & Authoritative Sources

1. **LazyVStack (SwiftUI Documentation)**  
   URL: https://developer.apple.com/documentation/swiftui/lazyvstack  
   *Summary:* A view that arranges its children in a line growing vertically, creating items only as needed when they scroll into the visible viewport. Serves as the foundation for smooth infinite scrolling lists.

2. **URLSession (Foundation Documentation)**  
   URL: https://developer.apple.com/documentation/foundation/urlsession  
   *Summary:* Coordinates network data transfers. Using `data(from:)` or `data(for:)` with `URLComponents` enables query parameter injection (e.g. `page`, `limit`, `cursor`).

3. **WWDC21 Session 10022: Demystify SwiftUI**  
   URL: https://developer.apple.com/videos/play/wwdc2021/10022/  
   *Summary:* Details view identity, lifetime, and lazy container evaluation. Emphasizes stable identifiers (`Identifiable`) to prevent scroll jumps and unwanted view recreation during list updates.

4. **REST API Pagination Design Guidelines**  
   URL: https://developer.apple.com/documentation/foundation/urlcomponents  
   *Summary:* Standard web engineering patterns comparing offset-limit pagination (`page`, `offset`, `limit`) with cursor-based pagination (`cursor`, `starting_after`).

---

## 2. Core Technical Concepts

### A. Pagination Strategies: Offset vs Cursor
- **Offset-Limit Pagination (`offset=20&limit=20` or `page=2`):**
  - Intuitive and allows jumping directly to arbitrary pages.
  - Vulnerable to duplicates and missing items when records are inserted or deleted in real time while scrolling.
  - Slower on massive databases due to SQL `OFFSET` row traversal.
- **Cursor-Based Pagination (`cursor=opaqueToken&limit=20`):**
  - Uses an opaque pointer or sort key (e.g. timestamp or UUID).
  - Resilient against real-time data insertions (no shifting duplicates).
  - High database performance via indexed range scans (`WHERE id < cursor`).
  - Cannot jump to arbitrary pages; requires sequential navigation.

### B. Trigger Mechanisms in SwiftUI
- **Lazy Evaluation:** `LazyVStack` and `List` construct cell views on-demand as they approach the screen.
- **Threshold Detection:** Instead of waiting for the very last item, triggering `.onAppear` on an item near the bottom (e.g. 5 items before the end) pre-fetches the next page seamlessly, creating an infinite scroll illusion.

### C. State Machine & Edge Cases
- **Concurrent Request Prevention:** Guard against duplicate fetches using boolean flags (`isLoading`) or task cancellation to prevent firing multiple identical requests during rapid scroll gestures.
- **End-of-Stream Detection:** Track `hasMore` or `nextCursor == nil` to stop unnecessary requests when the dataset is exhausted.
- **Deduplication:** Maintain unique identifiers (`id`) to prevent duplicate items in `ForEach` when network retries occur.
- **Pull-to-Refresh Reset:** Reset pagination state (`items.removeAll()`, `cursor = nil`) on `.refreshable`.

---

## 3. Common Interview Questions & Traps

1. **What is the difference between offset-limit and cursor-based pagination?**  
   Offset-limit asks for a page number or skip count, which allows jumping to page N but causes duplicates or missed items if records change while scrolling. Cursor-based pagination uses an opaque pointer to the last item, ensuring stable pagination and faster database indexes.
2. **How do you prevent duplicate network calls during rapid scrolling?**  
   Use an `isLoading` guard flag or store an active `Task` reference that cancels or ignores secondary calls until the ongoing fetch completes.
3. **Why is triggering pagination on the exact last item suboptimal?**  
   Triggering on the last item forces the user to see a spinner and wait for network latency. Triggering on a threshold item (e.g., 5 items before the end) pre-fetches the page before the user reaches the bottom.
4. **Why do duplicate IDs in a paginated list crash or break SwiftUI animations?**  
   SwiftUI `ForEach` requires stable, unique identifiers. Duplicate IDs cause undefined diffing behavior, layout glitches, or runtime crashes. Deduplicate incoming pages by ID before appending.
