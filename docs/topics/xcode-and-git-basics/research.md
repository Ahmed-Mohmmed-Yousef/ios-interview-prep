# Research — Xcode, Projects and Git (`xcode-and-git-basics`)

Researched 2026-11-09. Baseline: Swift 6.4, Xcode 26+, macOS 15+ SDK.

## 1. Official Sources

- **Apple Developer Documentation: Creating an Xcode project for an app**:
  https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app
  Covers creating projects, templates, app bundles, and target configurations.
- **Apple Developer Documentation: Source control management in Xcode**:
  https://developer.apple.com/documentation/xcode/source-control-management
  Covers integrating Git with Xcode, staging changes, creating commits, and managing branch workflows.
- **Git Documentation: Official Reference**:
  https://git-scm.com/doc
  Standard commands: `git init`, `git status`, `git add`, `git commit`, `git branch`, `git switch`, `git merge`, and `.gitignore`.

---

## 2. Core Concepts & Technical Facts

### 1. Xcode Project Hierarchy
- **Project (`.xcodeproj`)**:
  - The top-level container for code, resources, build configurations, and targets.
  - Contains `project.pbxproj`, an ASCII property list that defines file references and build phases using 96-bit hexadecimal UUIDs.
- **Target**:
  - Defines a single build product to produce (e.g. an iOS Application, a WatchKit companion, a Widget Extension, or a Unit Test bundle).
  - Specifies build settings (compiler flags, bundle ID, deployment target) and build phases (sources to compile, resources to copy).
- **Scheme**:
  - Defines the instructions for actions: Build, Run, Test, Profile, Analyze, Archive.
  - Links a target to specific build configurations (e.g., Run uses `Debug`, Archive uses `Release`).
  - Schemes can be private (user-specific) or shared across the team.
- **Workspace (`.xcworkspace`)**:
  - Groups multiple projects together so they can share build products and dependencies (standard for Swift Packages and CocoaPods).
- **Bundle Identifier**:
  - A reverse-DNS formatted unique identifier (e.g., `com.company.appname`) required by iOS to identify the app on device and in App Store Connect.

### 2. Git in iOS Development
- **Core Workflow**:
  - Working directory → `git add <files>` (Staging Area) → `git commit -m "message"` (Repository History).
  - Branching: `git branch <name>`, `git switch <name>` (or `git checkout -b <name>`).
  - Merging: `git merge <branch>`.
- **Xcode `.gitignore` Best Practices**:
  - **Ignore**:
    - `DerivedData/`: Temporary build products, intermediate files, module caches, and index data.
    - `*.xcuserdata/`: User-specific Xcode state (open tabs, breakpoint state, window layout).
    - `.DS_Store`: macOS Finder metadata.
    - `build/`: Local build directories.
  - **Commit**:
    - Source code (`.swift`, assets, strings).
    - `project.pbxproj`: Project structure.
    - Shared schemes (`xcshareddata/xcschemes/`).
    - `Package.resolved` (for app projects to lock SPM dependency versions).

---

## 3. Common Interview Traps

1. **Confusing Targets and Schemes**:
   - *Target*: WHAT gets built (the artifact: app binary, test bundle, extension).
   - *Scheme*: HOW and WHEN it gets built (which target to run under Debug, which tests to execute, which scheme to archive).
2. **Target Membership Omission**:
   - When adding a new `.swift` file, failing to check the target membership checkbox in the File Inspector causes compiler errors (`Cannot find 'Type' in scope`).
3. **Committing `xcuserdata` or `DerivedData`**:
   - Checking user data into Git causes massive merge conflicts and pollutes PR diffs with personal IDE state.
4. **Merge Conflicts in `project.pbxproj`**:
   - Because `project.pbxproj` uses internal UUIDs, two developers adding files on different branches can cause conflicts that require careful manual resolution or git tools.
5. **Debug vs Release Configurations**:
   - `Debug`: Fast compilation, optimization level `-Onone`, debugging symbols included, `DEBUG` compilation condition defined.
   - `Release`: Full optimization `-O` (or `-Osize`), dead code stripping, debug assertions disabled.

---

## 4. Interview Questions by Level

### Fresh
- What is the difference between an Xcode Project, a Target, and a Scheme?
- What is a bundle identifier, and why is it important?
- What basic Git commands do you use daily to save and branch your code?

### Junior
- Why should `DerivedData` and `xcuserdata` never be committed to Git?
- How does Debug build configuration differ from Release build configuration in Xcode?
- What causes a "Cannot find type in scope" error when a Swift file is present in the Xcode project navigator?

### Senior
- How do you manage multi-target modular architectures with local Swift Packages in an `.xcworkspace`?
- How do you resolve complex merge conflicts in `project.pbxproj`?
- How do you automate test execution and App Store archiving using command-line `xcodebuild` in CI/CD pipelines?
