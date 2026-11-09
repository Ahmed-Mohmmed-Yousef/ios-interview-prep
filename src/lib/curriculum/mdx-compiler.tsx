import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import * as runtime from 'react/jsx-runtime';
import React from 'react';
import {
  InterviewHook,
  Question,
  Guess,
  Option,
  QuickCheck,
  Explanation,
  Analogy,
  CodeExample,
  Trap,
  Traps,
  VersionNote,
  DeepDive,
  RealWorld,
  InterviewAnswer,
  Recap,
  TryIt,
  CodeBlock,
} from '@/components/lesson/lesson-components';
import { DiagramRenderer } from '@/components/lesson/diagram-renderer';

export const lessonMDXComponents = {
  InterviewHook,
  Question,
  Guess,
  Option,
  QuickCheck,
  Explanation,
  Analogy,
  CodeExample,
  Trap,
  Traps,
  VersionNote,
  DeepDive,
  RealWorld,
  InterviewAnswer,
  Recap,
  TryIt,
  Diagram: ({ id, caption }: { id: string; caption: string }) => (
    <DiagramRenderer
      id={id}
      caption={caption}
      steps={[
        {
          title: 'Initial State',
          explanation: 'Concept overview and variables.',
          visual: <div className="text-sm font-mono text-muted-foreground">{caption}</div>,
        },
      ]}
    />
  ),
  pre: ({ children }: any) => {
    const codeChild = React.Children.only(children);
    const codeString = codeChild?.props?.children || '';
    const className = codeChild?.props?.className || '';
    const lang = className.replace('language-', '') || 'swift';

    return <CodeBlock code={String(codeString).trim()} language={lang} />;
  },
  table: (props: any) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
};

export async function compileStepMarkdown(markdown: string): Promise<React.ReactElement> {
  const { default: MDXContent } = await evaluate(markdown, {
    ...(runtime as any),
    remarkPlugins: [remarkGfm],
  });

  return React.createElement(MDXContent, { components: lessonMDXComponents });
}
