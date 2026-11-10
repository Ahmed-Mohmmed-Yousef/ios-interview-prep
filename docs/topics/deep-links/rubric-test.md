# Rubric Test: Deep Links and Universal Links

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/deep-links/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## dl-q24 (Written: Security comparison between Universal Links and custom schemes)

### Rubric
- Explains that custom schemes can be hijacked by any malicious app registering the same scheme (40 pts, key)
- Explains that Universal Links use two-way cryptographic verification via apple-app-site-association (30 pts)
- Mentions that Universal Links fall back safely to Safari when the app is not installed (30 pts)

### Good Answer
Universal Links provide significantly better security than custom URL schemes because they prevent scheme hijacking. Any third-party application installed on a user's device can declare an identical custom scheme like `myapp://` and silently intercept incoming OAuth tokens. In contrast, Universal Links establish a two-way cryptographic relationship between the website domain and the app via the `apple-app-site-association` file. Additionally, if the application is not installed on the device, Universal Links fall back safely to opening the destination in Safari rather than failing with an error.

**Score: 100/100**
- [x] Custom scheme hijacking vulnerability explained (40/40)
- [x] Two-way verification via AASA described (30/30)
- [x] Safe Safari fallback for uninstalled apps (30/30)

### Average Answer
Universal Links are safer because another app can register the same custom scheme and steal your user's login tokens. Universal Links also use a server file to prove that you own the web domain, and they open in Safari if the app is missing.

**Score: 85/100**
- [x] Mentions scheme theft by other apps (35/40)
- [x] Mentions server file proving domain ownership (25/30)
- [x] Mentions Safari fallback (25/30)

### Weak Answer
Universal Links use 256-bit AES encryption keys stored in device keychain memory.

**Score: 0/100**
- [ ] Misses scheme hijacking vulnerability (0/40)
- [ ] Misses domain ownership verification (0/30)
- [ ] Misses Safari fallback behavior (0/30)

---

## dl-q25 (Written: apple-app-site-association role and requirements)

### Rubric
- Explains that the file maps allowed URL paths to specific app bundle IDs and team IDs (40 pts, key)
- States that the file must reside in the .well-known folder or root directory over HTTPS (30 pts)
- Specifies that the server must return HTTP 200 without redirects using application/json MIME type (30 pts)

### Good Answer
The `apple-app-site-association` file acts as the server-side anchor of Universal Links by explicitly authorizing which app IDs, combining Team ID and bundle identifier, can handle specific URL paths. It must be hosted over HTTPS either in the `.well-known` subdirectory or at the domain root. Apple's indexing CDN requires that the endpoint responds with HTTP status 200 directly with an `application/json` MIME type, strictly prohibiting HTTP 301 or 302 redirects.

**Score: 100/100**
- [x] Maps paths to bundle IDs and team IDs (40/40)
- [x] Hosted in .well-known or root over HTTPS (30/30)
- [x] Returns HTTP 200 directly without redirects in JSON format (30/30)

### Average Answer
The apple-app-site-association file matches URL paths to your application ID. It must be hosted on your HTTPS server in the .well-known folder. Apple needs it to return HTTP 200 without any redirects.

**Score: 85/100**
- [x] Describes path and app ID matching (35/40)
- [x] Mentions HTTPS and .well-known directory (25/30)
- [x] Mentions HTTP 200 without redirects (25/30)

### Weak Answer
It is an XML file you drag into your Xcode project navigator to configure push tokens.

**Score: 0/100**
- [ ] Incorrect file location and purpose (0/40)
- [ ] Misses hosting requirements (0/30)
- [ ] Misses HTTP status requirements (0/30)

---

## dl-q26 (Written: Handling deep links in SwiftUI and UIKit)

### Rubric
- States that SwiftUI uses the onOpenURL modifier attached to a top-level view (40 pts, key)
- Explains that UIKit scenes receive Universal Links in scene continue userActivity with web browsing type (30 pts)
- Mentions parsing the incoming URL path and query items to update navigation state (30 pts)

### Good Answer
In SwiftUI, applications capture deep links using the `.onOpenURL(perform:)` modifier attached to a top-level WindowGroup or container view. In modern UIKit scene-based applications, Universal Links are delivered to `scene(_:continue:)` inside the scene delegate, where the incoming `NSUserActivity` has an `activityType` equal to `NSUserActivityTypeBrowsingWeb`. Both frameworks then parse the incoming `URLComponents` to extract path segments and query parameters, updating a centralized router or `NavigationPath` to navigate to the target screen.

**Score: 100/100**
- [x] SwiftUI onOpenURL modifier described (40/40)
- [x] UIKit scene continue userActivity with web browsing type (30/30)
- [x] URL parsing to drive navigation updates (30/30)

### Average Answer
SwiftUI handles deep links with the onOpenURL view modifier. In UIKit, scene delegate receives the link in scene continue userActivity with browsing web type. The app parses the URL components to change the screen.

**Score: 85/100**
- [x] Mentions onOpenURL in SwiftUI (35/40)
- [x] Mentions scene continue userActivity in UIKit (25/30)
- [x] Mentions URL parsing for navigation (25/30)

### Weak Answer
You implement applicationDidFinishLaunching and reload the root table view.

**Score: 15/100**
- [ ] Misses onOpenURL modifier (0/40)
- [ ] Misses scene continue userActivity (0/30)
- [x] Vague mention of root view reload (15/30)

---

## dl-q27 (Written: Common testing pitfalls for Universal Links)

### Rubric
- Explains that pasting links into Safari address bar loads the web page, requiring testing via Notes or Messages (50 pts, key)
- Identifies server issues like HTTP redirects or invalid SSL certificates that cause Apple CDN rejection (50 pts)

### Good Answer
One common pitfall is pasting the Universal Link directly into Safari's search bar, which causes Safari to assume the user wants to browse the web rather than open the native app; developers must test links by clicking them from Notes, Mail, or Messages instead. Another frequent pitfall is hosting the `apple-app-site-association` file behind HTTP redirects or using self-signed TLS certificates, which causes Apple's validation CDN to reject the file during app installation.

**Score: 100/100**
- [x] Safari address bar trap and testing via Notes/Mail/Messages (50/50)
- [x] Server redirect and SSL CDN validation failures (50/50)

### Average Answer
A common mistake is pasting the link into Safari, which opens the webpage instead of the app. You should tap it inside Notes or Messages. Another issue is having server redirects on the association file, which Apple blocks.

**Score: 85/100**
- [x] Safari pasting issue and Notes/Messages testing (45/50)
- [x] Association file redirect problem (40/50)

### Weak Answer
Simulator cannot test links because Simulator does not have a physical Wi-Fi antenna.

**Score: 0/100**
- [ ] Irrelevant physical antenna claim (0/50)
- [ ] Misses actual testing pitfalls (0/50)

---

## dl-q28 (Written: Handling deep links requiring authentication)

### Rubric
- Explains that the app buffers or queues the parsed route rather than discarding it (50 pts, key)
- Explains that the app replays the buffered link to navigate to the target screen after authentication finishes (50 pts)

### Good Answer
When an incoming deep link points to a protected screen and the user is currently logged out, the application should never discard the request. Instead, a centralized deep link coordinator parses the target route and buffers it in memory or secure storage. The coordinator presents the authentication flow first; upon successful login or onboarding completion, it retrieves the buffered route and pushes the intended destination onto the navigation hierarchy.

**Score: 100/100**
- [x] Route buffering instead of discarding (50/50)
- [x] Route replay after successful login (50/50)

### Average Answer
If the user is not logged in, the app should save the deep link destination in a variable. Then show the login screen, and once the user logs in, open the saved screen.

**Score: 85/100**
- [x] Saves destination route instead of dropping it (45/50)
- [x] Navigates to saved route after login (40/50)

### Weak Answer
Show an alert saying access denied and shut down the app.

**Score: 0/100**
- [ ] Discards link without buffering (0/50)
- [ ] Destructive UX pattern (0/50)

---

## dl-q29 (Code-write: Route parsing enum)

### Rubric
- Filters out leading slash components from url.pathComponents properly (30 pts)
- Checks for "users" prefix and converts the second component to Int for .profile(id:) (40 pts, key)
- Returns .home for empty path components and .unknown for unmatched patterns (30 pts)

### Good Answer
```swift
import Foundation

enum AppRoute: Equatable {
    case home
    case profile(id: Int)
    case unknown

    static func parse(url: URL) -> AppRoute {
        let parts = url.pathComponents.filter { $0 != "/" }
        if parts.isEmpty {
            return .home
        }
        if parts.first == "users", parts.count > 1, let id = Int(parts[1]) {
            return .profile(id: id)
        }
        return .unknown
    }
}
```

**Score: 100/100**
- [x] Filters slash characters (30/30)
- [x] Correctly extracts users and integer ID (40/40)
- [x] Handles empty path and unknown fallbacks (30/30)

### Average Answer
```swift
import Foundation

enum AppRoute: Equatable {
    case home
    case profile(id: Int)
    case unknown

    static func parse(url: URL) -> AppRoute {
        let parts = url.pathComponents.filter { $0 != "/" }
        if parts.count >= 2 && parts[0] == "users" {
            let id = Int(parts[1]) ?? 0
            return .profile(id: id)
        }
        return .home
    }
}
```

**Score: 75/100**
- [x] Filters slash characters (30/30)
- [x] Extracts users and ID but defaults invalid Int to 0 instead of returning unknown (25/40)
- [x] Misses explicit unknown fallback for non-empty unmatched routes (20/30)

### Weak Answer
```swift
enum AppRoute: Equatable {
    case home
    case profile(id: Int)
    case unknown

    static func parse(url: URL) -> AppRoute {
        return .home
    }
}
```

**Score: 20/100**
- [ ] No path filtering (0/30)
- [ ] Does not parse profile id (0/40)
- [x] Returns home (20/30)

---

## dl-q30 (Code-write: UniversalLinkValidator)

### Rubric
- Checks that url.scheme is lowercase "https" (40 pts, key)
- Checks that url.host matches allowedHost ignoring case (40 pts)
- Handles optional scheme and host safely returning false on failure (20 pts)

### Good Answer
```swift
import Foundation

struct UniversalLinkValidator {
    let allowedHost: String

    func isValid(url: URL) -> Bool {
        if let scheme = url.scheme?.lowercased(), scheme == "https" {
            return url.host?.lowercased() == allowedHost.lowercased()
        }
        return false
    }
}
```

**Score: 100/100**
- [x] Validates lowercase HTTPS scheme (40/40)
- [x] Validates lowercase host match against allowedHost (40/40)
- [x] Safe unwrap returning false on failure (20/20)

### Average Answer
```swift
import Foundation

struct UniversalLinkValidator {
    let allowedHost: String

    func isValid(url: URL) -> Bool {
        guard url.scheme == "https" else { return false }
        return url.host == allowedHost
    }
}
```

**Score: 75/100**
- [x] Checks https scheme (35/40)
- [x] Checks host match but case-sensitive (25/40)
- [x] Safe unwrap (15/20)

### Weak Answer
```swift
struct UniversalLinkValidator {
    let allowedHost: String

    func isValid(url: URL) -> Bool {
        return url.absoluteString.contains("https")
    }
}
```

**Score: 15/100**
- [ ] Fragile substring search instead of scheme validation (10/40)
- [ ] No host matching against allowedHost (0/40)
- [ ] Incomplete safety checks (5/20)

---

## dl-q31 (Code-write: DeepLinkBuffer)

### Rubric
- Stores incoming URL into storedURL property (30 pts)
- Retrieves the stored URL and sets the property back to nil (50 pts, key)
- Returns nil safely when no URL was previously stored (20 pts)

### Good Answer
```swift
import Foundation

class DeepLinkBuffer {
    var storedURL: URL?

    func store(url: URL) {
        storedURL = url
    }

    func retrieveAndClear() -> URL? {
        let url = storedURL
        storedURL = nil
        return url
    }
}
```

**Score: 100/100**
- [x] Stores URL into storedURL (30/30)
- [x] Returns stored URL and resets property to nil (50/50)
- [x] Safely returns nil when empty (20/20)

### Average Answer
```swift
import Foundation

class DeepLinkBuffer {
    var storedURL: URL?

    func store(url: URL) {
        storedURL = url
    }

    func retrieveAndClear() -> URL? {
        let temp = storedURL
        storedURL = nil
        return temp
    }
}
```

**Score: 100/100**
- [x] Stores URL (30/30)
- [x] Clears stored URL on retrieval (50/50)
- [x] Returns nil when unpopulated (20/20)

### Weak Answer
```swift
class DeepLinkBuffer {
    var storedURL: URL?

    func store(url: URL) {
        // empty
    }

    func retrieveAndClear() -> URL? {
        return storedURL
    }
}
```

**Score: 20/100**
- [ ] Fails to store incoming URL (0/30)
- [ ] Does not clear stored URL (0/50)
- [x] Returns optional URL safely (20/20)
