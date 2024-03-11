export type Equal<A, B> = A extends B ? A : never;

export type LiteralTypeOf<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends bigint ? 'bigint' :
  T extends boolean ? 'boolean' :
  T extends symbol ? 'symbol' :
  T extends undefined ? 'undefined' :
  T extends null ? 'null' :
  T extends any[] ? 'array' :
  T extends object ? 'object' :
  T extends () => any ? 'function' :
  never;

export type MaybePromised<T> = T | Promise<T>;
