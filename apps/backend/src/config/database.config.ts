import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * TypeORM runtime configuration for the Nest application.
 *
 * Design principles (production-grade):
 *   - Schema evolution is ALWAYS driven by explicit migrations.
 *     `synchronize` is permanently disabled to eliminate any risk of
 *     unintended schema drift or data loss.
 *   - Migrations are NOT auto-run on boot (`migrationsRun: false`).
 *     They are executed by the Railway `preDeployCommand` in remote
 *     environments (see `apps/backend/railway.toml`) or manually via
 *     `pnpm --filter @airconnect/backend migration:run` locally.
 *     This guarantees:
 *       1. Multiple replicas do not race to apply migrations.
 *       2. Migration logs are visible in CI / Railway build output
 *          before the new container starts receiving traffic.
 *   - SSL is enabled whenever the DATABASE_URL hints at it (query
 *     string or managed-provider host) or when NODE_ENV=production.
 *     `rejectUnauthorized: false` is acceptable here because Railway
 *     routes the DB traffic over its private mesh; we still get
 *     transport encryption while tolerating self-signed chains.
 */
export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const dbUrl = configService.get<string>('DATABASE_URL');
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const isProduction = nodeEnv === 'production';
  const requiresSsl =
    dbUrl.includes('sslmode=require') ||
    dbUrl.includes('railway') ||
    dbUrl.includes('rlwy') ||
    isProduction;

  return {
    type: 'postgres',
    url: dbUrl,
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
    migrations: ['dist/migrations/*.js'],
    logging: !isProduction,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  };
};
