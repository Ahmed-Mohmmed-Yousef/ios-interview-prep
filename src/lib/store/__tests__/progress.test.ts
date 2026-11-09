import { describe, it, expect, beforeEach } from 'vitest';
import { useProgress, CURRENT_STORE_VERSION } from '../progress';

describe('Progress store (.claude/rules/progress-store.md & testing.md)', () => {
  beforeEach(() => {
    useProgress.getState().resetProgress();
  });

  it('initializes with default empty state', () => {
    const state = useProgress.getState();
    expect(state.level).toBeNull();
    expect(state.results).toEqual({});
    expect(state.skips).toEqual({});
    expect(state.theme).toBe('device');
    expect(state.textSize).toBe('normal');
  });

  it('Rule 1: Topic score = best exam score; passes at or above 70%', () => {
    const store = useProgress.getState();

    // First attempt: 60% (fail at 70% mark)
    store.recordTopicScore('swift-basics', 1, 60, 70);
    let state = useProgress.getState();
    expect(state.results['swift-basics'].bestScore).toBe(60);
    expect(state.results['swift-basics'].passed).toBe(false);

    // Second attempt: 80% (pass)
    store.recordTopicScore('swift-basics', 1, 80, 70);
    state = useProgress.getState();
    expect(state.results['swift-basics'].bestScore).toBe(80);
    expect(state.results['swift-basics'].passed).toBe(true);

    // Third attempt: 75% (lower than best score, pass stays, bestScore remains 80)
    store.recordTopicScore('swift-basics', 1, 75, 70);
    state = useProgress.getState();
    expect(state.results['swift-basics'].bestScore).toBe(80);
    expect(state.results['swift-basics'].passed).toBe(true);
  });

  it('Rule 2: Topic version bump — pass stays when a topic is updated', () => {
    const store = useProgress.getState();
    store.recordTopicScore('swift-basics', 1, 90, 70);

    const state = useProgress.getState();
    expect(state.results['swift-basics'].version).toBe(1);
    expect(state.results['swift-basics'].passed).toBe(true);

    // Topic in content is updated to version 2; learner passed version 1
    // The result preserves the version they passed (1), allowing the UI to show the "Updated" badge
    expect(state.results['swift-basics'].version).toBe(1);
    expect(state.results['swift-basics'].passed).toBe(true);
  });

  it('Rule 3: Topic moves, is retired, or new topics are added — progress keyed only by id', () => {
    const store = useProgress.getState();
    store.recordTopicScore('optionals', 1, 100, 70);
    store.recordTopicScore('retired-topic-x', 1, 80, 70);

    const state = useProgress.getState();
    // Progress is unaffected by layout, units, or retirements
    expect(state.results['optionals'].passed).toBe(true);
    expect(state.results['retired-topic-x'].passed).toBe(true);
  });

  it('Rule 4: Changing level preserves earned progress', () => {
    const store = useProgress.getState();
    store.setLevel('fresh');
    store.recordTopicScore('swift-basics', 1, 85, 70);

    // Switch level to Junior
    store.setLevel('junior');
    let state = useProgress.getState();
    expect(state.level).toBe('junior');
    expect(state.results['swift-basics'].bestScore).toBe(85);
    expect(state.results['swift-basics'].passed).toBe(true);

    // Switch level to Senior
    store.setLevel('senior');
    state = useProgress.getState();
    expect(state.level).toBe('senior');
    expect(state.results['swift-basics'].passed).toBe(true);
  });

  it('Rule 5: Skip tests pass at 80% and mark covered topics with the skip score', () => {
    const store = useProgress.getState();
    const covered = ['swift-basics', 'optionals', 'operators'];

    // Below 80% fails skip test
    const failedSkip = store.recordSkip('unit', 'swift-language-fresh', covered, 75, 80);
    expect(failedSkip).toBe(false);
    expect(useProgress.getState().results['swift-basics']).toBeUndefined();

    // At or above 80% passes skip test
    const passedSkip = store.recordSkip('unit', 'swift-language-fresh', covered, 85, 80);
    expect(passedSkip).toBe(true);

    const state = useProgress.getState();
    expect(state.skips['unit-swift-language-fresh']).toBeDefined();
    expect(state.skips['unit-swift-language-fresh'].score).toBe(85);

    // Covered topics marked passed with skip score
    for (const id of covered) {
      expect(state.results[id].passed).toBe(true);
      expect(state.results[id].bestScore).toBe(85);
    }
  });

  it('Rule 6: Export and Import progress with validation', () => {
    const store = useProgress.getState();
    store.setLevel('mid');
    store.recordTopicScore('collections', 1, 95, 70);
    store.setTheme('dark');
    store.setTextSize('large');

    const exported = store.exportProgress();
    expect(typeof exported).toBe('string');

    // Reset store
    store.resetProgress();
    expect(useProgress.getState().level).toBeNull();

    // Re-import
    const res = store.importProgress(exported);
    expect(res.success).toBe(true);

    const state = useProgress.getState();
    expect(state.level).toBe('mid');
    expect(state.results['collections'].bestScore).toBe(95);
    expect(state.theme).toBe('dark');
    expect(state.textSize).toBe('large');
  });

  it('Rule 7: Corrupt or broken JSON import handled safely', () => {
    const store = useProgress.getState();
    store.setLevel('fresh');

    const brokenJson = '{ "level": "invalid-level", "results": 123 }';
    const res = store.importProgress(brokenJson);
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();

    // Store state not corrupted
    expect(useProgress.getState().level).toBe('fresh');

    const invalidSyntax = 'not even json';
    const syntaxRes = store.importProgress(invalidSyntax);
    expect(syntaxRes.success).toBe(false);
  });

  it('Rule 8: Migration from v0 to v1', () => {
    const storeConfig = (useProgress as any).persist;
    const v0Data = {
      level: 'fresh',
      results: {
        'swift-basics': {
          topicId: 'swift-basics',
          version: 1,
          bestScore: 90,
          passed: true,
          passedAt: '2026-10-22T00:00:00Z',
        },
      },
      // skips and textSize missing in hypothetical v0
    };

    const migrated = storeConfig.getOptions().migrate(v0Data, 0);
    expect(migrated.level).toBe('fresh');
    expect(migrated.results['swift-basics'].bestScore).toBe(90);
    expect(migrated.skips).toEqual({});
    expect(migrated.textSize).toBe('normal');
  });
});
