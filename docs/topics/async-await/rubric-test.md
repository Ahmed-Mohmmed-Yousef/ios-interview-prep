# Rubric Test — async/await (Step 5)

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
| **q24** What is an `async` function? | **Good:** Model answer explaining that an async function can pause execution at suspension points without blocking its physical thread; yields the thread back to the cooperative pool and resumes when ready. | 100 | Yes | Pass (100%) |
| | **Average:** "An async function is a function that can wait for network requests and does not block the UI thread." (Misses cooperative thread pool and suspension point mechanics). | 75 | Yes | Pass (75%) |
| | **Weak:** "An async function is an Objective-C method that runs on a separate CPU core." | 0 | No | Fail (0%) |
| **q25** What happens at `await` suspension point? | **Good:** Explains await marks an explicit suspension point; the function pauses, saves state, and gives up the thread to the cooperative pool to do other work; differs from GCD thread blocking which occupies the thread sleeping. | 100 | Yes | Pass (100%) |
| | **Average:** "Await pauses the function until the work finishes, and the thread can run other tasks." (Misses cooperative pool contrast with thread sleeping in GCD). | 75 | Yes | Pass (75%) |
| | **Weak:** "Await pauses the whole operating system until the network response arrives." | 0 | No | Fail (0%) |
| **q26** Why `async/await` reduces bugs vs closures | **Good:** Explains compiler guarantees a return or throw on every code path, eliminating forgotten callbacks; eliminates pyramid of doom / deep nesting; supports native try/catch error handling. | 100 | Yes | Pass (100%) |
| | **Average:** "It avoids nested closures and makes code look linear and easy to read." (Misses compiler-enforced return on every path). | 75 | Yes | Pass (75%) |
| | **Weak:** "Async/await reduces bugs because it disables all memory allocation." | 0 | No | Fail (0%) |
| **q27** Sync and async function interaction | **Good:** Explains sync code cannot directly call await because it cannot pause; bridges by wrapping the async call inside `Task { await ... }` or `.task` view modifier; async functions can call sync functions directly. | 100 | Yes | Pass (100%) |
| | **Average:** "You bridge them by putting the async call inside a Task block." (Misses explanation of why sync functions cannot suspend or how async calls sync). | 75 | Yes | Pass (75%) |
| | **Weak:** "You make a sync function call an async function by adding exclamation mark at the end." | 0 | No | Fail (0%) |
| **q28** Cooperative multitasking & blocking code | **Good:** Explains cooperative pool has a fixed thread count matching CPU cores; calling blocking APIs (like sleep or semaphore) deprives the pool of a worker thread, starving other tasks and causing hangs. | 100 | Yes | Pass (100%) |
| | **Average:** "The thread pool has a fixed number of threads, so if you block one with sleep, tasks have to wait." (Misses CPU core count connection and starvation risk). | 75 | Yes | Pass (75%) |
| | **Weak:** "Cooperative multitasking means different apps share the same heap memory." | 0 | No | Fail (0%) |
| **q29** `fetchUser` async greeting | **Good:** Model answer declaring `func fetchUser(id: Int) async -> String`, calling `Task.sleep`, and returning formatted greeting string. | 100 | Yes | Pass (100%) |
| | **Average:** Implements async function and returns greeting, but uses `Thread.sleep` instead of `Task.sleep`. | 70 | Yes | Pass (70%) |
| | **Weak:** Implements synchronous function with completion handler closure instead of async. | 40 | No | Fail (40%) |
| **q30** `loadProfile` sequential async calls | **Good:** Model answer declaring `loadProfile` with two sequential `await` calls and returning combined profile text. | 100 | Yes | Pass (100%) |
| | **Average:** Implements function and awaits both helpers, but fails to combine both return values into the final string. | 75 | Yes | Pass (75%) |
| | **Weak:** Calls helpers synchronously without await keywords, causing compilation errors. | 40 | No | Fail (40%) |
| **q31** `validateAndFetch` async throwing function | **Good:** Model answer declaring `func validateAndFetch(score: Int) async throws -> String`, throwing custom error when score < 0, awaiting helper, and returning status string. | 100 | Yes | Pass (100%) |
| | **Average:** Declares async throws and validates score, but forgets `try` keyword when calling throwing helper. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns nil optional instead of throwing an error on negative score. | 50 (capped) | No | Fail (50%) |

---

## Verdict

The rubrics successfully:
1. Assess foundational knowledge of `async` suspension points and cooperative thread pool execution.
2. Differentiate non-blocking task suspension from traditional thread blocking.
3. Test comprehension of safety guarantees over completion handlers (guaranteed return/throw, linear error handling).
4. Verify correct usage of `Task { }` to bridge synchronous caller environments into asynchronous contexts.
5. Highlight the critical hazard of synchronous blocking calls inside the cooperative thread pool.
6. Accurately score implementation correctness for `async`, `await`, and `async throws` code structures.
