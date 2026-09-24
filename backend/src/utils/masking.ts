/**
 * Sensitive data masking utilities.
 * Used to redact PAN, Aadhaar, phone numbers in logs and API responses.
 * NEVER log raw government identifiers.
 */

export function maskPAN(pan: string): string {
  if (!pan || pan.length < 4) return '****';
  return pan.slice(0, 2) + '*'.repeat(pan.length - 4) + pan.slice(-2);
}

export function maskAadhaar(aadhaar: string): string {
  const cleaned = aadhaar.replace(/\s/g, '');
  if (cleaned.length < 4) return 'XXXX-XXXX-****';
  return 'XXXX-XXXX-' + cleaned.slice(-4);
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return '****';
  return phone.slice(0, 2) + '*'.repeat(phone.length - 4) + phone.slice(-2);
}

const SENSITIVE_KEYS = new Set([
  'pan', 'aadhaar', 'password', 'pin', 'pinhash', 'fileurl',
  'hashsignature', 'digitalsignaturehash', 'accountnumber',
]);

/**
 * Strips sensitive fields from any object before logging.
 */
export function sanitizeForLog(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    result[key] = SENSITIVE_KEYS.has(key.toLowerCase()) ? '[REDACTED]' : value;
  }
  return result;
}
