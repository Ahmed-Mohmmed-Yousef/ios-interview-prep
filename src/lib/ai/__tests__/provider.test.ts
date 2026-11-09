import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getGradingProvider } from '../provider';
import { MockGradingProvider } from '../mock';
import { GeminiGradingProvider } from '../gemini';
import { computeRubricScore } from '@/lib/curriculum/scoring';
import type { GradingRequest } from '../schema';

describe('Rubric Scoring Math', () => {
  it('gives 100% when all criteria are met', () => {
    const evaluations = [
      { weight: 60, key: true, status: 'met' as const },
      { weight: 40, key: false, status: 'met' as const },
    ];
    const result = computeRubricScore(evaluations);
    expect(result.score).toBe(100);
    expect(result.keyCriterionMissed).toBe(false);
  });

  it('gives 50% weight for partly met criteria', () => {
    const evaluations = [
      { weight: 60, key: true, status: 'partlyMet' as const }, // 30
      { weight: 40, key: false, status: 'partlyMet' as const }, // 20
    ];
    const result = computeRubricScore(evaluations);
    expect(result.score).toBe(50);
    expect(result.keyCriterionMissed).toBe(false);
  });

  it('caps total score at 50% when key criterion is not met', () => {
    // Non-key met gives 70 points, but key is notMet so score must be capped at 50
    const evaluations = [
      { weight: 30, key: true, status: 'notMet' as const }, // 0
      { weight: 70, key: false, status: 'met' as const },   // 70
    ];
    const result = computeRubricScore(evaluations);
    expect(result.keyCriterionMissed).toBe(true);
    expect(result.score).toBe(50); // Capped from 70 to 50
  });

  it('returns 0 when all criteria are not met', () => {
    const evaluations = [
      { weight: 50, key: true, status: 'notMet' as const },
      { weight: 50, key: false, status: 'notMet' as const },
    ];
    const result = computeRubricScore(evaluations);
    expect(result.score).toBe(0);
    expect(result.keyCriterionMissed).toBe(true);
  });
});

describe('MockGradingProvider', () => {
  const provider = new MockGradingProvider();

  const sampleRequest: GradingRequest = {
    questionId: 'test-q1',
    questionType: 'written',
    prompt: 'Explain value types vs reference types in Swift.',
    rubric: [
      {
        criterion: 'Explains that structs are value types copied on assignment',
        weight: 50,
        key: true,
      },
      {
        criterion: 'Explains that classes are reference types with shared instances',
        weight: 50,
        key: false,
      },
    ],
    learnerAnswer: '',
  };

  it('grades empty or nonsense answers as 0 with key criterion missed', async () => {
    const result = await provider.grade({
      ...sampleRequest,
      learnerAnswer: 'idk',
    });
    expect(result.score).toBe(0);
    expect(result.keyCriterionMissed).toBe(true);
    expect(result.criteria.every((c) => c.status === 'notMet')).toBe(true);
    expect(result.provider).toBe('mock');
  });

  it('evaluates comprehensive answers with high scores', async () => {
    const result = await provider.grade({
      ...sampleRequest,
      learnerAnswer:
        'In Swift, structs are value types that copy their data on assignment. In contrast, classes are reference types where multiple variables share the same underlying instance in memory.',
    });
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.keyCriterionMissed).toBe(false);
    expect(result.criteria[0].status).toBe('met');
  });
});

describe('getGradingProvider factory', () => {
  const originalEnv = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  afterEach(() => {
    if (originalEnv) {
      process.env.GEMINI_API_KEY = originalEnv;
    } else {
      delete process.env.GEMINI_API_KEY;
    }
  });

  it('returns MockGradingProvider when GEMINI_API_KEY is not set', () => {
    const provider = getGradingProvider();
    expect(provider).toBeInstanceOf(MockGradingProvider);
    expect(provider.name).toBe('mock');
  });

  it('returns GeminiGradingProvider when GEMINI_API_KEY is set', () => {
    process.env.GEMINI_API_KEY = 'test-api-key-12345';
    const provider = getGradingProvider();
    expect(provider).toBeInstanceOf(GeminiGradingProvider);
    expect(provider.name).toBe('gemini');
  });
});
