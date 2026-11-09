import { notFound } from 'next/navigation';
import { getUnits, getRules } from '@/lib/curriculum';
import { drawUnitSkipQuestions } from '@/lib/curriculum/exam-engine';
import { SkipExamClient } from '@/components/exam/skip-exam-client';

interface UnitSkipPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    stage?: string;
  }>;
}

export default async function UnitSkipPage({
  params,
  searchParams,
}: UnitSkipPageProps) {
  const { id } = await params;
  const { stage = 'fresh' } = await searchParams;

  const allUnits = getUnits();
  const unit = allUnits.find((u) => u.id === id);

  if (!unit) {
    notFound();
  }

  const rules = getRules();
  const { questions, coveredTopicIds } = drawUnitSkipQuestions(id, stage, rules);

  if (questions.length === 0) {
    notFound();
  }

  return (
    <SkipExamClient
      kind="unit"
      targetId={`${id}-${stage}`}
      title={`Skip ${unit.title} (${stage} stage)`}
      coveredTopicIds={coveredTopicIds}
      questions={questions}
      passMark={rules.skipPassMark}
    />
  );
}
