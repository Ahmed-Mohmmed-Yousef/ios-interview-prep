# Rubric Test: Pagination

**Topic:** `pagination`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Offset-Limit vs Cursor Pagination

**Prompt:** Explain the difference between offset-limit pagination and cursor-based pagination. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Offset-limit pagination requests data using a page number or skip count, allowing arbitrary page jumping. However, if new records are inserted at the top of a feed while scrolling, existing items shift down and create duplicate rows on subsequent pages. In contrast, cursor-based pagination uses an opaque pointer to the last viewed record, preventing duplicate shifts and improving database index performance."
- **Expected Score:** 100% (Met: offset-limit duplicates 50%, Met: cursor pointer stability 50%)
- **Rationale:** Thoroughly contrasts shifting issues in offset pagination with cursor stability and index benefits.

### Sample 2: Average
- **Answer:** "Offset pagination asks for page numbers, but if new items are added, you get duplicate rows. Cursor pagination uses a token from the last item so it never shows duplicates."
- **Expected Score:** 100% (Met: offset duplicates 50%, Met: cursor stability 50%)
- **Rationale:** Captures both core mechanics in plain language.

### Sample 3: Weak
- **Answer:** "Offset pagination is for web pages and cursor pagination is for mobile screens."
- **Expected Score:** 0% (Not Met: offset 0%, Not Met: cursor 0%)
- **Rationale:** Incorrect assumption regarding platform applicability.

---

## Question 25 (Written): Threshold Prefetching

**Prompt:** Why should infinite scrolling trigger a few items before the end of a list rather than on the last item? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Triggering pagination only when the user reaches the final row forces them to stop scrolling and wait for network latency. By triggering a prefetch five or ten items before the end, the next page downloads silently in the background while the user continues viewing content. This eliminates loading delays and creates a seamless, uninterrupted infinite scrolling experience."
- **Expected Score:** 100% (Met: latency delay on last row 50%, Met: prefetching background benefits 50%)
- **Rationale:** Fully explains latency hiding and continuous scrolling benefits.

### Sample 2: Average
- **Answer:** "If you wait for the last cell, the user hits a spinner and has to stop. Loading five items early lets the network finish before they reach the bottom."
- **Expected Score:** 100% (Met: delay 50%, Met: prefetch 50%)
- **Rationale:** Clear and accurate explanation of the threshold advantage.

### Sample 3: Weak
- **Answer:** "The last cell cannot be tapped by user fingers."
- **Expected Score:** 0% (Not Met: latency 0%, Not Met: prefetch 0%)
- **Rationale:** Factually incorrect statement regarding touch targets.

---

## Question 26 (Written): Guarding Against Duplicate Requests

**Prompt:** How do you prevent duplicate network requests when users scroll quickly past pagination threshold items? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "When a user flings a scroll view, multiple rows near the threshold trigger their onAppear closures within milliseconds. To prevent launching duplicate network calls for the same page, developers should guard the fetch method with a boolean isLoading check. When isLoading is true, subsequent trigger calls return immediately until the inflight request completes."
- **Expected Score:** 100% (Met: rapid onAppear triggers 50%, Met: isLoading guard flag 50%)
- **Rationale:** Identifies rapid trigger events and the boolean guard pattern.

### Sample 2: Average
- **Answer:** "You check if isLoading is true at the start of your function. If it is already loading, you return right away so you do not make two network calls."
- **Expected Score:** 75% (Partly Met: rapid trigger cause 25%, Met: isLoading guard 50%)
- **Rationale:** Explains the guard mechanism clearly with brief explanation of the trigger cause.

### Sample 3: Weak
- **Answer:** "Turn off internet access on the phone during scrolling."
- **Expected Score:** 0% (Not Met: triggers 0%, Not Met: guard 0%)
- **Rationale:** Unacceptable suggestion to disable connectivity.

---

## Question 27 (Written): Deduplication in SwiftUI Lists

**Prompt:** Why must paginated items be deduplicated before appending to a SwiftUI collection? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "SwiftUI ForEach containers require stable and unique identifiers for every child view to manage view identity and animations. If network retries or concurrent calls append items with duplicate IDs, SwiftUI diffing algorithms fail. This causes visual glitches, broken animations, or runtime layout crashes, which deduplicating by ID prevents."
- **Expected Score:** 100% (Met: unique ID requirement 50%, Met: diffing crashes and glitches 50%)
- **Rationale:** Thoroughly covers view identity, diffing requirements, and crash prevention.

### Sample 2: Average
- **Answer:** "SwiftUI ForEach needs unique IDs for each item. If you have duplicate IDs in your array, the list will glitch or crash."
- **Expected Score:** 100% (Met: unique ID 50%, Met: glitch/crash 50%)
- **Rationale:** Plain English answer capturing both core points.

### Sample 3: Weak
- **Answer:** "Deduplication makes the font size larger on older iPhones."
- **Expected Score:** 0% (Not Met: identity 0%, Not Met: glitches 0%)
- **Rationale:** Completely unrelated claim regarding fonts.

---

## Question 28 (Written): Pull-to-Refresh State Management

**Prompt:** Describe how to properly handle pull-to-refresh on a paginated feed without corrupting existing list state. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "When a user triggers pull-to-refresh, the app must reset its pagination state rather than appending newly fetched items to the end of the existing array. The ViewModel should cancel inflight pagination tasks, reset the nextCursor to nil, and set hasMore to true. It then fetches page one fresh and replaces the existing array, ensuring correct chronological order without duplicate rows."
- **Expected Score:** 100% (Met: reset cursor and items 50%, Met: fetch page one fresh 50%)
- **Rationale:** Full explanation of state reset, cursor clearing, and replacing array contents.

### Sample 2: Average
- **Answer:** "You clear the items array and set nextCursor back to nil. Then you load the first page again from the server so the list starts over."
- **Expected Score:** 100% (Met: reset state 50%, Met: load first page 50%)
- **Rationale:** Simple and correct workflow.

### Sample 3: Weak
- **Answer:** "Append the new items to the bottom of the old items."
- **Expected Score:** 0% (Not Met: reset 0%, Not Met: fresh page one 0%)
- **Rationale:** Recommends the exact anti-pattern being tested.

---

## Question 29 (Code-Write): appendDeduplicated Function

**Prompt:** Write a function appendDeduplicated(existing: inout [Int], newItems: [Int]) that appends only integers from newItems that do not already exist in existing.

### Sample 1: Good
```swift
func appendDeduplicated(existing: inout [Int], newItems: [Int]) {
    let seen = Set(existing)
    for item in newItems {
        if !seen.contains(item) {
            existing.append(item)
        }
    }
}
```
- **Expected Score:** 100% (Met: Set lookup 40%, Met: check items 40%, Met: inout append 20%)
- **Rationale:** Efficient O(N) deduplication using Set.

### Sample 2: Average
```swift
func appendDeduplicated(existing: inout [Int], newItems: [Int]) {
    for item in newItems {
        if !existing.contains(item) {
            existing.append(item)
        }
    }
}
```
- **Expected Score:** 80% (Partly Met: O(N^2) array search 20%, Met: check items 40%, Met: inout append 20%)
- **Rationale:** Functionally correct using array search instead of Set lookup.

### Sample 3: Weak
```swift
func appendDeduplicated(existing: inout [Int], newItems: [Int]) {
    existing.append(contentsOf: newItems)
}
```
- **Expected Score:** 20% (Not Met: Set lookup 0%, Not Met: check 0%, Met: inout append 20%)
- **Rationale:** Appends without deduplicating.

---

## Question 30 (Code-Write): PaginationState Class

**Prompt:** Create a class PaginationState with items, isLoading, hasMore, and a startLoading method that sets isLoading and returns a boolean.

### Sample 1: Good
```swift
final class PaginationState {
    var items: [String] = []
    var isLoading: Bool = false
    var hasMore: Bool = true

    func startLoading() -> Bool {
        guard !isLoading && hasMore else {
            return false
        }
        isLoading = true
        return true
    }
}
```
- **Expected Score:** 100% (Met: properties 40%, Met: guard condition 40%, Met: set isLoading and return 20%)
- **Rationale:** Clean implementation with guard pattern.

### Sample 2: Average
```swift
class PaginationState {
    var items: [String] = []
    var isLoading = false
    var hasMore = true

    func startLoading() -> Bool {
        if !isLoading && hasMore {
            isLoading = true
            return true
        }
        return false
    }
}
```
- **Expected Score:** 100% (Met: properties 40%, Met: guard condition 40%, Met: set isLoading and return 20%)
- **Rationale:** Valid implementation using if-else.

### Sample 3: Weak
```swift
class PaginationState {
    var items: [String] = []
    func startLoading() -> Bool { true }
}
```
- **Expected Score:** 20% (Partly Met: properties 20%, Not Met: guard 0%, Not Met: isLoading mutation 0%)
- **Rationale:** Missing isLoading and hasMore properties and guard logic.

---

## Question 31 (Code-Write): isThresholdReached Function

**Prompt:** Write a function isThresholdReached(currentIndex: Int, totalCount: Int, threshold: Int) -> Bool that returns true if currentIndex >= (totalCount - threshold) and totalCount >= threshold, or false otherwise.

### Sample 1: Good
```swift
func isThresholdReached(currentIndex: Int, totalCount: Int, threshold: Int) -> Bool {
    guard totalCount >= threshold else {
        return false
    }
    return currentIndex >= (totalCount - threshold)
}
```
- **Expected Score:** 100% (Met: totalCount guard 40%, Met: threshold calculation 40%, Met: boolean return 20%)
- **Rationale:** Correctly guards totalCount and checks threshold offset.

### Sample 2: Average
```swift
func isThresholdReached(currentIndex: Int, totalCount: Int, threshold: Int) -> Bool {
    if totalCount < threshold { return false }
    return currentIndex >= totalCount - threshold
}
```
- **Expected Score:** 100% (Met: totalCount guard 40%, Met: threshold calculation 40%, Met: boolean return 20%)
- **Rationale:** Concise and accurate.

### Sample 3: Weak
```swift
func isThresholdReached(currentIndex: Int, totalCount: Int, threshold: Int) -> Bool {
    return currentIndex == totalCount
}
```
- **Expected Score:** 20% (Not Met: totalCount guard 0%, Not Met: threshold calculation 0%, Met: boolean return 20%)
- **Rationale:** Compares equality without considering threshold parameter.
