import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import { getLessonData } from '@/lib/curriculum/lesson';
import { getUnits, getAllTopics } from '@/lib/curriculum';
import { compileStepMarkdown } from '@/lib/curriculum/mdx-compiler';
import { LessonReader, type LessonStep } from '@/components/lesson/lesson-reader';

export async function generateStaticParams() {
  const topics = getAllTopics();
  return Array.from(topics.keys())
    .filter((id) =>
      fs.existsSync(path.join(process.cwd(), 'content', 'topics', id, 'lesson.mdx'))
    )
    .map((id) => ({ id }));
}

interface LessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const data = getLessonData(id);

  if (!data) {
    notFound();
  }

  const allUnits = getUnits();
  const unit = allUnits.find(
    (u) => u.topics.includes(id) || (u.bonus ?? []).some((b) => b.topic === id)
  );
  const unitTitle = unit ? unit.title : 'Curriculum';

  // Compile each step markdown into React elements on the server
  const compiledSteps: LessonStep[] = [];
  for (const step of data.steps) {
    const compiledContent = await compileStepMarkdown(step.markdown);
    compiledSteps.push({
      title: step.title,
      content: compiledContent,
    });
  }

  return (
    <LessonReader
      topic={data.topic}
      steps={compiledSteps}
      sources={data.sources}
      unitTitle={unitTitle}
      isUpdatedAfterPass={false}
    />
  );
}
