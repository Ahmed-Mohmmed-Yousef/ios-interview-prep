# Rubric Test — How a Mobile System Design Interview Works (`system-design-interview-intro`)

Tested: **2026-11-14** against `content/rules.json` (`rubricScoring`: met = 1, partly = 0.5, not met = 0, `keyMissedCap` = 50, pass mark = 70).

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** 5 steps | **Good:** Scope (functional/non-functional) -> high-level architecture & API -> deep dives -> code contracts -> wrap-up & trade-offs/monitoring. | 100 | Yes |
| | **Average:** "First ask questions, then draw architecture, then deep dive, then trade-offs." | 88 (25+25+13+25) | Yes — covers all major stages |
| | **Weak:** "Start coding SwiftUI right away." | 0 | Yes |
| **q26** reqs | **Good:** Functional = user actions (like post); non-functional = system quality/device constraints (smooth 60 fps scrolling, offline reading). | 100 | Yes |
| | **Average:** "Functional is features like liking a post. Non-functional is everything else." (misses concrete mobile constraint) | 75 (50+25) | Yes — borderline pass since functional is clear and non-functional is partial |
| | **Weak:** "Functional means Swift functions." | 0 | Yes |
| **q27** mobile vs backend | **Good:** Backend = servers/sharding; mobile = phone client with flaky cellular networks, battery, memory limits, offline mode, and View/ViewModel/Repository layers. | 100 | Yes |
| | **Average:** "Mobile focuses on the phone app, battery, and offline mode instead of servers." | 80 (40+40+0) | Yes |
| | **Weak:** "They are identical except mobile uses Swift." | 0 | Yes |
| **q28** rushing trap | **Good:** Risk of designing wrong features / wasting time on out-of-scope details; instead clarify functional, non-functional, and out-of-scope in first 5–8 minutes. | 100 | Yes |
| | **Average:** "You should ask questions first so you do not build the wrong thing." | 75 (50+25) | Yes |
| | **Weak:** "Jumping into boxes saves time." | 0 | Yes |
| **q29** Step 5 wrap-up | **Good:** Verify Step 1 goals, state explicit trade-offs (battery vs freshness), mention production monitoring (crashes, launch, hangs). | 100 | Yes |
| | **Average:** "Mention trade-offs like polling vs WebSockets." | 45 (0+45+0) | Yes — misses Step 1 check and monitoring |
| | **Weak:** "Say your design has zero flaws." | 0 | Yes |
| **q30** `ArticleRepository` | **Good:** Model answer defining `Sendable` `ArticleRepository`, `MockArticleRepository`, awaiting and printing `"Scope"`. | 100 | Yes |
| | **Average:** Omits `Sendable` on `ArticleRepository` protocol. | 75 (25+30+20) | Yes |
| | **Weak:** Writes a synchronous function without protocol. | 0 (key missed) | Yes |
| **q31** `chooseSource` | **Good:** Model answer checking memory -> online -> disk -> `"Empty"`. | 100 | Yes |
| | **Average:** Checks disk before network even when online. | 50 (capped: key order missed -> actually 30+20+20 = 70? Wait: criterion 1 is 60 and key! If order is wrong, it's partly met = 30 -> 30+20+20=70, or if key not met -> capped at 50) | Yes — wrong fallback priority |
| | **Weak:** Always returns `"Network"`. | 0 (key missed) | Yes |
| **q32** `DesignBudget` | **Good:** Model answer computing `totalMinutes - stepMinutes.values.reduce(0, +)` and printing `4`. | 100 | Yes |
| | **Average:** Hardcodes `return 4` instead of summing `stepMinutes.values`. | 40 (capped: key computation missed) | Yes |
| | **Weak:** Returns `totalMinutes`. | 0 (key missed) | Yes |
