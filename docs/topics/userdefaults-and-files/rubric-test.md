# Rubric Test — UserDefaults and Files (Step 5)

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
| **q24** UserDefaults small data vs large files | **Good:** Explains UserDefaults deserializes the entire property list file into memory on startup; storing large files causes memory bloat and slow app launch times. | 100 | Yes | Pass (100%) |
| | **Average:** "UserDefaults loads all its data into memory when the app opens, so big files make launch slow." | 85 | Yes | Pass (85%) |
| | **Weak:** "UserDefaults can only store up to 50 bytes of data total." | 0 | No | Fail (0%) |
| **q25** Documents vs Library/Caches | **Good:** Explains Documents is for user-created content and is backed up to iCloud; Library/Caches is for re-creatable temporary data, is excluded from iCloud backups, and can be purged by iOS under low storage. | 100 | Yes | Pass (100%) |
| | **Average:** "Documents is for user files and backs up to iCloud. Caches is for temporary files that do not back up." | 85 | Yes | Pass (85%) |
| | **Weak:** "Documents is stored in RAM and Caches is stored on flash memory." | 0 | No | Fail (0%) |
| **q26** Atomic writing with `Data.WritingOptions.atomic` | **Good:** Explains atomic writing writes to an auxiliary temporary file first and renames it upon completion; prevents corrupted partial files if the app terminates or loses power during write. | 100 | Yes | Pass (100%) |
| | **Average:** "Atomic writing saves to a temp file and renames it so crashes do not break the file." | 85 | Yes | Pass (85%) |
| | **Weak:** "Atomic writing compresses the file using multithreading." | 0 | No | Fail (0%) |
| **q27** Inappropriateness of UserDefaults for secrets | **Good:** Explains UserDefaults stores data in unencrypted plaintext property lists accessible via device backups; passwords and tokens belong in the encrypted iOS Keychain. | 100 | Yes | Pass (100%) |
| | **Average:** "UserDefaults is not encrypted, so someone can read it. Secrets must go to Keychain." | 85 | Yes | Pass (85%) |
| | **Weak:** "UserDefaults cannot store strings with special characters." | 0 | No | Fail (0%) |
| **q28** `Library/Application Support/` directory role | **Good:** Explains Application Support stores operational files the app creates to run (databases, config files); backs up to iCloud but is hidden from the user Files app. | 100 | Yes | Pass (100%) |
| | **Average:** "Application Support is for internal app databases. It is hidden from users in the Files app." | 85 | Yes | Pass (85%) |
| | **Weak:** "Application Support is where apps download App Store binary updates." | 0 | No | Fail (0%) |
| **q29** `StorageAdvisor` recommendStorage method | **Good:** Declares `struct StorageAdvisor` with `static func recommendStorage(isSecret: Bool, byteSize: Int) -> String` returning keychain for secrets, fileManager for size > 102400, and userDefaults otherwise. | 100 | Yes | Pass (100%) |
| | **Average:** Handles secrets and size, but swaps return values for small files. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns empty string for all inputs. | 20 | No | Fail (20%) |
| **q30** `DirectoryRouter` directoryURL method | **Good:** Declares `struct DirectoryRouter` with `func directoryURL(isUserCreated: Bool, isCache: Bool) -> String` returning Documents, Library/Caches, and Library/Application Support. | 100 | Yes | Pass (100%) |
| | **Average:** Checks userCreated and cache, but returns empty string instead of Application Support. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant Documents for all arguments. | 20 | No | Fail (20%) |
| **q31** `PreferencesValidator` isValidKey method | **Good:** Declares `class PreferencesValidator` with `func isValidKey(_ key: String) -> Bool` checking `!key.isEmpty && key.count < 100`. | 100 | Yes | Pass (100%) |
| | **Average:** Checks non-empty, but forgets the 100 character length boundary. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns constant true without evaluating key. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate clear understanding of UserDefaults memory overhead on app launch.
2. Verify knowledge of sandbox directory partitioning (Documents vs Caches vs Application Support).
3. Test comprehension of atomic write safety mechanics and corruption prevention.
4. Reinforce security boundaries separating plaintext UserDefaults from encrypted Keychain.
5. Validate clean Swift 6 implementations for storage advising, directory routing, and key validation.
