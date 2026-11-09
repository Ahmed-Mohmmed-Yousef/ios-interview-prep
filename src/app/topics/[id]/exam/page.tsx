import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import { getTopic, getRules, getAllTopics, getPathForLevel } from '@/lib/curriculum';
import { drawExamQuestions } from '@/lib/curriculum/exam-engine';
import { TopicExamClient } from '@/components/exam/topic-exam-client';

export async function generateStaticParams() {
  const topics = getAllTopics();
  return Array.from(topics.keys())
    .filter((id) =>
      fs.existsSync(path.join(process.cwd(), 'content', 'topics', id, 'questions.json'))
    )
    .map((id) => ({ id }));
}

interface ExamPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { id } = await params;
  const topic = getTopic(id);

  if (!topic) {
    notFound();
  }

  const rules = getRules();
  const questions = drawExamQuestions(id, rules.topicExamSize);

  if (questions.length === 0) {
    notFound();
  }

  // Find next topic on the path
  const road = getPathForLevel(topic.level);
  const currentIdx = road.allMainStops.findIndex((s) => s.id === id);
  const nextStop = currentIdx !== -1 && currentIdx < road.allMainStops.length - 1
    ? road.allMainStops[currentIdx + 1]
    : null;
  const nextTopic = nextStop ? getTopic(nextStop.id) : null;

  return (
    <TopicExamClient
      topic={topic}
      questions={questions}
      passMark={rules.topicPassMark}
      nextTopic={nextTopic}
    />
  );
}
