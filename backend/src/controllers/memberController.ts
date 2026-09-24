import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { maskPhone } from '../utils/masking';

const prisma = new PrismaClient();

const CreateMemberSchema = z.object({
  phone: z.string().min(10).max(15),
  name: z.string().min(2).max(100),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format'),
  address: z.object({
    line1: z.string().min(5),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  }),
});

/**
 * GET /api/v1/members
 * List all members for the authenticated tenant
 */
export async function listMembers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const members = await prisma.member.findMany({
      where: { tenantId },
      select: {
        id: true,
        memberNo: true,
        kycStatus: true,
        profileData: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: members, count: members.length });
  } catch (e) {
    next(e);
  }
}

/**
 * GET /api/v1/members/:id
 * Get single member profile with documents and enrollments
 */
export async function getMember(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const tenantId = req.auth!.tenantId;

    const member = await prisma.member.findFirst({
      where: { id, tenantId },
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
        enrollments: {
          include: { plan: { select: { planName: true, dailyAmount: true } } },
          where: { isCompleted: false },
        },
      },
    });

    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    res.json({ data: member });
  } catch (e) {
    next(e);
  }
}

/**
 * POST /api/v1/members
 * Create a new member (Collector or Super Admin only)
 */
export async function createMember(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tenantId = req.auth!.tenantId;
    const body = CreateMemberSchema.parse(req.body);

    // Check tenant exists
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant || tenant.status !== 'ACTIVE') {
      res.status(403).json({ error: 'Tenant not active' });
      return;
    }

    // Check for duplicate phone within tenant
    const existingUser = await prisma.user.findUnique({
      where: { tenantId_phone: { tenantId, phone: body.phone } },
    });
    if (existingUser) {
      res.status(409).json({ error: 'A member with this phone number already exists' });
      return;
    }

    // Create user record first
    const userRecord = await prisma.user.create({
      data: {
        tenantId,
        phone: body.phone,
        pinHash: '', // Set via separate PIN setup flow
        role: 'MEMBER',
      },
    });

    // Generate sequential member number
    const count = await prisma.member.count({ where: { tenantId } });
    const memberNo = `MBR-${String(count + 1).padStart(6, '0')}`;

    const member = await prisma.member.create({
      data: {
        tenantId,
        userId: userRecord.id,
        memberNo,
        profileData: {
          name: body.name,
          // Store masked phone in profile — raw phone only in User table
          phone: maskPhone(body.phone),
          dateOfBirth: body.dateOfBirth,
          address: body.address,
        },
        kycStatus: 'PENDING',
      },
    });

    res.status(201).json({
      message: 'Member created successfully',
      data: { id: member.id, memberNo: member.memberNo, kycStatus: member.kycStatus },
    });
  } catch (e) {
    next(e);
  }
}
