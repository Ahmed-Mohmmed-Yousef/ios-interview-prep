# Research: Dark Mode and Dynamic Type

## 1. Core Concepts & Technical Facts

### Dark Mode & Semantic Colors
- **HIG Principles**: Dark Mode is an appearance preference that shifts to a darker color palette while keeping content legible and comfortable in low-light environments.
- **Semantic Colors**:
  - Instead of hardcoded RGB values (e.g. `UIColor.white` or `Color.black`), Apple provides semantic colors that automatically resolve to appropriate light or dark shades.
  - **UIKit**: `UIColor.systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`, `label`, `secondaryLabel`, `tertiaryLabel`, `systemBlue`, etc.
  - **SwiftUI**: `Color.primary`, `Color.secondary`, system background materials (`.background(.regularMaterial)`), and standard semantic colors.
  - **Dynamic Colors in Asset Catalog**: Developers define color assets with "Any Appearance" and "Dark Appearance" variants. Asset catalogs handle switching automatically.
  - **Custom Dynamic Colors in Code**:
    ```swift
    let dynamicColor = UIColor { traitCollection in
        traitCollection.userInterfaceStyle == .dark ? .black : .white
    }
    ```
- **Trait Changes in iOS 17+**:
  - Overriding `traitCollectionDidChange(_:)` was deprecated in iOS 17.
  - The modern replacement is `registerForTraitChanges` from `UITraitChangeObservable`.
  - Views and view controllers register closures for specific trait sets:
    ```swift
    registerForTraitChanges(UITraitCollection.systemTraitsAffectingColorAppearance) { (self: Self, previous: UITraitCollection) in
        self.updateAppearance()
    }
    ```
  - UIKit closures provide `self: Self` as first parameter to avoid retain cycles without `[weak self]`.
- **SwiftUI Appearance Control**:
  - Read environment: `@Environment(\.colorScheme) private var colorScheme`.
  - Override for preview or subview: `.preferredColorScheme(.dark)` or `.environment(\.colorScheme, .dark)`.

### Dynamic Type & Typography
- **HIG Principles**: Dynamic Type allows users to choose their preferred text size across the entire operating system in Settings > Accessibility > Display & Text Size.
- **Semantic Text Styles**:
  - Standard styles: `.largeTitle`, `.title`, `.headline`, `.body`, `.callout`, `.subheadline`, `.footnote`, `.caption1`, `.caption2`.
  - In SwiftUI, using standard styles scales automatically: `Text("Headline").font(.headline)`.
  - In UIKit:
    ```swift
    label.font = UIFont.preferredFont(forTextStyle: .body)
    label.adjustsFontForContentSizeCategory = true
    label.numberOfLines = 0
    ```
  - **Custom Fonts**:
    - Must be scaled using `UIFontMetrics`:
      ```swift
      let customFont = UIFont(name: "Avenir", size: 16)!
      label.font = UIFontMetrics(forTextStyle: .body).scaledFont(for: customFont)
      ```
- **Scaling Non-Text Elements with `@ScaledMetric`**:
  - Non-text elements (icons, badges, padding, spacing) do not scale automatically with text styles.
  - SwiftUI provides `@ScaledMetric`:
    ```swift
    @ScaledMetric(relativeTo: .body) var iconSize: CGFloat = 24
    @ScaledMetric var padding: CGFloat = 16
    ```
- **Adaptive Layouts**:
  - When text grows large (especially under Accessibility text sizes like `.accessibility1` through `.accessibility5`), horizontal layouts often run out of space.
  - Inspecting size: `@Environment(\.dynamicTypeSize) private var dynamicTypeSize`.
  - Checking `dynamicTypeSize.isAccessibilitySize` lets developers switch from `HStack` to `VStack`.
  - SwiftUI `ViewThatFits` automatically selects the best layout (e.g. `HStack` if it fits, falling back to `VStack`).
- **Limiting Dynamic Type Range**:
  - Uncontrolled scaling can break compact controls (like tab bars or narrow badges).
  - SwiftUI provides `.dynamicTypeSize(...DynamicTypeSize.accessibility2)` or `.dynamicTypeSize(.medium ... .accessibility1)` to clamp the scaling range safely.

---

## 2. Common Misconceptions & Interview Traps

1. **"Hardcoding black and white colors"**:
   - *Trap*: Using `UIColor.white` for cell background and `UIColor.black` for text.
   - *Consequence*: When the user turns on Dark Mode, the background stays blinding white or text disappears into a black background.
   - *Fix*: Use `UIColor.systemBackground` and `UIColor.label` (or SwiftUI `Color.primary`).
2. **"Forgetting `adjustsFontForContentSizeCategory` in UIKit"**:
   - *Trap*: Setting `label.font = UIFont.preferredFont(forTextStyle: .body)` and assuming it auto-updates when the user changes text size in Control Center.
   - *Consequence*: The font only sets once at launch and ignores live system text size changes.
   - *Fix*: Always set `label.adjustsFontForContentSizeCategory = true`.
3. **"Fixed label height constraints"**:
   - *Trap*: Pinning a label's height with Auto Layout (`heightAnchor.constraint(equalToConstant: 24)`).
   - *Consequence*: When text scales up with Dynamic Type, the label clips or truncates text.
   - *Fix*: Never lock label heights. Set `numberOfLines = 0` and rely on intrinsic content size.
4. **"Deprecated `traitCollectionDidChange` in modern iOS"**:
   - *Trap*: Overriding `traitCollectionDidChange` in iOS 17+ codebases.
   - *Consequence*: Deprecation warnings and inefficient global trait checks.
   - *Fix*: Use `registerForTraitChanges` targeted at specific traits.
5. **"Ignoring non-text scaling"**:
   - *Trap*: Text scales to huge sizes while accompanying icons stay tiny (16pt), making the interface unbalanced.
   - *Fix*: Wrap numeric sizes with `@ScaledMetric` in SwiftUI.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "Dark Mode adapts the app to dark backgrounds using semantic colors like `systemBackground` and `label`. Dynamic Type lets users change system font size. In UIKit we set `preferredFont` and `adjustsFontForContentSizeCategory = true`. In SwiftUI, standard font styles scale automatically."
- **Junior**:
  - "We support Dark Mode by using semantic colors and Asset Catalog color sets with Light and Dark variants. For Dynamic Type, we use standard text styles, multiline labels with zero height constraints, and `@ScaledMetric` in SwiftUI for icons. In iOS 17+, we observe appearance updates with `registerForTraitChanges`."
- **Senior**:
  - "Supporting accessibility and appearances requires semantic tokens and responsive layout hierarchies. We use semantic system colors and materials for proper contrast elevation. For Dynamic Type, we scale custom typefaces with `UIFontMetrics`, adapt horizontal stacks to vertical stacks using `ViewThatFits` or `isAccessibilitySize`, and clamp scaling where necessary with `.dynamicTypeSize`."
