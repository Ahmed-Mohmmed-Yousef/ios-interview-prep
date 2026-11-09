import type { LevelDefinition, LevelId, Rules } from './schema';

export interface PathStop {
  id: string;
  title: string;
  level: LevelId;
  goal: string;
  status: string;
  version: number;
  isBonus: boolean;
  afterTopicId?: string;
  unitId: string;
  unitTitle: string;
  prerequisites: string[];
}

export interface PathStage {
  level: LevelDefinition;
  stops: PathStop[];
}

export interface PathRoad {
  stages: PathStage[];
  allMainStops: PathStop[];
  allBonusStops: PathStop[];
}

/**
 * Product Rule: A topic passes at 70% (configured in rules.json).
 */
export function checkTopicPass(score: number, rules: Rules): boolean {
  return score >= rules.topicPassMark;
}

/**
 * Product Rule: A skip test passes at 80% (configured in rules.json).
 */
export function checkSkipPass(score: number, rules: Rules): boolean {
  return score >= rules.skipPassMark;
}

/**
 * Product Rule: Topic score = best exam score.
 */
export function computeTopicBestScore(attempts: number[]): number {
  if (attempts.length === 0) return 0;
  return Math.max(0, ...attempts);
}

/**
 * Product Rule: Progress = done / main topics. Bonus topics count in neither.
 */
export function computePathProgress(
  mainTopicIds: string[],
  doneTopicIds: Set<string>
): { doneCount: number; totalCount: number; percentage: number } {
  if (mainTopicIds.length === 0) return { doneCount: 0, totalCount: 0, percentage: 0 };
  let doneCount = 0;
  for (const id of mainTopicIds) {
    if (doneTopicIds.has(id)) doneCount++;
  }
  const percentage = Math.round((doneCount / mainTopicIds.length) * 100);
  return { doneCount, totalCount: mainTopicIds.length, percentage };
}

/**
 * Product Rule: Path score = average of done main topics. Bonus topics count in neither.
 */
export function computePathScore(
  mainTopicIds: string[],
  doneTopicScores: Record<string, number>
): number {
  const scores: number[] = [];
  for (const id of mainTopicIds) {
    if (id in doneTopicScores) {
      scores.push(doneTopicScores[id]);
    }
  }
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + s, 0);
  return Math.round(sum / scores.length);
}

/**
 * Shuffles question answer options using Fisher-Yates and remaps the answer ID.
 */
export function shuffleOptions<T extends { id: string }>(
  options: T[],
  originalAnswerId: string
): { shuffled: T[]; newAnswerId: string } {
  const result = [...options];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return {
    shuffled: result,
    newAnswerId: originalAnswerId,
  };
}

export type CriterionStatus = 'met' | 'partlyMet' | 'notMet';

export interface RubricScoreInput {
  weight: number;
  key?: boolean;
  status: CriterionStatus;
}

/**
 * Product Rule: Rubric scoring.
 * - Met: 100% of weight
 * - Partly met: 50% of weight
 * - Not met: 0%
 * - Missing any key criterion (key: true) caps total score at 50% max.
 */
export function computeRubricScore(
  evaluations: RubricScoreInput[],
  rules?: { met: number; partlyMet: number; notMet: number; keyMissedCap: number }
): { score: number; keyCriterionMissed: boolean } {
  const metFactor = rules?.met ?? 1;
  const partlyFactor = rules?.partlyMet ?? 0.5;
  const notFactor = rules?.notMet ?? 0;
  const keyCap = rules?.keyMissedCap ?? 50;

  let rawScore = 0;
  let keyCriterionMissed = false;

  for (const item of evaluations) {
    if (item.status === 'met') {
      rawScore += item.weight * metFactor;
    } else if (item.status === 'partlyMet') {
      rawScore += item.weight * partlyFactor;
    } else {
      rawScore += item.weight * notFactor;
      if (item.key) {
        keyCriterionMissed = true;
      }
    }
  }

  let finalScore = Math.round(rawScore);
  if (keyCriterionMissed && finalScore > keyCap) {
    finalScore = keyCap;
  }

  return {
    score: Math.min(100, Math.max(0, finalScore)),
    keyCriterionMissed,
  };
}

