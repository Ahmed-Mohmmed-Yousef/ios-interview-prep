import { getLevels, getRules, getCumulativeTopicCount } from '@/lib/curriculum';
import { HomeClient } from '@/components/home/home-client';
import type { LevelId } from '@/lib/curriculum/schema';

export default async function Page() {
  const levels = getLevels();
  const rules = getRules();

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

  return (
    <HomeClient
      levels={levelOptions}
      passMark={rules.topicPassMark}
    />
  );
}
