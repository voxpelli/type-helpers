# GitHub Copilot Instructions for Type Helpers

## Overview

This is a **type-only TypeScript library** - containing only `.d.ts` files with no runtime JavaScript code. It provides reusable utility types for type manipulation, object transformations, extendible discriminated unions, and string validation.

**Related Projects:**
- Used by: [`@voxpelli/typed-utils`](https://github.com/voxpelli/typed-utils), [`umzeption`](https://github.com/voxpelli/umzeption)
- Alternative: [`type-fest`](https://github.com/sindresorhus/type-fest)

### When to Use type-helpers

Use this library when you need:
- **Focused type utilities** for specific use cases (smaller than type-fest)
- **Extendible discriminated unions** via declaration types
- **Type verification helpers** for compile-time validation
- **Compatibility** with projects using @voxpelli/typed-utils or umzeption

Consider [`type-fest`](https://github.com/sindresorhus/type-fest) if you need a comprehensive collection of utility types.

### Project Snapshot

- **Hand-written .d.ts files** - NO build process, NO code generation
- `index.d.ts` re-exports from `lib/*.d.ts` using `export type *`
- `lib/*.d.ts` contain categorized type definitions (declaration, function, object, string, util, verify)
- `typetests/*.test.ts` validate type behavior using [tstyche](https://tstyche.org/)
- **Validation contract**: tsc + type-coverage (>98%) + tstyche before commit

---

## Copilot Fast Path (Read First)

Use this file to optimize for safe, high-quality contributions to this type-only library.

- Build for a **type-only library** - NO runtime code, ONLY `.d.ts` files
- Use **`export type`** for all exports; leverage conditional types, mapped types, template literals
- Write **tstyche tests** to validate type behavior (both valid types and `.toRaiseError()` for invalid cases)
- Keep `index.d.ts` minimal - re-export from `lib/*.d.ts` using `export type *`
- Start with **local repository context first** (existing types + tests), then use MCP tools for external guidance
- Validate before finishing: run checks (`npm test` runs all validation)
- When behavior or requirements are unclear, ask clarifying questions early instead of guessing

---

## Priority Rules: MUST, SHOULD, ASK FIRST, NEVER

If rules conflict, follow `MUST` over `SHOULD`. If uncertainty remains, use `ask_questions` before making risky changes.

### MUST

- Use `export type` for all exports (never `export { ... }`)
- Constrain generic parameters with `extends` when appropriate
- Add or update tstyche tests when type behavior changes
- Maintain type coverage >98%
- Validate changes with tsc, type-coverage, and tstyche before finalizing
- Keep changes minimal, targeted, and consistent with existing structure

### SHOULD

- Keep types focused, composable, and self-documenting
- Document complex types with comments explaining non-obvious behavior
- Use descriptive generic parameter names (not just `T`, `U`)
- Test both positive cases and negative cases (`.toRaiseError()`)
- Ask multiple focused MCP questions (2–4) rather than one broad question for unfamiliar type patterns

### ASK FIRST

- Changing public type APIs or exported type names
- Adding or replacing dependencies (even devDependencies if significant)
- Large type refactors, file moves, or renames beyond the immediate task
- Disabling checks, removing tests, or altering validation behavior

### NEVER

- Create runtime code (`.js` or `.ts` implementation files)
- Add runtime dependencies
- Use `export { ... }` - always use `export type { ... }` or `export type *`
- Create runtime tests (use tstyche for type validation)
- Bypass failing checks silently or claim validation that was not run
- Use `any` types without excellent justification
- Let type coverage drop below 99%

---

## MCP-Assisted Research Workflow for Copilot

Use MCP tools proactively to improve implementation quality, especially when working with unfamiliar type patterns, TypeScript features, or testing approaches.

### Working Pattern

1. **Start local first**
   - Read relevant type files and tests in this repository first
   - Confirm existing type patterns before introducing new approaches

2. **Use MCP for uncertainty or external knowledge**
   - If the task depends on current TypeScript features, type patterns, or tstyche behavior not obvious from local code, use MCP research before coding
   - Ask multiple targeted questions (typically 2–4) instead of one broad question

3. **Clarify ambiguities before implementation**
   - If requirements, scope, or expected type behavior are unclear, use `ask_questions` early rather than guessing

4. **Apply and verify**
   - Convert findings into concrete types and tests
   - Validate with tsc, type-coverage, and tstyche

### Tool Selection by Trigger

| Trigger | Prefer | Example Outcome | Provider |
|------|------|-----------------|----------|
| Need current TypeScript utility type patterns | `tavily_search` | Find latest best practices for mapped/conditional types | Tavily MCP server |
| Need structured content from TypeScript docs | `tavily_extract` | Pull relevant sections on template literal types | Tavily MCP server |
| Need tstyche documentation or usage patterns | `ask_question` for `tstyche/tstyche` | Get targeted answers about `.toRaiseError()` or test patterns | DeepWiki MCP server |
| Need type-fest comparison or pattern research | `ask_question` for `sindresorhus/type-fest` | Understand how similar types are implemented | DeepWiki MCP server |
| Requirements or type behavior are ambiguous | `ask_questions` | Resolve uncertainty before implementing types | VSCode built-in tool |

### Example MCP Usage Scenarios

| Scenario | Use this tool (or sequence) | Example prompt | What to do with result |
|---|---|---|---|
| Implementing new utility type pattern | `tavily_search` | "Latest TypeScript best practices for distributive conditional types" | Use results to inform type design and edge cases |
| Need TypeScript feature documentation | `tavily_extract` | "Extract sections on template literal type inference and constraints" | Translate into concrete type implementations |
| Understanding tstyche test patterns | `ask_question` for `tstyche/tstyche` | "How to test that generic types properly distribute in conditional types?" | Write appropriate tstyche tests |
| Checking type-fest for similar patterns | `ask_question` for `sindresorhus/type-fest` | "How does type-fest implement Simplify and handle intersection flattening?" | Compare approaches and ensure compatibility |
| Unclear type API design | `ask_questions` | "Should this utility type accept constraints as second param or infer them?" | Lock design decision before implementation |

### Question Quality Guidelines

Prefer specific, implementation-oriented questions.

- **Better**: "What are the recommended patterns for distributive conditional types in TypeScript 5.x?"
- **Better**: "How does tstyche's `.toRaiseError()` work with generic type constraints?"
- **Better**: "What are safe patterns for recursive type definitions to avoid infinite depth?"
- **Avoid**: "How do I use TypeScript types?"
- **Avoid**: "Tell me about conditional types"

### Suggested Research Cadence

When implementing a new type pattern or feature:

1. Ask 2–4 targeted questions with MCP tools (DeepWiki for tstyche/TypeScript repos, Tavily for current patterns)
2. Validate patterns against type-fest or similar libraries for compatibility
3. Implement with discovered patterns, then verify through tstyche tests
4. Check type coverage and inference behavior

### Anti-Patterns to Avoid

1. ❌ Skipping research when implementing unfamiliar type patterns
2. ❌ Asking one broad question and coding from partial answers
3. ❌ Proceeding with unclear type behavior instead of using `ask_questions`
4. ❌ Assuming type patterns without checking current TypeScript documentation
5. ❌ Implementing complex types without testing edge cases with tstyche

---

## TypeScript Compatibility

**Supported Versions:**
- Check `package.json` `devDependencies` for the TypeScript version used for development
- Library aims to work with recent TypeScript versions (typically last 2-3 major versions)

**Type System Features Used:**
- **Conditional types** - for type branching and inference
- **Mapped types** - for object transformations
- **Template literal types** - for string manipulation and validation
- **Generic constraints** - all generic parameters properly constrained with `extends`
- **Distributive conditional types** - leveraging type distribution in unions

**Backwards Compatibility:**
- Consider impact on consumer code when modifying existing types
- Breaking changes require major version bumps
- Type inference changes can break consumer code even without explicit type changes

---

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
- `lib/*.d.ts` - categorized type definitions:
  - `declaration-types.d.ts` - extendible discriminated union types
  - `function-types.d.ts` - function manipulation utilities
  - `object-types.d.ts` - object transformation types
  - `string-types.d.ts` - string validation and manipulation
  - `util-types.d.ts` - general utility types
  - `verify-types.d.ts` - compile-time type verification

## Validation

### Type Testing Philosophy

**Why tstyche (not runtime tests):**
- This library has NO runtime code - only type definitions
- tstyche validates type behavior at compile-time
- Tests both **what should work** and **what should fail**

**Testing Both Positive and Negative Cases:**
- Use `.toBe()`, `.toBeAssignableTo()`, `.toBeAssignableFrom()` for valid type behavior
- Use `.toRaiseError()` to test that invalid types properly fail
- **Important**: VSCode/editors show errors on `.toRaiseError()` calls - this is expected and okay! These are intentional type errors being validated.

**Matcher Direction for Clarity:**
- **`.toBeAssignableFrom()`**: Use when testing "does type A accept values of type B?"
  - `expect<TargetType>().type.toBeAssignableFrom<SourceType>()` - "TargetType accepts SourceType"
  - Example: `expect<HtmlResult>().type.toBeAssignableFrom('string literal')` - "HtmlResult accepts string literals"
  - Clearer for testing type acceptance and polymorphism
- **`.toBeAssignableTo()`**: Use when testing "is type A compatible with type B?"
  - `expect<ResultType>().type.toBeAssignableTo<ExpectedType>()` - "ResultType is assignable to ExpectedType"
  - Example: `expect<MaybePromised<string>>().type.toBeAssignableTo<string | Promise<string>>()` - "utility type produces compatible result"
  - Both matchers test the same relationship (`A extends B`), but the direction affects readability

**Type Testing with tstyche:**
- Type-level tests in `typetests/*.test.ts` using [tstyche](https://tstyche.org/)
- Run: `npm run check:type-test` (runs on current TypeScript version) or `npm run test:tstyche` (runs on all supported TypeScript versions)
- Research tstyche patterns: use DeepWiki `ask_question` for `tstyche/tstyche` repo to get current documentation

**Other Checks:**
```bash
npm run check:tsc             # TypeScript validation
npm run check:type-coverage   # Coverage >98%
npm run check:knip            # Unused exports
npm run check:lint            # ESLint
npm run check:type-test       # TSTyche on installed TypeScript version
npm run check                 # Runs all check:* in parallel
npm run test:tstyche`         # TSTyche on all supported TypeScript versions
npm test                      # check + test:tstyche
```

**No runtime tests** - this library has no runtime code, only compile-time validation.

---

## Type API Design Patterns

**Generic Parameter Constraints:**
- Always constrain generic parameters with `extends` when there are expectations
- Use descriptive parameter names: `Base`, `Superset`, `Keys` instead of just `T`, `U`, `K`
- Example: `PartialKeys<T, Keys extends keyof T>` clearly shows `Keys` must be keys of `T`

**Type Composition and Distributivity:**
- Leverage TypeScript's distributive conditional types for union handling
- Understand when conditional types distribute: `T extends U ? X : Y` distributes when `T` is a naked type parameter
- Combine simple types into complex ones using intersections and unions

**Inference Considerations:**
- Design types to work well with TypeScript's type inference
- Consider the consumer experience - can they use the type without explicit annotations?
- Test that generic parameters infer correctly in common usage patterns

**Type Complexity Management:**
- Break complex types into smaller, composable pieces
- Use intermediate type aliases for clarity
- Consider TypeScript's recursive type depth limits
- Document non-obvious type behavior with comments

**Example Pattern:**
```typescript
// Good: Clear constraints, composable, self-documenting
export type PartialKeys<T, Keys extends keyof T> =
  Omit<T, Keys> & Partial<Pick<T, Keys>>;

// Good: Descriptive names, distributed behavior clear
export type Equal<A, B> = A extends B ? A : never;
```

---

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
11. ❌ Don't create types with infinite recursion
12. ❌ Don't sacrifice type inference for brevity
13. ❌ Don't use `typeof` on non-existent runtime values
14. ❌ Don't forget distributive behavior in conditional types
15. ❌ Don't skip testing negative cases (what should fail)

## Best Practices

1. ✅ Write clear, self-documenting type definitions
2. ✅ Use proper type parameter constraints with `extends`
3. ✅ Write tstyche tests to validate type behavior
4. ✅ Keep types focused and composable
5. ✅ Export everything through index.d.ts using `export type *`
6. ✅ Organize types by category (declaration, function, object, string, util, verify)
7. ✅ Maintain strict type coverage (>98%)
8. ✅ Document complex types with comments when necessary
9. ✅ Use JSDoc comments with @see and @example for complex types
10. ✅ Consider backwards compatibility when modifying existing types
11. ✅ Ensure types work well with TypeScript's type inference
12. ✅ Use tstyche's `.toRaiseError()` to test that invalid types properly fail
13. ✅ Test both positive cases (what should work) and negative cases (what should fail)
14. ✅ Choose tstyche matchers that match test intent: `.toBeAssignableFrom()` for type acceptance, `.toBeAssignableTo()` for compatibility
15. ✅ Consider the consumer's inference experience when designing type APIs
16. ✅ Use descriptive generic parameter names (not just `T`, `U`, `K`)
17. ✅ Leverage TypeScript's structural typing for flexibility
18. ✅ Document edge cases and non-obvious type behavior
19. ✅ Use MCP tools to research unfamiliar type patterns before implementation

---

## Quick Reference for External Projects

If your project wants to use or understand the type-helpers style:

### When to Use type-helpers vs type-fest

**Choose type-helpers when:**
- You need **extendible discriminated unions** (declaration types)
- You need **type verification helpers** (VerifySuperset, VerifyObjectHasTypeProperty)
- You're already using **@voxpelli/typed-utils** or **umzeption**
- You prefer a **focused, smaller** collection of types

**Choose type-fest when:**
- You need a **comprehensive** collection of utility types
- You want broader community adoption and ecosystem
- You don't need declaration types or type verification

### Key Characteristics

- **Type-only library** - NO runtime code, only `.d.ts` files
- **Hand-written types** - NO build process, NO code generation
- **Strict validation** - tsc + type-coverage (>98%) + tstyche
- **Type testing** - tstyche for compile-time validation
- **Modern TypeScript** - conditional types, mapped types, template literals

### Reference Documentation

- **This file**: Coding guidelines and standards
- **README.md**: Type catalog and usage examples
- **lib/*.d.ts**: Type implementations by category
- **typetests/*.test.ts**: Type behavior validation examples

### Getting Started

```bash
# Install
npm install @voxpelli/type-helpers
```

```typescript
// TypeScript usage
import type { PartialKeys, AnyDeclaration } from '@voxpelli/type-helpers';

// JSDoc / Types in JS usage (modern)
/** @import { PartialKeys } from '@voxpelli/type-helpers' */

// JSDoc / Types in JS usage (legacy)
/** @typedef {import('@voxpelli/type-helpers').PartialKeys} PartialKeys */
```
