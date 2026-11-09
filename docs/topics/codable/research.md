# Research — Codable and JSON (Step 1)

**Topic**: `codable`  
**Level**: Junior  
**Target Baseline**: Swift 6.4, iOS 18+ SDK  
**Sources**:
- [Apple Developer Documentation: Codable](https://developer.apple.com/documentation/swift/codable)
- [Apple Developer Documentation: Encoding and Decoding Custom Types](https://developer.apple.com/documentation/foundation/encoding-and-decoding-custom-types)
- [Apple Developer Documentation: JSONDecoder](https://developer.apple.com/documentation/foundation/jsondecoder)
- [Apple Developer Documentation: JSONEncoder](https://developer.apple.com/documentation/foundation/jsonencoder)

---

## 1. Key Concepts & Compiler Mechanics

### A. The Codable Typealias
- `Codable` is a typealias combining `Encodable & Decodable`:
  ```swift
  typealias Codable = Encodable & Decodable
  ```
- `Encodable`: Types that can encode themselves into an external representation (`func encode(to encoder: Encoder) throws`).
- `Decodable`: Types that can decode themselves from an external representation (`init(from decoder: Decoder) throws`).
- Standard Swift types like `String`, `Int`, `Double`, `Bool`, `Date`, `Data`, `URL`, `Array`, and `Dictionary` conform to `Codable`.

### B. Automatic Conformance Synthesis
- When a struct or class declares conformance to `Codable`, and all stored properties conform to `Codable`, the Swift compiler synthesizes:
  1. The `CodingKeys` enumeration.
  2. `init(from decoder: Decoder) throws`.
  3. `func encode(to encoder: Encoder) throws`.

### C. Custom Property Mapping with `CodingKeys`
- To map external JSON keys (e.g., snake_case) to Swift property names (camelCase), declare a nested enum conforming to `CodingKey`:
  ```swift
  enum CodingKeys: String, CodingKey {
      case id
      case fullName = "full_name"
  }
  ```
- Rule: If you supply a custom `CodingKeys` enum, every stored property that participates in encoding/decoding must have a matching case. Properties omitted from `CodingKeys` must have default values and cannot be synthesized by the compiler.

### D. JSONDecoder & JSONEncoder Configuration
- `JSONDecoder().decode(Type.self, from: data)`
- `JSONEncoder().encode(instance)`
- Configuration strategies:
  - `keyDecodingStrategy = .convertFromSnakeCase`: Automatically converts keys like `created_at` to `createdAt`.
  - `dateDecodingStrategy = .iso8601`, `.secondsSince1970`, `.millisecondsSince1970`, `.formatted(DateFormatter)`
  - `keyEncodingStrategy = .convertToSnakeCase`

### E. Custom Decoding Logic
- Implement `init(from decoder: Decoder) throws` when:
  1. Setting custom fallback defaults for missing or null fields (`decodeIfPresent(...) ?? defaultValue`).
  2. Parsing polymorphic or nested structures.
  3. Transforming types during decoding (e.g., string to URL, int to enum).
- Key containers:
  - `decoder.container(keyedBy: CodingKeys.self)` (for keyed JSON objects `{ ... }`)
  - `decoder.unkeyedContainer()` (for JSON arrays `[ ... ]`)
  - `decoder.singleValueContainer()` (for raw primitive values)

### F. Decoding Errors
- Thrown as `DecodingError` enum cases:
  - `.keyNotFound(CodingKey, Context)`: A required key was missing from JSON.
  - `.typeMismatch(Any.Type, Context)`: Expected type (e.g. Int) does not match JSON type (e.g. String).
  - `.valueNotFound(Any.Type, Context)`: A non-optional key contained null.
  - `.dataCorrupted(Context)`: Malformed JSON syntax or invalid encoding.

---

## 2. Common Interview Traps

1. **Forgetting properties in custom `CodingKeys`**: If you define `CodingKeys` to rename one property, you must list all other properties you wish to encode/decode as well.
2. **Confusing `.convertFromSnakeCase` with custom keys**: If you define custom `CodingKeys` with raw strings AND set `keyDecodingStrategy = .convertFromSnakeCase`, the decoder applies snake_case conversion to the raw string values, which can lead to unexpected key mismatches.
3. **Crashing on missing fields with non-optionals**: If a property is declared non-optional without a default value in custom `init(from decoder:)`, a missing key throws `.keyNotFound`.
4. **Encoding classes with superclasses**: Subclasses must call `super.init(from: decoder)` and `super.encode(to: encoder)` or encode superclass properties manually.

---

## 3. Interview Answers by Level

- **Fresh**: `Codable` is a protocol in Swift that combines `Encodable` and `Decodable`. We use it to convert Swift structs into JSON and parse JSON into Swift types using `JSONEncoder` and `JSONDecoder`. We use `CodingKeys` to rename JSON keys.
- **Junior**: `Codable` is a typealias for `Encodable & Decodable`. The Swift compiler synthesizes encoding and decoding methods automatically when all stored properties conform to `Codable`. When JSON keys use snake_case and Swift properties use camelCase, we can map keys using a custom `CodingKeys` enum or configure `keyDecodingStrategy = .convertFromSnakeCase`. When fields may be absent or require fallback values, we implement custom `init(from decoder: Decoder)` using `decodeIfPresent`.
- **Senior**: `Codable` provides type-safe, compile-time serialization architecture without reflection overhead. It separates format-agnostic data structures from serialization formats like JSON, PropertyList, or Protocol Buffers. In production architectures, we configure `JSONDecoder` with ISO8601 date strategies and snake_case strategies to minimize boilerplate. For resilient networking, we leverage custom decoding containers, handle `DecodingError` cases with granular telemetry, and use wrapper property wrappers to provide safe fallbacks for optional or corrupted remote payloads.
