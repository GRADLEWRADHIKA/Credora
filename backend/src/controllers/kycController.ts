import { Request, Response, NextFunction } from 'express';
import { PrismaClient, DocType } from '@prisma/client';
import { z } from 'zod';
import { computeFileHash } from '../utils/fileHash';
import { sanitizeForLog } from '../utils/masking';

const prisma = new PrismaClient();

const REQUIRED_DOC_TYPES: DocType[] = ['IDENTITY', 'ADDRESS', 'SELFIE', 'PAN'];

const ConsentSchema = z.object({
  kycReviewConsent: z.literal('true'),
  bureauCheckConsent: z.literal('true'),
  bankVerificationConsent: z.literal('true'),
  noticeVersion: z.string().min(1),
  ipAddress: z.string().optional(),
});

const DOC_FIELD_MAP: Record<string, DocType> = {
  identity: 'IDENTITY',
  address: 'ADDRESS',
  selfie: 'SELFIE',
  pan: 'PAN',
};

/**
 * POST /api/v1/kyc/members/:id/kyc/submit
 * Submit KYC document bundle with explicit consent tokens.
 * Records consent, hashes each file, stores document metadata.
 */
export async function submitKYC(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id: memberId } = req.params;
    const tenantId = req.auth!.tenantId;

    // Verify member belongs to this tenant
    const member = await prisma.member.findFirst({
      where: { id: memberId, tenantId },
    });
    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    if (member.kycStatus === 'VERIFIED') {
      res.status(400).json({ error: 'KYC is already verified for this member' });
      return;
    }

    // Validate consent fields
    const consent = ConsentSchema.parse(req.body);

    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    if (!files || Object.keys(files).length === 0) {
      res.status(400).json({ error: 'At least one document must be uploaded' });
      return;
    }

    // Record consent (immutable audit trail)
    await prisma.consentRecord.create({
      data: {
        memberId,
        tenantId,
        purpose: 'KYC_SUBMISSION',
        noticeVersion: consent.noticeVersion,
        ipAddress: consent.ipAddress || req.ip || '0.0.0.0',
        userAgent: req.headers['user-agent'],
        timestamp: new Date(),
      },
    });

    // Process and store each uploaded document
    const uploadedDocs: Array<{ docType: DocType; id: string; verificationStatus: string }> = [];

    for (const [fieldName, fileArr] of Object.entries(files)) {
      const file = fileArr[0];
      const docType = DOC_FIELD_MAP[fieldName];
      if (!docType) continue;

      const hashSignature = computeFileHash(file.path);
      const fileUrl = `/uploads/${file.filename}`;

      const doc = await prisma.memberDocument.create({
        data: {
          memberId,
          tenantId,
          docType,
          fileUrl,
          hashSignature,
          fileSizeBytes: file.size,
          mimeType: file.mimetype,
          verificationStatus: 'PENDING',
        },
      });

      uploadedDocs.push({
        docType: doc.docType,
        verificationStatus: doc.verificationStatus,
        id: doc.id,
      });
    }

    // Update KYC status to PENDING (awaiting manual/automated review)
    await prisma.member.update({
      where: { id: memberId },
      data: { kycStatus: 'PENDING', updatedAt: new Date() },
    });

    console.info('[KYC_SUBMIT]', sanitizeForLog({ memberId, tenantId, docsSubmitted: uploadedDocs.length }));

    res.status(201).json({
      message: 'KYC documents submitted successfully',
      data: {
        memberId,
        documents: uploadedDocs,
        status: 'PENDING',
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/kyc/members/:id/kyc/status
 * Returns current KYC status and list of missing required documents.
 */
export async function getKYCStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id: memberId } = req.params;
    const tenantId = req.auth!.tenantId;

    const member = await prisma.member.findFirst({
      where: { id: memberId, tenantId },
      include: {
        documents: {
          select: {
            docType: true,
            verificationStatus: true,
            uploadedAt: true,
            rejectionReason: true,
          },
          orderBy: { uploadedAt: 'desc' },
        },
      },
    });

    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    // Determine which required documents are still missing
    const uploadedTypes = new Set(member.documents.map(d => d.docType));
    const missingDocuments = REQUIRED_DOC_TYPES.filter(t => !uploadedTypes.has(t));

    res.json({
      data: {
        memberId,
        kycStatus: member.kycStatus,
        documents: member.documents,
        missingDocuments,
        isComplete: missingDocuments.length === 0,
      },
    });
  } catch (e) {
    next(e);
  }
}
