/**
 * Type verification helpers for validating superset relationships and enforcing
 * literal type constraints in discriminated unions.
 *
 * @module lib/superset-verify
 */

/**
 * Validates that `Superset` is assignable to `Base` at compile-time.
 * Returns `Superset` if the constraint is satisfied, otherwise causes a type error.
 *
 * This is a zero-runtime-cost compile-time assertion. The check happens during
 * type checking with no impact on the compiled JavaScript.
 *
 * @template Base - The base type constraint
 * @template Superset - The type to verify as a superset of Base
 * @example
 * type Base = { type: string };
 * type Derived = { type: 'foo'; value: number };
 * type Valid = VerifySuperset<Base, Derived>; // ✓ OK: Derived extends Base
 * type Invalid = VerifySuperset<Base, { abc: 123 }>; // ✗ Error: doesn't extend Base
 */
export type VerifySuperset<Base, Superset extends Base> = Superset;

/**
 * Validates that a type with a `type` property uses a string literal (not generic `string`).
 *
 * Useful for enforcing that discriminated unions have specific literal discriminators.
 *
 * The optional `RequireLiteralStrings` parameter controls whether generic `string` is rejected:
 * - When `true`: Rejects generic `string` type, enforcing literal string only
 * - When `false` (default): Accepts both generic `string` and literal strings
 *
 * Returns the original type if valid, otherwise returns `RequireLiteralStrings`
 * (which defaults to `false`, allowing the type through; set to `true` to enforce literals).
 *
 * Note: This validation only works with specific literal strings in type parameters,
 * not with interface keys, because interfaces can be extended elsewhere.
 *
 * @template Superset - The type to verify; must have a `type: string` property
 * @template RequireLiteralStrings - If true, reject generic `string`; if false, allow both (default)
 * @example
 * // With RequireLiteralStrings = false (default): allows both literal and generic string
 * type AllowsGeneric = VerifyObjectHasTypeProperty<{ type: 'foo' }>; // ✓ OK: literal string
 * type AllowsGenericString = VerifyObjectHasTypeProperty<{ type: string }>; // ✓ OK: generic string allowed
 *
 * // With RequireLiteralStrings = true: only allows specific string literals
 * type RequiresLiteral = VerifyObjectHasTypeProperty<{ type: 'foo' }, true>; // ✓ OK: literal string
 * type RejectsGeneric = VerifyObjectHasTypeProperty<{ type: string }, true>; // ✗ Error: generic string not allowed
 *
 * // Missing type property always fails
 * type InvalidType = VerifyObjectHasTypeProperty<{ abc: 123 }>; // ✗ Error: no 'type' property
 */
export type VerifyObjectHasTypeProperty<
  Superset extends { type: string },
  RequireLiteralStrings extends ({ type: string } extends Superset ? false : boolean) = false
> = RequireLiteralStrings extends boolean ? VerifySuperset<{ type: string }, Superset> : never;
