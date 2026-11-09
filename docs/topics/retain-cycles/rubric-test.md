# Rubric Test — Retain Cycles (Step 5)

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
| **q24** What a retain cycle is and memory leaks | **Good:** Model answer explaining that mutual strong references prevent counts from reaching zero, causing ARC to leak heap memory for the app lifetime. | 100 | Yes | Pass (100%) |
| | **Average:** "A retain cycle is when two objects hold strong references to each other so they can never be deallocated." (Misses permanent heap leak detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "A retain cycle is when a for loop repeats without stopping." | 0 | No | Fail (0%) |
| **q25** Stored closures capturing self | **Good:** Explains that instance holds closure strongly and closure captures self strongly; [weak self] breaks the cycle by not incrementing count and zeroing on dealloc. | 100 | Yes | Pass (100%) |
| | **Average:** "The closure captures self strongly while the class holds the closure, forming a cycle. Weak self stops the closure from holding self." (Misses zeroing detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Closures always delete self when finished running." | 0 | No | Fail (0%) |
| **q26** Non-escaping closures and retain cycles | **Good:** Explains non-escaping closures execute synchronously on current stack frame, do not outlive calling function, and are discarded without storing references. | 100 | Yes | Pass (100%) |
| | **Average:** "Non-escaping closures do not cause cycles because they run immediately and are not stored in properties." (Misses stack frame execution explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Non-escaping closures use unowned self automatically behind the scenes." | 0 | No | Fail (0%) |
| **q27** Identifying retain cycles in Xcode | **Good:** Describes the Xcode Memory Graph Debugger visual graph with purple warning marks, and logging inside deinit to verify controller dismissal. | 100 | Yes | Pass (100%) |
| | **Average:** "You can use the Memory Graph Debugger to find cycles and put print statements in deinit to see if the controller is freed." (Misses cycle badge / arrow detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Retain cycles are identified by checking the App Store Connect crash logs." | 0 | No | Fail (0%) |
| **q28** Guard let self pattern | **Good:** Explains checking whether self is alive on callback, early return if deallocated, and temporary local strong reference during execution. | 100 | Yes | Pass (100%) |
| | **Average:** "Guard let self unwraps the weak self safely so you can use self without optional chaining inside the closure." (Misses temporary stack reference explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Guard let self prevents the closure from running on the background thread." | 0 | No | Fail (0%) |
| **q29** `DataLoader` weak closure capture | **Good:** Model answer implementing DataLoader with onResult, [weak self] capture, guard let self unwrapping, and deinit verifying deallocation on nil. | 100 | Yes | Pass (100%) |
| | **Average:** Uses [weak self] but uses force unwrapping self! instead of guard let self, which risks runtime crashes. | 70 | Yes | Pass (70%) |
| | **Weak:** Captures self strongly without [weak self], forming a permanent retain cycle that prevents deinit from running. | 30 | No | Fail (30%) |
| **q30** `FormPresenter` and `FormView` delegate | **Good:** Model answer defining AnyObject protocol, FormView with weak delegate, FormPresenter, and verifying clean deallocation without cycles. | 100 | Yes | Pass (100%) |
| | **Average:** Declares weak var delegate and protocol, but omits deinit messages or prints non-matching text. | 85 | Yes | Pass (85%) |
| | **Weak:** Declares delegate as a strong property, leaking both the view and presenter. | 30 | No | Fail (30%) |
| **q31** `TimerHelper` cleanup and deallocation | **Good:** Model answer configuring onTick with [weak self], providing cleanUp method, and confirming immediate deinit on nil. | 100 | Yes | Pass (100%) |
| | **Average:** Configures onTick with [weak self] and deinit, but forgets to implement or call cleanUp(). | 70 | Yes | Pass (70%) |
| | **Weak:** Configures onTick with strong self capture and no weak capture list. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Distinguish between mutual strong references and safe unidirectional weak references.
2. Verify understanding of stored closure capture lists and `guard let self` mechanics.
3. Assess knowledge of why non-escaping closures do not create retain cycles.
4. Evaluate practical debugging methods including Memory Graph Debugger and `deinit` logging.
5. Accurately score implementation correctness for weak delegate relationships and safe closure callbacks.
