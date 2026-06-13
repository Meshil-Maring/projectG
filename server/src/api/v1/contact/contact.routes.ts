import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { contactLimiter } from '../../../middlewares/rateLimiter.middleware.js';
import { sendContactEmail } from '../../../common/services/email.service.js';
import { volunteerSchema, contactMessageSchema } from './contact.validation.js';

export const contactRoutes = Router();

contactRoutes.use(contactLimiter);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

contactRoutes.post(
  '/volunteer',
  validate({ body: volunteerSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, areas, message } = req.body as typeof volunteerSchema._type;

    const html = `
      <h2>New Volunteer Sign-Up</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p><strong>Areas of Interest:</strong> ${escapeHtml(areas.join(', '))}</p>
      ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
    `;

    await sendContactEmail({
      subject: `New Volunteer Sign-Up from ${name}`,
      html,
      replyTo: email,
    });

    ok(res, { message: 'Thank you! Your volunteer request has been sent.' }, 201);
  }),
);

contactRoutes.post(
  '/message',
  validate({ body: contactMessageSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body as typeof contactMessageSchema._type;

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    await sendContactEmail({
      subject: `New Contact Message: ${subject}`,
      html,
      replyTo: email,
    });

    ok(res, { message: 'Thank you for reaching out. We will get back to you shortly.' }, 201);
  }),
);
