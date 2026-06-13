import { randomUUID } from 'crypto';
import { imageSize } from 'image-size';
import { ValidationError } from '../../../../common/errors/AppError.js';
import { deleteByPath, getPathFromPublicUrl, uploadBuffer } from '../../../../common/services/storage.service.js';
import { ALLOWED_MIME_TYPES, type ImageSpec } from './image.config.js';

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const MIME_BY_IMAGE_SIZE_TYPE: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export function validateImageBuffer(buffer: Buffer, spec: ImageSpec): void {
  if (buffer.byteLength > spec.maxSizeMB * 1024 * 1024) {
    throw new ValidationError(`Image exceeds the ${spec.maxSizeMB}MB size limit.`);
  }

  let dimensions: { width: number; height: number; type?: string };
  try {
    dimensions = imageSize(buffer);
  } catch {
    throw new ValidationError('Could not read image dimensions. The file may be corrupted or in an unsupported format.');
  }

  const mime = dimensions.type ? MIME_BY_IMAGE_SIZE_TYPE[dimensions.type] : undefined;
  if (!mime || !ALLOWED_MIME_TYPES.includes(mime as (typeof ALLOWED_MIME_TYPES)[number])) {
    throw new ValidationError('Unsupported image format. Please use JPG, PNG or WebP.');
  }

  if (dimensions.width !== spec.width || dimensions.height !== spec.height) {
    throw new ValidationError(
      `Image must be exactly ${spec.width}x${spec.height}px (received ${dimensions.width}x${dimensions.height}px).`,
    );
  }
}

export async function fetchImageBuffer(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new ValidationError('Could not fetch image from the provided URL.');
  }

  if (!res.ok) {
    throw new ValidationError('Could not fetch image from the provided URL.');
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new ValidationError('The provided URL does not point to an image.');
  }

  const arrayBuffer = await res.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType };
}

export async function storeValidatedImage(
  buffer: Buffer,
  contentType: string,
  spec: ImageSpec,
  replaceUrl?: string,
): Promise<{ url: string; path: string }> {
  const ext = EXT_BY_MIME[contentType] ?? 'jpg';
  const path = `${spec.folder}/${randomUUID()}.${ext}`;

  const url = await uploadBuffer(path, buffer, contentType);

  const oldPath = getPathFromPublicUrl(replaceUrl);
  if (oldPath && oldPath !== path) {
    await deleteByPath(oldPath);
  }

  return { url, path };
}
