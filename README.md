# @voxpelli/type-helpers

My personal type helpers

[![npm version](https://img.shields.io/npm/v/@voxpelli/type-helpers.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/type-helpers)
[![npm downloads](https://img.shields.io/npm/dm/@voxpelli/type-helpers.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/type-helpers)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

## Usage

### JSDoc / [Types in JS](https://github.com/voxpelli/types-in-js)

```typescript
/** @typedef {import('@voxpelli/type-helpers').PartialKeys} PartialKeys */
```

### TypeScript

```typescript
import type { PartialKeys } from '@voxpelli/type-helpers';
```

## Available types

### Declaration types

A mechanism for third-party extendible [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions).

#### Declaration types helpers

* `AnyDeclaration<Declarations, DeclarationsExtras>` – returns a union of all valid declarations in `Declarations`
* `AnyDeclarationType<Declarations, DeclarationsExtras>` – returns a union of the type names from all valid declarations in `Declarations`
* `ValidDeclaration<Declarations, DeclarationsExtras, TypeName>` – the base type of a valid declaration for `Declarations` / `DeclarationsExtras` that also validates that `TypeName` exists as a valid declaration in `Declarations`

#### Valid declarations

1. Are part of `Declarations`
2. Complies with the `DeclarationsExtras` type
3. Has a `type` key that matches a declarations key in `Declarations`

#### Declaration types example

Imaginary module `@voxpelli/foo`:

```typescript
import type {
  AnyDeclaration,
  AnyDeclarationType,
  ValidDeclaration
} from '@voxpelli/type-helpers';

interface FooDeclarationExtras {
  value: unknown
}

export interface FooDeclarations {
  bar: FooDeclaration<'bar', { abc: 123 }>,
  // This is a recommended addition, ensuring consumers stay alert and are aware
  // that extensions here can be of all kinds of types
  unknown: FooDeclaration<'unknown', unknown>,
}

export type AnyFooDeclaration = AnyDeclaration<FooDeclarations, FooDeclarationExtras>;
export type AnyFooDeclarationType = AnyDeclarationType<FooDeclarations, FooDeclarationExtras>;

export interface FooDeclaration<TypeName extends AnyFooDeclarationType, Value>
  extends ValidDeclaration<FooDeclarations, FooDeclarationExtras, TypeName>
{
  value: Value
}
```

Third party extension:

```typescript
import type { FooDeclaration } from '@voxpelli/foo';

declare module '@voxpelli/foo' {
  interface FooDeclarations {
    xyz: FooDeclaration<'xyz', { xyz: true }>
  }
}
```

Usage as a :

```javascript
/**
 * @param {AnyFooDeclaration} foo
 */
function timeToFoo (foo) {
  switch (foo.type) {
    case 'bar':
      // foo.value.abc will be know to exist and be a number
      break;
    case 'xyz':
      // If the third party extension has been included, then foo.value.xyz will be know to exist here and be a boolean
      break;
    default:
      // foo.value is eg. unknown here
  }
}
```

### Util types

* `PartialKeys<Foo, 'abc'>` – makes the key `abc` of `Foo` optional
* `Equal<A, B>` – if `A extends B`, then resolves to `A`, else resolved to `never`

## Similar modules

* [`type-fest`](https://github.com/sindresorhus/type-fest) – a large colelction of type helpers
