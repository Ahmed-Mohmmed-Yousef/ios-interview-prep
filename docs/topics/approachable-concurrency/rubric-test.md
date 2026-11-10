# Rubric Test: Approachable Concurrency

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/approachable-concurrency/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## ac-q24 (Written: Approachable Concurrency Changes & Rationale)

### Rubric
- Explains that application target code isolates to @MainActor by default (40 pts, key)
- Explains that this eliminates repetitive @MainActor annotations on UI code and view models (35 pts, key)
- Notes that most app code touches user interface state and presentation logic (25 pts)

### Good Answer
Approachable concurrency changes the default isolation of application targets so that code is isolated to @MainActor by default. Because the vast majority of iOS app code interacts directly with user interface state and view models, this eliminates repetitive boilerplate annotations across classes. Developers can write standard UI code safely by default and only opt out when performing intensive background work.

**Score: 100/100**
- [x] Application targets isolate to @MainActor by default (40/40)
- [x] Eliminates repetitive boilerplate annotations (35/35)
- [x] Explains that most app code interacts with UI state (25/25)

### Average Answer
In modern Swift, app target code runs on the main actor automatically instead of being nonisolated. This removes the need to put @MainActor on every view model class.

**Score: 75/100**
- [x] Runs on main actor automatically (40/40)
- [x] Removes need to put @MainActor everywhere (35/35)
- [ ] Misses explicit discussion of UI state dominance in app code (0/25)

### Weak Answer
Approachable concurrency makes Swift faster by turning off background threads on mobile phones.

**Score: 0/100**
- [ ] Misses default main actor isolation (0/40)
- [ ] Misses eliminating boilerplate annotations (0/35)
- [ ] Inaccurate assertion about disabling background threads (0/25)

---

## ac-q25 (Written: Moving Heavy Work Off Main Actor)

### Rubric
- Identifies using nonisolated or @concurrent to opt out of main actor isolation (40 pts, key)
- Explains that calling the background function uses await to hop off the main actor (35 pts, key)
- Mentions that keeping heavy computation off the main thread preserves 60 or 120 frames per second UI smoothness (25 pts)

### Good Answer
Developers move heavy work off the main actor by annotating functions as nonisolated or @concurrent. When a main actor caller awaits these functions, execution asynchronously hops to the cooperative background thread pool. Offloading CPU-intensive decoding or filtering keeps the main thread unblocked, maintaining 60 or 120 frames per second responsiveness without UI stutter.

**Score: 100/100**
- [x] Identifies nonisolated or @concurrent (40/40)
- [x] Explains awaiting hops execution to background threads (35/35)
- [x] Mentions preserving 60/120 fps smoothness (25/25)

### Average Answer
You can mark functions nonisolated so they run on background threads when called with await. This prevents the user interface from freezing.

**Score: 75/100**
- [x] Uses nonisolated keyword (40/40)
- [x] Mentions calling with await (35/35)
- [ ] General mention of freezing without framerate / off-actor mechanics (0/25)

### Weak Answer
Wrap your synchronous code inside DispatchQueue.global().sync blocks.

**Score: 15/100**
- [ ] Misses nonisolated and @concurrent (0/40)
- [ ] Misses await hop mechanism (0/35)
- [x] Recognizes intent to use background queue (15/25)

---

## ac-q26 (Written: Shared Utility Libraries Default Isolation)

### Rubric
- Explains that libraries and shared packages must remain platform-agnostic and versatile (45 pts, key)
- Points out that shared packages run in environments without a UI run loop, such as servers or command-line tools (35 pts, key)
- Notes that forcing main actor isolation on libraries would cause unnecessary actor hops on server or background systems (20 pts)

### Good Answer
Shared utility packages and libraries still default to non-isolated code because they must remain versatile across varied execution environments. Unlike app targets, libraries often run on servers, Linux systems, or command-line tools where no main UI run loop exists. Forcing default main actor isolation on library packages would introduce unnecessary actor hops and constrain their reusability.

**Score: 100/100**
- [x] Libraries must remain versatile and platform-agnostic (45/45)
- [x] Explains server/CLI environments lack UI run loops (35/35)
- [x] Notes avoidance of unnecessary actor hops (20/20)

### Average Answer
Shared packages default to nonisolated because they can be used on Linux or backend servers that do not have a graphical user interface.

**Score: 80/100**
- [x] Platform versatility (45/45)
- [x] Notes servers without graphical user interface (35/35)
- [ ] Does not detail actor hop overhead (0/20)

### Weak Answer
Libraries do not support actors yet in the current version of Xcode.

**Score: 0/100**
- [ ] Inaccurate assertion on actor support (0/45)
- [ ] Misses server/CLI environments (0/35)
- [ ] Misses actor hop considerations (0/20)

---

## ac-q27 (Written: Restrictions on Synchronous nonisolated Methods)

### Rubric
- States that the nonisolated method cannot access or mutate mutable actor-isolated stored properties (45 pts, key)
- Explains that synchronous access to isolated mutable state from outside the actor would cause data races (35 pts, key)
- Notes that the method can only access parameters, immutable constants, or its own local variables (20 pts)

### Good Answer
A synchronous nonisolated method inside a @MainActor type cannot read or mutate any mutable actor-isolated stored properties. Because the method executes outside actor isolation without an asynchronous suspension point, direct synchronous access to isolated mutable state would create data races. Consequently, the method may only operate on passed parameters, immutable constants (let bindings), or its own local variables.

**Score: 100/100**
- [x] Cannot access or mutate mutable actor state (45/45)
- [x] Explains direct synchronous access would cause data races (35/35)
- [x] Can only access parameters, constants, and local variables (20/20)

### Average Answer
A synchronous nonisolated method cannot access mutable variables on the class. It can only use its arguments and local variables.

**Score: 65/100**
- [x] Cannot access mutable state (45/45)
- [ ] Does not explain data race prevention reasons (0/35)
- [x] Uses arguments and local variables (20/20)

### Weak Answer
Nonisolated methods must return integers only.

**Score: 0/100**
- [ ] Irrelevant and incorrect restriction (0/45)
- [ ] Misses data race prevention (0/35)
- [ ] Misses parameter and local state rules (0/20)

---

## ac-q28 (Written: Developer Experience Comparison)

### Rubric
- Contrasts early Swift non-isolated default with modern @MainActor default for apps (40 pts, key)
- Mentions the reduction in boilerplate annotations and fewer accidental threading mistakes (35 pts, key)
- Explains that developers now follow an opt-out model for heavy background work (25 pts)

### Good Answer
In early Swift Concurrency, code defaulted to non-isolated execution, forcing developers to annotate virtually every view model, controller, and UI helper with @MainActor. Approachable concurrency recognizes that application development is overwhelmingly UI-focused and defaults app targets to @MainActor. This drastically reduces boilerplate annotations, prevents accidental off-thread UI bugs, and establishes a clean opt-out model for intensive background tasks.

**Score: 100/100**
- [x] Contrasts early non-isolated default with modern @MainActor default (40/40)
- [x] Mentions reduction in boilerplate and accidental threading bugs (35/35)
- [x] Highlights shift to an opt-out model for heavy tasks (25/25)

### Average Answer
Early Swift required adding @MainActor everywhere, which was tedious and prone to mistakes. Modern Swift defaults apps to @MainActor so you only have to think about background work when opting out.

**Score: 75/100**
- [x] Contrasts defaults (40/40)
- [x] Mentions less tedious annotations (35/35)
- [ ] Brief on the deeper developer experience and safety guarantees (0/25)

### Weak Answer
Modern Swift Concurrency is easier because Xcode writes all async functions automatically.

**Score: 0/100**
- [ ] Inaccurate assertion about automatic code generation (0/40)
- [ ] Misses comparative isolation defaults (0/35)
- [ ] Misses opt-out model (0/25)

---

## ac-q29 (Code-Write: DataTransformer with nonisolated computeHash)

### Rubric
- Declares DataTransformer with @MainActor isolation and a nonisolated computeHash method (40 pts, key)
- Correctly concatenates 'HASH:' with the input text parameter (30 pts)
- Calls computeHash and prints 'Result: HASH:apple' (30 pts, key)

### Good Answer
```swift
@MainActor
final class DataTransformer {
    nonisolated func computeHash(text: String) -> String {
        "HASH:" + text
    }
}

@MainActor
func runTransform() async {
    let transformer = DataTransformer()
    let hash = transformer.computeHash(text: "apple")
    print("Result: \(hash)")
}

await runTransform()
```

**Score: 100/100**
- [x] @MainActor and nonisolated computeHash (40/40)
- [x] Correct string prefix concatenation (30/30)
- [x] Calls helper and prints 'Result: HASH:apple' (30/30)

### Average Answer
```swift
@MainActor
class DataTransformer {
    nonisolated func computeHash(text: String) -> String {
        return "HASH:" + text
    }
}

func runTransform() async {
    let transformer = await DataTransformer()
    print("Result: " + transformer.computeHash(text: "apple"))
}

await runTransform()
```

**Score: 90/100**
- [x] @MainActor class with nonisolated method (40/40)
- [x] Correct string concatenation (30/30)
- [x] Prints expected output (20/30, slightly redundant await syntax)

### Weak Answer
```swift
class DataTransformer {
    func computeHash(text: String) -> String {
        return text
    }
}
print(DataTransformer().computeHash(text: "apple"))
```

**Score: 20/100**
- [ ] Missing @MainActor and nonisolated (0/40)
- [ ] Does not add 'HASH:' prefix (0/30)
- [x] Calls method and prints (20/30)

---

## ac-q30 (Code-Write: DashboardModel with Remote Status)

### Rubric
- Declares nonisolated async function fetchRemoteStatus returning 'All Systems Normal' (35 pts, key)
- Declares DashboardModel with @MainActor isolation and updates status after awaiting (35 pts, key)
- Prints exact output 'Dashboard: All Systems Normal' (30 pts, key)

### Good Answer
```swift
nonisolated func fetchRemoteStatus() async -> String {
    "All Systems Normal"
}

@MainActor
final class DashboardModel {
    var status = "Offline"

    func loadStatus() async {
        let result = await fetchRemoteStatus()
        status = result
    }
}

@MainActor
func testDashboard() async {
    let model = DashboardModel()
    await model.loadStatus()
    print("Dashboard: \(model.status)")
}

await testDashboard()
```

**Score: 100/100**
- [x] Nonisolated async fetchRemoteStatus (35/35)
- [x] @MainActor DashboardModel awaiting and mutating status (35/35)
- [x] Prints 'Dashboard: All Systems Normal' (30/30)

### Average Answer
```swift
nonisolated func fetchRemoteStatus() async -> String {
    return "All Systems Normal"
}

@MainActor
class DashboardModel {
    var status = "Offline"
    func loadStatus() async {
        self.status = await fetchRemoteStatus()
    }
}

@MainActor
func testDashboard() async {
    let d = DashboardModel()
    await d.loadStatus()
    print("Dashboard: \(d.status)")
}
await testDashboard()
```

**Score: 100/100**
- [x] All criteria met accurately (100/100)

### Weak Answer
```swift
func fetchRemoteStatus() -> String { "Online" }
class DashboardModel { var status = "" }
print("Dashboard: Online")
```

**Score: 15/100**
- [ ] Not nonisolated async (0/35)
- [ ] Not @MainActor, no loadStatus (0/35)
- [x] Prints formatted output prefix (15/30)

---

## ac-q31 (Code-Write: ScoreKeeper with Bonus Calculation)

### Rubric
- Declares ScoreKeeper with @MainActor and a nonisolated calculateBonus helper returning points * 3 (40 pts, key)
- Calculates bonus points (5 * 3 = 15) and adds to initial score 10 (30 pts)
- Prints exact output 'Final Score: 25' (30 pts, key)

### Good Answer
```swift
@MainActor
final class ScoreKeeper {
    var score: Int = 10

    nonisolated func calculateBonus(points: Int) -> Int {
        points * 3
    }

    func applyBonus() {
        let bonus = calculateBonus(points: 5)
        score += bonus
        print("Final Score: \(score)")
    }
}

@MainActor
func runScoreTest() {
    let keeper = ScoreKeeper()
    keeper.applyBonus()
}

runScoreTest()
```

**Score: 100/100**
- [x] ScoreKeeper @MainActor with nonisolated calculateBonus (40/40)
- [x] Calculates bonus and updates score (30/30)
- [x] Prints 'Final Score: 25' (30/30)

### Average Answer
```swift
@MainActor
class ScoreKeeper {
    var score = 10
    nonisolated func calculateBonus(points: Int) -> Int { points * 3 }
    func applyBonus() {
        score += calculateBonus(points: 5)
        print("Final Score: \(score)")
    }
}
@MainActor func runScoreTest() {
    ScoreKeeper().applyBonus()
}
runScoreTest()
```

**Score: 100/100**
- [x] Complete, concise implementation meeting all criteria (100/100)

### Weak Answer
```swift
class ScoreKeeper {
    var score = 25
}
print("Final Score: \(ScoreKeeper().score)")
```

**Score: 15/100**
- [ ] No @MainActor, no nonisolated calculateBonus (0/40)
- [ ] No calculation logic (0/30)
- [x] Hardcoded printed output (15/30)
