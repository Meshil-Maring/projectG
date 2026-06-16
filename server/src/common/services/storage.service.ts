import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import type { Response } from 'express';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export function publicUrl(key: string): string {
  return `${env.R2_PUBLIC_URL}/${key}`;
}

// Upload a file by key, return its public URL.
export async function uploadBuffer(key: string, buffer: Buffer, contentType: string): Promise<string> {
  await s3.send(new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return publicUrl(key);
}

// Delete a single object by key.
export async function deleteByPath(key: string | null | undefined): Promise<void> {
  if (!key) return;
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: key }));
  } catch (err) {
    logger.error({ err, key }, 'Failed to delete object from R2');
  }
}

// Delete all objects whose keys start with the given prefix.
export async function deletePrefix(prefix: string): Promise<void> {
  try {
    let continuationToken: string | undefined;
    do {
      const res = await s3.send(new ListObjectsV2Command({
        Bucket: env.R2_BUCKET_NAME,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }));
      const objects = (res.Contents ?? []).map((o) => ({ Key: o.Key! }));
      if (objects.length) {
        await s3.send(new DeleteObjectsCommand({
          Bucket: env.R2_BUCKET_NAME,
          Delete: { Objects: objects },
        }));
      }
      continuationToken = res.NextContinuationToken;
    } while (continuationToken);
  } catch (err) {
    logger.error({ err, prefix }, 'Failed to delete prefix from R2');
  }
}

// Extract the R2 object key from a public URL. Returns null for non-R2 URLs.
export function getPathFromPublicUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const base = env.R2_PUBLIC_URL.replace(/\/$/, '');
    if (url.startsWith(base + '/')) return url.slice(base.length + 1);
  } catch {
    // ignore
  }
  return null;
}

// No-op — bucket is created in the R2 dashboard.
export async function ensureBucket(): Promise<void> {}

// Upload a file into a prefix (simulated folder), return public URL.
export async function uploadToFolder(
  prefix: string,
  buffer: Buffer,
  contentType: string,
  filename: string,
): Promise<{ key: string; url: string }> {
  const key = `${prefix.replace(/\/$/, '')}/${filename}`;
  await s3.send(new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return { key, url: publicUrl(key) };
}

// Kept for compatibility — not used with R2 but required by Express Response typing.
export async function proxyDriveImage(_fileId: string, _res: Response): Promise<void> {
  throw new Error('proxyDriveImage is not available with R2 storage. Serve images directly via R2 public URL.');
}
