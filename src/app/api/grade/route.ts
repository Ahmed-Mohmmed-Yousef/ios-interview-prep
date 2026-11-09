import { NextRequest, NextResponse } from 'next/server';
import { GradingRequestSchema } from '@/lib/ai/schema';
import { getGradingProvider } from '@/lib/ai/provider';
import { gradingRateLimiter } from '@/lib/ai/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    // 1. Client identification for rate limiting (privacy: IP only used in-memory for window counting)
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const rateCheck = gradingRateLimiter.isAllowed(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Too many grading requests. Please wait a minute or self-check using the rubric below.',
          retryAfterMs: rateCheck.resetMs,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000)),
          },
        }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
    }

    const validation = GradingRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 3. Delegate to configured Grading Provider (Gemini or Mock fallback)
    const provider = getGradingProvider();
    const result = await provider.grade(validation.data);

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error during grading';
    console.error('[API /api/grade Error]:', message);

    return NextResponse.json(
      {
        error: 'AI grading service is temporarily unavailable. Please self-check using the rubric below.',
        details: message,
      },
      { status: 500 }
    );
  }
}
