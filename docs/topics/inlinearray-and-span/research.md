# InlineArray and Span — Research Notes

Verified: 2026-11-14
Baseline: Swift 6.4.2, Xcode 27, iOS 27

## Sources

1. **InlineArray (Swift)** (official, Apple)
   - URL: `https://developer.apple.com/documentation/swift/inlinearray`
   - Covers `InlineArray<let count: Int, Element>`, `[count of Element]` shorthand, inline stack/struct storage, fixed compile-time size.
2. **Span (Swift)** (official, Apple)
   - URL: `https://developer.apple.com/documentation/swift/span`
   - Covers `Span<Element>`, safe contiguous memory access, bounds checking, `~Escapable` lifetime dependency.
3. **Swift 6.2 Released | Swift.org** (official, Swift.org)
   - URL: `https://www.swift.org/blog/swift-6.2-released/`
   - Introduces `InlineArray` and `Span` family (`Span`, `MutableSpan`, `RawSpan`, `OutputSpan`) for safe, zero-allocation performance.
4. **SE-0453: InlineArray, a fixed-size array** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0453-vector.md`
   - Covers value generic count, inline layout without heap allocation or ARC, eager value copying (no copy-on-write), and `~Copyable` element support.
5. **SE-0447: Span: Safe Access to Contiguous Storage** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0447-span-access-shared-contiguous-storage.md`
   - Covers spatial safety (bounds-checked), temporal safety (lifetime-bound / `~Escapable`), and replacing `withUnsafeBufferPointer`.

## Verified Facts (checked with Swift 6.4.2 compiler)

- **`InlineArray` (`[count of Element]`):**
  - Stores a fixed number of elements inline (on the stack or directly inside the enclosing struct/class), with zero heap allocation and zero ARC retain/release overhead.
  - Syntax: `InlineArray<3, Int>` or shorthand `[3 of Int]`, plus `InlineArray<4, Int>(repeating: 7)`.
  - Fixed size at compile time (`count` is part of the type); cannot `append` or resize.
  - Eager copying: unlike `Array` (which uses copy-on-write heap buffers), copying an `InlineArray` copies all elements right away.
  - Supports `~Copyable` elements (`[2 of Item]`) and `for x in array` / `.indices` / `.span` / `.mutableSpan`.
- **`Span` and its family (`MutableSpan`, `RawSpan`, `OutputSpan`):**
  - `Span<Element>`: non-owning, read-only, bounds-checked view over contiguous memory (from `Array`, `InlineArray`, etc.).
  - Temporal safety (`~Escapable`): a `Span` depends on the lifetime of its source container; returning a local `Span` fails with `error: a function cannot return a ~Escapable result`, and keeping a `Span` while mutating its source (`mutableSpan`) fails with an exclusivity violation.
  - `MutableSpan<Element>`: non-owning mutable view over contiguous memory, enforcing exclusive write access.
  - `RawSpan`: obtained via `span.bytes` for bounds-checked raw byte inspection.
  - `OutputSpan<Element>`: safe initialization view (e.g., `Array<Int>(capacity: 3) { output in output.append(5) }`), replacing unsafe uninitialized buffer pointer closures.

## Common Misconceptions & Interview Traps

1. **Thinking `InlineArray` uses copy-on-write like `Array`:** `InlineArray` copies eagerly like a tuple, so passing a huge `InlineArray` by value copies all elements unless passed as `borrowing` or via `.span`.
2. **Thinking `InlineArray` can grow with `append`:** The element count is fixed in the type (`[3 of Int]` cannot become `[4 of Int]`).
3. **Thinking `Span` is an unsafe pointer or owns memory:** `Span` is bounds-checked (spatial safety) and lifetime-bound (`~Escapable`, temporal safety) — it cannot outlive its owner.
4. **Thinking `Span` replaces `Array`:** `Array` is still the default dynamic collection; `InlineArray` and `Span` are tools for hot paths, fixed buffers, and safe low-level APIs.
