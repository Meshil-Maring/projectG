export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const ALLOWED_ACCEPT = ALLOWED_MIME_TYPES.join(',');

export interface ImageSpec {
  width: number;
  height: number;
  maxSizeMB: number;
  folder: string;
}

// Mirrors server/src/api/v1/content/images/image.config.ts — keep in sync.
export const IMAGE_SPECS = {
  hero: { width: 1920, height: 1080, maxSizeMB: 5, folder: 'hero' },
  gallery: { width: 1200, height: 800, maxSizeMB: 5, folder: 'gallery' },
  story: { width: 400, height: 400, maxSizeMB: 2, folder: 'stories' },
  activity: { width: 800, height: 600, maxSizeMB: 3, folder: 'activities' },
  videoThumbnail: { width: 1280, height: 720, maxSizeMB: 3, folder: 'videos' },
} as const satisfies Record<string, ImageSpec>;

export type ImageSpecKey = keyof typeof IMAGE_SPECS;

export function formatSpec(spec: ImageSpec): string {
  return `Recommended ${spec.width}×${spec.height}px · max ${spec.maxSizeMB}MB · JPG/PNG/WebP`;
}
