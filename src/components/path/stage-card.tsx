'use client';

import React from 'react';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';
import { ChevronDown, FastForward, CheckCircle2 } from 'lucide-react';

interface StageCardProps {
  level: LevelDefinition;
  doneCount: number;
  totalCount: number;
  averageScore: number;
  isFolded: boolean;
  onToggleFold: () => void;
  canSkipStage: boolean;
  onSkipStageClick: () => void;
  updatedCount?: number;
}

export function StageCard({
  level,
  doneCount,
  totalCount,
  averageScore,
  isFolded,
  onToggleFold,
  canSkipStage,
  onSkipStageClick,
  updatedCount = 0,
}: StageCardProps) {
  const isAllDone = totalCount > 0 && doneCount >= totalCount;

  return (
    <div
      className="rounded-2xl p-5 text-card-foreground shadow-xs border transition-all"
      style={{
        backgroundColor: `color-mix(in srgb, var(--level-${level.id}) 12%, var(--card))`,
        borderColor: `color-mix(in srgb, var(--level-${level.id}) 30%, var(--border))`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-none"
              style={{ backgroundColor: `var(--level-${level.id})` }}
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {level.title} Stage
            </h2>

            {isAllDone && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-success text-success-foreground">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {doneCount} of {totalCount} topics done
            {doneCount > 0 && ` · Stage average: ${averageScore}%`}
            {updatedCount > 0 && ` · ${updatedCount} updated`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canSkipStage && !isAllDone && (
            <button
              type="button"
              onClick={onSkipStageClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-background transition-colors min-h-[36px] cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5" />
              Skip this stage
            </button>
          )}

          {isAllDone && (
            <button
              type="button"
              onClick={onToggleFold}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-card/80 text-foreground border border-border text-xs font-semibold hover:bg-card transition-colors min-h-[36px] cursor-pointer"
            >
              {isFolded ? 'Show topics' : 'Fold stage'}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isFolded ? '' : 'rotate-180'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
