# Audit: methods-and-initialization (2026-11-14)

**Result: pass.** All findings from the 2026-11-10 check are fixed and re-verified against official Swift documentation (`docs.swift.org` Methods and Initialization chapters) and local Apple Swift 6.4.2 (`swift -swift-version 6`). Baseline: Swift 6.4 (local 6.4.2), Xcode 27.2, iOS 27. Bumped `topic.json` `version` to `2`, `questions.json` `version` to `2`, and aligned `lastVerified` to `2026-11-14` across all files.

| Location | Finding | Verdict | Fix applied |
|---|---|---|---|
| Lesson "The simple idea", Recap, fresh answer | Memberwise init "lists all stored properties as parameters" | Fixed (wrong) | Stated labeled parameters for stored properties that need values; defaults can be omitted and `let` constants with values are left out; classes get no memberwise init |
| `q4` option d, `q25` rubric 1 & modelAnswer | Same "all stored properties" claim | Fixed (wrong) | Updated wording to match memberwise init rules |
| Lesson first sentence | Copied "methods are functions associated with a particular type" | Fixed (copied) | Paraphrased as "A method is a function that belongs to a type" |
| Lesson junior answer | "without throwing exceptions" | Fixed (wrong) | Changed to checking the optional for `nil` instead of handling thrown errors |
| Lesson junior answer | "Swift enforces value semantics through mutating methods" | Fixed (wrong) | Explained that value-type methods cannot change properties without `mutating`, and changes write back when the method ends |
| Lesson diagram spec step 3 | Memberwise init kept "unless overridden" | Fixed (wrong) | Changed to "unless you write a custom init in the struct body" |
| `q1` option b explanation | "Structs remain value types on the stack" | Fixed (wrong) | Stated that `mutating` does not change how or where a struct is stored |
| `q10` option d | "all stored properties are optional variables" marked as wrong | Fixed (wrong) | Replaced with "Only for classes, never for structures or enumerations" |
| `q12` option c explanation | Implied only `return nil` is allowed in initializers | Fixed (wrong) | Added that any init can use plain `return` to exit early once all properties are set; aligned `lessonSection` to "The simple idea" |
| Lesson "The simple idea" / `q7a`, `q14`, `q27` | Type methods only mentioned `static` | Fixed (untaught) | Taught `class func` on classes for subclass overrides |
| Lesson / `q8` | `self` in a type method refers to the type | Fixed (untaught) | Taught in "The simple idea" |
| Lesson / `q9`, `q18` | Mutating method can assign a new instance to `self` | Fixed (untaught) | Taught in "The simple idea" and Example 1 notes |
| Lesson / `q10` | Default no-argument `init()` rule | Fixed (untaught) | Taught in "The simple idea" |
| `q5` options b & d | Untaught `convenient` keyword and fake `MemberwisePreservable` | Fixed (untaught) | Replaced with `mutating` on init and an extra `init()` inside the struct body |
| `q28` rubric & modelAnswer | Key criteria required "heap" and "pointer" | Fixed (untaught) | Replaced with reference semantics, shared instance modification even on `let`, and `mutating` for value types only |
| Lesson Trap 3 / `q22` | Class method changing `let` instance properties | Fixed (untaught) | Added explicit note in class trap (`even when the instance is stored in a let constant`) |
| `q24` | Rubric scored `let` rule without asking for it | Fixed (rules) | Added "and what kind of variable do you need to call them?" to the prompt |
| `q24`–`q28` | Prompts asked for `2–4 sentences` | Fixed (rules) | Changed to `2–5 sentences` |
| `q4`, `q6`, `q19`, `q21`, `q23` | Rated too hard for question complexity | Fixed (rules) | Re-rated to difficulty `1` |
| Bank mix & `q32`–`q33` | Only 26% easy; needed 2 hard questions | Fixed (rules) | Added `q32` (memberwise init with `let` & `var` defaults, diff 3, ans `d`) and `q33` (`mutating` `self =` on copied struct, diff 3, ans `a`); 33 live questions (39% easy, 42% medium, 18% hard) |
| `q13b`, Recap, baseline | `"objective-c"`, 7 Recap bullets, `xcode: "27"` | Fixed (rules) | Fixed `"Objective-C"`, condensed Recap to 5 bullets, updated `baseline.xcode` to `"27.2"` |

## Checks after final edit
- `node .claude/hooks/check-lesson.mjs content/topics/methods-and-initialization/lesson.mdx`: pass
- `node .claude/hooks/check-plain-english.mjs` on `lesson.mdx`, `questions.json`, `topic.json`: pass (0 warnings)
- `validate-content.sh` on `questions.json`: pass
- `node scripts/run-swift-examples.mjs` (`lesson.mdx` 2/2 passed, `questions.json` 12/12 passed)
- `node scripts/check-coverage.mjs methods-and-initialization`: pass (0 errors, 0 warnings)
- `node scripts/check-publish-gate.mjs methods-and-initialization --code`: pass
