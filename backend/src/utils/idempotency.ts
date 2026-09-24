import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Generates a deterministic idempotency key from collection parameters.
 * Same enrollment + same due-date + same collector → same key → deduplicated.
 */
export function generateIdempotencyKey(
  enrollmentId: string,
  dueDate: string,
  collectorId: string,
): string {
  return createHash('sha256')
    .update(`${enrollmentId}:${dueDate}:${collectorId}`)
    .digest('hex');
}

/**
 * Checks if a transaction with this idempotency key already exists.
 * Returns true if duplicate.
 */
export async function checkIdempotency(key: string): Promise<boolean> {
  const existing = await prisma.collectionTransaction.findUnique({
    where: { idempotencyKey: key },
    select: { id: true },
  });
  return existing !== null;
}
