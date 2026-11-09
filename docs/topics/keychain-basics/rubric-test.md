# Rubric Test — Keychain Basics (Step 5)

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
| **q24** UserDefaults vs Keychain (encryption, use cases, uninstall) | **Good:** Explains UserDefaults stores plaintext property lists while Keychain provides hardware-backed AES-256 encryption via securityd and Secure Enclave; UserDefaults is for UI flags while Keychain is for secrets; UserDefaults files delete on uninstall while Keychain items persist. | 100 | Yes | Pass (100%) |
| | **Average:** "UserDefaults is unencrypted for settings. Keychain is encrypted for tokens. Keychain items stay after you delete the app." | 85 | Yes | Pass (85%) |
| | **Weak:** "UserDefaults is stored in the cloud while Keychain is stored on the SIM card." | 0 | No | Fail (0%) |
| **q25** SecItem CRUD and generic password identifier keys | **Good:** Explains SecItemAdd saves, SecItemCopyMatching queries, and SecItemDelete removes items; identifies kSecClassGenericPassword as the class and kSecAttrService and kSecAttrAccount as primary keys. | 100 | Yes | Pass (100%) |
| | **Average:** "SecItemAdd creates items, SecItemCopyMatching reads them, and SecItemDelete deletes them using service and account keys." | 85 | Yes | Pass (85%) |
| | **Weak:** "SecItemAdd downloads keys from the internet using URLSession." | 0 | No | Fail (0%) |
| **q26** WhenUnlocked vs AfterFirstUnlock and background tasks | **Good:** Explains WhenUnlocked requires active user unlock while AfterFirstUnlock remains decrypted once unlocked post-reboot; specifies background tasks (push notifications, background fetch) require AfterFirstUnlock. | 100 | Yes | Pass (100%) |
| | **Average:** "WhenUnlocked only works when the phone is open. AfterFirstUnlock works even when locked once the user enters passcode after reboot, useful for background fetch." | 85 | Yes | Pass (85%) |
| | **Weak:** "WhenUnlocked is for Wi-Fi and AfterFirstUnlock is for Cellular data." | 0 | No | Fail (0%) |
| **q27** Sharing tokens with Widget extensions via Access Groups | **Good:** Explains enabling Keychain Sharing capability, configuring identical Keychain Access Groups with shared Team ID prefix, and passing kSecAttrAccessGroup in queries. | 100 | Yes | Pass (100%) |
| | **Average:** "Enable Keychain Sharing in both targets and pass the shared access group in the query dictionary." | 85 | Yes | Pass (85%) |
| | **Weak:** "Save the token in an environment variable accessible to all processes." | 0 | No | Fail (0%) |
| **q28** Keychain uninstall persistence bugs and first-launch cleanup | **Good:** Explains Keychain items survive app deletion causing stale credentials on reinstall; describes detecting fresh installs with a UserDefaults boolean flag and clearing stale Keychain items. | 100 | Yes | Pass (100%) |
| | **Average:** "Tokens survive app deletion, so check a UserDefaults flag on launch and wipe old Keychain items if it is the first launch." | 85 | Yes | Pass (85%) |
| | **Weak:** "Restart the iPhone before running the newly installed app." | 0 | No | Fail (0%) |
| **q29** `makeGenericPasswordQuery(service:account:data:)` | **Good:** Returns dictionary with kSecClassGenericPassword, kSecAttrService, kSecAttrAccount, kSecValueData, and kSecAttrAccessibleWhenUnlocked. | 100 | Yes | Pass (100%) |
| | **Average:** Correctly builds dictionary for class, service, and account, but forgets accessibility attribute. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns empty dictionary or wrong class type. | 20 | No | Fail (20%) |
| **q30** `keychainStatusMessage(status:)` | **Good:** Translates errSecSuccess to 'Success', errSecDuplicateItem to 'Duplicate item', errSecItemNotFound to 'Item not found', and defaults to 'Unhandled error'. | 100 | Yes | Pass (100%) |
| | **Average:** Handles success and duplicate, but returns empty string on unknown status. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant 'Success' for any input status. | 20 | No | Fail (20%) |
| **q31** `makeReadTokenQuery(service:account:)` | **Good:** Returns dictionary with kSecClassGenericPassword, service, account, kSecReturnData as true, and kSecMatchLimit as kSecMatchLimitOne. | 100 | Yes | Pass (100%) |
| | **Average:** Includes class, service, account, and returnData, but omits match limit. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns dictionary with only service and account. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Validate clear understanding of hardware-backed Keychain encryption vs plaintext UserDefaults.
2. Verify knowledge of SecItem C CRUD APIs and generic password query keys.
3. Test comprehension of accessibility policy trade-offs (WhenUnlocked vs AfterFirstUnlock for background tasks).
4. Reinforce cross-target token sharing via Keychain Access Groups and Team ID prefixes.
5. Address the classic interview trap of Keychain uninstall persistence and first-launch cleanup.
6. Validate clean Swift 6 implementations for query construction, status translation, and token retrieval.
