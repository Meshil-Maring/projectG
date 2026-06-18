import { z } from 'zod';

export const volunteerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Enter a valid email.'),
  phone: z.string().trim().optional(),
  areas: z.array(z.string()).min(1, 'Select at least one area.'),
  message: z.string().trim().optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Enter a valid email.'),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required.')
    .max(200, 'Subject is too long.')
    .refine((s) => s !== 'Other', { message: 'Please specify your subject.' }),
  message: z.string().trim().min(1, 'Message is required.'),
});
