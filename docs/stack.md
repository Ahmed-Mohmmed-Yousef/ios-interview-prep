# Tech Stack Decision

Verified by web search on **2026-10-22**. Re-verify versions before scaffolding (Phase 5) and before launch.

## Chosen stack

| Area | Choice | Verified facts | Source |
|---|---|---|---|
| Framework | **Next.js 16.x** (App Router, TypeScript) | Latest: 16.4 (2026-10-06), security update 2026-10-14 | [nextjs.org/blog](https://nextjs.org/blog) |
| Lessons | **MDX via `@next/mdx`** | Official support, works in Server Components. No frontmatter by default → use `export const meta = {...}`. Turbopack needs plugin names as strings | [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx) |
| Question banks | **JSON per topic, validated with a schema (Zod)** | — | — |
| Styling | **Tailwind CSS v4** | Latest: v4.3 (2026-05-08); config lives in CSS via `@theme` | [tailwindcss.com/blog](https://tailwindcss.com/blog) |
| Components | **shadcn/ui** | Base UI is the default primitive since Jul 2026 (Radix still supported) | [shadcn changelog](https://ui.shadcn.com/docs/changelog) |
| Animation | **Motion** (`motion` package, import from `motion/react`) | Successor to Framer Motion; `motion/react-client` entry for Server Components | [motion.dev](https://motion.dev/docs/react-installation) |
| Code highlighting | **Shiki** | v4.5.0 current; `swift` grammar bundled | [shiki.style](https://shiki.style/languages) |
| Progress storage | **Zustand `persist` + localStorage** | `version` + `migrate` for schema changes; `skipHydration` for SSR | [Zustand persist docs](https://zustand.docs.pmnd.rs/middlewares/persist) |
| AI grading | **Gemini API free tier** (Flash / Flash-Lite), behind a provider interface | Free tier exists for several Flash models. Free-tier data **is used to improve Google products**. Limits are per project, visible only in AI Studio | [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) |
| AI fallback | **Groq** or **OpenRouter `:free` models** | Both rate-limited; OpenRouter free daily cap depends on lifetime credit purchases | [OpenRouter guide](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/) |
| Bot protection | **Cloudflare Turnstile** | Free, unlimited challenges, 20 widgets | [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/) |
| Rate limiting | **Upstash Redis + `@upstash/ratelimit`** | Free: 500K commands/month, 256 MB (per Upstash blog; confirm on pricing page) | [Upstash pricing change](https://upstash.com/blog/redis-new-pricing) |
| Hosting | **Vercel Hobby** | Free, **non-commercial only**: no ads, no payments. Donations allowed. 1M function invocations, 100 GB transfer/month | [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines) |
| Later: login | **Supabase** | Free: 500 MB DB, 50K MAU, pauses after 1 week inactive, 2 active projects | [supabase.com/pricing](https://supabase.com/pricing) |

## Content baseline (for lessons)

| | Version | Source |
|---|---|---|
| Xcode | 27.1 (27.2 RC available) | [Latest Xcode versions](https://developer.apple.com/support/xcode/) |
| Swift | 6.4 | same |
| iOS SDK | 27.1 | same |

Swift book (`swiftlang/swift-book`) is **Apache-2.0** — quoting with attribution is allowed. Apple Developer Documentation is not open-licensed — paraphrase and link only.

## Consequences

- **Vercel Hobby forbids ads/payments.** If the app is ever monetized, move to Pro ($20/user/month) or another host.
- **Don't send personal data to the Gemini free tier.** Exam answers are fine; never send names or emails.
- **"Write code" questions use an AI rubric review, not execution.** Judge0's changelog lists only Swift 5.2.3 (latest Judge0 release v1.13.1, 2024-04-18), which is too old. Real Swift execution is Phase 8 (e.g. a self-hosted Swift container).
- **Deterministic grading in the browser** for MCQ and code-reading questions — no AI cost, works offline.
- **Lottie not yet verified** — decide in Phase 3 (design) whether Motion + SVG is enough.
