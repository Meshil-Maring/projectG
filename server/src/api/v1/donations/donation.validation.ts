import { z } from 'zod';

export const CAUSE_SECTIONS = ['general', 'lac', 'whg', 'fseds', 'hrds', 'cwg'] as const;

export const donationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Enter a valid email.'),
  phone: z.string().trim().optional(),
  section: z.enum(CAUSE_SECTIONS),
  amount: z.coerce.number().int().positive('Amount must be greater than zero.'),
  message: z.string().trim().optional(),
});
