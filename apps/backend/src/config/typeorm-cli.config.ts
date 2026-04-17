import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// DataSource for the TypeORM CLI (migration:{generate,run,revert}).
// Must match runtime entities/migrations/SSL — see database.config.ts.
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is required to run the TypeORM CLI');
}

const requiresSsl =
  dbUrl.includes('sslmode=require') ||
  dbUrl.includes('railway') ||
  dbUrl.includes('rlwy') ||
  process.env.NODE_ENV === 'production';

// ts-node → read .ts sources; Railway pre-deploy → read compiled .js from dist.
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
