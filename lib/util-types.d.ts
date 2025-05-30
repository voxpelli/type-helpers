export type Equal<A, B> = A extends B ? A : never;

// TODO: Add tests that ensures that this always returns a key from LiteralTypes
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

// TODO: Add tests that ensures that this maps to LiteralTypeOf<>
export type LiteralTypes = {
  'string': string,
  'number': number,
  'bigint': bigint,
  'boolean': boolean,
  'symbol': symbol,
  'undefined': undefined,
  'null': null,
  'array': unknown[],
  'object': object,
  'function': () => unknown,
};

export type MaybePromised<T> = T | Promise<T>;
