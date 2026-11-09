import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { z } from 'zod';
import type { LevelId } from '@/lib/curriculum/schema';

export const CURRENT_STORE_VERSION = 1;
export const STORAGE_KEY = 'prep_stops_progress_v1';

export const TopicResultSchema = z.object({
  topicId: z.string(),
  version: z.number().int().positive(),
  bestScore: z.number().min(0).max(100),
  passed: z.boolean(),
  passedAt: z.string(),
});
export type TopicResult = z.infer<typeof TopicResultSchema>;

export const SkipRecordSchema = z.object({
  kind: z.enum(['unit', 'level']),
  targetId: z.string(),
  score: z.number().min(0).max(100),
  coveredTopicIds: z.array(z.string()),
  passedAt: z.string(),
});
export type SkipRecord = z.infer<typeof SkipRecordSchema>;

export const LearnerProgressDataSchema = z.object({
  level: z.enum(['fresh', 'junior', 'mid', 'senior', 'staff']).nullable(),
  results: z.record(z.string(), TopicResultSchema).default({}),
  skips: z.record(z.string(), SkipRecordSchema).default({}),
  theme: z.enum(['device', 'light', 'dark']).default('device'),
  textSize: z.enum(['normal', 'large', 'larger']).default('normal'),
});
export type LearnerProgressData = z.infer<typeof LearnerProgressDataSchema>;

export interface ProgressState extends LearnerProgressData {
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  setLevel: (level: LevelId) => void;
  setTheme: (theme: 'device' | 'light' | 'dark') => void;
  setTextSize: (size: 'normal' | 'large' | 'larger') => void;
  recordTopicScore: (
    topicId: string,
    version: number,
    score: number,
    passMark: number
  ) => void;
  recordSkip: (
    kind: 'unit' | 'level',
    targetId: string,
    coveredTopicIds: string[],
    score: number,
    passMark: number
  ) => boolean;
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (jsonString: string) => { success: boolean; error?: string };
}

const initialData: LearnerProgressData = {
  level: null,
  results: {},
  skips: {},
  theme: 'device',
  textSize: 'normal',
};

const createMemoryStorage = () => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string): string | null => store.get(key) ?? null,
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
  };
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialData,
      hasHydrated: false,

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),

      setLevel: (level) => {
        // Changing level preserves earned results and skips
        set({ level });
      },

      setTheme: (theme) => set({ theme }),

      setTextSize: (textSize) => set({ textSize }),

      recordTopicScore: (topicId, version, score, passMark) => {
        const currentResults = { ...get().results };
        const existing = currentResults[topicId];
        const isPass = score >= passMark;
        const now = new Date().toISOString();

        const bestScore = existing ? Math.max(existing.bestScore, score) : score;
        const passed = Boolean(existing?.passed || isPass);

        currentResults[topicId] = {
          topicId,
          version: existing ? (isPass ? version : existing.version) : version,
          bestScore,
          passed,
          passedAt: existing?.passedAt || (isPass ? now : ''),
        };

        set({ results: currentResults });
      },

      recordSkip: (kind, targetId, coveredTopicIds, score, passMark) => {
        if (score < passMark) return false;

        const now = new Date().toISOString();
        const skipKey = `${kind}-${targetId}`;
        const newSkips = {
          ...get().skips,
          [skipKey]: {
            kind,
            targetId,
            score,
            coveredTopicIds,
            passedAt: now,
          },
        };

        const newResults = { ...get().results };
        for (const topicId of coveredTopicIds) {
          const existing = newResults[topicId];
          newResults[topicId] = {
            topicId,
            version: existing?.version || 1,
            bestScore: existing ? Math.max(existing.bestScore, score) : score,
            passed: true,
            passedAt: existing?.passedAt || now,
          };
        }

        set({ skips: newSkips, results: newResults });
        return true;
      },

      resetProgress: () => {
        set({ ...initialData });
      },

      exportProgress: () => {
        const state = get();
        const data: LearnerProgressData = {
          level: state.level,
          results: state.results,
          skips: state.skips,
          theme: state.theme,
          textSize: state.textSize,
        };
        return JSON.stringify(data, null, 2);
      },

      importProgress: (jsonString: string) => {
        try {
          const parsed = JSON.parse(jsonString);
          const validated = LearnerProgressDataSchema.parse(parsed);
          set({
            level: validated.level,
            results: validated.results,
            skips: validated.skips,
            theme: validated.theme,
            textSize: validated.textSize,
          });
          return { success: true };
        } catch (err) {
          return {
            success: false,
            error: err instanceof Error ? err.message : 'Invalid progress JSON structure',
          };
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : createMemoryStorage()
      ),
      version: CURRENT_STORE_VERSION,
      skipHydration: true,
      partialize: (state) => ({
        level: state.level,
        results: state.results,
        skips: state.skips,
        theme: state.theme,
        textSize: state.textSize,
      }),
      migrate: (persistedState: any, version: number) => {
        let state = persistedState;
        if (version === 0) {
          state = {
            level: state?.level ?? null,
            results: state?.results ?? {},
            skips: state?.skips ?? {},
            theme: state?.theme ?? 'device',
            textSize: state?.textSize ?? 'normal',
          };
        }
        return state as LearnerProgressData;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
