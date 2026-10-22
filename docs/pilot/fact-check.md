# Pilot Fact-Check — Structs vs Classes (Step 2.6)

Run 2026-10-22 with `/content-fact-checker`. The 4 key findings were confirmed again with the Swift 6.4 compiler before fixing.

## What passed at once

- All lesson examples and all code questions compile in Swift 6 mode and print what we show (4 + 12 checks).
- The baseline is current: Xcode 27.1 ships Swift 6.4; Xcode 27.2 is still an RC.
- All source links load. Nothing was copied from Apple's documentation.
- The bank meets the rules: 31 questions, the right mix, correct answers spread across a–d, and rubrics that add up to 100.

## What was wrong and how it was fixed

| Finding | Verdict | Fix | Confirmed by |
|---|---|---|---|
| "Classes must be final and immutable to be Sendable" | WRONG (too absolute) | Also allowed: isolation to an actor such as `@MainActor` | [Sendable docs](https://developer.apple.com/documentation/swift/sendable) |
| New Xcode projects put code on the main actor by default, so plain classes are `Sendable` there | OUTDATED (missing) | The version note explains both cases. q14 now says it is about a Swift package | [WWDC25 268](https://developer.apple.com/videos/play/wwdc2025/268/), [SE-0466](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0466-control-default-actor-isolation.md); compiler: with `-default-isolation MainActor`, a plain class passes the `Sendable` check |
| "Every struct gets a memberwise initializer" | WRONG (small) | "...unless you write your own `init` inside the struct" (table and q11) | [Initialization](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization); compiler error confirmed |
| "A struct cannot have `deinit`" | OUTDATED (small) | "No (except noncopyable structs, an advanced topic)" | [SE-0390](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0390-noncopyable-structs-and-enums.md); compiler: a `~Copyable` struct runs its `deinit` |
| "Older Apple frameworks that expect a class" | Wording | "Objective-C frameworks that expect a class" | [Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes) |
| q15 tested copy-on-write, but it was taught only in "Go deeper" | Rule issue | New trap "Copying a big array is slow" in the main lesson; "Go deeper" keeps only the stack details (user decision) | `.claude/rules/questions.md` |
| Unexplained terms: stack, heap, escaping closure, value semantics, "easier to reason about", "almost for free" | HARD-ENGLISH | Short definitions added; simpler words | `.claude/rules/plain-english.md` |
| The right answer in q13 was 3 times longer than the others | Quality | Options rebalanced to similar lengths | `.claude/rules/questions.md` |
| q26 and q27 rubrics scored things the prompt did not ask for | Rubric | Prompts now ask for them | `.claude/rules/questions.md` |
| q9 "Large structs are fine" | Too simple | Replaced with "Copy or share decides it" | Swift Optimization Tips |
| q1 and q4 explanations joined two ideas with ";" | HARD-ENGLISH | Split into two sentences | `.claude/rules/plain-english.md` |

## After the fixes

- 4 lesson examples and 12 question checks pass with Swift 6.4.
- The lesson and question hooks pass, including the simple-English check.
- The lesson now cites 10 official sources.
- The question bank is at version 2. The topic stays at version 1, because it is still a draft that no learner has seen.

## Lessons for the next topics

1. **Check what the default Xcode project settings change.** New defaults, such as main-actor isolation, can make a "rule" true in one place and false in another.
2. **Prompts must ask for everything the rubric scores.**
3. **Tested ideas must be in the main lesson,** not only in "Go deeper" or in one sentence of a sample answer.
4. **Keep option lengths similar,** so the longest option is not always the right one.
