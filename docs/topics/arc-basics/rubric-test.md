# Rubric Test — How ARC Works (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** What ARC is and what it manages | **Good:** Model answer explaining reference count tracking for memory cleanup, identifying reference types (classes/actors), and immediate reclamation at zero. | 100 | Yes | Pass (100%) |
| | **Average:** "ARC is automatic reference counting that manages memory for classes. It frees objects when no references remain." (Misses actors/closures and explicit mention of zero count). | 80 | Yes | Pass (80%) |
| | **Weak:** "ARC is a background garbage collector that cleans up structs and arrays on iOS." | 0 | No | Fail (0%) |
| **q25** ARC vs Tracing Garbage Collection | **Good:** Explains compile-time retain/release insertion, deterministic cleanup without runtime pauses, contrasts with background heap scanning, and notes ARC cycle limitation. | 100 | Yes | Pass (100%) |
| | **Average:** "ARC inserts retains and releases at compile time so there are no pauses, while garbage collectors scan the heap in the background." (Misses cycle detection trade-off). | 80 | Yes | Pass (80%) |
| | **Weak:** "ARC and garbage collectors are identical tools with different names." | 0 | No | Fail (0%) |
| **q26** What causes count to increase and decrease | **Good:** Identifies initialization and assignment as increasing count; setting to nil or exiting scope as decreasing; specifies strong references. | 100 | Yes | Pass (100%) |
| | **Average:** "Counts go up when you assign an object to another variable and go down when you set it to nil." (Misses scope exit or explicit strong reference distinction). | 75 | Yes | Pass (75%) |
| | **Weak:** "Reference counts increase when the CPU temperature rises." | 0 | No | Fail (0%) |
| **q27** What happens when count reaches zero | **Good:** Explains that Swift immediately runs `deinit` synchronously on the thread dropping the final reference, followed by returning heap memory. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift calls deinit immediately and frees the heap memory." (Misses thread synchronization detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "When count reaches zero, the instance is moved to the disk cache." | 0 | No | Fail (0%) |
| **q28** Structs and ARC | **Good:** Explains that structs are value types copied on assignment with no reference count; explains ARC tracks embedded class properties on copy/destroy. | 100 | Yes | Pass (100%) |
| | **Average:** "Structs do not have reference counts because they are value types. If a struct has a class, ARC manages that class." (Misses copy retain mechanics). | 80 | Yes | Pass (80%) |
| | **Weak:** "Structs cannot contain classes in Swift." | 0 | No | Fail (0%) |
| **q29** `Logger` class implementation | **Good:** Model answer defining class with tag property, initializer printing Start, deinitializer printing End, and do block showing scope exit. | 100 | Yes | Pass (100%) |
| | **Average:** Implements Logger and deinit properly, but forgets to print "Done" after exiting the do block. | 85 | Yes | Pass (85%) |
| | **Weak:** Defines a struct instead of a class, so `deinit` is not supported and the code fails to compile. | 30 | No | Fail (30%) |
| **q30** `Session` class with multiple references | **Good:** Model answer defining Session with deinit, demonstrating s1 and s2 references, and clearing them in sequence to show deinit runs on last release. | 100 | Yes | Pass (100%) |
| | **Average:** Creates Session with s1 and s2, but sets both to nil on one line or misses intermediate print statements. | 70 | Yes | Pass (70%) |
| | **Weak:** Assigns s2 to a new Session instance instead of referencing s1, breaking the multiple reference demonstration. | 50 (capped) | No | Fail (50%) |
| **q31** `FileHandler` class implementation | **Good:** Model answer implementing FileHandler, open and close print statements in init and deinit, and demonstrating scope-based cleanup. | 100 | Yes | Pass (100%) |
| | **Average:** Implements FileHandler and deinit correctly, but leaves the file variable in the outer scope instead of a do block. | 70 | Yes | Pass (70%) |
| | **Weak:** Implements a manual close() method instead of the deinit deinitializer. | 40 | No | Fail (40%) |

---

## Verdict

The rubrics successfully:
1. Differentiate between compile-time ARC and runtime tracing garbage collection.
2. Verify knowledge of reference counting mechanics (increments, decrements, and immediate deallocation at zero).
3. Assess understanding of reference types versus value types regarding ARC.
4. Confirm understanding of synchronous deinitializer execution on the releasing thread.
5. Accurately score implementation correctness for scope-based deallocation, multiple references, and `deinit`.
