import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const dbUrl = configService.get<string>('DATABASE_URL');
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const requiresSsl = dbUrl.includes('sslmode=require') || isProduction;

  return {
    type: 'postgres',
    url: dbUrl,
    autoLoadEntities: true,
    synchronize: !isProduction,
    logging: !isProduction,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
    migrations: ['dist/migrations/*.js'],
    migrationsRun: isProduction,
  };
};
