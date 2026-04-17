# ADR 0001 — Shared types generated from OpenAPI contract

- Date: 2026-04-17
- Status: Accepted

## Context

Before this change, the frontend redeclared every backend model by hand
(`apps/frontend/src/lib/types.ts`). Three problems:

1. Any DTO change on the backend silently broke production unless someone
   remembered to update the frontend copy.
2. Every `apiFetch<T>()` call had to assert `T` manually — no runtime check,
   no compile-time guarantee the URL and `T` match.
3. Enums lived twice (once in `apps/backend/src/common/enums.ts`, once as
   string literals on the FE), so typos couldn't be caught.

## Decision

- Introduce `packages/shared-types` as a workspace package.
- Move shared enums into `packages/shared-types/src/enums.ts`. Backend
  re-exports from there so all existing imports keep working.
- Use NestJS's `SwaggerModule.createDocument()` to dump the runtime OpenAPI
  spec to `packages/shared-types/openapi.json` (script:
  `apps/backend/src/scripts/export-openapi.ts`).
- Run [`@hey-api/openapi-ts`](https://heyapi.dev/) over that JSON to
  generate typed request/response shapes **and** a fetch SDK under
  `src/generated/`. The SDK is what the frontend calls.
- The frontend configures the generated client once in
  `apps/frontend/src/lib/api-client.ts` (base URL, bearer token
  interceptor, error normalisation).
- CI runs `pnpm openapi:codegen` and fails the PR on any diff in
  `openapi.json` or `src/generated/**` — contract drift = red build.

## Why `@hey-api/openapi-ts` and not alternatives

- `openapi-typescript` is types-only; callers still need to write their own
  fetch wrapper to benefit from them.
- `orval` couples tightly to React Query / SWR, which we don't want yet.
- `@hey-api` gives us both typed SDK + plain types, is bundler-agnostic,
  and the generated client exposes request/response/error interceptors so
  we can wire auth + error handling in one place.

## Consequences

- **Positive**: one place to change the contract, FE can't call an endpoint
  with the wrong payload, refactors on the backend show up as TS errors in
  FE immediately.
- **Negative**: any endpoint without `@ApiOkResponse({ type: ... })` gets
  `unknown` in the generated types. DTO enrichment is incremental and
  tracked per module.
- **Neutral**: generated files are committed (not in `.gitignore`) so
  clones work without needing a running DB. The drift check keeps them
  honest.
