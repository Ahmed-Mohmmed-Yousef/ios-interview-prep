# Rubric Test — HTTP and REST Basics (Step 5)

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
| **q24** 401 Unauthorized vs 403 Forbidden | **Good:** Explains 401 means unauthenticated (missing or expired token) requiring re-login or token refresh; 403 means authenticated but lacking permission, requiring an access denied notice. | 100 | Yes | Pass (100%) |
| | **Average:** "401 means you are not logged in. 403 means you do not have permission to view the page." | 85 | Yes | Pass (85%) |
| | **Weak:** "401 is a client error and 403 is a server timeout." | 0 | No | Fail (0%) |
| **q25** PUT vs PATCH comparison | **Good:** Explains PUT is an idempotent method that replaces the entire resource; PATCH applies partial updates to specific fields without erasing omitted data. | 100 | Yes | Pass (100%) |
| | **Average:** "PUT replaces the whole object. PATCH only updates some fields." | 85 | Yes | Pass (85%) |
| | **Weak:** "PUT is read-only and PATCH is write-only." | 0 | No | Fail (0%) |
| **q26** Idempotence and DELETE behavior | **Good:** Defines idempotence as producing identical server state on repeated requests; explains DELETE is idempotent because the resource remains deleted regardless of whether subsequent calls return 404. | 100 | Yes | Pass (100%) |
| | **Average:** "Idempotent means repeating the call gives the same result. The item stays deleted even if you call it again." | 80 | Yes | Pass (80%) |
| | **Weak:** "DELETE is not idempotent because the status changes from 200 to 404." | 25 | No | Fail (25%) |
| **q27** Statelessness in REST and mobile benefits | **Good:** Defines statelessness as every request containing all necessary context without server session storage; describes mobile benefits including horizontal server scalability and connection resilience. | 100 | Yes | Pass (100%) |
| | **Average:** "Stateless means no session on the server. It helps mobile apps when switching networks." | 75 | Yes | Pass (75%) |
| | **Weak:** "Stateless means the app cannot store any data on the phone." | 0 | No | Fail (0%) |
| **q28** Masking errors in HTTP 200 OK | **Good:** Explains returning 200 for errors breaks automated networking error pipelines and causes proxies and client caches to store error payloads as valid data. | 100 | Yes | Pass (100%) |
| | **Average:** "Returning 200 for errors confuses network error handlers and ruins caching." | 80 | Yes | Pass (80%) |
| | **Weak:** "Returning 200 for errors is recommended for security." | 0 | No | Fail (0%) |
| **q29** `HTTPResponseEvaluator` isSuccess method | **Good:** Declares `struct HTTPResponseEvaluator` with `static func isSuccess(statusCode: Int) -> Bool` checking `(200...299).contains(statusCode)`. | 100 | Yes | Pass (100%) |
| | **Average:** Checks status == 200 only, missing other 2xx success codes. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns constant true without evaluating the parameter. | 25 | No | Fail (25%) |
| **q30** `HTTPMethodClassifier` isIdempotent method | **Good:** Declares `struct HTTPMethodClassifier` with `func isIdempotent(method: String) -> Bool` returning true for GET, PUT, and DELETE. | 100 | Yes | Pass (100%) |
| | **Average:** Returns true for GET and PUT, but omits DELETE. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns false for all methods. | 20 | No | Fail (20%) |
| **q31** `StatusCodeRouter` handle method | **Good:** Declares `class StatusCodeRouter` with `func handle(code: Int) -> String` mapping 401 to refresh_token, 403 to access_denied, 404 to not_found, and default to default_handler. | 100 | Yes | Pass (100%) |
| | **Average:** Maps 401 and 404, but misses 403 or default handler. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns empty string for all status codes. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate clear technical distinction between authentication (401) and authorization (403).
2. Assess comprehension of complete resource replacement (PUT) versus partial updates (PATCH).
3. Test understanding of server side-effect idempotence versus HTTP response code variations.
4. Verify benefits of REST statelessness for distributed mobile network resilience.
5. Identify anti-patterns of masking errors behind 200 OK responses and impact on caching.
6. Validate clean Swift 6 implementations for response evaluation, method classification, and status routing.
