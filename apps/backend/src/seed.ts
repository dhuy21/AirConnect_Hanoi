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

function loadJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

async function seed() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const requiresSsl = dbUrl.includes('railway') || dbUrl.includes('rlwy');
  const ds = new DataSource({
    type: 'postgres',
    url: dbUrl,
    entities: [Admin, School, Student, Post, Submission, Review, AirQuality, Rating, Help, Solution, Apply, Feedback],
    synchronize: true,
    logging: false,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  });

  await ds.initialize();
  console.log('Connected to database');

  const qr = ds.createQueryRunner();

  try {
    await qr.startTransaction();
    const q = qr.query.bind(qr);

    await q('CREATE EXTENSION IF NOT EXISTS postgis');

    // Truncate all tables (order: leaf → root to respect FKs)
    const tables = [
      'applies', 'ratings', 'reviews', 'submissions', 'posts',
      'air_qualities', 'helps', 'solutions', 'students', 'feedbacks',
      'admins', 'schools',
    ];
    for (const t of tables) {
      await q(`TRUNCATE TABLE "${t}" RESTART IDENTITY CASCADE`);
    }
    console.log('Truncated all tables');

    const SALT = 10;

    // 1. Admins
    const admins = loadJson<any[]>('admins_data.json');
    for (const a of admins) {
      const hash = await bcrypt.hash(a.password, SALT);
      await q(
        `INSERT INTO admins (id, type, username, password, phone, email, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [a.id, a.type, a.username, hash, a.phone, a.email, a.created_at],
      );
    }
    console.log(`Seeded ${admins.length} admins`);

    // 2. Schools (PostGIS transform: latitude/longitude → geometry Point)
    const schools = loadJson<any[]>('schools_data.json');
    for (const s of schools) {
      const hash = await bcrypt.hash(s.password, SALT);
      await q(
        `INSERT INTO schools (id, type, name, location, address, district, password, situation, email, phone, score_1, score_2, score_3, score_4, score_5, created_at)
         VALUES ($1,$2,$3, ST_SetSRID(ST_MakePoint($4,$5), 4326), $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [s.id, s.type, s.name, s.longitude, s.latitude, s.address, s.district, hash, s.situation, s.email, s.phone, s.score_1, s.score_2, s.score_3, s.score_4, s.score_5, s.created_at],
      );
    }
    console.log(`Seeded ${schools.length} schools`);

    // 3. Students
    const students = loadJson<any[]>('students_data.json');
    for (const s of students) {
      const hash = await bcrypt.hash(s.password, SALT);
      await q(
        `INSERT INTO students (id, first_name, last_name, sex, birth_date, email, phone, health_status, password, created_at, school_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [s.id, s.first_name, s.last_name, s.sex, s.birth_date, s.email, s.phone, s.health_status, hash, s.created_at, s.school_id],
      );
    }
    console.log(`Seeded ${students.length} students`);

    // 4. Solutions (seed before applies)
    const solutions = loadJson<any[]>('solutions_data.json');
    for (let i = 0; i < solutions.length; i++) {
      const s = solutions[i];
      await q(
        `INSERT INTO solutions (id, type, content, note, status, created_at) VALUES ($1,$2,$3,$4,$5,$6)`,
        [i + 1, s.type, s.content, s.note, s.status, s.created_at],
      );
    }
    console.log(`Seeded ${solutions.length} solutions`);

    // 5. Posts (seed before ratings)
    const posts = loadJson<any[]>('posts_data.json');
    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      await q(
        `INSERT INTO posts (id, title, type, description, image, content, published_at, school_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [i + 1, p.title, p.type, p.description, p.image, p.content, p.published_at, p.school_id],
      );
    }
    console.log(`Seeded ${posts.length} posts`);

    // 6. Submissions (seed before reviews)
    const submissions = loadJson<any[]>('submissions_data.json');
    for (let i = 0; i < submissions.length; i++) {
      const s = submissions[i];
      await q(
        `INSERT INTO submissions (id, type, content, from_school_id) VALUES ($1,$2,$3,$4)`,
        [i + 1, s.type, s.content, s.from_school_id],
      );
    }
    console.log(`Seeded ${submissions.length} submissions`);

    // 7. Air qualities (seed before applies)
    const airQualities = loadJson<any[]>('air_qualities_data.json');
    for (const a of airQualities) {
      await q(
        `INSERT INTO air_qualities (id, aqi, pm25, pm10, co2, temp, humidity, wind_speed, measured_at, school_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [a.id, a.aqi, a.pm25, a.pm10, a.co2, a.temp, a.humidity, a.wind_speed, a.measured_at, a.school_id],
      );
    }
    console.log(`Seeded ${airQualities.length} air qualities`);

    // 8. Reviews
    const reviews = loadJson<any[]>('reviews_data.json');
    for (const r of reviews) {
      await q(
        `INSERT INTO reviews (submission_id, admin_id, decision, date, note) VALUES ($1,$2,$3,$4,$5)`,
        [r.submission_id, r.admin_id, r.decision, r.date, r.note],
      );
    }
    console.log(`Seeded ${reviews.length} reviews`);

    // 9. Ratings (was views)
    const ratings = loadJson<any[]>('ratings_data.json');
    for (const r of ratings) {
      await q(
        `INSERT INTO ratings (post_id, student_id, rate, rated_at) VALUES ($1,$2,$3,$4)`,
        [r.post_id, r.student_id, r.rate, r.rated_at],
      );
    }
    console.log(`Seeded ${ratings.length} ratings`);

    // 10. Helps
    const helps = loadJson<any[]>('help_data.json');
    for (const h of helps) {
      await q(
        `INSERT INTO helps (from_school_id, to_school_id, type, content, status, created_at) VALUES ($1,$2,$3,$4,$5,$6)`,
        [h.from_school_id, h.to_school_id, h.type, h.content, h.status, h.created_at],
      );
    }
    console.log(`Seeded ${helps.length} helps`);

    // 11. Applies
    const applies = loadJson<any[]>('apply_data.json');
    for (const a of applies) {
      await q(
        `INSERT INTO applies (solution_id, air_quality_id, applied_at) VALUES ($1,$2,$3)`,
        [a.solution_id, a.air_quality_id, a.applied_at],
      );
    }
    console.log(`Seeded ${applies.length} applies`);

    // Reset sequences to max ID
    const seqTables = ['admins', 'schools', 'students', 'solutions', 'posts', 'submissions', 'air_qualities'];
    for (const t of seqTables) {
      await q(`SELECT setval(pg_get_serial_sequence('${t}', 'id'), COALESCE((SELECT MAX(id) FROM "${t}"), 1))`);
    }

    await qr.commitTransaction();
    console.log('Seed completed successfully!');
  } catch (err) {
    await qr.rollbackTransaction();
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed();
