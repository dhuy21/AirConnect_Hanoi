# Contributing to AirConnect Hanoi

Quy trình đóng góp cho project: branching, commit, PR, test, deploy. Setup nhanh + kiến trúc → xem [README](README.md).

## Yêu cầu môi trường

- Node.js ≥ 20.9 (theo `package.json#engines`)
- pnpm 10.33+ (`corepack enable`)
- Docker + Docker Compose (Postgres/PostGIS + Redis local)
- Git ≥ 2.40

## Database workflows

| Command | Description |
|---|---|
| `pnpm db:up` / `db:down` | Start/stop the local Postgres + Redis container |
| `pnpm db:migrate` | Apply pending TypeORM migrations |
| `pnpm db:migrate:show` | List applied vs pending |
| `pnpm db:migrate:revert` | Revert the last migration |
| `pnpm db:seed` | Idempotent seed (safe to re-run) |
| `pnpm db:seed:reset` | Truncate seeded tables + re-seed (destructive) |
| `pnpm db:reset` | Drop + migrate + re-seed (full local reset) |

Redis không bắt buộc ở local: nếu `REDIS_URL` không set, throttler fallback in-memory (single-process). Staging/production **bắt buộc** có Redis vì backend scale horizontal.

### New migration after entity change

```bash
pnpm --filter @airconnect/backend build
pnpm --filter @airconnect/backend migration:generate src/migrations/<Name>
# Review the generated file, then:
pnpm db:migrate
```

Không sửa migration đã apply. Luôn tạo migration mới on top.

### Seeding a remote Railway environment

Seed remote là việc **manual** (không nằm trong pipeline). Railway databases expose 2 URL:

| Service | Hostname | Reachable from |
|---|---|---|
| `DATABASE_URL` on the Backend service | `*.railway.internal` | Inside Railway only |
| `DATABASE_URL` on the **database** service (PostGIS) | `*.proxy.rlwy.net` | Anywhere (SSL public proxy) |

Luôn target service **PostGIS** khi chạy từ laptop, nếu không sẽ `ENOTFOUND *.railway.internal`:

```bash
pnpm railway:seed:staging          # idempotent
pnpm railway:seed:staging:reset    # truncate + re-seed
```

Production có thêm `--allow-production` guard trong seed script — chỉ dùng cho lần bootstrap đầu tiên trên DB trống.

## Branching

```
main            → production  (auto-deploy)
staging         → staging     (auto-deploy)
feat|fix|chore|docs/<slug>    → merged into staging via PR
```

`main` và `staging` protected, chỉ vào được qua PR. Mở PR → Railway tự tạo một `pr-*` preview environment.

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <subject>`

**Type**: `feat` · `fix` · `refactor` · `perf` · `docs` · `test` · `chore` · `ci` · `build` · `style`

```
feat(backend): add geospatial search for schools
fix(frontend): correct map popup positioning on mobile
chore(infra): add railway.toml config-as-code
```

## Pull Request flow

1. Branch from `staging`: `git checkout -b feat/my-feature staging`.
2. Code + local typecheck/lint/build.
3. Push → PR into `staging`. Fill the PR template.
4. CI must pass (lint, typecheck, build, test, openapi-drift, CodeQL, gitleaks).
5. Verify on the Railway `pr-*` preview URL.
6. Review is auto-requested (see `.github/CODEOWNERS`).
7. Squash-merge. Branch + PR env auto-clean up.

## Shared types & API contract

Backend và frontend share types qua `packages/shared-types`. Khi sửa DTO/entity/thêm endpoint:

```bash
pnpm db:up                         # script boots the real NestJS app
pnpm openapi:codegen
git add packages/shared-types/openapi.json packages/shared-types/src/generated
```

Rules:

- Mỗi endpoint public phải có `@ApiOkResponse({ type: XxxResponseDto })` (hoặc `type: [XxxResponseDto]`). Không annotate → FE nhận `unknown`.
- FE gọi endpoint qua SDK generated: `import { authControllerLoginStudent } from '@/lib/api-client'`. Không dùng `fetch()` raw.
- Enum mới khai báo trong `packages/shared-types/src/enums.ts` trước; backend re-export.

CI job `openapi-drift` sẽ fail PR nếu spec committed khác output regenerate. Chi tiết: [`docs/adr/0001-shared-types-from-openapi.md`](docs/adr/0001-shared-types-from-openapi.md).

## Testing

```bash
pnpm lint
pnpm typecheck
pnpm --filter @airconnect/backend test       # Jest unit
pnpm --filter @airconnect/backend test:e2e   # E2E
```

Target khi Phase 6 hoàn thành: **≥ 60% critical modules**.

## Deployment (Railway)

- Merge vào `staging` → env `staging` redeploy.
- Merge vào `main` → env `production` redeploy.
- Config per-service: `apps/<name>/railway.toml` (config-as-code, versioned).
- Secrets qua Railway Service Variables, không commit.

### Provisioning Redis per environment

Mỗi env (`staging`, `production`) cần một service Redis riêng:

1. Project canvas → **+ New** → **Database** → **Redis**.
2. Backend Server → **Variables** → **Add Variable Reference** → `${{Redis.REDIS_URL}}`.
3. Lặp lại cho env còn lại.

## Bug reports / feature requests

[GitHub Issues](https://github.com/dhuy21/AirConnect_Hanoi/issues) — kèm screenshot / repro steps / env info.

## License

MIT (sẽ thêm file `LICENSE` ở Phase 6).
