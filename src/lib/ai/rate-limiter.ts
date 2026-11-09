/**
 * In-memory sliding window rate limiter for grading requests.
 * Default: 10 requests per minute per identifier (e.g. IP address).
 */
export class MemoryRateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly hits: Map<string, number[]> = new Map();

  constructor(maxRequests: number = 10, windowMs: number = 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const timestamps = this.hits.get(key) || [];

    // Filter out timestamps outside the sliding window
    const validTimestamps = timestamps.filter((t) => now - t < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      const oldest = validTimestamps[0];
      const resetMs = Math.max(0, this.windowMs - (now - oldest));
      this.hits.set(key, validTimestamps);
      return { allowed: false, remaining: 0, resetMs };
    }

    validTimestamps.push(now);
    this.hits.set(key, validTimestamps);
    return {
      allowed: true,
      remaining: this.maxRequests - validTimestamps.length,
      resetMs: this.windowMs,
    };
  }

  reset(): void {
    this.hits.clear();
  }
}

export const gradingRateLimiter = new MemoryRateLimiter(10, 60 * 1000);
