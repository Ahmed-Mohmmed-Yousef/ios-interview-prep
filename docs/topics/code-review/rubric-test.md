# Rubric Tests: Code Review

## Question 24 (written): Primary Purpose of Code Review

Prompt: What is the primary purpose of code review according to Google Engineering Practices, and how should reviewers balance perfection with progress? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> According to Google Engineering Practices, the primary purpose of code review is to ensure that the overall code health of the codebase is improving over time. Reviewers should not block changes while waiting for unattainable perfection. If a pull request improves the code and conforms to team standards, the reviewer should approve it, encouraging steady forward momentum.
- Criterion 1 (ensuring codebase health improves over time): 50/50 (Met)
- Criterion 2 (approving improving code without waiting for perfection): 50/50 (Met)

### Average Answer (Score: 50/100)
> The main goal of code review is to improve code health over time so the project does not degrade into technical debt.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Omits standard of approval regarding perfection versus progress)

### Weak Answer (Score: 0/100)
> Code review is designed to prove that the lead developer knows more than junior engineers.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 25 (written): Automating Style and Formatting

Prompt: Why should teams delegate formatting and style enforcement to automated tools rather than debating them during code reviews? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Teams should delegate formatting and style enforcement to automated linters like SwiftLint because tools enforce consistency deterministically without subjective human bias or emotional friction. Automating these checks during continuous integration frees human reviewers to focus on architecture, business logic, memory safety, and test coverage. This keeps code reviews high-value and prevents bike-shedding over whitespace.
- Criterion 1 (tools enforce consistency deterministically without human bias): 50/50 (Met)
- Criterion 2 (frees human reviewers for architecture, logic, and tests): 50/50 (Met)

### Average Answer (Score: 50/100)
> Automated tools like SwiftLint should format the code so people do not waste time arguing about spacing.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Lacks discussion of redirecting human focus to architecture and test coverage)

### Weak Answer (Score: 0/100)
> Linters are required because the Apple compiler will refuse to build Swift code with spaces.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 26 (written): iOS Memory and Concurrency Pitfalls

Prompt: What specific memory and concurrency issues should iOS engineers check for when reviewing Swift pull requests? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> When reviewing Swift pull requests, iOS engineers should inspect escaping closures to ensure `[weak self]` is used wherever long-lived references could create retain cycles. In concurrency, reviewers should verify that mutable shared state is protected by actors or `@MainActor` to prevent data races. They should also confirm that Swift 6 Sendable requirements are respected when passing values across task boundaries.
- Criterion 1 (checking closures for strong reference cycles and weak self): 50/50 (Met)
- Criterion 2 (checking data races, Swift 6 Sendable, and MainActor isolation): 50/50 (Met)

### Average Answer (Score: 50/100)
> Reviewers should make sure that closures use weak self so the app does not leak memory.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Omits concurrency checks like actors, Sendable, or MainActor)

### Weak Answer (Score: 0/100)
> Reviewers check that every variable is declared as public so background threads can access it.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 27 (written): Blocking Comments vs Nitpicks

Prompt: Explain why differentiating between blocking comments and non-blocking nitpicks is important during code reviews. Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Differentiating between blocking comments and non-blocking nitpicks makes reviewer intent explicit. Labeling minor cosmetic suggestions with tags like `nit:` or `suggestion:` signals that the author can choose to adopt or defer them without holding up the merge. This practice prevents subjective opinions from stalling development velocity while ensuring critical architectural defects are resolved before release.
- Criterion 1 (explicit labeling indicates optional suggestions vs mandatory fixes): 50/50 (Met)
- Criterion 2 (prevents minor preferences from stalling merges and hurting velocity): 50/50 (Met)

### Average Answer (Score: 50/100)
> Using 'nit:' tells the author that a suggestion is just an opinion and does not block approval.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Misses impact on team velocity and separating critical defects)

### Weak Answer (Score: 0/100)
> Nitpicks are comments that automatically delete the author's branch after 24 hours.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 28 (written): Pull Request Sizing and Decomposition

Prompt: Why is pull request size critical to review quality, and how can engineers break down large features? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Pull request size is critical because diffs under 400 lines prevent reviewer cognitive fatigue, leading to deeper inspection and higher defect detection rates. Engineers can break down large features by creating incremental stacked pull requests or separating changes by architectural layer, such as data models, networking, and UI. Each sub-PR should compile cleanly and include its own unit tests, allowing safe, manageable review steps.
- Criterion 1 (small PRs prevent fatigue and increase defect detection): 50/50 (Met)
- Criterion 2 (breaking into stacked PRs or decoupled architectural layers): 50/50 (Met)

### Average Answer (Score: 50/100)
> Big pull requests are bad because reviewers get tired and miss bugs. You should make smaller pull requests instead.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Does not explain how to break features down into layers or stacked branches)

### Weak Answer (Score: 0/100)
> Large pull requests are rejected by git servers because repositories have a 50-line upload limit.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 29 (code-write): ReviewComment Struct

Prompt: Implement a struct `ReviewComment` with properties `let label: String` and `let text: String`. Add a computed property `var isBlocking: Bool` that returns `true` if `label == "BLOCKING"`. Instantiate with label 'BLOCKING' and text 'Retain cycle detected', and print 'Blocking: true'.

### Good Answer (Score: 100/100)
```swift
struct ReviewComment {
    let label: String
    let text: String

    var isBlocking: Bool {
        label == "BLOCKING"
    }
}

let comment = ReviewComment(label: "BLOCKING", text: "Retain cycle detected")
print("Blocking: \(comment.isBlocking)")
```
- Criterion 1 (struct with label and text): 30/30 (Met)
- Criterion 2 (isBlocking computed property): 40/40 (Met)
- Criterion 3 (instantiates and prints 'Blocking: true'): 30/30 (Met)

### Average Answer (Score: 70/100)
```swift
struct ReviewComment {
    let label: String
    let text: String

    var isBlocking: Bool {
        label == "BLOCKING"
    }
}

let comment = ReviewComment(label: "BLOCKING", text: "Retain cycle detected")
print(comment.isBlocking)
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 40/40 (Met)
- Criterion 3: 0/30 (Output missing 'Blocking: ' prefix)

### Weak Answer (Score: 0/100)
```swift
let comment = "Blocking: true"
print(comment)
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30

---

## Question 30 (code-write): PullRequest Class

Prompt: Create a `PullRequest` class that stores `let title: String`, `let lineCount: Int`, and `var isApproved: Bool = false`. Provide a method `func approve()` that sets `isApproved = true`. Instantiate a pull request with title 'Fix auth crash' and 120 lines, call `approve()`, and print 'PR Fix auth crash approved: true'.

### Good Answer (Score: 100/100)
```swift
class PullRequest {
    let title: String
    let lineCount: Int
    var isApproved: Bool = false

    init(title: String, lineCount: Int) {
        self.title = title
        self.lineCount = lineCount
    }

    func approve() {
        isApproved = true
    }
}

let pr = PullRequest(title: "Fix auth crash", lineCount: 120)
pr.approve()
print("PR \(pr.title) approved: \(pr.isApproved)")
```
- Criterion 1 (class with title, lineCount, isApproved): 30/30 (Met)
- Criterion 2 (approve method sets isApproved): 40/40 (Met)
- Criterion 3 (instantiates, calls approve, prints output): 30/30 (Met)

### Average Answer (Score: 60/100)
```swift
class PullRequest {
    let title: String
    let lineCount: Int
    var isApproved: Bool = false

    init(title: String, lineCount: Int) {
        self.title = title
        self.lineCount = lineCount
    }

    func approve() {
        isApproved = true
    }
}

let pr = PullRequest(title: "Fix auth crash", lineCount: 120)
print("PR \(pr.title) approved: \(pr.isApproved)")
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 30/30 (Met)
- Criterion 3: 0/30 (Forgot to call approve(), printing false instead of true)

### Weak Answer (Score: 0/100)
```swift
print("PR Fix auth crash approved: true")
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30

---

## Question 31 (code-write): ReviewSummary Struct

Prompt: Implement a `ReviewSummary` struct that holds an array of comment strings `var comments: [String] = []`. Provide `mutating func addComment(tag: String, message: String)` that appends "[\(tag)] \(message)". Instantiate it, add a comment with tag 'NIT' and message 'Use let here', and print 'Comments count: 1'.

### Good Answer (Score: 100/100)
```swift
struct ReviewSummary {
    var comments: [String] = []

    mutating func addComment(tag: String, message: String) {
        comments.append("[\(tag)] \(message)")
    }
}

var summary = ReviewSummary()
summary.addComment(tag: "NIT", message: "Use let here")
print("Comments count: \(summary.comments.count)")
```
- Criterion 1 (struct with comments array): 30/30 (Met)
- Criterion 2 (mutating addComment formats and appends): 40/40 (Met)
- Criterion 3 (instantiates, calls method, prints 'Comments count: 1'): 30/30 (Met)

### Average Answer (Score: 60/100)
```swift
struct ReviewSummary {
    var comments: [String] = []

    mutating func addComment(tag: String, message: String) {
        comments.append(message)
    }
}

var summary = ReviewSummary()
summary.addComment(tag: "NIT", message: "Use let here")
print("Comments count: \(summary.comments.count)")
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 0/40 (Omits tag formatting)
- Criterion 3: 30/30 (Prints correct count)

### Weak Answer (Score: 0/100)
```swift
let comments = ["Use let here"]
print("Comments count: 1")
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30
