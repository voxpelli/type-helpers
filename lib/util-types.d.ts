export type Equal<A, B> = A extends B ? A : never;

export type MaybePromised<T> = T | Promise<T>;
