import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a human-readable, unique receipt number.
 * Format: {TENANT_PREFIX}-{TIMESTAMP_BASE36}-{RANDOM_HEX}
 * Example: CRED-M2K8XZPL-A3F9B2
 */
export function generateReceiptNo(tenantId: string): string {
  const prefix = tenantId.replace(/-/g, '').slice(0, 4).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  const rand = uuidv4().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}
