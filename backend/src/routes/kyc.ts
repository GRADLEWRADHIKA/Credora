import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate } from '../middleware/auth';
import { enforceTenantScope } from '../middleware/tenantScope';
import { kycRateLimiter } from '../middleware/rateLimiter';
import * as kycController from '../controllers/kycController';

// ─── Multer configuration ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads');
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const upload = multer({
  storage,
  limits: { fileSize: (Number(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
  },
});

const router = Router();
router.use(authenticate, enforceTenantScope);

/**
 * POST /api/v1/kyc/members/:id/kyc/submit
 * Submit KYC document bundle + consent tokens
 */
router.post(
  '/members/:id/kyc/submit',
  kycRateLimiter,
  upload.fields([
    { name: 'identity', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  kycController.submitKYC,
);

/**
 * GET /api/v1/kyc/members/:id/kyc/status
 * Get KYC verification status and missing documents
 */
router.get('/members/:id/kyc/status', kycController.getKYCStatus);

export default router;
