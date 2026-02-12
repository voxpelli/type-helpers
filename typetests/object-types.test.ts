import { describe, it, expect } from 'tstyche';

import type {
  ObjectEntries,
  ObjectEntry,
  ObjectFromEntries,
  PartialKeys,
  UnknownObjectEntry,
} from '../index.js';

describe('ObjectEntry', () => {
  it('should extract union of all key-value entry tuples', () => {
    expect<ObjectEntry<{ a: string; b: number }>>().type.toBe<['a', string] | ['b', number]>();
  });
});

describe('ObjectEntries', () => {
  it('should extract all entries as an array of key-value tuples', () => {
    expect<ObjectEntries<{ a: string; b: number }>>().type.toBeAssignableTo<Array<['a', string] | ['b', number]>>();
  });
});

describe('ObjectFromEntries', () => {
  it('should reconstruct object from typed entry tuple array', () => {
    expect<ObjectFromEntries<[['a', string], ['b', number]]>>().type.toBeAssignableTo<{ a: string; b: number }>();
  });

  // Secondary test
  it('should reconstruct generic Record from generic string array entries', () => {
    expect<ObjectFromEntries<['a', string][]>>().type.toBeAssignableTo<Record<string, string>>();
  });
});

describe('PartialKeys', () => {
  it('should make a single selected key optional', () => {
    type TestObject = { a: string; b: number; c: boolean };
    type Result = PartialKeys<TestObject, 'a'>;
    expect<Result>().type.toBeAssignableTo<{ a?: string; b: number; c: boolean }>();
  });

  // Secondary test
  it('should make multiple selected keys optional', () => {
    type TestObject = { a: string; b: number; c: boolean };
    type Result = PartialKeys<TestObject, 'a' | 'b'>;
    expect<Result>().type.toBeAssignableTo<{ a?: string; b?: number; c: boolean }>();
  });
});

describe('UnknownObjectEntry', () => {
  it('should accept string-keyed entries', () => {
    expect<['key', 'value']>().type.toBeAssignableTo<UnknownObjectEntry>();
    expect<['key', 123]>().type.toBeAssignableTo<UnknownObjectEntry>();
    expect<[42, 'value']>().type.toBeAssignableTo<UnknownObjectEntry>();
    expect<[42, 123]>().type.toBeAssignableTo<UnknownObjectEntry>();
    expect<[symbol, undefined]>().type.toBeAssignableTo<UnknownObjectEntry>();
    expect<['a', undefined]>().type.toBeAssignableTo<UnknownObjectEntry>();
  });
});
