# @airconnect/shared-types

Single source of truth for TypeScript types shared between the backend
(`@airconnect/backend`) and the frontend (`@airconnect/frontend`).

Contains:

- **`/enums`** – hand-written enums used by both apps (e.g. `UserRole`,
  `SchoolType`). Backend entities and Zod/Joi schemas import from here to
  avoid duplication.
- **`/api`** – fully typed API contract auto-generated from the backend's
  OpenAPI spec by [`@hey-api/openapi-ts`](https://heyapi.dev/). Includes
  request/response types and a ready-to-use SDK (one function per endpoint).

## Regenerating after backend changes

```bash
pnpm openapi:codegen
```

Runs three steps from the repo root:

1. Boot the Nest app, serialise the OpenAPI document to
   `packages/shared-types/openapi.json`.
2. Run `@hey-api/openapi-ts` against that spec → `src/generated/`.
3. Rebuild the package (`tsup`) → `dist/`.

The CI pipeline runs the same command and fails the PR if the committed
`openapi.json` or `src/generated/**` differ from what the backend produces.
Run it locally before pushing.

## Adding a typed response to a new endpoint

Annotate the controller method with `@ApiOkResponse({ type: MyResponseDto })`
(or `type: [MyResponseDto]` for arrays) and regenerate. Without the decorator
the response is emitted as `unknown`.
