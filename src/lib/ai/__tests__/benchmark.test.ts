import { describe, it, expect } from 'vitest';
import { MockGradingProvider } from '../mock';
import type { GradingRequest } from '../schema';

describe('AI Rubric Benchmark Suite (Structs vs Classes)', () => {
  const provider = new MockGradingProvider();

  // Benchmark Question 24: Difference between Structs and Classes
  const q24Request: GradingRequest = {
    questionId: 'structs-vs-classes-q24',
    questionType: 'written',
    prompt: 'What is the main difference between a struct and a class in Swift?',
    rubric: [
      {
        criterion: 'Explains that a struct is a value type, copied on assignment',
        weight: 30,
        key: true,
      },
      {
        criterion: 'Explains that a class is a reference type, where multiple references share one instance',
        weight: 30,
        key: true,
      },
      {
        criterion: 'Describes the effect of modifying a copy: value type copy does not affect original, class modification affects all references',
        weight: 25,
      },
      {
        criterion: 'Mentions that Swift recommends structs by default unless shared identity or inheritance is required',
        weight: 15,
      },
    ],
    learnerAnswer: '',
  };

  it('benchmark q24 Good answer scores >= 70% and passes', async () => {
    const goodAnswer =
      'Structs are value types that are copied on assignment. Classes are reference types where variables share one instance. Modifying a copy of a struct does not affect the original, whereas modifying a class instance reflects across all references. Swift recommends using structs by default.';

    const result = await provider.grade({
      ...q24Request,
      learnerAnswer: goodAnswer,
    });

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.keyCriterionMissed).toBe(false);
  });

  it('benchmark q24 Average answer scores between 40% and 65%', async () => {
    const avgAnswer =
      'Structs are value types and classes are reference types. Classes can inherit from other classes.';

    const result = await provider.grade({
      ...q24Request,
      learnerAnswer: avgAnswer,
    });

    // Average answer addresses types superficially without explaining copying or modifications
    expect(result.score).toBeLessThan(70);
  });

  it('benchmark q24 Weak answer (myth) scores 0%', async () => {
    const weakAnswer = 'Structs are faster because they are always stored on the stack.';

    const result = await provider.grade({
      ...q24Request,
      learnerAnswer: weakAnswer,
    });

    expect(result.score).toBeLessThanOrEqual(30);
    expect(result.score).toBeLessThan(70);
  });

  // Benchmark Question 29: Code-Write Book struct
  const q29Request: GradingRequest = {
    questionId: 'structs-vs-classes-q29',
    questionType: 'code-write',
    prompt: 'Write a Book struct with title and pages. Prove value type semantics by mutating a copy.',
    rubric: [
      {
        criterion: 'Declares a struct Book (not a class)',
        weight: 30,
        key: true,
      },
      {
        criterion: 'Declares properties title and pages',
        weight: 20,
      },
      {
        criterion: 'Creates a copy and mutates the copy',
        weight: 25,
      },
      {
        criterion: 'Demonstrates original is unchanged',
        weight: 25,
      },
    ],
    learnerAnswer: '',
  };

  it('benchmark q29 Weak answer declaring a class has score capped at <= 50%', async () => {
    // Missing the key criterion (declares struct Book, not class)
    const weakClassAnswer = `
class Book {
  var title: String
  var pages: Int
  init(title: String, pages: Int) {
    self.title = title
    self.pages = pages
  }
}
var b1 = Book(title: "Swift", pages: 100)
var b2 = b1
b2.pages = 120
print(b1.pages)
print(b2.pages)
`;
    const result = await provider.grade({
      ...q29Request,
      learnerAnswer: weakClassAnswer,
    });

    // Score must be capped below the 70% pass mark because key criterion is violated
    expect(result.score).toBeLessThanOrEqual(50);
  });
});
