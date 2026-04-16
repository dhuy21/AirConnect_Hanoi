# Contributing to AirConnect Hanoi

Cảm ơn bạn đã quan tâm! Tài liệu này mô tả quy trình đóng góp chuyên nghiệp cho
project — branching, commit, PR, test, deploy.

---

## Mục lục

- [Stack & Kiến trúc](#stack--kiến-trúc)
- [Yêu cầu môi trường](#yêu-cầu-môi-trường)
- [Khởi chạy local](#khởi-chạy-local)
- [Branching strategy](#branching-strategy)
- [Commit convention](#commit-convention)
- [Pull Request flow](#pull-request-flow)
- [Testing](#testing)
- [Deployment (Railway)](#deployment-railway)
- [Báo cáo bug / đề xuất feature](#báo-cáo-bug--đề-xuất-feature)

---

## Stack & Kiến trúc

Monorepo với **pnpm workspaces + Turborepo**:

```
apps/
  backend/   — NestJS 11 + TypeORM + PostgreSQL/PostGIS
  frontend/  — Next.js 16 (App Router) + Tailwind CSS + React Leaflet
  data/      — seed data JSON
packages/    — (Phase 4) shared-types, api-client, config
docker/      — local Postgres init scripts
```

Triển khai trên **Railway** với 3 environments: `production`, `staging`, và
ephemeral `pr` (tự tạo khi mở PR).

---

## Yêu cầu môi trường

- **Node.js** ≥ 20.9 (xem `package.json#engines`)
- **pnpm** 10.33+ (kích hoạt qua `corepack enable`)
- **Docker** + **Docker Compose** (cho PostgreSQL + PostGIS local)
- **Git** ≥ 2.40

---

## Khởi chạy local

```bash
# 1. Clone & cài deps
git clone https://github.com/dhuy21/AirConnect_Hanoi.git
cd AirConnect_Hanoi
corepack enable
pnpm install

# 2. Setup env
cp .env.example .env
# -> chỉnh POSTGRES_PASSWORD, JWT_SECRET (tối thiểu 32 ký tự random)

# 3. Chạy Postgres + PostGIS (Docker)
pnpm db:up

# 4. Apply migrations (creates PostGIS extension + all tables)
pnpm db:migrate

# 5. Seed dữ liệu
pnpm db:seed          # idempotent — safe to re-run, keeps existing rows
# hoặc: pnpm db:seed:reset   # truncate + re-seed (dev/demo only)

# 6. Chạy dev (cả FE + BE song song qua Turborepo)
pnpm dev
```

- Backend: http://localhost:3001 (Swagger: `/api/docs`)
- Frontend: http://localhost:3000

### Database workflows

| Command | Description |
|---|---|
| `pnpm db:up` / `pnpm db:down` | Start / stop the local Postgres container |
| `pnpm db:migrate` | Apply pending TypeORM migrations |
| `pnpm db:migrate:show` | List applied vs pending migrations |
| `pnpm db:migrate:revert` | Revert the last applied migration |
| `pnpm db:seed` | Idempotent seed (insert-if-missing, safe to re-run) |
| `pnpm db:seed:reset` | Truncate seeded tables then re-seed (destructive) |
| `pnpm db:reset` | Drop + migrate + reseed (full local reset) |

### Creating a new migration

After changing one or more entities:

```bash
# 1. Rebuild so the CLI compares current entities against the live DB
pnpm --filter @airconnect/backend build

# 2. Generate the migration (picks a name describing the change)
pnpm --filter @airconnect/backend migration:generate \
  src/migrations/AddWhateverColumn

# 3. Review the generated file carefully (delete noise, edit data fixes)
# 4. Apply locally:
pnpm db:migrate

# 5. Commit the migration file alongside the entity change.
```

**Never** edit an already-applied migration. Create a new one on top.

---

## Branching strategy

```
main            → production (auto-deploy trên Railway)
staging         → staging env (auto-deploy)
feat/<slug>     → feature branches (merge vào staging qua PR)
fix/<slug>      → bug fix branches
chore/<slug>    → infra / CI / build
docs/<slug>     → chỉ đổi documentation
```

**Nguyên tắc:**

- `main` và `staging` **protected**, KHÔNG push trực tiếp.
- Mọi thay đổi đi qua PR → merge vào `staging` → verify → PR từ `staging`
  vào `main`.
- Khi mở PR, Railway tự tạo **PR Preview Environment** để reviewer test.

---

## Commit convention

Dùng [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body optional>

<footer optional>
```

**Type**: `feat` · `fix` · `refactor` · `perf` · `docs` · `test` · `chore` · `ci` · `build` · `style`

**Scope (optional)**: `backend`, `frontend`, `db`, `infra`, `ci`, `deps`…

Ví dụ:

```
feat(backend): add geospatial search for schools
fix(frontend): correct map popup positioning on mobile
chore(infra): add railway.toml config-as-code
```

---

## Pull Request flow

1. Tạo branch từ `staging`: `git checkout -b feat/my-feature staging`
2. Code + test local.
3. Push → mở PR vào `staging`.
4. PR template sẽ auto-fill — điền đầy đủ checklist.
5. Đợi CI pass (lint + typecheck + test + build) — sẽ có ở Phase 3.
6. Đợi Railway PR Preview deploy — verify trên URL preview.
7. Request review từ `@dhuy21` (CODEOWNERS tự động).
8. Merge squash (giữ history clean).
9. Branch tự xoá sau merge (Railway cũng auto-cleanup PR env).

---

## Testing

> Phase 6 sẽ bổ sung test suite đầy đủ. Hiện tại:

```bash
pnpm lint              # ESLint toàn repo
pnpm --filter @airconnect/backend test      # Jest unit (backend)
pnpm --filter @airconnect/backend test:e2e  # E2E
```

Target coverage khi Phase 6 hoàn thành: **≥ 60% critical modules**.

---

## Deployment (Railway)

- Merge vào `staging` → auto-deploy lên env `staging`.
- Merge vào `main` → auto-deploy lên env `production`.
- Config per-service được quản lý qua `apps/<service>/railway.toml`
  (config-as-code, versioned trong git).
- Secrets / env variables quản lý qua Railway Service Variables (không commit).

Chi tiết setup Railway: xem `docs/DEPLOYMENT.md` (sẽ được thêm ở Phase 6).

---

## Báo cáo bug / đề xuất feature

- Dùng [GitHub Issues](https://github.com/dhuy21/AirConnect_Hanoi/issues).
- Kèm screenshot / reproduction steps / environment info.

---

## License

Project này dùng license MIT (xem `LICENSE` — thêm ở Phase 6).
