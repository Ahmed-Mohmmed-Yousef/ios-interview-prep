# Deep Links and Universal Links Research

**Topic ID:** `deep-links`  
**Level:** Mid  
**Date:** 2026-11-10  
**Author:** Curriculum Production Agent  

---

## 1. Official Documentation & Authoritative Sources

1. **Supporting universal links in your app (Xcode)**  
   https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app  
   *`Associated Domains` entitlement (`applinks:<domain>`), `apple-app-site-association` (AASA) JSON file format, path routing rules.*

2. **Defining a custom URL scheme for your app (Apple Developer)**  
   https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app  
   *`CFBundleURLTypes` in `Info.plist`, scheme syntax (`myapp://`), security considerations and scheme hijacking risks.*

3. **onOpenURL(perform:) (SwiftUI)**  
   https://developer.apple.com/documentation/swiftui/view/onopenurl(perform:)  
   *Modifier for handling incoming URLs from custom schemes and universal links across SwiftUI view hierarchies.*

4. **Handling universal links in UIKit (UISceneDelegate)**  
   https://developer.apple.com/documentation/uikit/uiscenedelegate/3238059-scene  
   *`scene(_:continue:userActivity:)` with `NSUserActivityTypeBrowsingWeb` and `userActivity.webpageURL`.*

5. **Apple App Site Association (AASA) Specification**  
   https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links  
   *Path `/ .well-known/apple-app-site-association`, requirements: HTTPS, no redirects, `application/json` content-type, Apple CDN caching.*

---

## 2. Key Technical Concepts

### Custom URL Schemes vs Universal Links
| Feature | Custom URL Schemes (`myapp://`) | Universal Links (`https://example.com/`) |
|---|---|---|
| **Format** | Proprietary scheme (e.g. `slack://`, `twitter://`) | Standard HTTPS web URL |
| **Security** | Insecure: any app can declare the same scheme | Secure: two-way cryptographic verification |
| **Fallback** | Fails with error if app is not installed | Gracefully opens website in Safari |
| **Setup** | `Info.plist` (`CFBundleURLTypes`) | `Associated Domains` + server AASA file |
| **Best Use** | Internal app shortcuts, local debugging | Production sharing, OAuth redirects, user links |

### The Universal Links Handshake (AASA File)
- **Server side**:
  - Host JSON file at `https://<domain>/.well-known/apple-app-site-association`.
  - Must return HTTP 200 with valid SSL certificate.
  - **No HTTP redirects (301 or 302) allowed**.
  - Must serve `Content-Type: application/json`.
  - Structure:
    ```json
    {
      "applinks": {
        "apps": [],
        "details": [
          {
            "appID": "<TeamID>.<BundleID>",
            "paths": [ "/products/*", "/profile/*" ]
          }
        ]
      }
    }
    ```
- **App side**:
  - Add `Associated Domains` capability in Xcode.
  - Add entry: `applinks:example.com` (or `applinks:example.com?mode=developer` for local testing).

### URL Handling in Code
1. **SwiftUI**:
   ```swift
   .onOpenURL { url in
       deepLinkRouter.handle(url: url)
   }
   ```
2. **UIKit**:
   - Universal Links:
     ```swift
     func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
         guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
               let url = userActivity.webpageURL else { return }
         deepLinkRouter.handle(url: url)
     }
     ```
   - Custom URL Schemes:
     ```swift
     func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
         guard let url = URLContexts.first?.url else { return }
         deepLinkRouter.handle(url: url)
     }
     ```

### Parsing and Deep Link Routing
- Use `URLComponents(url:resolvingAgainstBaseURL:)`.
- Extract `components.path` and query parameters via `components.queryItems`.
- Map path components (e.g. `["products", "42"]`) to enum destination routes (`.product(id: 42)`).
- Update navigation state (`NavigationPath` or navigation controller).

---

## 3. Common Interview Questions by Level

### Fresh / Junior Level
- What is a deep link, and why do apps use them?
- What is the difference between a custom URL scheme and a Universal Link?
- What happens if a user taps a Universal Link on a device without your app installed?
- How do you handle an incoming URL in a SwiftUI application?

### Mid Level
- Explain the end-to-end setup of Universal Links (AASA file + Associated Domains entitlement).
- Why should you never use custom URL schemes for OAuth callbacks or sensitive actions?
- How does Universal Link handling differ between cold launch (app was dead) and warm launch (app was running)?
- Why does pasting a Universal Link into Safari's search bar not open the native app?

### Senior / Staff Level
- How do you design a centralized, decoupled Deep Link Router that supports authentication gates and deferred routing?
- What are deferred deep links, and how are they implemented when onboarding a new user via the App Store?
- How do you debug and diagnose Apple CDN AASA caching delays or configuration errors in enterprise staging environments?
