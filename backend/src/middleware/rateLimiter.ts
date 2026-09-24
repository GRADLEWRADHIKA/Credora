import rateLimit from 'express-rate-limit';

/** Global API rate limiter — 100 req / 15 min */
export const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

/** Strict KYC limiter — 5 submissions per hour per IP */
export const kycRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: Number(process.env.KYC_RATE_LIMIT_MAX) || 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'KYC submission limit reached. Try again in 1 hour.' },
});

/** Auth endpoint limiter — 10 attempts per 15 min */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});
