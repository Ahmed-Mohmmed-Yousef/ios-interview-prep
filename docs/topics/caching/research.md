# Topic Research: Caching

**Topic ID:** `caching`  
**Level:** Mid  
**Prerequisites:** `urlsession`  
**Date Researched:** 2026-11-10  
**Target Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Official Documentation & Authoritative Sources

1. **URLCache (Foundation Documentation)**  
   URL: https://developer.apple.com/documentation/foundation/urlcache  
   *Summary:* An object that maps `URLRequest` instances to `CachedURLResponse` objects. Provides in-memory and on-disk composite caching for URL requests. Configured with `memoryCapacity` and `diskCapacity`.

2. **Accessing Cached Data (Foundation Documentation)**  
   URL: https://developer.apple.com/documentation/foundation/accessing-cached-data  
   *Summary:* Explains how `URLSession` uses `URLCache.shared` by default or custom session caches. Details interactions between HTTP headers (`Cache-Control`, `ETag`, `Last-Modified`) and client cache policies.

3. **NSCache (Foundation Documentation)**  
   URL: https://developer.apple.com/documentation/foundation/nscache  
   *Summary:* A mutable collection that stores key-value pairs with automatic eviction policies under system memory pressure. Commonly used for transient in-memory objects like decoded images and view models. Thread-safe by default.

4. **URLRequest.CachePolicy (Foundation Documentation)**  
   URL: https://developer.apple.com/documentation/foundation/urlrequest/cachepolicy  
   *Summary:* Enum determining how request instances interact with local caches: `.useProtocolCachePolicy`, `.reloadIgnoringLocalCacheData`, `.returnCacheDataElseLoad`, and `.returnCacheDataDontLoad`.

---

## 2. Core Technical Concepts

### A. Two Levels of Caching in iOS
- **Network Response Caching (`URLCache`):**
  - Caches raw server responses (HTTP headers and raw `Data` bytes).
  - Uses composite tiered storage: fast RAM memory capacity plus persistent disk capacity.
  - Obeys HTTP cache headers (`Cache-Control: max-age=...`, `ETag`, `If-None-Match`, 304 Not Modified).
- **In-Memory Object Caching (`NSCache`):**
  - Caches decoded in-memory objects (e.g., `UIImage`, parsed data models).
  - Automatically purges cached items when the system experiences memory pressure or exceeds `countLimit` or `totalCostLimit`.
  - Built-in thread safety: does not require manual lock synchronization for reads or writes.

### B. URLRequest Cache Policies
- **`.useProtocolCachePolicy` (Default):** Honors HTTP response headers. If fresh, serves from cache; if expired or validation needed, contacts server.
- **`.reloadIgnoringLocalCacheData`:** Bypasses local cache completely; forces a fresh network round-trip.
- **`.returnCacheDataElseLoad`:** Uses cached data if present (even if expired); only hits network if no cache entry exists. Useful for fast offline-first loading.
- **`.returnCacheDataDontLoad`:** Offline-only mode. Never makes network requests; fails if data is not already in cache.

### C. HTTP Validation & ETag
- **`ETag` / `If-None-Match`:** The server sends an entity tag hash. On subsequent requests, the client sends `If-None-Match: "<hash>"`. If unchanged, the server returns HTTP `304 Not Modified`, allowing the client to reuse cached payload bytes with minimal bandwidth.

---

## 3. Common Interview Questions & Traps

1. **What is the difference between `NSCache` and `URLCache`?**  
   `URLCache` caches raw HTTP network responses on disk and in memory according to HTTP protocol rules. `NSCache` is an in-memory key-value cache for decoded runtime objects that automatically evicts items under low memory warnings.
2. **Why should you cache decoded `UIImage` instances in `NSCache` instead of raw `Data`?**  
   Decompressing image `Data` (e.g. JPEG/PNG) into bitmap memory is CPU-intensive. Storing decoded `UIImage` in `NSCache` avoids repeated decompression hitching during list scrolling.
3. **What is the difference between `.reloadIgnoringLocalCacheData` and `URLCache.shared.removeAllCachedResponses()`?**  
   The cache policy ignores the cache for that individual request without deleting cached data needed by other requests or offline features. Clearing the cache wipes all stored responses across the entire cache container.
4. **Why does `Dictionary` make a poor in-memory image cache?**  
   A standard Swift `Dictionary` does not auto-purge on memory warnings, which can trigger out-of-memory (OOM) application terminations. `Dictionary` is also not thread-safe.
