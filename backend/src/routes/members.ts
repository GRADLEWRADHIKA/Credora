import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { enforceTenantScope } from '../middleware/tenantScope';
import * as memberController from '../controllers/memberController';

const router = Router();

// All member routes require auth and tenant scope
router.use(authenticate, enforceTenantScope);

router.get(
  '/',
  requireRole('COLLECTOR', 'LOAN_OFFICER', 'APPROVER', 'SUPER_ADMIN'),
  memberController.listMembers,
);
router.get('/:id', memberController.getMember);
router.post(
  '/',
  requireRole('COLLECTOR', 'SUPER_ADMIN'),
  memberController.createMember,
);

export default router;
