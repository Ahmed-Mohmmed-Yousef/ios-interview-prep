# Memory Safety and Exclusive Access — Research Notes

Verified: 2026-11-14
Baseline: Swift 6.4.2, Xcode 27, iOS 27

## Sources

1. **The Swift Programming Language: Memory Safety** (official, Swift.org)
   - URL: `https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety`
   - Covers the Law of Exclusivity: read vs write accesses, instantaneous vs long-term accesses, conflicting access to `inout` parameters, `self` in mutating methods, and struct properties.
2. **Swift 6.2 Released | Swift.org** (official, Swift.org)
   - URL: `https://www.swift.org/blog/swift-6.2-released/`
   - Introduces opt-in Strict Memory Safety (`-strict-memory-safety`) to audit unsafe APIs with `unsafe` and `@unsafe`.
3. **SE-0458: Opt-in Strict Memory Safety Checking** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0458-strict-memory-safety.md`
   - Covers `-strict-memory-safety`, `.strictMemorySafety()` in `Package.swift`, the `unsafe` expression keyword, `@unsafe` attribute, `#if hasFeature(StrictMemorySafety)`, and safe replacements like `Span` / `InlineArray`.

## Verified Facts (checked with Swift 6.4.2 compiler)

- **Foundational memory safety:** Swift prevents reading uninitialized variables (definite initialization), tracks object lifetimes with ARC, checks array bounds, and enforces exclusive access to memory.
- **The Law of Exclusivity:** Two accesses to the same memory location must not overlap if at least one of them is a **write**.
  - **Read vs write:** Multiple concurrent reads are safe; a write requires exclusive access.
  - **Instantaneous vs long-term access:** Simple reads/writes are instantaneous (cannot overlap on one thread). Passing a variable as `inout` or calling a `mutating` method starts a **long-term** write access for the entire call.
  - **Compile-time vs runtime enforcement:**
    - `balance(&score, &score)` or `p.shareHealth(with: &p)` fails at **compile time** (`error: inout arguments are not allowed to alias each other`).
    - A nested closure capturing `var step = 1` while `increment(&step)` holds long-term write access compiles and traps at **runtime** (`Simultaneous accesses ..., but modification requires exclusive access`). Fix by reading a local copy (`let delta = step`) before calling `increment`.
    - Disjoint stored properties of a **local struct** (`balance(&player.health, &player.energy)`) compile and run cleanly because the compiler proves the two fields do not overlap.
    - Stored struct properties on a **class** (`swapInts(&pair.a, &pair.b)`) overlap on `Box.pair` and trap at **runtime** unless copied to a local struct first or separated.
- **Opt-in Strict Memory Safety (Swift 6.2+, SE-0458):**
  - Enabled via `-strict-memory-safety`, Xcode's **Strict Memory Safety** build setting, or `.strictMemorySafety()` in `Package.swift`.
  - Flags unmarked uses of unsafe APIs (such as `UnsafePointer`, `UnsafeBufferPointer`, or `@unsafe` functions) with compiler warnings (`#StrictMemorySafety`) unless wrapped with the **`unsafe`** expression keyword (e.g., `unsafe ptr.pointee`).
  - Writing `unsafe` around a completely safe call triggers `#UnnecessaryUnsafe` warning (`no unsafe operations occur within 'unsafe' expression`).
  - `#if hasFeature(StrictMemorySafety)` detects whether the flag is enabled at compile time.
  - Prefer safe alternatives (`Span`, `InlineArray`) instead of silencing unsafe pointers when possible.

## Common Misconceptions & Interview Traps

1. **Thinking exclusivity only applies to multithreading:** Exclusivity violations happen on a **single thread** whenever a long-term `inout` or `mutating` access overlaps another access to the same memory. (Data races across threads are handled by Swift 6 concurrency isolation and `Sendable`.)
2. **Thinking all exclusivity conflicts are caught at compile time:** Aliasing `&x, &x` is caught at compile time, while closure captures and class-property struct fields can pass compilation and trap at runtime.
3. **Thinking `unsafe` makes unsafe pointers safe:** The `unsafe` keyword does not add runtime safety checks; it marks the boundary for human security audits, just like `try` marks throwing calls.
4. **Thinking `withUnsafePointer(to:)` itself needs `unsafe`:** `withUnsafePointer(to:)` is safe to call; the unsafe operations are using the pointer (`ptr.pointee`) or calling `@unsafe` functions inside the closure.
