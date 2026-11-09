'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useHydratedProgress } from '@/lib/store/use-hydrated-progress';
import { PathCompleteScreen } from '@/components/exam/path-complete-screen';
import type { Rules, LevelDefinition } from '@/lib/curriculum/schema';
import type { PathRoad } from '@/lib/curriculum/scoring';
import { computePathScore } from '@/lib/curriculum/scoring';

interface CompleteClientProps {
  levels: LevelDefinition[];
  rules: Rules;
  roadDataByLevel: Record<string, PathRoad>;
}

export function CompleteClient({
  levels,
  rules,
  roadDataByLevel,
}: CompleteClientProps) {
  const router = useRouter();
  const { isHydrated, level, results } = useHydratedProgress();

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Calculating your completion…</p>
        </div>
      </main>
    );
  }

  const currentLevelId = level || 'fresh';
  const levelTitle = levels.find((l) => l.id === currentLevelId)?.title || 'iOS Developer';
  const roadData = roadDataByLevel[currentLevelId] || roadDataByLevel['fresh'];

  const mainTopicIds = roadData.allMainStops.map((s) => s.id);
  const doneTopicScores: Record<string, number> = {};
  for (const [id, r] of Object.entries(results)) {
    if (r.passed) {
      doneTopicScores[id] = r.bestScore;
    }
  }

  const pathScore = computePathScore(mainTopicIds, doneTopicScores);

  // Unit breakdown
  const unitMap = new Map<string, { title: string; scores: number[] }>();
  for (const stop of roadData.allMainStops) {
    if (!unitMap.has(stop.unitId)) {
      unitMap.set(stop.unitId, { title: stop.unitTitle, scores: [] });
    }
    const score = results[stop.id]?.bestScore ?? 0;
    unitMap.get(stop.unitId)!.scores.push(score);
  }

  const units = Array.from(unitMap.entries()).map(([id, item]) => {
    const avg =
      item.scores.length > 0
        ? Math.round(item.scores.reduce((a, b) => a + b, 0) / item.scores.length)
        : 0;
    return {
      id,
      title: item.title,
      averageScore: avg,
      totalTopics: item.scores.length,
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PathCompleteScreen
        levelTitle={levelTitle}
        pathScore={pathScore}
        rules={rules}
        units={units}
      />
    </main>
  );
}
