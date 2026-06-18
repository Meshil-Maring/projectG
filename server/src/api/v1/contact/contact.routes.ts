import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { contactLimiter } from '../../../middlewares/rateLimiter.middleware.js';
import { sendContactEmail } from '../../../common/services/email.service.js';
import { contactMessageTemplate, volunteerTemplate } from '../../../common/services/email.templates.js';
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

    const html = volunteerTemplate({
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : undefined,
      areas: areas.map(escapeHtml),
      message: message ? escapeHtml(message) : undefined,
    });

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

    const html = contactMessageTemplate({
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message).replace(/\n/g, '<br/>'),
    });

    await sendContactEmail({
      subject: `New Contact Message: ${subject}`,
      html,
      replyTo: email,
    });

    ok(res, { message: 'Thank you for reaching out. We will get back to you shortly.' }, 201);
  }),
);
