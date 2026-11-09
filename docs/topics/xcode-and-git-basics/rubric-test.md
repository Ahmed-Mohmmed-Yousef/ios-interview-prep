# Rubric Test — Xcode, Projects and Git (Step 5)

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
| **q24** Target vs Scheme | **Good:** Explains a target defines what product to build, specifying source files and build settings; a scheme defines how actions like Build, Run, Test, and Archive execute and links targets to configurations. | 100 | Yes | Pass (100%) |
| | **Average:** "A target is the app or widget you build. A scheme defines whether you run in debug or release mode." (Misses actions detail). | 75 | Yes | Pass (75%) |
| | **Weak:** "A target is an iPhone simulator and a scheme is an iPad canvas." | 0 | No | Fail (0%) |
| **q25** DerivedData and xcuserdata in .gitignore | **Good:** Explains DerivedData holds temporary build artifacts and module caches; xcuserdata holds personal IDE layout states and open tabs; committing causes merge conflicts and clutter. | 100 | Yes | Pass (100%) |
| | **Average:** "DerivedData and xcuserdata are temporary files and personal settings that cause merge conflicts if committed." | 80 | Yes | Pass (80%) |
| | **Weak:** "Git cannot commit folders that start with the letter x." | 0 | No | Fail (0%) |
| **q26** Bundle Identifier purpose | **Good:** Explains Bundle ID is a unique reverse-DNS string; iOS and App Store use it for app sandboxing, preferences, and capabilities; each target has a distinct bundle identifier. | 100 | Yes | Pass (100%) |
| | **Average:** "The bundle identifier is a reverse-domain name that uniquely identifies an app on iOS and the App Store." | 80 | Yes | Pass (80%) |
| | **Weak:** "The bundle ID tells the compiler which Swift version to use." | 0 | No | Fail (0%) |
| **q27** "Cannot find type in scope" missing target membership | **Good:** Explains file is missing Target Membership for the active target; Xcode only compiles files included in target's Compile Sources phase; fix is selecting file and checking box in File Inspector. | 100 | Yes | Pass (100%) |
| | **Average:** "The file was not added to the target membership, so Xcode does not compile it. You fix it by checking the box in File Inspector." | 80 | Yes | Pass (80%) |
| | **Weak:** "You must restart your Mac and delete the Git repository." | 0 | No | Fail (0%) |
| **q28** Debug vs Release build configurations | **Good:** Explains Debug optimizes for fast builds and debugging with -Onone and full debug symbols; Release optimizes for runtime performance with -O, dead code stripping, and disabled asserts. | 100 | Yes | Pass (100%) |
| | **Average:** "Debug compiles faster without optimizations so you can use breakpoints. Release optimizes the code with -O for the App Store." | 80 | Yes | Pass (80%) |
| | **Weak:** "Debug is for Swift and Release is for Objective-C." | 0 | No | Fail (0%) |
| **q29** AppBundle code-write | **Good:** Model answer with `struct AppBundle`, `let bundleID: String`, `let version: String`, initializes with `"com.prepstops.app"` and `"1.0"`, and prints `app.bundleID`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses different parameter values or omits printing bundleID. | 60 | Yes | Pass (60%) |
| | **Weak:** Struct omits bundleID property and declares unrelated fields. | 20 (capped) | No (bundleID missed) | Fail (20%) |
| **q30** ProjectScheme code-write | **Good:** Model answer with `struct ProjectScheme`, `let targetName: String`, `let isDebug: Bool`, initializes for `"PrepStopsApp"` with `true`, and prints formatted string. | 100 | Yes | Pass (100%) |
| | **Average:** Declares isDebug as a String instead of a Bool. | 60 | Yes | Pass (60%) |
| | **Weak:** Omits targetName property and fails to initialize. | 20 (capped) | No (targetName missed) | Fail (20%) |
| **q31** GitLogEntry code-write | **Good:** Model answer with `struct GitLogEntry`, `let hash: String`, `let message: String`, initializes with `"4a7c1e9"` and `"feat: initial setup"`, and prints summary. | 100 | Yes | Pass (100%) |
| | **Average:** Prints only the hash instead of formatted summary. | 70 | Yes | Pass (70%) |
| | **Weak:** Struct omits message property and fails to compile. | 20 (capped) | No (message missed) | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Confirm comprehension of Xcode project architecture, target vs scheme responsibilities, and bundle identifiers.
2. Verify understanding of version control best practices, including `.gitignore` rules for `DerivedData` and `xcuserdata`.
3. Test practical debugging and setup skills including Target Membership and Debug vs Release build configuration differences.
