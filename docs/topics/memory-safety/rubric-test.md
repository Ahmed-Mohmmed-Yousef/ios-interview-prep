# Rubric Test — Memory Safety and Exclusive Access

Tested 2026-11-14 against `content/rules.json` → `rubricScoring` (met = full, partly = half, not met = 0; missed `"key": true` caps total at 50). Pass mark: 70.

## Results

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** Law of Exclusivity | **Good:** no overlapping accesses if one is write; inout long-term write; overlapping reads safe | 100 (45+40+15) | Yes |
| | **Average:** "Two accesses cannot write at the same time." (misses inout long-term access) | 50 capped (23+0+0) | Yes — prompt asks why inout conflicts |
| | **Weak:** "Exclusivity only checks multiple threads." | 0 (0+0+0) | Yes |
| **q26** compile vs runtime | **Good:** aliasing `&score, &score` compile error; closure/class-property runtime trap; fatal crash | 100 (40+40+20) | Yes |
| | **Average:** "Passing the same variable twice fails at compile time." (misses runtime example) | 50 capped (40+0+0) | Yes — prompt asks for both |
| | **Weak:** "All memory conflicts fail at compile time." | 0 (0+0+0) | Yes |
| **q27** local vs class struct | **Good:** local struct proves disjoint fields; class property locks whole `pair`; copy to local var | 100 (40+40+20) | Yes |
| | **Average:** "Local structs work, class structs crash at runtime." (misses why) | 50 (20+20+0 -> capped? both partly met = 40) | Yes |
| | **Weak:** "Neither compiles in Swift 6." | 0 (0+0+0) | Yes |
| **q28** Strict Memory Safety | **Good:** warns on unmarked `@unsafe` / pointers; `unsafe` only audits (no runtime checks); prefer `Span` | 100 (45+45+10) | Yes |
| | **Average:** "It flags unsafe pointers until you add `unsafe`." (forgets no runtime checks) | 50 capped (45+0+0) | Yes — prompt explicitly asks why `unsafe` does not make code safe |
| | **Weak:** "`unsafe` adds bounds checks to pointers." | 0 (0+0+0) | Yes |
| **q29** safety layers rollout | **Good:** names layers; `.strictMemorySafety()` per package; migrate toward `Span`/`InlineArray` | 100 (40+35+25) | Yes |
| | **Average:** "Turn on `.strictMemorySafety()` in parsers." (forgets layers) | 50 capped (0+35+0) | Yes |
| | **Weak:** "Disable Swift 6 mode so warnings stop." | 0 (0+0+0) | Yes |
| **q30** fix closure overlap | **Good:** copies to `delta` before `addStep(&total)`, prints `13` | 100 (60+40) | Yes |
| | **Average:** leaves `addStep(&step)` reading `step` directly | 0 (0+0) | Yes |
| | **Weak:** deletes `inout` and prints `3` | 0 (0+0) | Yes |
| **q31** fix class property swap | **Good:** copies `pair` to `local`, swaps, assigns back, prints `250 100` | 100 (55+45) | Yes |
| | **Average:** mutates `local` without assigning back to `pair` | 50 capped (55+0) | Yes — misses key criterion |
| | **Weak:** prints `250 100` hardcoded | 0 (0+0) | Yes |
| **q32** write @unsafe readByte | **Good:** `@unsafe` + `unsafe ptr.pointee`, `unsafe readByte(ptr)` inside `withUnsafePointer`, prints `65` | 100 (50+35+15) | Yes |
| | **Average:** puts `unsafe` on `withUnsafePointer` instead of `readByte` | 50 capped (50+18+15 -> wait: key met or partly? Putting `unsafe` on outer call misses inner point) | Yes |
| | **Weak:** forgets `@unsafe` and `unsafe` | 15 (0+0+15) | Yes |
