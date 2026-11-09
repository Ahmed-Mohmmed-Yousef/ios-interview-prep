# Rubric Test — Strong, Weak and Unowned (Step 5)

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
| **q24** Why weak must be var and optional | **Good:** Model answer explaining that ARC mutates weak references to nil when the target deallocates, requiring mutability (var) and optionality. | 100 | Yes | Pass (100%) |
| | **Average:** "Weak references have to be var because they turn to nil when the object is freed." (Misses explicit explanation of let immutability). | 80 | Yes | Pass (80%) |
| | **Weak:** "Weak variables are var because Apple requires all properties in classes to be variables." | 0 | No | Fail (0%) |
| **q25** Reading unowned after deallocation | **Good:** Explains that reading a deallocated unowned reference triggers a runtime fatal error/crash because ARC does not zero out unowned references. | 100 | Yes | Pass (100%) |
| | **Average:** "It causes a runtime crash because the object is already gone from memory." (Misses contrast with weak zeroing). | 80 | Yes | Pass (80%) |
| | **Weak:** "Reading an unowned reference after deallocation returns nil safely." | 0 | No | Fail (0%) |
| **q26** Practical rules for choosing weak vs unowned | **Good:** Explains weak is for objects that can become nil or have shorter lifetimes; unowned is for objects with matching or longer lifetimes; weak is safer for async. | 100 | Yes | Pass (100%) |
| | **Average:** "Use weak when the object can be nil and unowned when the object is never nil." (Misses lifetime nuance and async safety). | 80 | Yes | Pass (80%) |
| | **Weak:** "Always use unowned because unwrapping optionals is bad practice in Swift." | 0 | No | Fail (0%) |
| **q27** Why delegate properties are weak | **Good:** Identifies that view controllers hold subviews/helpers strongly; strong delegate reference back creates a retain cycle; weak breaks the cycle. | 100 | Yes | Pass (100%) |
| | **Average:** "Delegates are marked weak to avoid retain cycles between the controller and the service." (Misses explanation of parent-child ownership). | 75 | Yes | Pass (75%) |
| | **Weak:** "Delegates are weak so that they can run on background threads." | 0 | No | Fail (0%) |
| **q28** Swift runtime weak reference side tables | **Good:** Explains side tables store weak counts separately from object payload; payload deinitializes at strong count 0 while side table redirects weak pointers to nil. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift uses side tables to keep track of weak references and set them to nil without corrupting memory." (Misses strong payload deallocation detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Swift writes weak pointers to disk caches using Core Data." | 0 | No | Fail (0%) |
| **q29** `Profile` and `Subscription` weak reference | **Good:** Model answer declaring Subscription with weak var user: Profile?, demonstrating automatic nil conversion when profile is released. | 100 | Yes | Pass (100%) |
| | **Average:** Declares weak var user correctly, but forgets to print "Before" or "After" message strings. | 85 | Yes | Pass (85%) |
| | **Weak:** Declares user as a strong property, so setting p = nil leaves the Profile instance in memory. | 30 | No | Fail (30%) |
| **q30** `Author` and `Book` unowned reference | **Good:** Model answer declaring Book with unowned let author: Author, demonstrating cascading deallocation of both instances without leaks. | 100 | Yes | Pass (100%) |
| | **Average:** Declares unowned author correctly, but forgets to print deinitialization messages in deinit. | 70 | Yes | Pass (70%) |
| | **Weak:** Declares author as strong, creating an unbreakable retain cycle. | 30 | No | Fail (30%) |
| **q31** `TaskDelegate` protocol and `TaskRunner` | **Good:** Model answer defining AnyObject protocol, TaskRunner with weak var delegate, Coordinator, and showing weak delegate becomes nil after coordinator release. | 100 | Yes | Pass (100%) |
| | **Average:** Declares TaskDelegate and weak delegate, but omits the AnyObject constraint, requiring compiler fix. | 70 | Yes | Pass (70%) |
| | **Weak:** Implements delegate as a strong property without protocol definition. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Assess understanding of why weak references require `var` and optional typing.
2. Verify knowledge of unowned dangling pointer risks and runtime crashes.
3. Evaluate decision criteria between weak and unowned references across real-world iOS lifecycles.
4. Confirm understanding of retain cycles in delegation patterns.
5. Accurately score implementation correctness for weak properties, unowned constants, and class-bound delegate protocols.
