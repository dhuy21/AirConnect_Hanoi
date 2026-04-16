import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * TypeORM DataSource consumed by the `typeorm-ts-node-commonjs` CLI for
 * `migration:generate`, `migration:run`, and `migration:revert`.
 *
 * This file is the single source of truth for the CLI; it must stay in
 * sync with the runtime config (`database.config.ts`) regarding entities,
 * migrations folder, and SSL behaviour.
 *
 * Invocation (from repo root):
 *   pnpm --filter @airconnect/backend migration:generate src/migrations/<Name>
 *   pnpm --filter @airconnect/backend migration:run
 *   pnpm --filter @airconnect/backend migration:revert
 *
 * Environment resolution:
 *   - Loads `.env` from the monorepo root, matching `app.module.ts`
 *     behaviour in non-production.
 *   - In remote environments (Railway), env vars are already injected
 *     by the platform; dotenv.config() is a no-op.
 */
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is required to run the TypeORM CLI');
}

const isProduction = process.env.NODE_ENV === 'production';
const requiresSsl =
  dbUrl.includes('sslmode=require') ||
  dbUrl.includes('railway') ||
  dbUrl.includes('rlwy') ||
  isProduction;

/*
 * Glob patterns resolved relative to the process CWD (the backend package
 * root). We pick `.ts` sources when invoked through ts-node (local dev,
 * `migration:generate`) and compiled `.js` when invoked from the `dist/`
 * output (production — Railway pre-deploy command).
 */
const isCompiled = __filename.endsWith('.js');
const entityGlob = isCompiled
  ? 'dist/entities/*.entity.js'
  : 'src/entities/*.entity.ts';
const migrationGlob = isCompiled
  ? 'dist/migrations/*.js'
  : 'src/migrations/*.ts';

export default new DataSource({
  type: 'postgres',
  url: dbUrl,
  entities: [entityGlob],
  migrations: [migrationGlob],
  synchronize: false,
  ssl: requiresSsl ? { rejectUnauthorized: false } : false,
});
