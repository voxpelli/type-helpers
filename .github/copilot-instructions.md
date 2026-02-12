# GitHub Copilot Instructions for Type Helpers

## Overview

This is a **type-only TypeScript library** - containing only `.d.ts` files with no runtime JavaScript code. It provides reusable utility types for type manipulation, object transformations, extendible discriminated unions, and string validation.

**Related Projects:**
- Used by: [`@voxpelli/typed-utils`](https://github.com/voxpelli/typed-utils), [`umzeption`](https://github.com/voxpelli/umzeption)
- Alternative: [`type-fest`](https://github.com/sindresorhus/type-fest)

---

## Critical Rules

**⚠️ This is a TYPE-ONLY library:**
- ❌ NO runtime JavaScript code (only `.d.ts` files)
- ❌ NO runtime dependencies
- ❌ NO runtime tests (use TypeScript compiler instead)
- ✅ ONLY type definitions in `.d.ts` files
- ✅ Validation via `tsc` and `type-coverage` (>99%)

## Code Style

**Type Definition Style:**
- Use `export type` for all exports
- Constrain generic parameters with `extends`
- Leverage conditional types, mapped types, template literals
- Example:
  ```typescript
  export type PartialKeys<T, Keys extends keyof T> =
    Omit<T, Keys> & Partial<Pick<T, Keys>>;
  ```

**File Organization:**
- `index.d.ts` - re-exports all types using `export type *`
- `lib/*.d.ts` - categorized type definitions

## Validation

**Type Testing with tstyche:**
- Type-level tests in `typetests/*.test.ts` using [tstyche](https://tstyche.org/)
- Run: `npm run check:type-test` (runs on current TypeScript version) or `npm run test:tstyche` (runs on all supported TypeScript version)
- Tests validate type behavior (e.g., `.toBe()`, `.toBeAssignableTo()`, `.toRaiseError()` – use DeepWiki `ask_question` / `read_wiki_contents` / `read_wiki_structure` tools to get current documentation `for tstyche/tstyche`)
- **Note:** VSCode/editors may show errors on `.toRaiseError()` calls - this is expected and okay! These are intentional type errors being tested.

**Other Checks:**
```bash
npm run check:tsc             # TypeScript validation
npm run check:type-coverage   # Coverage >99%
npm run check:knip            # Unused exports
npm run check:lint            # ESLint
npm run check:type-test       # TSTyche on installed TypeScript version
npm run check                 # Runs all check:* in parallel
npm run test:tstyche`         # TSTyche on all supported TypeScript versions
npm test                      # check + test:tstyche
```

**No runtime tests** - this library has no runtime code, only compile-time validation.

## Git

- Use conventional commits (feat:, fix:, docs:, test:)
- Husky hooks enforce validation

## Anti-Patterns to Avoid

1. ❌ Don't create `.js` or `.ts` implementation files (this is type-only!)
2. ❌ Don't add runtime dependencies
3. ❌ Don't create runtime tests with Mocha/Chai (no code to test!)
4. ❌ Don't use `any` types without excellent reason
5. ❌ Don't create overly complex types that are hard to understand
6. ❌ Don't export values (only export types)
7. ❌ Don't use `export { ... }` - use `export type { ... }` or `export type *`
8. ❌ Don't skip type parameter constraints
9. ❌ Don't let type coverage drop below 99%
10. ❌ Don't ignore tstyche test failures

## Best Practices

1. ✅ Write clear, self-documenting type definitions
2. ✅ Use proper type parameter constraints with `extends`
3. ✅ Write tstyche tests to validate type behavior
4. ✅ Keep types focused and composable
5. ✅ Export everything through index.d.ts using `export type *`
6. ✅ Organize types by category (declaration, object, string, util)
7. ✅ Maintain strict type coverage (>99%)
8. ✅ Document complex types with comments when necessary
9. ✅ Consider backwards compatibility when modifying existing types
10. ✅ Ensure types work well with TypeScript's type inference
11. ✅ Use tstyche's `.toRaiseError()` to test that invalid types properly fail
