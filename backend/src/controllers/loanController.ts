import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// ─── Schemas ─────────────────────────────────────────────────────────────────

const CreateLoanSchema = z.object({
  loanPurpose: z.string().min(5, 'Purpose must be at least 5 characters'),
  requestedAmount: z.number().positive().max(10_000_000),
  tenureMonths: z.number().int().min(1).max(120),
  guarantorMemberIds: z
    .array(z.string().uuid())
    .min(1, 'At least 1 guarantor required')
    .max(2, 'Maximum 2 guarantors allowed'),
  digitalSignatureHash: z.string().optional(),
  keyFactAcknowledged: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge the Key Fact Statement' }),
  }),
});

const UpdateLoanStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  decisionReason: z.string().optional(),
  approvedAmount: z.number().positive().optional(),
  interestRate: z.number().min(0).max(1).optional(),
});

// ─── Key Fact Statement Calculator ───────────────────────────────────────────

function calculateKFS(
  principal: number,
  ratePerAnnum: number,
  tenureMonths: number,
): {
  emi: string;
  totalRepayable: string;
  totalInterest: string;
  aprPercent: string;
} {
  const r = ratePerAnnum / 12;
  const emi =
    (principal * r * Math.pow(1 + r, tenureMonths)) /
    (Math.pow(1 + r, tenureMonths) - 1);
  const totalRepayable = emi * tenureMonths;
  const totalInterest = totalRepayable - principal;
  // APR includes 1% processing fee amortized
  const aprPercent = ((ratePerAnnum + 0.012) * 100).toFixed(2);

  return {
    emi: emi.toFixed(2),
    totalRepayable: totalRepayable.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    aprPercent,
  };
}

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * POST /api/v1/loan-applications
 * Creates a loan application with Key Fact Statement and guarantors.
 * Requires member's KYC status to be VERIFIED.
 */
export async function createLoanApplication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const userId = req.auth!.userId;
    const body = CreateLoanSchema.parse(req.body);

    // Fetch member for this user
    const member = await prisma.member.findFirst({
      where: { userId, tenantId },
    });
    if (!member) {
      res.status(400).json({ error: 'Member profile not found for this user' });
      return;
    }
    if (member.kycStatus !== 'VERIFIED') {
      res.status(400).json({
        error: 'KYC must be VERIFIED before applying for a loan',
        kycStatus: member.kycStatus,
      });
      return;
    }

    // Validate guarantors belong to this tenant and are KYC-verified
    const guarantorMembers = await prisma.member.findMany({
      where: {
        id: { in: body.guarantorMemberIds },
        tenantId,
        kycStatus: 'VERIFIED',
      },
      select: { id: true },
    });
    if (guarantorMembers.length !== body.guarantorMemberIds.length) {
      res.status(400).json({
        error: 'One or more guarantors are invalid or not KYC-verified',
      });
      return;
    }

    // Generate application number
    const count = await prisma.loanApplication.count({ where: { tenantId } });
    const applicationNo = `LOAN-${tenantId.slice(0, 4).toUpperCase()}-${String(count + 1).padStart(6, '0')}`;

    // Calculate Key Fact Statement at indicative 12% p.a.
    const INDICATIVE_RATE = 0.12;
    const kfs = calculateKFS(body.requestedAmount, INDICATIVE_RATE, body.tenureMonths);

    const application = await prisma.loanApplication.create({
      data: {
        applicationNo,
        tenantId,
        memberId: member.id,
        loanPurpose: body.loanPurpose,
        requestedAmount: body.requestedAmount,
        tenureMonths: body.tenureMonths,
        status: 'SUBMITTED',
        submittedAt: new Date(),
        digitalSignatureHash: body.digitalSignatureHash,
        keyFactStatement: {
          principal: body.requestedAmount,
          indicativeRate: '12% p.a. (reducing balance)',
          apr: `${kfs.aprPercent}% (includes 1% processing fee)`,
          tenure: `${body.tenureMonths} months`,
          estimatedEMI: `₹${kfs.emi}`,
          totalRepayable: `₹${kfs.totalRepayable}`,
          totalInterest: `₹${kfs.totalInterest}`,
          processingFee: '1% of principal (deducted at disbursement)',
          penalty: '2% per month on overdue outstanding',
          prepaymentCharges: 'Nil after 3 EMIs paid',
          generatedAt: new Date().toISOString(),
        },
        guarantors: {
          create: body.guarantorMemberIds.map(gMemberId => ({
            memberId: gMemberId,
            tenantId,
            consentStatus: 'INVITED',
            liabilityTerms: {
              type: 'JOINT_AND_SEVERAL',
              description:
                'The guarantor is jointly and severally liable for the entire outstanding loan amount including interest and charges.',
              invitedAt: new Date().toISOString(),
            },
          })),
        },
      },
      include: {
        guarantors: {
          select: { memberId: true, consentStatus: true },
        },
      },
    });

    res.status(201).json({
      message: 'Loan application submitted successfully',
      data: application,
    });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/loan-applications
 * Lists loan applications. Members see only their own; others see tenant-wide.
 */
export async function listLoanApplications(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const userId = req.auth!.userId;
    const role = req.auth!.role;

    const where: Record<string, unknown> = { tenantId };

    if (role === 'MEMBER') {
      const member = await prisma.member.findFirst({ where: { userId, tenantId } });
      if (member) where.memberId = member.id;
    }

    const apps = await prisma.loanApplication.findMany({
      where,
      include: {
        guarantors: { select: { consentStatus: true, memberId: true } },
        member: { select: { memberNo: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json({ data: apps, count: apps.length });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/loan-applications/:id
 * Full application detail with KFS, guarantors, and loan account.
 */
export async function getLoanApplication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const tenantId = req.auth!.tenantId;

    const app = await prisma.loanApplication.findFirst({
      where: { id, tenantId },
      include: {
        guarantors: true,
        loanAccount: true,
        member: {
          select: { memberNo: true, profileData: true, kycStatus: true },
        },
      },
    });

    if (!app) {
      res.status(404).json({ error: 'Loan application not found' });
      return;
    }

    res.json({ data: app });
  } catch (e) {
    next(e);
  }
}

/**
 * PATCH /api/v1/loan-applications/:id/status
 * Approve or reject an application (APPROVER / SUPER_ADMIN only).
 */
export async function updateLoanStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const tenantId = req.auth!.tenantId;
    const approverId = req.auth!.userId;
    const body = UpdateLoanStatusSchema.parse(req.body);

    const existing = await prisma.loanApplication.findFirst({
      where: { id, tenantId },
    });
    if (!existing) {
      res.status(404).json({ error: 'Loan application not found' });
      return;
    }
    if (!['SUBMITTED', 'UNDER_REVIEW'].includes(existing.status)) {
      res.status(400).json({
        error: `Cannot update status from '${existing.status}'`,
      });
      return;
    }

    const updated = await prisma.loanApplication.update({
      where: { id },
      data: {
        status: body.status,
        approverId,
        decisionReason: body.decisionReason,
        approvedAmount: body.approvedAmount,
        interestRate: body.interestRate,
        decidedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.json({
      message: `Loan application ${body.status.toLowerCase()}`,
      data: updated,
    });
  } catch (e) {
    next(e);
  }
}
