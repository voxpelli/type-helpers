import { describe, it, expect } from 'tstyche';

import type {
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
