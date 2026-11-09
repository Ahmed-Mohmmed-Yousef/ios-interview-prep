'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useHydratedProgress } from '@/lib/store/use-hydrated-progress';
import { LevelPickerScreen } from '@/components/level-picker/level-picker-screen';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';

interface LevelOption {
  definition: LevelDefinition;
  cumulativeTopics: number;
  includesStages: string[];
}

interface StartClientProps {
  levels: LevelOption[];
}

export function StartClient({ levels }: StartClientProps) {
  const router = useRouter();
  const { isHydrated, level, setLevel } = useHydratedProgress();

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading levels…</p>
        </div>
      </main>
    );
  }

  const handleSaveLevel = (selectedLevel: LevelId) => {
    setLevel(selectedLevel);
    router.push('/path');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <LevelPickerScreen
        levels={levels}
        currentLevel={level}
        onSaveLevel={handleSaveLevel}
        isSettingsChange={Boolean(level)}
      />
    </main>
  );
}
