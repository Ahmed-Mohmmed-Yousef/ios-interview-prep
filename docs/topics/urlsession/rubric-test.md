# Rubric Test — URLSession (Step 5)

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
| **q24** Transport errors vs HTTP status errors | **Good:** Explains transport errors are network failures throwing URLError; HTTP status errors do not throw in async data calls and require checking HTTPURLResponse.statusCode. | 100 | Yes | Pass (100%) |
| | **Average:** "Transport errors happen when offline. HTTP errors like 404 return a response that you must inspect." | 85 | Yes | Pass (85%) |
| | **Weak:** "Transport errors and HTTP errors both throw the exact same Swift error." | 0 | No | Fail (0%) |
| **q25** URLSessionConfiguration types comparison | **Good:** Describes default (disk cache), ephemeral (in-memory RAM only for private sessions), and background (delegated to system nsurlsessiond daemon across process suspension). | 100 | Yes | Pass (100%) |
| | **Average:** "Default saves cache to disk, ephemeral saves to RAM only, and background lets downloads run when closed." | 85 | Yes | Pass (85%) |
| | **Weak:** "Configurations only change the font size of downloaded web pages." | 0 | No | Fail (0%) |
| **q26** DataTask vs DownloadTask | **Good:** Explains DataTask buffers response bytes in RAM for small JSON APIs; DownloadTask streams large files directly to a disk file to prevent high memory usage. | 100 | Yes | Pass (100%) |
| | **Average:** "DataTask is for JSON in memory. DownloadTask saves big files straight to disk." | 85 | Yes | Pass (85%) |
| | **Weak:** "DataTask is for Wi-Fi and DownloadTask is for cellular networks." | 0 | No | Fail (0%) |
| **q27** Async/await advantages over completion handlers | **Good:** Explains async/await eliminates nested completion closures and weak self capture lists; integrates with structured Task cancellation. | 100 | Yes | Pass (100%) |
| | **Average:** "Async/await removes callback pyramid and handles cancellation automatically." | 80 | Yes | Pass (80%) |
| | **Weak:** "Async/await makes network packets travel faster over the internet." | 0 | No | Fail (0%) |
| **q28** SSL/TLS certificate pinning | **Good:** Defines certificate pinning as verifying server certificates against hardcoded bundled keys to block MitM attacks; implemented via URLSessionDelegate authentication challenge callback. | 100 | Yes | Pass (100%) |
| | **Average:** "Pinning checks the server certificate against a saved file using URLSessionDelegate." | 80 | Yes | Pass (80%) |
| | **Weak:** "Certificate pinning sets the app icon pin in Apple Maps." | 0 | No | Fail (0%) |
| **q29** `NetworkResponseValidator` validateStatusCode method | **Good:** Declares `struct NetworkResponseValidator` with `static func validateStatusCode(_ code: Int) -> Bool` checking `(200...299).contains(code)`. | 100 | Yes | Pass (100%) |
| | **Average:** Checks code == 200, missing other 2xx codes. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns constant true without evaluating code. | 25 | No | Fail (25%) |
| **q30** `EndpointRequestBuilder` makeRequest method | **Good:** Declares `struct EndpointRequestBuilder` with `func makeRequest(urlString: String, token: String?) -> [String: String]` adding Accept and conditional Bearer token header. | 100 | Yes | Pass (100%) |
| | **Average:** Adds Accept header, but formats Bearer token without space separator. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns empty dictionary always. | 20 | No | Fail (20%) |
| **q31** `SessionTypeSelector` requiresBackgroundDaemon method | **Good:** Declares `class SessionTypeSelector` with `func requiresBackgroundDaemon(configurationName: String) -> Bool` returning `configurationName == "background"`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements comparison with case sensitivity flaw. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns false for all configuration names. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate clear distinction between network transport failures and application-layer HTTP status codes.
2. Verify knowledge of URLSessionConfiguration variants (default, ephemeral, background).
3. Test comprehension of memory efficiency in DataTask versus DownloadTask.
4. Assess modern Swift concurrency structured cancellation benefits over completion handlers.
5. Check understanding of TLS certificate pinning and delegate authentication challenge mechanisms.
6. Validate clean Swift 6 implementations for status code ranges, header construction, and session classification.
