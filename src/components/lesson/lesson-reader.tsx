'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink, AlertTriangle, BookOpen } from 'lucide-react';
import { useProgress } from '@/lib/store/progress';
import type { TopicMeta, Source } from '@/lib/curriculum/schema';

export interface LessonStep {
  title: string;
  content: React.ReactNode;
}

interface LessonReaderProps {
  topic: TopicMeta;
  steps: LessonStep[];
  sources: Source[];
  unitTitle: string;
  isUpdatedAfterPass?: boolean;
}

export function LessonReader({
  topic,
  steps,
  sources,
  unitTitle,
  isUpdatedAfterPass = false,
}: LessonReaderProps) {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const textSize = useProgress((state) => state.textSize);
  const setTextSize = useProgress((state) => state.setTextSize);

  const totalSteps = steps.length;
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = currentStepIdx === totalSteps - 1;

  // Move focus to the step's heading whenever step changes for keyboard/screen-reader users
  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStepIdx]);

  const handleNext = () => {
    if (isLastStep) {
      router.push(`/topics/${topic.id}/exam`);
    } else {
      setCurrentStepIdx((prev) => Math.min(totalSteps - 1, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text scaling class mapping
  const textSizeClass =
    textSize === 'larger'
      ? 'text-lg sm:text-xl'
      : textSize === 'large'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const activeStep = steps[currentStepIdx] || steps[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-28">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border shadow-xs">
        <div className="max-w-2xl mx-auto px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/path"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline min-h-[36px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Path
            </Link>

            <span className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-xs">
              {topic.title}
            </span>

            {/* Text size switcher */}
            <div className="flex items-center gap-1 bg-muted rounded-full p-0.5 border border-border">
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                aria-pressed={textSize === 'normal'}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full min-h-[28px] transition-colors cursor-pointer ${
                  textSize === 'normal' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                aria-pressed={textSize === 'large'}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full min-h-[28px] transition-colors cursor-pointer ${
                  textSize === 'large' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground'
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setTextSize('larger')}
                aria-pressed={textSize === 'larger'}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full min-h-[28px] transition-colors cursor-pointer ${
                  textSize === 'larger' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground'
                }`}
              >
                A++
              </button>
            </div>
          </div>

          {/* Step Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Step {currentStepIdx + 1} of {totalSteps}: {activeStep.title}
              </span>
              <span>{Math.round(((currentStepIdx + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStepIdx + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Step Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 w-full flex-1">
        {/* Updated note banner if applicable */}
        {isUpdatedAfterPass && (
          <aside className="mb-6 bg-warn-soft border border-warn/30 rounded-xl p-3.5 flex items-start gap-2.5 text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 text-warn flex-none mt-0.5" />
            <div>
              <strong className="text-foreground block">
                This topic was updated with new information
              </strong>
              <p className="text-muted-foreground">
                Your earned pass remains active. Taking the exam again is optional.
              </p>
            </div>
          </aside>
        )}

        <article className={`space-y-6 leading-relaxed ${textSizeClass}`}>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground focus:outline-none"
          >
            {activeStep.title}
          </h2>

          <div className="space-y-5">
            {activeStep.content}
          </div>

          {/* On the last step, render the sources section */}
          {isLastStep && sources.length > 0 && (
            <section className="mt-12 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Where this comes from (Official & Community Sources)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                {sources.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {s.title}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {s.kind === 'community' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary border border-primary/20">
                        Community
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>

      {/* Sticky Bottom Stepper Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirstStep}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-muted text-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-95 active:scale-95 transition-all shadow-sm min-h-[44px] cursor-pointer"
          >
            {isLastStep ? 'Start the exam' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
