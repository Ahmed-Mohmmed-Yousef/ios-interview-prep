import { z } from 'zod';

export const LevelIdSchema = z.enum(['fresh', 'junior', 'mid', 'senior', 'staff']);
export type LevelId = z.infer<typeof LevelIdSchema>;

export const TopicStatusSchema = z.enum(['planned', 'draft', 'review', 'published', 'retired']);
export type TopicStatus = z.infer<typeof TopicStatusSchema>;

export const QuestionTypeSchema = z.enum(['mcq', 'code-reading', 'written', 'code-write']);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

// Source schema
export const SourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  kind: z.enum(['official', 'community']).optional(),
});
export type Source = z.infer<typeof SourceSchema>;

// Change record
export const TopicChangeSchema = z.object({
  version: z.number().int().positive(),
  date: z.string(),
  note: z.string(),
});
export type TopicChange = z.infer<typeof TopicChangeSchema>;

// Level definition (content/levels.json)
export const LevelDefinitionSchema = z.object({
  id: LevelIdSchema,
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  selfCheck: z.array(z.string()),
});
export type LevelDefinition = z.infer<typeof LevelDefinitionSchema>;

export const LevelsFileSchema = z.object({
  version: z.number(),
  levels: z.array(LevelDefinitionSchema),
});
export type LevelsFile = z.infer<typeof LevelsFileSchema>;

// Bonus topic link in units.json
export const BonusTopicLinkSchema = z.object({
  topic: z.string(),
  after: z.string(),
});
export type BonusTopicLink = z.infer<typeof BonusTopicLinkSchema>;

// Unit definition (content/units.json)
export const UnitSchema = z.object({
  id: z.string(),
  title: z.string(),
  goal: z.string(),
  topics: z.array(z.string()),
  bonus: z.array(BonusTopicLinkSchema).optional().default([]),
});
export type Unit = z.infer<typeof UnitSchema>;

export const UnitsFileSchema = z.object({
  version: z.number(),
  units: z.array(UnitSchema),
});
export type UnitsFile = z.infer<typeof UnitsFileSchema>;

// Rules (content/rules.json)
export const RulesSchema = z.object({
  version: z.number(),
  topicPassMark: z.number().min(0).max(100),
  skipPassMark: z.number().min(0).max(100),
  topicExamSize: z.number().positive(),
  unitSkipTest: z.object({
    questionsPerTopic: z.number().positive(),
    min: z.number().positive(),
    max: z.number().positive(),
  }),
  levelSkipTest: z.object({
    questionsPerTopic: z.number().positive(),
    min: z.number().positive(),
    max: z.number().positive(),
  }),
  sources: z.object({
    officialHosts: z.array(z.string()),
    officialRepoPrefixes: z.array(z.string()),
    communityAllowed: z.object({
      units: z.array(z.string()),
      topics: z.array(z.string()),
    }),
  }).optional(),
  rubricScoring: z.object({
    met: z.number(),
    partlyMet: z.number(),
    notMet: z.number(),
    keyMissedCap: z.number(),
  }).optional(),
  readiness: z.object({
    ready: z.number(),
    almost: z.number(),
  }).optional(),
});
export type Rules = z.infer<typeof RulesSchema>;

// Topic definition (content/topics/<topic-id>/topic.json)
export const TopicMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  level: LevelIdSchema,
  goal: z.string(),
  prerequisites: z.array(z.string()).default([]),
  status: TopicStatusSchema,
  version: z.number().int().positive().default(1),
  lastVerified: z.string().nullable().optional(),
  tags: z.array(z.string()).optional().default([]),
  sources: z.array(SourceSchema).optional().default([]),
  briefIntro: z.array(z.string()).optional(),
  replacedBy: z.string().nullable().optional(),
  changes: z.array(TopicChangeSchema).optional().default([]),
});
export type TopicMeta = z.infer<typeof TopicMetaSchema>;

// Question schemas
export const QuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  explanation: z.string(),
});
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;

export const RubricCriterionSchema = z.object({
  criterion: z.string(),
  weight: z.number().min(0).max(100),
  key: z.boolean().optional(),
});
export type RubricCriterion = z.infer<typeof RubricCriterionSchema>;

export const VerifySchema = z.object({
  output: z.string().optional(),
  compileError: z.string().optional(),
}).optional();
export type Verify = z.infer<typeof VerifySchema>;

export const BaseQuestionSchema = z.object({
  id: z.string(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  prompt: z.string(),
  lessonSection: z.string().optional(),
  sources: z.array(SourceSchema).optional().default([]),
  retired: z.boolean().optional(),
});

export const McqQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('mcq'),
  options: z.array(QuestionOptionSchema).min(2),
  answer: z.string(),
});
export type McqQuestion = z.infer<typeof McqQuestionSchema>;

export const CodeReadingQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('code-reading'),
  code: z.string(),
  options: z.array(QuestionOptionSchema).min(2),
  answer: z.string(),
  verify: VerifySchema,
});
export type CodeReadingQuestion = z.infer<typeof CodeReadingQuestionSchema>;

export const WrittenQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('written'),
  rubric: z.array(RubricCriterionSchema).min(1),
  modelAnswer: z.string(),
});
export type WrittenQuestion = z.infer<typeof WrittenQuestionSchema>;

export const CodeWriteQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('code-write'),
  starterCode: z.string().optional(),
  rubric: z.array(RubricCriterionSchema).min(1),
  modelAnswer: z.string(),
  verify: VerifySchema,
});
export type CodeWriteQuestion = z.infer<typeof CodeWriteQuestionSchema>;

export const QuestionSchema = z.discriminatedUnion('type', [
  McqQuestionSchema,
  CodeReadingQuestionSchema,
  WrittenQuestionSchema,
  CodeWriteQuestionSchema,
]);
export type Question = z.infer<typeof QuestionSchema>;

export const QuestionsFileSchema = z.object({
  topicId: z.string(),
  version: z.number().int().positive().default(1),
  lastVerified: z.string().nullable().optional(),
  questions: z.array(QuestionSchema),
});
export type QuestionsFile = z.infer<typeof QuestionsFileSchema>;
