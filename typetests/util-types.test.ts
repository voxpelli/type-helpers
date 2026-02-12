import { describe, it, expect } from 'tstyche';

import type { Equal, MaybePromised, Simplify } from '../index.js';

describe('Equal', () => {
  it('should return A when A is assignable to B, or never otherwise', () => {
    expect<Equal<string, string>>().type.toBe<string>();
    expect<Equal<string, number>>().type.toBe<never>();
  });
});

describe('MaybePromised', () => {
  it('should allow either value or Promise of that value for string', () => {
    expect<MaybePromised<string>>().type.toBeAssignableTo<string | Promise<string>>();
  });

  it('should allow either value or Promise of that value for number', () => {
    expect<MaybePromised<number>>().type.toBeAssignableTo<number | Promise<number>>();
  });
});

describe('Simplify', () => {
  // Sanity test: validates that intersection types are flattened for display
  it('should flatten intersection types', () => {
    type Flattened = Simplify<{ a: string } & { b: number }>;
    expect<Flattened>().type.toBeAssignableTo<{ a: string; b: number }>();
  });
});
