import fs from 'node:fs';
import path from 'node:path';
import {
  LevelsFileSchema,
  UnitsFileSchema,
  RulesSchema,
  TopicMetaSchema,
  QuestionsFileSchema,
  type LevelDefinition,
  type Unit,
  type Rules,
  type TopicMeta,
  type QuestionsFile,
  type LevelId,
} from './schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getLevels(): LevelDefinition[] {
  const filePath = path.join(CONTENT_DIR, 'levels.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = LevelsFileSchema.parse(JSON.parse(raw));
  return parsed.levels;
}

export function getUnits(): Unit[] {
  const filePath = path.join(CONTENT_DIR, 'units.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = UnitsFileSchema.parse(JSON.parse(raw));
  return parsed.units;
}

export function getRules(): Rules {
  const filePath = path.join(CONTENT_DIR, 'rules.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  return RulesSchema.parse(JSON.parse(raw));
}

export function getTopic(id: string): TopicMeta | null {
  const topicPath = path.join(CONTENT_DIR, 'topics', id, 'topic.json');
  if (!fs.existsSync(topicPath)) return null;
  const raw = fs.readFileSync(topicPath, 'utf8');
  return TopicMetaSchema.parse(JSON.parse(raw));
}

export function getAllTopics(): Map<string, TopicMeta> {
  const map = new Map<string, TopicMeta>();
  const topicsDir = path.join(CONTENT_DIR, 'topics');
  if (!fs.existsSync(topicsDir)) return map;

  const entries = fs.readdirSync(topicsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const topic = getTopic(entry.name);
      if (topic) {
        map.set(topic.id, topic);
      }
    }
  }
  return map;
}

export function getQuestions(topicId: string): QuestionsFile | null {
  const qPath = path.join(CONTENT_DIR, 'topics', topicId, 'questions.json');
  if (!fs.existsSync(qPath)) return null;
  const raw = fs.readFileSync(qPath, 'utf8');
  return QuestionsFileSchema.parse(JSON.parse(raw));
}

export interface PathStop {
  id: string;
  title: string;
  level: LevelId;
  goal: string;
  status: string;
  version: number;
  isBonus: boolean;
  afterTopicId?: string;
  unitId: string;
  unitTitle: string;
  prerequisites: string[];
}

export interface PathStage {
  level: LevelDefinition;
  stops: PathStop[];
}

export interface PathRoad {
  stages: PathStage[];
  allMainStops: PathStop[];
  allBonusStops: PathStop[];
}

/**
 * Builds the cumulative learning path for a given level.
 * Stages include every level from 'fresh' up to the target level.
 * In each stage, units appear in units.json order, showing topics of that stage's level.
 * Bonus topics sit right next to their `after` topic.
 */
export function getPathForLevel(targetLevelId: LevelId): PathRoad {
  const allLevels = getLevels();
  const allUnits = getUnits();
  const topicsMap = getAllTopics();

  const targetLevelIndex = allLevels.findIndex((l) => l.id === targetLevelId);
  const activeLevels = targetLevelIndex === -1 ? allLevels : allLevels.slice(0, targetLevelIndex + 1);

  const stages: PathStage[] = [];
  const allMainStops: PathStop[] = [];
  const allBonusStops: PathStop[] = [];

  for (const level of activeLevels) {
    const stageStops: PathStop[] = [];

    for (const unit of allUnits) {
      // Find main topics for this unit at this level
      for (const topicId of unit.topics) {
        const topic = topicsMap.get(topicId);
        if (topic && topic.level === level.id) {
          const mainStop: PathStop = {
            id: topic.id,
            title: topic.title,
            level: topic.level,
            goal: topic.goal,
            status: topic.status,
            version: topic.version,
            isBonus: false,
            unitId: unit.id,
            unitTitle: unit.title,
            prerequisites: topic.prerequisites,
          };
          stageStops.push(mainStop);
          allMainStops.push(mainStop);

          // Check if any bonus topics branch after this topic
          const matchingBonus = unit.bonus?.filter((b) => b.after === topicId) ?? [];
          for (const b of matchingBonus) {
            const bonusTopic = topicsMap.get(b.topic);
            if (bonusTopic && bonusTopic.level === level.id) {
              const bonusStop: PathStop = {
                id: bonusTopic.id,
                title: bonusTopic.title,
                level: bonusTopic.level,
                goal: bonusTopic.goal,
                status: bonusTopic.status,
                version: bonusTopic.version,
                isBonus: true,
                afterTopicId: topicId,
                unitId: unit.id,
                unitTitle: unit.title,
                prerequisites: bonusTopic.prerequisites,
              };
              stageStops.push(bonusStop);
              allBonusStops.push(bonusStop);
            }
          }
        }
      }
    }

    stages.push({
      level,
      stops: stageStops,
    });
  }

  return {
    stages,
    allMainStops,
    allBonusStops,
  };
}

/**
 * Returns the cumulative count of main topics from fresh up to the target level.
 */
export function getCumulativeTopicCount(targetLevelId: LevelId): number {
  return getPathForLevel(targetLevelId).allMainStops.length;
}

/**
 * Product Rule: A topic passes at 70% (configured in rules.json).
 */
export function checkTopicPass(score: number, rules: Rules): boolean {
  return score >= rules.topicPassMark;
}

/**
 * Product Rule: A skip test passes at 80% (configured in rules.json).
 */
export function checkSkipPass(score: number, rules: Rules): boolean {
  return score >= rules.skipPassMark;
}

/**
 * Product Rule: Topic score = best exam score.
 */
export function computeTopicBestScore(attempts: number[]): number {
  if (attempts.length === 0) return 0;
  return Math.max(0, ...attempts);
}

/**
 * Product Rule: Progress = done / main topics. Bonus topics count in neither.
 */
export function computePathProgress(
  mainTopicIds: string[],
  doneTopicIds: Set<string>
): { doneCount: number; totalCount: number; percentage: number } {
  if (mainTopicIds.length === 0) return { doneCount: 0, totalCount: 0, percentage: 0 };
  let doneCount = 0;
  for (const id of mainTopicIds) {
    if (doneTopicIds.has(id)) doneCount++;
  }
  const percentage = Math.round((doneCount / mainTopicIds.length) * 100);
  return { doneCount, totalCount: mainTopicIds.length, percentage };
}

/**
 * Product Rule: Path score = average of done main topics. Bonus topics count in neither.
 */
export function computePathScore(
  mainTopicIds: string[],
  doneTopicScores: Record<string, number>
): number {
  const scores: number[] = [];
  for (const id of mainTopicIds) {
    if (id in doneTopicScores) {
      scores.push(doneTopicScores[id]);
    }
  }
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + s, 0);
  return Math.round(sum / scores.length);
}

/**
 * Shuffles question answer options using Fisher-Yates and remaps the answer ID.
 */
export function shuffleOptions<T extends { id: string }>(
  options: T[],
  originalAnswerId: string
): { shuffled: T[]; newAnswerId: string } {
  const result = [...options];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  // The answer ID itself remains the same ID string that represents the correct choice
  return {
    shuffled: result,
    newAnswerId: originalAnswerId,
  };
}
