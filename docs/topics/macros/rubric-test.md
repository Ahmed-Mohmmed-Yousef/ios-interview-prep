# Rubric Test — Macros

Tested 2026-11-14 against `content/rules.json` → `rubricScoring` (met = full, partly = half, not met = 0; missed `"key": true` caps total at 50). Pass mark: 70.

## Results

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** freestanding vs attached | **Good:** `#` stands alone, `@` attaches to declaration, `#Predicate` and `@Observable` examples | 100 (35+35+30) | Yes |
| | **Average:** "`#` macros are expressions and `@` macros are attached, like `#line`." (misses `@` example and attached detail) | 68 (18+35+15) | Yes — borderline fail since attached side is incomplete |
| | **Weak:** "Freestanding runs at runtime and attached runs at compile time." | 0 (0+0+0) | Yes |
| **q26** macro safety & sandbox | **Good:** syntax tree ASTs, type-checked before/after, sandbox blocks disk/network | 100 (35+35+30) | Yes |
| | **Average:** "They check types at compile time and do not paste raw text." (misses sandbox) | 70 (35+35+0) | Yes — hits both key points, loses sandbox points |
| | **Weak:** "They use a sandbox so users cannot crash the app." (misses AST & type checking) | 30 (0+0+30) | Yes — capped below pass |
| **q27** `@Observable` roles | **Good:** `member` storage, `memberAttribute` `@ObservationTracked`, `extension` `Observable` + `@ObservationIgnored` | 100 (30+35+35) | Yes |
| | **Average:** "It adds `Observable` conformance and tracks properties." (misses `memberAttribute`) | 50 capped (15+0+35) | Yes — misses a key role so capped at 50 |
| | **Weak:** "It is a property wrapper that creates `_name` fields." | 0 (0+0+0) | Yes |
| **q28** macros vs property wrappers | **Good:** wrapper = stored properties + `_prop`; macro = types/functions/expressions + no wrapper object; `SwiftSyntax` cost | 100 (40+40+20) | Yes |
| | **Average:** "Property wrappers only work on properties. Macros work on whole types at compile time." (no `_prop` or `SwiftSyntax`) | 60 (20+40+0) | Yes — misses key backing storage detail |
| | **Weak:** "Macros are faster because they run at launch." | 0 (0+0+0) | Yes |
| **q29** when to avoid & debug | **Good:** prefer generics/protocol extensions/wrappers, `SwiftSyntax` build cost, Expand Macro | 100 (40+35+25) | Yes |
| | **Average:** "Use generics first because macros slow builds." (forgets Expand Macro) | 50 capped (40+35+0) | Yes — prompt asks for the debugging tool (`key: true`) |
| | **Weak:** "Always use macros to shorten code." | 0 (0+0+0) | Yes |
| **q30** write `@Observable` model | **Good:** `final class SettingsModel`, `@Observable`, `@ObservationIgnored var debugTag`, prints `80 audio` | 100 (40+40+20) | Yes |
| | **Average:** puts `@Observable` on `struct SettingsModel` instead of `class` | 50 capped (0+40+0) | Yes — misses key criterion |
| | **Weak:** forgets `@ObservationIgnored` and `@Observable` | 20 (0+0+20) | Yes |
| **q31** write `#Predicate` | **Good:** `#Predicate<Item> { $0.price < 20 && $0.count > 0 }`, evaluates sample, prints `true` | 100 (60+40) | Yes |
| | **Average:** uses a normal closure `{ $0.price < 20 && $0.count > 0 }` without `#Predicate` | 40 (0+40) | Yes — misses key `#Predicate` requirement |
| | **Weak:** writes `item.price > 20` | 0 (0+0) | Yes |
| **q32** write `AutoModel` macro decl | **Good:** `@attached(member, names: named(init))`, `@attached(extension, conformances: Equatable)`, `#externalMacro` | 100 (40+40+20) | Yes |
| | **Average:** forgets `names: named(init)` on `member` | 50 capped (20+40+20 -> 80? No, key is partly met = 80; wait: if `member` is missing completely, 50 capped) | Yes |
| | **Weak:** uses `@freestanding(declaration)` instead of attached roles | 20 (0+0+20) | Yes |
