'use client';

import React from 'react';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Compass, Settings, ChevronRight } from 'lucide-react';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';

interface PathHeaderProps {
  levels: LevelDefinition[];
  currentLevelId: LevelId;
  onLevelChange: (levelId: LevelId) => void;
  doneCount: number;
  totalCount: number;
  percentage: number;
  pathScore: number;
}

export function PathHeader({
  levels,
  currentLevelId,
  onLevelChange,
  doneCount,
  totalCount,
  percentage,
  pathScore,
}: PathHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border shadow-xs">
      <div className="max-w-2xl mx-auto px-4 py-3 space-y-2.5">
        {/* Brand & Level Picker Row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-foreground hover:opacity-85 focus-visible:outline-3 focus-visible:outline-ring rounded-lg py-1 px-1"
          >
            <div className="w-8 h-8 rounded-xl bg-secondary text-primary flex items-center justify-center">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-base sm:text-lg">{brand.name}</span>
          </Link>

          <div className="flex items-center gap-2">
            <label htmlFor="level-select" className="sr-only">
              Current level
            </label>
            <select
              id="level-select"
              value={currentLevelId}
              onChange={(e) => onLevelChange(e.target.value as LevelId)}
              className="font-semibold text-xs sm:text-sm bg-muted text-foreground border border-border rounded-full px-3 py-1.5 min-h-[36px] cursor-pointer focus-visible:outline-3 focus-visible:outline-ring"
            >
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.title} Level
                </option>
              ))}
            </select>

            <Link
              href="/settings"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-3 focus-visible:outline-ring"
              aria-label="Settings and progress"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Progress & Path Score Stats */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground font-medium">
              <strong className="text-foreground">{doneCount}</strong> of{' '}
              <strong className="text-foreground">{totalCount}</strong> topics done
            </span>
            <span className="text-muted-foreground font-medium">
              Path score:{' '}
              <strong className="text-foreground">
                {doneCount > 0 ? `${pathScore}%` : '—'}
              </strong>
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 w-full bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-label="Path completion percentage"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
