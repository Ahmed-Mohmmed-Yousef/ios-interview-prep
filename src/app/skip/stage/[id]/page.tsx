import { notFound } from 'next/navigation';
import { getLevels, getRules } from '@/lib/curriculum';
import { drawStageSkipQuestions } from '@/lib/curriculum/exam-engine';
import { SkipExamClient } from '@/components/exam/skip-exam-client';

interface StageSkipPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StageSkipPage({ params }: StageSkipPageProps) {
  const { id } = await params;
  const levels = getLevels();
  const level = levels.find((l) => l.id === id);

  if (!level) {
    notFound();
  }

  const rules = getRules();
  const { questions, coveredTopicIds } = drawStageSkipQuestions(id, rules);

  if (questions.length === 0) {
    notFound();
  }

  return (
    <SkipExamClient
      kind="level"
      targetId={id}
      title={`Skip ${level.title} Stage`}
      coveredTopicIds={coveredTopicIds}
      questions={questions}
      passMark={rules.skipPassMark}
    />
  );
}
