'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, X, ShieldAlert, Sparkles, Clock, HelpCircle } from 'lucide-react';
import type { PreparedQuestion, ShuffledOption } from '@/lib/curriculum/exam-engine';

export interface QuestionReview {
  question: PreparedQuestion;
  userChoiceId?: string;
  isCorrect: boolean;
  userText?: string;
  rubricScore?: number;
}

interface ExamRunnerProps {
  title: string;
  questions: PreparedQuestion[];
  passMark: number;
  onComplete: (score: number, elapsedSeconds: number, reviews: QuestionReview[]) => void;
  onSaveAndLeave: () => void;
  isSkipTest?: boolean;
}

export function ExamRunner({
  title,
  questions,
  passMark,
  onComplete,
  onSaveAndLeave,
  isSkipTest = false,
}: ExamRunnerProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [rubricGrades, setRubricGrades] = useState<Record<number, number>>({});
  const [reviews, setReviews] = useState<QuestionReview[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer
  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  const total = questions.length;
  const currentQ = questions[currentIdx];

  if (!started) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
        <header className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary text-primary mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isSkipTest ? title : `${title} Exam`}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isSkipTest
              ? `Pass at ${passMark}% to skip these topics on your path.`
              : `Pass at ${passMark}% to unlock the next stop on your road.`}
          </p>
        </header>

        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground">Before you start</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">·</span>
              <span><strong>{total} questions</strong> with shuffled answer choices.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">·</span>
              <span><strong>Immediate feedback</strong>: check your answer after each question.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">·</span>
              <span><strong>No time limit</strong>: take your time. Duration is shown at the end.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">·</span>
              <span><strong>Unlimited retakes</strong>: retrying draws fresh questions from the bank.</span>
            </li>
          </ul>
        </section>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            Start Exam
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const isChoiceQuestion = currentQ.type === 'mcq' || currentQ.type === 'code-reading';
  const chosenOption = currentQ.options?.find((o) => o.id === selectedOptionId);
  const correctOption = currentQ.options?.find((o) => o.isCorrect);

  const handleCheck = () => {
    if (!isChoiceQuestion) {
      setIsChecked(true);
      return;
    }
    if (!selectedOptionId) return;
    setIsChecked(true);
  };

  const handleNext = () => {
    let isCorrect = false;
    let rubricScore = 0;

    if (isChoiceQuestion) {
      isCorrect = Boolean(chosenOption?.isCorrect);
    } else {
      // Rubric scoring
      const rubric = currentQ.rubric || [];
      let totalEarned = 0;
      let keyMissed = false;

      rubric.forEach((item, idx) => {
        const grade = rubricGrades[idx] ?? 0;
        totalEarned += item.weight * grade;
        if (item.key && grade === 0) {
          keyMissed = true;
        }
      });

      rubricScore = Math.round(totalEarned);
      if (keyMissed && rubricScore > 50) {
        rubricScore = 50; // Cap at 50% if a key criterion is missed
      }
      isCorrect = rubricScore >= passMark;
    }

    const currentReview: QuestionReview = {
      question: currentQ,
      userChoiceId: selectedOptionId || undefined,
      isCorrect,
      userText: userText || undefined,
      rubricScore: !isChoiceQuestion ? rubricScore : undefined,
    };

    const newReviews = [...reviews, currentReview];
    setReviews(newReviews);

    // Reset current question input state
    setSelectedOptionId(null);
    setUserText('');
    setIsChecked(false);
    setRubricGrades({});

    if (currentIdx < total - 1) {
      setCurrentIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Exam finished! Calculate score
      const choiceCorrect = newReviews.filter((r) => r.isCorrect).length;
      const finalScore = Math.round((choiceCorrect / total) * 100);
      onComplete(finalScore, elapsedSeconds, newReviews);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-28">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border shadow-xs">
        <div className="max-w-2xl mx-auto px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onSaveAndLeave}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Save and leave
            </button>

            <span className="text-xs sm:text-sm font-bold text-foreground">
              Question {currentIdx + 1} of {total}
            </span>

            <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary text-primary">
              {currentQ.type}
            </span>
          </div>

          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Question Body */}
      <main className="max-w-2xl mx-auto px-4 py-6 w-full flex-1 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Optional Code Snippet for code-reading */}
          {currentQ.code && (
            <pre className="p-4 rounded-xl bg-card border border-border text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
              <code>{currentQ.code}</code>
            </pre>
          )}
        </div>

        {/* Choice Options (Tap-then-Check) */}
        {isChoiceQuestion && currentQ.options && (
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optStyle = 'bg-card border-border hover:bg-muted/30 text-foreground';

              if (isChecked) {
                if (opt.isCorrect) {
                  optStyle = 'bg-success/15 border-success text-foreground font-semibold ring-2 ring-success/20';
                } else if (isSelected) {
                  optStyle = 'bg-destructive/10 border-destructive text-foreground';
                } else {
                  optStyle = 'opacity-60 bg-muted/40 border-border text-muted-foreground';
                }
              } else if (isSelected) {
                optStyle = 'bg-secondary/40 border-primary ring-2 ring-primary/20 text-foreground font-semibold';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isChecked}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left text-sm transition-all cursor-pointer min-h-[48px] ${optStyle}`}
                >
                  <span className="flex-none flex items-center justify-center w-6 h-6 rounded-md bg-muted text-foreground font-bold text-xs uppercase">
                    {opt.id}
                  </span>
                  <span className="flex-1 leading-snug pt-0.5">{opt.text}</span>
                  {isChecked && opt.isCorrect && (
                    <Check className="w-5 h-5 text-success flex-none" />
                  )}
                  {isChecked && isSelected && !opt.isCorrect && (
                    <X className="w-5 h-5 text-destructive flex-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Checked Feedback Box */}
        {isChecked && isChoiceQuestion && (
          <div
            className={`p-4 rounded-2xl border text-sm space-y-2 animate-in fade-in ${
              chosenOption?.isCorrect
                ? 'bg-success/10 border-success/30'
                : 'bg-muted border-border'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {chosenOption?.isCorrect ? (
                <span className="text-success inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" /> Correct!
                </span>
              ) : (
                <span className="text-destructive inline-flex items-center gap-1.5">
                  <X className="w-4 h-4 stroke-[3]" />
                  Incorrect. Correct answer is option {correctOption?.id?.toUpperCase()}.
                </span>
              )}
            </div>

            {chosenOption && (
              <p className="text-xs sm:text-sm text-foreground/90">
                {chosenOption.explanation}
              </p>
            )}

            {!chosenOption?.isCorrect && correctOption && (
              <p className="text-xs sm:text-sm text-muted-foreground pt-1 border-t border-border/50">
                <strong>Why {correctOption.id.toUpperCase()} is correct:</strong> {correctOption.explanation}
              </p>
            )}
          </div>
        )}

        {/* Written / Code-Write Input & Rubric Self-Check */}
        {!isChoiceQuestion && (
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-muted-foreground uppercase">
              Your answer
            </label>
            <textarea
              rows={5}
              disabled={isChecked}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder={currentQ.starterCode || 'Write your response here…'}
              className="w-full p-3.5 rounded-xl border border-border bg-card text-foreground text-sm font-mono focus:ring-2 focus:ring-ring focus:outline-none"
            />

            {isChecked && (
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Model Answer
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-mono bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {currentQ.modelAnswer}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Self-Check Rubric (Grade yourself against each criterion)
                  </h4>

                  {currentQ.rubric?.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border bg-background space-y-2">
                      <div className="flex items-start justify-between gap-2 text-xs sm:text-sm font-medium">
                        <span>{item.criterion}</span>
                        {item.key && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warn-soft text-warn flex-none">
                            Key point
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setRubricGrades({ ...rubricGrades, [idx]: 1 })}
                          className={`px-3 py-1 rounded-full text-xs font-semibold min-h-[32px] cursor-pointer ${
                            rubricGrades[idx] === 1 ? 'bg-success text-success-foreground' : 'bg-muted text-foreground'
                          }`}
                        >
                          Yes (100%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRubricGrades({ ...rubricGrades, [idx]: 0.5 })}
                          className={`px-3 py-1 rounded-full text-xs font-semibold min-h-[32px] cursor-pointer ${
                            rubricGrades[idx] === 0.5 ? 'bg-warn text-warn-foreground' : 'bg-muted text-foreground'
                          }`}
                        >
                          Partly (50%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRubricGrades({ ...rubricGrades, [idx]: 0 })}
                          className={`px-3 py-1 rounded-full text-xs font-semibold min-h-[32px] cursor-pointer ${
                            rubricGrades[idx] === 0 ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-foreground'
                          }`}
                        >
                          No (0%)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s</span>
          </div>

          {!isChecked ? (
            <button
              type="button"
              disabled={isChoiceQuestion ? !selectedOptionId : !userText.trim()}
              onClick={handleCheck}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-95 active:scale-95 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] cursor-pointer"
            >
              Check answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-95 active:scale-95 transition-all shadow-sm min-h-[44px] cursor-pointer"
            >
              {currentIdx === total - 1 ? 'See my result' : 'Next question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
