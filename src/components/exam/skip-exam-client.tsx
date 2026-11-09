'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/lib/store/progress';
import { ExamRunner, type QuestionReview } from './exam-runner';
import { SkipResultScreen } from './skip-result-screen';
import type { PreparedQuestion } from '@/lib/curriculum/exam-engine';

interface SkipExamClientProps {
  kind: 'unit' | 'level';
  targetId: string;
  title: string;
  coveredTopicIds: string[];
  questions: PreparedQuestion[];
  passMark: number;
}

export function SkipExamClient({
  kind,
  targetId,
  title,
  coveredTopicIds,
  questions,
  passMark,
}: SkipExamClientProps) {
  const router = useRouter();
  const recordSkip = useProgress((state) => state.recordSkip);

  const [examResult, setExamResult] = useState<{
    score: number;
  } | null>(null);

  const handleComplete = (score: number) => {
    // Record into Zustand progress store if passed
    recordSkip(kind, targetId, coveredTopicIds, score, passMark);
    setExamResult({ score });
  };

  const handleRetake = () => {
    setExamResult(null);
    window.location.reload();
  };

  if (examResult) {
    return (
      <SkipResultScreen
        title={title}
        score={examResult.score}
        passMark={passMark}
        coveredTopicCount={coveredTopicIds.length}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <ExamRunner
      title={title}
      questions={questions}
      passMark={passMark}
      onComplete={handleComplete}
      onSaveAndLeave={() => router.push('/path')}
      isSkipTest={true}
    />
  );
}
