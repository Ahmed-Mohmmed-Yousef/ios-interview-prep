# Research: HTTP and REST Basics

## 1. Core Concepts & Technical Facts

### The HTTP Request-Response Cycle
- **HTTP (Hypertext Transfer Protocol)** is an application-layer client-server protocol governed by modern RFC 9110 (superseding RFC 7231 / RFC 2616).
- An **HTTP Request** consists of:
  1. **HTTP Method / Verb**: The action to perform.
  2. **Uniform Resource Identifier (URI / URL)**: Path to the target resource, including optional query parameters (e.g., `https://api.example.com/v1/articles?limit=20&page=2`).
  3. **Headers**: Key-value pairs providing metadata (`Content-Type: application/json`, `Accept: application/json`, `Authorization: Bearer <token>`, `Cache-Control: no-cache`).
  4. **Body (Payload)**: Data sent to the server (JSON, form data, or binary assets). GET and HEAD requests do not have bodies.
- An **HTTP Response** consists of:
  1. **Status Code & Reason Phrase**: 3-digit code indicating outcome (e.g., `200 OK`, `404 Not Found`).
  2. **Response Headers**: Metadata describing response (`Content-Type`, `Content-Length`, `ETag`, `Date`).
  3. **Response Body**: The requested representation (JSON, images, HTML, or empty).

### HTTP Methods: Safety and Idempotence
- **Safe Methods**: Calling the method does not mutate server state (read-only).
  - `GET`, `HEAD`, `OPTIONS`.
- **Idempotent Methods**: Executing the request $N > 1$ times produces the identical server state as executing it once ($N = 1$).
  - `GET`, `HEAD`, `PUT`, `DELETE`.
  - Calling `DELETE /users/42` five times leaves user 42 deleted; the state does not change on subsequent calls (even if subsequent HTTP status returns `404 Not Found` vs initial `204 No Content`).
- **Non-Idempotent Methods**:
  - `POST`: Submitting `POST /orders` five times creates five distinct orders.
  - `PATCH`: Modifies partial fields; can be non-idempotent if using relative operations (e.g., appending items).
- **PUT vs PATCH**:
  - `PUT`: Replaces the entire resource. Missing fields are reset or overwritten.
  - `PATCH`: Modifies specific fields without touching unspecified properties.

### HTTP Status Code Families
- **1xx (Informational)**: Request received, continuing process (e.g., `100 Continue`).
- **2xx (Success)**:
  - `200 OK`: Standard success response.
  - `201 Created`: Resource successfully created (often includes `Location` header).
  - `204 No Content`: Action succeeded, but no body returned (common for `DELETE` or empty updates).
- **3xx (Redirection)**:
  - `301 Moved Permanently`: Resource has a permanent new URL.
  - `304 Not Modified`: Cached representation is still fresh (conditional requests with `If-None-Match`).
- **4xx (Client Errors)**:
  - `400 Bad Request`: Malformed syntax, invalid JSON, or unparseable parameters.
  - `401 Unauthorized`: Missing or invalid authentication credentials (user is unauthenticated).
  - `403 Forbidden`: Authenticated identity lacks permission to access the resource (authorization failure).
  - `404 Not Found`: Target resource does not exist.
  - `409 Conflict`: Request conflicts with current server state (e.g., duplicate unique key).
  - `429 Too Many Requests`: Client exceeded rate limits (often paired with `Retry-After` header).
- **5xx (Server Errors)**:
  - `500 Internal Server Error`: Generic unhandled backend failure.
  - `502 Bad Gateway`: Proxy/gateway received invalid response from upstream server.
  - `503 Service Unavailable`: Server temporarily overloaded or down for maintenance.
  - `504 Gateway Timeout`: Proxy did not receive a timely response from upstream server.

### REST Architectural Constraints
- **Roy Fielding's REST (Representational State Transfer)**:
  1. **Stateless**: The server stores no client context between requests. Each request contains complete authentication and operational state.
  2. **Resource-Oriented URIs**: URIs use nouns, not verbs:
     - Correct: `GET /articles`, `POST /articles`, `GET /articles/12`, `DELETE /articles/12`.
     - Anti-pattern: `GET /getArticles`, `POST /createNewArticle`, `POST /deleteArticle?id=12`.
  3. **Appropriate Status Codes**: Avoid "200 OK with Error Body" anti-patterns (e.g. HTTP 200 with `{"status": "error", "code": 401}`).

---

## 2. Common Misconceptions & Interview Traps

1. **"Confusing 401 Unauthorized with 403 Forbidden"**:
   - *Trap*: Using 401 when a logged-in user lacks admin privileges.
   - *Reality*: `401 Unauthorized` means *unauthenticated* (missing or expired token). `403 Forbidden` means *unauthorized* (the server knows who you are, but you are not allowed to touch this resource).
2. **"Assuming DELETE is not idempotent because subsequent calls return 404"**:
   - *Trap*: Believing `DELETE` is non-idempotent because the first call returns 200/204 and the second returns 404.
   - *Reality*: Idempotence applies to **server side-effects**, not response status codes. The state of the server (user 42 does not exist) is unchanged after the 2nd, 3rd, or 100th call.
3. **"PUT vs PATCH confusion"**:
   - *Trap*: Sending partial fields with `PUT` and expecting existing fields to be preserved.
   - *Reality*: `PUT` replaces the whole entity; omitted fields may be erased. `PATCH` is for partial delta updates.
4. **"Returning HTTP 200 OK for business errors"**:
   - *Trap*: Designing APIs that return `200 OK` with `{ "success": false, "message": "Invalid password" }`.
   - *Reality*: Violates HTTP semantics; breaks client caching, network retry middleware, and standard error pipelines.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "HTTP is the protocol our apps use to communicate with servers. A request has a method, a URL, headers, and an optional body. The server replies with a status code, headers, and data. In REST, we use nouns for URLs and HTTP methods for actions: GET to read, POST to create, PUT/PATCH to update, and DELETE to remove. Status codes in the 200s mean success, 400s mean client errors, and 500s mean server errors."
- **Junior**:
  - "RESTful design relies on stateless requests and HTTP semantics. Safe methods like GET do not modify data, while idempotent methods like PUT and DELETE produce identical server side-effects regardless of how many times they run. We distinguish between 401 Unauthorized (unauthenticated) and 403 Forbidden (authenticated but lacking permission). We use PUT for full resource replacement and PATCH for partial updates, and we inspect standard HTTP status codes rather than masking errors inside 200 OK payloads."
- **Senior**:
  - "REST architecture enforces stateless client-server separation where resources are represented via standard MIME types and manipulated using uniform interfaces. We enforce idempotence semantics on mutations to allow safe network retries over flaky cellular connections, leveraging headers like `Idempotency-Key` for POST requests. We handle caching via `Cache-Control` and conditional requests using `ETag` and `If-None-Match` for 304 responses, while implementing exponential backoff with jitter on 429 and 503 status codes."
