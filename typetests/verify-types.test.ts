import { describe, it, expect } from 'tstyche';

import type { VerifySuperset, VerifyObjectHasTypeProperty } from '../index.js';

describe('VerifySuperset', () => {
  it('should accept superset that extends base type', () => {
    type Base = { type: string };
    type Derived = { type: 'foo'; value: number };
    expect<VerifySuperset<Base, Derived>>().type.toBe<Derived>();
  });

  it('should raise error when type does not extend base', () => {
    expect<VerifySuperset<{ type: string }, { abc: 123 }>>().type.toRaiseError();
  });

  // Edge case
  it('should accept extended superset with additional properties', () => {
    type Base = { name: string };
    type Extended = { name: 'Alice'; age: number; email: string };
    expect<VerifySuperset<Base, Extended>>().type.toBe<Extended>();
  });
});

describe('VerifyObjectHasTypeProperty', () => {
  describe('RequireLiteralStrings = false (default)', () => {
    it('should accept specific string literal type property', () => {
      expect<VerifyObjectHasTypeProperty<{ type: 'foo' }>>().type.toBe<{ type: 'foo' }>();
    });

    it('should accept generic string type property', () => {
      expect<VerifyObjectHasTypeProperty<{ type: string }>>().type.toBe<{ type: string }>();
    });

    it('should raise error when property is missing', () => {
      expect<VerifyObjectHasTypeProperty<{ abc: 123 }>>().type.toRaiseError();
    });

    // Edge case
    it('should accept and preserve type with additional properties', () => {
      type Declaration = { type: 'button'; label: string; disabled?: boolean };
      expect<VerifyObjectHasTypeProperty<Declaration>>().type.toBe<Declaration>();
    });
  });

  describe('RequireLiteralStrings = true', () => {
    it('should accept specific string literal type property', () => {
      expect<VerifyObjectHasTypeProperty<{ type: 'foo' }, true>>().type.toBe<{ type: 'foo' }>();
    });

    it('should raise error when type is generic string', () => {
      expect<VerifyObjectHasTypeProperty<{ type: string }, true>>().type.toRaiseError();
    });

    it('should raise error when property is missing', () => {
      expect<VerifyObjectHasTypeProperty<{ abc: 123 }, true>>().type.toRaiseError();
    });

    // Edge case
    it('should accept union of string literals', () => {
      type UnionType = VerifyObjectHasTypeProperty<{ type: 'foo' | 'bar' }, true>;
      expect<UnionType>().type.toBe<{ type: 'foo' | 'bar' }>();
    });

    // Edge case
    it('should accept and preserve type with additional properties', () => {
      type Declaration = { type: 'button'; label: string; disabled?: boolean };
      expect<VerifyObjectHasTypeProperty<Declaration, true>>().type.toBe<Declaration>();
    });
  });
});
