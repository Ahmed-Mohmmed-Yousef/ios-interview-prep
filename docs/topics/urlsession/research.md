# Research: URLSession

## 1. Core Concepts & Technical Facts

### What is URLSession?
- `URLSession` is Apple's primary networking class in Foundation for downloading and uploading content over HTTP/HTTPS.
- Coordinates data transfer tasks, manages connection pooling, HTTP/2 and HTTP/3 multiplexing, TLS handshakes, caching policies, and authentication challenges.

### URLSession Configurations (`URLSessionConfiguration`)
1. **`.default`**:
   - Uses persistent disk-based caching (`URLCache`), stores cookies in the shared cookie storage, and saves credentials in Keychain.
2. **`.ephemeral`**:
   - Zero disk persistence. All caches, credential stores, and cookies exist strictly in RAM and vanish when the session invalidates. Equivalent to private browsing mode.
3. **`.background(withIdentifier:)`**:
   - Delegates network transfers to an independent system daemon (`nsurlsessiond`).
   - Downloads and uploads continue even if the host application process is suspended, memory-purged, or terminated by the operating system.
4. **`URLSession.shared` Singleton**:
   - A convenient pre-configured singleton using the `.default` configuration.
   - Limitations: Cannot customize timeout intervals, caching policies, or cookie storage, and cannot use a custom `URLSessionDelegate` or background downloads.

### The Four Task Types
1. **`URLSessionDataTask`**:
   - Retrieves response payloads directly into memory as `Data` bytes. Best suited for JSON REST APIs and small payloads.
2. **`URLSessionDownloadTask`**:
   - Streams downloaded bytes directly to a temporary file on the local filesystem. Protects RAM when downloading large files (videos, zip archives).
3. **`URLSessionUploadTask`**:
   - Uploads data payloads or disk files via `POST` or `PUT`, providing background transfer capabilities.
4. **`URLSessionWebSocketTask`**:
   - Provides full-duplex TCP communication using the WebSocket protocol (RFC 6455).

### Modern Async/Await vs Classic Completion Handlers
- **Modern Swift Concurrency (iOS 15+)**:
  ```swift
  let (data, response) = try await URLSession.shared.data(from: url)
  guard let httpResponse = response as? HTTPURLResponse,
        (200...299).contains(httpResponse.statusCode) else {
      throw NetworkError.serverError
  }
  let item = try JSONDecoder().decode(Item.self, from: data)
  ```
  - Eliminates pyramid-of-doom nested closures and weak self capture lists.
  - Automatically respects Swift cooperative task cancellation (`Task.isCancelled`).
- **Classic Completion Handler API**:
  ```swift
  let task = URLSession.shared.dataTask(with: url) { data, response, error in
      // Runs on background queue
  }
  task.resume() // MANDATORY: tasks start in suspended state!
  ```

### Crucial Networking Pitfalls & Rules
1. **Transport Errors vs HTTP Status Codes**:
   - A `404 Not Found` or `500 Internal Server Error` is **not** a network failure. The transport succeeded. `error` will be `nil`, and `data` will contain the server's error response. Always cast `response` to `HTTPURLResponse` and check `statusCode`.
2. **Main Thread UI Updates**:
   - URLSession delegate callbacks and completion handlers run on background threads. Updating UI directly causes glitches or runtime thread sanitization crashes. In Swift 6, functions marked `@MainActor` ensure UI safety.
3. **Task Suspension at Creation**:
   - Classic tasks created with `dataTask(...)` initialize in the `suspended` state. Forgetting `task.resume()` causes the network request to never execute.

---

## 2. Common Misconceptions & Interview Traps

1. **"Forgetting `task.resume()`"**:
   - *Trap*: Calling `URLSession.shared.dataTask(with: url) { ... }` without `.resume()`.
   - *Reality*: The task never starts; nothing happens.
2. **"Treating 404 or 500 as an `Error` in `data(from:)`"**:
   - *Trap*: Expecting `try await URLSession.shared.data(from: url)` to throw an error when the server returns 404 or 500.
   - *Reality*: The method only throws for transport or connection failures (offline, timeout, DNS error). A 404 returns valid `(data, response)` with `httpResponse.statusCode == 404`. You must check status codes explicitly.
3. **"Updating UI on the background completion queue"**:
   - *Trap*: Modifying a published SwiftUI property or UIKit label inside a completion closure without dispatching to `@MainActor` or `DispatchQueue.main`.
4. **"Using URLSession.shared for background downloads"**:
   - *Trap*: Expecting `URLSession.shared` to download files while the app is in the background.
   - *Reality*: Out-of-process transfers require `URLSessionConfiguration.background(withIdentifier:)`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "`URLSession` is the Foundation class we use to fetch data from web APIs. We give it a URL or a `URLRequest`. With modern Swift, we use `try await URLSession.shared.data(from: url)`, check that the response status code is in the 200 range, and decode the JSON data into our Codable model. Because networking happens in the background, we update our UI on the main thread."
- **Junior**:
  - "`URLSession` manages network tasks using three main configurations: default, ephemeral for private in-memory sessions, and background for out-of-process downloads managed by `nsurlsessiond`. In modern iOS, we use async/await `data(for:)`, which supports structured cancellation. We differentiate transport errors (timeouts and no internet) from HTTP status errors by checking `(response as? HTTPURLResponse)?.statusCode`. In classic code, we remember that newly initialized tasks start suspended and require `task.resume()`."
- **Senior**:
  - "Architecturally, we abstract `URLSession` behind a protocol-oriented network service layer to allow clean mock injection for unit testing. We tune `URLSessionConfiguration` for connection timeouts, custom `URLCache` storage limits, and security via SSL pinning in `URLSessionDelegate`. We handle cancellation propagation through `Task` cancellation trees and isolate data transformations off the main actor, mapping HTTP status codes and `URLError` transport domains into strongly-typed domain errors before dispatching state updates to `@MainActor` view models."
