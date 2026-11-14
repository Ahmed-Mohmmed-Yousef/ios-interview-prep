# Noncopyable Types and Ownership — Research Notes

Verified: 2026-11-14
Baseline: Swift 6.4.2, Xcode 27, iOS 27

## Sources

1. **WWDC24: Consume noncopyable types in Swift** (official, Apple)
   - URL: `https://developer.apple.com/videos/play/wwdc2024/10170/`
   - Covers `~Copyable`, unique ownership, `deinit` on value types, `borrowing`, `consuming`, `inout`, `consume`, `discard self`, and generic `<T: ~Copyable>`.
2. **SE-0390: Noncopyable structs and enums** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0390-noncopyable-structs-and-enums.md`
   - Covers suppressing default `Copyable` conformance on structs and enums, `deinit`, `discard self`, and move-only assignment.
3. **SE-0377: Parameter Ownership Modifiers** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0377-parameter-ownership-modifiers.md`
   - Covers `borrowing` (temporary read without copy or ownership transfer) and `consuming` (transfers ownership; caller can no longer use the value), plus explicit `copy` when needed inside `borrowing`/`consuming` parameters.
4. **SE-0427: Noncopyable Generics** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0427-noncopyable-generics.md`
   - Covers `Copyable` protocol, suppressing implicit `Copyable` with `<T: ~Copyable>` and `protocol Foo: ~Copyable`, and standard library support like `Optional<Wrapped: ~Copyable>`.
5. **SE-0432: Borrowing and Consuming Pattern Matching for Noncopyable Types** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0432-noncopyable-switch.md` (note: check exact proposal URL or cite SE-0390/SE-0427/WWDC24 if SE-0432 filename differs)

## Verified Facts (checked with Swift 6.4.2 compiler)

- **Default `Copyable`:** By default, every Swift type conforms to `Copyable`. Writing `: ~Copyable` on a `struct` or `enum` suppresses that conformance so the compiler prevents implicit copies.
- **Unique ownership and move:** Assigning `let b = a` on a `~Copyable` variable moves ownership from `a` to `b`. Using `a` afterward fails to compile with `'a' used after consume`.
- **Value-type `deinit`:** Noncopyable structs and enums can define a `deinit` (copyable structs and enums cannot). `deinit` runs automatically when the single owner goes out of scope.
- **Parameter ownership modifiers:**
  - `borrowing`: gives temporary read-only access without copying or taking ownership; the caller keeps using its value afterward. (Also the default for normal `func` parameters on copyable types, and suppresses implicit copies.)
  - `consuming`: transfers ownership to the callee/method, ending the caller's access (`used after consume` if accessed again).
  - `inout` (and `mutating` on methods): gives temporary exclusive write access without consuming the value permanently.
- **`consume` and `discard self`:**
  - `consume x` explicitly ends the binding `x` and moves its value (works on copyable types too to avoid an extra copy).
  - `discard self` inside a `consuming func` destroys `self` without running `deinit` (ideal when an explicit `close()` or `redeem()` already cleaned up the resource).
- **Noncopyable generics and protocols:**
  - Generic parameters assume `Copyable` unless written `<T: ~Copyable>`.
  - Protocols assume `Copyable` unless written `protocol Resource: ~Copyable`.
  - `Optional` supports `~Copyable` wrapped values (`FileLock?`), and pattern matching (`switch`) can borrow associated values without consuming the enum.
- **Top-level global note:** Global variables of `~Copyable` types cannot be consumed at top level (`cannot consume noncopyable stored property ... that is global`), so ownership examples run inside functions.

## Common Misconceptions & Interview Traps

1. **Thinking `~Copyable` means "class" or heap allocation:** Noncopyable types are still value types (`struct` or `enum`), avoiding ARC reference counting while guaranteeing single ownership.
2. **Thinking `deinit` always runs even after `discard self`:** `discard self` explicitly suppresses `deinit` so cleanup does not run twice.
3. **Forgetting that generic `<T>` requires `Copyable` by default:** A generic function `<T>` cannot accept a `~Copyable` argument unless updated to `<T: ~Copyable>` with explicit `borrowing` / `consuming` / `inout` ownership.
4. **Thinking `borrowing` and `consuming` only apply to `~Copyable` types:** They also work on regular `Copyable` types to avoid unnecessary ARC retains or copies in hot paths.
