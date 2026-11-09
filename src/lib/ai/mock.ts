import type { GradingProvider } from './provider';
import type { GradingRequest, GradingResponse, CriterionEvaluation, CriterionStatus } from './schema';
import { computeRubricScore } from '@/lib/curriculum/scoring';

/**
 * Deterministic Mock AI Grader for tests, CI, and local development.
 * Evaluates semantic content and keyword presence against rubric criteria.
 */
export class MockGradingProvider implements GradingProvider {
  readonly name = 'mock';

  async grade(request: GradingRequest): Promise<GradingResponse> {
    const trimmed = request.learnerAnswer.trim();

    // Empty or trivial non-answers
    if (trimmed.length < 5 || /^(idk|no idea|wrong|abc|test|asdf|foo|nil)$/i.test(trimmed)) {
      const criteria: CriterionEvaluation[] = request.rubric.map((r) => ({
        criterion: r.criterion,
        weight: r.weight,
        key: r.key,
        status: 'notMet' as CriterionStatus,
        feedback: 'This criterion was not addressed in your answer.',
      }));

      return {
        score: 0,
        keyCriterionMissed: request.rubric.some((r) => r.key === true),
        criteria,
        summaryFeedback: 'Your answer did not address the required points. Review the lesson and try again!',
        provider: this.name,
      };
    }

    // Heuristic keyword / semantic evaluation per criterion
    const lowerAnswer = trimmed.toLowerCase();
    const criteria: CriterionEvaluation[] = request.rubric.map((r) => {
      const lowerCriterion = r.criterion.toLowerCase();

      // Negative constraints: e.g. "not a class" or "declares a struct"
      if (lowerCriterion.includes('not a class') || lowerCriterion.includes('(not a class)')) {
        if (/\bclass\s+\w+/.test(lowerAnswer) && !/\bstruct\s+\w+/.test(lowerAnswer)) {
          return {
            criterion: r.criterion,
            weight: r.weight,
            key: r.key,
            status: 'notMet' as CriterionStatus,
            feedback: 'Your answer declared a class instead of a struct.',
          };
        }
      }

      // Check required terms if criterion specifies key behavior
      if (lowerCriterion.includes('cop') && !lowerAnswer.includes('cop')) {
        return {
          criterion: r.criterion,
          weight: r.weight,
          key: r.key,
          status: 'notMet' as CriterionStatus,
          feedback: `Missing explanation of copying behavior: "${r.criterion}".`,
        };
      }

      if (lowerCriterion.includes('share') && !lowerAnswer.includes('shar')) {
        return {
          criterion: r.criterion,
          weight: r.weight,
          key: r.key,
          status: 'notMet' as CriterionStatus,
          feedback: `Missing explanation of shared references: "${r.criterion}".`,
        };
      }

      const words = r.criterion
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3 && !['explain', 'explains', 'describes', 'correctly', 'identifies', 'states', 'shows', 'uses', 'must', 'with', 'that', 'from', 'when', 'what', 'mentions', 'where'].includes(w));

      let matchedWords = 0;
      for (const word of words) {
        if (lowerAnswer.includes(word)) {
          matchedWords++;
        }
      }

      const matchRatio = words.length > 0 ? matchedWords / words.length : 0;

      let status: CriterionStatus;
      let feedback: string;

      if (matchRatio >= 0.5) {
        status = 'met';
        feedback = `Great work explaining "${r.criterion}".`;
      } else if (matchRatio >= 0.25) {
        status = 'partlyMet';
        feedback = `Partially covered: "${r.criterion}". Add more detail on this topic.`;
      } else {
        status = 'notMet';
        feedback = `Missing detail: "${r.criterion}".`;
      }

      return {
        criterion: r.criterion,
        weight: r.weight,
        key: r.key,
        status,
        feedback,
      };
    });

    const { score, keyCriterionMissed } = computeRubricScore(
      criteria.map((c) => ({ weight: c.weight, key: c.key, status: c.status }))
    );

    let summaryFeedback = 'Good effort! Your response has been evaluated against the rubric.';
    if (score >= 70) {
      summaryFeedback = 'Excellent answer! You demonstrated solid understanding of this topic.';
    } else if (keyCriterionMissed) {
      summaryFeedback = 'A key concept was missing from your response, which capped the score at 50%. Review the key criteria and revise.';
    } else {
      summaryFeedback = 'You are on the right track, but some essential details were missing. Review the feedback for each criterion.';
    }

    return {
      score,
      keyCriterionMissed,
      criteria,
      summaryFeedback,
      provider: this.name,
    };
  }
}
