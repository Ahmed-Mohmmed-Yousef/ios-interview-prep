# Phase 6 Summary — AI Grading

Completed: **2026-11-09**
App: **Prep Stops** (`config/brand.json`)
Tech Stack: **Google Gemini API (2.5 Flash) · Next.js 16 App Router · Zod · Vitest · Playwright · @axe-core/playwright**

---

## Deliverables & Results

### 1. Architecture & Provider Abstraction
- **`GradingProvider` Interface (`src/lib/ai/provider.ts`)**: Provider-agnostic interface allowing seamless switching between external LLMs and local engines.
- **`GeminiGradingProvider` (`src/lib/ai/gemini.ts`)**:
  - Direct integration with Google Gemini 2.5 Flash REST API.
  - Native structured JSON output schema (`responseMimeType: "application/json"`, `responseSchema`).
  - Strict CEFR B1 Plain English coach prompt (sentences $\le$ 25 words, constructive guidance, no hallucinations).
  - Mathematical score calculation performed in deterministic TypeScript code—never trusting the LLM to do weighted arithmetic.
- **`MockGradingProvider` (`src/lib/ai/mock.ts`)**:
  - Deterministic semantic and keyword matcher used in CI, automated tests, and offline environments.
  - Evaluates student answers against rubric criteria and negative constraints (e.g. declaring a class when a struct was requested).

---

### 2. Product Rule Scoring & Key Criterion Capping
- **Scoring Formulas (`src/lib/curriculum/scoring.ts`)**:
  - Criteria evaluated: `met` (100% weight), `partlyMet` (50% weight), `notMet` (0% weight).
  - **Key Criterion Cap**: If any criterion with `key: true` is not met, the question score is strictly capped at $\le$ 50% max, guaranteeing that answers missing core foundational concepts can never pass the 70% topic threshold.

---

### 3. API Route & Abuse Protections
- **`POST /api/grade` (`src/app/api/grade/route.ts`)**:
  - Request body validated via `GradingRequestSchema` (Zod).
  - Maximum answer length bounded to 2,000 characters.
  - In-memory sliding window rate limiter (`src/lib/ai/rate-limiter.ts`): max 10 requests per minute per IP.
  - 8-second request timeout guard.
  - **Zero Personal Data**: No cookies, names, emails, or user IDs are accepted or transmitted to Gemini.

---

### 4. Exam Runner UI Integration
- **`src/components/exam/exam-runner.tsx`**:
  - Added **"Grade with AI Coach"** primary button with Sparkles icon alongside **"Self-check manually"**.
  - Animated loading state with spinner (`Loader2`).
  - **AI Coach Evaluation Card**:
    - Large overall score badge with pass/fail styling.
    - Key criterion missed alert callout.
    - AI coach summary advice in friendly CEFR B1 Plain English.
    - Per-criterion checklist: green check for met, amber minus for partly met, gray cross for not met, with specific constructive feedback.
    - **"Adjust grades manually"** toggle allowing learners to override any criterion.
  - **Offline & Error Fallback**: If network is disconnected or rate limit is reached, a friendly warning banner displays and seamlessly reveals the self-check rubric so the learner is never blocked.

---

### 5. Automated Verification & Metrics

- **Vitest Unit Tests**:
  - `src/lib/ai/__tests__/provider.test.ts`: Provider factory, mock evaluation, and rubric scoring math.
  - `src/lib/ai/__tests__/rate-limiter.test.ts`: Sliding window limits and independent IP tracking.
  - `src/lib/ai/__tests__/benchmark.test.ts`: Curated Good, Average, and Weak answers from `docs/topics/*/rubric-test.md` verified.
  - **Total: 41 of 41 unit tests passing (100%)**.
- **Playwright E2E & A11y Tests**:
  - Flow F6: Exam Runner choice checking and AI coach integration verified.
  - Axe-core accessibility audit: **0 WCAG 2.1 A and AA violations**.
  - **Total: 16 of 16 E2E tests passing**.
- **Production Build**:
  - Turbopack compilation succeeded with 81 static pages prerendered and dynamic `/api/grade` route.
