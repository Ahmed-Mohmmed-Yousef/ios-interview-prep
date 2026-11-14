# Rubric Test — InlineArray and Span

Tested 2026-11-14 against `content/rules.json` → `rubricScoring` (met = full, partly = half, not met = 0; missed `"key": true` caps total at 50). Pass mark: 70.

## Results

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** InlineArray vs Array | **Good:** fixed inline without heap/ARC; Array heap + CoW + resizable; InlineArray eager copy | 100 (40+30+30) | Yes |
| | **Average:** "InlineArray has fixed size and no heap allocation." (forgets eager copying) | 50 capped (40+0+0) | Yes — misses key copying distinction |
| | **Weak:** "InlineArray is a faster class." | 0 (0+0+0) | Yes |
| **q26** Span safety | **Good:** spatial bounds check; temporal ~Escapable lifetime check; non-owning zero heap | 100 (40+40+20) | Yes |
| | **Average:** "Span checks bounds so it does not overflow." (forgets ~Escapable lifetime) | 50 capped (40+0+0) | Yes — misses key temporal safety |
| | **Weak:** "Span copies arrays onto the stack." | 0 (0+0+0) | Yes |
| **q27** Span family roles | **Good:** Span read-only + MutableSpan exclusive write; RawSpan bytes; OutputSpan init | 100 (40+30+30) | Yes |
| | **Average:** "Span reads and MutableSpan writes." (misses OutputSpan) | 50 capped (40+0+0) | Yes — prompt asks for all four |
| | **Weak:** "They are all unsafe pointers." | 0 (0+0+0) | Yes |
| **q28** passing large InlineArray | **Good:** eager copying risk; pass .span or borrowing | 100 (50+50) | Yes |
| | **Average:** "Copying it is slow, so use .span." (clear and accurate) | 100 (50+50) | Yes |
| | **Weak:** "It uses copy-on-write so passing by value is free." | 0 (0+0) | Yes |
| **q29** choosing Array/InlineArray/Span | **Good:** Array default; InlineArray for profiled fixed buffers; Span at internal APIs | 100 (35+35+30) | Yes |
| | **Average:** "Use Array normally and InlineArray for fixed-size performance." (no Span) | 70 (35+35+0) | Yes |
| | **Weak:** "Replace every Array with InlineArray." | 0 (0+0+0) | Yes |
| **q30** write InlineArray sum | **Good:** `[3 of Int]`, updates `vec[1] = 10`, prints `18` | 100 (40+40+20) | Yes |
| | **Average:** uses `Array` `[Int]` instead of `[3 of Int]` | 50 capped (0+40+20) | Yes — misses key InlineArray type |
| | **Weak:** forgets to mutate `vec[1]` | 40 (40+0+0) | Yes |
| **q31** write maxInSpan | **Good:** `Span<Int>`, handles empty -> nil, loops `span.indices`, prints `19` | 100 (45+35+20) | Yes |
| | **Average:** skips empty check (`span[0]` crashes on empty) | 50 capped (22+35+20) | Yes — misses key safety check |
| | **Weak:** uses `[Int]` parameter instead of `Span<Int>` | 35 (0+35+0) | Yes |
| **q32** write zeroOut MutableSpan | **Good:** `inout MutableSpan<Int>`, `do` block around `mutableSpan`, prints `0 0` | 100 (50+30+20) | Yes |
| | **Average:** forgets `do` block (exclusivity error when reading `buffer` if `view` stayed alive) | 50 capped (50+0+0) | Yes — exclusivity scoping is key |
| | **Weak:** tries to mutate `Span<Int>` | 0 (0+0+0) | Yes |
