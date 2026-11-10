# Research: Finding Leaks with the Memory Graph

Topic ID: `memory-graph-debugger`
Level: Mid
Goal: After this topic, you can find memory leaks with the Xcode Memory Graph debugger.

## 1. Official Sources & Tool Mechanics

### Sources
- **Apple Developer Documentation: Gathering information about memory use (Xcode)**
  https://developer.apple.com/documentation/xcode/gathering-information-about-memory-use
- **WWDC18: iOS Memory Deep Dive (Session 416)**
  https://developer.apple.com/videos/play/wwdc2018/416/
- **Apple Developer Documentation: Diagnosing memory performance issues**
  https://developer.apple.com/documentation/xcode/diagnosing-memory-performance-issues

### Core Technical Concepts

1. **The Xcode Memory Graph Debugger**:
   - Activated via the "Debug Memory Graph" button in the Xcode debug bar (icon of three connected circles/nodes).
   - Pauses app execution and snapshots process memory.
   - Scans the heap to construct an object graph showing all active object instances and the pointers connecting them.
   - Grouped in the Debug Navigator by module and class name, showing instance counts and memory footprints.

2. **Detecting Retain Cycles (Leaks)**:
   - Strong references are represented by directional solid arrows.
   - Xcode automatically runs leak detection algorithms on the snapshot.
   - Detected retain cycles appear with a purple exclamation mark badge in the Debug Navigator.
   - Selecting a leaked instance reveals circular arrows (for example: `ViewController` -> `Closure` -> `ViewController`).

3. **Malloc Stack Logging**:
   - Located in Xcode Scheme Settings: `Product` > `Scheme` > `Edit Scheme...` > `Run` > `Diagnostics`.
   - Option: `Malloc Stack Logging` with choice between "Live Allocations Only" or "All Allocations and History".
   - When enabled, macOS/iOS records the call stack for every memory allocation.
   - Selecting any node in the Memory Graph then displays the exact backtrace (file and line number) where that instance was allocated in the Memory Inspector pane on the right.

4. **Retain Cycles vs Abandoned Memory**:
   - **Retain Cycle (True Leak)**: Two or more objects retain each other strongly, but no outside active reference points to them. They cannot be reached by normal code yet cannot be deallocated by ARC. Xcode flags these with purple badges.
   - **Abandoned Memory / Unbounded Growth**: Objects are still reachable from a root object (for example: appended to an array in a singleton, cached indefinitely, or registered in `NotificationCenter` without unregistering). ARC keeps them alive legitimately, so Xcode will NOT flag them with purple leak badges. You must locate them by filtering instance counts or comparing graphs over time.

5. **Exporting and Command-Line Diagnostics**:
   - Memory graphs can be exported as a `.memgraph` file via `File` > `Export Memory Graph...`.
   - Command-line tools:
     - `leaks <target.memgraph>`: automated leak verification in continuous integration.
     - `vmmap --summary <target.memgraph>`: virtual memory layout (dirty, clean, compressed memory).
     - `heap <target.memgraph>`: lists all active allocations grouped by class.
     - `malloc_history <target.memgraph> <address>`: prints full allocation stack for an address.

## 2. Interview Questions by Level

### Fresh / Junior
- What is the Memory Graph Debugger in Xcode?
- What does a purple exclamation badge mean in the Debug Navigator?
- How do you fix a retain cycle between a view controller and a closure?

### Mid
- How do you enable Malloc Stack Logging, and why is it essential when debugging leaks?
- Why might an object leak or remain in memory even if Xcode does not show a purple warning badge?
- How do you differentiate between an isolated retain cycle and abandoned memory?

### Senior
- How do you automate memory leak detection in a CI/CD pipeline using `.memgraph` and command-line utilities?
- How does the Memory Graph debugger differentiate strong references from weak or autoreleased pointers?
- How do you diagnose memory spikes caused by abandoned image caches versus true ARC reference cycles?

## 3. Common Traps and Misconceptions

- **Trap 1: Relying only on purple badges**:
  Purple badges only detect isolated, unreferenced reference cycles. If a view controller is retained by a root navigation controller or a singleton, it is still reachable. Xcode does not mark it with a purple badge, even if the screen was popped from navigation.
- **Trap 2: Debugging without Malloc Stack Logging**:
  Without Malloc Stack Logging enabled in scheme diagnostics, the inspector pane cannot display the code line or call stack that allocated the instance. Developers see that an object exists, but cannot tell where it came from.
- **Trap 3: Confusing value types and reference types in the graph**:
  Structs and enums do not appear as standalone heap nodes unless boxed or wrapped in classes or collections. The graph displays heap allocations (classes, boxed existentials, closures, buffers).
