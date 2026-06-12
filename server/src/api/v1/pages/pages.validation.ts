import { z } from 'zod';

export const createSectionSchema = z.object({
  type: z.string().min(1),
  data: z.record(z.string()),
  enabled: z.boolean().optional(),
  order: z.number().int().optional(),
});
export const updateSectionSchema = createSectionSchema.partial();
