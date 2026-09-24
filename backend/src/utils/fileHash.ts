import { createHash } from 'crypto';
import fs from 'fs';

/** Compute SHA-256 hash of a file on disk */
export function computeFileHash(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

/** Compute SHA-256 hash of an in-memory buffer */
export function computeBufferHash(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}
