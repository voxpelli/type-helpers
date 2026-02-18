// Extracts parameter tuple without the first parameter
export type ParametersWithoutTheFirst<T extends (...args: any) => any> =
  Parameters<T> extends [any, ...infer U] ? U : never;

// Creates a function type without the first parameter while preserving return type
export type FunctionWithoutFirstParameter<T extends (...args: any) => any> =
  (...args: ParametersWithoutTheFirst<T>) => ReturnType<T>;
