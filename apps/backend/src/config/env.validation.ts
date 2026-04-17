import * as Joi from 'joi';

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
 *     is what we gate destructive operations on (seed --allow-production,
 *     premium features, analytics dataset selection…). Allowed values
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
  JWT_SECRET: Joi.string().min(8).required(),
  JWT_EXPIRATION: Joi.string().default('7d'),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),

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
