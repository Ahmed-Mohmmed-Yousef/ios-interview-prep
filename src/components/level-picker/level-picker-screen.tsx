'use client';

import React, { useState } from 'react';
import type { LevelDefinition, LevelId } from '@/lib/curriculum/schema';
import { calculateSuggestedLevel } from '@/lib/curriculum/self-check';
import { Check, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

interface LevelOption {
  definition: LevelDefinition;
  cumulativeTopics: number;
  includesStages: string[];
}

interface LevelPickerScreenProps {
  levels: LevelOption[];
  currentLevel: LevelId | null;
  onSaveLevel: (levelId: LevelId) => void;
  isSettingsChange?: boolean;
}

export function LevelPickerScreen({
  levels,
  currentLevel,
  onSaveLevel,
  isSettingsChange = false,
}: LevelPickerScreenProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelId | null>(currentLevel);
  const [tickedKeys, setTickedKeys] = useState<Set<string>>(new Set());
  const [isSelfCheckOpen, setIsSelfCheckOpen] = useState(false);

  const levelDefinitions = levels.map((l) => l.definition);
  const selfCheckResult = calculateSuggestedLevel(levelDefinitions, tickedKeys);
  const hasTickedAny = tickedKeys.size > 0;

  const toggleSelfCheckItem = (key: string) => {
    const next = new Set(tickedKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setTickedKeys(next);
  };

  const handleApplySuggestion = () => {
    setSelectedLevel(selfCheckResult.suggestedLevelId);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLevel) {
      onSaveLevel(selectedLevel);
    }
  };

  const selectedOption = levels.find((l) => l.definition.id === selectedLevel);

  return (
    <form onSubmit={handleFormSubmit} className="mx-auto max-w-2xl py-6 px-4 sm:px-6 pb-32 space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {isSettingsChange ? 'Change your level' : 'Choose your level'}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          {isSettingsChange
            ? 'Your earned progress is always preserved when switching levels.'
            : 'Select the stage matching your current skills. Earlier topics can be skipped with short tests.'}
        </p>
      </header>

      {/* Interactive Self-Check Toggle */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
        <button
          type="button"
          onClick={() => setIsSelfCheckOpen(!isSelfCheckOpen)}
          className="w-full flex items-center justify-between text-left font-semibold text-primary hover:opacity-90 min-h-[44px] cursor-pointer"
          aria-expanded={isSelfCheckOpen}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
            Not sure? Check what you can do
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isSelfCheckOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>

        {isSelfCheckOpen && (
          <div className="mt-4 pt-4 border-t border-border space-y-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tick what you can comfortably do today. We suggest a level based on an unbroken run from Fresh, but you always decide.
            </p>

            {levels.map(({ definition }) => (
              <fieldset key={definition.id} className="space-y-2 border-0 p-0 m-0">
                <legend className="font-bold text-sm text-foreground flex items-center justify-between w-full">
                  <span>{definition.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {definition.selfCheck.filter((_, idx) => tickedKeys.has(`${definition.id}-${idx}`)).length} / {definition.selfCheck.length}
                  </span>
                </legend>
                <div className="space-y-2">
                  {definition.selfCheck.map((item, idx) => {
                    const key = `${definition.id}-${idx}`;
                    const isChecked = tickedKeys.has(key);
                    return (
                      <label
                        key={key}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-sm cursor-pointer min-h-[44px] transition-colors ${
                          isChecked
                            ? 'bg-secondary/40 border-primary'
                            : 'bg-background border-border hover:bg-muted/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelfCheckItem(key)}
                          className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-ring cursor-pointer"
                        />
                        <span className="text-foreground leading-snug">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            {hasTickedAny && (
              <div className="sticky bottom-24 p-4 rounded-xl bg-secondary border border-primary/30 shadow-md flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm">
                  <span className="font-semibold text-foreground">
                    Suggested level: {levels.find((l) => l.definition.id === selfCheckResult.suggestedLevelId)?.definition.title}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Based on your ticked self-check items.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleApplySuggestion}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm min-h-[40px] cursor-pointer hover:opacity-90"
                >
                  Use {levels.find((l) => l.definition.id === selfCheckResult.suggestedLevelId)?.definition.title}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Level Cards */}
      <div role="radiogroup" aria-label="Available iOS interview preparation levels" className="space-y-3">
        {levels.map(({ definition, cumulativeTopics, includesStages }) => {
          const isSelected = selectedLevel === definition.id;
          const isSuggested = hasTickedAny && selfCheckResult.suggestedLevelId === definition.id;
          const isCurrent = currentLevel === definition.id;

          return (
            <label
              key={definition.id}
              className={`relative block p-5 rounded-2xl border-2 transition-all cursor-pointer bg-card shadow-xs ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-card'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Level indicator stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
                style={{ backgroundColor: `var(--level-${definition.id})` }}
                aria-hidden="true"
              />

              <div className="flex items-start gap-3 pl-1">
                <input
                  type="radio"
                  name="level"
                  value={definition.id}
                  checked={isSelected}
                  onChange={() => setSelectedLevel(definition.id)}
                  className="mt-1 w-5 h-5 text-primary border-border focus:ring-ring cursor-pointer"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-lg text-foreground">
                      {definition.title}
                    </span>

                    {isSuggested && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-success-soft text-success border border-success/40">
                        <Check className="w-3 h-3" />
                        Suggested
                      </span>
                    )}

                    {isCurrent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    {definition.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {definition.description}
                  </p>

                  <div className="text-xs text-muted-foreground pt-1">
                    <span className="font-semibold text-foreground">
                      {cumulativeTopics} topics
                    </span>
                    {includesStages.length > 0 && (
                      <span> · Includes {includesStages.join(', ')}</span>
                    )}
                  </div>

                  {/* Expandable self-check criteria preview */}
                  <details className="text-xs text-muted-foreground pt-1 group">
                    <summary className="font-medium text-primary cursor-pointer hover:underline py-1 inline-flex items-center gap-1">
                      You are here if you can…
                    </summary>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-foreground/80">
                      {definition.selfCheck.map((check, i) => (
                        <li key={i}>{check}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Sticky Bottom Bar */}
      <aside aria-label="Level confirmation" className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm min-w-0">
            {selectedOption ? (
              <>
                <p className="font-bold text-foreground truncate">
                  {selectedOption.definition.title} Path
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedOption.cumulativeTopics} topics on this road
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Select a level to proceed
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedLevel}
            className="flex-none inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base shadow-sm hover:opacity-95 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all focus-visible:outline-3 focus-visible:outline-ring"
          >
            {isSettingsChange ? 'Save level' : 'Start my path'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </aside>
    </form>
  );
}
