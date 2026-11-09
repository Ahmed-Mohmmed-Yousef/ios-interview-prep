'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, RefreshCw, MapPin, XCircle } from 'lucide-react';

interface SkipResultScreenProps {
  title: string;
  score: number;
  passMark: number;
  coveredTopicCount: number;
  onRetake: () => void;
}

export function SkipResultScreen({
  title,
  score,
  passMark,
  coveredTopicCount,
  onRetake,
}: SkipResultScreenProps) {
  const isPassed = score >= passMark;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto">
        {isPassed ? (
          <div className="w-16 h-16 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-md animate-in zoom-in">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
            <XCircle className="w-10 h-10" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-4xl sm:text-5xl font-black text-foreground">{score}%</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {isPassed ? 'Stage Skipped!' : 'Skip Test Not Passed'}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
          {isPassed
            ? `Congratulations! These ${coveredTopicCount} topics now count as done on your road, each marked with ${score}%.`
            : `Nothing changed. Your progress remains exactly the same. You need ${passMark}% to skip earlier topics.`}
        </p>
      </div>

      <div className="space-y-3 pt-4 max-w-sm mx-auto">
        <Link
          href="/path"
          className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
        >
          <MapPin className="w-5 h-5" />
          Back to path
        </Link>

        {!isPassed && (
          <button
            type="button"
            onClick={onRetake}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try skip test again
          </button>
        )}
      </div>
    </div>
  );
}
