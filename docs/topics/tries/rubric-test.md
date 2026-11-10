# Rubric Test: Tries

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/tries/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## tri-q24 (Written: Trie vs Hash Set for Autocomplete)

### Rubric
- Explains that a hash set requires scanning all N words taking O(N * L) time to find prefix matches (40 pts, key)
- Explains that a trie reaches the prefix node in O(P) time independent of dictionary size N (40 pts, key)
- Notes that common prefixes share storage in a trie (20 pts)

### Good Answer
A hash set cannot perform prefix lookups directly because hash codes scramble string structures. Finding words starting with a prefix in a hash set requires scanning all N entries in O(N * L) time. A trie walks down prefix characters directly in O(P) time, completely independent of the dictionary size.

**Score: 100/100**
- [x] Hash set takes O(N * L) scan (40/40)
- [x] Trie takes O(P) prefix time (40/40)
- [x] Explains direct prefix path navigation (20/20)

### Average Answer
In a hash set, you have to loop through all N words to check if each word starts with the prefix, which is slow. A trie jumps straight to the prefix node in O(P) time where P is the prefix length.

**Score: 80/100**
- [x] Mentions hash set loop (35/40)
- [x] States trie O(P) (35/40)
- [ ] Omits prefix storage sharing note (10/20)

### Weak Answer
Tries are faster than hash tables for words because trees are better than hashes.

**Score: 15/100**
- [ ] No Big-O complexities stated (5/40)
- [ ] No prefix path explanation (5/40)
- [ ] Vague answer (5/20)

---

## tri-q25 (Written: Search vs StartsWith)

### Rubric
- Explains that search requires isEndOfWord to be true on the target node (35 pts, key)
- Explains that startsWith only requires that the character path exists in the trie (35 pts, key)
- Provides a clear concrete example (such as app when only apple is stored) (30 pts)

### Good Answer
The search operation returns true only if every character exists and the final node has isEndOfWord set to true. The startsWith operation returns true as soon as the full prefix path exists, regardless of the isEndOfWord flag. For example, if only apple is inserted, startsWith(app) returns true while search(app) returns false.

**Score: 100/100**
- [x] Explains search requires isEndOfWord (35/35)
- [x] Explains startsWith only needs path existence (35/35)
- [x] Concrete apple / app example (30/30)

### Average Answer
Search checks for a full word and looks at the end of word Boolean flag. StartsWith only checks if the letters exist in the trie. For example, searching for app might be false even if startsWith is true.

**Score: 85/100**
- [x] End of word Boolean explained (35/35)
- [x] Path existence explained (35/35)
- [x] Example provided but missing setup context (15/30)

### Weak Answer
Search finds a word and startsWith finds the beginning.

**Score: 20/100**
- [ ] No mention of isEndOfWord flag (10/35)
- [ ] No node traversal details (10/35)
- [ ] No concrete example (0/30)

---

## tri-q26 (Written: TrieNode as Class vs Struct)

### Rubric
- Explains that classes have reference semantics allowing in-place mutation of child nodes (40 pts, key)
- Explains that structs have value semantics which trigger recursive copy-on-write during tree updates (35 pts, key)
- Mentions that reference pointers allow multiple paths or parent references without full copies (25 pts)

### Good Answer
TrieNode must be a class because classes provide reference semantics in Swift. When inserting characters down a tree path, reference semantics allow modifying child nodes directly in place. If TrieNode were a struct, mutating a child would trigger copy-on-write across parent nodes, creating significant memory allocation overhead.

**Score: 100/100**
- [x] Reference semantics in-place mutation (40/40)
- [x] Struct value semantics and copy-on-write cost (35/35)
- [x] Clear parent/child mutation mechanics (25/25)

### Average Answer
Classes use reference types, so you can point to a child node and add children to it directly. Structs are value types, which would copy the entire tree every time you insert a new letter.

**Score: 80/100**
- [x] Reference types allow direct mutation (35/40)
- [x] Value types trigger copying (35/35)
- [ ] Does not mention copy-on-write explicitly (10/25)

### Weak Answer
Classes are better for trees in Swift because structs are only for simple models.

**Score: 20/100**
- [ ] Misses reference semantics (10/40)
- [ ] Misses copy-on-write overhead (5/35)
- [ ] Vague explanation (5/25)

---

## tri-q27 (Written: Word Deletion in a Trie)

### Rubric
- Explains unsetting the isEndOfWord flag at the target word node (35 pts, key)
- States pruning condition: node can be deleted only if it has no children and isEndOfWord is false (40 pts, key)
- Mentions bottom-up recursive pruning so shared prefixes are preserved (25 pts)

### Good Answer
To delete a word, traverse recursively to the final character node and set isEndOfWord to false. As recursion unwinds, check if the current node has any other children and whether its isEndOfWord flag is false. If it has no children and is not the end of another word, prune the node safely to reclaim memory.

**Score: 100/100**
- [x] Unsetting isEndOfWord (35/35)
- [x] Pruning condition checked (40/40)
- [x] Bottom-up recursive preservation of prefixes (25/25)

### Average Answer
You turn isEndOfWord to false at the end of the word. Then you check if the node has any other children. If it has no children and is not another word, you can remove it from its parent's dictionary.

**Score: 85/100**
- [x] Sets isEndOfWord to false (35/35)
- [x] Childless condition checked (35/40)
- [x] Unwinding mentioned briefly (15/25)

### Weak Answer
Just remove the letters from the dictionary until the word is gone.

**Score: 15/100**
- [ ] Would delete shared prefixes (5/35)
- [ ] No condition on children or other words (5/40)
- [ ] Inaccurate logic (5/25)

---

## tri-q28 (Written: 16ms Search Suggestions Architecture)

### Rubric
- Describes storing precomputed top suggestions or frequency scores on prefix nodes (40 pts, key)
- Explains that precomputing avoids deep DFS subtree traversals during live keystrokes (35 pts, key)
- Mentions keeping operations off the main thread or debouncing rapid user input (25 pts)

### Good Answer
To respond within a 16-millisecond frame budget, each trie node can store a precomputed array of top completion strings. When the user types a character, the search jumps directly to the matching node and returns suggestions in O(P) time without deep subtree traversal. In addition, keystrokes can be debounced and queried on a background queue.

**Score: 100/100**
- [x] Precomputed suggestions on prefix nodes (40/40)
- [x] Avoids deep DFS traversals (35/35)
- [x] Debouncing / background threading (25/25)

### Average Answer
Store the top 5 suggestions right on each trie node during insertion. That way, when the user types, you do not need to do a full DFS search. You can also run the search off the main thread so the UI stays smooth.

**Score: 85/100**
- [x] Cache on nodes (40/40)
- [x] Skips DFS (30/35)
- [x] Off main thread (15/25)

### Weak Answer
Use a fast loop and run it on a background thread so it does not drop frames.

**Score: 20/100**
- [ ] No node-level caching (5/40)
- [ ] No algorithmic pruning (5/35)
- [x] Mentions background thread (10/25)

---

## tri-q29 (Code-Write: Trie Class with Insert and Search)

### Rubric
- Inserts word characters into child nodes and sets isEnd to true at the final node (40 pts, key)
- Search returns false if any character is missing (30 pts, key)
- Search returns node.isEnd ensuring exact word matching (30 pts)

### Good Answer
```swift
final class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isEnd = false
}
final class Trie {
    let root = TrieNode()
    func insert(_ w: String) {
        var c = root
        for ch in w {
            if c.children[ch] == nil { c.children[ch] = TrieNode() }
            c = c.children[ch]!
        }
        c.isEnd = true
    }
    func search(_ w: String) -> Bool {
        var c = root
        for ch in w {
            guard let next = c.children[ch] else { return false }
            c = next
        }
        return c.isEnd
    }
}
let t = Trie()
t.insert("swift")
print("\(t.search("swift")) \(t.search("sw"))")
```

**Score: 100/100**
- [x] Insert creates nodes and marks isEnd (40/40)
- [x] Search checks character presence (30/30)
- [x] Search returns c.isEnd (30/30)

### Average Answer
Implements insert and search correctly but forgets `isEnd` check in search (returns true on path match), failing prefix distinction.

**Score: 70/100**
- [x] Node insertion (40/40)
- [x] Character traversal (30/30)
- [ ] Confuses startsWith with search (0/30)

### Weak Answer
Stores words in a flat array:
```swift
final class Trie {
    var arr: [String] = []
    func insert(_ w: String) { arr.append(w) }
    func search(_ w: String) -> Bool { return arr.contains(w) }
}
```

**Score: 25/100**
- [ ] No trie node hierarchy (0/40)
- [ ] No character tree navigation (0/30)
- [x] Passes search test via array scan (25/30)

---

## tri-q30 (Code-Write: Count Words with Prefix)

### Rubric
- Constructs trie nodes and inserts words with end-of-word markers (35 pts, key)
- Navigates to the node matching the prefix string (35 pts, key)
- Counts all descendant words starting from the prefix node using DFS or BFS (30 pts)

### Good Answer
```swift
final class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isEnd = false
}
func countWordsWithPrefix(_ words: [String], _ prefix: String) -> Int {
    let root = TrieNode()
    for w in words {
        var curr = root
        for ch in w {
            if curr.children[ch] == nil { curr.children[ch] = TrieNode() }
            curr = curr.children[ch]!
        }
        curr.isEnd = true
    }
    var curr: TrieNode? = root
    for ch in prefix {
        curr = curr?.children[ch]
    }
    guard let start = curr else { return 0 }
    func dfs(_ n: TrieNode) -> Int {
        var count = n.isEnd ? 1 : 0
        for (_, child) in n.children {
            count += dfs(child)
        }
        return count
    }
    return dfs(start)
}
let words = ["dog", "door", "dot", "cat"]
print(countWordsWithPrefix(words, "do"))
```

**Score: 100/100**
- [x] Trie insertion with isEnd (35/35)
- [x] Navigates to prefix node (35/35)
- [x] Traverses subtree counting isEnd (30/30)

### Average Answer
Uses an integer `prefixCount` counter stored on each node during insertion, incremented for each passing word, allowing $O(P)$ lookup without post-DFS.

**Score: 100/100**
- [x] Inserts words correctly (35/35)
- [x] Prefix node reached (35/35)
- [x] Direct prefixCount read (30/30)

### Weak Answer
```swift
func countWordsWithPrefix(_ words: [String], _ prefix: String) -> Int {
    return words.filter { $0.hasPrefix(prefix) }.count
}
```

**Score: 25/100**
- [ ] Did not construct a trie (0/35)
- [ ] No prefix node navigation (0/35)
- [x] Correct filter logic (25/30)

---

## tri-q31 (Code-Write: Longest Common Prefix)

### Rubric
- Handles empty arrays and single string edge cases (20 pts)
- Compares character prefixes across all words (40 pts, key)
- Returns the longest prefix string present in all input words (40 pts, key)

### Good Answer
```swift
func longestCommonPrefix(_ words: [String]) -> String {
    guard let first = words.first, !words.isEmpty else { return "" }
    var prefix = first
    for word in words.dropFirst() {
        while !word.hasPrefix(prefix) {
            prefix = String(prefix.dropLast())
            if prefix.isEmpty { return "" }
        }
    }
    return prefix
}
let input = ["flower", "flow", "flight"]
print(longestCommonPrefix(input))
```

**Score: 100/100**
- [x] Empty array and base case handled (20/20)
- [x] Systematic prefix shortening (40/40)
- [x] Returns longest common prefix (40/40)

### Average Answer
Checks character by character at each index across all strings using `words[0][i] == words[j][i]`.

**Score: 90/100**
- [x] Index boundary checks (15/20)
- [x] Horizontal character comparison (40/40)
- [x] Correct prefix return (35/40)

### Weak Answer
Compares only the first two words:
```swift
func longestCommonPrefix(_ words: [String]) -> String {
    guard words.count >= 2 else { return "" }
    return words[0] == words[1] ? words[0] : ""
}
```

**Score: 15/100**
- [ ] Fails multi-word sets (5/20)
- [ ] Incomplete character comparison (5/40)
- [ ] Incorrect logic (5/40)
