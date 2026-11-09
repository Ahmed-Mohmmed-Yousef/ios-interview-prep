# Research: Forms and User Input

## 1. Core Concepts & Technical Facts

### What is `Form` in SwiftUI?
- `Form` is a specialized container view tailored for data entry, settings screens, and task inspectors.
- Adapts to system conventions per platform:
  - On iOS / iPadOS: Automatically styles child controls using an inset grouped list appearance (`UITableViewStyleInsetGrouped` / `UICollectionViewListLayout`).
  - On macOS: Renders as a structured vertical grid with aligned trailing labels and leading controls.
  - On watchOS and tvOS: Adapts controls for small screens and focus engines.

### Key Input Controls
1. **`TextField` & `SecureField`**:
   - `TextField(title, text: $binding)`: Captures single-line text input. Supports placeholder prompts, formatters (e.g. `format: .number`), `.keyboardType`, and `.textContentType` for system autofill (e.g. `.emailAddress`, `.oneTimeCode`).
   - `SecureField(title, text: $binding)`: Obscures typed text for passwords or PINs. Prevents clipboard leakage and disables system text suggestions.
2. **`Toggle`**:
   - `Toggle(title, isOn: $binding)`: Two-state on/off switch. In iOS forms, automatically displays label on the leading side and standard switch on the trailing side.
3. **`Picker`**:
   - `Picker(title, selection: $binding) { ... }`: Selects from mutually exclusive options.
   - Requires each option to have a matching tag type corresponding to the `$selection` type. If using an `Identifiable` enum or `ForEach(Theme.allCases, id: \.self)`, the tag is inferred or explicit (`.tag(theme)`).
   - Styles: `.pickerStyle(.menu)` (default in forms on recent iOS), `.segmented`, `.wheel`, and `.navigationLink`.
4. **`Stepper` & `Slider`**:
   - `Stepper(title, value: $binding, in: range, step: step)`: Increment/decrement numerical values with dedicated +/- buttons.
   - `Slider(value: $binding, in: range)`: Continuous numerical drag control.
5. **`Section`**:
   - Groups related form controls with optional `header:` and `footer:` text.
   - Automatically provides standard section spacing, dividers, and background cards.

### Focus Management & Validation
- **`@FocusState`** (iOS 15+):
  - Manages which input field currently has keyboard focus.
  - Can be a Boolean (`@FocusState private var isFocused: Bool`) or an Enum (`enum Field { case username, password }; @FocusState private var focusedField: Field?`).
  - Setting `focusedField = nil` or `isFocused = false` dismisses the software keyboard programmatically.
- **Form Submission & Disabling**:
  - `.onSubmit { ... }`: Triggered when the user taps Return / Done on the virtual keyboard.
  - `.disabled(!isFormValid)`: Disables buttons or entire sections when validation criteria fail.

---

## 2. Common Misconceptions & Interview Traps

1. **"Missing `.tag()` on Picker options"**:
   - *Correction*: If the selection type is `Theme` and the child views inside `Picker` do not provide `.tag(theme)` (or the tag type does not match the `$selection` type exactly), picking an option fails to update the bound variable.
2. **"Dismissing keyboard via UIKit responders in modern SwiftUI"**:
   - *Correction*: In older code, developers called `UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder)...)`. Modern SwiftUI (iOS 15+) provides native `@FocusState`.
3. **"`Form` is just a `VStack` with padding"**:
   - *Correction*: `Form` changes the environment and default component styling (e.g., standard row heights, accessory styling, navigation link presentation for pickers). A `VStack` does not provide native platform styling or lazy list performance.
4. **"Binding formatters mutate raw text directly"**:
   - *Correction*: Using `TextField("Age", value: $age, format: .number)` parses input through the formatter and only updates the underlying integer when a valid number is entered.
5. **"Password input in regular TextField"**:
   - *Correction*: Using `TextField` for sensitive credentials exposes text to screenshot utilities, keyboard autocorrect cache, and third-party keyboard extensions. Always use `SecureField`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: `Form` is a SwiftUI view for settings and data input screens. It groups controls like `TextField`, `Toggle`, and `Picker` into sections. Each control connects to state using two-way bindings with `$`.
- **Junior**:
  - Focus: Difference between `Form`, `List`, and `VStack`. Working with `@FocusState` to manage keyboard focus and dismissal. Setting picker styles (`.menu`, `.segmented`, `.navigationLink`) and ensuring picker tags match selection types. Structuring form validation with computed properties and `.disabled()`.
- **Senior**:
  - Focus: Platform adaptation of `Form` between iOS grouped tables and macOS grids. Accessibility considerations (Dynamic Type scaling, VoiceOver labels, `.textContentType` for password managers). Custom form components using `LabeledContent`. Architectural separation between form view hierarchy and validation business logic in `@Observable` view models.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Form**:
   - https://developer.apple.com/documentation/swiftui/form
2. **Apple Developer Documentation: TextField**:
   - https://developer.apple.com/documentation/swiftui/textfield
3. **Apple Developer Documentation: FocusState**:
   - https://developer.apple.com/documentation/swiftui/focusstate
