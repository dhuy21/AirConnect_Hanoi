/**
 * Remove the invented fixture data that the seed loaded up to commit a105153
 * (DEC-025, NFR-036) from an already-deployed database.
 * ============================================================================
 * Dry run by default: every step runs inside a transaction that is rolled
 * back, and the number of rows it would change is printed. Pass --confirm to
 * commit. Only rows that match the old fixtures (id plus an md5 of their
 * text, see purge-fixtures.data.ts) are touched; rows created by people are
 * left alone. Safe to run more than once.
 *
 * It deletes the old submissions, reviews, help requests, air-quality
 * readings, applies, ratings, posts and solutions; resets the old school
 * records to "not reported" (scores 0, no situation, no phone, test email);
 * and renames the old admin, school and student test accounts and replaces
 * their disclosed passwords with an unknown random one (the accounts can no
 * longer sign in).
 *
 *   pnpm --filter @airconnect/backend purge:fixtures              # dry run
 *   pnpm --filter @airconnect/backend purge:fixtures -- --confirm # apply
 *
 * Against Railway, from your machine (target the database service, back up first):
 *   railway run --service PostGIS --environment staging \
 *     pnpm --filter @airconnect/backend purge:fixtures -- --confirm
 * ============================================================================
 */
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import {
  connect,
  describeTarget,
  generatePassword,
  resolveDeploymentEnv,
} from './scripts/script-db';
import {
  OLD_ADMINS,
  OLD_AIR_QUALITIES,
  OLD_HELPS,
  OLD_POSTS,
  OLD_SCHOOLS,
  OLD_SCHOOL_EMAILS,
  OLD_SOLUTIONS,
  OLD_STUDENTS,
  OLD_SUBMISSIONS,
} from './purge-fixtures.data';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const col = <T>(rows: T[][], i: number) => rows.map((r) => r[i]);

/** Subqueries selecting the ids of fixture rows still present. */
const MATCHED_SOLUTIONS = `SELECT s.id FROM solutions s
  JOIN unnest($1::int[], $2::text[]) AS f(id, h) ON s.id = f.id AND md5(s.content) = f.h`;
const MATCHED_POSTS = `SELECT p.id FROM posts p
  JOIN unnest($1::int[], $2::text[]) AS f(id, h) ON p.id = f.id AND md5(p.title) = f.h`;
const MATCHED_SUBMISSIONS = `SELECT s.id FROM submissions s
  JOIN unnest($1::int[], $2::text[]) AS f(id, h) ON s.id = f.id AND md5(s.content) = f.h`;
const MATCHED_AIR_QUALITIES = `SELECT a.id FROM air_qualities a
  JOIN unnest($1::int[], $2::int[], $3::text[]) AS f(id, school_id, m)
    ON a.id = f.id AND a.school_id = f.school_id
   AND to_char(a.measured_at, 'YYYY-MM-DD"T"HH24:MI:SS') = f.m`;

type Step = { label: string; sql: string; params: unknown[] };

function buildSteps(lockedHash: string): Step[] {
  const sol = [col(OLD_SOLUTIONS, 0), col(OLD_SOLUTIONS, 1)];
  const post = [col(OLD_POSTS, 0), col(OLD_POSTS, 1)];
  const sub = [col(OLD_SUBMISSIONS, 0), col(OLD_SUBMISSIONS, 1)];
  const aq = [
    col(OLD_AIR_QUALITIES, 0),
    col(OLD_AIR_QUALITIES, 1),
    col(OLD_AIR_QUALITIES, 2),
  ];
  return [
    {
      label: 'applies on fixture solutions',
      sql: `DELETE FROM applies WHERE solution_id IN (${MATCHED_SOLUTIONS})`,
      params: sol,
    },
    {
      label: 'applies on fixture air-quality readings',
      sql: `DELETE FROM applies WHERE air_quality_id IN (${MATCHED_AIR_QUALITIES})`,
      params: aq,
    },
    {
      label: 'ratings of fixture posts',
      sql: `DELETE FROM ratings WHERE post_id IN (${MATCHED_POSTS})`,
      params: post,
    },
    {
      label: 'reviews of fixture submissions',
      sql: `DELETE FROM reviews WHERE submission_id IN (${MATCHED_SUBMISSIONS})`,
      params: sub,
    },
    {
      label: 'fixture submissions',
      sql: `DELETE FROM submissions WHERE id IN (${MATCHED_SUBMISSIONS})`,
      params: sub,
    },
    {
      label: 'fixture help requests',
      sql: `DELETE FROM helps h USING unnest($1::int[], $2::int[], $3::text[]) AS f(fr, t, h)
            WHERE h.from_school_id = f.fr AND h.to_school_id = f.t AND md5(h.content) = f.h`,
      params: [col(OLD_HELPS, 0), col(OLD_HELPS, 1), col(OLD_HELPS, 2)],
    },
    {
      label: 'fixture air-quality readings',
      sql: `DELETE FROM air_qualities WHERE id IN (${MATCHED_AIR_QUALITIES})`,
      params: aq,
    },
    {
      label: 'fixture posts',
      sql: `DELETE FROM posts WHERE id IN (${MATCHED_POSTS})`,
      params: post,
    },
    {
      label: 'fixture solutions',
      sql: `DELETE FROM solutions WHERE id IN (${MATCHED_SOLUTIONS})`,
      params: sol,
    },
    {
      label: 'fixture schools reset to "not reported"',
      sql: `UPDATE schools s SET score_1 = 0, score_2 = 0, score_3 = 0, score_4 = 0,
              score_5 = 0, situation = NULL, phone = NULL
            FROM unnest($1::int[], $2::text[]) AS f(id, h)
            WHERE s.id = f.id AND md5(s.name) = f.h
              AND ((s.score_1, s.score_2, s.score_3, s.score_4, s.score_5) <> (0, 0, 0, 0, 0)
                   OR s.situation IS NOT NULL OR s.phone IS NOT NULL)`,
      params: [col(OLD_SCHOOLS, 0), col(OLD_SCHOOLS, 1)],
    },
    {
      label: 'fixture school accounts renamed and locked',
      sql: `UPDATE schools s SET email = 'school-' || s.id || '@example.invalid', password = $3
            FROM unnest($1::int[], $2::text[]) AS f(id, h)
            WHERE s.id = f.id AND md5(s.email) = f.h`,
      params: [
        col(OLD_SCHOOL_EMAILS, 0),
        col(OLD_SCHOOL_EMAILS, 1),
        lockedHash,
      ],
    },
    {
      label: 'fixture admin accounts renamed and locked',
      sql: `UPDATE admins a SET username = 'test_admin_' || a.id,
              email = 'test-admin-' || a.id || '@example.invalid', phone = '', password = $3
            FROM unnest($1::int[], $2::text[]) AS f(id, h)
            WHERE a.id = f.id AND md5(a.email) = f.h`,
      params: [col(OLD_ADMINS, 0), col(OLD_ADMINS, 1), lockedHash],
    },
    {
      label: 'fixture student accounts renamed and locked',
      sql: `UPDATE students s SET first_name = 'Test', last_name = 'Student ' || s.id,
              email = 'test-student-' || s.id || '@example.invalid', password = $3
            FROM unnest($1::int[], $2::text[]) AS f(id, h)
            WHERE s.id = f.id AND md5(s.email) = f.h`,
      params: [col(OLD_STUDENTS, 0), col(OLD_STUDENTS, 1), lockedHash],
    },
  ];
}

async function main() {
  const confirm = process.argv.slice(2).includes('--confirm');
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('[purge] DATABASE_URL is not set');
    process.exit(1);
  }
  console.log(
    `[purge] Mode: ${confirm ? 'CONFIRM (changes are committed)' : 'DRY RUN (nothing is changed)'} | ` +
      `Deployment env: ${resolveDeploymentEnv()} | Target: ${describeTarget(dbUrl)}`,
  );

  // Unknown random password: nobody can sign in with it, and it is never printed.
  const lockedHash = await bcrypt.hash(generatePassword(), 10);
  const ds = await connect(dbUrl);
  const qr = ds.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();
  try {
    let total = 0;
    for (const step of buildSteps(lockedHash)) {
      const result = await qr.query(step.sql, step.params, true);
      const affected = Number(result.affected ?? 0);
      total += affected;
      console.log(`[purge]   ${String(affected).padStart(4)}  ${step.label}`);
    }
    if (confirm) {
      await qr.commitTransaction();
      console.log(`[purge] Done: ${total} row(s) changed.`);
    } else {
      await qr.rollbackTransaction();
      console.log(
        `[purge] Dry run: ${total} row(s) would change. Re-run with --confirm to apply.`,
      );
    }
  } catch (err) {
    await qr.rollbackTransaction();
    throw err;
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch((err) => {
  console.error('[purge] Failed:', err);
  process.exitCode = 1;
});
