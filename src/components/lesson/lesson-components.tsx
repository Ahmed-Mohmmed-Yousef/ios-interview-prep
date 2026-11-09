'use client';

import React, { useState } from 'react';
import { Lightbulb, AlertTriangle, Info, Check, Copy, CheckCheck, ExternalLink, Sparkles } from 'lucide-react';

export function InterviewHook({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4 my-4">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        Interview Question
      </div>
      {children}
    </section>
  );
}

export function Question({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg sm:text-xl font-bold text-foreground leading-snug">
      {children}
    </p>
  );
}

export function Guess({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Guess first. It is not scored. Research shows that guessing first helps your brain lock in the concept.
      </p>

      <div className="space-y-2">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          const element = child as React.ReactElement<{ id?: string }>;
          const optId = element.props?.id;
          const isSelected = selectedId === optId;

          return React.cloneElement(element as React.ReactElement<any>, {
            isSelected,
            onSelect: () => optId && setSelectedId(optId),
          });
        })}
      </div>

      {selectedId && (
        <p className="text-xs sm:text-sm text-success font-medium animate-in fade-in pt-1">
          ✓ Your guess is saved! We will reveal the full explanation in the recap.
        </p>
      )}
    </div>
  );
}

export function Option({
  id,
  correct,
  children,
  isSelected,
  onSelect,
}: {
  id: string;
  correct?: boolean;
  children: React.ReactNode;
  isSelected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer min-h-[44px] ${
        isSelected
          ? 'bg-secondary/40 border-primary ring-2 ring-primary/20 text-foreground'
          : 'bg-background border-border hover:bg-muted/30 text-foreground'
      }`}
    >
      <span className="flex-none flex items-center justify-center w-6 h-6 rounded-md bg-muted text-foreground font-bold text-xs uppercase">
        {id}
      </span>
      <span className="flex-1 leading-snug pt-0.5">{children}</span>
    </button>
  );
}

export function QuickCheck({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-secondary/30 border border-border rounded-xl p-5 my-6 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Quick check (unscored)
        </span>
        <button
          type="button"
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
      </div>

      <div className="text-foreground text-sm space-y-2">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === Explanation) {
            return revealed ? child : null;
          }
          return child;
        })}
      </div>
    </div>
  );
}

export function Explanation({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 p-3 rounded-lg bg-card border border-border text-xs sm:text-sm text-foreground/90 animate-in fade-in">
      <strong className="text-foreground block mb-1">Explanation:</strong>
      {children}
    </div>
  );
}

export function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <aside className="bg-secondary/25 border-l-4 border-primary rounded-r-xl p-4 my-5 space-y-1">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
        <Lightbulb className="w-4 h-4" aria-hidden="true" />
        Think of it like this
      </div>
      <div className="text-foreground text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export function CodeExample({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6 rounded-2xl border border-border bg-card p-4 shadow-xs space-y-2">
      {title && (
        <figcaption className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-2">
          {title}
        </figcaption>
      )}
      <div className="space-y-3">{children}</div>
    </figure>
  );
}

export function Trap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="bg-warn-soft border-l-4 border-warn rounded-r-xl p-4 my-5 space-y-1">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-warn">
        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
        Interview Trap: {title}
      </div>
      <div className="text-foreground text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export function Traps({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 my-4">{children}</div>;
}

export function VersionNote({ since, children }: { since: string; children: React.ReactNode }) {
  return (
    <aside className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground my-2">
      <Info className="w-4 h-4 text-primary flex-none" />
      <span><strong>New in Swift {since}:</strong> {children}</span>
    </aside>
  );
}

export function DeepDive({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="bg-card border border-border rounded-xl p-4 my-4 group">
      <summary className="font-semibold text-sm text-foreground cursor-pointer hover:text-primary transition-colors flex items-center justify-between">
        <span>Go deeper: {title}</span>
        <span className="text-xs text-muted-foreground font-normal">Not in exam</span>
      </summary>
      <div className="pt-3 text-sm text-muted-foreground space-y-2 border-t border-border mt-3">
        {children}
      </div>
    </details>
  );
}

export function RealWorld({ children }: { children: React.ReactNode }) {
  return (
    <aside className="bg-card border border-border rounded-xl p-4 my-4 space-y-1">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        In a real app
      </span>
      <div className="text-sm text-foreground/90">
        {children}
      </div>
    </aside>
  );
}

export function InterviewAnswer({
  level,
  topicLevel,
  children,
}: {
  level: string;
  topicLevel?: string;
  children: React.ReactNode;
}) {
  const isTarget = level === topicLevel;

  return (
    <details
      open={isTarget}
      className={`border rounded-xl p-4 my-3 transition-colors ${
        isTarget ? 'bg-secondary/30 border-primary/40' : 'bg-card border-border'
      }`}
    >
      <summary className="font-semibold text-sm sm:text-base text-foreground cursor-pointer flex items-center justify-between">
        <span className="capitalize">{level} Level Answer</span>
        {isTarget && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
            Your level
          </span>
        )}
      </summary>
      <div className="pt-3 text-sm text-foreground/90 leading-relaxed space-y-2 border-t border-border/50 mt-3">
        {children}
      </div>
    </details>
  );
}

export function Recap({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-xs my-6 space-y-4">
      <h3 className="text-lg font-bold text-foreground">
        Recap & Key Takeaways
      </h3>
      <div className="text-sm sm:text-base leading-relaxed text-foreground/90 space-y-3">
        {children}
      </div>
    </div>
  );
}

export function TryIt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-muted text-xs sm:text-sm text-foreground my-4">
      <span className="flex-1">{children}</span>
      <a
        href="https://developer.apple.com/swift-playground/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline flex-none"
      >
        Swift Playground
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function CodeBlock({
  code,
  language = 'swift',
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border text-xs font-mono text-muted-foreground">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer min-h-[30px] px-2 rounded-md hover:bg-muted"
        >
          {copied ? (
            <>
              <CheckCheck className="w-3.5 h-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
