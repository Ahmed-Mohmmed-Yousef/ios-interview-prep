# Rubric Test: Caching

**Topic:** `caching`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): NSCache vs URLCache

**Prompt:** Explain the difference between NSCache and URLCache in iOS apps. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "URLCache manages raw HTTP network responses across memory and disk according to HTTP headers like Cache-Control. In contrast, NSCache is an in-memory key-value container used for decoded objects such as UIImage instances. NSCache automatically evicts stored items when the system experiences memory pressure, preventing application crashes."
- **Expected Score:** 100% (Met: URLCache HTTP disk/memory 50%, Met: NSCache in-memory auto-eviction 50%)
- **Rationale:** Accurately distinguishes network response caching from runtime object caching.

### Sample 2: Average
- **Answer:** "URLCache saves web data to disk based on headers. NSCache holds objects in RAM and deletes them when memory is low."
- **Expected Score:** 75% (Partly Met: URLCache 25%, Met: NSCache 50%)
- **Rationale:** Captures core ideas with concise wording.

### Sample 3: Weak
- **Answer:** "They are both used to save user login passwords securely."
- **Expected Score:** 0% (Not Met: URLCache 0%, Not Met: NSCache 0%)
- **Rationale:** Confuses caching with Keychain credential storage.

---

## Question 25 (Written): HTTP 304 Not Modified Benefits

**Prompt:** Explain what HTTP 304 Not Modified means and how it benefits mobile applications. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "A 304 Not Modified status code tells the client that the requested content has not changed on the server since the previous fetch. The server omits the response body when validation tokens like ETags match. This allows the app to reuse its cached payload, saving cellular data bandwidth and conserving battery power."
- **Expected Score:** 100% (Met: meaning of 304 status 50%, Met: bandwidth and battery benefits 50%)
- **Rationale:** Accurately describes cache revalidation and bandwidth savings.

### Sample 2: Average
- **Answer:** "304 means the file on the server has not changed, so you do not download the body again. It saves internet data."
- **Expected Score:** 75% (Met: meaning 50%, Partly Met: benefits 25%)
- **Rationale:** Identifies unchanged payload and bandwidth benefit.

### Sample 3: Weak
- **Answer:** "304 is a redirect code that sends the browser to another website."
- **Expected Score:** 0% (Not Met: meaning 0%, Not Met: benefits 0%)
- **Rationale:** Confuses 304 Not Modified with 301/302 redirects.

---

## Question 26 (Written): Why Avoid Standard Dictionary for Image Cache

**Prompt:** Why should developers avoid using a standard Swift Dictionary as an image cache, and what should be used instead? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Standard Swift dictionaries hold strong references to all values and never purge items automatically. In image-heavy apps, this unmanaged memory growth causes the operating system to terminate the app due to out-of-memory pressure. Developers should use NSCache instead because it automatically purges items under memory pressure and provides thread safety."
- **Expected Score:** 100% (Met: dictionary memory risk 50%, Met: NSCache alternative 50%)
- **Rationale:** Clearly identifies the absence of auto-eviction and recommends NSCache.

### Sample 2: Average
- **Answer:** "A dictionary keeps growing and will crash your app with an out-of-memory error. You should use NSCache because it deletes items when memory is tight."
- **Expected Score:** 100% (Met: dictionary risk 50%, Met: NSCache alternative 50%)
- **Rationale:** Covers both critical points in plain language.

### Sample 3: Weak
- **Answer:** "Dictionaries are too slow to look up strings in Swift."
- **Expected Score:** 0% (Not Met: memory 0%, Not Met: NSCache 0%)
- **Rationale:** Incorrectly claims hash lookup performance is the issue.

---

## Question 27 (Written): Comparing useProtocolCachePolicy and returnCacheDataElseLoad

**Prompt:** Explain the difference between URLRequest cache policies useProtocolCachePolicy and returnCacheDataElseLoad. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "The default useProtocolCachePolicy strictly follows HTTP caching rules and server Cache-Control directives, contacting the server when cached data expires. On the other hand, returnCacheDataElseLoad uses existing local cache data regardless of expiration or age. It only initiates a network connection if no cached response exists locally."
- **Expected Score:** 100% (Met: protocol policy 50%, Met: returnCacheDataElseLoad 50%)
- **Rationale:** Clearly compares standard HTTP expiration rules against offline-first cache reuse.

### Sample 2: Average
- **Answer:** "useProtocolCachePolicy follows what the server headers say. returnCacheDataElseLoad always loads from cache if it exists, even if old."
- **Expected Score:** 100% (Met: protocol 50%, Met: returnElseLoad 50%)
- **Rationale:** Succinct and accurate explanation of both policies.

### Sample 3: Weak
- **Answer:** "One is used for images and the other is used for JSON text."
- **Expected Score:** 0% (Not Met: protocol 0%, Not Met: returnElseLoad 0%)
- **Rationale:** Incorrectly attributes cache policies to payload types.

---

## Question 28 (Written): Caching Decoded Bitmaps vs Raw Data

**Prompt:** Why is caching decoded bitmap images in memory more efficient during list scrolling than caching raw compressed Data? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Compressed image formats like JPEG or PNG must be decompressed into raw pixel bitmaps before they can be rendered on screen. If only raw Data is cached, the CPU must decompress the image every time a cell scrolls into view, leading to dropped frames. Storing decoded bitmap images in NSCache allows immediate GPU drawing and smooth 60 or 120 FPS scrolling."
- **Expected Score:** 100% (Met: CPU decompression cost 50%, Met: instant rendering and smooth scrolling 50%)
- **Rationale:** Accurately explains repeated CPU decompression overhead during list scrolling.

### Sample 2: Average
- **Answer:** "Decompressing PNG or JPEG files takes a lot of CPU power. If you cache the decoded UIImage, the phone does not have to decompress it again while scrolling."
- **Expected Score:** 100% (Met: decompression cost 50%, Met: scroll smoothness 50%)
- **Rationale:** Plain explanation covering both aspects.

### Sample 3: Weak
- **Answer:** "Raw data cannot be displayed in iOS apps without an internet connection."
- **Expected Score:** 0% (Not Met: CPU decompression 0%, Not Met: rendering 0%)
- **Rationale:** Incorrect assumption regarding offline rendering capability.

---

## Question 29 (Code-Write): SimpleImageCache Class

**Prompt:** Create a class SimpleImageCache with methods store(data: Data, for key: String) and retrieve(key: String) -> Data? using NSCache.

### Sample 1: Good
```swift
final class SimpleImageCache {
    private let cache = NSCache<NSString, NSData>()

    func store(data: Data, for key: String) {
        cache.setObject(data as NSData, forKey: key as NSString)
    }

    func retrieve(key: String) -> Data? {
        return cache.object(forKey: key as NSString) as Data?
    }
}
```
- **Expected Score:** 100% (Met: internal NSCache 40%, Met: store 30%, Met: retrieve 30%)
- **Rationale:** Flawless implementation with NSString bridging.

### Sample 2: Average
```swift
class SimpleImageCache {
    let cache = NSCache<NSString, NSData>()
    func store(data: Data, for key: String) {
        cache.setObject(data as NSData, forKey: key as NSString)
    }
    func retrieve(key: String) -> Data? {
        cache.object(forKey: key as NSString) as Data?
    }
}
```
- **Expected Score:** 100% (Met: internal NSCache 40%, Met: store 30%, Met: retrieve 30%)
- **Rationale:** Valid concise implementation.

### Sample 3: Weak
```swift
class SimpleImageCache {
    var dict = [String: Data]()
    func store(data: Data, for key: String) { dict[key] = data }
    func retrieve(key: String) -> Data? { dict[key] }
}
```
- **Expected Score:** 60% (Not Met: NSCache 0%, Met: store 30%, Met: retrieve 30%)
- **Rationale:** Uses Dictionary instead of NSCache as requested.

---

## Question 30 (Code-Write): Configuring Offline URLRequest

**Prompt:** Write a function createOfflineRequest(url: URL) -> URLRequest that configures a URLRequest with cache policy .returnCacheDataElseLoad and a 60 second timeout.

### Sample 1: Good
```swift
func createOfflineRequest(url: URL) -> URLRequest {
    return URLRequest(url: url, cachePolicy: .returnCacheDataElseLoad, timeoutInterval: 60)
}
```
- **Expected Score:** 100% (Met: URLRequest url 30%, Met: cache policy 40%, Met: timeout 30%)
- **Rationale:** Concise and correct initializer configuration.

### Sample 2: Average
```swift
func createOfflineRequest(url: URL) -> URLRequest {
    var req = URLRequest(url: url)
    req.cachePolicy = .returnCacheDataElseLoad
    req.timeoutInterval = 60
    return req
}
```
- **Expected Score:** 100% (Met: URLRequest url 30%, Met: cache policy 40%, Met: timeout 30%)
- **Rationale:** Correct property-based mutation.

### Sample 3: Weak
```swift
func createOfflineRequest(url: URL) -> URLRequest {
    return URLRequest(url: url)
}
```
- **Expected Score:** 30% (Met: URLRequest url 30%, Not Met: cache policy 0%, Not Met: timeout 0%)
- **Rationale:** Missing both cache policy and timeout configurations.

---

## Question 31 (Code-Write): Checking Response Freshness

**Prompt:** Write a function isResponseFresh(cached: CachedURLResponse) -> Bool that inspects Cache-Control on HTTPURLResponse and returns false if it contains "no-store", and true otherwise.

### Sample 1: Good
```swift
func isResponseFresh(cached: CachedURLResponse) -> Bool {
    guard let http = cached.response as? HTTPURLResponse,
          let control = http.value(forHTTPHeaderField: "Cache-Control") else {
        return true
    }
    return !control.contains("no-store")
}
```
- **Expected Score:** 100% (Met: cast HTTPURLResponse 40%, Met: header inspection 40%, Met: return boolean 20%)
- **Rationale:** Safely unwraps HTTPURLResponse and checks for "no-store".

### Sample 2: Average
```swift
func isResponseFresh(cached: CachedURLResponse) -> Bool {
    if let http = cached.response as? HTTPURLResponse,
       let val = http.allHeaderFields["Cache-Control"] as? String {
        return !val.contains("no-store")
    }
    return true
}
```
- **Expected Score:** 100% (Met: cast HTTPURLResponse 40%, Met: header inspection 40%, Met: return boolean 20%)
- **Rationale:** Valid header dictionary inspection.

### Sample 3: Weak
```swift
func isResponseFresh(cached: CachedURLResponse) -> Bool {
    return true
}
```
- **Expected Score:** 0% (Not Met: cast 0%, Not Met: header 0%, Not Met: condition 0%)
- **Rationale:** Always returns true without inspecting the response headers.
