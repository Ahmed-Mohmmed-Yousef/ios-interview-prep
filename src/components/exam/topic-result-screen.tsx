'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, BookOpen, Clock, Award, ChevronDown } from 'lucide-react';
import type { QuestionReview } from './exam-runner';
import type { TopicMeta } from '@/lib/curriculum/schema';

interface TopicResultScreenProps {
  topic: TopicMeta;
  score: number;
  passMark: number;
  bestScore: number;
  elapsedSeconds: number;
  reviews: QuestionReview[];
  nextTopic?: TopicMeta | null;
  onRetake: () => void;
}

export function TopicResultScreen({
  topic,
  score,
  passMark,
  bestScore,
  elapsedSeconds,
  reviews,
  nextTopic,
  onRetake,
}: TopicResultScreenProps) {
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const isPassed = score >= passMark;
  const correctCount = reviews.filter((r) => r.isCorrect).length;
  const mistakeReviews = reviews.filter((r) => !r.isCorrect);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Header Result Card */}
      <section
        className={`text-center rounded-3xl p-8 border space-y-4 shadow-sm animate-in fade-in ${
          isPassed
            ? 'bg-success-soft/40 border-success/30'
            : 'bg-card border-border'
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-1">
          {isPassed ? (
            <div className="w-16 h-16 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-md animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
              <XCircle className="w-10 h-10" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            {score}%
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            {isPassed ? 'You passed!' : 'Not passed yet'}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
            {isPassed
              ? 'The next stop on your road is unlocked. Great work!'
              : `You need ${passMark}% to unlock the next stop. Review your mistakes below and try again.`}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center">
          <div className="p-2">
            <span className="text-xs text-muted-foreground block">Correct</span>
            <strong className="text-base text-foreground font-bold">
              {correctCount} / {reviews.length}
            </strong>
          </div>
          <div className="p-2">
            <span className="text-xs text-muted-foreground block">Best score</span>
            <strong className="text-base text-foreground font-bold">
              {bestScore}%
            </strong>
          </div>
          <div className="p-2">
            <span className="text-xs text-muted-foreground block">Time</span>
            <strong className="text-base text-foreground font-bold">
              {minutes}m {seconds}s
            </strong>
          </div>
        </div>
      </section>

      {/* Main Action Buttons */}
      <div className="space-y-3">
        {isPassed && nextTopic && (
          <Link
            href={`/topics/${nextTopic.id}/lesson`}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer text-center"
          >
            Next topic: {nextTopic.title}
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRetake}
            className={`flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full font-semibold text-sm transition-colors cursor-pointer border ${
              isPassed
                ? 'bg-card border-border text-foreground hover:bg-muted'
                : 'bg-primary text-primary-foreground border-transparent hover:opacity-95'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            {isPassed ? 'Take it again' : 'Try again with new questions'}
          </button>

          <Link
            href={`/topics/${topic.id}/lesson`}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors cursor-pointer text-center"
          >
            <BookOpen className="w-4 h-4" />
            Read lesson again
          </Link>
        </div>

        <div className="text-center pt-1">
          <Link
            href="/path"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer min-h-[36px]"
          >
            Back to path
          </Link>
        </div>
      </div>

      {/* Mistakes Review First */}
      {mistakeReviews.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-foreground">
            Review your mistakes ({mistakeReviews.length})
          </h2>

          <div className="space-y-3">
            {mistakeReviews.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-card border border-destructive/30 space-y-3 shadow-xs"
              >
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-destructive flex-none mt-0.5" />
                  <p className="text-sm font-semibold text-foreground">
                    {r.question.prompt}
                  </p>
                </div>

                {r.question.options && (
                  <div className="text-xs space-y-1.5 pl-7">
                    {r.userChoiceId && (
                      <p className="text-destructive font-medium">
                        Your answer: Option {r.userChoiceId.toUpperCase()} (
                        {r.question.options.find((o) => o.id === r.userChoiceId)?.text})
                      </p>
                    )}
                    <p className="text-success font-medium">
                      Correct answer: Option{' '}
                      {r.question.options.find((o) => o.isCorrect)?.id?.toUpperCase()} (
                      {r.question.options.find((o) => o.isCorrect)?.text})
                    </p>
                    <p className="text-muted-foreground pt-1">
                      {r.question.options.find((o) => o.isCorrect)?.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show All Questions Accordion */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAllQuestions(!showAllQuestions)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
        >
          <span>All {reviews.length} exam questions</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showAllQuestions ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showAllQuestions && (
          <div className="mt-3 space-y-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border text-sm space-y-2 ${
                  r.isCorrect
                    ? 'bg-success/5 border-success/30'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-2">
                  {r.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-success flex-none mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive flex-none mt-0.5" />
                  )}
                  <p className="font-medium text-foreground">{r.question.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
