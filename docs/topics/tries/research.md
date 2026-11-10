# Research: Tries (Prefix Trees)

Topic ID: `tries`  
Level: Mid  
Goal: After this topic, you can store and search words with a trie.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Trie Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/trie/
- **Swift Standard Library: String Documentation**  
  https://developer.apple.com/documentation/swift/string
- **Apple Developer Documentation: Natural Language Framework**  
  https://developer.apple.com/documentation/naturallanguage

### Core Technical Concepts
1. **Trie (Prefix Tree) Structure**:
   - A tree where each node represents a character or character edge.
   - The root represents the empty string `""`.
   - Each node contains:
     - `children`: A collection of child references keyed by character. In Swift, typically `[Character: TrieNode]` for general Unicode, or `[TrieNode?](repeating: nil, count: 26)` for lowercase ASCII.
     - `isEndOfWord: Bool`: A Boolean flag indicating that the path from root to this node constitutes a complete word.

2. **Core Operations and Complexities**:
   - **Insert (word of length $L$)**:
     - Traverse character by character from root. If a child for the character does not exist, instantiate a new `TrieNode`.
     - At the final character node, set `isEndOfWord = true`.
     - Time Complexity: $O(L)$.
     - Space Complexity: $O(L)$ in the worst case (when no shared prefix exists).
   - **Search (exact word of length $L$)**:
     - Traverse character by character. If any character child is missing, return `false`.
     - After following all $L$ characters, return `node.isEndOfWord`.
     - Time Complexity: $O(L)$.
     - Space Complexity: $O(1)$.
   - **StartsWith / Prefix Search (prefix of length $P$)**:
     - Traverse the prefix character by character. If any character child is missing, return `false`.
     - If all characters match, return `true` (regardless of `isEndOfWord`).
     - Time Complexity: $O(P)$.
     - Space Complexity: $O(1)$.
   - **Delete (word of length $L$)**:
     - Recursively walk down to the target word's end node.
     - Unset `isEndOfWord = false`.
     - On unwinding the recursion stack, if a child node has no other children and `isEndOfWord == false`, remove the child reference to reclaim memory.
     - Time Complexity: $O(L)$.

3. **Trie vs Hash Table (Dictionary / Set)**:
   - **Lookup Time**: Looking up a string in a hash table requires computing the string's hash, which takes $O(L)$ time. A trie also takes $O(L)$ time.
   - **Prefix Queries**: A hash table cannot perform prefix search efficiently; checking if any word starts with "app" requires scanning every key in the hash table ($O(N \cdot L)$). In a trie, prefix search runs in $O(P)$ time, completely independent of total word count $N$.
   - **Alphabetical Ordering**: In-order DFS traversal of a trie naturally yields words in lexicographical order. Hash tables are unordered.
   - **Space Trade-off**: Hash tables have high memory density for disjoint strings. Tries compress shared prefixes (e.g. "car", "cart", "card", "care" share the "car" nodes).

4. **Real iOS Engineering Applications**:
   - **Autocomplete & Typeahead**: In `UISearchController` or SwiftUI `.searchable`, suggesting the top completions for a user-typed prefix.
   - **Spell Checking & Autocorrect**: Checking whether a typed token is valid or suggesting 1-edit distance corrections using DFS/backtracking on a trie.
   - **Boggle / Word Grid Puzzles**: Pruning grid search paths immediately when a character sequence is not a valid prefix in the trie.

## 2. Common Interview Traps
- **Returning `true` in `search` for a prefix that is not a word**: Returning `true` just because the node exists, forgetting to check `isEndOfWord`.
- **Confusing `search` and `startsWith`**: `search` requires `isEndOfWord == true`, while `startsWith` only requires reaching the end of the prefix.
- **Memory Overhead in Swift**: Using a 26-element array `[TrieNode?](repeating: nil, count: 26)` for Unicode or mixed-case strings causes index calculation crashes. Using a dictionary `[Character: TrieNode]` is much safer and idiomatic in Swift.
- **Reference Semantics for Nodes**: Implementing `TrieNode` as a struct causes copy-on-write value semantic issues when mutating deep trees; `final class TrieNode` is standard and idiomatic.

## 3. Interview Answers by Experience Level
- **Fresh**: Explains that a trie is a prefix tree where words share common starting letters, making autocomplete and prefix matching fast without scanning all words.
- **Junior/Mid**: Implements `insert`, `search`, and `startsWith` in $O(L)$ time using a `final class TrieNode` with `[Character: TrieNode]` and `isEndOfWord`. Contrasts prefix matching in tries ($O(P)$) against hash tables ($O(N \cdot L)$).
- **Senior/Staff**: Discusses memory trade-offs between node pointer overhead and prefix compression, compares array-backed nodes vs dictionary children, outlines Radix Trees / Patricia Tries for memory compression, and implements autocomplete top-K ranking with DFS backtracking or caching frequency scores directly on nodes.
