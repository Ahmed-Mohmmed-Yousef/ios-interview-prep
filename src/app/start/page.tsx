import { getLevels, getCumulativeTopicCount } from '@/lib/curriculum';
import { StartClient } from '@/components/start/start-client';
import type { LevelId } from '@/lib/curriculum/schema';

export default async function StartPage() {
  const levels = getLevels();

  const stageNames: Record<LevelId, string> = {
    fresh: 'Fresh',
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',
    staff: 'Staff',
  };

  const levelOptions = levels.map((definition, idx) => {
    const cumulativeTopics = getCumulativeTopicCount(definition.id);
    const earlierLevels = levels.slice(0, idx).map((l) => stageNames[l.id]);

    return {
      definition,
      cumulativeTopics,
      includesStages: earlierLevels,
    };
  });

  return <StartClient levels={levelOptions} />;
}
