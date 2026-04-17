# AirConnect Hanoi

Collaborative platform for Hanoi schools to share air-pollution mitigation strategies, track air quality, and manage environmental compliance.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) · Tailwind CSS · React Leaflet |
| Backend | NestJS 11 · TypeORM · Swagger / OpenAPI |
| Database | PostgreSQL 16 + PostGIS |
| Cache / Rate-limit | Redis (ioredis) |
| Auth | JWT (Passport) |
| Monorepo | pnpm workspaces + Turborepo |
| Deploy | Railway (Pro) — `apps/*/railway.toml` config-as-code |

## Repo layout

```
apps/
  backend/          NestJS API (+ railway.toml)
  frontend/         Next.js app (+ railway.toml)
  data/             Seed JSON (linguist-generated)
packages/
  shared-types/     Enums + OpenAPI-generated API SDK
docker/             Local Postgres init scripts
docs/adr/           Architecture Decision Records
```

## Quick start

```bash
corepack enable && pnpm install
cp .env.example .env        # edit JWT_SECRET + POSTGRES_PASSWORD
pnpm db:up                  # Postgres + Redis via docker compose
pnpm db:migrate             # apply TypeORM migrations
pnpm db:seed                # optional, idempotent
pnpm dev                    # FE :3000 · BE :3001 · Swagger /api/docs
```

Full dev workflow (branching, commits, PR flow, OpenAPI codegen, Railway seeding): see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Features

- Multi-role auth (Student · School · Admin) with JWT
- PostGIS geospatial queries — nearby school search
- Real-time AQI monitoring per school
- Submission + admin review workflow
- Shared resource hub between schools
- Public feedback form with admin triage

## Deployment

Three Railway environments — `staging` (auto from `staging` branch), `production` (auto from `main`), and ephemeral `pr-*` per PR. Build & deploy are driven by `apps/backend/railway.toml` and `apps/frontend/railway.toml`; database migrations run automatically as the pre-deploy step. Health check: `GET /api/health`.

## License

MIT (see `LICENSE` — Phase 6).
