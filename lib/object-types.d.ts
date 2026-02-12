export type ObjectEntries<T extends object> = ObjectEntry<T>[];
export type ObjectEntry<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T];
export type ObjectFromEntries<T extends UnknownObjectEntry[]> = { [K in T[number][0]]: (T[number] & [K, unknown])[1] };
export type PartialKeys<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;
export type UnknownObjectEntry = [PropertyKey, unknown] | readonly [PropertyKey, unknown];

declare const emptyObjectSymbol: unique symbol;
type EmptyObject = { [emptyObjectSymbol]?: never };
/**
 * IsEmptyObject borrowed from type-fest
 *
 * @see https://github.com/sindresorhus/type-fest
 */
export type IsEmptyObject<T> = T extends EmptyObject ? true : false;
