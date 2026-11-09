import type { GradingProvider } from './provider';
import type { GradingRequest, GradingResponse, CriterionEvaluation, CriterionStatus } from './schema';
import { computeRubricScore } from '@/lib/curriculum/scoring';

export class GeminiGradingProvider implements GradingProvider {
  readonly name = 'gemini';
  private readonly apiKey: string;
  private readonly model: string;

  constructor(apiKey: string, model: string = 'gemini-2.5-flash') {
    this.apiKey = apiKey;
    this.model = process.env.GEMINI_MODEL || model;
  }

  async grade(request: GradingRequest): Promise<GradingResponse> {
    const prompt = this.buildPrompt(request);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            criteria: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  criterion: { type: 'STRING' },
                  status: {
                    type: 'STRING',
                    enum: ['met', 'partlyMet', 'notMet'],
                  },
                  feedback: { type: 'STRING' },
                },
                required: ['criterion', 'status', 'feedback'],
              },
            },
            summaryFeedback: { type: 'STRING' },
          },
          required: ['criteria', 'summaryFeedback'],
        },
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const json = await response.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Gemini API returned empty candidate content');
      }

      const parsed = JSON.parse(rawText);
      const rawCriteria = (parsed.criteria || []) as Array<{
        criterion: string;
        status: CriterionStatus;
        feedback: string;
      }>;

      // Align returned criteria with the original rubric weights and key flags
      const criteria: CriterionEvaluation[] = request.rubric.map((r, index) => {
        const match = rawCriteria.find(
          (c) => c.criterion.trim().toLowerCase() === r.criterion.trim().toLowerCase()
        ) || rawCriteria[index];

        const status: CriterionStatus =
          match && ['met', 'partlyMet', 'notMet'].includes(match.status)
            ? match.status
            : 'notMet';

        const feedback = match?.feedback || 'Evaluated against the rubric.';

        return {
          criterion: r.criterion,
          weight: r.weight,
          key: r.key,
          status,
          feedback,
        };
      });

      // Compute mathematical score strictly via product rules (met=100%, partlyMet=50%, key missed caps at 50%)
      const { score, keyCriterionMissed } = computeRubricScore(
        criteria.map((c) => ({ weight: c.weight, key: c.key, status: c.status }))
      );

      return {
        score,
        keyCriterionMissed,
        criteria,
        summaryFeedback: parsed.summaryFeedback || 'Graded by AI coach.',
        provider: this.name,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private buildPrompt(request: GradingRequest): string {
    const rubricList = request.rubric
      .map((r, i) => `${i + 1}. [Weight: ${r.weight}%${r.key ? ', KEY CRITERION' : ''}] ${r.criterion}`)
      .join('\n');

    return `You are a calm, encouraging, and fair iOS technical interview coach.
Your job is to grade a learner's response for a ${request.questionType === 'code-write' ? 'Swift coding' : 'technical written'} interview question.

Read the question, rubric, and learner's answer. Evaluate each criterion as:
- "met": The learner clearly and accurately satisfied this point.
- "partlyMet": The learner mentioned or partially explained this point, but missed key context or had small inaccuracies.
- "notMet": The learner did not address this point or explained it incorrectly.

CRITICAL INSTRUCTIONS:
- Always write feedback in simple, clear Plain English (CEFR B1 level). Keep sentences under 25 words.
- Be encouraging and constructive. If a criterion is not met, clearly explain what was missing in 1-2 sentences.
- Do not make up extra criteria. Only evaluate against the provided rubric points.

QUESTION:
${request.prompt}

${request.modelAnswer ? `REFERENCE MODEL ANSWER:\n${request.modelAnswer}\n` : ''}

RUBRIC CRITERIA:
${rubricList}

LEARNER'S ANSWER:
${request.learnerAnswer}
`;
  }
}
