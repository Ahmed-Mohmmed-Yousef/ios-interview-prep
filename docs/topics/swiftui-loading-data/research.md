# Research: Loading Data in SwiftUI

Topic ID: `swiftui-loading-data`  
Level: Mid  
Goal: After this topic, you can load data with the task modifier and show images with AsyncImage.

## 1. Official Sources & Technical Mechanics

### Sources
- **AsyncImage (SwiftUI)**: https://developer.apple.com/documentation/swiftui/asyncimage
- **WWDC21: Discover concurrency in SwiftUI**: https://developer.apple.com/videos/play/wwdc2021/10019/
- **View.task(priority:_:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/view/task(priority:_:)
- **View.task(id:priority:_:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/view/task(id:priority:_:)
- **View.refreshable(action:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/view/refreshable(action:)

### Core Technical Concepts

1. **The `.task` View Modifier**:
   - SwiftUI's `.task` modifier attaches an asynchronous task to a view's lifetime.
   - It starts executing when the view appears.
   - It automatically cancels the running task when the view disappears (when it is destroyed or popped from navigation), preventing wasted network requests and memory leaks.
   - The closure runs in the view's `@MainActor` context, so mutating `@State` or observable models inside the closure is safe from data races.
   - `.task(id: value)`: re-executes whenever the provided `id` (conforming to `Equatable`) changes. Crucially, SwiftUI cancels any currently executing task before launching the new task for the updated value. This eliminates search query race conditions.

2. **`.task` vs `.onAppear` with `Task { ... }`**:
   - Using `.onAppear { Task { await load() } }` creates an unmanaged top-level unstructured task.
   - Unstructured tasks do NOT cancel when the view disappears. If a user pops a screen quickly, the network fetch continues downloading and parsing data, wasting bandwidth, battery, and CPU.
   - `.task` integrates directly with Swift structured concurrency and view lifetime.

3. **`AsyncImage`**:
   - Introduced in iOS 15, `AsyncImage` loads and displays images from remote URLs asynchronously.
   - Syntax variants:
     - `AsyncImage(url: url)`: displays a system placeholder while loading.
     - `AsyncImage(url: url) { image in image.resizable() } placeholder: { ProgressView() }`: provides custom image styling and placeholder.
     - `AsyncImage(url: url) { phase in ... }`: gives explicit control over all three `AsyncImagePhase` states:
       - `.empty`: loading in progress (e.g. `ProgressView()`).
       - `.success(image)`: loaded image ready to configure (e.g. `image.resizable().aspectRatio(contentMode: .fit)`).
       - `.failure(error)`: network or decoding error (e.g. fallback icon).
   - Relies on Foundation's `URLSession` shared cache (`URLCache`). It does not include an independent disk cache manager or thumbnail downsampling pipeline.

4. **`.refreshable`**:
   - Enables pull-to-refresh gestures on scroll views and lists.
   - Awaits an asynchronous closure, holding the activity indicator visible until the async operation finishes.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What is the difference between `.task` and `.onAppear` when loading data from a server?
- What are the three phases of `AsyncImagePhase`?
- How do you show a loading indicator while an `AsyncImage` is downloading?

### Mid Level
- How does `.task(id:)` help when building live search screens or filter lists?
- What happens to an active `.task` when a user navigates back in a `NavigationStack`?
- Why must you apply `.resizable()` to the image yielded by `AsyncImage` rather than to `AsyncImage` itself?
- How does `AsyncImage` handle image caching, and what are its limitations in high-performance lists?

### Senior / Staff Level
- How does SwiftUI coordinate task cancellation across view hierarchies when conditional views toggle?
- How would you architect an image caching pipeline when `AsyncImage` default `URLCache` behavior causes memory spikes in infinite scroll feeds?
