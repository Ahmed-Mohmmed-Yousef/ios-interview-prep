import type { LevelDefinition, LevelId } from './schema';

export interface LevelTally {
  levelId: LevelId;
  title: string;
  tickedCount: number;
  totalCount: number;
  meetsThreshold: boolean;
}

export interface SelfCheckResult {
  suggestedLevelId: LevelId;
  tallies: LevelTally[];
  unbrokenRun: LevelId[];
}

/**
 * Calculates suggested level based on ticked self-check items.
 * Rule: Go up levels in order (fresh -> junior -> mid -> senior -> staff).
 * A level meets threshold when at least half (>= 50%) of its selfCheck items are ticked.
 * The suggested level is the highest level in an unbroken run from Fresh.
 * If Fresh itself does not meet threshold, suggestion defaults to Fresh.
 */
export function calculateSuggestedLevel(
  levels: LevelDefinition[],
  tickedItemKeys: Set<string>,
  thresholdShare: number = 0.5
): SelfCheckResult {
  const tallies: LevelTally[] = [];
  const unbrokenRun: LevelId[] = [];
  let runBroken = false;

  for (const level of levels) {
    const totalCount = level.selfCheck.length;
    let tickedCount = 0;

    level.selfCheck.forEach((_, idx) => {
      const key = `${level.id}-${idx}`;
      if (tickedItemKeys.has(key)) {
        tickedCount++;
      }
    });

    const share = totalCount > 0 ? tickedCount / totalCount : 0;
    const meetsThreshold = share >= thresholdShare;

    tallies.push({
      levelId: level.id,
      title: level.title,
      tickedCount,
      totalCount,
      meetsThreshold,
    });

    if (!runBroken) {
      if (meetsThreshold) {
        unbrokenRun.push(level.id);
      } else {
        runBroken = true;
      }
    }
  }

  const suggestedLevelId = unbrokenRun.length > 0 ? unbrokenRun[unbrokenRun.length - 1] : levels[0].id;

  return {
    suggestedLevelId,
    tallies,
    unbrokenRun,
  };
}
