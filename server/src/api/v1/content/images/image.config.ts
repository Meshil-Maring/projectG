export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export interface ImageSpec {
  width: number;
  height: number;
  maxSizeMB: number;
  folder: string;
}

export const IMAGE_SPECS = {
  hero: { width: 1920, height: 1080, maxSizeMB: 5, folder: 'hero' },
  gallery: { width: 1200, height: 800, maxSizeMB: 5, folder: 'gallery' },
  // Reserved for the next pass — keep this table as the single source of truth
  // for image dimension requirements across the site.
  story: { width: 400, height: 400, maxSizeMB: 2, folder: 'stories' },
  activity: { width: 800, height: 600, maxSizeMB: 3, folder: 'activities' },
  videoThumbnail: { width: 1280, height: 720, maxSizeMB: 3, folder: 'videos' },
} as const satisfies Record<string, ImageSpec>;

export type ImageSpecKey = keyof typeof IMAGE_SPECS;

export const IMAGE_SPEC_KEYS = Object.keys(IMAGE_SPECS) as ImageSpecKey[];

export const MAX_UPLOAD_SIZE_MB = Math.max(...Object.values(IMAGE_SPECS).map((s) => s.maxSizeMB));
