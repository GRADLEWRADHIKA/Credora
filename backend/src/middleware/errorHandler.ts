import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Centralized error handler.
 * - ZodError → 422 with field-level detail
 * - Known Error → 500 with message
 * - Unknown → 500 generic
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(422).json({
      error: 'Validation failed',
      details: err.flatten(),
    });
    return;
  }

  if (err instanceof Error) {
    // Don't leak stack traces in production
    const isDev = process.env.NODE_ENV !== 'production';
    console.error('[ERROR]', err.message, isDev ? err.stack : '');
    res.status(500).json({
      error: isDev ? err.message : 'Internal server error',
    });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
}
