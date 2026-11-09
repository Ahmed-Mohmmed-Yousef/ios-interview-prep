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
import {
  type PathStop,
  type PathStage,
  type PathRoad,
  checkTopicPass,
  checkSkipPass,
  computeTopicBestScore,
  computePathProgress,
  computePathScore,
  shuffleOptions,
} from './scoring';

export * from './scoring';

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
