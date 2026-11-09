import { describe, it, expect } from 'vitest';
import { calculateSuggestedLevel } from '../self-check';
import { getLevels } from '../index';

describe('calculateSuggestedLevel (docs/design/start-progress.md)', () => {
  const levels = getLevels();

  it('suggests Fresh when no items are ticked', () => {
    const result = calculateSuggestedLevel(levels, new Set());
    expect(result.suggestedLevelId).toBe('fresh');
    expect(result.unbrokenRun).toEqual([]);
  });

  it('suggests Junior when Fresh and Junior meet threshold, but Mid breaks the run', () => {
    // Example from docs: Fresh 4/5, Junior 4/6, Mid 2/6, Senior 5/6 -> Junior
    const ticked = new Set<string>();

    // 4 items of Fresh (total 5)
    ticked.add('fresh-0');
    ticked.add('fresh-1');
    ticked.add('fresh-2');
    ticked.add('fresh-3');

    // 4 items of Junior (total 6)
    ticked.add('junior-0');
    ticked.add('junior-1');
    ticked.add('junior-2');
    ticked.add('junior-3');

    // 2 items of Mid (total 6 -> 2/6 = 33% < 50% fails)
    ticked.add('mid-0');
    ticked.add('mid-1');

    // 5 items of Senior (even though Senior has 5/6, Mid broke the run)
    ticked.add('senior-0');
    ticked.add('senior-1');
    ticked.add('senior-2');
    ticked.add('senior-3');
    ticked.add('senior-4');

    const result = calculateSuggestedLevel(levels, ticked, 0.5);
    expect(result.suggestedLevelId).toBe('junior');
    expect(result.unbrokenRun).toEqual(['fresh', 'junior']);
  });

  it('suggests Mid when Fresh, Junior, and Mid all meet threshold', () => {
    const ticked = new Set<string>();
    // Fresh 3/5
    ticked.add('fresh-0');
    ticked.add('fresh-1');
    ticked.add('fresh-2');

    // Junior 3/6
    ticked.add('junior-0');
    ticked.add('junior-1');
    ticked.add('junior-2');

    // Mid 4/6
    ticked.add('mid-0');
    ticked.add('mid-1');
    ticked.add('mid-2');
    ticked.add('mid-3');

    const result = calculateSuggestedLevel(levels, ticked, 0.5);
    expect(result.suggestedLevelId).toBe('mid');
    expect(result.unbrokenRun).toEqual(['fresh', 'junior', 'mid']);
  });
});
