/**
 * Seed script — AirConnect Hanoi
 * ============================================================================
 * This script bootstraps the database with demo / fixture data. It is meant to
 * be executed MANUALLY (never as part of a deployment pipeline) for two main
 * scenarios:
 *
 *   1. Local development     : quickly populate a blank database.
 *   2. Staging / demo refresh: reset the environment to a known baseline.
 *
 * Usage (from the monorepo root):
 *   pnpm --filter @airconnect/backend seed            # append-only (safe)
 *   pnpm --filter @airconnect/backend seed -- --reset # truncate + re-seed
 *
 * Or via Railway one-off run (against a remote environment):
 *   railway run --service "Backend Server" --environment staging \
 *     pnpm --filter @airconnect/backend seed -- --reset
 *
 * Design rules:
 *   - Schema MUST already exist (i.e. migrations have been run).
 *     `synchronize` is permanently disabled here.
 *   - Default mode is IDEMPOTENT: every INSERT uses `ON CONFLICT DO NOTHING`
 *     so the script can be re-executed without raising unique-constraint
 *     errors. Existing rows are never modified.
 *   - `--reset` is an explicit opt-in that TRUNCATEs every seeded table
 *     before inserting. This is destructive and should only be used in
 *     dev or freshly-provisioned environments.
 *   - Production is blocked by default. Pass `--allow-production` to
 *     override (for a first-time bootstrap only).
 * ============================================================================
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

import { Admin } from './entities/admin.entity';
import { School } from './entities/school.entity';
import { Student } from './entities/student.entity';
import { Post } from './entities/post.entity';
import { Submission } from './entities/submission.entity';
import { Review } from './entities/review.entity';
import { AirQuality } from './entities/air-quality.entity';
import { Rating } from './entities/rating.entity';
import { Help } from './entities/help.entity';
import { Solution } from './entities/solution.entity';
import { Apply } from './entities/apply.entity';
import { Feedback } from './entities/feedback.entity';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const DATA_DIR = path.resolve(__dirname, '../../data');
const BCRYPT_ROUNDS = 10;

type CliFlags = {
  reset: boolean;
  allowProduction: boolean;
};

function parseFlags(argv: string[]): CliFlags {
  return {
    reset: argv.includes('--reset'),
    allowProduction: argv.includes('--allow-production'),
  };
}

/**
 * Resolve the actual deployment environment.
 *
 * `NODE_ENV` is NOT the right signal here: Railway (and most PaaS) set
 * `NODE_ENV=production` for every non-dev deployment (staging, PR preview,
 * production…) because it controls *library* behaviour — tree-shaking,
 * disabling React/webpack dev warnings, etc. Using it for business-logic
 * gating would incorrectly block staging operations too.
 *
 * Resolution order (authoritative → fallback):
 *   1. APP_ENV                     — app-controlled, explicit override.
 *   2. RAILWAY_ENVIRONMENT_NAME    — injected by Railway for every service.
 *                                    Values: "production" | "staging" | "pr-*".
 *   3. NODE_ENV                    — last resort (only useful locally).
 */
function resolveDeploymentEnv(): string {
  return (
    process.env.APP_ENV ??
    process.env.RAILWAY_ENVIRONMENT_NAME ??
    process.env.NODE_ENV ??
    'development'
  );
}

function loadJson<T>(filename: string): T {
  const full = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(full, 'utf-8')) as T;
}

function buildDataSource(dbUrl: string): DataSource {
  const requiresSsl =
    dbUrl.includes('sslmode=require') ||
    dbUrl.includes('railway') ||
    dbUrl.includes('rlwy') ||
    process.env.NODE_ENV === 'production';

  return new DataSource({
    type: 'postgres',
    url: dbUrl,
    entities: [
      Admin, School, Student, Post, Submission, Review,
      AirQuality, Rating, Help, Solution, Apply, Feedback,
    ],
    synchronize: false,
    logging: false,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  });
}

async function seed() {
  const flags = parseFlags(process.argv.slice(2));
  const dbUrl = process.env.DATABASE_URL;
  const deploymentEnv = resolveDeploymentEnv();

  if (!dbUrl) {
    console.error('[seed] DATABASE_URL is not set');
    process.exit(1);
  }

  if (deploymentEnv === 'production' && !flags.allowProduction) {
    console.error(
      '[seed] Refusing to run against the PRODUCTION environment.\n' +
        '[seed]   Pass --allow-production explicitly to override\n' +
        '[seed]   (intended for the first-time bootstrap of an empty DB).',
    );
    process.exit(1);
  }

  const mode = flags.reset ? 'RESET' : 'IDEMPOTENT';
  console.log(`[seed] Mode: ${mode} | Deployment env: ${deploymentEnv}`);

  const ds = buildDataSource(dbUrl);
  await ds.initialize();
  console.log('[seed] Connected to database');

  const qr = ds.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();

  const q = qr.query.bind(qr);

  try {
    if (flags.reset) {
      // FK-safe truncation order: leaf tables first, roots last.
      const tables = [
        'applies', 'ratings', 'reviews', 'submissions', 'posts',
        'air_qualities', 'helps', 'solutions', 'students', 'feedbacks',
        'admins', 'schools',
      ];
      for (const t of tables) {
        await q(`TRUNCATE TABLE "${t}" RESTART IDENTITY CASCADE`);
      }
      console.log(`[seed] Truncated ${tables.length} tables`);
    }

    // --------------------------------------------------------------------
    // 1. Admins
    // --------------------------------------------------------------------
    const admins = loadJson<Array<Record<string, unknown>>>('admins_data.json');
    for (const a of admins) {
      const hash = await bcrypt.hash(a.password as string, BCRYPT_ROUNDS);
      await q(
        `INSERT INTO admins (id, type, username, password, phone, email, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO NOTHING`,
        [a.id, a.type, a.username, hash, a.phone, a.email, a.created_at],
      );
    }
    console.log(`[seed] Admins       : ${admins.length} rows processed`);

    // --------------------------------------------------------------------
    // 2. Schools — geometry(Point, 4326) built from longitude/latitude
    // --------------------------------------------------------------------
    const schools = loadJson<Array<Record<string, unknown>>>('schools_data.json');
    for (const s of schools) {
      const hash = await bcrypt.hash(s.password as string, BCRYPT_ROUNDS);
      await q(
        `INSERT INTO schools (
           id, type, name, location, address, district, password, situation,
           email, phone, score_1, score_2, score_3, score_4, score_5, created_at
         )
         VALUES (
           $1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326),
           $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
         )
         ON CONFLICT (id) DO NOTHING`,
        [
          s.id, s.type, s.name,
          s.longitude, s.latitude,
          s.address, s.district, hash, s.situation,
          s.email, s.phone,
          s.score_1, s.score_2, s.score_3, s.score_4, s.score_5,
          s.created_at,
        ],
      );
    }
    console.log(`[seed] Schools      : ${schools.length} rows processed`);

    // --------------------------------------------------------------------
    // 3. Students
    // --------------------------------------------------------------------
    const students = loadJson<Array<Record<string, unknown>>>('students_data.json');
    for (const s of students) {
      const hash = await bcrypt.hash(s.password as string, BCRYPT_ROUNDS);
      await q(
        `INSERT INTO students (
           id, first_name, last_name, sex, birth_date, email, phone,
           health_status, password, created_at, school_id
         )
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (id) DO NOTHING`,
        [
          s.id, s.first_name, s.last_name, s.sex, s.birth_date,
          s.email, s.phone, s.health_status, hash, s.created_at, s.school_id,
        ],
      );
    }
    console.log(`[seed] Students     : ${students.length} rows processed`);

    // --------------------------------------------------------------------
    // 4. Solutions  (must precede applies)
    // --------------------------------------------------------------------
    const solutions = loadJson<Array<Record<string, unknown>>>('solutions_data.json');
    for (let i = 0; i < solutions.length; i++) {
      const s = solutions[i];
      await q(
        `INSERT INTO solutions (id, type, content, note, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO NOTHING`,
        [i + 1, s.type, s.content, s.note, s.status, s.created_at],
      );
    }
    console.log(`[seed] Solutions    : ${solutions.length} rows processed`);

    // --------------------------------------------------------------------
    // 5. Posts  (must precede ratings)
    // --------------------------------------------------------------------
    const posts = loadJson<Array<Record<string, unknown>>>('posts_data.json');
    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      await q(
        `INSERT INTO posts (
           id, title, type, description, image, content, published_at, school_id
         )
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (id) DO NOTHING`,
        [i + 1, p.title, p.type, p.description, p.image, p.content, p.published_at, p.school_id],
      );
    }
    console.log(`[seed] Posts        : ${posts.length} rows processed`);

    // --------------------------------------------------------------------
    // 6. Submissions  (must precede reviews)
    // --------------------------------------------------------------------
    const submissions = loadJson<Array<Record<string, unknown>>>('submissions_data.json');
    for (let i = 0; i < submissions.length; i++) {
      const s = submissions[i];
      await q(
        `INSERT INTO submissions (id, type, content, from_school_id)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (id) DO NOTHING`,
        [i + 1, s.type, s.content, s.from_school_id],
      );
    }
    console.log(`[seed] Submissions  : ${submissions.length} rows processed`);

    // --------------------------------------------------------------------
    // 7. Air qualities  (must precede applies)
    // --------------------------------------------------------------------
    const airQualities = loadJson<Array<Record<string, unknown>>>('air_qualities_data.json');
    for (const a of airQualities) {
      await q(
        `INSERT INTO air_qualities (
           id, aqi, pm25, pm10, co2, temp, humidity, wind_speed, measured_at, school_id
         )
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (id) DO NOTHING`,
        [a.id, a.aqi, a.pm25, a.pm10, a.co2, a.temp, a.humidity, a.wind_speed, a.measured_at, a.school_id],
      );
    }
    console.log(`[seed] Air qualities: ${airQualities.length} rows processed`);

    // --------------------------------------------------------------------
    // 8. Reviews — composite PK (submission_id, admin_id)
    // --------------------------------------------------------------------
    const reviews = loadJson<Array<Record<string, unknown>>>('reviews_data.json');
    for (const r of reviews) {
      await q(
        `INSERT INTO reviews (submission_id, admin_id, decision, date, note)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (submission_id, admin_id) DO NOTHING`,
        [r.submission_id, r.admin_id, r.decision, r.date, r.note],
      );
    }
    console.log(`[seed] Reviews      : ${reviews.length} rows processed`);

    // --------------------------------------------------------------------
    // 9. Ratings — composite PK (post_id, student_id)
    // --------------------------------------------------------------------
    const ratings = loadJson<Array<Record<string, unknown>>>('ratings_data.json');
    for (const r of ratings) {
      await q(
        `INSERT INTO ratings (post_id, student_id, rate, rated_at)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (post_id, student_id) DO NOTHING`,
        [r.post_id, r.student_id, r.rate, r.rated_at],
      );
    }
    console.log(`[seed] Ratings      : ${ratings.length} rows processed`);

    // --------------------------------------------------------------------
    // 10. Helps — composite PK (from_school_id, to_school_id)
    // --------------------------------------------------------------------
    const helps = loadJson<Array<Record<string, unknown>>>('help_data.json');
    for (const h of helps) {
      await q(
        `INSERT INTO helps (from_school_id, to_school_id, type, content, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (from_school_id, to_school_id) DO NOTHING`,
        [h.from_school_id, h.to_school_id, h.type, h.content, h.status, h.created_at],
      );
    }
    console.log(`[seed] Helps        : ${helps.length} rows processed`);

    // --------------------------------------------------------------------
    // 11. Applies — composite PK (solution_id, air_quality_id)
    // --------------------------------------------------------------------
    const applies = loadJson<Array<Record<string, unknown>>>('apply_data.json');
    for (const a of applies) {
      await q(
        `INSERT INTO applies (solution_id, air_quality_id, applied_at)
         VALUES ($1,$2,$3)
         ON CONFLICT (solution_id, air_quality_id) DO NOTHING`,
        [a.solution_id, a.air_quality_id, a.applied_at],
      );
    }
    console.log(`[seed] Applies      : ${applies.length} rows processed`);

    // --------------------------------------------------------------------
    // Sync auto-increment sequences to MAX(id) so next app-created row
    // does not collide with seeded IDs.
    // --------------------------------------------------------------------
    const seqTables = [
      'admins', 'schools', 'students', 'solutions',
      'posts', 'submissions', 'air_qualities',
    ];
    for (const t of seqTables) {
      await q(
        `SELECT setval(
           pg_get_serial_sequence('${t}', 'id'),
           COALESCE((SELECT MAX(id) FROM "${t}"), 1)
         )`,
      );
    }

    await qr.commitTransaction();
    console.log('[seed] Done.');
  } catch (err) {
    await qr.rollbackTransaction();
    console.error('[seed] Failed:', err);
    process.exitCode = 1;
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed();
