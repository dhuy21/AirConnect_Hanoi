import * as Joi from 'joi';

const MAX_JWT_MINUTES = 12 * 60;

/*
 * Two conceptually different environment signals coexist here:
 *
 *   - NODE_ENV controls *library* behaviour (React / webpack / Nest
 *     internal optimisations). PaaS providers (Railway, Render, Fly.io,
 *     Heroku…) set it to "production" for every non-dev deployment,
 *     regardless of whether the deployment is staging, preview, or
 *     actual production.
 *
 *   - APP_ENV is app-owned. It reflects the *business* environment and
 *     is what we gate destructive operations on (the seed refuses
 *     production, premium features, analytics dataset selection…). Allowed values
 *     mirror our Railway environments: development | staging | production
 *     | preview (for PR environments).
 *
 * Keep them strictly separate; do not reuse one for the purpose of the
 * other.
 */
export const envValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().uri().required(),
  PORT: Joi.number().default(3001),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  APP_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'preview', 'test')
    .default('development'),
  JWT_SECRET: Joi.string().min(32).required(),
  // Access-token lifetime: "<n>m" or "<n>h", at most 12 hours (interim until
  // refresh tokens, NFR-018). Longer values such as "7d" refuse to start.
  JWT_EXPIRATION: Joi.string()
    .pattern(/^[1-9]\d*[mh]$/)
    .custom((value: string, helpers) => {
      const minutes = value.endsWith('h')
        ? parseInt(value, 10) * 60
        : parseInt(value, 10);
      return minutes <= MAX_JWT_MINUTES ? value : helpers.error('any.invalid');
    })
    .default('2h'),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),

  // Public self-registration. Off by default: in the online demonstrator,
  // forms are limited to test accounts (NFR-001). Enable only for local dev.
  REGISTRATION_ENABLED: Joi.boolean().default(false),

  // Redis — optional in dev (falls back to in-memory throttler), required
  // in staging/production via Railway Redis service injection.
  REDIS_URL: Joi.string()
    .uri({ scheme: ['redis', 'rediss'] })
    .optional()
    .allow(''),

  // Throttler (global rate-limit). TTL in seconds.
  THROTTLE_TTL: Joi.number().integer().min(1).default(60),
  THROTTLE_LIMIT: Joi.number().integer().min(1).default(100),
});
