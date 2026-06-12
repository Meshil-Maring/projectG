import { z } from 'zod';

const ICON_KEYS = [
  'Users',
  'GraduationCap',
  'Leaf',
  'HandHeart',
  'Heart',
  'Star',
  'Globe',
  'BookOpen',
] as const;

const GROUP_KEYS = ['whg', 'hrds', 'cwg', 'fseds', 'lac'] as const;

const NOTICE_CATEGORIES = ['Announcement', 'Event', 'Update', 'Reminder'] as const;

export const settingsSchema = z.object({
  heroImageUrl: z.string().optional(),
  heroTitle: z.string().optional(),
  heroDescription: z.string().optional(),
  storyTitle: z.string().optional(),
  storyDescription: z.string().optional(),
  storyThumbnail: z.string().optional(),
  storyYoutubeId: z.string().optional(),
  storyVideoUrl: z.string().optional(),
  storyDuration: z.string().optional(),
});

export const createVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().min(1),
  youtubeId: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateVideoSchema = createVideoSchema.partial();

export const createPhotoSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().optional(),
});
export const updatePhotoSchema = createPhotoSchema.partial();

export const createStatSchema = z.object({
  iconKey: z.enum(ICON_KEYS),
  value: z.string().min(1),
  label: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateStatSchema = createStatSchema.partial();

export const createStorySchema = z.object({
  image: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateStorySchema = createStorySchema.partial();

export const createActivitySchema = z.object({
  group: z.enum(GROUP_KEYS),
  title: z.string().min(1),
  desc: z.string().min(1),
  imageUrl: z.string().optional(),
  order: z.number().int().optional(),
});
export const updateActivitySchema = createActivitySchema.partial();

export const createBoardMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  badge: z.string().min(1),
  color: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateBoardMemberSchema = createBoardMemberSchema.partial();

export const createTeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  color: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export const createNoticeSchema = z.object({
  title: z.string().min(1),
  category: z.enum(NOTICE_CATEGORIES),
  date: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
  order: z.number().int().optional(),
});
export const updateNoticeSchema = createNoticeSchema.partial();

export const activitiesQuerySchema = z.object({
  group: z.enum(GROUP_KEYS).optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
