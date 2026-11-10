# Rubric Test: Finding Leaks with the Memory Graph

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/memory-graph-debugger/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## mgd-q24 (Written: Retain Cycles vs Abandoned Memory)

### Rubric
- Explains that retain cycles form isolated islands of mutually strong references without external roots (40 pts, key)
- Identifies the purple exclamation badge as the visual indicator for retain cycles (30 pts, key)
- Explains that abandoned memory remains attached to a root object such as a singleton or collection (30 pts)

### Good Answer
The Xcode Memory Graph debugger pauses the app and scans heap allocations for circular reference paths. When objects strongly reference each other with no remaining root pointers, Xcode marks them with a purple exclamation badge. In contrast, abandoned memory stays reachable through an active root object. Because of this root reference, Xcode shows no purple badge.

**Score: 100/100**
- [x] Explains retain cycles form isolated islands without roots (40/40)
- [x] Identifies purple exclamation badge (30/30)
- [x] Explains abandoned memory remains attached to root object (30/30)

### Average Answer
Xcode finds retain cycles when two objects hold onto each other strongly. It shows a purple badge for these cycles. Abandoned memory happens when an object is still kept around by a cache or singleton, but you do not see a purple badge.

**Score: 70/100**
- [x] Explains retain cycles form mutual references (30/40 - misses island/root absence detail)
- [x] Identifies purple exclamation badge (30/30)
- [x] Mentions cache or singleton without explaining reachable root graph structure (10/30)

### Weak Answer
Retain cycles are leaks that waste RAM. Xcode displays memory warnings in red.

**Score: 0/100**
- [ ] Explains retain cycles form isolated islands without roots (0/40)
- [ ] Identifies purple exclamation badge (0/30)
- [ ] Explains abandoned memory remains attached to root object (0/30)

---

## mgd-q25 (Written: Malloc Stack Logging)

### Rubric
- States where to enable Malloc Stack Logging (Scheme Diagnostics tab under Run action) (35 pts, key)
- Explains that it records the full allocation backtrace or call stack for heap allocations (35 pts, key)
- Explains that selecting a node in the Memory Graph reveals the exact file and line that created it (30 pts)

### Good Answer
Malloc Stack Logging is enabled in the scheme diagnostics tab under the Run action. It records the full call stack for every memory allocation on the heap. When enabled, selecting an object in the Memory Graph debugger displays the exact file and line number that created that instance. Without it, you can only see that an object exists, but not where it came from.

**Score: 100/100**
- [x] States where to enable Malloc Stack Logging (35/35)
- [x] Explains that it records allocation backtraces (35/35)
- [x] Explains inspector reveals file and line number (30/30)

### Average Answer
You turn on Malloc Stack Logging in the scheme settings under diagnostics. It records the stack trace of each allocation so when you click a node you can see where it was allocated in code.

**Score: 75/100**
- [x] States scheme diagnostics location (30/35)
- [x] Explains recording allocation stack traces (25/35)
- [x] Explains viewing location on node selection (20/30)

### Weak Answer
Malloc logging logs messages to the system console when the app allocates memory.

**Score: 0/100**
- [ ] States where to enable Malloc Stack Logging (0/35)
- [ ] Explains recording allocation backtraces (0/35)
- [ ] Explains node inspector file and line revelation (0/30)

---

## mgd-q26 (Written: Leaking Screen Without Purple Badge)

### Rubric
- Describes a valid scenario such as registering with NotificationCenter or appending to a singleton manager (40 pts, key)
- Explains why the purple badge is missing (the instance is still reachable from a root) (30 pts, key)
- Explains how to locate it (filtering by class name in the navigator and checking instance count) (30 pts)

### Good Answer
A dismissed view controller will leak without a purple badge if a long-lived singleton or notification observer retains it. Because the singleton is a root object, the view controller is still reachable, so Xcode does not flag it as an isolated cycle. To locate this leak, I filter the Debug Navigator by class name. Then I check if the instance count stays above zero after dismissal.

**Score: 100/100**
- [x] Describes valid scenario with singleton or notification observer (40/40)
- [x] Explains purple badge is missing because instance is reachable from root (30/30)
- [x] Explains filtering by class name and checking instance count (30/30)

### Average Answer
If a view controller registers for notifications and does not remove itself, or stays in a global array, it stays in memory. Xcode will not show a purple badge because it is not a direct cycle. You have to search for the view controller class in the memory graph list and see if it is still alive.

**Score: 75/100**
- [x] Describes valid scenario (35/40)
- [x] Explains lack of purple badge (20/30 - mentions not direct cycle rather than root reachability)
- [x] Explains searching class list to check if alive (20/30)

### Weak Answer
Xcode misses some leaks when the device runs out of memory. You should restart the simulator.

**Score: 0/100**
- [ ] Describes valid scenario (0/40)
- [ ] Explains why purple badge is missing (0/30)
- [ ] Explains locating leak via filtering and instance count (0/30)

---

## mgd-q27 (Written: CI/CD Memory Leak Automation)

### Rubric
- Mentions generating or exporting a .memgraph file from tests or command line (40 pts, key)
- Mentions running the leaks or malloc_history command-line tool on the memgraph (35 pts, key)
- Explains failing the automated build if leaks reports retain cycles (25 pts)

### Good Answer
Teams can export a .memgraph snapshot during UI or integration tests using terminal commands or test attachments. In continuous integration, a shell step runs the leaks command-line utility against the exported memgraph file. If leaks identifies retain cycles or abandoned allocations, it exits with a non-zero status code, failing the build automatically before code merges.

**Score: 100/100**
- [x] Mentions exporting .memgraph file (40/40)
- [x] Mentions running leaks command-line utility (35/35)
- [x] Explains failing build on non-zero exit / reported leaks (25/25)

### Average Answer
You can save a memgraph file during automated test runs. Then run the `leaks` command on the file. If it finds leaks, stop the build.

**Score: 75/100**
- [x] Mentions memgraph file (30/40)
- [x] Mentions running `leaks` tool (30/35)
- [x] Mentions stopping build on leaks (15/25)

### Weak Answer
Run unit tests in Xcode Cloud and read the crash reports.

**Score: 0/100**
- [ ] Mentions exporting .memgraph file (0/40)
- [ ] Mentions running leaks tool (0/35)
- [ ] Explains failing automated build (0/25)

---

## mgd-q28 (Written: Weak vs Unowned)

### Rubric
- Explains that weak becomes nil when the target deallocates and is always an optional (40 pts, key)
- Explains that unowned assumes the target is never nil and crashes if accessed after deallocation (35 pts, key)
- States to avoid unowned when lifetimes are asynchronous, independent, or uncertain (25 pts)

### Good Answer
A weak reference does not keep the target alive and becomes nil automatically when the instance deallocates, requiring an optional type. An unowned reference also avoids incrementing reference count, but assumes the target remains alive throughout its access. You should avoid unowned in asynchronous callbacks or network closures where the target might deallocate before the block executes, which would cause a crash.

**Score: 100/100**
- [x] Explains weak becomes nil and is optional (40/40)
- [x] Explains unowned assumes target alive and crashes if nil (35/35)
- [x] States avoiding unowned in asynchronous or uncertain lifetimes (25/25)

### Average Answer
Weak references are optional and turn to nil when the object dies. Unowned references are not optional and crash if the object is gone when called. You should use weak when dealing with network calls.

**Score: 75/100**
- [x] Explains weak becomes nil (30/40)
- [x] Explains unowned crashes if object gone (25/35)
- [x] Mentions using weak for network calls (20/25)

### Weak Answer
Weak is for structs and unowned is for classes.

**Score: 0/100**
- [ ] Explains weak becomes nil and is optional (0/40)
- [ ] Explains unowned behavior and crash risk (0/35)
- [ ] Explains when to avoid unowned (0/25)

---

## mgd-q29 (Code-Write: SafeTimer with [weak self])

### Rubric
- Defines SafeTimer with tick closure and name properties (25 pts, key)
- Uses [weak self] inside setup to avoid a retain cycle and safely unwrap self (40 pts, key)
- Prints deallocation message and ensures instance deallocates cleanly when set to nil (35 pts)

### Good Answer
```swift
final class SafeTimer {
    var tick: (() -> Void)?
    let name: String
    init(name: String) {
        self.name = name
    }
    func setup() {
        tick = { [weak self] in
            guard let self = self else { return }
            print("Ticking \(self.name)")
        }
    }
    deinit {
        print("\(name) deallocated")
    }
}

var timer: SafeTimer? = SafeTimer(name: "Watch")
timer?.setup()
timer = nil
```

**Score: 100/100**
- [x] Defines class with properties and initializer (25/25)
- [x] Uses [weak self] and unwrap guard (40/40)
- [x] Deallocates and prints "Watch deallocated" (35/35)

### Average Answer
```swift
final class SafeTimer {
    var tick: (() -> Void)?
    let name: String
    init(name: String) { self.name = name }
    func setup() {
        tick = { [weak self] in
            if let name = self?.name {
                print("Ticking \(name)")
            }
        }
    }
    deinit { print("\(name) deallocated") }
}
var timer: SafeTimer? = SafeTimer(name: "Watch")
timer?.setup()
timer = nil
```

**Score: 90/100**
- [x] Defines class with properties (25/25)
- [x] Uses [weak self] with optional chaining (35/40)
- [x] Deallocates cleanly (30/35)

### Weak Answer
```swift
final class SafeTimer {
    var tick: (() -> Void)?
    let name: String
    init(name: String) { self.name = name }
    func setup() {
        tick = {
            print("Ticking \(self.name)")
        }
    }
}
var timer = SafeTimer(name: "Watch")
```

**Score: 25/100**
- [x] Defines class properties (25/25)
- [ ] Retain cycle present; missing [weak self] (0/40)
- [ ] Missing deinit and deallocation test (0/35)

---

## mgd-q30 (Code-Write: Department and Employee)

### Rubric
- Declares weak var department in Employee to prevent a retain cycle (40 pts, key)
- Declares strong var head in Department and implements deinit for both classes (30 pts, key)
- Links instances and sets references to nil producing Sales deinit and Alice deinit (30 pts)

### Good Answer
```swift
final class Department {
    var head: Employee?
    let name: String
    init(name: String) { self.name = name }
    deinit { print("\(name) deinit") }
}

final class Employee {
    weak var department: Department?
    let name: String
    init(name: String) { self.name = name }
    deinit { print("\(name) deinit") }
}

var dept: Department? = Department(name: "Sales")
var emp: Employee? = Employee(name: "Alice")
dept?.head = emp
emp?.department = dept
dept = nil
emp = nil
```

**Score: 100/100**
- [x] Declares weak var department in Employee (40/40)
- [x] Declares strong var head and deinit in both (30/30)
- [x] Links instances and sets references to nil (30/30)

### Average Answer
```swift
final class Department {
    var head: Employee?
    var name: String
    init(name: String) { self.name = name }
    deinit { print("\(name) deinit") }
}
final class Employee {
    weak var department: Department?
    var name: String
    init(name: String) { self.name = name }
    deinit { print("\(name) deinit") }
}
var dept: Department? = Department(name: "Sales")
var emp: Employee? = Employee(name: "Alice")
dept?.head = emp
emp?.department = dept
dept = nil
```

**Score: 80/100**
- [x] Declares weak var department in Employee (40/40)
- [x] Declares head and deinit (30/30)
- [ ] Only clears dept; emp not cleared (10/30)

### Weak Answer
```swift
class Department { var head: Employee? }
class Employee { var department: Department? }
```

**Score: 10/100**
- [ ] Department is strong in Employee; creates retain cycle (0/40)
- [ ] Missing name, initializers, deinit (10/30)
- [ ] Missing linking and lifecycle demonstration (0/30)

---

## mgd-q31 (Code-Write: ImageCache Collection Management)

### Rubric
- Declares ImageCache class with private list and computed count property (30 pts, key)
- Implements add and clear methods correctly modifying internal list (40 pts, key)
- Instantiates cache, adds items, clears items, and prints correct counts 2 and 0 (30 pts)

### Good Answer
```swift
final class ImageCache {
    private var list: [String] = []
    func add(_ url: String) {
        list.append(url)
    }
    func clear() {
        list.removeAll()
    }
    var count: Int {
        return list.count
    }
}

let cache = ImageCache()
cache.add("img1.png")
cache.add("img2.png")
print("Count: \(cache.count)")
cache.clear()
print("Count: \(cache.count)")
```

**Score: 100/100**
- [x] Declares class with private list and computed count (30/30)
- [x] Implements add and clear methods (40/40)
- [x] Instantiates, adds items, clears, and prints counts 2 and 0 (30/30)

### Average Answer
```swift
final class ImageCache {
    var list: [String] = []
    func add(_ url: String) { list.append(url) }
    func clear() { list = [] }
    var count: Int { list.count }
}
let cache = ImageCache()
cache.add("img1.png")
cache.add("img2.png")
print("Count: \(cache.count)")
cache.clear()
print("Count: \(cache.count)")
```

**Score: 85/100**
- [x] Declares class with list and count (25/30 - list not private)
- [x] Implements add and clear (35/40)
- [x] Instantiates and prints correct counts (25/30)

### Weak Answer
```swift
class ImageCache {
    var items: [String] = []
}
```

**Score: 10/100**
- [ ] Missing private list, count property (10/30)
- [ ] Missing add and clear methods (0/40)
- [ ] Missing testing logic and output (0/30)
