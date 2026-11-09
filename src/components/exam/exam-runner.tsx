'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Clock,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  SlidersHorizontal,
} from 'lucide-react';
import type { PreparedQuestion, ShuffledOption } from '@/lib/curriculum/exam-engine';
import type { GradingResponse } from '@/lib/ai/schema';

export interface QuestionReview {
  question: PreparedQuestion;
  userChoiceId?: string;
  isCorrect: boolean;
  userText?: string;
  rubricScore?: number;
  aiGraded?: boolean;
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

  // Phase 6: AI Grading States
  const [isAiGrading, setIsAiGrading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<GradingResponse | null>(null);
  const [showManualOverride, setShowManualOverride] = useState(false);

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
              <span><strong>Instant feedback</strong> with automated AI grading on written responses.</span>
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
      // Manual self-check without AI
      setIsChecked(true);
      setShowManualOverride(true);
      return;
    }
    if (!selectedOptionId) return;
    setIsChecked(true);
  };

  const handleGradeWithAi = async () => {
    if (!userText.trim()) return;
    setIsAiGrading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.id,
          questionType: currentQ.type,
          prompt: currentQ.prompt,
          rubric: currentQ.rubric || [],
          learnerAnswer: userText.trim(),
          modelAnswer: currentQ.modelAnswer,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Service returned status ${response.status}`);
      }

      const data: GradingResponse = await response.json();
      setAiResult(data);

      // Auto-populate rubric grades from AI response
      const newGrades: Record<number, number> = {};
      currentQ.rubric?.forEach((r, idx) => {
        const match = data.criteria.find(
          (c) => c.criterion.trim().toLowerCase() === r.criterion.trim().toLowerCase()
        ) || data.criteria[idx];

        if (match?.status === 'met') {
          newGrades[idx] = 1;
        } else if (match?.status === 'partlyMet') {
          newGrades[idx] = 0.5;
        } else {
          newGrades[idx] = 0;
        }
      });

      setRubricGrades(newGrades);
      setIsChecked(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'AI grading failed.';
      setAiError(msg);
      // Fallback: reveal manual rubric self-check so learner is never blocked
      setIsChecked(true);
      setShowManualOverride(true);
    } finally {
      setIsAiGrading(false);
    }
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
      aiGraded: Boolean(aiResult && !showManualOverride),
    };

    const newReviews = [...reviews, currentReview];
    setReviews(newReviews);

    // Reset current question input state
    setSelectedOptionId(null);
    setUserText('');
    setIsChecked(false);
    setRubricGrades({});
    setAiResult(null);
    setAiError(null);
    setShowManualOverride(false);

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

        {/* Checked Feedback Box (MCQ & Code-reading) */}
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

        {/* Written / Code-Write Input & AI / Self-Check Grading */}
        {!isChoiceQuestion && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase">
              <span>Your answer</span>
              <span>{userText.length} / 2000</span>
            </div>

            <textarea
              rows={5}
              maxLength={2000}
              disabled={isChecked || isAiGrading}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder={currentQ.starterCode || 'Write your response here…'}
              className="w-full p-3.5 rounded-xl border border-border bg-card text-foreground text-sm font-mono focus:ring-2 focus:ring-ring focus:outline-none disabled:opacity-70"
            />

            {/* Pre-check Action Buttons */}
            {!isChecked && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <button
                  type="button"
                  disabled={!userText.trim() || isAiGrading}
                  onClick={handleGradeWithAi}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 active:scale-98 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
                >
                  {isAiGrading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Evaluating with AI coach…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Grade with AI Coach
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={!userText.trim() || isAiGrading}
                  onClick={handleCheck}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all cursor-pointer min-h-[44px]"
                >
                  Self-check manually
                </button>
              </div>
            )}

            {/* Offline / Error Alert Banner */}
            {aiError && (
              <div className="p-4 rounded-xl border border-warn/30 bg-warn-soft text-foreground text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <AlertTriangle className="w-5 h-5 text-warn flex-none mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-warn">
                    AI grading is temporarily unavailable
                  </p>
                  <p className="text-muted-foreground">
                    {aiError}. You can self-check your answer using the rubric below without losing any progress.
                  </p>
                </div>
              </div>
            )}

            {/* Evaluated Results View */}
            {isChecked && (
              <div className="bg-card border border-border rounded-2xl p-5 space-y-5 animate-in fade-in">
                {/* AI Evaluation Card */}
                {aiResult && !showManualOverride && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary">
                          <Sparkles className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">AI Coach Evaluation</h4>
                          <p className="text-xs text-muted-foreground">Graded against the topic rubric</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-extrabold px-3 py-1 rounded-full ${
                            aiResult.score >= passMark
                              ? 'bg-success/15 text-success'
                              : 'bg-destructive/15 text-destructive'
                          }`}
                        >
                          {aiResult.score}%
                        </span>
                      </div>
                    </div>

                    {aiResult.keyCriterionMissed && (
                      <div className="p-3 rounded-xl bg-warn-soft border border-warn/30 text-xs text-warn flex items-center gap-2 font-medium">
                        <AlertTriangle className="w-4 h-4 flex-none" />
                        <span>A key criterion was missed, which caps the score for this question at 50% max.</span>
                      </div>
                    )}

                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border/60 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                      {aiResult.summaryFeedback}
                    </div>

                    {/* Criteria Checklist Breakdown */}
                    <div className="space-y-2 pt-1">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Rubric Criteria Breakdown
                      </h5>
                      <div className="space-y-2">
                        {aiResult.criteria.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-border bg-background space-y-1.5"
                          >
                            <div className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                              <span className="font-medium text-foreground">{c.criterion}</span>
                              <span
                                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex-none ${
                                  c.status === 'met'
                                    ? 'bg-success/15 text-success'
                                    : c.status === 'partlyMet'
                                    ? 'bg-warn-soft text-warn'
                                    : 'bg-destructive/15 text-destructive'
                                }`}
                              >
                                {c.status === 'met'
                                  ? 'Met (100%)'
                                  : c.status === 'partlyMet'
                                  ? 'Partly (50%)'
                                  : 'Not Met (0%)'}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{c.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowManualOverride(true)}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Adjust grades manually
                      </button>
                    </div>
                  </div>
                )}

                {/* Model Answer Drawer */}
                <div className="space-y-1 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Reference Model Answer
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-mono bg-muted p-3.5 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {currentQ.modelAnswer}
                  </p>
                </div>

                {/* Manual Rubric Self-Check (Shown if opted-in, fallback, or adjusted) */}
                {(showManualOverride || !aiResult) && (
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Self-Check Rubric (Grade yourself against each criterion)
                      </h4>
                      {aiResult && (
                        <button
                          type="button"
                          onClick={() => setShowManualOverride(false)}
                          className="text-xs text-primary hover:underline font-semibold cursor-pointer"
                        >
                          Back to AI evaluation
                        </button>
                      )}
                    </div>

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
                )}
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
              disabled={isChoiceQuestion ? !selectedOptionId : !userText.trim() || isAiGrading}
              onClick={isChoiceQuestion ? handleCheck : handleGradeWithAi}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-95 active:scale-95 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] cursor-pointer"
            >
              {isChoiceQuestion ? (
                'Check answer'
              ) : isAiGrading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Grading…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Grade with AI
                </>
              )}
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
