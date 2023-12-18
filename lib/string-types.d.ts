export type NonGenericString<T, ErrorMessage extends string = never> =
  string extends T
    // This trick makes it so that the error shown will be that the value didn't match this string literal.
    // With a simple "never" here instead TS gives a sometimes hard to decipher errors
    ? ErrorMessage
    : T;
