# Research — Control Flow (Step 1)

Researched 2026-11-09. Topic: `control-flow` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Control Flow](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow)**
- **Looping Statements**:
  - `for-in`: iterates over sequences such as ranges (`1...5`), arrays, dictionaries (tuple decomposition `(key, value)`), and characters in strings.
  - `while`: evaluates condition at the start of each pass; runs 0 or more times.
  - `repeat-while`: evaluates condition at the end of each pass; guaranteed to run at least once.
- **Conditional Branching**:
  - `if`: requires an explicit `Bool` expression (unlike C, numbers like `0` or `1` are not booleans).
  - `guard`: requires condition to be true to continue; `else` block must exit the current scope (`return`, `throw`, `break`, `continue`, or `fatalError`). Unwrapped constants remain bound in the outer enclosing scope.
  - `switch`:
    - **Exhaustive by default**: all possibilities must be covered, or a `default` case is required.
    - **No implicit fallthrough**: execution finishes immediately after a matching case completes. No `break` statement is needed to prevent falling through.
    - **No empty cases**: each case must have at least one executable statement. Compound patterns use commas (`case 1, 2:`).
    - **Pattern matching**: supports intervals (`case 1..<10:`), tuples (`case (0, 0):`), value binding (`case (let x, 0):`), and `where` clauses (`case let (x, y) where x == y:`).
    - Explicit `fallthrough` keyword: continues directly into the next case without testing its pattern.
- **Control Transfer Statements**:
  - `continue`: skips to next loop iteration.
  - `break`: terminates loop or switch case immediately.
  - `fallthrough`: transfers control to the next switch case body.
  - `return`: exits the current function.
  - **Labeled statements**: allows breaking or continuing specific outer loops (`break outerLoop`).

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Integer in if condition | `if 1 { }` | Compile error: `type 'Int' cannot be used as a boolean; test for '!= 0' instead` |
| Empty switch case | `case 1:\ncase 2:` | Compile error: `'case' label in a 'switch' must have at least one executable statement` |
| Non-exhaustive switch | `switch 2 { case 1: ... }` | Compile error: `switch must be exhaustive; add a default clause` |
| `guard else` without exit | `guard let x else { print() }` | Compile error: `'guard' body must not fall through, consider using a 'return' or 'throw'` |
| `repeat-while` single run | `repeat { n += 1 } while false` | Executes body once (`n == 1`) |
| Labeled break | `outer: for i in ... { break outer }` | Terminates outer loop from nested loop |
| Explicit `fallthrough` | `case 1: ... fallthrough; case 2:` | Executes next case body directly |

## 3. Common wrong ideas (traps)

1. **"Swift switch cases fall through automatically like in C and Java."** False. Swift terminates case execution at the end of the case block without needing a `break`. Implicit fallthrough does not exist.
2. **"Writing `if count` works if count is an integer."** False. Swift enforces strict type safety: conditionals require real `Bool` values.
3. **"`guard` and `if let` have identical scoping for unwrapped variables."** False. `if let` variables are only available inside the `if` block. `guard let` variables remain available in the entire outer enclosing scope.
4. **"A switch case can be left empty to do nothing."** False. Every case requires at least one executable statement (use `break` if you want a no-op case).

## 4. Real interview questions by level

- **Fresh**:
  - How does a `switch` statement in Swift differ from a `switch` statement in C or Objective-C?
  - What is the difference between `while` and `repeat-while` loops?
  - Why does Swift require the `else` block of a `guard` statement to transfer control?
- **Junior**:
  - How do pattern matching and `where` clauses work inside Swift `switch` statements?
  - What are labeled statements in Swift, and when would you use `break labelName`?
  - Why is `guard let` often preferred over nested `if let` statements for early exits (the "pyramid of doom")?
- **Senior**:
  - How does the Swift compiler verify switch exhaustiveness across non-frozen library enums using `@unknown default`?
