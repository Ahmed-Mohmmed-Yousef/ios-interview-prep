'use client';

import React from 'react';
import { brand } from '@/lib/brand';
import { Compass, BookOpen, CheckCircle, ShieldCheck, ArrowRight, Upload } from 'lucide-react';

interface WelcomeScreenProps {
  onChooseLevel: () => void;
  onImportClick?: () => void;
  passMark: number;
}

export function WelcomeScreen({
  onChooseLevel,
  onImportClick,
  passMark,
}: WelcomeScreenProps) {
  return (
    <div className="mx-auto max-w-xl space-y-8 py-8 px-4 sm:px-6">
      {/* Brand Header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary text-primary shadow-sm mb-2">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {brand.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          {brand.tagline}
        </p>
      </header>

      {/* Value Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-xs">
          <ShieldCheck className="w-4 h-4 text-success" aria-hidden="true" />
          100% Free
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-xs">
          <CheckCircle className="w-4 h-4 text-success" aria-hidden="true" />
          No account needed
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-xs">
          <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
          Progress stays on device
        </span>
      </div>

      {/* How it works card */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          How it works
        </h2>

        <ol className="space-y-4 text-sm sm:text-base">
          <li className="flex items-start gap-3">
            <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-primary font-bold text-sm">
              1
            </span>
            <div className="pt-0.5">
              <strong className="text-foreground">Read a friendly lesson</strong>
              <p className="text-muted-foreground text-sm">
                Each topic uses plain analogies, interactive step diagrams, and Swift 6 code examples.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-primary font-bold text-sm">
              2
            </span>
            <div className="pt-0.5">
              <strong className="text-foreground">Take the exam</strong>
              <p className="text-muted-foreground text-sm">
                Pass at {passMark}% to unlock the next stop on your road. Retakes draw fresh questions anytime.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-primary font-bold text-sm">
              3
            </span>
            <div className="pt-0.5">
              <strong className="text-foreground">Follow your winding path</strong>
              <p className="text-muted-foreground text-sm">
                Travel from Fresh to your target level with skip tests for earlier topics you already master.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Main Actions */}
      <div className="space-y-3 pt-2 text-center">
        <button
          type="button"
          onClick={onChooseLevel}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-ring"
        >
          Choose my level
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>

        {onImportClick && (
          <button
            type="button"
            onClick={onImportClick}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline min-h-[44px] cursor-pointer"
          >
            <Upload className="w-4 h-4" aria-hidden="true" />
            Have a progress file from another browser? Import it
          </button>
        )}
      </div>
    </div>
  );
}
