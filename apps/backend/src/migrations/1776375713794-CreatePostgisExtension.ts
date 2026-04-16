import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Bootstrap the PostGIS extension.
 *
 * Rationale:
 *   The subsequent schema migration creates columns of type `geometry`
 *   (e.g. `schools.location`). Those definitions require the `postgis`
 *   extension to already be present in the target database.
 *
 *   Locally, `docker/postgres/init-postgis.sh` runs once when the Docker
 *   volume is initialised — but managed Postgres (Railway, Neon, RDS,
 *   Supabase, …) does not execute container init scripts. Making the
 *   extension part of a migration is therefore the only portable way
 *   to guarantee a consistent schema across every environment.
 *
 *   `CREATE EXTENSION IF NOT EXISTS` is idempotent, so re-running the
 *   migration is a no-op.
 */
export class CreatePostgisExtension1776375713794 implements MigrationInterface {
  name = 'CreatePostgisExtension1776375713794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "postgis"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // We intentionally DO NOT drop the extension in down().
    // Dropping `postgis` cascades into every dependent object (geometry
    // columns, GiST indexes, …) and is virtually never what a developer
    // wants when reverting a migration. If removal is truly needed, do
    // it manually via psql.
  }
}
