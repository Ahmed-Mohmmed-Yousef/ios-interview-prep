# Rubric Test — Noncopyable Types and Ownership

Tested 2026-11-14 against `content/rules.json` → `rubricScoring` (met = full, partly = half, not met = 0; missed `"key": true` caps total at 50). Pass mark: 70.

## Results

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** borrowing vs consuming | **Good:** borrowing = temporary read, caller keeps value; consuming = moves ownership, caller loses access | 100 (40+40+20) | Yes |
| | **Average:** "borrowing reads a value, consuming moves it." (does not state caller access rules) | 60 (20+20+20) | Yes — misses full ownership consequences |
| | **Weak:** "borrowing copies the struct and consuming deletes it." | 0 (0+0+0) | Yes |
| **q26** deinit and discard self | **Good:** single owner allows deinit once; discard self destroys without deinit; prevents double cleanup | 100 (40+40+20) | Yes |
| | **Average:** "Noncopyable structs can have deinit. Use discard self inside consuming methods." (misses why / double cleanup) | 70 (20+40+10) | Yes — covers both key ideas |
| | **Weak:** "deinit runs when you use a class." | 0 (0+0+0) | Yes |
| **q27** generics and protocols | **Good:** generic/protocol default to Copyable; `<T: ~Copyable>` / `protocol: ~Copyable`; valid code example | 100 (35+45+20) | Yes |
| | **Average:** "Generics assume Copyable unless you write `~Copyable`." (no example) | 80 (35+45+0) | Yes |
| | **Weak:** "Noncopyable types cannot be used with generics." | 0 (0+0+0) | Yes |
| **q28** borrowing on Copyable + copy | **Good:** avoids hidden copies/retains; implicit copy disabled; explicit `copy` keyword | 100 (45+30+25) | Yes |
| | **Average:** "It stops extra copies on String." (forgets `copy` keyword) | 50 capped (45+15+0) | Yes — prompt explicitly asks how `copy` helps |
| | **Weak:** "borrowing only compiles for ~Copyable." | 0 (0+0+0) | Yes |
| **q29** ~Copyable struct vs class | **Good:** value type without ARC; compile-time single-owner prevents double commit; class relies on runtime checks | 100 (35+45+20) | Yes |
| | **Average:** "A ~Copyable struct uses no ARC and stops reuse at compile time." (no class comparison) | 80 (35+45+0) | Yes |
| | **Weak:** "Classes are always better because they have deinit." | 0 (0+0+0) | Yes |
| **q30** write FileToken | **Good:** `struct FileToken: ~Copyable`, `borrowing func read()`, `deinit`, runs in `run()` | 100 (35+35+30) | Yes |
| | **Average:** omits `borrowing` on `read()` (fails to compile or misses key modifier) | 50 capped (35+0+30) | Yes |
| | **Weak:** uses `class FileToken` | 30 (0+0+30) | Yes |
| **q31** write Session close | **Good:** `consuming func close()`, `discard self`, called in `run()` | 100 (40+45+15) | Yes |
| | **Average:** writes `consuming func close()` without `discard self` | 50 capped (40+0+15) | Yes — misses key criterion |
| | **Weak:** calls `mutating func close()` | 15 (0+0+15) | Yes |
| **q32** write Labelable generic | **Good:** `protocol Labelable: ~Copyable`, `KeyCard: ~Copyable, Labelable`, `printLabel<T: ~Copyable & Labelable>` | 100 (35+45+20) | Yes |
| | **Average:** forgets `: ~Copyable` on `T` | 50 capped (35+0+20) | Yes — misses key generic constraint |
| | **Weak:** uses `class KeyCard` without `~Copyable` | 20 (0+0+20) | Yes |
