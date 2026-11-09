# Rubric Test — Apple Design and Liquid Glass (Step 5)

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
| **q24** HIG core themes: Clarity, Deference, and Depth | **Good:** Defines Clarity as legible typography, precise icons, and intuitive controls; Deference as UI receding so content is the primary focus; Depth as using layers, shadows, and materials for spatial hierarchy. | 100 | Yes | Pass (100%) |
| | **Average:** "Clarity means readable text. Deference means content is the star. Depth means using visual layers." | 85 | Yes | Pass (85%) |
| | **Weak:** "The themes are speed, memory usage, and Swift 6 concurrency." | 0 | No | Fail (0%) |
| **q25** Liquid Glass purpose and placement rules | **Good:** Explains Liquid Glass is a translucent spatial material providing depth and contextual awareness; belongs on navigation bars and floating chrome, never over core reading content. | 100 | Yes | Pass (100%) |
| | **Average:** "Liquid Glass is a frosted material for toolbars so background colors show through." | 85 | Yes | Pass (85%) |
| | **Weak:** "Liquid Glass is a screen protector sold in Apple Stores." | 0 | No | Fail (0%) |
| **q26** Stacking glass on glass drawbacks | **Good:** Explains stacking glass causes visual noise, muddy colors, and loss of contrast; recommends using solid opaque colors for elements inside translucent containers. | 100 | Yes | Pass (100%) |
| | **Average:** "Stacking glass ruins contrast and makes text blurry. Use solid cards instead." | 85 | Yes | Pass (85%) |
| | **Weak:** "Stacking glass causes an immediate fatal memory crash in iOS." | 0 | No | Fail (0%) |
| **q27** `UIVibrancyEffect` legibility mechanism | **Good:** Explains static text disappears when underlying content colors change behind blurred materials; vibrancy filters light through the material to dynamically maintain contrast. | 100 | Yes | Pass (100%) |
| | **Average:** "Vibrancy adapts text brightness so labels stay readable over changing blurred backgrounds." | 80 | Yes | Pass (80%) |
| | **Weak:** "Vibrancy triggers haptic vibrations on device button presses." | 0 | No | Fail (0%) |
| **q28** Reduce Transparency accessibility handling | **Good:** Explains Reduce Transparency assists low-vision users by removing blur and translucency; custom components must inspect the setting and render solid opaque backgrounds. | 100 | Yes | Pass (100%) |
| | **Average:** "When Reduce Transparency is on, you should replace blur materials with solid colors." | 80 | Yes | Pass (80%) |
| | **Weak:** "Reduce Transparency makes the screen completely black to save battery." | 0 | No | Fail (0%) |
| **q29** `GlassEffectFactory` makeBlurView method | **Good:** Declares `GlassEffectFactory` with `@MainActor static func makeBlurView(style:)` creating `UIVisualEffectView` with `UIBlurEffect`, setting `clipsToBounds = true`, and returning it. | 100 | Yes | Pass (100%) |
| | **Average:** Creates effect view with blur, but forgets to set `clipsToBounds = true`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not create visual effect view or fails to compile. | 25 | No | Fail (25%) |
| **q30** `VibrantContainerFactory` makeVibrantContainer method | **Good:** Declares `VibrantContainerFactory` with `@MainActor static func makeVibrantContainer(blurEffect:)` constructing `UIVibrancyEffect` with `.label` style and returning `UIVisualEffectView`. | 100 | Yes | Pass (100%) |
| | **Average:** Creates vibrancy effect, but fails to assign it to an effect view before returning. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not construct vibrancy effect or fails to compile. | 25 | No | Fail (25%) |
| **q31** `AccessibilityColorResolver` resolveBackgroundColor method | **Good:** Declares `AccessibilityColorResolver` with `static func resolveBackgroundColor(reduceTransparency:)` returning `.systemBackground` when true and `.clear` when false. | 100 | Yes | Pass (100%) |
| | **Average:** Returns system background, but returns white instead of clear when false. | 70 | Yes | Pass (70%) |
| | **Weak:** Fails to check boolean or fails to compile. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Assess foundational HIG themes (Clarity, Deference, Depth).
2. Validate placement rules for Liquid Glass and materials (navigation chrome vs body content).
3. Enforce the "never glass on glass" contrast rule.
4. Test understanding of `UIVibrancyEffect` dynamic contrast filtering.
5. Verify proper handling and fallback for the Reduce Transparency accessibility setting.
6. Check code implementations of blur factories, vibrancy containers, and accessibility resolvers.
