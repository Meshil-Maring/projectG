import { supabase } from '../../config/supabase.js';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const BUCKET = env.SUPABASE_STORAGE_BUCKET;

/**
 * Ensures the storage bucket exists (created as public so getPublicUrl works
 * without signed URLs). Safe to call repeatedly on startup.
 */
export async function ensureBucket(): Promise<void> {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    logger.error({ err: listError }, 'Failed to list Supabase storage buckets');
    return;
  }

  if (buckets?.some((b) => b.name === BUCKET)) return;

  const { error: createError } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (createError) {
    logger.error({ err: createError }, `Failed to create Supabase storage bucket "${BUCKET}"`);
    return;
  }

  logger.info(`Created Supabase storage bucket "${BUCKET}"`);
}

export async function uploadBuffer(path: string, buffer: Buffer, contentType: string): Promise<string> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: true,
  });
  if (error) {
    throw new Error(`Failed to upload image to storage: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteByPath(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) {
    logger.error({ err: error, path }, 'Failed to delete image from storage');
  }
}

/**
 * Returns the storage path for a public URL belonging to this bucket, or
 * null if the URL points elsewhere (external image, default placeholder, etc.).
 */
export function getPathFromPublicUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const prefix = `${env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
  if (!url.startsWith(prefix)) return null;
  return url.slice(prefix.length);
}
