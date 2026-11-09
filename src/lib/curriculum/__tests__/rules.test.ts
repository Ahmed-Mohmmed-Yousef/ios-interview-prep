import { describe, it, expect } from 'vitest';
import {
  getRules,
  checkTopicPass,
  checkSkipPass,
  computeTopicBestScore,
  computePathProgress,
  computePathScore,
  shuffleOptions,
  getPathForLevel,
} from '../index';

describe('Product rules (content/rules.json & AGENTS.md)', () => {
  const rules = getRules();

  it('reads rules with exact pass marks', () => {
    expect(rules.topicPassMark).toBe(70);
    expect(rules.skipPassMark).toBe(80);
    expect(rules.topicExamSize).toBe(10);
  });

  describe('Topic pass mark (70%)', () => {
    it('fails just below the pass mark (69%)', () => {
      expect(checkTopicPass(rules.topicPassMark - 1, rules)).toBe(false);
      expect(checkTopicPass(69, rules)).toBe(false);
    });

    it('passes exactly at the pass mark (70%)', () => {
      expect(checkTopicPass(rules.topicPassMark, rules)).toBe(true);
      expect(checkTopicPass(70, rules)).toBe(true);
    });

    it('passes above the pass mark (71% and 100%)', () => {
      expect(checkTopicPass(rules.topicPassMark + 1, rules)).toBe(true);
      expect(checkTopicPass(71, rules)).toBe(true);
      expect(checkTopicPass(100, rules)).toBe(true);
    });
  });

  describe('Skip test pass mark (80%)', () => {
    it('fails just below the skip pass mark (79%)', () => {
      expect(checkSkipPass(rules.skipPassMark - 1, rules)).toBe(false);
      expect(checkSkipPass(79, rules)).toBe(false);
    });

    it('passes exactly at the skip pass mark (80%)', () => {
      expect(checkSkipPass(rules.skipPassMark, rules)).toBe(true);
      expect(checkSkipPass(80, rules)).toBe(true);
    });

    it('passes above the skip pass mark (85% and 100%)', () => {
      expect(checkSkipPass(85, rules)).toBe(true);
      expect(checkSkipPass(100, rules)).toBe(true);
    });
  });

  describe('Topic score calculation', () => {
    it('topic score equals the best exam score across retakes', () => {
      expect(computeTopicBestScore([50, 70, 60])).toBe(70);
      expect(computeTopicBestScore([90, 80, 100])).toBe(100);
      expect(computeTopicBestScore([])).toBe(0);
    });
  });

  describe('Progress and Path score calculation', () => {
    const mainTopicIds = ['topic-1', 'topic-2', 'topic-3', 'topic-4'];
    const bonusTopicIds = ['bonus-1'];

    it('progress = done / main topics; bonus topics do not count in total', () => {
      const doneSet = new Set(['topic-1', 'topic-2', 'bonus-1']);
      const progress = computePathProgress(mainTopicIds, doneSet);

      expect(progress.doneCount).toBe(2);
      expect(progress.totalCount).toBe(4);
      expect(progress.percentage).toBe(50);
    });

    it('path score = average of done main topics; bonus topics do not count', () => {
      const doneScores: Record<string, number> = {
        'topic-1': 80,
        'topic-2': 100,
        'bonus-1': 100, // should not affect path score
      };

      const pathScore = computePathScore(mainTopicIds, doneScores);
      // Average of 80 and 100 is 90
      expect(pathScore).toBe(90);
    });

    it('path score returns 0 if no main topics are done', () => {
      expect(computePathScore(mainTopicIds, {})).toBe(0);
    });
  });

  describe('Locked stops and bonus topic isolation', () => {
    it('bonus topics sit on side branch and do not block the main road', () => {
      const freshRoad = getPathForLevel('fresh');
      expect(freshRoad.allMainStops.length).toBeGreaterThan(0);
      for (const bonus of freshRoad.allBonusStops) {
        expect(bonus.isBonus).toBe(true);
        expect(bonus.afterTopicId).toBeTruthy();
      }
    });
  });

  describe('Question answer shuffling', () => {
    it('shuffles answer options while keeping the original correct answer accessible', () => {
      const originalOptions = [
        { id: 'a', text: 'Opt A' },
        { id: 'b', text: 'Opt B' },
        { id: 'c', text: 'Opt C' },
        { id: 'd', text: 'Opt D' },
      ];
      const answer = 'c';

      const { shuffled, newAnswerId } = shuffleOptions(originalOptions, answer);
      expect(shuffled).toHaveLength(4);
      expect(newAnswerId).toBe('c');
      const found = shuffled.find((o) => o.id === newAnswerId);
      expect(found?.text).toBe('Opt C');
    });
  });
});
