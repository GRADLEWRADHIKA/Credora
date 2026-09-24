import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { enforceTenantScope } from '../middleware/tenantScope';
import * as loanController from '../controllers/loanController';

const router = Router();
router.use(authenticate, enforceTenantScope);

/**
 * POST /api/v1/loan-applications
 * Submit a new loan application (members only, KYC must be VERIFIED)
 */
router.post(
  '/',
  requireRole('MEMBER', 'LOAN_OFFICER', 'SUPER_ADMIN'),
  loanController.createLoanApplication,
);

/**
 * GET /api/v1/loan-applications
 * List applications (members see only their own)
 */
router.get('/', loanController.listLoanApplications);

/**
 * GET /api/v1/loan-applications/:id
 * Get full application detail with KFS and guarantors
 */
router.get('/:id', loanController.getLoanApplication);

/**
 * PATCH /api/v1/loan-applications/:id/status
 * Approve or reject an application (APPROVERs only)
 */
router.patch(
  '/:id/status',
  requireRole('APPROVER', 'SUPER_ADMIN'),
  loanController.updateLoanStatus,
);

export default router;
