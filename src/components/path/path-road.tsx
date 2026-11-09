'use client';

import React, { useEffect, useRef } from 'react';
import type { PathStop, PathStage } from '@/lib/curriculum/scoring';
import type { TopicResult, SkipRecord } from '@/lib/store/progress';
import { StageCard } from './stage-card';
import {
  Check,
  Lock,
  Play,
  FastForward,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import type { StopState } from './stop-sheet';

interface PathRoadProps {
  stages: PathStage[];
  currentLevelId: string;
  results: Record<string, TopicResult>;
  skips: Record<string, SkipRecord>;
  foldedStages: Set<string>;
  onToggleFold: (stageId: string) => void;
  onSelectStop: (stop: PathStop, state: StopState) => void;
  onSkipUnitClick: (unitId: string, stageId: string) => void;
  onSkipStageClick: (stageId: string) => void;
}

export function PathRoad({
  stages,
  currentLevelId,
  results,
  skips,
  foldedStages,
  onToggleFold,
  onSelectStop,
  onSkipUnitClick,
  onSkipStageClick,
}: PathRoadProps) {
  const currentStopRef = useRef<HTMLButtonElement>(null);

  // Compute status for all main stops sequentially
  // Main road unlock rule: A main stop unlocks when the previous main stop is passed or skipped.
  // The very first main stop is unlocked by default.
  // A bonus stop unlocks when its afterTopic is passed or skipped.

  const stageOrder = ['fresh', 'junior', 'mid', 'senior', 'staff'];
  const currentStageIndex = stageOrder.indexOf(currentLevelId);

  // Determine state of each stop
  let previousMainPassed = true; // first topic unlocked
  let foundCurrent = false;

  const stopStates = new Map<string, StopState>();

  // Gather all main stops in road order
  const allMainStops: PathStop[] = [];
  for (const stage of stages) {
    for (const stop of stage.stops) {
      if (!stop.isBonus) allMainStops.push(stop);
    }
  }

  for (const stop of allMainStops) {
    const res = results[stop.id];
    const isPassed = res?.passed;

    if (isPassed) {
      // Check if updated: topic.version > passed.version
      const isUpdated = stop.version > (res.version || 1);
      stopStates.set(stop.id, isUpdated ? 'updated' : 'passed');
      previousMainPassed = true;
    } else if (previousMainPassed && !foundCurrent) {
      stopStates.set(stop.id, 'current');
      foundCurrent = true;
      previousMainPassed = false;
    } else {
      stopStates.set(stop.id, 'locked');
      previousMainPassed = false;
    }
  }

  // Determine state of bonus stops
  for (const stage of stages) {
    for (const stop of stage.stops) {
      if (stop.isBonus) {
        const afterPassed = stop.afterTopicId ? results[stop.afterTopicId]?.passed : false;
        const res = results[stop.id];
        if (res?.passed) {
          stopStates.set(stop.id, 'passed');
        } else if (afterPassed) {
          stopStates.set(stop.id, 'bonus');
        } else {
          stopStates.set(stop.id, 'locked');
        }
      }
    }
  }

  const handleScrollToCurrent = () => {
    currentStopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="relative max-w-xl mx-auto px-4 py-8 space-y-12">
      {stages.map((stage, stageIdx) => {
        const isFolded = foldedStages.has(stage.level.id);
        const stageIndex = stageOrder.indexOf(stage.level.id);
        const canSkipStage = stageIndex < currentStageIndex;

        // Stage stats
        const mainStageStops = stage.stops.filter((s) => !s.isBonus);
        const doneMainStops = mainStageStops.filter((s) => results[s.id]?.passed);
        const stageScores = doneMainStops.map((s) => results[s.id]?.bestScore ?? 0);
        const stageAvg =
          stageScores.length > 0
            ? Math.round(stageScores.reduce((a, b) => a + b, 0) / stageScores.length)
            : 0;
        const updatedCount = doneMainStops.filter((s) => stopStates.get(s.id) === 'updated').length;

        // Group stops by unit within this stage
        const unitMap = new Map<string, { title: string; stops: PathStop[] }>();
        for (const stop of stage.stops) {
          if (!unitMap.has(stop.unitId)) {
            unitMap.set(stop.unitId, { title: stop.unitTitle, stops: [] });
          }
          unitMap.get(stop.unitId)!.stops.push(stop);
        }

        return (
          <section
            key={stage.level.id}
            aria-label={`${stage.level.title} stage`}
            className="space-y-6"
          >
            {/* Stage Sign */}
            <StageCard
              level={stage.level}
              doneCount={doneMainStops.length}
              totalCount={mainStageStops.length}
              averageScore={stageAvg}
              isFolded={isFolded}
              onToggleFold={() => onToggleFold(stage.level.id)}
              canSkipStage={canSkipStage}
              onSkipStageClick={() => onSkipStageClick(stage.level.id)}
              updatedCount={updatedCount}
            />

            {/* Stage Stops Road (hidden when folded) */}
            {!isFolded && (
              <div className="relative space-y-10 pl-2 pr-2">
                {Array.from(unitMap.entries()).map(([unitId, unitGroup], unitIdx) => {
                  const unitMainStops = unitGroup.stops.filter((s) => !s.isBonus);
                  const unitDoneStops = unitMainStops.filter((s) => results[s.id]?.passed);
                  const canSkipUnit =
                    canSkipStage &&
                    unitMainStops.length > 0 &&
                    unitDoneStops.length < unitMainStops.length;

                  return (
                    <div key={unitId} className="space-y-6">
                      {/* Unit Signpost */}
                      <div className="flex items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs sm:text-sm font-semibold shadow-xs">
                          <span>{unitGroup.title}</span>
                          {canSkipUnit && (
                            <button
                              type="button"
                              onClick={() => onSkipUnitClick(unitId, stage.level.id)}
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline px-2 py-0.5 rounded-full bg-secondary min-h-[28px] cursor-pointer"
                            >
                              <FastForward className="w-3 h-3" />
                              Skip unit
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Stops list with alternating zig-zag */}
                      <div className="relative space-y-4">
                        {unitGroup.stops.map((stop, stopIdx) => {
                          const state = stopStates.get(stop.id) || 'locked';
                          const isLeft = (unitIdx + stopIdx) % 2 === 0;
                          const isCurrent = state === 'current';
                          const isBonus = stop.isBonus;
                          const result = results[stop.id];

                          return (
                            <div
                              key={stop.id}
                              className={`flex items-center gap-4 ${
                                isBonus
                                  ? 'pl-10 opacity-90'
                                  : isLeft
                                  ? 'flex-row justify-start'
                                  : 'flex-row-reverse justify-start text-right'
                              }`}
                            >
                              {/* Stop Node Button */}
                              <button
                                ref={isCurrent ? currentStopRef : null}
                                type="button"
                                onClick={() => onSelectStop(stop, state)}
                                aria-label={`${stop.title}: ${state} stop`}
                                className={`relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-3 focus-visible:outline-ring ${
                                  isCurrent
                                    ? 'w-16 h-16 bg-primary text-primary-foreground ring-4 ring-primary/25 scale-105'
                                    : state === 'passed' || state === 'updated'
                                    ? 'w-14 h-14 bg-success text-success-foreground'
                                    : state === 'skipped'
                                    ? 'w-14 h-14 bg-card text-foreground border-2 border-dashed border-foreground'
                                    : isBonus
                                    ? 'w-12 h-12 bg-card text-primary border-2 border-dashed border-primary'
                                    : 'w-14 h-14 bg-card text-muted-foreground border-2 border-border'
                                }`}
                              >
                                {isCurrent && <Play className="w-6 h-6 fill-current ml-0.5" />}
                                {(state === 'passed' || state === 'updated') && (
                                  <Check className="w-6 h-6 stroke-[3]" />
                                )}
                                {state === 'skipped' && <FastForward className="w-5 h-5" />}
                                {state === 'locked' && <Lock className="w-5 h-5" />}
                                {isBonus && state === 'bonus' && <Sparkles className="w-5 h-5" />}

                                {/* Amber updated dot */}
                                {state === 'updated' && (
                                  <span
                                    aria-hidden="true"
                                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-warn border-2 border-card"
                                  />
                                )}
                              </button>

                              {/* Stop Label */}
                              <div
                                onClick={() => onSelectStop(stop, state)}
                                className="max-w-[220px] sm:max-w-xs cursor-pointer group"
                              >
                                <p
                                  className={`text-sm sm:text-base leading-snug group-hover:text-primary transition-colors ${
                                    isCurrent ? 'font-bold text-foreground' : 'font-semibold text-foreground/90'
                                  }`}
                                >
                                  {stop.title}
                                </p>
                                <span className="text-xs text-muted-foreground block">
                                  {state === 'passed' && `Passed ${result?.bestScore}%`}
                                  {state === 'updated' && `Passed ${result?.bestScore}% · Updated`}
                                  {state === 'current' && 'You are here'}
                                  {state === 'skipped' && `Skipped ${result?.bestScore}%`}
                                  {state === 'locked' && 'Locked'}
                                  {isBonus && state === 'bonus' && 'Bonus · Optional'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      {/* Floating "Go to my stop" Button */}
      {foundCurrent && (
        <button
          type="button"
          onClick={handleScrollToCurrent}
          className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-ring"
        >
          <MapPin className="w-4 h-4" />
          Go to my stop
        </button>
      )}
    </div>
  );
}
