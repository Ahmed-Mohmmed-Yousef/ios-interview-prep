import { z } from 'zod';
import { RubricCriterionSchema } from '@/lib/curriculum/schema';

export const CriterionStatusSchema = z.enum(['met', 'partlyMet', 'notMet']);
export type CriterionStatus = z.infer<typeof CriterionStatusSchema>;

export const CriterionEvaluationSchema = z.object({
  criterion: z.string(),
  weight: z.number().min(0).max(100),
  key: z.boolean().optional(),
  status: CriterionStatusSchema,
  feedback: z.string(),
});
export type CriterionEvaluation = z.infer<typeof CriterionEvaluationSchema>;

export const GradingRequestSchema = z.object({
  questionId: z.string(),
  questionType: z.enum(['written', 'code-write']),
  prompt: z.string(),
  rubric: z.array(RubricCriterionSchema).min(1),
  learnerAnswer: z.string().max(2000, 'Answer cannot exceed 2000 characters'),
  modelAnswer: z.string().optional(),
});
export type GradingRequest = z.infer<typeof GradingRequestSchema>;

export const GradingResponseSchema = z.object({
  score: z.number().min(0).max(100),
  keyCriterionMissed: z.boolean(),
  criteria: z.array(CriterionEvaluationSchema),
  summaryFeedback: z.string(),
  provider: z.string(),
});
export type GradingResponse = z.infer<typeof GradingResponseSchema>;
