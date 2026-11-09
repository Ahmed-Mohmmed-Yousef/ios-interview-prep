import type { GradingRequest, GradingResponse } from './schema';
import { MockGradingProvider } from './mock';
import { GeminiGradingProvider } from './gemini';

export interface GradingProvider {
  readonly name: string;
  grade(request: GradingRequest): Promise<GradingResponse>;
}

/**
 * Returns the active grading provider:
 * - If GEMINI_API_KEY is present in process.env, uses GeminiGradingProvider.
 * - Otherwise falls back to MockGradingProvider (for CI, test runs, and local dev).
 */
export function getGradingProvider(): GradingProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim().length > 0) {
    return new GeminiGradingProvider(apiKey.trim());
  }
  return new MockGradingProvider();
}
