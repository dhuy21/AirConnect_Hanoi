/**
 * Create the first administrator of an empty platform (FR-ACC-020).
 * ============================================================================
 * Works in every environment, production included. Refuses to run when an
 * administrator already exists. The password is random and printed ONCE.
 *
 *   pnpm --filter @airconnect/backend bootstrap:admin -- \
 *     --username <username> --email <email>
 *
 * Against Railway, from your machine (target the database service):
 *   railway run --service PostGIS --environment production \
 *     pnpm --filter @airconnect/backend bootstrap:admin -- --username … --email …
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

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const BCRYPT_ROUNDS = 10;

function argValue(argv: string[], name: string): string | undefined {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}

async function main() {
  const argv = process.argv.slice(2);
  const username = argValue(argv, '--username');
  const email = argValue(argv, '--email');
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('[bootstrap-admin] DATABASE_URL is not set');
    process.exit(1);
  }
  if (!username || !email || !email.includes('@')) {
    console.error(
      '[bootstrap-admin] Usage: bootstrap:admin -- --username <username> --email <email>',
    );
    process.exit(1);
  }

  console.log(
    `[bootstrap-admin] Deployment env: ${resolveDeploymentEnv()} | Target: ${describeTarget(dbUrl)}`,
  );
  const ds = await connect(dbUrl);
  try {
    const [{ count }] = await ds.query<{ count: number }[]>(
      'SELECT COUNT(*)::int AS count FROM admins',
    );
    if (count > 0) {
      console.error(
        `[bootstrap-admin] Refusing: ${count} administrator(s) already exist.`,
      );
      process.exitCode = 1;
      return;
    }
    const password = generatePassword();
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await ds.query(
      `INSERT INTO admins (type, username, password, phone, email)
       VALUES ('super', $1, $2, '', $3)`,
      [username, hash, email],
    );
    console.log(
      `[bootstrap-admin] Administrator created. Password (shown ONCE, not stored anywhere):\n[bootstrap-admin]   ${username}  ${password}`,
    );
  } finally {
    await ds.destroy();
  }
}

main().catch((err) => {
  console.error('[bootstrap-admin] Failed:', err);
  process.exitCode = 1;
});
