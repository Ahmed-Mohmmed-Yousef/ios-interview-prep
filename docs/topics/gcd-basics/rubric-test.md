# Rubric Test — GCD Basics (Step 5)

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
| **q24** Serial vs concurrent queues | **Good:** Model answer explaining serial queues run tasks one at a time in FIFO order; concurrent queues start tasks in FIFO but run multiple tasks simultaneously; completion depends on task duration. | 100 | Yes | Pass (100%) |
| | **Average:** "Serial queues run tasks one by one while concurrent queues run tasks at the same time." (Misses FIFO start and independent duration completion details). | 80 | Yes | Pass (80%) |
| | **Weak:** "Serial queues are for integers while concurrent queues are for strings." | 0 | No | Fail (0%) |
| **q25** Async vs sync dispatch | **Good:** Explains async schedules work and returns immediately without waiting; sync pauses the calling thread until work finishes; clarifies caller waiting versus queue serialization. | 100 | Yes | Pass (100%) |
| | **Average:** "Async does not wait for the task to finish, but sync waits for the task to finish." (Misses caller waiting distinction). | 80 | Yes | Pass (80%) |
| | **Weak:** "Async runs in the background while sync runs in the foreground." | 0 | No | Fail (0%) |
| **q26** Quality of Service (QoS) classes | **Good:** Explains QoS specifies task priority and urgency to guide CPU allocation and battery use; gives userInteractive and background examples. | 100 | Yes | Pass (100%) |
| | **Average:** "QoS gives tasks priority so higher priority tasks run faster. Examples are userInteractive and background." (Misses battery/resource scheduling explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "QoS is used to compress video files." | 0 | No | Fail (0%) |
| **q27** Deadlock on same serial queue | **Good:** Explains calling sync pauses the active task until the new block finishes; the new block cannot start because the serial queue is busy; mutual wait deadlocks thread. | 100 | Yes | Pass (100%) |
| | **Average:** "It deadlocks because the queue is waiting for the task and the task is waiting for the queue." (Misses active task suspension detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "It deadlocks because GCD queues have a maximum memory limit of 10MB." | 0 | No | Fail (0%) |
| **q28** Swift Concurrency vs GCD | **Good:** Explains cooperative thread pool matching CPU core count prevents thread explosion; tasks suspend and yield; compile-time data race safety with actors. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift Concurrency uses async/await to avoid callback hell and uses actors to stop data races." (Misses cooperative thread pool vs thread explosion). | 80 | Yes | Pass (80%) |
| | **Weak:** "Swift Concurrency was created because Apple lost the source code to GCD." | 0 | No | Fail (0%) |
| **q29** `SafeCounter` thread-safe counter | **Good:** Model answer declaring SafeCounter with private serial queue, synchronizing increment and get methods with queue.sync, and printing Counter: 3. | 100 | Yes | Pass (100%) |
| | **Average:** Implements SafeCounter with queue.sync for increment, but uses a non-synchronized direct property read in get(). | 70 | Yes | Pass (70%) |
| | **Weak:** Omits serial queue synchronization completely, creating an unprotected mutable class. | 30 | No | Fail (30%) |
| **q30** `NameRegistry` thread-safe array | **Good:** Model answer declaring NameRegistry with private serial queue, synchronizing register and allNames via queue.sync, and registering names. | 100 | Yes | Pass (100%) |
| | **Average:** Synchronizes register and allNames, but forgets to join names with comma separator in the print statement. | 85 | Yes | Pass (85%) |
| | **Weak:** Declares a concurrent queue without barriers, resulting in race conditions. | 50 (capped) | No | Fail (50%) |
| **q31** `JobQueue` completed jobs counter | **Good:** Model answer declaring JobQueue with serial queue, completeJob increment, count getter, and calling it twice. | 100 | Yes | Pass (100%) |
| | **Average:** Implements JobQueue and queue.sync, but calls completeJob only once. | 70 | Yes | Pass (70%) |
| | **Weak:** Calls queue.sync on DispatchQueue.main from background thread, causing deadlock risk. | 40 | No | Fail (40%) |

---

## Verdict

The rubrics successfully:
1. Differentiate between serial (FIFO one-at-a-time) and concurrent (parallel execution) queues.
2. Verify understanding of async non-blocking returns versus sync thread-blocking waits.
3. Assess knowledge of Quality of Service prioritization and hardware resource trade-offs.
4. Evaluate comprehension of self-sync deadlocks on serial dispatch queues.
5. Confirm understanding of why Swift Concurrency replaced GCD for thread efficiency and compile-time data race safety.
6. Accurately score implementation correctness for queue-synchronized state management.
