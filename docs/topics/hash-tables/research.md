# Research — Hash Tables (Step 1)

Researched 2026-11-09. Topic: `hash-tables` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [Dictionary](https://developer.apple.com/documentation/swift/dictionary) & [Set](https://developer.apple.com/documentation/swift/set)**
- **Underlying structure**: Both `Dictionary` and `Set` in Swift are hash tables.
- **Complexity**:
  - Lookup, insertion, and removal average $\mathcal{O}(1)$ constant time.
  - Worst-case time is $\mathcal{O}(n)$ if hash collisions occur across elements.
- **Hashable requirement**:
  - Keys in a `Dictionary` and elements in a `Set` must conform to `Hashable`.
  - `Hashable` inherits from `Equatable`.

**Apple Developer Documentation — [Hashable](https://developer.apple.com/documentation/swift/hashable)**
- **Contract**: If two values are equal according to `==`, they must feed the same values into `Hasher` in `hash(into:)`.
- **Automatic synthesis**: The Swift compiler automatically synthesizes `Hashable` conformance for structs and enums when all stored properties or associated values conform to `Hashable`.
- **Randomized seeding**:
  - Swift uses SipHash with a per-process random seed generated at launch.
  - The hash value of an object changes every time an application launches.
  - Never save `hashValue` to disk, database, or network payloads.

**Tech Interview Handbook — [Hash Table Cheatsheet](https://www.techinterviewhandbook.org/algorithms/hash-table/)**
- **Core interview patterns**:
  - **Two Sum**: Find two numbers that sum to a target. Store visited numbers in a hash map (`complement = target - num`) to reduce time from $\mathcal{O}(n^2)$ to $\mathcal{O}(n)$.
  - **Frequency map**: Count item frequencies using `dict[key, default: 0] += 1`.
  - **Fast membership checks**: Use a `Set` for $\mathcal{O}(1)$ average existence verification instead of $\mathcal{O}(n)$ array scanning.
  - **Group anagrams**: Categorize words by sorted characters or character frequency tuples.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Frequency counting | `counts[char, default: 0] += 1` | Correctly increments counts without optional unwrapping boilerplate |
| Two Sum algorithm | `target - num` lookup in dictionary | Solves target sum in $\mathcal{O}(n)$ time and $\mathcal{O}(n)$ space |
| Automatic Hashable | `struct Point: Hashable { let x: Int; let y: Int }` | Synthesizes equality and hashing without manual code |
| Custom Hashable equality parity | Custom `==` and `hash(into:)` matching fields | Conforms correctly and works reliably in Set and Dictionary |
| Set membership test | `set.contains(item)` | Verifies presence in $\mathcal{O}(1)$ average time |

## 3. Common wrong ideas (traps)

1. **"Dictionary keys maintain insertion order."** False. Swift `Dictionary` and `Set` are unordered collections. Iteration order depends on bucket layout and SipHash random seed.
2. **"You can persist `hashValue` to UserDefaults or a database."** False. Swift's `hashValue` uses a per-process random seed. It differs across app launches.
3. **"Two equal objects can produce different hash values."** False. This violates the `Hashable` contract. If `a == b`, their hash values must match. The inverse is not required (different objects may collide).
4. **"Hash table lookup is always $\mathcal{O}(1)$ in the worst case."** False. If all keys collide into the same bucket, lookup degrades to $\mathcal{O}(n)$.
5. **"Mutating a key after adding it to a Set is safe."** False. If an object in a Set changes properties that affect its hash value or equality, the set structure becomes corrupted and lookup will fail.

## 4. Real interview questions by level

- **Fresh**:
  - What is a hash table and how do `Dictionary` and `Set` in Swift use it?
  - What is the difference between average time and worst-case time for dictionary lookup?
  - How do you count character frequencies in a string using a Swift dictionary?
  - Why does `Hashable` require `Equatable`?
- **Junior**:
  - How do you solve the Two Sum problem in $\mathcal{O}(n)$ time using a hash table?
  - What happens if two equal objects produce different hash values?
  - Why does `hashValue` change every time you run an iOS app?
  - How do hash collisions happen, and how does Swift resolve them?
- **Senior**:
  - How does Swift implement hashing under the hood (Swiss Tables / SipHash)?
  - How do you design a custom `Hashable` implementation when only a subset of properties determines uniqueness?
  - What are the performance and memory implications of hash table load factors and rehashing?
