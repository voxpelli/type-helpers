import {
  type _, describe, expect, it,
} from 'tstyche';

import type {
  AnyDeclaration,
  AnyDeclarationType,
  ValidDeclaration,
} from '../index.js';

// Example discriminated union for testing
interface TestDeclarations {
  Button: {
    type: 'Button';
    label: string;
  };
  Input: {
    type: 'Input';
    placeholder: string;
  };
  Link: {
    type: 'Link';
    href: string;
  };
}

describe('AnyDeclaration', () => {
  it('should create union of all declarations', () => {
    expect<AnyDeclaration<TestDeclarations>>().type.toBe<
      | { type: 'Button'; label: string }
      | { type: 'Input'; placeholder: string }
      | { type: 'Link'; href: string }
    >();
  });

  // Somewhat redundant: This is testing individual assignability which is implied by the union test above
  it('should allow button declaration to be assignable to AnyDeclaration', () => {
    expect<AnyDeclaration<TestDeclarations>>().type.toBeAssignableFrom<{ type: 'Button'; label: string }>();
  });
});

describe('AnyDeclarationType', () => {
  it('should extract all declaration type strings from union', () => {
    expect<AnyDeclarationType<TestDeclarations>>().type.toBe<'Button' | 'Input' | 'Link'>();
  });
});

describe('ValidDeclaration', () => {
  it('should validate button type property is narrowed to literal', () => {
    expect<ValidDeclaration<'Button', TestDeclarations>['type']>().type.toBe<'Button'>();
  });

  it('should validate input type property is narrowed to literal', () => {
    expect<ValidDeclaration<'Input', TestDeclarations>['type']>().type.toBe<'Input'>();
  });

  it('should not be instantiable with type name that does not exist in declarations', () => {
    expect<ValidDeclaration<_, _>>().type.not.toBeInstantiableWith<['NonExistent', TestDeclarations]>();
  });

  it('should not be instantiable with generic string instead of literal', () => {
    expect<ValidDeclaration<_, _>>().type.not.toBeInstantiableWith<[string, TestDeclarations]>();
  });
});

describe('Custom extras', () => {
  interface CustomDeclarations {
    EventA: {
      type: 'EventA';
      data: string;
    };
    EventB: {
      type: 'EventB';
      data: number;
    };
  }

  it('should work with custom declarations (events example)', () => {
    expect<AnyDeclaration<CustomDeclarations>>().type.toBeAssignableTo<{ type: 'EventA'; data: string } | { type: 'EventB'; data: number }>();
  });
});
