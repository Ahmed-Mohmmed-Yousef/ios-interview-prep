import { getLevels, getPathForLevel } from '@/lib/curriculum';
import { SettingsClient } from '@/components/settings/settings-client';
import type { LevelId } from '@/lib/curriculum/schema';

export default async function SettingsPage() {
  const levels = getLevels();

  const allLevelIds: LevelId[] = ['fresh', 'junior', 'mid', 'senior', 'staff'];
  const roadDataByLevel: Record<string, ReturnType<typeof getPathForLevel>> = {};

  for (const lvlId of allLevelIds) {
    roadDataByLevel[lvlId] = getPathForLevel(lvlId);
  }

  return (
    <SettingsClient
      levels={levels}
      roadDataByLevel={roadDataByLevel}
    />
  );
}
