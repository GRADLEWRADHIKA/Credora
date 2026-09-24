import { Request, Response, NextFunction } from 'express';

/**
 * Enforces that every authenticated request carries a tenantId.
 * Placed after `authenticate` middleware.
 */
export function enforceTenantScope(req: Request, res: Response, next: NextFunction): void {
  if (!req.auth?.tenantId) {
    res.status(403).json({ error: 'Tenant context required' });
    return;
  }
  next();
}
