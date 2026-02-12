export type Equal<A, B> = A extends B ? A : never;

export type MaybePromised<T> = T | Promise<T>;

/**
 * Flatten intersection types for better IDE display in hover tooltips.
 * Transforms an interface into a type to aide with assignability.
 *
 * @see https://github.com/sindresorhus/type-fest
 */
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
