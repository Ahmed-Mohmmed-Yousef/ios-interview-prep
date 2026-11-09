import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRateLimiter } from '../rate-limiter';

describe('MemoryRateLimiter', () => {
  let limiter: MemoryRateLimiter;

  beforeEach(() => {
    limiter = new MemoryRateLimiter(3, 1000); // 3 requests per 1000ms
  });

  it('allows requests within threshold', () => {
    expect(limiter.isAllowed('ip-1').allowed).toBe(true);
    expect(limiter.isAllowed('ip-1').allowed).toBe(true);
    expect(limiter.isAllowed('ip-1').allowed).toBe(true);
  });

  it('blocks requests exceeding threshold', () => {
    limiter.isAllowed('ip-1');
    limiter.isAllowed('ip-1');
    limiter.isAllowed('ip-1');
    const blocked = limiter.isAllowed('ip-1');
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetMs).toBeGreaterThan(0);
  });

  it('tracks different keys independently', () => {
    limiter.isAllowed('ip-1');
    limiter.isAllowed('ip-1');
    limiter.isAllowed('ip-1');
    expect(limiter.isAllowed('ip-1').allowed).toBe(false);
    expect(limiter.isAllowed('ip-2').allowed).toBe(true);
  });
});
