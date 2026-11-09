import { getLevels, getRules, getPathForLevel } from '@/lib/curriculum';
import { CompleteClient } from '@/components/complete/complete-client';
import type { LevelId } from '@/lib/curriculum/schema';

export default async function CompletePage() {
  const levels = getLevels();
  const rules = getRules();

  const allLevelIds: LevelId[] = ['fresh', 'junior', 'mid', 'senior', 'staff'];
  const roadDataByLevel: Record<string, ReturnType<typeof getPathForLevel>> = {};

  for (const lvlId of allLevelIds) {
    roadDataByLevel[lvlId] = getPathForLevel(lvlId);
  }

  return (
    <CompleteClient
      levels={levels}
      rules={rules}
      roadDataByLevel={roadDataByLevel}
    />
  );
}
