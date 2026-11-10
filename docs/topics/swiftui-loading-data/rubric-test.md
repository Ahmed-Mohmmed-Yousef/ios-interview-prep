# Rubric Test: Loading Data in SwiftUI

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/swiftui-loading-data/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sld-q24 (Written: .task Lifecycle and Cancellation)

### Rubric
- Explains that .task launches an asynchronous task when the view appears (40 pts, key)
- Explains that SwiftUI automatically cancels the running task when the view disappears (40 pts, key)
- Notes that automatic cancellation prevents wasted network bandwidth, CPU time, and battery (20 pts)

### Good Answer
The SwiftUI .task modifier automatically starts an asynchronous task as soon as its attached view appears on screen. When the view disappears or is popped from navigation, SwiftUI cooperatively cancels the running task. This automatic cancellation prevents background network requests and parsing jobs from wasting cellular data, CPU time, and battery life after the user leaves the screen.

**Score: 100/100**
- [x] Starts task when view appears (40/40)
- [x] Automatically cancels when view disappears (40/40)
- [x] Prevents wasted network, CPU, and battery (20/20)

### Average Answer
The .task modifier runs an async function when the view appears. If the user dismisses the view, SwiftUI cancels the task so it does not keep downloading data.

**Score: 80/100**
- [x] Runs on appearance (40/40)
- [x] Cancels on dismissal (40/40)
- [ ] Omits detailed system resource impact (0/20)

### Weak Answer
It makes tasks run faster by putting them on a background thread.

**Score: 0/100**
- [ ] Misses appearance trigger (0/40)
- [ ] Misses cancellation on disappear (0/40)
- [ ] Inaccurate assertion on speed (0/20)

---

## sld-q25 (Written: .task(id:) Mechanics and Search Interfaces)

### Rubric
- Explains that .task(id:) monitors changes to the provided identity value (35 pts, key)
- Explains that SwiftUI cancels any active task before restarting a fresh task for the new value (40 pts, key)
- Explains that this prevents race conditions where an old query could overwrite newer search results (25 pts)

### Good Answer
The .task(id:) modifier monitors its identity parameter for value changes. When the value changes—such as when a user types a new search query—SwiftUI cancels the currently active task before starting a fresh task with the updated query. This built-in cancellation eliminates race conditions where an older, slower network query might finish after a newer query and overwrite fresh search results.

**Score: 100/100**
- [x] Monitors identity parameter changes (35/35)
- [x] Cancels active task before restarting fresh task (40/40)
- [x] Prevents out-of-order search race conditions (25/25)

### Average Answer
When the id value changes, SwiftUI stops the old task and starts a new one. This is helpful for search because typing a new letter cancels the old search request.

**Score: 80/100**
- [x] Notes id changes (35/35)
- [x] Cancels old task and starts new (40/40)
- [ ] Does not explicitly describe race conditions overwriting results (5/25)

### Weak Answer
The id parameter is a unique identifier used to register the task in Core Data.

**Score: 0/100**
- [ ] Incorrect concept and framework (0/35)
- [ ] Misses cancellation behavior (0/40)
- [ ] Misses search query race prevention (0/25)

---

## sld-q26 (Written: AsyncImagePhase Cases and View Rendering)

### Rubric
- Identifies .empty and describes rendering a loading indicator such as ProgressView (35 pts, key)
- Identifies .success(Image) and describes rendering the downloaded image with modifiers like resizable (35 pts, key)
- Identifies .failure(Error) and describes rendering an error icon or fallback placeholder (30 pts, key)

### Good Answer
AsyncImagePhase has three cases:
1. `.empty`: The download is in progress, so the view renders a loading placeholder like `ProgressView()`.
2. `.success(let image)`: The image was downloaded and decoded successfully, allowing the view to render it with `.resizable()` and `.scaledToFit()`.
3. `.failure(let error)`: An error occurred, so the view renders an error symbol or a fallback placeholder.

**Score: 100/100**
- [x] Identifies .empty with ProgressView (35/35)
- [x] Identifies .success with image styling (35/35)
- [x] Identifies .failure with error placeholder (30/30)

### Average Answer
The three cases are empty, success, and failure. You show a spinner in empty, you show the image in success, and you show an error icon in failure.

**Score: 85/100**
- [x] Mentions empty with spinner (35/35)
- [x] Mentions success with image (30/35, misses resizable modifier detail)
- [x] Mentions failure with error icon (20/30)

### Weak Answer
AsyncImage has loaded and failed cases only.

**Score: 10/100**
- [ ] Misses .empty phase (0/35)
- [x] Mentions success/loaded and failed concept vaguely (10/35)
- [ ] Misses phase rendering details (0/30)

---

## sld-q27 (Written: Custom Image Caching in High-Volume Feeds)

### Rubric
- Mentions that AsyncImage relies primarily on URLCache without custom memory bounds (40 pts, key)
- Explains the need for image downsampling to match view dimensions and prevent memory spikes (35 pts, key)
- Discusses prefetching or persistent disk cache policies for smooth high-volume scrolling feeds (25 pts)

### Good Answer
AsyncImage relies on Foundation's `URLCache`, which does not provide custom in-memory footprint management or image downsampling. In a high-volume scrolling feed, decoding uncompressed full-resolution images into memory quickly leads to memory spikes and dropped frames. A senior engineer designs a dedicated pipeline that downsamples images to the exact target display size, manages aggressive in-memory NSCache bounds, and prefetches upcoming cells for fluid scrolling.

**Score: 100/100**
- [x] URLCache limitations without custom bounds (40/40)
- [x] Downsampling to view dimensions to avoid memory spikes (35/35)
- [x] Prefetching and caching policies for fluid scroll (25/25)

### Average Answer
AsyncImage only uses URLCache and cannot downsample large images. In a feed with hundreds of photos, decoding all those full-size images can run the app out of memory.

**Score: 75/100**
- [x] URLCache noted (40/40)
- [x] Mentions downsampling and memory pressure (35/35)
- [ ] Misses prefetching or custom memory cache policies (0/25)

### Weak Answer
AsyncImage is too slow because SwiftUI is slower than UIKit.

**Score: 0/100**
- [ ] Incorrect premise (0/40)
- [ ] Misses downsampling and memory mechanics (0/35)
- [ ] Misses caching architecture (0/25)

---

## sld-q28 (Written: Dangers of Unstructured Task in onAppear)

### Rubric
- Explains that unstructured tasks inside onAppear are not tied to view dismissal (45 pts, key)
- Points out that the task continues downloading after the user navigates away (35 pts, key)
- Notes that .task provides automatic cooperative cancellation upon view disappearance (20 pts)

### Good Answer
Launching an unstructured `Task` inside `.onAppear` detaches the asynchronous operation from the view presentation lifecycle. If a user quickly dismisses or pops the view, that background task keeps executing, wasting cellular data and battery life. By contrast, the `.task` modifier binds task lifetime directly to the view hierarchy, automatically triggering cooperative cancellation as soon as the view leaves the screen.

**Score: 100/100**
- [x] Unstructured task is not tied to view dismissal (45/45)
- [x] Task keeps executing, wasting data and battery (35/35)
- [x] Contrasts with .task automatic cancellation (20/20)

### Average Answer
Using Task inside onAppear does not cancel if the user leaves the screen. The network request keeps running in the background. Using .task cancels it automatically.

**Score: 85/100**
- [x] Does not cancel when leaving screen (45/45)
- [x] Keeps running in background (25/35)
- [x] Notes .task cancels automatically (15/20)

### Weak Answer
Task inside onAppear will crash the app because onAppear is deprecated in iOS 18.

**Score: 0/100**
- [ ] Inaccurate assertion about deprecation and crashes (0/45)
- [ ] Misses lifecycle cancellation concepts (0/35)
- [ ] Misses comparison with .task (0/20)

---

## sld-q29 (Code-Write: AsyncPhase Enum & Description)

### Rubric
- Declares AsyncPhase enum with empty, success(String), and failure(String) cases (35 pts, key)
- Implements describePhase returning correct strings for all three cases (35 pts, key)
- Prints exact output 'Success: Avatar' (30 pts, key)

### Good Answer
```swift
enum AsyncPhase {
    case empty
    case success(String)
    case failure(String)
}

func describePhase(_ phase: AsyncPhase) -> String {
    switch phase {
    case .empty:
        return "Loading"
    case .success(let value):
        return "Success: \(value)"
    case .failure(let error):
        return "Error: \(error)"
    }
}

func testPhase() {
    let result = describePhase(.success("Avatar"))
    print(result)
}

testPhase()
```

**Score: 100/100**
- [x] AsyncPhase enum declared (35/35)
- [x] describePhase matches all cases (35/35)
- [x] Prints 'Success: Avatar' (30/30)

### Average Answer
```swift
enum AsyncPhase {
    case empty
    case success(String)
    case failure(String)
}

func describePhase(_ phase: AsyncPhase) -> String {
    switch phase {
    case .empty: "Loading"
    case .success(let s): "Success: " + s
    case .failure(let e): "Error: " + e
    }
}

func testPhase() {
    print(describePhase(.success("Avatar")))
}

testPhase()
```

**Score: 100/100**
- [x] Clean implementation passing all criteria (100/100)

### Weak Answer
```swift
enum AsyncPhase { case success }
print("Success: Avatar")
```

**Score: 15/100**
- [ ] Incomplete enum missing cases and associated values (0/35)
- [ ] No describePhase implementation (0/35)
- [x] Hardcoded printed string (15/30)

---

## sld-q30 (Code-Write: UserListModel with loadUsers)

### Rubric
- Declares UserListModel with @MainActor isolation and properties users and isLoading (40 pts, key)
- Implements loadUsers updating isLoading and populating users with two items (30 pts)
- Prints exact output 'Users: 2' (30 pts, key)

### Good Answer
```swift
@MainActor
final class UserListModel {
    var users: [String] = []
    var isLoading: Bool = false

    func loadUsers() async {
        isLoading = true
        users = ["Sam", "Taylor"]
        isLoading = false
        print("Users: \(users.count)")
    }
}

@MainActor
func runModelTest() async {
    let model = UserListModel()
    await model.loadUsers()
}

await runModelTest()
```

**Score: 100/100**
- [x] @MainActor UserListModel with users & isLoading (40/40)
- [x] loadUsers updates isLoading and populates users (30/30)
- [x] Prints 'Users: 2' (30/30)

### Average Answer
```swift
@MainActor
class UserListModel {
    var users: [String] = []
    var isLoading = false
    func loadUsers() async {
        self.isLoading = true
        self.users = ["User1", "User2"]
        self.isLoading = false
        print("Users: \(self.users.count)")
    }
}

@MainActor
func runModelTest() async {
    await UserListModel().loadUsers()
}
await runModelTest()
```

**Score: 100/100**
- [x] Meets all rubric requirements (100/100)

### Weak Answer
```swift
class UserListModel {
    var users = [1, 2]
}
print("Users: \(UserListModel().users.count)")
```

**Score: 15/100**
- [ ] Missing @MainActor, isLoading, async loadUsers (0/40)
- [ ] No loading mutation logic (0/30)
- [x] Output prints 'Users: 2' (15/30)

---

## sld-q31 (Code-Write: SearchQueryTracker Query Change Guard)

### Rubric
- Declares SearchQueryTracker with currentQuery and executionCount on @MainActor (40 pts, key)
- Only updates query and increments count when newQuery differs from currentQuery (30 pts, key)
- Prints exact output 'Queries: 1' (30 pts, key)

### Good Answer
```swift
@MainActor
final class SearchQueryTracker {
    var currentQuery: String = ""
    var executionCount: Int = 0

    func updateQuery(to newQuery: String) {
        if newQuery != currentQuery {
            currentQuery = newQuery
            executionCount += 1
        }
    }
}

@MainActor
func testQueryTracker() {
    let tracker = SearchQueryTracker()
    tracker.updateQuery(to: "ios")
    tracker.updateQuery(to: "ios")
    print("Queries: \(tracker.executionCount)")
}

testQueryTracker()
```

**Score: 100/100**
- [x] @MainActor class with currentQuery & executionCount (40/40)
- [x] Guards against identical queries and increments on change (30/30)
- [x] Prints 'Queries: 1' (30/30)

### Average Answer
```swift
@MainActor
class SearchQueryTracker {
    var currentQuery = ""
    var executionCount = 0

    func updateQuery(to newQuery: String) {
        guard newQuery != currentQuery else { return }
        currentQuery = newQuery
        executionCount += 1
    }
}

@MainActor
func testQueryTracker() {
    let t = SearchQueryTracker()
    t.updateQuery(to: "ios")
    t.updateQuery(to: "ios")
    print("Queries: \(t.executionCount)")
}
testQueryTracker()
```

**Score: 100/100**
- [x] Uses idiomatic guard statement, meets all criteria (100/100)

### Weak Answer
```swift
class SearchQueryTracker {
    var executionCount = 1
}
print("Queries: \(SearchQueryTracker().executionCount)")
```

**Score: 15/100**
- [ ] Missing @MainActor and updateQuery method (0/40)
- [ ] No query comparison logic (0/30)
- [x] Hardcoded output string (15/30)
