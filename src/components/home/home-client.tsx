'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHydratedProgress } from '@/lib/store/use-hydrated-progress';
import { WelcomeScreen } from '@/components/welcome/welcome-screen';
import { LevelPickerScreen } from '@/components/level-picker/level-picker-screen';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';

interface LevelOption {
  definition: LevelDefinition;
  cumulativeTopics: number;
  includesStages: string[];
}

interface HomeClientProps {
  levels: LevelOption[];
  passMark: number;
}

export function HomeClient({ levels, passMark }: HomeClientProps) {
  const router = useRouter();
  const { isHydrated, level, setLevel } = useHydratedProgress();
  const [showPicker, setShowPicker] = useState(false);

  // If learner already has a level set and progress is hydrated, redirect to /path
  useEffect(() => {
    if (isHydrated && level) {
      router.push('/path');
    }
  }, [isHydrated, level, router]);

  // Neutral loading state while hydrating localStorage to avoid SSR flash
  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your journey…</p>
        </div>
      </main>
    );
  }

  // If level is already set, display redirecting feedback while router.push executes
  if (level) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Opening your path…</p>
        </div>
      </main>
    );
  }

  const handleLevelSelected = (selectedLevel: LevelId) => {
    setLevel(selectedLevel);
    router.push('/path');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {!showPicker ? (
        <WelcomeScreen
          passMark={passMark}
          onChooseLevel={() => setShowPicker(true)}
          onImportClick={() => router.push('/settings')}
        />
      ) : (
        <LevelPickerScreen
          levels={levels}
          currentLevel={null}
          onSaveLevel={handleLevelSelected}
          isSettingsChange={false}
        />
      )}
    </main>
  );
}
