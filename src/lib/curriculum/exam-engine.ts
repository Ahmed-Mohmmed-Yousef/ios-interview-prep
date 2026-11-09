import { getQuestions, getTopic, getUnits, getRules } from './index';
import type { Question, Rules } from './schema';

export interface ShuffledOption {
  id: string; // original option ID or new display letter ('a', 'b', 'c', 'd')
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface PreparedQuestion {
  id: string;
  type: Question['type'];
  prompt: string;
  difficulty: 1 | 2 | 3;
  lessonSection?: string;
  code?: string;
  starterCode?: string;
  modelAnswer?: string;
  rubric?: Array<{ criterion: string; weight: number; key?: boolean }>;
  options?: ShuffledOption[];
  originalAnswer?: string;
}

/**
 * Shuffles choice question options and prepares them for the Tap-then-Check exam runner.
 */
export function prepareQuestion(q: Question): PreparedQuestion {
  if (q.type === 'mcq' || q.type === 'code-reading') {
    const originalAnswer = q.answer;
    const shuffledRaw = [...q.options];

    // Fisher-Yates shuffle
    for (let i = shuffledRaw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRaw[i], shuffledRaw[j]] = [shuffledRaw[j], shuffledRaw[i]];
    }

    // Remap to display letters a, b, c, d
    const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
    const options: ShuffledOption[] = shuffledRaw.map((opt, idx) => ({
      id: letters[idx] || opt.id,
      text: opt.text,
      explanation: opt.explanation,
      isCorrect: opt.id === originalAnswer,
    }));

    return {
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      difficulty: q.difficulty,
      lessonSection: q.lessonSection,
      code: (q as any).code,
      options,
      originalAnswer,
    };
  }

  // Written or code-write questions
  return {
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    difficulty: q.difficulty,
    lessonSection: q.lessonSection,
    starterCode: (q as any).starterCode,
    modelAnswer: (q as any).modelAnswer,
    rubric: (q as any).rubric,
  };
}

/**
 * Draws an exam bank of 10 questions for a topic.
 * Preferred mix: 5 MCQ, 3 code-reading, 1 written, 1 code-write.
 */
export function drawExamQuestions(topicId: string, count: number = 10): PreparedQuestion[] {
  const file = getQuestions(topicId);
  if (!file || file.questions.length === 0) return [];

  const activeQuestions = file.questions.filter((q) => !q.retired);

  // Group by question type
  const mcqs = activeQuestions.filter((q) => q.type === 'mcq');
  const codeReadings = activeQuestions.filter((q) => q.type === 'code-reading');
  const writtens = activeQuestions.filter((q) => q.type === 'written');
  const codeWrites = activeQuestions.filter((q) => q.type === 'code-write');

  // Shuffle arrays
  const shuffle = <T>(arr: T[]): T[] => {
    const c = [...arr];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };

  const selected: Question[] = [];

  // Take target mix: 5 MCQ, 3 code-reading, 1 written, 1 code-write
  selected.push(...shuffle(mcqs).slice(0, 5));
  selected.push(...shuffle(codeReadings).slice(0, 3));
  selected.push(...shuffle(writtens).slice(0, 1));
  selected.push(...shuffle(codeWrites).slice(0, 1));

  // If pool didn't fill to count, fill with remaining questions
  if (selected.length < count) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remaining = shuffle(activeQuestions.filter((q) => !selectedIds.has(q.id)));
    selected.push(...remaining.slice(0, count - selected.length));
  }

  // Shuffle order of questions in exam
  return shuffle(selected.slice(0, count)).map(prepareQuestion);
}

/**
 * Draws questions for a stage skip test across all topics in that stage.
 */
export function drawStageSkipQuestions(stageId: string, rules: Rules): { questions: PreparedQuestion[]; coveredTopicIds: string[] } {
  const allUnits = getUnits();
  const coveredTopicIds: string[] = [];

  for (const u of allUnits) {
    for (const tId of u.topics) {
      const topic = getTopic(tId);
      if (topic && topic.level === stageId) {
        coveredTopicIds.push(tId);
      }
    }
  }

  const allQuestions: Question[] = [];
  for (const tId of coveredTopicIds) {
    const qFile = getQuestions(tId);
    if (qFile) {
      allQuestions.push(...qFile.questions.filter((q) => !q.retired));
    }
  }

  const targetCount = Math.min(
    rules.levelSkipTest.max,
    Math.max(rules.levelSkipTest.min, coveredTopicIds.length * rules.levelSkipTest.questionsPerTopic)
  );

  const shuffle = <T>(arr: T[]): T[] => {
    const c = [...arr];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };

  const selected = shuffle(allQuestions).slice(0, targetCount).map(prepareQuestion);

  return {
    questions: selected,
    coveredTopicIds,
  };
}

/**
 * Draws questions for a unit skip test across all topics in that unit at that stage.
 */
export function drawUnitSkipQuestions(
  unitId: string,
  stageId: string,
  rules: Rules
): { questions: PreparedQuestion[]; coveredTopicIds: string[] } {
  const allUnits = getUnits();
  const unit = allUnits.find((u) => u.id === unitId);
  const coveredTopicIds: string[] = [];

  if (unit) {
    for (const tId of unit.topics) {
      const topic = getTopic(tId);
      if (topic && topic.level === stageId) {
        coveredTopicIds.push(tId);
      }
    }
  }

  const allQuestions: Question[] = [];
  for (const tId of coveredTopicIds) {
    const qFile = getQuestions(tId);
    if (qFile) {
      allQuestions.push(...qFile.questions.filter((q) => !q.retired));
    }
  }

  const targetCount = Math.min(
    rules.unitSkipTest.max,
    Math.max(rules.unitSkipTest.min, coveredTopicIds.length * rules.unitSkipTest.questionsPerTopic)
  );

  const shuffle = <T>(arr: T[]): T[] => {
    const c = [...arr];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };

  const selected = shuffle(allQuestions).slice(0, targetCount).map(prepareQuestion);

  return {
    questions: selected,
    coveredTopicIds,
  };
}
