# @voxpelli/type-helpers

My personal type helpers

[![npm version](https://img.shields.io/npm/v/@voxpelli/type-helpers.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/type-helpers)
[![npm downloads](https://img.shields.io/npm/dm/@voxpelli/type-helpers.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/type-helpers)
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

## Type verification

Type helpers for compile-time validation of type relationships and constraints.

* `VerifySuperset<Base, Superset>` – validates that `Superset` is assignable to `Base` at compile-time
* `VerifyObjectHasTypeProperty<Superset, [RequireLiteralStrings=false]>` – validates that a type has a `type: string` property, optionally rejecting generic `string` in favor of string literals (useful for discriminated unions)

## Declaration types

A mechanism for third-party extendible [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions).

* `AnyDeclaration<Declarations, [DeclarationsExtras={}]>` – returns a union of all valid declarations in `Declarations`
* `AnyDeclarationType<Declarations, [DeclarationsExtras={}]>` – returns a union of the type names from all valid declarations in `Declarations`
* `ValidDeclaration<TypeName, Declarations, [DeclarationsExtras={}]>` – the base type of a valid declaration for `Declarations` / `DeclarationsExtras` that also validates that `TypeName` exists as a valid declaration in `Declarations`

<details>
<summary>

### Details on how to use declarations

</summary>

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
  extends ValidDeclaration<TypeName, FooDeclarations, FooDeclarationExtras>
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

</details>

## Object types

* `ObjectEntry<T>` – a typed equivalent to all individual items `Object.entries()` returns
* `ObjectEntries<T>` – an array of `ObjectEntry<T>`, more similar to what `Object.entries()` returns
* `ObjectFromEntries<T>` – a typed equivalent of what `Object.fromEntries()` returns
* `PartialKeys<Foo, 'abc'>` – makes the key `abc` of `Foo` optional
* `UnknownObjectEntry` – the least specific entry for `ObjectFromEntries<T>` and what `T` needs to be a subset of there
* `IsEmptyObject<T>` – checks if a type is an empty object (originally from [`type-fest`](https://github.com/sindresorhus/type-fest))

## String types

* `NonGenericString<T, [ErrorMessage]>` – ensures that `T` is not a generic `string` (and as such likely a string literal)
* `NonGenericStringArray<T, [ErrorMessage]>` – similar to `NonGenericString` but with `T` being an `Array` / `ReadonlyArray`

## Util types

* `Equal<A, B>` – if `A extends B`, then resolves to `A`, else resolved to `never`
* `MaybePromised<T>` – resolves to `T | Promise<T>`
* `Simplify<T>` – flattens intersection types for cleaner display (originally from [`type-fest`](https://github.com/sindresorhus/type-fest))

## Used by

* [`@voxpelli/typed-utils`](https://github.com/voxpelli/typed-utils) – my personal (type-enabled) utils / helpers
* [`umzeption`](https://github.com/voxpelli/umzeption) – my original project for the initial types of this module

## Similar modules

* [`@voxpelli/typed-utils`](https://github.com/voxpelli/typed-utils) – contains some useful types like `LiteralTypeOf<T>` and `LiteralTypes` (that used to belong to this module)
* [`type-fest`](https://github.com/sindresorhus/type-fest) – a large collection of type helpers
