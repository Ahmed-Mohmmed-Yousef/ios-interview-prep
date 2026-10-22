// HISTORY ONLY — candidate sources for step 1.7 (2026-10-22), checked by scripts/check-sources.mjs.
// After step 1.7, edit `sources` in topic.json directly; do not re-run the step 1.7 scripts.

const SB = (c) => `https://docs.swift.org/swift-book/documentation/the-swift-programming-language/${c}`;
const AD = (p) => `https://developer.apple.com/documentation/${p}`;
const HIG = (p) => `https://developer.apple.com/design/human-interface-guidelines/${p}`;
const W = (y, n) => `https://developer.apple.com/videos/play/wwdc${y}/${n}/`;
const TIH = (p) => `https://www.techinterviewhandbook.org/${p}/`;
const WEEEBOX = "https://github.com/weeeBox/mobile-system-design";
const DBX = (p) => `https://dropbox.github.io/dbx-career-framework/${p}.html`;
const STAFF = "https://lethain.com/staff-engineer-archetypes/";
const SWIFT_62 = "https://www.swift.org/blog/swift-6.2-released/";
const MIGRATION = "https://www.swift.org/migration/documentation/migrationguide/";
const API_GUIDE = "https://www.swift.org/documentation/api-design-guidelines/";

export const candidates = {
  // Swift Language
  "swift-basics": [SB("thebasics")],
  optionals: [SB("thebasics"), AD("swift/optional")],
  operators: [SB("basicoperators"), SB("advancedoperators")],
  "strings-and-characters": [SB("stringsandcharacters"), AD("swift/string")],
  collections: [SB("collectiontypes"), AD("swift/array"), AD("swift/dictionary")],
  "control-flow": [SB("controlflow")],
  functions: [SB("functions")],
  "closures-basics": [SB("closures")],
  enumerations: [SB("enumerations")],
  "structs-vs-classes": [SB("classesandstructures"), AD("swift/choosing-between-structures-and-classes")],
  properties: [SB("properties")],
  "methods-and-initialization": [SB("methods"), SB("initialization")],
  "error-handling": [SB("errorhandling"), AD("swift/result")],
  "optional-chaining": [SB("optionalchaining")],
  inheritance: [SB("inheritance")],
  "type-casting": [SB("typecasting")],
  protocols: [SB("protocols")],
  extensions: [SB("extensions")],
  "generics-basics": [SB("generics")],
  "access-control": [SB("accesscontrol")],
  "closures-escaping-capture": [SB("closures"), SB("automaticreferencecounting")],
  codable: [AD("swift/codable"), AD("foundation/encoding-and-decoding-custom-types"), AD("foundation/jsondecoder")],
  "protocol-oriented-programming": [SB("protocols"), W(2022, 110353), W(2015, 408)],
  "generics-associated-types": [SB("generics"), W(2022, 110352)],
  "opaque-and-boxed-types": [SB("opaquetypes"), W(2022, 110352)],
  "copy-on-write": [SB("classesandstructures"), "https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst"],
  "key-paths": [AD("swift/keypath"), SB("expressions")],
  "property-wrappers": [SB("properties"), SB("attributes")],
  "result-builders": [SB("attributes"), AD("swiftui/viewbuilder")],
  macros: [SB("macros"), W(2023, 10166), W(2023, 10167)],
  "noncopyable-types": [W(2024, 10170), "https://github.com/swiftlang/swift-evolution/blob/main/proposals/0390-noncopyable-structs-and-enums.md"],
  "inlinearray-and-span": [AD("swift/inlinearray"), AD("swift/span"), SWIFT_62],
  "memory-safety": [SB("memorysafety"), SWIFT_62],

  // Coding Interview (community allowed)
  "big-o": [TIH("algorithms/study-cheatsheet"), "https://github.com/apple/swift-algorithms"],
  "arrays-and-strings": [TIH("algorithms/array"), TIH("algorithms/string"), AD("swift/array")],
  "hash-tables": [TIH("algorithms/hash-table"), AD("swift/dictionary"), AD("swift/set")],
  "sorting-binary-search": [TIH("algorithms/sorting-searching"), AD("swift/array/sort()")],
  "two-pointers-sliding-window": [TIH("algorithms/array")],
  "stacks-and-queues": [TIH("algorithms/stack"), TIH("algorithms/queue"), "https://github.com/apple/swift-collections"],
  "linked-lists": [TIH("algorithms/linked-list")],
  recursion: [TIH("algorithms/recursion")],
  "matrix-problems": [TIH("algorithms/matrix")],
  "trees-bfs-dfs": [TIH("algorithms/tree")],
  graphs: [TIH("algorithms/graph")],
  heaps: [TIH("algorithms/heap"), "https://github.com/apple/swift-collections"],
  tries: [TIH("algorithms/trie")],
  intervals: [TIH("algorithms/interval")],
  "dynamic-programming": [TIH("algorithms/dynamic-programming")],
  "bits-math-geometry": [TIH("algorithms/binary"), TIH("algorithms/math"), TIH("algorithms/geometry")],

  // Memory
  "arc-basics": [SB("automaticreferencecounting")],
  "strong-weak-unowned": [SB("automaticreferencecounting")],
  "retain-cycles": [SB("automaticreferencecounting"), W(2021, 10216)],
  "memory-graph-debugger": [AD("xcode/gathering-information-about-memory-use"), W(2018, 416)],
  "memory-profiling-instruments": [W(2024, 10173), AD("xcode/reducing-your-app-s-memory-use"), AD("xcode/gathering-information-about-memory-use")],

  // Concurrency
  "main-thread": [AD("swift/mainactor"), AD("dispatch/dispatchqueue/main"), AD("xcode/diagnosing-memory-thread-and-crash-issues-early")],
  "gcd-basics": [AD("dispatch"), AD("dispatch/dispatchqueue")],
  "async-await": [SB("concurrency"), W(2021, 10132)],
  "structured-concurrency": [SB("concurrency"), W(2021, 10134), AD("swift/taskgroup")],
  "task-cancellation": [AD("swift/task"), SB("concurrency")],
  "async-sequences": [AD("swift/asyncsequence"), AD("swift/asyncstream"), W(2021, 10058)],
  "actors-and-main-actor": [SB("concurrency"), W(2021, 10133), AD("swift/mainactor")],
  "sendable-data-races": [AD("swift/sendable"), W(2022, 110351)],
  "swift-6-strict-concurrency": [MIGRATION, W(2024, 10169)],
  "approachable-concurrency": [W(2025, 268), SWIFT_62],
  "migrating-to-async-await": [MIGRATION, W(2021, 10194)],
  "concurrent-system-design": [W(2025, 268), W(2022, 110350), W(2021, 10254)],
  "concurrency-swift-6-4": ["https://developer.apple.com/wwdc26/guides/swift/", W(2026, 262)],

  // SwiftUI
  "swiftui-views-modifiers": [AD("swiftui/view"), "https://developer.apple.com/tutorials/swiftui", AD("swiftui/configuring-views")],
  "swiftui-layout": [AD("swiftui/building-layouts-with-stack-views"), AD("swiftui/vstack")],
  "state-and-binding": [AD("swiftui/state"), AD("swiftui/binding"), AD("swiftui/managing-user-interface-state")],
  "swiftui-lists": [AD("swiftui/list"), AD("swiftui/foreach")],
  "swiftui-navigation": [AD("swiftui/navigationstack"), W(2022, 10054)],
  "swiftui-observation": [AD("swiftui/managing-model-data-in-your-app"), AD("observation"), W(2023, 10149)],
  "observable-object": [AD("swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro"), AD("combine/observableobject"), AD("swiftui/stateobject")],
  "forms-and-input": [AD("swiftui/form"), AD("swiftui/textfield")],
  "sheets-alerts-dialogs": [AD("swiftui/modal-presentations"), "https://developer.apple.com/wwdc26/guides/swiftui/"],
  "swiftui-loading-data": [AD("swiftui/asyncimage"), W(2021, 10019)],
  "view-identity-lifetime": [W(2021, 10022), "https://developer.apple.com/wwdc26/guides/swiftui/", AD("swiftui/state")],
  "swiftui-animations": [AD("swiftui/animations"), W(2023, 10156)],
  "custom-layouts": [AD("swiftui/layout"), W(2022, 10056)],
  "swiftui-uikit-interop": [AD("swiftui/uiviewrepresentable"), AD("swiftui/uihostingcontroller")],
  "swiftui-performance": [W(2023, 10160), W(2025, 306)],

  // UIKit
  "uiviews-and-view-controllers": [AD("uikit/uiview"), AD("uikit/uiviewcontroller")],
  "view-controller-lifecycle": [AD("uikit/uiviewcontroller"), AD("uikit/displaying-and-managing-views-with-a-view-controller")],
  "auto-layout": [AD("uikit/nslayoutconstraint"), AD("uikit/view-layout")],
  "uikit-navigation": [AD("uikit/uinavigationcontroller"), AD("uikit/uiviewcontroller/present(_:animated:completion:)")],
  "table-collection-views": [AD("uikit/updating-collection-views-using-diffable-data-sources"), AD("uikit/uicollectionviewcompositionallayout"), AD("uikit/uitableview")],
  "custom-views-layout-pass": [AD("uikit/uiview/layoutsubviews()"), AD("uikit/uiview/setneedslayout()")],

  // Design and Accessibility
  "dark-mode-dynamic-type": [HIG("dark-mode"), HIG("typography"), AD("uikit/supporting-dark-mode-in-your-interface")],
  "hig-liquid-glass": [HIG("materials"), "https://developer.apple.com/ios/whats-new/", AD("technologyoverviews/liquid-glass")],
  accessibility: [AD("accessibility"), HIG("accessibility")],
  localization: [AD("xcode/localizing-and-varying-text-with-a-string-catalog"), AD("xcode/localization")],
  "ipad-adaptive-layout": [HIG("layout"), AD("uikit/uitraitcollection")],

  // App and System
  "xcode-and-git-basics": [AD("xcode/creating-an-xcode-project-for-an-app"), AD("xcode/source-control-management")],
  "app-lifecycle": [AD("uikit/managing-your-app-s-life-cycle"), AD("swiftui/scenephase"), AD("uikit/uiscenedelegate")],
  "permissions-privacy": [AD("uikit/protecting-the-user-s-privacy"), HIG("privacy"), AD("bundleresources/privacy-manifest-files")],
  "signing-app-store": [AD("xcode/distributing-your-app-for-beta-testing-and-releases"), "https://developer.apple.com/app-store/review/guidelines/"],
  notifications: [AD("usernotifications"), AD("usernotifications/registering-your-app-with-apns")],
  "background-tasks": [AD("backgroundtasks"), AD("backgroundtasks/bgtaskscheduler")],
  "deep-links": [AD("xcode/supporting-universal-links-in-your-app"), AD("swiftui/view/onopenurl(perform:)")],
  "widgets-app-intents": [AD("widgetkit"), AD("appintents")],
  "foundation-models": [AD("foundationmodels")],

  // Data and Networking
  "http-rest-basics": ["https://www.rfc-editor.org/rfc/rfc9110", AD("foundation/urlrequest")],
  urlsession: [AD("foundation/urlsession"), AD("foundation/fetching-website-data-into-memory")],
  "userdefaults-and-files": [AD("foundation/userdefaults"), AD("foundation/filemanager")],
  "keychain-basics": [AD("security/keychain-services"), AD("security/storing-keys-in-the-keychain")],
  swiftdata: [AD("swiftdata"), W(2023, 10187)],
  "core-data": [AD("coredata")],
  caching: [AD("foundation/urlcache"), AD("foundation/accessing-cached-data")],
  pagination: [AD("swiftui/lazyvstack"), AD("foundation/urlsession")],
  "combine-basics": [AD("combine"), AD("combine/receiving-and-handling-events-with-combine")],
  "real-time-websockets": [AD("foundation/urlsessionwebsockettask"), "https://www.rfc-editor.org/rfc/rfc6455"],
  "offline-first-sync": [AD("network/nwpathmonitor"), AD("coredata/mirroring-a-core-data-store-with-cloudkit"), AD("swiftdata")],
  "app-security": [AD("security/preventing-insecure-network-connections"), AD("uikit/encrypting-your-app-s-files"), AD("security")],

  // Architecture (official only unless the user allows community)
  "communication-patterns": [SB("protocols"), AD("foundation/notificationcenter"), SB("closures")],
  mvc: ["https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html", AD("uikit/uiviewcontroller")],
  "solid-basics": ["https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html"],
  mvvm: [AD("swiftui/managing-model-data-in-your-app"), "https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm"],
  "dependency-injection": [AD("swiftui/environment"), "https://martinfowler.com/articles/injection.html"],
  "design-patterns": [AD("swift/managing-a-shared-resource-using-a-singleton"), "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaFundamentals/CocoaDesignPatterns/CocoaDesignPatterns.html"],
  "navigation-patterns": [AD("swiftui/navigationstack"), AD("uikit/uinavigationcontroller"), W(2022, 10054)],
  "clean-architecture": ["https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"],
  "modularization-spm": [AD("xcode/organizing-your-code-with-local-packages"), "https://docs.swift.org/latest/documentation/packagemanagerdocs/", AD("packagedescription")],
  "unidirectional-data-flow": ["https://github.com/pointfreeco/swift-composable-architecture"],
  "sdk-design": [API_GUIDE, AD("xcode/creating-a-multi-platform-binary-framework-bundle")],
  "platform-architecture": [AD("xcode/organizing-your-code-with-local-packages"), API_GUIDE],

  // Testing and Release
  "debugging-lldb": [AD("xcode/stepping-through-code-and-inspecting-variables-to-isolate-bugs"), "https://lldb.llvm.org/use/tutorial.html"],
  "logging-oslog": [AD("os/logging"), AD("os/logger")],
  "unit-testing": [AD("testing"), AD("xctest"), AD("testing/migratingfromxctest")],
  "testable-code-mocks": [AD("xcode/testing"), "https://martinfowler.com/articles/mocksArentStubs.html"],
  "testing-async-code": [AD("testing/testing-asynchronous-code"), AD("xctest/asynchronous-tests-and-expectations")],
  "ui-testing": [AD("xcuiautomation"), AD("xcuiautomation/xcuiapplication")],
  "code-review": ["https://google.github.io/eng-practices/review/"],
  "ci-cd": [AD("xcode/xcode-cloud")],
  "crash-reports-metrickit": [AD("xcode/diagnosing-issues-using-crash-reports-and-device-logs"), AD("metrickit")],
  "feature-flags-rollouts": ["https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases/", "https://martinfowler.com/articles/feature-toggles.html"],
  "test-strategy": [AD("xcode/testing"), AD("xcode/running-tests-and-interpreting-results"), "https://martinfowler.com/articles/practical-test-pyramid.html"],

  // Performance
  "smooth-ui": [AD("xcode/improving-app-responsiveness"), AD("xcode/understanding-hangs-in-your-app")],
  "app-launch-time": [AD("xcode/reducing-your-app-s-launch-time")],
  "instruments-profiling": [AD("xcode/improving-your-app-s-performance"), AD("xcode/improving-app-responsiveness")],
  "battery-network-app-size": [AD("xcode/reducing-your-app-s-size"), AD("xcode/analyzing-your-app-s-battery-use")],

  // Mobile System Design (community allowed)
  "system-design-interview-intro": [WEEEBOX, "https://bytebytego.com/courses/mobile-system-design-interview/introduction"],
  "requirements-scoping": [WEEEBOX],
  "high-level-architecture": [WEEEBOX],
  "api-design-protocols": [WEEEBOX, "https://www.rfc-editor.org/rfc/rfc6455", "https://graphql.org/learn/"],
  "storage-caching-design": [AD("foundation/urlcache"), WEEEBOX],
  "offline-sync-design": [AD("network/nwpathmonitor"), WEEEBOX],
  "realtime-push-design": [AD("usernotifications/registering-your-app-with-apns"), AD("foundation/urlsessionwebsockettask"), WEEEBOX],
  "image-loading-design": [AD("swiftui/asyncimage"), WEEEBOX],
  "security-privacy-design": [AD("security/preventing-insecure-network-connections"), HIG("privacy"), WEEEBOX],
  "design-a-feed": [WEEEBOX],
  "design-a-chat-app": [WEEEBOX, AD("foundation/urlsessionwebsockettask")],
  "design-an-sdk": [API_GUIDE, WEEEBOX],
  "org-scale-design": [AD("xcode/organizing-your-code-with-local-packages"), STAFF],

  // Behavior and Leadership (community allowed)
  "star-method": [TIH("behavioral-interview")],
  "disagreement-conflict": [TIH("behavioral-interview-questions"), TIH("behavioral-interview")],
  mentoring: [DBX("ic3_software_engineer"), TIH("behavioral-interview")],
  "mistakes-incidents": ["https://sre.google/sre-book/postmortem-culture/", TIH("behavioral-interview")],
  "prioritizing-under-pressure": [TIH("behavioral-interview"), DBX("ic2_software_engineer")],
  "influencing-other-teams": [DBX("ic4_software_engineer"), STAFF],
  "technical-vision": [STAFF, DBX("ic5_staff_software_engineer")],
  "design-docs-rfcs": ["https://www.industrialempathy.com/posts/design-docs-at-google/"],
  "build-or-buy": [DBX("ic5_staff_software_engineer")],
  "leading-through-influence": [STAFF, DBX("ic5_staff_software_engineer")],
};

// Hosts whose pages count as official (Apple, Swift project, standards bodies, LLVM).
export const officialHosts = [
  "developer.apple.com", "help.apple.com", "docs.swift.org", "www.swift.org", "swift.org",
  "www.rfc-editor.org", "lldb.llvm.org",
];
export const officialRepoPrefixes = ["https://github.com/swiftlang/", "https://github.com/apple/"];

// Units where the user allowed marked community sources (2026-10-22).
export const communityUnits = ["coding-interview", "mobile-system-design", "behavior-leadership"];
