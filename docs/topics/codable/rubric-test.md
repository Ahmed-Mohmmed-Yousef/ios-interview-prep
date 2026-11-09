# Rubric Test — Codable and JSON (Step 5)

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
| **q24** Codable protocol definition and synthesis | **Good:** Explains Codable is a typealias combining Encodable and Decodable; compiler synthesizes CodingKeys and encoding/decoding methods automatically when all stored properties conform to Codable. | 100 | Yes | Pass (100%) |
| | **Average:** "Codable combines Encodable and Decodable so Swift can parse JSON automatically without writing extra code." | 80 | Yes | Pass (80%) |
| | **Weak:** "Codable is an Objective-C class for network requests." | 0 | No | Fail (0%) |
| **q25** CodingKeys purpose and enum rule | **Good:** Explains CodingKeys maps external JSON keys to Swift property names; all stored properties participating in Codable must be included in the enum cases. | 100 | Yes | Pass (100%) |
| | **Average:** "CodingKeys renames JSON keys to match Swift properties, but you have to write cases for all your properties." | 85 | Yes | Pass (85%) |
| | **Weak:** "CodingKeys encrypts JSON data." | 0 | No | Fail (0%) |
| **q26** decodeIfPresent purpose and API resiliency | **Good:** Explains decodeIfPresent returns nil when a key is absent or contains null; allows developers to use nil-coalescing to provide safe fallback defaults for missing API fields. | 100 | Yes | Pass (100%) |
| | **Average:** "decodeIfPresent safely decodes optionals and lets you give default values when fields are missing." | 85 | Yes | Pass (85%) |
| | **Weak:** "decodeIfPresent skips JSON validation." | 0 | No | Fail (0%) |
| **q27** DecodingError common cases and causes | **Good:** Mentions keyNotFound for missing keys, typeMismatch for wrong types, and valueNotFound for unexpected nulls; explains causes and diagnostic value during debugging. | 100 | Yes | Pass (100%) |
| | **Average:** "JSONDecoder throws keyNotFound when keys are missing and typeMismatch when the type does not match." | 80 | Yes | Pass (80%) |
| | **Weak:** "Decoding errors only happen when there is no internet connection." | 0 | No | Fail (0%) |
| **q28** convertFromSnakeCase vs explicit CodingKeys | **Good:** Explains convertFromSnakeCase automatically transforms standard snake_case keys across the payload; explicit CodingKeys is needed for bespoke names, abbreviations, or non-standard key transformations. | 100 | Yes | Pass (100%) |
| | **Average:** "convertFromSnakeCase does all snake case keys automatically, but CodingKeys is needed when keys have completely different names." | 85 | Yes | Pass (85%) |
| | **Weak:** "They are identical and can always be used interchangeably." | 0 | No | Fail (0%) |
| **q29** Person struct code-write | **Good:** Model answer: struct Person: Codable with let name: String and let age: Int; outputs "Jordan is 28". | 100 | Yes | Pass (100%) |
| | **Average:** Forgets Codable conformance, preventing JSONDecoder from operating. | 50 (capped) | No (Codable missed) | Fail (50%) |
| | **Weak:** Writes empty struct without properties or conformance. | 0 | No | Fail (0%) |
| **q30** Account struct with CodingKeys code-write | **Good:** Model answer: struct Account: Codable with accountId and accountName, mapping to account_id and account_name in CodingKeys; outputs "500: Savings". | 100 | Yes | Pass (100%) |
| | **Average:** Defines CodingKeys but omits accountName case, causing compiler failure. | 60 | No (full key set missed) | Fail (60%) |
| | **Weak:** Writes class with hardcoded string without CodingKeys. | 20 | No | Fail (20%) |
| **q31** Movie struct with decodeIfPresent code-write | **Good:** Model answer: struct Movie: Codable with custom init(from decoder:) using decodeIfPresent(Double.self, forKey: .rating) ?? 5.0; outputs "Inception: 5.0". | 100 | Yes | Pass (100%) |
| | **Average:** Uses try container.decode(Double.self) instead of decodeIfPresent, throwing error on missing key. | 50 (capped) | No (decodeIfPresent missed) | Fail (50%) |
| | **Weak:** Returns hardcoded 5.0 without custom init or container extraction. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully verify:
1. Understanding of `Codable` typealias and automatic compiler synthesis.
2. Complete knowledge of `CodingKeys` rules (including exhaustive property enumeration).
3. Practical skill with `decodeIfPresent` and fallback values for third-party API resilience.
4. Recognition of distinct `DecodingError` failure modes.
