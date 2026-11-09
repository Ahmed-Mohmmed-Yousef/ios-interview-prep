'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { brand } from '@/lib/brand';
import { useHydratedProgress } from '@/lib/store/use-hydrated-progress';
import {
  ArrowLeft,
  Sun,
  Moon,
  Laptop,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  X,
  Copy,
  Check,
  Info,
} from 'lucide-react';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';
import type { PathRoad } from '@/lib/curriculum/scoring';
import { computePathProgress, computePathScore } from '@/lib/curriculum/scoring';

interface SettingsClientProps {
  levels: LevelDefinition[];
  roadDataByLevel: Record<string, PathRoad>;
}

export function SettingsClient({
  levels,
  roadDataByLevel,
}: SettingsClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isHydrated,
    level,
    results,
    skips,
    theme,
    setTheme,
    exportProgress,
    importProgress,
    resetProgress,
  } = useHydratedProgress();

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportedJson, setExportedJson] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);
  const [importPreview, setImportPreview] = useState<{
    rawJson: string;
    newDoneCount: number;
    newLevel: string;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      // follow device
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading settings…</p>
        </div>
      </main>
    );
  }

  const currentLevelId: LevelId = level || 'fresh';
  const currentLevel = levels.find((l) => l.id === currentLevelId);
  const roadData = roadDataByLevel[currentLevelId] || roadDataByLevel['fresh'];

  const mainTopicIds = roadData.allMainStops.map((s) => s.id);
  const doneTopicIds = new Set(
    Object.entries(results)
      .filter(([_, r]) => r.passed)
      .map(([id]) => id)
  );

  const progress = computePathProgress(mainTopicIds, doneTopicIds);

  const doneScores: Record<string, number> = {};
  for (const [id, r] of Object.entries(results)) {
    if (r.passed) doneScores[id] = r.bestScore;
  }
  const pathScore = computePathScore(mainTopicIds, doneScores);

  const handleExport = () => {
    const jsonStr = exportProgress();
    setExportedJson(jsonStr);

    // Trigger file download
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${brand.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-progress-${dateStr}.json`;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportModalOpen(true);
  };

  const handleCopyExportJson = async () => {
    try {
      await navigator.clipboard.writeText(exportedJson);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setImportError('This file is too big (must be under 1 MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = String(event.target?.result || '');
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          setImportError('We could not read this file. It is not valid JSON.');
          return;
        }

        const newDoneCount = Object.values(parsed.results || {}).filter(
          (r: any) => r.passed
        ).length;
        const newLevel = parsed.level || 'Not set';

        setImportPreview({
          rawJson: text,
          newDoneCount,
          newLevel,
        });
        setImportError(null);
      } catch {
        setImportError('We could not read this file. It is not valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!importPreview) return;
    const res = importProgress(importPreview.rawJson);
    if (res.success) {
      setImportPreview(null);
      router.push('/path');
    } else {
      setImportError(res.error || 'Failed to import progress file.');
    }
  };

  const handleConfirmReset = () => {
    if (resetInput.trim().toUpperCase() !== 'RESET') return;
    resetProgress();
    setResetModalOpen(false);
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8 pb-24">
      {/* Top Header */}
      <header className="space-y-2">
        <Link
          href="/path"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to path
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Progress & Settings
        </h1>
      </header>

      {/* Level Summary Section */}
      <section className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current Stage
          </span>
          <Link
            href="/start"
            className="text-xs sm:text-sm font-semibold text-primary hover:underline"
          >
            Change level
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full flex-none"
            style={{ backgroundColor: `var(--level-${currentLevelId})` }}
          />
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {currentLevel?.title} Level
            </h2>
            <p className="text-xs text-muted-foreground">
              {currentLevel?.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Overall Stats Section */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Your Performance
        </h3>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border text-center shadow-xs">
            <span className="text-xs text-muted-foreground block">Progress</span>
            <strong className="text-2xl font-black text-foreground">
              {progress.percentage}%
            </strong>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border text-center shadow-xs">
            <span className="text-xs text-muted-foreground block">Path Score</span>
            <strong className="text-2xl font-black text-foreground">
              {progress.doneCount > 0 ? `${pathScore}%` : '—'}
            </strong>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border text-center shadow-xs">
            <span className="text-xs text-muted-foreground block">Topics Done</span>
            <strong className="text-2xl font-black text-foreground">
              {progress.doneCount} / {progress.totalCount}
            </strong>
          </div>
        </div>

        <p className="text-xs text-muted-foreground px-1">
          Path score is the average score of all done main topics. Bonus topics do not count in progress or path score.
        </p>
      </section>

      {/* Stage Breakdown Section */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Stage Breakdown
        </h3>

        <div className="space-y-3">
          {roadData.stages.map((stg) => {
            const mainStops = stg.stops.filter((s) => !s.isBonus);
            const doneStops = mainStops.filter((s) => results[s.id]?.passed);
            const scores = doneStops.map((s) => results[s.id]?.bestScore ?? 0);
            const avg =
              scores.length > 0
                ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                : 0;

            return (
              <div
                key={stg.level.id}
                className="p-4 rounded-2xl bg-card border border-border space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-foreground flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: `var(--level-${stg.level.id})` }}
                    />
                    {stg.level.title} Stage
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {doneStops.length} of {mainStops.length} done
                    {doneStops.length > 0 && ` · Avg: ${avg}%`}
                  </span>
                </div>

                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(doneStops.length / (mainStops.length || 1)) * 100}%`,
                      backgroundColor: `var(--level-${stg.level.id})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Appearance Section */}
      <section className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Appearance
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme('device')}
            aria-pressed={theme === 'device'}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px] ${
              theme === 'device'
                ? 'bg-secondary text-primary border-primary ring-2 ring-primary/20'
                : 'bg-background border-border text-foreground hover:bg-muted/40'
            }`}
          >
            <Laptop className="w-4 h-4" />
            Device
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px] ${
              theme === 'light'
                ? 'bg-secondary text-primary border-primary ring-2 ring-primary/20'
                : 'bg-background border-border text-foreground hover:bg-muted/40'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px] ${
              theme === 'dark'
                ? 'bg-secondary text-primary border-primary ring-2 ring-primary/20'
                : 'bg-background border-border text-foreground hover:bg-muted/40'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
        </div>
      </section>

      {/* Keep Progress Safe (Export / Import) */}
      <section className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Keep your progress safe
          </h3>
          <p className="text-xs text-muted-foreground">
            Your progress lives entirely inside this browser. Export a JSON file to transfer your learning to another device.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-xs hover:opacity-95 transition-all min-h-[44px] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export progress file
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm font-semibold hover:bg-muted transition-colors min-h-[44px] cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Import progress file
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {importError && (
          <p className="text-xs text-destructive font-medium animate-in fade-in">
            {importError}
          </p>
        )}
      </section>

      {/* About Link */}
      <section className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">About {brand.name}</h3>
          <p className="text-xs text-muted-foreground">
            Curriculum sources, privacy policy, and trademark notes
          </p>
        </div>
        <Link
          href="/about"
          aria-label={`About ${brand.name}`}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Reset Progress Section */}
      <section className="border border-destructive/30 rounded-2xl p-5 space-y-3 bg-destructive/5">
        <h3 className="text-sm font-bold text-destructive flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h3>
        <p className="text-xs text-muted-foreground">
          Erase all earned topic scores, progress, and stage skips from this browser. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs sm:text-sm font-semibold hover:opacity-95 transition-all min-h-[40px] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset all progress
        </button>
      </section>

      {/* Export Modal Dialog */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                Progress file exported
              </h3>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground">
              Your file was downloaded. If the download did not start automatically, you can copy the raw JSON text below:
            </p>

            <pre className="p-3 bg-muted rounded-xl text-xs font-mono max-h-40 overflow-y-auto overflow-x-auto text-foreground">
              {exportedJson}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyExportJson}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-primary text-xs font-semibold hover:bg-secondary/80 cursor-pointer min-h-[38px]"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-4 h-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy JSON
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 cursor-pointer min-h-[38px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Preview Confirmation Modal */}
      {importPreview && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-foreground">
              Replace progress with file?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your existing progress in this browser will be completely replaced by the file.
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-xl text-xs">
              <div>
                <span className="text-muted-foreground block">Now in browser:</span>
                <strong className="text-foreground text-sm">
                  {progress.doneCount} topics done ({currentLevel?.title})
                </strong>
              </div>
              <div>
                <span className="text-muted-foreground block">In file:</span>
                <strong className="text-foreground text-sm">
                  {importPreview.newDoneCount} topics done ({importPreview.newLevel})
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setImportPreview(null)}
                className="px-4 py-2 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 cursor-pointer min-h-[38px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 cursor-pointer min-h-[38px]"
              >
                Replace progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-destructive/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-destructive font-bold text-lg">
              <AlertTriangle className="w-5 h-5" />
              <h3>Delete all your progress?</h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground">
              You currently have <strong>{progress.doneCount} topics done</strong>. This will delete all your exam results and scores.
            </p>

            <div className="space-y-1.5">
              <label htmlFor="reset-input" className="block text-xs font-semibold text-foreground">
                Type <span className="font-mono font-bold text-destructive">RESET</span> to confirm:
              </label>
              <input
                id="reset-input"
                type="text"
                value={resetInput}
                onChange={(e) => setResetInput(e.target.value)}
                placeholder="RESET"
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:ring-2 focus:ring-destructive focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setResetModalOpen(false);
                  setResetInput('');
                }}
                className="px-4 py-2 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 cursor-pointer min-h-[38px]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={resetInput.trim().toUpperCase() !== 'RESET'}
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[38px]"
              >
                Delete everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
