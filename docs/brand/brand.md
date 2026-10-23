# Name and Brand (Step 3.2)

Checked 2026-10-23. Interactive board: [Brand Board](https://claude.ai/artifact/Ai3rDph8YXX39ycWy7qZdv) (private link).

## Decisions (from the user)

| Question | Decision |
|---|---|
| Name style | **Journey words** (path, road, trail, route, stop) |
| Tagline | **"Interview prep for iOS developers"**, shown under the name, smaller than the name |
| Voice | **Friendly coach**: warm and encouraging, but honest. Short, simple sentences |
| Changing the name later | **Must stay easy**: the name lives in one config file only |
| Name | **Prep Stops** (picked 2026-10-23) |
| Direction | **A · Calm Trail** (picked 2026-10-23) |

**Where the brand lives:** `config/brand.json` holds the name, short name, tagline, direction, fonts and all colors for light and dark mode. It is the **only** place. To rename the app, change `name` and `shortName` there. `node scripts/check-brand.mjs` checks four things:
- no Apple trademark in the name
- every color pair passes WCAG AA
- the name never appears in app code
- every required field is present

## Rules from Apple's trademark guidelines

Source: [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html), [Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html).

- Apple trademarks may **not** be part of a product, company or service name. Made-up names that contain them are not allowed either.
- Swift, SwiftUI, Swift Playground, Xcode, iPhone, iPad, TestFlight and Apple are on Apple's trademark list. "iOS" is a trademark of Cisco, used by Apple under license.
- A **referential** phrase such as "for iOS developers" is allowed if it is not part of the name, is less prominent than the name, and does not suggest that Apple endorses the app.
- So: **no iOS, Swift, Xcode or Apple in the name.** The tagline may say "for iOS developers". Never use the Apple logo.

## Name options

The checks were run on 2026-10-23:
- **App Store:** apps whose title contains the exact name, via the iTunes Search API.
- **Domains:** each registry's RDAP service (Verisign for `.com`, Google Registry for `.app` and `.dev`).
- **The web:** searches for the same name in interview prep.

This is **not** a legal trademark search. Do one before launch.

| Name | App Store | .com | .app | .dev | Notes |
|---|---|---|---|---|---|
| Prep Trail | none | taken | free | free | Short. "Trail" fits the road map |
| Interview Trail | none | taken | free | free | Clear about what it is |
| Interview Route | none | taken | free | free | "Route" is a common word worldwide |
| Prep Stops | none | **free** | free | free | The only name with a free `.com`. Stops = topics on the road |
| Stop by Stop | none | taken | free | free | Says how you learn: one stop at a time |
| Milestone Prep | none | taken | free | free | A well-known word, a little long |
| Dev Road | none | taken | free | free | Very short; less clear that it is about interviews |

**Dropped:**
- **Road to Offer** — an existing interview-prep brand (consulting): [roadtooffer.com](https://www.roadtooffer.com/about).
- **Interview Road** — an existing App Store app (Education).
- **Offer Road** — too close to Road to Offer and to OfferTrail.
- **Waypoints, Pathwise, Trailhead, Signpost, Mile Marker, Next Stop, Stepstone, Hire Path, Code Trail** — taken or used by many apps.

## Visual directions

All three keep the calm and friendly feel. All pass WCAG AA contrast in light and dark mode:
- body text: 14.5:1 or more
- button text: 5.9:1 or more
- small grey text: 6.0:1 or more

| Direction | Typeface | Colors | Why |
|---|---|---|---|
| **A · Calm Trail** | Lexend | violet primary, green for passed, amber for wrong | The pilot's look. Lexend was designed to make reading easier |
| **B · Morning Route** | Nunito | blue primary, amber marker | Rounder and warmer |
| **C · Clear Map** | Atkinson Hyperlegible Next | teal primary, orange marker | Made for clarity, for example for readers with low vision |

Code always uses JetBrains Mono. All fonts load from Google Fonts (checked).

**Logo idea:** a rounded square in the primary color, with a dotted winding road and three stops. It stays simple, so it also works as a small app icon.

## Voice guide (friendly coach)

- **Encourage effort, be honest about mistakes:** "Not quite. Here is why." Never "Wrong!" and never sarcasm.
- **Celebrate briefly:** "You passed! The next stop is open." No long praise.
- **Say what to do next:** every result ends with one clear next step.
- **No jokes, slang or idioms** (see the plain-English rule). No emojis in learner text.
- **Talk to the learner as "you"**, in short, active sentences.
