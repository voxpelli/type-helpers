export type ObjectEntries<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T][];
export type ObjectFromEntries<T extends [string | number | symbol, unknown][]> = { [K in T[number][0]]: (T[number] & [K, unknown])[1] };
