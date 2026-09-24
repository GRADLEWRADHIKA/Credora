import { Router } from 'express';
import memberRoutes from './members';
import kycRoutes from './kyc';
import collectionRoutes from './collections';
import loanRoutes from './loanApplications';

const router = Router();

router.use('/members', memberRoutes);
router.use('/kyc', kycRoutes);         // routes: /kyc/members/:id/kyc/submit
router.use('/collections', collectionRoutes);
router.use('/loan-applications', loanRoutes);

export default router;
