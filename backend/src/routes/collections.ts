import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { enforceTenantScope } from '../middleware/tenantScope';
import * as collectionController from '../controllers/collectionController';

const router = Router();
router.use(authenticate, enforceTenantScope);

/**
 * POST /api/v1/collections
 * Record a cash collection with idempotency key
 */
router.post(
  '/',
  requireRole('COLLECTOR', 'SUPER_ADMIN'),
  collectionController.recordCollection,
);

/**
 * GET /api/v1/collections
 * List collections (filtered by enrollment or date)
 */
router.get(
  '/',
  requireRole('COLLECTOR', 'LOAN_OFFICER', 'APPROVER', 'SUPER_ADMIN'),
  collectionController.listCollections,
);

/**
 * GET /api/v1/collections/:receiptNo
 * Fetch a specific digital receipt
 */
router.get('/:receiptNo', collectionController.getReceipt);

export default router;
