export type NonGenericString<T, ErrorMessage extends string = never> =
  string extends T
    // This trick makes it so that the error shown will be that the value didn't match this string literal.
    // With a simple "never" here instead TS gives a sometimes hard to decipher errors
    ? ErrorMessage
    : T;

export type NonGenericStringArray<T, ErrorMessage extends string = never> =
  T extends Array<infer U>
    ? (string extends U ? ErrorMessage : T)
    :
    T extends ReadonlyArray<infer U>
      ? (string extends U ? ErrorMessage : T)
      : T;

/**
 * A union of known string literals that still accepts *any* string.
 *
 * The literals stay visible as editor suggestions (discoverable, self-documenting),
 * while `string & Record<never, never>` keeps the type open to arbitrary strings.
 * The intersection prevents TypeScript's eager collapse of the union down to plain
 * `string`, which is what would otherwise discard the literal suggestions.
 *
 * Contrast with {@link NonGenericString}, which takes the opposite stance toward
 * generic `string`: it rejects it, whereas this embraces it.
 *
 * Equivalent to type-fest's `LiteralStringUnion` (`LiteralUnion<T, string>`) plus an
 * `extends string` constraint. It is a developer-experience helper: the type is
 * `string`-equivalent, so it gives no type-safety, narrowing, or exhaustiveness
 * guarantees over `string` – use a closed union when you need those.
 *
 * @template Literals - The known string literals to surface as suggestions
 * @example
 * type Status = LiteralStringUnion<'SUCCESS' | 'PENDING' | 'FAILED'>;
 * let a: Status = 'SUCCESS';   // suggested in the editor
 * let b: Status = 'anything';  // still allowed
 * @see https://github.com/sindresorhus/type-fest (`LiteralStringUnion` / `LiteralUnion`)
 * @see https://github.com/microsoft/TypeScript/issues/29729
 */
export type LiteralStringUnion<Literals extends string> =
  | Literals
  // `{}`-equivalent; `Record<never, never>` avoids `no-empty-object-type` lint in consumer codebases
  | (string & Record<never, never>);
