# Tech Stack Decision

Verified by web search on **2026-10-22**; analytics, AI fallback, reports and login rows on **2026-11-09**. Re-verify versions before scaffolding (Phase 5) and before launch.

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
| AI fallback | **Cloudflare Workers AI** (decided 2026-11-09; replaces Groq / OpenRouter) | Free plan: 10,000 Neurons/day, reset 00:00 UTC. Over the limit, calls fail with an error (no pay-as-you-go on the free plan), so it is a backup only. Some newer models need a paid plan | [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) |
| Bot protection | **Cloudflare Turnstile** | Free, unlimited challenges, 20 widgets | [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/) |
| Rate limiting | **Upstash Redis + `@upstash/ratelimit`** | Free: 500K commands/month, 256 MB (per Upstash blog; confirm on pricing page) | [Upstash pricing change](https://upstash.com/blog/redis-new-pricing) |
| Hosting | **Vercel Hobby** | Free, **non-commercial only**: no ads, no payments. Donations allowed. 1M function invocations, 100 GB transfer/month | [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines) |
| Analytics | **Cloudflare Web Analytics** (decided 2026-11-09) | Free, "privacy-first", does not collect visitors' personal data. Works with a JS beacon, without moving DNS or traffic to Cloudflare | [Web Analytics](https://developers.cloudflare.com/web-analytics/about/) |
| Problem reports + question stats | **Cloudflare D1** behind a small Cloudflare Worker (decided 2026-11-09, after launch) | D1 free: 5 GB, 5M rows read/day, 100K rows written/day, 10 databases. Workers free: 100K requests/day, 10 ms CPU per request. Anonymous data only | [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) |
| Later: login | **Firebase Authentication + Cloud Firestore**, Spark plan (decided 2026-11-09; replaces Supabase) | Auth: 50K MAU, no phone sign-in on Spark. Firestore: 1 GiB stored, 10 GiB/month egress, 50K reads, 20K writes, 20K deletes per day. Cloud Functions and Cloud Storage are **not** on Spark, so server code stays in the Next.js app (Firebase Admin SDK) | [Firebase pricing](https://firebase.google.com/pricing) |

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
- **Firebase free (Spark) does not fit hosting:** Hosting allows only 360 MB/day transfer. Stay on Vercel. (Checked 2026-11-09.)
- **Cloudflare hosting is the plan B** if the app ever needs ads, payments or sponsors (Vercel Hobby forbids them). Next.js runs there through the OpenNext adapter, with gaps such as Node.js middleware ([OpenNext guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/)). Re-check before moving.

