import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Drop the sensitive personal fields of student accounts (health status,
 * birth date, sex, phone), which the product must not hold (DEC-011,
 * DEC-020, DEC-131). The values are deleted permanently: `down` restores
 * the columns only, empty and nullable.
 */
export class DropStudentSensitiveFields1795000000000 implements MigrationInterface {
  name = 'DropStudentSensitiveFields1795000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP COLUMN "health_status"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "sex"`);
    await queryRunner.query(`DROP TYPE "public"."students_sex_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."students_sex_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD "sex" "public"."students_sex_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "students" ADD "birth_date" date`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD "phone" character varying(20)`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD "health_status" character varying(255)`,
    );
  }
}
