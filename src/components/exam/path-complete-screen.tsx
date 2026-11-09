'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Trophy, ArrowRight, Share2, Sparkles } from 'lucide-react';
import type { Rules } from '@/lib/curriculum/schema';

interface UnitBreakdown {
  id: string;
  title: string;
  averageScore: number;
  totalTopics: number;
}

interface PathCompleteScreenProps {
  levelTitle: string;
  pathScore: number;
  rules: Rules;
  units: UnitBreakdown[];
}

export function PathCompleteScreen({
  levelTitle,
  pathScore,
  rules,
  units,
}: PathCompleteScreenProps) {
  const readyMark = rules.readiness?.ready ?? 85;
  const almostMark = rules.readiness?.almost ?? 70;

  let readinessLabel = 'Keep practicing';
  let readinessDescription =
    'You completed the path! Review topics where your scores were lower to boost your confidence.';
  let badgeStyle = 'bg-muted text-muted-foreground';

  if (pathScore >= readyMark) {
    readinessLabel = 'Interview Ready';
    readinessDescription =
      'Outstanding! Your grasp of key iOS patterns, Swift fundamentals, and trade-offs meets top-tier interview standards.';
    badgeStyle = 'bg-success text-success-foreground';
  } else if (pathScore >= almostMark) {
    readinessLabel = 'Almost Ready';
    readinessDescription =
      'Solid performance! You have passed all core topics. Polishing a few weaker areas will prepare you for any technical screen.';
    badgeStyle = 'bg-secondary text-primary border border-primary/30';
  }

  // Identify strongest and weakest units
  const sortedUnits = [...units].sort((a, b) => b.averageScore - a.averageScore);
  const strongest = sortedUnits.slice(0, 2);
  const toReview = sortedUnits.slice(-2).reverse();

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8 pb-24 animate-in fade-in">
      {/* Trophy Header */}
      <section className="text-center rounded-3xl p-8 bg-card border border-border space-y-4 shadow-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary text-primary mx-auto shadow-md animate-in zoom-in">
          <Trophy className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
            <Award className="w-4 h-4" />
            {readinessLabel}
          </span>

          <p className="text-5xl font-black text-foreground pt-1">
            {pathScore}%
          </p>

          <h1 className="text-2xl font-bold text-foreground">
            {levelTitle} Path Complete!
          </h1>

          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {readinessDescription}
          </p>
        </div>
      </section>

      {/* Unit Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
          <span className="text-xs font-bold text-success uppercase tracking-wider block">
            Strongest Units
          </span>
          <ul className="space-y-1 text-sm font-semibold text-foreground">
            {strongest.map((u) => (
              <li key={u.id} className="flex justify-between">
                <span>{u.title}</span>
                <span className="text-success">{u.averageScore}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
          <span className="text-xs font-bold text-warn uppercase tracking-wider block">
            Units to Review
          </span>
          <ul className="space-y-1 text-sm font-semibold text-foreground">
            {toReview.map((u) => (
              <li key={u.id} className="flex justify-between">
                <span>{u.title}</span>
                <span className="text-warn">{u.averageScore}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Steps Actions */}
      <div className="space-y-3 pt-2">
        <Link
          href="/start"
          className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:opacity-95 transition-all text-center"
        >
          Level up: Choose next level
          <ArrowRight className="w-5 h-5" />
        </Link>

        <Link
          href="/path"
          className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors text-center"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Explore bonus topics on your path
        </Link>

        <Link
          href="/settings"
          className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-muted text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors text-center"
        >
          <Share2 className="w-4 h-4" />
          Export and save your progress file
        </Link>
      </div>
    </div>
  );
}
