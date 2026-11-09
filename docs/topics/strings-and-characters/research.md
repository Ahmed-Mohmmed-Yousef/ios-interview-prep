# Research — Strings and Characters (Step 1)

Researched 2026-11-09. Topic: `strings-and-characters` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Strings and Characters](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters)**
- **Value Semantics**:
  - Swift strings are value types (`struct String`).
  - When copied or passed to functions, a string is copied conceptually, though Swift uses Copy-on-Write (COW) behind the scenes for efficiency.
- **Extended Grapheme Clusters & Unicode Correctness**:
  - A Swift `Character` represents a single human-readable character (an extended grapheme cluster).
  - An extended grapheme cluster is composed of one or more Unicode scalars combined.
  - Adding combining marks (like `\u{301}` acute accent to `"e"`) produces `"é"`, maintaining `count == 1`.
  - Emoji with zero-width joiners (such as family emojis or skin tone modifiers) and flags (two regional indicator scalars) evaluate to `count == 1`.
- **String Indexing**:
  - Swift strings **cannot be indexed with integers** (`str[0]` is unavailable at compile time).
  - Because Unicode characters have variable byte lengths in UTF-8, Swift cannot determine the memory position of character $n$ without iterating from the beginning.
  - Access requires `String.Index`: `startIndex`, `endIndex`, `index(after:)`, and `index(startIndex, offsetBy:)`.
- **Substrings & Memory Sharing**:
  - Slicing a string returns a `Substring`.
  - A `Substring` reuses the parent string's memory buffer for performance.
  - Holding a `Substring` long-term keeps the entire parent string alive in memory. To store long-term, convert it to a standalone `String(substring)`.
- **String Literals & Interpolation**:
  - Multi-line literals use triple double quotes `"""`. Leading indentation is stripped based on the closing delimiter.
  - String interpolation uses `\(expression)`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Grapheme cluster combining accent | `"cafe\u{301}".count` | `4` (`"café"`) |
| Grapheme equality with decomposed character | `"cafe\u{301}" == "café"` | `true` |
| Flag emoji grapheme count | `"🇺🇸".count` vs `"🇺🇸".utf8.count` | `1` character, `8` UTF-8 bytes |
| Family emoji grapheme count | `"👨‍👩‍👧‍👦".count` vs `"👨‍👩‍👧‍👦".utf8.count` | `1` character, `25` UTF-8 bytes |
| Subscripting String with Int | `greeting[0]` | Compile error: `cannot subscript String with an Int, use a String.Index instead.` |
| Safe character indexing | `greeting[greeting.startIndex]` | `'H'` |
| Offset indexing | `greeting[greeting.index(greeting.startIndex, offsetBy: 4)]` | `'o'` |
| Substring type check | `type(of: str.prefix(5))` | `Substring.self` |
| Long-term conversion | `String(str.prefix(5))` | Standalone `String` instance |

## 3. Common wrong ideas (traps)

1. **"Swift strings can be accessed like arrays with `str[0]`."** False. Characters have variable byte widths, so $O(1)$ integer indexing is impossible. Swift requires `String.Index`.
2. **"`str.count` equals the number of UTF-8 or UTF-16 bytes."** False. `count` measures extended grapheme clusters (human-perceived characters).
3. **"Holding a tiny slice of a massive string is harmless."** False. A `Substring` holds a reference to the entire original buffer in memory, causing unexpected memory leaks unless converted with `String(sub)`.
4. **"Swift strings are reference types like `NSString`."** False. Swift's `String` is a value type with Copy-on-Write behavior.

## 4. Real interview questions by level

- **Fresh**:
  - Why does Swift forbid integer subscripting on strings like `text[0]`?
  - What is the difference between a `String` and a `Substring` in Swift?
  - How does Swift calculate `string.count` for strings with emojis or combining accents?
- **Junior**:
  - What is an extended grapheme cluster, and how does canonical equivalence work when comparing strings in Swift?
  - What memory trap occurs when storing a `Substring` in a long-lived property, and how do you resolve it?
- **Senior**:
  - How is `String` represented in Swift standard library memory (small string optimization for strings up to 15 bytes in UTF-8 vs heap buffer for large strings)?
