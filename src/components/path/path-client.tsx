'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHydratedProgress } from '@/lib/store/use-hydrated-progress';
import { PathHeader } from './path-header';
import { PathRoad } from './path-road';
import { StopSheet, type StopState } from './stop-sheet';
import type { PathRoad as PathRoadData, PathStop } from '@/lib/curriculum/scoring';
import type { LevelDefinition, LevelId, Rules } from '@/lib/curriculum/schema';
import { computePathProgress, computePathScore } from '@/lib/curriculum/scoring';

interface PathClientProps {
  levels: LevelDefinition[];
  rules: Rules;
  roadDataByLevel: Record<string, PathRoadData>;
}

export function PathClient({
  levels,
  rules,
  roadDataByLevel,
}: PathClientProps) {
  const router = useRouter();
  const { isHydrated, level, setLevel, results, skips } = useHydratedProgress();

  const [activeStop, setActiveStop] = useState<{
    stop: PathStop;
    state: StopState;
  } | null>(null);

  const [foldedStages, setFoldedStages] = useState<Set<string>>(new Set());

  // Default to Fresh if not set yet
  const currentLevelId: LevelId = level || 'fresh';
  const roadData = roadDataByLevel[currentLevelId] || roadDataByLevel['fresh'];

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your path…</p>
        </div>
      </main>
    );
  }

  // Calculate progress stats
  const mainTopicIds = roadData.allMainStops.map((s) => s.id);
  const doneTopicIds = new Set(
    Object.entries(results)
      .filter(([_, r]) => r.passed)
      .map(([id]) => id)
  );

  const progress = computePathProgress(mainTopicIds, doneTopicIds);

  const doneTopicScores: Record<string, number> = {};
  for (const [id, r] of Object.entries(results)) {
    if (r.passed) {
      doneTopicScores[id] = r.bestScore;
    }
  }
  const pathScore = computePathScore(mainTopicIds, doneTopicScores);

  const handleToggleFold = (stageId: string) => {
    const next = new Set(foldedStages);
    if (next.has(stageId)) {
      next.delete(stageId);
    } else {
      next.add(stageId);
    }
    setFoldedStages(next);
  };

  const handleSelectStop = (stop: PathStop, state: StopState) => {
    setActiveStop({ stop, state });
  };

  const handleGoToStop = (stopId: string) => {
    const found = roadData.allMainStops.find((s) => s.id === stopId);
    if (found) {
      setActiveStop({ stop: found, state: results[stopId]?.passed ? 'passed' : 'current' });
    }
  };

  // Find prerequisite for locked stop
  let blockingPrerequisite: PathStop | null = null;
  if (activeStop && activeStop.state === 'locked') {
    // Look for first unpassed prerequisite or previous main stop
    const stopIdx = roadData.allMainStops.findIndex((s) => s.id === activeStop.stop.id);
    if (stopIdx > 0) {
      const prevStop = roadData.allMainStops[stopIdx - 1];
      if (!results[prevStop.id]?.passed) {
        blockingPrerequisite = prevStop;
      }
    }
  }

  const handleSkipStage = (stageId: string) => {
    // Route to skip test exam for this stage
    router.push(`/skip/stage/${stageId}`);
  };

  const handleSkipUnit = (unitId: string, stageId: string) => {
    // Route to skip test exam for this unit
    router.push(`/skip/unit/${unitId}?stage=${stageId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PathHeader
        levels={levels}
        currentLevelId={currentLevelId}
        onLevelChange={(newLevel) => setLevel(newLevel)}
        doneCount={progress.doneCount}
        totalCount={progress.totalCount}
        percentage={progress.percentage}
        pathScore={pathScore}
      />

      <main className="flex-1 pb-16">
        <PathRoad
          stages={roadData.stages}
          currentLevelId={currentLevelId}
          results={results}
          skips={skips}
          foldedStages={foldedStages}
          onToggleFold={handleToggleFold}
          onSelectStop={handleSelectStop}
          onSkipUnitClick={handleSkipUnit}
          onSkipStageClick={handleSkipStage}
        />
      </main>

      <StopSheet
        stop={activeStop?.stop || null}
        state={activeStop?.state || 'locked'}
        result={activeStop ? results[activeStop.stop.id] : undefined}
        blockingPrerequisite={blockingPrerequisite}
        onClose={() => setActiveStop(null)}
        onGoToStop={handleGoToStop}
      />
    </div>
  );
}
