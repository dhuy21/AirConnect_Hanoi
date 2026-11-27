/**
 * Database helpers shared by the manual maintenance scripts
 * (bootstrap-admin, purge-fixtures). Raw SQL only, no entities.
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { randomBytes } from 'crypto';

/** 18 random bytes → 24 URL-safe characters. */
export function generatePassword(): string {
  return randomBytes(18).toString('base64url');
}

/** host:port of a postgres:// URL, without the credentials. */
export function describeTarget(dbUrl: string): string {
  try {
    const u = new URL(dbUrl);
    return `${u.hostname}:${u.port || '5432'}`;
  } catch {
    return 'unknown';
  }
}

/** Same environment resolution as seed.ts: APP_ENV, then Railway, then NODE_ENV. */
export function resolveDeploymentEnv(): string {
  return (
    process.env.APP_ENV ??
    process.env.RAILWAY_ENVIRONMENT_NAME ??
    process.env.NODE_ENV ??
    'development'
  );
}

export async function connect(dbUrl: string): Promise<DataSource> {
  const requiresSsl =
    dbUrl.includes('sslmode=require') ||
    dbUrl.includes('railway') ||
    dbUrl.includes('rlwy') ||
    process.env.NODE_ENV === 'production';
  const ds = new DataSource({
    type: 'postgres',
    url: dbUrl,
    entities: [],
    synchronize: false,
    logging: false,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  });
  return ds.initialize();
}
