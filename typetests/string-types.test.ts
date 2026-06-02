import { describe, expect, it } from 'tstyche';

import type {
  LiteralStringUnion,
  NonGenericString,
  NonGenericStringArray,
} from '../index.js';

describe('NonGenericString', () => {
  it('should accept and return specific string literal values', () => {
    expect<NonGenericString<'hello'>>().type.toBe<'hello'>();
    expect<NonGenericString<'world'>>().type.toBe<'world'>();
  });

  it('should reject generic string type by returning never', () => {
    expect<NonGenericString<string>>().type.toBe<never>();
  });

  // Secondary test
  it('should provide custom error message when generic string is detected', () => {
    expect<NonGenericString<string, 'Must be a string literal'>>().type.toBe<'Must be a string literal'>();
  });
});

describe('NonGenericStringArray', () => {
  it('should accept and return array of string literals', () => {
    expect<NonGenericStringArray<['hello', 'world']>>().type.toBe<['hello', 'world']>();
  });

  // Secondary test
  it('should accept and return readonly array of string literals', () => {
    expect<NonGenericStringArray<readonly ['a', 'b', 'c']>>().type.toBe<readonly ['a', 'b', 'c']>();
  });

  it('should reject array of generic strings by returning never', () => {
    expect<NonGenericStringArray<string[]>>().type.toBe<never>();
  });

  // Secondary test
  it('should provide custom error message when generic string array is detected', () => {
    expect<NonGenericStringArray<string[], 'Array items must be string literals'>>().type.toBe<'Array items must be string literals'>();
  });

  // Edge case
  it('should allow non-string array types to pass through unchanged', () => {
    expect<NonGenericStringArray<number[]>>().type.toBe<number[]>();
    expect<NonGenericStringArray<boolean[]>>().type.toBe<boolean[]>();
  });
});

describe('LiteralStringUnion', () => {
  type Status = LiteralStringUnion<'SUCCESS' | 'PENDING' | 'FAILED'>;

  it('should keep the known literals as distinct, non-collapsed members', () => {
    // The literals survive alongside the open `string & {}` member rather than
    // being eagerly collapsed into plain `string` – this is what preserves the
    // editor suggestions. (tstyche has no completions matcher, so we pin the
    // structural shape that makes the suggestions possible, not the suggestions.)
    // Load-bearing assertion: it fails if the union ever collapses to plain `string`.
    expect<Status>().type.toBe<'SUCCESS' | 'PENDING' | 'FAILED' | (string & Record<never, never>)>();
  });

  it('should accept the known string literals', () => {
    expect<'SUCCESS'>().type.toBeAssignableTo<Status>();
    expect<'PENDING'>().type.toBeAssignableTo<Status>();
  });

  it('should stay open to any string', () => {
    expect<'anything else'>().type.toBeAssignableTo<Status>();
    expect<string>().type.toBeAssignableTo<Status>();
    // ...and is itself just a string (offers no safety beyond `string`)
    expect<Status>().type.toBeAssignableTo<string>();
  });

  it('should raise an error for non-string type arguments', () => {
    expect<LiteralStringUnion<number>>().type.toRaiseError();
    expect<LiteralStringUnion<boolean>>().type.toRaiseError();
  });

  // Edge case
  it('should reduce to the open string member when given never', () => {
    expect<LiteralStringUnion<never>>().type.toBe<string & Record<never, never>>();
  });

  // Edge case
  it('should degenerate to (be mutually assignable with) plain string when given a generic string', () => {
    expect<LiteralStringUnion<string>>().type.toBeAssignableTo<string>();
    expect<string>().type.toBeAssignableTo<LiteralStringUnion<string>>();
  });

  // Edge case
  it('should degenerate the same way when the literal set already contains a bare string', () => {
    expect<LiteralStringUnion<'a' | string>>().type.toBeAssignableTo<string>();
    expect<string>().type.toBeAssignableTo<LiteralStringUnion<'a' | string>>();
  });
});
