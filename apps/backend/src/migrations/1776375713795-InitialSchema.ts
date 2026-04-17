import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Initial schema for the AirConnect Hanoi domain.
 *
 * Generated from the current TypeORM entities via:
 *   pnpm --filter @airconnect/backend migration:generate src/migrations/InitialSchema
 *
 * Prerequisite: the PostGIS extension (cf. 1776375713794-CreatePostgisExtension)
 * must have been applied, otherwise the `geometry(Point, 4326)` column on
 * `schools.location` cannot be created.
 *
 * Subsequent schema changes MUST NOT edit this file. Generate new migrations
 * instead so that every environment replays the exact same sequence of DDL.
 */
export class InitialSchema1776375713795 implements MigrationInterface {
  name = 'InitialSchema1776375713795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."posts_type_enum" AS ENUM('case_study', 'best_practice', 'research', 'news', 'guide', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "type" "public"."posts_type_enum" NOT NULL, "description" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "content" text NOT NULL, "published_at" TIMESTAMP NOT NULL, "school_id" integer NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ratings_rate_enum" AS ENUM('1', '2', '3', '4', '5')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ratings" ("post_id" integer NOT NULL, "student_id" integer NOT NULL, "rate" "public"."ratings_rate_enum" NOT NULL, "rated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4684711b8fe9c47ac360692f56" PRIMARY KEY ("post_id", "student_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."students_sex_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "sex" "public"."students_sex_enum" NOT NULL, "birth_date" date NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "health_status" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "school_id" integer NOT NULL, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."solutions_type_enum" AS ENUM('improving_facilities', 'research_and_development', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."solutions_status_enum" AS ENUM('normal', 'important', 'critical', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "solutions" ("id" SERIAL NOT NULL, "type" "public"."solutions_type_enum" NOT NULL, "content" text NOT NULL, "note" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."solutions_status_enum" NOT NULL, CONSTRAINT "PK_05589f12803f420b119df2f6170" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "applies" ("solution_id" integer NOT NULL, "air_quality_id" integer NOT NULL, "applied_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_20b36f12bcf9a1ddd359445015d" PRIMARY KEY ("solution_id", "air_quality_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "air_qualities" ("id" SERIAL NOT NULL, "aqi" double precision NOT NULL, "pm25" double precision, "pm10" double precision, "co2" double precision, "temp" double precision, "humidity" double precision, "wind_speed" double precision, "measured_at" TIMESTAMP NOT NULL DEFAULT now(), "school_id" integer NOT NULL, CONSTRAINT "PK_07ec4392872386f5f25e6f11602" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."helps_type_enum" AS ENUM('request', 'offer', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."helps_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "helps" ("from_school_id" integer NOT NULL, "to_school_id" integer NOT NULL, "type" "public"."helps_type_enum" NOT NULL, "content" text NOT NULL, "status" "public"."helps_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80daa7b6a608531502477980dae" PRIMARY KEY ("from_school_id", "to_school_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."schools_type_enum" AS ENUM('primary', 'secondary', 'high_school', 'university')`,
    );
    await queryRunner.query(
      `CREATE TABLE "schools" ("id" SERIAL NOT NULL, "type" "public"."schools_type_enum" NOT NULL, "name" character varying(255) NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying(255) NOT NULL, "district" character varying(255), "password" character varying(255) NOT NULL, "situation" character varying(255), "email" character varying(255), "phone" character varying(20), "score_1" double precision NOT NULL DEFAULT '0', "score_2" double precision NOT NULL DEFAULT '0', "score_3" double precision NOT NULL DEFAULT '0', "score_4" double precision NOT NULL DEFAULT '0', "score_5" double precision NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_74a5374cf6d1c970dd47f888bf6" UNIQUE ("email"), CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32d48310cc9ac0d8f25b29e699" ON "schools" USING GiST ("location") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admins_type_enum" AS ENUM('super', 'normal')`,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" SERIAL NOT NULL, "type" "public"."admins_type_enum" NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4ba6d0c734d53f8e1b2e24b6c56" UNIQUE ("username"), CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reviews_decision_enum" AS ENUM('pending', 'accepted', 'rejected', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("submission_id" integer NOT NULL, "admin_id" integer NOT NULL, "decision" "public"."reviews_decision_enum" NOT NULL, "date" TIMESTAMP NOT NULL, "note" text, CONSTRAINT "PK_2f2e062c3bb8856631c33f47394" PRIMARY KEY ("submission_id", "admin_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."submissions_type_enum" AS ENUM('request', 'offer', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "submissions" ("id" SERIAL NOT NULL, "type" "public"."submissions_type_enum" NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "from_school_id" integer NOT NULL, CONSTRAINT "PK_10b3be95b8b2fb1e482e07d706b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "feedbacks" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "subject" character varying(255) NOT NULL, "message" text NOT NULL, "phone" character varying(20), "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_69247d231c2c01f40e0aa4dd4fa" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_f1960558bda55a4df3e0a6892b7" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_6bbd6528770156568dfc86ca9ec" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_aa8edc7905ad764f85924569647" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applies" ADD CONSTRAINT "FK_9072d5ed6a775d2d69e646c75f2" FOREIGN KEY ("solution_id") REFERENCES "solutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applies" ADD CONSTRAINT "FK_d703ac2d76ccfde8973c224e6ff" FOREIGN KEY ("air_quality_id") REFERENCES "air_qualities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "air_qualities" ADD CONSTRAINT "FK_dff98455e3ff9561776e9da0fb1" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "helps" ADD CONSTRAINT "FK_bcce29e2a1ab18bb5222783bd6c" FOREIGN KEY ("from_school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "helps" ADD CONSTRAINT "FK_ddce87e2906e17e062f576569c8" FOREIGN KEY ("to_school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_5e60abde7fd39f81fc88788971a" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_15209c4c955c85ecc94daebea9f" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD CONSTRAINT "FK_21af7ca6c8651f78854b9bd1cc2" FOREIGN KEY ("from_school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "submissions" DROP CONSTRAINT "FK_21af7ca6c8651f78854b9bd1cc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_15209c4c955c85ecc94daebea9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_5e60abde7fd39f81fc88788971a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "helps" DROP CONSTRAINT "FK_ddce87e2906e17e062f576569c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "helps" DROP CONSTRAINT "FK_bcce29e2a1ab18bb5222783bd6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "air_qualities" DROP CONSTRAINT "FK_dff98455e3ff9561776e9da0fb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applies" DROP CONSTRAINT "FK_d703ac2d76ccfde8973c224e6ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applies" DROP CONSTRAINT "FK_9072d5ed6a775d2d69e646c75f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_aa8edc7905ad764f85924569647"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_6bbd6528770156568dfc86ca9ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_f1960558bda55a4df3e0a6892b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_69247d231c2c01f40e0aa4dd4fa"`,
    );
    await queryRunner.query(`DROP TABLE "feedbacks"`);
    await queryRunner.query(`DROP TABLE "submissions"`);
    await queryRunner.query(`DROP TYPE "public"."submissions_type_enum"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TYPE "public"."reviews_decision_enum"`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TYPE "public"."admins_type_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32d48310cc9ac0d8f25b29e699"`,
    );
    await queryRunner.query(`DROP TABLE "schools"`);
    await queryRunner.query(`DROP TYPE "public"."schools_type_enum"`);
    await queryRunner.query(`DROP TABLE "helps"`);
    await queryRunner.query(`DROP TYPE "public"."helps_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."helps_type_enum"`);
    await queryRunner.query(`DROP TABLE "air_qualities"`);
    await queryRunner.query(`DROP TABLE "applies"`);
    await queryRunner.query(`DROP TABLE "solutions"`);
    await queryRunner.query(`DROP TYPE "public"."solutions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."solutions_type_enum"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TYPE "public"."students_sex_enum"`);
    await queryRunner.query(`DROP TABLE "ratings"`);
    await queryRunner.query(`DROP TYPE "public"."ratings_rate_enum"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TYPE "public"."posts_type_enum"`);
  }
}
