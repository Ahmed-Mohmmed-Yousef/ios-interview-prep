'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/lib/store/progress';
import { ExamRunner, type QuestionReview } from './exam-runner';
import { TopicResultScreen } from './topic-result-screen';
import type { PreparedQuestion } from '@/lib/curriculum/exam-engine';
import type { TopicMeta } from '@/lib/curriculum/schema';

interface TopicExamClientProps {
  topic: TopicMeta;
  questions: PreparedQuestion[];
  passMark: number;
  nextTopic?: TopicMeta | null;
}

export function TopicExamClient({
  topic,
  questions,
  passMark,
  nextTopic,
}: TopicExamClientProps) {
  const router = useRouter();
  const recordTopicScore = useProgress((state) => state.recordTopicScore);
  const results = useProgress((state) => state.results);

  const [examResult, setExamResult] = useState<{
    score: number;
    elapsedSeconds: number;
    reviews: QuestionReview[];
  } | null>(null);

  const handleExamComplete = (
    score: number,
    elapsedSeconds: number,
    reviews: QuestionReview[]
  ) => {
    // Record into Zustand progress store
    recordTopicScore(topic.id, topic.version, score, passMark);
    setExamResult({ score, elapsedSeconds, reviews });
  };

  const handleRetake = () => {
    setExamResult(null);
    window.location.reload();
  };

  const currentBest = results[topic.id]?.bestScore ?? (examResult ? examResult.score : 0);

  if (examResult) {
    return (
      <TopicResultScreen
        topic={topic}
        score={examResult.score}
        passMark={passMark}
        bestScore={currentBest}
        elapsedSeconds={examResult.elapsedSeconds}
        reviews={examResult.reviews}
        nextTopic={nextTopic}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <ExamRunner
      title={topic.title}
      questions={questions}
      passMark={passMark}
      onComplete={handleExamComplete}
      onSaveAndLeave={() => router.push('/path')}
    />
  );
}
