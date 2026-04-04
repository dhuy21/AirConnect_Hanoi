# AirConnect Hanoi

Collaborative platform for Hanoi's schools to share air pollution mitigation strategies, track air quality, and manage environmental compliance.

## Architecture

```
airconnect-hanoi/
├── apps/
│   ├── frontend/         # Next.js 15 (Frontend)
│   └── backend/          # NestJS 11 (Backend API)
├── pnpm-workspace.yaml   # pnpm workspace config
├── turbo.json            # Turborepo task orchestration
├── docker-compose.yml    # Docker orchestration
└── .env                  # Environment variables
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, React Leaflet |
| Backend | NestJS 11, TypeORM, PostgreSQL + PostGIS |
| Database | PostgreSQL 16 + PostGIS |
| Monorepo | Turborepo + pnpm workspaces |
| Auth | JWT (Passport.js) |
| Docs | Swagger/OpenAPI |

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm (`npm install -g pnpm`)
- [Docker](https://docs.docker.com/get-docker/) (Compose) — dùng cho PostgreSQL + PostGIS local

### Installation

```bash
pnpm install
```

### Database (Docker — khuyến nghị)

Chạy PostgreSQL + PostGIS trong container (một lần, trước khi `pnpm dev`):

```bash
pnpm db:up
# hoặc: docker compose up -d db
```

`.env` cần `DATABASE_URL` trỏ tới `localhost:5432` với user/password trùng `docker-compose.yml` (xem `.env.example`). Volume `pgdata` giữ dữ liệu giữa các lần khởi động lại.

Dừng container DB (không xoá dữ liệu volume):

```bash
pnpm db:down
```

Nếu cổng `5432` bị PostgreSQL cài trên máy chiếm, trong `docker-compose.yml` đổi mapping thành `5433:5432` và đổi port trong `DATABASE_URL` tương ứng.

### Development

```bash
# Run all services (NestJS + Next.js)
pnpm dev

# Or run individually:
pnpm dev:frontend    # Next.js on http://localhost:3000
pnpm dev:backend     # NestJS on http://localhost:3001
```

### Build

```bash
pnpm build
```

### Docker (full stack: DB + API + web)

```bash
docker compose up -d
```

Chỉ cần database để dev local với Nest/Next chạy trên máy:

```bash
pnpm db:up
```

## API Documentation

When the API is running, Swagger docs are available at:
- http://localhost:3001/api/docs

## Key Features

- **Multi-role Authentication** — Student, School, Admin with JWT
- **PostGIS Geospatial Queries** — Nearby school search, map visualization
- **Real-time AQI Monitoring** — Air quality data integration
- **School Submissions & Reviews** — Admin review workflow
- **Knowledge Hub** — Shared posts and resources between schools
- **Feedback System** — Public contact form with admin management
