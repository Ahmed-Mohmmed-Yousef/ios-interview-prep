import fs from 'node:fs';
import path from 'node:path';
import { getTopic } from './index';
import type { TopicMeta, Source } from './schema';

export interface RawLessonStep {
  title: string;
  markdown: string;
}

export interface ParsedLessonData {
  topic: TopicMeta;
  sources: Source[];
  steps: RawLessonStep[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getLessonData(topicId: string): ParsedLessonData | null {
  const topic = getTopic(topicId);
  if (!topic) return null;

  const lessonPath = path.join(CONTENT_DIR, 'topics', topicId, 'lesson.mdx');
  if (!fs.existsSync(lessonPath)) return null;

  const raw = fs.readFileSync(lessonPath, 'utf8');

  // Strip `export const meta = { ... };` from the top of the MDX file
  const cleaned = raw.replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\n\};\n*/, '');

  // Split markdown into steps using `## ` and `### ` heading boundaries
  // Everything before the first `## ` is Step 0 ("Guess first" with InterviewHook)
  const parts = cleaned.split(/(?=^#{2,3}\s+)/m);

  const steps: RawLessonStep[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    const headingMatch = part.match(/^#{2,3}\s+(.+)$/m);
    let title = 'Guess first';
    let body = part;

    if (headingMatch) {
      title = headingMatch[1].replace(/<[^>]+>/g, '').trim();
      // Remove the heading line from the step body since LessonReader renders the title as h2
      body = part.replace(/^#{2,3}\s+.+$/m, '').trim();
    }

    steps.push({
      title,
      markdown: body,
    });
  }

  return {
    topic,
    sources: topic.sources || [],
    steps,
  };
}
