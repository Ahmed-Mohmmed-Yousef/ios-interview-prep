'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Lock, CheckCircle, ArrowRight, RefreshCw, AlertTriangle, Play, Sparkles } from 'lucide-react';
import type { PathStop } from '@/lib/curriculum/scoring';
import type { TopicResult } from '@/lib/store/progress';

export type StopState = 'locked' | 'current' | 'passed' | 'updated' | 'skipped' | 'bonus';

interface StopSheetProps {
  stop: PathStop | null;
  state: StopState;
  result?: TopicResult;
  blockingPrerequisite?: PathStop | null;
  onClose: () => void;
  onGoToStop: (stopId: string) => void;
}

export function StopSheet({
  stop,
  state,
  result,
  blockingPrerequisite,
  onClose,
  onGoToStop,
}: StopSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!stop) return null;

  const isLocked = state === 'locked';
  const isUpdated = state === 'updated';
  const isPassed = state === 'passed';
  const isSkipped = state === 'skipped';
  const isCurrent = state === 'current';
  const isBonus = state === 'bonus';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stop-sheet-title"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        className="w-full max-w-lg bg-card border-t sm:border border-border rounded-t-3xl sm:rounded-2xl p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Top bar with unit & close */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {stop.unitTitle} · {stop.level} stage
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="stop-sheet-title" className="text-xl sm:text-2xl font-bold text-foreground">
              {stop.title}
            </h2>

            {isPassed && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-success text-success-foreground">
                <CheckCircle className="w-3.5 h-3.5" />
                Passed {result?.bestScore}%
              </span>
            )}

            {isUpdated && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-warn text-warn-foreground">
                <AlertTriangle className="w-3.5 h-3.5" />
                Passed {result?.bestScore}% · Updated
              </span>
            )}

            {isCurrent && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                <Play className="w-3 h-3 fill-current" />
                You are here
              </span>
            )}

            {isSkipped && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-foreground border border-dashed border-foreground">
                Skipped {result?.bestScore}%
              </span>
            )}

            {isLocked && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            )}

            {isBonus && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-primary border border-dashed border-primary">
                <Sparkles className="w-3 h-3" />
                Bonus Stop
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-foreground/90">
            {stop.goal}
          </p>
        </div>

        {/* Updated Notice */}
        {isUpdated && (
          <div className="bg-warn-soft border border-warn/40 rounded-xl p-3 text-xs sm:text-sm text-foreground space-y-1">
            <strong className="block text-warn font-semibold">
              Topic updated with new content
            </strong>
            <p className="text-muted-foreground">
              Your passing score ({result?.bestScore}%) remains earned. Retaking the exam is completely optional.
            </p>
          </div>
        )}

        {/* Locked Notice (Screen S4) */}
        {isLocked && (
          <div className="bg-muted border border-border rounded-xl p-4 text-sm space-y-3">
            <div className="flex items-start gap-2.5">
              <Lock className="w-5 h-5 text-muted-foreground flex-none mt-0.5" />
              <div>
                <strong className="text-foreground block">
                  Pass {blockingPrerequisite ? blockingPrerequisite.title : 'the previous topic'} first
                </strong>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Topics on the road are unlocked sequentially to ensure foundational concepts are solid.
                </p>
              </div>
            </div>

            {blockingPrerequisite && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToStop(blockingPrerequisite.id);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-card border border-border text-foreground font-semibold text-xs sm:text-sm hover:bg-background transition-colors cursor-pointer"
              >
                Go to {blockingPrerequisite.title}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Actions for Unlocked Stops */}
        {!isLocked && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              href={`/topics/${stop.id}/lesson`}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer text-center"
            >
              {isPassed || isSkipped ? 'Read lesson again' : 'Start lesson'}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/topics/${stop.id}/exam`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-2.5 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted/50 transition-colors cursor-pointer"
            >
              {isPassed || isSkipped ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Retake exam
                </>
              ) : (
                'Take exam'
              )}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
