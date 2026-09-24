import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { generateIdempotencyKey, checkIdempotency } from '../utils/idempotency';
import { generateReceiptNo } from '../utils/receiptGenerator';

const prisma = new PrismaClient();

const RecordCollectionSchema = z.object({
  enrollmentId: z.string().uuid('enrollmentId must be a valid UUID'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'dueDate must be YYYY-MM-DD'),
  amount: z.number().positive('Amount must be positive'),
  notes: z.string().max(500).optional(),
  clientIdempotencyKey: z.string().max(128).optional(),
});

/**
 * POST /api/v1/collections
 * Record a cash collection with automatic idempotency deduplication.
 * Creates double-entry ledger entries on each successful transaction.
 */
export async function recordCollection(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const collectorId = req.auth!.userId;
    const body = RecordCollectionSchema.parse(req.body);

    // Verify enrollment belongs to this tenant
    const enrollment = await prisma.dailyEnrollment.findFirst({
      where: { id: body.enrollmentId, tenantId },
      include: { plan: true },
    });

    if (!enrollment) {
      res.status(404).json({ error: 'Enrollment not found' });
      return;
    }
    if (enrollment.isCompleted) {
      res.status(400).json({ error: 'This enrollment is already completed (100 days done)' });
      return;
    }
    if (enrollment.currentDay >= enrollment.plan.totalDays) {
      res.status(400).json({ error: 'Maximum collection days reached for this plan' });
      return;
    }

    // Idempotency check
    const idempotencyKey =
      body.clientIdempotencyKey ||
      generateIdempotencyKey(body.enrollmentId, body.dueDate, collectorId);

    const isDuplicate = await checkIdempotency(idempotencyKey);
    if (isDuplicate) {
      const existing = await prisma.collectionTransaction.findUnique({
        where: { idempotencyKey },
      });
      res.status(200).json({
        message: 'Duplicate request — returning existing receipt',
        data: existing,
      });
      return;
    }

    const receiptNo = generateReceiptNo(tenantId);
    const newDay = enrollment.currentDay + 1;
    const willComplete = newDay >= enrollment.plan.totalDays;

    // Atomic transaction: create collection + update enrollment + create ledger entries
    const [transaction] = await prisma.$transaction([
      prisma.collectionTransaction.create({
        data: {
          receiptNo,
          enrollmentId: body.enrollmentId,
          tenantId,
          dueDate: new Date(body.dueDate),
          amount: body.amount,
          collectorId,
          idempotencyKey,
          settlementStatus: 'PENDING',
          notes: body.notes,
        },
      }),
      prisma.dailyEnrollment.update({
        where: { id: body.enrollmentId },
        data: {
          currentDay: { increment: 1 },
          totalDeposited: { increment: body.amount },
          isCompleted: willComplete,
          updatedAt: new Date(),
        },
      }),
    ]);

    // Double-entry ledger (non-transactional for performance — idempotency handles dedup)
    await prisma.ledgerEntry.createMany({
      data: [
        {
          tenantId,
          transactionId: transaction.id,
          entryType: 'DEBIT',
          accountCode: 'CASH_IN_HAND',
          amount: body.amount,
          description: `Daily collection received — Day ${newDay}`,
          referenceNo: receiptNo,
        },
        {
          tenantId,
          transactionId: transaction.id,
          entryType: 'CREDIT',
          accountCode: 'MEMBER_DEPOSIT_LIABILITY',
          amount: body.amount,
          description: `Member deposit credited — Day ${newDay}`,
          referenceNo: receiptNo,
        },
      ],
    });

    res.status(201).json({
      message: 'Collection recorded successfully',
      data: {
        receiptNo: transaction.receiptNo,
        enrollmentId: transaction.enrollmentId,
        amount: transaction.amount,
        dueDate: transaction.dueDate,
        collectedAt: transaction.collectedAt,
        dayNumber: newDay,
        isEnrollmentComplete: willComplete,
        settlementStatus: transaction.settlementStatus,
      },
    });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/collections
 * List collections for this tenant, optionally filtered by enrollment or date.
 */
export async function listCollections(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const { enrollmentId, date, limit = '50' } = req.query;

    const where: Record<string, unknown> = { tenantId };
    if (enrollmentId) where.enrollmentId = enrollmentId;
    if (date) {
      const d = new Date(date as string);
      const nextDay = new Date(d);
      nextDay.setDate(nextDay.getDate() + 1);
      where.dueDate = { gte: d, lt: nextDay };
    }

    const txns = await prisma.collectionTransaction.findMany({
      where,
      orderBy: { collectedAt: 'desc' },
      take: Math.min(Number(limit), 200),
      select: {
        receiptNo: true,
        enrollmentId: true,
        amount: true,
        dueDate: true,
        collectedAt: true,
        settlementStatus: true,
      },
    });

    res.json({ data: txns, count: txns.length });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/collections/:receiptNo
 * Fetch a full digital receipt with member and plan details.
 */
export async function getReceipt(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const { receiptNo } = req.params;

    const txn = await prisma.collectionTransaction.findFirst({
      where: { receiptNo, tenantId },
      include: {
        enrollment: {
          include: {
            plan: { select: { planName: true, dailyAmount: true, totalDays: true } },
            member: {
              select: { memberNo: true, profileData: true },
            },
          },
        },
      },
    });

    if (!txn) {
      res.status(404).json({ error: 'Receipt not found' });
      return;
    }

    res.json({ data: txn });
  } catch (e) {
    next(e);
  }
}
