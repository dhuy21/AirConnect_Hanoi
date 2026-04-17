// Standalone script that boots the Nest application context (without binding
// an HTTP port), asks SwaggerModule to produce the OpenAPI document, and
// writes it to `packages/shared-types/openapi.json`.
//
// Used locally (`pnpm --filter backend openapi:export`) and by CI to detect
// drift between the running app and the committed OpenAPI contract.

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { AppModule } from '../app.module';

const OUTPUT_PATH = resolve(
  __dirname,
  '../../../../packages/shared-types/openapi.json',
);

async function exportOpenApi(): Promise<void> {
  const logger = new Logger('ExportOpenAPI');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // Match runtime config so decorators behave identically to `main.ts`.
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AirConnect Hanoi API')
    .setDescription(
      'API for AirConnect Hanoi - Air Quality Management Platform',
    )
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(document, null, 2) + '\n');

  logger.log(`OpenAPI spec written to ${OUTPUT_PATH}`);
  await app.close();
}

void exportOpenApi().catch((err: unknown) => {
  console.error('Failed to export OpenAPI spec:', err);
  process.exit(1);
});
