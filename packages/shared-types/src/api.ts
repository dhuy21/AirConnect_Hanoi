// Re-export everything from the OpenAPI codegen bundle: request/response types
// AND the typed SDK (one function per endpoint). The SDK is what the frontend
// actually calls at runtime; types are what every consumer (FE + tests) uses
// for compile-time safety.
//
// Regenerate via `pnpm --filter @airconnect/shared-types codegen` after the
// backend OpenAPI contract changes.
export * from './generated';
export { client } from './generated/client.gen';
