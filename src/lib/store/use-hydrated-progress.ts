'use client';

import { useEffect, useState } from 'react';
import { useProgress } from './progress';

export function useHydratedProgress() {
  const [hydrated, setHydrated] = useState(false);
  const store = useProgress();

  useEffect(() => {
    let mounted = true;
    const rehydrate = async () => {
      await useProgress.persist.rehydrate();
      if (mounted) {
        setHydrated(true);
      }
    };
    rehydrate();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    ...store,
    isHydrated: hydrated,
  };
}
