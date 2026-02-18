import { describe, it, expect } from 'tstyche';

import type {
  ParametersWithoutTheFirst,
  FunctionWithoutFirstParameter,
} from '../index.js';

describe('ParametersWithoutTheFirst', () => {
  it('should extract parameter tuple without the first parameter', () => {
    type TestFunc = (a: string, b: number, c: boolean) => void;
    expect<ParametersWithoutTheFirst<TestFunc>>().type.toBe<[b: number, c: boolean]>();
  });

  it('should return empty tuple for single-parameter function', () => {
    type TestFunc = (a: string) => void;
    expect<ParametersWithoutTheFirst<TestFunc>>().type.toBe<[]>();
  });

  it('should return never for no-parameter function', () => {
    type TestFunc = () => void;
    expect<ParametersWithoutTheFirst<TestFunc>>().type.toBe<never>();
  });

  it('should raise error for non-function types', () => {
    expect<ParametersWithoutTheFirst<string>>().type.toRaiseError();
    expect<ParametersWithoutTheFirst<number>>().type.toRaiseError();
  });
});

describe('FunctionWithoutFirstParameter', () => {
  it('should create function type without the first parameter', () => {
    type TestFunc = (a: string, b: number, c: boolean) => string;
    type Result = FunctionWithoutFirstParameter<TestFunc>;
    expect<Result>().type.toBe<(b: number, c: boolean) => string>();
  });

  it('should preserve return type', () => {
    type TestFunc = (a: string, b: number) => { value: number };
    type Result = FunctionWithoutFirstParameter<TestFunc>;
    expect<ReturnType<Result>>().type.toBe<{ value: number }>();
  });

  it('should handle single-parameter function', () => {
    type TestFunc = (a: string) => void;
    type Result = FunctionWithoutFirstParameter<TestFunc>;
    expect<Result>().type.toBe<() => void>();
  });

  it('should be assignable to function type', () => {
    type TestFunc = (a: string, b: number) => string;
    type Result = FunctionWithoutFirstParameter<TestFunc>;
    expect<Result>().type.toBeAssignableTo<(b: number) => string>();
  });

  it('should raise error for non-function types', () => {
    expect<FunctionWithoutFirstParameter<string>>().type.toRaiseError();
    expect<FunctionWithoutFirstParameter<number>>().type.toRaiseError();
  });
});
