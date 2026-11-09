'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export interface DiagramStep {
  title: string;
  explanation: string;
  codeSnippet?: string;
  visual: React.ReactNode;
}

interface DiagramRendererProps {
  id: string;
  caption: string;
  steps: DiagramStep[];
}

export function DiagramRenderer({ id, caption, steps }: DiagramRendererProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) return null;

  const step = steps[currentStep];

  return (
    <figure
      aria-label={caption}
      className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4"
    >
      <figcaption className="flex items-center justify-between text-xs sm:text-sm font-bold text-foreground">
        <span>{caption}</span>
        <span className="text-muted-foreground font-normal">
          Step {currentStep + 1} of {steps.length}
        </span>
      </figcaption>

      {/* Visual Canvas */}
      <div className="min-h-[220px] rounded-xl bg-background border border-border p-4 flex items-center justify-center overflow-x-auto">
        {step.visual}
      </div>

      {/* Step description */}
      <div aria-live="polite" className="space-y-1">
        <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {step.explanation}
        </p>
      </div>

      {/* Stepper controls */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
        <button
          type="button"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors min-h-[36px] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                idx === currentStep ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 transition-colors min-h-[36px] cursor-pointer"
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold hover:bg-secondary/80 transition-colors min-h-[36px] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay
          </button>
        )}
      </div>
    </figure>
  );
}
