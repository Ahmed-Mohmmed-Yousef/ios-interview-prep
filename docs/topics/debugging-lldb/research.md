# Research: Debugging with Breakpoints and LLDB

## 1. Core Concepts & Technical Facts

### What is LLDB?
- **LLDB** is the high-performance debugger component of the LLVM project and the default debugger in Xcode.
- It attaches to running iOS Simulator or physical device processes via `debugserver`.
- Allows pausing execution, inspecting stack frames, reading/writing memory, stepping through instructions, and dynamically evaluating Swift expressions.

### Xcode Breakpoint Types & Capabilities
1. **Line Breakpoints**:
   - Set by clicking on line numbers in the Xcode gutter. Pauses the thread whenever execution hits that line.
2. **Conditional Breakpoints**:
   - Evaluates a boolean expression (e.g., `itemCount > 10` or `userId == "guest"`).
   - Pauses only when the condition evaluates to `true`. Avoids manually stepping through hundreds of loop iterations.
3. **Action Breakpoints**:
   - Executes actions when hit: Log Message (with variable substitution like `Current count: @count@`), Play Sound, Run AppleScript, or run LLDB shell commands.
   - When **"Automatically continue after evaluating actions"** is checked, acts as dynamic live logging without recompiling or modifying source files!
4. **Exception Breakpoints**:
   - Catch crashes at the exact throw site before the stack unwinds.
   - Catches Objective-C exceptions (like `NSInvalidArgumentException`) and Swift runtime errors.
5. **Symbolic Breakpoints**:
   - Pauses execution on any method or function matching a symbol string across the app and system frameworks.
   - Examples: `-[UIViewController viewDidLoad]`, `UIViewAlertForUnsatisfiableConstraints` (catches Auto Layout constraint conflicts immediately).

### Essential LLDB Commands

| Command | Full Syntax | Purpose |
|---|---|---|
| `po` | `expression -O --` | **Print Object Description**: Evaluates an expression and outputs its `CustomStringConvertible` or `debugDescription`. |
| `p` | `expression --` | **Print Expression Result**: Compiles and evaluates an expression; outputs the result with full Swift type information and temporary `$R` variable name. |
| `v` | `frame variable` | **Frame Variable Inspection**: Reads variables directly from current stack memory using debug symbols. Does not compile an expression context—much faster and avoids side effects! |
| `c` | `process continue` | **Continue**: Resumes execution until the next breakpoint or signal. |
| `n` | `thread step-over` | **Step Over**: Advances execution to the next line in the current function. |
| `s` | `thread step-in` | **Step Into**: Jumps inside the function called on the current line. |
| `finish` | `thread step-out` | **Step Out**: Finishes the current function and returns to the calling frame. |
| `bt` | `thread backtrace` | **Backtrace**: Dumps the current thread's call stack frames. `bt all` dumps all threads. |

### Evaluation vs Direct Memory Inspection (`p` vs `v`)
- `p` and `po` compile a small Swift module dynamically in the target process address space.
  - Pros: Allows calling methods, accessing computed properties, and running complex expressions.
  - Cons: Slower; can trigger side effects (e.g. `p counter += 1` permanently changes variable state in memory during debugging).
- `v` (`frame variable`) reads memory directly without compiling Swift expressions.
  - Pros: Instant execution; zero risk of mutating process state or triggering side effects.
  - Cons: Cannot evaluate arbitrary Swift methods or expressions.

---

## 2. Common Misconceptions & Interview Traps

1. **"Using print() statements is faster than breakpoints"**:
   - *Trap*: Littering code with `print("here 1")` statements.
   - *Reality*: Requires constant recompilation, code commits polluted with debugging statements, and cannot inspect state interactively. Action breakpoints with automatic continue log without touching source code.
2. **"`po` and `p` are read-only inspections"**:
   - *Trap*: Running arbitrary method calls in `po` assuming state won't change.
   - *Reality*: Any expression evaluated in `p` or `po` executes live inside the process. Calling mutating methods in the debugger alters application state.
3. **"`po` is always better than `p`"**:
   - *Trap*: Exclusively using `po`.
   - *Reality*: `po` only returns the description string. `p` displays the full structure, properties, and types of structs and objects, and assigns a `$R0` reference for subsequent debugger calls.
4. **"Exception Breakpoints slow down the app during release"**:
   - *Trap*: Believing breakpoints affect production builds.
   - *Reality*: Breakpoints are IDE constructs stored in user Xcode schemes. They have zero presence in release binary builds.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "Breakpoints pause app execution at a specific line of code so we can inspect variables in Xcode. LLDB is the debugger console in Xcode. The most common commands are `po` to print an object's description, `p` to print its value and type, and `c` to continue running. Stepping buttons let us step over or step into lines of code to find where a bug happens."
- **Junior**:
  - "I use advanced breakpoints and LLDB to isolate bugs quickly without recompiling. Conditional breakpoints pause only when a specific condition is met, such as inside a loop. Action breakpoints with 'automatically continue' let me inject live logs without editing code. In LLDB, I use `po` for string descriptions, `p` to evaluate expressions, and `v` (`frame variable`) to read local variables fast without running code or triggering side effects. I also use Exception Breakpoints to catch crashes before the stack unwinds."
- **Senior**:
  - "In complex debugging scenarios, LLDB provides deep introspection into process memory and thread concurrency. I set Symbolic Breakpoints on `UIViewAlertForUnsatisfiableConstraints` to debug Auto Layout conflicts, and configure memory watchpoints with `watchpoint set variable` to detect unwanted state mutations across threads. When diagnosing race conditions, I examine thread backtraces using `bt all` and inspect registers with `register read`. I also write custom Python LLDB scripts and aliases to automate memory audits and view hierarchy inspections across our engineering team."
