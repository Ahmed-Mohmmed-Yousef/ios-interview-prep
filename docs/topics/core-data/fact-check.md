# Fact-Check: Core Data

**Topic ID:** `core-data`  
**Date Checked:** 2026-11-10  
**Checker:** content-fact-checker  
**Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Source Verification

| Claim | Verified Source | Status |
|---|---|---|
| `NSPersistentContainer` manages the Core Data stack: model, coordinator, and contexts | [Apple Developer: NSPersistentContainer](https://developer.apple.com/documentation/coredata/nspersistentcontainer) | Pass |
| Faulting creates placeholder objects in memory until attributes are accessed | [Apple Developer: Faulting and Uniquing](https://developer.apple.com/documentation/coredata/faulting_and_uniquing) | Pass |
| Uniquing guarantees one `NSManagedObject` instance per record in a context | [Apple Developer: Faulting and Uniquing](https://developer.apple.com/documentation/coredata/faulting_and_uniquing) | Pass |
| Contexts are queue-confined; code must run within `perform` or `performAndWait` | [Apple Developer: NSManagedObjectContext](https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext) | Pass |
| `viewContext` is bound to the main queue for UI tasks | [Apple Developer: NSPersistentContainer](https://developer.apple.com/documentation/coredata/nspersistentcontainer) | Pass |
| `automaticallyMergesChangesFromParent = true` syncs background saves to viewContext | [Apple Developer: NSManagedObjectContext](https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext) | Pass |
| `NSManagedObjectID` is thread-safe and can cross queue boundaries | [Apple Developer: NSManagedObjectContext](https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext) | Pass |
| `relationshipKeyPathsForPrefetching` prevents N+1 fault loops | [Apple Developer: Core Data](https://developer.apple.com/documentation/coredata) | Pass |

---

## 2. Code Verification

- 2 lesson code examples compiled and run using `swiftc -swift-version 6`: **Passed**.
- 8 code-reading questions compiled and run using `swiftc -swift-version 6`: **Passed**.
- 3 code-write model answers compiled and run using `swiftc -swift-version 6`: **Passed**.
- Total verified code snippets: 13. All outputs match 100%.

---

## 3. Coverage & Quality Gates

- `scripts/check-coverage.mjs`: 0 errors, 0 warnings, 0 untaught terms.
- Plain English checks (`.claude/hooks/check-plain-english.mjs`): 0 banned words, all sentences <= 25 words, no contractions.
- Answer distribution: exactly 6 a, 6 b, 6 c, 5 d across 23 choice questions.
- Length ratio: right option length <= 1.5x longest wrong option on all questions.
- Rubrics: all 8 open questions have rubrics summing to 100 with key criteria marked.
